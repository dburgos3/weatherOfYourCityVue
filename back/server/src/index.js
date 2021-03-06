var { addRecord } = require('../../db/index')

const { getLocation, getWeather } = require('./helpers')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors({ origin: 'http://localhost:8080' }))

app.get('/weather', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  console.log(ip)
  const { city } = req.query
  if (!city) {
    const error = new Error('Required query param {city} missing')
    error.status = 400
    throw error
  }
  const { latitude, longitude } = await getLocation(city)
  const weatherData = await getWeather(latitude, longitude)

  addRecord(ip, city, weatherData)

  res.json(weatherData)
  res.status(200)
})

app.listen(4000, () => {
  console.log('Express web server started 4000')
})
