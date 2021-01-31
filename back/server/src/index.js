const { getLocation, getWeather } = require('./helpers')
const express = require('express')
const app = express()

app.get('/weather', async (req, res) => {
  const { city } = req.query
  if (!city) {
    const error = new Error('Required query param {city} missing')
    error.status = 400
    throw error
  }
  const { latitude, longitude } = await getLocation(city)
  const weatherData = await getWeather(latitude, longitude)

  res.json(weatherData)
  res.status(200)
})

app.listen(4000, () => {
  console.log('Express web server started 4000')
})
