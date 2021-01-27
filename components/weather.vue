<template>
  <v-card height="50px" tile>
    <div class="d-flex justify-space-around align-center" style="height: 100%">
      <div class="d-flex flex-column">
        <span>{{ weather.date }}日</span>
        <span>{{ weather.hour }}時</span>
      </div>
      <div class="title text--primary">
        {{ weather.description }}
        <v-avatar size="50" tile>
          <v-img class="icon" :src="`/weather/${weather.icon}.svg`"></v-img>
        </v-avatar>
      </div>
      <div>{{ weather.temp }}℃</div>
      <div>
        <v-btn>{{ weather.name }}</v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      weather: {
        dt: Date,
        name: "宇部市",
        icon: "03d",
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
          `https://api.openweathermap.org/data/2.5/forecast?APPID=${process.env.WEATHER_API_KEY}&lang=ja&units=metric&q=Ube,jp`
        )
        .then((res) => {
          console.log(res.data);
          //unixtimeから変換
          this.weather.dt = new Date(res.data.list[0].dt * 1000);
          this.weather.date = this.weather.dt.getDate();
          this.weather.hour = this.weather.dt.getHours();
          this.weather.name = res.data.city.name;
          this.weather.description = res.data.list[0].weather[0].description;
          this.weather.icon = res.data.list[0].weather[0].icon.slice(0, -1) + "d";
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
/* .icon {
  filter: drop-shadow(4px 4px 4px #aaa);
} */
</style>
