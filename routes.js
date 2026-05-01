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

// need to fix
// function requireAuth(req, res, next) {
//   if (!req.cookies.fishtank) {
//     return res.redirect('/');
//   }
//   next();
// }

function requireAuth(req, res, next) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  if (!req.cookies.fishtank) {
    return res.redirect('/');
  }
  next();
}

// router.get('/', start.createView);
router.get('/start', requireAuth, start.createView);

router.get('/about', requireAuth, about.createView); 
router.get('/dashboard', requireAuth, dashboard.createView);
router.get('/fishtank/:id', requireAuth, fishtank.createView);

// delete fish
router.get('/fishtank/:id/deletefish/:fishid', requireAuth, fishtank.deleteFish);
// delete cleaning
router.get('/fishtank/:id/deletecleaning/:cleaningid', requireAuth, fishtank.deleteCleaning);
// delete fishtank
router.get('/dashboard/deletefishtank/:id', requireAuth, dashboard.deleteFishtank);
//statistic
router.get('/stats', requireAuth, stats.createView);
//search
router.get('/searchFishtank', requireAuth, dashboard.createView);
//sorting
router.get('/sortFishtank', requireAuth, dashboard.createView);


// add fish
router.post('/fishtank/:id/addfish', requireAuth, fishtank.addFish);
// add cleaning
router.post('/fishtank/:id/addcleaning', requireAuth, fishtank.addCleaning);
// add fishtank
router.post('/dashboard/addfishtank', requireAuth, dashboard.addFishtank);
//edit fish
router.post('/fishtank/:id/updatefish/:fishid', requireAuth, fishtank.updateFish);
//edit cleanig
router.post('/fishtank/:id/updatecleaning/:cleaningid', requireAuth, fishtank.updateCleaning);


router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);




router.get('/error', (request, response) => response.status(404).end('Page not found.'));

export default router;