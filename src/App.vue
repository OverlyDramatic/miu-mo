<template>
  <v-app class="frame">
    <NavBar></NavBar>
    <TopBar></TopBar>
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import './assets/scss/index.scss'
import windowMixins from '@/mixins/window.mixins'
// * components
import TopBar from '@/components/common/TopBar'
import NavBar from '@/components/common/NavBar'
import Footer from '@/components/common/Footer'

export default {
  name: 'App',
  mixins: [windowMixins],
  components: {
    TopBar,
    NavBar,
    Footer
  },
  data: () => ({
    //
    darkMode: true
  })
}
</script>
