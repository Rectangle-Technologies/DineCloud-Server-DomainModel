const DomainModel = require('../../models/DomainModel');

const { successResponse, errorResponse } = require('../../utils/response');

const getDomainModelsByFilter = async (req, res) => {
    try {
        const domainModels = await DomainModel.find(req.body);

        if (!!domainModels.length) {
            return successResponse(res, domainModels, "Domain Models fetched successfully");
        }

        return errorResponse(res, { error: 'Not found', message: 'Domain models not found' }, 404);

    }
    catch (error) {
        errorResponse(res, error, 500);
    }
};

module.exports = {
    getDomainModelsByFilter
}