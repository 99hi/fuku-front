<template>
  <v-app>
    <alert ref="alert"></alert>
    <!-- ヘッダー -->

    <!-- メイン -->
    <v-main class="mb-14 main">
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
    if (route.path !== "/auth/social-callback" && route.path !== "/login") {
      if (!store.state.auth.loggedIn) {
        redirect("/login");
      }
    }
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
/* 
.main {
  max-width: 960px;
} */

.v-card {
  border-radius: 0;
}

.vdr {
  border: none !important;
}
</style>
