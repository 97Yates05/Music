<template>
  <div class="home row content-center q-px-md">
    <q-card class="drawer col-2 flex column">
      <q-list class="col">
        <q-img src="../../assets/logo.png"></q-img>
        <q-item class="text-center text-h6">MD音乐</q-item>
        <q-item class="text-center text-caption">
          简单，纯粹
        </q-item>
        <q-item
          class="mt-4"
          v-for="item in items"
          :key="item.name"
          link
          :to="item.to"
        >
          <q-item-section avatar>
            <my-icon :icon-name="item.icon"></my-icon>
          </q-item-section>
          <q-item-section
            ><q-item-label>{{ item.name }} </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
    <q-dialog v-model="seamless" seamless position="right">
      <q-card style="width: 350px;height: 70vh" class="flex column">
        <div class="text-h6 q-my-md q-px-md">
          播放列表
          <q-badge color="accent" align="top">{{ songs.length }}</q-badge>
        </div>
        <q-scroll-area class="col" :thumb-style="thumbStyle">
          <q-item
            v-for="(item, index) in songs"
            :key="index"
            clickable
            @click="play(index)"
          >
            <q-item-section>{{ item.name }}</q-item-section>
            <q-item-section>{{ item.artist }}</q-item-section>
            <q-item-section>{{ item.duration | toTime }}</q-item-section>
          </q-item>
        </q-scroll-area>
      </q-card>
    </q-dialog>
    <div class="col-10 drawer">
      <!--二级页面路由出口-->
      <div class="main-page q-px-md">
        <keep-alive exclude="fm"><router-view /></keep-alive>
      </div>
      <div class="footer row q-px-md items-stretch">
        <aplayer
          class="col"
          ref="player"
          :audio="audio"
          :lrc-type="1"
          @play="start"
          @pause="pause"
        />
        <q-btn class="q-ma-xs" @click="seamless = !seamless">
          <my-icon icon-name="#alilist" />
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { getLyric } from "../../api/api";
import MyIcon from "../../components/my-icon";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Home",
  components: { MyIcon },
  data() {
    return {
      seamless: false,
      songs: [],
      audio: {
        url: "",
        name: "",
        artist: "",
        cover: "",
        lrc: ""
      },
      items: [
        { name: "发现音乐", icon: "#alidis", to: "/music/home/dis" },
        { name: "私人FM", icon: "#alifm", to: "/music/home/fm" },
        { name: "最近播放", icon: "#alidongtai", to: "/music/home/dynamic" },
        {
          name: "我的",
          icon: "#alimine",
          to: `/music/home/mine/myself/${this.$store.state.userId}`
        }
      ]
    };
  },
  mounted() {
    this.initData();
  },
  computed: {
    ...mapState(["userId", "playDetail", "userRecords"]),
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
  watch: {
    playDetail: {
      handler(newValue) {
        //传入的歌单列表格式不同，需统一处理
        this.songs = newValue.playlists.map(item => {
          if (item.al !== undefined) {
            return {
              id: item.id,
              url:
                "https://music.163.com/song/media/outer/url?id=" +
                item.id +
                ".mp3",
              name: item.name,
              artist: item.ar[0].name,
              cover: item.al.picUrl,
              duration: item.dt
            };
          } else {
            return {
              id: item.id,
              url:
                "https://music.163.com/song/media/outer/url?id=" +
                item.id +
                ".mp3",
              name: item.name,
              artist: item.artists[0].name,
              cover: item.album.blurPicUrl,
              duration: item.duration
            };
          }
        });
        this.play(newValue.index);
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations(["updateUserRecords", "updatePlayIndex", "updateIsPlay"]),
    async initData() {
      if (this.userId) {
        // let userRecords = await getUserRecord(this.userId, 1);
        // let weekData = userRecords.weekData.map(value => value.song);
      } else {
        // eslint-disable-next-line no-console
        console.log("error");
      }
    },
    play(index) {
      this.updatePlayIndex(index);
      this.$set(this.audio, "url", this.songs[index].url);
      this.$set(this.audio, "name", this.songs[index].name);
      this.$set(this.audio, "artist", this.songs[index].artist);
      this.$set(this.audio, "cover", this.songs[index].cover);
      getLyric(this.songs[index].id).then(res => {
        this.$set(this.audio, "lrc", res);
      });
    },
    start() {
      this.updateIsPlay(true);
    },
    pause() {
      this.updateIsPlay(false);
    }
  },
  filters: {
    //将时间格式化为（分:秒）形式
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
<style scoped type="scss">
.home {
  min-height: 100%;
}
.drawer {
  height: 96vh;
  background-color: #fcfcfc;
}
.main-page {
  height: 84vh;
}
.footer {
  /*height: 12vh;*/
}
.aplayer-list {
  position: absolute;
  bottom: 0;
}

.page {
  border-top-left-radius: 10px;
}
</style>
