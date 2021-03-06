const functions = require("firebase-functions");

import { isRoleExist } from "../helpers/services/role";
import { writeUser } from "../helpers/services/user";
import { isAdmin } from "../helpers/workers/role";

interface httpsRequest {
  data: {
    userId: string;
    roleId: string;
  };
}
// access to the function have: only admin with ID 10M1axs9W6UNxmLesmN6
const setRole = functions.https.onCall((data: httpsRequest, context: any) => {
  const request = data.data;
  const userId = request.userId;
  const roleId = request.roleId;

  return isAdmin(context.auth.uid).then(() => {
    isRoleExist(roleId).then(() => {
      writeUser(roleId, userId);
    });
  });
});

export default setRole;
