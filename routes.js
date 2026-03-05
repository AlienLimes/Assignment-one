'use strict';

import express from 'express';
import logger from "./utils/logger.js";

const router = express.Router();

// add your own routes below

import start from './controllers/start.js';
import about from './controllers/about.js'; 
import dashboard from './controllers/dashboard.js'; 




router.get('/', start.createView);
router.get('/about', about.createView); 
router.get('/dashboard', dashboard.createView);

export default router;
