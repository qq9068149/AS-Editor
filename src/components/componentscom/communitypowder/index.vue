<template>
  <div class="communitypowder">
    <!-- 社区粉丝 -->
    <section class="powder" :style="{ background: datas.backColor }">
      <!-- 内容 -->
      <div class="container">
        <div class="lef">
          <img
            draggable="false"
            src="../../../assets/images/powder.png"
            alt=""
            v-if="!datas.mainImg"
          />
          <img draggable="false" :src="datas.mainImg" alt="" v-else />
          <div class="text">
            <p class="first">{{ datas.title }}</p>
            <p class="last">{{ datas.describe }}</p>
          </div>
        </div>
        <van-button class="rig" type="danger" size="small" color="#f44">{{
          datas.buttonName
        }}</van-button>
      </div>
    </section>

    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script>
export default {
  name: 'communitypowder',
  props: {
    datas: Object,
  },
}
</script>

<style scoped lang="less">
.communitypowder {
  position: relative;
  /* 社区涨粉 */
  .powder {
    width: 100%;
    height: 90px;
    display: flex;
    align-items: center;
    .container {
      height: 60px;
      width: 100%;
      box-sizing: border-box;
      padding: 0 15px;
      align-items: center;
      display: flex;
      justify-content: space-between;
      /* 左半部分 */
      .lef {
        display: flex;
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 10px;
          width: 146px;
          padding: 8px 0;
          .first {
            width: 100%;
            color: #333;
            font-weight: 700;
            font-size: 14px;
            line-height: 20px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .last {
            width: 100%;
            color: #a9a9a9;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
