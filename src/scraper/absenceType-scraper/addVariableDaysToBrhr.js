

const addVariableDaysToBrhr = async (page, absence) => {
    try{
        console.log('addVariableDaysToBrhr');
        await page.goto(`https://app.brighthr.com${absence.brhrID}`, { waitUntil: "domcontentloaded" });
        await page.waitForSelector('.sc-cpmLhU');
        
    }catch(err){
        console.log(err);
    }
    return;
}

module.exports = { addVariableDaysToBrhr }