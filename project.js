"use strict";


import { moduleDataMap, updateTimerHeadings, updateModuleObjectTime, sendNotification, formatInHoursMinutesSeconds} from "./moduleData.js";
import { modules } from "./object.js";

let module = document.querySelector(".module");
let tray = document.querySelector("#tray");
let addModuleBtn = document.querySelector("#add-module"); 


//functionality of add button , using module objects
addModuleBtn.onclick = () => {

    if(Notification.permission === "default"){
        Notification.requestPermission();
    }

    let dummyModule = new modules();
    let id = dummyModule.id;
    moduleDataMap.set(id, dummyModule);
}

// functionality for three dots btn
tray.addEventListener("click", (e) => {

    if(e.target.tagName === "I" ? e.target.parentElement.classList.contains("three-dots")? true : false : false 
    || e.target.classList.contains("three-dots")){

        let idString = e.target.parentElement.id;
        let idNum = idString.match(/\d+/);
        let module = document.querySelector(`#module${idNum[0]}`);

        if(module.moduleData && module.moduleData.isThreeDotOn ){
            module.querySelector(`#dialog-box${idNum[0]}`).close();
            module.moduleData.isThreeDotOn = false;
        }else if(module.moduleData){
            module.querySelector(`#dialog-box${idNum[0]}`).show();
            module.moduleData.isThreeDotOn = true;
        }
    }
});

// heading settings
// Event to enter edit mode
tray.addEventListener("dblclick", (e) => {
    if(e.target.classList.contains("heading")){
        let idNum = e.target.id.match(/\d+/);
        let headingInput = document.querySelector(`#heading-input${idNum[0]}`);
        let heading = document.querySelector(`#heading${idNum[0]}`);

        heading.textContent = "";
        headingInput.style.display = "inline-block";
    }
})


// event listner to confirm the input of Heading from the user

document.addEventListener("keydown", (e) => {

    if(e.key === "Enter" && e.target.classList.contains("heading-input")){
        let idNum = e.target.id.match(/\d+/);
        let module = document.querySelector(`#module${idNum[0]}`);
        let heading = document.querySelector(`#heading${idNum[0]}`);
        let headingInput = document.querySelector(`#heading-input${idNum[0]}`);
        let userInput = headingInput.value || heading.textContent;

        module.moduleData.heading = userInput;
        heading.textContent = userInput;
        headingInput.style.display = "none";
    }
});

// Deleting module (delete-btn)
tray.addEventListener("click", (e) => {
    if(e.target.classList.contains("delete-btn")){
        let idNum = e.target.id.match(/\d+/);
        let module = document.querySelector(`#module${idNum[0]}`);
        module.remove();
        moduleDataMap.delete(+idNum[0]);
    }
})



// Timer settings

// Event to enter edit mode
tray.addEventListener("dblclick", (e) =>{

    if(e.target.classList.contains("timer-tray") || e.target.classList.contains("timer")){
        
        let idNum = e.target.id.match(/\d+/); //Extracting ID;

        // Making timer inputs visible
        document.querySelector(`#hours-input${idNum[0]}`).style.display = "inline-block";
        document.querySelector(`#minutes-input${idNum[0]}`).style.display = "inline-block";
        document.querySelector(`#seconds-input${idNum[0]}`).style.display = "inline-block";

        // Making hours, minutes and seconds invisible for Setting
        document.querySelector(`#hours${idNum[0]}`).style.display = "none";
        document.querySelector(`#minutes${idNum[0]}`).style.display = "none";
        document.querySelector(`#seconds${idNum[0]}`).style.display = "none";
    }
})

