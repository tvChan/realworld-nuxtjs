<template>
  <!-- 首页 -->
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link class="nav-link"
                  :class="{active: tab === 'your_feed'}"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed'
                    }
                  }">Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link"
                  :class="{active: tab === 'global_feed'}"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed'
                    }
                  }">Global Feed</nuxt-link>
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link class="nav-link"
                  :class="{active: tab === 'tag' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag: tag
                    }
                  }"># {{ tag }}</nuxt-link>
              </li>
            </ul>
          </div>
          <template v-for="article in articles">
            <article-preview :article="article" />
          </template>
          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li v-for="item in totalPage" :key="item"
                class="page-item"
                :class="{active: item === page}">
                <nuxt-link class="page-link" :to="{
                  name: 'home',
                  query: {
                    page: item,
                    tag: $route.query.tag,
                    tab: tab
                  }
                }">{{item}}</nuxt-link>
              </li>
            </ul>
          </nav>
          <!-- 分页列表 -->
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link v-for="item in tags" :key="item"
                :to="{
                  name: 'home',
                  query: {
                    tag: item,
                    tab: 'tag'
                  }
                }" class="tag-pill tag-default">{{item}}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ArticlePreview from '@/components/article-preview'
import { getArticles, getYourFeedArticles, addFavorite, deleteFavorite } from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'

export default {
  name: 'HomeIndex',
  watchQuery: ['page', 'tag', 'tab'],
  // 默认情况下。query参数的改变不会调用 asyncData
  async asyncData ({ query, store }) {
    const page = Number.parseInt(query.page || 1)
    const limit = 10
    const { tag } = query
    const tab = query.tab || 'global_feed'
    const loadArticles = store.state.user && tab === 'your_feed'
      ? getYourFeedArticles
      : getArticles
    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag
      }),
      getTags()
    ])

    const { articles, articlesCount } = articleRes.data
    const { tags } = tagRes.data

    articles.forEach(article => article.favoriteDisabled = false)

    return {
      articles,
      articlesCount,
      tags,
      limit,
      page,
      tag,
      tab
    }
  },
  computed: {
    ...mapState(['user']),
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  components: {
    ArticlePreview
  }
}
</script>
