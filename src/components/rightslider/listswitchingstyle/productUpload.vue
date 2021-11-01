<!-- 已被弃用  该组件为抽离的 魔方组件种商品上传 -->
<template>
  <div class="productUpload">
    <vuedraggable v-model="datas.commoditylisttypetab" v-bind="dragOptions">
      <section
        class="magiccubestyleList"
        v-for="(item, index) in datas.commoditylisttypetab"
        :key="index"
      >
        <div class="magiccubestyleList-top">
          <el-input
            v-model="item.text"
            class="tit"
            style="width: 100px"
            placeholder="请输入分组名称"
            size="mini"
          />
          <i
            @click="delecommoditylisttypetab(index)"
            class="el-icon-delete"
            style="
              cursor: pointer;
              padding: 2px 4px;
              fnot-size: 12px;
              margin-left: 200px;
              color: red;
            "
          />
        </div>

        <!-- 拖拽 -->
        <vuedraggable v-model="item.imageList" v-bind="dragOptions">
          <transition-group>
            <section
              class="imgBanner"
              v-for="(item, ind) in item.imageList"
              :key="item + ind"
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
                  <p
                    style="
                      width: 100%;
                      background: #999;
                      position: absolute;
                      left: 0;
                      bottom: 0;
                      color: #fff;
                      font-size: 5px;
                      text-align: center;
                      height: 20px;
                      line-hright: 20px;
                    "
                  >
                    点击跟换图片图片
                  </p>
                </div>
              </div>
              <!-- 删除 -->
              <i class="el-icon-circle-close" @click="deleteimg(index, ind)" />

              <!-- 标题和链接 -->
              <div class="imgText">
                <div class="imgText-in">
                  <el-input
                    placeholder="请输入商品标题"
                    v-model="item.name"
                    size="mini"
                  />
                </div>

                <!-- 选择类型 -->
                <el-select
                  v-model="item.httpType"
                  placeholder="请选择跳转类型"
                  size="mini"
                >
                  <el-option
                    v-for="item in optionsType"
                    :key="item.name"
                    :label="item.name"
                    :value="item.type"
                  >
                  </el-option>
                </el-select>

                <!-- 选择 -->
                <el-select
                  v-if="item.httpType !== '11'"
                  v-model="item.http"
                  placeholder="请选择图片跳转链接"
                  size="mini"
                  @change="changeId"
                  @visible-change="changeType(item.httpType)"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item"
                  >
                  </el-option>
                </el-select>
                <!-- 输入外部链接 -->
                <el-input
                  v-if="item.httpType === '11'"
                  size="mini"
                  placeholder="请输入链接，输入前确保可以访问"
                  v-model="item.externalLink"
                >
                </el-input>
              </div>
            </section>
          </transition-group>
        </vuedraggable>

        <!-- 添加商品 -->
        <el-button
          @click="addproduct(index)"
          class="uploadImg"
          type="primary"
          plain
          ><i class="el-icon-plus" />点击添加商品</el-button
        >
      </section>
    </vuedraggable>

    <!-- 上传图片 -->
    <uploadimg ref="upload" @uploadInformation="uploadInformation" />
  </div>
</template>

<script>
import vuedraggable from 'vuedraggable' //拖拽组件
import uploadimg from '../../uploadImg' //图片上传

export default {
  data() {
    return {
      dragOptions: {
        animation: 200,
      },
      imgActive: 0, //默认选中第一个图片
      options: [],
      optionsType: [
        {
          type: '1',
          name: '视频',
        },
        {
          type: '2',
          name: '书籍',
        },
        {
          type: '3',
          name: '音频',
        },
        {
          type: '6',
          name: '直播',
        },
        {
          type: '10',
          name: '跳转至历史页面',
        },
        {
          type: '11',
          name: '外部链接',
        },
      ], //跳转类型
    }
  },

  props: ['datas'],

  created() {
    console.log(this.datas)
  },

  methods: {
    /* 删除分组 */
    delecommoditylisttypetab(index) {
      this.datas.commoditylisttypetab.splice(index, 1)
    },

    /* 删除分组里的图片 */
    delecommodityimg(ind, index) {
      this.datas.commoditylisttypetab[ind].imageList.splice(index, 1)
    },

    /* 删除图片 */
    deleteimg(index, ind) {
      this.datas.commoditylisttypetab[index].imageList.splice(ind, 1)
    },

    // 选择类型
    changeType(res) {
      console.log(res)
      if (res === '1' || res === '2' || res === '6' || res === '3') {
        /* 获取视频,音频,直播信息 */
        this.$httpApi.newsList({ type: res }).then((res) => {
          this.activ = 0
          
          this.options = res.data
        })
      } else if (res === '10') {
        this.$httpApi.shopTemplate().then((res) => {
          
          this.options = res.data.shopTemplateList
        })
      }
    },
    changeId(res) {
      if (res.component) delete res.component
      this.datas.imageList[this.imgActive].http = res
    },

    /* 替换 */
    uploadInformation(res) {
      this.datas.imageList[this.imgActive].src = res
    },

    // 添加商品
    addproduct(index) {
      let params = {
        httpType: '1', // 跳转类型
        coverUrl: null, // 商品图片
        id: null, // 跳转id
        externalLink: null, // 外链地址
      }
      this.datas.commoditylisttypetab[index].imageList.push(params)
    },
  },

  components: { vuedraggable, uploadimg },
}
</script>

<style lang="less" scoped>
/* 商品列表 */
.magiccubestyleList {
  padding: 6px 12px;
  margin: 16px 0px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 0 4px 0 rgba(10, 42, 97, 0.2);
  display: flex;
  flex-direction: column;
  position: relative;

  .magiccubestyleList-top {
    display: flex;
    flex-direction: row;
  }
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
  width: 100%;
  height: 40px;
  margin-top: 20px;
}

.tit {
  /deep/.el-input__inner {
    text-align: center;
  }
}
</style>
