// importing mongoose
const mongoose = require('mongoose');
const emailValidator = require('../utils/emailValidator');

// schema for user
const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: emailValidator,
            message: props => `${props.value} is not a valid email address!}`
        }
    },
    mobileNumber: {
        type: String,
        trim: true,
        validate: {
            validator: (number) => {
                const numberRegex = /^\d{10}$/;
                return numberRegex.test(number);
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
    },
}, {
    timestamps: true
});

// creating model for client
const Client = mongoose.model('Client', clientSchema);

module.exports = Client;