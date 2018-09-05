
const mongoose= require('mongoose');
mongoose.connect(process.env.MONGO_URI);
// view engine setup
const profileSchema= mongoose.Schema({
  name: String,
  avatar: String,
  voted:[String],
  polls: [String],
  googleId: String
  });

const commentsSchema= mongoose.Schema({
  venueID: String,
  user: String,
  posted_On: Date,
  comment: String
});
 const models = {
    Post: mongoose.model('Comments',commentsSchema),
    Profile: mongoose.model('Profile',profileSchema)
  };
module.exports= models;