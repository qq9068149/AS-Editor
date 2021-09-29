<template>
  <div class="screen">
    <div class="screen-setting">
      <div class="screen-setting_left">
        <div class="__phone">
          <div class="__phone_window">
            <div class="is_skip" v-if="facade.chamfer_skip">
              <div class="is_skip_bg"></div>
              <div class="is_skip_txt">跳过</div>
            </div>
            <el-carousel
              trigger="click"
              height="1206px"
              arrow="never"
              @change="handleChange"
              :interval="3000"
              :class="{
                circle: facade.indicator_style == 1,
                strip: facade.indicator_style == 2,
                number: facade.indicator_style == 3,
                left: facade.indicator_align === 'left',
                center: facade.indicator_align === 'center',
                right: facade.indicator_align === 'right',
              }"
            >
              <el-carousel-item
                v-for="(item, index) in img_content"
                :key="index"
              >
                <img :src="getBannerImg(item.url)" width="100%" height="100%" />
              </el-carousel-item>
            </el-carousel>
            <div
              class="carousel_number"
              :class="{
                left: facade.indicator_align === 'left',
                center: facade.indicator_align === 'center',
                right: facade.indicator_align === 'right',
              }"
              v-if="facade.indicator_style == 3"
            >
              {{ activeNumber + '/' + img_content.length }}
            </div>
          </div>
        </div>
      </div>
      <div class="screen-setting_right">
        <div class="__tabs">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="内容设置" name="first">
              <el-form label-width="80px">
                <el-form-item label="显示设置">
                  <el-radio-group v-model="displayType">
                    <el-radio :label="1">首次打开商城时</el-radio>
                    <el-radio :label="2">按周期显示</el-radio>
                  </el-radio-group>
                  <div v-if="displayType === 2" class="le-input--120">
                    每
                    <el-input v-model.number="days" :maxlength="5">
                      <template slot="append"> 天 </template>
                    </el-input>
                    显示一次
                  </div>
                </el-form-item>
                <el-form-item label="允许跳过">
                  <el-switch
                    v-model="facade.chamfer_skip"
                    active-color="#409EFF"
                    inactive-color="#BBBFC8"
                  >
                  </el-switch>
                </el-form-item>
                <el-form-item label="图片设置">
                  <div class="le-prompt-text">
                    建议图片尺寸：1080px*1920px
                  </div>
                  <div class="flex flex-wrap">
                    <vuedraggable v-model="content">
                      <div
                        class="_imagelist_item select-cover__288"
                        v-for="(item, index) in content"
                        :key="index"
                      >
                        <i
                          class="le-icon le-icon-cha2 _imagelist_item-close"
                          @click.stop="handleDelete(index)"
                        ></i>
                        <img :src="item.url" alt="">
                      </div>
                    </vuedraggable>
                  </div>
                </el-form-item>
               
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="le-cardpin">
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </div>
  </div>
</template>
<script type="text/javascript">
// import choice from './choice.vue';
import vuedraggable from 'vuedraggable'

