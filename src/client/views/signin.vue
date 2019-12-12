<template>
  <div id="signin">
    <v-form>
      <v-container>
        <v-text-field
          v-model="name"
          required label="ユーザー名"></v-text-field>
        <v-text-field
          v-model="password"
          @click:append="showpw = !showpw"
          :append-icon="showpw ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showpw ? 'text' : 'password'"
          required
          @keydown.enter="this.signin"
          label="パスワード"></v-text-field>
        <v-btn @click="this.signin">サインイン</v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import Vue from "vue"
import axios from "axios"

export default Vue.extend({
  name: 'App',

  components: {

  },

  data: () => ({
    showpw: false,
    name: "",
    password: ""
  }),

  methods: {
    signin() {
      const $store = this.$store
      axios({
        url: "/api",
        method: "post",
        data: {
          query: `{
  signin(name: ${JSON.stringify(this.name)}, password: ${JSON.stringify(this.password)}) {
    id, i, name
  }
}`
        }
      }).then(res => {
        $store.commit("me/set", res.data.data.signin)
      })
    }
  }
})
</script>
