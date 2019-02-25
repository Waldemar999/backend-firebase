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

const changeItemInDb = (
  itemId: string,
  itemName: string | undefined,
  itemCount: number | undefined
) => {
  const name = itemName ? itemName : null;
  const count = itemCount ? itemCount : null;

  if (name === null && count === null) {
    return Promise.reject(
      new functions.https.HttpsError(
        "Error adding item in database, nothing to change"
      )
    );
  }

  const setObject = <any>{};
  if (name) {
    setObject.name = name;
  }
  if (count) {
    setObject.count = count;
  }

  return new Promise((resolve, reject) => {
    return admin
      .firestore()
      .collection(collections.items)
      .doc(itemId)
      .update(setObject)
      .then(() => {
        resolve();
      })
      .catch((error: any) => {
        reject();
        new functions.https.HttpsError(
          "Error changing item in database",
          error
        );
      });
  });
};

export { addItemInDb, changeItemInDb };
