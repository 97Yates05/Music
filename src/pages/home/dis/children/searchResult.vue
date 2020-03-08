<template>
  <div class="row column full-height">
    <div class="text-h6">
      关于<span class="text-primary">{{ this.$route.params.keyword }}</span
      >找到条<span class="text-primary">{{ songCount }}</span
      >搜索结果
    </div>
    <q-scroll-area class="col" :thumb-style="thumbStyle">
      <q-list v-if="songCount !== 0">
        <q-item>
          <q-item-section>名字</q-item-section>
          <q-item-section>歌手</q-item-section>
          <q-item-section>专辑</q-item-section>
          <q-item-section>时长</q-item-section>
        </q-item>
        <q-item
          v-for="(item, index) in songList"
          :key="index"
          clickable
          @click="play(index)"
        >
          <q-item-section>{{ item.name }}</q-item-section>
          <q-item-section>{{ item.artists[0].name }}</q-item-section>
          <q-item-section>{{ item.album.name }}</q-item-section>
          <q-item-section>{{ item.duration | toTime }}</q-item-section>
        </q-item>
      </q-list>
      <div v-if="songCount === 0" class="text-center">
        无搜索结果
      </div>
    </q-scroll-area>
    <div v-if="songCount !== 0" class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="currentPage"
        direction-links
        :max-pages="6"
        :boundary-numbers="false"
        :max="songCount | toPages"
      />
    </div>
  </div>
</template>

<script>
import { getSearchResult, songDetail } from "src/api/api";
import { mapMutations } from "vuex";
export default {
  name: "SearchResult",
  data() {
    return {
      songList: [],
      currentPage: 1,
      songCount: 0
    };
  },
  created() {
    this.initData(1, 0);
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
    async initData(type, offset) {
      ({
        result: { songs: this.songList, songCount: this.songCount }
      } = await getSearchResult(this.$route.params.keyword, type, offset));
      if (this.songCount === 0) this.songList = [];
    },
    //播放选中歌曲
    async play(index) {
      let temp = await songDetail(this.songList[index].id);
      this.updatePlayDetail({
        index: 0,
        playlists: [temp.songs[0]]
      });
    }
  },
  watch: {
    $route() {
      //监听路由是否变化
      if (this.$route.params.keyword) {
        this.initData();
      }
    },
    currentPage: {
      handler(newValue) {
        this.initData(1, newValue - 1);
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
    toPages: function(item) {
      return Math.ceil(item / 30);
    }
  }
};
</script>

<style scoped></style>
