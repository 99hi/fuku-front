<template>
  <div class="tagList">
    <v-toolbar flat height="48px" class="page-title">
      <v-btn icon @click="clickback">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title class="d-flex text-center">{{ type }} タグ</v-toolbar-title>
    </v-toolbar>

    <!-- 確認ダイアログ -->
    <v-dialog v-model="confirm" max-width="250px">
      <v-card justify="center">
        <v-card-title class="headline"
          ><v-icon class="mr-2" large>mdi-chat-alert</v-icon></v-card-title
        >
        <v-row style="width: 100%">
          <v-col md="12" align="center">
            <div style="margin-left: 15px">{{ selectedTag }} を<br />削除しますか？</div>
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
              deleteTag();
            "
            >はい</v-btn
          >
          <v-btn outlined ripple text @click="confirm = false">いいえ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-list width="100vw">
      <v-list-item v-for="item in $store.getters[`tag/get${type}Tag`]" :key="item">
        <v-list-item-content>
          <v-list-item-title v-text="item" class="pl-4"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn
            icon
            @click="
              confirm = true;
              selectedTag = item;
            "
            ><v-icon large>mdi-delete-forever</v-icon></v-btn
          >
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    type: null,
  },
  data() {
    return {
      confirm: false,
      selectedTag: null,
      loading: false,
    };
  },
  methods: {
    clickback() {
      this.$emit("clickback");
    },
    deleteTag() {
      console.log("削除");
      this.$axios
        .delete("/api/tag", {
          params: {
            name: this.selectedTag,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.$store.dispatch(`tag/${this.type}Tag`);
          this.$store.dispatch("clothes/checkClothes");
          this.$store.commit("changeAlert", {
            type: res.data.type,
            message: res.data.message,
          });
          this.loading = false;
          this.confirm = false;
        });
    },
  },
};
</script>

<style scoped>
.page-title {
  border-bottom: 1px solid gainsboro;
}

.tagList {
  position: fixed;
  background-color: white;
  z-index: 5;
  height: 100vh;
}
</style>
