import axios from 'axios'

export function getWeather(ciudad) {
  return axios
    .get(`http://localhost:4000/weather?city=${ciudad}`)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}
