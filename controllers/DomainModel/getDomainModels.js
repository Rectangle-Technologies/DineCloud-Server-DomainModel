const DomainModel = require('../../models/DomainModel');

const { successResponse, errorResponse } = require('../../utils/response');

const getDomainModel = async (req, res) => {
    try {
        const { limit = 10, skip = 0 } = req.query;

        const domainModels = await DomainModel.find({}).limit(limit).skip(skip);

        if (!!domainModels.length) {
            return successResponse(res, domainModels, "Domain Models fetched successfully");
        }

        return errorResponse(res, {error: 'Domain Models not found'}, 404);
    
    }
    catch (error) {
        errorResponse(res, error, 500);
    }
};

module.exports = {
    getDomainModel
}