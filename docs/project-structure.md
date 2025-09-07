# Zircon Project Structure

> [!NOTE]
> You don't have to follow these practices. However, this project structure is how the Zircon compiler *thinks* the project is organised.

```
project_root/
┣━ node_modules/
┣━ src/
┃  ┗━ main.ts
┣━ behavior/
┃  ┗━ ...
┣─ resource/
┃  ┗━ ...
┣━ scripts/
┣━ .gitignore
┣━ package.json
┣━ tsconfig.json
┣━ pack_icon.png
┗━ zirconfig.json
```

- `project_root` - The root of the entire project
- `node_modules` - NodeJS modules, usually includes the Script API modules
- `src` - Where your TypeScript files go
- `main.ts` - The entry-point of the Script API
- `behavior` - Your behavior pack files
- `resource` - Your resource pack files
- `scripts` - Where your TypeScript files get compiled to, unless you are working with JavaScript, you should leave it alone
- `.gitignore` - Git ignore file
- `package.json` - Node package data
- `tsconfig.json` - Config data for the TypeScript compiler
- `pack_icon.png` - The icon of the pack
- `zirconfig.json` - Config data for Zircon