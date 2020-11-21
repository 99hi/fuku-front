<template>
  <v-alert :type="alertOption.type" class="alert-message" dense v-if="alertFlag" transition="slide-y-transition">{{ alertOption.message }}</v-alert>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      flag: true,
      alertOption: {
        message: "",
        type: "",
      },
    };
  },
  methods: {},
  computed: {
    alertFlag() {
      return this.$store.getters.getFlag;
    },
  },
  watch: {
    alertFlag() {
      this.alertOption = this.$store.getters.getAlertOption;
      if (this.$store.getters.getFlag === false) return;
      //setTimeoutで3000ms後にアラートを閉じる;
      setTimeout(() => {
        this.$store.commit("changeFlag", false);
      }, 5000);
    },
  },
};
</script>

<style scoped>
.alert-message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translate(-50%);
  z-index: 999;
  width: 70%;
}
</style>
