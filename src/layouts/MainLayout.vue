<template>
  <div class="main">
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "MainLayout"
});
</script>
<style>
.main {
  height: 100vh;
  width: 100vw;
}
/*阿里icon在线引用的要求*/
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
