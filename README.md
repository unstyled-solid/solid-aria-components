# React Aria Components for Solid 2

An independent, source-tracked Solid 2 adaptation of [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html). This is not an official Adobe project.

The library lives in [`packages/react-aria-components`](packages/react-aria-components). Its frozen React source is recorded in the [`upstream/react-spectrum`](upstream/react-spectrum) Git submodule. The copied documentation website and native Solid demos are under [`docs-website`](docs-website).

## Development

Requires Node.js and pnpm (see `package.json`).

```sh
pnpm install --frozen-lockfile
pnpm exec vitest run --config vitest.config.ts
pnpm exec vitest run --config vitest.browser.config.ts
```

The existing library browser-test diagnostics can be collected with `node scripts/test-diagnostics/run.mjs` followed by `node scripts/test-diagnostics/report.mjs`.

The library targets Solid **2.0.0-rc.13** and its matching compiler and web runtime. See [`HANDOFF.md`](HANDOFF.md) for current qualification and [`tracking/FINAL_DISTRIBUTION.md`](tracking/FINAL_DISTRIBUTION.md) for the most recent package checks. Documentation demos are still being qualified; see [`docs-website/README.md`](docs-website/README.md).

## License

Licensed under [Apache 2.0](LICENSE). The upstream React Spectrum project and copied source retain their respective copyright and license notices.
