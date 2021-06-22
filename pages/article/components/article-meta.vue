<template>
  <div class="article-meta">
    <nuxt-link :to="{
      name: 'profile',
      params: {
        username: article.author.username
      }
    }"><img :src="article.author.image" /></nuxt-link>
    <div class="info">
      <nuxt-link :to="{
      name: 'profile',
      params: {
        username: article.author.username
      }
    }" class="author">{{ article.author.username }}</nuxt-link>
      <span class="date">{{ article.author.createdAt | date('MMM DD, YYYY')}}</span>
    </div>
    <template v-if="user.username !== article.author.username">
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{ active: article.author.following }">
        <i class="ion-plus-round"></i>
        &nbsp;
        Follow {{ article.author.username }}
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{ active: article.favorited }">
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
    <template v-else>
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{ active: article.author.following }"
        @click="goEditArticle(article.slug)">
        <i class="ion-edit"></i>
        &nbsp;
        Edit Article
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-danger"
        @click="goDeleteArticle(article)"
        :disabled="btnDisabled">
        <i class="ion-trash-a"></i>
        &nbsp;
        Delete Article
      </button>
    </template>
  </div>
</template>
<script>
import { deleteArticle } from '@/api/article'
import { mapState } from 'vuex'

export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      btnDisabled: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    goEditArticle(slug) {
      this.$router.push({
        name: 'updateEditor',
        params: {
          slug: slug
        }
      })
    },
    async goDeleteArticle(article) {
      this.btnDisabled = true
      try {
        const { data } = await deleteArticle(article.slug)
        console.log(data)
        this.$router.push({
          name: 'profile',
          params: {
            username: article.author.username
          }
        })
      } catch (err) {

      }
      this.btnDisabled = false
    },
  }
}
</script>
