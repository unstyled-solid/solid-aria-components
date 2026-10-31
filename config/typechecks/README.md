# Migration batch typechecks

The `tsconfig.p*.json` files here retain the focused checks used during migration.
Run them from the repository root, for example:

```sh
pnpm exec tsc -p config/typechecks/tsconfig.p34-c.json
```

Historical migration records use their former root-level names. Prefix those
config names with `config/typechecks/` when rerunning a recorded command.

The shared `tsconfig.pilot.json` and `tsconfig.wave.json` remain at the repository
root because the current build and documentation tooling consume them directly.
