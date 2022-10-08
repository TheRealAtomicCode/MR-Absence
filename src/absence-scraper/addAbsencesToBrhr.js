const { launchPuppeteer, brhrLogin } = require('./brhrLogin')

const addAbsencesToBrhr = async (adminEmail, adminPassword, unifiedAbsenceArray) => {

    const browser = await launchPuppeteer();
    const page = await browser.newPage();
    

    // login to brhr
    await brhrLogin(page, adminEmail, adminPassword);

    console.log(unifiedAbsenceArray);
    
}

module.exports = { addAbsencesToBrhr }