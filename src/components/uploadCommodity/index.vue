<template>
  <div class="uploadCommodity">
    <!-- 选择商品 -->
    <el-dialog
      class="uploadIMG"
      title="选择商品"
      :lock-scroll="true"
      :visible.sync="dialogVisible"
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
        size="mini"
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
        size="mini"
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
        size="mini"
        placeholder="请输入链接，输入前确保可以访问"
        v-model="externalLink"
      ></el-input>

      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消 上 传</el-button>
        <el-button type="primary" @click="uploadInformation" :disabled="disabl"
          >点 击 上 传</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'uploadCommodity',
  data() {
    return {
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
    }
  },
  created() {},
  methods: {
    selectType() {
      // 清空 options
      this.options = []
    },

    // 选择类型
    changeType(isVisible, linkType) {
      if (isVisible && linkType) {
        this.emptyText = '正在搜索中'
        /* 获取视频,音频,直播信息 */
        let res = {
          code: 0,
          success: true,
          error: false,
          data: [
            {
              id: 403,
              createTime: 1621504872000,
              updateTime: 1621504872000,
              remark: null,
              name: '查玛代表传承人',
              classifyId: null,
              type: 2,
              retailPrice: 0,
              price: 0,
              memberPrice: 0,
              vipPrice: 0,
              costPrice: 0,
              jidPrice: 0,
              zidPrice: 0,
              tidPrice: 0,
              scorePrice: 0,
              freight: 0,
              top: null,
              score: null,
              sort: 1,
              status: 1,
              code: null,
              coverUrl:
                'https://imgs.starfirelink.com/minicourse/非遗传承人@2x_1621504834414.png',
              url: 'https://mgt.starfirelink.com/mobile/index.html#/videoOnDemand?videoId=5285890818212341060',
              lengths: '',
              introduce: '',
              free: 1,
              classOne: null,
              classTwo: null,
              classThree: null,
              seriesId: 0,
              vId: null,
              videoId: '5285890818212341060',
              teacherId: 1,
              details: '',
              buys: 0,
              tryVideoId: null,
              tryLengths: null,
              num: 0,
              bannerImgUrl: null,
              specifications: null,
              color: null,
              createTimes: null,
              createTimee: null,
              updateTimes: null,
              updateTimee: null,
              page: 1,
              limit: 20,
              order: null,
              ordertype: null,
              minPrice: null,
              maxPrice: null,
              seriesName: null,
            },
            {
              id: 396,
              createTime: 1621403190000,
              updateTime: 1621416056000,
              remark: null,
              name: '测试',
              classifyId: null,
              type: 2,
              retailPrice: 0,
              price: 1,
              memberPrice: 1,
              vipPrice: 0,
              costPrice: 0,
              jidPrice: 0,
              zidPrice: 0,
              tidPrice: 0,
              scorePrice: 0,
              freight: 0,
              top: null,
              score: null,
              sort: 1,
              status: 1,
              code: null,
              coverUrl:
                'https://imgs.starfirelink.com/minicourse/QQ截图20210409170420_1621416051505.png',
              url: 'https://mgt.starfirelink.com/mobile/index.html#/videoOnDemand?videoId=',
              lengths: '1',
              introduce: '1',
              free: 0,
              classOne: null,
              classTwo: null,
              classThree: null,
              seriesId: 85,
              vId: null,
              videoId: '',
              teacherId: 1,
              details: '1',
              buys: 1,
              tryVideoId: null,
              tryLengths: null,
              num: 0,
              bannerImgUrl: null,
              specifications: null,
              color: null,
              createTimes: null,
              createTimee: null,
              updateTimes: null,
              updateTimee: null,
              page: 1,
              limit: 20,
              order: null,
              ordertype: null,
              minPrice: null,
              maxPrice: null,
              seriesName: '非遗商城',
            },
          ],
        }
        this.activ = 0
        res.data.length === 0 ? (this.emptyText = '暂无数据') : null
        this.options = res.data
        // 校验数据
        this.options = this.$utils.filterCommodityData(linkType, this.options)
      }
    },
    // 保存跳转的地方
    changeId(res) {
      console.log(res)
      // 通过商品 type 和 id  获取到商品数据  newList接口数据可以不用
      console.log(this.$utils.getCoursewareData(this.type, res.id),'--------')
      this.dialogImageUrl = this.$utils.getCoursewareData(this.type, res.id)
    },
    /* 显示上传文件组件 */
    showUpload() {
      this.dialogVisible = true
    },
    /* 传递图片地址 */
    uploadInformation() {
      this.dialogImageUrl.httpType = this.type
      this.$emit('uploadListInformation', this.dialogImageUrl)

      // 隐藏上传弹框
      this.dialogVisible = false
      this.uploadShow = false
      this.dialogImageUrl = {}
    },
    // 关闭弹框
    handleClose() {
      this.$confirm('点击取消后您填写的信息将丢失，您确定取消？')
        .then(() => {
          // 隐藏上传文件
          this.dialogVisible = false
          this.dialogImageUrl = {}
        })
        .catch(() => {})
    },
  },
  computed: {
    // 提交按钮是否可以点击
    disabl() {
      if (!this.dialogImageUrl) return true
      else return false
    },
  },
}
</script>

<style lang="less" scoped>
@import '../../assets/css/minx.less';
.uploadCommodity {
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
