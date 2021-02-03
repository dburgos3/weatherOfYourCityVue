<template>
  <v-app>
    <v-app-bar app color="grey darken-2" dark> </v-app-bar>

    <v-main>
      <MainView />
    </v-main>
  </v-app>
</template>

<script>
import MainView from './components/MainView'

export default {
  name: 'App',

  components: {
    MainView
  },

  data: () => ({
    //
  })
}
</script>
