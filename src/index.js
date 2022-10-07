const { csvToJsonConverter, splitArray } = require('./utils/csv-converter');
const { getAbsenceArray, populateAbsenceArray } = require('./hrOnlineCsvConverter/getAbsences');
const { getEmployeesArray, getBrhrIDs, populateEmployeeArray} = require('./hrOnlineCsvConverter/getEmployees');


async function main(adminEmail, adminPassword, hrOnlineAbsemceCsv, brhrEmployeeCsv){
    // converting csv to json for brhr employees and hrOnline absences
    const hrOnlineJson = await csvToJsonConverter(hrOnlineAbsemceCsv);
    const brhrJson = await csvToJsonConverter(brhrEmployeeCsv);
    
    // splitting hrOnline absences and brhr employees away from default csv array
    const splitAbsences = splitArray(hrOnlineJson, 'Forename', 'Details');
    const splitEmployees = splitArray(brhrJson, 'First Name', 'Home Phone');

    // get absenceArray returns the unified absences with nulls 
    // for employeeType, holidayEntitlementUnit, brhrID and email
    // and will be populated later
    let absencesArray = getAbsenceArray(splitAbsences);

    // get employeesArray returns the employee details from the csv of BRHR
    let employeesArrayWithoutID = getEmployeesArray(splitEmployees);

    // get brhrIDs gets IDs and names of the registered employees in BRHR
    let employeeNamesAndIdsArray = await getBrhrIDs(adminEmail, adminPassword);
    
    // populate the absencesArray with the employee details from the employeesArray
    const employeeArray = populateEmployeeArray(employeesArrayWithoutID, employeeNamesAndIdsArray);

    // populate the absencesArray with the employee details from the employeesArray
    const absencesArrayWithEmployeeDetails = populateAbsenceArray(absencesArray, employeeArray);
    
    console.log(absencesArrayWithEmployeeDetails)
}
        
main('abdalqaderbaghi@gmail.com', 'Brighthr123', './src/csv/AbsenceReport.csv', './src/csv/BRHRcompanyExtract.csv');