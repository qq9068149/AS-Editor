<template>
  <div class="auxiliarysegmentation">
    <section
      class="contan"
      :style="{
        height: datas.blankHeight + 'px',
        padding: datas.paddType === 0 ? '0px' : '0px 15px',
      }"
    >
      <div
        v-show="datas.segmentationtype === 1"
        style="height: 1px; width: 100%; border-top-width: 1px"
        :style="{
          'border-top-style': datas.bordertp,
          'border-top-color': datas.auxliarColor,
        }"
      />
    </section>

    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script>
export default {
  name: 'auxiliarysegmentation',
  props: {
    datas: Object,
  },
}
</script>

<style scoped lang="less">
.auxiliarysegmentation {
  position: relative;
  .contan {
    display: flex;
    align-items: center;
  }
}
</style>
