import React from 'react';
import { Play, Pause, SkipBack, SkipForward, List } from 'lucide-react';

interface PlayerProps {
  isPaused: boolean;
  position: number;
  duration: number;
  title: string;
  artist: string;
  videoId: string;
  onPlayPause: () => void;
  onSeek: (seconds: number) => void;
  onNext: () => void;
  onPrev: () => void;
  isQueueOpen: boolean;
  onToggleQueue: () => void;
}

const formatTime = (secondsTotal: number) => {
  if (isNaN(secondsTotal) || secondsTotal < 0) return '0:00';
  const totalSeconds = Math.floor(secondsTotal);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const Player: React.FC<PlayerProps> = ({ 
  isPaused, position, duration, title, artist, videoId, onPlayPause, onSeek, onNext, onPrev, isQueueOpen, onToggleQueue
}) => {
  const artworkUrl = videoId 
    ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

  const progressPercent = duration > 0 ? (position / duration) * 100 : 0;

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    onSeek(percentage * duration);
  };

  return (
    <div className="player-pill">
      <div className="player-left">
        <img 
          src={artworkUrl} 
          alt="Artwork" 
          className="player-artwork"
        />
        <div className="player-info">
          <span className="song-title">{title}</span>
          <span className="song-artist">{artist}</span>
          
          <div className="progress-container">
            <span className="time-text">{formatTime(position)}</span>
            <div 
              className="progress-bar"
              onClick={handleProgressBarClick}
            >
              <div 
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="time-text">{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <div className="player-controls">
        <button onClick={onPrev}>
          <SkipBack size={16} fill="currentColor" />
        </button>
        <button 
          onClick={onPlayPause}
          className="play-pause-btn"
        >
          {isPaused ? <Play size={14} fill="currentColor" style={{marginLeft: '2px'}} /> : <Pause size={14} fill="currentColor" />}
        </button>
        <button onClick={onNext}>
          <SkipForward size={16} fill="currentColor" />
        </button>
        <button 
          onClick={onToggleQueue} 
          style={{ marginLeft: '8px', color: isQueueOpen ? '#fff' : 'rgba(255,255,255,0.7)' }}
        >
          <List size={16} />
        </button>
      </div>
    </div>
  );
};
