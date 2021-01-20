import mongoose from 'mongoose';
import 'dotenv/config';
const logger = require('../config/winston').logger;

/**
 * To connect the db connection
 */
export const connect= ()=>{
// database host
const dbHost = process.env.DB_HOST || '127.0.0.1';
// database port
const dbPort = process.env.DB_PORT || 27017;
// database name
const dbName = process.env.DB_NAME || 'online_renting_platform';
// database user name
const dbUser = process.env.DB_USER || '';
// database password
const dbPass = process.env.DB_PASS || '';
// database credentials
const dbCred =
  dbUser.length > 0 || dbPass.length > 0 ? `${dbUser}:${dbPass}@` : '';
  // database url 
const uri: string = `mongodb://${dbCred}${dbHost}:${dbPort}/${dbName}`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set('useFindAndModify', false);
// connect the mongo db
mongoose
  .connect(uri, options)
  .then(() =>
   // On database connection got success this will be displayed.
   console.log('database connected')
  )
  .catch((error) => {
    //Database connectivity issue the error logs will be captured.
      console.log(
          `please check your database connection...${error.message}`);
    logger.info(error);
    throw error;
  });


}