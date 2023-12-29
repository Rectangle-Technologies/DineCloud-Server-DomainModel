const { ModelNotFoundException } = require('../../exceptions/ModelException');
const { FetchModels, GenerateModel } = require('../../utils/modelGenerator');
const { successResponse, errorResponse } = require('../../utils/response');

const deleteModelDataByFilter = async (req, res) => {
    try {
        const modelSchemas = await FetchModels(req, res);
        if (!modelSchemas.length) {
            throw new ModelNotFoundException();
        }
        const modelData = [];
        for (const modelSchema of modelSchemas) {
            const Model = await GenerateModel(modelSchema);
            const filters = req.body[modelSchema.name];
            filters.clientId = req.user.clientId;
            filters.clientCode = req.user.clientCode;
            console.log(filters);

            if (!filters.clientCode || !filters.clientId) {
                modelData.push({ [modelSchema.name]: { message: "Cannot delete client data without clientCode or clientId" } });
                continue;
            }

            const result = await Model.deleteMany(filters);
            modelData.push({ [modelSchema.name]: result });
        }
        return successResponse(res, modelData, "Model data deleted successfully");
    } catch (error) {
        const errorObject = error?.response?.data || error;
        return errorResponse(res, errorObject, 500);
    }
};

module.exports = {
    deleteModelDataByFilter
};