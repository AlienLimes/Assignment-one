


'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import accounts from './accounts.js';

const start = {
  createView(request, response) {
    logger.info("Start page loading!");

    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      const viewData = {
        title: "FishTank App",
        info: appStore.getAppInfo(),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        currentYear: new Date().getFullYear(),
      };
      response.render('start', viewData);
    } else {
      response.redirect('/');
    }
  },
};

export default start;