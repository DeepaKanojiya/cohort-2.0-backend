import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

let landmarker;

export async function initializeFaceDetection() {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm",
  );

  landmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: "/models/face_landmarker.task",
    },
    runningMode: "VIDEO",
    numFaces: 1,
    outputFaceBlendshapes: true,
  });

  return landmarker;
}

export async function startCamera(video) {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

  video.srcObject = stream;
  await video.play();

  return stream;
}

export function detectExpression(video) {
  if (!landmarker || video.readyState < 2) {
    return "⏳ Loading...";
  }

  const result = landmarker.detectForVideo(video, performance.now());

  const categories = result.faceBlendshapes?.[0]?.categories;

  if (!categories) return "😐 No face detected";

  const scores = Object.fromEntries(
    categories.map(({ categoryName, score }) => [categoryName, score]),
  );

  const smile =
    ((scores.mouthSmileLeft || 0) + (scores.mouthSmileRight || 0)) / 2;

  const frown =
    ((scores.mouthFrownLeft || 0) + (scores.mouthFrownRight || 0)) / 2;

  const jawOpen = scores.jawOpen || 0;
  const eyesWide = ((scores.eyeWideLeft || 0) + (scores.eyeWideRight || 0)) / 2;
  const browsUp = scores.browInnerUp || 0;

  if (jawOpen > 0.25 && (eyesWide > 0.15 || browsUp > 0.15)) {
    return "surprised";
  }

  if (smile > 0.4) {
    return "happy";
  }

  if (frown > 0.015) {
    return "sad";
  }

  return "😐 Neutral";
}

export function stopCamera(stream) {
  stream?.getTracks().forEach((track) => track.stop());
}

export function closeFaceDetection() {
  landmarker?.close();
  landmarker = undefined;
}
