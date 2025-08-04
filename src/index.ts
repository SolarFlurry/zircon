import { v4 } from 'uuid';
import fs from 'node:fs';
import fse from 'fs-extra';
import { exit, env } from 'node:process';
import os from 'node:os';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename: string = fileURLToPath(import.meta.url)
const __dirname: string = path.dirname(__filename)
const currentOS: string = os.platform();

import { zirconfig, manifestBP, manifestRP, Zirconfig } from './res/starters.mjs';
import { com_mojang_dir } from './res/zirconHidden.mjs';
import { helpMessage } from './res/help.mjs'
import { serverUIStable } from './res/scriptModules.mjs'

export function throwError(message: string): void {
    console.error(message);
    exit();
}

export class Zircon {
    generateManifestBP(zirconfig: Zirconfig, uuidRP?: string) {
        const manifest = manifestBP
        manifest.header.name = zirconfig.name
        manifest.header.description = zirconfig.description
        const packUuid = v4();
        manifest.header.uuid = packUuid;
        for (const module of manifest.modules) {
            module.uuid = v4();
        }

        manifest.metadata.authors[0] = zirconfig.author

        if (uuidRP) {
            manifest.dependencies[0].uuid = uuidRP
        }

        manifest.dependencies.push(serverUIStable)

        return manifest
    }
    generateManifestRP(zirconfig: Zirconfig, uuidBP?: string) {
        const manifest = manifestRP
        manifest.header.name = zirconfig.name
        manifest.header.description = zirconfig.description
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
                if (err) throwError("Error creating '.zircon'");
            })
        }
        const ucom_mojang_dir = com_mojang_dir;
        switch (currentOS) {
            case 'darwin':
                ucom_mojang_dir.edu = `${env.HOME}/Library/Application Support/minecraftpe/games/com.mojang/`
                break;
            case 'win32':
                ucom_mojang_dir.stable = `${env.LOCALAPPDATA}/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/`
                ucom_mojang_dir.edu = `${env.LOCALAPPDATA}/Packages/Microsoft.MinecraftEducationEdition_8wekyb3d8bbwe/LocalState/games/com.mojang/`
                break;
            default:
                throwError("Zircon does not support your platform")
        }
                fs.writeFile('.zircon/com_mojang_dir.json', JSON.stringify(ucom_mojang_dir), (err) => {
                    if (err) throwError("Error: config files could not be created")
                })
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

        let uZirconfig: Zirconfig;

        if (fs.existsSync('zirconfig.json')) {
            uZirconfig = JSON.parse(fs.readFileSync('zirconfig.json', 'utf8'))
        } else {
            uZirconfig = zirconfig
            if (currentOS === 'darwin') {
                uZirconfig.compileTo.push("edu")
            } else {
                uZirconfig.compileTo.push("stable")
            }
        }
        fs.writeFile("zirconfig.json", JSON.stringify(uZirconfig, null, '\t'), (err) => {
            if (err) throwError("Error writing to 'zirconfig.json'")
        })
        console.log("Initialising Project...")

        if (!fs.existsSync("pack_icon.png")) {
            fs.copyFile(path.resolve(__dirname, "../icons/zirconiumIcon_500.png"), "pack_icon.png", (err) => {
                if (err) console.log("Error: Failed to create pack icon: " + err)
            })
        }
    }
    build() {
        if (!fs.existsSync('.zircon')) throwError("Error: Use 'zircon init' to initialise a Zircon project");
        fs.readFile('zirconfig.json', 'utf8', (err, data) => {
            if (err) throwError("Error: cannot find 'zirconfig.json'")
            const zirconfig: Zirconfig = JSON.parse(data);
            for (const gameVer of zirconfig.compileTo) {
                this.buildTo(zirconfig, gameVer)
            }
        })
    }
    buildTo(zirconfig: Zirconfig, gameVer: "stable" | "preview" | "edu" | "edu-preview"): void {
        console.log("Compiling Project...")
        if (!fs.existsSync('.zircon')) throwError("Error: Use 'zircon init' to initialise a Zircon project");
        const com_mojang_dir = JSON.parse(fs.readFileSync('.zircon/com_mojang_dir.json', 'utf8'))

        const com_mojang_path: string = com_mojang_dir[gameVer]

        if (!com_mojang_path.endsWith("com.mojang/")) {
            throwError(`! Error !\nThe 'com.mojang' path for '${gameVer}' is missing! Your OS does not support this Minecraftt version. Compile Stopped.`)
        }

        let uuidBP: string;
        let uuidRP: string;
        let manifestBP;
        let manifestRP;
        
        if ((!fs.existsSync(`${com_mojang_path}development_behavior_packs/${zirconfig.name.replace(/\s+/g, '')}BP/manifest.json`))
        || (!fs.existsSync(`${com_mojang_path}development_resource_packs/${zirconfig.name.replace(/\s+/g, '')}RP/manifest.json`))) {
            uuidBP = v4();
            uuidRP = v4();

            manifestBP = this.generateManifestBP(zirconfig, uuidRP)
            manifestRP = this.generateManifestRP(zirconfig, uuidBP)
        } else {
            manifestBP = JSON.parse(fs.readFileSync(`${com_mojang_path}development_behavior_packs/${zirconfig.name.replace(/\s+/g, '')}BP/manifest.json`, 'utf8'))
            manifestRP = JSON.parse(fs.readFileSync(`${com_mojang_path}development_resource_packs/${zirconfig.name.replace(/\s+/g, '')}RP/manifest.json`, 'utf8'))

            uuidBP = manifestBP.header.uuid
            uuidRP = manifestRP.header.uuid

            manifestBP = this.generateManifestBP(zirconfig, uuidRP)
            manifestRP = this.generateManifestRP(zirconfig, uuidBP)
        }

        manifestBP.header.uuid = uuidBP
            
        manifestRP.header.uuid = uuidRP

        if (!fs.existsSync(com_mojang_path)) throwError("Error: com.mojang path does not exist. Please run 'zircon init' to re-initalise.");

        fse.copy("behavior", `${com_mojang_path}development_behavior_packs/${zirconfig.name.replace(/\s+/g, '')}BP/`).then(() => {
            fse.copy("scripts", `${com_mojang_path}development_behavior_packs/${zirconfig.name.replace(/\s+/g, '')}BP/scripts`).catch((err) => {
                throwError(err);
            })
            fs.writeFile(`${com_mojang_path}development_behavior_packs/${zirconfig.name.replace(/\s+/g, '')}BP/manifest.json`, JSON.stringify(manifestBP, null, '\t'), (err) => {
                if (err) console.log("Error generating BP manifest: " + err)
            })
        }).catch((err) => {
            throwError(err);
        })
        fse.copy("resource", `${com_mojang_path}development_resource_packs/${zirconfig.name.replace(/\s+/g, '')}RP/`).then(() => {
            fs.writeFile(`${com_mojang_path}development_resource_packs/${zirconfig.name.replace(/\s+/g, '')}RP/manifest.json`, JSON.stringify(manifestRP, null, '\t'), (err) => {
                if (err) console.log("Error generating RP manifest: " + err)
            })
        }).catch((err) => {
            throwError(err);
        })
        if (fs.existsSync("pack_icon.png")) {
            fs.copyFile("pack_icon.png", `${com_mojang_path}development_behavior_packs/${zirconfig.name.replace(/\s+/g, '')}BP/pack_icon.png`, (err) => {
                if (err) console.log("Error: Could not copy the pack icon: " + err)
            })
            fs.copyFile("pack_icon.png", `${com_mojang_path}development_resource_packs/${zirconfig.name.replace(/\s+/g, '')}RP/pack_icon.png`, (err) => {
                if (err) console.log("Error: Could not copy the pack icon: " + err)
            })
        }
    }
    help(): void {
        console.log(helpMessage)
    }
}