# Solid Aria Components

[![CI](https://github.com/unstyled-solid/solid-aria-components/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/unstyled-solid/solid-aria-components/actions/workflows/ci.yml?query=branch%3Amain+event%3Apush)

Unstyled components for building accessible user interfaces with Solid. Compose buttons, forms, collections, overlays, and date controls with your own styles.

Adapted from [React Aria Components](https://github.com/adobe/react-spectrum/tree/main/packages/react-aria-components), with native Solid reactivity and composition. Maintained independently by [Unstyled Solid](https://github.com/unstyled-solid); this is not an official Adobe project.

---

## Getting started

Install the library and its Solid 2 runtime dependencies:

```sh
npm install @unstyled-solid/solid-aria-components solid-js@2.0.0-rc.13 @solidjs/web@2.0.0-rc.13
```

**Release status:** `@unstyled-solid/solid-aria-components` is the intended public package and has not been published yet. The installation command will become available with its first npm release.

```tsx
import {Button} from '@unstyled-solid/solid-aria-components/Button';

export function Example() {
  return <Button class="my-button">Click me</Button>;
}
```

**Compatibility:** The library requires **Solid 2.0.0-rc.13**, its matching compiler, and `@solidjs/web` at the same version. Configure JSX for `@solidjs/web`. Solid 1 and React runtimes are not supported by the native package. See the [package contract](distribution/staged-manifest.json) for its exact exports and dependencies.

## Documentation

- [Run the documentation website and Solid examples locally](docs-website/README.md)
- [Native Solid documentation islands](docs-website/ISLANDS.md)
- [Upstream React Aria documentation](https://react-spectrum.adobe.com/react-aria/index.html) — useful for component concepts, styling, accessibility, and internationalization; React installation and hook examples do not apply directly to Solid.

Documentation demos are still being qualified. For the current scope and known limitations, see the [documentation checkpoint](docs-website/CHECKPOINT.md) and [library qualification report](tracking/FINAL_DISTRIBUTION.md); these are not a claim of complete upstream parity.

## Contributing

Bug reports, improvements, and pull requests are welcome. Library source lives in [packages/react-aria-components](packages/react-aria-components), with its supporting Aria and Stately packages alongside it. Preserve upstream behavior, tests, and license notices when adapting code; see the [contributor guidance](AGENTS.md) and [upstream maintenance guide](scripts/upstream/README.md).

To build locally, use Node.js 24 and pnpm 11.8.0, matching CI:

```sh
git clone --recurse-submodules https://github.com/unstyled-solid/solid-aria-components.git
cd solid-aria-components
pnpm install --frozen-lockfile
pnpm stage:i18n
pnpm stage:types
pnpm stage:build
```

The build produces TypeScript declarations and separate browser/server ESM modules. Run the library unit and SSR tests with:

```sh
pnpm test:pilot
```

The [CI workflow](.github/workflows/ci.yml) also runs existing browser suites and collects diagnostics across Chromium, Firefox, and WebKit. The badge above tracks the latest push-triggered run on `main`.

## Releases

Follow [GitHub releases](https://github.com/unstyled-solid/solid-aria-components/releases) for updates. The intended [npm package](https://www.npmjs.com/package/@unstyled-solid/solid-aria-components) is `@unstyled-solid/solid-aria-components`; its package page will become available when published.

## Community

For questions, feedback, and bug reports, [open an issue](https://github.com/unstyled-solid/solid-aria-components/issues). Include a minimal reproduction and your Solid/compiler versions when reporting a bug.

## Acknowledgments

Built on the work of Adobe and the [React Spectrum contributors](https://github.com/adobe/react-spectrum/graphs/contributors). This independent, unofficial Solid port is not maintained or endorsed by Adobe or the React Spectrum team. The frozen upstream revision is recorded in the [source registry](tracking/upstream/react-spectrum.json).

## License

Licensed under [Apache 2.0](LICENSE). Original source and third-party notices are retained; see the [attribution and notices guide](scripts/distribution/notices/README.md).
