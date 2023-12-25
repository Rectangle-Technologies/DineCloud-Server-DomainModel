const { ModelNotFoundException } = require('../../exceptions/ModelException');
const { FetchModels, GenerateModel } = require('../../utils/modelGenerator');
const { successResponse, errorResponse } = require('../../utils/response');

const getModelDataById = async (req, res) => {
    try {
        const modelSchemas = await FetchModels(req, res);
        if (!modelSchemas.length) {
            throw new ModelNotFoundException();
        }

        const modelData = [];

        for (const modelSchema of modelSchemas) {
            const modelName = modelSchema.name;
            const Model = await GenerateModel(modelSchema);
            const result = await Model.findById(req.body[modelName]._id);
            modelData.push({ [modelName]: result });
        }

        return successResponse(res, modelData, "Model data fetched successfully");
    } catch (error) {
        const errorObject = error.response.data || error;
        return errorResponse(res, errorObject, 500);
    }
};

module.exports = {
    getModelDataById
}