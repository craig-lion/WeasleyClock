const db = require ('./index.js');



const saveUser = (userName, password) => {
  let newUser = new db.User({
    userName,
    password,
    locations: ['@ Work', 'On the Move', 'Let\'s Rage', 'Breathing Hard', 'Let\'s Chill', 'Self-Care', 'Adulting'],
    currentLocation: 'Let\'s Rage'
  });
  console.log('this is newUser in models: ', newUser)
  return new Promise ((resolve, reject) => {
    newUser.save((err) => {
    if (err) {reject(err)}
    else {resolve(true)}
    })
  })
}

const updateLocations = async (userName, locations) => {
  await db.User.findOneAndUpdate({userName}, {locations})
  console.log('it probably worked :shrug: ')
}

const userInfo = async (userName, callback) => {
  let query  = db.User.where({ userName });
  query.findOne((err, data) => {
    if (err) {throw err;}
    else {callback(data)}
  })
}

  const login = (userName, password) => {
    let query  = db.User.where({ userName });
    return new Promise ((resolve, reject) => {
      query.findOne((err, data) => {
      if (err) {reject(err)}
      else {
        if (data === null) {resolve(false)}
        else {resolve(true)}
      }
    })
    })
}

module.exports = {saveUser, userInfo, updateLocations, login}
