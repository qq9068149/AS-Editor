<template>
  <div class="extension">
    <!-- 上传图片 -->
    <el-dialog
      class="uploadIMG"
      title="推广"
      :lock-scroll="true"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="646px"
    >
      <!-- 内容 -->
      <section class="container">
        <img :src="poster" style="width: 280px; height: 450px" alt="" />

        <!-- 二维码 -->
        <img
          ref="qrcodeImg"
          :src="qrcodeData"
          id="qrcode"
          style="width: 235px; height: 235px; position: absolute; z-index: -999"
        />

        <!-- 操作 -->
        <div class="text">
          <div style="margin: 0 0 20px 0">
            <span style="font-size: 14px; margin-right: 10px">选择海报：</span>
            <el-select v-model="selectType" size="mini" @change="templatetype">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>

          <p class="top">复制推广链接</p>

          <!-- 复制内容 -->
          <div class="cilp">
            <span id="foo">{{ URL }}</span>
            <el-button
              size="small"
              data-clipboard-target="#foo"
              id="btn"
              data-clipboard-action="copy"
              type="primary"
              >复制</el-button
            >
          </div>

          <!-- 下载图片 -->
          <p class="operation">
            <span @click="downloadPoster">下载完整海报</span>
            <span @click="downloadqrcode">仅下载二维码</span>
          </p>
        </div>
      </section>
    </el-dialog>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import QRCode from 'qrcode'

export default {
  name: 'extension',
  data() {
    return {
      dialogVisible: false, //弹框默认隐藏
      activeName: '0', //tab选项
      URL: '', //页面链接
      qrcodeData: '', //二维码base64
      poster: '', //海报链接
      selectType: '', //下拉框
      options: [], // 海报类型选择
      templateId: '', //当前页面id
    }
  },
  created() {
    this.clipboard()
  },
  methods: {
    /* 显示弹框 */
    showExtension(res, isHome) {
      // 默认模板
      this.poster = res.posterUrl
      this.templateId = res.id   
      console.log(res, isHome,'-----------------showExtension')
      if (isHome) {
        console.log(res, isHome,'-----------------showExtension')
        this.URL = `${this.$baseURL}#/shop?orgId=${res.userAdminId}`
      } else {
        this.URL = `${this.$baseURL}#/shop?id=${res.id}&orgId=${res.userAdminId}`
      }

      QRCode.toDataURL(this.URL)
        .then((url) => {
          this.qrcodeData = url
        })
        .catch((err) => {
          console.error(err)
        })
      this.dialogVisible = true
      // 获取模板
      this.selectDataApi()
    },

    // 获取海报模板
    selectDataApi() {
      this.$httpApi.selectData().then((res) => {
        if (res.code !== 0) return this.$message.error(res.msg)
        this.options = res.data.posterList
        this.selectType = res.data.posterList[0].title
        // 没有默认模板请求
        if (!this.poster) {
          this.getPoster(res.data.posterList[0].id)
        }
      })
    },

    // 获取海报
    getPoster(id) {
      const loading = this.$loading({
        lock: true,
        text: '海报加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      this.$httpApi
        .poster({
          posterId: id,
          shopTemplateId: this.templateId,
          path: this.URL,
        })
        .then((res) => {
          loading.close()
          if (res.code !== 0) return this.$message.error(res.msg)
          this.$message({
            message: '海报加载成功',
            type: 'success',
          })
          this.poster = res.data.url
        })
    },

    // 选择模板类型
    templatetype(res) {
      this.getPoster(res)
    },

    // 关闭弹框
    handleClose() {
      // 隐藏上传文件
      this.dialogVisible = false
    },

    /* 复制 */
    clipboard() {
      const clipboard = new Clipboard('#btn')
      clipboard.on('success', (e) => {
        this.$message({
          message: '复制成功',
          type: 'success',
        })
        e.clearSelection()
      })
      clipboard.on('error', () => {
        this.$message.error('复制失败')
      })
    },

    /* 下载二维码 */
    downloadqrcode() {
      var link = document.createElement('a')
      link.setAttribute('href', this.qrcodeData)
      link.setAttribute('download', '星火.png')
      link.click()
    },

    // 下载海报
    downloadPoster() {
      this.getUrlBase64(this.poster).then((base64) => {
        let link = document.createElement('a')
        link.href = base64
        link.download = '星火海报.png'
        link.click()
      })
    },
    getUrlBase64(url) {
      return new Promise((resolve) => {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        let img = new Image()
        img.crossOrigin = 'Anonymous' //允许跨域
        img.src = url
        img.onload = function () {
          canvas.height = 720
          canvas.width = 400
          ctx.drawImage(img, 0, 0, 400, 720)
          let dataURL = canvas.toDataURL('image/png')
          canvas = null
          resolve(dataURL)
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import '../../assets/css/minx.less';
.extension {
  position: relative;

  /deep/.el-dialog__title {
    font-size: 14px;
    font-weight: 700;
    color: #333;
  }

  // 上传弹框内容部分
  /deep/.uploadIMG .el-dialog__body {
    min-height: 280px;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;

    /* 内容 */
    .container {
      width: 100%;
      height: 100%;
      display: flex;

      /* 操作 */
      .text {
        margin-left: 12px;
        .top {
          font-size: 12px;
          color: #333;
        }
        /* 复制 */
        .cilp {
          display: flex;
          margin-top: 20px;
          #foo {
            width: 245px;
            cursor: no-drop;
            padding: 0 10px;
            border: 1px solid #e5e5e5;
            height: 30px;
            line-height: 30px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            background: #f8f8f8;
            opacity: 0.5;
            font-size: 12px;
          }
        }
        /* 下载图片 */
        .operation {
          margin-top: 20px;
          span {
            color: #38f;
            padding: 0 5px;
            font-size: 12px;
            cursor: pointer;
            &:first-of-type {
              border-right: 1px solid #e5e5e5;
              padding-left: 0;
            }
          }
        }
      }
    }
  }

  .disable {
    /deep/.el-upload {
      display: none !important;
    }
  }
}
</style>
