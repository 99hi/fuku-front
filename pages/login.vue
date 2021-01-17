<template>
  <div>
    <v-btn @click="getUrl">
      <v-icon>mdi-google</v-icon>
      ログイン
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    getUrl() {
      this.$axios.get("/api/auth/login/google").then((res) => {
        console.log(res.data.redirect_url);
        window.location.href = res.data.redirect_url;
      });
    },
  },
  mounted() {
    console.log("トークンあるかどうか", $nuxt.$store.$auth.getToken("local"));
  },
};
</script>
