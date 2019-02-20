const functions = require("firebase-functions");
const admin = require("firebase-admin");

import collections from "../constants/collections";
import User from "../wrappers/User";

// const setRole = functions.https.onRequest((req: any, res: any) => {
// const userId = "test1";
// // let user = new User(request.roleId);
// let user = {
//   roleId: "some"
// };
const setRole = functions.https.onCall((data: any, context: any) => {
  const request = data.data;
  const userId = context.auth.uid;

  const pushInDatabase = (role: string) => {
    return admin
      .firestore()
      .collection(collections.users)
      .doc(userId)
      .set(new User(role))
      .then(function(docRef: any) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error: any) {
        console.error("Error adding document: ", error);
      });
  };

  // const roleExistenceCheck = () => {
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
          }
        } else {
          console.log(`Found missing document: ${document.id}`);
        }
      }
    });
  // };
});

export default setRole;
