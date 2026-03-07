'use strict';

import logger from '../utils/logger.js';
import fishStore from '../models/fish-store.js';

const fishtank = {
  createView(request, response) {
    const fishtankId = request.params.id;
    logger.debug(`Fishtank id = ${fishtankId}`);
    
    const viewData = {
      title: 'Fishtank',
      singleFishtank: fishStore.getFishtank(fishtankId)
    };

    response.render('fishtank', viewData);
  },
};

export default fishtank;


