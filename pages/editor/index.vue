<template>
  <!-- 文章新建编辑页 -->
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control form-control-lg"
                    v-model="article.title"
                    placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control"
                    v-model="article.description"
                    placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                  <textarea class="form-control" rows="8"
                    v-model="article.body"
                    placeholder="Write your article (in markdown)"></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control"
                    v-model="article.tagList"
                    placeholder="Enter tags"><div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary"
                type="button" @click="createOrUpdate()"
                :disabled="btnDisabled">
                  {{$route.params.slug ? 'Update' : 'Publish' }} Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createArticle, getArticle, updateArticle } from '@/api/article'

export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'authenticated',
  name: 'EditorIndex',
  data() {
    return {
      btnDisabled: false,
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    }
  },
  async mounted() {
    if (this.$route.params.slug) {
      const { data } = await getArticle(this.$route.params.slug)
      this.article = data.article
      this.article.tagList = this.article.tagList.toString()
    }
  },
  methods: {
    // 创建、编辑文章
    async createOrUpdate() {
      this.btnDisabled = true
      try {
        const article = this.article
        article.tagList = article.tagList.split(',')
        const { data } = this.$route.params.slug ? await updateArticle(article) : await createArticle({ article })
        this.$router.push({
          name: 'article',
          params: {
            slug: data.article.slug
          }
        })
      } catch (err) {}
      this.btnDisabled = false
    }
  }
}
</script>
