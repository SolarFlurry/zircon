<div align="center">
<h1>Zircon</h1>
<p><img src="icons/zirconiumIcon_500.svg" height="200"/></p>

<div>
	<a href="https://github.com/SolarFlurry/zircon/blob/main/COPYING"><img src="https://img.shields.io/github/license/SolarFlurry/zircon.svg?style=flat-square"/></a>
	<a><img src="https://img.shields.io/github/package-json/v/SolarFlurry/zircon.svg?style=flat-square&color"/></a>
	<a href="https://github.com/SolarFlurry/zircon/commits/main"><img src="https://img.shields.io/github/commit-activity/m/solarflurry/zircon?style=flat-square&logo=github"/></a>
</div>

<h3>Minecraft Bedrock Add-on development compiler built for TypeScript and Git integration </h3>

<p><a href="./docs/"><strong>Go to Documentation</strong></a></p>
</div>

---

<p align="center">Smooth Git integration, Superfast TypeScript setup, <strong>All with just <i>one</i> command</strong></p>

## What is Zircon?
Zircon is a TypeScript based Minecraft Bedrock Addons compiler that seperates the project files from the Minecraft (`com.mojang`) files, allowing easy Git repository management and TypeScript development.

<small>(Also [Regolith](https://github.com/Bedrock-OSS/Regolith) is a similar tool that is much, much more powerful thanks to its filter system, its way better and faster than Zircon, use Regolith.)</small>

Zircon is currently heavily in development, breaking changes are frequent.

Zircon currently supports:
- MacOS (Minecraft Education)
- Windows (Minecraft Bedrock & Education)

## Using Zircon:

### Initialise Zircon Project:
```sh
mkdir new_addon
cd new_addon
zircon init
```

### Compiling Zircon to com.mojang
```sh
cd new_addon
zircon
```

### [For TypeScript Developers](./docs/typescript.md)

For a more detailed guide, go to the [docs](./docs)