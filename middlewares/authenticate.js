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
                    "User": {},
                    "Developer": {}
                }
            }, res);

            const User = await GenerateModel(schemas.filter(schema => schema.name === 'User')[0]);
            const Developer = await GenerateModel(schemas.filter(schema => schema.name === 'Developer')[0]);

            // Check for user
            const user = await User.find({ clientCode: decoded?.clientCode, _id: decoded._id });
            if (user) {
                req.user = { ...user[0], role: 1 };
                req.token = token;
                return next();
            }
            // Check for developer
            const developer = await Developer.findById(decoded._id);
            if (!developer) {
                throw new UserNotFoundException();
            }
            req.user = { ...developer, role: 0 };
            req.token = token;
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