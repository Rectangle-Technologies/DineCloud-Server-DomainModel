const DomainModel = require('../../models/DomainModel');

const { successResponse, errorResponse } = require('../../utils/response');

const updateDomainModel = async (req, res) => {
    try {
        const { _id } = req.body;

        if (_id) {
            const domainModel = await DomainModel.findById(_id);
            if (domainModel) {
                domainModel.schema = req.body.schema;
            } else {
                return errorResponse(res, {error: 'Domain Model not found'}, 404);
            }

            return successResponse(res, await domainModel.save(), "Domain Model updated successfully");
        }

        const domainModel = await DomainModel.find({
            name: req.body.name
        });
        if (domainModel.length) {
            return errorResponse(res, {error: 'Domain Model already exists'}, 400);
        }

        const newDomainModel = new DomainModel(req.body);

        return successResponse(res, await newDomainModel.save(), "Domain Model created successfully");
    } catch (error) {
        errorResponse(res, error, 500);
    }

};

module.exports = {
    updateDomainModel
}