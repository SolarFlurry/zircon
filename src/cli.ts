#!/usr/bin/env node

import { argv, exit } from 'node:process';
import { Zircon, throwError } from './index.js';

if (!argv[1].endsWith("zircon")) throwError("Run Zircon with 'zircon'. If it does not exist, run 'npm link' in the zircon repository.");

const zircon = new Zircon();

// Get flags
const flags: string[] = []

for (const arg of argv) {
    if (arg.startsWith('-')) {
        flags.push(arg.substring(1))
    }
}

if (argv.length <= 2) {zircon.build();exit();};

switch (argv[2]) {
    case 'help':
        zircon.help();
        break;
    case 'init':
        zircon.init();
        break;
}