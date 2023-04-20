/* eslint-disable */
const { TextAnalysisClient, AzureKeyCredential } = require("@azure/ai-language-text")
const key = 'c2b22aab8bf344e589901ccbc7554dff'
const endpoint = 'https://keyvaluegeneration.cognitiveservices.azure.com/'
const fs = require('fs')
const pdfParse = require('pdf-parse')

async function getRecordsFromAzure() {
let documents = []
const pdfData = fs.readFileSync('./src/Controllers/invoice-1.pdf')
const options = {} // Options for parsing the PDF file
const parsedPDF = await pdfParse(pdfData, options)
const pdfText = parsedPDF.text
documents.push(pdfText)

    console.log("== NER sample ==")
    const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(key))
    const results = await client.analyze("EntityRecognition", documents)
    for (const result of results) {
        console.log(result)
    //   console.log(`- Document ${result.id}`)
      if (!result.error) {
        // console.log("\tRecognized Entities:");
        for (const entity of result.entities) {
          //console.log(`\t- Entity ${entity.text} of type ${entity.category}`)
        }
      } else console.error("\tError:", result.error)
    }
  }

//call the main function
getRecordsFromAzure().catch((err) => {
    console.error("The sample encountered an error:", err)
});