const DomainModel = require('../../models/DomainModel');
const mongoose = require('mongoose');

const { successResponse, errorResponse } = require('../../utils/response');

const updateModeldata = async (req, res) => {
    const modelSchemas = await FetchModels(req, res);
    if (!modelSchemas.length) {
        return errorResponse(res, "Models not found", 400);
    }

    const updatedData = [];
    const errorOccured = [];

    for (const modelSchema of modelSchemas) {
        const modelName = modelSchema.name;
        try {
                const Model = await GenerateModel(modelSchema);
                const modelData = req.body[modelSchema.name];
                let result;
                
                if (modelData.length) {
                    result = await Model.insertMany(modelData);
                } else {
                const modelInstance = new Model(modelData);
                result = await modelInstance.save();
            }

            updatedData.push({[modelName]: result});
        } catch (error) {
            console.log(error);
            errorOccured.push({[modelName]: {message: "Error occured while updating data", error}});
        }
    }

    return successResponse(res, updatedData, "Data updated successfully", errorOccured);
};

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
    const modelSchemas = await DomainModel.find({
        name: {
            $in: modelNames
        }
    })
    const modelNamesFromDB = modelSchemas.map(model => model.name);
    const modelNamesNotInDB = modelNames.filter(modelName => !modelNamesFromDB.includes(modelName));

    if (!modelNamesNotInDB.length) {
        return modelSchemas;
    }

    return [];
};

module.exports = updateModeldata;