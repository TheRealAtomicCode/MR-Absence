const { launchPuppeteer, brhrLogin } = require('../absence-scraper/brhrLogin');

const getEmployeesArray = (splitArray) => {
    let employeesArray = [];
    
    splitArray.forEach((employee) => {
        let employeeObj = {
            fullName: `${employee.field2} ${employee.field4}`,
            email: employee.field6,
            employeeType: employee.field25,
            holidayEntitlementUnit: employee.field30,
            brhrID: null
        };
        employeesArray.push(employeeObj);
    })
    return employeesArray;
}

const getBrhrIDs = async (adminEmail, adminPassword) => {
    // employee array of IDs and IDs
    let brightHREmployeeNameAndIDArray = [];
    // employee array of isFixed or Variable

    // // // get links to each profile // // // //

    const browser = await launchPuppeteer();

    const page = await browser.newPage();
    //logging in
    await brhrLogin(page, adminEmail, adminPassword);

    const addedEmployees = await page.$$('.sc-jzgbtB > .Wrapper-msciC')

    for (const addedEmployee of addedEmployees) {
        // loop through list of profile links
        const employeeName = await page.evaluate(el => el.querySelector("div > div > p").textContent, addedEmployee, { waitUntil: "domcontentloaded"});
        const employeeLink = await page.evaluate(el => el.querySelector("div > div > a").getAttribute('href'), addedEmployee, { waitUntil: "domcontentloaded" });
        
        brightHREmployeeNameAndIDArray.push({employeeName, employeeLink})
    }

    await browser.close();
    
    return brightHREmployeeNameAndIDArray;
    
}

const mergeEmployeeArray = (employeesArray, employeeNamesAndIdsArray) => {
    const newEmployeeArray = [];

    employeesArray.forEach((employee) => {
        employeeNamesAndIdsArray.forEach((employeeNameAndId) => {

            if (employee.fullName === employeeNameAndId.employeeName) {
                const employeeObj = {
                    fullName: employee.fullName,
                    email: employee.email,
                    employeeType: employee.employeeType,
                    holidayEntitlementUnit: employee.holidayEntitlementUnit,
                    brhrID: employeeNameAndId.employeeLink
                }
                
                newEmployeeArray.push(employeeObj);
            }
        })
    })

    return newEmployeeArray;
    
}


module.exports = { getEmployeesArray, getBrhrIDs, mergeEmployeeArray };