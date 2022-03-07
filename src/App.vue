<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script setup>
import { ref, nextTick, provide } from 'vue'

let isRouterAlive = ref(true)

// reload无感刷新事件
const reload = () => {
  isRouterAlive.value = false
  // nextTick：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
  nextTick(() => {
    isRouterAlive.value = true
  })
}

// 向子组件以及子孙组件传递名为reload的函数，第一个参数自定义，第二个参数代表上面定义的reload()方法
provide('reload', reload)

</script>

<style lang="less">
#app {
  position: absolute;
  left: 0;
  top: 0;
}

// 页面切换动画
.fade-enter-active {
  transition: all 1.5s ease;
}
.fade-leave-active {
  transition: all 1.5s ease;
}
.fade-enter {
  transform: translateX(5px);
  opacity: 0;
}
.fade-leave-to {
  transform: translateX(5px);
  opacity: 0;
}
.el-message-box.JSONView {
  width: 1100px;
}
.el-form-item__content {
  display: block !important;
}

// 提示样式
.Prompt {
  font-size: 12px;
  color: #969799;
  margin-bottom: 10px;
}

// 该元素不接受鼠标事件
.pointer-events {
  pointer-events: none;
}
</style>
