<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar>
          <v-btn icon @click="(dialog = false), (coordinations = [])">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>服の詳細</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon><v-icon large>mdi-delete-forever</v-icon></v-btn>
        </v-toolbar>
        <v-list three-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-img :src="clothes.url"></v-img>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-expansion-panels focusable accordion>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <template v-slot:default="{ open }">
                <v-row no-gutters>
                  <v-col cols="4">カテゴリー</v-col>
                  <v-col cols="8" class="text--secondary">
                    <v-fade-transition leave-absolute>
                      <span v-if="open" key="0"> カテゴリーを選択 </span>
                      <span v-else key="1">{{ clothes.category }}</span>
                    </v-fade-transition>
                  </v-col>
                </v-row>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container class="px-0" fluid>
                <v-radio-group v-model="clothes.category">
                  <v-radio v-for="(category, key) in categoryList" :key="key" :label="category" :value="category"></v-radio>
                </v-radio-group>
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              <template v-slot:default="{ open }">
                <v-row no-gutters>
                  <v-col cols="4">色</v-col>
                  <v-col cols="8" class="text--secondary">
                    <v-fade-transition leave-absolute>
                      <span v-if="open" key="0"> 色を選択 </span>
                      <span v-else key="1">{{ clothes.color }}</span>
                    </v-fade-transition>
                  </v-col>
                </v-row>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container class="px-0" fluid>
                <v-radio-group v-model="clothes.color">
                  <v-radio v-for="(color, key) in colors" :key="key" :label="color.label" :value="color.value"></v-radio>
                </v-radio-group>
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              <template v-slot:default="{ open }">
                <v-row no-gutters>
                  <v-col cols="4">シーズン</v-col>
                  <v-col cols="8" class="text--secondary">
                    <v-fade-transition leave-absolute>
                      <span v-if="open" key="0"> シーズンを選択 </span>
                      <span v-else key="1">{{ selectedSeason.toString() }}</span>
                    </v-fade-transition>
                  </v-col>
                </v-row>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container class="px-0" fluid>
                <v-checkbox v-model="selectedSeason" label="春" color="#F06292" value="春" hide-details></v-checkbox>
                <v-checkbox v-model="selectedSeason" label="夏" color="#03A9F4" value="夏" hide-details></v-checkbox>
                <v-checkbox v-model="selectedSeason" label="秋" color="#795548" value="秋" hide-details></v-checkbox>
                <v-checkbox v-model="selectedSeason" label="冬" color="#607D8B" value="冬" hide-details></v-checkbox>
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              <template v-slot:default="{ open }">
                <v-row no-gutters>
                  <v-col cols="4">タグ</v-col>
                  <v-col cols="8" class="text--secondary">
                    <v-fade-transition leave-absolute>
                      <span v-if="open" key="0"> タグを選択 </span>
                      <span v-else key="1">{{ selectedTag.toString() }}</span>
                    </v-fade-transition>
                  </v-col>
                </v-row>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container class="px-0" fluid>
                <v-autocomplete v-model="selectedTag" :items="tags" item-text="name" chips label="タグを選択してください" :menu-props="{ top: false, offsetY: true }" multiple　clearable　deletable-chips></v-autocomplete>
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-sheet class="mx-auto my-1" max-width="800">
          <v-slide-group v-model="model" active-class="success" show-arrows>
            <v-slide-item v-for="coordinate in coordinations.coordinations" :key="coordinate.id">
              <v-card class="ma-4" height="100" width="60">
                <v-row class="fill-height" align="center" justify="center">
                  <v-scale-transition>
                    <v-img :src="coordinate.url" contain></v-img>
                  </v-scale-transition>
                </v-row>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>

        <v-row justify="center" class="mx-4 pb-4">
          <v-btn width="40%" color="red darken-1" dark @click="update">保存</v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      clothes: Object,
      selectedSeason: [],
      selectedTag: [],
      categoryList: ["トップス", "アウター", "パンツ", "シューズ"],
      colors: [
        {
          label: "ホワイト系",
          value: "white",
        },
        {
          label: "ブラック系",
          value: "black",
        },
        {
          label: "グレイ系",
          value: "grey",
        },
        {
          label: "ブラウン系",
          value: "brown",
        },
        {
          label: "ベージュ系",
          value: "beige",
        },
        {
          label: "グリーン系",
          value: "green",
        },
        {
          label: "ブルー系",
          value: "blue",
        },
        {
          label: "パープル系",
          value: "purple",
        },
        {
          label: "イエロー系",
          value: "yellow",
        },
        {
          label: "ピンク系",
          value: "pink",
        },
        {
          label: "レッド系",
          value: "red",
        },
        {
          label: "オレンジ系",
          value: "orange",
        },
      ],
      tags: [],
      model: null,
      coordinations: [],
    };
  },
  methods: {
    showAbout(clothes) {
      this.dialog = true;
      this.clothes = Object.assign({}, clothes);
      this.selectedSeason = clothes.seasons.map((season) => season.name);
      this.selectedTag = clothes.tags.map((tag) => tag.name);
      this.getCoordinate(clothes.id);
    },
    getTags() {
      this.$axios.get("/api/tag/all").then((res) => {
        this.tags = res.data;
      });
    },
    getCoordinate(id) {
      this.$axios.get(`/api/clothes/${id}/coordinations`).then((res) => {
        console.log("ゲットコーデ");
        this.coordinations = res.data[0];
        console.log(this.coordinations);
      });
    },
    update() {
      console.log("アップデート");
      this.clothes.tags = this.selectedTag;
      this.clothes.seasons = this.selectedSeason;
      this.$store.commit("changeAlert", {
        type: "success",
        message: "アップデートしました",
      });
      this.$axios.put("/api/clothes/update/" + this.clothes.id, { data: this.clothes }).then((res) => {
        console.log(res.data);
        this.$store.dispatch("clothes/checkClothes");
      });
    },
    delete() {
      console.log("削除");
    },
    test() {},
  },
  mounted() {
    this.getTags();
  },
};
</script>

<style scoped>
.add-form {
  margin: 0 auto;
  max-width: 500px;
  width: 90%;
}

.color-sheet {
  border: 2px solid black;
}
</style>
