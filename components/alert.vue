<template>
<v-alert :type="type" class="alert-message" dense v-if="flag">{{ message }}</v-alert>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      message: String,
      type: String
    }
  },

  methods: {
    show(type, message) {
      this.type = type
      this.message = message
      this.flag = true;
      // setTimeoutで3000ms後にflagをfalseにする
      setTimeout(() => {
        this.flag = false;
      }, 5000);
    }
  }
}
</script>

<style scoped>
.alert-message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translate(-50%);
  z-index: 20;
  width: 70%;
}
</style>
