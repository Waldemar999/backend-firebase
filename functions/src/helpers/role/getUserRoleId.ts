const admin = require("firebase-admin");
const functions = require("firebase-functions");

import collections from "../../constants/collections";

const getUserRoleId = (requestAuthorId: string) => {
  return admin
    .firestore()
    .collection(collections.users)
    .doc(requestAuthorId)
    .get()
    .then((documentSnapshot: any) => {
      return documentSnapshot.get("roleId");
    })
    .catch((error: any) => {
      new functions.https.HttpsError("Error getting user role ID", error);
    });
};

export default getUserRoleId;
