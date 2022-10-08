const { launchPuppeteer, brhrLogin } = require('./brhrLogin')
const { absencePath } = require('./absencePath')


const addAbsencesToBrhr = async (adminEmail, adminPassword, unifiedAbsenceArray) => {
    
    const browser = await launchPuppeteer();
    const page = await browser.newPage();

    // login to brhr
    await brhrLogin(page, adminEmail, adminPassword);

    // add absence to brhr
    await absencePath(page, unifiedAbsenceArray);
    
}

module.exports = { addAbsencesToBrhr }