<template>
  <div class="phoneBottom">
    <p class="ft-links" v-show="datas.isShowBootom">
    </p>
  </div>
</template>

<script>
export default {
  name: 'phoneBottom',
  props:['datas'],
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
