const { addVariableDaysToBrhr } = require('./absenceType-scraper/addVariableDaysToBrhr');
const { addVariableHoursToBrhr } = require('./absenceType-scraper/addVariableHoursToBrhr');

const absencePath = async (page, unifiedAbsenceArray) => {
    // check whether absence is regular or variable, days or hours, declined.
   
    for(let i = 0; i < unifiedAbsenceArray.length; i++){
        if(unifiedAbsenceArray[i].isApproved === 'Declined'){
            continue;
        }
        // if(unifiedAbsenceArray[i].endYear < 2021){
        //     console.log('past', unifiedAbsenceArray[i].endYear)
        //     continue;
        // }
        if(unifiedAbsenceArray[i].employeeType === 'regular' && unifiedAbsenceArray[i].holidayEntitlementUnit === 'days'){
            
        }
        if(unifiedAbsenceArray[i].employeeType === 'regular' && unifiedAbsenceArray[i].holidayEntitlementUnit === 'hours'){
            
        }
        if(unifiedAbsenceArray[i].employeeType === 'variable' && unifiedAbsenceArray[i].holidayEntitlementUnit === 'days'){
            // await addVariableDaysToBrhr(page, unifiedAbsenceArray[i]); 
        } 
        if(unifiedAbsenceArray[i].employeeType === 'variable' && unifiedAbsenceArray[i].holidayEntitlementUnit === 'hours'){
            await addVariableHoursToBrhr(page, unifiedAbsenceArray[i]);
        }
        
    }
}

module.exports = { absencePath }