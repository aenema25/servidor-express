const winston = require('winston');
const optionWinston = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'cyan',
        http: 'blue',
        verbose: 'white',
        debug: 'green'
    }
}

const loggerProd = winston.createLogger({
    levels: optionWinston.levels,
    transports: [

        new winston.transports.File({
            filename: 'api-errors.log',
            level: "warn",
            format: winston.format.combine(
                winston.format.colorize({ colors: optionWinston.colors }),
                winston.format.simple()
            )
        }),
    ]
})

const loggerDev = winston.createLogger({
    levels: optionWinston.levels,
    transports: [
        new winston.transports.Console
            ({
                level: "debug",
                format: winston.format.combine(
                    winston.format.colorize({ colors: optionWinston.colors }),
                    winston.format.simple()
                )
            }),
    ]
})

const mdwLooger = (req, res, next) => {
    req.logger = (process.env.NODE_ENV) ? loggerProd : loggerDev;
    req.logger.http(`${req.method} `);
    next();
}
module.exports = {
    mdwLooger,
    logger: process.env.NODE_ENV ? loggerProd : loggerDev
}  