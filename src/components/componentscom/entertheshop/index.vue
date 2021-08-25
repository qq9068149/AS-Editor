<template>
  <div class="entertheshop">
    <!-- 内容 -->
    <van-cell
      icon="shop-collect-o"
      :title="datas.shopName"
      is-link
      :value="datas.copywriting"
    />

    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script>
export default {
  name: 'entertheshop',
  props: {
    datas: Object,
  },
}
</script>

<style scoped lang="less">
.entertheshop {
  position: relative;
}
</style>
