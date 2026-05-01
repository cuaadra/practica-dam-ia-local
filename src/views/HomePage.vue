<template>
  <ion-page>
    <!-- Header Premium Genèric -->
    <ion-header class="ion-no-border">
      <ion-toolbar class="custom-toolbar">
        <ion-title>
          <div class="header-content">
            <span class="logo-ai">Local</span><span class="logo-bold">IA</span>
            <div class="badge-local">ON-DEVICE</div>
          </div>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding-none">
      <div class="app-container">
        <!-- Main Detector Component -->
        <ObjectDetector />

        <!-- Floating Info Overlay -->
        <div class="info-overlay">
          <div class="status-dot"></div>
          <span>Inferència Local Activa</span>
        </div>

        <!-- Control Bar -->
        <div class="bottom-controls">
          <div class="stats-card">
            <div class="stat-item">
                <span class="stat-label">Model</span>
                <span class="stat-value">COCO-SSD</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
                <span class="stat-label">Estat</span>
                <span class="stat-value">Temps Real</span>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import ObjectDetector from '../components/ObjectDetector.vue';
</script>

<style scoped>
/* Color Palette */
:host {
  --primary-gold: #FFD700;
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
}

.custom-toolbar {
  --background: #000;
  --color: white;
  --border-style: none;
  padding-top: 10px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-ai {
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.logo-bold {
  font-weight: 800;
  color: #00e5ff;
}

.badge-local {
  background: rgba(0, 229, 255, 0.2);
  color: #00e5ff;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 12px;
  border: 1px solid rgba(0, 229, 255, 0.3);
  font-weight: bold;
}

.app-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #000;
}

.info-overlay {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--glass-border);
  z-index: 5;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #00ff00;
  border-radius: 50%;
  box-shadow: 0 0 10px #00ff00;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}

.info-overlay span {
  color: white;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.bottom-controls {
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  padding: 0 20px;
  z-index: 5;
}

.stats-card {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(15px);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  padding: 15px 30px;
  display: flex;
  align-items: center;
  gap: 25px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-label {
  color: rgba(255,255,255,0.5);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-value {
  color: white;
  font-size: 14px;
  font-weight: bold;
}

.stat-divider {
  width: 1px;
  height: 30px;
  background: rgba(255,255,255,0.1);
}
</style>
