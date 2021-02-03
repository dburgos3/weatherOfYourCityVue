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
    </v-row>
    <v-row>
      <v-col class="mb-4">
        <v-text-field id="textArea" v-model="city" @keyup.enter="sendCity" :rules="rules">
          <div class="btn-search" @click="sendCity">
            <v-btn>Search</v-btn>
          </div>
        </v-text-field>
      </v-col>

      <v-col class="mb-4">
        <v-btn color="primary" @click="sendCity">Search</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mb-4">
        <p class="subheading font-weight-regular">
          {{ this.date }}
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mb-4">
        <p class="subheading font-weight-regular" v-if="temperature">
          The {{ city }} temperature is {{ temperature }} F
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mb-4">
        <template>
          <v-container id="dropdown-nextHour">
            <v-overflow-btn
              :items="temperatureHourly"
              label="nextHour"
              item-value="text"
            ></v-overflow-btn>
          </v-container>
        </template>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mb-4">
        <template>
          <v-container id="dropdown-weekly">
            <v-overflow-btn
              :items="dailyTemperature"
              label="Weekly"
              item-value="text"
            ></v-overflow-btn>
          </v-container>
        </template>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mb-4">
        <template>
          <v-container id="dropdown-twoNextDays">
            <v-overflow-btn
              :items="twoNextDaysTemperature"
              label="twoNextDays"
              item-value="text"
            ></v-overflow-btn>
          </v-container>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getWeather } from '../http/home/index'

export default {
  components: {},

  data() {
    return {
      date: null,
      weather: [],
      temperature: null,
      hourlyArr: [],
      timeHourly: [],
      temperatureHourly: [],
      daily: [],
      dailyTemperature: [],
      twoNextDaysTemperature: [],
      city: '',
      rules: [
        value => !!value || 'Required.',
        value => (value || '').length <= 20 || 'Max 20 characters'
        // value => {
        //   const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        //   return pattern.test(value) || 'Invalid e-mail.'
        // }
      ]
    }
  },

  methods: {
    sendCity() {
      getWeather(this.city).then(res => {
        this.weather = res
        this.temperature = res.currently.temperature
        this.date = Date(res.currently.time)
        this.hourlyArr = res.hourly.data
        this.daily = res.daily.data

        // Temperature for next hour
        for (let index = 0; index < this.hourlyArr.length; index++) {
          this.timeHourly.push(Date(this.hourlyArr[index].time * 1000))
          this.temperatureHourly.push(this.hourlyArr[index].temperature)
        }

        // Temperature for the next 8 days
        for (let j = 0; j < 2; j++) {
          this.twoNextDaysTemperature.push(this.daily[j].temperatureMax)
        }

        // Temperature for the next 8 days
        for (let j = 0; j < this.daily.length; j++) {
          this.dailyTemperature.push(this.daily[j].temperatureMax)
        }
      })
      // .then(() => console.log(this.twoNextDaysTemperature))
    }
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
  // background-color: #8f8181;
  background-color: #728f7a;
}

// Enviar a estos dos correos: juangui@kbe.ai y juanes@kbe.ai
</style>
