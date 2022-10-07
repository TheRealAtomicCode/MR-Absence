const getBrhrAbsenceType = (absenceType) => {
    switch(absenceType){
        case 'Holiday': absenceType = 'Annual leave';
        break;
        case 'Time off in lieu': absenceType = 'Time off in lieu';
        break;
        case 'Unpaid Leave': absenceType = 'Unpaid leave';
        break;
        case 'Sickness': absenceType = 'Sickness';
        break;
        case 'Maternity Leave': absenceType = 'Maternity leave';
        break;
        case 'Paternity Leave': absenceType = 'Paternity leave';
        break;
        case 'Bereavement Leave': absenceType = 'Bereavement leave';
        break;
        case 'Dentist Appointment': absenceType = 'Dental appointment';
        break;
        case 'Hospital Appointment': absenceType = 'Medical appointment';
        break;
        case 'Adoption Leave': absenceType = 'Adoption';
        break;
        case 'Ante-Natal': absenceType = 'Antenatal leave';
        // check this to be true
        case 'Holiday for Sick': absenceType = 'Annual leave';
        break;
        default : absenceType = 'Other';
    }

    return absenceType;
}

const getBrhrCaledarDates = (absenceDate) => {
    let tempDate = absenceDate.split('/')

    let dayOfTheMonth = Number(tempDate[0]);
    let monthNumber = Number(tempDate[1]);
    let year = Number(tempDate[2]);

    const date = new Date(year, monthNumber, dayOfTheMonth);
    const month = date.toLocaleString('default', { month: 'short' })
    const dayOfTheWeek = date.toLocaleString('default', { weekday: 'short' })

    const brhrDate = `${dayOfTheWeek} ${dayOfTheMonth?.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) || ''} ${month} ${year}`;

        return [
            dayOfTheWeek,
            dayOfTheMonth,
            month,
            monthNumber,
            year,
            brhrDate
        ]
}

const getBrhrHoursAndMinutes = (absenceTime) => {
    let tempTime = absenceTime.split(':');

    let hour = Number(tempTime[0]);
    let minutes = Number(tempTime[1]);

    return [ hour, minutes ];
}

const getAdjustedDayDuration = (absenceDurationIndays) => {

    const intValue = Math.floor(absenceDurationIndays);
    const decimalValue = absenceDurationIndays - intValue;

    if(absenceDurationIndays === ''){
        return null;
    } else if(decimalValue < 0.25){   
        return intValue;
    } else if(decimalValue >= 0.25 && decimalValue < 0.75){
        return intValue + 0.5;
    } else {
        return intValue + 1;
    }
   
}

const getAdjustedHoursDuration = (absenceDurationInHours) => {
    
        const intValue = Math.floor(absenceDurationInHours);
        const decimalValue = absenceDurationInHours - intValue;
    
        const minutes = decimalValue * 60;

        return [ intValue, minutes ];
    
}

module.exports = { getBrhrAbsenceType, getBrhrCaledarDates, getBrhrHoursAndMinutes, getAdjustedDayDuration, getAdjustedHoursDuration };