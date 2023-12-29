const { deleteModelDataByFilter } = require("../controllers/Models/deleteModelDataByFilter");
const { deleteModelDataById } = require("../controllers/Models/deleteModelDataById");
const { getModelDataByFilter } = require("../controllers/Models/getModelDataByFilter");
const { getModelDataById } = require("../controllers/Models/getModelDataById");
const { updateModeldatas, updateModeldata } = require("../controllers/Models/updateModeldata");

const routesConfig = [
    {
        method: 'post',
        path: '/updateModeldatas',
        controller: updateModeldatas,
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
    },
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
        path: '/deleteModeldataByFilter',
        controller: deleteModelDataByFilter,
        middleware: [],
        inputSchema: {
            key: 'ModelsAPI',
            version: '1'
        },
        description: 'Delete model data by filter'
    },
    {
        method: 'post',
        path: '/deleteModeldataById',
        controller: deleteModelDataById,
        middleware: [],
        inputSchema: {
            key: 'ModelsAPI',
            version: '1'
        },
        description: 'Delete model data by id'
    }
];

module.exports = routesConfig;