<template>
  <!-- 文章 tag 列表 -->
  <ul class="tag-list">
    <li v-for="(tag, index) in tagList" :key="index" class="tag-default tag-pill tag-outline">
      <nuxt-link :to="{
        name: 'home',
        query: {
          tag: tag,
          tab: 'tag'
        }
      }">
        {{tag}}
      </nuxt-link>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'ArticleTags',
  props: {
    tagList: {
      type: Object,
      required: true
    }
  }
}
</script>
