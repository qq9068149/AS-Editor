<template>
  <div class="decorate">
    <!-- 标题 -->
    <h2>页面设置</h2>

    <!-- 表单 -->
    <el-form
      label-position="top"
      label-width="80px"
      :model="datas"
      :rules="rules"
      size="small"
    >
      <el-form-item label="页面名称" :hide-required-asterisk="true" prop="name">
        <el-input
          v-model="datas.name"
          placeholder="页面标题"
          maxlength="25"
          show-word-limit
        />
      </el-form-item>

      <el-form-item
        label="页面描述"
        :hide-required-asterisk="true"
        prop="details"
      >
        <el-input
          v-model="datas.details"
          placeholder="用户通过微信分享给朋友时，会自动显示页面描述"
        />
      </el-form-item>

      <!-- 个人中心 -->
      <el-form-item label="个人中心" class="lef">
        {{ datas.isPerson ? '显示' : '隐藏' }}
        <el-checkbox style="margin-left: 196px" v-model="datas.isPerson" />
      </el-form-item>

      <!-- 返回 -->
      <el-form-item label="返回按钮" class="lef">
        {{ datas.isBack ? '显示' : '隐藏' }}
        <el-checkbox style="margin-left: 196px" v-model="datas.isBack" />
      </el-form-item>

      <!-- 高度 -->
      <el-form-item label="高度" class="lef-height">
        <el-slider
          v-model="datas.titleHeight"
          :max="100"
          :min="35"
          input-size="mini"
          show-input
        >
        </el-slider>
      </el-form-item>

      <!-- 背景颜色 -->
      <el-form-item label="背景颜色">
        <!-- 单选框 -->
        <el-radio-group v-model="colourAction">
          <el-radio label="默认颜色" />
          <el-radio label="自定义颜色" />
        </el-radio-group>

        <!-- 颜色选择器 -->
        <el-color-picker
          v-model="datas.bgColor"
          show-alpha
          class="picke"
          v-show="pickeShow"
          :predefine="predefineColors"
        >
        </el-color-picker>
      </el-form-item>

      <el-form-item label="背景图片">
        <div class="shop-head-pic" style="text-align: center">
          <img class="home-bg" :src="datas.bgImg" alt="" v-if="datas.bgImg" />
          <div class="shop-head-pic-btn" style="text-align: center">
            <el-button
              @click="showUpload('2')"
              class="uploadImg"
              type="primary"
              plain
              ><i class="el-icon-plus" />更换图片</el-button
            >
            <el-button type="primary" @click="clear()">清空图片</el-button>
          </div>
        </div>
      </el-form-item>

    </el-form>

    <!-- 上传图片 -->
    <uploadimg ref="upload" @uploadInformation="uploadInformation" />
  </div>
</template>

<script>
import uploadimg from '../../uploadImg' //图片上传

export default {
  name: 'decorate',
  props: {
    datas: Object,
  },
  data() {
    return {
      rules: {
        //校验表单输入
        name: [
          //页面名称
          { required: true, message: '请输入页面名称', trigger: 'blur' },
        ],
        details: [
          //页面描述
          { required: true, message: '请输入页面描述', trigger: 'blur' },
        ],
        classification: [
          //分类
          { required: true, message: '请选择页面分类', trigger: 'blur' },
        ],
      },
      colourAction: '默认颜色', // 颜色选择
      pickeShow: false, //颜色选择器是否显示
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
      uploadImgDataType: null, // 获取到的图片地址属于哪一类别   0 修改底部logo   1 修改店铺图标 2 页面背景图
    }
  },

  created() {},

  methods: {
    // 显示上传图片组件   type :  2 页面背景图
    showUpload(type) {
      this.uploadImgDataType = type
      this.$refs.upload.showUpload()
    },

    // 上传图片
    uploadInformation(res) {
      if (this.uploadImgDataType === '2') {
        this.datas.bgImg = res
      }
    },

    // 清空背景图片
    clear() {
      this.datas.bgImg = ''
    },

  },
  watch: {
    colourAction(data) {
      if (data === '默认颜色') {
        this.datas.bgColor = 'rgba(249, 249, 249, 10)'
        this.pickeShow = false
        return
      } else return (this.pickeShow = true)
    },
  },
  components: { uploadimg },
}
</script>

<style scoped lang="less">
/* 页面设置 */
.decorate {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0 10px;
  box-sizing: border-box;
  h2 {
    padding: 24px 16px 24px 0;
    margin-bottom: 15px;
    border-bottom: 1px solid #f2f4f6;
    font-size: 18px;
    font-weight: 600;
    color: #323233;
  }
  /* 选择器添加和刷新 */
  .ification {
    color: #155bd4;
    font-size: 14px;
    padding: 0 15px;
    cursor: pointer;
  }
  /* 颜色选择器 */
  .picke {
    margin-left: 15px;
    vertical-align: top;
  }
  .home-bg {
    width: 100px;
    height: 300px;
  }

  .lef {
    display: flex;
    /deep/.el-form-item__label {
      text-align: left;
      margin-right: 20px;
    }
  }
  .lef-height {
    /deep/.el-form-item__label {
      text-align: left;
      width: 80px;
      float: left;
    }
    /deep/.el-form-item__content {
      margin-left: 80px;
    }
  }

  // 底部logo
  .bottomLogo {
    display: flex;
    flex-direction: column;
    img {
      display: block;
      width: 220px;
      margin: 10px auto;
    }
  }

  // 店铺信息修改
  .shop-info {
    .shop-name {
      display: flex;
      flex-direction: row;
      color: #ababab;
      .el-input {
        flex: 1;
      }
    }
    .shop-head-pic {
      color: #ababab;
      display: flex;
      flex-direction: column;
      img {
        width: 70px;
        height: 70px;
        margin: 10px auto;
      }
      .shop-head-pic-btn {
        display: flex;
        flex-direction: row;
        .el-button {
          flex: 1;
        }
      }
    }
  }
}
</style>
