import Vue from "vue";
import axios from "axios";
import VuePlyr from "vue-plyr";

Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: false },
    ratio: "16:9"
  }
});

Vue.prototype.$axios = axios;
