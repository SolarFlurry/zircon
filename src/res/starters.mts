export interface Zirconfig {
    "name": string
    "author": string
    "description": string
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

export const zirconfig: Zirconfig = {
    "name": "<project name here>",
	"author": "<your name here>",
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

export const manifestBP = {
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
        },
        {
            "module_name": "@minecraft/server",
            "version": "2.0.0"
        }
    ],
    "metadata": {
        "authors": [""],
        "product_type": "addon"
    }
}

export const manifestRP = {
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