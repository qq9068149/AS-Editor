<template>
  <div
    class="commoditysearch"
    :style="{
      background: datas.backgroundColor,
      border: `1px solid ${datas.backgroundColor}`,
    }"
  >
    <!-- 搜索框 -->
    <section
      class="searchs"
      :style="{
        height: datas.heights + 'px',
        'justify-content': datas.textPosition === 0 ? 'left' : 'center',
        background: datas.borderColor,
        'border-radius': datas.borderRadius === 0 ? '0px' : '10px',
      }"
    >
      <div class="search-left">
        <van-icon name="search" size="16" :style="{ color: datas.textColor }" />
        <span :style="{ color: datas.textColor }">搜索商品</span>
      </div>
      <!-- 扫一扫 -->
      <div
        class="sweep"
        v-show="datas.sweep"
        :style="{ color: datas.textColor }"
      >
        <span>扫一扫</span>
      </div>
    </section>

    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script>
export default {
  name: 'commoditysearch',
  props: {
    datas: Object,
  },
}
</script>

<style scoped lang="less">
.commoditysearch {
  position: relative;
  /* 搜索框 */
  .searchs {
    position: relative;
    width: 345px;
    min-height: 28px;
    margin: 5px auto;
    display: flex;
    align-items: center;
    font-size: 14px;
    .search-left {
      display: flex;
      align-items: center;
    }
    .sweep {
      position: absolute;
      right: 10px;
    }
    i {
      margin: 0 5px;
    }
  }
}
</style>
