<template>
  <div>
    <v-toolbar flat height="48px" class="page-title">
      <v-toolbar-title>追加</v-toolbar-title>
    </v-toolbar>

    <div class="select-photo">
      <croppa
        ref="croppa"
        v-model="myCroppa"
        canvas-color="transparent"
        placeholder="写真を選択してください"
        :quality="1"
        :width="300"
        :height="300"
        :accept="'image/*'"
        @file-type-mismatch="onFileTypeMismatch"
        @new-image-drawn="handleNewImage"
        @image-remove="handleImageRemove"
      ></croppa>

      <br />
      <img
        ref="resizeImg"
        class="output"
        :src="imgUrl"
        width="0"
        height="0"
        @load="upload($event.target.files)"
      />
    </div>

    <v-form class="add-form">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-select
              v-model="selectedCategory"
              :items="$store.getters['clothes/getCategory']"
              label="カテゴリ"
              dense
              prepend
              required
              color
            ></v-select>
          </v-col>

          <v-col cols="12">
            <v-select
              v-model="selectedColor"
              :items="colors"
              item-text="label"
              label="色"
              dense
              prepend
              required
            ></v-select>
          </v-col>

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
              :items="$store.getters['tag/getClothesTag']"
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
        <v-col cols="12" style="text-align: center" class="mb-5">
          <v-btn
            ripple
            outlined
            :loading="loading"
            :disabled="btnDisabled"
            color=" red darken-1"
            @click="generateImage(), (loading = true)"
            >アップロード</v-btn
          >
        </v-col>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myCroppa: null,
      imgUrl: "",
      selectedCategory: "トップス",
      selectedColor: "",
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
      selectedSeason: [],
      selectedTags: [],
      search: null,
      loading: false,
      btnDisabled: true,
    };
  },
  methods: {
    // タグ入力用
    updateTags() {
      this.$nextTick(() => {
        this.select.push(...this.search.split(","));
        this.$nextTick(() => {
          this.search = "";
        });
      });
    },
    handleNewImage(file) {
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
    generateImage() {
      let url = this.myCroppa.generateDataUrl();
      if (!url) {
        alert("no image");
        return;
      }
      this.imgUrl = url;
    },

    upload() {
      //画像のアップロード
      this.$cloudinary
        .upload(this.$refs.resizeImg.src, {
          upload_preset: process.env.CLOUDINARY_UPLOADPRESET,
        })
        .then((res) => {
          console.log("Success!!");
          console.log(res);
          this.$refs.resizeImg.src = "";
          this.myCroppa.refresh();
          this.btnDisabled = true;
          this.$store.commit("changeAlert", {
            type: "success",
            message: "アップロードしました",
          });
          this.loading = false;

          //データベース追加
          this.$axios
            .post("/api/clothes/add", {
              url: res.secure_url,
              category: this.selectedCategory,
              color: this.selectedColor ? this.selectedColor : null,
              cloudinary_id: res.public_id,
              seasons: this.selectedSeason ? this.selectedSeason : null,
              tags: this.selectedTags ? this.selectedTags : null,
            })
            .then((res) => {
              //設定のリセット
              console.log(res.data);
              this.selectedColor = "";
              this.selectedSeason = [];
              this.selectedTags = [];
              this.$store.dispatch("clothes/checkClothes");
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.page-title {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid gainsboro;
}

.select-photo {
  padding: 5px;
  text-align: center;
}

.add-form {
  margin: 0 auto;
  max-width: 500px;
  width: 90%;
}
</style>
