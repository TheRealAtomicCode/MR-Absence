const { tr } = require('date-fns/locale');
const { selectStartData, selectEndData, checkIfAbsenceUnderMultipleYears, checkIfAbsenceExists, selectDaysToDeduct } = require('./selectors');



const addVariableDaysToBrhr = async (page, absence) => {

        await page.goto(`https://app.brighthr.com/employee/${absence.brhrID}/absence`, { waitUntil: "domcontentloaded" });
        
        await page.waitForSelector('select[name="absenceType"]');
        await page.select('select[name="absenceType"]', absence.absenceType);

        try{
            await selectStartData(page, absence.employeeName, absence.startYear, absence.startMonthIndex, absence.startBrhrDate);
            await selectEndData(page, absence.employeeName, absence.endYear, absence.endMonthIndex, absence.endBrhrDate);
            
            await checkIfAbsenceUnderMultipleYears(absence.fullName, absence.startYear, absence.endYear, absence.startBrhrDate, absence.endBrhrDate);

            await checkIfAbsenceExists(page, absence.fullName, absence.startBrhrDate, absence.endBrhrDate);

            await selectDaysToDeduct(page, absence.fullName, absence.durationInDays, absence.startBrhrDate, absence.endBrhrDate);
        }catch(err){
            console.log({error: 'exit task absence'});
        }

        

        if(absence.startYear === absence.endYear - 1){
            // select 2 deductions
        }

        

       

        
        
            
    
    return;
}

module.exports = { addVariableDaysToBrhr }