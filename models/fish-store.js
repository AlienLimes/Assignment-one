'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const fishStore = {

  store: new JsonStore('./models/fish-store.json', { fishCollection: [] }),
  collection: 'fishCollection',
  array: 'fish',

  getAllFish() {
    return this.store.findAll(this.collection);
  },

getFishtank(id) {
    return this.store.findOneBy(this.collection, (fishtank => fishtank.id === id));
},

addFish(id, fish) {
    this.store.addItem(this.collection, id, this.array, fish);
},

removeFish(id, fishId) {
    this.store.removeItem(this.collection, id, this.array, fishId);
},


addFishtank(fishtank) {
  this.store.addCollection(this.collection, fishtank);
},
  

  removeFishtank(id) {
  const fishtank = this.getFishtank(id);
  this.store.removeCollection(this.collection, fishtank);
},
   editFish(id, fishId, updatedFish) {
    this.store.editItem(this.collection, id, fishId, this.array, updatedFish);
},


};

export default fishStore;




