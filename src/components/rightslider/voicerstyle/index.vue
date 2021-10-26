<template>
  <div class="voicerstyle">
    <!-- 标题 -->
    <h2>{{ datas.text }}</h2>

    <el-form label-width="70px" :model="datas" size="small" class="lef">
      <el-form-item label="音频">
        <!-- 选择器 -->
        <el-select
          size="medium"
          v-model="voicerData"
          placeholder="请选择需要播放的音频"
          @change="listChange"
        >
          <el-option
            v-for="item in voicerList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>

        <!-- 刷新 -->
        <span class="link" @click="links">{{
          activ === 0 ? '刷新' : '刷新中...'
        }}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'voicerstyle',
  props: {
    datas: Object,
  },
  data() {
    return {
      voicerList: [], // 视频列表
      activ: 0, //刷新
      voicerData: null,
    }
  },
  mounted() {
    this.links()
    this.voicerData = this.datas.voicerData.name
    this.initImageList()
  },
  methods: {
    // 初始化更新imageList数据
    initImageList() {
      if (this.datas.voicerData) {
        let shopCommodity = JSON.parse(localStorage.getItem('shopCommodity'))
        this.datas.voicerData =
          shopCommodity[this.datas.voicerData.type][this.datas.voicerData.id]
        console.log(this.datas.voicerData, '------------created imageList')
      }
    },

    /* 加载视频下拉框 */
    links() {
      if (this.activ === 1) return
      this.activ = 1
      /* 获取视频信息 */
      this.$httpApi.newsList({ type: 3 }).then((res) => {
        this.activ = 0
        console.log(res.data)
        

        this.voicerList = res.data
      })
    },

    // 下拉框数据变化
    listChange(data) {
      let filterArr = this.voicerList.filter((item) => {
        return item.name == data
      })

      // 通过商品 type 和 id  获取到商品数据  newList接口数据可以不用
      this.datas.voicerData = this.$utils.getCoursewareData(
        '3',
        filterArr[0].id
      )
      console.log(this.datas.voicerData, '------------------new video data')
    },
  },

  watch: {
    datas: function () {
      this.voicerData = this.datas.voicerData.name
    },
  },
}
</script>

<style scoped lang="less">
.voicerstyle {
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

  /* 刷新 */
  .link {
    display: inline-block;
    padding: 0 10px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    cursor: pointer;
    color: #155bd4;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}
</style>
