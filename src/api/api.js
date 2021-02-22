/**
 * api接口统一管理
 */
import http from "./http";
const baseUrl = "http://localhost:4000";

//登陆接口
export const apiLogin = (phone, password) =>
  http({
    url: "/login/cellphone",
    method: "get",
    params: {
      phone: phone,
      password: password
    },
    baseURL: baseUrl
  });
//用户详情
export const apiUserDetail = uid =>
  http({
    url: "/user/detail",
    method: "get",
    params: {
      uid: uid
    },
    baseURL: baseUrl
  });
//推荐歌单
export const apiPlayList = limit =>
  http({
    url: "/personalized",
    method: "get",
    params: {
      limit: limit
    },
    baseURL: baseUrl
  });
//推荐新歌
export const apiNewSongList = () =>
  http({
    url: "/personalized/newsong",
    method: "get",
    baseURL: baseUrl
  });
//推荐MV
export const apiMVList = () =>
  http({
    url: "/personalized/mv",
    method: "get",
    baseURL: baseUrl
  });
//排行榜列表
export const apiTopList = () =>
  http({
    url: "/toplist",
    method: "get",
    baseURL: baseUrl
  });
//查询歌手
export const apiSingerList = (cat, limit, initial, offset) =>
  http({
    url: "/artist/list",
    method: "get",
    baseURL: baseUrl,
    params: {
      cat: cat,
      limit: limit,
      initial: initial,
      offset: offset
    }
  });
//查询歌手单曲
export const singerSong = id =>
  http({
    url: "/artists",
    method: "get",
    baseURL: baseUrl,
    params: {
      id: id
    }
  });
//查询歌手mv
export const singerMV = id =>
  http({
    url: "/artist/mv",
    method: "get",
    baseURL: baseUrl,
    params: {
      id: id
    }
  });
//获取mv详细信息
export const mvDetail = id =>
  http({
    url: "/mv/detail",
    method: "get",
    baseURL: baseUrl,
    params: {
      mvid: id
    }
  });
//获取mv地址
export const mvUrl = id =>
  http({
    url: "/mv/url",
    method: "get",
    baseURL: baseUrl,
    params: {
      id: id
    }
  });
//获取评论
export const getComment = id =>
  http({
    url: "/comment/event",
    method: "get",
    baseURL: baseUrl,
    params: {
      threadId: id
    }
  });
//获取歌曲评论
export const getCommentMusic = (id, offset) =>
  http({
    url: "/comment/music",
    method: "get",
    baseURL: baseUrl,
    params: {
      id: id,
      offset: offset
    }
  });
//查询歌手详情
export const singerDescription = id =>
  http({
    url: "/artist/desc",
    method: "get",
    baseURL: baseUrl,
    params: {
      id: id
    }
  });
//查询新歌
export const getNewSongList = type =>
  http({
    url: "/top/song",
    method: "get",
    baseURL: baseUrl,
    params: {
      type: type
    }
  });
//搜索默认关键词
export const getDefaultKeyWord = () =>
  http({
    url: "/search/default",
    method: "get",
    baseURL: baseUrl
  });
//热搜列表
export const getSearchHot = () =>
  http({
    url: "/search/hot",
    method: "get",
    baseURL: baseUrl
  });
//搜索（以关键字按不同类型搜索,type取值意义 : 1: 单曲, 10: 专辑, 100: 歌手,
//1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合）
export const getSearchResult = (keywords, type, offset) =>
  http({
    url: "/search",
    method: "get",
    baseURL: baseUrl,
    params: {
      keywords: keywords,
      type: type,
      offset: offset
    }
  });
//获得关注列表
export const getFollows = uid =>
  http({
    url: "/user/follows",
    method: "get",
    baseURL: baseUrl,
    params: {
      uid: uid
    }
  });
//获得粉丝列表
export const getFolloweds = uid =>
  http({
    url: "/user/followeds",
    method: "get",
    baseURL: baseUrl,
    params: {
      uid: uid
    }
  });
//获得用户所有歌单（简略）
export const getPlaylist = uid =>
  http({
    url: "/user/playlist",
    method: "get",
    baseURL: baseUrl,
    params: {
      uid: uid
    }
  });
//获得歌单详情
export const getPlaylistDetail = id =>
  http({
    url: "/playlist/detail",
    method: "get",
    baseURL: baseUrl,
    params: {
      id: id
    }
  });
//获取用户播放记录
export const getUserRecord = (uid, type) =>
  http({
    url: "/user/record",
    method: "get",
    baseURL: baseUrl,
    params: {
      uid: uid,
      type: type
    }
  });
//获取音乐url
export const getSongUrl = id =>
  http({
    url: "/song/url",
    method: "get",
    baseURL: baseUrl,
    params: {
      id: id
    }
  });
//私人FM
export const fm = timestamp =>
  http({
    url: "/personal_fm",
    method: "get",
    baseURL: baseUrl,
    params: {
      timestamp: timestamp
    }
  });
//获取歌曲详情
export const songDetail = id =>
  http({
    url: "/song/detail",
    method: "get",
    baseURL: baseUrl,
    params: {
      ids: id
    }
  });
//获取歌词
export const getLyric = id =>
  http({
    url: "/lyric",
    method: "get",
    baseURL: baseUrl,
    params: {
      id: id
    }
  });
