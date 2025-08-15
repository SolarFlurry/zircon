#!/usr/bin/env node

import { argv, exit } from 'node:process';
import { Zircon } from './index.js';
import { execSync } from 'node:child_process';

const zircon = new Zircon();

// Get flags
const flags: string[] = []

for (const arg of argv) {
	if (arg.startsWith('-')) {
		flags.push(arg.substring(1))
	}
}

if (argv.length - flags.length <= 2) {
	// command ran is just 'zircon'
	if (flags.includes('v')) {
		console.log(`v0.1.9`)
	} else {
		console.log("Use 'zircon help' for help with Zircon")
	}
} else {
	switch (argv[2]) {
		case 'build':
			if (flags.includes('t')) {
				execSync("tsc")
			}
			zircon.build();
			break;
		case 'help':
			zircon.help();
			break;
		case 'init':
			zircon.init();
			break;
		default: 
			zircon.error(`Unknown command: ${argv[2]}`)
	}
}