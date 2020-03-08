<template>
  <div class="dis full-height full-width rounded-borders flex column">
    <q-toolbar class="rounded-borders">
      <q-input
        class="input"
        v-model="searchText"
        type="search"
        dense
        borderless
        clearable
        :placeholder="placeholder"
        @keydown.enter="search"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-magnify" />
        </template>
      </q-input>
      <q-space />
      <q-tabs active-color="primary">
        <q-route-tab v-for="item in tabItems" :key="item.name" :to="item.to">
          {{ item.name }}
        </q-route-tab>
      </q-tabs>
    </q-toolbar>
    <!--三级页面路由出口(自动占用除toolbar所有的高度)-->
    <div class="col">
      <keep-alive><router-view /></keep-alive>
    </div>
  </div>
</template>

<script>
import { getDefaultKeyWord, getSearchHot } from "src/api/api";
export default {
  name: "Dis",
  components: {},
  data() {
    return {
      tabItems: [
        { name: "个性推荐", to: "/music/home/dis/individuality" },
        { name: "排行榜", to: "/music/home/dis/rank" },
        { name: "歌手", to: "/music/home/dis/singer" },
        { name: "最新音乐", to: "/music/home/dis/latest" }
      ],
      searchText: "",
      placeholder: "",
      searchHot: [],
      showing: false
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      [
        {
          data: { showKeyword: this.placeholder }
        },
        {
          result: { hots: this.searchHot }
        }
      ] = await Promise.all([getDefaultKeyWord(), getSearchHot()]);
    },
    search() {
      this.$router.push({
        name: "searchResult",
        params: { keyword: this.searchText }
      });
    }
  }
};
</script>

<style scoped>
.dis {
  background-color: #fcfcfc;
}
.input {
  width: 300px;
}
</style>
