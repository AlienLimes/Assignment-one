'use strict';

import express from 'express';
import logger from "./utils/logger.js";

const router = express.Router();

// add your own routes below

import start from './controllers/start.js';
import about from './controllers/about.js'; 
import dashboard from './controllers/dashboard.js'; 

import fishtank from './controllers/fishtank.js';





router.get('/', start.createView);
router.get('/about', about.createView); 
router.get('/dashboard', dashboard.createView);
router.get('/fishtank/:id', fishtank.createView);

//new fish
router.post('/fishtank/:id/addfish', fishtank.addFish);


//new cleaning
router.post('/fishtank/:id/addcleaning', fishtank.addCleaning);
export default router;
