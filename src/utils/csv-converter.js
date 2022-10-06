const csv = require('csvtojson');

const csvToJsonConverter = async (csvFilePath) => {
    console.log(csvFilePath);
    // converting csv to json
    const obj = csv().fromFile(csvFilePath)
            .then(jsonObj => jsonObj);
    
    return obj;
}

const splitArray = (jsonObj, field2, field14) => {
    // splitting absences away from default csv array
    let i = 0;
    let newObject = {};
    
    while(i < jsonObj.length){
        if(jsonObj[i].field2 === field2 && jsonObj[i].field14 === field14){
            newObject = jsonObj.slice(i);
            break;
        }
        i++;
    }
    
    return newObject;
}

module.exports = { csvToJsonConverter, splitArray };