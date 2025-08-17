#!/usr/bin/env node

import { argv, exit } from 'node:process';
import { Zircon } from './index.js';
import { execSync, exec } from 'node:child_process';
import { tsconfig } from './res/tsconfig.mjs'
import fs from 'node:fs'

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
		console.log(`v0.2.0`)
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
			if (flags.includes('t')) {
				exec("npm init -y")
				fs.mkdir("src", (err) => {
					if (err) zircon.error("Could not create src directory")
					fs.writeFile("src/main.ts", "import { world, system } from '@minecraft/server'", (err) => {
						if (err) zircon.error("Could not create 'main.ts'")
					})
				})
				fs.writeFile("tsconfig.json", JSON.stringify(tsconfig), (err) => {
					if (err) zircon.error("Could not create 'tsconfig.json'")
				})
			}
			zircon.init();
			if (flags.includes('c')) {
				zircon.initCLI()
			} else {
				zircon.initAuto()
			}
			break;
		default: 
			zircon.error(`Unknown command: ${argv[2]}`)
	}
}