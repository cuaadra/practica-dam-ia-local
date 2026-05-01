<template>
  <div class="detector-container">
    <video
      ref="videoRef"
      autoplay
      muted
      playsinline
      class="video-feed"
    ></video>
    <canvas ref="canvasRef" class="overlay-canvas"></canvas>
    
    <div v-if="!modelLoaded" class="loading-overlay">
      <ion-spinner name="crescent"></ion-spinner>
      <p>Iniciant IA Local...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { tfService } from '../services/tfService';
import { IonSpinner } from '@ionic/vue';

const videoRef = ref<HTMLVideoElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const modelLoaded = ref(false);
let animationId: number;

const setupCamera = async () => {
  if (!videoRef.value) return;

  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: 'environment',
      width: { ideal: 640 },
      height: { ideal: 480 }
    },
    audio: false
  });

  videoRef.value.srcObject = stream;

  return new Promise((resolve) => {
    videoRef.value!.onloadedmetadata = () => {
      resolve(videoRef.value);
    };
  });
};

const detectionLoop = async () => {
  if (!videoRef.value || !canvasRef.value) return;

  const predictions = await tfService.detectObjects(videoRef.value);
  drawBoundingBoxes(predictions);

  animationId = requestAnimationFrame(detectionLoop);
};

const drawBoundingBoxes = (predictions: any[]) => {
  const ctx = canvasRef.value?.getContext('2d');
  if (!ctx || !canvasRef.value || !videoRef.value) return;

  // Ajustar mida del canvas al vídeo
  canvasRef.value.width = videoRef.value.videoWidth;
  canvasRef.value.height = videoRef.value.videoHeight;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  predictions.forEach(prediction => {
    const [x, y, width, height] = prediction.bbox;
    const score = Math.round(prediction.score * 100);

    // Color basat en confiança
    ctx.strokeStyle = score > 70 ? '#00ff00' : '#ffff00';
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, width, height);

    // Etiqueta
    ctx.fillStyle = score > 70 ? '#00ff00' : '#ffff00';
    ctx.font = '18px Inter, sans-serif';
    ctx.fillText(`${prediction.class} (${score}%)`, x, y > 20 ? y - 10 : 20);
  });
};

onMounted(async () => {
  try {
    await tfService.loadModel();
    modelLoaded.value = true;
    await setupCamera();
    detectionLoop();
  } catch (error) {
    console.error('Error iniciant el detector:', error);
  }
});

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId);
  if (videoRef.value?.srcObject) {
    const stream = videoRef.value.srcObject as MediaStream;
    stream.getTracks().forEach(track => track.stop());
  }
});
</script>

<style scoped>
.detector-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  overflow: hidden;
}

.video-feed {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 10;
}

.loading-overlay p {
  margin-top: 15px;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.5px;
}
</style>
