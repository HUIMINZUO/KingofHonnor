<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body"
         useCustomImageHandler @image-added="handleImageAdded">
        </vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { VueEditor } from "vue2-editor";

  export default {
    //这是一个组件，接收一个ID，好处：尽可能的和路由联系上
    props: {
      id: {}
    },
    components: {
        VueEditor
      },
    data() {
      return {
        model: {},
        categories: []
      };
    },
    methods: {
       async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            // An example of using FormData
            // NOTE: Your key could be different such as:
            // formData.append('file', file)

            const formData = new FormData();
            formData.append("file", file);

            const res = await this.$http.post('upload',formData);
            Editor.insertEmbed(cursorLocation, "image", res.data.url);
            resetUploader();

            // axios({
            //   url: "https://fakeapi.yoursite.com/images",
            //   method: "POST",
            //   data: formData
            // })
            //   .then(result => {
            //     let url = result.data.url; // Get url from response
            //     Editor.insertEmbed(cursorLocation, "image", url);
            //     resetUploader();
            //   })
            //   .catch(err => {
            //     console.log(err);
            //   });
          },
      // 保存的时候需要做条件判断，新建和编辑它们之间有两个地方不同
      // 1、post方法；2、路径不同；新建的时候是post，修改的时候是put
      async save(){
        console.log('save')
        // 可以将异步的回调函数的写法换成类似同步的写法，await本身也可以返回 promise
        let res
        if (this.id) {
           res = await this.$http.put(`rest/articles/${this.id}`,this.model)
        } else {
           res = await this.$http.post('rest/articles',this.model)
        }
        // 跳转到分页列表(/articles/list)
        this.$router.push('/articles/list')
        // 用于提示，是否保存成功
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch(){
        const res = await this.$http.get(`rest/articles/${this.id}`)
        this.model = res.data
      },
      // 获取父级的选项
      async fetchCatgories(){
        const res = await this.$http.get(`rest/categories`)
        this.categories = res.data
      },
    },
    // 在刚刚进入后台的时候，加入我们当前的状态是编辑状态，应获取到当前分类的详情信息，然后将它先输入框内显示，让客户知道当前操作的是谁

    // 该方法是自动获取数据，用法：要有了this.id才开始执行
    created(){
      this.fetchCatgories()
      this.id && this.fetch()
    }
  }
</script>
<style>

</style>
