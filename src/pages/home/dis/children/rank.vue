<template>
  <q-scroll-area
    class="full-height full-width q-px-md"
    :thumb-style="thumbStyle"
  >
    <div class="row q-col-gutter-md q-pa-md">
      <div
        v-for="(item, index) in topList"
        :key="index"
        class="col-2 cursor-pointer"
        @click="toPlaylist(item.id)"
      >
        <q-img :src="item.coverImgUrl" class="rounded-borders hvr-grow"></q-img>
      </div>
    </div>
  </q-scroll-area>
</template>

<script>
import { apiTopList } from "src/api/api";
export default {
  name: "Rank",
  data() {
    return {
      topList: [{ id: null, coverImgUrl: null }]
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
    async initData() {
      ({ list: this.topList } = await apiTopList());
    },
    toPlaylist(id) {
      this.$router.push({
        name: "playlist",
        params: { playlistId: id }
      });
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
