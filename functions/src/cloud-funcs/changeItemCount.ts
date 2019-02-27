const functions = require("firebase-functions");

import { changeItemInDb } from "../helpers/services/item";

interface httpsRequest {
  data: {
    itemId: string;
    itemCount: number;
  };
}
// access to the function have all users
const changeItem = functions.https.onCall(
  (data: httpsRequest, context: any) => {
    const request = data.data;
    const itemId = request.itemId;
    const itemCount = request.itemCount;

    return changeItemInDb(itemId, undefined, itemCount);
  }
);

export default changeItem;
