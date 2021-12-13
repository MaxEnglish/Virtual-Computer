import {System} from "../System";
import {Hardware} from "./hardware";
import { MMU } from "./MMU";
import {ClockListener} from "./imp/ClockListener";

export class Cpu extends Hardware implements ClockListener {

	cpuClockCount : number = 0x0;

	public MMUobj : MMU;

	public accumulator : number = 0x0;

	public programCounter : number = 0x0;

	public instructionRegister : number = 0x0;

	public xRegister : number = 0x0;

	public yRegister : number = 0x0;

	public zFlag : number = 0x01;

	public operand : number = 0x0;

	constructor(MMUobject) {

        super(0,'CPU',true);

        this.MMUobj = MMUobject;
    }

	public fetch(){
		//set the IR to the OP code of the data in which the MAR is pointing in the hexArr
		this.MMUobj.setMAR(this.programCounter);
		this.instructionRegister = this.MMUobj.readCPU();
		this.programCounter++;
	}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	public decode(){
		switch(this.instructionRegister){
			//Load the accumulator with a constant
			case 0x00A9:
				this.MMUobj.setMAR(this.programCounter);
				this.operand = this.MMUobj.readCPU();
				this.programCounter++;
				this.step++;
				break;
			//Load the accumulator from memory
			case 0x00AD:
				if(this.step == 2){
					this.MMUobj.setMAR(this.programCounter);
					this.MMUobj.setMAR(this.MMUobj.readCPU());
					this.operand = this.MMUobj.readCPU();
					this.programCounter++;
					break;
				} else if(this.step == 3){
					this.programCounter++;
					break;
				}
			//Store the accumulator in memory
			case 0x008D:
				if(this.step == 2){
					this.MMUobj.setMAR(this.programCounter);
					this.MMUobj.setMAR(this.MMUobj.readCPU());
					this.MMUobj.readCPU();
					this.programCounter++;
					break;
				} else if(this.step == 3){
					this.programCounter++;
					break;
				}
			//Adds contents of an address to the contents of the accumulator and keeps the result in the accumulator
			case 0x006D:
				if(this.step == 2){
					this.MMUobj.setMAR(this.programCounter);
					this.MMUobj.setMAR(this.MMUobj.readCPU());
					this.operand = this.MMUobj.readCPU();
					this.programCounter++;
					break;
				} else if(this.step == 3){
					this.programCounter++;
					break;
				}
			//Load the X register with a constant
			case 0x00A2:
				this.MMUobj.setMAR(this.programCounter);
				this.operand = this.MMUobj.readCPU();
				this.programCounter++;
				this.step++;
				break;
			//Load the X register from memory
			case 0x00AE:
				if(this.step == 2){
					this.MMUobj.setMAR(this.programCounter);
					this.MMUobj.setMAR(this.MMUobj.readCPU());
					this.operand = this.MMUobj.readCPU();
					this.programCounter++;
					break;
				} else if(this.step == 3){
					this.programCounter++;
					break;
				}
			//Load the Y register with a constant
			case 0x00A0:
				this.MMUobj.setMAR(this.programCounter);
				this.operand = this.MMUobj.readCPU();
				this.step++;
				this.programCounter++;
				break;
			//Load the Y register from memory
			case 0x00AC:
				if(this.step == 2){
					this.MMUobj.setMAR(this.programCounter);
					this.MMUobj.setMAR(this.MMUobj.readCPU());
					this.MMUobj.readCPU();
					this.operand = this.MMUobj.readCPU();
					this.programCounter++;
				break;
				} else if(this.step == 3){
					this.programCounter++;
					break;
				}
			//No operation
			case 0x00EA:
				this.step += 2;
				break;
			//Break
			case 0x0000:
				break;
			//Compare a byte in memory to the X register; Sets the z flag if equal
			case 0x00EC:
				if(this.step == 2){
					this.MMUobj.setMAR(this.programCounter);
					this.MMUobj.setMAR(this.MMUobj.readCPU());
					this.operand = this.MMUobj.readCPU();
					this.programCounter++;
					break;
				} else if(this.step == 3){
					this.programCounter++;
					break;
				}
			//Branch n bytes if Z flag = 0
			case 0x00D0:
				this.MMUobj.setMAR(this.programCounter);
				this.operand = this.MMUobj.readCPU();
				this.programCounter++;
				this.step++;
				break;
			//Increment the value of a byte
			case 0x00EE:
				if(this.step == 2){
					this.MMUobj.setMAR(this.programCounter);
					this.MMUobj.setMAR(this.MMUobj.readCPU());
					this.operand = this.MMUobj.readCPU();
					this.programCounter++;
					break;
				} else if(this.step == 3){
					this.programCounter++;
					break;
				}
			//System Call
			case 0x00FF:
				if(this.step == 2){
					if(this.xRegister == 0x01){
						this.operand = this.yRegister;
						this.step++;
					} else if(this.xRegister == 0x02){
						this.MMUobj.setMAR(this.programCounter);
						this.MMUobj.setMAR(this.MMUobj.readCPU());
						this.operand = this.MMUobj.readCPU();
						this.programCounter++;
						break;
					}
				} else if(this.step == 3){
					this.programCounter++;
					break;
				}
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	public execute(){
		switch(this.instructionRegister){
			//Load the accumulator with a constant
			case 0x00A9:
				this.accumulator = this.operand;
				this.step++;
				break;
			//Load the accumulator from memory
			case 0x00AD:
				this.accumulator = this.operand;
				this.step++;
				break;
			//Store the accumulator in memory
			case 0x008D:
				this.MMUobj.setMDR(this.accumulator);
				this.MMUobj.writeCpu();
				this.step++;
				break;
			//Adds contents of an address ot the contents of the accumulator and keeps the result in the accumulator
			case 0x006D:
				this.accumulator += this.operand;
				this.step++;
				break;
			//Load the X register with a constant
			case 0x00A2:
				this.xRegister = this.operand;
				this.step++;
				break;
			//Load the X register from memory
			case 0x00AE:
				this.xRegister = this.operand;
				this.step++;
				break;
			//Load the Y register with a constant
			case 0x00A0:
				this.yRegister = this.operand;
				this.step++;
				break;
			//Load the Y register from memory
			case 0x00AC:
				this.yRegister = this.operand;
				this.step++;
				break;
			//Compare a byte in memory to the X register; Sets the z flag if equal
			case 0x00EC:
				if(this.operand == this.xRegister){
					this.zFlag = 0;
					this.step++;
					break;
				}
			//Branch n bytes if Z flag = 0
			case 0x00D0:
				if(this.zFlag == 0x0){
					this.programCounter -= this.operand;
					this.step++;
					break;
				}
			//Increment the value of a byte
			case 0x00EE:
				if(this.step == 4){
					this.operand++;
				} else if(this.step == 5){
					this.MMUobj.setMDR(this.operand);
					this.MMUobj.writeCpu();
				} 
			//System Call
			case 0x00FF:
				console.log(this.operand);
		}
	}

	public writeBack(){


	}

	public interruptCheck(){

	}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	public step : number = 1;
	//What occurs when the pulse method is called
	public pulse(){
		console.log(this.MMUobj.getMAR());
		console.log(this.MMUobj.getMDR());
		console.log(this.operand);
		console.log(this.programCounter);
		switch(this.step){
			case 1:
				this.fetch();
				this.log("CPU State | Mode: 0 PC: " + this.programCounter + " IR: " + this.instructionRegister + " Acc " + this.accumulator + " xReg: " + this.xRegister + " yReg: " + this.yRegister + " zFlag: " + this.zFlag);
				this.step++;
				this.log("fetch complete");
				break;
			case 2:
				this.decode();
				this.log("CPU State | Mode: 0 PC: " + this.programCounter + " IR: " + this.instructionRegister + " Acc " + this.accumulator + " xReg: " + this.xRegister + " yReg: " + this.yRegister + " zFlag: " + this.zFlag);
				this.step++;
				this.log("decode complete");
				break;
			case 3:
				this.decode();
				this.log("CPU State | Mode: 0 PC: " + this.programCounter + " IR: " + this.instructionRegister + " Acc " + this.accumulator + " xReg: " + this.xRegister + " yReg: " + this.yRegister + " zFlag: " + this.zFlag);
				this.step++;
				this.log("decode complete");
				break;
			case 4:
				this.execute();
				this.log("CPU State | Mode: 0 PC: " + this.programCounter + " IR: " + this.instructionRegister + " Acc " + this.accumulator + " xReg: " + this.xRegister + " yReg: " + this.yRegister + " zFlag: " + this.zFlag);
				this.step = 1;
				this.log("execute complete");
				break;
			case 5:
				this.execute();
				this.log("CPU State | Mode: 0 PC: " + this.programCounter + " IR: " + this.instructionRegister + " Acc " + this.accumulator + " xReg: " + this.xRegister + " yReg: " + this.yRegister + " zFlag: " + this.zFlag);
				this.step = 1;
				this.log("execute complete");
				break;
			case 6:
				this.interruptCheck();
				this.log("CPU State | Mode: 0 PC: " + this.programCounter + " IR: " + this.instructionRegister + " Acc " + this.accumulator + " xReg: " + this.xRegister + " yReg: " + this.yRegister + " zFlag: " + this.zFlag);
				this.step = 1;
				this.log("interruptCheck complete");
				break;
		}
		this.cpuClockCount++;
		this.log("received clock pulse - CPU Clock Count: " + this.cpuClockCount);
	}





public systemCallProgram(){
	// load constant 3
	this.MMUobj.writeImmediate(0x0000, 0xA9);
	this.MMUobj.writeImmediate(0x0001, 0x0A);
	// write acc (3) to 0040
	this.MMUobj.writeImmediate(0x0002, 0x8D);
	this.MMUobj.writeImmediate(0x0003, 0x40);
	this.MMUobj.writeImmediate(0x0004, 0x00);
	// :loop
	// Load y from memory (3)
	this.MMUobj.writeImmediate(0x0005, 0xAC);
	this.MMUobj.writeImmediate(0x0006, 0x40);
	this.MMUobj.writeImmediate(0x0007, 0x00);
	// Load x with constant (1) (to make the first system call)
	this.MMUobj.writeImmediate(0x0008, 0xA2);
	this.MMUobj.writeImmediate(0x0009, 0x01);
	// make the system call to print the value in the y register (3)
	this.MMUobj.writeImmediate(0x000A, 0xFF);
	// Load x with constant (3) (to make the second system call for the string)
	this.MMUobj.writeImmediate(0x000B, 0xA2);
	this.MMUobj.writeImmediate(0x000C, 0x02);
	// make the system call to print the value in the y register (3)
	this.MMUobj.writeImmediate(0x000D, 0xFF);
	this.MMUobj.writeImmediate(0x000E, 0x50);
	this.MMUobj.writeImmediate(0x000F, 0x00);
	// load the string
	// 0A 48 65 6c 6c 6f 20 57 6f 72 6c 64 21
	/*this.MMUobj.writeImmediate(0x0050, 0x0A);
	this.MMUobj.writeImmediate(0x0051, 0x48);
	this.MMUobj.writeImmediate(0x0052, 0x65);
	this.MMUobj.writeImmediate(0x0053, 0x6C);
	this.MMUobj.writeImmediate(0x0054, 0x6C);
	this.MMUobj.writeImmediate(0x0055, 0x6F);
	this.MMUobj.writeImmediate(0x0056, 0x20);
	this.MMUobj.writeImmediate(0x0057, 0x57);
	this.MMUobj.writeImmediate(0x0058, 0x6F);
	this.MMUobj.writeImmediate(0x0059, 0x72);
	this.MMUobj.writeImmediate(0x005A, 0x6C);
	this.MMUobj.writeImmediate(0x005B, 0x64);
	this.MMUobj.writeImmediate(0x005C, 0x21);
	this.MMUobj.writeImmediate(0x005D, 0x0A);
	this.MMUobj.writeImmediate(0x005E, 0x00);
	//this.MMUobj.memoryDump(0x0000, 0x0010);
	//this.MMUobj.altLog("---------------------------")
	//this.MMUobj.memoryDump(0x0040, 0x0043);
	//this.MMUobj.altLog("---------------------------")
	//this.MMUobj.memoryDump(0x0050, 0x005C);*/
	}
public powersProgram(){
	// load constant 0
	this.MMUobj.writeImmediate(0x0000, 0xA9);
	this.MMUobj.writeImmediate(0x0001, 0x00);
	// write acc (0) to 0040
	this.MMUobj.writeImmediate(0x0002, 0x8D);
	this.MMUobj.writeImmediate(0x0003, 0x40);
	this.MMUobj.writeImmediate(0x0004, 0x00);
	// load constant 1
	this.MMUobj.writeImmediate(0x0005, 0xA9);
	this.MMUobj.writeImmediate(0x0006, 0x01);
	// add acc (?) to mem 0040 (?)
	this.MMUobj.writeImmediate(0x0007, 0x6D);
	this.MMUobj.writeImmediate(0x0008, 0x40);
	this.MMUobj.writeImmediate(0x0009, 0x00);
	// write acc ? to 0040
	this.MMUobj.writeImmediate(0x000A, 0x8D);
	this.MMUobj.writeImmediate(0x000B, 0x40);
	this.MMUobj.writeImmediate(0x000C, 0x00);
	// Load y from memory 0040
	this.MMUobj.writeImmediate(0x000D, 0xAC);
	this.MMUobj.writeImmediate(0x000E, 0x40);
	this.MMUobj.writeImmediate(0x000F, 0x00);
	// Load x with constant (1) (to make the first system call)
	this.MMUobj.writeImmediate(0x0010, 0xA2);
	this.MMUobj.writeImmediate(0x0011, 0x01);
	// make the system call to print the value in the y register (3)
	this.MMUobj.writeImmediate(0x0012, 0xFF);
	// Load x with constant (3) (to make the second system call for the string)
	this.MMUobj.writeImmediate(0x0013, 0xA2);
	this.MMUobj.writeImmediate(0x0014, 0x02);
	// make the system call to print the value in the y register (3)
	this.MMUobj.writeImmediate(0x0015, 0xFF);
	this.MMUobj.writeImmediate(0x0016, 0x50);
	this.MMUobj.writeImmediate(0x0017, 0x00);
	// test DO (Branch Not Equal) will be NE and branch (0x0021 contains 0x20 and xReg contains B2)
	this.MMUobj.writeImmediate(0x0018, 0xD0);
	this.MMUobj.writeImmediate(0x0019, 0xED);
	// globals
	this.MMUobj.writeImmediate(0x0050, 0x2C);
	this.MMUobj.writeImmediate(0x0052, 0x00);
	//this.MMUobj.memoryDump(0x0000, 0x001A);
	//this.MMUobj.altLog("---------------------------")
	//this.MMUobj.memoryDump(0x0050, 0x0053);
	}
}
