<template>
<v-card style="position: relative">
  <div class="closet-top-bar">
    <v-tabs color="red darken-1" centered　show-arrows v-model="tab">
      <v-tab v-for="(category, key) in categoryList" :key="key">
        {{ category }}
      </v-tab>
    </v-tabs>
    <div class="closet-menu">
      <closetSort @changeColor="colorSort" @reset="sortReset"></closetSort>
      <v-btn @click="test">test</v-btn>
    </div>
  </div>
  <v-tabs-items v-model="tab" class="px-2 closet-tabs-items">
    <v-tab-item v-for="(category, key) in categoryList" :key="key" class="">
      <v-container fluid>
        <v-row>
          <v-col v-for="clothes in sortList[tab]" :key="clothes.id" cols="4" md="4" class="pa-2">
            <v-img :src="clothes.url" :lazy-src="clothes.url" aspect-ratio="1"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-tab-item>
  </v-tabs-items>
</v-card>
</template>

<script>
import closetSort from "~/components/closetSort.vue";
export default {
  components: {
    closetSort,
  },
  data() {
    return {
      tab: 0,
      clothesList: Object,
      sortList: Object,
      categoryList: ["トップス", "アウター", "パンツ", "シューズ"],
      active: "トップス",
      position: [0, 0, 0, 0],
      selectedColor: undefined,
    };
  },
  created() {
    this.allClothes();
  },
  mounted() {
    // イベントリスナの追加
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    // イベントリスナの削除
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    allClothes() {
      this.$axios.get("/api/clothes/get").then((res) => {
        this.clothesList = res.data;
        this.sortList = res.data;
      });
    },
    handleScroll() {
      // 現在アクティブなタブのスクロール位置を保持
      this.position[this.tab] = window.scrollY;
    },
    test() {
      console.log("test");
    },
    colorSort(selectedColor) {
      console.log("colorSort実行");
      let resultList = [];
      //const selectedColor = this.selectedColor; //filter内でthisを使えないため
      console.log(typeof selectedColor);
      this.categoryList.forEach((value, index) => {
        const result = this.clothesList[index].filter((value, index) => {
          if (value.color == selectedColor || selectedColor == undefined)
            return value;
        });
        resultList.push(result);
      });
      console.log(resultList);
      this.sortList = resultList;
    },
    sortReset() {
      this.sortList = this.clothesList;
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

<style scoped>
.closet-top-bar {
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: #fff;
  width: 100%;
}

.closet-menu {
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
  color: #e53935;
  background-color: #fff;
  border-bottom: 1px solid gainsboro;
}

.closet-tabs-items {
  margin-top: 90px;
  min-height: 100vh;
}

.v-overlay {
  height: 100vh;
}
</style>
