<template>
  <div class="row full-height">
    <q-card class="col-6 flex column" flat>
      <q-item class="items-start">
        <q-img
          class="self-center"
          :src="selectSong.al.picUrl"
          :ratio="1"
          style="width: 200px"
        ></q-img>
        <q-item-section>
          <q-item
            ><div class="text-h6">
              {{ selectSong.name
              }}<q-badge align="middle" outline color="accent">单曲</q-badge>
            </div></q-item
          >
          <q-item>
            <q-item-section
              ><q-item-label
                ><span class="text-primary">{{ selectSong.ar[0].name }}</span
                ><span class="q-ml-md"
                  >{{ selectSong.publishTime | toDate }}发行</span
                ></q-item-label
              ></q-item-section
            >
          </q-item>
        </q-item-section>
      </q-item>
      <q-scroll-area class="col" :thumb-style="thumbStyle">
        <div
          v-for="(item, index) in lyc"
          :key="index"
          class="text-center"
          ref="lrc"
        >
          <span>{{ item[1] }}</span>
        </div></q-scroll-area
      >
    </q-card>
    <div class="col-6 q-mt-md flex column">
      <q-tabs v-model="tab" dense class="text-primary">
        <q-tab name="hotComments" label="精彩评论" />
        <q-tab name="comments" label="最新评论" />
      </q-tabs>
      <q-scroll-area class="col" :thumb-style="thumbStyle">
        <q-tab-panels v-model="tab">
          <q-tab-panel name="hotComments">
            <q-item v-for="(item, index) in comments.hotComments" :key="index">
              <q-item-section avatar>
                <q-avatar><q-img :src="item.user.avatarUrl"> </q-img></q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-secondary"
                  >{{ item.user.nickname }}
                </q-item-label>
                <q-item-label class="text-overline text-caption"
                  >{{ item.content }}
                </q-item-label>
                <q-item-label>
                  <q-btn flat>
                    <my-icon icon-name="#alilike" color="red" />
                  </q-btn>
                  <span class="text-caption">{{ item.likedCount }}</span>
                  <span class="text-caption q-ml-md"
                    >{{ item.time | toDate }}
                  </span>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-tab-panel>
          <q-tab-panel name="comments">
            <q-item v-for="(item, index) in comments.comments" :key="index">
              <q-item-section avatar>
                <q-avatar><q-img :src="item.user.avatarUrl"> </q-img></q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-primary"
                  >{{ item.user.nickname }}
                </q-item-label>
                <q-item-label class="text-overline text-caption"
                  >{{ item.content }}
                </q-item-label>
                <q-item-label>
                  <q-btn flat>
                    <my-icon icon-name="#alilike" color="red" />
                  </q-btn>
                  <span class="text-caption">{{ item.likedCount }}</span>
                  <span class="text-caption q-ml-md"
                    >{{ item.time | toDate }}
                  </span>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-tab-panel>
        </q-tab-panels>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
import { getCommentMusic, getLyric } from "src/api/api";
import { mapState, mapMutations } from "vuex";
import MyIcon from "./my-icon";
export default {
  name: "SongDetail",
  components: { MyIcon },
  data() {
    return {
      tab: "hotComments",
      comments: { hotComments: [], comments: [] },
      lyc: [],
      current: 31
    };
  },
  created() {
    this.initData();
  },
  methods: {
    ...mapMutations(["updateCurrentTime"]),
    async initData() {
      this.comments = await getCommentMusic(this.playDetail.playlists[0].id);
      let temp = await getLyric(this.playDetail.playlists[0].id);
      this.lyc = this.toLyc(temp);
      this.$nextTick(function() {
        this.$refs.lrc[0].classList.add("text-h6");
      });
    },
    toLyc: function(item) {
      let lines = item.split("\n");
      let pattern = /\[\d{2}:\d{2}.\d+]/g;
      let result = [];
      while (!pattern.test(lines[0])) {
        lines = lines.slice(1);
      }
      lines[lines.length - 1].length === 0 && lines.pop();
      // eslint-disable-next-line no-console
      console.log(lines);
      lines.forEach(function(v) {
        let time = v.match(pattern);
        let value = v.replace(pattern, "");
        result.push();
        time.forEach(function(v1) {
          let t = v1.slice(1, -1).split(":");
          result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
        });
      });
      result.sort(function(a, b) {
        return a[0] - b[0];
      });
      return result;
    }
  },
  computed: {
    ...mapState(["userId", "playDetail", "currentTime"]),
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
  },
  watch: {
    selectSong: {
      handler() {
        this.updateCurrentTime(0);
        this.initData();
      },
      deep: true
    },
    currentTime(newValue) {
      this.lyc.forEach((value, index) => {
        if (Math.round(value[0]) === newValue) {
          this.$refs.lrc[index - 1].classList.remove("text-h6");
          this.$refs.lrc[index].classList.add("text-h6");
          return "";
        }
      });
    }
  }
};
</script>

<style scoped>
.font {
  font-size: 25px;
}
</style>
