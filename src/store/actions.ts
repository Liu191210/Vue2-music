import { ActionTree } from "vuex";
const actions: ActionTree<any, any> = {
  setHeadIndex({ commit }, index: number): void {
    commit("SETHEADINDEX", index);
  },
  appendMusic({ commit }, music: setStore.music): void {
    commit("APPENDMUSIC", music);
  },
  spliceMusic({ commit }, index: number): void {
    commit("SPLICEMUSIC", index);
  },
  nextMusic({ commit }, music: setStore.music): void {
    commit("NEXTMUSIC", music);
  },
  setCurrent({ commit }, index: number): void {
    commit("SETCURRENT", index);
  },
  pushAll({ commit }, music: setStore.music[]): void {
    commit("PUSHALLMUSIC", music);
  },
  setPlayState({ commit }, state: number): void {
    commit("SETPLAYSTATE", state);
  },
  setPlayMode({ commit }, state: number): void {
    commit("SETPLAYMODE", state);
  }
};
export default actions;
