# Zircon Configuration

The `zirconfig.json` file contains compile data for the compiler. Zircon automatically generates a `zirconfig.json` file with the following content:
```json
{
	"name": "...",
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
	"compileTo": [
		"..."
	]
}
```
if you are using MacOS, `stable` should be replaced with `edu`.

## Detailed rundown of the configurations:

### `name`:
Specifies what the name of the addon should be. Zircon automatically adds the name of the Zircon project here.

### `author`:
Specifies the author of the addon.

### `version`:
Specifies the version of the addon.

### `description`:
Specifies the description of the addon.

### `packs`:
Specifies where the behavior and resource pack directories are relative to the project.

### `scripts`:
The configuration `enable_beta` is a boolean specifying whether scripts should use beta or not. The configuration `entry` currently does nothing.

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
