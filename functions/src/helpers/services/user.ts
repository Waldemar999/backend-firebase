const admin = require("firebase-admin");
const functions = require("firebase-functions");

import collections from "../../constants/collections";

import User from "../../wrappers/User";

const writeUser = async (user: string, role: string): Promise<any> => {
  let result = null;
  try {
    result = await admin
      .firestore()
      .collection(collections.users)
      .doc(user)
      .set({ ...new User(role) });
  } catch (error) {
    new functions.https.HttpsError("Error: add user role in database", error);
  }
  return result;
};

export { writeUser };
