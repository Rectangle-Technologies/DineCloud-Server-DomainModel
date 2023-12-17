const routesConfig = [
    {
        method: 'post',
        path: '/updateDomainModel',
        controller: require('../controllers/DomainModel/updateDomainModel').updateDomainModel,
        middleware: [],
        inputSchema: {
            key: "DomainModelSchema",
            version: "1"
        },
        description: "Save Domain Model"
    },
    {
        method: 'get',
        path: '/getDomainModelByID',
        controller: require('../controllers/DomainModel/getDomainModelByID').getDomainModelByID,
        middleware: [],
        inputSchema: {
            key: "DomainModelSchema",
            version: "1"
        },
        description: "Get Domain Model by ID"
    }
]

module.exports = routesConfig