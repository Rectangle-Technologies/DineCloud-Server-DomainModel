// importing libraries
const { successResponse, errorResponse } = require('../utils/response');
const jwt = require('@netra-development-solutions/utils.crypto.jsonwebtoken');
const { TokenNotProvidedException, TokenNotValidException } = require('../exceptions/Base');
const { UserNotFoundException } = require('../exceptions/UserException');
const { GenerateModel, FetchModels } = require('../utils/modelGenerator');

const authenticateUserMiddleware = async (req, res, next) => {
    try {
        // By-pass for login
        if (req.header('Bypass-Key') === process.env.BYPASS_KEY) {
            return next();
        }

        // Get token
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new TokenNotProvidedException();
        }

        // Verify token
        if (jwt.verify(token)) {
            const decoded = jwt.decode(token);

            const schemas = await FetchModels({
                body: {
                    "User": {}
                }
            }, res);

            const User = await GenerateModel(schemas[0]);

            // Check for user
            const user = await User.findOne({ clientCode: decoded.clientCode, _id: decoded._id });
            req.token = token;
            req.user = user;
        } else {
            throw new TokenNotValidException();
        }
        next();
    } catch (error) {
        // responding with unauthorized error
        const errorObject = error?.response?.data || error;
        errorResponse(res, errorObject, error.statusCode || 500);
    }
}

module.exports = authenticateUserMiddleware;