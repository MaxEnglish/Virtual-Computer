import { Clock } from "./Clock";
import { Hardware } from "./hardware";
import { System } from "../System";
import { interruptListener } from "./imp/InterruptListener";


export class interruptController extends Hardware {

    public listenerArray : interruptListener[];

    //public interruptArray : 

    constructor() {
        
        super(0,'InterruptController',false);
        this.listenerArray = new Array();
    }

    public addInterruptListener(obj : interruptListener){
        this.listenerArray.push(obj);
    }


}