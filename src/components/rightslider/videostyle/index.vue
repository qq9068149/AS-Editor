<template>
  <div class="videostyle">
    <!-- 标题 -->
    <h2>{{ datas.text }}</h2>

    <el-form label-width="70px" :model="datas" size="small" class="lef">
      <el-form-item label="视频">
        <!-- 选择器 -->
        <el-select
          size="medium"
          v-model="videoData"
          placeholder="请选择需要播放的视频"
          @change="listChange"
        >
          <el-option
            v-for="item in videoList"
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
      <!-- 是否自动播放 -->
      <el-form-item class="lef" label="是否自动播放" label-width="100px">
        {{ datas.autoplay ? '是' : '否' }}
        <el-checkbox style="margin-left: 196px" v-model="datas.autoplay" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'videostyle',
  props: {
    datas: Object,
  },
  data() {
    return {
      videoList: [], // 视频列表
      activ: 0, //刷新
      videoData: null,
    }
  },
  created() {
    this.links()
    this.videoData = this.datas.videoData.name
    this.initImageList()
  },
  methods: {
    // 初始化更新imageList数据
    initImageList() {
      if (this.datas.videoData) {
        let shopCommodity = JSON.parse(localStorage.getItem('shopCommodity'))
        this.datas.videoData =
          shopCommodity[this.datas.videoData.type][this.datas.videoData.id]
        console.log(this.datas.videoData, '------------created imageList')
      }
    },

    /* 加载视频下拉框 */
    links() {
      if (this.activ === 1) return
      this.activ = 1
      /* 获取视频信息 */
      this.$httpApi.newsList({ type: 1 }).then((res) => {
        this.activ = 0
        
        this.videoList = res.data
      })
    },

    // 下拉框数据变化
    listChange(data) {
      let filterArr = this.videoList.filter((item) => {
        return item.name == data
      })

      // 通过商品 type 和 id  获取到商品数据  newList接口数据可以不用
      this.datas.videoData = this.$utils.getCoursewareData('1', filterArr[0].id)
      console.log(this.datas.videoData, '------------------new video data')
    },
  },
  watch: {
    datas: function () {
      this.videoData = this.datas.videoData.name
    },
  },
}
</script>

<style scoped lang="less">
.videostyle {
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
