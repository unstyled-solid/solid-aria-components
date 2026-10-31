import {createEffect, onCleanup} from 'solid-js';
import {useHead, type JSX} from '@solidjs/web';
import {useLocale} from 'react-aria/I18nProvider';
import './font-faces.css';

// Typekit ids for each CJK locale. These use dynamic subsetting, so cannot be loaded as CSS.
// Because of the large size of the JS, we only download the script for the locale that is used.
// Each of these kits includes regular, bold, extra bold, and black weights. Spectrum 2 does not use any lighter weights.
let scripts = {
  ja: 'pyb4hbv',
  ko: 'pux4zom',
  'zh-Hans': 'qwy0qqd',
  'zh-CN': 'qwy0qqd',
  'zh-SG': 'qwy0qqd',
  'zh-HK': 'wrf0dsa',
  'zh-Hant': 'twr1oiz',
  zh: 'twr1oiz'
};

// Font URLs from fonts.css to preload for each locale.
let preloads = {
  // Currently no preloads for arabic and hebrew, because we don't know which weights will be used ahead of time.
  // Browsers will emit warnings for unused preloads.
  // ar: [
  // 'https://use.typekit.net/af/dfb464/00000000000000007735a2f9/31/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n7&v=3',
  // 'https://use.typekit.net/af/560a53/00000000000000007735a300/31/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n4&v=3',
  // 'https://use.typekit.net/af/0f9162/00000000000000007735a307/31/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n6&v=3',
  // 'https://use.typekit.net/af/ab2792/00000000000000007735a309/31/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n9&v=3'
  // 'https://use.typekit.net/af/560a53/00000000000000007735a300/31/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n4&v=3'
  // ],
  // he: [
  // 'https://use.typekit.net/af/ffca46/00000000000000007735a30a/31/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n7&v=3',
  // 'https://use.typekit.net/af/e90860/00000000000000007735a313/31/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n4&v=3',
  // 'https://use.typekit.net/af/619974/00000000000000007735a31f/31/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n6&v=3'
  // 'https://use.typekit.net/af/e90860/00000000000000007735a313/31/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n4&v=3'
  // ],
  en: [
    // Preload Adobe Clean Spectrum VF.
    'https://use.typekit.net/af/ca4cba/0000000000000000775c55a1/31/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n1&v=3'
  ]
};

export function Fonts(): JSX.Element {
  let localeState = useLocale();
  let locale = () => new Intl.Locale(localeState.locale);
  let languageAndRegion = () => locale().language + (locale().region ? '-' + locale().region : '');
  let languageAndScript = () => locale().language + (locale().script ? '-' + locale().script : '');

  // Load script tag for CJK font
  let typekitId = () =>
    scripts[locale().baseName as keyof typeof scripts] ||
    scripts[languageAndRegion() as keyof typeof scripts] ||
    scripts[languageAndScript() as keyof typeof scripts] ||
    scripts[locale().language as keyof typeof scripts];
  let script = () => typekitId() ? `https://use.typekit.net/${typekitId()}.js` : null;

  // Native head resources are deduped and retained after scope disposal, including during SSR.
  // Preserve the React 19 CJK early return: a script locale does not also preload fonts.
  useHead(() => {
    let src = script();
    if (src) {
      return {tag: 'script', props: {async: true, src}};
    }

    // Start font loading before the stylesheet downloads, including during SSR.
    let preloadUrls = preloads[locale().language as keyof typeof preloads] || preloads.en;
    return preloadUrls.map(href => ({
      tag: 'link' as const,
      props: {rel: 'preload', href, as: 'font', type: 'font/woff2', crossorigin: ''}
    }));
  });

  // useHead deliberately does not bind event/ref props. Attach only the owned load listener;
  // never remove a shared kit script when this provider or locale scope is disposed.
  createEffect(script, src => {
    if (!src) {
      return;
    }
    let scriptEl = Array.from(document.scripts).find(s => s.src === src);
    if (scriptEl) {
      let onLoad = () => {
        let typekit = (window as Window & {Typekit?: {load?: () => void}}).Typekit;
        if (typeof typekit !== 'undefined' && typeof typekit.load === 'function') {
          typekit.load();
        }
      };
      scriptEl.addEventListener('load', onLoad);
      onCleanup(() => scriptEl.removeEventListener('load', onLoad));
    }
  });

  return null;
}
