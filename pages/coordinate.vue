<template>
  <v-card style="position: relative">
    <div class="closet-top-bar">
      <v-toolbar flat height="48px" class="page-title">
        <v-toolbar-title>コーディネート一覧</v-toolbar-title>
      </v-toolbar>
      <div class="closet-menu">
        <div class="closet-menu-item">
          <coordinateSort @filter="applyFilter"></coordinateSort>
        </div>
      </div>
    </div>

    <coordinateAbout ref="coordinateAbout"></coordinateAbout>
    <v-container fill-height>
      <div
        class="stage"
        v-for="coordinate in $store.getters['coordinate/filteredCoordinate']"
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
  </v-card>
</template>

<script>
import coordinateAbout from "~/components/coordinateAbout.vue";
import coordinateSort from "~/components/coordinateSort.vue";
export default {
  components: {
    coordinateAbout,
    coordinateSort,
  },
  asyncData({ store }) {
    store.dispatch("coordinate/coordinate");
  },
  data() {
    return {};
  },
  methods: {
    openAbout(coordinate) {
      this.$refs.coordinateAbout.showAbout(coordinate);
    },
    applyFilter(selectedSeason, dateSort, tags) {
      //targetDataに対してソートをかけていく
      let targetData = this.$store.getters["coordinate/getCoordinate"];
      //タグ検索
      if (tags.length !== 0) {
        targetData = this.tagSearch(targetData, tags);
      } else {
        console.log("タグは指定されていません");
      }
      //シーズンフィルター;
      if (selectedSeason.length !== 0) {
        targetData = this.seasonFilter(targetData, selectedSeason);
      } else {
        console.log("シーズンは指定されていません");
      }
      //日付ソート
      if (dateSort === "true") {
        targetData = targetData.slice().reverse();
      }

      //フィルターをかけたデータを適用
      this.$store.commit("coordinate/setFilteredCoordinate", targetData);
      console.log(targetData);
    },
    //タグ検索
    tagSearch(targetData, selectedTag) {
      const data = targetData.filter((value) => {
        const tagList = value.tags.map((tag) => tag.name);
        if (tagList.some((tag) => selectedTag.includes(tag))) return value;
      });

      return data;
    },
    //シーズンフィルター
    seasonFilter(targetData, selectedSeason) {
      const data = targetData.filter((value) => {
        const seasonList = value.seasons.map((season) => season.name);
        if (seasonList.some((season) => selectedSeason.includes(season))) return value;
      });
      return data;
    },
  },
};
</script>

<style scoped>
.page-title {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid gainsboro;
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
.container {
  margin-top: 98px;
}
.closet-top-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: #fff;
  width: 100vw;
}
.closet-menu {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
  color: #e53935;
  background-color: #fff;
  border-bottom: 1px solid gainsboro;
}
.closet-menu-item {
  cursor: pointer;
  width: 30%;
}
</style>
