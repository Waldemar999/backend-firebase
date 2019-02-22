const admin = require("firebase-admin");

import collections from "../constants/collections";

const isRoleExist = (roleId: string) => {
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
      .catch(() => {
        console.error("Role is not exist");
      });
  });
};

export default isRoleExist;
