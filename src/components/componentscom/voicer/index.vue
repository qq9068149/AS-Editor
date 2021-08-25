<template>
  <div class="voicer">
    <!-- 默认音频 -->
    <section class="default" v-if="!datas.voicerData">
      <van-icon name="music-o" size="150px" />
    </section>

    <!-- 选择音频后 -->
    <section v-else style="min-height: 200px; position: relative">
      <!-- 音频封面 -->
      <img
        draggable="false"
        :src="datas.voicerData.coverUrl"
        alt=""
        style="width: 100%; display: block"
      />
      <!-- 图标 -->
      <van-icon class="bof" name="music-o" />
    </section>

    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script>
export default {
  name: 'voicer',
  props: {
    datas: Object,
  },
  created() {
    this.initImageList()
  },
  methods: {
    // 初始化更新imageList数据
    initImageList() {
      if (this.datas.voicerData) {
        let shopCommodity = JSON.parse(localStorage.getItem('shopCommodity'))
        this.datas.voicerData =
          shopCommodity[this.datas.voicerData.type][this.datas.voicerData.id]
        console.log(this.datas.voicerData, '------------created imageList')
      }
    },
  },
}
</script>

<style scoped lang="less">
.voicer {
  position: relative;
  /* 默认音频 */
  .default {
    width: 100%;
    height: 210px;
    background: #979797;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* 播放图标 */
  .bof {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 100px;
    opacity: 0.5;
    color: #999;
  }
}
</style>
