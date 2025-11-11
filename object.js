"use strict";
// All the module controll thing will be here
import { } from "./moduleData.js";

export class modules{
    static count = 0;

    constructor(){
        modules.count++;
        this.hours = 0;
        this.minutes = 0; 
        this.seconds = 0;
        this.id = modules.count;
        this.isThreeDotOn = false; // to check if three dot btn is clicked or not
        this.isPaused = true;
        this.isEnded = false;

        let moduleReff = this.createNewModule();
        this.setIDs(moduleReff);
        
    }

    createNewModule(){
        let copy = document.querySelector(".module").cloneNode(true);
        copy.querySelector(".hours").textContent = "00";
        copy.querySelector(".minutes").textContent = "00";
        copy.querySelector(".seconds").textContent = "00";
        copy.querySelector(".heading").textContent = `changed(${modules.count})`;
        copy.moduleData = this; //assigning the moduleData object to the DOM

        // Setting up id's


        document.querySelector("#add-module").before(copy);
        return copy;
    }

    // Method to set up ID's
    setIDs(copy){
        copy.id = `module${modules.count}`;
        copy.querySelector(".timer-tray").id = `timer-tray${modules.count}`;
        copy.querySelector(".hours").id = `hours${modules.count}`;
        copy.querySelector(".hours-input").id = `hours-input${modules.count}`;
        copy.querySelector(".colenA").id = `colenA${modules.count}`;
        copy.querySelector(".minutes").id = `minutes${modules.count}`;
        copy.querySelector(".minutes-input").id = `minutes-input${modules.count}`;
        copy.querySelector(".colenB").id = `colenB${modules.count}`;
        copy.querySelector(".seconds").id = `seconds${modules.count}`;
        copy.querySelector(".seconds-input").id = `seconds-input${modules.count}`;
        copy.querySelector(".three-dots").id = `three-dots${modules.count}`;
        copy.querySelector(".heading").id = `heading${modules.count}`;
        copy.querySelector(".message").id = `message${modules.count}`;
        copy.querySelector(".delete-btn").id = `delete-btn${modules.count}`;
        copy.querySelector(".dialog-box").id = `dialog-box${modules.count}`;
        copy.querySelector(".heading-input").id = `heading-input${modules.count}`;
        copy.querySelector(".play-pause").id = `play-pause${modules.count}`;
        copy.querySelector(".play").id = `play${modules.count}`;
        copy.querySelector(".pause").id = `pause${modules.count}`;
    }

}







