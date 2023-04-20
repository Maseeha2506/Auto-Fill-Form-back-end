// import { DocumentAnalysisClient, AzureKeyCredential } from "@azure/ai-form-recognizer";

// // Copy the file from the above-linked sample directory so that it can be imported in this module
// import { PrebuiltReceiptModel } from "./prebuilt/prebuilt-receipt";

// import fs from "fs";

// async function main() {
//   const endpoint = "<cognitive services endpoint>";
//   const apiKey = "<api key>";
//   const path = "<path to your receipt document>"; // pdf/jpeg/png/tiff formats

//   const readStream = fs.createReadStream(path);

//   const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));

//   // The PrebuiltReceiptModel `DocumentModel` instance encodes both the model ID and a stronger return type for the operation
//   const poller = await client.beginAnalyzeDocument(PrebuiltReceiptModel, readStream, {
//     onProgress: ({ status }) => {
//       console.log(`status: ${status}`);
//     },
//   });

//   const {  documents: [receiptDocument] } = await poller.pollUntilDone();

//   // The fields of the document constitute the extracted receipt data.
//   const receipt = receiptDocument.fields

//   if (receipt === undefined) {
//     throw new Error("Expected at least one receipt in analysis result.");
//   }

//   console.log(`Receipt data (${receiptDocument.docType})`)
//   console.log("  Merchant Name:", receipt.merchantName?.value)

//   // The items of the receipt are an example of a `DocumentArrayValue`
//   if (receipt.items !== undefined) {
//     console.log("Items:");
//     for (const { properties: item } of receipt.items.values) {
//       console.log("- Description:", item.description?.value)
//       console.log("  Total Price:", item.totalPrice?.value)
//     }
//   }

//   console.log("  Total:", receipt.total?.value);
// }

// main().catch((err) => {
//   console.error("The sample encountered an error:", err);
// });