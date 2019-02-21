const admin = require("firebase-admin");

import collections from "../constants/collections";

const getRoleId = (requestAuthorId: string) => {
  let roleId = null;
  admin
    .firestore()
    .collection(collections.users)
    .doc(requestAuthorId)
    .get()
    .then((documentSnapshot: any) => {
      roleId = documentSnapshot.get("roleId");
    })
    .catch(() => {
      console.log("Error getting roleID");
    });

  return roleId;
};

export default getRoleId;
