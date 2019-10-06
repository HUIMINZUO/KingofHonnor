<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="skills" type="border-card">
        <el-tab-pane label="基础信息">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'" :show-file-list="false"
              :on-success="afterUpload">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item of categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.difficult"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.survive"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战技巧">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
         <el-button size="small" @click="model.skills.push({})">
            <i class="el-icon-plus"></i>添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'" :show-file-list="false"
                  :on-success="afterUpload">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem;">
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
        // 类型的分类
        categories: [],
        items: [],
        model: {
          name: '',
          avatar: '',
		  skills: [],
          scores: {
            difficult: 0
          }
        }
      };
    },
    methods: {
      afterUpload(res) {
        this.model.avatar = res.url
      },
      // 保存的时候需要做条件判断，新建和编辑它们之间有两个地方不同
      // 1、post方法；2、路径不同；新建的时候是post，修改的时候是put
      async save() {
        // console.log('save')
        // 可以将异步的回调函数的写法换成类似同步的写法，await本身也可以返回 promise
        let res
        if (this.id) {
          res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
        } else {
          res = await this.$http.post('rest/heroes', this.model);
        }
        // 跳转到分页列表(/heroes/list)
        this.$router.push("/heroes/list");
        // 用于提示，是否保存成功
        this.$message({
          type: "success",
          message: "保存成功"
        });
      },
      async fetch() {
        const res = await this.$http.get(`rest/heroes/${this.id}`);
        // 这个方法有可能会将scores数据覆盖
        // this.model = res.data
        this.model = Object.assign({}, this.model, res.data);
      },
      // 获取父级的选项
      // async fetchParents(){
      //   const res = await this.$http.get(`rest/categories`)
      //   this.parents = res.data
      // },

      async fetchCategories() {
        const res = await this.$http.get(`rest/categories`);
        this.categories = res.data;
      },
      async fetchItems() {
        const res = await this.$http.get(`rest/items`);
        this.items = res.data;
      },
    },
    // 在刚刚进入后台的时候，加入我们当前的状态是编辑状态，应获取到当前分类的详情信息，然后将它先输入框内显示，让客户知道当前操作的是谁

    // 该方法是自动获取数据，用法：要有了this.id才开始执行
    created() {
      // this.fetchParents()
      this.fetchItems();
      this.fetchCategories();
      this.id && this.fetch();
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
