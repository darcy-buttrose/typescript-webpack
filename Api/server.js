/* eslint no-console: 0 */
import express from 'express';
import cors from 'cors';
import falcorExpress from 'falcor-express';
import bodyParser from 'body-parser';

import todoRouter from './todo-router';

const port = process.env.PORT;
const app = express();

app.use(cors({
    origin: 'http://localhost:50814',
    credentials: true
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/model.json',falcorExpress.dataSourceRoute(() => new todoRouter()));

app.listen(port);
