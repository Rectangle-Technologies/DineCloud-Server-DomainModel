const { ModelNotFoundException, MultipleModelsException } = require('../../exceptions/ModelException');
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

            updatedData.push({ [modelName]: result });
        } catch (error) {
            errorOccured.push({ [modelName]: { message: "Error occured while updating data", error } });
        }
    }

    return successResponse(res, updatedData, "Data updated successfully", errorOccured);
};

const updateModeldata = async (req, res) => {
    try {
        const modelSchemas = await FetchModels(req, res);
        if (!modelSchemas.length) {
            throw new ModelNotFoundException();
        }

        const updatedData = [];

        if (modelSchemas.length > 1) {
            throw new MultipleModelsException();
        }

        const modelSchema = modelSchemas[0];

        const Model = await GenerateModel(modelSchema);
        const modelData = req.body[modelSchema.name];
        let result;

        if (modelData.length) {
            result = await Model.insertMany(modelData);
        } else {
            const modelInstance = new Model(modelData);
            result = await modelInstance.save();
        }

        updatedData.push({ [modelSchema.name]: result });
        return successResponse(res, updatedData, "Data updated successfully");
    } catch (error) {
        const errorObject = error?.response?.data || error;
        errorResponse(res, errorObject, error.statusCode || 500);
    }
};

module.exports = {
    updateModeldatas,
    updateModeldata
};