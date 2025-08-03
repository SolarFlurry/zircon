export const zirconfig = {
    "name": "<project name here>",
    "author": "<your name here>",
    "danger": {
        "com_mojang_path": ""
    }
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
            "version": [1, 0, 0]
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