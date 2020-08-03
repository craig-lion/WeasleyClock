const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const bcrypt = require('bcrypt');
const models = require('../database/models.js');

const saltRounds = 10;

const app = express();
const port = 734;
const options = {
  maxAge: 2.592e+9,
  httpOnly: true,
};

app.use(express.json());
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '../client', 'public')));

const checkForLogin = (endpointFunc) => (
  (req, res) => {
    if (req.cookies.session) {
      endpointFunc(req, res);
    } else { res.send(403); }
  });

app.post('/api/addUser', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) { throw err; }
    models.saveUser(req.body.userName, hash)
      .then(
        (newUser) => {
          if (newUser) {
            res.cookie('session', `${req.body.userName}`, options);
            res.send(true);
          } else {
            res.send(false);
          }
        },
      )
      .catch(
        (error) => {
          console.log(error);
          return res.status(400).send({
            message: 'This is an error!',
          });
        },
      );
  });
});


app.post('/api/login', (req, res) => {
  if (req.cookies.session) {
    res.send(true);
    return;
  }
  if (!req.body.userName || !req.body.password) {
    res.send(false);
    return;
  }

  models.login(req.body.userName)
    .then((hash) => {
      bcrypt.compare(req.body.password, hash, (err, result) => {
        if (err) { throw err; }
        if (result) {
          res.cookie('session', `${req.body.userName}`, options);
          res.send(true);
        } else {
          res.send(false);
        }
      });
    })
    .catch((err) => console.log(err));
});

app.post('/api/updateLocations', checkForLogin((req) => {
  if (req.body.locations) {
    models.updateLocations(req.cookies.session, req.body.currentLocation, req.body.locations)
      .then(
        console.log('Locations Updated'),
      );
  } else {
    models.updateLocations(req.cookies.session, req.body.currentLocation)
      .then(console.log('currentLocation only Updated'));
  }
}));

app.post('/api/logout', checkForLogin((req, res) => {
  res.clearCookie('session', options);
  res.send(false);
}));

app.post('/api/updateFriends', checkForLogin((req) => {
  console.log('this is req.body.friends: ', req.body.friends);
  models.updateFriends(req.cookies.session, req.body.friends)
    .then(console.log('Friends Updated'));
}));

app.get('/api/userInfo/', (req, res) => {
  let oneUser = {};
  const callback = (data) => {
    oneUser = JSON.stringify(data);
    res.send(oneUser);
  };
  const userName = req.query.userName || req.cookies.session;
  models.userInfo(userName, callback);
});

app.get('/api/allUsers', (req, res) => {
  let allUsers = {};
  const callback = (data) => {
    allUsers = JSON.stringify(data);
    res.send(allUsers);
  };
  models.allUserNames(callback);
});

app.listen(port, () => console.log(`Sorting Hat is listening on ${port}`));
