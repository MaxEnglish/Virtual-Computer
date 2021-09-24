import {System} from "../System";
import {Hardware} from "./hardware";
import {Cpu} from "./Cpu";
import {memoryUsage} from "process";
import {ClockListener} from "./imp/ClockListener";

export class Memory extends Hardware implements ClockListener{

    private hexArr : number[];

    //size of addressable memory
    private memSize : number = 0x10000;

    constructor(id,name,debug) {
        
        super(id,name,debug);

        this.id = 0;
	
	    this.name = 'RAM';

	    this.debug = true;
    }

    //initialize then populate the array with arrays containing hex numbers
    public initializeMemory(){
        this.hexArr = new Array(this.memSize);
        for (let i = 0; i < this.memSize; i++){
            this.hexArr[i] = 0x00;
        }
    }

    //display the contents of the memory from address 0x00 to 0x14
    public displayMemory(){
        for(var i = 0; i < 0x14; i++){
            if(i < 0x10000){
                this.log(this.hexLog(this.hexArr[i],4));
            } else {
                this.log("Contains Value: ERR [hexValue conversion]: number undefined");
            }
            
        }
    }
    //What occurs when the pulse method is called
    public pulse(){
        this.log("received clock pulse");
    }
}



