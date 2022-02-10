<template>
  <div class="graphicnavigationstyle">
    <!-- 标题 -->
    <h2>{{ datas.text }}</h2>

    <!-- 提示 -->
    <p style="color: #969799; font-size: 12px; margin-top: 10px">
      拖动选中的导航可对其排序
    </p>

    <!-- 图片广告 -->
    <div v-if="datas.imageList[0]">
      <vuedraggable :list="datas.imageList" item-key="index" :forceFallback="true" :animation="200">
         <template #item="{ element }">
          <section
            class="imgList"
          >
            <van-icon class="el-icon-circle-close" name="close" @click="deleteimg(index)" />
            <!-- 图片 -->
            <div class="imag">
              <img draggable="false" :src="element.src" alt="" />
            </div>
            <!-- 标题和链接 -->
            <div class="imgText">
              <el-input
                v-model="element.text"
                placeholder="请输入标题，也可不填"
                size="small"
              ></el-input>
              <!-- 选择类型 -->
              <div class="select-type">
                <el-select
                  style="width: 60%"
                  v-model="element.linktype"
                  placeholder="请选择跳转类型"
                  size="small"
                >
                  <el-option
                    v-for="element in optionsType"
                    :key="element.name"
                    :label="element.name"
                    :value="element.type"
                  >
                  </el-option>
                </el-select>

                <!-- 输入链接 -->
                <el-input
                  style="width: 100%"
                  size="small"
                  placeholder="请输入链接，输入前确保可以访问"
                  v-model="element.http.externalLink"
                >
                </el-input>
              </div>
            </div>
          </section>
        </template>>
      </vuedraggable>
    </div>

    <!-- 上传图片 -->
    <el-button @click="showUpload('0')" class="uploadImg" type="primary" plain
      >点击添加导航</el-button
    >

    <div class="bor"></div>

    <!-- 表单 -->
    <el-form label-width="80px" :model="datas" size="small">
      <!-- 商品类型选择 -->
      <el-form-item class="lef" label="商品类型">
        <el-radio-group v-model="datas.navigationType">
          <el-radio
            style="margin-left: 35px"
            :label="index - 1"
            v-for="index in 2"
            :key="index"
            >{{ index === 1 ? '图片导航' : '文字导航' }}</el-radio
          >
        </el-radio-group>
      </el-form-item>

      <div style="height: 10px" />

      <!-- 图片样式 -->
      <el-form-item class="lef" label="图片样式">
        <div class="weiz">
          <el-tooltip
            effect="dark"
            :content="index - 1 === 0 ? '固定' : '滑动'"
            placement="bottom"
            v-for="index in 2"
            :key="index"
          >
            <i
              class="iconfont"
              :class="[
                index - 1 === 0 ? 'icon-guding' : 'icon-hengxianghuadong',
                datas.imgStyle === index - 1 ? 'active' : '',
              ]"
              @click="datas.imgStyle = index - 1"
            />
          </el-tooltip>
        </div>
      </el-form-item>

      <div style="height: 10px" />

      <!-- 一屏显示 -->
      <el-form-item class="lef" label="一屏显示" v-show="datas.imgStyle === 1">
        <el-select
          v-model="datas.showSize"
          placeholder="请选择活动区域"
          style="margin-left: 90px"
        >
          <el-option
            :label="index + 4 + '个导航'"
            :value="index + 4"
            v-for="index in 7"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>

      <div style="height: 10px" />

      <!-- 文字高度 -->
      <el-form-item label="文字高度" class="lef">
        <el-slider
          v-model="datas.textHeight"
          :max="50"
          :min="24"
          input-size="small"
          show-input
        >
        </el-slider>
      </el-form-item>

      <div style="height: 10px" />

      <!-- 文字大小 -->
      <el-form-item
        label="文字大小"
        prop="textSize"
        :hide-required-asterisk="true"
        class="lef"
      >
        <el-input
          type="number"
          v-model.number="datas.textSize"
          placeholder="请输入文字大小"
          :maxlength="2"
        />
      </el-form-item>

      <div style="height: 10px" />

      <!-- 图片倒角 -->
      <el-form-item label="图片倒角" class="lef borrediu">
        <el-slider
          v-model="datas.borderRadius"
          :max="50"
          input-size="small"
          show-input
        >
        </el-slider>
      </el-form-item>

      <div style="height: 10px" />

      <el-form-item class="lef" label="背景图片">
        <div class="shop-head-pic" style="text-align: center">
          <img class="home-bg" :src="datas.bgImg" alt="" v-if="datas.bgImg" />
          <div class="shop-head-pic-btn" style="text-align: center">
            <el-button
              @click="showUpload('1')"
              class="uploadImg"
              type="primary"
              plain
              >更换图片</el-button
            >
            <el-button type="primary" class="uploadImg" @click="clear()"
              >清空图片</el-button
            >
          </div>
        </div>
      </el-form-item>
      <div style="height: 10px" />

      <!-- 背景颜色 -->
      <el-form-item class="lef" label="背景颜色">
        <!-- 颜色选择器 -->
        <el-color-picker
          v-model="datas.backgroundColor"
          show-alpha
          class="picke"
          :predefine="predefineColors"
        >
        </el-color-picker>
      </el-form-item>

      <div style="height: 10px" />

      <!-- 文字颜色 -->
      <el-form-item class="lef" label="文字颜色">
        <!-- 颜色选择器 -->
        <el-color-picker
          v-model="datas.textColor"
          show-alpha
          class="picke"
          :predefine="predefineColors"
        >
        </el-color-picker>
      </el-form-item>
    </el-form>

    <!-- 上传图片 -->
    <uploadimg ref="upload" @uploadInformation="uploadInformation" />
  </div>