// EventListener to confirm the timer 
document.addEventListener("keydown", (e) => {

    if(e.key === "Enter" && e.target.classList.contains("timer")){
        let idNum = e.target.id.match(/\d+/); //Extracting ID;
        
        if(e.target.id === `hours-input${idNum[0]}`){
            document.querySelector(`#minutes-input${idNum[0]}`).focus();
            //Take minutes if pressed enter on hours

        }else if(e.target.id === `minutes-input${idNum[0]}`){
            document.querySelector(`#seconds-input${idNum[0]}`).focus();
            //Take seconds if pressed enter on minutes 
        }else{

            let inputHours = document.querySelector(`#hours-input${idNum[0]}`);
            let inputMinutes = document.querySelector(`#minutes-input${idNum[0]}`);
            let inputSeconds = document.querySelector(`#seconds-input${idNum[0]}`);

            let hoursH2 = document.querySelector(`#hours${idNum[0]}`);
            let minutesH2 = document.querySelector(`#minutes${idNum[0]}`);
            let secondsH2 = document.querySelector(`#seconds${idNum[0]}`);

            // Updating given time D.O.M moduleData object
            let module = document.querySelector(`#module${idNum[0]}`);
            module.moduleData.hours = inputHours.value || 0;
            module.moduleData.minutes = inputMinutes.value || 0;
            module.moduleData.seconds = inputSeconds.value || 0;
            
            // Giving Hour, Minute and Second Headings user's values;
            hoursH2.textContent = inputHours.value < 10 ? `0${inputHours.value || "0"}` : inputHours.value || "00";
            minutesH2.textContent = inputMinutes.value < 10 ? `0${inputMinutes.value || "0"}` : inputMinutes.value || "00";
            secondsH2.textContent = inputSeconds.value < 10 ? `0${inputSeconds.value || "0"}` : inputSeconds.value || "00";

            // Making hours, minutes and seconds visible
            document.querySelector(`#hours${idNum[0]}`).style.display = "inline-block";
            document.querySelector(`#minutes${idNum[0]}`).style.display = "inline-block";
            document.querySelector(`#seconds${idNum[0]}`).style.display = "inline-block";
            
            // Making timer inputs invisible
            inputHours.style.display = "none";
            inputMinutes.style.display = "none";
            inputSeconds.style.display = "none";
        }

    }

})

// Play pause button Functionality

document.addEventListener( "click" ,(e) => {
   
    if((e.target.tagName === "I" && e.target.parentElement.classList.contains("play-pause")) ||
    e.target.classList.contains("play-pause") ){
        
        let idNum = e.target.id.match(/\d+/);  //Extracting ID
        let playPauseBtn = document.querySelector(`#play-pause${idNum[0]}`);
        let playIcon =  document.querySelector(`#play${idNum[0]}`);
        let pauseIcon =  document.querySelector(`#pause${idNum[0]}`);
        let module = document.querySelector(`#module${idNum[0]}`);

        if(module.moduleData.isPaused){  //if true then play the timer

            playIcon.style.setProperty("display", "inline-block", "important");
            pauseIcon.style.setProperty("display", "none", "important");
            module.moduleData.isPaused = false;

        }else{  // if timer is already playing then pause the timer
            playIcon.style.setProperty("display", "none", "important");
            pauseIcon.style.setProperty("display", "inline-block", "important");
            module.moduleData.isPaused = true;
        }

    }
 
})


// Interval for timers Calculation


//function to Update the DOM of each module

setInterval( () =>{

     
for (let [key, value] of moduleDataMap) {

    if(value.isPaused){         //If module paused,             
        continue;               // no data modification in moduleData
    }                     

    let hours = +value.hours;           //extarcting Hours,
    let minutes = +value.minutes;       // Minutes and
    let seconds = +value.seconds;       // Seconds to calculate total time!

    let totalTime = ((hours*3600) + (minutes*60) + seconds);   //Total time in seconds

    if(totalTime === 0){    

        let message = document.querySelector(`#message${key}`).value || "Timer over";
        let heading = document.querySelector(`#heading${key}`).textContent || "Heading";
        sendNotification(heading, message);
        
                                                        
                                                            //If module is running without 
        moduleDataMap.delete(+key)                          //setting time then delete
        document.querySelector(`#module${key}`).remove();   //the module
        

        continue;
    }

    totalTime -= totalTime === 0 ? totalTime : 1;       //Prevent the timer from going Negative

    //Function, formating TotalTime back to 
    //hours, minutes and seconds
    let time = formatInHoursMinutesSeconds(totalTime);       

    updateModuleObjectTime(key, time.hours, time.minutes, time.seconds); 
    updateTimerHeadings(key, time.hours, time.minutes, time.seconds);



}

}, 1000);



