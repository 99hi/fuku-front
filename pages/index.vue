<template>
<v-card>
  <div class="closet-top-bar">
    <v-tabs color="red darken-1" centered　show-arrows v-model="tab">
      <v-tab>トップス</v-tab>
      <v-tab>アウター</v-tab>
      <v-tab>パンツ</v-tab>
      <v-tab>シューズ</v-tab>
    </v-tabs>
    <div class="closet-filter">
      <closetSort></closetSort>
    </div>
  </div>
  <v-tabs-items v-model="tab" class="px-2 closet-tabs-items">
    <v-tab-item v-for="n in 4" :key="n" class="">
      <v-container fluid>
        <v-row>
          <v-col v-for="i in 16" :key="i" cols="4" md="4" class="pa-2">
            <v-img :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`" :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`" aspect-ratio="1"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-tab-item>
  </v-tabs-items>
</v-card>
</template>

<script>
import closetSort from '~/components/closetSort.vue';
export default {
  components: {
      closetSort
  },
  data() {
    return {
      tab: null,
    };
  },
};
</script>

<style scoped>
.closet-top-bar {
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: #fff;
  width: 100%;
}

.closet-filter {
  position: absolute;
  z-index: 1;
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  color: #e53935;
  background-color: #fff;
  border-bottom: 1px solid gainsboro;
}


.closet-tabs-items {
  margin-top: 90px;
}
</style>
