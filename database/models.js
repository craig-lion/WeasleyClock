const db = require ('./index.js');



const saveUser = (userName, password) => {
  let newUser = new db.User({
    userName,
    password,
    locations: ['@ Work', 'On the Move', 'Let\'s Rage', 'Breathing Hard', 'Let\'s Chill', 'Self-Care', 'Adulting'],
    currentLocation: 'Let\'s Rage',
    friends: ['Lion']
  });
  console.log('this is newUser in models: ', newUser)
  return new Promise ((resolve, reject) => {
    newUser.save((err) => {
    if (err) {reject(err)}
    else {resolve(true)}
    })
  })
}

const updateLocations = async (userName, currentLocation, locations) => {
  if (locations) {
    await db.User.findOneAndUpdate({userName}, {locations, currentLocation})
  } else {
    await db.User.findOneAndUpdate({userName}, { currentLocation })
  }
}

const updateFriends = async (userName, friends) => {
  await db.User.findOneAndUpdate({userName}, { friends })
}

const userInfo = async (userName, callback) => {
  let query  = db.User.where({ userName });
  query.findOne((err, data) => {
    if (err) {throw err;}
    else {callback(data)}
  })
}

const allUserNames = async (callback) => {
  let query = db.User.find({}).select('userName -_id');
    query.exec((err, data) => {
        if (err) {throw err};
        callback(data);
    });
}

  const login = (userName, password) => {
    let query  = db.User.where({ userName });
    return new Promise ((resolve, reject) => {
      query.findOne((err, data) => {
      if (err) {reject(err)}
      else {
        if (data === null) {resolve(false)}
        else {resolve(data.userName)}
      }
    })
    })
}

module.exports = {saveUser, userInfo, updateLocations, login, allUserNames, updateFriends}
