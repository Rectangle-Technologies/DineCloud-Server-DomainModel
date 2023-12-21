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
        method: 'get',
        path: '/getDataById',
        controller: getModelDataById,
        middleware: [],
        inputSchema: {
            key: 'ModelsAPI',
            version: '1'
        },
        description: 'Get model data by id'
    }
];

module.exports = routesConfig;