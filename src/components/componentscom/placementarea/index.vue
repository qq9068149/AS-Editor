<template>
  <div class="placementarea">
    <span>组件放置区域</span>
  </div>
</template>

<script>
export default {
  name: 'placementarea',
}
</script>

<style scoped lang="less">
.placementarea {
  width: 100%;
  height: 40px;
  background: #94b4eb;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../../../assets/images/obliqueLine.png');
  background-size: 50%, 100%;
  transition: all 0.5s;
  span {
    color: #fff;
    display: inline-block;
    width: 140px;
    height: 25px;
    font-size: 12px;
    text-align: center;
    line-height: 25px;
    background: #5487df;
  }
}
</style>
