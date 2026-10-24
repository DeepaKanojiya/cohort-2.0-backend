import { useEffect, useRef, useState } from "react";
import {
  initializeFaceDetection,
  startCamera,
  detectExpression,
  stopCamera,
  closeFaceDetection,
} from "../utils/faceDetection";
import { useSong } from "../../home/hooks/useSong";

import "../style/faceExpression.scss";

export default function Expression() {
  const videoRef = useRef(null);
  const [expression, setExpression] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const { loading: songLoading, handleGetSong } = useSong();

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

  async function handleDetect() {
    if (!ready || !videoRef.current) return;

    setError("");
    const detectedExpression = detectExpression(videoRef.current);
    setExpression(detectedExpression);

    const mood = detectedExpression.toLowerCase();
    if (!["happy", "sad", "surprised"].includes(mood)) return;

    try {
      await handleGetSong({ mood });
    } catch (err) {
      console.error(`Unable to load a ${mood} song.`, err);
      setError(err.message || `Unable to load a ${mood} song.`);
    }
  }

  return (
    <main className="expression-page">
      <h1>Face Expression Detector</h1>

      <video ref={videoRef} autoPlay muted playsInline className="camera" />

      <button onClick={handleDetect} disabled={!ready || songLoading}>
        {!ready
          ? "Starting Camera..."
          : songLoading
            ? "Loading mood song..."
            : "Detect Expression"}
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
