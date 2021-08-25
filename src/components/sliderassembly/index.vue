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
          <i class="iconfont" :class="item.icon" />
          <p>{{ item.text }}</p>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'sliderassembly',
  props: {
    pointer: Object,
  },
  data() {
    return {
      activeNames: [1, 2, 3] /* 侧边栏组件显示 */,
      datas: [
        {
          title: '基础组件',
          comList: [
            {
              text: '标题文本',
              type: '1-1',
              icon: 'icon-Component-biaotiwenzi',
              name: 'captiontext',
            },
            {
              text: '商品',
              type: '1-2',
              icon: 'icon-goods',
              name: 'listswitching',
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
              text: '富文本',
              type: '1-5',
              icon: 'icon-fuwenben',
              name: 'richtext',
            },
            {
              text: '魔方',
              type: '1-6',
              icon: 'icon-mofang',
              name: 'magiccube',
            },
            {
              text: '辅助分割',
              type: '1-7',
              icon: 'icon-Component-fuzhufenge',
              name: 'auxiliarysegmentation',
            },
            {
              text: '商品搜索',
              type: '1-8',
              icon: 'icon-shangpinsousuo',
              name: 'commoditysearch',
            },
            {
              text: '店铺信息',
              type: '1-9',
              icon: 'icon-dianpuxinxi',
              name: 'storeinformation',
            },
            {
              text: '进入店铺',
              type: '1-10',
              icon: 'icon-jinrudianpu',
              name: 'entertheshop',
            },
            {
              text: '公告',
              type: '1-11',
              icon: 'icon-gonggao',
              name: 'notice',
            },
            {
              text: '视频',
              type: '1-12',
              icon: 'icon-shipin',
              name: 'videoss',
            },
            {
              text: '音频',
              type: '1-13',
              icon: 'icon-yuyin',
              name: 'voicer',
            },
             
            {
              text: '社群涨粉',
              type: '1-15',
              icon: 'icon-kuaisuzhangfen',
              name: 'communitypowder',
            },
            {
              text: '店铺笔记卡片',
              type: '1-16',
              icon: 'icon-dianpubijikapian',
              name: 'storenotecard',
            },
            /* {
              text: '人群运营',
              type: '1-17',
              icon: 'icon-yunying',
              name: ''
            }, */
            /* {
              text: '在线客服',
              type: '1-19',
              icon: 'icon-weibiaoti-_huaban',
              name: ''
            }, */
            /* {
              text: '个性化推荐',
              type: '1-18',
              icon: 'icon-gexinghuatuijian',
              name: ''
            }, */
            {
              text: '调研',
              type: '1-20',
              icon: 'icon-dianpubijikapian',
              name: 'investigate',
            },
            {
              text: '导航',
              type: '1-21',
              icon: 'icon-daohang',
              name: 'tabBar',
            },
            {
              text: '关注公众号',
              type: '1-22',
              icon: 'icon-gongzhonghao',
              name: 'follow',
            },
            {
              text: '悬浮',
              type: '1-23',
              icon: 'icon-wangye',
              name: 'suspension',
            },
            {
              text: '自定义模块',
              type: '1-13',
              icon: 'icon-zidingyimokuai',
              name: 'custommodule'
            }, 
          ],
        },
        /* {
          title: '营销组件',
          comList: [
            {
              text: '优惠券',
              type: '2-1',
              icon: 'icon-youhuiquan',
              name: ''
            },
            {
              text: '限时折扣',
              type: '2-2',
              icon: 'icon-xianshizhekou',
              name: ''
            },
            {
              text: '秒杀',
              type: '2-3',
              icon: 'icon-miaosha',
              name: ''
            },
            {
              text: '拼团',
              type: '2-4',
              icon: 'icon-pintuan-copy',
              name: ''
            },
            {
              text: '砍价',
              type: '2-5',
              icon: 'icon-kanjia',
              name: ''
            },
            {
              text: '周期购',
              type: '2-6',
              icon: 'icon-zhouqi',
              name: ''
            },
            {
              text: '积分商城',
              type: '2-7',
              icon: 'icon-jifenzhang',
              name: ''
            }
          ]
        },
        {
          title: '教育组件',
          comList: [
            {
              text: '课程',
              type: '3-1',
              icon: 'icon-kecheng',
              name: ''
            },
            {
              text: '老师',
              type: '3-2',
              icon: 'icon-laoshi',
              name: ''
            },
            {
              text: '知识专栏',
              type: '3-3',
              icon: 'icon-zhishizhuanlan1',
              name: ''
            },
            {
              text: '知识内容',
              type: '3-4',
              icon: 'icon-zhishizhuanlan',
              name: ''
            },
            {
              text: '知识直播',
              type: '3-5',
              icon: 'icon-zhibobofangshexiangjitianxianxianxing',
              name: ''
            },
            {
              text: '知识付费会员',
              type: '3-6',
              icon: 'icon-zhishifufeihuiyuan',
              name: ''
            },
            {
              text: '群打卡',
              type: '3-7',
              icon: 'icon-daka',
              name: ''
            },
            {
              text: '报名表单',
              type: '3-8',
              icon: 'icon-baomingbiaodan',
              name: ''
            }
          ]
        } */
      ],
    }
  },
  methods: {
    /**
     * 当用户开始拖动元素或选择文本时触发此事件
     *
     * @param {Object} event event对象
     */
    drag(event) {
      /* 开启穿透 */
      this.pointer.show = true
      /* 传递参数 */
      event.dataTransfer.setData('componentName', event.target.dataset.name)
    },

    /**
     * 当拖动操作结束时（释放鼠标按钮或按下退出键），会触发此事件
     *
     * @param {Object} event event对象
     */
    dragends() {
      /* 关闭穿透 */
      this.pointer.show = false
    },
  },
}
</script>

<style scoped lang="less">
/* 组件 */
.sliderassembly {
  width: 190px;
  height: 100%;
  overflow-y: scroll;
  border-right: 1px solid #ebedf0;
  box-sizing: border-box;
  padding: 0 12px;
  /* 滚动条 */
  &::-webkit-scrollbar {
    width: 1px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #155bd4;
  }
  /deep/.el-collapse-item__header,
  /deep/.el-collapse-item__wrap {
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
