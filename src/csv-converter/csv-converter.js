const csv = require('csvtojson')

const csvToJsonConverter = async (csvFilePath) => {
    // converting csv to json
    const obj = csv().fromFile(csvFilePath)
            .then(jsonObj => jsonObj)
    
    return obj
}

module.exports = csvToJsonConverter;