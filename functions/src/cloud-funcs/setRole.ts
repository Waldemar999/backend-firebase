const functions = require("firebase-functions");

import isAdmin from "../helpers/admin/isAdmin";
import isRoleExist from "../helpers/isRoleExist";
import writeUser from "../helpers/admin/writeUser";

interface httpsRequest {
  data: {
    userId: string;
    roleId: string;
  };
}
// access to the function have: admin with ID 10M1axs9W6UNxmLesmN6 and manager with ID fwOxMZlkAbuP9rwI4We2
const setRole = functions.https.onCall((data: httpsRequest, context: any) => {
  const request = data.data;
  const userId = request.userId;
  const roleId = request.roleId;

  return isAdmin(context.auth.uid)
    .then(() => {
      isRoleExist(roleId)
        // tslint:disable-next-line:no-unsafe-any
        .then(() => {
          // tslint:disable-next-line:no-unsafe-any
          writeUser(roleId, userId);
          // tslint:disable-next-line:no-unsafe-any
        })
        .catch((error: any) => {
          console.error("Error writing user: ", error);
        });
    })
    .catch((error: any) => {
      console.error("Error setting role: ", error);
    });
});

export default setRole;
