const functions = require("firebase-functions");

import { isManager } from "../helpers/workers/role";
import { addItemInDb } from "../helpers/services/item";

interface httpsRequest {
  data: {
    itemName: string;
    itemCount: number;
  };
}
// access to the function have: admin with ID 10M1axs9W6UNxmLesmN6 and manager with ID fwOxMZlkAbuP9rwI4We2
const addItem = functions.https.onCall((data: httpsRequest, context: any) => {
  const request = data.data;
  const itemName = request.itemName;
  const itemCount = request.itemCount;

  return isManager(context.auth.uid).then(() => {
    addItemInDb(itemName, itemCount);
  });
});

export default addItem;