export default {
  components: {
    // choice,
    vuedraggable,
  },
  data() {
    return {
      activeName: 'first',
      activeNumber: 1,
      displayType: 1,
      days: 7,
      content: [
          {
          url: 'http://qmxq.oss-cn-hangzhou.aliyuncs.com/template/ad_1.png',
        },
        {
          url: 'http://qmxq.oss-cn-hangzhou.aliyuncs.com/template/ad_2.png',
        },
        {
          url: 'http://qmxq.oss-cn-hangzhou.aliyuncs.com/template/ad_3.png',
        },
      ],
      def_content: [
        {
          url: 'http://qmxq.oss-cn-hangzhou.aliyuncs.com/template/ad_1.png',
        },
        {
          url: 'http://qmxq.oss-cn-hangzhou.aliyuncs.com/template/ad_2.png',
        },
        {
          url: 'http://qmxq.oss-cn-hangzhou.aliyuncs.com/template/ad_3.png',
        },
      ],
      facade: {
        indicator_style: '3',
        indicator_align: 'center',
        indicator_color: '#666666',
        chamfer_skip: true,
      },
      pointerData: [
        {
          value: 1,
          name: '圆形',
        },
        {
          value: 2,
          name: '数字',
        },
        {
          value: 3,
          name: '数字',
        },
      ]
    }
  },
  /**
   * 计算属性
   * @type {Object}
   */
  computed: {
    img_content() {
      if (this.content.length === 0) {
        return this.def_content
      }
      if (this.content.length == 1) {
        if (!this.content[0].url) {
          return this.def_content
        }
      }
      return this.content
    },
  },
  /**
   * 页面渲染前
   * @return {[type]} [description]
   */
  created() {},
  /**
   * 数据监听
   * @type {Object}
   */
  watch: {},
  /**
   * 页面加载执行
   * @return {[type]} [description]
   */
  async mounted() {
    this.handleLoaddata()
    //this.handleStyle();
  },
  methods: {
    getBannerImg(value) {
      return value
      // var num = Math.floor(Math.random() * 3);
      // if (value) {
      //   return value;
      // } else {
      //   return this.def_content[num].url;
      // }
    },
    handleChange(value) {
      this.activeNumber = value + 1
      this.handleStyle()
      this.getBannerImg()
    },
    /**
     * 修改样式
     * @return {[type]} [description]
     */
    handleStyle() {
      let color = this.facade.indicator_color
      var el_b = document.querySelectorAll(
        '.el-carousel__indicator.el-carousel__indicator--horizontal .el-carousel__button'
      )
      var el_a = document.querySelectorAll(
        '.el-carousel__indicator.el-carousel__indicator--horizontal.is-active .el-carousel__button'
      )
      for (var i = el_b.length - 1; i >= 0; i--) {
        el_b[i].style.backgroundColor = '#FFFFFF'
        el_b[i].style.opacity = 1
      }
      el_a[0].style.backgroundColor = color
    },
    handleClick() {},
    /**
     * 删除图片
     * @return {[type]} [description]
     */
    handleDelete(index) {
      this.content.splice(index, 1)
    },
    /**
     * 获取数据
     * @return {[type]} [description]
     */
    handleLoaddata() {
      // this.$heshop
      //   .search(
      //     'POST',
      //     { include: 'setting' },
      //     {
      //       keyword: 'openingad'
      //     }
      //   )
      //   .then(res => {
      //     if (res && res.content) {
      //       this.content = res.content.content;
      //       this.facade = res.content.facade;
      //       this.displayType = res.content.type ? res.content.type : 1;
      //       this.days = res.content.days;
      //     }
      //   })
      //   .catch(() => {
      //     this.$message.error('加载配置信息失败，请检查网络');
      //   });
    },
    /**
     * 执行数据提交
     * @return {[type]} [description]
     */
    handleSubmit() {
      for (let i = 0; i < this.content.length; i++) {
        if (!this.content[i].url) {
          this.$message.error('图片不能为空')
          return
        }
      }
      // this.$heshop
      //   .setting('post', {
      //     keyword: 'openingad',
      //     content: {
      //       content: this.content,
      //       facade: this.facade,
      //       type: this.displayType,
      //       days: this.days,
      //       submit_time: Date.parse(new Date()),
      //     },
      //   })
      //   .then(() => {
      //     this.$message({
      //       message: '保存成功',
      //       type: 'success',
      //     })
      //   })
      //   .catch(() => {
      //     this.$message.error('加载配置信息失败，请检查网络')
      //   })
    },
    addAd(data) {
      this.content.push({
        url: data,
        link: {},
      })
    },
  },
}
</script>
<style lang="less" scoped>
.clear {
  clear: both;
}

