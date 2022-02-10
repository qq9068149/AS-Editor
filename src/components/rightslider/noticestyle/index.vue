<template>
  <div class="noticestyle">
    <!-- 标题 -->
    <h2>{{ datas.text }}</h2>

    <!-- 公告 -->
    <el-form
      label-width="90px"
      :model="datas"
      :rules="rules"
      size="small"
      class="lef"
    >
      <el-form-item
        label="公告"
        :hide-required-asterisk="true"
        prop="noticeText"
      >
        <el-input v-model="datas.noticeText" placeholder="请输入公告" />
      </el-form-item>

      <div style="height: 10px" />

      <!-- 背景颜色 -->
      <el-form-item label="背景颜色" class="lef">
        <!-- 颜色选择器 -->
        <el-color-picker
          v-model="datas.backColor"
          show-alpha
          class="picke"
          :predefine="predefineColors"
        >
        </el-color-picker>
      </el-form-item>

      <div style="height: 10px" />

      <!-- 文字颜色 -->
      <el-form-item label="文字颜色" class="lef">
        <!-- 颜色选择器 -->
        <el-color-picker
          v-model="datas.textColor"
          show-alpha
          class="picke"
          :predefine="predefineColors"
        >
        </el-color-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'noticestyle',
  props: {
    datas: Object,
  },
  data() {
    return {
      rules: {
        //校验表单输入
        noticeText: [
          //页面名称
          { required: true, message: '请输入公告', trigger: 'blur' },
        ],
      },
      predefineColors: [
        // 颜色选择器预设
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        '#409EFF',
        '#909399',
        '#C0C4CC',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577',
      ],
    }
  },
}
</script>

<style scoped lang="less">
.noticestyle {
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

  /* 颜色选择器 */
  .picke {
    float: right;
  }
}
</style>
