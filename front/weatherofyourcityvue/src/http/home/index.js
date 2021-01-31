import axios from '../../axios'

export default new (class Services {
  getWeather() {
    return axios
      .get('http://localhost:4000/weather?city=medellin')
      .then(res => {
        return res.data
      })
      .catch(error => {
        return error
      })
  }
})()
