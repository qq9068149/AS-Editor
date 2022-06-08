# AS-Editor

## Introduce

Vue based visual drag-and-drop editing, page generation tools. To improve front-end development efficiency, it can be integrated into mobile terminal projects as a UI interface generated directly by defining JSON.

The document address：[https://was666.gitee.io/as-editor-doc](https://was666.gitee.io/as-editor-doc)

Online experience：[http://was666.gitee.io/as-editor](http://was666.gitee.io/as-editor)

### Install the tutorial

1. npm install （Install node_modules）
2. npm run serve （run）
3. npm run build （build）
4. npm update (Used to update packages)

#### Directions for use

##### Using the tutorial

![步骤1](https://was666.gitee.io/as-editor-doc/assets/img/README1.632216e1.png 'image1.png')
![步骤2](https://was666.gitee.io/as-editor-doc/assets/img/README2.7459c50e.png 'image2.png')
![步骤3](https://was666.gitee.io/as-editor-doc/assets/img/README3.157d3f15.png 'image3.png')
![步骤4](https://was666.gitee.io/as-editor-doc/assets/img/README4.aa04245c.png 'image4.png')
![步骤5](https://was666.gitee.io/as-editor-doc/assets/img/README5.afb38460.png 'image5.png')
![步骤6](https://was666.gitee.io/as-editor-doc/assets/img/README6.a77d96b6.png 'image6.png')

##### Custom Components

```text
src / layout / home / index.vue                 // Edit page file
src / components / sliderassembly / index.vue   // Left component Daqo file
src / components / componentscom                // Left Component directory
src / components / rightslider                  // Component Directory on the Right
src / utils / componentProperties.js            // The component data
```

#### ComponentProperties（The component data）Field notes

```js
{
  component: 'custommodule',    // The name of the phone component in the middle
  text: 'Custom modules',       // Component text description
  type: '1-14',                 // data-tpye
  active: true,                 // If the selected
  style: 'custommodulestyle',   // Name set for the component on the right
  setStyle: {}                  // Component dynamic data
}
```

#### The official ecological

| Project | Describe |
| --- | --- |
| [AS-Editor <br/> Vue2 version](https://github.com/qq9068149/AS-Editor) | As-editor based on Vue2 |
| [AS-Editor <br/> Vue3 version](https://github.com/qq9068149/AS-Editor/tree/vue3.x) | Vue3 based as-Editor |
| [AS-Editor-H5](https://github.com/qq9068149/AS-Editor-H5) | As-editor-h5 is a mobile Vue template that generates Vue pages from defined JSON |

#### Participate in the contribution

1. The Fork in this warehouse
2. New Feat_ XXX branch
3. Submit code
4. New Pull Request

#### At the end

##### Give a star if you like

##### So if we have comments and questions we can bring up at LsSues, I'll answer them online
