<template>
  <!-- 文章详情页 -->
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <article-meta :article="article" />
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body">
        </div>
      </div>
      <article-tags v-if="article.tagList.length" :tagList="article.tagList" />
      <hr />
      <div class="article-actions">
        <article-meta :article="article" />
      </div>
      <div class="row">
        <article-comments :article="article" />
      </div>
    </div>
  </div>
</template>
<script>
import { getArticle } from '@/api/article'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta'
import ArticleComments from './components/article-comments'
import ArticleTags from './components/article-tags'

export default {
  name: 'ArticleIndex',
  async asyncData({ params }) {
    const { data } = await getArticle(params.slug)
    const { article } = data
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article
    }
  },
  components: {
    ArticleMeta,
    ArticleComments,
    ArticleTags
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [{
        hid: 'description',
        name: 'description',
        content: this.article.description
      }]
    }
  }
}
</script>
