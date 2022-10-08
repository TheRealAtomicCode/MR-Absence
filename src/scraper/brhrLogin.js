const puppeteer = require('puppeteer');

const launchPuppeteer = async () => {
    const browser = await puppeteer.launch({
        "headless": false,
        slowMo: 10,
        defaultViewport: false,
    });
    return browser;
}

const brhrLogin = async (page, adminEmail, adminPassword) => {
    const url = 'https://login.brighthr.com/Account/Login';
    //logging in
    await page.goto(url);
    await page.type('[id=Username]', adminEmail);
    await page.type('[id=Password]', adminPassword);
    await page.click('[type=submit]', { waitUntil: "domcontentloaded" });
    
    // get employee links and names
    await page.goto('https://app.brighthr.com/employee-hub', { waitUntil: "domcontentloaded" });
    await page.waitForSelector('.sc-jzgbtB')

}

module.exports = { launchPuppeteer, brhrLogin }



