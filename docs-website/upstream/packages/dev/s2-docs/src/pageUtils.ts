const BASE_URL = {
  dev: {
    'react-aria': 'http://localhost:4340',
    s2: 'http://localhost:4340/s2'
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
  const localOrigin = process.env.DOCS_ORIGIN || 'http://localhost:4340';
  let base =
    env === 'dev'
      ? `${localOrigin}${library === 's2' ? '/s2' : ''}`
      : env && process.env.LIBRARY ? BASE_URL[env][library] : `${localOrigin}/${library}`;
  let publicUrl = process.env.PUBLIC_URL;
  if (publicUrl) {
    base += publicUrl.replace(/\/$/, '');
  }
  return base;
}

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
  let baseUrl = process.env.LIBRARY
    ? getBaseUrl(process.env.LIBRARY as any)
    : process.env.DOCS_ORIGIN || 'http://localhost:4340';

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
