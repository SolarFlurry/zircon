# Zircon
<img src="icons/zirconiumIcon_500.svg" height="200"/>

## What is Zircon?
Zircon is a TypeScript based Minecraft Bedrock Addons compiler that seperates the project files from the minecraft (`com.mojang`) files, allowing easy Git repository management.

<small>(Also [Regolith](https://github.com/Bedrock-OSS/Regolith) is a similar tool that is much, much more powerful thanks to its filter system, its way better and faster than Zircon, use Regolith.)</small>

Zircon currently supports:
- MacOS (Minecraft Education)
- Windows (Minecraft Bedrock)

> NOTE: Zircon for Windows does not support Education Edition

## Installing Zircon - Command Line
Dependencies:
- Git
- NodeJS

### 1. Get Zircon:
```sh
git clone https://github.com/SolarFlurry/zircon
```

### 2. Build:
```sh
npm run build
npm link
```

## Installing Zircon - Prebuilt Binaries
WIP

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

For a more detailed guide, go to the [docs](./docs)