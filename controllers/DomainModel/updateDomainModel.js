const DomainModel = require('../../models/DomainModel');
const { DomainModelEngine } = require("@nds-core/domain-model-engine")

const { successResponse, errorResponse } = require('../../utils/response');

const updateDomainModel = async (req, res) => {
    try {
        const domainModelEngine = new DomainModelEngine();
        const { _id } = req.body;

        if (_id) {
            const domainModel = await DomainModel.findById(_id);
            if (domainModel) {
                domainModel.schema = domainModelEngine.convertToMongooseSchema(req.body.name, req.body.schema);
            } else {
                return errorResponse(res, { error: 'Domain Model not found' }, 404);
            }

            return successResponse(res, await domainModel.save(), "Domain Model updated successfully");
        }
        const domainModel = await DomainModel.find({
            name: req.body.name,
            clientId: req?.user?.clientId || req?.body?.clientId,
        });
        if (domainModel.length) {
            return errorResponse(res, { error: 'Domain Model already exists' }, 400);
        }

        req.body.schema = domainModelEngine.convertToMongooseSchema(req.body.name, req.body.schema);
        const newDomainModel = new DomainModel(req.body);

        return successResponse(res, await newDomainModel.save(), "Domain Model created successfully");
    } catch (error) {
        console.log(error);
        errorResponse(res, error, 500);
    }

};

module.exports = {
    updateDomainModel
}