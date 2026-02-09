---
title: Contributing Guide
---

# Contributing Guide

How to add features, write commands, and maintain code quality for the Project 1999 Discord bot.

## Adding a New Command

1. **Create the file** in the appropriate `commands/<category>/` folder.
2. **Export `data`** -- a `SlashCommandBuilder` defining the command name, description, and options.
3. **Export `execute`** -- an async function that handles the command interaction.
4. (Optional) Export `autocomplete` if your command uses autocomplete options.
5. (Optional) Export `handleModal` if your command uses modal submissions.
6. (Optional) Export `permissions` (string or string[]) to restrict the command to users with that Discord permission.
7. **Register the command** by running `npx esrun register_guild_commands.ts`.

### Command Template

```typescript
/**
 * `/mycommand` command -- brief description of what it does.
 *
 * @module
 */
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('mycommand')
  .setDescription('Does something useful');

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply('Hello!');
}
```

### Using the Shared Helpers

For census-related commands, use the helpers in `census_functions.ts`:
- `userMustExist()` / `userMustNotExist()` -- DKP record validation
- `toonMustExist()` / `toonMustNotExist()` -- character name validation
- `classMustExist()` / `levelMustBeValid()` -- input validation
- `declareData()` -- shared slash command builder factory for `/main`, `/alt`, `/bot`
- `suggestActiveToons()` -- autocomplete helper
- `declare()` -- creates a Census record
- `insertUser()` -- onboards a new member into DKP

## Adding a New Entity

1. Create a new file in `entities/` with a TypeORM `@Entity` decorator.
2. Add TSDoc: class-level description of the table and field-level docs for non-obvious columns.
3. The entity will be auto-discovered via the `./entities/*.js` glob in `app_data.ts`.
4. Create the table in PostgreSQL manually (synchronise is disabled).

## Code Style

- **TypeScript** with strict mode enabled
- **ESM modules** (`"type": "module"` in package.json)
- **Prettier + ESLint** for formatting -- run your editor's format-on-save
- Use `lodash` for utility functions (already a dependency)
- Capitalise character names with `_.capitalize()` before storing

## TSDoc Conventions

Every file should have a module-level TSDoc block before the first import:

```typescript
/**
 * Brief description of what this module does.
 *
 * Longer explanation if needed, including relationships to other modules
 * and any important behavioural notes.
 *
 * @module
 */
```

For exported functions, add parameter and return descriptions:

```typescript
/**
 * Brief description.
 * @param name - What this parameter is.
 * @returns What the function returns.
 * @throws When it throws.
 */
```

Use backtick-code (e.g. `` `ClassName` ``) to reference types from other modules. Use `{@link}` only for same-file references.

## PR Workflow

1. Create a branch from `main`.
2. Make your changes with appropriate TSDoc.
3. Run `npm run build` to verify TypeScript compilation.
4. Run `npm run docs:build` to verify documentation generation.
5. Submit a pull request against `main`.
6. The docs workflow will automatically build and deploy on merge.
