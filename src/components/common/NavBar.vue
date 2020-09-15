<template>
  <v-navigation-drawer
    app
    disable-resize-watcher
    class="select-none"
    :value="$store.state.window.navStatus"
    @input="$store.commit('CHANGE-NAV-BAR', $event)"
    overlay-opacity="0.1"
  >
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div
        class="pa-2"
        style="display: flex; justify-content: space-between; align-items: baseline;"
      >
        <span style="display: inline-flex;"
          >Night Mode<v-icon style="padding-left: 10px;"
            >mdi-theme-light-dark</v-icon
          ></span
        >
        <v-switch
          style="display: inline-flex;"
          v-model="$vuetify.theme.dark"
          :dark="$vuetify.theme.dark"
        >
        </v-switch>
      </div>
      <div class="pa-2">
        <v-btn block>SETTING</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: 'NavBar',
  data() {
    return {
      items: [
        { title: 'Dashboard', icon: 'dashboard' },
        { title: 'Account', icon: 'account_box' },
        { title: 'Admin', icon: 'gavel' }
      ]
    }
  }
}
</script>
<style></style>
