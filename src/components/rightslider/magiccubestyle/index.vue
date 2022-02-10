<template>
  <div class="magiccubestyle">
    <!-- 标题 -->
    <h2>{{ datas.text }}</h2>

    <p style="color: #d40000; font-size: 14px">魔方布局</p>
    <p style="color: #969799; font-size: 12px; margin: 5px 0">
      选定布局区域，在下方添加图片
    </p>

    <!-- 图片布局 -->
    <!-- 一行二个 -->
    <section class="buju buju0" v-show="datas.rubiksCubeType === 0">
      <div
        @click="imgActive = index - 1"
        v-for="index in 2"
        :key="index"
        class="rubiksCubeType0 rubiksCubeType"
        :class="[index - 1 === imgActive ? 'active' : '']"
      >
        <div style="font-size: 12px" v-if="!datas.imageList[index - 1].src">
          宽度375像素
        </div>
        <img
          draggable="false"
          v-else
          :src="datas.imageList[index - 1].src"
          alt=""
        />
      </div>
    </section>

    <!-- 一行三个 -->
    <section class="buju buju0" v-show="datas.rubiksCubeType === 1">
      <div
        @click="imgActive = index - 1"
        v-for="index in 3"
        :key="index"
        class="rubiksCubeType1 rubiksCubeType"
        :class="[index - 1 === imgActive ? 'active' : '']"
      >
        <div style="font-size: 12px" v-if="!datas.imageList[index - 1].src">
          宽度250像素
        </div>
        <img
          draggable="false"
          v-else
          :src="datas.imageList[index - 1].src"
          alt=""
        />
      </div>
    </section>

    <!-- 一行四个 -->
    <section class="buju buju0" v-show="datas.rubiksCubeType === 2">
      <div
        @click="imgActive = index - 1"
        v-for="index in 4"
        :key="index"
        class="rubiksCubeType2 rubiksCubeType"
        :class="[index - 1 === imgActive ? 'active' : '']"
      >
        <div style="font-size: 12px" v-if="!datas.imageList[index - 1].src">
          宽度188像素
        </div>
        <img
          draggable="false"
          v-else
          :src="datas.imageList[index - 1].src"
          alt=""
        />
      </div>
    </section>

    <!-- 二左二右 -->
    <section class="buju buju0" v-show="datas.rubiksCubeType === 3">
      <div
        @click="imgActive = index - 1"
        v-for="index in 4"
        :key="index"
        class="rubiksCubeType3 rubiksCubeType"
        :class="[index - 1 === imgActive ? 'active' : '']"
      >
        <div style="font-size: 12px" v-if="!datas.imageList[index - 1].src">
          375x375像素<br />或同等比例
        </div>
        <img
          draggable="false"
          v-else
          :src="datas.imageList[index - 1].src"
          alt=""
        />
      </div>
    </section>

    <!-- 一左二右 -->
    <section class="buju buju4" v-show="datas.rubiksCubeType === 4">
      <div
        @click="imgActive = 0"
        class="rubiksCubeType4 rubiksCubeType"
        style="width: 163px; height: 300px"
        :class="[0 === imgActive ? 'active' : '']"
      >
        <div style="font-size: 12px" v-if="!datas.imageList[0].src">
          375x750像素<br />或同等比例
        </div>
        <img draggable="false" v-else :src="datas.imageList[0].src" alt="" />
        <div></div>
      </div>
      <div style="display: inline-flex; flex-direction: column">
        <div
          @click="imgActive = index"
          class="rubiksCubeType4 rubiksCubeType"
          :class="[index === imgActive ? 'active' : '']"
          v-for="index in 2"
          :key="index"
        >
          <div style="font-size: 12px" v-if="!datas.imageList[index].src">
            375x375像素<br />或同等比例
          </div>
          <img
            draggable="false"
            v-else
            :src="datas.imageList[index].src"
            alt=""
          />
          <div></div>
        </div>
      </div>
    </section>

    <!-- 一上二下 -->
    <section class="buju buju5" v-show="datas.rubiksCubeType === 5">
      <div
        @click="imgActive = 0"
        class="rubiksCubeType4 rubiksCubeType"
        style="width: 325px; height: 163px"
        :class="[0 === imgActive ? 'active' : '']"
      >
        <div style="font-size: 12px" v-if="!datas.imageList[0].src">
          375x750像素<br />或同等比例
        </div>
        <img draggable="false" v-else :src="datas.imageList[0].src" alt="" />
        <div></div>
      </div>
      <div style="display: inline-flex">
        <div
          @click="imgActive = index"
          class="rubiksCubeType4 rubiksCubeType"
          :class="[index === imgActive ? 'active' : '']"
          v-for="index in 2"
          :key="index"
        >
          <div style="font-size: 12px" v-if="!datas.imageList[index].src">
            375x375像素<br />或同等比例
          </div>
          <img
            draggable="false"
            v-else
            :src="datas.imageList[index].src"
            alt=""
            style="width: 163px; height: 163px"
          />
          <div></div>
        </div>
      </div>
    </section>

    <!-- 一左三右 -->
    <section class="buju buju4" v-show="datas.rubiksCubeType === 6">
      <!-- 第一张图片 -->
      <div
        @click="imgActive = 0"
        class="rubiksCubeType4 rubiksCubeType"
        style="width: 163px; height: 325px"
        :class="[0 === imgActive ? 'active' : '']"
      >
        <div style="font-size: 12px" v-if="!datas.imageList[0].src">
          375x750像素<br />或同等比例
        </div>
        <img draggable="false" v-else :src="datas.imageList[0].src" alt="" />
      </div>
      <div style="display: inline-flex; flex-direction: column">
        <!-- 第二张图片 -->
        <div
          @click="imgActive = 1"
          class="rubiksCubeType4 rubiksCubeType"
          :class="[1 === imgActive ? 'active' : '']"
        >
          <div style="font-size: 12px" v-if="!datas.imageList[1].src">
            375x375像素<br />或同等比例
          </div>
          <img draggable="false" v-else :src="datas.imageList[1].src" alt="" />
          <div></div>
        </div>
        <div class="rubiksCubeType4 rubiksCubeType">
          <div
            @click="imgActive = index + 1"
            :class="[index + 1 === imgActive ? 'active' : '']"
            style="
              display: inline-flex;
              width: 82px;
              height: 163px;
              justify-content: center;
              align-items: center;
              border: 1px solid #ebedf0;
            "
            v-for="index in 2"
            :key="index"
          >
            <div style="font-size: 12px" v-if="!datas.imageList[index + 1].src">
              188x375像素<br />或同等比例
            </div>
            <img
              draggable="false"
              v-else
              :src="datas.imageList[index + 1].src"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>

    <p style="color: #d40000; font-size: 12px; margin-top: 10px">请添加图片</p>

    <!-- 表单 -->
    <el-form label-width="80px" :model="datas" size="small">
      <section
        class="magiccubestyleList"
        v-for="(item, index) in datas.imageList"
        :key="index"
        v-show="imgActive === index"
      >
        <!-- 图片 -->
        <div class="imag" @click="$refs.upload.showUpload()">
          <img
            draggable="false"
            v-if="!item.src"
            src="../../../assets/images/add.png"
            style="border: 1px solid #e5e5e5"
            alt=""
          />
          <div v-else style="position: relative">
            <img draggable="false" :src="item.src" alt="" />
            <p>
              点击更换图
            </p>
          </div>
        </div>
        <!-- 标题和链接 -->
        <div class="imgText">
          <!-- 选择类型 -->
          <el-select
            v-model="item.linktype"
            placeholder="请选择跳转类型"
            size="small"
          >
            <el-option
              v-for="item in optionsType"
              :key="item.name"
              :label="item.name"
              :value="item.type"
            >
            </el-option>
          </el-select>

          <!-- 输入链接 -->
          <el-input
            size="small"
            placeholder="请输入链接，输入前确保可以访问"
            v-model="item.http.externalLink"
          >
          </el-input>
        </div>
      </section>

      <div style="height: 20px" />

      <!-- 标题内容 -->
      <el-form-item label="选择模板" class="lef">
        <p style="color: #000">{{ styleText }}</p>
      </el-form-item>

      <!-- 商品样式选择 -->
      <div class="rubiksCubeType">
        <el-tooltip
          class="item"
          effect="dark"
          :content="item.content"
          placement="bottom"
          v-for="(item, index) in rubiksCubeTypes"
          :key="index"
        >
          <span
            class="iconfont"
            style="font-size: 21px"
            :class="[
              item.linktype === datas.rubiksCubeType ? 'active' : '',
              item.icon,
            ]"
            @click="datas.rubiksCubeType = index"
          />
        </el-tooltip>
      </div>

      <div style="height: 20px" />

      <!-- 页面边距 -->
      <el-form-item label="页面边距" class="lef">
        <el-slider
          v-model="datas.pageMargin"
          :max="20"
          input-size="small"
          show-input
        >
        </el-slider>
      </el-form-item>

      <!-- 图片间隙 -->
      <el-form-item label="图片间隙" class="lef">
        <el-slider
          v-model="datas.imgMargin"
          :max="20"
          input-size="small"
          show-input
        >
        </el-slider>
      </el-form-item>
    </el-form>

    <!-- 上传图片 -->
    <uploadimg ref="upload" @uploadInformation="uploadInformation" />
  </div>
