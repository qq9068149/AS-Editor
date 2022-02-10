<template>
  <div class="richtextstyle">
    <!-- 标题 -->
    <h2>{{ datas.text }}</h2>

    <el-form label-width="80px" :model="datas" size="small">
      <!-- 背景颜色 -->
      <el-form-item label="背景颜色">
        <!-- 背景颜色 -->
        <el-color-picker
          v-model="datas.backColor"
          show-alpha
          style="float: right"
          class="picke"
          :predefine="predefineColors"
        >
        </el-color-picker>
      </el-form-item>
    </el-form>

    <div class="edit">
      <editor v-model="datas.myValue" :init="init" />
    </div>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/skins/ui/oxide/skin.min.css'
import 'tinymce/plugins/image'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/code'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/link'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/print'
import 'tinymce/plugins/save'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/table'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/toc'
import 'tinymce/plugins/charmap'

export default {
  name: 'richtextstyle',
  props: {
    datas: Object,
  },
  components: {
    Editor,
  },
  data() {
    return {
      init: {
        height: 550,
        language_url: '/langs/zh_CN.js',
        language: 'zh_CN',
        plugins: [
          'charmap',
          'toc',
          'wordcount',
          'table',
          'searchreplace',
          'image',
          'link',
          'lists',
          'advlist',
          'anchor',
          'autosave',
          'code',
          'paste',
          'directionality',
          'fullscreen',
          'hr',
          'insertdatetime',
          'pagebreak',
          'preview',
          'print',
          'save',
        ],
        image_advtab: true,
        toolbar: [
          `fullscreen code bold italic underline strikethrough alignleft aligncenter alignright alignjustify 
          outdent indent image link removeformat cut copy paste ltr rtl anchor restoredraft pagebreak save 
          table tabledelete tableprops tablerowprops tablecellprops tableinsertrowbefore tableinsertrowafter tabledeleterow tableinsertcolbefore tableinsertcolafter tabledeletecol 
          backcolor formatselect fontselect fontsizeselect forecolor 
          subscript superscript hr preview print searchreplace wordcount toc charmap bullist numlist insertdatetime undo redo`,
        ],
        theme: 'silver', //主题
        menubar: false,
        images_upload_handler: (blobInfo, succFun, failFun) => {
          var formData = new FormData()

          formData.append('path', 'test/')
          formData.append('file', blobInfo.blob(), blobInfo.blob().name)

          var xhr = new XMLHttpRequest()
          xhr.withCredentials = false
          xhr.open('POST', `${window.global_config.BASE_URL}upload/miniShop`)

          xhr.onload = function () {
            // 获取数据
            var res = JSON.parse(xhr.response)
            if (res.success != true) return failFun('HTTP Error: ' + res.msg)
            succFun(res.data.src)
          }
          xhr.send(formData)
        },
      },
      predefineColors: [
        // 颜色选择器预设
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        '#409EFF',
        '#909399',
        '#C0C4CC',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577',
      ],
    }
  },
}
</script>

<style scoped lang="less">
.richtextstyle {
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
}

/* 修改富文本样式 */
:deep(.tox) {
  border: 1px solid #ebedf0 !important;
  .tox-tbtn {
    height: 25px !important;
    margin: 0 2px !important;
    width: auto;
    font-size: 13px;
  }
  .tox-tbtn--bespoke .tox-tbtn__select-label {
    width: auto !important;
  }
  .tox-toolbar__group {
    background: #f7f8fa;
  }
}

:deep(.tox) .tox-toolbar,
.tox .tox-toolbar__primary,
.tox .tox-toolbar__overflow {
  background: none !important;
}

:deep(.tox) .tox-tbtn--enabled,
.tox .tox-tbtn--enabled:hover {
  background: none !important;
  :deep(svg) {
    fill: #155bd4 !important;
  }
}
</style>
