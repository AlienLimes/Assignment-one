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


// addFishtank(fishtank) {
//   this.store.addCollection(this.collection, fishtank);
// },
  async addFishtank(fishtank, file, response) {
  try {
    fishtank.picture = await this.store.addToCloudinary(file);
    this.store.addCollection(this.collection, fishtank);
    response();
  } catch (error) {
    logger.error("Error processing fishtank:", error);
    response(error);
  }
},

//   removeFishtank(id) {
//   const fishtank = this.getFishtank(id);
//   this.store.removeCollection(this.collection, fishtank);
// },
async removeFishtank(id, response) {
  const fishtank = this.getFishtank(id);
  if (fishtank.picture && fishtank.picture.public_id) {
    try {
      await this.store.deleteFromCloudinary(fishtank.picture.public_id);
      logger.info("Cloudinary image deleted");
    } catch (err) {
      logger.error("Failed to delete Cloudinary image:", err);
    }
  }
  this.store.removeCollection(this.collection, fishtank);
  response();
},

   editFish(id, fishId, updatedFish) {
    this.store.editItem(this.collection, id, fishId, this.array, updatedFish);
},
 
searchFishtank(search) {
  return this.store.findBy(
    this.collection,
    (fishtank => fishtank.title.toLowerCase().includes(search.toLowerCase())))
},


getUserFishtanks(userid) {
  return this.store.findBy(this.collection, (fishtank => fishtank.userid === userid));
},

searchUserFishtanks(search, userid) {
  return this.store.findBy(
    this.collection,
    (fishtank => fishtank.userid === userid && fishtank.title.toLowerCase().includes(search.toLowerCase())))
},

};

export default fishStore;




