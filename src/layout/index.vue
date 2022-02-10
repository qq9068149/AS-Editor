<template>
  <div class="layout">
    <section class="subject">
      <!-- 侧边栏 -->
      <div class="side-bar">
        <!-- 选择项 -->
        <div class="slider">
          <!-- 图标 -->
          <i class="iconfont icon-zhuangxiu"></i>
          <!-- 文字提示 -->
          <span>装修</span>
        </div>
      </div>

      <!-- 子路由 -->
      <router-view v-slot="{ Component }">
        <transition name="layoutFade">
          <component :is="Component" />
        </transition>
      </router-view>
    </section>
  </div>
</template>

<script>
export default {
  name: 'layout',
}
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
  /* 主体 */
  .subject {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    /* 侧边栏 */
    .side-bar {
      width: 75px;
      border-right: 1px solid #ebedf0;
      background: #fff;
      box-sizing: border-box;
      padding-top: 32px;
      display: flex;
      justify-content: center;
      /* 选择项 */
      .slider {
        display: flex;
        flex-direction: column;
        /* 图标 */
        .iconfont {
          font-size: 30px;
          color: #155bd4;
        }
        span {
          font-weight: 500;
          font-size: 12px;
          color: #155bd4;
        }
      }
    }
  }
}

/* // 页面切换动画 */
.layoutFade-enter-active {
  transition: all 1.5s ease;
}
.layoutFade-leave-active {
  transition: all 1.5s ease;
}
.layoutFade-enter {
  transform: translateY(5px);
  opacity: 0;
}
.layoutFade-leave-to {
  transform: translateY(5px);
  opacity: 0;
}
</style>
