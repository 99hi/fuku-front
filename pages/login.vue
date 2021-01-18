<template>
  <v-container class="login">
    <v-row>
    <v-col cols="12" ><v-img src="/icon.png" width="60vw" class="mx-auto"></v-img></v-col>
    <v-col>
      <h3>LOGIN</h3>
    </v-col>
    <v-col cols="12" class="col">
      <v-btn @click="getUrl" justify="center" width="200px" outlined>
      <v-icon class="pr-2 btn">mdi-google</v-icon>
        GOOGLE
      </v-btn>
    </v-col>
    <v-col cols="12" class="col">
      <v-btn @click="getUrl" justify="center" width="200px" outlined>
      <v-icon class="pr-2 btn">mdi-account-circle</v-icon>
      GUEST
      </v-btn>
    </v-col>
    </v-row>
    
  </v-container>
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

<style scoped>
.container {
  height: 100vh !important;
  width: 100vw;
}
.login {
  position: relative;
  z-index: 5;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}
.login .col {
  text-align: center;
}

</style>