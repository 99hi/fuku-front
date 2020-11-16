﻿<template>
<div style="cursor: pointer" class="closet-sort">
  <div @click.stop="drawer = !drawer">
    <v-icon color="red darken-1">mdi-tune-variant</v-icon>絞り込み
  </div>

  <v-navigation-drawer right absolute temporary v-model="drawer" class="sort-drawer" width="80%">
    <!--
    <v-list-item class="sort-drawer-list"> </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item-group v-model="listModel">
        <v-list-item>
          <v-list-item-content class="sort-drawer-list-content">
            <v-list-item-title>検索</v-list-item-title>
            <v-text-field v-model="searchWord" clearable outlined dense></v-text-field>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content class="sort-drawer-list-content">
            <v-list-item-title>色</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action class="sort-drawer-list-content-text">
            <v-list-item-action-text>指定しない ></v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>

        <v-list-item>
          <v-list-item-content class="sort-drawer-list-content">
            <v-list-item-title>シーズン</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action class="sort-drawer-list-content-text">
            <v-list-item-action-text>指定しない ></v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>

        <v-list-item>
          <v-list-item-content class="sort-drawer-list-content">
            <v-list-item-title>登録日</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action class="sort-drawer-list-content-text">
            <v-list-item-action-text>新しい ></v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>

        <v-list-item>
          <v-list-item-content class="sort-drawer-list-content">
            <v-list-item-title>お気に入り</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action class="sort-drawer-list-content-text">
            <v-list-item-action-text>指定なし ></v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    -->
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
              <v-col cols="4">色</v-col>
              <v-col cols="8" class="text--secondary">
                <v-fade-transition leave-absolute>
                  <span v-if="open" key="0"> 色を選択 </span>
                  <span v-else key="1">{{ selectedColor.label }}</span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container class="px-0" fluid>
            <v-radio-group v-model="selectedColor">
              <v-radio v-for="(color, key) in colors" :key="key" @click="changeColor" :label="color.label" :value="color"></v-radio>
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
                  {{ selectedSeason.toString() }}
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-checkbox v-model="selectedSeason" label="春" color="#F06292" value="春" hide-details></v-checkbox>
          <v-checkbox v-model="selectedSeason" label="夏" color="#03A9F4" value="夏" hide-details></v-checkbox>
          <v-checkbox v-model="selectedSeason" label="秋" color="#795548" value="秋" hide-details></v-checkbox>
          <v-checkbox v-model="selectedSeason" label="冬" color="#607D8B" value="冬" hide-details></v-checkbox>
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
                  <span v-else key="1">{{ selectedDate }}</span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container class="px-0" fluid>
            <v-radio-group v-model="selectedDate">
              <v-radio label="新しい" value="新しい"></v-radio>
              <v-radio label="古い" value="古い"></v-radio>
            </v-radio-group>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          <template v-slot:default="{ open }">
            <v-row no-gutters>
              <v-col cols="4">お気に入り</v-col>
              <v-col cols="8" class="text--secondary">
                <v-fade-transition leave-absolute>
                  <span v-if="open" key="0"> </span>
                  <span v-else key="1">{{ selectedFab }}</span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container class="px-0" fluid>
            <v-radio-group v-model="selectedFab">
              <v-radio label="お気に入りのみ" value="お気に入りのみ"></v-radio>
              <v-radio label="すべて表示" value="すべて表示"></v-radio>
            </v-radio-group>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <template v-slot:append>
      <div style="display: flex; justify-content: space-around" class="mb-5">
        <v-btn width="40%" color="grey lighten-1" @click="reset">リセット</v-btn>
        <v-btn width="40%" color="red darken-1" dark @click="drawer = false">完了</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</div>
</template>

<script>
export default {
  data() {
    return {
      listModel: false,
      drawer: null,
      searchWord: null,

      date: null,
      trip: {
        name: "",
        location: null,
        start: null,
        end: null,
      },
      selectedColor: Object,
      colors: [{
          label: "選択無し",
          value: undefined,
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
      selectedSeason: [],
      selectedDate: "新しい",
      selectedFab: "すべて表示",
    };
  },
  methods: {
    changeColor() {
      this.$emit("changeColor", this.selectedColor.value);
    },
    reset() {
      this.selectedColor = new Object();
      this.$emit("reset");
    },
  },
};
</script>

<style>
.sort-drawer {
  top: 0;
  right: 0;
  height: 100vh !important;
}

.closet-sort .v-overlay__scrim {
  height: 100vh;
}
</style>
