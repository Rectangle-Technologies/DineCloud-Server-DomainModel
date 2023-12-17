const routers = [
    {
        path: '/api/healthCheck',
        router: require('./routes/healthCheck')
    },
    {
        path: '/api/application',
        router: require('./routes/application')
    }
];

module.exports = routers;