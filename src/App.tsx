import { useState, useEffect } from 'react'
import { Disc, Volume2 } from 'lucide-react'
import { subscribeToPresence } from './lib/presence'
import { initYouTubePlayer, togglePlay, seek, next, previous, playVideoAt } from './lib/youtube'
import type { YouTubePlaybackState } from './lib/youtube'
import { Player } from './components/Player'
import { QueuePanel } from './components/QueuePanel'

function App() {
  const [time, setTime] = useState('');
  const [presenceCount, setPresenceCount] = useState(1);
  const [playbackState, setPlaybackState] = useState<YouTubePlaybackState>({
    isPaused: true,
    position: 0,
    duration: 0,
    title: 'Loading...',
    artist: '...',
    videoId: ''
  });
  const [isQueueOpen, setIsQueueOpen] = useState(false);

  const playHorn = () => {
    const audio = document.getElementById('hornAudio') as HTMLAudioElement;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase());
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToPresence((count) => {
      setPresenceCount(count > 0 ? count : 1);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    initYouTubePlayer('youtube-iframe-container', (state) => {
      setPlaybackState(state);
    });
  }, []);

  return (
    <div className="app">
      {/* Background System */}
      <div className="background" />

      {/* Horn Audio Element */}
      <audio id="hornAudio" src="/horn.mp3" preload="auto" />

      {/* Horn Button */}
      <button className="horn-btn" onClick={playHorn}>
        <Volume2 size={16} />
        <span>હોર્ન વગાડો</span>
      </button>

      {/* Hidden YouTube Iframe */}
      <div className="hidden-iframe-container">
        <div id="youtube-iframe-container"></div>
      </div>

      <div className="content">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="time">
            {time}
          </div>
          
          <div className="presence">
            <div className="presence-dot"></div>
            <span>{presenceCount} રાઈડર</span>
          </div>

          <div className="icon-wrapper">
            <Disc size={18} />
          </div>
        </header>

        {/* Main Title Center */}
        <main className="main-content">
          <h1 className="title">
            રિક્ષા વાળા
          </h1>
        </main>

        {/* Bottom Section */}
        <footer className="bottom-section">
          <p className="quote">
            ધીમે ચલાવો, ગીત થોડું વધારે વાગવા દો.
          </p>

          <QueuePanel 
            isOpen={isQueueOpen} 
            onClose={() => setIsQueueOpen(false)} 
            currentTitle={playbackState.title}
            onTrackSelect={(idx) => playVideoAt(idx)}
          />

          <Player 
            isPaused={playbackState.isPaused}
            position={playbackState.position}
            duration={playbackState.duration}
            title={playbackState.title}
            artist={playbackState.artist}
            videoId={playbackState.videoId}
            onPlayPause={togglePlay}
            onSeek={seek}
            onNext={next}
            onPrev={previous}
            isQueueOpen={isQueueOpen}
            onToggleQueue={() => setIsQueueOpen(!isQueueOpen)}
          />
        </footer>
      </div>
    </div>
  )
}

export default App
