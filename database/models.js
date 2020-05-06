const db = require ('./index.js');



const saveUser = async (data) => {
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

module.exports = {saveUser, userInfo}


