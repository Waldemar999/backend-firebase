const functions = require("firebase-functions");

import { isManager } from "../helpers/workers/role";
import { changeItemInDb } from "../helpers/services/item";

interface httpsRequest {
  data: {
    itemId: string;
    itemName?: string;
    itemCount?: number;
  };
}
// access to the function have: admin with ID 10M1axs9W6UNxmLesmN6 and manager with ID fwOxMZlkAbuP9rwI4We2
const changeItem = functions.https.onCall(
  (data: httpsRequest, context: any): Promise<any> => {
    const request = data.data;
    const itemId = request.itemId;
    const itemName = request.itemName;
    const itemCount = request.itemCount;

    return isManager("fwOxMZlkAbuP9rwI4We2").then(() => {
      changeItemInDb(itemId, itemName, itemCount);
    });
  }
);

export default changeItem;
