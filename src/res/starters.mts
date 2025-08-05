export interface Zirconfig {
	"name": string
	"author": string
	"description": string
	"version": number[]
	"packs": {
		"behavior": string
		"resource": string
	}
	"scripts": {
		"enable_beta"?: boolean
		"entry": string
	}
	"compileTo": ("stable" | "preview" | "edu" | "edu-preview")[]
}

export interface Manifest {
	"format_version": number | string
	"header": {[key: string]: any}
	"modules": {[key: string]: any}[]
	"dependencies": {[key: string]: any}[]
	"metadata": {[key: string]: any}
}

export const zirconfig: Zirconfig = {
	"name": "<project name here>",
	"author": "<your name here>",
	"version": [1, 0, 0],
	"description": "",
	"packs": {
		"behavior": "./behavior",
		"resource": "./resource"
	},
	"scripts": {
		"entry": "main.js"
	},
	"compileTo": []
}

export const manifestBP: Manifest = {
	"format_version": 2,
	"header": {
		"name": "pack.name",
		"description": "pack.description",
		"uuid": "",
		"version": [1, 0, 0],
		"min_engine_version": [1, 21, 90]
	},
	"modules": [
		{
			"type": "data",
			"uuid": "",
			"version": [1, 0, 0]
		},
		{
			"uuid": "",
			"version": [1, 0, 0],
			"type": "script",
			"language": "javascript",
			"entry": "scripts/main.js",
		}
	],
	"dependencies": [
		{
			"uuid": "",
			"version": [1, 0, 0],
		}
	],
	"metadata": {
		"authors": [""],
		"product_type": "addon"
	}
}

export const manifestRP: Manifest = {
	"format_version": 2,
	"header": {
		"name": "pack.name",
		"description": "pack.description",
		"uuid": "",
		"version": [1, 0, 0],
		"min_engine_version": [1, 21, 90]
	},
	"modules": [
		{
			"type": "resources",
			"uuid": "",
			"version": [1, 0, 0]
		}
	],
	"dependencies": [
		{
			"uuid": "",
			"version": [1, 0, 0]
		}
	],
	"metadata": {
		"authors": [""],
		"product_type": "addon"
	}
}