const DomainModel = require('../models/DomainModel');
require("dotenv").config();
const mongoose = require('mongoose');

const startSetup = async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    const models = await DomainModel.find({clientCode: process.env.BASE_CLIENT_CODE, clientId: process.env.BASE_CLIENT_ID});
    console.log('Models found:');

    for (var i in models) {
        const model = models[i];
        model._id = undefined;
        model.clientId = process.env.NEW_CLIENT_CODE;
        model.clientCode = process.env.NEW_CLIENT_ID;

        (DomainModel(model)).save();
    }
}

startSetup();