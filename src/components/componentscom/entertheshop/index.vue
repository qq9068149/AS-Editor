<template>
  <div class="entertheshop">
    <!-- 内容 -->
    <van-cell
      :icon="datas.icon"
      :title="datas.shopName"
      is-link
      :value="datas.copywriting"
      :to="datas.type==10?datas.http.externalLink:''"
      :url="datas.type==11?datas.http.externalLink:''"
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
