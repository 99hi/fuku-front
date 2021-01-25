<template>
  <v-card>
    <div class="d-flex justify-space-around align-center">
      <div>{{ weather.name }}</div>
      <div class="title text--primary">
        {{ weather.description }}
      </div>
      <div>{{ weather.maxTemp }}℃ / {{ weather.minTemp }}℃</div>
      <v-avatar class="ma-3" size="50" tile>
        <v-img :src="`http://openweathermap.org/img/wn/${weather.icon}@2x.png`"></v-img>
      </v-avatar>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      weather: {
        name: "宇部市",
        icon: "03n",
        description: "曇り",
        maxTemp: "8",
        minTemp: "5",
      },
    };
  },
  methods: {
    getWeather() {
      this.$axios
        .get("***")
        .then((res) => {
          console.log(res.data);
          this.weather.name = res.data.city.name;
          this.weather.description = res.data.list[0].weather[0].description;
          this.weather.icon = res.data.list[0].weather[0].icon;
          this.weather.maxTemp = res.data.list[0].main.temp_max;
          this.weather.minTemp = res.data.list[0].main.temp_min;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getWeather();
  },
};
</script>

<style scoped></style>
