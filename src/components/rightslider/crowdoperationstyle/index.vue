<template>
  <div class="crowdoperationstyle">
    <!-- 标题 -->
    <h2>{{ datas.text }}</h2>
  </div>
</template>

<script>
export default {
  name: 'crowdoperationstyle',
  props: {
    datas: Object,
  },
}
</script>

<style scoped lang="less">
.crowdoperationstyle {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0 10px 20px;
  box-sizing: border-box;
  /* 标题 */
  h2 {
    padding: 24px 16px 24px 0;
    margin-bottom: 15px;
    border-bottom: 1px solid #f2f4f6;
    font-size: 18px;
    font-weight: 600;
    color: #323233;
  }
}
</style>
