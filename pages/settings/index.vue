<template>
  <!-- 个人设置页 -->
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <!-- 错误信息 -->
          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">{{ field }} {{ message }}</li>
            </template>
          </ul>
          <!-- 错误信息 -->
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input class="form-control" v-model="user.image" type="text" placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" v-model="user.username" type="text" placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" v-model="user.bio" rows="8" placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" v-model="user.email" type="text" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" v-model="user.password" type="password" placeholder="Password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right"
                :disabled="btnDisabled" @click="updateSetting()">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr>
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { updateUserInfo, getUserInfo } from '@/api/user'
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'authenticated',
  name: 'SettingsIndex',
  async asyncData() {
    const { data } = await getUserInfo()
    const { user } = data
    return {
      user
    }
  },
  data() {
    return {
      errors: {},
      btnDisabled: false
    }
  },
  methods: {
    // 更新设置
    async updateSetting() {
      this.btnDisabled = true
      try {
        const { data } = await updateUserInfo({ user: this.user })
        this.$store.commit('setUser', data.user)
        this.$router.push({
          name: 'profile',
          params: {
            username: data.user.username
          }
        })
      } catch (err) {
        this.errors = err.response.data.errors
      }
      this.btnDisabled = false
    },
    // 退出登录
    logout() {
      this.$store.commit('setUser', null)
      Cookie.remove('user', '')
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>
