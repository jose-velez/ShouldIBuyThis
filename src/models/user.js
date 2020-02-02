const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length <= 6 || value.includes('password')){
                throw new Error('Password Must be longer than 6 characters or not include the world password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},{
    timestamps: true
});

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;

};

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = await jwt.sign({_id : user._id.toString()}, 'jointhedarkside');
    user.tokens = user.tokens.concat({token});

    await user.save();
    return token;
};

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error('Unable to login');
    }
    return user;
};

userSchema.pre('save', async function(next){
    const user = this;

    console.log('Just Before Saving');

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

//This is where I'm going to delete all budget for the user.js
//When deleted.
// userSchema.pre('remove', async function(){
//     const user.js = this;
//     awai
// })

const User = mongoose.model('User', userSchema);

module.exports = User;