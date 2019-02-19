import collections from "../constants/collections";
import rolesIdentifiers from "../constants/rolesIdentifiers";

import SetUser from "../wrappers/SetUser";

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const setRole = functions.https.onCall((data: any, context: any) => {
  const request = data.data;
  const userId = context.auth.uid;

  const pushInDatabase = (role: string) => {
    return admin
      .firestore()
      .collection(collections.users)
      .doc(userId)
      .set(new SetUser(role))
      .then(function(docRef: any) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error: any) {
        console.error("Error adding document: ", error);
      });
  };

  for (let id in rolesIdentifiers) {
    if (id === request.roleId) {
      pushInDatabase(request.roleId);
      break;
    }
  }
});

export default setRole;
