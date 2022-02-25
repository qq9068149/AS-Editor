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
        <!-- 返回 -->
      </p>
      <div>
        <el-button @click="reloads" type="danger"
          ><i class="el-icon-delete-solid el-icon--left"></i>重置</el-button
        >
        <el-button @click="realTimeView.show = true">预览</el-button>
        <el-button @click="catJson">查看JSON </el-button>
        <el-button @click="$refs.file.click()">导入JSON </el-button>
        <el-button @click="exportJSON">导出JSON </el-button>
        <input
          type="file"
          ref="file"
          id="file"
          accept=".json"
          @change="importJSON"
          style="display: none"
        />
        <!-- <el-button @click="Preservation"
          ><i class="el-icon-s-claim el-icon--left"></i>保存</el-button
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
          <img src="@/assets/images/phoneTop.png" alt="" class="statusBar" />

          <!-- 头部导航 -->
          <headerTop :pageSetup="pageSetup" @click.native="headTop" />

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
          <phoneBottom />
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
          <!-- 动态组件 -->
          <component
            :is="rightcom"
            :datas="currentproperties"
            @componenmanagement="componenmanagement"
          />
        </transition>
      </div>
    </section>
    <realTimeView
      :datas="realTimeView"
      :val="{
        id,
        name: pageSetup.name,
        templateJson: JSON.stringify(pageSetup),
        component: JSON.stringify(pageComponents),
      }"
    />
  </div>
</template>

<script>
import utils from 'utils/index' // 方法类
import componentProperties from '@/utils/componentProperties' // 组件数据
import html2canvas from 'html2canvas' // 生成图片
import FileSaver from 'file-saver' // 导出JSON

export default {
  name: 'home',
  inject: ['reload'],
  data() {
    return {
      realTimeView: {
        show: false, // 是否显示预览
      },
      id: null, //当前页面
      deleShow: true, //删除标签显示
      index: '', //当前选中的index
      rightcom: 'decorate', //右侧组件切换
      currentproperties: {}, //当前属性
      pageSetup: {
        // 页面设置属性
        name: '页面标题', //页面名称
        details: '', //页面描述
        isPerson: false, // 是否显示个人中心
        isBack: true, // 是否返回按钮
        titleHeight: 35, // 高度
        bgColor: 'rgba(249, 249, 249, 10)', //背景颜色
        bgImg: '', // 背景图片
      },
      pageComponents: [], //页面组件
      offsetY: 0, //记录上一次距离父元素高度
      pointer: { show: false }, //穿透
      onlyOne: ['1-5', '1-16'], // 只能存在一个的组件(组件的type)
    }
  },

  mounted() {
    this.pageSetup.name = '页面标题'
    this.currentproperties = this.pageSetup
  },

  methods: {
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
    },
    /**
     * 保存
     */
    Preservation() {
      /* 隐藏border和删除图标 */
      this.deleShow = false
      /* 渲染结束截图 */
      this.$nextTick(() => {
        /* 截图 */
        this.toImage()
      })
    },

    /**
     * 页面截图
     *
     * @param {Function} callBack 回调函数
     */
    toImage() {
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
        console.log(formData, '--------------页面图片formData')
        loading.close()
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

      /* 查询是否只能存在一个的组件且在第一个 */
      let someOne = this.pageComponents.some((item, index) => {
        return (
          item.component === 'placementarea' &&
          index === 0 &&
          this.onlyOne.includes(data.type)
        )
      })
      if (someOne) {
        this.$message.info('固定位置的组件(如: 底部导航、悬浮)不能放在第一个!')
        /* 删除提示组件 */
        this.dragleaves()
        return
      }

      /* 查询是否只能存在一个的组件 */
      let someResult = this.pageComponents.some((item) => {
        return (
          this.onlyOne.includes(item.type) &&
          item.component === event.dataTransfer.getData('componentName')
        )
      })
      if (someResult) {
        this.$message.info('当前组件只能添加一个!')
        /* 删除提示组件 */
        this.dragleaves()
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

    // 导出json
    exportJSON() {
      // 将json转换成字符串
      const data = JSON.stringify({
        id: this.id,
        name: this.pageSetup.name,
        templateJson: JSON.stringify(this.pageSetup),
        component: JSON.stringify(this.pageComponents),
      })
      const blob = new Blob([data], { type: '' })
      FileSaver.saveAs(blob, `${this.pageSetup.name}.json`)
    },
    // 导入json
    importJSON() {
      const file = document.getElementById('file').files[0]
      const reader = new FileReader()
      reader.readAsText(file)
      let _this = this
      reader.onload = function () {
        // this.result为读取到的json字符串，需转成json对象
        let ImportJSON = JSON.parse(this.result)
        // 检测是否导入成功
        console.log(ImportJSON, '-----------------导入成功')
        // 导入JSON数据
        _this.id = ImportJSON.id
        _this.pageSetup = JSON.parse(ImportJSON.templateJson)
        _this.pageComponents = JSON.parse(ImportJSON.component)
      }
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
