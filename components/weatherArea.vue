<template>
  <div class="area">
    <v-toolbar flat height="48px" class="page-title">
      <v-btn icon @click="back">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title class="d-flex text-center">エリア選択</v-toolbar-title>
    </v-toolbar>
    <v-list width="100vw">
      <v-list-group
        v-for="item in prefectures"
        :key="item.title"
        v-model="item.active"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item v-for="child in item.cities" :key="child.city">
          <v-list-item-content>
            <v-list-item-title
              v-text="child.city"
              @click="setArea(child)"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ken: [],
    };
  },
  methods: {
    back() {
      this.$emit("clickBack");
    },
    setArea(area) {
      this.$store.commit("setWeatherArea", area);
      this.$axios.post("/api/weather/set", area).then((res) => {
        console.log(res.data);
      });
      this.back();
    },
  },
  created() {
    this.prefectures = require(`~/assets/city.json`);
  },
};
</script>

<style scoped>
.page-title {
  border-bottom: 1px solid gainsboro;
}

.area {
  position: fixed;
  background-color: white;
  z-index: 5;
  height: 100vh;
}
</style>
