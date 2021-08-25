<template>
  <div class="commoditysearchstyle">
    <!-- 标题 -->
    <h2>{{ datas.text }}</h2>

    <p style="color: #323233; font-size: 14px">搜索热词</p>
    <p style="font-size: 12px; color: #969799; margin-top: 10px">
      鼠标拖拽调整热词顺序，搜索框默认展示第一个热词，其他搜索词将以标签形式显示在搜索页中
    </p>

    <!-- 表单 -->
    <el-form label-width="80px" :model="datas" size="small">
      <div v-if="datas.hotords[0]">
        <vuedraggable v-model="datas.hotords" v-bind="dragOptions">
          <transition-group>
            <section
              class="imgList"
              v-for="(item, index) in datas.hotords"
              :key="item + index"
            >
              <i class="el-icon-circle-close" @click="deleteHotords(index)" />
              <!-- 标题和链接 -->
              <div class="imgText">
                <el-input v-model="item.text" placeholder="请输入热词" />
              </div>
            </section>
          </transition-group>
        </vuedraggable>
      </div>

      <!-- 添加热词 -->
      <el-button @click="addHotords" class="uploadImg" type="primary" plain
        ><i class="el-icon-plus" />点击添加热词</el-button
      >

      <div style="height: 20px" />

      <!-- 显示位置 -->
      <el-form-item class="lef" label="显示位置">
        <div class="weiz">
          <span>{{
            datas.position === 0 ? '正常模式' : '滚动至顶部固定'
          }}</span>
          <div>
            <el-tooltip
              effect="dark"
              :content="index - 1 === 0 ? '正常模式' : '滚动至顶部固定'"
              placement="bottom"
              v-for="index in 2"
              :key="index"
            >
              <i
                class="iconfont"
                :class="[
                  index - 1 === 0 ? 'icon-wangye1' : 'icon-zhiding',
                  datas.position === index - 1 ? 'active' : '',
                ]"
                @click="datas.position = index - 1"
              />
            </el-tooltip>
          </div>
        </div>
      </el-form-item>

      <div style="height: 10px" />

      <!-- 框体样式 -->
      <el-form-item class="lef" label="框体样式">
        <div class="weiz">
          <span>{{ datas.borderRadius === 0 ? '方形' : '圆形' }}</span>
          <div>
            <el-tooltip
              effect="dark"
              :content="index - 1 === 0 ? '方形' : '圆形'"
              placement="bottom"
              v-for="index in 2"
              :key="index"
            >
              <i
                class="iconfont"
                :class="[
                  index - 1 === 0 ? 'icon-sousuokuang1' : 'icon-sousuokuang',
                  datas.borderRadius === index - 1 ? 'active' : '',
                ]"
                @click="datas.borderRadius = index - 1"
              />
            </el-tooltip>
          </div>
        </div>
      </el-form-item>

      <div style="height: 10px" />

      <!-- 文本位置 -->
      <el-form-item class="lef" label="文本位置">
        <div class="weiz">
          <span>{{ datas.textPosition === 0 ? '居左' : '居中' }}</span>
          <div>
            <el-tooltip
              effect="dark"
              :content="index - 1 === 0 ? '居左' : '居中'"
              placement="bottom"
              v-for="index in 2"
              :key="index"
            >
              <i
                class="iconfont"
                :class="[
                  index - 1 === 0 ? 'icon-horizontal-left' : 'icon-juzhong',
                  datas.textPosition === index - 1 ? 'active' : '',
                ]"
                @click="datas.textPosition = index - 1"
              />
            </el-tooltip>
          </div>
        </div>
      </el-form-item>

      <!-- 扫一扫 -->
      <el-form-item class="lef" label="扫一扫">
        {{ datas.sweep ? '显示' : '隐藏' }}
        <el-checkbox style="margin-left: 196px" v-model="datas.sweep" />
      </el-form-item>

      <div style="height: 10px" />

      <!-- 框体高度 -->
      <el-form-item label="框体高度" class="lef borrediu">
        <el-slider
          v-model="datas.heights"
          :max="50"
          :min="28"
          input-size="mini"
          show-input
        >
        </el-slider>
      </el-form-item>

      <div style="height: 10px" />

      <!-- 背景颜色 -->
      <el-form-item class="lef" label="背景颜色">
        <!-- 颜色选择器 -->
        <el-color-picker
          v-model="datas.backgroundColor"
          show-alpha
          class="picke"
          :predefine="predefineColors"
        >
        </el-color-picker>
      </el-form-item>

      <div style="height: 10px" />

      <!-- 框体颜色 -->
      <el-form-item class="lef" label="框体颜色">
        <!-- 颜色选择器 -->
        <el-color-picker
          v-model="datas.borderColor"
          show-alpha
          class="picke"
          :predefine="predefineColors"
        >
        </el-color-picker>
      </el-form-item>

      <div style="height: 10px" />

      <!-- 文本颜色 -->
      <el-form-item class="lef" label="文本颜色">
        <!-- 颜色选择器 -->
        <el-color-picker
          v-model="datas.textColor"
          show-alpha
          class="picke"
          :predefine="predefineColors"
        >
        </el-color-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import vuedraggable from 'vuedraggable' //拖拽组件

export default {
  name: 'commoditysearchstyle',
  props: {
    datas: Object,
  },
  components: { vuedraggable },
  data() {
    return {
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
      dragOptions: {
        //拖拽配置
        animation: 200,
      },
    }
  },
  methods: {
    /* 添加热词 */
    addHotords() {
      this.datas.hotords.push({
        text: '',
      })
    },
    /* 删除热词 */
    deleteHotords(index) {
      this.datas.hotords.splice(index, 1)
    },
  },
}
</script>

<style scoped lang="less">
.commoditysearchstyle {
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

  /* 上传图片按钮 */
  .uploadImg {
    width: 345px;
    height: 40px;
    margin-top: 10px;
  }

  /* 热词列表 */
  .imgList {
    padding: 6px 12px;
    margin: 16px 7px;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 0 4px 0 rgba(10, 42, 97, 0.2);
    display: flex;
    position: relative;

    /* 删除图标 */
    .el-icon-circle-close {
      position: absolute;
      right: -10px;
      top: -10px;
      cursor: pointer;
      font-size: 19px;
    }

    /* 热词文字 */
    .imgText {
      width: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      justify-content: space-between;
    }
  }

  /* 图片样式 */
  .weiz {
    display: flex;
    justify-content: space-between;
    i {
      padding: 5px 14px;
      margin-left: 10px;
      border-radius: 0;
      border: 1px solid #ebedf0;
      font-size: 20px;
      font-weight: 500;
      cursor: pointer;

      &:last-child {
        font-size: 22px;
      }

      &.active {
        color: #155bd4;
        border: 1px solid #155bd4;
        background: #e0edff;
      }
    }
  }

  .lef {
    /deep/.el-form-item__label {
      text-align: left;
    }
  }

  /* 颜色选择器 */
  .picke {
    float: right;
  }
}
</style>
