const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var userSchema = mongoose.Schema({
    user: {type: String, unique: true},
    email: {type: String, unique: true},
    password: String
});


userSignedup = mongoose.model('userSignedup', userSchema);

module.exports = {
    
    addUser : function (d) {
        var user = new userSignedup({
            user: d.userName,
            email: d.userEmail,
            password: d.userPass
        });
        
        return user.save();
    },
    
    checkUser : function (d) {
        return userSignedup.find({user: d.user, password: d.p});
    }
    
}