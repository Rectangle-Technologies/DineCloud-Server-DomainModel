// importing libraries
const { successResponse, errorResponse } = require('../utils/response');
const jwt = require('@netra-development-solutions/utils.crypto.jsonwebtoken');
const User = require('../models/User');
const { TokenNotProvidedException, TokenNotValidException } = require('../exceptions/Base');
const { UserNotFoundException, UnauthorisedException } = require('../exceptions/UserException');
const whitelistApis = require('../constants/whitelist/apis');
const whitelistIpAddress = require('../constants/whitelist/ipAddress');

const authenticateUserMiddleware = async (req, res, next) => {
    try {
        // check incoming request ip address
        const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const isIpAddressWhitelisted = whitelistIpAddress.includes(ipAddress);
        const isApiWhitelisted = whitelistApis.includes(req.originalUrl.split('?')[0]);

        if (!isIpAddressWhitelisted || !isApiWhitelisted) {
            throw new UnauthorisedException();
        }

        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new TokenNotProvidedException();
        }

        if (jwt.verify(token)) {
            const decoded = jwt.decode(token);

            const user = await User.findById(decoded?._id)

            if (user == null || user == undefined || user == '') {
                throw new UserNotFoundException();
            }

            req.user = user;
            req.token = token;

        } else {
            throw new TokenNotValidException();
        }
        next();
    } catch (error) {
        // responding with unauthorized error
        errorResponse(res, error, error.statusCode || 500);
    }
}

module.exports = authenticateUserMiddleware;