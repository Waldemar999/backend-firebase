const admin = require("firebase-admin");
const functions = require("firebase-functions");

import collections from "../../constants/collections";

const isRoleExist = (roleId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    admin
      .firestore()
      .collection(collections.roles)
      .doc(roleId)
      .get()
      .then((documentSnapshot: any) => {
        if (documentSnapshot.exists) {
          resolve();
        } else {
          reject();
        }
      })
      .catch((error: any) => {
        new functions.https.HttpsError("Error: role is not exist", error);
      });
  });
};

export default isRoleExist;
