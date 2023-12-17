const routesConfig = [
    {
        method: 'post',
        path: '/updateApplicationModel',
        controller: require('../controllers/ApplicationModel/saveModel').saveModel,
        middleware: [],
        inputSchema: {
            key: "ApplicationModel",
            version: "1"
        },
        description: "Save Application Model"
    }, 
    {
        method: 'get',
        path: '/getApplicationModel',
        controller: require('../controllers/ApplicationModel/getApplication').getApplication,
        middleware: [],
        inputSchema: {
            key: "GetApplicationModel",
            version: "1"
        },
        description: "Get Application Model"
    }
]

module.exports = routesConfig