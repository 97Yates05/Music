<template>
  <div class="row q-col-gutter-md q-pa-md full-height">
    <div class="col-3 full-height flex column">
      <q-card class="bg-transparent" flat>
        <q-card-section class="flex justify-center">
          <q-avatar
            ><q-img :src="singerSong.artist.picUrl" alt="avatar"></q-img
          ></q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="text-h6 text-center">
            {{ singerSong.artist.name
            }}<q-badge align="middle" outline color="accent">歌手页</q-badge>
          </div>
          <div class="row text-caption justify-center">
            <span class="q-mx-md"
              >单曲数:{{ singerSong.artist.musicSize }}</span
            >
            <q-separator vertical></q-separator>
            <span class="q-mx-md"
              >专辑数:{{ singerSong.artist.albumSize }}</span
            >
            <q-separator vertical></q-separator>
            <span class="q-mx-md">MV数:{{ singerSong.artist.mvSize }}</span>
          </div>
        </q-card-section>
      </q-card>
      <div
        v-if="singerMVs.mvs.length !== 0"
        class="q-my-md bg-transparent col flex column"
      >
        <div class="text-subtitle2">
          热门MV
        </div>
        <q-scroll-area class="col" :thumb-style="thumbStyle">
          <div class="row q-col-gutter-md">
            <div
              class="col-6 cursor-pointer"
              v-for="(item, index) in singerMVs.mvs"
              :key="index"
              @click="toMV(item.id)"
            >
              <q-img :src="item.imgurl" class="rounded-borders"></q-img>
              <div class="text-subtitle2">{{ item.name }}</div>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>
    <div class="col-9 full-height flex column">
      <div class="text-subtitle2">热门50首</div>
      <q-card style="height: 320px;" class="bg-transparent" flat>
        <q-scroll-area style="height: 250px" :thumb-style="thumbStyle">
          <q-list>
            <q-card
              class="q-my-xs q-mx-md"
              v-for="(item, index) in singerSong.hotSongs"
              :key="index"
              @click="play(index)"
            >
              <q-item clickable>
                <q-item-section>{{ item.name }}</q-item-section>
                <q-item-section>{{ item.al.name }}</q-item-section>
                <q-item-section>{{ item.dt | toTime }}</q-item-section>
              </q-item>
            </q-card>
          </q-list>
        </q-scroll-area>
      </q-card>
      <div class="text-subtitle2">歌手详情</div>
      <q-scroll-area class="col" :thumb-style="thumbStyle">
        <q-card class="q-mt-md bg-transparent" flat>
          <q-card-section v-if="singerDescription.introduction.length === 0">
            <div class="text-overline">{{ singerSong.artist.name }}简介</div>
            <div class="text-caption">{{ singerDescription.briefDesc }}</div>
          </q-card-section>
          <q-card-section
            v-for="(item, index) in singerDescription.introduction"
            :key="index"
          >
            <div class="text-overline">{{ item.ti }}</div>
            <div class="text-caption">{{ item.txt }}</div>
          </q-card-section>
        </q-card>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
import { singerSong, singerMV, singerDescription } from "src/api/api";
import { mapMutations } from "vuex";
export default {
  name: "SingerDetail",
  data() {
    return {
      singerSong: {
        artist: {
          name: "",
          picUrl: "",
          musicSize: 0,
          albumSize: 0,
          mvSize: 0,
          briefDesc: ""
        },
        hotSongs: []
      },
      singerDescription: {
        introduction: [],
        briefDesc: ""
      },
      singerMVs: { mvs: [] }
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapMutations(["updatePlayDetail"]),
    async initData() {
      this.singerSong = await singerSong(this.$route.params.singerId);
      this.singerDescription = await singerDescription(
        this.$route.params.singerId
      );
      this.singerMVs = await singerMV(this.$route.params.singerId);
    },
    toMV(id) {
      this.$router.push({
        name: "mv",
        params: { mvId: id }
      });
    },
    play(index) {
      this.updatePlayDetail({
        index: index,
        playlists: this.singerSong.hotSongs
      });
    }
  },
  computed: {
    thumbStyle() {
      return {
        right: "2px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75
      };
    }
  },
  watch: {
    $route() {
      //监听路由是否变化
      if (this.$route.params.singerId) {
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
    toPages: function(item) {
      return Math.ceil(item / 30);
    }
  }
};
</script>

<style scoped></style>
