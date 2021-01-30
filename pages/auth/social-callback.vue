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
    this.setToken(this.$route.query.token);
    this.login();
  },
  methods: {
    ...mapMutations({
      setUser: "login/setUser",
      setLoggedIn: "login/setLoggedIn",
      setToken: "login/setToken",
    }),
    login() {
      this.$auth
        .loginWith("local", { data: this.$route.query.token })
        .then((res) => {
          console.log("$authログイン", res);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
