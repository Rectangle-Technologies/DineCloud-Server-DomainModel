const { ModelNotFoundException } = require('../../exceptions/ModelException');
const { FetchModels, GenerateModel } = require('../../utils/modelGenerator');
const { successResponse, errorResponse } = require('../../utils/response');

const deleteModelDataById = async (req, res) => {
    try {
        const modelSchemas = await FetchModels(req, res);
        if (!modelSchemas.length) {
            throw new ModelNotFoundException();
        }

        const modelData = [];
        for (const modelSchema of modelSchemas) {
            const Model = await GenerateModel(modelSchema);
            const result = await Model.deleteOne({ clientId: req.user.clientId, _id: req.body[modelSchema.name]._id });
            modelData.push({ [modelSchema.name]: result });
        }

        return successResponse(res, modelData, "Model data deleted successfully");
    } catch (error) {
        const errorObject = error?.response?.data || error;
        return errorResponse(res, errorObject, 500);
    }
};

module.exports = {
    deleteModelDataById
};