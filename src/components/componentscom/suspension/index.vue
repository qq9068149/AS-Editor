<template>
  <div id="suspension">
    <div class="suspension-wrap">
      <img
        class="suspension-logo"
        src="https://imgs.starfirelink.com/vue-fire-start-h5/shop-peison/icon_back_36.png"
      />
    </div>
    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>
<script>
export default {
  name: 'suspension',
  props: {
    datas: Object,
  },
}
</script>
<style lang="less" scoped>
#suspension {
  width: 100%;
  height: 36px;
  position: relative;
  position: absolute;
  right: 0;
  bottom: 10%;
  z-index: 999;
  border: none;
  box-sizing: border-box;
  .suspension-wrap {
    width: 36px;
    height: 36px;
    position: absolute;
    right: 30px;
    z-index: 1001;
    .suspension-logo {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
  }
}
</style>