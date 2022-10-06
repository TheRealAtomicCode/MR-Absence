const getAbsenceArray = (splitArray) => {
    // adding all absences into one array
    let absenceArray = [];
    splitArray.forEach((absence) => {
        let absenceObj = {
            fullName: `${absence.field2} ${absence.field3}`,
            absenceType: absence.field4,
            isApproved: absence.field5,
            isOngoing: absence.field6,
            startDate: absence.field7,
            startTime: absence.field8,
            endDate: absence.field9,
            endTime: absence.field10,
            durationInDays: absence.field11,
            durationInHours: absence.field12,
            employeeType: null,
            holidayEntitlementUnit: null,
            brhrID: null,
            email: null,
            notes: absence.field14
        };

        absenceArray.push(absenceObj);
    })
    return absenceArray;
}

const populateAbsenceArray = (absenceArray, employeesArray) => {
    let newAbsenceArray = [];
    
    absenceArray.forEach((absence) => {
        employeesArray.forEach((employee) => {
            
            if(absence.fullName === employee.fullName){
                
                const newAbsence = {
                    fullName: absence.fullName,
                    absenceType: absence.absenceType,
                    isApproved: absence.isApproved,
                    isOngoing: absence.isOngoing,
                    startDate: absence.startDate,
                    startTime: absence.startTime,
                    endDate: absence.endDate,
                    endTime: absence.endTime,
                    holidayEntitlementUnit: employee.holidayEntitlementUnit,
                    durationInDays: absence.durationInDays,
                    durationInHours: absence.durationInHours,
                    employeeType: employee.employeeType,
                    brhrID: employee.brhrID,
                    email: employee.email,
                    notes: absence.notes
                }
                

                newAbsenceArray.push(newAbsence);
            }
        })
    })

    return newAbsenceArray;
}



module.exports = { getAbsenceArray, populateAbsenceArray };