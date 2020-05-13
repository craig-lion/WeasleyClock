const express = require('express');
const path = require ('path');
const models = require ('../database/models.js')
const app = express();
const port = 734;

app.use(express.json())
app.use('/',express.static(path.join(__dirname, '../client', 'public')))

app.post('/api/addUser', (req, res) => {
  models.saveUser(req.body.userName, req.body.password)
  .then(
    (newUser) => {
      if (newUser) {
        res.send(true)
        console.log(`User: ${req.body.userName} Added`)
      } else {
        res.send(false)
        console.log('Account Creation Failed')
      }
    }
  )
  res.send('Dobby is a Good House Elf Sir')
})

app.post('/api/login', (req, res) => {
  models.login(req.body.userName, req.body.password)
  .then((isUser) => {
    // console.log('this is isUser: ', isUser)
    if (isUser) {
      res.send(true)
      console.log('successful login')
    } else {
      res.send(false)
      console.log('failed login')
    }
  })
})

app.post('/api/updateLocations', (req, res) => {
  if (req.body.locations) {
  models.updateLocations(req.body.userName, req.body.currentLocation, req.body.locations)
  .then(
  console.log(`Locations Updated`),
  )} else {
    models.updateLocations(req.body.userName, req.body.currentLocation)
    .then(console.log('currentLocation only Updated'))
  }
})

// Also really intreested to have you help with the below
app.get('/api/users/:userName(\\w+)', (req, res) => {

  res.redirect(`/?userName=${req.params.userName}`)
})

// must fix get so it requests user from Login 

app.get('/api/users/', (req, res) => {
  let oneUser = {};
  let callback = (data) => {
    oneUser = JSON.stringify(data)
    res.send(oneUser)
  }
  models.userInfo( req.body.userName, callback);
})

app.get('/api/allUsers', (req, res) => {
  let allUsers = {};
  let callback = (data) => {
    oneUser = JSON.stringify(data)
    console.log('this is data: ', data)
    res.send('allUsers')
  }
  models.allUserNames(callback);
})

app.listen(port, () => console.log(`Sorting Hat is listening on ${port}`))

