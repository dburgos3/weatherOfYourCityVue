var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost/'

MongoClient.connect(url, function (err, db) {
  if (err) throw err
  var dbo = db.db('userData')

  if (!dbo.collection('users')) {
    dbo.createCollection('users', function (err, res) {
      if (err) throw err
      console.log('Collection created!')
      db.close()
    })
  } else {
  }
})

function addRecord(ip, city, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err
    var dbo = db.db('userData')
    var user = { ip: ip, city: city, res: res }
    dbo.collection('users').insertOne(user, function (err, res) {
      if (err) throw err
      console.log('1 document inserted')
      db.close()
    })
  })
}

module.exports = { addRecord }
