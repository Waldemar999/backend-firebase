const admin = require("firebase-admin");
const functions = require("firebase-functions");

import collections from "../../constants/collections";
import Item from "../../wrappers/Item";

const addItemInDb = (itemName: string, itemCount: number) => {
  return new Promise((resolve, reject) => {
    return admin
      .firestore()
      .collection(collections.items)
      .doc()
      .set({ ...new Item(itemName, itemCount) })
      .then(() => {
        resolve();
      })
      .catch((error: any) => {
        reject();
        new functions.https.HttpsError("Error adding item in database", error);
      });
  });
};

export { addItemInDb };
