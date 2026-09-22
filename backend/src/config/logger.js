import winston from "winston";

const { combine, timestamp, json, errors, printf } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = winston.createLogger({
    level: "info",
    format: combine(timestamp(), logFormat),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(timestamp(), logFormat)
        })],
});

if (process.env.NODE_ENV === "production") {
    logger.add(
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    )
}

export default logger;
