# Changelog

## Minor `v0.1.7` - 5 Aug 2025
### Features:
- More robust error-handling system
- Added RP and BP path configuration
- Added addon version configuration
- Added script `enable_beta` configuration

## Hotfix `v0.1.3` - 4 Aug 2025
### Features:
- Puts the name of the Zircon project in the `name` configuration automatically

### Fixed:
- Fixed whole new addon created when changing the `name` configuration
- Fixed `pack_icon` not being copied on first compile

## Major `v0.1.0` - 4 Aug 2025
### Features:
- Added `@minecraft/server-ui` support
- Automatically generates a pack icon when initialising
- Copies the pack icon from the project file to the `com.mojang` development packs when compiling
- Added the `-t` flag, which compiles TypeScript before compiling the project
- Added the ability to compile to multiple versions of Minecraft
- Added the `compileTo` configuration 
- Added the `description` configuration
- Added Education Edition support for Windows

### Fixed:
- Fixed a bug where building the project would change the uuid
- Fixed a bug where the `@minecraft/server` module was not added to the dependencies
- Fixed a bug where compiling a project for the first time would generate errors
- Fixed a bug where the `com.mojang` file for Windows was generated incorrect
- Fixed a bug where changing the author or name of an addon would not change the corresponding manifest

### Changed:
- Moved `com_mojang_path` definition from `zirconfig.json` to `.zircon`


## Major `v0.0.1` - 3 Aug 2025

### Features:
- Added command `init`
- Added command `help`
- Added compile command

---