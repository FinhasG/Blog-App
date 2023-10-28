const mongoose = require('mongoose');
const Joi = require('joi')



const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)