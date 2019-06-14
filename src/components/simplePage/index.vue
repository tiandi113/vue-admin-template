// 简单页面组件 componets/simplePage/index
<template>
  <div class="app-container">
    <el-row>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="showDialog('增加',1)">增加</el-button>
    </el-row>
    <el-dialog
      :visible.sync="visible"
      :title="title"
      :before-close="CloseDialog"
      :close-on-click-modal="false"
    >
      <form-create ref="fc" v-model="fApi" :rule="rules" :option="formoptions" />
    </el-dialog>
    <datagrid
      :columns="columns"
      :data-source="tabledata"
      :options="tableoptions"
      :fetch="fetchTableData"
      :pagination="pagination"
      @row-click="rowclick"
      @selection-change="selectionchange"
    />
  </div>
</template>
<script>
import datagrid from '../datagrid/index'
import axios from 'axios'

export default {
  name: 'SimplePage',
  components: {
    datagrid
  },
  props: {
    rules: {
      type: Array,
      required: true
    },
    columns: {// 列元素
      type: Array,
      required: true
    },
    pagination: {// 分页
      type: Object,
      default() {
        return {
          total: 0,
          pageIndex: 1,
          pageSize: 10
        }
      }
    },
    tableoptions: {// 表格参数控制 maxHeight、stripe 等等...
      type: Object,
      required: true,
      default() {
        return {
          mutiSelect: false,
          index: true, // 显示序号， 多选则 mutiSelect
          loading: false, // 表格动画
          initTable: true, // 是否一挂载就加载数据
          showsummary: false // 显示合计列
        }
      }
    },
    rowclick: {// 选择函数
      type: Function,
      required: true
    },
    selectionchange: {// 行点击函数
      type: Function,
      required: true
    },
    searchUrl: {
      type: String,
      required: true
    },
    addUrl: {
      type: String,
      required: true
    },
    editUrl: {
      type: String,
      required: true
    },
    delUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      fApi: {},
      model: {},
      title: '增加',
      formtype: 1,
      tabledata: [], // 默认[]，当fetch 没有获取到数据，默认显示
      formoptions: {
        // 表单提交事件
        onSubmit: (formData) => {
          console.log('表单数据:', formData, formData.Action)
          // 在此调用接口
          if (formData.Action === 1) {
            // 新增api
            axios.post(this.addUrl, formData).then(res => {
              debugger
              if (res.data.Success) {
                this.$store.dispatch('simplepage/changeShow')
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                })
                this.fetchTableData()
              }
            }
            )
          } else {
            // 修改api
            axios.post(this.editUrl, formData).then(res => {
              if (res.data.Success) {
                this.$store.dispatch('simplepage/changeShow')
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                })
                this.fetchTableData()
              }
            }
            )
          }
        }
      }
    }
  },
  computed: {
    visible() {
      return this.$store.state.simplepage.dialogshow
    }
  },
  mounted() {
    //  由于el-dialog是懒加载，为了先初始化form-create,先显示后隐藏
    this.$store.dispatch('simplepage/changeShow', true)
    setTimeout(() => {
      this.$store.dispatch('simplepage/changeShow', false)
    }, 300)
    if (typeof (this.fApi.setValue) !== 'undefined') {
      this.fApi.setValue('Action', this.formtype)
    }
  },
  methods: {
    showDialog: function(title, formtype) {
      this.$store.dispatch('simplepage/changeShow')
      this.title = title
      this.formtype = formtype
      if (typeof (this.fApi.setValue) !== 'undefined') {
        this.fApi.setValue('Action', formtype)
      }
    },
    CloseDialog(done) {
      this.fApi.resetFields()
      this.$store.dispatch('simplepage/changeShow')
      // done()
    },
    fetchTableData() {
      this.tableoptions.loading = true
      debugger
      axios.get(
        this.searchUrl, {
          params: { pageSize: this.pagination.pageSize, pageIndex: this.pagination.pageIndex }
        }
      ).then(res => {
        console.log('searchResponse', res)
        this.tabledata = res.data.Data
        this.pagination.total = res.data.ExtData
        this.tableoptions.loading = false
      }).catch((error) => {
        console.log(error)
        this.tableoptions.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row{
  margin-bottom: 20px;
}

.dialogDiv{
 position:fixed;
 top: 100px;
 left: 200px;
 width:100%;
 height: 100%;
 z-index: 9999;
 background-color: #eee;
 &.dialog{
 background-color: #fff;
   width: 80%;
   min-height: 400px;
   text-align: center;
 }
}
</style>
