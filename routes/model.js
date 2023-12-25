const { getModelDataByFilter } = require("../controllers/Models/getModelDataByFilter");
const { getModelDataById } = require("../controllers/Models/getModelDataById");
const updateModeldata = require("../controllers/Models/updateModeldata");

const routesConfig = [
    {
        method: 'post',
        path: '/updateModeldata',
        controller: updateModeldata,
        middleware: [],
        inputSchema: {
            key: 'ModelsAPI',
            version: '1'
        },
        description: 'Update model data'
    },
    {
        method: 'post',
        path: '/getDataById',
        controller: getModelDataById,
        middleware: [],
        inputSchema: {
            key: 'ModelsAPI',
            version: '1'
        },
        description: 'Get model data by id'
    },
    {
        method: 'post',
        path: '/getDataByFilter',
        controller: getModelDataByFilter,
        middleware: [],
        inputSchema: {
            key: 'ModelsAPI',
            version: '1'
        },
        description: 'Get model data by filter'
    }
];

module.exports = routesConfig;