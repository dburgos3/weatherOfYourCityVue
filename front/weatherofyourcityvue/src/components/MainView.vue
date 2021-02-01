<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/iconThermometer.png')" class="my-3" contain height="80" />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-medium mb-3 ">
          Welcome to weatherOfYourCity APP
        </h1>
      </v-col>

      <v-col>
        <v-menu transition="slide-x-transition" bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn id="btnCities" dark v-bind="attrs" v-on="on">
              Select the city you want to know the weather
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-title id="cities">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>

      <v-col>
        <v-menu transition="slide-x-transition" bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn id="btnRangeOfTime" dark v-bind="attrs" v-on="on">
              Select range of time
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, i) in itemsTime" :key="i">
              <v-list-item-title id="cities">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mb-4">
        <p class="subheading font-weight-regular">The Medellín weather is {{ weather }} F</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Services from '../http/home/index'

export default {
  data() {
    return {
      weather: [],
      items: [{ title: 'City 1' }, { title: 'City 2' }, { title: 'City 3' }, { title: 'City 4' }],
      itemsTime: [
        { title: 'Minute by minute to the next hour' },
        { title: 'Hour by hour for the next two days' },
        { title: 'Day by day for the next week' }
      ]
    }
  },

  created() {
    Services.getWeather().then(res => {
      this.weather = res.currently.temperature
      console.log(this.weather)
    })
  }
}
</script>

<style lang="scss" scoped>
#cities {
  cursor: pointer;
}
#btnCities {
  background-color: #728f7a;
}
#btnRangeOfTime {
  background-color: #8f8181;
}
</style>
