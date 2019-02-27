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

const getUserRoleId = (authorId: string): Promise<any> => {
  return admin
    .firestore()
    .collection(collections.users)
    .doc(authorId)
    .get()
    .then((documentSnapshot: any) => {
      return documentSnapshot.get("roleId");
    })
    .catch((error: any) => {
      new functions.https.HttpsError("Error getting user role ID", error);
    });
};

const isRoleExist = async (roleId: string): Promise<any> => {
  let result = null;
  try {
    result = await admin
      .firestore()
      .collection(collections.roles)
      .doc(roleId)
      .get();
    if (!result.exists) {
      throw new functions.https.HttpsError("Error: role is not exist");
    }
  } catch (error) {
    result = Promise.reject();
  }
  return result;
};

export { isRoleExist, getUserRoleId, getRoleId };
