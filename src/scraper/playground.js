const { launchPuppeteer, brhrLogin } = require('./brhrLogin');

async function playground(adminEmail, adminPassword){
    const browser = await launchPuppeteer();
    const page = await browser.newPage();
    await brhrLogin(page, adminEmail, adminPassword);

    await page.goto(`https://app.brighthr.com/employee/1521507/absence`, { waitUntil: "domcontentloaded" });
        
    await page.waitForSelector('select[name="absenceType"]');

    await page.click('[data-e2e="startDate-dayPicker"]')
    await page.select('select[name="years"]', `2016`);
    await page.select('select[name="months"]',  `3`);
    await page.click(`[aria-label="Thu Apr 21 2016"]`);

    const x = await page.$('.Wrapper-fHCkiV') || false;
    if(x){
        const el = await page.$eval('.Wrapper-fHCkiV', (el) => {
            return el ? el.innerText : false;
        });
        console.log(el);
    }else{
        console.log(x)
    }
            
  
}

module.exports = { playground }