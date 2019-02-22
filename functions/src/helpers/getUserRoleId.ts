const admin = require("firebase-admin");

import collections from "../constants/collections";

const getUserRoleId = (requestAuthorId: string) => {
  return admin
    .firestore()
    .collection(collections.users)
    .doc(requestAuthorId)
    .get()
    .then((documentSnapshot: any) => {
      return documentSnapshot.get("roleId");
    })
    .catch(() => {
      console.log("Error getting roleID");
    });
};

export default getUserRoleId;
