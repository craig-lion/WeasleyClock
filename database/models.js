const db = require ('./index.js');



const saveUser = async (data) => {
  let newUser = new db.User(data);
  newUser.save((err) => {if(err) {console.log(err)}})
}

const updateLocations = async (data) => {
  let newUser = new db.User(data);
  newUser.save((err) => {if(err) {console.log(err)}})
}

const userInfo = async (userName, callback) => {
  var query  = db.User.where({ userName });
  query.findOne((err, data) => {
    if (err) {throw err;}
    else {callback(data)}
  })
}

  const login = (userName, password) => {
    var query  = db.User.where({ userName });
    return new Promise ((resolve, reject) => {
      query.findOne((err, data) => {
      if (err) {reject(err)}
      else {console.log(data); resolve(data);}
    })
    })
}

module.exports = {saveUser, userInfo, updateLocations, login}


