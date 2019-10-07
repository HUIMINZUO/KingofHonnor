<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
	  <el-form-item label="密码">
	    <el-input type="text" v-model="model.password"></el-input>
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
      // 保存的时候需要做条件判断，新建和编辑它们之间有两个地方不同
      // 1、post方法；2、路径不同；新建的时候是post，修改的时候是put
      async save(){
        console.log('save')
        // 可以将异步的回调函数的写法换成类似同步的写法，await本身也可以返回 promise
        let res
        if (this.id) {
           res = await this.$http.put(`rest/admin_users/${this.id}`,this.model)
        } else {
           res = await this.$http.post('rest/admin_users',this.model)
        }
        // 跳转到分页列表(/admin_users/list)
        this.$router.push('/admin_users/list')
        // 用于提示，是否保存成功
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch(){
        const res = await this.$http.get(`rest/admin_users/${this.id}`)
        this.model = res.data
      },

    },
    // 在刚刚进入后台的时候，加入我们当前的状态是编辑状态，应获取到当前分类的详情信息，然后将它先输入框内显示，让客户知道当前操作的是谁

    // 该方法是自动获取数据，用法：要有了this.id才开始执行
    created(){
      this.id && this.fetch()
    }
  }
</script>
<style>

</style>
<!-- $2b$10$znXaxOSE/qgTPCG2pgR1/eb33SczUtGmtilb0LHE.OD/9NFPIS6Qy -->