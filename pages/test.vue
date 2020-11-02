<template>
<div>
  ログインテスト
  <v-btn @click="login">LINEログイン</v-btn>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {

    }
  },
  methods: {
    async register() {
      try {
        await this.axios.post('/auth/register', this.form)
      } catch (e) {
        console.log(e)
      }
    },
    login() {
      axios.get('/api/login/line').then(res => {
        console.log(res.data)
      })
    },

  }

}
</script>
