import {System} from "../System";
import {Hardware} from "./hardware";
import {Cpu} from "./Cpu";
import {memoryUsage} from "process";
import { Memory } from "./Memory";

export class MMU extends Hardware {

    public Mem : Memory;

    constructor(Memoryhold) {
        
        super(0,'MMU',false);

        this.Mem = Memoryhold;
    }


    public obj : number;
    public tf : boolean;
    public highOrLow : boolean;
    public highLowOrder : number = 0;
    public counter : number = 0;

    //obj: the address
    //tf: True = 16 bit address, False = 8 bit address
    //highOrLow: True = High Order, False = Low Order
    public setAdress(obj : number, tf : boolean, highOrLow : boolean){
        if(tf == true){
            this.highLowOrder = obj;
        } else if(tf == false){
            if(this.counter == 0){
                this.highLowOrder = this.Mem.getMAR();
                this.counter++;
            } else if(this.counter == 1){
                if(highOrLow == true){
                    this.highLowOrder += this.Mem.getMAR();
                } else if(highOrLow == false){
                    this.highLowOrder = this.Mem.getMAR() + this.highLowOrder;
                }
                this.Mem.setMAR(this.highLowOrder);
                this.counter = 0;
                this.highLowOrder = 0;
            }
        }
        
    }
    //reads the memory object initiated by the MMU object
    public readCPU(){
        return this.Mem.read();
    }

    //writes the Memory object initiated by the MMU object
    public writeCpu(){
        this.Mem.write();
    }

    //public readCPUMem(memLocation){
        //return this.Mem.readLocation(memLocation);
    //}

    public getMAR(){
        return this.Mem.getMAR();
    }
    public getMDR(){
        return this.Mem.getMDR();
    }

    public setMAR(MA){
        this.Mem.setMAR(MA);
    }

    public setMDR(MD){
        this.Mem.setMDR(MD);
    }

    public memoryDump(start,end){
        this.Mem.displayMemory(start,end);
    }

    //writes the MAR and MDR when passed an address and a piece of data
    public writeImmediate(address: number,data: number){
        this.Mem.setMAR(address);
        this.Mem.setMDR(data);
        this.Mem.write();

    }

}
