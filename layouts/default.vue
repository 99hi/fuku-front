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
  data() {
    return {};
  },
  mounted() {
    console.log(process.env.NODE_ENV);
    console.log(process.env.BASE_URL);
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
</style>
