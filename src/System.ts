// import statements for hardware
import {Cpu} from "./hardware/Cpu";
import {Hardware} from "./hardware/Hardware";
import {Memory} from "./hardware/Memory";
import {Clock} from "./hardware/Clock";
import { ClockListener } from "./hardware/imp/ClockListener";
import { MMU } from "./hardware/MMU";
import { interruptController } from "./hardware/InterruptController";

/*
    Constants
 */
// Initialization Parameters for Hardware
// Clock cycle interval
const CLOCK_INTERVAL= 500;               // This is in ms (milliseconds) so 1000 = 1 second, 100 = 1/10 second
                                        // A setting of 100 is equivalent to 10hz, 1 would be 1,000hz or 1khz,
                                        // .001 would be 1,000,000 or 1mhz. Obviously you will want to keep this
                                        // small, I recommend a setting of 100, if you want to slow things down
                                        // make it larger.


export class System extends Hardware {

    private _CPU : Cpu = null;

    private RAM : Memory = null;

    private IRT : interruptController;

    private Clock : Clock = null;

    private MMU : MMU = null;
    
    public running: boolean = false;

    constructor() {

	    super(0,'System',false);
        this.RAM = new Memory();

        this.MMU = new MMU(this.RAM);

        this.IRT = new interruptController();

        this._CPU = new Cpu(this.MMU,this.IRT);

        this.Clock = new Clock(0,'Clock',true);

       
        
        /*
        Start the system (Analogous to pressing the power button and having voltages flow through the components)
        When power is applied to the system clock, it begins sending pulses to all clock observing hardware
        components so they can act on each clock cycle.
         */

        this.startSystem();

    }

    public startSystem(): boolean {
        this.log('created');
        this._CPU.log('created');
        this.Clock.log('created');
        this.MMU.writeImmediate(0x0000,0xA9);
        this.MMU.writeImmediate(0x0001,0x0D);
        this.MMU.writeImmediate(0x0002,0xA9);
        this.MMU.writeImmediate(0x0003,0x1D);
        this.MMU.writeImmediate(0x0004,0xA9);
        this.MMU.writeImmediate(0x0005,0x2D);
        this.MMU.writeImmediate(0x0006,0xA9);
        this.MMU.writeImmediate(0x0007,0x3F);
        this.MMU.writeImmediate(0x0008,0xA9);
        this.MMU.writeImmediate(0x0009,0xFF);
        this.MMU.writeImmediate(0x000A,0x00);
        this._CPU.powersProgram();
        this.RAM.setMAR(0x0);
        this.RAM.read();
        //prints array values 0-14
        this.RAM.displayMemory(0x00,0x55);
        //adds Ram and Cpu to ClockListener Array
        this.Clock.addClockListener(this.RAM);
        this.Clock.addClockListener(this._CPU);
        return true;
    }

    public stopSystem(): boolean {

        return false;

    }
}


let system : System = new System();