const { ModelNotFoundException } = require('../../exceptions/ModelException');
const { FetchModels, GenerateModel } = require('../../utils/modelGenerator');
const { successResponse, errorResponse } = require('../../utils/response');

const getModelDataByFilter = async (req, res) => {
    try {
        const modelSchemas = await FetchModels(req, res);
        if (!modelSchemas.length) {
            throw new ModelNotFoundException();
        }
        const modelData = [];
        for (const modelSchema of modelSchemas) {
            const modelName = modelSchema.name;
            const Model = await GenerateModel(modelSchema);
            const filters = req.body[modelName];
            if (req.header('Bypass-Key') !== process.env.BYPASS_KEY) {
                filters.clientId = req?.user?.clientId;
                filters.clientCode = req?.user?.clientCode;
            }
            const result = await Model.find(filters);
            modelData.push({ [modelName]: result });
        }
        return successResponse(res, modelData, "Model data fetched successfully");
    } catch (error) {
        const errorObject = error?.response?.data || error;
        return errorResponse(res, errorObject, 500);
    }
};

module.exports = {
    getModelDataByFilter
};