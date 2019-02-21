const admin = require("firebase-admin");

import collections from "../constants/collections";
import User from "../wrappers/User";

const writeUser = (role: string, user: string) => {
  return new Promise((resolve, reject) => {
    admin
      .firestore()
      .collection(collections.users)
      .doc(user)
      // .set(new User(role))
      .set({ ...new User(role) })
      .then((docRef: any) => {
        resolve();
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error: any) => {
        reject();
        console.error("Error adding document: ", error);
      });
  });
};

export default writeUser;
