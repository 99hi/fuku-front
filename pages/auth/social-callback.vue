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
  mounted() {
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
    getUser() {
      this.$axios
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
