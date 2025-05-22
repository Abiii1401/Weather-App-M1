import React, { useEffect, useRef, useState } from "react";

// Weather GIFs
import Thunderstorm from "../assets/Thunderstorm.gif";
import Rain from "../assets/Rain.gif";
import SnowDay from "../assets/Snow.gif";
import ClearDay from "../assets/ClearDay.gif";
import ClearNight from "../assets/ClearNight.gif";
import CloudsDay from "../assets/CloudsDay.gif";
import CloudsNight from "../assets/CloudsNight.gif";
import Haze from "../assets/Haze.gif";
import video from "../assets/video1.mp4";

// Weather Sounds
import clearSound from "../assets/sounds/Clear.mp3";
import cloudSound from "../assets/sounds/Cloud.mp3";
import defaultSound from "../assets/sounds/Default.mp3";
import drizzleSound from "../assets/sounds/Drizzle.mp3";
import snowSound from "../assets/sounds/Snow.mp3";
import fogSound from "../assets/sounds/Fog.mp3";
import thunderSound from "../assets/sounds/Thunderstorm.mp3";
import windSound from "../assets/sounds/Wind.mp3";

const WeatherBackground = ({ condition }) => {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true); // Start muted for better UX
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Debug log for condition prop
  useEffect(() => {
    console.log("Current weather condition:", condition);
  }, [condition]);

  const gifs = {
    Thunderstorm,
    Drizzle: Rain,
    Rain,
    Snow: SnowDay,
    Clear: { day: ClearDay, night: ClearNight },
    Clouds: { day: CloudsDay, night: CloudsNight },
    Mist: Haze,
    Smoke: Haze,
    Haze,
    Fog: Haze,
    default: video,
  };

  const sounds = {
    Thunderstorm: thunderSound,
    Drizzle: drizzleSound,
    Rain: drizzleSound,
    Snow: snowSound,
    Clear: clearSound,
    Clouds: cloudSound,
    Mist: fogSound,
    Smoke: fogSound,
    Haze: fogSound,
    Fog: fogSound,
    Wind: windSound,
    default: defaultSound,
  };

  const getBackground = () => {
    if (!condition) return gifs.default;
    const weatherType = condition.main;
    const asset = gifs[weatherType];

    if (!asset) return gifs.default;
    if (typeof asset === "object") {
      return condition.isDay ? asset.day : asset.night;
    }

    return asset;
  };

  const getSound = () => {
    if (!condition) return sounds.default;
    const sound = sounds[condition.main];
    console.log("Selected sound for condition:", condition.main, sound);
    return sound || sounds.default;
  };

  // Handle audio loading and playing
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const handleCanPlay = () => {
      console.log("Audio can play");
      setIsLoading(false);
      if (!isMuted) {
        audio
          .play()
          .then(() => {
            console.log("Audio started playing");
            setIsPlaying(true);
          })
          .catch((err) => {
            console.error("Audio playback failed:", err);
            setError(
              "Audio playback failed. Please check your browser settings."
            );
          });
      }
    };

    const handleError = (e) => {
      console.error("Audio loading error:", e);
      setError("Failed to load audio. Please try refreshing the page.");
      setIsLoading(false);
    };

    const handlePlay = () => {
      console.log("Audio playing");
      setIsPlaying(true);
    };

    const handlePause = () => {
      console.log("Audio paused");
      setIsPlaying(false);
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Load new audio
    audio.pause();
    audio.load();

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [condition, isMuted]);

  // Handle mute/unmute
  const toggleMute = () => {
    if (!audioRef.current) return;

    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    console.log("Mute state changed to:", newMuteState);

    if (newMuteState) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          console.log("Audio started playing after unmute");
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Failed to play audio:", err);
          setError("Failed to play audio. Please check your browser settings.");
        });
    }
  };

  const background = getBackground();
  const audioSrc = getSound();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="text-white text-lg">Loading weather effects...</div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500/80 text-white px-4 py-2 rounded-md z-20">
          {error}
        </div>
      )}

      {/* Debug Info */}
      <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 p-2 rounded">
        <p>Condition: {condition?.main || "None"}</p>
        <p>Is Day: {condition?.isDay ? "Yes" : "No"}</p>
        <p>Muted: {isMuted ? "Yes" : "No"}</p>
        <p>Playing: {isPlaying ? "Yes" : "No"}</p>
      </div>

      {/* Background Visual */}
      {background === video ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-100 pointer-events-none transition-opacity duration-500"
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <img
          src={background}
          alt={`Weather background - ${condition?.main || "default"}`}
          className="w-full h-full object-cover opacity-20 pointer-events-none transition-opacity duration-500"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setError("Failed to load weather background");
            setIsLoading(false);
          }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Weather Sound */}
      <audio ref={audioRef} loop muted={isMuted} preload="auto">
        <source src={audioSrc} type="audio/mp3" />
      </audio>

      {/* Mute / Unmute Toggle */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 z-10 bg-white/20 text-white px-3 py-1 rounded-md backdrop-blur hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
        aria-label={isMuted ? "Unmute weather sounds" : "Mute weather sounds"}
      >
        {isMuted ? (
          <>
            <span>🔇</span>
            <span>Unmute</span>
          </>
        ) : (
          <>
            <span>🔊</span>
            <span>Mute</span>
          </>
        )}
      </button>
    </div>
  );
};

export default WeatherBackground;
