<template>
  <div class="home">
    <!-- 按钮集合 -->
    <section class="buttons">
      <p
        style="
          font-size: 12px;
          color: #4f4f4f;
          margin-left: 15px;
          cursor: pointer;
        "
        @click="Previous"
      >
        返回店铺列表
      </p>
      <div>
        <!-- <div class="frop">
          <el-dropdown @command="dropDownButton" placement="bottom-start">
            <el-button type="primary">
              更多操作
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">保存为系统模板</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div> -->
        <el-button @click="reloads" type="danger"
          ><i class="el-icon-delete-solid el-icon--left"></i>重置</el-button
        >
        <!-- <el-button @click="Preservation"
          ><i class="el-icon-s-claim el-icon--left"></i>保存</el-button
        > -->
        <el-button @click="catJson">查看JSON </el-button>
        <!-- <el-button @click="upperShelf" type="primary"
          ><i class="el-icon-upload el-icon--left"></i>上架</el-button
        > -->
      </div>
    </section>

    <!-- 装修操作 -->
    <section class="operation">
      <!-- 组件 -->
      <sliderassembly :pointer="pointer" />

      <!-- 手机 -->
      <div class="phone">
        <section class="phoneAll" ref="imageTofile" id="imageTofile">
          <!-- 导航栏 -->
          <img src="@/assets/images/phoneTop.png" alt="" class="statusBar" />

          <!-- 标题 -->
          <div
            class="headerTop"
            :style="{
              height: pageSetup.titleHeight + 'px',
            }"
            @click="headTop"
          >
            <!-- 左半部分 -->
            <div class="lef" v-show="pageSetup.isBack">
              <van-icon name="arrow-left" />
              <!-- <span>首页</span> -->
            </div>
            <!-- 标题 -->
            <div
              class="header-title"
              :style="{
                height: pageSetup.titleHeight + 'px',
                'line-height': pageSetup.titleHeight + 'px',
              }"
            >
              {{ pageSetup.name }}
            </div>
            <!-- 右半部分 -->
            <div class="rig" v-show="pageSetup.isPerson">
              <span>个人中心</span>
            </div>
          </div>

          <!-- 主体内容 -->
          <section
            class="phone-container"
            :style="{
              'background-color': pageSetup.bgColor,
              backgroundImage: 'url(' + pageSetup.bgImg + ')',
            }"
            @drop="drop($event)"
            @dragover="allowDrop($event)"
            @dragleave="dragleaves($event)"
          >
            <div :class="pointer.show ? 'pointer-events' : ''">
              <!-- 动态组件 -->
              <component
                :is="item.component"
                v-for="(item, index) in pageComponents"
                :key="index"
                :datas="item.setStyle"
                :style="{
                  border: item.active && deleShow ? '2px solid #155bd4' : '',
                }"
                @click.native="activeComponent(item, index)"
                class="componentsClass"
                :data-type="item.type"
              >
                <div
                  v-show="deleShow"
                  class="deles"
                  slot="deles"
                  @click.stop="deleteObj(index)"
                >
                  <!-- 删除组件 -->
                  <span class="iconfont icon-sanjiaoxingzuo"></span>
                  {{ item.text }}
                  <i class="el-icon-delete-solid" />
                </div>
              </component>
            </div>
          </section>

          <!-- 手机高度 -->
          <div class="phoneSize">iPhone 8手机高度</div>

          <!-- 底部 -->
          <phoneBottom :datas="pageSetup.bottomLogo" />
        </section>
        <!-- 底部 -->
      </div>

      <!-- 页面设置tab -->
      <div class="decorateTab">
        <span
          :class="rightcom === 'decorate' ? 'active' : ''"
          @click="rightcom = 'decorate'"
        >
          <i class="iconfont icon-wangye" />
          页面设置
        </span>
        <span
          :class="rightcom === 'componenmanagement' ? 'active' : ''"
          @click="rightcom = 'componenmanagement'"
        >
          <i class="iconfont icon-zujian" />
          组件管理
        </span>
        <span
          class="active"
          v-show="rightcom != 'componenmanagement' && rightcom != 'decorate'"
        >
          <i class="iconfont icon-zujian" />
          组件设置
        </span>
      </div>

      <!-- 右侧工具栏 -->
      <div class="decorateAll">
        <!-- 页面设置 -->
        <transition name="decorateAnima">
          <!-- 路由缓存 -->
          <keep-alive exclude="richtextstyle">
            <!-- 动态组件 -->
            <component
              :is="rightcom"
              :datas="currentproperties"
              @componenmanagement="componenmanagement"
            />
          </keep-alive>
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
import utils from 'utils/index' // 方法
import componentProperties from '@/utils/componentProperties' // 组件数据
import sliderassembly from 'components/sliderassembly' // 左侧组件大全
import phoneBottom from 'components/phoneBottom' // 手机底部

