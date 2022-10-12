<template>
  <div class="uploadImg">
    <!-- 上传图片 -->
    <el-dialog
      title="上传图片"
      :lock-scroll="true"
      v-model="dialogVisible"
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
        <i class="el-icon-plus">+</i>
      </el-upload>

      <!-- 按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消 上 传</el-button>
          <el-button
            type="primary"
            @click="uploadInformation"
            :disabled="disabl"
            >点 击 上 传</el-button
          >
        </span>
      </template>
    </el-dialog>

    <!-- 图片放大 -->
    <el-dialog v-model="dialogVisibles">
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
import { reactive, toRefs, computed } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { uploadCOS } from '@/utils/upload'

export default {
  name: 'uploadImg',
  emits: ['uploadInformation', 'handleClose'],
  setup(props, ctx) {
    // 数据集合
    const datas = reactive({
      dialogVisible: false, //弹框默认隐藏
      dialogVisibles: false, // 放大的图片
      dialogImageUrl: '', // 上传的图片
      uploadShow: false, //是否显示上传图片
    })

    // 事件集合
    const methods = {
      /* 显示上传文件组件 */
      showUpload() {
        datas.dialogVisible = true
      },
      /* 传递图片地址 */
      uploadInformation() {
        ctx.emit('uploadInformation', datas.dialogImageUrl)
        // 隐藏上传弹框
        datas.dialogVisible = false
        datas.uploadShow = false
        datas.dialogImageUrl = ''
      },
      // 关闭弹框
      handleClose() {
        ElMessageBox.confirm('点击取消后您填写的信息将丢失，您确定取消？')
          .then(() => {
            methods.handleRemove()
            ctx.emit('handleClose')
            // 隐藏上传文件
            datas.dialogVisible = false
            datas.dialogImageUrl = ''
          })
          .catch(() => {})
      },

      // 删除图片
      handleRemove() {
        datas.uploadShow = false
        datas.dialogImageUrl = ''
        return true
      },

      // 预览
      preview() {
        datas.dialogVisibles = true
      },

      // 上传成功
      onSuccess(response) {
        // 返回错误
        if (response.success != true)
          return ElMessage.error('上传图片失败，请删除后重新上传')

        datas.dialogImageUrl = response.data.src
      },

      // 上传前
      uploads(file) {
        if (!file.type.includes('image')) {
          ElMessage.error('请上传图片！')
          return false
        }
        datas.uploadShow = true
      },

      // 上传失败
      uploadError() {
        ElMessage.error('请重新上传')
        datas.uploadShow = false
      },

      /**
       * 自定义上传（使用腾讯云COS）
       * http-request	覆盖action默认的上传行为，可以自定义上传的实现
       * 如果要用api接口上传去除el-upload的 http-request属性即可
       */
      upload(data) {
        uploadCOS(data.file).then((res) => {
          datas.dialogImageUrl = res
        })
      },
    }
    // 通过computed获得baseupload
    const baseupload = computed(() => {
      return `${window.global_config.BASE_URL}upload/miniShop`
    })

    // 通过computed获得disabl
    const disabl = computed(() => {
      if (!datas.dialogImageUrl) return true
      return false
    })

    return {
      ...toRefs(datas),
      ...methods,
      baseupload,
      disabl,
    }
  },
}
</script>

<style lang="less" scoped>
@import '../../assets/css/minx.less';
.uploadImg {
  // 上传弹框内容部分
  :deep(.el-dialog__body) {
    height: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    justify-content: center;
  }

  .disable {
    :deep(.el-upload) {
      display: none !important;
    }
  }
  .el-icon-plus {
    display: block;
    margin-top: 50px;
  }
}
</style>
