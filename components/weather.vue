<template>
  <v-card height="60px" tile>
    <div class="d-flex justify-space-around align-center" style="height: 100%">
      <div>{{ weather.name }}</div>
      <div class="title text--primary">
        {{ weather.description }}
      </div>
      <div>{{ weather.maxTemp }}℃ / {{ weather.minTemp }}℃</div>
      <v-avatar class="ma-3" size="50" tile>
        <v-img
          class="icon"
          :src="`http://openweathermap.org/img/wn/${weather.icon}@2x.png`"
        ></v-img>
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
        temp: "6",
      },
    };
  },
  methods: {
    getWeather() {
      this.$axios
        .get(
          `http://api.openweathermap.org/data/2.5/forecast?APPID=${process.env.WEATHER_API_KEY}&lang=ja&units=metric&q=Ube,jp`
        )
        .then((res) => {
          console.log(res.data);
          this.weather.name = res.data.city.name;
          this.weather.description = res.data.list[0].weather[0].description;
          this.weather.icon = res.data.list[0].weather[0].icon;
          this.weather.maxTemp = res.data.list[0].main.temp_max;
          this.weather.minTemp = res.data.list[0].main.temp_min;
          this.weather.temp = res.data.list[0].main.temp;
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

<style scoped>
.icon {
  filter: drop-shadow(4px 4px 4px #aaa);
}
</style>
