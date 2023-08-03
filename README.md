# AS-Editor

## 介绍

基于 vue2.x 可视化拖拽编辑，页面生成工具。提升前端开发效率，可集成至移动端项目作为通过定义 JSON 直接生成 UI 界面。

文档地址：[https://was666.gitee.io/as-editor-doc](https://was666.gitee.io/as-editor-doc)

在线体验：[http://was666.gitee.io/as-editor](http://was666.gitee.io/as-editor)

### 安装教程

1. npm install （安装 node_modules 模块）
2. npm run serve （运行）
3. npm run build （打包）
4. npm update (用于更新包到基于规范范围的最新版本)

> 注：在新版本的npm中，默认情况下，npm install遇到冲突的peerDependencies时将失败。
> 可使用：npm install --legacy-peer-deps

#### 使用说明

##### 使用教程

![步骤1](https://was666.gitee.io/as-editor-doc/assets/img/README1.632216e1.png 'image1.png')
![步骤2](https://was666.gitee.io/as-editor-doc/assets/img/README2.7459c50e.png 'image2.png')
![步骤3](https://was666.gitee.io/as-editor-doc/assets/img/README3.157d3f15.png 'image3.png')
![步骤4](https://was666.gitee.io/as-editor-doc/assets/img/README4.aa04245c.png 'image4.png')
![步骤5](https://was666.gitee.io/as-editor-doc/assets/img/README5.afb38460.png 'image5.png')
![步骤6](https://was666.gitee.io/as-editor-doc/assets/img/README6.a77d96b6.png 'image6.png')

##### 自定义组件可以看

```text
src / layout / home / index.vue                 // 编辑页面文件
src / components / sliderassembly / index.vue   // 左侧组件大全文件
src / components / componentscom                // 左侧组件目录
src / components / rightslider                  // 右侧组件目录
src / utils / componentProperties.js            // 组件数据
```

#### componentProperties（组件数据）字段注解

```js
{
  component: 'custommodule',    // 中间部分手机组件的name
  text: '自定义模块',            // 组件文字描述
  type: '1-14',                 // data-tpye
  active: true,                 // 是否选中
  style: 'custommodulestyle',   // 右边组件设置的name
  setStyle: {}                  // 组件动态数据
}
```

#### 官方生态

| 项目 | 描述 |
| --- | --- |
| [AS-Editor <br/> Vue2版](https://gitee.com/was666/as-editor) | 基于 Vue2 的 AS-Editor |
| [AS-Editor <br/> Vue3版](https://gitee.com/was666/as-editor/tree/vue3.x/) | 基于 Vue3 的 AS-Editor |
| [AS-Editor-H5](https://gitee.com/was666/as-editor-h5) | AS-Editor-H5 是移动端 Vue 模版，可以通过定义的 JSON 生成 Vue 页面 |

#### 感谢捐赠

| [![有育哥](https://was666.gitee.io/as-editor-doc/assets/img/donate1.png)](https://gitee.com/cfxp) | [![邓跃辉](https://was666.gitee.io/as-editor-doc/assets/img/donate3.png)](https://gitee.com/york8888_admin) | [![hackchen](https://was666.gitee.io/as-editor-doc/assets/img/donate2.png)](https://gitee.com/hackchen) | [![狼牙](https://was666.gitee.io/as-editor-doc/assets/img/langYa.png)](https://gitee.com/fdfgasdvdxz) | [![许中杰](https://was666.gitee.io/as-editor-doc/assets/img/xuzhongjie.png)](https://gitee.com/xu-zhongjie) |[![RainbowParadise](https://was666.gitee.io/as-editor-doc/assets/img/RainbowParadise.png)](https://gitee.com/mars728) |
| :-: | :-: | :-: | :-: | :-: | :-: |
| [有育哥](https://gitee.com/cfxp) | [邓跃辉](https://gitee.com/york8888_admin) |[hackchen](https://gitee.com/hackchen) | [狼牙](https://gitee.com/fdfgasdvdxz) | [许中杰](https://gitee.com/xu-zhongjie) |[RainbowParadise](https://gitee.com/mars728) |

#### 参与贡献

1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request

#### 结尾

##### 如果喜欢的话给个 star 一下哈

##### 如果有意见和问题 可以在 lssues 提出，我会在线解答