.screen {
  .is_skip {
    width: 120px;
    height: 68px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    text-align: center;
    line-height: 40px;
    font-size: 22px;
    position: absolute;
    z-index: 100;
    line-height: 60px;
    top: 120px;
    right: 30px;

    .is_skip_bg {
      background: #000000;
      opacity: 0.5;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 34px;
      z-index: 100;
    }

    .is_skip_txt {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 68px;
      position: absolute;
      z-index: 200;
      width: 100%;
      text-align: center;
    }
  }

  .el-divider {
    margin: 12px 0 20px 0;
  }

  /deep/ .__phone_window {
    position: relative;

    .el-carousel {
      .el-carousel__button {
        width: 32px;
        height: 8px;
      }
    }

    .carousel_number {
      position: absolute;
      bottom: 12px;
      width: 68px;
      height: 32px;
      opacity: 0.4;
      border-radius: 16px;
      z-index: 100;
      text-align: center;
      line-height: 32px;
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #d0b9bd;
      opacity: 0.5;
    }

    .carousel_number.left {
      left: 2%;
    }

    .carousel_number.center {
      left: 50%;
      margin-left: -34px;
    }

    .carousel_number.right {
      right: 2%;
    }

    .el-carousel {
      .el-carousel__button {
        opacity: 1;
      }
    }

    .el-carousel.circle {
      .el-carousel__indicators--horizontal {
        .el-carousel__button {
          width: 16px;
          height: 16px;
          border-radius: 16px;
        }
      }
    }

    .el-carousel.number {
      .el-carousel__indicators--horizontal {
        display: none;
      }
    }

    .el-carousel.left {
      .el-carousel__indicators--horizontal {
        left: 20px;
        transform: translateX(0%);
      }
    }

    .el-carousel.center {
      .el-carousel__indicators--horizontal {
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .el-carousel.right {
      .el-carousel__indicators--horizontal {
        left: auto;
        right: 20px;
        transform: translateX(0%);
      }
    }
  }

  .control-item-title {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #595959;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  ._imagelist_item {
    display: inline-block;
    margin-right: 24px;
    height: 200px;
    margin-bottom: 24px;
    position: relative;

    ._imagelist_item-close {
      z-index: 100;
      position: absolute;
      right: -7px;
      top: -7px;
      height: 16px;
      width: 16px;
      padding: 0;
      margin: 0;
      line-height: 16px;
      color: #afafaf;
      display: none;
    }
    img{
      height: 100%;
    }
  }

  ._imagelist_item:hover {
    ._imagelist_item-close {
      display: block !important;
    }
  }

  &-setting {
    margin-top: 20px;
    display: flex;

    &_left {
      width: 417px;
      height: 800px;
    }

    &_right {
      flex: 417px 1;
      margin-left: 24px;
    }

    .__card {
      border-radius: 16px;

      &_clearfix {
        h3 {
          font-size: 16px;
          font-weight: 400;
          color: #262626;
          padding: 0;
          margin: 0;
          line-height: 30px;
        }

        h3:before {
          content: '';
          width: 4px;
          height: 16px;
          border-left: 4px solid #409EFF;
          padding-right: 12px;
        }
      }
    }

    .__phone {
      margin: 0 auto;
      width: 834px;
      background: #ffffff;
      border: 1px solid #dcdfe6;
      border-radius: 88px;
      //zoom: .453;
      transform: scale(0.5);
      transform-origin: 0 0;

      .__phone_window {
        width: 750px;
        position: relative;
        background: #ffffff;
        border: 1px solid #dcdfe6;
        margin: 88px auto;
        overflow: hidden;
      }
    }

    .__card {
      margin-bottom: 20px;
    }
  }

  .__tabs {
    .le-input--120 {
      margin-top: 12px;
      .el-input {
        width: 120px;
        margin: 0 8px;
      }
    }
    /deep/.el-tabs.el-tabs--card.el-tabs--top {
      > .el-tabs__header {
        border-bottom: 0 solid #e4e7ed;
        margin: 0;
      }

      > .el-tabs__header .el-tabs__nav {
        border: 0;
      }

      > .el-tabs__header .el-tabs__item {
        border: 0;
      }

      > .el-tabs__header .el-tabs__item:first-child {
        border-left: none;
      }

      > .el-tabs__header .el-tabs__item.is-active {
        background: #ffffff;
        border-radius: 16px 16px 0px 0px;
      }

      .el-tabs__content .el-tab-pane {
        border-radius: 16px;
        background: #ffffff;
        padding: 24px;
      }

      .el-tabs__content .el-tab-pane:first-child {
        border-radius: 0 16px 16px 16px;
        background: #ffffff;
      }
    }

    ._explain {
      padding: 0;
      margin: 0;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #8c8c8c;
    }

    ._tips {
      padding: 0;
      margin: 0;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #bfbfbf;
      line-height: 22px;
    }

    .picture-dialog {
      width: 228px;
      height: 368px;
      background: #ffffff;
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
      border-radius: 8px;
      padding: 24px;

      .select-cover__288 {
        width: 180px;
        height: 320px;
        border-radius: 4px;
        flex: 1;
        position: relative;

        &-add {
          width: 180px;
          height: 320px;
          background: rgba(0, 0, 0, 0.02);
          border: 1px dashed #dcdfe6;
          border-radius: 4px;
          text-align: center;
          display: table-cell;
          vertical-align: middle;
          cursor: pointer;
        }

        &-icon {
          display: block;
          font-size: 26px;
          width: 26px;
          height: 26px;
          line-height: 26px;
          color: #bfbfbf;
          margin: 8px auto;
        }

        &-text {
          display: block;
          font-size: 14px;
          font-weight: 400;
          line-height: 30px;
          color: #8c8c8c;
        }

        &-edit {
          position: absolute;
          width: 180px;
          height: 320px;
          cursor: pointer;

          .el-image {
            width: 180px;
            height: 320px;
          }
        }

        &-tips {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 120px;
          height: 28px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 4px;
          font-size: 14px;
          font-weight: 400;
          color: #ffffff;
          text-align: center;
          line-height: 28px;
          display: none;
        }
      }
    }
  }
  .le-cardpin{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    background-color: #f3f5f7;
  }
}
</style>
