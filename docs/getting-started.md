# Getting Started with Zircon

> This tutorial assumes you have understanding of Git, NodeJS and Minecraft Addons

To begin with Zircon, first create a project folder and initialise an empty Zircon project.
```sh
mkdir hello_addon
cd hello_addon
zircon init
```

The `zircon init` command initialises the project. You should see a file and some directories, `zirconfig.json`, `.zircon`, `behavior`, `resource` and `scripts`. It is best to leave `.zircon` untouched unless you really know what you are doing.

`behavior`, `resource` and `scripts` are for the actual content of the addons.

---

We will begin by editing `zirconfig.json`. This file includes the options for compiling. Right now, you should see:
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
Replace your addon's name with `<project name here>`. For more info on this file, go [here](./zirconfig.md).

As you may have guessed, put your alias in `author`, your addon's description in `description` and your addon's version in `version`.

Now you can start developing. the `behavior` folder is for behavior pack content, the `resource` folder is for resource pack content, and the `scripts` folder is for scripts, seperating it from the `behavior` folder for easy TypeScript integration.

> Before you start developing, you **don't** have to add a `manifest.json` for both behavior **and** resource. Zircon automatically generates a manifest based on the compiler configuration defined in `zirconfig.json`, meaning you can save the hassle of writing a manifest.

---

Now that you have some content in your addon, you can compile it. Navigate to your project file and run:
```sh
zircon
```
Yep, it's as simple as that! Now the addon should appear in Minecraft.

---

When using TypeScript, sometimes you will find that you have to repeatedly type:
```sh
tsc
zircon
```

or `tsc && zircon`

While it is not too much of an issue, Zircon has a flag that will run `tsc` before compiling the project.
```
zircon -t
```

This directly runs the `tsc` command, and has no difference from `tsc && zircon`

---

Next, read [Zirconfig Rundown](./zirconfig.md) for a detailed explanation of `zirconfig.json`.