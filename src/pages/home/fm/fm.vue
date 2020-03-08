<template>
  <div class="row full-height">
    <div class="col-6 flex column items-center">
      <q-item class="items-start">
        <q-item-section>
          <q-item
            ><div class="text-h6">
              {{ currentSong.name
              }}<q-badge align="middle" outline color="accent">单曲</q-badge>
            </div></q-item
          >
          <q-item>
            <q-item-section
              ><q-item-label
                ><span class="text-primary">{{ currentSong.artist }}</span
                ><span class="q-ml-md"
                  >时长{{ currentSong.duration | toTime }}</span
                ></q-item-label
              ></q-item-section
            >
          </q-item>
        </q-item-section>
      </q-item>
      <div class="flex items-center q-mt-xl">
        <q-btn flat class="" @click="last">
          <my-icon icon-name="#alilast" />
        </q-btn>
        <q-img
          class="self-center"
          style="width: 300px"
          :class="{ rotate: isPlay }"
          :src="currentSong.cover"
          :ratio="1"
        >
        </q-img>
        <q-btn flat class="" @click="next">
          <my-icon icon-name="#alinext" />
        </q-btn>
      </div>
    </div>
    <div class="col-6 q-mt-md flex column full-height">
      <div class="text-h6">
        <span
          >听友评论<q-badge color="accent" align="top">{{
            this.comments.total
          }}</q-badge>
        </span>
      </div>
      <q-tabs v-model="tab" dense class="text-primary">
        <q-tab name="hotComments" label="精彩评论"> </q-tab>
        <q-tab name="comments" label="最新评论"> </q-tab>
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
            <div class="q-pa-lg flex flex-center">
              <q-pagination
                v-model="currentPage"
                :max-pages="6"
                direction-links
                :max="this.comments.total | toPages"
                :boundary-numbers="false"
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
import { fm, getCommentMusic } from "src/api/api";
import { mapState, mapMutations } from "vuex";
import MyIcon from "src/components/my-icon";
export default {
  name: "Fm",
  components: { MyIcon },
  data() {
    return {
      currentSong: {
        cover: "",
        name: "",
        artist: "",
        duration: "",
        like: false
      },
      playIcon: "#aliplay",
      tab: "hotComments",
      comments: { hotComments: [], comments: [] },
      currentPage: 1
    };
  },
  activated() {
    this.initData();
  },
  computed: {
    ...mapState(["playDetail", "isPlay"]),
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
    ...mapMutations(["updatePlayDetail", "updatePlayIndex"]),
    async initData() {
      let res = await fm(new Date().getTime());
      this.updatePlayDetail({
        index: 0,
        playlists: res.data
      });
    },
    async updateData(offset) {
      this.comments = await getCommentMusic(this.currentSong.id, offset);
    },
    last() {
      if (this.playDetail.index === 0) {
        this.initData();
      } else {
        this.updatePlayIndex(this.playDetail.index - 1);
      }
    },
    next() {
      if (this.playDetail.index === this.playDetail.playlists.length - 1) {
        this.initData();
      } else {
        this.updatePlayIndex(this.playDetail.index + 1);
      }
    }
    //todo 歌词功能暂定
    // toLyc: function(item) {
    //   let lines = item.split("\n");
    //   let pattern = /\[\d{2}:\d{2}.\d+]/g;
    //   let result = [];
    //   while (!pattern.test(lines[0])) {
    //     lines = lines.slice(1);
    //   }
    //   lines[lines.length - 1].length === 0 && lines.pop();
    //   lines.forEach(function(v) {
    //     let time = v.match(pattern);
    //     let value = v.replace(pattern, "");
    //     result.push();
    //     time.forEach(function(v1) {
    //       let t = v1.slice(1, -1).split(":");
    //       result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
    //     });
    //   });
    //   result.sort(function(a, b) {
    //     return a[0] - b[0];
    //   });
    //   return result;
    // }
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
    },
    toPages: function(item) {
      return Math.ceil(item / 20);
    }
  },
  watch: {
    playDetail: {
      handler(newValue) {
        //传入的歌单列表格式不同，需统一处理
        let temp = newValue.playlists[newValue.index];
        if (temp.al !== undefined) {
          this.currentSong = {
            id: temp.id,
            name: temp.name,
            artist: temp.ar[0].name,
            cover: temp.al.picUrl,
            duration: temp.dt
          };
        } else {
          this.currentSong = {
            id: temp.id,
            name: temp.name,
            artist: temp.artists[0].name,
            cover: temp.album.blurPicUrl,
            duration: temp.duration
          };
        }
        this.updateData(0);
      },
      deep: true
    },
    isPlay(newValue) {
      this.playIcon = newValue ? "#alipause" : "#aliplay";
    },
    currentPage: {
      handler(newValue) {
        this.updateData(newValue - 1);
      }
    }
  }
};
</script>

<style scoped>
.rotate {
  border-radius: 50%;
  animation-name: myfirst;
  animation-duration: 30s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes myfirst {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes myfirst /* Safari 与 Chrome */ {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
