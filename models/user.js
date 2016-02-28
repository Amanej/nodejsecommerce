var mongoose =  require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;


// 1 User schema and declare user attributes
var UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,

  profile: {
    name: { type: String, default: ''},
    picture: { type:String, default: ''}
  },

  address: String,
  history: [{
    date: Date,
    paid:  {type:Number, default: 0}
    //item: { type: Schema.Types.ObjectId, ref: ''}
  }]
})


// 2 Hash password
  // Use the Password
  UserSchema.pre('save', function(next) {
    var user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt){
      if (err) return next(err);
      bcrypt.hash(user.password, salt, null, function(err, hash){
        if(err) return next(err);
        user.password = hash;
        next();
      });
    });
  });

// 3 Password comparison

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSynx(password, this.password);

}

module.exports = mongoose.model('User', UserSchema);
