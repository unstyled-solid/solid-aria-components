import {getBaseUrl} from './pageUtils.ts';
import type {Page} from './Page';
import {getDocsPages} from '../../../../scripts/docs/routes/index.ts';

// Scoped native metadata cache; incomplete catalog intake throws explicitly.
export function getPages(): Promise<Page[]> {
  return getDocsPages(getUrl);
}

export function getUrl(name: string) {
  if (name.endsWith('/index')) {
    name = name.slice(0, -5);
  }

  let library = name.slice(0, name.indexOf('/'));
  let baseUrl = library === 'react-aria' || library === 's2' ? getBaseUrl(library) : undefined;
  if (library === 'react-aria') {
    return `${baseUrl}/${name.slice(11)}`;
  } else if (library === 's2') {
    return `${baseUrl}/${name.slice(3)}`;
  } else if (!process.env.LIBRARY) {
    return `http://localhost:1234/${name}`;
  } else {
    throw new Error('Unknown page: ' + name);
  }
}

export function getCurrentPage(page: Page): Page {
  // Remove .html
  let name = page.name.slice(0, -5);

  // Prepend current build's library
  let library = process.env.LIBRARY;
  if (library) {
    name = `${library}/${name}`;
  }

  return {
    name,
    url: getUrl(name),
    exports: page.exports,
    tableOfContents: page.tableOfContents
  };
}

// console.log(await getPages());
