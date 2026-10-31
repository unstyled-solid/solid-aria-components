const BASE_URL = {
  dev: {
    'react-aria': 'http://localhost:1234',
    s2: 'http://localhost:4321'
  },
  stage: {
    'react-aria': 'https://d5iwopk28bdhl.cloudfront.net',
    s2: 'https://d1pzu54gtk2aed.cloudfront.net'
  },
  prod: {
    'react-aria': 'https://react-aria.adobe.com',
    s2: 'https://react-spectrum.adobe.com'
  }
};

export function getBaseUrl(library: 'react-aria' | 's2') {
  let env = process.env.DOCS_ENV;
  if (env && process.env.LIBRARY && env !== 'dev' && env !== 'stage' && env !== 'prod') {
    throw new Error('Unknown docs environment: ' + env);
  }
  let base =
    env && process.env.LIBRARY && (env === 'dev' || env === 'stage' || env === 'prod')
      ? BASE_URL[env][library] : `http://localhost:1234/${library}`;
  let publicUrl = process.env.PUBLIC_URL;
  if (publicUrl) {
    base += publicUrl.replace(/\/$/, '');
  }
  return base;
}

// Retained source URL calculation only. No native RSC payload/transport exists;
// Router/client adaptation must replace transport together, not rename it HTML.
export function getRSCUrl(pathname: string) {
  let url = new URL(pathname, location.href);
  url.pathname = url.pathname.replace('.html', '');
  if (!process.env.PARCEL_V3 || process.env.NODE_ENV === 'production') {
    if (url.pathname.endsWith('/')) {
      url.pathname += 'index.rsc';
    } else {
      url.pathname += '.rsc';
    }
  }

  url.search = '';
  url.hash = '';
  return url.href;
}

export function isClientLink(link: HTMLAnchorElement) {
  const library = process.env.LIBRARY;
  if (library && library !== 'react-aria' && library !== 's2') {
    throw new Error('Unknown docs library: ' + library);
  }
  let baseUrl = process.env.LIBRARY
    ? getBaseUrl(library === 's2' ? 's2' : 'react-aria')
    : 'http://localhost:1234';

  return (
    link &&
    link instanceof HTMLAnchorElement &&
    link.href &&
    (!link.target || link.target === '_self') &&
    link.origin === location.origin &&
    !link.hasAttribute('download') &&
    link.href.startsWith(baseUrl) &&
    !link.href.includes('v3/') && // links with v3 are from the old website
    !link.pathname.endsWith('.html') // links with .html are from the old website
  );
}
