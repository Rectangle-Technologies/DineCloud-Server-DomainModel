const routers = [
    {
        path: '/api/healthCheck',
        router: require('./routes/healthCheck')
    },
    {
        path: '/api/application',
        router: require('./routes/application')
    },
    {
        path: '/api/domainModel',
        router: require('./routes/domainModel')
    },
    {
        path: '/api/model',
        router: require('./routes/model')
    }
];

module.exports = routers;