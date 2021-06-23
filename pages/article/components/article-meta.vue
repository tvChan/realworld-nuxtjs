<template>
  <!-- 文章头部按钮区 -->
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
        :class="{ active: article.author.following }"
        :disabled="followDisabled"
        @click="onFollow(article.author)">
        <i :class="`ion-${article.author.following ? 'minus': 'plus'}-round`"></i>
        &nbsp;
        {{ article.author.following ? 'UnFollow' : 'Follow'}} {{ article.author.username }}
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{ active: article.favorited }"
        :disabled="favoriteDisabled"
        @click="onFavorite(article)">
        <i class="ion-heart"></i>
        &nbsp;
        {{ article.favorited ? 'Unfavorite' : 'Favorite'}} Post <span class="counter">({{ article.favoritesCount }})</span>
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
import { deleteArticle, favoriteArticle, unFavoriteArticle } from '@/api/article'
import { follow, unfollow } from '@/api/profile'
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
      btnDisabled: false,
      followDisabled: false,
      favoriteDisabled: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 关注，取消关注
    async onFollow(author) {
      this.followDisabled = true
      if (author.following) {favorite
        const { data } = await unfollow(author.username)
        this.article.author.following = false
      } else {
        const { data } = await follow(author.username)
        this.article.author.following = true
      }
      this.followDisabled = false
    },
    // 跳转编辑文章页
    goEditArticle(slug) {
      this.$router.push({
        name: 'updateEditor',
        params: {
          slug: slug
        }
      })
    },
    // 删除文章
    async goDeleteArticle(article) {
      this.btnDisabled = true
      try {
        const { data } = await deleteArticle(article.slug)
        this.$router.push({
          name: 'profile',
          params: {
            username: article.author.username
          }
        })
      } catch (err) {}
      this.btnDisabled = false
    },
    // 喜欢，不喜欢文章
    async onFavorite(article) {
      this.favoriteDisabled = true
      try {
        const { data } = article.favorited ? await unFavoriteArticle(article.slug) : await favoriteArticle(article.slug)
        this.article.favoritesCount = data.article.favoritesCount
        this.article.favorited = data.article.favorited
      } catch(err) {}
      this.favoriteDisabled = false
    }
  }
}
</script>
