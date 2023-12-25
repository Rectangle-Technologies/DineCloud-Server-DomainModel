const { FetchModels, GenerateModel } = require('../../utils/modelGenerator');
const { successResponse, errorResponse } = require('../../utils/response');

const getModelDataById = async (req, res) => {
    try {
        const modelSchemas = await FetchModels(req, res);
        if (!modelSchemas.length) {
            return errorResponse(res, "Models not found", 400);
        }

        const modelData = [];

        for (const modelSchema of modelSchemas) {
            const modelName = modelSchema.name;
            const Model = await GenerateModel(modelSchema);
            const result = await Model.findById(req.body[modelName]._id);
            modelData.push({[modelName]: result});
        }

        return successResponse(res, modelData, "Model data fetched successfully");
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Error occured while fetching model data", 500);
    }
};

module.exports = {
    getModelDataById
}