import { exit } from 'node:process'

export enum LogType {
	NORMAL,
	ERROR,
	WARNING
}

interface Log {
	type: LogType
	message: string
}

export class ErrorHandler {
	// fields
	private logsList: Log[] = []
	private errorFlags = {
		"behavior": false,
		"resource": false
	}

	// methods
	error(message: string, fatal?: boolean, flag?: "behavior"| "resource"): void {
		if (this.errorFlags[flag]) return;
		this.logsList.push({type: LogType.ERROR, message})
		console.error(`\x1b[31mError: ${message}\x1b[0m`)
		if (flag) this.errorFlags[flag] = true
		if (fatal) {
			console.error("Fatal. Compilation stopped.")
			exit();
		}
	}
	warn(message: string): void {
		this.logsList.push({type: LogType.WARNING, message})
		console.warn(`\x1b[33mWarning: ${message}\x1b[0m`)
	}
	log(message: string): void {
		this.logsList.push({type: LogType.NORMAL, message})
		console.log(message)
	}
}