import {System} from "../System";
import {Hardware} from "./hardware";
import {ClockListener} from "./imp/ClockListener";

export class Cpu extends Hardware implements ClockListener {

	cpuClockCount : number = 0;

    constructor(id,name,debug) {
        
	super(id,name,debug);	

	this.id = 0;
	
	this.name = 'CPU';

	this.debug = true;
        
    }
	//What occurs when the pulse method is called
	public pulse(){
		this.cpuClockCount++;
		this.log("received clock pulse - CPU Clock Count: " + this.cpuClockCount);
	}
}
