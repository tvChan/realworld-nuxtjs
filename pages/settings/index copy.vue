<template>
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
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { updateUserInfo, getUserInfo } from '@/api/user'

export default {
  middleware: 'authenticated',
  name: 'SettingsIndex',
  async asyncData() {
    const { data } = await getUserInfo()
    console.log(data)
    const { user } = data
    console.log(user)
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
    async updateSetting() {
      const user = {
        image: this.user.image || '',
        username: this.user.username || '',
        bio: this.user.bio || '',
        email: this.user.email || '',
        password: this.user.password || ''
      }
      this.btnDisabled = true
      const data = await updateUserInfo({ user })
      // const data = await updateUserInfo({ user: this.user })
      console.log(data)
      this.btnDisabled = false
    }
  }
}
</script>
