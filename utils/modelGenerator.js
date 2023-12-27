const mongoose = require('mongoose');
const DomainModel = require('../models/DomainModel');

const GenerateModel = async (model) => {
    const { name, schema } = model;
    if (mongoose.models[name]) {
        mongoose.deleteModel(name);
    }
    const Model = mongoose.model(name, new mongoose.Schema(schema, {
        timestamps: true
    }));
    return Model;
};

const FetchModels = async (req, res) => {
    const modelData = req.body;
    const modelNames = Object.keys(modelData);
    const filter = {}
    if (req?.user?.clientId) {
        filter.clientId = req?.user?.clientId;
    } else {
        filter.clientCode = req?.user?.clientCode;
    }
    const modelSchemas = await DomainModel.find({
        name: {
            $in: modelNames
        },
        ...filter
    })
    const modelNamesFromDB = modelSchemas.map(model => model.name);
    const modelNamesNotInDB = modelNames.filter(modelName => !modelNamesFromDB.includes(modelName));

    if (!modelNamesNotInDB.length) {
        return modelSchemas;
    }

    return [];
};

module.exports = {
    GenerateModel,
    FetchModels
}
