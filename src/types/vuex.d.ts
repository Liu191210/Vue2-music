declare namespace setStore {
  interface music {
    id: string | number; // 当前播放id
    data?: any[]; // 播放列表
    details: details; // 当前播放作者数据
    music: musicList; // 当前播放歌曲数据
  }
  interface details {
    name: string;
    singer: string;
  }
  interface musicList {
    audio: string;
    pic: string;
  }
  interface stroe {
    currentIndex: number;
    musicList?: music;
    currentAudioIndex?: number;
    playState: number;
    playMode: number;
  }
}
