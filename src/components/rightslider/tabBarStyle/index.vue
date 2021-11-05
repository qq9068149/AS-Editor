<template>
  <div class="investigatestyle">
    <!-- 标题 -->
    <h2>{{ datas.text }}</h2>

    <!-- 表单 -->
    <el-form label-width="100px" :model="datas" size="small">
      <el-form-item class="lef" label="外边框">
        <el-checkbox v-model="datas.isShowBorder">显示</el-checkbox>
      </el-form-item>

      <el-form-item class="lef" label="选中的颜色">
        <!-- 颜色选择器 -->
        <el-color-picker
          v-model="datas.activeColor"
          show-alpha
          class="picke"
          :predefine="predefineColors"
        >
        </el-color-picker>
      </el-form-item>

      <el-form-item class="lef" label="未选中的颜色">
        <!-- 颜色选择器 -->
        <el-color-picker
          v-model="datas.inactiveColor"
          show-alpha
          class="picke"
          :predefine="predefineColors"
        >
        </el-color-picker>
      </el-form-item>

      <el-form-item class="lef" label="高亮位置">
        <el-slider
          v-model="datas.Highlight"
          :max="4"
          :min="0"
          input-size="mini"
          show-input
        >
        </el-slider>
      </el-form-item>

      <el-form-item class="lef" label="导航"> </el-form-item>
      <vuedraggable v-model="datas.iconList" v-bind="dragOptions">
        <transition-group>
          <section
            class="imgBanner"
            v-for="(item, index) in datas.iconList"
            :key="item + index"
          >
            <i class="el-icon-circle-close" @click="deleteimg(index)" />
            <!-- 图片 -->
            <div class="imag">
              <img :src="item.iconPic" alt="" draggable="false" />
            </div>
            <!-- 标题和链接 -->
            <div class="imgText">
              <div class="imgText-top">
                <el-input
                  v-model="item.iconText"
                  placeholder="导航名称"
                  size="mini"
                />
                <div class="imgText-top-r">
                  <span>小圆点</span>
                  <el-checkbox v-model="item.isDot"></el-checkbox>
                </div>
              </div>
              <!-- 标题和链接 -->
              <div class="imgTextChild">
                <!-- 选择类型 -->
                <el-select
                  v-model="item.linktype"
                  placeholder="请选择跳转类型"
                  size="mini"
                >
                  <el-option
                    v-for="iteml in optionsType"
                    :key="iteml.name"
                    :label="iteml.name"
                    :value="iteml.type"
                  >
                  </el-option>
                </el-select>

                <!-- 输入链接 -->
                <el-input
                  size="mini"
                  placeholder="请输入链接，输入前确保可以访问"
                  v-model="item.http.externalLink"
                >
                </el-input>
              </div>
            </div>
          </section>
        </transition-group>
      </vuedraggable>

      <!-- 添加导航按钮 -->
      <el-button
        @click="$refs.upload.showUpload()"
        class="uploadImg"
        type="primary"
        plain
        v-if="datas.iconList.length < 5"
      >
        <i class="el-icon-plus" />点击添加导航
      </el-button>
      <i class="icon-tip">*最多添加5个</i>
    </el-form>

    <!-- 上传图片 -->
    <uploadimg ref="upload" @uploadInformation="uploadInformation" />
  </div>
</template>

<script>
import uploadimg from '../../uploadImg' //图片上传
import vuedraggable from 'vuedraggable' //拖拽组件

export default {
  name: 'tabBarStyle',
  props: {
    datas: Object,
  },
  data() {
    return {
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
      optionsType: [
        {
          type: '10',
          name: '内部链接',
        },
        {
          type: '11',
          name: '外部链接',
        },
      ], // 选择跳转类型
      emptyText: '',
      dragOptions: {
        animation: 200,
      },
    }
  },

  created() {},

  mounted() {},

  methods: {
    // 提交
    uploadInformation(res) {
      this.datas.iconList.push({
        /** 图标名称文字 */
        iconText: '',
        /** 图标图片 */
        iconPic: res,
        /** 是否显示小圆点 */
        isDot: false,
        /** 跳转类型 */
        linktype: '10',
        /** 跳转参数 */
        http: {},
      })
    },

    /* 删除图片 */
    deleteimg(index) {
      this.datas.iconList.splice(index, 1)
    },

  },

  computed: {},

  watch: {},

  components: {
    uploadimg,
    vuedraggable,
  },
}
</script>

<style lang="less" scoped>
.investigatestyle {
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
    /deep/.el-form-item__label {
      text-align: left;
    }
  }
  /* 颜色选择器 */
  .picke {
    float: right;
  }

  /* 上传图片按钮 */
  .uploadImg {
    width: 345px;
    height: 40px;
    margin-top: 20px;
  }

  /* 卡片列表 */
  .imgBanner {
    padding: 6px 12px;
    margin: 16px 7px;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 0 4px 0 rgba(10, 42, 97, 0.2);
    display: flex;
    position: relative;

    /* 删除图标 */
    .el-icon-circle-close {
      position: absolute;
      right: -10px;
      top: -10px;
      cursor: pointer;
      font-size: 19px;
    }

    /* 图片 */
    .imag {
      width: 60px;
      height: 60px;
      border-radius: 5px;
      overflow: hidden;
      position: relative;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        display: inline-block;
      }
      span {
        background: rgba(0, 0, 0, 0.5);
        font-size: 12px;
        position: absolute;
        left: 0px;
        bottom: 0px;
        display: inline-block;
        width: 100%;
        text-align: center;
        color: #fff;
        height: 20px;
        line-height: 20px;
      }
    }
    /* 图片字 */
    .imgText {
      width: 80%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding-left: 20px;
      justify-content: space-between;
      /* 图片字 */
      .imgTextChild {
        width: 100%;
        display: flex;
        box-sizing: border-box;
        justify-content: space-between;
        .fir-sele.el-select {
          width: 40%;
        }
      }
      .imgText-top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .imgText-top-r {
          flex: 1;
          text-align: center;
          span {
            margin-right: 10px;
          }
        }
        /deep/.el-input,
        .el-input--mini {
          flex: 1;
        }
      }
    }
  }
  .icon-tip {
    font-size: 12px;
    color: red;
  }
}
</style>
