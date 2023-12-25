const mongoose = require('mongoose');

const ApplicationModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    version: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    }
});

const ApplicationModel = mongoose.model('ApplicationModel', ApplicationModelSchema);

module.exports = ApplicationModel;