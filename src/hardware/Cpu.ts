import {System} from "../System";
import {Hardware} from "./hardware";

export class Cpu extends Hardware {

    constructor(id,name,debug) {
        
	super(id,name,debug);	

	this.id = 0;
	
	this.name = 'CPU';

	this.debug = false;
        
    }
}
