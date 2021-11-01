<template>
  <div class="establishShop">
    <el-backtop :visibility-height="100" :bottom="60"></el-backtop>

    <!-- tab切换 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="页面管理" name="pageSetup">
        <!-- 店铺头部 -->
        <section class="shopHeader" v-if="homepageData">
          <!-- <img src="../../assets/images/backimg.png" alt=""> -->
          <!-- 文字内容 -->
          <div class="text">
            <!-- 标题 -->
            <p>
              <el-badge value="店铺主页" class="item" type="primary">
                <span class="title">{{ homepageData.name }}</span>
              </el-badge>
            </p>
            <!-- 创建时间 -->
            <p class="time">创建时间：{{ homepageData.createTime }}</p>
            <!-- 店铺操作 -->
            <p class="operation">
              <span @click="edit(homepageData.id)">编辑</span>
              <span @click="$refs.exten.showExtension(homepageData, 'isHome')"
                >推广</span
              >
              <span @click="copy(homepageData.id)">复制</span>
              <span @click="exportTemplate(homepageData.id, homepageData.name)"
                >导出配置</span
              >
            </p>
          </div>
        </section>

        <!-- 按钮和搜索 -->
        <section class="butAndSear">
          <div class="butAndSear-left">
            <!-- 按钮 -->
            <el-badge is-dot class="item">
              <el-button
                type="primary"
                size="small"
                @click="$refs.createtem.showExtension()"
                >新建页面</el-button
              >
            </el-badge>

            <!-- 按钮 -->
            <el-upload
              class="upload-demo-aa"
              :action="baseupload"
              with-credentials
              :show-file-list="false"
              accept=".yhxl"
              :on-success="uploadSuccess"
              :on-error="uploadError"
            >
              <el-button size="small" type="primary">导入配置</el-button>
            </el-upload>
          </div>

          <!-- 状态 -->
          <p class="state">
            状态：
            <span class="warning-row"></span>已上架
            <span class="success-row"></span>未上架
            <!-- <span class="success-row"></span>未上架 -->
          </p>

          <!-- 右边 -->
          <div>
            <el-select
              v-model="status"
              placeholder="请选择"
              size="small"
              @change="statusList"
            >
              <el-option
                v-for="item in options"
                :key="item.type"
                :label="item.text"
                :value="item.type"
              >
              </el-option>
            </el-select>
          </div>
        </section>

        <!-- 创建页面历史列表 -->
        <section class="pagelist">
          <el-table
            v-loading="loading"
            :data="tableData"
            size="small"
            style="width: 100%"
            :default-sort="{ prop: 'updateTime', order: 'descending' }"
          >
            <!-- 详情 -->
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" class="demo-table-expand">
                  <el-form-item label="id">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="模板人id">
                    <span>{{ props.row.userAdminId }}</span>
                  </el-form-item>
                  <el-form-item label="页面状态">
                    <!-- <span :class=" props.row.status === 1 ?  'warning-row' : 'success-row'">{{ props.row.stativtext }}</span> -->
                    <span>{{ props.row.stativtext }}</span>
                  </el-form-item>
                  <el-form-item label="是否为模板">
                    <!-- <span :class=" props.row.status === 1 ?  'warning-row' : 'success-row'">{{ props.row.stativtext }}</span> -->
                    <span>{{ props.row.defaultT }}</span>
                  </el-form-item>
                  <el-form-item label="名称">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <!-- <el-form-item label="详情">
                    <span>{{ props.row.details }}</span>
                  </el-form-item> -->
                  <el-form-item label="创建时间">
                    <span>{{ props.row.createTime }}</span>
                  </el-form-item>
                  <el-form-item label="修改时间">
                    <span>{{ props.row.updateTime }}</span>
                  </el-form-item>
                  <el-form-item label="备注">
                    <span>{{ props.row.remark }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>

            <!-- 序号 -->
            <el-table-column type="index" fixed="left" />

            <!-- id -->
            <el-table-column prop="id" width="100" label="id" sortable />

            <!-- 名称 -->
            <el-table-column prop="name" min-width="100" label="名称" />

            <!-- 页面状态 -->
            <el-table-column prop="stativtext" min-width="100" label="页面状态">
              <template slot-scope="scope">
                <!-- <span :class=""></span> -->
                <span
                  :class="scope.row.status === 1 ? 'warning-row-font' : ''"
                  >{{ scope.row.stativtext }}</span
                >
              </template>
            </el-table-column>

            <!-- 是否为系统模板  -->
            <el-table-column
              v-if="$hasPermission('cdst')"
              prop="stativtext"
              min-width="100"
              label="是否为系统模板"
            >
              <template slot-scope="scope">
                <span
                  :class="scope.row.defaultT === 1 ? 'warning-row-font' : ''"
                  >{{ scope.row.defaultT | fmtDefaultT }}</span
                >
              </template>
            </el-table-column>
            <!-- 详情 -->
            <!-- <el-table-column prop="details" min-width="130" label="详情" /> -->

            <!-- 创建时间 -->
            <el-table-column
              min-width="100"
              sortable
              prop="createTime"
              label="创建时间"
            >
            </el-table-column>

            <!-- 修改时间 -->
            <el-table-column
              min-width="100"
              sortable
              prop="updateTime"
              label="修改时间"
            >
            </el-table-column>

            <!-- 操作 -->
            <el-table-column fixed="right" label="操作" width="400">
              <template slot="header">
                <input
                  v-model="searchs"
                  class="head-search"
                  type="text"
                  placeholder="请输入需要搜索的页面名称"
                  @keydown.enter="inputName(searchs)"
                />
                <i
                  slot="prefix"
                  class="el-input__icon el-icon-search search-icon"
                ></i>
                <el-button
                  type="primary"
                  size="small"
                  class="search-btn"
                  @click="inputName(searchs)"
                  >搜索</el-button
                >
              </template>
              <template slot-scope="scope">
                <!-- 编辑 -->
                <el-button
                  style="padding: 0 5px; border-right: 1px solid #e5e5e5"
                  type="text"
                  size="small"
                  @click="edit(scope.row.id)"
                  >编辑</el-button
                >

                <!-- 删除 -->
                <el-popconfirm
                  title="您确定要删除该组件吗?"
                  iconColor="red"
                  @confirm="deletePage(scope.row.id)"
                >
                  <el-button
                    style="padding: 0 5px; border-right: 1px solid #e5e5e5"
                    slot="reference"
                    type="text"
                    size="small"
                    >删除</el-button
                  >
                </el-popconfirm>

                <!-- 设为主页 -->
                <el-button
                  style="padding: 0 5px; border-right: 1px solid #e5e5e5"
                  v-if="scope.row.status !== 0 && scope.row.type !== 1"
                  type="text"
                  size="small"
                  @click="setHomePage(scope.row.id)"
                  >设为主页</el-button
                >
                <template v-if="$hasPermission('cdst')">
                  <el-button
                    style="padding: 0 5px; border-right: 1px solid #e5e5e5"
                    v-if="scope.row.defaultT == 0"
                    type="text"
                    size="small"
                    @click="setDefaultTemplate(scope.row.id, 1)"
                    >设置为模板</el-button
                  >
                  <el-button
                    style="padding: 0 5px; border-right: 1px solid #e5e5e5"
                    v-if="scope.row.defaultT == 1"
                    type="text"
                    size="small"
                    @click="setDefaultTemplate(scope.row.id, 0)"
                    >取消系统模板</el-button
                  >
                </template>

                <!-- 推广 -->
                <el-button
                  style="padding: 0 5px; margin: 0"
                  type="text"
                  size="small"
                  @click="$refs.exten.showExtension(scope.row)"
                  >分享</el-button
                >
                <!--复制-->
                <el-popconfirm
                  title="您确定要复制该组件吗?"
                  iconColor="red"
                  @confirm="copy(scope.row.id)"
                >
                  <el-button
                    style="padding: 0 5px; border-right: 1px solid #e5e5e5"
                    slot="reference"
                    type="text"
                    size="small"
                    >复制</el-button
                  >
                </el-popconfirm>
                <!--导出配置-->
                <el-popconfirm
                  title="您确定要导出该组件配置吗?"
                  iconColor="red"
                  @confirm="exportTemplate(scope.row.id, scope.row.name)"
                >
                  <el-button
                    style="padding: 0 5px; border-right: 1px solid #e5e5e5"
                    slot="reference"
                    type="text"
                    size="small"
                    >导出配置</el-button
                  >
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            style="text-align: center; margin: 40px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 40, 80, 100, 130, 160, 200]"
            :page-size="pageNumber"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </section>
      </el-tab-pane>

      <el-tab-pane label="开屏广告" name="screen">
        <screen/>
      </el-tab-pane>
      <!-- <el-tab-pane label="xxx" name="third">xxx</el-tab-pane> -->
    </el-tabs>

    <!-- 推广弹框 -->
    <extension ref="exten" />

    <!-- 创建模板 -->
    <createTemplate ref="createtem" />
  </div>
</template>

<script>
import extension from 'components/extension'
import createTemplate from 'components/createTemplate'
import screen from '../../layout/screen'

export default {
  inject: ['reload'],
  name: 'establishShop',
  data() {
    return {
      activeName: 'pageSetup', //默认第一个tab
      searchs: '', //搜索内容
      tableData: [] /* 列表数据 */,
      total: null, //总页数
      currentPage: 1, //当前页数
      pageNumber: 20, //每页多少条
      loading: false, //局部加载
      status: '', //状态
      options: [
        //选择
        {
          text: '全部',
          type: '',
        },
        {
          text: '未上架',
          type: '0',
        },
        {
          text: '已上架',
          type: '1',
        },
      ],
      homepageData: null, //主页内容
    }
  },
  components: { extension, createTemplate,screen },
  created() {
    this.getList(1, this.pageNumber, this.searchs, this.status)
  },
  methods: {
    /* 获取列表接口 */
    getList(page, limit, name, status) {
      /* const loadingss = this.$loading({
        lock: true,
        text: '加载数据中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      }); */
      this.loading = true

      this.$httpApi
        .listData({ page, limit, name, status })
        .then((res) => {
          /* 取消加载 */

          

          this.total = res.count - 1

          for (const [index, item] of res.data.entries()) {
            item.createTime = this.formatDate(item.createTime)
            item.updateTime = this.formatDate(item.updateTime)
            if (item.type === 1) {
              /* item.stativtext = '主页' */
              this.homepageData = item
              delete res.data[index]
            } else if (item.status === 0) item.stativtext = '未上架'
            else if (item.status === 1) item.stativtext = '已上架'
          }
          this.tableData = res.data
        })
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },

    /* tab切换 */
    handleClick(tab, event) {
      console.log(tab, event)
    },

    /* 时间戳转换 */
    formatDate: (value) => {
      let date = new Date(value)
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? '0' + MM : MM
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      let h = date.getHours()
      h = h < 10 ? '0' + h : h
      let m = date.getMinutes()
      m = m < 10 ? '0' + m : m
      let s = date.getSeconds()
      s = s < 10 ? '0' + s : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    },

    /* 当前列表状态 */
    // 弃用  改为单个状态颜色改变
    // tableRowClassName({row}) {
    //   if(row.type === 1) return 'warning-row'
    //   if(row.status === 0) return 'success-row'
    //   if(row.status === 1) return 'warning-row'
    // },

    /* 选择每一页条数 */
    handleSizeChange(val) {
      this.pageNumber = val
      this.getList(this.currentPage, val, this.searchs, this.status)
      window.scroll(0, 0)
    },

    /* 选择第几页 */
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList(val, this.pageNumber, this.searchs, this.status)
      window.scroll(0, 0)
    },

    /* 编辑按钮 */
    edit(id) {
      this.$router.push({ path: 'home', query: { id } })
    },

    /* 设为主页按钮 */
    setHomePage(id) {
      this.$httpApi.homePage({ id }).then(() => {
        
        /* 成功弹框 */
        this.$message({
          message: '设置为主页成功',
          type: 'success',
        })
        this.currentPage = 1
        this.getList(1, this.pageNumber, this.searchs, this.status)
      })
    },
    /* 设置为模板 */
    setDefaultTemplate(id, type) {
      this.$httpApi.saveDefaultTemplate({ id, type }).then(() => {
        
        /* 成功弹框 */
        this.$message({
          message: '设置为模板成功',
          type: 'success',
        })
        this.currentPage = 1
        this.getList(1, this.pageNumber, this.searchs, this.status)
        this.$refs.createtem.loadDefaultTemplate()
      })
    },

    /* 删除选项 */
    deletePage(id) {
      console.log(id, '------------deletePage')
      const loadingss = this.$loading({
        lock: true,
        text: '删除中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      this.$httpApi.delete({ id }).then(() => {
        /* 取消加载 */
        loadingss.close()

        

        /* 成功弹框 */
        this.$message({
          message: '删除成功',
          type: 'success',
        })

        /* 刷新列表 */
        this.getList(
          this.currentPage,
          this.pageNumber,
          this.searchs,
          this.status
        )
      })
    },

    /* 搜索名称 */
    inputName(res) {
      console.log(res, '---------res')
      this.searchs = res
      this.getList(this.currentPage, this.pageNumber, this.searchs, this.status)
    },

    /* 选择状态 */
    statusList() {
      this.getList(this.currentPage, this.pageNumber, this.searchs, this.status)
    },

    // 更多按钮
    dropDownButton(res) {
      console.log(res)
    },
    //复制
    copy(id) {
      const loadingss = this.$loading({
        lock: true,
        text: '复制中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      this.$httpApi.copy({ id }).then(() => {
        /* 取消加载 */
        loadingss.close()

        

        /* 成功弹框 */
        this.$message({
          message: '复制成功',
          type: 'success',
        })

        /* 刷新列表 */
        this.getList(
          this.currentPage,
          this.pageNumber,
          this.searchs,
          this.status
        )
      })
    },
    //导出配置
    exportTemplate(id, name) {
      const loadingss = this.$loading({
        lock: true,
        text: '导出配置中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      this.$httpApi.exportTemplate({ shopTemplateId: id }).then((res) => {
        /* 取消加载 */
        loadingss.close()
        

        let data = res.data.exportData
        let fileName = name + '.yhxl'

        var urlObject = window.URL || window.webkitURL || window
        var export_blob = new Blob([data])
        var save_link = document.createElementNS(
          'http://www.w3.org/1999/xhtml',
          'a'
        )
        save_link.href = urlObject.createObjectURL(export_blob)
        save_link.download = fileName
        var obj = save_link
        var ev = document.createEvent('MouseEvents')
        ev.initMouseEvent(
          'click',
          true,
          false,
          window,
          0,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null
        )
        obj.dispatchEvent(ev)

        /* 成功弹框 */
        this.$message({
          message: '导出配置成功',
          type: 'success',
        })
      })
    },

    //导入配置
    importTemplate(id) {
      const loadingss = this.$loading({
        lock: true,
        text: '导入配置中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      this.$httpApi.importTemplate({ id }).then(() => {
        /* 取消加载 */
        loadingss.close()

        

        /* 成功弹框 */
        this.$message({
          message: '导入配置中成功',
          type: 'success',
        })

        /* 刷新列表 */
        this.getList(
          this.currentPage,
          this.pageNumber,
          this.searchs,
          this.status
        )
      })
    },
    uploadSuccess(response) {
      if (!response.success) {
        return this.$message.error(response.msg)
      }

      this.$message({
        message: '导入配置成功',
        type: 'success',
      })

      /* 刷新列表 */
      this.getList(this.currentPage, this.pageNumber, this.searchs, this.status)

      // 刷新页面
      this.reload()
    },

    uploadError(err, file, fileList) {
      console.log('------uploadError----------')
      console.log(err)
      console.log(file)
      console.log(fileList)
    }
  },

  computed: {
    // baseurl
    baseupload() {
      return `${window.global_config.BASE_URL}adm/shopTemplate/import`
    },
  },
  filters: {
    fmtDefaultT: function (defaultT) {
      let json = {
        0: '不是',
        1: '是',
      }
      return json[defaultT] || defaultT
    },
  },
}
</script>

