/* eslint-disable consistent-return */
import Hls from 'hls.js';
import React, { useRef, useEffect } from 'react';

interface HlsPlayerProps {
  src: string;
  poster?: string;
}

const HlsPlayer: React.FC<HlsPlayerProps> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('Error en hls.js:', data);
      });

      return () => {
        hls.destroy();
      };
    } else {
      console.error('El navegador no soporta HLS ni hls.js.');
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      muted
      playsInline
      poster={poster}
      style={{ width: '100%', height: 'auto' }}
    />
  );
};

export default HlsPlayer;
