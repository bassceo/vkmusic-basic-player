import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Image, Tappable, Skeleton } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon20MoreVertical } from '@vkontakte/icons';
import useSound from 'use-sound';
import './Track.css';
import BarChart from './BarChart';
import trackStore from '../trackStore';

const Track = observer(({ trackId, track, trackName, artist, coverUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayed, setIsPlayed] = useState(false);
  const [currTime, setCurrTime] = useState({ min: '0', sec: '00' });
  const [seconds, setSeconds] = useState(0);
  const [soundLoaded, setSoundLoaded] = useState(false);
  const [play, { pause, duration, sound }] = useSound(track, {
    onend: () => {
      setIsPlaying(false);
      setIsPlayed(false);
      if (sound) {
        sound.seek(0);
        trackStore.updateTrackTime(trackId, 0);
      }
    },
    onload: () => setSoundLoaded(true)
  });

  useEffect(() => {
    trackStore.addTrack(trackId, { track, trackName, artist, coverUrl });

    const savedTime = trackStore.getTrackTime(trackId);
    if (savedTime && sound) {
      sound.seek(savedTime);
      setSeconds(savedTime);
      const min = Math.floor(savedTime / 60);
      const sec = Math.floor(savedTime % 60);
      setCurrTime({ min: min.toString(), sec: sec < 10 ? '0' + sec : sec.toString() });
      setIsPlayed(savedTime > 0);
    }
  }, [trackId, track, trackName, artist, coverUrl, sound]);

  const playingButton = () => {
    if (!sound) return; 
    if (isPlaying) {
      pause();
    } else {
      play();
      setIsPlayed(true);
    }
    setIsPlaying(!isPlaying);
    trackStore.updateTrackTime(trackId, sound.seek([]));
  };

  useEffect(() => {
    if (sound) {
      const interval = setInterval(() => {
        const currentTime = sound.seek([]);
        setSeconds(currentTime);
        const min = Math.floor(currentTime / 60);
        const sec = Math.floor(currentTime % 60);
        setCurrTime({ min: min.toString(), sec: sec < 10 ? '0' + sec : sec.toString() });
        trackStore.updateTrackTime(trackId, currentTime);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [sound, trackId]);

  const formatDuration = (duration) => {
    const min = Math.floor(duration / 60000);
    const sec = Math.floor((duration % 60000) / 1000);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  };

  return (
    <Tappable className="tap-track-container" activeMode="background" hasActive onClick={playingButton}>
      <div id="track">
        {soundLoaded ? (
          <div className="track-container">
            <Image className={isPlaying ? "track-cover active-cover" : "track-cover"} src={coverUrl} size={40} />
            {isPlaying && <BarChart className="barChart" />}
            <div className="track-info">
              <div className="track-name">{trackName}</div>
              <div className="track-artist">{artist}</div>
            </div>
            <div className="track-controls">
              <div className="track-time">
                {isPlayed ? `${currTime.min}:${currTime.sec}` : formatDuration(duration)}
              </div>
              <Icon20MoreVertical color="#2688EB" className="moreIcon" />
            </div>
          </div>
        ) : (
          <div className="track-container">
            <Skeleton height={40} width={40} borderRadius="50%" />
            <div className="track-info">
              <Skeleton height={20} width="70%" />
              <Skeleton height={20} width="50%" />
            </div>
            <div className="track-controls">
              <Skeleton height={20} width={30} />
            </div>
          </div>
        )}
      </div>
    </Tappable>
  );
});

export default Track;