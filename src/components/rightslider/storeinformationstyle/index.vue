<template>
  <div class="storeinformationstyle">
    <!-- 标题 -->
    <h2>{{ datas.text }}</h2>

    <p style="color: #323233; font-size: 14px">背景图片</p>
    <div style="height: 10px"></div>
    <p style="color: #969799; font-size: 12px">
      建议尺寸：750x370 像素，尺寸不匹配时，图片将被压缩或拉伸以铺满画面
    </p>

    <div style="height: 10px"></div>
    <!-- 背景图 -->
    <div class="backgroundImg" @click="uploadI('bakcgroundImg')">
      <img
        draggable="false"
        v-if="!datas.bakcgroundImg"
        src="../../../assets/images/backimg.png"
        alt=""
      />
      <img draggable="false" v-else :src="datas.bakcgroundImg" alt="" />
      <p>更换图片</p>
    </div>

    <div style="height: 20px"></div>
    <p style="color: #323233; font-size: 14px">店铺头像</p>

    <div style="height: 10px"></div>
    <!-- 店铺头像 -->
    <div class="backgroundImg" @click="uploadI('headPortrait')">
      <img
        draggable="false"
        v-if="!datas.headPortrait"
        src="../../../assets/images/headerimg.png"
        alt=""
      />
      <img draggable="false" v-else :src="datas.headPortrait" alt="" />
      <p>更换图片</p>
    </div>

    <div
      style="margin: 20px 0; height: 1px; background: rgb(235, 237, 240)"
    ></div>

    <!-- 表单 -->
    <el-form label-width="80px" :model="datas" size="small" :rules="rules">
      <!-- 标题内容 -->
      <el-form-item label="选择模板" class="lef"> </el-form-item>

      <!-- 商品样式选择 -->
      <el-radio-group v-model="datas.rubiksCubeType" class="select-sp">
        <el-radio
          style="margin-top: 10px; margin-right: 10px"
          :label="item.type"
          v-for="(item, index) in rubiksCubeTypes"
          :key="index"
          >{{ item.content }}</el-radio
        >
      </el-radio-group>

      <div style="height: 30px"></div>

      <!-- 店铺名称 -->
      <el-form-item label="店铺名称" class="lef" prop="name">
        <el-input
          v-model="datas.name"
          placeholder="请填写店铺名称"
          maxlength="20"
        ></el-input>
      </el-form-item>

      <!-- 店铺名称 -->
      <el-form-item label="优惠信息" class="lef">
        <el-input
          v-model="datas.Discount"
          placeholder="请填写优惠信息也可不填"
          maxlength="45"
        ></el-input>
      </el-form-item>
    </el-form>

    <!-- 上传图片 -->
    <uploadimg ref="upload" @uploadInformation="uploadInformation" />
  </div>
</template>

<script>
import uploadimg from '../../uploadImg' //图片上传

export default {
  name: 'storeinformationstyle',
  props: {
    datas: Object,
  },
  data() {
    return {
      danqian: '', //当前选中的是背景还是头像
      rules: {
        name: [{ required: true, message: '请输入店铺名称', trigger: 'blur' }],
      },
      rubiksCubeTypes: [
        {
          type: 0,
          content: '样式一',
        },
        {
          type: 1,
          content: '样式二',
        },
        {
          type: 2,
          content: '样式三',
        },
        {
          type: 3,
          content: '样式四',
        },
        {
          type: 4,
          content: '样式五',
        },
      ],
    }
  },
  methods: {
    /* 上传图片 */
    uploadI(res) {
      this.danqian = res
      this.$refs.upload.showUpload()
    },
    // 提交
    uploadInformation(res) {
      this.datas[this.danqian] = res
    },
  },
  components: { uploadimg },
}
</script>

<style scoped lang="less">
.storeinformationstyle {
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
  /* 背景图 */
  .backgroundImg {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    width: 60px;
    height: 60px;
    position: relative;
    background: #f2f4f6;

    img {
      width: 100%;
      height: auto;
    }

    p {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 20px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      text-align: center;
      line-height: 20px;
    }
  }

  .lef {
    :deep(.el-form-item__label) {
      text-align: left;
    }
  }
  .select-sp {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
