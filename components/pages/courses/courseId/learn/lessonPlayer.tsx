"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
} from "lucide-react";

export default function VideoPlayer({
  src,
  poster,
  autoPlay = false,
  markLessonComplete,
  goToNextLesson,
}: {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  markLessonComplete: () => void;
  goToNextLesson: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Handle time updates
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Handle metadata loaded (duration available)
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // When video ends → mark complete & auto-advance
  const handleVideoEnded = () => {
    markLessonComplete();

    // Auto-advance after short delay
    setTimeout(() => {
      goToNextLesson();
    }, 1500);
  };

  // Play/pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Seek
  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Mute/unmute
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Change playback speed
  const changeSpeed = (speed: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  // Format time (MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (autoPlay && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [autoPlay, src]);

  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full aspect-video"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleVideoEnded}
      />
      {/* Controls omitted for brevity */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center gap-4 mb-2">
          {/* Play / Pause */}
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            className="text-white hover:bg-white/20">
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </Button>

          {/* Skip back */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleSeek(Math.max(0, currentTime - 10))}
            className="text-white hover:bg-white/20">
            <SkipBack className="w-5 h-5" />
          </Button>

          {/* Skip forward */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleSeek(Math.min(duration, currentTime + 10))}
            className="text-white hover:bg-white/20">
            <SkipForward className="w-5 h-5" />
          </Button>

          {/* Timeline */}
          <div className="flex items-center gap-2 flex-1">
            <span className="text-white text-sm">
              {formatTime(currentTime)}
            </span>
            <Progress
              value={(currentTime / duration) * 100}
              className="flex-1 h-2 cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                handleSeek(duration * percent);
              }}
            />
            <span className="text-white text-sm">{formatTime(duration)}</span>
          </div>

          {/* Mute / Volume */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="text-white hover:bg-white/20">
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </Button>

          {/* Playback speed */}
          <select
            value={playbackSpeed}
            onChange={(e) => changeSpeed(Number(e.target.value))}
            className="bg-black/50 text-white border border-white/20 rounded px-2 py-1 text-sm">
            <option value={0.5}>0.5x</option>
            <option value={0.75}>0.75x</option>
            <option value={1}>1x</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>

          {/* Settings & Fullscreen */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20">
            <Settings className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20">
            <Maximize className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
