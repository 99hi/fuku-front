<template>
  <div style="width: 100vw">
    <v-toolbar flat height="48px" class="page-title">
      <v-toolbar-title>カレンダー</v-toolbar-title>
    </v-toolbar>

    <!-- dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">コーデ登録</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="title*"
                  required
                  v-model="register.title"
                ></v-text-field>
              </v-col>

              <v-col
                cols="6"
                sm="6"
                md="6"
                v-for="(coordination, key) in $store.getters['coordinate/getCoordinate']"
                :key="key"
                @click="select(coordination)"
              >
                <v-img
                  v-if="coordination.url"
                  :src="coordination.url"
                  :class="{ isActive: register.selected === coordination }"
                ></v-img>
                <div
                  v-else
                  style="widht: 100%; height: 100%"
                  :class="{ isActive: register.selected === coordination }"
                >
                  <vue-draggable-resizable
                    v-for="clothes in coordination.clothes"
                    :key="clothes.id"
                    :parent="true"
                    :x="clothes.x / 2"
                    :y="clothes.y / 2"
                    :w="clothes.width / 2"
                    :h="clothes.height / 2"
                    class="coordinate-item"
                    :style="clothes.fillStyle"
                    :lock-aspect-ratio="true"
                    :resizable="false"
                    :draggable="false"
                  >
                    <v-img :src="clothes.url" class="mx-auto"></v-img>
                  </vue-draggable-resizable>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"> キャンセル </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="submit"
            :disabled="!register.selected || register.title.length == 0"
          >
            登録
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- カレンダー header-->
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
    <!-- カレンダー -->
    <v-sheet height="75vh" class="mt-2 px-1" width="100vw">
      <v-calendar
        v-model="focus"
        ref="calendar"
        :events="events"
        :event-color="getEventColor"
        @change="getEvents"
        @click:event="showEvent"
        @click:date="viewDay"
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
      dialog: false,
      register: {
        title: "",
        date: "",
        selected: null,
      },
    };
  },
  asyncData({ store }) {
    store.dispatch("coordinate/coordinate");
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    getEvents() {
      const events = [
        {
          name: "発表",
          start: new Date("2021-02-05"), // 開始時刻
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
    showEvent({ event }) {
      alert(`clicked ${event.name}`);
    },
    viewDay({ date }) {
      this.register.date = date;
      this.dialog = true;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    select(coordination) {
      if (this.register.selected === null) {
        this.register.selected = coordination;
      } else if (this.register.selected.id === coordination.id) {
        this.register.selected = null;
      } else {
        this.register.selected = coordination;
      }
    },
    submit() {
      this.dialog = false;
      console.log("登録");
      console.log(this.register);
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

.isActive {
  border: 4px solid blue;
}
</style>
