import { v4 } from 'uuid';
import fs from 'node:fs';
import fse from 'fs-extra';
import { exit, env, cwd, stdin, stdout } from 'node:process';
import os from 'node:os';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename: string = fileURLToPath(import.meta.url)
const __dirname: string = path.dirname(__filename)
const currentOS: string = os.platform();

import { zirconfig, manifestBP, manifestRP, Zirconfig, Manifest } from './res/starters.mjs';
import { com_mojang_dir } from './res/zirconHidden.mjs';
import { helpMessage } from './res/help.mjs'
import { serverModule, serverUIModule, debugUtilitiesModule, serverAdminModule, serverNetModule, serverGametestModule } from './res/scriptModules.mjs'
import { ErrorHandler } from './error.js'
import { MinecraftVersion } from './types.js'

export class Zircon extends ErrorHandler {
	generateManifestBP(zirconfig: Zirconfig, gameVer: MinecraftVersion, minVer?: number[], uuidRP?: string) {
		const manifest = manifestBP
		manifest.header.name = zirconfig.name
		manifest.header.description = zirconfig.description
		manifest.header.version = zirconfig.version
		manifest.header.min_engine_version = minVer
		const packUuid = v4();
		manifest.header.uuid = packUuid;

		for (const module of manifest.modules) {
			module.uuid = v4();
		}

		const scriptType = zirconfig.scripts.enable_beta ? "beta" : "stable"

		manifest.dependencies.push({
			"module_name": "@minecraft/server",
			"version": serverModule[gameVer][scriptType]
		})

		if (zirconfig.scripts.dependencies) {
			for (const dependency of zirconfig.scripts.dependencies) {
				switch (dependency) {
					case "ui":
						manifest.dependencies.push({
							"module_name": "@minecraft/server-ui",
							"version": serverUIModule[gameVer][scriptType]
						})
						break;
					case "admin":
						if (!zirconfig.scripts.enable_beta) {
							this.warn(`Beta must be enabled to use ${dependency}`)
							break;
						}
						manifest.dependencies.push({
							"module_name": "@minecraft/server-admin",
							"version": serverAdminModule
						})
						break;
					case "net":
						if (!zirconfig.scripts.enable_beta) {
							this.warn(`Beta must be enabled to use ${dependency}`)
							break;
						}
						manifest.dependencies.push({
							"module_name": "@minecraft/server-net",
							"version": serverNetModule
						})
						break;
					case "gametest":
						if (!zirconfig.scripts.enable_beta) {
							this.warn(`Beta must be enabled to use ${dependency}`)
							break;
						}
						manifest.dependencies.push({
							"module_name": "@minecraft/server-gametest",
							"version": serverGametestModule
						})
						break;
					default:
						this.error(`Unsupported dependency '${dependency}'`)
				}
			}
		}

		if (zirconfig.scripts.debug_utilities) {
			if (zirconfig.scripts.enable_beta) {
				manifest.dependencies.push({
					"module_name": "@minecraft/debug-utilities",
					"version": debugUtilitiesModule
				})
			} else {
				this.warn("Beta must be enabled to use debug-utilities")
			}
		}

		manifest.metadata.authors[0] = zirconfig.author

		if (zirconfig.scripts?.entry) {
			manifest.modules[1].entry = zirconfig.scripts.entry
		}

		if (uuidRP) {
			manifest.dependencies[0].uuid = uuidRP
		}

		return manifest
	}
	generateManifestRP(zirconfig: Zirconfig, minVer?: number[], uuidBP?: string) {
		const manifest: Manifest = manifestRP
		manifest.header.name = zirconfig.name
		manifest.header.description = zirconfig.description
		manifest.header.version = zirconfig.version
		manifest.header.min_engine_version = minVer
		const packUuid = v4();
		manifest.header.uuid = packUuid;
		manifest.modules[0].uuid = v4();

		manifest.metadata.authors[0] = zirconfig.author

		if (uuidBP) {
			manifest.dependencies[0].uuid = uuidBP
		}

		return manifest
	}
	init(): void {
		if (!fs.existsSync('.zircon')) {
			fs.mkdir(".zircon", (err) => {
				if (err) this.error("Config files could not be generated", true);
				fs.writeFile('.zircon/com_mojang_dir.json', JSON.stringify(ucom_mojang_dir), (err) => {
					if (err) this.error("Config files could not be generated", true);
				})
				fs.writeFile('.zircon/pid.txt', path.basename(cwd()).replace(/\s+/g, '_'), (err) => {
					if (err) this.error("Config files could not be generated", true);
				})
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
				this.error("Zircon does not support your platform.", true);
		}
		if (!fs.existsSync('behavior')) {
			fs.mkdir("behavior", (err) => {
				if (err) this.error("Failed to create behavior directory")
			})
		}
		if (!fs.existsSync('resource')) {
			fs.mkdir("resource", (err) => {
				if (err) this.error("Failed to create resource directory")
			})
		}
		if (!fs.existsSync('scripts')) {
			fs.mkdir("scripts", (err) => {
				if (err) this.error("Failed to create scripts directory")
			})
		}
		if (!fs.existsSync("pack_icon.png")) {
			fs.copyFile(path.resolve(__dirname, "../icons/zirconiumIcon_500.png"), "pack_icon.png", (err) => {
				if (err) this.error("Failed to create pack icon")
			})
		}
	}
	initAuto(): void {
		let uZirconfig: Zirconfig;

		if (fs.existsSync('zirconfig.json')) {
			uZirconfig = JSON.parse(fs.readFileSync('zirconfig.json', 'utf8'))
		} else {
			uZirconfig = zirconfig
			if (currentOS === 'darwin') {
				uZirconfig.compileTo.push({
					"mcVersion": "edu",
					"reqVersion": [1, 21, 91]
				})
			} else {
				uZirconfig.compileTo.push({
					"mcVersion": "stable",
					"reqVersion": [1, 21, 101]
				})
			}
			uZirconfig.name = path.basename(cwd())
		}
		fs.writeFile("zirconfig.json", JSON.stringify(uZirconfig, null, '\t'), (err) => {
			if (err) this.error("Could not write to zirconfig.json")
		})
		console.log("Initialising Project...")
	}
	initCLI(): void {
		const rl = readline.createInterface({
			input: stdin,
			output: stdout
		})

		const uZirconfig: Zirconfig = zirconfig;

		if (currentOS === 'darwin') {
			uZirconfig.compileTo.push({
				"mcVersion": "edu",
				"reqVersion": [1, 21, 91]
			})
		} else {
			uZirconfig.compileTo.push({
				"mcVersion": "stable",
				"reqVersion": [1, 21, 101]
			})
		}

		rl.question(`Enter pack name: (${path.basename(cwd())}) `, (answer) => {
			let name = path.basename(cwd())
			if (answer.trim() !== "") name = answer.trim();
			uZirconfig.name = name
			rl.question("Enter pack description: ", (answer) => {
				uZirconfig.description = answer
				rl.question(`Enter pack author: `, (answer) => {
					uZirconfig.author = answer
					fs.writeFile("zirconfig.json", JSON.stringify(uZirconfig, null, '\t'), (err) => {
						if (err) this.error("Could not write to zirconfig.json")
					})
					rl.close()
				})
			})
		})
	}
	build() {
		if (!fs.existsSync('.zircon')) this.error("Use 'zircon' in a Zircon project.", true)
		fs.readFile('zirconfig.json', 'utf8', (err, data) => {
			if (err) this.error("Cannot find 'zirconfig.json'", true)
			const zirconfig: Zirconfig = JSON.parse(data);
			for (const gameVer of zirconfig.compileTo) {
				this.buildTo(zirconfig, gameVer.mcVersion, gameVer.reqVersion)
			}
		})
	}
	buildTo(zirconfig: Zirconfig, gameVer: MinecraftVersion, minVer: number[]): void {
		this.log("Compiling project...")
		if (!fs.existsSync('.zircon')) this.error("Use 'zircon' in a Zircon project.", true)
		const com_mojang_dir = JSON.parse(fs.readFileSync('.zircon/com_mojang_dir.json', 'utf8'))
		const PID: string = fs.readFileSync('.zircon/pid.txt', 'utf8')

		const com_mojang_path: string = com_mojang_dir[gameVer]

		if (!com_mojang_path.endsWith("com.mojang/")) {
			this.error(`The 'com.mojang' path for '${gameVer}' is missing! Your OS does not support this Minecraft version.`, true)
		} else {
			this.log("Data files fetched.")
		}

		const pathBP: string = zirconfig.packs.behavior
		const pathRP: string = zirconfig.packs.resource

		let uuidBP: string;
		let uuidRP: string;
		let manifestBP;
		let manifestRP;

		if ((!fs.existsSync(`${com_mojang_path}development_behavior_packs/${PID}BP/manifest.json`))
			|| (!fs.existsSync(`${com_mojang_path}development_resource_packs/${PID}RP/manifest.json`))) {
			this.log("Generating new manifest...")
			uuidBP = v4();
			uuidRP = v4();

			manifestBP = this.generateManifestBP(zirconfig, gameVer, minVer, uuidRP)
			manifestRP = this.generateManifestRP(zirconfig, minVer, uuidBP)
		} else {
			this.log("Updating manifest...")
			manifestBP = JSON.parse(fs.readFileSync(`${com_mojang_path}development_behavior_packs/${PID}BP/manifest.json`, 'utf8'))
			manifestRP = JSON.parse(fs.readFileSync(`${com_mojang_path}development_resource_packs/${PID}RP/manifest.json`, 'utf8'))

			uuidBP = manifestBP.header.uuid
			uuidRP = manifestRP.header.uuid

			manifestBP = this.generateManifestBP(zirconfig, gameVer, minVer, uuidRP)
			manifestRP = this.generateManifestRP(zirconfig, minVer, uuidBP)
		}

		manifestBP.header.uuid = uuidBP

		manifestRP.header.uuid = uuidRP

		if (!fs.existsSync(com_mojang_path)) this.error("The com.mojang path does not exist. Please run 'zircon init' to re-initalise.");

		fs.rm(`${com_mojang_path}development_behavior_packs/${PID}BP/`, { recursive: true }, (err) => {
			if (err) {
				this.warn("Could not remove deleted files")
			}
			fse.copy(pathBP, `${com_mojang_path}development_behavior_packs/${PID}BP/`).then(() => {
				this.log("Copied behavior directory successfully")
				fse.copy("scripts", `${com_mojang_path}development_behavior_packs/${PID}BP/scripts`).catch((err) => {
					this.error("Could not copy scripts directory", false, "behavior")
				})
				fs.writeFile(`${com_mojang_path}development_behavior_packs/${PID}BP/manifest.json`, JSON.stringify(manifestBP, null, '\t'), (err) => {
					if (err) this.error("Could not create BP manifest", false, "behavior")
				})
				if (fs.existsSync("pack_icon.png")) {
					fs.copyFile("pack_icon.png", `${com_mojang_path}development_behavior_packs/${PID}BP/pack_icon.png`, (err) => {
						if (err) this.error("Could not copy pack icon", false, "behavior")
					})
				}
			}).catch((err) => {
				this.error("Could not copy behavior directory", false, "behavior")
			})
		})

		fs.rm(`${com_mojang_path}development_resource_packs/${PID}RP/`, { recursive: true }, (err) => {
			if (err) {
				this.warn("Could not remove deleted files")
			}
			fse.copy(pathRP, `${com_mojang_path}development_resource_packs/${PID}RP/`).then(() => {
				this.log("Copied resource directory successfully")
				fs.writeFile(`${com_mojang_path}development_resource_packs/${PID}RP/manifest.json`, JSON.stringify(manifestRP, null, '\t'), (err) => {
					if (err) this.error("Could not create RP manifest", false, "resource")
				})
				if (fs.existsSync('pack_icon.png')) {
					fs.copyFile("pack_icon.png", `${com_mojang_path}development_resource_packs/${PID}RP/pack_icon.png`, (err) => {
						if (err) this.error("Could not copy pack icon", false, "resource")
					})
				}
			}).catch((err) => {
				this.error("Could not copy resource directory", false, "resource")
			})
		})

	}
	help(): void {
		console.log(helpMessage)
	}
}