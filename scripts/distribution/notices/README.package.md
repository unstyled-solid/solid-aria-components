# {{PACKAGE_NAME}}

Private native Solid 2 staging package, version `{{PACKAGE_VERSION}}`.
This is an independent adaptation of Adobe React Aria Components and its
included dependency closure, derived from frozen React Spectrum source commit
`{{SOURCE_SHA}}`. It is not an Adobe or Solid-authored product and implies no
endorsement. This private artifact is not published or fully parity-qualified.

## Native usage identity

After making the verified private archive available to a local consumer, use
its actual package identity, for example:

```ts
import {Button} from '{{PACKAGE_NAME}}/Button';
```

This example names an exported native module, not an installation or runtime
qualification claim. The package internalizes its aria, stately and shared
modules; it does not supply a React runtime. Solid runtime and renderer remain
external peers at the pinned native profile: {{EXTERNAL_PEERS}}.

The actual contract has {{SOURCE_ENTRIES}} source runtime entries and
{{EXPORT_KEYS}} export keys, including localization and package metadata.
It provides ESM only. Resolution order is {{CONDITIONS}}; browser selects DOM
output and worker/deno/node/default select server output. Declarations accompany
the exports. No CommonJS interface or public publication identity is promised.
Use the shipped `package.json` for the exact export surface.

## Source documentation and attribution

The original [Adobe React Aria Components documentation](https://react-spectrum.adobe.com/react-aria/index.html)
describes the upstream React product and its styling, interactions, accessibility,
internationalization and composition concepts. It is source reference material,
not native Solid installation instructions or a guarantee that every documented
behavior is qualified in this port.

This README is adapted from the genuine frozen upstream RAC README; exact
original bytes and the native adaptation hashes are recorded in
`notices/provenance.json`. See `LICENSE`, `NOTICE`, and
`THIRD-PARTY-NOTICES.md` for original attribution and independent modifications.
All applicable captured license texts are included. Two inherited historical
code-donor revisions (jest-dom and Vue portions of `isElementVisible.ts`) remain
unknown and explicitly recorded in provenance; no release-completeness claim
is made.
