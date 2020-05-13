const express = require('express');
const path = require ('path');
const models = require ('../database/models.js');
const cookieParser = require('cookie-parser');
const app = express();
const port = 734;

app.use(express.json())
app.use(cookieParser())

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
  .catch(err => console.log(err))
  res.send('Dobby is a Good House Elf Sir')
})
// pass back userName and use it in useEffect query
app.post('/api/login', (req, res) => {
  models.login(req.body.userName, req.body.password)
  .then((userName) => {
    if (userName) {
      const options = {
        maxAge: 2.592e+9,
        httpOnly: true,
      }
      res.cookie('session', `${userName}`, options)
      console.log('this is userName: ', userName)
      res.send(true)
      console.log('successful login')
    } else {
      res.send(false)
      console.log('failed login')
    }
  })
  .catch(err => console.log(err))
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
  console.log('we did it all for these cookies: ', req.cookies.session)
  let userName = req.body.userName || req.cookies.session
  models.userInfo( userName, callback);
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

