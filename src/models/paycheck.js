const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const paycheckSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    //  Might need to fix this.
    firstCheckDate: {
        type: Date,
        required: true,
        trim: true,
        validate(value){
            
        }
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
        validate(value){
            if(value <= 0){
                throw new Error("The amount needs to be greater than 0")
            }
        }
    },
    cycle: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            //Check for specific string value
            if(value != "weekly" || value != "biweekly" || value != "monthly"){
                throw new Error("The options are weekly, biweekly or monthly");
            }
        }
    },
    rollOver: {
        type: Number,
        required: false,
        trim: true,
        validate(value){
            if(value < 0 ){
                throw new Error("The rollover amount cannot be negative.")
            }
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'User'
    }
    
});

const Paycheck = mongoose.model('Paycheck', paycheckSchema);

module.exports = Paycheck;