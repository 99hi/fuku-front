<template>
  <div>
    <v-btn @click="openAdd" small max-width="80px" min-height="32px">選択中<v-icon>mdi-chevron-right</v-icon></v-btn>

    <v-container fluid>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar>
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>コーディネートの追加</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-row justify="center" class="ma-2">
            <v-btn-toggle v-model="toggle" mandatory dense color="red darken-1">
              <v-btn> パーツで登録 </v-btn>
              <v-btn> 画像で登録 </v-btn>
            </v-btn-toggle>
          </v-row>

          <v-row justify="center" v-show="toggle === 0">
            <div class="stage">
              <vue-draggable-resizable
                v-for="(clothes, index) in clothesList"
                :key="clothes.id"
                :parent="true"
                :x="clothes.x ? clothes.x : 1"
                :y="clothes.y ? clothes.y : 50 * index"
                :w="clothes.w"
                :h="clothes.h"
                :draggable="clothes.draggable"
                class="item"
                :style="clothes.fillStyle"
                :min-width="70"
                :min-height="70"
                :lock-aspect-ratio="true"
                @resizestop="onResizstop"
                @dragstop="onDragstop"
                @activated="onActivated(index)"
              >
                <v-img :src="clothes.url"></v-img>
              </vue-draggable-resizable>
            </div>
          </v-row>
          <!-- コーデ画像 -->
          <v-row v-show="toggle === 1" justify="center">
            <croppa ref="croppa" v-model="myCroppa" canvas-color="transparent" placeholder="写真を選択してください" :quality="1" :width="300" :height="400" :accept="'image/*'" @file-type-mismatch="onFileTypeMismatch" @new-image-drawn="handleNewImage" @image-remove="handleImageRemove"></croppa>
          </v-row>

          <v-row justify="center" class="px-5">
            <v-col cols="3">
              <v-checkbox v-model="selectedSeason" label="春" color="#F06292" value="1" hide-details></v-checkbox>
            </v-col>

            <v-col cols="3">
              <v-checkbox v-model="selectedSeason" label="夏" color="#03A9F4" value="2" hide-details></v-checkbox>
            </v-col>

            <v-col cols="3">
              <v-checkbox v-model="selectedSeason" label="秋" color="#795548" value="3" hide-details></v-checkbox>
            </v-col>

            <v-col cols="3">
              <v-checkbox v-model="selectedSeason" label="冬" color="#607D8B" value="4" hide-details></v-checkbox>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-btn class="mt-4" @click="upload(), (loading = true)" :loading="loading" :disabled="btnDisabled === true && toggle === 1">コーデ追加</v-btn>
          </v-row>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
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
    };
  },
  methods: {
    openAdd() {
      console.log("コーディネート追加が実行");
      this.dialog = !this.dialog;
      this.clothesList = this.data;
      this.clothesList.map((clothes, index) => {
        clothes.w = 120;
        clothes.h = 120;
        clothes.x = 1;
        clothes.y = 50 * index;
      });
    },
    add() {
      console.log("add");
      this.$axios.post("/api/coordination/add", this.clothesList).then((res) => {
        console.log(res.data);
        this.$store.commit("changeAlert", { type: "success", message: "コーディネートを追加しました" });
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
      this.$store.commit("changeAlert", { type: "error", message: "jpg,png形式でアップして下さい" });
    },
    async upload() {
      console.log("アップロード");
      let url = this.myCroppa.generateDataUrl();
      console.log(url);
      const formData = new FormData();
      formData.append("file", url);
      formData.append("upload_preset", process.env.CLOUDINARY_UPLOADPRESET);
      //画像のアップロード
      if (url) {
        console.log("cloudinary画像アップ");
        await this.$axios.post(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUDNAME}/upload`, formData).then((res) => {
          console.log("Success!!");
          console.log(res.data);
          this.upUrl = res.data.secure_url;
          this.cloudinary_id = res.data.public_id;
          this.myCroppa.refresh();
          this.$store.commit("changeAlert", { type: "success", message: "アップロードしました" });
          this.loading = false;
        });
      }
      //データベース追加
      console.log("データベース追加");
      this.$axios
        .post("/api/coordination/add", {
          url: this.upUrl ? this.upUrl : null,
          cloudinary_id: this.cloudinary_id ? this.cloudinary_id : null,
          clothesList: this.clothesList,
          seasons: this.selectedSeason ? this.selectedSeason : null,
        })
        .then((res) => {
          //設定のリセット
          console.log(res.data);
          this.selectedSeason = [];
          this.loading = false;
        })
        .catch((e) => {
          console.log("エラー" + e);
        });
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
</style>
