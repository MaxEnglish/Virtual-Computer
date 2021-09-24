import { time,timeEnd,timeLog, timeStamp } from "console";
import { homedir } from "os";
import { pathToFileURL } from "url";
import { System } from "../System";
import { Cpu } from "./Cpu";

export class Hardware {
	id : number;
	name : string;
	debug : boolean;
	constructor(id,name,debug){
		this.id = id;
		this.name = name;
		this.debug = true;
	}

	public log(msg) {
		if(this.debug == true){
			console.log("[HW - " + this.name + " id: " + this.id + " - " + Date.now() + "]: " + msg);
		}
	}

	//turns a number to hex form
	public hexLog(num,len){
		let hex : string = num.toString(16).toUpperCase();
		//let padding : string = "";
		return hex.padStart(len,'0');
	}
}
