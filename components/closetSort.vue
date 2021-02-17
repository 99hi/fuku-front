﻿<template>
  <div class="closet-sort">
    <v-btn text @click.stop="drawer = !drawer" color="red darken-1"
      ><v-icon color="red darken-1">mdi-tune-variant</v-icon>絞り込み</v-btn
    >

    <v-navigation-drawer
      right
      absolute
      temporary
      v-model="drawer"
      class="sort-drawer"
      width="80%"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title> 絞り込み・ソート </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-expansion-panels focusable accordion>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <template v-slot:default="{ open }">
              <v-row no-gutters>
                <v-col cols="4">タグ検索</v-col>
                <v-col cols="8" class="text--secondary">
                  <v-fade-transition leave-absolute>
                    <span v-if="open" key="0"> タグを選択 </span>
                    <span v-else key="1">{{ filterQuery.tags.toString() }}</span>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container class="px-0" fluid>
              <v-autocomplete
                v-model="filterQuery.tags"
                :items="$store.getters['tag/getClothesTag']"
                item-text="name"
                chips
                label="タグを選択してください"
                :menu-props="{ top: false, offsetY: true }"
                multiple　clearable　deletable-chips
              ></v-autocomplete>
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
                    <span v-else key="1"
                      ><span v-if="filterQuery.color.value !== ''"
                        ><v-avatar
                          class="color-tile"
                          tile
                          :color="filterQuery.color.value"
                          size="20"
                        >
                        </v-avatar
                        >{{ filterQuery.color.label }}</span
                      ></span
                    >
                  </v-fade-transition>
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container class="px-0" fluid>
              <v-radio-group v-model="filterQuery.color">
                <v-radio
                  v-for="(color, key) in colors"
                  :key="key"
                  :label="color.label"
                  :value="color"
                  ><template v-slot:label v-if="color.value !== ''"
                    ><span
                      ><v-avatar class="color-tile" tile :color="color.value" size="20">
                      </v-avatar
                      >{{ color.label }}</span
                    ></template
                  ></v-radio
                >
              </v-radio-group>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header v-slot="{ open }">
            <v-row no-gutters>
              <v-col cols="4"> シーズン </v-col>
              <v-col cols="8" class="text--secondary">
                <v-fade-transition leave-absolute>
                  <span v-if="open" key="0"> シーズンを選択 </span>
                  <span v-else key="1">
                    {{ filterQuery.season.toString() }}
                  </span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-checkbox
              v-model="filterQuery.season"
              label="春"
              color="#F06292"
              value="春"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="filterQuery.season"
              label="夏"
              color="#03A9F4"
              value="夏"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="filterQuery.season"
              label="秋"
              color="#795548"
              value="秋"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="filterQuery.season"
              label="冬"
              color="#607D8B"
              value="冬"
              hide-details
            ></v-checkbox>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            <template v-slot:default="{ open }">
              <v-row no-gutters>
                <v-col cols="4">登録日</v-col>
                <v-col cols="8" class="text--secondary">
                  <v-fade-transition leave-absolute>
                    <span v-if="open" key="0"> 並びを変更 </span>
                    <span v-else key="1">{{
                      filterQuery.dateSort === "true" ? "古い" : "新しい"
                    }}</span>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container class="px-0" fluid>
              <v-radio-group v-model="filterQuery.dateSort">
                <v-radio label="新しい" value="false"></v-radio>
                <v-radio label="古い" value="true"></v-radio>
              </v-radio-group>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <template v-slot:append>
        <div style="display: flex; justify-content: space-around" class="mb-5">
          <v-btn width="40%" ripple outlined @click="reset">リセット</v-btn>
          <v-btn width="40%" ripple outlined color="red darken-1" @click="drawer = false"
            >完了</v-btn
          >
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      colors: [
        {
          label: "選択無し",
          value: "",
        },
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
      filterQuery: {
        tags: [],
        color: {
          value: "",
        },
        season: [],
        dateSort: "false", //新しい順
      },
      selectedDate: "新しい",
      selectedFab: "すべて表示",
    };
  },
  methods: {
    reset() {
      this.filterQuery = {
        tags: [],
        color: {
          value: "",
        },
        season: [],
        dateSort: "false",
      };
    },
  },
  watch: {
    filterQuery: {
      handler(val, oldVal) {
        console.log(val);
        this.$emit("filter", val.color.value, val.season, val.dateSort, val.tags);
      },
      deep: true,
    },
  },
};
</script>

<style>
.sort-drawer {
  top: 0;
  right: 0;
  height: 100vh !important;
  max-width: 600px;
}

.closet-sort .v-overlay__scrim {
  height: 100vh;
}
</style>

<style scoped>
.color-tile {
  vertical-align: middle;
  border: 1px solid black !important;
  margin-right: 10px;
}
</style>
