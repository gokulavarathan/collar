module.exports = {
    apps: [{
        name: "backend",
        script: "./tratsrevres/trats.js",
        log: './logs/combined.outerr.log',
        error_file: "./logs/error.log",
        watch: true,
        ignore_watch: ["logs/*"],
        env: {
            "NODE_ENV": "local"
        },
        env_development: {
            "NODE_ENV": "demo"
        },
        env_production: {
            "NODE_ENV": "prod"
        }
    }]
}