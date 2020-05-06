const express = require('express');
const path = require ('path');
const models = require ('../database/models.js')
const app = express();
const port = 734;

app.use('/',express.static(path.join(__dirname, '../client', 'public')))

app.post('/api/users', (req, res) => {
  models.saveUser(req.data)
  .then(
  console.log(`${req.data.userName} Added`),
  )
  res.send('Dobby is a Good House Elf Sir')
})

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

