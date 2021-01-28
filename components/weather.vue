<template>
  <v-card height="60px" v-if="weatherList.length" class="weather-box" tile flat>
    <div class="d-flex justify-space-around align-center" style="height: 100%">
      <div class="d-flex flex-column">
        <span>{{ new Date(weatherList[0].dt * 1000).getDate() }}日</span>
        <div>{{ weatherList[0].main.temp }}℃</div>
      </div>
      <div class="d-flex flex-column align-center pt-2" v-for="n of 4" :key="n">
        <span>{{ new Date(weatherList[(n - 1) * 2].dt * 1000).getHours() }}時</span>
        <v-avatar size="35" tile>
          <!-- <v-img
            class="icon mb-2"
            :src="`/weather/${
              weatherList[(n - 1) * 2].weather[0].icon.slice(0, -1) + 'd'
            }.svg`"
          ></v-img> -->
          <v-img
            class="icon mb-2"
            :src="`https://openweathermap.org/img/wn/${
              weatherList[(n - 1) * 2].weather[0].icon.slice(0, -1) + 'd'
            }@2x.png`"
          ></v-img>
        </v-avatar>
      </div>

      <div>
        <v-btn color="#2C4B70" depressed rounded outlined>{{ weather.name }}</v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      weather: {
        name: String,
      },
      weatherList: [],
    };
  },
  methods: {
    getWeather() {
      this.$axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?APPID=${process.env.WEATHER_API_KEY}&lang=ja&units=metric&q=Ube,jp&cnt=8`
        )
        .then((res) => {
          this.weatherList = res.data.list;
          this.weather.name = res.data.city.name;
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
  filter: drop-shadow(4px 4px 4px #aaaaaa);
}
</style>
