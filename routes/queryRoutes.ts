import express from 'express';

import { createData, getData, select } from '../controllers/queryControllers';
const queryRouter = express.Router();

queryRouter.post('/create', createData);

queryRouter.post('/getdata', getData);

export default queryRouter;