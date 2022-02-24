<template>
  <div class="uploadCommodity">
    <!-- 选择商品 -->
    <el-dialog
      title="选择商品"
      :lock-scroll="true"
      v-model="dialogVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="false"
      center
      width="500px"
    >
      <!-- 选择类型 -->
      <el-select
        style="width: 60%"
        v-model="type"
        placeholder="请选择跳转类型"
        size="small"
        @change="selectType()"
      >
        <el-option
          v-for="item in optionsType"
          :key="item.name"
          :label="item.name"
          :value="item.type"
        ></el-option>
      </el-select>

      <!-- 选择 -->
      <el-select
        style="width: 60%; margin-top: 15px"
        v-if="type !== '11'"
        v-model="dialogImageUrl.name"
        placeholder="请选择图片跳转链接"
        size="small"
        @change="changeId"
        :no-data-text="emptyText"
        @visible-change="
          (isVisible) => {
            return changeType(isVisible, type)
          }
        "
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item"
          :disabled="item.disabled"
        ></el-option>
      </el-select>

      <!-- 输入外部链接 -->
      <el-input
        style="width: 60%; margin-top: 15px"
        v-if="type === '11'"
        size="small"
        placeholder="请输入链接，输入前确保可以访问"
        v-model="externalLink"
      ></el-input>

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
  </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import { ElMessageBox } from 'element-plus'

export default {
  name: 'uploadCommodity',
  emits: ['uploadListInformation'],
  setup(props, ctx) {
    // 数据集合
    const datas = reactive({
      dialogVisible: false, //弹框默认隐藏
      dialogImageUrl: {}, // 选择的数据
      type: '2',
      uploadShow: false, //是否显示上传图片
      optionsType: [
        {
          type: '2',
          name: '书籍',
        },
        {
          type: '5',
          name: '其他',
        },
      ], // 选择跳转类型
      options: [], //后端返回的列表提供下拉选择
      externalLink: null,
      emptyText: '',
    })

    // 事件集合
    const methods = {
      selectType() {
        // 清空 options
        datas.options = []
      },
      // 选择类型
      changeType(isVisible, linkType) {
        if (isVisible && linkType) {
          datas.emptyText = '正在搜索中'
          /* 获取信息 */
          let res = {
            code: 0,
            success: true,
            error: false,
            data: [
              {
                coverUrl:
                  'https://imgs.starfirelink.com/minicourse/非遗传承人@2x_1621504834414.png',
                introduce: '',
                price: 0,
                name: '测试1',
                videoId: '5285890818212341060',
                id: 403,
                type: 2,
                seriesId: '0',
              },
              {
                coverUrl:
                  'https://imgs.starfirelink.com/minicourse/QQ截图20210409170420_1621416051505.png',
                introduce: '1',
                price: 1,
                name: '测试2',
                videoId: '',
                id: 396,
                type: 2,
                seriesId: '85',
              },
            ],
          }
          res.data.length === 0 ? (datas.emptyText = '暂无数据') : null
          datas.options = res.data
        }
      },
      // 保存跳转的地方
      changeId(res) {
        datas.dialogImageUrl = res
        console.log(datas.dialogImageUrl, '----------------changeId')
      },
      /* 显示上传文件组件 */
      showUpload() {
        datas.dialogVisible = true
      },
      /* 传递图片地址 */
      uploadInformation() {
        datas.dialogImageUrl.httpType = datas.type
        ctx.emit('uploadListInformation', datas.dialogImageUrl)

        // 隐藏上传弹框
        datas.dialogVisible = false
        datas.uploadShow = false
        datas.dialogImageUrl = {}
      },
      // 关闭弹框
      handleClose() {
        ElMessageBox.confirm('点击取消后您填写的信息将丢失，您确定取消？')
          .then(() => {
            // 隐藏上传文件
            datas.dialogVisible = false
            datas.dialogImageUrl = {}
          })
          .catch(() => {})
      },
    }

    // 通过computed获得disabl
    const disabl = computed(() => {
      if (!datas.dialogImageUrl) return true
      return false
    })

    return {
      ...toRefs(datas),
      ...methods,
      disabl,
    }
  },
}
</script>

<style lang="less" scoped>
@import '../../assets/css/minx.less';
.uploadCommodity {
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
}
</style>
