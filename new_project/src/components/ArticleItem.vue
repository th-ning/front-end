<template>
  <div class="article-item">
    <div class="cell-row">
      <div class="label">{{article.id}}</div>
      <div class="value">{{article.title}}</div>
    </div>
    <div class="cell-row">
      <div class="label">Authors</div>
      <div class="value">{{authors}}</div>
    </div>
    <div class="cell-row">
      <div class="label">Year</div>
      <div class="value">{{article.year}}</div>
    </div>
    <div class="cell-row">
      <div class="label">Question</div>
      <div class="value">
        <template v-for="q in article.questions">
          <div :key="q.id" class="">
            <span>{{q.id}} : {{q.research_question}}</span>
          </div>
        </template>
      </div>
    </div>
    <div class="cell-row">
      <div class="label">Abstract</div>
      <div class="value">{{article.abstract}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    authors() {
      let author = this.article.author;
      let co_authors = this.article.co_authors || [];
      let authorNames = [];
      [author].concat(co_authors).forEach((item) => {
        if (item?.name) {
          authorNames.push(item?.name);
        }
      });
      return authorNames.join(",");
    },
  },
};
</script>
<style lang="scss" scoped>
.article-item {
  background-color: white;
  box-shadow: 0 4px 13px -3px rgba(0, 0, 0, 0.10196);
  border: 1px solid #d2d2d2;
  border-radius: 2px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 20px;
  .cell-row {
    display: flex;
    border-bottom: 1px solid #eee;
    background: #f7f7f7;
    line-height: 40px;
    &:nth-child(even) {
      background-color: transparent;
    }
    .label {
      flex-shrink: 0;
      text-align: center;
      width: 100px;
      border-right: 1px solid #eee;
    }
    .value {
      padding-left: 20px;
      padding-right: 20px;
      flex-grow: 1;
    }
  }
}
</style>