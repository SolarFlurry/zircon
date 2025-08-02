import { uuid } from 'uuidv4';
import fs from 'node:fs';
import { exit } from 'node:process';

import { starter } from './res/zcon.mjs';
import { helpMessage } from './res/help.mjs'

export function throwError(message: string): void {
    console.error(message);
    exit();
}

export class Zircon {
    constructor() {

    }
    init (): void {
        fs.mkdir(".zircon", (err) => {
            if (err) throwError("Error creating '.zircon'")
        })
        fs.writeFile("zirconfig.json", JSON.stringify(starter, null, '\t'), (err) => {
            if (err) throwError("Error creating 'zirconfig.json'")
        })
    }
    build(): void {}
    help(): void {
        console.log(helpMessage)
    }
}