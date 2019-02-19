const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.addRole = functions.https.onCall((data: any, context: any) => {
  const request = data.data;
  const userId = context.auth.uid;

  const pushInDatabase = (role: string) => {
    return admin
      .firestore()
      .collection("id/")
      .doc(userId)
      .set({
        roleId: role
      })
      .then(function(docRef: any) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error: any) {
        console.error("Error adding document: ", error);
      });
  };

  if (request.roleId === "admin") {
    pushInDatabase("admin");
  } else if (request.roleId === "userPro") {
    pushInDatabase("userPro");
  } else if (request.roleId === "user") {
    pushInDatabase("user");
  }
});
