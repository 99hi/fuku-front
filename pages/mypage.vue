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
                <v-list style="height: 50px; margin-bottom: 20px">
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
</style>
