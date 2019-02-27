const admin = require("firebase-admin");
const functions = require("firebase-functions");

import collections from "../../constants/collections";
import Item from "../../wrappers/Item";

const addItemInDb = async (
  itemName: string,
  itemCount: number
): Promise<any> => {
  let result = null;
  try {
    result = await admin
      .firestore()
      .collection(collections.items)
      .doc()
      .set({ ...Item.createFull(itemName, itemCount) });
  } catch (error) {
    result = Promise.reject();
    new functions.https.HttpsError("Error adding item in database", error);
  }
  return result;
};

const changeItemInDb = async (
  itemId: string,
  itemName: string | undefined,
  itemCount: number | undefined
): Promise<any> => {
  const name = itemName ? itemName : null;
  const count = itemCount ? itemCount : null;

  if (name === null && count === null) {
    return Promise.reject(
      new functions.https.HttpsError(
        "Error adding item in database, nothing to change"
      )
    );
  }

  const updateObj = { ...new Item() };
  if (name) {
    updateObj.name = name;
  }
  if (count) {
    updateObj.count = count;
  }

  let result = null;
  try {
    result = await admin
      .firestore()
      .collection(collections.items)
      .doc(itemId)
      .update(updateObj);
  } catch (error) {
    result = Promise.reject();
    new functions.https.HttpsError("Error changing item in database", error);
  }
  return result;
};

export { addItemInDb, changeItemInDb };
