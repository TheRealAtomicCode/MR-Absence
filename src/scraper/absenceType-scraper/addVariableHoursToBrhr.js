const chalk = require('chalk');
const { 
    selectStartData, 
    selectEndData, 
    checkIfAbsenceUnderMultipleYears, 
    checkIfAbsenceExists, 
    selectHoursToDeduct
} = require('./selectors');


const addVariableHoursToBrhr = async (page, absence) => {

    await page.goto(`https://app.brighthr.com/employee/${absence.brhrID}/absence`, { waitUntil: "domcontentloaded" });
        
    await page.waitForSelector('select[name="absenceType"]');
    await page.select('select[name="absenceType"]', absence.absenceType);

    try{
            
        await selectStartData(page, absence.employeeName, absence.startYear, absence.startMonthIndex, absence.startBrhrDate);
        await selectEndData(page, absence.employeeName, absence.endYear, absence.endMonthIndex, absence.endBrhrDate);
        
        await checkIfAbsenceUnderMultipleYears(absence.fullName, absence.startYear, absence.endYear, absence.startBrhrDate, absence.endBrhrDate, absence.absenceType);

        await checkIfAbsenceExists(page, absence.fullName, absence.startBrhrDate, absence.endBrhrDate, absence.absenceType);
       
        await selectHoursToDeduct(page, absence.fullName, absence.durationInHours, absence.durationInMinutes, absence.startBrhrDate, absence.endBrhrDate, absence.absenceType);

    }catch(err){
        console.log({error: 'exit task absence'});
    }
    
    return;
}

module.exports = { addVariableHoursToBrhr }