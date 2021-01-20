import 'dotenv/config';
const winston = require('winston');
const fs = require('fs');
require('winston-daily-rotate-file');

// directory path to write the logs
let logDirectory = './logs';

// Create the directory if it does not existss
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Formating the log message
const alignedWithDateAndTime = winston.format.combine(
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(info => {
    const { timestamp, level, message, ...args } = info;
    const ts = timestamp.slice(0, 19).replace('T', ' ');
    return `${ts} [${level}]: ${message} ${
      Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
    }`;
  }),
);

// configuration to write file in a directory
let options = {
  file: {
    level: process.env.ENV === 'development' ? 'debug' : 'info',
    datePattern: 'YYYY-MM-DD',
    filename: `${logDirectory}/%DATE%-online-rent.log`,
    zippedArchive: true,
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: true,
    maxsize: '20m', // 20MB
    colorize: true,
    maxFiles: '7d', // 7 days
  },
};

module.exports.logger = new winston.createLogger({
  format: alignedWithDateAndTime,
  transports: [
    ...(process.env.ENV === 'development'
      ? [new winston.transports.Console()]
      : []),
    new winston.transports.DailyRotateFile(options.file),
  ],
  exceptionHandlers: [new winston.transports.DailyRotateFile(options.file)],
  exitOnError: false,
});
