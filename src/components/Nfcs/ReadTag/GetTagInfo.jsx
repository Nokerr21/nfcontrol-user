import logReadTag from "./LogReadTag";
import axios from "../../../axios";
import logReadTagTest from "./LogReadTagInfo"
import { getDateAndTime } from "../../Date/GetDateAndTime";

export default async function getTagInfo(event) {
  const decoder = new TextDecoder();
  logReadTagTest("Reading tag... Step[2/3]");
  for (const record of event.message.records) {
    var dateTime = getDateAndTime();
    axios.get('/nfcs/' + decoder.decode(record.data)).then(function(result){
      if(result.data.batchNumber != undefined){
        logReadTagTest("Success!");
        if(result.data.index != undefined) {
          logReadTag("Product information:\n" + result.data.info.toString() + "\nIndex: " + result.data.index.toString() +
          "\nBatch number: " + result.data.batchNumber.toString() + "\nTagged at: " + result.data.timeStamp.toString() +
          "\nRead at: " + dateTime);
        }
        else {
          logReadTag("Product information:\n" + result.data.info.toString() + "\nBatch number: " +
          result.data.batchNumber.toString() + "\nTagged at: " + result.data.timeStamp.toString() + "\nRead at: " + dateTime);
        }
      }
      else{
        logReadTagTest("Success!");
        if(result.data.index != undefined) {
          logReadTag("Product information:\n" + result.data.info.toString() + "\nIndex: " + result.data.index.toString() +
          "\nTagged at: " + result.data.timeStamp.toString() + "\nRead at: " + dateTime);
        }
        else {
          logReadTag("Product information:\n" + result.data.info.toString() + "\nTagged at: " +
          result.data.timeStamp.toString() + "\nRead at: " + dateTime);
        }
      }
    }).catch(err => {
        if (err.name == 'TypeError') {
          logReadTagTest("Oops!");
          logReadTag("This tag is no longer in our database.");
        }
        else {
          logReadTagTest("This tag is not defined in our database.");
          logReadTag('Message saved on this tag:\n' + decoder.decode(record.data));
        }
      });
  }    
}