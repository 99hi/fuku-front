<template>
  <v-container>
    <v-toolbar flat height="48px" class="page-title">
      <v-toolbar-title>マイページ</v-toolbar-title>
    </v-toolbar>

    <v-row justify="center" class="ma-5">
      <v-avatar height="100px" width="100px">
        <img src="https://picsum.photos/100/100/?random" alt="John" />
      </v-avatar>
    </v-row>

    <v-row style="width: 100%" justify="center" class="title mx-auto">hiroki</v-row>

    <v-row justify="center" class="my-3">
      <v-card shaped elevation="2" class="closet">
        <v-card-text>
          <div>MY CLOSET</div>
          <v-row class="flex-column season">
            <v-btn-toggle
              v-model="season"
              style="flex-direction: column"
              dense
              tile
              color="primary"
              multiple
            >
              <v-btn text color="#F06292">春</v-btn>
              <v-btn text color="#03A9F4">夏</v-btn>
              <v-btn text color="#795548">秋</v-btn>
              <v-btn text color="#607D8B">冬</v-btn>
            </v-btn-toggle>
          </v-row>
          <v-row class="text-right mr-3" justify="end">
            <v-col cols="5" elevation="0" class="category">
              <p class="font-weight-black num ma-0 title">23</p>
              <p>トップス</p>
            </v-col>
            <v-col cols="5" elevation="0" class="category">
              <p class="font-weight-black num ma-0 title">11</p>
              <p>アウター</p>
            </v-col>
            <v-col cols="5" elevation="0" class="category">
              <p class="font-weight-black num ma-0 title">9</p>
              <p>パンツ</p>
            </v-col>
            <v-col cols="5" elevation="0" class="category">
              <p class="font-weight-black num ma-0 title">5</p>
              <p>シューズ</p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>

    <v-row no-gutters>
      <v-list class="item" width="100vw">
        <v-subheader>SHARE</v-subheader>
        <v-divider></v-divider>
        <v-list-item style="height: 60px">
          <v-col cols="8">
            <v-list-item-content class="text-content">
              <v-list-item-title>コード</v-list-item-title>
              <v-spacer></v-spacer>
              <v-list-item-subtitle>Wt8N3LNDch</v-list-item-subtitle>
            </v-list-item-content>
          </v-col>

          <v-col cols="4">
            <v-list-item-action style="display: inline" class="ma-0">
              <v-btn fab dark small depressed color="green">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
              <v-btn fab dark small depressed color="primary" class="mx-2">
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
              <v-container class="pa-1" fluid>
                <v-list
                  style="height: 50px; margin-bottom: 20px"
                  v-if="users.length !== 0"
                >
                  <v-list-item v-for="(user, key) in users" :key="key">
                    <v-list-item-content>
                      <div>{{ user.share_username }}</div>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon color="red darken-1"> mdi-delete-forever </v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-container>
                    <v-row>
                      <v-col cols="5" md="4">
                        <v-text-field
                          v-model="name"
                          :rules="nameRules"
                          :counter="15"
                          label="名前"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="5" md="4">
                        <v-text-field
                          v-model="code"
                          :rules="codeRules"
                          :counter="8"
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
    <v-row>
      <v-col cols="12" style="text-align: center" class="mt-2 mb-9">
        <v-btn>ログアウト<v-icon>mdi-logout-variant</v-icon></v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 15 || "Name must be less than 15 characters",
      ],
      code: "",
      codeRules: [
        (v) => !!v || "code is required",
        (v) => v.length == 8 || "コードは8文字です",
      ],
      users: [],
      valid: false,
      season: [],
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.$axios.get("/api/share/users").then((res) => {
        console.log(res.data);
        this.users = res.data;
      });
    },
    validate() {
      if (this.$refs.form.validate()) {
        console.log("コードのかくにん");
      }
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

.item-action {
  max-height: 50px;
  max-width: 50px;
}

.name {
  margin: 0;
  height: 35px;
  font-size: 18px;
  line-height: 35px;
}

.closet {
  width: 80%;
  position: relative;
}
.closet .season {
  position: absolute;
  top: 60px;
  left: 30px;
}
.closet .season .category {
  position: relative;
  width: 40px;
  padding: 0;
}
.category num {
  position: absolute;
  left: 10;
}

.v-application--is-ltr .v-btn-toggle > .v-btn.v-btn:not(:first-child) {
  border-left-width: 1px !important;
}
</style>
