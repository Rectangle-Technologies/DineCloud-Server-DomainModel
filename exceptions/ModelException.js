const error = require('../constants/message/error');

class ModelNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = error.ModelNotFoundException;
        this.message = message || error.MODEL_NOT_FOUND;
        this.statusCode = 404;
    }
}

class MultipleModelsException extends Error {
    constructor(message) {
        super(message);
        this.name = error.MultipleModelsException;
        this.message = message || error.MULTIPLE_MODELS_NOT_ALLOWED;
        this.statusCode = 404;
    }
}

module.exports = {
    ModelNotFoundException,
    MultipleModelsException
};