const functions = require("firebase-functions");
const admin = require("firebase-admin");

import collections from "../constants/collections";
import Item from "../wrappers/Item";
import idGenerator from "../support-tools/idGenerator";

// access to the function have: admin with ID 10M1axs9W6UNxmLesmN6 and prouser with ID fwOxMZlkAbuP9rwI4We2
const addItem = functions.https.onCall((data: any, context: any) => {
  let request = data.data;

  const pushInDatabase = () => {
    return admin
      .firestore()
      .collection(collections.items)
      .doc(idGenerator())
      .set(new Item(request.itemName, request.itemCount))
      .then(function(docRef: any) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error: any) {
        console.error("Error adding document: ", error);
      });
  };

  const accessCheck = () => {
    let requestAuthorId = context.auth.uid;
    return admin
      .firestore()
      .collection(collections.users)
      .doc(requestAuthorId)
      .get()
      .then((documentSnapshot: any) => {
        let roleID = documentSnapshot.get("roleId");
        if (
          roleID === "10M1axs9W6UNxmLesmN6" ||
          roleID === "fwOxMZlkAbuP9rwI4We2"
        ) {
          pushInDatabase();
        }
      });
  };

  return accessCheck();
});

export default addItem;
