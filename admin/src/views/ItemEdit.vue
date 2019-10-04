<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'" :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    //这是一个组件，接收一个ID，好处：尽可能的和路由联系上
    props: {
      id: {}
    },
    data() {
      return {
        model: {},
      }
    },
    methods: {
      afterUpload(res){
        console.log(res)
        // 此内容涉及到内容的响应式的问题
        // Vue有一个显示赋值的方法，第一个参数是赋值的数据主体是谁，第二个参数是要给它赋值的属性是什么，第三个参数就是 res.url(建议使用此方法)
        this.$set(this.model,'icon',res.url)
        this.model.icon = res.url
      },
      // 保存的时候需要做条件判断，新建和编辑它们之间有两个地方不同
      // 1、post方法；2、路径不同；新建的时候是post，修改的时候是put
      async save() {
        console.log('save')
        // 可以将异步的回调函数的写法换成类似同步的写法，await本身也可以返回 promise
        let res
        if (this.id) {
          res = await this.$http.put(`rest/items/${this.id}`, this.model)
        } else {
          res = await this.$http.post('rest/items', this.model)
        }
        // 跳转到分页列表(/items/list)
        this.$router.push('/items/list')
        // 用于提示，是否保存成功
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch() {
        const res = await this.$http.get(`rest/items/${this.id}`)
        this.model = res.data
      },
      // 获取父级的选项
      // async fetchParents(){
      //   const res = await this.$http.get(`rest/categories`)
      //   this.parents = res.data
      // },
    },
    // 在刚刚进入后台的时候，加入我们当前的状态是编辑状态，应获取到当前分类的详情信息，然后将它先输入框内显示，让客户知道当前操作的是谁

    // 该方法是自动获取数据，用法：要有了this.id才开始执行
    created() {
      // this.fetchParents()
      this.id && this.fetch()
    }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
