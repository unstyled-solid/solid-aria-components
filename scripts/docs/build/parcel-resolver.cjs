const path = require('node:path');
const {createRequire} = require('node:module');
const r = createRequire(require.resolve('@parcel/config-default'));
const {Resolver} = r('@parcel/plugin');
module.exports = new Resolver({
  resolve({specifier}) {
    if (specifier === 'solid-js' || specifier.startsWith('solid-js/') || specifier === '@solidjs/web') return {isExcluded: true};
    if (path.isAbsolute(specifier)) return {filePath: specifier};
    return null;
  }
});
