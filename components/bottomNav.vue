<template>
  <v-bottom-navigation
    color="red darken-1"
    height="70px"
    fixed
    flat
    grow
    class="elevation-0 bottom-nav"
  >
    <v-btn to="/" class="pb-6">
      <span class="text-caption">closet</span>
      <v-icon>mdi-wardrobe-outline</v-icon>
    </v-btn>

    <v-btn to="/coordinate" class="pb-6">
      <span class="text-caption">coordinate</span>
      <v-icon>mdi-account-outline</v-icon>
    </v-btn>

    <v-btn to="/add" class="pb-6">
      <span class="text-caption">add</span>
      <v-icon>mdi-shape-square-plus</v-icon>
    </v-btn>

    <v-btn to="/calendar" class="pb-6">
      <span class="text-caption">calendar</span>
      <v-icon>mdi-calendar</v-icon>
    </v-btn>

    <v-btn to="/mypage" class="pb-6">
      <span class="text-caption">mypage</span>
      <v-icon>mdi-account-outline</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  methods: {},
};
</script>

<style>
.bottom-nav {
  border-top: 1px solid gainsboro;
  z-index: 0 !important;
  width: 100vw;
}
</style>
