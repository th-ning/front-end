<template>
    <div class="card">
        <el-card class="box-card">
            <div class="return" @click="returnOne">返回上一级</div>
            <div class="title">{{this.data.title}}</div>
            <div class="autor">
                {{this.data.author.name}}
            </div>
            <div class="autorIfro">
                <span class="autor">{{this.data.year}}</span>
                <span class="Design autor">{{this.data.journal}}</span>
            </div>
            <div>Research question:</div>
            <div>
                <div class="childList">
                    <div v-for="listx in mainData" :key="listx.id" style="margin: 5px 0;">Q{{listx.id}}:{{listx.research_question}}</div>
                    <el-collapse  @change="handleChange" v-show="showwing">
                        <el-collapse-item title="其他问题" name="1">
                            <div v-for="list in cardData" :key="list.id" style="margin: 5px 0;">Q{{list.id}}:{{list.research_question}}</div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            
            <div>
                <div class="firstList">
                    <div class="list" v-for="datalist in datax" :key="datalist.id" @click="information(datalist.id)">
                        <div class="title">{{datalist.title}}</div>
                        <div class="autor">
                            <span>
                                {{datalist.author.name}}
                            </span>
                            <span>
                                {{datalist.year}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import articleData from '../G6Json/article.json'
    export default{
        name:"card",
        data(){
            return{
                articleData,
                data:"",
                datax:"",
                cardData:"",
                mainData:"",
                showwing:true,
                // changeId:this.$store.state.id
            }
        },
        created(){
            this.data=this.articleData[this.$store.state.id-1];

            this.cardData=this.articleData[this.$store.state.id-1].questions.slice(3,articleData[this.$store.state.id-1].questions.length+1);

            this.mainData=this.articleData[this.$store.state.id-1].questions.slice(0,3);

            if(this.articleData[this.$store.state.id-1].questions.length<=3){
                this.showwing=false;
            }else{
                this.showwing=true;
            }

            this.datax=[];
            for(var i=0 ;i<this.articleData.length ;i++){
                if(this.$store.state.id-1!=i){
                    this.datax.push(this.articleData[i])
                }
            };
        },
        methods: {
            returnOne() {
                this.$emit('fatherMethod',2);
            },
            handleChange(val) {
                // console.log(val);
            },
            information(index){
                this.data=this.articleData[index-1];

                this.cardData=this.articleData[index-1].questions.slice(3,this.articleData[index-1].questions.length+1);

                this.mainData=this.articleData[index-1].questions.slice(0,3);

                this.datax=[];
                for(var i=0 ;i<this.articleData.length ;i++){
                    if(index-1!=i){
                        this.datax.push(this.articleData[i])
                    }
                };

                if(this.articleData[index-1].questions.length<=3){
                    this.showwing=false;
                }else{
                    this.showwing=true;
                }
            }
        },
        computed:{
            changeId(){//动态监听vuex中的数值变化进行数据调整
                return this.$store.state.id
            }
        },
        watch:{
            changeId:{//动态监听vuex中的数值变化进行数据调整
                deep:true,
                handler(value) {
                    this.information(value)
                }
            }
        }
    }
</script>

<style scoped>
    .card{
        height: 100%;
    }
    .box-card{
        height: 100%;
    }
    .el-card__body>div{
        width: 100%;
        margin: 10px 0;
    }
    .title{
        font-weight: 600;
    }
    .autor{
        font-size: 13px;
        color: #8b8383;
    }
    .Design{
        display: inline-block;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .childList{
        width: 80%;
        float: right;
        font-size: 13px;
    }
    .firstList{
        width: 80%;
        float: right;
        height: 300px;
        overflow: auto;
    }
    .return{
        cursor: pointer;
    }
    .list>div{
        margin: 0 auto;
        width: 100%;
    }

    .list{
        border-bottom: 0.5px solid gray;
        cursor: pointer;
        margin-bottom: 10px;
    }

    .list:hover{
        background: #bababa;
    }

    .title{
        font-size: 13px;
    }

    
    .autorIfro{
        display: flex;
    }

    .autorIfro>span{
        display: inline-block;
   
    }
    .autorIfro>span:nth-of-type(1){
        flex: 1;
    }
    .autorIfro>span:nth-of-type(2){
        flex: 3;
    }

</style>