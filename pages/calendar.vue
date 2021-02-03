<template>
  <div style="width: 100vw">
    <v-toolbar flat height="48px" class="page-title">
      <v-toolbar-title>カレンダー</v-toolbar-title>
    </v-toolbar>
    <v-sheet
      tile
      height="6vh"
      color="grey lighten-3"
      class="d-flex align-center mt-2 calendar"
    >
      <v-toolbar flat>
        <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
          今日
        </v-btn>
        <v-btn fab text small color="grey darken-2" @click="prev">
          <v-icon small> mdi-chevron-left </v-icon>
        </v-btn>
        <v-btn fab text small color="grey darken-2" @click="next">
          <v-icon small> mdi-chevron-right </v-icon>
        </v-btn>
        <v-toolbar-title v-if="$refs.calendar">
          {{ $refs.calendar.title }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </v-sheet>
    <v-sheet height="75vh" class="mt-2 px-1" width="100vw">
      <v-calendar
        v-model="focus"
        ref="calendar"
        :events="events"
        :event-color="getEventColor"
        @change="getEvents"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      focus: "",
      events: [],
    };
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    getEvents() {
      const events = [
        {
          name: "発表",
          start: new Date("2021-02-05T01:00:00"), // 開始時刻
          end: new Date("2020-08-03T02:00:00"), // 終了時刻
          color: "blue",
          timed: false, // 終日ならfalse
        },
      ];
      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
  },
};
</script>

<style scoped>
.page-title {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid gainsboro;
}
</style>
