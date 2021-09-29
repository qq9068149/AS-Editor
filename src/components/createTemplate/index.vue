<template>
  <div class="createTemplate">
    <!-- 上传图片 -->
    <el-dialog
      class="uploadIMG"
      title="选择页面模板"
      :lock-scroll="true"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="860px"
    >
      <!-- 内容 -->
      <el-tabs v-model="activeName" width="100%" @tab-click="handleClick">
        <el-tab-pane label="系统页模板" name="0">
          <el-row>
            <el-col :span="6" :offset="1">
              <!-- 模板列表 -->
              <el-card
                shadow="hover"
                @click.native="$router.push({ path: 'home' })"
              >
                <i
                  class="el-icon-circle-plus-outline"
                  style="
                    font-size: 45px;
                    color: #fff;
                    background: rgb(217, 220, 223, 0.5);
                    border-radius: 50%;
                  "
                />
                <div>空白模板</div>
              </el-card>
            </el-col>
            <el-col
              :span="6"
              v-for="(item, index) in dtList"
              :key="index"
              :offset="1"
            >
              <el-card shadow="hover">
                <van-image
                  width="100%"
                  height="320px"
                  fit="scale-down"
                  :src="item.imgUrl"
                />
                <div class="bottom">
                  <time class="name">{{ item.name }}</time>
                  <el-button
                    type="text"
                    class="button"
                    @click="
                      $router.push({
                        path: 'home?id=' + item.id + '&type=tpl',
                      })
                    "
                    >使用模板</el-button
                  >
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'createTemplate',
  data() {
    return {
      dialogVisible: false, //弹框默认隐藏
      activeName: '0', //tab选项
      dtList: [],
    }
  },
  created() {
    this.loadDefaultTemplate()
  },
  methods: {
    /* 显示弹框 */
    showExtension() {
      this.dialogVisible = true
    },
    // 关闭弹框
    handleClose() {
      // 隐藏上传文件
      this.dialogVisible = false
    },
    /* tab切换 */
    handleClick(tab, event) {
      console.log(tab, event)
    },
    loadDefaultTemplate() {
      this.$httpApi.defaultTemplate().then((res) => {
        if (res.code !== 0) return this.$message.error(res.msg)
        console.log(res)
        this.dtList = res.data.defaultTemplateList
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import '../../assets/css/minx.less';
.createTemplate {
  /* tab */
  /deep/.el-tabs__nav-wrap .is-top {
    padding: 0 40px !important;
    padding-left: 0 !important;
  }

  /deep/.el-dialog__title {
    font-size: 14px;
    font-weight: 700;
    color: #333;
  }

  // 上传弹框内容部分
  /deep/.uploadIMG .el-dialog__body {
    min-height: 280px;
    /deep/.el-tabs__content {
      min-height: 380px;
    }
    /deep/.el-tabs__nav-scroll {
      padding-left: 15px;
    }

    /deep/.el-tab-pane {
      overflow-x: scroll;
      display: flex;
      padding: 10px;
    }
  }
  /deep/.el-row {
    width: 896px;
    .el-card {
      margin-bottom: 30px;
      .el-card__body {
        height: 385px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .bottom {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .name{
            width: 70%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>
