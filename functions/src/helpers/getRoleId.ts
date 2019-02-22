const admin = require("firebase-admin");

import collections from "../constants/collections";

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
      console.error("Error getting document id", error);
    });
};

export default getRoleId;
