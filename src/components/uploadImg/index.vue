<template>
  <div class="uploadImg">
    <!-- 上传图片 -->
    <el-dialog
      class="uploadIMG"
      title="上传图片"
      :lock-scroll="true"
      :visible.sync="dialogVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="false"
      center
      width="500px"
    >
      <!-- 上传图片 -->
      <el-upload
        v-if="dialogVisible"
        name="file"
        :action="baseupload"
        list-type="picture-card"
        :limit="1"
        :on-preview="preview"
        :on-success="onSuccess"
        :with-credentials="true"
        :on-error="uploadError"
        :before-upload="uploads"
        :before-remove="handleRemove"
        :class="uploadShow ? 'disable' : ''"
        :http-request="upload"
      >
        <i class="el-icon-plus"></i>
      </el-upload>

      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消 上 传</el-button>
        <el-button type="primary" @click="uploadInformation" :disabled="disabl"
          >点 击 上 传</el-button
        >
      </span>
    </el-dialog>

    <!-- 图片放大 -->
    <el-dialog :visible.sync="dialogVisibles" class="xianshi">
      <img
        draggable="false"
        style="width: 640px; height: 400px; margin: 20px 0px"
        :src="dialogImageUrl"
        alt=""
      />
    </el-dialog>
  </div>
</template>

<script>
import { uploadCOS } from '@/utils/upload'
export default {
  name: 'uploadImg',
  data() {
    return {
      dialogVisible: false, //弹框默认隐藏
      dialogVisibles: false, // 放大的图片
      dialogImageUrl: '', // 上传的图片
      uploadShow: false, //是否显示上传图片
    }
  },
  created() {},
  methods: {
    /* 显示上传文件组件 */
    showUpload() {
      this.dialogVisible = true
    },
    /* 传递图片地址 */
    uploadInformation() {
      this.$emit('uploadInformation', this.dialogImageUrl)
      // 隐藏上传弹框
      this.dialogVisible = false
      this.uploadShow = false
      this.dialogImageUrl = ''
    },
    // 关闭弹框
    handleClose() {
      this.$confirm('点击取消后您填写的信息将丢失，您确定取消？')
        .then(() => {
          this.handleRemove()
          this.$emit('handleClose')
          // 隐藏上传文件
          this.dialogVisible = false
          this.dialogImageUrl = ''
        })
        .catch(() => {})
    },

    // 删除图片
    handleRemove() {
      this.uploadShow = false
      this.dialogImageUrl = ''
      return true
    },

    // 预览
    preview() {
      this.dialogVisibles = true
    },

    // 上传成功
    onSuccess(response) {
      // 返回错误
      if (response.success != true)
        return this.$message.error('上传图片失败，请删除后重新上传')

      this.dialogImageUrl = response.data.src
    },

    // 上传前
    uploads(file) {
      if (!file.type.includes('image')) {
        this.$message.error('请上传图片！')
        return false
      }
      this.uploadShow = true
    },

    // 上传失败
    uploadError() {
      this.$message.error('请重新上传')
      this.uploadShow = false
    },

    /**
     * 自定义上传（使用腾讯云COS）
     * http-request	覆盖action默认的上传行为，可以自定义上传的实现
     * 如果要用api接口上传去除el-upload的 http-request属性即可
     */
    upload(data) {
      uploadCOS(data.file).then((res) => {
        this.dialogImageUrl = res
      })
    },
  },
  computed: {
    // baseurl
    baseupload() {
      return `${window.global_config.BASE_URL}upload/miniShop`
    },

    // 提交按钮是否可以点击
    disabl() {
      if (!this.dialogImageUrl) return true
      return false
    },
  },
}
</script>

<style lang="less" scoped>
@import '../../assets/css/minx.less';
.uploadImg {
  // 上传弹框内容部分
  /deep/.uploadIMG .el-dialog__body {
    height: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    justify-content: center;
  }

  .disable {
    /deep/.el-upload {
      display: none !important;
    }
  }
}
</style>
