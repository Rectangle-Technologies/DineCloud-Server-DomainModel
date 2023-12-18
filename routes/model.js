const updateModeldata = require("../controllers/Models/updateModeldata");

const routesConfig = [
    {
        method: 'post',
        path: '/updateData',
        controller: updateModeldata,
        middleware: [],
        inputSchema: {
            key: 'ModelsAPI',
            version: '1'
        },
        description: 'Update model data'
    }
];

module.exports = routesConfig;