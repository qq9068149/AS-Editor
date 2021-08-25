<template>
  <div class="richtext" :style="{ background: datas.backColor }">
    <img
      draggable="false"
      src="../../../assets/images/fwb.png"
      alt=""
      v-if="!datas.myValue.length"
    />
    <section v-else v-html="datas.myValue" />

    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script>
export default {
  name: 'richtext',
  props: {
    datas: Object,
  },
}
</script>

<style scoped lang="less">
.richtext {
  position: relative;
}
/deep/img {
  max-width: 100% !important;
  display: block;
}
.richtext {
  position: relative;
  /deep/pre {
    white-space: break-spaces;
  }
  /deep/p {
    word-break: break-all;
  }
}
</style>
