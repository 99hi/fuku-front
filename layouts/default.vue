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
};
</script>

<style>
.container {
  padding: 0;
}

.v-card {
  border-radius: 0;
}
</style>
