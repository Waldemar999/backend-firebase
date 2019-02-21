const functions = require("firebase-functions");

import isAdmin from "../helpers/isAdmin";
import isRoleExist from "../helpers/isRoleExist";
import writeUser from "../helpers/writeUser";

// access to the function have: only admin with ID 10M1axs9W6UNxmLesmN6
const setRole = functions.https.onCall((data: any, context: any) => {
  let request = data.data;
  let roleId = request.roleId;
  let userId = request.userId;

  return isAdmin(context.auth.uid).then(() => {
    isRoleExist(roleId).then(() => {
      writeUser(roleId, userId);
    });
  });
});

export default setRole;
