const DomainModel = require('../../models/DomainModel');

const { successResponse, errorResponse } = require('../../utils/response');

const getDomainModelByID = async (req, res) => {
    try {
        const { _id } = req.query;

        const domainModel = await DomainModel.findById(_id);

        if (domainModel) {
            return successResponse(res, domainModel, "Domain Model fetched successfully");
        }

        return errorResponse(res, {error: 'Domain Model not found'}, 404);
    
    }
    catch (error) {
        errorResponse(res, error, 500);
    }
};

module.exports = {
    getDomainModelByID
}