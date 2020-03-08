<template>
  <q-scroll-area
    class="full-width full-height q-px-md"
    :thumb-style="thumbStyle"
  >
    <div class="q-mt-md text-subtitle1 text-bold">推荐歌单</div>
    <div class="row q-col-gutter-md">
      <div
        class="col-2 cursor-pointer hvr-grow"
        v-for="(item, index) in playList.slice(0, 12)"
        :key="index"
      >
        <div class="full-height" @click="toPlaylist(item.id)">
          <q-img :src="item.picUrl" class="rounded-borders" />
          <div class="text-subtitle2">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="text-subtitle1 text-bold q-mt-md">
          最新音乐({{ newSongList.length }}首)
        </div>
        <q-list>
          <!--          <q-item>-->
          <!--            <q-item-section avatar>-->
          <!--              <my-icon icon-name="#aliname" />-->
          <!--            </q-item-section>-->
          <!--            <q-item-section />-->
          <!--            <q-item-section>-->
          <!--              <my-icon icon-name="#alisinger" />-->
          <!--            </q-item-section>-->
          <!--            <q-item-section>-->
          <!--              <my-icon icon-name="#alialbum" />-->
          <!--            </q-item-section>-->
          <!--            <q-item-section>-->
          <!--              <my-icon icon-name="#aliduration" />-->
          <!--            </q-item-section>-->
          <!--          </q-item>-->
          <q-card
            class="q-mx-md q-my-xs text-grey-8 cursor-pointer"
            v-for="(item, index) in newSongList"
            :key="index"
            @click="play(index)"
          >
            <q-item>
              <q-item-section avatar>
                <q-avatar rounded>
                  <q-img :src="item.picUrl" class="hvr-grow" />
                </q-avatar>
              </q-item-section>
              <q-item-section>{{ item.name }}</q-item-section>
              <q-item-section>{{ item.song.artists[0].name }}</q-item-section>
              <q-item-section>{{ item.song.album.name }}</q-item-section>
              <q-item-section>{{ item.song.duration | toTime }}</q-item-section>
            </q-item>
          </q-card>
        </q-list>
      </div>
      <div class="col-6">
        <div class="text-subtitle1 text-bold q-mt-md">推荐MV</div>
        <div class="row q-col-gutter-md">
          <div
            class="col-6 cursor-pointer hvr-grow"
            v-for="(item, index) in mvList"
            :key="index"
            @click="toMV(item.id)"
          >
            <div class="full-height">
              <q-img :src="item.picUrl" class="rounded-borders"></q-img>
              <div class="text-subtitle2">{{ item.name }}</div>
              <div class="text-caption">{{ item.copywriter }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-scroll-area>
</template>

<script>
import { apiPlayList, apiNewSongList, apiMVList } from "src/api/api";
import { mapMutations } from "vuex";
export default {
  name: "Individuality",
  data() {
    return {
      playList: [{ picUrl: "", id: 0, name: "" }],
      newSongList: [
        {
          picUrl: "",
          name: "",
          song: {
            artists: [{ name: "" }],
            album: { name: "" },
            duration: 0
          }
        }
      ],
      mvList: [{ id: 0, picUrl: "", name: "", copywriter: "" }]
    };
  },
  mounted() {
    this.initData();
  },
  computed: {
    //滚动条样式
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
      [
        { result: this.playList },
        { result: this.newSongList },
        { result: this.mvList }
      ] = await Promise.all([apiPlayList(12), apiNewSongList(), apiMVList()]);
    },
    //导航到歌单页面
    toPlaylist(id) {
      this.$router.push({
        name: "playlist",
        params: { playlistId: id }
      });
    },
    //导航到MV页面
    toMV(id) {
      this.$router.push({
        name: "mv",
        params: { mvId: id }
      });
    },
    //将歌曲添加到播放列表
    play(index) {
      this.updatePlayDetail({
        index: index,
        playlists: this.newSongList.map(item => item.song)
      });
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
    }
  }
};
</script>

<style scoped>
.hvr-grow {
  display: inline-block;
  vertical-align: middle;
  transform: translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  backface-visibility: hidden;
  -moz-osx-font-smoothing: grayscale;
  transition-duration: 0.3s;
  transition-property: transform;
}

.hvr-grow:hover,
.hvr-grow:focus,
.hvr-grow:active {
  transform: scale(1.1);
}
</style>
