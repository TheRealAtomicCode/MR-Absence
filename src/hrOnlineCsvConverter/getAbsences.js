const { getBrhrAbsenceType, getBrhrCaledarDates, getBrhrHoursAndMinutes, getAdjustedDayDuration, getAdjustedHoursDuration } = require('../utils/date-converter')

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
            notes: absence.field14
        };

        absenceArray.push(absenceObj);
    })
    return absenceArray;
}

const getHrOnlineAbsencesInBrhrFormat = (absenceArray, employeesArray) => {
    let newAbsenceArray = [];
    
    absenceArray.forEach((absence) => {
        employeesArray.forEach((employee) => {
            
            if(absence.fullName === employee.fullName){

                // remove ID from brhrID
                let id = employee.brhrID.split('/')
                
                let newAbsence = {
                    ...absence,
                    employeeType: employee.employeeType,
                    holidayEntitlementUnit: employee.holidayEntitlementUnit,
                    brhrID: id[2],
                    email: employee.email
                }

                newAbsence.absenceType = getBrhrAbsenceType(newAbsence.absenceType);

                let [
                    startDayOfTheMonth,
                    startMonth,
                    startYear,
                    startMonthIndex,
                    startBrhrDate
                ] = getBrhrCaledarDates(newAbsence.startDate);
                newAbsence.startDayOfTheMonth = startDayOfTheMonth;
                newAbsence.startMonth = startMonth;
                newAbsence.startYear = startYear;
                newAbsence.startMonthIndex = startMonthIndex;
                newAbsence.startBrhrDate = startBrhrDate;

                let [
                    endDayOfTheMonth,
                    endMonth,
                    endYear,
                    endMonthIndex,
                    endBrhrDate
                ] = getBrhrCaledarDates(newAbsence.endDate);
                newAbsence.endDayOfTheMonth = endDayOfTheMonth;
                newAbsence.endMonth = endMonth;
                newAbsence.endYear = endYear;
                newAbsence.endMonthIndex = endMonthIndex;
                newAbsence.endBrhrDate = endBrhrDate;
            

                const [startHour, startMinutes] = getBrhrHoursAndMinutes(newAbsence.startTime);
                newAbsence.startHour = startHour;
                newAbsence.startMinutes = startMinutes;

                const [endHour, endMinutes] = getBrhrHoursAndMinutes(newAbsence.endTime);
                newAbsence.endHour = endHour;
                newAbsence.endMinutes = endMinutes;

                newAbsence.durationInDays = getAdjustedDayDuration(newAbsence.durationInDays);

                newAbsence.durationInHours = getAdjustedHoursDuration(newAbsence.durationInHours);

               
                newAbsenceArray.push(newAbsence);
            }
        })
    })

    return newAbsenceArray;
}



module.exports = { getAbsenceArray, getHrOnlineAbsencesInBrhrFormat };