<template>
  <div class="personalizedrecommendation">
    {{ datas.text }}

    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script>
export default {
  name: 'personalizedrecommendation',
  props: {
    datas: Object,
  },
}
</script>

<style scoped lang="less">
.personalizedrecommendation {
  position: relative;
}
</style>
