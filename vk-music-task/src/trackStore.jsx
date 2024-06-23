import { makeAutoObservable } from 'mobx';

class TrackStore {
  tracks = new Map();

  constructor() {
    makeAutoObservable(this);
  }

  addTrack(id, trackData) {
    if (!this.tracks.has(id)) {
      this.tracks.set(id, { ...trackData, currentTime: 0 });
    }
  }

  updateTrackTime(id, time) {
    if (this.tracks.has(id)) {
      this.tracks.get(id).currentTime = time;
    }
  }

  getTrack(id) {
    return this.tracks.get(id);
  }

  getTrackTime(id) {
    if (this.tracks.has(id)) {
      return this.tracks.get(id).currentTime;
    }
    return 0;
  }
}

const trackStore = new TrackStore();
export default trackStore;