</template>

<script>
import uploadimg from '../../uploadImg' //图片上传

export default {
  name: 'magiccubestyle',
  props: {
    datas: Object,
  },
  components: { uploadimg },
  data() {
    return {
      rubiksCubeTypes: [
        {
          icon: 'icon-yihangerge',
          type: 0,
          content: '一行二个',
        },
        {
          icon: 'icon-yihangsange',
          type: 1,
          content: '一行三个',
        },
        {
          icon: 'icon-yihangsige',
          type: 2,
          content: '一行四个',
        },
        {
          icon: 'icon-erzuoeryou',
          type: 3,
          content: '二左二右',
        },
        {
          icon: 'icon-yizuoeryou',
          type: 4,
          content: '一左二右',
        },
        {
          icon: 'icon-yishangerxia',
          type: 5,
          content: '一上二下',
        },
        {
          icon: 'icon-yizuosanyou',
          type: 6,
          content: '一左三右',
        },
      ],
      imgActive: 0, //默认选中第一个图片
      optionsType: [
        {
          type: '10',
          name: '内部链接',
        },
        {
          type: '11',
          name: '外部链接',
        },
      ], //跳转类型
      emptyText: '',
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    styleText() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.imgActive = 0
      if (this.datas.rubiksCubeType === 0) return '一行二个'
      if (this.datas.rubiksCubeType === 1) return '一行三个'
      if (this.datas.rubiksCubeType === 2) return '一行四个'
      if (this.datas.rubiksCubeType === 3) return '二左二右'
      if (this.datas.rubiksCubeType === 4) return '一左二右'
      if (this.datas.rubiksCubeType === 5) return '一上二下'
      if (this.datas.rubiksCubeType === 6) return '一左三右'
    },
  },
  created() {},
  methods: {
    /* 替换 */
    uploadInformation(res) {
      this.datas.imageList[this.imgActive].src = res
    },
  },
}
</script>

