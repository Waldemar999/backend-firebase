import setRole from "./cloud-funcs/setRole";
import addItem from "./cloud-funcs/addItem";

const admin = require("firebase-admin");

admin.initializeApp();

exports.setRole = setRole;
exports.addItem = addItem;
