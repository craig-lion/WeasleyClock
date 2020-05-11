const express = require('express');
const path = require ('path');
const models = require ('../database/models.js')
const app = express();
const port = 734;

app.use(express.json())
app.use('/',express.static(path.join(__dirname, '../client', 'public')))

app.post('/api/users/addUser', (req, res) => {
  models.saveUser(req.body)
  .then(
  console.log(`${req.body.userName} Added`),
  )
  res.send('Dobby is a Good House Elf Sir')
})

app.post('/api/users/updateLocations', (req, res) => {
  // models.updateLocations(req.body)
  // .then(
  // console.log(`Locations Updated`),
  // )
  // console.log('this is req', req.body)
  res.send('Kreatcher Hates Dobby')
})

app.post('/api/login', (req, res) => {
 
  let userName = 'Lion';
  let password = 'Lion';
  models.login(req.body.userName, req.body.password)
  .then((isUser) => {
    console.log('this is isUser: ', isUser)
    
    if (isUser) {
      res.send(true)
      console.log('successful login')
    } else {
      res.send(false)
      console.log('failed login')
    }
  })
})

// Also really intreested to have you help with the below
app.get('/api/users/:userName(\\w+)', (req, res) => {

  res.redirect(`/?userName=${req.params.userName}`)
})

app.get('/api/users/', (req, res) => {
  let oneUser = {};
  let callback = (data) => {
    // console.log('this is data: ', data)
    oneUser = JSON.stringify(data)
    res.send(oneUser)
  }
  // console.log(req.query.userName)
  // res.send('Dobby just wants clothes from Harry Potter')
  models.userInfo( 'Lion', callback);
})

app.listen(port, () => console.log(`Sorting Hat is listening on ${port}`))

