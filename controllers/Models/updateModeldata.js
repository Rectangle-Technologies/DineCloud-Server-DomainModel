const { GenerateModel, FetchModels } = require('../../utils/modelGenerator');
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

module.exports = updateModeldata;