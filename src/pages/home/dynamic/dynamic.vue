<template>
  <div class="full-height flex column">
    <q-tabs v-model="tab" class="text-primary" align="left" dense>
      <q-tab name="week" label="一周"> </q-tab>
      <q-tab name="all" label="全部"> </q-tab>
    </q-tabs>
    <q-scroll-area class="col" :thumb-style="thumbStyle">
      <q-tab-panels v-model="tab" class="col flex column">
        <q-tab-panel name="week">
          <q-list>
            <q-item
              v-for="(item, index) in weekData"
              :key="index"
              clickable
              @click="play(index)"
            >
              <q-item-section avatar>
                <q-avatar rounded>
                  <q-img :src="item.song.al.picUrl"> </q-img>
                </q-avatar>
              </q-item-section>
              <q-item-section>{{ item.song.name }}</q-item-section>
              <q-item-section>{{ item.song.ar[0].name }}</q-item-section>
              <q-item-section>{{ item.song.al.name }}</q-item-section>
              <q-item-section>{{ item.playCount }}</q-item-section>
              <q-item-section>{{ item.song.dt | toTime }}</q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>
        <q-tab-panel name="all" class="col flex column">
          <q-list>
            <q-item
              v-for="(item, index) in allData"
              :key="index"
              clickable
              @click="play(index)"
            >
              <q-item-section avatar>
                <q-avatar rounded>
                  <q-img :src="item.song.al.picUrl"> </q-img>
                </q-avatar>
              </q-item-section>
              <q-item-section>{{ item.song.name }}</q-item-section>
              <q-item-section>{{ item.song.ar[0].name }}</q-item-section>
              <q-item-section>{{ item.song.al.name }}</q-item-section>
              <q-item-section>{{ item.playCount }}</q-item-section>
              <q-item-section>{{ item.song.dt | toTime }}</q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-scroll-area>
  </div>
</template>

<script>
import { getUserRecord } from "src/api/api";
import { mapMutations } from "vuex";
import { mapState } from "vuex";
export default {
  name: "Dynamic",
  data() {
    return {
      tab: "week",
      weekData: [],
      allData: []
    };
  },
  computed: {
    ...mapState(["userId"]),
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
  mounted() {
    this.initData();
  },
  methods: {
    ...mapMutations(["updatePlayDetail"]),
    async initData() {
      if (this.userId) {
        ({ weekData: this.weekData } = await getUserRecord(this.userId, 1));
        ({ allData: this.allData } = await getUserRecord(this.userId, 0));
      }
    },
    play(index) {
      if (this.tab === "week") {
        this.updatePlayDetail({
          index: index,
          playlists: this.weekData.map(item => item.song)
        });
      } else {
        this.updatePlayDetail({
          index: index,
          playlists: this.allData.map(item => item.song)
        });
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
    }
  }
};
</script>

<style scoped></style>
