#!/usr/bin/env node

import { argv, exit } from 'node:process';
import { Zircon } from './index.js';
import { execSync } from 'node:child_process';

const zircon = new Zircon();

if (!argv[1].endsWith("zircon")) zircon.error("Run Zircon with 'zircon'. If it does not exist, run 'npm link' in the zircon repository.");

// Get flags
const flags: string[] = []

for (const arg of argv) {
	if (arg.startsWith('-')) {
		flags.push(arg.substring(1))
	}
}

if (argv.length - flags.length <= 2) {
	if (flags.includes('t')) {
		execSync("tsc")
	}
	zircon.build()
} else {
	switch (argv[2]) {
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