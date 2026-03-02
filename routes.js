'use strict';

import express from 'express';
import logger from "./utils/logger.js";

const router = express.Router();

// add your own routes below

import start from './controllers/start.js';
import about from './controllers/about.js'; 





router.get('/', start.createView);
router.get('/about', about.createView); 


export default router;
