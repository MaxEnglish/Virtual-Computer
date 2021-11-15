import {System} from "../System";
import {Hardware} from "./hardware";
import {memoryUsage} from "process";
import { Clock } from "./Clock";
import {ClockListener} from "./imp/ClockListener";
import { MMU } from "./MMU";

export class Memory extends Hardware implements ClockListener{

    private hexArr : number[];

    private MAR : number = 0x0;

    private MDR : number = 0x0;

    //size of addressable memory
    public memSize : number;
    
    constructor() {
        
        super(0,'RAM',false);

        this.memSize = 0x10000;

        //creates array of length 2^16 and fills with 0x00s
        this.initializeMemory();
    }

    //initialize then populate the array with arrays containing hex numbers
    public initializeMemory(){
        this.hexArr = new Array(0x10000);
        for (let i = 0; i < this.memSize; i++){
            this.hexArr[i] = 0x00;
        }
    }

    //display the contents of the memory from address 0x00 to 0x0A
    public displayMemory(begin,end){
        console.log("HW - MMU id: " + this.id + " - " + Date.now() + "]: Initialize Memory");
        console.log("HW - MMU id: " + this.id + " - " + Date.now() + "]: Memory Dump: Debug");
        console.log("HW - MMU id: " + this.id + " - " + Date.now() + "]: ------------------------------------");
        for(var i = begin; i < end; i++){
            if(i < 0x10000){
                console.log("HW - MMU id: " + this.id + " - " + Date.now() + "]: Initialize Memory " + this.hexLog(this.hexArr[i],2));
            } else {
                this.log("Contains Value: ERR [hexValue conversion]: number undefined");
            }
        }
        console.log("[HW - MMU id: 0 - "+Date.now()+"]: --------------------------------------");
        console.log("[HW - MMU id: 0 - "+Date.now()+"]: Memory Dump: Complete");
    }

public reset(){
    for(var i = 0; i < this.hexArr.length; i++){
        this.hexArr[i] = 0x0;
    }
}

public getAddressableSpace(){
    return this.memSize;
}

public getMAR(){
    return this.MAR;
}

public getMDR(){
    return this.MDR;
}

public setMAR(xMAR){
    this.MAR = xMAR;
}

public setMDR(xMDR){
    this.MDR = xMDR;
}

public read(){
    this.setMDR(this.hexArr[this.getMAR()]);
}

public write(){
    this.hexArr[this.getMAR()] = this.getMDR()
}



    //What occurs when the pulse method is called
    public pulse(){
        this.log("received clock pulse");
    }
}



