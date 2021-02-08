<template>
  <v-app>
    <alert ref="alert"></alert>
    <!-- ヘッダー -->

    <!-- メイン -->
    <v-main class="mb-14">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <BottomNav></BottomNav>
  </v-app>
</template>

<script>
import Header from "~/components/header.vue";
import BottomNav from "~/components/bottomNav.vue";
import alert from "~/components/alert.vue";
export default {
  componets: {
    Header,
    BottomNav,
    alert,
  },
  name: "default",
  middleware({ store, redirect, route }) {
    //ユーザーが認証されていない場合;
    console.log("loggedIn実行前", store.state.auth.loggedIn);
    console.log("パス", route.path);
    if (route.path !== "/auth/social-callback" && route.path !== "/login") {
      if (!store.state.auth.loggedIn) {
        console.log("loggedIn実行後", store.state.auth.loggedIn);
        console.log("middlewareリダイレクト");
        redirect("/login");
      }
    }
  },
  data() {
    return {};
  },
  mounted() {
    console.log("node_env", process.env.NODE_ENV);
    console.log("base_url", process.env.BASE_URL);
    console.log("path", this.$route.path);
  },
  created() {
    this.$store.dispatch("clothes/checkClothes");
    this.$store.dispatch("clothes/category");
    this.$store.dispatch("getArea");
    this.$store.dispatch("clothes/shareCloset");
    this.$store.dispatch("clothes/shareUserList");
    this.$store.dispatch("tag/ClothesTag");
    this.$store.dispatch("tag/CoordinateTag");
  },
};
</script>

<style>
.container {
  padding: 0 !important;
}

.v-card {
  border-radius: 0;
}

.vdr {
  border: none !important;
}
</style>
