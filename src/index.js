const { csvToJsonConverter, splitArray } = require('./utils/csv-converter');
const { getAbsenceArray, getHrOnlineAbsencesInBrhrFormat } = require('./hrOnlineCsvConverter/getAbsences');
const { getEmployeesArray, getBrhrIDs, mergeEmployeeArray} = require('./hrOnlineCsvConverter/getEmployees');
const { addAbsencesToBrhr } = require('./scraper/addAbsencesToBrhr');

async function getHrOnlineUnifiedAbsences(adminEmail, adminPassword, hrOnlineAbsemceCsv, brhrEmployeeCsv){
    // converting csv to json for brhr employees and hrOnline absences
    const hrOnlineAbsencesJson = await csvToJsonConverter(hrOnlineAbsemceCsv);
    const brhrEmployeesJson = await csvToJsonConverter(brhrEmployeeCsv);
    
    // splitting hrOnline absences and brhr employees away from default csv array
    const splitAbsences = splitArray(hrOnlineAbsencesJson, 'Forename', 'Details');
    const splitEmployees = splitArray(brhrEmployeesJson, 'First Name', 'Home Phone');

    // get absenceArray returns the unified absences with nulls 
    // for employeeType, holidayEntitlementUnit, brhrID and email
    // and will be populated later
    let absencesArray = getAbsenceArray(splitAbsences);

    // get employeesArray returns the employee details from the csv of BRHR
    let employeesArrayWithoutID = getEmployeesArray(splitEmployees);

    // get brhrIDs gets IDs and names of the registered employees in BRHR
    let employeeNamesAndIdsArray = await getBrhrIDs(adminEmail, adminPassword);
    
    // populate the absencesArray with the employee details from the employeesArray
    const employeeArray = mergeEmployeeArray(employeesArrayWithoutID, employeeNamesAndIdsArray);

    // populate the absencesArray with the employee details from the employeesArray
    const absencesArrayWithEmployeeDetails = getHrOnlineAbsencesInBrhrFormat(absencesArray, employeeArray);
 
    
    return absencesArrayWithEmployeeDetails;
}


const unifiedAbsenceArray = require('./scraper/temp');


async function main(adminEmail, adminPassword, hrOnlineAbsemceCsv, brhrEmployeeCsv){
    const hrOnlineAbsences = await getHrOnlineUnifiedAbsences(adminEmail, adminPassword, hrOnlineAbsemceCsv, brhrEmployeeCsv);

    await addAbsencesToBrhr(adminEmail, adminPassword, hrOnlineAbsences);
    
}
        
main('abdalqaderbaghi@gmail.com', 'Brighthr123', './src/csv/AbsenceReport.csv', './src/csv/BRHRcompanyExtract.csv');

//  const { playground } = require('./scraper/playground');
//  playground('abdalqaderbaghi@gmail.com', 'Brighthr123');