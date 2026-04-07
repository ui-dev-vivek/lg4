module.exports = {
    apps: [
        {
            name: 'learnejo-frontend',
            script: 'npm',
            args: 'run dev',
            watch: true,
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};
