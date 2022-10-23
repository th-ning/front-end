<template>
  <div class="article-page">
    <template v-for="article in articleList">
      <ArticleItem :key="article.id" :article="article" />
    </template>
  </div>
</template>

<script>
import ArticleItem from "@/components/ArticleItem.vue";
// @ is an alias to /src

export default {
  name: "Home",
  components: { ArticleItem },
  data() {
    return { articleList: [] };
  },
  created() {
    this.loadArticle();
  },
  methods: {
    /**
     * load article json data
     */
    loadArticle() {
      this.$http.get("/article.json").then((res) => {
        this.articleList = res.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.article-page {
  margin: 0 10px;
}
</style>
