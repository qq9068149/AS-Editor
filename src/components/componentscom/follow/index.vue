<template>
  <div id="follow">
    <div class="follow-box">
      <div class="follow-pic">
        <img :src="datas.heade" alt="" />
      </div>
      <div class="follow-info">
        <span>{{ datas.followName }}</span>
      </div>
      <div class="follow-right">
        <van-button color="#07C160">关注公众号</van-button>
      </div>
    </div>

    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script>
export default {
  name: 'follow',
  props: {
    datas: Object,
  },
}
</script>

<style lang="less" scoped>
#follow {
  position: relative;
  width: 100%;
  padding: 5px 10px;
  box-sizing: border-box;
  .follow-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #999;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    .follow-pic {
      width: 50px;
      height: 50px;
      img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .follow-info {
      flex: 1;
      margin-left: 20px;
      font-size: 14px;
      color: #333;
    }
  }
}
</style>