</template>

<script>
import uploadimg from '../../uploadImg' //图片上传
import vuedraggable from 'vuedraggable' //拖拽组件

export default {
  name: 'graphicnavigationstyle',
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
      uploadImgDataType: null,
    }
  },
  created() {
  },
  methods: {
    showUpload(type) {
      this.uploadImgDataType = type
      this.$refs.upload.showUpload()
    },
    // 提交
    uploadInformation(res) {

      if (this.uploadImgDataType === '0') {
        this.datas.imageList.push({
          src: res,
          text: '',
          http: {},
        })
        console.log(this.datas.imageList,33333333333333)
      } else if (this.uploadImgDataType === '1') {
        this.datas.bgImg = res
      }
    },

    // 清空背景图片
    clear() {
      this.datas.bgImg = ''
    },
    /* 删除图片列表的图片 */
    deleteimg(index) {
      this.datas.imageList.splice(index, 1)
    },
  },
  components: { uploadimg, vuedraggable },
}
</script>

<style scoped lang="less">
.graphicnavigationstyle {
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
    :deep(.el-form-item__label) {
      text-align: left;
    }
  }

  /* 上传图片按钮 */
  .uploadImg {
    width: 345px;
    height: 40px;
    margin-top: 10px;
  }

  /* 商品列表 */
  .imgList {
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
      .select-type {
        display: flex;
        :deep(.el-select) {
          .el-input {
            input {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }

  /* 图片样式 */
  .weiz {
    text-align: right;
    i {
      padding: 5px 14px;
      margin-left: 10px;
      border-radius: 0;
      border: 1px solid #ebedf0;
      font-size: 20px;
      font-weight: 500;
      cursor: pointer;

      &:last-child {
        font-size: 22px;
      }

      &.active {
        color: #155bd4;
        border: 1px solid #155bd4;
        background: #e0edff;
      }
    }
  }

  .shop-head-pic {
    color: #ababab;
    display: flex;
    flex-direction: column;
    .home-bg {
      width: 100px;
      height: 100px;
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
  /* 颜色选择器 */
  .picke {
    float: right;
  }
}
</style>
