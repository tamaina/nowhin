<template>
  <v-app>
    <v-navigation-drawer
      app
      overflow
      v-model="drawer.model"
    >
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in drawer.items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon
        @click.stop="drawer.model = !drawer.model"
      />
      <div class="d-flex align-center">
        NowHin
      </div>

      <v-spacer></v-spacer>

      <v-btn
        text
      >
        {{ $store.state.me.name }}
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue"
import { mdiFileImage } from "@mdi/js"

export default Vue.extend({
  name: 'App',

  components: {

  },

  data: () => ({
    drawer: {
      model: false,
    items: [
        {
          title: "あ",
          icon: mdiFileImage
        }
      ]
    }
  })
})
</script>
