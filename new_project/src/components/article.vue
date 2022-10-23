<template>
    <div>
        <div class="list" v-for="datalist in articleData" :key="datalist.id" @click="information(datalist.id)">
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
</template>

<script>
    import articleData from '../G6Json/article.json'
    export default{
        name:"articlex",
        data(){
            return{
                articleData
            }
        },
        created(){
        },
        methods: {
            information(id) {
                this.$store.commit('increment', id);
                this.$emit('fatherMethod',1);
            },
        },
    }
</script>

<style scoped>
    .list>div{
        margin: 0 auto;
        width: 95%;
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
        font-weight: 600;
    }

    .autor{
        font-size: 13px;
        color: #8b8383;
        display: flex;
        justify-content: space-between;
    }

    .autor>span{
        display: inline-block;
    }
</style>