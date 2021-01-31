<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Esto va a ser la app que te va a permitir consultar el clima de tu ciudad
    </p>
    <p>la temperatura de Medellín es: {{ weather }} F</p>
  </div>
</template>

<script>
import Services from '../http/home/index'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      weather: []
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
