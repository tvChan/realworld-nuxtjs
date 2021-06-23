<template>
  <!-- 文章评论 -->
  <div class="col-xs-12 col-md-8 offset-md-2">
    <form v-if="user" class="card comment-form">
      <div class="card-block">
        <textarea v-model="comment.body" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary"
          :disabled="!comment.body || btnDisabled"
          @click="addComment">
        Post Comment
        </button>
      </div>
    </form>
    
    <div class="card"
      v-for="comment in comments"
      :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link class="comment-author" :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }">
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link class="comment-author" :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }">{{ comment.author.username }}</nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY HH:mm:ss')}}</span>
        <span v-if="comment.author.username == user.username" class="mod-options">
          <i class="ion-trash-a" @click="deleteComment(comment.id)"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { getComments, addArticleComment, deleteArticleComment } from '@/api/article'
import { mapState } from 'vuex'

export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      btnDisabled: false,
      comment: {
        body: ''
      },
      comments: [] // 文章列表
    }
  },
  computed: {
    ...mapState(['user'])
  },
  async mounted() {
    this.getCommentsList()
  },
  methods: {
    // 获取评论列表
    async getCommentsList() {
      const { data } = await getComments(this.article.slug)
      this.comments = data.comments
    },
    // 添加评论
    async addComment() {
      this.btnDisabled = true
      try {
        const { data } = await addArticleComment(this.article.slug, this.comment)
        this.getCommentsList()
        this.comment.body = ''
      } catch (err) {}
      this.btnDisabled = false
    },
    // 删除评论
    async deleteComment(commentId) {
      try {
        await deleteArticleComment(this.article.slug, commentId)
        this.getCommentsList()
      } catch (err) {}
    }
  }
}
</script>
