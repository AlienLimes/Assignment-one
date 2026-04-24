'use strict';

import express from 'express';
import logger from "./utils/logger.js";

const router = express.Router();

import start from './controllers/start.js';
import about from './controllers/about.js'; 
import dashboard from './controllers/dashboard.js'; 
import fishtank from './controllers/fishtank.js';
import stats from './controllers/stats.js';
import accounts from './controllers/accounts.js';





// router.get('/', start.createView);
router.get('/start', start.createView);

router.get('/about', about.createView); 
router.get('/dashboard', dashboard.createView);
router.get('/fishtank/:id', fishtank.createView);

// delete fish
router.get('/fishtank/:id/deletefish/:fishid', fishtank.deleteFish);
// delete cleaning
router.get('/fishtank/:id/deletecleaning/:cleaningid', fishtank.deleteCleaning);
// delete fishtank
router.get('/dashboard/deletefishtank/:id', dashboard.deleteFishtank);
//statistic
router.get('/stats', stats.createView);
//search
router.get('/searchFishtank', dashboard.createView);
//sorting
router.get('/sortFishtank', dashboard.createView);


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


router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);




router.get('/error', (request, response) => response.status(404).end('Page not found.'));

export default router;