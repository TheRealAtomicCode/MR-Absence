

const addVariableDaysToBrhr = async (page, absence) => {

    try{
        console.log('addVariableDaysToBrhr');
        await page.goto(`https://app.brighthr.com/employee/${absence.brhrID}/absence`, { waitUntil: "domcontentloaded" });
        
        await page.waitForSelector('select[name="absenceType"]');
        await page.select('select[name="absenceType"]', absence.absenceType.replace(/\s+/g, '-').toLowerCase());

        console.log('absenceType', absence.absenceType.replace(/\s+/g, '-').toLowerCase());

        await page.click('[data-testid="input-selector"]')

        await page.select('select[name="years"]', `${absence.startYear}`);

        console.log('startYear', absence.startYear);

        await page.select('select[name="months"]',  `${absence.startMonthIndex}`);

        console.log('startMonthIndex', `${absence.startMonthIndex}`);

        console.log('startBrhrDate', absence.startBrhrDate);

        await page.click(`[aria-label="${absence.startBrhrDate}"]`);

        console.log('startBrhrDate', absence.startBrhrDate);

        
            
    }catch(err){
        console.log(err);
    }
    return;
}

module.exports = { addVariableDaysToBrhr }