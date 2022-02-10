<template>
  <div class="videostyle">
    <!-- 标题 -->
    <h2>{{ datas.text }}</h2>

    <el-form label-width="70px" :model="datas" size="small" class="lef">
      <el-form-item label="封面链接">
        <el-input
          v-model="datas.coverUrl"
          placeholder="请输入封面链接"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="视频链接">
        <el-input
          v-model="datas.src"
          placeholder="请输入视频链接"
          show-word-limit
        />
      </el-form-item>
      <!-- 是否自动播放 -->
      <el-form-item class="lef" label="是否自动播放" label-width="100px">
        {{ datas.autoplay ? '是' : '否' }}
        <el-checkbox style="margin-left: 196px" v-model="datas.autoplay" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'videostyle',
  props: {
    datas: Object,
  },
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style scoped lang="less">
.videostyle {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0 10px 20px;
  box-sizing: border-box;
  /* 标题 */
  h2 {
    padding: 24px 16px 24px 0;
    margin-bottom: 15px;
    border-bottom: 1px solid #f2f4f6;
    font-size: 18px;
    font-weight: 600;
    color: #323233;
  }

  .lef {
    :deep(.el-form-item__label) {
      text-align: left;
    }
  }

  /* 刷新 */
  .link {
    display: inline-block;
    padding: 0 10px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    cursor: pointer;
    color: #155bd4;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}
</style>
