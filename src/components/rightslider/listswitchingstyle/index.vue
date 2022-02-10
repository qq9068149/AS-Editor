<template>
  <div class="listswitchingstyle">
    <!-- 标题 -->
    <h2>{{ datas.text }}</h2>

    <!-- 表单 -->
    <el-form label-width="80px" :model="datas" size="small" :rules="rules">
      <!-- 标题内容 -->
      <el-form-item
        class="lef"
        label="选择模板"
        v-show="datas.commoditylisttype !== 2"
      >
        <p style="color: #000">{{ styleText }}</p>
      </el-form-item>

      <!-- 商品样式选择 -->
      <div class="commodityType" v-show="datas.commoditylisttype !== 2">
        <el-tooltip
          class="item"
          effect="dark"
          :content="item.content"
          placement="bottom"
          v-for="(item, index) in commodityTypes"
          :key="index"
        >
          <span
            class="iconfont"
            style="font-size: 21px"
            :class="[
              item.type === datas.commodityType ? 'active' : '',
              item.icon,
            ]"
            @click="datas.commodityType = index"
          />
        </el-tooltip>
      </div>

      <!-- 下划线 -->
      <div class="bor" v-show="datas.commoditylisttype !== 2" />

      <!-- 商品类型选择 -->
      <el-form-item label="商品类型" class="lef">
        <el-radio-group v-model="datas.commoditylisttype">
          <el-radio :label="index - 1" v-for="index in 3" :key="index"
            >类型{{ index }}</el-radio
          >
        </el-radio-group>
      </el-form-item>

      <!-- tabbar颜色 -->
      <el-form-item
        label="标签颜色"
        class="lef"
        v-show="datas.commoditylisttype !== 0"
      >
        <el-color-picker
          v-model="datas.tabColor"
          show-alpha
          class="picke"
          :predefine="predefineColors"
        >
        </el-color-picker>
      </el-form-item>

      <div v-show="datas.commoditylisttype === 0">
        <h5 style="color: #000; font-size: 14px">添加商品</h5>
        <p style="color: #969799; font-size: 12px; margin-top: 10px">
          鼠标拖拽调整商品顺序
        </p>

        <!-- 图片广告 -->
        <div v-if="datas.imageList[0]">
          <vuedraggable
            :list="datas.imageList"
            item-key="index"
            :forceFallback="true"
            :animation="200"
          >
            <template #item="{ element, index }">
              <section class="imgBanner">
                <van-icon
                  class="el-icon-circle-close"
                  name="close"
                  @click="deleteimg(index)"
                />
                <div class="imag">
                  <img draggable="false" :src="element.coverUrl" alt="" />
                </div>
                <div class="imgText">
                  <div>
                    <el-input
                      disabled="disabled"
                      style="width: 65%"
                      v-model="element.name"
                      size="small"
                    />
                    <el-input
                      disabled="disabled"
                      type="number"
                      style="width: 35%"
                      v-model.number="element.price"
                      size="small"
                    />
                  </div>
                  <el-input
                    disabled="disabled"
                    v-model="element.introduce"
                    size="small"
                  />
                </div>
              </section>
            </template>
          </vuedraggable>
        </div>

        <!-- 上传图片 -->
        <el-button
          @click="dialogVisibleshow('imageList', null)"
          class="uploadImg"
          type="primary"
          plain
          >点击添加商品</el-button
        >
      </div>

      <div v-show="datas.commoditylisttype !== 0">
        <h5 style="color: #000; font-size: 14px; margin-left: 7px">
          添加商品分组<el-button
            style="padding: 2px 4px; margin-left: 200px"
            @click="addGrouping"
            type="primary"
            size="small"
            plain
          >
            添加</el-button
          >
        </h5>
        <p
          style="
            color: #969799;
            font-size: 12px;
            margin-left: 7px;
            margin-top: 10px;
          "
        >
          鼠标拖拽调整分组顺序
        </p>

        <!-- 分类名称 -->
        <section
          v-for="(item, index) in datas.commoditylisttypetab"
          :key="index"
        >
          <div class="bor" />

          <el-input
            v-model="item.text"
            class="tit"
            style="width: 100px"
            placeholder="请输入分组名称"
            size="small"
          />
          <van-icon
            name="delete-o"
            style="
              cursor: pointer;
              padding: 2px 4px;
              margin-left: 200px;
              color: red;
            "
            @click="delecommoditylisttypetab(index)"
          />

          <vuedraggable
            :list="item.imageList"
            item-key="index"
            :forceFallback="true"
            :animation="200"
          >
            <template #item="{ element, ind }">
              <section class="imgBanner">
                <van-icon
                  class="el-icon-circle-close"
                  name="close"
                  @click="delecommodityimg(index, ind)"
                />
                <!-- 图片 -->
                <div class="imag">
                  <img draggable="false" :src="element.coverUrl" alt="" />
                </div>
                <!-- 标题和链接 -->
                <div class="imgText">
                  <div>
                    <el-input
                      disabled="disabled"
                      style="width: 65%"
                      v-model="element.name"
                      size="small"
                    />
                    <el-input
                      disabled="disabled"
                      type="number"
                      style="width: 35%"
                      v-model.number="element.price"
                      size="small"
                    />
                  </div>
                  <el-input
                    disabled="disabled"
                    v-model="element.introduce"
                    size="small"
                  />
                </div>
              </section>
            </template>
          </vuedraggable>

          <el-button
            @click="dialogVisibleshow('commoditylisttypetab', index)"
            class="uploadImg"
            type="primary"
            plain
            >点击添加商品</el-button
          >
        </section>
      </div>

      <div style="height: 10px" />

      <!-- 商品样式 -->
      <el-form-item label="商品样式" class="lef" />
      <!-- 商品样式选择 -->
      <div class="moditystyle">
        <span
          v-for="(item, index) in moditystyles"
          :key="index"
          :class="item.type == datas.moditystyle ? 'active' : ''"
          @click="datas.moditystyle = index"
        >
          {{ item.text }}
        </span>
      </div>

      <div class="bor" />

      <!-- 显示位置 -->
      <el-form-item label="显示位置" class="lef">
        <div class="weiz">
          <i
            :class="datas.positions === 'left' ? 'active' : ''"
            class="iconfont icon-horizontal-left"
            @click="datas.positions = 'left'"
          />
          <i
            :class="datas.positions === 'center' ? 'active' : ''"
            class="iconfont icon-juzhong"
            @click="datas.positions = 'center'"
          />
        </div>
      </el-form-item>

      <div style="height: 10px" />

      <!-- 文本粗细 -->
      <el-form-item
        class="lef"
        label="文本粗细"
        prop="textWeight"
        :hide-required-asterisk="true"
      >
        <el-input
          type="number"
          v-model.number="datas.textWeight"
          placeholder="请输入文本粗细"
        />
      </el-form-item>

      <div style="height: 10px" />

      <!-- 图片倒角 -->
      <el-form-item label="图片倒角" class="lef borrediu">
        <el-slider
          v-model="datas.borderRadius"
          :max="30"
          input-size="small"
          show-input
        >
        </el-slider>
      </el-form-item>

      <div style="height: 10px" />

      <!-- 页面边距 -->
      <el-form-item class="lef" label="页面边距">
        <el-slider
          v-model="datas.pageMargin"
          :max="20"
          input-size="small"
          show-input
        >
        </el-slider>
      </el-form-item>

      <div style="height: 10px" />

      <!-- 商品间距 -->
      <el-form-item class="lef" label="商品间距">
        <el-slider
          v-model="datas.commodityMargin"
          :max="20"
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
              @click="showUpload('0')"
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
      <!--商品价格 -->
      <el-form-item class="lef" label="商品价格">
        {{ datas.priceofcommodity ? '显示' : '隐藏' }}
        <el-checkbox
          style="margin-left: 196px"
          v-model="datas.priceofcommodity"
        />
      </el-form-item>

      <div style="height: 10px" />

      <!--购买按钮 -->
      <el-form-item class="lef" label="购买按钮">
        {{ datas.purchasebutton ? '显示' : '隐藏' }}
        <el-checkbox
          style="margin-left: 196px"
          v-model="datas.purchasebutton"
        />
      </el-form-item>

      <el-radio-group
        v-model="datas.purchasebuttonType"
        class="radi1"
        v-show="datas.purchasebutton"
      >
        <el-radio :label="index - 1" v-for="index in 8" :key="index"
          >样式{{ index }}</el-radio
        >

        <el-input
          v-show="datas.purchasebuttonType > 3"
          style="width: 40%; margin-top: 10px"
          v-model="datas.purchase"
          size="small"
        />
      </el-radio-group>

      <div style="height: 10px" />

      <!--商品角标 -->
      <el-form-item class="lef" label="商品角标">
        {{ datas.commoditycorner ? '显示' : '隐藏' }}
        <el-checkbox
          style="margin-left: 196px"
          v-model="datas.commoditycorner"
        />
      </el-form-item>

      <el-radio-group
        v-model="datas.commoditycornertype"
        class="radi1"
        v-show="datas.commoditycorner"
      >
        <el-radio :label="index" v-for="(item, index) in marker" :key="index">{{
          item
        }}</el-radio>
      </el-radio-group>

      <el-form-item class="lef" label="颜色">
        <el-color-picker
          v-model="datas.commodityTagColor"
          show-alpha
          class="picke"
          :predefine="predefineColors"
        >
        </el-color-picker>
      </el-form-item>

      <el-form-item class="lef" label="位置">
        <el-radio-group v-model="datas.tagPosition" class="radi1">
          <el-radio
            :label="index"
            v-for="(item, index) in tagPosition"
            :key="index"
            >{{ item }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
    </el-form>

    <!-- 上传商品 -->
    <uploadCommodity
      ref="upload"
      @uploadListInformation="uploadListInformation"
    />
    <!-- 上传图片 -->
    <uploadimg ref="uploadImg" @uploadInformation="uploadInformation" />
  </div>
</template>

<script>
import uploadCommodity from '../../uploadCommodity' //图片上传
import uploadimg from '../../uploadImg' //图片上传
import vuedraggable from 'vuedraggable' //拖拽组件

export default {
  name: 'listswitchingstyle',
  props: {
    datas: Object,
  },
  components: { vuedraggable, uploadCommodity, uploadimg },
  data() {
    let kon = (rule, value, callback) => {
      if (value.length === 0) callback(new Error('请输入有效数字'))
    }
    return {
      color1: '#07c160',
      moditystyles: [
        /* 商品样式 */
        {
          text: '无边白底',
          type: 0,
        },
        {
          text: '卡片投影',
          type: 1,
        },
        {
          text: '描边白底',
          type: 2,
        },
        {
          text: '无边透明底',
          type: 3,
        },
      ],
      commodityTypes: [
        {
          icon: 'icon-datumoshi',
          type: 0,
          content: '大图模式',
        },
        {
          icon: 'icon-commodity-yihangliangge',
          type: 1,
          content: '一行两个',
        },
        {
          icon: 'icon-yihangsange',
          type: 2,
          content: '一行三个',
        },
        {
          icon: 'icon-commodity-xiangxiliebiao',
          type: 3,
          content: '详细列表',
        },
        {
          icon: 'icon-icon_shangpintu_yidaliangxiao',
          type: 4,
          content: '一大两小',
        },
        {
          icon: 'icon-xuanzemokuai-daohanghengxianghuadong',
          type: 5,
          content: '横向滑动',
        },
      ],
      rules: {
        textWeight: [{ required: true, validator: kon, trigger: 'blur' }],
      },
      marker: ['新品', '热卖', 'NEW', 'HOT'],
      imgText: null, //当前选中的类型
      imgNumber: null, //第几个数组
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
      options: [], // 更多跳转链接
      moreName: null,
      tagPosition: [
        // 标记位置
        '左上',
        '左下',
        '右上',
        '右下',
      ],
      uploadImgDataType: null,
    }
  },
  created() {},
  methods: {
    /* 上传图片弹框 */
    dialogVisibleshow(text, number) {
      this.$refs.upload.showUpload()
      this.imgText = text
      this.number = number
    },
    /* 添加分组 */
    addGrouping() {
      this.datas.commoditylisttypetab.push({
        text: '分组',
        imageList: [],
      })
    },
    // 提交
    uploadListInformation(res) {
      if (this.imgText === 'imageList') {
        this.datas.imageList.push(res)
      } else {
        this.datas.commoditylisttypetab[this.number].imageList.push(res)
      }

      this.imgText = null
      this.number = null
    },

    showUpload(type) {
      this.uploadImgDataType = type
      this.$refs.uploadImg.showUpload()
    },

    // 背景图
    uploadInformation(res) {
      console.log(res, '---------uploadImg')
      if (this.uploadImgDataType === '0') {
        this.datas.bgImg = res
        console.log(this.datas.bgImg, '---------uploadImg')
      }
    },

    // 清空背景图片
    clear() {
      this.datas.bgImg = ''
    },

    /* 删除图片 */
    deleteimg(index) {
      this.datas.imageList.splice(index, 1)
    },

    /* 删除分组里的图片 */
    delecommodityimg(ind, index) {
      this.datas.commoditylisttypetab[ind].imageList.splice(index, 1)
    },

    /* 删除分组 */
    delecommoditylisttypetab(index) {
      this.datas.commoditylisttypetab.splice(index, 1)
    },
  },
  computed: {
    styleText() {
      let modeType
      if (this.datas.commodityType === 0) modeType = '大图模式'
      if (this.datas.commodityType === 1) modeType = '一行两个'
      if (this.datas.commodityType === 2) modeType = '一行三个'
      if (this.datas.commodityType === 3) modeType = '详细列表'
      if (this.datas.commodityType === 4) modeType = '一大两小'
      if (this.datas.commodityType === 5) modeType = '横向滑动'

      return modeType
    },
  },
}
</script>

<style scoped lang="less">
.listswitchingstyle {
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
  /* 列表样式 */
  .commodityType {
    display: flex;
    justify-content: space-around;
    align-items: center;
    span {
      display: inline-block;
      width: 58px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      background: #fff;
      border: 1px solid #ebedf0;
      color: #979797;
      margin: 0 1px;
      cursor: pointer;
      transition: all 0.5s;

      &:hover {
        border: 1px solid #155bd4;
        color: #155bd4;
      }

      &.active {
        border: 1px solid #155bd4;
        background-color: #e0edff;
        color: #155bd4;
      }
    }
  }

  /* 商品样式 */
  .moditystyle {
    font-size: 12px;
    width: 100%;
    display: flex;
    span {
      width: 86px;
      height: 32px;
      display: inline-block;
      text-align: center;
      line-height: 32px;
      cursor: pointer;
      border: 1px solid #ebedf0;
      &.active {
        border: 1px solid #155bd4;
        background-color: #e0edff;
        color: #155bd4;
      }
    }
  }

  /* 位置 */
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

  /* 单选框 */
  :deep(.radi1) {
    border-top: 1px solid #f7f8fa;
    border-bottom: 1px solid #f7f8fa;
    padding: 12px 0;
    .el-radio {
      margin: 10px 25px 7px 0;
    }
  }

  /* 商品列表 */
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
    }
  }

  /* 上传图片按钮 */
  .uploadImg {
    width: 345px;
    height: 40px;
    margin-top: 20px;
  }

  // 上传弹框内容部分
  :deep(.uploadIMG) .el-dialog__body {
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

  .tit {
    margin-bottom: 20px;
    :deep(.el-input__inner) {
      text-align: center;
    }
  }
}
</style>
