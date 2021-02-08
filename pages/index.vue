<template>
  <v-card style="position: relative">
    <div class="closet-top-bar">
      <weather></weather>
      <v-divider></v-divider>
      <!-- メニューボタン -->

      <div class="closet-menu">
        <div class="closet-menu-item">
          <v-btn text @click="coordinateFlag = !coordinateFlag" color="red darken-1"
            ><v-icon color="red darken-1">mdi-hanger</v-icon>コーデ追加</v-btn
          >
        </div>
        <!-- ユーザーの切り替え -->
        <v-menu offset-y transition="slide-y-transition" class="closet-menu-item">
          <template v-slot:activator="{ on }">
            <v-btn color="red darken-1" dark v-on="on" icon text large
              ><v-icon>mdi-account-switch</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(user, index) in users" :key="index">
              <v-list-item-title @click="changeCloset(index)">{{
                user
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <div class="closet-menu-item text-right">
          <closetSort @filter="applyFilter"></closetSort>
        </div>
      </div>

      <!-- カテゴリーごとのタブ表示 -->
      <v-tabs color="red darken-1" centered　show-arrows v-model="tab">
        <v-tab
          v-for="(category, key) in $store.getters['clothes/getCategory']"
          :key="key"
        >
          {{ category }}
        </v-tab>
      </v-tabs>
    </div>
    <clothesAbout ref="clothesAbout"></clothesAbout>

    <!-- 服 -->
    <v-tabs-items
      v-model="tab"
      class="px-2 closet-tabs-items"
      :class="[$store.state.weatherFlag == 1 ? 'true-weather' : 'false-weather']"
    >
      <v-tab-item
        v-for="(category, key) in $store.getters['clothes/getCategory']"
        :key="key"
        class=""
      >
        <v-container fluid>
          <v-row style="width: 100%" class="mx-auto">
            <v-col
              v-for="clothes in getFilteredClothes[tab]"
              :key="clothes.id"
              cols="4"
              lg="2"
              md="3"
              sm="3"
              class="pa-2 clothes"
            >
              <v-checkbox
                v-if="coordinateFlag"
                v-model="selectedCoordinate"
                :value="clothes"
                hide-details
                class="mt-0 checkbox"
                clothes
                color="red darken-1"
              ></v-checkbox>
              <v-img
                :src="clothes.url"
                :lazy-src="clothes.url"
                aspect-ratio="1"
                @click="openAbout(clothes)"
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs-items>

    <!-- コーディネートで選択した服を表示 v-bottom-sheet -->
    <div
      tabindex="-1"
      class="v-dialog__content v-dialog__content--active"
      style="z-index: 202; height: auto; bottom: 0"
      v-if="coordinateFlag"
    >
      <div
        class="v-dialog v-bottom-sheet v-bottom-sheet--inset v-dialog--active v-dialog--persistent selected-clothes"
      >
        <v-sheet class="text-center" height="70px">
          <v-row class="pa-1 mx-auto" style="max-width: 960px">
            <v-col
              cols="2"
              v-for="clothes in selectedCoordinate.slice(0, 4)"
              :key="clothes.id"
              class="pa-0 mx-1"
            >
              <v-badge
                icon="mdi-close"
                offset-x="20"
                offset-y="20"
                @click.native="selectCancel(clothes)"
                color="red darken-1"
              >
                <v-img
                  :src="clothes.url"
                  height="50px"
                  width="50px"
                  class="mx-auto"
                ></v-img>
              </v-badge>
            </v-col>
            <v-col cols="1" class="" style="position: absolute; right: 75px">
              <v-badge
                :content="selectedCoordinate.length"
                :value="selectedCoordinate.length"
                color="red darken-1"
                overlap
              >
                <coordinateAdd :data="selectedCoordinate"></coordinateAdd>
              </v-badge>
            </v-col>
          </v-row>
        </v-sheet>
      </div>
    </div>
  </v-card>
</template>

<script>
import closetSort from "~/components/closetSort.vue";
import clothesAbout from "~/components/clothesAbout.vue";
import coordinateAdd from "~/components/coordinateAdd";
import weather from "~/components/weather";
export default {
  components: {
    closetSort,
    clothesAbout,
    coordinateAdd,
    weather,
  },
  // asyncData({ store }) {
  //   store.dispatch("clothes/checkClothes");
  // },
  data() {
    return {
      tab: 0,
      active: "トップス",
      position: [0, 0, 0, 0],
      dialog: false,
      coordinateFlag: false,
      users: ["自分"],
    };
  },

  mounted() {
    this.$axios.get("/api/share/users").then((res) => {
      res.data.map((user) => {
        this.users.push(user.share_username);
      });
    });
    // イベントリスナの追加
    window.addEventListener("scroll", this.handleScroll);
  },

  destroyed() {
    // イベントリスナの削除
    window.removeEventListener("scroll", this.handleScroll);

    this.$store.commit("clothes/resetFilteredClothes");
  },
  methods: {
    openAbout(clothes) {
      this.$refs.clothesAbout.showAbout(clothes);
    },
    handleScroll() {
      // 現在アクティブなタブのスクロール位置を保持
      this.position[this.tab] = window.scrollY;
    },
    applyFilter(selectedcolor, selectedSeason, dateSort, tags) {
      console.log("色：" + selectedcolor);
      console.log("シーズン：" + selectedSeason);
      //targetDataに対してソートをかけていく
      let targetData = this.$store.getters["clothes/getClothesList"];

      //タグ検索
      if (tags.length !== 0) {
        targetData = this.tagSearch(targetData, tags);
      } else {
        console.log("タグは指定されていません");
      }

      //色フィルター
      if (selectedcolor.length !== 0) {
        targetData = this.colorFilter(targetData, selectedcolor);
      } else {
        console.log("色は指定されていません");
      }
      //シーズンフィルター
      if (selectedSeason.length !== 0) {
        targetData = this.seasonFilter(targetData, selectedSeason);
      } else {
        console.log("シーズンは指定されていません");
      }
      //日付ソート
      if (dateSort === "true") {
        targetData = targetData.map((item) => item.slice().reverse());
      }
      //フィルターをかけたデータを適用
      this.$store.commit("clothes/setFilteredClothes", targetData);
      console.log(targetData);
    },
    //タグ検索
    tagSearch(targetData, selectedTag) {
      let resultData = [];
      this.$store.getters["clothes/getCategory"].forEach((value, index) => {
        const data = targetData[index].filter((value, index) => {
          const tagList = value.tags.map((tag) => tag.name);
          if (tagList.some((tag) => selectedTag.includes(tag))) return value;
        });
        resultData.push(data);
      });
      return resultData;
    },
    //色フィルター
    colorFilter(targetData, selectedcolor) {
      let resultData = [];
      this.$store.getters["clothes/getCategory"].forEach((value, index) => {
        let data = targetData[index].filter((value, index) => {
          if (value.color === selectedcolor) return value;
        });
        resultData.push(data);
      });
      return resultData;
    },
    //シーズンフィルター
    seasonFilter(targetData, selectedSeason) {
      let resultData = [];
      this.$store.getters["clothes/getCategory"].forEach((value, index) => {
        const data = targetData[index].filter((value, index) => {
          const seasonList = value.seasons.map((season) => season.name);
          if (seasonList.some((season) => selectedSeason.includes(season))) return value;
        });
        resultData.push(data);
      });
      return resultData;
    },
    selectCancel(clothes) {
      this.$store.commit("clothes/deleteSelectedClothes", clothes);
    },
    changeCloset(user) {
      this.$store.commit("clothes/changeCloset", user);
    },
  },
  computed: {
    getClothesList() {
      return this.$store.getters["clothes/getClothesList"];
    },
    getFilteredClothes() {
      return this.$store.getters["clothes/getFilteredClothes"];
    },
    selectedCoordinate: {
      get() {
        return this.$store.getters["clothes/getSelectedClothes"];
      },
      set(value) {
        this.$store.commit("clothes/setSelectedClothes", value);
      },
    },
  },
  watch: {
    // activeの変更を検知
    tab() {
      // 切り替え後のタブですでに保持されたスクロール位置があればその位置を取得
      const y = this.position[this.tab] || 0;
      // 即時スクロールすると、切り替え前のタブの長さ ＜ 切り替え後のタブの長さである場合に、切り替え前のタブの最大値までしかスクロールされないことがある（切り替え後のタブの内容が描画される前にスクロールしようとする）ので、setTimeoutでタイミングを少しずらす
      setTimeout(() => {
        window.scroll(0, y);
      }, 100);
    },
  },
};
</script>

<style>
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
  justify-content: space-between;
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

.closet-tabs-items {
  min-height: 100vh;
  width: 100vw;
  max-width: 960px;
  margin: 0 auto;
}
.true-weather {
  margin-top: 154px;
}
.false-weather {
  margin-top: 99px;
}

.v-overlay {
  height: 100vh;
}

.clothes {
  position: relative;
  z-index: 0;
}

.clothes > .checkbox {
  position: absolute;
  top: 7px;
  right: 5px;
  z-index: 1;
}
.checkbox i {
  font-size: 30px !important;
}

.selected-clothes {
  position: fixed;
  bottom: 0;
  margin: 0;
  max-width: 960px !important;
}
</style>
