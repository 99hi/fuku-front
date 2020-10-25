<template>
<v-bottom-navigation color="red darken-1" grow fixed flat class="elevation-0 bottom-nav">
  <v-btn to="/">
    <span>closet</span>

    <v-icon>mdi-wardrobe-outline</v-icon>
  </v-btn>

  <v-btn to="/add">
    <span>add</span>

    <v-icon>mdi-shape-square-plus</v-icon>
  </v-btn>

  <v-btn to="/mypage">
    <span>mypage</span>

    <v-icon>mdi-account-outline</v-icon>
  </v-btn>
</v-bottom-navigation>
</template>

<script>
export default {};
</script>

<style scoped>
.bottom-nav {
  border-top: 1px solid gainsboro;
}
</style>
