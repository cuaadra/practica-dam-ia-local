# SPEC.md: Especificació de l'App Mòbil Nativa amb IA Local

## 1. Foundations: Context, Objectius i Abast
### Context
Desenvolupament d'una aplicació mòbil per a la pràctica de DAM centrada en la "On-Device AI".

### Objectius
- Executar models de TensorFlow.js localment.
- Capturar vídeo en temps real i processar-lo sense núvol.
- Mostrar resultats visuals (bounding boxes) de forma fluida.

### Abast
Detecció d'objectes genèrics amb el model COCO-SSD integrat en una app híbrida.

---

## 2. Specify: Descripció Funcional i Comportament
### Comportament del Model
- **Input**: Flux de vídeo de la càmera (640x480).
- **Processament**: Inferència local amb `lite_mobilenet_v2`.
- **Output**: Detecció de classes d'objectes amb puntuació de confiança.

### Interacció amb l'Usuari
- Feedback visual instantani mitjançant un overlay de canvas.
- Interfície en mode fosc per a millor visibilitat de les caixes de detecció.

---

## 3. Planning (Veure task.md)
Organització de tasques de configuració, desenvolupament d'IA i build natiu.
