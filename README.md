<h1 align="center">Zircon</h1>
<p align="center"><img src="icons/zirconiumIcon_500.svg" height="200"/></p>

<h3 align="center">Minecraft Bedrock Add-on development compiler built for TypeScript and Git integration </h3>

<p align="center"><a href="./docs/"><strong>Go to Documentation</strong></a></p>

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