import html2canvas from 'html2canvas'

/* 手机组件 */
import {
  captiontext,
  placementarea,
  pictureads,
  graphicnavigation,
  richtext,
  magiccube,
  auxiliarysegmentation,
  commoditysearch,
  storeinformation,
  entertheshop,
  investigate,
  notice,
  videoss,
  voicer,
  custommodule,
  communitypowder,
  storenotecard,
  crowdoperation,
  personalizedrecommendation,
  onlineservice,
  listswitching,
  tabBar,
  follow,
  suspension,
} from 'components/componentscom'

/* 右侧组件 */
import {
  decorate,
  componenmanagement,
  captiontextsstyle,
  pictureadsstyle,
  graphicnavigationstyle,
  richtextstyle,
  magiccubestyle,
  auxiliarysegmentationstyle,
  commoditysearchstyle,
  storeinformationstyle,
  entertheshopstyle,
  investigatestyle,
  noticestyle,
  videostyle,
  voicerstyle,
  custommodulestyle,
  communitypowderstyle,
  storenotecardstyle,
  crowdoperationstyle,
  personalizedrecommendationstyle,
  onlineservicestyle,
  listswitchingstyle,
  tabBarStyle,
  followStyle,
  suspensionstyle,
} from 'components/rightslider'

export default {
  name: 'home',
  inject: ['reload'],
  data() {
    return {
      id: null, //当前页面
      deleShow: true, //删除标签显示
      index: '', //当前选中的index
      rightcom: 'decorate', //右侧组件切换
      currentproperties: {}, //当前属性
      pageSetup: {
        // 页面设置属性
        name: '页面标题', //页面名称
        details: '', //页面描述
        bgColor: 'rgba(249, 249, 249, 10)', //背景颜色
        bottomLogo: {
          isShowBootom: false,
          botLogo: '',
        }, // 底部logo
        isPerson: false, // 是否显示个人中心
        isBack: true, // 是否返回按钮
        titleHeight: 35,
        bgImg: '',
      },
      pageComponents: [], //页面组件
      offsetY: 0, //记录上一次距离父元素高度
      pointer: { show: false }, //穿透
      onlyOne: ['1-21', '1-22'], // 只能存在一个的组件
    }
  },

  mounted() {
    //该字段用于区分，是否是选择模板
    let type = this.$route.query.type
    if (this.$route.query.id) {
      /* 加载 */
      const loading = this.$loading({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      this.$httpApi
        .shopTemplates({ shopTemplateId: this.$route.query.id })
        .then((res) => {
          /* 取消加载 */
          loading.close()

          let datas = res.data.shopTemplate

          //如果为模板，则需要将id设置为null,否则模板会被修改
          if (!type) {
            this.id = res.data.shopTemplate.id
          }

          this.pageComponents = JSON.parse(datas.component)

          console.log(this.pageComponents, '--------------------pageComponents')

          if (datas.templateJson) {
            console.log('----------home datas1')
            this.pageSetup = JSON.parse(datas.templateJson)
          } else {
            console.log('----------home datas2')
            this.pageSetup.name = datas.name
            this.pageSetup.details = datas.details
            this.pageSetup.bgColor = datas.bgColor
          }
          /* 默认页面设置 */
          this.currentproperties = this.pageSetup
          console.log(
            this.currentproperties,
            this.pageSetup,
            '----------home datas'
          )
        })
    } else {
      this.pageSetup.name = '页面标题'
      this.currentproperties = this.pageSetup
      console.log(this.currentproperties, '----------home datas')
    }
  },

  methods: {
    dropDownButton(res) {
      // 设为系统模板
      if (res === '1') {
        this.systemTemplate()
      }
      console.log(res)
    },

    /**
     * 设为系统模板
     *
     */
    systemTemplate() {
      this.Preservation(() => {
        const loadingss = this.$loading({
          lock: true,
          text: '添加为系统模板...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        })
        this.$httpApi.shelves({ shopTemplateId: this.id }).then((res) => {
          /* 取消加载 */
          loadingss.close()
          console.log(res)

          this.$router.push({ path: 'establishShop' })
          this.id = null
        })
      })
    },

    /**
     * 上架
     *
     * @param {Function} callBack 回调函数
     */
    upperShelf() {
      this.Preservation(() => {
        const loadingss = this.$loading({
          lock: true,
          text: '上架中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        })
        this.$httpApi.shelves({ shopTemplateId: this.id }).then((res) => {
          /* 取消加载 */
          loadingss.close()
          console.log(res)
          this.$message({
            message: '上架成功',
            type: 'success',
          })
          this.$router.push({ path: 'establishShop' })
          this.id = null
        })
      })
    },
    // 查看JSON
    catJson() {
      this.$alert(
        `{
          <br/>
          "id": ${this.id},
          <br/>
          "name": "${this.pageSetup.name}",
          <br/>
          "templateJson": '${JSON.stringify(this.pageSetup)}',
          <br/>
          "component": '${JSON.stringify(this.pageComponents)}',
          <br/>
        }`,
        '查看JSON',
        {
          confirmButtonText: '确定',
          customClass: 'JSONView',
          dangerouslyUseHTMLString: true,
          callback: () => {},
        }
      )
      console.log(
        {
          id: this.id,
          name: this.pageSetup.name,
          templateJson: this.pageSetup,
          component: this.pageComponents,
        },
        '----------------查看JSON'
      )
    },
    /**
     * 保存
     *
     * @param {Function} callBack 回调函数
     */
    Preservation(callBack) {
      /* 隐藏border和删除图标 */
      this.deleShow = false
      /* 渲染结束截图 */
      this.$nextTick(() => {
        /* 截图 */
        this.toImage((res) => {
          /* 加载 */
          const loadings = this.$loading({
            lock: true,
            text: '上传中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })

          this.$httpApi
            .save({
              id: this.id,
              imgUrl: res,
              // bgColor: this.pageSetup.colour,
              // details:this.pageSetup.description,
              name: this.pageSetup.name,
              // bottomLogo: this.pageSetup.bottomLogo,
              templateJson: JSON.stringify(this.pageSetup),
              component: JSON.stringify(this.pageComponents),
            })
            .then((res) => {
              /* 取消加载 */
              loadings.close()

              this.$message({
                message: '上传成功',
                type: 'success',
              })

              this.id = res.data.id

              if (callBack) callBack()
            })
        })
      })
    },

    /**
     * 页面截图
     *
     * @param {Function} callBack 回调函数
     */
    toImage(callBack) {
      /* 加载 */
      const loading = this.$loading({
        lock: true,
        text: '保存中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })

      const imageTofiles = document.querySelector('#imageTofile')
      /* 截图 */
      html2canvas(this.$refs.imageTofile, {
        backgroundColor: null,
        height: imageTofiles.scrollHeight,
        width: imageTofiles.scrollWidth,
        useCORS: true,
      }).then((canvas) => {
        /* 显示border和删除图标 */
        this.deleShow = true
        let url = canvas.toDataURL('image/png')
        const formData = new FormData()
        formData.append('base64File', url)
        this.$httpApi.miniShop(formData).then((res) => {
          /* 取消加载 */
          loading.close()

          this.$message({
            message: '保存成功',
            type: 'success',
          })

          /* 获取图片链接 */
          callBack(res.data.src)
        })
      })
    },

    /**
     * 当将元素或文本选择拖动到有效放置目标（每几百毫秒）上时，会触发此事件
     *
     * @param {Object} event event对象
     */
    allowDrop(event) {
      //阻止浏览器的默认事件
      event.preventDefault()

      /* 获取鼠标高度 */
      let eventoffset = event.offsetY

      /* 如果没有移动不触发事件减少损耗 */
      if (this.offsetY === eventoffset) return
      else this.offsetY = eventoffset

      /* 获取组件 */
      const childrenObject = event.target.children[0]

      // 一个以上的组件计算
      if (this.pageComponents.length) {
        /* 如果只有一个组件并且第一个是提示组件直接返回 */
        if (
          this.pageComponents.length === 1 &&
          this.pageComponents[0].type === 0
        )
          return

        /* 如果鼠标的高度小于第一个的一半直接放到第一个 */
        if (eventoffset < childrenObject.children[0].clientHeight / 2) {
          /* 如果第一个是提示组件直接返回 */
          if (this.pageComponents[0].type === 0) return

          /* 删除提示组件 */
          this.pageComponents = this.pageComponents.filter(
            (res) => res.component !== 'placementarea'
          )

          /* 最后面添加提示组件 */
          this.pageComponents.unshift({
            component: 'placementarea',
            type: 0,
          })

          return
        }

        /* 记录距离父元素高度 */
        const childOff = childrenObject.offsetTop

        /* 鼠标在所有组件下面 */
        if (
          eventoffset > childrenObject.clientHeight ||
          childrenObject.lastChild.offsetTop -
            childOff +
            childrenObject.lastChild.clientHeight / 2 <
            eventoffset
        ) {
          /* 最后一个组件是提示组件返回 */
          if (this.pageComponents[this.pageComponents.length - 1].type === 0)
            return

          /* 清除提示组件 */
          this.pageComponents = this.pageComponents.filter(
            (res) => res.component !== 'placementarea'
          )

          /* 最后一个不是提示组件添加 */
          this.pageComponents.push({
            component: 'placementarea',
            type: 0,
          })

          return
        }

        const childrens = childrenObject.children

        /* 在两个组件中间，插入 */
        for (let i = 0, l = childrens.length; i < l; i++) {
          const childoffset = childrens[i].offsetTop - childOff

          if (childoffset + childrens[i].clientHeight / 2 > event.offsetY) {
            /* 如果是提示组件直接返回 */
            if (this.pageComponents[i].type === 0) break

            if (this.pageComponents[i - 1].type === 0) break

            /* 清除提示组件 */
            this.pageComponents = this.pageComponents.filter(
              (res) => res.component !== 'placementarea'
            )

            this.pageComponents.splice(i, 0, {
              component: 'placementarea',
              type: 0,
            })
            break
          } else if (childoffset + childrens[i].clientHeight > event.offsetY) {
            if (this.pageComponents[i].type === 0) break

            if (
              !this.pageComponents[i + 1] ||
              this.pageComponents[i + 1].type === 0
            )
              break

            this.pageComponents = this.pageComponents.filter(
              (res) => res.component !== 'placementarea'
            )

            this.pageComponents.splice(i, 0, {
              component: 'placementarea',
              type: 0,
            })

            break
          }
        }
      } else {
        /* 一个组件都没有直接push */
        this.pageComponents.push({
          component: 'placementarea',
          type: 0,
        })
      }
    },

    /**
     * 当在有效放置目标上放置元素或选择文本时触发此事件
     *
     * @param {Object} event event对象
     */
    drop(event) {
      /* 获取数据 */

      let data = utils.deepClone(
        componentProperties.get(event.dataTransfer.getData('componentName'))
      )

      let someResult = this.pageComponents.some((item) => {
        return (
          this.onlyOne.includes(item.type) &&
          item.type === event.dataTransfer.getData('Text')
        )
      })
      if (someResult) {
        this.$message.info('当前组件只能添加一个！')
        /* 删除提示组件 */
        this.pageComponents = this.pageComponents.filter(
          (res) => res.component !== 'placementarea'
        )
        return
      }

      /* 替换 */
      utils.forEach(this.pageComponents, (res, index) => {
        /* 修改选中 */
        if (res.active === true) res.active = false
        /* 替换提示 */
        this.index = index
        if (res.component === 'placementarea')
          this.$set(this.pageComponents, index, data)

        if (this.pageComponents.length === index + 1)
          this.pageComponents = this.pageComponents.filter(
            (res) => res.component !== 'placementarea'
          )
      })

      /* 切换组件 */
      this.rightcom = data.style
      /* 丢样式 */
      this.currentproperties = data.setStyle

      console.log(
        data,
        this.rightcom,
        this.currentproperties,
        '----------components data'
      )
    },

    /**
     * 当拖动的元素或文本选择离开有效的放置目标时，会触发此事件
     *
     * @param {Object} event event对象
     */
    dragleaves() {
      /* 删除提示组件 */
      this.pageComponents = this.pageComponents.filter(
        (res) => res.component !== 'placementarea'
      )
    },

    /**
     * 切换组件位置
     *
     * @param {Object} res 组件切换后返回的位置
     */
    componenmanagement(res) {
      this.pageComponents = res
    },

    /**
     * 选择组件
     *
     * @param {Object} res 当前组件对象
     */
    activeComponent(res, index) {
      this.index = index
      /* 切换组件 */
      this.rightcom = res.style
      /* 丢样式 */
      this.currentproperties = res.setStyle

      /* 替换 */
      utils.forEach(this.pageComponents, (res) => {
        /* 修改选中 */
        if (res.active === true) res.active = false
      })

      /* 选中样式 */
      res.active = true
    },

    /**
     * 标题切换
     *
     * @param {Object} res 当前组件对象
     */
    headTop() {
      this.rightcom = 'decorate'

      /* 替换 */
      utils.forEach(this.pageComponents, (res) => {
        /* 修改选中 */
        if (res.active === true) res.active = false
      })
    },

    /* 删除组件 */
    deleteObj(index) {
      this.pageComponents.splice(index, 1)
      if (this.index === index) this.rightcom = 'decorate'
      if (index < this.index) this.index = this.index - 1
    },

    /* 页面刷新 */
    reloads() {
      this.$confirm('重置后您添加或者修改的数据将会失效, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$router.push({ path: 'home' })
          this.reload()
        })
        .catch(() => {})
    },

    // 返回上一步
    Previous() {
      this.$confirm('返回列表您添加或者修改的数据将会失效, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$router.go(-1)
        })
        .catch(() => {})
    },
  },

  watch: {
    /* 监听右侧属性设置切换 */

    rightcom(newval) {
      if (newval === 'decorate') {
        utils.forEach(this.pageComponents, (res) => {
          /* 修改选中 */
          if (res.active === true) res.active = false
        })
        this.currentproperties = this.pageSetup
        return
      }
      if (newval === 'componenmanagement') {
        /* 替换 */
        utils.forEach(this.pageComponents, (res) => {
          /* 修改选中 */
          if (res.active === true) res.active = false
        })
        this.currentproperties = this.pageComponents
      }
    },
  },

  components: {
    decorate,
    componenmanagement,
    phoneBottom,
    captiontext,
    sliderassembly,
    placementarea,
    captiontextsstyle,
    pictureadsstyle,
    pictureads,
    graphicnavigation,
    graphicnavigationstyle,
    richtext,
    richtextstyle,
    magiccube,
    magiccubestyle,
    auxiliarysegmentation,
    auxiliarysegmentationstyle,
    commoditysearch,
    commoditysearchstyle,
    storeinformation,
    storeinformationstyle,
    entertheshop,
    entertheshopstyle,
    investigate,
    investigatestyle,
    notice,
    noticestyle,
    videoss,
    videostyle,
    voicer,
    voicerstyle,
    custommodule,
    custommodulestyle,
    communitypowder,
    communitypowderstyle,
    storenotecard,
    storenotecardstyle,
    crowdoperation,
    crowdoperationstyle,
    personalizedrecommendation,
    personalizedrecommendationstyle,
    onlineservice,
    onlineservicestyle,
    listswitching,
    listswitchingstyle,
    tabBarStyle,
    tabBar,
    follow,
    followStyle,
    suspension,
    suspensionstyle,
  },
}
</script>

<style lang="less" scoped>
.pointer-events {
  pointer-events: none;
}

.home {
  width: 100%;
  height: 100%;

  /* 删除组件 */
  .deles {
    position: absolute;
    min-width: 80px;
    text-align: center;
    line-height: 25px;
    background: #fff;
    height: 25px;
    font-size: 12px;
    left: 103%;
    top: 50%;
    transform: translateY(-50%);
    .icon-sanjiaoxingzuo {
      position: absolute;
      left: -11px;
      color: #fff;
      font-size: 12px;
      top: 50%;
      transform: translateY(-50%);
    }
    &:hover {
      i {
        display: block;
        position: absolute;
        left: 0;
        font-size: 16px;
        top: 0;
        text-align: center;
        line-height: 25px;
        width: 100%;
        color: #fff;
        height: 100%;
        z-index: 10;
        background: rgba(0, 0, 0, 0.5);
      }
      .icon-sanjiaoxingzuo {
        color: rgba(0, 0, 0, 0.5);
      }
    }

    i {
      display: none;
    }
  }

  /* 按钮集合 */
  .buttons {
    height: 8%;
    border-bottom: 1px solid #ebedf0;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-right: 15px;
    align-items: center;
    /* 下拉 */
    .frop {
      padding-right: 15px;
      .el-button.el-button--primary.el-dropdown-selfdefine {
        background: #fff;
        color: #000;
        border: 1px solid #dcdee0;
      }
    }
    .el-button {
      font-size: 14px;
      padding: 0 16px;
      height: 30px;
      &.el-button--primary {
        background: #155bd4;
      }
      &.el-button--danger {
        background: red;
      }
    }
  }

  /* 操作主体 */
  .operation {
    width: 100%;
    height: 92%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #f7f8fa;
  }

  /* 手机 */
  .phone {
    width: 55%;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    justify-content: center;
    background: #f7f8fa;
    &::-webkit-scrollbar {
      width: 1px;
    }
    // &::-webkit-scrollbar-thumb {
    //   background-color: #155bd4;
    // }

    /* 手机样式 */
    .phoneAll {
      width: 375px;
      min-height: 760px;
      box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
      margin: 45px 0;
      position: relative;

      /* 手机高度 */
      .phoneSize {
        position: absolute;
        left: -137px;
        top: 640px;
        font-size: 12px;
        color: #a2a2a2;
        border-bottom: 1px solid #dedede;
        width: 130px;
        height: 21px;
        line-height: 21px;
      }

      /* 头部 */
      .headerTop {
        height: 35px;
        width: 100%;
        background: #fff;
        display: flex;
        padding: 0 5px;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        border-bottom: 1px solid #f7f8fa;
        position: relative;
        /* 左边 */
        .lef {
          // display: flex;
          // align-items: center;
          // height: 100%;
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);

          /* 图标 */
          i {
            padding: 2px;
            border: 1px solid #dcdcdc;
            border-radius: 50%;
            margin-right: 8px;

            &::before {
              color: #dcdcdc;
            }
          }

          span {
            color: #000;
            font-weight: 400;
            font-size: 12px;
          }
        }
        .header-title {
          width: 100%;
          text-align: center;
          font-size: 14px;
          line-height: 35px;
          color: #333333;
        }
        /* 右边 */
        .rig {
          // display: flex;
          // align-items: center;
          // height: 100%;
          position: absolute;
          right: 18px;
          top: 50%;
          transform: translateY(-50%);
          /* 搜索图标 */
          i {
            font-size: 18px;
            margin: 0 7px 5px;
          }

          /* 文字 */
          span {
            margin: 0 7px;
            font-size: 12px;
          }
        }
      }

      /* 状态栏 */
      .statusBar {
        width: 100%;
        display: block;
      }

      /* 主体内容 */
      .phone-container {
        min-height: 603px;
        box-sizing: border-box;
        cursor: pointer;
        width: 100%;
        position: relative;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .componentsClass {
          border: 1px solid #fff;
          &:hover {
            border: 1px dashed #155bd4;
          }
        }
      }
    }
  }

  /* 右侧工具栏 */
  .decorateAll {
    width: 376px;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
    padding: 0 12px;
    background: #fff;
    &::-webkit-scrollbar {
      width: 1px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #155bd4;
    }
  }

  /* 页面设置tab */
  .decorateTab {
    position: fixed;
    display: flex;
    right: 380px;
    top: 115px;
    flex-direction: column;
    span {
      background-color: #fff;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
      border-radius: 2px;
      width: 94px;
      height: 32px;
      display: inline-block;
      text-align: center;
      line-height: 32px;
      margin-bottom: 12px;
      transition: all 0.8s;
      cursor: pointer;
      &.active {
        background-color: #155bd4;
        color: #fff;
      }
      /* 图标 */
      i {
        font-size: 12px;
        margin-right: 5px;
      }
    }
  }
}

/* 动画 */
.decorateAnima-enter-active {
  transition: all 1.5s ease;
}
.decorateAnima-leave-active {
  transition: all 1.5s ease;
}
.decorateAnima-enter {
  transform: translate(8px, 8px);
  opacity: 0;
}
.decorateAnima-leave-to {
  transform: translate(8px, 8px);
  opacity: 0;
}
</style>
