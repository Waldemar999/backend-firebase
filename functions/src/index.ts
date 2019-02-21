import setRole from "./cloud-funcs/setRole";

const admin = require("firebase-admin");

admin.initializeApp();

exports.setRole = setRole;
