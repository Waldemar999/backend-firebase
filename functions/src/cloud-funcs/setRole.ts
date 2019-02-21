const functions = require("firebase-functions");
const admin = require("firebase-admin");

import collections from "../constants/collections";
import User from "../wrappers/User";

// access to the function have: only admin with ID 10M1axs9W6UNxmLesmN6
const setRole = functions.https.onCall((data: any, context: any) => {
  const request = data.data;
  const userId = request.userId;
  let usersRef = admin.firestore().collection(collections.users);

  const pushInDatabase = (role: string) => {
    return usersRef
      .doc(userId)
      .set(new User(role))
      .then(function(docRef: any) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error: any) {
        console.error("Error adding document: ", error);
      });
  };

  const roleExistenceCheck = () => {
    let collectionRef = admin.firestore().collection(collections.roles);
    return collectionRef
      .listDocuments()
      .then((documentRefs: any) => {
        return admin.firestore().getAll(documentRefs);
      })
      .then((documentSnapshots: any) => {
        for (let document of documentSnapshots) {
          if (document.exists) {
            console.log(`Found document with data: ${document.id}`);
            if (document.id === request.roleId) {
              pushInDatabase(request.roleId);
              break;
            }
          } else {
            console.log(`Found missing document: ${document.id}`);
          }
        }
      });
  };

  const accessCheck = () => {
    let requestAuthorId = context.auth.uid;
    return usersRef
      .doc(requestAuthorId)
      .get()
      .then((documentSnapshot: any) => {
        if (documentSnapshot.get("roleId") === "10M1axs9W6UNxmLesmN6") {
          roleExistenceCheck();
        }
      });
  };

  return accessCheck();
});

export default setRole;
