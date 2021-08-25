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
          <!-- 模板列表 -->
          <section class="templateList">
            <div class="entyTemplate">
              <i
                class="el-icon-circle-plus-outline"
                style="
                  font-size: 45px;
                  color: #fff;
                  background: rgb(217, 220, 223, 0.5);
                  border-radius: 50%;
                "
              />
              <p style="margin-top: 10px; font-size: 14px; color: #7d7e80">
                使用空白模板
              </p>
              <!-- 进入事件 -->
              <div class="hove">
                <el-button
                  type="primary"
                  size="small"
                  @click="$router.push({ path: 'home' })"
                  >使用模板</el-button
                >
              </div>
            </div>
          </section>
          <div v-for="(item, index) in dtList" :key="index">
            <section class="templateList">
              <!--                <i class="el-icon-circle-plus-outline" style="font-size: 45px;color: #fff;background: rgb(217, 220, 223, .5);border-radius: 50%;" />-->
              <van-image
                width="100%"
                height="320px"
                fit="scale-down"
                :src="item.imgUrl"
              />
              <p style="margin-top: 10px; font-size: 14px; color: #7d7e80">
                {{ item.name }}
              </p>
              <!-- 进入事件 -->
              <div class="hove">
                <el-button
                  type="primary"
                  size="small"
                  @click="
                    $router.push({ path: 'home?id=' + item.id + '&type=tpl' })
                  "
                  >使用模板</el-button
                >
              </div>
            </section>
          </div>
        </el-tab-pane>

        <!-- <el-tab-pane label="行业模板" name="1">行业模板</el-tab-pane>
        <el-tab-pane label="活动/节日模板" name="2">活动/节日模板</el-tab-pane>
        <el-tab-pane label="主页模板" name="3">主页模板</el-tab-pane>
        <el-tab-pane label="我的模板" name="4">我的模板</el-tab-pane> -->
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
      /* 模板列表 */
      .templateList {
        width: 184px;
        height: 380px;
        position: relative;
        transition: all 1s;
        transform: translateY(0);
        margin-top: 10px;
        margin-left: 20px;
        border-radius: 4px 4px 0 0;
        border: 1px solid #f2f2f2;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .entyTemplate {
          width: 185px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .hove {
          display: none;
        }

        &:hover {
          transform: translateY(-5px);
          margin-top: -10px;
          /* 进入事件 */
          .hove {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>
