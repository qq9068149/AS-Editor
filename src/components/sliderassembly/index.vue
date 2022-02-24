<template>
  <div class="sliderassembly">
    <el-collapse v-model="activeNames">
      <el-collapse-item
        :title="items.title"
        :name="index + 1"
        v-for="(items, index) in datas"
        :key="index"
      >
        <div
          class="componList"
          draggable="true"
          @dragstart="drag($event)"
          @dragend="dragends($event)"
          :data-name="item.name"
          v-for="(item, ind) in items.comList"
          :key="ind"
        >
          <i class="iconfont" :class="item.icon" v-if="item.icon" />
          <van-icon :name="item.vanIcon" v-else />
          <p>{{ item.text }}</p>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'sliderassembly',
  props: {
    pointer: Object,
  },
  setup(props) {
    // 侧边栏组件显示
    const activeNames = reactive([1, 2, 3])

    // 组件信息配置
    const datas = reactive([
      {
        title: '基础组件',
        comList: [
          {
            text: '商品搜索',
            type: '1-1',
            icon: 'icon-shangpinsousuo',
            name: 'commoditysearch',
          },
          {
            text: '标题文本',
            type: '1-3',
            icon: 'icon-Component-biaotiwenzi',
            name: 'captiontext',
          },

          {
            text: '图片广告',
            type: '1-3',
            icon: 'icon-tupianguanggao',
            name: 'pictureads',
          },
          {
            text: '图文导航',
            type: '1-4',
            icon: 'icon-icon_tupiandaohang',
            name: 'graphicnavigation',
          },
          {
            text: '底部导航',
            type: '1-5',
            icon: 'icon-daohang',
            name: 'tabBar',
          },
          {
            text: '魔方',
            type: '1-6',
            icon: 'icon-mofang',
            name: 'magiccube',
          },
          {
            text: '公告',
            type: '1-7',
            icon: 'icon-gonggao',
            name: 'notice',
          },

          {
            text: '视频',
            type: '1-8',
            icon: 'icon-shipin',
            name: 'videoss',
          },
          {
            text: '富文本',
            type: '1-10',
            icon: 'icon-fuwenben',
            name: 'richtext',
          },
          {
            text: '辅助分割',
            type: '1-11',
            icon: 'icon-Component-fuzhufenge',
            name: 'auxiliarysegmentation',
          },

          {
            text: '店铺信息',
            type: '1-12',
            icon: 'icon-dianpuxinxi',
            name: 'storeinformation',
          },
          {
            text: '单元格',
            type: '1-13',
            icon: 'icon-jinrudianpu',
            name: 'entertheshop',
          },
          {
            text: '社群涨粉',
            type: '1-14',
            icon: 'icon-kuaisuzhangfen',
            name: 'communitypowder',
          },
          {
            text: '关注公众号',
            type: '1-15',
            icon: 'icon-gongzhonghao',
            name: 'follow',
          },
          {
            text: '悬浮',
            type: '1-16',
            icon: 'icon-wangye',
            name: 'suspension',
          },
          {
            text: '自定义模块',
            type: 'demo',
            icon: 'icon-zidingyimokuai',
            name: 'custommodule',
          },
        ],
      },
      {
        title: '业务组件',
        comList: [
          {
            text: '商品',
            type: '2-1',
            icon: 'icon-goods',
            name: 'listswitching',
          },
          {
            text: '文章模块',
            type: '2-2',
            icon: 'icon-dianpubijikapian',
            name: 'storenotecard',
          },
          {
            text: '表单模块',
            type: '2-3',
            vanIcon: 'orders-o',
            name: 'investigate',
          },
        ],
      },
    ])

    /**
     * 当用户开始拖动元素或选择文本时触发此事件
     *
     * @param {Object} event event对象
     */
    const drag = (event) => {
      /* 开启穿透 */
      props.pointer.show = true
      /* 传递参数 */
      event.dataTransfer.setData('componentName', event.target.dataset.name)
    }

    /**
     * 当拖动操作结束时（释放鼠标按钮或按下退出键），会触发此事件
     *
     * @param {Object} event event对象
     */
    const dragends = () => {
      /* 关闭穿透 */
      props.pointer.show = false
    }

    return {
      activeNames,
      datas,
      drag,
      dragends,
    }
  },
}
</script>

<style scoped lang="less">
/* 组件 */
.sliderassembly {
  width: 275px;
  height: 100%;
  overflow-y: scroll;
  border-right: 1px solid #ebedf0;
  box-sizing: border-box;
  padding: 0 12px;
  background: #fff;
  /* 滚动条 */
  &::-webkit-scrollbar {
    width: 1px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #155bd4;
  }
  :deep(.el-collapse-item__header),
  :deep(.el-collapse-item__wrap) {
    border-bottom: 0 !important;
  }

  /* 组件列表 */
  .componList {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    width: 80px;
    height: 88px;
    margin-bottom: 8px;
    align-items: center;
    cursor: all-scroll;
    transition: all 0.3s;
    &:hover {
      background: #155bd4;
      border-radius: 2px;
      font-weight: 700;
      i,
      p,
      span {
        color: #fff;
      }
    }
    /* 图标 */
    i {
      font-size: 32px;
      width: 32px;
      height: 32px;
      line-height: 32px;
      color: #b0a8a8;
      margin-top: 4px;
    }
    /* 标题 */
    p {
      font-size: 12px;
      color: #323233;
      margin-top: 4px;
    }
    /* 数量 */
    span {
      color: #7d7e80;
      margin-top: 4px;
      font-size: 10px;
    }
  }
}
</style>
