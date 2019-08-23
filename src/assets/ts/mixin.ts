import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class audioData extends Vue {
  getData({ songmid, songname, singer }: any): setStore.music {
    return {
      id: songmid,
      details: {
        name: songname,
        singer: singer[0].name
      }, // 当前播放作者数据
      music: {
        audio: `https://api.bzqll.com/music/tencent/url?id=${songmid}&key=579621905`,
        pic: `https://api.bzqll.com/music/tencent/pic?id=${songmid}&key=579621905`
      } // 当前播放歌曲数据
    };
  }
}
