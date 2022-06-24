function createEmployeeRecord(employeeArray){
    
    const employeeObj = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeObj
}

function createEmployeeRecords(nestedArrray){
    
    const employeeRecords = [];
    let employeeEntry = 0;
    
    for (const employee of nestedArrray){
        employeeRecords[employeeEntry] = createEmployeeRecord(employee);
        employeeEntry++;
    }
    
    return employeeRecords;

}

function createTimeInEvent(employeeData, timeStamp){

    const dateHourSplit = timeStamp.split(' ');
    const timeObj = {
        type: 'TimeIn',
        hour: parseInt(dateHourSplit[1]),
        date: dateHourSplit[0]
    };

    for (const entryKey in employeeData){
        if (entryKey === 'timeInEvents'){
            employeeData.timeInEvents.push(timeObj);
        }
    }
    return employeeData;
}

function createTimeOutEvent(employeeData, timeStamp){
    
    const dateHourSplit = timeStamp.split(' ');
    const timeObj = {
        type: 'TimeOut',
        hour: parseInt(dateHourSplit[1]),
        date: dateHourSplit[0]
    };

    for (const entryKey in employeeData){
        if (entryKey === 'timeOutEvents'){
            employeeData.timeOutEvents.push(timeObj);
        }
    }
    return employeeData;
}

function hoursWorkedOnDate(employeeObj, date){
    
    let hoursWorked;
    
    for (let i = 0; i < employeeObj.timeInEvents.length; i++){
    
        let workDate = employeeObj.timeInEvents[i].date;
        let timeOut = employeeObj.timeOutEvents[i].hour;
        let timeIn = employeeObj.timeInEvents[i].hour;
        if (workDate === date){
            hoursWorked = timeOut - timeIn;
        }
    }
    return hoursWorked/100;
}

function wagesEarnedOnDate(employeeObj, date){
    
    let hoursWorked = hoursWorkedOnDate(employeeObj, date);
    let payRate = employeeObj.payPerHour;
    let wagesOwed = 0;

    if (hoursWorked > 0){
        wagesOwed = payRate * hoursWorked;
    }

    return wagesOwed;
}

function allWagesFor(employeeObj){
    
    let totalWagesEarned = 0;
    let wagesEarned = 0;
    let date;
    
    for (let i = 0; i < employeeObj.timeInEvents.length; i++){
        date = employeeObj.timeInEvents[i].date;
        wagesEarned = wagesEarnedOnDate(employeeObj, date);
        totalWagesEarned = wagesEarned + totalWagesEarned;
    }

    return totalWagesEarned;
}

function calculatePayroll(recordsArray){
    
    let employeeSum = 0;
    let totalEmployeeSum = 0;

    for (const employee of recordsArray){
        employeeSum = allWagesFor(employee);
        totalEmployeeSum = employeeSum + totalEmployeeSum;
    }

    return totalEmployeeSum;
}