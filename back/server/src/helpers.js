const axios = require('axios')

async function getLocation(city) {
  let coord = {}
  const apikeyPositionStack = '0691b9e1965ac9f8cc8d207825199ecc'
  const config = {
    method: 'get',
    url: `http://api.positionstack.com/v1/forward?access_key=${apikeyPositionStack}&query=${city}`
  }

  try {
    const res = await axios(config)
    const dataArray = res.data.data
    coord.latitude = dataArray[0].latitude
    coord.longitude = dataArray[0].longitude
  } catch (error) {
    console.error(error)
  }

  return coord
}

async function getWeather(lat, lon) {
  let weatherData = {}
  const config = {
    method: 'get',
    url: `https://api.darksky.net/forecast/88030114c5e47763a011a75e7a10c633/${lat},${lon}`
  }

  try {
    const res = await axios(config)
    weatherData = res.data
  } catch (error) {
    console.error(error)
  }

  return weatherData
}

module.exports = { getLocation, getWeather }
