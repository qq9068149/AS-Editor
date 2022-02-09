const componentProperties = new Map()

// 数据版本  每次修改组件数据  需要对版本进行修改
// componentProperties.set('componentPropertiesVersion', 'V1.0.0')

componentProperties.set('captiontext', {
  component: 'captiontext',
  text: '标题文字',
  type: '1-3',
  active: true,
  style: 'captiontextsstyle',
  setStyle: {
    text: '标题文字',
    name: '标题文字',//标题内容
    description: '',//描述内容
    wordSize: 16,//标题大小
    descriptionSize: 12,//描述大小
    wordWeight: 400,//标题粗细
    positions: 'left', //显示位置  可选left/center
    descriptionWeight: 200,//描述粗细
    wordColor: 'rgba(50, 50, 51, 10)',//标题颜色
    descriptionColor: 'rgba(150, 151, 153, 10)',//描述颜色
    backColor: 'rgba(255, 255, 255, 10)', //背景颜色
    borderBott: false, //底部分割线
    wordHeight: 24,//框体高度
    more: {    //查看更多
      show: false,//是否显示查看更多
      type: 1, // 样式选择
      text: '查看更多', //自定义文字
      httpType: 10,//链接类型
      http: '',//链接
    },
  },
})

componentProperties.set('listswitching', {
  component: 'listswitching',
  text: '商品',
  type: '2-1',
  active: true,
  style: 'listswitchingstyle',
  setStyle: {
    text: '商品',
    commodityType: 0,
    moditystyle: 0,
    borderRadius: 0,
    pageMargin: 15,
    commodityMargin: 10,
    textWeight: 400,
    positions: 'left',
    priceofcommodity: true,
    purchasebutton: true,
    commoditycorner: true,
    purchasebuttonType: 0,
    commoditycornertype: 0,
    commodityTagColor: '#07c160',
    tagPosition: 0,
    imageList: [],
    purchase: '马上抢',
    commoditylisttype: 0,
    commoditylisttypetab: [
      {
        text: '分组',
        imageList: [],
      },
      {
        text: '分组',
        imageList: [],
      },
    ],
    tabColor: '#f39800',
    showMore: false,
    moreUrl: null,
    bgImg: '',
  },
})

componentProperties.set('pictureads', {
  component: 'pictureads',
  text: '图片广告',
  type: '1-3',
  active: true,
  style: 'pictureadsstyle',
  setStyle: {
    text: '图片广告',
    swiperType: 0,  // 选择模板
    borderRadius: 0,// 图片倒角
    pageMargin: 0,  // 页面边距
    imageMargin: 0, // 图片边距
    pagingType: 0,  // 分页类型: 0/"bullets"/"fraction"/"progressbar"
    rowindividual: 2,// 一行个数
    imageList: [],  // 添加图片
  },
})

componentProperties.set('graphicnavigation', {
  component: 'graphicnavigation',
  text: '图文导航',
  type: '1-4',
  active: true,
  style: 'graphicnavigationstyle',
  setStyle: {
    text: '图文导航',
    imageList: [], // 图片导航列表
    navigationType: 0, //图片导航类型
    imgStyle: 0, //图片样式
    backgroundColor: 'rgb(255, 255, 255)', //背景颜色
    textColor: 'rgb(0, 0, 0)', //文字颜色
    borderRadius: 0, //图片倒角
    showSize: 5, //一屏显示个数
    textHeight: 24, // 字体高度
    textSize: 12, // 字体大小
    bgImg: '',
  },
})

componentProperties.set('richtext', {
  component: 'richtext',
  text: '富文本',
  type: '1-10',
  active: true,
  style: 'richtextstyle',
  setStyle: {
    text: '富文本',
    myValue: '', //富文本内容
    backColor: 'rgb(249, 249, 249)', //背景颜色
  },
})
componentProperties.set('magiccube', {
  component: 'magiccube',
  text: '魔方',
  type: '1-6',
  active: true,
  style: 'magiccubestyle',
  setStyle: {
    text: '魔方',
    rubiksCubeType: 0, // 魔方类型
    pageMargin: 0, //页面间距
    imgMargin: 0, //图片间隙
    imageList: [
      {
        src: '',
        linktype: '10',
        http: {},
      },
      {
        src: '',
        linktype: '10',
        http: {},
      },
      {
        src: '',
        linktype: '10',
        http: {},
      },
      {
        src: '',
        linktype: '10',
        http: {},
      },
      {
        src: '',
        linktype: '10',
        http: {},
      },
    ], //图片列表
  },
})
componentProperties.set('auxiliarysegmentation', {
  component: 'auxiliarysegmentation',
  text: '辅助分割',
  type: '1-11',
  active: true,
  style: 'auxiliarysegmentationstyle',
  setStyle: {
    text: '辅助分割',
    blankHeight: 30, //空白高度
    segmentationtype: 0, //分割类型
    paddType: 0, //边距
    auxliarColor: 'rgb(229, 229, 229)', //辅助线颜色
    bordertp: 'solid', //线的类型
  },
})
componentProperties.set('commoditysearch', {
  component: 'commoditysearch',
  text: '商品搜索',
  type: '1-1',
  active: true,
  style: 'commoditysearchstyle',
  setStyle: {
    text: '商品搜索',
    heights: 28, //搜索栏高度
    position: 0, //显示位置
    sweep: false, // 显示扫一扫
    borderRadius: 0, //框体样式
    textPosition: 0, //文本位置
    backgroundColor: 'rgb(249, 249, 249)', //背景颜色
    borderColor: 'rgb(255, 255, 255)', //框体颜色
    textColor: 'rgb(150, 151, 153)', //字体颜色
    hotords: [], //热词
  },
})
componentProperties.set('storeinformation', {
  component: 'storeinformation',
  text: '店铺信息',
  type: '1-12',
  active: true,
  style: 'storeinformationstyle',
  setStyle: {
    text: '店铺信息',
    bakcgroundImg: '', //背景图片
    headPortrait: '', //店铺头像
    rubiksCubeType: 0, //类型
    name: '店铺名称', //店铺名称
    Discount: '在线支付满150减30，满100减20', //优惠信息
  },
})
componentProperties.set('entertheshop', {
  component: 'entertheshop',
  text: '单元格',
  type: '1-13',
  active: true,
  style: 'entertheshopstyle',
  setStyle: {
    text: '单元格',
    icon: '', // 左侧图标
    shopName: '左侧标题',
    copywriting: '右侧内容',
    type: '10',
    http: {},
  },
})
componentProperties.set('notice', {
  component: 'notice',
  text: '公告',
  type: '1-7',
  active: true,
  style: 'noticestyle',
  setStyle: {
    text: '公告',
    noticeText: '请填写内容，如果过长，将会在手机上滚动显示', //内容
    backColor: 'rgb(255, 248, 233)', //背景颜色
    textColor: 'rgba(100, 101, 102)', //文字颜色
  },
})
componentProperties.set('videoss', {
  component: 'videoss',
  text: '视频',
  type: '1-8',
  active: true,
  style: 'videostyle',
  setStyle: {
    text: '视频',
    src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', // 视频地址
    coverUrl:null, // 封面地址
    autoplay: false, // 是否自动播放
  },
})

