<template>
<v-app>
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
export default {
  componets: {
    Header,
    BottomNav,
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