<style scoped lang="less">
.magiccubestyle {
  width: 100%;
  position: absolute;
  left: 0;
  overflow: hidden;
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

  /* 布局 */
  .buju {
    &.buju0 {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
    }
    &.buju4 {
      display: inline-flex;
      flex-direction: row;
      justify-content: space-around;
    }
    .active {
      background: #e0edff;
      border: 1px solid #155bd4;
      color: #155bd4;
      z-index: 2;
    }
    .rubiksCubeType {
      background-color: #fff;
      border: 1px solid #ebedf0;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      color: #7d7e80;
      cursor: pointer;
      &.active {
        background: #e0edff;
        border: 1px solid #155bd4;
        color: #155bd4;
        z-index: 2;
      }
      &.rubiksCubeType0 {
        width: 163px;
        margin: 10px 0;
        // height: 200px;
        img {
          width: 100%;
          // height: 200px;
        }
      }
      &.rubiksCubeType1 {
        width: 109px;
        margin: 10px 0;
        height: 150px;
        img {
          width: 100%;
          height: 150px;
        }
      }
      &.rubiksCubeType2 {
        width: 82px;
        margin: 10px 0;
        height: 150px;
        img {
          width: 100%;
          height: 150px;
        }
      }
      &.rubiksCubeType3 {
        width: 163px;
        margin: 10px 0;
        height: 163px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &.rubiksCubeType4 {
        width: 163px;
        height: 163px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .lef {
    :deep(.el-form-item__label) {
      text-align: left;
    }
  }

  /* 商品列表 */
  .magiccubestyleList {
    padding: 6px 12px;
    margin: 16px 0px;
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
        height: 60px;
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
      p {
        width: 100%;
        background: #999;
        position: absolute;
        left: 0;
        bottom: 5px;
        color: #fff;
        font-size: 5px;
        text-align: center;
        height: 20px;
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

  /* 列表样式 */
  .rubiksCubeType {
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
}
</style>
