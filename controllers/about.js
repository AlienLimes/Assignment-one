
'use strict';

import logger from "../utils/logger.js";
import fishStore from '../models/fish-store.js';
import accounts from './accounts.js';

const about = {
  createView(request, response) {

    logger.info("About page loading!");

    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      const statistics = fishStore.getAllFish();

      const viewData = {
        title: "About Fish App",
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        currentYear: new Date().getFullYear(),
        statistics: statistics,
      };

      response.render('about', viewData);
    } else {
      response.redirect('/');
    }
  },
};

export default about;