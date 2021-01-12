<template>
  <div>
    <v-btn @click="socialLogin('google')">
      <v-icon>mdi-google</v-icon>
      ログイン
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    socialLogin(service) {
      window.location.href = `${process.env.baseUrl}auth/login/${service}`;
    },
  },
};
</script>
