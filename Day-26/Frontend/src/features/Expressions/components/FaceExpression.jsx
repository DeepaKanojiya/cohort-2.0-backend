import { useEffect, useRef, useState } from "react";
import {
  initializeFaceDetection,
  startCamera,
  detectExpression,
  stopCamera,
  closeFaceDetection,
} from "../utils/faceDetection";

import "../style/faceExpression.scss";

export default function Expression() {
  const videoRef = useRef(null);
  const [expression, setExpression] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    let stream;

    async function setup() {
      try {
        await initializeFaceDetection();

        if (!active) {
          closeFaceDetection();
          return;
        }

        stream = await startCamera(videoRef.current);

        if (active) setReady(true);
      } catch (err) {
        console.error(err);
        if (active) setError(err.message);
      }
    }

    setup();

    return () => {
      active = false;
      stopCamera(stream);
      closeFaceDetection();
    };
  }, []);

  function handleDetect() {
    if (!ready || !videoRef.current) return;

    setError("");
    setExpression(detectExpression(videoRef.current));
  }

  return (
    <main className="expression-page">
      <h1>Face Expression Detector</h1>

      <video ref={videoRef} autoPlay muted playsInline className="camera" />

      <button onClick={handleDetect} disabled={!ready}>
        {ready ? "Detect Expression" : "Starting Camera..."}
      </button>

      {error && <p className="error">{error}</p>}

      {expression && (
        <section className="expression-card">
          <div className="emoji">{expression.split(" ")[0]}</div>
          <h2>{expression.split(" ").slice(1).join(" ")}</h2>
        </section>
      )}
    </main>
  );
}
