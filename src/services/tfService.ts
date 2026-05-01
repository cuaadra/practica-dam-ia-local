import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

export class TFService {
  private model: cocoSsd.ObjectDetection | null = null;

  async loadModel() {
    console.log('Carregant model COCO-SSD...');
    // Forçar backend WebGL per a millor rendiment
    await tf.setBackend('webgl');
    await tf.ready();
    this.model = await cocoSsd.load({
        base: 'lite_mobilenet_v2' // Versió lleugera per a mòbils
    });
    console.log('Model carregat correctament');
  }

  async detectObjects(videoElement: HTMLVideoElement) {
    if (!this.model) {
      console.warn('El model no s\'ha carregat encara');
      return [];
    }
    return await this.model.detect(videoElement);
  }
}

export const tfService = new TFService();
