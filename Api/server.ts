/* eslint no-console: 0 */
///<reference path="./typings/tsd.d.ts"/>
import * as express from 'express';
import * as cors from 'cors';
import * as falcorExpress from 'falcor-express';
import * as bodyParser from 'body-parser';

import todoRouter from './todo-router';

const port = process.env.PORT != null ? process.env.PORT : 1337;
const app = express();

app.use(cors({
    origin: 'http://localhost:50814',
    credentials: true
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/model.json',falcorExpress.dataSourceRoute(() => new todoRouter()));

console.log('port => ' + port)
app.listen(port);
