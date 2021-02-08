<template>
  <div>
    <v-btn @click="openAdd" small max-width="80px" min-height="32px"
      >選択中<v-icon>mdi-chevron-right</v-icon></v-btn
    >

    <v-container fluid>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="slide-x-transition">
        <v-card>
          <v-toolbar flat height="48px" class="page-title">
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-toolbar-title>コーディネート 追加</v-toolbar-title>
          </v-toolbar>

          <v-row justify="center" class="ma-2">
            <v-btn-toggle v-model="toggle" mandatory dense color="red darken-1">
              <v-btn> パーツで登録 </v-btn>
              <v-btn> 画像で登録 </v-btn>
            </v-btn-toggle>
          </v-row>

          <v-row justify="center" v-show="toggle === 0">
            <div class="stage" ref="parts">
              <vue-draggable-resizable
                v-for="(clothes, index) in selectedCoordinate"
                :key="clothes.id"
                :parent="true"
                :x="clothes.x ? clothes.x : 1"
                :y="clothes.y ? clothes.y : 50 * index"
                :w="clothes.w"
                :h="clothes.h"
                :draggable="true"
                :min-width="70"
                :min-height="70"
                :lock-aspect-ratio="true"
                :handles="['br']"
                :enable-native-drag="false"
                :active="index === activeIndex"
                :z="index === activeIndex ? 1 : 0"
                @resizestop="onResizstop"
                @dragstop="onDragstop"
                @activated="onActivated(index)"
                style="border: 1px"
              >
                <v-img :src="clothes.url"></v-img>

                <div>
                  <v-btn
                    data-html2canvas-ignore="true"
                    fab
                    small
                    dark
                    color="red darken-1"
                    class="control-close handle-tl handle"
                    @click="remove(clothes)"
                    ><v-icon small>mdi-close-thick</v-icon></v-btn
                  >
                </div>

                <div slot="br">
                  <v-btn fab small dark color="green" class="control-resize"
                    ><v-icon small>mdi-arrow-top-left-bottom-right-bold</v-icon></v-btn
                  >
                </div>
              </vue-draggable-resizable>
            </div>
          </v-row>
          <!-- コーデ画像 -->
          <v-row v-show="toggle === 1" justify="center">
            <croppa
              ref="croppa"
              v-model="myCroppa"
              canvas-color="transparent"
              placeholder="写真を選択してください"
              :quality="1"
              :width="300"
              :height="400"
              :accept="'image/*'"
              @file-type-mismatch="onFileTypeMismatch"
              @new-image-drawn="handleNewImage"
              @image-remove="handleImageRemove"
            ></croppa>
          </v-row>

          <v-form class="add-form">
            <v-container>
              <v-row justify="center" class="px-5">
                <v-col cols="3">
                  <v-checkbox
                    v-model="selectedSeason"
                    label="春"
                    color="#F06292"
                    value="1"
                    hide-details
                  ></v-checkbox>
                </v-col>

                <v-col cols="3">
                  <v-checkbox
                    v-model="selectedSeason"
                    label="夏"
                    color="#03A9F4"
                    value="2"
                    hide-details
                  ></v-checkbox>
                </v-col>

                <v-col cols="3">
                  <v-checkbox
                    v-model="selectedSeason"
                    label="秋"
                    color="#795548"
                    value="3"
                    hide-details
                  ></v-checkbox>
                </v-col>

                <v-col cols="3">
                  <v-checkbox
                    v-model="selectedSeason"
                    label="冬"
                    color="#607D8B"
                    value="4"
                    hide-details
                  ></v-checkbox>
                </v-col>

                <v-col cols="12">
                  <v-combobox
                    clearable
                    multiple
                    :items="tags"
                    item-text="name"
                    item-value="id"
                    v-model="selectedTags"
                    label="タグ付け"
                    append-icon
                    chips
                    deletable-chips
                    :search-input.sync="search"
                    @keyup.tab="updateTags"
                    @paste="updateTags"
                  >
                  </v-combobox>
                </v-col>
              </v-row>
            </v-container>
          </v-form>

          <v-row justify="center" v-if="toggle === 0">
            <v-btn
              ripple
              outlined
              color=" red darken-1"
              :loading="loading"
              class="mb-4"
              @click="
                loading = true;
                upload();
              "
              :disabled="selectedCoordinate.length === 0"
              >コーデ追加</v-btn
            >
          </v-row>

          <v-row justify="center" v-else>
            <v-btn
              ripple
              outlined
              color=" red darken-1"
              :loading="loading"
              class="mb-4"
              @click="
                loading = true;
                upload();
              "
              :disabled="btnDisabled === true && selectedCoordinate.length === 0"
              >コーデ追加</v-btn
            >
          </v-row>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
