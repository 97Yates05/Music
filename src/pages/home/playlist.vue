<template>
  <q-scroll-area class="full-height" :thumb-style="thumbStyle">
    <div class="row">
      <q-card class="full-width bg-transparent" flat>
        <q-item class="items-start">
          <q-img
            class="self-center rounded-borders"
            :src="playListDetail.playlist.coverImgUrl"
            :ratio="1"
            style="width: 200px"
          ></q-img>
          <q-item-section>
            <q-item>
              <div class="text-h6">
                {{ playListDetail.playlist.name
                }}<q-badge align="middle" outline color="accent">歌单</q-badge>
              </div>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <q-img :src="playListDetail.playlist.creator.avatarUrl">
                  </q-img>
                </q-avatar>
              </q-item-section>
              <q-item-section
                ><q-item-label
                  ><span class="text-primary">{{
                    playListDetail.playlist.creator.nickname
                  }}</span
                  ><span class="q-ml-md"
                    >{{ playListDetail.playlist.createTime | toDate }}创建</span
                  ></q-item-label
                ></q-item-section
              >
            </q-item>
            <q-item v-if="playListDetail.playlist.tags.length !== 0">
              <q-chip
                v-for="(item, index) in playListDetail.playlist.tags"
                :key="index"
                color="primary"
                text-color="white"
                size="sm"
                >{{ item }}</q-chip
              >
            </q-item>
            <q-item-label class="q-mx-md" caption
              >{{ playListDetail.playlist.trackCount }}首歌曲，播放{{
                playListDetail.playlist.playCount
              }}次</q-item-label
            >
            <q-item-label
              class="q-mx-md"
              v-if="playListDetail.playlist.description"
              caption
              lines="2"
            >
              歌单简介:{{ playListDetail.playlist.description }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
      <q-list class="full-width">
        <q-item>
          <q-item-section avatar>名字</q-item-section>
          <q-item-section></q-item-section>
          <q-item-section>歌手</q-item-section>
          <q-item-section>专辑</q-item-section>
          <q-item-section>时长</q-item-section>
          <q-item-section>发行时间</q-item-section>
        </q-item>
        <q-item
          v-for="(item, index) in playListDetail.playlist.tracks.slice(0, 40)"
          :key="item.id"
          clickable
          @click="play(index)"
        >
          <q-item-section avatar>
            <q-avatar rounded>
              <q-img :src="item.al.picUrl"> </q-img>
            </q-avatar>
          </q-item-section>
          <q-item-section>{{ item.name }}</q-item-section>
          <q-item-section>{{ item.ar[0].name }}</q-item-section>
          <q-item-section>{{ item.al.name }}</q-item-section>
          <q-item-section>{{ item.dt | toTime }}</q-item-section>
          <q-item-section>{{ item.publishTime | toDate }}</q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-scroll-area>
</template>

<script>
import { getPlaylistDetail } from "src/api/api";
import { mapMutations } from "vuex";
export default {
  name: "PlayList",
  data() {
    return {
      playListDetail: {
        playlist: {
          coverImgUrl: "",
          name: "",
          creator: { avatarUrl: "", nickname: 0, createTime: 0 },
          tags: [],
          trackCount: 0,
          playCount: 0,
          tracks: [
            {
              id: 0,
              al: {
                picUrl: "",
                name: ""
              },
              ar: [{ name: "" }],
              dt: 0,
              publishTime: 0
            }
          ]
        }
      }
    };
  },
  mounted() {
    this.initData();
  },
  computed: {
    thumbStyle() {
      return {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#247ba0",
        width: "5px",
        opacity: 0.75
      };
    }
  },
  methods: {
    ...mapMutations(["updatePlayDetail"]),
    async initData() {
      this.playListDetail = await getPlaylistDetail(
        this.$route.params.playlistId
      );
    },
    play(index) {
      this.updatePlayDetail({
        index: index,
        playlists: this.playListDetail.playlist.tracks
      });
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      //监听路由是否变化
      if (this.$route.params.playlistId) {
        this.initData();
      }
    }
  },
  filters: {
    toTime: function(item) {
      return (
        parseInt(item / 1000 / 60)
          .toString()
          .padStart(2, "0") +
        ":" +
        Math.round((item / 1000) % 60)
          .toString()
          .padStart(2, "0")
      );
    },
    toDate: function(item) {
      return new Date(item).toLocaleString().slice(0, 9);
    }
  }
};
</script>

<style scoped></style>
