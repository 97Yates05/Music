import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);

const state = {
  userId: "",
  userDetail: {},
  playDetail: { index: 0, playlists: [] },
  userRecords: [],
  isPlay: false
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
