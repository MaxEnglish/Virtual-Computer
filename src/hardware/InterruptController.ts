import { Hardware } from "./hardware";
import { interruptListener } from "./imp/InterruptListener";


export class interruptController extends Hardware {

    public listenerArray : interruptListener[];

    public interruptArray = [];

    public interruptBool : boolean;

    constructor() {
        
        super(0,'InterruptController',false);
        this.listenerArray = new Array();
    }

    public addInterruptListener(obj : interruptListener){
        this.listenerArray.push(obj);
    }

    public acceptInterrupt(interruptPush){
        this.interruptBool = true;
        this.interruptArray.push(interruptPush);
        this.interruptArray.sort((firstItem, secondItem) => firstItem.priority - secondItem.priority);
    }

    public doFunction(){
        this.interruptArray.shift().interruptRunning();
        if(this.interruptArray.length == 0){
            this.interruptBool = false;
        }
    }

}