<template>
  <div id="app">
      <div class="nav">
        <div @click="toTwoView()">
          <span>About</span>
        </div>
        <div @click="toTwoView()">
          <span>Contact</span>
        </div>
        <div>
          <span class="Img" ><img src="../assets/user.png" alt=""></span>
        </div>
      </div>
      <div class="search">
          <div class="center">
              <div class="text">
                  <span>{{query_type}}</span>
              </div>
              <div>
                  <div class="changeInput">
                      <input type="radio" name="querytype" id="type1" :value="type1" @change="change(type1)"/>
                      <label style="font-size:x-large;" for="type1">{{type1}}</label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <input type="radio" name="querytype" id="type2" :value="type2" @change="change(type2)"/>
                      <label style="font-size:x-large;" for="type2">{{type2}}</label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <input type="radio" name="querytype" id="type3" :value="type3" @change="change(type3)"/>
                    <label style="font-size:x-large;" for="type3">{{type3}}</label>
                   </div>
              </div>
              <div>
                  <div>
                      <input type="text" :placeholder="plcholder()" v-model="query_sentence" class="search_Input">
                      <span class="searchJpg" @click="toTwoView()">
                        <img src="../assets/search.png" alt="" class="img-drag">
                      </span>
                  </div>
                  
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'firstView',
  components: {
    
  },
  data(){
    return{
      query_type:'Research question',
      query_sentence:'',
      type0:'Research question',
      type1:'Research objective',
      type2:'Researcher',
      type3:'Article'
    }
  },
  methods: {
    change(newtype) {
      if (newtype==this.type1){
        this.type1=this.type0
      }else if(newtype==this.type2){
        this.type2=this.type0
      }else if(newtype==this.type3){
        this.type3=this.type0
      };

      this.query_type=newtype;
      this.type0=newtype;              
      document.getElementById("type1").checked=false;                
      document.getElementById("type2").checked=false;
      document.getElementById("type3").checked=false;                                
    },
    plcholder(){
      if (this.query_type=='Research question'){
        return 'For example of research question "What is sustainability?"'
      }else if(this.query_type=='Research objective'){
        return 'For example of research objective "What is sustainability?"'
      }else if(this.query_type=='Researcher'){
        return 'For example of author "Jiami Yang"'
      }else if(this.query_type=='Article'){
        return 'For example of article "Environment based design"'
      }                  
    },
    toTwoView(){
      this.$router.push({
        name:'twoView',
        query:{
          query_type:this.query_type,
          query_sentence:this.query_sentence,
        }
      });
    }
  },
}
</script>

<style scoped>
  #app{
    width: 100%;
    height: 100%;
  }

  #app>div{
    width: 100%;
  }

  .nav{
    height: 90px;
    background-color: rgb(131, 0, 0);
    display: flex;
    justify-content: right;
  }
  .nav>div{
    width: 120px;
    height: 100%;
    color: white;
    margin-right: 20px;
    cursor: pointer;
    font-size: x-large;
    position: relative;
  }
  .nav>div>span{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }

  .nav>div>span:hover{
    color: rgb(216, 208, 208);
  }

  .search{
    height: 640px;
    position: relative;
  }

  .center{
    width: 70%;
    height: 300px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
  }

  .center>div{
    width: 100%;
    height: 32%;
    position: relative;
  }

  .center>div>span{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }

  .text{
    font-size: xxx-large;
    color: #ff0004b0;
  }

  .center>div>div{
    width: 85%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }

  .changeInput{
    text-align: center;
  }

  .changeInput>input{
    cursor: pointer;
  }

  .search_Input{
    height:81px;
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
    top: 25px;
    width: 40px;
    cursor: pointer;
  }

  .searchJpg>img{
    width: 100%;
  }
  
.Img{   
    position:absolute; 
    width:64px; 
    height:64px; 
    border-radius:100%; 
    overflow:hidden;
  }

  /* .Img>img{
    margin-top: 10px;
  } */

  .img-drag {
    -webkit-user-drag: none;
  }
</style>
