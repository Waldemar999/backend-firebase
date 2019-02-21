const admin = require("firebase-admin");

import collections from "../constants/collections";
import getRoleId from "../helpers/getRoleId";

const isAdmin = (requestAuthorId: string) => {
  return new Promise((resolve, reject) => {
    admin
      .firestore()
      .collection(collections.roles)
      .get()
      .then((querySnapshot: any) => {
        querySnapshot.forEach((documentSnapshot: any) => {
          if (documentSnapshot.get("name") === "admin") {
            if (documentSnapshot.get("id") === getRoleId(requestAuthorId)) {
              resolve();
            } else {
              reject();
            }
          }
        });
      })
      .catch((error: any) => {
        console.error("Error getting document id", error);
      });
  });
};

export default isAdmin;
