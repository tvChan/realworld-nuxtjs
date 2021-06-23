<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <template v-if="user && user.username !== profile.username">
              <button class="btn btn-sm btn-outline-secondary action-btn"
                :disabled="profile.followDisabled"
                @click="onFollow(profile)">
                <i :class="`ion-${profile.following ? 'minus': 'plus'}-round`"></i>
                &nbsp;
                {{ profile.following ? 'UnFollow' : 'Follow' }} {{ profile.username }} 
              </button>
            </template>
            <template v-else>
              <button class="btn btn-sm btn-outline-secondary action-btn"
                @click="goEditProfile(profile)">
                <i class="ion-gear-a"></i>
                &nbsp;
                 Edit Profile Settings
              </button>
            </template>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link class="nav-link"
                  :class="{active: tab === 'My_Articles'}"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'My_Articles'
                    }
                  }">My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link"
                  :class="{active: tab === 'Favorited_Articles'}"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'Favorited_Articles'
                    }
                  }">Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <template v-for="article in articles">
            <article-preview :article="article" />
          </template>

        </div>

      </div>
    </div>

  </div>
</template>
<script>
import ArticlePreview from '@/components/article-preview'
import { getProfile, follow, unfollow } from '@/api/profile'
import { getArticles } from '@/api/article'
import { mapState } from 'vuex'

export default {
  middleware: 'authenticated',
  name: 'UserProfile',
  watchQuery: ['tab'],
  async asyncData({ query, params }) {
    const { data } = await getProfile(params.username)
    const { profile } = data
    profile.followDisabled = false

    const tab = query.tab || 'My_Articles'
    const articleParams = tab == 'My_Articles' ? { author: profile.username } : { favorited: profile.username }
    const articleData = await getArticles(articleParams)
    const articles = articleData.data.articles
    return {
      profile,
      articles,
      tab
    }
  },
  components: {
    ArticlePreview
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 关注，取消关注
    async onFollow(profile) {
      this.profile.followDisabled = true
      if (profile.following) {
        const { data } = await unfollow(profile.username)
        this.profile = data.profile
        this.profile.followDisabled = false
      } else {
        const { data } = await follow(profile.username)
        this.profile = data.profile
        this.profile.followDisabled = true
      }
      this.profile.followDisabled = false
    },
    // 跳转个人信息编辑页
    goEditProfile() {
      this.$router.push({
        name: 'settings'
      })
    } 
  }
}
</script>
