<template>
  <div class="phoneBottom">
    <p class="ft-links" v-show="datas.isShowBootom">
      <span>店铺主页</span>
      <span>个人中心</span>
      <!-- <span>关注我们</span> -->
      <!-- <span>店铺信息</span> -->
    </p>
    <!-- <img
      draggable="false"
      v-show="datas.botLogo"
      :src="datas.botLogo"
      style="width: 110px; margin-left: 35%; margin-top: 10px"
    /> -->
    <!-- <p class="yinjia" :style="{ 'margin-top': datas ? '0px' : '10px' }">
      <img
        draggable="false"
        class="logo"
        src="@/assets/images/Robot.png"
      /><span>星火相连提供技术支持</span>
    </p> -->
  </div>
</template>

<script>
export default {
  name: 'phoneBottom',
  props:['datas'],
  watch: {
    datas() {
      // console.log(this.datas,'------------this.datas')
    },
  },
}
</script>

<style scoped lang="less">
.phoneBottom {
  width: 100%;
  background-color: #fff;
  min-height: 145px;
  cursor: pointer;
  padding-top: 30px;
  box-sizing: border-box;
  .ft-links {
    text-align: center;
    padding: 0px 15px 10px;
    span {
      padding: 0 6px;
      color: #666;
      font-size: 12px;
      border-right: 1px solid #e5e5e5;
      &:last-of-type {
        border-right: 0;
      }
    }
  }

  .yinjia {
    color: #bfbfc3;
    text-align: center;
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo {
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }
  }
}
</style>
