import express, { Express } from 'express';
import cors from 'cors';
import {UserRoutes,ItemRoutes} from './routes/index';
import bodyParser from 'body-parser';
import {connect} from  './config/db';
import 'dotenv/config';

const app: Express = express();
// To assign port
const port: string | number = +process.env.PORT || 3004;
app.use(cors());
app.use(bodyParser.json())
// user routes
app.use('/api/v1/user', UserRoutes);
// Item routes
app.use('/api/v1/item', ItemRoutes);
// to connect the db
connect()
// start the server 
app.listen(port, () =>
console.log(`Server running on http://localhost:${port}/api/v1/`)
)