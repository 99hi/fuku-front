<template>
  <v-container class="social" fluid fill-height style="height: 100vh; position: fixed">
    <v-row align="center" justify="center">
      <v-progress-circular indeterminate color="red"></v-progress-circular>
    </v-row>
  </v-container>
</template>

<script>
export default {
  asyncData({ $auth, route, store, redirect }) {
    store.commit("login/setToken", route.query.token);
    $auth
      .loginWith("local", { data: route.query.token })
      .then((res) => {
        console.log("$authログイン", res);
        redirect("/");
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
