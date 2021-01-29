<template>
  <v-container class="social" fluid fill-height style="height: 100vh; position: fixed">
    <v-row align="center" justify="center">
      <v-progress-circular indeterminate color="red"></v-progress-circular>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  created() {
    console.log("path", this.$route.path);
    console.log("トークン", this.$route.query.token);
    this.setToken(this.$route.query.token);
    this.login();
    this.getUser();
  },
  methods: {
    ...mapMutations({
      setUser: "login/setUser",
      setLoggedIn: "login/setLoggedIn",
      setToken: "login/setToken",
    }),
    async getUser() {
      await this.$axios
        .get("/api/user")
        .then((res) => {
          console.log("user", res);
          this.setUser(res.data);
          this.setLoggedIn(true);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    login() {
      this.$auth
        .loginWith("local", { data: this.$route.query.token })
        .then((res) => {
          console.log("$authログイン", res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
