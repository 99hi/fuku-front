<template>
<div>
  <p>少しお待ちください...</p>
</div>
</template>

<script>
export default {
  data() {
    return {
      token: this.$route.query.token ? this.$route.query.token : null
    }
  },
  mounted() {
    this.$auth.login({
      data: {
        token: this.token
      }
    }).then(res => {
      console.log("成功")
      console.log(res)
    }).catch(e => {
      console.log("エラー")
      console.log(e)
      //return this.$router.push('/error')
    })
  }
}
</script>
