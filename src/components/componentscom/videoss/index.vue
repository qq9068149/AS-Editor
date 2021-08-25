<template>
  <div class="videoss">
    <!-- 默认视频 -->
    <section class="default" v-if="!datas.videoData">
      <van-icon name="tv-o" size="150px" />
    </section>

    <!-- 选择视频后 -->
    <section v-else style="min-height: 200px; position: relative">
      <!-- 视频封面 -->
      <img
        draggable="false"
        :src="datas.videoData.coverUrl"
        alt=""
        style="width: 100%; display: block"
      />
      <!-- 图标 -->
      <van-icon class="bof" name="play-circle-o" />
    </section>

    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script>
export default {
  name: 'videoss',
  props: {
    datas: Object,
  },

  created() {
    this.initImageList()
  },

  methods: {
    // 初始化更新imageList数据
    initImageList() {
      if (this.datas.videoData) {
        let shopCommodity = JSON.parse(localStorage.getItem('shopCommodity'))
        this.datas.videoData =
          shopCommodity[this.datas.videoData.type][this.datas.videoData.id]
        console.log(this.datas.videoData, '------------created imageList')
      }
    },
  },
}
</script>

<style scoped lang="less">
.videoss {
  position: relative;

  /* 默认视频 */
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
