const { addVariableDaysToBrhr } = require('./absenceType-scraper/addVariableDaysToBrhr');

const absencePath = async (page, unifiedAbsenceArray) => {
    // check whether absence is regular or variable, days or hours, declined.
   
    for(let i = 0; i < unifiedAbsenceArray.length; i++){
        console.log(i)
        if(unifiedAbsenceArray[i].isApproved === 'Declined'){
            
        }
        // if(unifiedAbsenceArray[i].endYear < 2021){
            // check absence year
        //     return;
        // }
        if(unifiedAbsenceArray[i].employeeType === 'regular' && unifiedAbsenceArray[i].holidayEntitlementUnit === 'days'){
            
        }
        if(unifiedAbsenceArray[i].employeeType === 'regular' && unifiedAbsenceArray[i].holidayEntitlementUnit === 'hours'){
            
        }
        if(unifiedAbsenceArray[i].employeeType === 'variable' && unifiedAbsenceArray[i].holidayEntitlementUnit === 'days'){
            await addVariableDaysToBrhr(page, unifiedAbsenceArray[i]);
            
        } 
        if(unifiedAbsenceArray[i].employeeType === 'variable' && unifiedAbsenceArray[i].holidayEntitlementUnit === 'hours'){
            
        }
        
    }
}

module.exports = { absencePath }