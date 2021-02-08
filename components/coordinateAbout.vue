<template>
  <v-row justify="center">
    <v-dialog v-model="confirm" max-width="250px">
      <v-card justify="center">
        <v-card-title class="headline"></v-card-title>
        <v-row style="width: 100%">
          <v-col md="12" align="center">
            <div style="margin-left: 15px">
              <v-icon class="mr-2" large>mdi-chat-alert</v-icon>本当に削除しますか？
            </div>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            ripple
            text
            color="blue darken-1"
            :loading="loading"
            @click="
              loading = true;
              deleteCoordinate();
            "
            >はい</v-btn
          >
          <v-btn outlined ripple text @click="confirm = false">いいえ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>コーディネートの詳細</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="confirm = true"
            ><v-icon large>mdi-delete-forever</v-icon></v-btn
          >
        </v-toolbar>
        <v-list three-line subheader>
          <v-list-item>
            <v-list-item-content>
              <div>
                <v-img
                  :src="coordinate.url"
                  width="300"
                  height="400"
                  class="mx-auto"
                ></v-img>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-expansion-panels focusable accordion>
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
                <v-checkbox
                  v-model="selectedSeason"
                  label="春"
                  color="#F06292"
                  value="春"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="selectedSeason"
                  label="夏"
                  color="#03A9F4"
                  value="夏"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="selectedSeason"
                  label="秋"
                  color="#795548"
                  value="秋"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="selectedSeason"
                  label="冬"
                  color="#607D8B"
                  value="冬"
                  hide-details
                ></v-checkbox>
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
                <v-combobox
                  clearable
                  multiple
                  :items="tags"
                  item-text="name"
                  item-value="id"
                  v-model="selectedTag"
                  label="タグ付け"
                  append-icon
                  chips
                  deletable-chips
                  :search-input.sync="search"
                  @keyup.tab="updateTags"
                  @paste="updateTags"
                >
                </v-combobox>
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-sheet class="mx-auto my-1" max-width="800">
          <v-slide-group v-model="model" active-class="success" show-arrows>
            <v-slide-item v-for="clothes in coordinate.clothes" :key="clothes.id">
              <v-card class="ma-4" height="60" width="60">
                <v-row class="fill-height" align="center" justify="center">
                  <v-scale-transition>
                    <v-img :src="clothes.url" contain></v-img>
                  </v-scale-transition>
                </v-row>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>

        <v-row justify="center" class="pa-2 mt-4 mx-auto" style="width: 100vw">
          <v-btn color="red darken-1" ripple outlined @click="update">更新</v-btn>
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
      confirm: false,
      loading: false,
      coordinate: Object,
      selectedSeason: [],
      model: null,
      selectedTag: [],
      tags: [],
      search: null,
    };
  },
  methods: {
    showAbout(coordinate) {
      this.dialog = true;
      this.coordinate = Object.assign({}, coordinate);
      this.selectedSeason = coordinate.seasons.map((season) => season.name);
      this.selectedTag = coordinate.tags.map((tag) => tag.name);
    },
    getTags() {
      this.$axios.get("/api/tag/coordinations").then((res) => {
        this.tags = res.data;
      });
    },
    updateTags() {
      this.$nextTick(() => {
        this.select.push(...this.search.split(","));
        this.$nextTick(() => {
          this.search = "";
        });
      });
    },
    update() {
      this.coordinate.tags = this.selectedTag;
      this.coordinate.seasons = this.selectedSeason;

      this.$axios
        .put("/api/coordination/update/" + this.coordinate.id, { data: this.coordinate })
        .then((res) => {
          this.$store.commit("changeAlert", {
            type: "success",
            message: "更新しました",
          });
          this.$store.dispatch("coordinate/coordinate");
          this.$store.dispatch(`tag/CoordinateTag`);
        });
    },
    deleteCoordinate() {
      console.log("削除");
      this.$axios
        .delete("/api/coordination/delete/" + this.coordinate.id)
        .then((res) => {
          this.$store.dispatch("clothes/checkClothes");
          this.$store.dispatch("coordinate/coordinate");
          this.confirm = false;
          this.dialog = false;
          this.loading = false;
          this.$store.commit("changeAlert", {
            type: "success",
            message: "削除しました",
          });
        })
        .catch((error) => {
          this.confirm = false;
          this.$store.commit("changeAlert", {
            type: "error",
            message: error.message,
          });
        });
    },
  },
  mounted() {
    this.getTags();
  },
};
</script>

<style scoped>
.vdr {
  border: none;
}
</style>
