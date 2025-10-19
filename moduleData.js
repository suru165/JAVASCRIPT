export let moduleDataMap = new Map();




// funtion to convert seconds into formated hours:mi
export function formatInHoursMinutesSeconds( seconds  ){

    let formatedHour =  Math.floor( Math.floor(seconds / 60)  / 60 );
    let formatedMinute = ( Math.floor(seconds / 60) ) % 60;
    let formatedSecond = seconds % 60;

    return {
        hours: formatedHour,
        minutes: formatedMinute,
        seconds: formatedSecond
    }
}

// function to Update the time in headings of give module(id)

export function updateTimerHeadings(id, hour, minute, second ){
    
    let hourHeading = document.querySelector(`#hours${id}`);
    let minuteHeading = document.querySelector(`#minutes${id}`);
    let secondHeading = document.querySelector(`#seconds${id}`);

    hourHeading.textContent = hour < 10 ? `0${hour}`: hour;
    minuteHeading.textContent = minute < 10 ? `0${minute}`: minute;
    secondHeading.textContent = second < 10 ? `0${second}`: second;

    
}

//Function to update hour:minute:seconds of each module object DOM

export function updateModuleObjectTime(id, hour, minute, seconds ) {
    let module = document.querySelector(`#module${id}`);

    module.moduleData.hours = hour;
    module.moduleData.minutes = minute;
    module.moduleData.seconds = seconds;

}


export function sendNotification(heading = "Heading", message="Timer completed"){
    new Notification(heading, {body: message});
}