const admin = require("firebase-admin");
const functions = require("firebase-functions");

import collections from "../constants/collections";
import roles from "../constants/roles";

import User from "../wrappers/User";

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

const isAdmin = (requestAuthorId: string) => {
  return Promise.all([getUserRoleId(requestAuthorId), getRoleId(roles.admin)])
    .then(([userRoleId, adminRoleId]) => {
      if (userRoleId === adminRoleId) {
        return Promise.resolve();
      } else {
        return Promise.reject(
          new functions.https.HttpsError(
            "You are not allowed to change data in the database."
          )
        );
      }
    })
    .catch((error: any) => {
      new functions.https.HttpsError(error);
    });
};

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

export { isRoleExist, writeUser, isAdmin, getUserRoleId, getRoleId };
