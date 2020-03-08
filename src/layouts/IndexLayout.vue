<template>
  <div class="index">
    <Index></Index>
  </div>
</template>

<script>
import Index from "src/pages/Index";
export default {
  name: "LayoutName",
  components: { Index },

  data() {
    return {
      leftDrawer: true
    };
  }
};
</script>

<style>
.index {
  height: 100vh;
  width: 100vw;
}
</style>
