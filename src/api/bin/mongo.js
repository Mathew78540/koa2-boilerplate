import mongoose from 'mongoose';
import winston from 'winston';
import { mongoConf } from '../configs';

const onConnected = () => winston.log('info', 'Mongo connection open');
const onDisconnected = () => winston.log('info', 'Mongo disconnected');
const onError = err => { throw err; };

mongoose.Promise = global.Promise;

mongoose.connect(
  `mongodb://${mongoConf.host}/${mongoConf.name}${mongoConf.options}`,
  {
    user: mongoConf.user,
    pass: mongoConf.pass,
  }
);

mongoose.connection.on('error', onError);
mongoose.connection.on('connected', onConnected);
mongoose.connection.on('disconnected', onDisconnected);

// ^C / kill -SIGINT
process.on('SIGINT', () =>
    mongoose.connection.close(() =>
        process.exit(0, winston.log('info', 'Mongo connection disconnected through app termination'))
    )
);

export default new Promise((resolve) => {
  mongoose.connection.on('connected', () => {
    return resolve();
  });
});
