const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const winston = require('winston');

// log directory
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// winston logs setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        winston.format.printf(info => {
            const timestamp = typeof info.timestamp === 'string'
                ? info.timestamp
                : new Date().toISOString(); // fallback 时间格式

            const message = typeof info.message === 'string'
                ? info.message
                : JSON.stringify(info.message); // 转成 JSON 字符串

            return `${timestamp} [${info.level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.File({filename: path.join(logDir, 'error.log'), level: 'error'}),
        new winston.transports.File({filename: path.join(logDir, 'combined.log')})
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

//http request logger
const httpLogger = morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim())
    }
});

module.exports = {
    logger,
    httpLogger,
};