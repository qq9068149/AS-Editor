<template>
  <div class="RealTimeView">
    <el-dialog :visible.sync="datas.show" width="414px" top="8vh">
      <img src="@/assets/images/phoneTop.png" style="width: 375px" />
      <iframe
        v-if="datas.show"
        ref="iframe"
        class="screen"
        :scrolling="false"
        :src="'http://was666.gitee.io/as-editor-h5/#/?type=iframe'"
        @load="load"
      ></iframe>
      <van-loading v-if="loading" size="24px" vertical>加载中</van-loading>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'RealTimeView',
  props: {
    datas: {
      show: false,
    },
    val:Object
  },
  data() {
    return {
      loading: true
    }
  },
  methods: {
    load() {
      this.loading = false
      this.$refs["iframe"].contentWindow.postMessage(this.val, "http://was666.gitee.io");
    },
  },
}
</script>

<style lang="less" scoped>
.RealTimeView {
  .screen {
    width: 375px /*no*/;
    height: 667px /*no*/;
    border: 0;

    // 隐藏滚动条
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
}
</style>
