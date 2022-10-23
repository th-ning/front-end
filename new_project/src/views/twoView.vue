<template>
  <div id="twoApp">
      <div class="nav">
          <div class="input">
            <input type="text" :placeholder="plcholder" :value="value" class="search_Input">
            <span class="searchJpg">
              <!-- 设置禁止拖拽 -->
                  <img src="../assets/search.png" alt="" class="img-drag">
            </span>
          </div>
          <div class="Img">
            <img src="../assets/user.png" alt="">
          </div>
      </div>
      <div class="body">
          <div class="leftNav">
            <el-row class="tac">
              <el-col style="height: 100%;">
                <el-menu
                  :default-active="numL"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose"
                  @select="change"
                  background-color="#DDDDDD"
                  text-color="black"
                  active-text-color="white"
                  active-background-color="#000000"
                  >
                  <el-menu-item index="1">
                    <span slot="title">Question</span>
                  </el-menu-item>

                  <el-menu-item index="2">
                    <span slot="title">Objective</span>
                  </el-menu-item>

                  <el-menu-item index="3">
                    <span slot="title">Researcher</span>
                  </el-menu-item>

                  <el-menu-item index="4"> 
                    <span slot="title">Article</span>
                  </el-menu-item>

                </el-menu>
              </el-col>
            </el-row>
          </div>
          <div class="mapBox">
            <!-- 采用组件进行控制G6切换 -->
              <component :is="G6" @fatherMethodxy="fatherMethodxy"></component>
              <div class="article-page" v-show="articlex">
                  <component :is="dataLx" @fatherMethod="fatherMethod"></component>
              </div>
          </div>
          
      </div>
      <!-- <div class="article-page">
        <template v-for="article in articleList">
          <ArticleItem :key="article.id" :article="article" />
        </template>
      </div> -->
  </div>
  

</template>


<script>
  import G61 from '../components/G61.vue'
  import G62 from '../components/G62.vue'
  import G63 from '../components/G63.vue'
  import G64 from '../components/G64.vue'
  import ArticleItem from "@/components/ArticleItem.vue";
  import articlevue from '../components/article.vue'
  import articlCard from '../components/articleCard.vue'
  
  // @ is an alias to /src

  export default{
    name:'twoView',
    components: {
      G61,
      G62,
      G63,
      G64,
      ArticleItem,
      articlevue,
      articlCard
    },
    data(){
      return{
        plcholder:"For example of research question 'What is sustainability?'",
        G6:G61,
        //用于接受路由传过来的querysentence值，默认为空
        value:"",
        //同上，接受type，默认为1
        numL:"1",
        articleList: [],
        articlex:false,
        dataLx:articlevue
      }
    },
    created(){
      // this.loadArticle();
      // query_type
      console.log(this.$route.query.query_type);
      // query_sentence
      console.log(this.$route.query.query_sentence);
      // 搜索框数据传输
      this.value=this.$route.query.query_sentence;
      // 左侧导航栏传值切换
      if(this.$route.query.query_type=="Research question"){
        this.numL="1";
        this.articlex=false;
        this.change(1);
      }else if(this.$route.query.query_type=="Research objective"){
        this.numL="2";
        this.articlex=false;
        this.change(2);
      }else if(this.$route.query.query_type=="Researcher"){
        this.numL="3";
        this.articlex=false;
        this.change(3);
      }else if(this.$route.query.query_type=="Article"){
        this.numL="4";
        this.articlex=true;
        this.change(4);
      }
    },
    methods: {
        /**
       * load article json data
       */
      // loadArticle() {
      //   this.$http.get("/article.json").then((res) => {
      //     this.articleList = res.data;
      //   });
      // },
      // 打开子菜单回调函数
      handleOpen(key, keyPath) {
        console.log(123);
        console.log(key, keyPath);
      },
      // 关闭子菜单回调函数
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      // 选中子菜单回调函数，并切换组件
      change(index){
        if (index=='1'){
          this.plcholder='For example of research question "What is sustainability?"';
          this.G6=G61;
          this.articlex=false;
        }else if(index=='2'){
          this.plcholder='For example of research objective "What is sustainability?"';
          this.G6=G62;
          this.articlex=false;
        }else if(index=='3'){
          this.plcholder='For example of author "Jiami Yang"';
          this.G6=G63;
          this.articlex=false;
        }else if(index=='4'){
          this.plcholder='For example of article "Environment based design"';
          this.G6=G64;
          this.articlex=true;
        }
      },
      fatherMethod(index){
        if(index==1){
          this.dataLx=articlCard;
        }else{
          this.dataLx=articlevue;
        }
      },
      fatherMethodxy(){
        this.dataLx=articlCard;
      }
    }
  }


</script>

<style scoped>
  #twoApp{
    width: 100%;
    height: 100%;
  }

  #twoApp>div{
    width: 100%;
  }

  .nav{
    height: 90px;
    background-color: rgb(131, 0, 0);
    display: flex;
    position: relative;
  }

  .input{
    width: 50%;
    height: 60%;
    background: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }

  .Img{
    position:absolute; 
    top:14px; 
    right:30px; 
    width:64px; 
    height:64px; 
    border-radius:100%; 
    overflow:hidden;
  }

  /* .Img>img{
    margin-top: 10px;
  } */

  .search_Input{
    height:100%;
    width: 100%;
    font-size:x-large;
    border:1px  solid #BBBBBB;
    border-radius: 5px;
    text-indent: 1em;
    overflow:hidden; 
    white-space:nowrap; 
    text-overflow:ellipsis;
  }

  .search_Input::-webkit-input-placeholder{
    text-indent: 1em;
  }

  .searchJpg{
    
    position: absolute;
    right: 0px;
    top: 11px;
    width: 40px;
    cursor: pointer;
  }

  .searchJpg>img{
    width: 100%;
  }

  .body{
    height:  calc(100vh - 90px); 
    display: flex;
  }

  .leftNav{
    flex: 2;
    background: #DDDDDD;
  }

  .mapBox{
    flex: 12;
    position: relative;
  }

  .article-page{
    position: absolute;
    top: 0;
    right: 0;
    width: 320px;
    height: 100%;
    background: #f6f4f2;
  }

  .el-menu-item {
    font-size: 20px;
    text-align: center !important;
    padding: 0 42px;
  }

  .el-menu-item.is-active {
    background-color: #333333 !important;
  }
  /* 设置禁止拖拽 */
  .img-drag {
    -webkit-user-drag: none;
  }

  .list{
    width: 100%;
  }

  
  
</style>