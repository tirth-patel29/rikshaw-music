import React, { useEffect, useRef } from 'react';
import { PLAYLIST_DATA } from '../lib/playlist';

interface QueuePanelProps {
  isOpen: boolean;
  onClose: () => void;
  onTrackSelect: (index: number) => void;
  currentTitle: string;
}

export const QueuePanel: React.FC<QueuePanelProps> = ({ isOpen, onClose, onTrackSelect, currentTitle }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close if clicking the toggle button itself (handled by App)
      // We check if the click is inside the panel. 
      // The toggle button in Player.tsx will naturally trigger its own click event which toggles the state,
      // but to prevent race conditions, we can stop propagation on the button or check classes.
      // Easiest is to let App handle the toggle button click separately, but here we just check if it's inside the panel.
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        // If clicking a button, we don't want to immediately close, let the button handle it
        if ((event.target as Element).closest('button')) return;
        onClose();
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="queue-panel" ref={panelRef}>
      <div className="queue-list">
        {PLAYLIST_DATA.map((track) => {
          // Highlight active track by matching title, 
          // or if YouTube is still loading, it might not match perfectly but it will once loaded.
          const isActive = currentTitle && currentTitle.includes(track.title);
          return (
            <div 
              key={track.index} 
              className={`queue-item ${isActive ? 'active' : ''}`}
              onClick={() => onTrackSelect(track.index)}
            >
              <span className="track-num">{track.index + 1}</span>
              <div className="track-info">
                <span className="track-title">{track.title}</span>
                <span className="track-artist">{track.artist}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