export default {
  props: {
    data: null,
  },
  data() {
    return {
      flag: false,
      dialog: false,
      clothesList: Object,
      activeIndex: Number,
      myCroppa: null,
      loading: false,
      toggle: undefined,
      btnDisabled: true,
      selectedSeason: [],
      upUrl: String,
      cloudinary_id: String,
      selectedTags: [],
      tags: [],
      search: null,
    };
  },
  mounted() {
    this.getTags();
  },
  methods: {
    remove(clothes) {
      console.log("削除クリック");
      this.$store.commit("clothes/deleteSelectedClothes", clothes);
    },
    async openAdd() {
      console.log("コーディネート追加が実行");
      console.log(this.data);
      this.dialog = !this.dialog;
      this.clothesList = this.data;
      this.clothesList.map((clothes, index) => {
        clothes.w = clothes.w ? clothes.w : 120;
        clothes.h = clothes.h ? clothes.h : 120;
        clothes.x = clothes.x ? clothes.x : 1;
        clothes.y = clothes.y ? clothes.y : 50 * index;
      });
      this.$store.commit("clothes/setSelectedClothes", this.clothesList);
    },
    add() {
      console.log("add");
      this.$axios.post("/api/coordination/add", this.clothesList).then((res) => {
        console.log(res.data);
        this.$store.commit("changeAlert", {
          type: "success",
          message: "コーディネートを追加しました",
        });
      });
    },
    onResizstop(left, top, width, height) {
      console.log("リサイズ");
      console.log();
      this.clothesList[this.activeIndex].x = left;
      this.clothesList[this.activeIndex].y = top;
      this.clothesList[this.activeIndex].w = width;
      this.clothesList[this.activeIndex].h = height;
      console.log(this.clothesList[this.activeIndex]);
    },
    onDragstop(left, top) {
      this.clothesList[this.activeIndex].x = left;
      this.clothesList[this.activeIndex].y = top;
      console.log(this.clothesList[this.activeIndex]);
    },
    onActivated(index) {
      console.log("アクティブ");

      this.activeIndex = index;
      console.log(this.activeIndex);
    },

    //コーデ画像
    handleNewImage() {
      this.btnDisabled = false;
    },
    handleImageRemove(file) {
      this.btnDisabled = true;
    },
    onFileTypeMismatch(file) {
      console.log("ファイルが違う");
      this.$store.commit("changeAlert", {
        type: "error",
        message: "jpg,png形式でアップして下さい",
      });
    },
    async upload() {
      if (this.clothesList.length === 0) {
        this.$store.commit("changeAlert", {
          type: "warning",
          message: "服が選択されていません",
        });
        this.loading = false;
        return;
      }
      let url;
      //パーツ又は画像のURL取得
      if (this.toggle === 0) {
        await html2canvas(this.$refs.parts, {
          useCORS: true,
          width: 300,
          height: 400,
        }).then(function (canvas) {
          url = canvas.toDataURL();
        });
      } else if (this.toggle === 1) {
        url = this.myCroppa.generateDataUrl();
      }

      // cloudinary アップロード
      await this.$cloudinary
        .upload(url, {
          upload_preset: process.env.CLOUDINARY_UPLOADPRESET,
        })
        .then((res) => {
          console.log("Success!!");
          console.log(res);
          this.upUrl = res.secure_url;
          this.cloudinary_id = res.public_id;
          this.myCroppa.refresh();

          this.loading = false;
        });
      //データベース追加
      console.log("データベース追加");
      this.$axios
        .post("/api/coordination/add", {
          url: this.upUrl ? this.upUrl : null,
          cloudinary_id: this.cloudinary_id ? this.cloudinary_id : null,
          clothesList: this.selectedCoordinate,
          seasons: this.selectedSeason ? this.selectedSeason : null,
          tags: this.selectedTags ? this.selectedTags : null,
        })
        .then((res) => {
          //設定のリセット
          console.log(res.data);
          this.selectedSeason = [];
          this.loading = false;
          this.$store.commit("changeAlert", {
            type: "success",
            message: "アップロードしました",
          });
          this.$store.commit("clothes/setSelectedClothes", []);
          this.$router.push("/coordinate");
        })
        .catch((e) => {
          console.log("エラー" + e);
        });
    },
    getTags() {
      this.$axios.get("/api/tag/coordinations").then((res) => {
        this.tags = res.data;
      });
    },
    // タグ入力用
    updateTags() {
      this.$nextTick(() => {
        this.select.push(...this.search.split(","));
        this.$nextTick(() => {
          this.search = "";
        });
      });
    },
  },
  computed: {
    selectedCoordinate: {
      get() {
        return this.$store.getters["clothes/getSelectedClothes"];
      },
      set(value) {
        this.$store.commit("clothes/setSelectedClothes", value);
      },
    },
  },
};
</script>

<style scoped>
ul {
  -webkit-column-count: 2;
  -moz-column-count: 2;
  column-count: 2;
}
.page-title {
  border-bottom: 1px solid gainsboro;
}
.stage {
  width: 300px;
  height: 400px;
  background-color: #f0f0f0;
}
.stage > .coordinate-item {
  border: 1px solid black;
}

.center {
  text-align: center;
}

.control-close {
  width: 20px;
  height: 20px;
  z-index: 1;
  margin-left: -5px;
  margin-top: -5px;
}

.control-resize {
  width: 20px;
  height: 20px;
  z-index: 5;
  margin-left: -5px;
  margin-top: -20px;
}

.add-form {
  margin: 0 auto;
  max-width: 500px;
  width: 90%;
}
/* 
.html2canvas-container {
  width: 300px !important;
  height: 400px !important;
} */
</style>
