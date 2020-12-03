<template>
  <div>
    <v-toolbar flat height="48px" class="page-title">
      <v-toolbar-title>コーディネート一覧</v-toolbar-title>
    </v-toolbar>
    <coordinateAbout ref="coordinateAbout"></coordinateAbout>
    <v-container fill-height>
      <div
        class="stage"
        v-for="coordinate in coordinateList"
        :key="coordinate.id"
      >
        <div
          v-if="coordinate.url === null"
          @click="openAbout(coordinate)"
          style="widht: 100%; height: 100%"
        >
          <vue-draggable-resizable
            v-for="clothes in coordinate.clothes"
            :key="clothes.id"
            :parent="true"
            :x="clothes.x / 1.6"
            :y="clothes.y / 2"
            :w="clothes.width / 2"
            :h="clothes.height / 2"
            class="coordinate-item"
            :style="clothes.fillStyle"
            :lock-aspect-ratio="true"
            :resizable="false"
            :draggable="false"
          >
            <v-img :src="clothes.url"></v-img>
          </vue-draggable-resizable>
        </div>

        <div v-else>
          <v-img
            contain
            :src="coordinate.url"
            :width="180"
            :height="200"
            @click="openAbout(coordinate)"
          ></v-img>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import coordinateAbout from "~/components/coordinateAbout.vue";
export default {
  components: {
    coordinateAbout,
  },
  data() {
    return {
      coordinateList: Object,
    };
  },
  methods: {
    getCoordinate() {
      this.$axios.get("/api/coordination/get").then((res) => {
        console.log(res.data);
        this.coordinateList = res.data;
      });
    },
    openAbout(coordinate) {
      this.$refs.coordinateAbout.showAbout(coordinate);
    },
  },
  created() {
    this.getCoordinate();
  },
};
</script>

<style scoped>
.page-title {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid gainsboro;
  margin-bottom: 10px;
}

.stage {
  width: 49vw;
  height: 200px;
  margin: 1px;
  background-color: #f1f1f1;
  display: inline-block;
}

.vdr {
  border: none;
}
</style>
