<template>
  <div>
    ログインテスト
    <v-btn @click="login">LINEログイン</v-btn>
    <div v-if="show">{{ $store.getters["test"] }}</div>
    <v-btn @click="change">変更</v-btn>
    <div class="mt-10">{{ $store.getters["getAlertOption"] }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      show: false,
      message: "",
    };
  },
  methods: {
    async register() {
      try {
        await this.axios.post("/auth/register", this.form);
      } catch (e) {
        console.log(e);
      }
    },
    login() {
      axios.get("/api/login/line").then((res) => {
        console.log(res.data);
      });
    },
    change() {
      this.$store.commit("changeAlert", { type: "success", message: "更新しました" });
    },
  },
};
</script>
