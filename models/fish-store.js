'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const fishStore = {

  store: new JsonStore('./models/fish-store.json', { fishCollection: [] }),
  collection: 'fishCollection',
  

  getAllFish() {
    return this.store.findAll(this.collection);
  },

};

export default fishStore;
