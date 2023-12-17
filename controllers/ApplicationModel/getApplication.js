const ApplicationModel = require('../../models/ApplicationModel');

const { successResponse, errorResponse } = require('../../utils/response');

const getApplication = async (req, res) => {
    try {
        const { skip, limit } = req.body;
        
        const applications = await ApplicationModel.find()
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        successResponse(res, applications, "Application Models retrieved successfully");
    }
    catch (err) {
        errorResponse(res, err, 500);
    }
}

module.exports = { getApplication };