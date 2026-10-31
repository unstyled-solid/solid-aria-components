const {createRequire} = require('node:module');
const r = createRequire(require.resolve('@parcel/config-default'));
const {Resolver} = r('@parcel/plugin');
// Link only these two source modules. Actual source dependencies remain external,
// rather than quietly compiling other owners' product closures.
module.exports = new Resolver({
  resolve({specifier, dependency}) {
    if (specifier === '@parcel/transformer-js/src/esmodule-helpers.js') return null;
    if (dependency.resolveFrom && /(?:Provider|Divider)\.native\.js$/.test(dependency.resolveFrom) &&
      !/^\d+$/.test(specifier)) return {isExcluded: true};
    return null;
  }
});
