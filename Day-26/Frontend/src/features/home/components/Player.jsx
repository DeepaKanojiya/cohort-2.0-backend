import { useContext, useEffect, useRef, useState } from "react";
import "../style/player.scss";
import { useSong } from "../hooks/useSong";

const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

function formatTime(seconds) {
  const safeSeconds = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = Math.floor(safeSeconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function Player() {
  const {song} = useSong()
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [playbackError, setPlaybackError] = useState("");

  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    setPlaybackError("");
  }, [song?.url]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setPlaybackError("");
      } catch (error) {
        console.error("Unable to play the current track.", error);
        setPlaybackError("This track could not be played.");
      }
    } else {
      audio.pause();
    }
  }

  function skip(seconds) {
    const audio = audioRef.current;
    if (!audio) return;

    const upperLimit = Number.isFinite(audio.duration)
      ? audio.duration
      : Number.POSITIVE_INFINITY;
    audio.currentTime = Math.min(
      Math.max(audio.currentTime + seconds, 0),
      upperLimit,
    );
    setCurrentTime(audio.currentTime);
  }

  function seek(event) {
    const nextTime = Number(event.currentTarget.value);
    if (!audioRef.current || !Number.isFinite(nextTime)) return;

    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  function changePlaybackRate(event) {
    setPlaybackRate(Number(event.currentTarget.value));
  }

  return (
    <section className="player-card" aria-label="Music player">
      <div className="player-track">
        {song?.posterUrl ? (
          <img
            className="player-cover"
            src={song.posterUrl}
            alt={`${song.title || "Current track"} cover`}
          />
        ) : (
          <div className="player-cover player-cover--empty" aria-hidden="true">
            ♪
          </div>
        )}
        <div className="player-track-info">
          <p className="player-eyebrow">NOW PLAYING</p>
          <h1>{song?.title || "Choose a track"}</h1>
          {song?.mood && <p className="player-mood">{song.mood} mood</p>}
        </div>
        <label className="player-speed">
          <span>Speed</span>
          <select
            value={playbackRate}
            onChange={changePlaybackRate}
            aria-label="Playback speed"
          >
            {playbackSpeeds.map((speed) => (
              <option key={speed} value={speed}>
                {speed}x
              </option>
            ))}
          </select>
        </label>
      </div>

      <audio
        ref={audioRef}
        src={song?.url || undefined}
        preload="metadata"
        onLoadedMetadata={(event) =>
          setDuration(Number.isFinite(event.currentTarget.duration)
            ? event.currentTarget.duration
            : 0)
        }
        onDurationChange={(event) =>
          setDuration(Number.isFinite(event.currentTarget.duration)
            ? event.currentTarget.duration
            : 0)
        }
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          setIsPlaying(false);
          setPlaybackError("This track could not be loaded.");
        }}
      />

      <div className="player-progress">
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={Math.min(currentTime, duration || 0)}
          onChange={seek}
          disabled={!duration}
          aria-label="Track position"
          style={{
            "--progress": `${duration ? (currentTime / duration) * 100 : 0}%`,
          }}
        />
        <div className="player-time">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-controls">
        <button
          className="player-skip"
          type="button"
          onClick={() => skip(-5)}
          disabled={!song?.url}
          aria-label="Back 5 seconds"
          title="Back 5 seconds"
        >
          <span aria-hidden="true">−5</span>
          <small>SEC</small>
        </button>
        <button
          className="player-toggle"
          type="button"
          onClick={togglePlayback}
          disabled={!song?.url}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
        </button>
        <button
          className="player-skip"
          type="button"
          onClick={() => skip(5)}
          disabled={!song?.url}
          aria-label="Forward 5 seconds"
          title="Forward 5 seconds"
        >
          <span aria-hidden="true">+5</span>
          <small>SEC</small>
        </button>
      </div>

      {playbackError && (
        <p className="player-error" role="alert">
          {playbackError}
        </p>
      )}
    </section>
  );
}

export default Player;
