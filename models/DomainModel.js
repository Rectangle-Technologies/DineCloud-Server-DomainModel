const mongoose = require('mongoose');

const DomainModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    version: {
        type: String,
        required: true
    },
    schema: {
        type: Object,
        required: true
    },
    locked: {
        type: Boolean,
        default: false
    },
    application: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ApplicationModel',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('DomainModel', DomainModelSchema);