<template>
  <div>
    <p>googleアカウントでログイン中…</p>
  </div>
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
        })
        .catch((error) => {
          console.log(error);
        });
      this.$router.push("/");
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