componentProperties.set('custommodule', {
  component: 'custommodule',
  text: '自定义模块',
  type: 'demo',
  active: true,
  style: 'custommodulestyle',
  setStyle: {
    text: '自定义模块',
    demo:'自定义内容',
    img:'https://img2.baidu.com/it/u=1905875968,4289754134&fm=26&fmt=auto&gp=0.jpg'
  },
})
componentProperties.set('communitypowder', {
  component: 'communitypowder',
  text: '社群涨粉',
  type: '1-14',
  active: true,
  style: 'communitypowderstyle',
  setStyle: {
    text: '社群涨粉',
    mainImg: '', //入口图片
    qrcodeImg: '', //二维码
    title: '标题', //标题
    describe: '辅助描述', //描述
    buttonName: '立即添加', //按钮名称
    backColor: 'rgb(255, 255, 255)', //背景颜色
  },
})
componentProperties.set('storenotecard', {
  component: 'storenotecard',
  text: '文章模块',
  type: '2-2',
  active: true,
  style: 'storenotecardstyle',
  setStyle: {
    text: '文章模块',
    name: '这里显示专题名称', //专题名称
    commodityType: 0, // 选择模板
    moditystyle: 0, // 卡片样式选择
    borderRadius: 0, // 图片边角
    textWeight: 400, // 标题粗细
    noteLabels: true, // 笔记标签
    readingNumber: true, // 阅读数
    praisePoints: true, //点赞数
    viewMore1: true, //更多1
    viewMore2: true, //更多2
    imageList: [],
    positions: 'bottom', //标题位置
    linktype: '10',
    http: {},
  },
})
componentProperties.set('crowdoperation', {
  component: 'crowdoperation',
  text: '人群运营',
  type: '1-17',
  active: true,
  style: 'crowdoperationstyle',
  setStyle: {
    text: '人群运营',
  },
})
componentProperties.set('personalizedrecommendation', {
  component: 'personalizedrecommendation',
  text: '个性化推荐',
  type: '1-18',
  active: true,
  style: 'personalizedrecommendationstyle',
  setStyle: {
    text: '个性化推荐',
  },
})
componentProperties.set('onlineservice', {
  component: 'onlineservice',
  text: '在线客服',
  type: '1-19',
  active: true,
  style: 'onlineservicestyle',
  setStyle: {
    text: '在线客服',
  },
})
componentProperties.set('investigate', {
  component: 'investigate',
  text: '表单模块',
  type: '2-3',
  active: true,
  style: 'investigatestyle',
  setStyle: {
    text: '表单模块',
    title: '表单模块',
    jsonData: [], //value1为sass显示内容，value2为前端显示内容
  },
})
componentProperties.set('tabBar', {
  component: 'tabBar',
  text: '底部导航',
  type: '1-5',
  active: true,
  style: 'tabBarStyle',
  setStyle: {
    text: '底部导航',
    activeColor: '#1989fa',
    inactiveColor: '#7d7e80',
    isShowBorder: true,
    iconWidth: '25',
    iconHeight: '25',
    fontSize: '14',
    Highlight: 0,
    iconList: [],
  },
})
componentProperties.set('follow', {
  component: 'follow',
  text: '关注公众号',
  type: '1-15',
  active: true,
  style: 'followStyle',
  setStyle: {
    text: '关注公众号',
    heade: 'https://imgs.starfirelink.com/miniShop//logo_1618466110849.png',
    followName: '公众号名称',
    followAppId: '',
  },
})
componentProperties.set('suspension', {
  component: 'suspension',
  text: '悬浮按钮',
  type: '1-16',
  active: true,
  style: 'suspensionstyle',
  setStyle: {
    text: '悬浮按钮',
    linktype: '10',
    http: {},
  },
})

export default componentProperties
