<template>
  <div class="row q-ma-md overflow-hidden">
    <q-card class="col-12 bg-transparent" flat>
      <q-item class="items-start">
        <q-img
          class="self-center rounded-borders"
          :src="mvDetail.cover"
          :ratio="1"
          style="width: 200px"
        ></q-img>
        <q-item-section>
          <q-item
            ><div class="text-h6">
              {{ mvDetail.name
              }}<q-badge align="middle" outline color="primary">MV</q-badge>
            </div></q-item
          >
          <q-item>
            <!--            <q-item-section avatar>-->
            <!--              <q-avatar-->
            <!--                ><q-img :src=""></q-img-->
            <!--              ></q-avatar>-->
            <!--            </q-item-section>-->
            <q-item-section
              ><q-item-label
                ><span class="text-primary">{{ mvDetail.artistName }}</span
                ><span class="q-ml-md"
                  >{{ mvDetail.publishTime }}发行</span
                ></q-item-label
              ></q-item-section
            >
          </q-item>
          <q-item-label class="q-mx-md" caption
            >播放{{ mvDetail.playCount }}次 时长{{
              mvDetail.duration | toTime
            }}</q-item-label
          >
          <q-item-label class="q-mx-md" v-if="mvDetail.desc" caption lines="2">
            MV简介:{{ mvDetail.desc }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
    <div class="col-6 q-mt-md">
      <q-item-section class="text-subtitle2">播放MV</q-item-section>
      <vue-plyr ref="player">
        <video :poster="mvDetail.cover" :src="mvRes"></video>
      </vue-plyr>
    </div>
    <div class="col-6 q-mt-md ">
      <q-item-section class="text-subtitle2">听友评论</q-item-section>
      <q-item-section class=""
        ><q-tabs v-model="tab" dense class="text-teal">
          <q-tab name="hotComments" label="精彩评论" />
          <q-tab name="comments" label="最新评论" /> </q-tabs
      ></q-item-section>
      <q-scroll-area style="height: 300px">
        <q-tab-panels v-model="tab">
          <q-tab-panel name="hotComments">
            <q-item v-for="(item, index) in comments.hotComments" :key="index">
              <q-item-section avatar>
                <q-avatar><q-img :src="item.user.avatarUrl"> </q-img></q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-primary">{{
                  item.user.nickname
                }}</q-item-label>
                <q-item-label class="text-overline text-caption">{{
                  item.content
                }}</q-item-label>
                <q-item-label
                  ><q-btn flat
                    ><my-icon icon-name="#alilike" color="red"></my-icon></q-btn
                  ><span class="text-caption">{{ item.likedCount }}</span
                  ><span class="text-caption q-ml-md">{{
                    item.time | toDate
                  }}</span></q-item-label
                >
              </q-item-section>
            </q-item>
          </q-tab-panel>
          <q-tab-panel name="comments">
            <q-item v-for="(item, index) in comments.comments" :key="index">
              <q-item-section avatar>
                <q-avatar><q-img :src="item.user.avatarUrl"> </q-img></q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-primary">{{
                  item.user.nickname
                }}</q-item-label>
                <q-item-label class="text-overline text-caption">{{
                  item.content
                }}</q-item-label>
                <q-item-label
                  ><q-btn flat
                    ><my-icon icon-name="#alilike" color="red"></my-icon></q-btn
                  ><span class="text-caption">{{ item.likedCount }}</span
                  ><span class="text-caption q-ml-md">{{
                    item.time | toDate
                  }}</span></q-item-label
                >
              </q-item-section>
            </q-item>
          </q-tab-panel>
        </q-tab-panels>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
import { mvDetail, mvUrl, getComment } from "src/api/api";
import MyIcon from "../../components/my-icon";
export default {
  name: "Mv",
  components: { MyIcon },
  data() {
    return {
      mvDetail: {
        name: "",
        cover: "",
        desc: "",
        playCount: 0,
        duration: 0,
        publishTime: "",
        commentThreadId: ""
      },
      mvRes: "",
      comments: { hotComments: [], comments: [] },
      tab: "hotComments"
    };
  },
  mounted() {
    this.initData();
    // eslint-disable-next-line no-console
    console.log(this.player);
  },
  computed: {
    player() {
      return this.$refs.player;
    }
  },
  methods: {
    async initData() {
      ({ data: this.mvDetail } = await mvDetail(this.$route.params.mvId));
      ({
        data: { url: this.mvRes }
      } = await mvUrl(this.$route.params.mvId));
      this.comments = await getComment(this.mvDetail.commentThreadId);
    }
  },
  watch: {
    $route() {
      //监听路由是否变化
      if (this.$route.params.mvId) {
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

<style>
.plyr {
  border-radius: 5px;
}
</style>
