<template>
  <div class="loading">
    <img src="../../assets/timg.gif" />
  </div>
</template>

<script>
export default {
  name: "Loading"
};
</script>


<style scoped>
.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.loading img {
  position: absolute;
  width: 140px;
  height: 100px;
  top: calc(50% - 70px);
  left: calc(50% - 50px);
}
</style>