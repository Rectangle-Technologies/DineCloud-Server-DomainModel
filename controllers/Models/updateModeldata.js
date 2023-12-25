const { GenerateModel, FetchModels } = require('../../utils/modelGenerator');
const { successResponse, errorResponse } = require('../../utils/response');

const updateModeldatas = async (req, res) => {
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
            errorOccured.push({[modelName]: {message: "Error occured while updating data", error}});
        }
    }

    return successResponse(res, updatedData, "Data updated successfully", errorOccured);
};

const updateModeldata = async (req, res) => {
    const modelSchemas = await FetchModels(req, res);
    if (!modelSchemas.length) {
        return errorResponse(res, "Models not found", 400);
    }

    const updatedData = [];
    const errorOccured = [];

    if (modelSchemas.length > 1) {
        return errorResponse(res, "Multiple models not allowed", 400);
    }

    const modelSchema = modelSchemas[0];

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

        updatedData.push({[modelSchema.name]: result});
    } catch (error) {
        errorOccured.push({[modelSchema.name]: {message: "Error occured while updating data", error}});
    }
};

module.exports = {
    updateModeldatas,
    updateModeldata
};