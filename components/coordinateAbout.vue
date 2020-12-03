<template>
  <v-row justify="center">
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
          <v-toolbar-title
            >コーディネートの詳細 {{ coordinate.id }}</v-toolbar-title
          >
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list three-line subheader>
          <v-list-item>
            <v-list-item-content>
              <div style="height: 460px; margin: 0 auto">
                <v-img v-if="coordinate.url" :src="coordinate.url"></v-img>
                <div v-else>
                  <vue-draggable-resizable
                    v-for="clothes in coordinate.clothes"
                    :key="clothes.id"
                    :parent="true"
                    :x="clothes.x"
                    :y="clothes.y"
                    :w="clothes.width"
                    :h="clothes.height"
                    class="coordinate-item"
                    :style="clothes.fillStyle"
                    :lock-aspect-ratio="true"
                    :resizable="false"
                    :draggable="false"
                  >
                    <v-img :src="clothes.url"></v-img>
                  </vue-draggable-resizable>
                </div>
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
                      <span v-else key="1">{{
                        selectedSeason.toString()
                      }}</span>
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
        </v-expansion-panels>

        <v-sheet class="mx-auto my-1" max-width="800">
          <v-slide-group v-model="model" active-class="success" show-arrows>
            <v-slide-item
              v-for="clothes in coordinate.clothes"
              :key="clothes.id"
            >
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

        <v-row justify="center" class="ma-4">
          <v-btn width="40%" color="grey lighten-1">削除</v-btn>
          <v-spacer></v-spacer>
          <v-btn width="40%" color="red darken-1" dark>保存</v-btn>
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
      coordinate: Object,
      selectedSeason: [],
      model: null,
    };
  },
  methods: {
    showAbout(coordinate) {
      console.log("test");
      console.log(coordinate);
      this.dialog = true;
      this.coordinate = Object.assign({}, coordinate);
      this.selectedSeason = coordinate.seasons.map((season) => season.name);
    },
  },
  mounted() {
    console.log("コーディネートアバウト表示");
  },
};
</script>

<style scoped></style>
