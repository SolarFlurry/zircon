# Zircon Configuration

The `zirconfig.json` file contains compile data for the compiler. Zircon automatically generates a `zirconfig.json` file with the following content:
```json
{
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
    "compileTo": [
		"stable"
	]
}
```
if you are using MacOS, `stable` should be replaced with `edu`.

## Detailed rundown of the configurations:

### `name`:
Specifies what the name of the addon should be.

### `author`:
Specifies the author of the addon.

### `description`:
Specifies the description of the `addon`.

### `packs` and `scripts`:
Currently, fields in `packs` and `scripts` does nothing.

### `compileTo`:
Specifies which Minecraft versions to compile to.

Can include:
- `stable`
- `preview`
- `edu`
- `edu-preview`

Currently, Windows only supports `stable` and `edu`, and MacOS only supports `edu`.

---

Next, read [Project Structure](./project-structure.md) for a better understand of Zircon project structure.
