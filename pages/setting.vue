<template>
  <div class="setting">
    <v-toolbar flat height="48px" class="page-title">
      <v-toolbar-title>設定</v-toolbar-title>
    </v-toolbar>

    <!-- 確認ダイアログ -->
    <v-dialog v-model="confirm" max-width="250px">
      <v-card justify="center">
        <v-card-title class="headline"></v-card-title>
        <v-row style="width: 100%">
          <v-col md="12" align="center">
            <div style="margin-left: 15px">
              <v-icon class="mr-2" large>mdi-chat-alert</v-icon>本当に削除しますか？
            </div>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined ripple text color="blue darken-1" @click="deleteShareCloset"
            >はい</v-btn
          >
          <v-btn outlined ripple text @click="confirm = false">いいえ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- profile -->
    <v-row class="profile">
      <v-avatar height="100px" width="100px">
        <img :src="$store.state.auth.user.picture" />
      </v-avatar>
    </v-row>

    <v-row style="width: 100%" justify="center" class="title mx-auto">{{
      $store.state.auth.user.name
    }}</v-row>

    <!-- マイクローゼット -->
    <v-row justify="center" class="my-3 mx-auto">
      <v-card shaped elevation="2" class="closet">
        <v-card-text>
          <div>MY CLOSET</div>
          <v-row class="flex-column season">
            <v-btn-toggle
              v-model="season"
              dense
              tile
              color="primary"
              multiple
              style="flex-direction: column"
            >
              <v-btn text color="#F06292" value="春">春</v-btn>
              <v-btn text color="#03A9F4" value="夏">夏</v-btn>
              <v-btn text color="#795548" value="秋">秋</v-btn>
              <v-btn text color="#607D8B" value="冬">冬</v-btn>
            </v-btn-toggle>
          </v-row>
          <v-row
            class="text-right mr-5 closet-row"
            justify="end"
            align-content="center"
            align="center"
            v-for="(item, idnex) in count"
            :key="idnex"
          >
            <v-col cols="3" elevation="0" class="category">
              <div class="icon">
                <v-img :src="`/closet/${idnex}.svg`"></v-img>
              </div>
            </v-col>
            <v-col cols="3" style="justify-content: center" class="px-0 text-left">{{
              item.name
            }}</v-col>
            <v-col cols="2" class="px-0"
              ><p class="font-weight-black num ma-0 title">
                {{ item.num }}
              </p></v-col
            >
          </v-row>
          <!-- <v-row class="text-right mr-1" justify="end" v-else>
            <v-col
              v-for="(item, key) in 4"
              :key="key"
              cols="5"
              elevation="0"
              class="category"
            >
              <p class="font-weight-black num ma-0 title">
                {{ item.num ? item.num : "???" }}
              </p>
              <p>{{ item.name ? item.name : "???" }}</p>
            </v-col>
          </v-row> -->
        </v-card-text>
      </v-card>
    </v-row>

    <!-- share -->
    <v-row no-gutters class="setting-row">
      <v-list class="item" width="100%">
        <v-subheader>SHARE</v-subheader>
        <v-divider></v-divider>
        <v-list-item style="height: 60px">
          <v-col cols="8">
            <v-list-item-content class="text-content">
              <v-list-item-title>コード</v-list-item-title>
              <v-spacer></v-spacer>
              <v-list-item-subtitle>{{
                $store.state.auth.user.share_code
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-col>

          <v-col cols="4" class="text-right">
            <v-list-item-action style="display: inline" class="ma-0">
              <v-btn fab dark small depressed color="green" @click="codeChange">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
              <v-btn @click="copy" fab dark small depressed color="primary" class="mx-2">
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-col>
        </v-list-item>
        <v-divider></v-divider>
        <v-expansion-panels focusable accordion flat>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <template v-slot:default="{ open }">
                <v-row no-gutters>
                  <v-col cols="8">クローゼット</v-col>
                  <v-col cols="4" class="text--secondary">
                    <v-fade-transition leave-absolute>
                      <span v-if="open" key="0"></span>
                      <span v-else key="1"></span>
                    </v-fade-transition>
                  </v-col>
                </v-row>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container>
                <v-list v-if="$store.getters['clothes/getShareUserList'].length !== 0">
                  <v-list-item
                    v-for="(user, key) in $store.getters['clothes/getShareUserList']"
                    :key="key"
                  >
                    <v-list-item-content>
                      <div>{{ user.share_username }}</div>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn
                        icon
                        @click="
                          confirm = true;
                          selectedUser = user;
                        "
                      >
                        <v-icon color="red darken-1"> mdi-delete-forever </v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-container>
                    <v-row justify="center">
                      <v-col cols="5" md="4">
                        <v-text-field
                          v-model="addUser.name"
                          :rules="nameRules"
                          :counter="15"
                          label="名前"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="5" md="4">
                        <v-text-field
                          v-model="addUser.share_code"
                          :rules="codeRules"
                          :counter="10"
                          label="コード"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2" align-self="center">
                        <v-btn
                          :disabled="!valid"
                          @click="validate"
                          icon
                          color="red darken-1"
                          ><v-icon>mdi-plus</v-icon></v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-divider></v-divider>
      </v-list>
    </v-row>

    <!-- weather -->
    <v-row no-gutters class="setting-row">
      <v-list class="item" width="100%">
        <v-subheader>WEATHER</v-subheader>
        <v-divider></v-divider>
        <v-list-item style="height: 60px">
          <v-col cols="8">
            <v-list-item-content class="text-content">
              <v-list-item-title>表示</v-list-item-title>
            </v-list-item-content>
          </v-col>

          <v-col cols="4" style="text-align: right">
            <v-list-item-action class="mx-0">
              <v-switch v-model="showWeather" inset></v-switch>
            </v-list-item-action>
          </v-col>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item style="height: 60px">
          <v-col cols="8">
            <v-list-item-content class="text-content">
              <v-list-item-title>エリア設定</v-list-item-title>
            </v-list-item-content>
          </v-col>

          <v-col cols="4" style="text-align: right">
            <v-list-item-action class="mx-0">
              <v-btn @click="area = true" color="#2C4B70" depressed rounded outlined>{{
                $store.state.weatherArea.city
              }}</v-btn>

              <v-dialog
                v-model="area"
                fullscreen
                hide-overlay
                transition="slide-x-transition"
              >
                <weatherArea @clickBack="close"></weatherArea>
              </v-dialog>
            </v-list-item-action>
          </v-col>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
    </v-row>

    <!-- tag -->
    <v-row no-gutters class="setting-row">
      <v-dialog v-model="tag" fullscreen hide-overlay transition="slide-x-transition">
        <tagList @clickback="tagClose" :type="tagwhich"></tagList>
      </v-dialog>
      <v-list class="item" width="100%">
        <v-subheader>TAG</v-subheader>
        <v-divider></v-divider>
        <v-list-item style="height: 60px">
          <v-col cols="8">
            <v-list-item-content class="text-content">
              <v-list-item-title>Clothes</v-list-item-title>
            </v-list-item-content>
          </v-col>

          <v-col cols="4" style="text-align: right">
            <v-list-item-action class="mx-0">
              <v-btn
                @click="
                  tag = true;
                  tagwhich = 'Clothes';
                "
                color="#2C4B70"
                depressed
                rounded
                outlined
                >{{ $store.getters["tag/getClothesTag"].length }}</v-btn
              >
            </v-list-item-action>
          </v-col>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item style="height: 60px">
          <v-col cols="8">
            <v-list-item-content class="text-content">
              <v-list-item-title>Coordinate</v-list-item-title>
            </v-list-item-content>
          </v-col>

          <v-col cols="4" style="text-align: right">
            <v-list-item-action class="mx-0">
              <v-btn
                @click="
                  tag = true;
                  tagwhich = 'Coordinate';
                "
                color="#2C4B70"
                depressed
                rounded
                outlined
                >{{ $store.getters["tag/getCoordinateTag"].length }}</v-btn
              >
            </v-list-item-action>
          </v-col>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
    </v-row>

    <v-row class="setting-row">
      <v-col cols="12" style="text-align: center" class="mt-2 mb-9">
        <v-btn @click="logout" ripple outlined color=" red darken-1">ログアウト</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import weatherArea from "~/components/weatherArea.vue";
import tagList from "~/components/tagList.vue";

export default {
  components: {
    weatherArea,
    tagList,
  },
  data() {
    return {
      addUser: {
        name: "",
        share_code: "",
      },
      nameRules: [
        (v) => !!v || "名前が入力されていません",
        (v) => v.length <= 15 || "名前は15文字まで",
      ],
      codeRules: [
        (v) => !!v || "コードが入力されていません",
        (v) => v.length == 10 || "コードは10文字です",
      ],
      users: [],
      selectedUser: null,
      valid: false,
      season: [],
      area: false,
      dialog: false,
      tag: false,
      tagwhich: "",
      confirm: false,
    };
  },
  methods: {
    add() {
      this.$axios
        .post("/api/share/add", this.addUser)
        .then((res) => {
          console.log("addレスポンス", res.data);
          this.addUser.name = "";
          this.addUser.share_code = "";
          this.$store.dispatch("clothes/shareCloset");
          this.$store.dispatch("clothes/shareUserList");
          this.$refs.form.resetValidation();

          this.$store.commit("changeAlert", {
            type: res.data.type,
            message: res.data.message,
          });
        })
        .catch((error) => {
          console.log("エラー", error);
        });
    },
    deleteShareCloset() {
      console.log("delete", this.selectedUser.id);
      this.$axios
        .delete("/api/share/delete", {
          params: {
            id: this.selectedUser.id,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.confirm = false;
          this.$store.dispatch("clothes/shareUserList");
          this.$store.commit("changeAlert", {
            type: res.data.type,
            message: res.data.message,
          });
          this.selectedUser = null;
        });
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.add();
      }
    },
    copy() {
      this.$copyText(this.$store.state.auth.user.share_code);
      this.$store.commit("changeAlert", {
        type: "success",
        message: "コードをコピーしました",
      });
    },
    codeChange() {
      this.$axios.put("/api/user/code").then((res) => {
        this.$auth.fetchUser();
        this.$store.commit("changeAlert", {
          type: "success",
          message: "コードを変更しました",
        });
      });
    },
    close() {
      this.area = false;
    },
    tagClose() {
      this.tag = false;
    },
    logout() {
      this.$auth.logout();
    },
  },
  computed: {
    showWeather: {
      get() {
        return this.$store.state.weatherFlag;
      },
      set(value) {
        console.log(value);
        this.$axios
          .post("/api/weather/display", {
            display: value,
          })
          .then((res) => {
            this.$store.commit("setWeatherFlag", res.data);
          });
      },
    },
    count() {
      let categories = this.$store.getters["clothes/getCategory"];
      let count = [];
      if (this.season.length === 0) {
        categories.forEach((cate, index) => {
          count.push({
            name: cate,
            num: this.$store.state.clothes.clothesList[index].length,
          });
        });
        return count;
      } else {
        let resultData = [];
        categories.forEach((cate, index) => {
          const data = this.$store.state.clothes.clothesList[index].filter(
            (value, index) => {
              const seasonList = value.seasons.map((season) => season.name);
              if (seasonList.some((season) => this.season.includes(season))) return value;
            }
          );
          resultData.push(data);
        });
        categories.forEach((cate, index) => {
          count.push({
            name: cate,
            num: resultData[index].length,
          });
        });
        return count;
      }
    },
  },
};
</script>

<style scoped>
.setting {
  width: 100vw;
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

.item-action {
  max-height: 50px;
  max-width: 50px;
}

.profile {
  width: 100vw;
  max-width: 960px;
  text-align: center;
  margin: 20px auto;
  justify-content: center;
}

.name {
  margin: 0;
  height: 35px;
  font-size: 18px;
  line-height: 35px;
}

.closet {
  position: relative;
  width: 90vw;
  max-width: 400px;
}

.closet-row {
  height: 56px;
}
.closet .season {
  position: absolute;
  top: 60px;
  left: 35px;
}
.closet .season .category {
  position: relative;
  width: 40px;
  max-height: 30px;
}

.category .icon {
  height: 48px;
  width: 48px;
  border-radius: 50%;
  padding: 7px;
  background-color: rgba(179, 180, 184, 0.5);
}

.setting-row {
  width: 100vw;
  max-width: 960px;
  margin: 0;
}

.v-application--is-ltr .v-btn-toggle > .v-btn.v-btn:not(:first-child) {
  border-left-width: 1px !important;
}

.v-expansion-panels {
  z-index: 0;
}
</style>
