# AS-Editor

#### 介绍
基于vue可视化拖拽编辑，页面生成工具。提升前端开发效率，可集成至移动端项目作为通过定义 JSON 直接生成 UI 界面。


#### 安装教程

1.  npm install    （安装node_modules模块）
2.  yarn upgrade   (用于更新包到基于规范范围的最新版本)
3.  npm run serve  （运行） 
4.  npm run build  （打包）

#### 使用说明

> 自定义组件可以看 
  src\layout\home\index.vue               （页面）
  src\components\sliderassembly\index.vue （左侧组件大全）
  src\utils\componentProperties.js        （组件数据）

#### componentProperties（组件数据）字段注解

```json
{
  component: 'custommodule', //中间部分手机组件的name
  text: '自定义模块',
  type: '1-14', // data-tpye
  active: true, // 是否选中
  style: 'custommodulestyle', //右边组件设置的name
  setStyle: {} // 组件动态数据
}
```

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
