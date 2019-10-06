<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button size="small" @click="model.items.push({})">
           <i class="el-icon-plus"></i>添加广告
         </el-button>
         <el-row type="flex" style="flex-wrap: wrap">
           <el-col :md="24" v-for="(item, i) in model.items" :key="i">
             <el-form-item label="跳转链接(URL)">
               <el-input v-model="item.url"></el-input>
             </el-form-item>
             <el-form-item label="图片" style="margin-top: 0.5rem;">
               <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'" :show-file-list="false"
                 :on-success="res => $set(item,'image', res.url)">
                 <img v-if="item.image" :src="item.image" class="avatar">
                 <i v-else class="el-icon-plus avatar-uploader-icon"></i>
               </el-upload>
             </el-form-item>
             <el-form-item>
               <el-button size="small" type="danger" @click="model.items.splice(i,1)">删除</el-button>
             </el-form-item>
           </el-col>
         </el-row>
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
        model: {
          items: []
        },

      };
    },
    methods: {
      // 保存的时候需要做条件判断，新建和编辑它们之间有两个地方不同
      // 1、post方法；2、路径不同；新建的时候是post，修改的时候是put
      async save(){
        console.log('save')
        // 可以将异步的回调函数的写法换成类似同步的写法，await本身也可以返回 promise
        let res
        if (this.id) {
           res = await this.$http.put(`rest/ads/${this.id}`,this.model)
        } else {
           res = await this.$http.post('rest/ads',this.model)
        }
        // 跳转到分页列表(/ads/list)
        this.$router.push('/ads/list')
        // 用于提示，是否保存成功
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch(){
        const res = await this.$http.get(`rest/ads/${this.id}`)
        this.model = Object.assign({}, this.model, res.data);
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
