import { v4 } from 'uuid';
import fs from 'node:fs';
import fse from 'fs-extra';
import { exit, env } from 'node:process';
import os from 'node:os';

import { zirconfig, manifestBP, manifestRP } from './res/starters.mjs';
import { helpMessage } from './res/help.mjs'

export function throwError(message: string): void {
    console.error(message);
    exit();
}

export class Zircon {
    generateManifestBP(zirconfig: {name, author}, uuidRP?: string) {
        const manifest = manifestBP
        manifest.header.name = zirconfig.name
        const packUuid = v4();
        manifest.header.uuid = packUuid;
        manifest.modules[0].uuid = v4();

        manifest.metadata.authors[0] = zirconfig.author

        if (uuidRP) {
            manifest.dependencies[0].uuid = uuidRP
        }

        return manifest
    }
    generateManifestRP(zirconfig: {name, author}, uuidBP?: string) {
        const manifest = manifestRP
        manifest.header.name = zirconfig.name
        const packUuid = v4();
        manifest.header.uuid = packUuid;
        manifest.modules[0].uuid = v4();

        manifest.metadata.authors[0] = zirconfig.author

        if (uuidBP) {
            manifest.dependencies[0].uuid = uuidBP
        }

        return manifest
    }
    init (): void {
        if (!fs.existsSync('.zircon')) {
            fs.mkdir(".zircon", (err) => {
                if (err) throwError("Error creating '.zircon'")
            })
        }
        if (!fs.existsSync('behavior')) {
            fs.mkdir("behavior", (err) => {
                if (err) throwError("Error creating 'behavior'")
            })
        }
        if (!fs.existsSync('resource')) {
            fs.mkdir("resource", (err) => {
                if (err) throwError("Error creating 'resource'")
            })
        }
        if (!fs.existsSync('scripts')) {
            fs.mkdir("scripts", (err) => {
                if (err) throwError("Error creating 'scripts'")
            })
        }

        let uZirconfig;

        if (fs.existsSync('zirconfig.json')) {
            uZirconfig = JSON.parse(fs.readFileSync('zirconfig.json', 'utf8'))
        } else {
            uZirconfig = zirconfig
        }

        switch (os.platform()) {
            case 'darwin':
                uZirconfig.danger.com_mojang_path = `${env.HOME}/Library/Application Support/minecraftpe/games/com.mojang/`
                break;
            case 'win32':
                uZirconfig.danger.com_mojang_path = `${env.APPDATA}/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/`
                break;
            default:
                throwError("Zircon does not support your platform")
        }
        fs.writeFile("zirconfig.json", JSON.stringify(uZirconfig, null, '\t'), (err) => {
            if (err) throwError("Error writing to 'zirconfig.json'")
        })
        console.log("Initialising Project...")
    }
    build(): void {
        console.log("Compiling Project...")
        if (!fs.existsSync('.zircon')) throwError("Error: Use 'zircon init' to initialise a Zircon project");
        fs.readFile('zirconfig.json', 'utf-8', (err, data) => {
            if (err) throwError("Error: Project does not include a 'zirconfig.json' file");
            
            const zirconfig = JSON.parse(data)
            const com_mojang_path = zirconfig.danger.com_mojang_path

            console.log(com_mojang_path)

            if (!fs.existsSync(com_mojang_path)) throwError("Error: com.mojang path does not exist. Please run 'zircon init' to re-initalise.");

            fse.copy("behavior", `${com_mojang_path}development_behavior_packs/${zirconfig.name.replace(/\s+/g, '')}BP/`).catch((err) => {
                throwError(err);
            })
            fse.copy("resource", `${com_mojang_path}development_resource_packs/${zirconfig.name.replace(/\s+/g, '')}RP/`).catch((err) => {
                throwError(err);
            })
            fse.copy("scripts", `${com_mojang_path}development_behavior_packs/${zirconfig.name.replace(/\s+/g, '')}BP/scripts`).catch((err) => {
                throwError(err);
            })
            const uuidBP = v4();
            const uuidRP = v4();

            const manifestBP = this.generateManifestBP(zirconfig, uuidRP)
            manifestBP.header.uuid = uuidBP
            const manifestRP = this.generateManifestRP(zirconfig, uuidBP)
            manifestRP.header.uuid = uuidRP

            fs.writeFile(`${com_mojang_path}development_behavior_packs/${zirconfig.name.replace(/\s+/g, '')}BP/manifest.json`, JSON.stringify(manifestBP, null, '\t'), (err) => {
                if (err) console.log("Error generating BP manifest")
            })
            fs.writeFile(`${com_mojang_path}development_resource_packs/${zirconfig.name.replace(/\s+/g, '')}RP/manifest.json`, JSON.stringify(manifestRP, null, '\t'), (err) => {
                if (err) console.log("Error generating RP manifest")
            })
        })
    }
    help(): void {
        console.log(helpMessage)
    }
}