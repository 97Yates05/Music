export default {
  //存入用户ID
  updateUserId(state, userId) {
    state.userId = userId;
  },
  //存入账户信息
  updateUserDetail(state, userInfo) {
    state.userDetail = { ...userInfo };
  },
  //存入当前播放列表
  updatePlayDetail(state, newPlayDetail) {
    state.playDetail = newPlayDetail;
  },
  updatePlayIndex(state, index) {
    state.playDetail.index = index;
  },
  //存入当前用户播放记录列表
  updateUserRecords(state, userRecords) {
    state.userRecords = userRecords;
  },
  //存入当前歌曲播放状态
  updateIsPlay(state, isPlay) {
    state.isPlay = isPlay;
  }
};
