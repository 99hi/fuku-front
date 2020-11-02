﻿<template>
<div>
    <div
      @click.stop="drawer = !drawer"
    >
       <v-icon color="red darken-1">mdi-tune-variant</v-icon>絞り込み
    </div>
        
    <v-navigation-drawer
      right
			hide-overlay
      v-model="drawer"
      class="sort-drawer"
			width="80%"
    >
      <v-list-item class="sort-drawer-list">
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
				<v-list-item-group v-model="listModel">
					<v-list-item>
          <v-list-item-content  class="sort-drawer-list-content">
            <v-list-item-title>検索</v-list-item-title>
						<v-text-field
            v-model="searchWord"
            clearable
						outlined
						dense
          ></v-text-field>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content  class="sort-drawer-list-content">
            <v-list-item-title>カテゴリー</v-list-item-title>
          </v-list-item-content>
					<v-list-item-action class="sort-drawer-list-content-text">
							<v-list-item-action-text>指定しない ></v-list-item-action-text>
						</v-list-item-action>
        </v-list-item>

				<v-list-item>
          <v-list-item-content  class="sort-drawer-list-content">
            <v-list-item-title>色</v-list-item-title>
          </v-list-item-content>
					<v-list-item-action class="sort-drawer-list-content-text">
							<v-list-item-action-text>指定しない ></v-list-item-action-text>
						</v-list-item-action>
        </v-list-item>

				<v-list-item>
          <v-list-item-content  class="sort-drawer-list-content">
            <v-list-item-title>シーズン</v-list-item-title>
          </v-list-item-content>
					<v-list-item-action class="sort-drawer-list-content-text">
							<v-list-item-action-text>指定しない ></v-list-item-action-text>
						</v-list-item-action>
        </v-list-item>
				</v-list-item-group>
      </v-list>
    </v-navigation-drawer>

  </div>
</template>

<script>
  export default {
    data () {
      return {
				listModel: false,
				drawer: null,
				searchWord: null
      }
    },
  }
</script>

<style scoped>
.sort-drawer {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
}

.sort-drawer-list-content {

}

.sort-drawer-list-content-text {

}

</style>