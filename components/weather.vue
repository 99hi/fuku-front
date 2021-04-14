<template>
  <v-card
    height="60px"
    v-if="$store.state.weatherFlag === 1 && weatherResult.length"
    class="weather-box"
    tile
    flat
  >
    <div class="d-flex justify-space-around align-center" style="height: 100%">
      <div class="d-flex flex-column">
        <span>{{ new Date(weatherResult[0].dt * 1000).getDate() }}日</span>
        <div>{{ weatherResult[0].main.temp }}℃</div>
      </div>
      <div class="d-flex flex-column align-center pt-2" v-for="n of 4" :key="n">
        <span>{{ new Date(weatherResult[(n - 1) * 2].dt * 1000).getHours() }}時</span>
        <v-avatar size="35" tile>
          <v-img
            class="icon mb-2"
            :src="`https://openweathermap.org/img/wn/${
              weatherResult[(n - 1) * 2].weather[0].icon.slice(0, -1) + 'd'
            }@2x.png`"
          ></v-img>
        </v-avatar>
      </div>

      <div>
        <v-btn color="#2C4B70" depressed rounded outlined @click.stop="area = true">{{
          $store.state.weatherArea.city
        }}</v-btn>

        <v-dialog v-model="area" fullscreen hide-overlay transition="slide-x-transition">
          <weatherArea @clickBack="area = false"></weatherArea>
        </v-dialog>
      </div>
    </div>
  </v-card>
</template>

<script>
import weatherArea from "~/components/weatherArea.vue";
export default {
  components: {
    weatherArea,
  },
  data() {
    return {
      area: false,
      weatherResult: [],
    };
  },
  methods: {
    getWeather() {
      this.$axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?APPID=${process.env.WEATHER_API_KEY}&lang=ja&units=metric&q=${this.$store.state.weatherArea.romaji},jp&cnt=8`
        )
        .then((res) => {
          this.weatherResult = res.data.list;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    if (this.$store.state.weatherFlag === 1) {
      this.getWeather();
    }
  },
  computed: {
    areaWatch() {
      return this.$store.getters["getArea"];
    },
  },
  watch: {
    areaWatch() {
      this.getWeather();
    },
  },
};
</script>

<style scoped>
.weather-box {
  margin: 0 auto;
  max-width: 960px;
}

.icon {
  filter: drop-shadow(4px 4px 4px #aaaaaa);
}
</style>
