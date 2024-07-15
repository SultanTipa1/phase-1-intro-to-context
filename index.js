
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, timeStamp) {
    let [date, hour] = timeStamp.split(' ');

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeStamp) {
    let [date, hour] = timeStamp.split(' ');

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });

    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    let timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);

    if (timeIn && timeOut) {
        return (timeOut.hour - timeIn.hour) / 100;
    } else {
        return 0;
    }
}

function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    let datesWorked = employeeRecord.timeInEvents.map(event => event.date);

    let totalWages = datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);

    return totalWages;
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employeeRecord) => {
        return totalPayroll + allWagesFor(employeeRecord);
    }, 0);
}
