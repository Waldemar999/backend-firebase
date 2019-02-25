const functions = require("firebase-functions");

import roles from "../../constants/roles";

import { getUserRoleId, getRoleId } from "../services/role";

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

export { isAdmin };
