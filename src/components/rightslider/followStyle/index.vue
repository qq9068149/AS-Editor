<template>
  <div id="followStyle">
    <!-- 标题 -->
    <h2>{{ datas.text }}</h2>

    <el-form>
      <el-form-item class="lef" label="公众号图片">
        <div class="follow-pic">
          <img :src="datas.heade" alt="" />
          <el-button
            @click="$refs.upload.showUpload()"
            class="uploadImg"
            type="primary"
            plain
          >
            上传公众号图片
          </el-button>
        </div>
      </el-form-item>

      <el-form-item class="lef" label="公众号名称">
        <el-input type="text" v-model="datas.followName" placeholder="请输入公众号名称" />
      </el-form-item>

      <el-form-item class="lef" label="公众号Id">
        <el-input type="text" v-model="datas.followAppId" placeholder="请输入公众号Id" />
      </el-form-item>
    </el-form>

    <!-- 上传图片 -->
    <uploadimg ref="upload" @uploadInformation="uploadInformation" />
  </div>
</template>

<script>
import uploadimg from '../../uploadImg' //图片上传
export default {
  name: 'followStyle',
  props: {
    datas: Object,
  },
  data() {
    return {}
  },

  created() {
    console.log(this.datas,'-------------followStyle datas')
  },

  mounted() {},

  methods: {
    // 提交
    uploadInformation(res) {
      this.datas.heade = res
    },
  },

  computed: {},

  watch: {},
  components: {
    uploadimg,
  },
}
</script>

<style lang="less" scoped>
#followStyle {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0 10px 20px;
  box-sizing: border-box;
}

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

.follow-pic {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .uploadImg {
    width: 80%;
    margin-top: 20px;
  }
}
</style>
