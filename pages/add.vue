<template>
<div>
  <v-toolbar flat height="48px" class="page-title">
    <v-toolbar-title>追加</v-toolbar-title>
  </v-toolbar>

  <alert ref="alert"></alert>

  <div class="select-photo">
    <croppa ref="croppa" v-model="myCroppa" canvas-color="transparent" placeholder="写真を選択してください" :width="300" :height="300" :accept="'image/*'" @file-type-mismatch="onFileTypeMismatch" @new-image-drawn="handleNewImage" @image-remove="handleImageRemove"></croppa>

    <br />
    <img ref="resizeImg" class="output" :src="imgUrl" width="0" height="0" @load="upload($event.target.files)" />
  </div>

  <v-form class="add-form">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-select v-model="selectedCategory" :items="category" label="カテゴリ" dense prepend required color><span class="test"></span></v-select>
        </v-col>

        <v-col cols="12">
          <v-select v-model="selectedColor" :items="colors" item-text="label" :color="selectedColor" label="色" dense prepend required></v-select>
        </v-col>

        <v-col cols="12">
          <v-combobox hint="例： ニット、長袖" clearable multiple v-model="tags" label="タグ付け" append-icon chips deletable-chips :search-input.sync="search" @keyup.tab="updateTags" @paste="updateTags">
          </v-combobox>
        </v-col>
      </v-row>
      <v-col cols="12" style="text-align: center">
        <v-btn ripple outlined :loading="loading" :disabled="btnDisabled" color=" red darken-1" @click="generateImage(), loading = true">アップロード</v-btn>
      </v-col>
    </v-container>
  </v-form>
</div>
</template>

<script>
import axios from "axios";
import alert from "~/components/alert.vue"

export default {
  components: {
    alert
  },
  data() {
    return {
      upUrl: "",
      publicId: "",
      cloudinary: {
        uploadPreset: "jewdflmy",
        apiKey: "941772686544593",
        cloudName: "clothes-hi",
      },
      myCroppa: null,
      imgUrl: "",
      category: ['トップス', 'アウター', 'パンツ', 'シューズ'],
      selectedCategory: "トップス",
      selectedColor: "",
      colors: [{
          label: "ホワイト系",
          value: "grey lighten-4"
        },
        {
          label: "ブラック系",
          value: "black"
        },
        {
          label: "グレイ系",
          value: "grey"
        },
        {
          label: "ブラウン系",
          value: "brown"
        },
        {
          label: "ベージュ系",
          value: "beige"
        },
        {
          label: "グリーン系",
          value: "green"
        },
        {
          label: "ブルー系",
          value: "blue"
        },
        {
          label: "パープル系",
          value: "purple"
        },
        {
          label: "イエロー系",
          value: "yellow"
        },
        {
          label: "ピンク系",
          value: "pink"
        },
        {
          label: "レッド系",
          value: "red"
        },
        {
          label: "オレンジ系",
          value: "orange"
        },
      ],
      search: "",
      tags: [],
      loading: false,
      btnDisabled: true
    };
  },
  computed: {
    clUrl: function () {
      return `https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/upload`;
    },
  },
  methods: {
    updateTags() {
      this.$nextTick(() => {
        this.select.push(...this.search.split(","));
        this.$nextTick(() => {
          this.search = "";
        });
      });
    },
    handleNewImage(file) {
      this.btnDisabled = false
    },
    handleImageRemove(file) {
      this.btnDisabled = true
    },
    onFileTypeMismatch(file) {
      console.log("ファイルが違う")
      this.$refs.alert.show("error", "jpg,png形式でアップして下さい")
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
      //画像の設定
      const formData = new FormData();
      formData.append("file", this.$refs.resizeImg.src);
      formData.append("upload_preset", this.cloudinary.uploadPreset);

      //画像のアップロード
      axios.post(this.clUrl, formData).then((res) => {
        console.log("Success!!");
        console.log(res.data)
        this.$refs.resizeImg.src = ""
        this.myCroppa.refresh();
        this.btnDisabled = true
        this.upUrl = res.data.secure_url;
        this.publicId = res.data.public_id;
        this.$refs.alert.show("success", "アップロードしました")
        this.loading = false

        //データベース追加
        /*
        axios
          .post("/api/photo/add", {
            url: this.upUrl,
            public_id: this.publicId,
          })
          .then((res) => {
            console.log(res.data);
          });
          */
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
