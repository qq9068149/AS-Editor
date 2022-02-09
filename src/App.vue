<template>
  <div id="app">
    <!-- <transition name="fade"> -->
      <router-view v-if="isRouterAlive" />
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  provide() {
    return {
      reload: this.reload,
    }
  },

  data() {
    return {
      isRouterAlive: true,
    }
  },
  created() {
    // this.$httpApi
    //   .loginAdminTest({ loginname: 'admin', pwd: '123456' })
    //   .then((res) => {
    //     console.log(res)
    //   })
  },
  mounted() {},
  methods: {
    // 刷新页面
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
  },
}
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

// 提示样式
.Prompt{
  font-size: 12px; color: #969799; margin-bottom: 10px
}
</style>
