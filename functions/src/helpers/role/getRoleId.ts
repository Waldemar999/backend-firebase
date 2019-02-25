const admin = require("firebase-admin");
const functions = require("firebase-functions");

import collections from "../../constants/collections";

const getRoleId = (role: string): Promise<any> => {
  return admin
    .firestore()
    .collection(collections.roles)
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((documentSnapshot: any) => {
        if (documentSnapshot.get("name") === role) {
          return documentSnapshot.get("id");
        }
      });
    })
    .catch((error: any) => {
      new functions.https.HttpsError(
        "Error getting role ID from database",
        error
      );
    });
};

export default getRoleId;
