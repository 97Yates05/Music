<template>
  <div class="full-height row items-stretch">
    <div class="col-4 full-height">
      <q-card class="bg-transparent" flat>
        <q-card-section class="flex justify-center">
          <q-avatar
            ><q-img :src="userDetail.profile.avatarUrl" alt="avatar"></q-img
          ></q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="text-h6 text-center">
            {{ userDetail.profile.nickname
            }}<q-badge
              v-if="userDetail.profile.description !== ''"
              align="middle"
              outline
              color="accent"
              >{{ userDetail.profile.description }}</q-badge
            >
          </div>
          <div class="flex justify-center">
            <q-chip size="sm" color="primary" text-color="white"
              >Lv.{{ userDetail.level }}</q-chip
            >
            <q-chip
              size="sm"
              color="primary"
              text-color="white"
              :icon="
                userDetail.profile.gender === 1
                  ? 'mdi-gender-male'
                  : 'mdi-gender-female'
              "
              >{{ userDetail.profile.birthday | toDate | slice }}0后</q-chip
            >
            <q-chip size="sm" color="primary" text-color="white"
              >{{ userDetail.listenSongs }}首</q-chip
            >
          </div>
          <div class="row text-caption justify-center">
            <span class="q-mx-md">动态:{{ userDetail.profile.authority }}</span>
            <q-separator vertical></q-separator>
            <span class="q-mx-md">关注:{{ userDetail.profile.followeds }}</span>
            <q-separator vertical></q-separator>
            <span class="q-mx-md">粉丝:{{ userDetail.profile.follows }}</span>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-h6">个性签名</div>
          <q-item-label class="text-caption" lines="5">{{
            getSignature
          }}</q-item-label>
        </q-card-section>
        <q-card-section>
          <div class="text-h6">社交账号</div>
        </q-card-section>
        <q-list>
          <q-item
            v-for="(item, index) in userDetail.bindings"
            :key="index"
            clickable
          >
            <q-item-section avatar>
              <q-icon color="primary" :name="getIconName(item)" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.type | typeToName }}</q-item-label>
              <q-item-label caption>{{
                item.bindingTime | toDate
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
    <div class="col-4 flex column">
      <div class="text-h6 q-my-md">
        创建的歌单<q-badge color="accent" align="top">{{
          createIds.length
        }}</q-badge>
      </div>
      <q-scroll-area class="col" :thumb-style="thumbStyle">
        <q-list>
          <q-item
            v-for="(item, index) in createIds"
            :key="index"
            clickable
            :to="'/music/home/playlist/' + item.id"
          >
            <q-item-section avatar>
              <q-img :src="item.coverImgUrl"></q-img>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
              <q-item-label caption
                >{{ item.trackCount }}首，播放{{
                  item.playCount
                }}次</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <div class="text-h6 q-my-md">
        收藏的歌单<q-badge color="accent" align="top">{{
          collectIds.length
        }}</q-badge>
      </div>
      <q-scroll-area class="col" :thumb-style="thumbStyle">
        <q-list>
          <q-item
            v-for="(item, index) in collectIds"
            :key="index"
            clickable
            :to="'/music/home/playlist/' + item.id"
          >
            <q-item-section avatar>
              <q-img :src="item.coverImgUrl"></q-img>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
              <q-item-label caption
                >{{ item.trackCount }}首，播放{{
                  item.playCount
                }}次</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </div>
    <div class="col-4 flex column">
      <div class="text-h6 q-my-md">
        关注<q-badge color="accent" align="top">{{ follows.length }}</q-badge>
      </div>
      <q-scroll-area class="col" :thumb-style="thumbStyle">
        <q-card-section class="row q-col-gutter-md">
          <div
            class="col-12"
            v-for="(item, index) in follows"
            :key="index"
            @click="toUserInfo(item.userId)"
          >
            <q-card flat class="bg-transparent">
              <q-item clickable>
                <q-item-section avatar>
                  <q-avatar
                    ><q-img :src="item.avatarUrl" alt="avatar"></q-img
                  ></q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1"> {{ item.nickname }}</q-item-label>
                  <q-item-label caption>关注:{{ item.follows }}</q-item-label>
                  <q-item-label caption>粉丝:{{ item.followeds }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="item.signature !== null">
                <q-item-label lines="3" class="text-caption"
                  >{{ item.signature | toSignature }}
                </q-item-label>
              </q-item>
            </q-card>
          </div>
        </q-card-section>
      </q-scroll-area>
      <div class="text-h6 q-my-md">
        粉丝<q-badge color="accent" align="top">{{ followeds.length }}</q-badge>
      </div>
      <q-scroll-area class="col" :thumb-style="thumbStyle"
        ><q-card-section class="row q-col-gutter-md">
          <div
            class="col-12"
            v-for="(item, index) in followeds"
            :key="index"
            @click="toUserInfo(item.userId)"
          >
            <q-card flat class="bg-transparent">
              <q-item clickable>
                <q-item-section avatar>
                  <q-avatar
                    ><q-img :src="item.avatarUrl" alt="avatar"></q-img
                  ></q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1"> {{ item.nickname }}</q-item-label>
                  <q-item-label caption>关注:{{ item.follows }}</q-item-label>
                  <q-item-label caption>粉丝:{{ item.followeds }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="item.signature !== null">
                <q-item-label lines="3" class="text-caption"
                  >{{ item.signature | toSignature }}
                </q-item-label>
              </q-item>
            </q-card>
          </div>
        </q-card-section></q-scroll-area
      >
    </div>
  </div>
</template>

<script>
import {
  apiUserDetail,
  getFollows,
  getFolloweds,
  getPlaylist
} from "src/api/api";
export default {
  name: "Myself",
  data() {
    return {
      userDetail: {
        profile: {
          avatarUrl: "",
          nickname: "",
          description: "",
          birthday: 0,
          authority: "",
          followeds: 0,
          follows: 0
        },
        level: 0,
        listenSongs: 0
      },
      follows: [],
      followeds: [],
      favoriteId: "",
      createIds: [],
      collectIds: []
    };
  },
  mounted() {
    this.initData();
  },
  computed: {
    getSignature() {
      return this.userDetail.profile.signature === ""
        ? "暂无个性签名"
        : this.userDetail.profile.signature;
    },
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
  methods: {
    async initData() {
      if (this.$route.params.userId) {
        this.userDetail = await apiUserDetail(this.$route.params.userId);
        ({ follow: this.follows } = await getFollows(
          this.$route.params.userId
        ));
        ({ followeds: this.followeds } = await getFolloweds(
          this.$route.params.userId
        ));
        let { playlist } = await getPlaylist(this.$route.params.userId);
        this.favoriteId = playlist[0].id;
        this.createIds = playlist.filter(item => {
          return !item.subscribed;
        });
        this.collectIds = playlist.filter(item => {
          return item.subscribed;
        });
      } else {
        // eslint-disable-next-line no-console
        console.log("error");
      }
    },
    getIconName(item) {
      switch (item.type) {
        case 1:
          return "mdi-cellphone";
        case 2:
          return "mdi-sina-weibo";
        case 5:
          return "mdi-qqchat";
        case 10:
          return "mdi-wechat";
        default:
          return "";
      }
    },
    //跳转个人主页
    toUserInfo(id) {
      this.$router.push({ name: "myself", params: { userId: id } });
    }
  },
  filters: {
    toDate: function(item) {
      return new Date(item).toLocaleString();
    },
    slice: function(item) {
      return item.slice(2, 3);
    },
    typeToName: function(item) {
      switch (item) {
        case 1:
          return "手机";
        case 2:
          return "新浪微博";
        case 5:
          return "QQ";
        case 10:
          return "微信";
        default:
          return "";
      }
    },
    toSignature: function(item) {
      return item === null ? "暂无介绍" : item;
    }
  },
  watch: {
    $route() {
      //监听路由是否变化
      if (this.$route.params.userId) {
        this.initData();
      }
    }
  }
};
</script>

<style scoped></style>
