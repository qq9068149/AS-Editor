<template>
  <div class="videoss">
    <!-- 默认视频 -->
    <section class="default" v-if="!datas.src">
      <van-icon name="tv-o" size="150px" />
    </section>

    <!-- 选择视频后 -->
    <section v-else style="position: relative">
      <video
        :src="datas.src"
        controls
        :autoplay="datas.autoplay"
        :poster="datas.coverUrl"
        width="100%"
      ></video>
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
  },

  methods: {
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
