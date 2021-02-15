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
    <div style="min-height: 100vh">
      <v-container>
        <v-row class="main mx-auto">
          <v-col
            cols="6"
            lg="2"
            md="3"
            sm="4"
            class="stage"
            v-for="coordinate in $store.getters['coordinate/filteredCoordinate']"
            :key="coordinate.id"
          >
            <v-img
              contain
              :src="coordinate.url"
              height="100%"
              @click="openAbout(coordinate)"
              class="mx-auto"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </div>
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
  width: 100vw;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid gainsboro;
}

.stage {
  width: 49vw;
  height: 30vh;
  display: inline-block;
}

.vdr {
  border: none;
}
.main {
  width: 100%;
  margin-top: 98px;
}
.closet-top-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: #fff;
  width: 100%;
}
.closet-menu {
  height: 50px;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
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

.v-responsive__sizer {
  padding: 0 !important;
}
</style>
