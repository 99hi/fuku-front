<template>
  <div class="calendar">
    <v-toolbar flat height="48px" class="page-title">
      <v-toolbar-title>カレンダー</v-toolbar-title>
    </v-toolbar>

    <!-- coordinate dialog -->
    <v-dialog v-model="coodinateDialog" max-width="600px" style="height: 80vh">
      <v-card v-if="showCoordinate" height="100%">
        <v-card-title>
          <span class="headline">{{ showCoordinate.name }} </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row justify="center" align="center">
              <v-col cols="12" v-if="showCoordinate.coordination" style="height: 100%">
                <v-img :src="showCoordinate.coordination.url"></v-img>
              </v-col>
            </v-row>
            <span>{{ showCoordinate.start }}</span>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" outlined ripple text @click="eventDelete">
            削除
          </v-btn>
          <v-btn
            outlined
            ripple
            text
            @click="
              coodinateDialog = false;
              showCoordinate = null;
            "
          >
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">コーデ登録</span>
        </v-card-title>
        <v-card-subtitle class="text-right">{{ register.start }}</v-card-subtitle>
        <v-card-text>
          <v-flex>
            <v-row justify="center" align="center"
              ><v-col cols="7" align-self="center">
                <v-text-field
                  label="タイトル (必須)"
                  required
                  v-model="register.name"
                ></v-text-field>
              </v-col>
              <v-col cols="5" align-self="center" class="color"
                ><v-select
                  v-model="register.color"
                  :items="colors"
                  item-text="label"
                  label="色"
                  dense
                  prepend
                  required
                ></v-select></v-col
            ></v-row>
            <v-row class="select-coordinate">
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
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            outlined
            ripple
            text
            @click="submit"
            :disabled="!register.selected || register.name.length == 0"
          >
            登録
          </v-btn>
          <v-btn text outlined ripple @click="dialog = false"> 閉じる </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- カレンダー header-->
    <v-sheet
      tile
      height="6vh"
      color="grey lighten-3"
      class="d-flex align-center mt-2"
      max-width="960px"
      width="100vw"
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
    <v-sheet height="75vh" class="mt-2 px-1" max-width="960px" width="100vw">
      <v-calendar
        v-model="focus"
        ref="calendar"
        :events="$store.getters['calendar/getEvents']"
        :event-color="getEventColor"
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
      dialog: false,
      coodinateDialog: false,
      showCoordinate: null,
      register: {
        name: "コーデ",
        start: "",
        selected: null,
        color: "blue",
      },
      colors: [
        {
          label: "グレイ系",
          value: "grey",
        },
        {
          label: "ブラウン系",
          value: "brown",
        },
        {
          label: "ベージュ系",
          value: "beige",
        },
        {
          label: "グリーン系",
          value: "green",
        },
        {
          label: "ブルー系",
          value: "blue",
        },
        {
          label: "パープル系",
          value: "purple",
        },
        {
          label: "イエロー系",
          value: "yellow",
        },
        {
          label: "ピンク系",
          value: "pink",
        },
        {
          label: "レッド系",
          value: "red",
        },
        {
          label: "オレンジ系",
          value: "orange",
        },
      ],
    };
  },
  asyncData({ store }) {
    store.dispatch("calendar/calendar");
  },
  created() {
    this.$store.dispatch("coordinate/coordinate");
  },
  methods: {
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    showEvent({ event }) {
      console.log(event);
      this.showCoordinate = event;
      this.coodinateDialog = true;
    },
    viewDay({ date }) {
      this.register.start = date;
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
      this.$axios.post("/api/calendar", this.register).then((res) => {
        console.log("res", res.data);
        this.$store.dispatch("calendar/calendar");
        this.$store.commit("changeAlert", {
          type: "success",
          message: "登録しました",
        });
        this.register = {
          name: "コーデ",
          start: "",
          selected: null,
          color: "blue",
        };
      });
    },
    eventDelete() {
      console.log(this.showCoordinate.id);
      this.$axios
        .delete("/api/calendar", {
          params: {
            id: this.showCoordinate.id,
          },
        })
        .then((res) => {
          console.log("delete", res.data);
          this.$store.dispatch("calendar/calendar");
          this.$store.commit("changeAlert", {
            type: "success",
            message: "削除しました",
          });
          this.coodinateDialog = false;
          this.showCoordinate = null;
        });
    },
  },
};
</script>

<style scoped>
.calendar {
  width: 100%;
  max-width: 960px;
}
.page-title {
  width: 100vw;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid gainsboro;
}

.isActive {
  border: 4px solid #2196f3;
}

.select-coordinate {
  height: 50vh;
  overflow: auto;
}
</style>

<style>
.color .v-text-field__details {
  display: none !important;
}
</style>
