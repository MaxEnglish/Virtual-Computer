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
        setInterval(()=>this.sendPulse(),500);
       }

    public addClockListener(obj:ClockListener){
        this.listenerArray.push(obj);
        }

    public sendPulse(){
        this.log("Clock Pulse Initiated");
        for(let i = 0; i < this.listenerArray.length; i++){
            this.listenerArray[i].pulse();
        }
    }

        
    }

    


    
    


  
