<template>
  <v-bottom-navigation color="red darken-1" height="70px" grow fixed flat class="elevation-0 bottom-nav">
    <v-btn to="/" class="pb-6">
      <span>closet</span>
      <v-icon>mdi-wardrobe-outline</v-icon>
    </v-btn>

    <v-btn to="/coordinate" class="pb-6">
      <span>coordinate</span>
      <v-icon>mdi-account-outline</v-icon>
    </v-btn>

    <v-btn to="/add" class="pb-6">
      <span>add</span>
      <v-icon>mdi-shape-square-plus</v-icon>
    </v-btn>

    <v-btn to="/mypage" class="pb-6">
      <span>mypage</span>
      <v-icon>mdi-account-outline</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import axios from "axios";
export default {
  methods: {},
};
</script>

<style>
.bottom-nav {
  border-top: 1px solid gainsboro;
  z-index: 0 !important;
}
</style>
