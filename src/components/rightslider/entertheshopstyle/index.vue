<template>
  <div class="entertheshopstyle">
    <!-- 标题 -->
    <h2>{{ datas.text }}</h2>

    <!-- 表单 -->
    <el-form
      label-position="top"
      label-width="80px"
      :model="datas"
      :rules="rules"
      size="small"
    >
      <el-form-item
        label="店铺名称"
        :hide-required-asterisk="true"
        prop="shopName"
      >
        <el-input
          v-model="datas.shopName"
          placeholder="请输入店铺名称"
          maxlength="10"
          show-word-limit
        />
      </el-form-item>

      <!-- 文案 -->
      <el-form-item
        label="文案"
        :hide-required-asterisk="true"
        prop="copywriting"
      >
        <el-input
          v-model="datas.copywriting"
          placeholder="请输入文案"
          maxlength="8"
          show-word-limit
        />
      </el-form-item>

      <!-- 跳转页面 -->
      <el-form-item label="跳转页面">
        <div class="imgText">
          <el-select
            style="width: 60%"
            v-model="datas.type"
            placeholder="请选择跳转类型"
            size="mini"
            @change="selectType(index)"
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
            style="width: 100%"
            v-model="datas.http.name"
            v-if="datas.type !== '11'"
            placeholder="请选择图片跳转链接"
            size="mini"
            @change="changeId"
            :no-data-text="emptyText"
            @visible-change="
              (isVisible) => {
                return changeType(isVisible, datas.type)
              }
            "
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="[index, item]"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>

          <!-- 输入外部链接 -->
          <el-input
            style="width: 100%"
            v-if="datas.type === '11'"
            size="mini"
            placeholder="请输入链接，输入前确保可以访问"
            v-model="datas.http.externalLink"
          >
          </el-input>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'entertheshopstyle',
  props: {
    datas: Object,
  },
  data() {
    return {
      rules: {
        //校验表单输入
        shopName: [
          //页面名称
          { required: true, message: '请输入店铺名称', trigger: 'blur' },
        ],
        copywriting: [
          //页面描述
          { required: true, message: '请输入文案', trigger: 'blur' },
        ],
      },
      optionsType: [
        // {
        //   type: '1',
        //   name: '视频'
        // },
        // {
        //   type: '2',
        //   name: '音频'
        // },
        // {
        //   type: '6',
        //   name: '直播'
        // },
        {
          type: '10',
          name: '跳转至历史页面',
        },
        {
          type: '11',
          name: '外部链接',
        },
      ], // 选择跳转类型
      options: [], //后端返回的列表提供下拉选择
      emptyText: '',
    }
  },
  methods: {
    // 选择类型
    changeType(isVisible, linkType) {
      if (isVisible && linkType) {
        this.emptyText = '正在搜索中'
        if (
          linkType === '1' ||
          linkType === '2' ||
          linkType === '6' ||
          linkType === '3'
        ) {
          /* 获取视频,音频,直播信息 */
          this.$httpApi.newsList({ type: linkType }).then((res) => {
            this.activ = 0
            
            res.data.length === 0 ? (this.emptyText = '暂无数据') : null
            this.options = res.data

            // 校验数据
            this.options = this.$utils.filterCommodityData(
              linkType,
              this.options
            )
          })
        } else if (linkType === '10') {
          // 历史页面
          this.$httpApi.shopTemplate().then((res) => {
            
            this.options = res.data.shopTemplateList

            // 校验数据
            this.options = this.$utils.filterCommodityData(
              linkType,
              this.options
            )
          })
        }
      }
    },
    // 保存跳转的地方
    changeId(res) {
      console.log(res)
      if (res.component) delete res.component
      this.datas.http = res
    },
  },
}
</script>

<style scoped lang="less">
.entertheshopstyle {
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
  /* 图片字 */
  .imgText {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    .fir-sele.el-select {
      width: 40%;
    }
  }
}
</style>
