import roles from "../../constants/roles";

import getUserRoleId from "../getUserRoleId";
import getRoleId from "../getRoleId";

const isAdmin = (requestAuthorId: string) => {
  return Promise.all([
    getUserRoleId(requestAuthorId),
    getRoleId(roles.admin)
  ]).then(([userRoleId, adminRoleId]) => {
    if (userRoleId === adminRoleId) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  });
};

export default isAdmin;
