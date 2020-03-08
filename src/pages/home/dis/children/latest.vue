<template>
  <div class="full-height q-px-md flex column">
    <div class="row">
      <q-btn-toggle
        v-model="newSongType"
        size="12px"
        flat
        :options="options"
        toggle-color="primary"
      />
    </div>
    <q-scroll-area class="col" :thumb-style="thumbStyle">
      <q-list>
        <q-card
          class="q-mx-md q-my-xs"
          v-for="(item, index) of newSongList.slice(
            (currentPage - 1) * 20,
            currentPage * 20
          )"
          :key="index"
        >
          <q-item clickable @click="play(index)">
            <q-item-section avatar>
              <q-avatar rounded>
                <img :src="item.album.picUrl" />
              </q-avatar>
            </q-item-section>
            <q-item-section>{{ item.name }}</q-item-section>
            <q-item-section>{{ item.artists[0].name }}</q-item-section>
            <q-item-section>{{ item.album.name }}</q-item-section>
            <q-item-section>{{ item.duration | toTime }}</q-item-section>
          </q-item>
        </q-card>
      </q-list>
    </q-scroll-area>
    <div class="q-pa-lg flex flex-center">
      <q-pagination v-model="currentPage" :direction-links="true" :max="5" />
    </div>
  </div>
</template>

<script>
import { getNewSongList } from "src/api/api";
import { mapMutations } from "vuex";
export default {
  name: "Latest",
  data() {
    return {
      newSongType: "0",
      options: [
        { label: "全部", value: "0" },
        { label: "华语", value: "7" },
        { label: "欧美", value: "96" },
        { label: "日本", value: "8" },
        { label: "韩国", value: "16" }
      ],
      newSongList: [],
      currentPage: 1
    };
  },
  mounted() {},
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
      ({ data: this.newSongList } = await getNewSongList(this.newSongType));
      Object.freeze(this.newSongList);
    },
    play(index) {
      this.updatePlayDetail({
        index: index,
        playlists: this.newSongList
      });
    }
  },
  watch: {
    newSongType: {
      handler() {
        this.initData();
      },
      immediate: true
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

<style scoped></style>