<style lang="less" scoped>
.establishShop {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;

  /* tab */
  // /deep/.el-tabs__nav-wrap .is-top {
  //   padding: 0 20px;
  // }

  .el-dropdown-link {
    cursor: pointer;
    font-size: 12px;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 11px;
  }

  /* 店铺头部 */
  .shopHeader {
    width: 100%;
    min-height: 75px;
    padding: 10px;
    box-sizing: border-box;
    background: #f4f4f4;
    display: flex;

    img {
      width: 39px;
      height: 39px;
      margin-top: 5px;
      margin-right: 12px;
    }

    /* 文字内容 */
    .text {
      display: flex;
      flex-direction: column;
      /* 标题 */
      /deep/.el-badge {
        .title {
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }
        /deep/.el-badge__content.is-fixed {
          right: -5px;
          top: 10px;
        }
      }
      /* 创建时间 */
      .time {
        font-size: 12px;
        color: #999;
      }
      /* 店铺操作 */
      .operation {
        span {
          color: #38f;
          padding: 0 5px;
          font-size: 12px;
          cursor: pointer;
          &:first-of-type {
            border-right: 1px solid #e5e5e5;
            padding-left: 0;
          }
        }
      }
    }
  }

  /* 按钮和搜索 */
  .butAndSear {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
    .butAndSear-left {
      width: 200px;
      display: flex;
      justify-content: space-between;
    }
  }
  .table-fixed {
    /deep/ .el-table__fixed-right {
      height: 100% !important; //设置高优先，以覆盖内联样式
    }
  }
  /* 创建页面历史列表 */
  .pagelist {
    /deep/.el-table {
      min-height: 400px;
    }
    /deep/.cell {
      text-align: left;
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      position: relative;
      .head-search {
        width: 100%;
        height: 28px;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        padding-left: 30px;
        font-size: 12px;
        color: #909399;
        line-height: 26px;
      }
      .head-search::placeholder {
        color: #909399;
      }
      .search-icon {
        position: absolute;
        top: 0;
        left: 10px;
        line-height: 28px;
      }
      .search-btn {
        position: absolute;
        top: 0;
        right: 10px;
        font-size: 14px;
        color: #ffffff;
        line-height: 28px;
        padding: 0 5px;
        border-radius: 0 4px 4px 0;
      }
    }
  }

  /* 状态 */
  .state {
    display: flex;
    align-items: center;
    font-size: 12px;
    span {
      display: inline-block;
      width: 8px;
      border: 1px solid #e4dfdf;
      height: 8px;
      margin: 0 15px;
      border-radius: 50%;
    }
  }

  /deep/.demo-table-expand {
    font-size: 0;
  }
  /deep/.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  /deep/.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  /deep/.zhuye-row {
    background: #add6ff;
  }

  /deep/.warning-row {
    // background: #cff4bc;
    background: #67c23a;
  }

  /deep/.warning-row-font {
    background-color: #67c23a;
    padding: 2px 7px;
    border-radius: 3px;
    font-size: 12px;
    color: #fff;
  }

  /deep/.success-row {
    /* background: #f8ac88; */
    background: #fff;
  }
}
</style>
