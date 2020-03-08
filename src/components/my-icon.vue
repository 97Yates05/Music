<template>
  <svg class="icon" aria-hidden="true" font-size="24px" :color="color">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: "MyIcon",
  props: {
    iconName: String,
    color: String
  }
};
</script>

<style scoped></style>
