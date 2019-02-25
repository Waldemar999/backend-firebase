import setRole from "./cloud-funcs/setRole";
import addItem from "./cloud-funcs/addItem";
import changeItem from "./cloud-funcs/changeItem";

const admin = require("firebase-admin");

admin.initializeApp();

exports.setRole = setRole;
exports.addItem = addItem;
exports.changeItem = changeItem;
