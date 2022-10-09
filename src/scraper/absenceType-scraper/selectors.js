function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }


const selectStartData = async (page, employeeName, startYear, startMonthIndex, startBrhrDate) => {
    try{
        // select start date
        await page.click('[data-e2e="startDate-dayPicker"]')
        await page.select('select[name="years"]', `${startYear}`);
        await page.select('select[name="months"]',  `${startMonthIndex}`);
        await page.click(`[aria-label="${startBrhrDate}"]`);
    }catch(err){
        console.log({
            error: `could not select start date for ${employeeName}: ${startBrhrDate}`,
        });
        return new Error('exit task absence');
    }
}

const selectEndData = async (page, employeeName, endYear, endMonthIndex, endBrhrDate) => {
    try{
        //select end date
        await page.click('[data-e2e="endDate-dayPicker"]')
        await page.select('select[name="years"]', `${endYear}`);
        await page.select('select[name="months"]',  `${endMonthIndex}`);
        await page.click(`[aria-label="${endBrhrDate}"]`);
    }catch(err){
        console.log({
            error: `could not select end date for ${employeeName}: ${endBrhrDate} as dates may be incorrect.`,
        });
        throw new Error('exit task absence');
    }
}

const checkIfAbsenceUnderMultipleYears = async (fullName, startYear, endYear, startBrhrDate, endBrhrDate) => {
    try{
        // check if absence extends over multiple years.
        if(startYear !== endYear && startYear < endYear - 1){
            throw new Error(`Could not add absence for ${fullName}: ${startBrhrDate} - ${endBrhrDate} as it falls under multiple years.`);   
        }
    }catch(err){
        console.log({
            error: err.message,
        });
        throw new Error('exit task absence');
    }
}

const checkIfAbsenceExists = async (page, fullName, startBrhrDate, endBrhrDate) => {
    try{
        // check if absence exists or falls over existing absence
        await delay(200)
        const existingAbsence = await page.$('.Wrapper-fHCkiV') || false;
        if(existingAbsence){
            const el = await page.$eval('.Wrapper-fHCkiV', (el) => {
                return el ? el.innerText : false;
            });
            throw new Error(el);
        }
    }catch(err){
        console.log({
            error: `Could not add absence for ${fullName}: ${startBrhrDate} - ${endBrhrDate} as absence already exists.`,
        })
        throw new Error('exit task absence');
    }
}

const selectDaysToDeduct = async (page, fullName, daysToDeduct, startBrhrDate, endBrhrDate, absenceType) => {
    try{
        // select days to deduct
       if(absenceType === 'annual-leave' || absenceType === 'other'){
            await page.type('[name="durationDays"]', `${Number(daysToDeduct)}`);
       }else{
            await page.type('[name="duration"]', `${Number(daysToDeduct)}`);
       }
    }catch(err){
        console.log({
            error: `Could not select days to deduct of the amount: ${daysToDeduct} for ${fullName}: ${startBrhrDate} - ${endBrhrDate}`,
            err: err
        });
        throw new Error('exit task absence');
    }
}

module.exports = { selectStartData, selectEndData, checkIfAbsenceUnderMultipleYears, checkIfAbsenceExists, selectDaysToDeduct }