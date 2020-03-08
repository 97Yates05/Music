<template>
  <div class="full-height flex column">
    <div class="q-mx-md">
      <span class="text-subtitle2">语种:</span>
      <q-btn-toggle
        v-model="queryParam.lanType"
        size="12px"
        flat
        :options="options"
        toggle-color="primary"
      />
    </div>
    <div class="q-mx-md">
      <span class="text-subtitle2">分类:</span>
      <q-btn-toggle
        v-model="queryParam.cateType"
        size="12px"
        flat
        :options="cateOptions"
        toggle-color="primary"
      />
    </div>
    <div>
      <q-btn-toggle
        v-model="queryParam.letterType"
        size="12px"
        flat
        :options="letterOptions"
        toggle-color="primary"
      />
    </div>
    <q-scroll-area class="col q-px-md" :thumb-style="thumbStyle">
      <div class="row q-col-gutter-md">
        <div
          v-for="(item, index) in singerList"
          :key="index"
          class="col-2 cursor-pointer"
          @click="toSingerDetail(item.id)"
        >
          <q-img :src="item.picUrl" class="rounded-borders hvr-grow full-height"></q-img>
          <q-tooltip
            anchor="top middle"
            self="center middle"
            content-class="bg-transparent text-accent text-subtitle2"
          >
            {{ item.name }}
          </q-tooltip>
        </div>
      </div>
    </q-scroll-area>
    <div v-if="singerList.length !== 0" class="q-pa-lg flex flex-center">
      <q-btn
        :class="{ 'cursor-not-allowed': this.currentPage <= 1 }"
        @click="toLast"
        label="上一页"
        icon="fas fa-angle-left"
        flat
      ></q-btn>
      <span class="text-subtitle2">{{ this.currentPage }}</span>
      <q-btn
        :class="{ 'cursor-not-allowed': !this.more }"
        @click="toNext"
        label="下一页"
        icon-right="fas fa-angle-right"
        flat
      ></q-btn>
    </div>
  </div>
</template>

<script>
import { apiSingerList } from "src/api/api";
export default {
  name: "Singer",
  data() {
    return {
      queryParam: { lanType: "10", cateType: "01", letterType: "hot" },
      options: [
        { label: "华语", value: "10" },
        { label: "欧美", value: "20" },
        { label: "日本", value: "60" },
        { label: "韩国", value: "70" },
        { label: "其他", value: "40" }
      ],
      cateOptions: [
        { label: "男歌手", value: "01" },
        { label: "女歌手", value: "02" },
        { label: "乐队组合", value: "03" }
      ],
      letterOptions: [{ label: "热门", value: "hot" }],
      currentPage: 1,
      singerList: [{ id: null, picUrl: null }],
      more: true
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      for (let i = 65; i < 91; i++) {
        let temp = {
          label: String.fromCharCode(i),
          value: String.fromCharCode(i)
        };
        this.letterOptions.push(temp);
      }
    },
    async updateSingerList(offset) {
      ({ artists: this.singerList, more: this.more } = await apiSingerList(
        this.getCat,
        24,
        this.getLetter,
        offset
      ));
    },
    toSingerDetail(id) {
      this.$router.push({ name: "singerDetail", params: { singerId: id } });
    },
    toLast() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updateSingerList((this.currentPage - 1) * 24);
      }
    },
    toNext() {
      if (this.more) {
        this.currentPage++;
        this.updateSingerList((this.currentPage - 1) * 24);
      }
    }
  },
  watch: {
    queryParam: {
      handler() {
        this.currentPage = 1;
        this.updateSingerList(0);
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    getCat() {
      if (this.queryParam.lanType === "0" || this.queryParam.cateType === "0")
        return 1001;
      return parseInt(this.queryParam.lanType + this.queryParam.cateType);
    },
    getLetter() {
      return this.queryParam.letterType === "hot"
        ? ""
        : this.queryParam.letterType;
    },
    thumbStyle() {
      return {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#247ba0",
        width: "5px",
        opacity: 0.75
      };
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
