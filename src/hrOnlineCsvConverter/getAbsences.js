

const { getBrhrAbsenceType, getBrhrCaledarDates, getBrhrHoursAndMinutes, getAdjustedDayDuration } = require('../utils/date-converter')

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
            
            if(absence.fullName === employee.fullName && absence.isApproved === 'Approved'){
                
                let newAbsence = {
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
                    notes: absence.notes,
                    startDayOfTheWeek: null,
                    startDayOfTheMonth: null,
                    startMonth: null,
                    startMonthNumber: null,
                    startYear: null,
                    brhrStartDate: null,
                    endDayOfTheWeek: null,
                    endDayOfTheMonth: null,
                    endMonth: null,
                    endMonthNumber: null,
                    endYear: null,
                    brhrEndDate: null,
                    startHour: null,
                    startMinutes: null,
                    endHour: null,
                    endMinutes: null,
                }

                newAbsence.absenceType = getBrhrAbsenceType(newAbsence.absenceType);

                let [
                    startDayOfTheWeek,
                    startDayOfTheMonth,
                    startMonth,
                    startMonthNumber,
                    startYear,
                    brhrStartDate
                 ] = getBrhrCaledarDates(newAbsence.startDate);
                newAbsence.startDayOfTheWeek = startDayOfTheWeek;
                newAbsence.startDayOfTheMonth = startDayOfTheMonth;
                newAbsence.startMonth = startMonth;
                newAbsence.startMonthNumber = startMonthNumber;
                newAbsence.startYear = startYear;
                newAbsence.brhrStartDate = brhrStartDate;


                let [
                    endDayOfTheWeek,
                    endDayOfTheMonth,
                    endMonth,
                    endMonthNumber,
                    endYear,
                    brhrEndDate
                 ] = getBrhrCaledarDates(newAbsence.endDate);
                newAbsence.endDayOfTheWeek = endDayOfTheWeek;
                newAbsence.endDayOfTheMonth = endDayOfTheMonth;
                newAbsence.endMonth = endMonth;
                newAbsence.endMonthNumber = endMonthNumber;
                newAbsence.endYear = endYear;
                newAbsence.brhrEndDate = brhrEndDate;

                const [startHour, startMinutes] = getBrhrHoursAndMinutes(newAbsence.startTime);
                newAbsence.startHour = startHour;
                newAbsence.startMinutes = startMinutes;

                const [endHour, endMinutes] = getBrhrHoursAndMinutes(newAbsence.endTime);
                newAbsence.endHour = endHour;
                newAbsence.endMinutes = endMinutes;

                newAbsence.durationInDays = getAdjustedDayDuration(newAbsence.durationInDays);
                
                console.log(newAbsence.durationInHours);
                newAbsenceArray.push(newAbsence);
            }
        })
    })

    return newAbsenceArray;
}



module.exports = { getAbsenceArray, populateAbsenceArray };