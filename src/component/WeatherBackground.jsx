import React, { useEffect, useRef, useState } from "react";

import Thunderstorm from "../assets/Thunderstorm.gif";
import Rain from "../assets/Rain.gif";
import SnowDay from "../assets/Snow.gif";
import ClearDay from "../assets/ClearDay.gif";
import ClearNight from "../assets/ClearNight.gif";
import CloudsDay from "../assets/CloudsDay.gif";
import CloudsNight from "../assets/CloudsNight.gif";
import Haze from "../assets/Haze.gif";
import video from "../assets/video1.mp4";

// Sounds
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
  const [isMuted, setIsMuted] = useState(false);

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
    return sound || sounds.default;
  };

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.load();
    if (!isMuted) {
      audioRef.current.play().catch(() => {});
    }
  }, [condition, isMuted]);

  const background = getBackground();
  const audioSrc = getSound();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Background Visual */}
      {background === video ? (
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover opacity-100 pointer-events-none animate-fade-in"
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <img
          src={background}
          alt="Weather-bg"
          className="w-full h-full object-cover opacity-20 pointer-events-none animate-fade-in"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Weather Sound */}
      <audio ref={audioRef} loop muted={isMuted}>
        <source src={audioSrc} type="audio/mp3" />
      </audio>

      {/* Mute / Unmute Toggle */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-4 right-4 z-10 bg-white/20 text-white px-3 py-1 rounded-md backdrop-blur hover:bg-white/30"
      >
        {isMuted ? "🔇 Unmute" : "🔊 Mute"}
      </button>
    </div>
  );
};

export default WeatherBackground;
