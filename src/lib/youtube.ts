export interface YouTubePlaybackState {
  isPaused: boolean;
  position: number;
  duration: number;
  title: string;
  artist: string;
  videoId: string;
}

let player: any = null;
let pollInterval: number | null = null;

export const initYouTubePlayer = (
  containerId: string,
  onStateChange: (state: YouTubePlaybackState) => void
) => {
  return new Promise<void>((resolve) => {
    window.onYouTubeIframeAPIReady = () => {
      player = new window.YT.Player(containerId, {
        height: '10',
        width: '10',
        playerVars: {
          listType: 'playlist',
          list: 'PLSE5mwNbBjKI',
          autoplay: 0,
          controls: 0,
          playsinline: 1,
          loop: 1,
          rel: 0,
          enablejsapi: 1,
          origin: window.location.origin,
          disablekb: 1,
          fs: 0,
          modestbranding: 1
        },
        events: {
          onReady: () => {
            resolve();
            startPolling(onStateChange);
          },
          onStateChange: (event: any) => {
            // event.data: 1 = playing, 2 = paused, 3 = buffering, 0 = ended
            if (event.data === window.YT.PlayerState.PLAYING) {
              startPolling(onStateChange);
            } else if (event.data === window.YT.PlayerState.ENDED) {
              // Loop current song continuously
              if (player && player.seekTo) {
                player.seekTo(0, true);
                player.playVideo();
              }
            }
            updateState(onStateChange);
          }
        }
      });
    };

    // Load the script
    if (!document.getElementById('youtube-iframe-api')) {
      const script = document.createElement('script');
      script.id = 'youtube-iframe-api';
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.body.appendChild(script);
    } else if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady();
    }
  });
};

const updateState = (callback: (state: YouTubePlaybackState) => void) => {
  if (!player || !player.getPlayerState) return;
  
  const state = player.getPlayerState();
  const videoData = player.getVideoData ? player.getVideoData() : {};
  
  callback({
    isPaused: state !== window.YT.PlayerState.PLAYING,
    position: player.getCurrentTime ? player.getCurrentTime() : 0,
    duration: player.getDuration ? player.getDuration() : 0,
    title: videoData.title || 'Loading...',
    artist: videoData.author || '...',
    videoId: videoData.video_id || ''
  });
};

const startPolling = (callback: (state: YouTubePlaybackState) => void) => {
  if (pollInterval) clearInterval(pollInterval);
  pollInterval = window.setInterval(() => {
    updateState(callback);
  }, 500) as unknown as number;
};

export const play = () => player?.playVideo?.();
export const pause = () => player?.pauseVideo?.();
export const togglePlay = () => {
  if (!player || !player.getPlayerState) return;
  if (player.getPlayerState() === window.YT.PlayerState.PLAYING) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
};
export const seek = (seconds: number) => player?.seekTo?.(seconds, true);
export const next = () => player?.nextVideo?.();
export const previous = () => player?.previousVideo?.();
export const playVideoAt = (index: number) => player?.playVideoAt?.(index);

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}
