const admin = require("firebase-admin");
const functions = require("firebase-functions");

import collections from "../../constants/collections";

import User from "../../wrappers/User";

const writeUser = (role: string, user: string) => {
  return new Promise((resolve, reject) => {
    admin
      .firestore()
      .collection(collections.users)
      .doc(user)
      .set({ ...new User(role) })
      .then(() => {
        resolve();
      })
      .catch((error: any) => {
        reject();
        new functions.https.HttpsError(
          "Error: add user role in database",
          error
        );
      });
  });
};

export { writeUser };
