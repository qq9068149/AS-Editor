<template>
  <div class="tabBar">
    <div v-if="datas.iconList.length !== 0" class="tabbar">
      <van-tabbar
        v-model="active"
        :fixed="false"
        :placeholder="true"
        :border="datas.isShowBorder"
        :active-color="datas.activeColor"
        :inactive-color="datas.inactiveColor"
      >
        <van-tabbar-item 
          v-for="(item, index) in datas.iconList"
          :key="index"
          :name="item.iconName"
          :dot="item.isDot"
        >
          <span>{{ item.iconText }}</span>
          <template #icon="props">
            <img :src="props.active ? item.iconPic : item.inactive" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>

    <div v-else>
      <van-tabbar
        v-model="datas.Highlight"
        :fixed="false"
        :placeholder="true"
        :border="datas.isShowBorder"
        :active-color="datas.activeColor"
        :inactive-color="datas.inactiveColor"
      >
        <van-tabbar-item icon="search" name="home">标签</van-tabbar-item>
        <van-tabbar-item icon="home-o">标签</van-tabbar-item>
        <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
        <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
        <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
      </van-tabbar>
    </div>

    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script>
export default {
  name: 'tabBar',
  props: {
    datas: Object
  },
  data() {
    return {
      active: 0
    }
  },

  created() {
    console.log(this.datas, '--------------tabbar data  created')
    document.querySelector('.phone-container').style.cssText =
      'padding-bottom: 50px'
  },

  mounted() {},

  methods: {},

  computed: {},

  watch: {},

  beforeDestroy() {
    document.querySelector('.phone-container').style.cssText =
      'padding-bottom: 0px'
  }
}
</script>

<style lang="less" scoped>
.tabBar {
  width: 100%;
  position: relative;
  position: absolute;
  bottom: -54px;
  left: 0px;
  z-index: 2;
}

.tabbar {
  /deep/ .van-icon {
    width: 25px;
    height: 25px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
