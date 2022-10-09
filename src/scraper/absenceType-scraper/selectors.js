const chalk = require('chalk');

async function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
}

async function throwErrorIfElementExists(page, element){
    await delay(200)
    const existingAbsence = await page.$(element) || false;
    if(existingAbsence){
        const el = await page.$eval(element, (el) => {
            return el ? el.innerText : false;
        });
        throw new Error(el);
    }
}


const selectStartData = async (page, employeeName, startYear, startMonthIndex, startBrhrDate) => {
    try{
        // select start date
        await page.click('[data-e2e="startDate-dayPicker"]')
        await page.select('select[name="years"]', `${startYear}`);
        await page.select('select[name="months"]',  `${startMonthIndex}`);
        await page.click(`[aria-label="${startBrhrDate}"]`);
    }catch(err){
        console.log(chalk.red(`could not select start date for ${employeeName}: ${startBrhrDate}`),);
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
        console.log(chalk.red(`could not select end date for ${employeeName}: ${endBrhrDate} as dates may be incorrect.`),);
        throw new Error('exit task absence');
    }
}

const checkIfAbsenceUnderMultipleYears = async (fullName, startYear, endYear, startBrhrDate, endBrhrDate, absenceType) => {
    try{
        // check if absence extends over multiple years.
        if(startYear !== endYear && startYear < endYear - 1){
            throw new Error(`Could not add ${absenceType} for ${fullName}: ${startBrhrDate} - ${endBrhrDate} as it falls under multiple years.`);   
        }
    }catch(err){
        console.log(chalk.red(err.message),);
        throw new Error('exit task absence');
    }
}

const checkIfAbsenceExists = async (page, fullName, startBrhrDate, endBrhrDate, absenceType) => {
    try{
        // check if absence exists or falls over existing absence
        await throwErrorIfElementExists(page, '.Wrapper-fHCkiV');
       
    }catch(err){
        console.log(chalk.red(`Could not add ${absenceType} for ${fullName}: ${startBrhrDate} - ${endBrhrDate} as absence already exists.`));
        throw new Error('exit task absence');
    }
}

const selectDaysToDeduct = async (page, fullName, daysToDeduct, startBrhrDate, endBrhrDate, absenceType) => {
    // select days duration
    try{
        // check absence type and select days to deduct
        if(absenceType === 'annual-leave' || absenceType === 'other'){
            await page.type('[data-e2e="vheDuration-0"]', `${Number(daysToDeduct)}`);
        }else if(absenceType === 'sickness'){
            await page.type('[data-e2e="sickness-vheDuration"]', `${Number(daysToDeduct)}`);
        }else{
            await page.type('[name="duration"]', `${Number(daysToDeduct)}`);
        }

        await throwErrorIfElementExists(page, '[data-e2e="vheDuration-1"]')
        

    }catch(err){
        console.log(chalk.red(`Could not select days duration of the amount: ${daysToDeduct} for ${fullName}: ${startBrhrDate} - ${endBrhrDate}`),);
        throw new Error('exit task absence');
    }
}

module.exports = { 
    selectStartData, 
    selectEndData, 
    checkIfAbsenceUnderMultipleYears, 
    checkIfAbsenceExists, 
    selectDaysToDeduct 
};