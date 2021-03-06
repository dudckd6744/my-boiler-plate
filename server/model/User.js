const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength:50
    },
    id: {
        type : String,
        trim: true,
        unique:1
    },
    password:{
        type: String,
        minlength: 5
    },
    email:{
        type:String,
        trim:true,
        unique:1
    },
    image: String,
    token: String,
    tokenExp: Number,
    role:{
        type: Number,
        default: 0
    },
    created:{
        type:Date,
        default:Date.now
    },
    isDelete:{
        type:Number,
        default:0
    }
})


// userSchema.pre('save',function(next){
//     let user = this;
//     console.log(user.isModified("password"))
//     if(user.isModified("password")){
//         bcrypt.hash(user.password , saltRounds, function(err, hash){
//             if(err) return next(err);
//             user.password = hash;
//             next();
//         })
//     }else{}
//         next();
// })
userSchema.pre('save', function( next ) {
    var user = this;
    
    if(user.isModified('password')){    
        // console.log('password changed')
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash 
                next()
            })
        })
    } else {
        next()
    }
});

userSchema.methods.comparePassword = function(Password , cb){
    bcrypt.compare(Password, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    let user = this;

    let token = jwt.sign(user._id.toHexString(),'secret')
    let oneHour = moment().add(1, 'hour').valueOf();

    user.tokenExp = oneHour;
    user.token = token;

    user.save(function (err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb){
    let user = this;

    jwt.verify(token,'secret', function(err,decode){
        user.findOne({"_id":decode, "token":token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = {User}