import json5 from 'json5';
// Source s2-docs macro preprocessing, without the Parcel plugin wrapper.
// Accept the actual parser explicitly so its installed resolution is owner-controlled.
export function expandExampleSwitcher(code, parse = json5.parse) {

    let replaced = false;
    code = code.replace(
      /(<ExampleSwitcher type="component" examples={(\[.*?\])}>)((?:.|\n)*?)<\/ExampleSwitcher>/g,
      (m, start, examples, inner) => {
        if (inner.includes('COMPONENT')) {
          replaced = true;
           let components = parse(examples);
          inner = components.map(component => inner.replace(/COMPONENT/g, component)).join('\n\n');
          return start + inner + '</ExampleSwitcher>';
        }

        return m;
      }
    );

    return {code, replaced};
}
