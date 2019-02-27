const functions = require("firebase-functions");

import roles from "../../constants/roles";

import { getUserRoleId, getRoleId } from "../services/role";

const isAdmin = async (requestAuthorId: string): Promise<any> => {
  let result = null;
  try {
    result = await Promise.all([
      getUserRoleId(requestAuthorId),
      getRoleId(roles.admin)
    ]);

    let [userRoleId, adminRoleId] = result;
    if (userRoleId !== adminRoleId) {
      throw new functions.https.HttpsError(
        "You are not allowed to change data in the database."
      );
    }
  } catch (error) {
    result = Promise.reject();
  }
  return result;
};

const isManager = async (requestAuthorId: string): Promise<any> => {
  let result = null;
  try {
    result = await Promise.all([
      getUserRoleId(requestAuthorId),
      getRoleId(roles.manager),
      getRoleId(roles.admin)
    ]);

    let [userRoleId, managerRoleId, adminRoleId] = result;
    if (userRoleId !== adminRoleId || userRoleId !== managerRoleId) {
      throw new functions.https.HttpsError(
        "You are not allowed to change data in the database."
      );
    }
  } catch (error) {
    result = Promise.reject();
  }
  return result;
};

export { isAdmin, isManager };
