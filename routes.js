'use strict';

import express from 'express';
import logger from "./utils/logger.js";

const router = express.Router();

import start from './controllers/start.js';
import about from './controllers/about.js'; 
import dashboard from './controllers/dashboard.js'; 
import fishtank from './controllers/fishtank.js';

router.get('/', start.createView);
router.get('/about', about.createView); 
router.get('/dashboard', dashboard.createView);
router.get('/fishtank/:id', fishtank.createView);

// delete fish
router.get('/fishtank/:id/deletefish/:fishid', fishtank.deleteFish);
// delete cleaning
router.get('/fishtank/:id/deletecleaning/:cleaningid', fishtank.deleteCleaning);
// delete fishtank
router.get('/dashboard/deletefishtank/:id', dashboard.deleteFishtank);

// add fish
router.post('/fishtank/:id/addfish', fishtank.addFish);
// add cleaning
router.post('/fishtank/:id/addcleaning', fishtank.addCleaning);
// add fishtank
router.post('/dashboard/addfishtank', dashboard.addFishtank);
//edit fish
router.post('/fishtank/:id/updatefish/:fishid', fishtank.updateFish);
//edit cleanig
router.post('/fishtank/:id/updatecleaning/:cleaningid', fishtank.updateCleaning);






router.get('/error', (request, response) => response.status(404).end('Page not found.'));

export default router;