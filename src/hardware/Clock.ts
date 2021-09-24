import {System} from "../System";
import {Hardware} from "./hardware";
import {Cpu} from "./Cpu";
import {memoryUsage} from "process";
import {ClockListener} from "./imp/ClockListener";

export class Clock extends Hardware {

    public listenerArray : ClockListener[];

    constructor(id,name,debug){
       super(id,name,debug);
        this.id = id;
		this.name = name;
		this.debug = true;
        this.listenerArray = new Array();
        //starts sending pulses to each Clock Listener in the interface every 500 ms
        setInterval(()=>this.sendPulse(),500);
       }

    //method which adds Clock Listener Objects to the listener array in the Clock class
    public addClockListener(obj:ClockListener){
        this.listenerArray.push(obj);
        }

    //function to be referenced by the setInterval method in the constructor: traverses the ClockListenerArray and sends a pulse to each object inside of it
    public sendPulse(){
        this.log("Clock Pulse Initiated");
        for(let i = 0; i < this.listenerArray.length; i++){
            this.listenerArray[i].pulse();
        }
    }

        
    }

    


    
    


  
