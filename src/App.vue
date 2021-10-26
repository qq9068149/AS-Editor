<template>
  <div id="app">
    <transition name="fade">
      <router-view v-if="isRouterAlive" />
    </transition>
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
      permissionsJson: {},
    }
  },
  created() {
    if (process.env.NODE_ENV === 'development') {
      // console.log('开发环境')
      this.$httpApi
        .loginAdminTest({ loginname: 'admin', pwd: '123456' })
        .then((res) => {
          console.log(res)
          this.getPermission()
        })
    } else {
      // console.log('生产环境')
      this.getPermission()
    }
  },
  mounted() {
    //将hasPermission挂载到window
    window['hasPermission'] = (data) => {
      return this.hasPermission(data)
    }
  },
  methods: {
    // 刷新页面
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    getPermission() {
      this.$httpApi.getPermission().then((res) => {
        let permissionsList = res.data.permissionsList

        for (let i in permissionsList) {
          this.permissionsJson[permissionsList[i].funkey] = 1
        }
      })
    },
    hasPermission(permission) {
      return this.permissionsJson.hasOwnProperty(permission)
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

/* // 页面切换动画 */
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
.el-message-box.JSONView{
  width: 1100px;
}
</style>
