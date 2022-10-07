const { getDay } = require('date-fns')

const getBrhrAbsenceType = (absenceType) => {
    switch(absenceType){
        case 'Holiday': absenceType = 'Annual leave';
        break;
        case 'Unpaid Leave': absenceType = 'Unpaid leave';
        break;
        case 'sickness': absenceType = 'Sick leave';
        break;
        case 'Maternity Leave': absenceType = 'Maternity leave';
        break;
        case 'Paternity Leave': absenceType = 'Paternity leave';
        break;
        case 'Bereavement Leave': absenceType = 'Bereavement leave';
        break;
        case 'Working from Home': absenceType = 'Other';
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
                
    // get days and months names
    const dayOfTheWeekNumber = getDay(new Date(year, monthNumber, dayOfTheMonth));

    let dayOfTheWeek = '';

    switch(dayOfTheWeekNumber){
        case 0: dayOfTheWeek = 'Sun';
        break;
        case  1: dayOfTheWeek = 'Mon';
        break;
        case 2: dayOfTheWeek = 'Tue';
        break;
        case 3: dayOfTheWeek = 'Wed';
        break;
        case 4: dayOfTheWeek = 'Thu';
        break;
        case 5: dayOfTheWeek = 'Fri';
        break;
        case 6: dayOfTheWeek = 'Sat';
        break;
    }

    let month = '';

    switch(monthNumber){
        case 1: month = 'Jan';
        break;
        case 2: month = 'Feb';
        break;
        case 3: month = 'Mar';
        break;
        case 4: month = 'Apr';
        break;
        case 5: month = 'May';
        break;
        case 6: month = 'Jun';
        break;
        case 7: month = 'Jul';
        break;
        case 8: month = 'Aug';
        break;
        case 9: month = 'Sep';
        break;
        case 10: month = 'Oct';
        break;
        case 11: month = 'Nov';
        break;
        case 12: month = 'Dec';
        break;
    }

    // BRHR data format calendar selected
    const brhrData = `${dayOfTheWeek} ${dayOfTheMonth?.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) || ''} ${month} ${year}`;
                
    return [
        dayOfTheWeek,
        dayOfTheMonth,
        month,
        monthNumber,
        year,
        brhrData
    ]
}

const getBrhrHoursAndMinutes = (absenceTime) => {
    let tempTime = absenceTime.split(':');

    let hour = Number(tempTime[0]);
    let minutes = Number(tempTime[1]);

    return [ hour, minutes ];
}

const getAdjustedDayDuration = (absenceDurationIndays = 0) => {
    //
}

module.exports = { getBrhrAbsenceType, getBrhrCaledarDates, getBrhrHoursAndMinutes };