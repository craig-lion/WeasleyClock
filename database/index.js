const mongoose = require('mongoose');
const options = {
 useNewUrlParser: true,
 useUnifiedTopology: true,
 useCreateIndex: true,
 useNewUrlParser: true
}
mongoose.connect('mongodb://localhost/WeasleyClock', options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`we made it thru the wall!`)
});

const schema = new mongoose.Schema({
  userName: {type: String, unique: true},
  password: {type: String},
  locations: { type: Array},
  currentLocation: {type: String},
  friends: { type: Array}
});

const User = mongoose.model('User', schema);

module.exports = {User};
