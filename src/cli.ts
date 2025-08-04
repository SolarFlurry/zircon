#!/usr/bin/env node

import { argv, exit } from 'node:process';
import { Zircon, throwError } from './index.js';
import { execSync } from 'node:child_process';

if (!argv[1].endsWith("zircon")) throwError("Run Zircon with 'zircon'. If it does not exist, run 'npm link' in the zircon repository.");

const zircon = new Zircon();

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
            throwError(`Unknown command: ${argv[2]}`)
    }
}