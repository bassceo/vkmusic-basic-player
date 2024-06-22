import { Image, Div, Tappable } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon24MoreVertical } from '@vkontakte/icons';
import useSound from 'use-sound';
import { useEffect, useState, useRef } from 'react';
import './Track.css';

const Track = ({ track, trackName, artist, coverUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayed, setIsPlayed] = useState(false);
  const [play, { pause, duration, sound }] = useSound(track, {
    onend: () => {
      setIsPlaying(false);
      sound.seek(0);
    }
  });
  const [currTime, setCurrTime] = useState({ min: '0', sec: '00' });
  const [seconds, setSeconds] = useState(0);
  const [trackDuration, setTrackDuration] = useState(null);

  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
      setIsPlayed(true);
    }
  };

  useEffect(() => {
    if (sound) {
      setTrackDuration(duration);
      const interval = setInterval(() => {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min: min.toString(),
          sec: sec < 10 ? '0' + sec : sec.toString(),
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [sound, duration]);

  const formatDuration = (duration) => {
    const min = Math.floor(duration / 60000);
    const sec = Math.floor((duration % 60000) / 1000);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  };

  return (
    <div id="track">
      <Tappable activeMode="background" hasActive onClick={playingButton}>
        <Div className="track-container">
          <Image className={isPlaying ? "track-cover active-cover" : "track-cover"} src={coverUrl} size={40} />
          <div className="track-info">
            <div className='track-name'>{trackName}</div>
            <div className="track-artist">{artist}</div>
          </div>
          <div className="track-controls">
            <div className="track-time">
              {isPlayed ? `${currTime.min}:${currTime.sec}` : formatDuration(trackDuration)}
            </div>
            <Icon24MoreVertical color="#2688EB" />
          </div>
        </Div>
      </Tappable>
    </div>
  );
};

export default Track;