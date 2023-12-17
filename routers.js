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
    }
];

module.exports = routers;