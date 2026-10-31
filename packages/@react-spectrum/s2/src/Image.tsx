import {ColorSchemeContext} from './Provider';
import {ContextValue, SlotProps} from 'react-aria-components/slots';
import {createContext, createEffect, createMemo, createSignal, For, merge, omit, onSettled, onCleanup, untrack, useContext, type Ref} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef} from 'react-aria/private/utils/useObjectRef';
type HTMLAttributeReferrerPolicy = JSX.ImgHTMLAttributes<HTMLImageElement>['referrerpolicy'];
import {DefaultImageGroup, ImageGroup} from './ImageCoordinator';
import {loadingStyle, useIsSkeleton, useLoadingAnimation} from './Skeleton';
import {mergeStyles} from '../style/runtime';
import {style} from '../style' with {type: 'macro'};
import {StyleString} from '../style/types';
import {UnsafeStyles} from './style-utils';
import {useSpectrumContextProps} from './useSpectrumContextProps';

export interface ImageSource {
  /**
   * A comma-separated list of image URLs and descriptors.
   * [See MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/source#srcset).
   */
  srcSet?: string | undefined;
  /**
   * The color scheme for this image source. Unlike `media`, this respects the `Provider` color
   * scheme setting.
   */
  colorScheme?: 'light' | 'dark';
  /**
   * A media query describing when the source should render.
   * [See MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/source#media).
   */
  media?: string | undefined;
  /**
   * A list of source sizes that describe the final rendered width of the image.
   * [See MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/source#sizes).
   */
  sizes?: string | undefined;
  /**
   * The mime type of the image.
   * [See MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/source#type).
   */
  type?: string | undefined;
  /**
   * The intrinsic width of the image.
   * [See MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/source#width).
   */
  width?: number;
  /**
   * The intrinsic height of the image.
   * [See MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/source#height).
   */
  height?: number;
}

export interface ImageProps extends UnsafeStyles, SlotProps {
  /** The URL of the image or a list of conditional sources. */
  src?: string | ImageSource[];
  // TODO
  // srcSet?: string,
  // sizes?: string,
  /** Accessible alt text for the image. */
  alt?: string;
  /**
   * Indicates if the fetching of the image must be done using a CORS request.
   * [See MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin).
   */
  crossOrigin?: 'anonymous' | 'use-credentials';
  /**
   * Whether the browser should decode images synchronously or asynchronously.
   * [See MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#decoding).
   */
  decoding?: 'async' | 'auto' | 'sync';
  /**
   * Provides a hint of the relative priority to use when fetching the image.
   * [See MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#fetchpriority).
   */
  fetchPriority?: 'high' | 'low' | 'auto';
  /**
   * Whether the image should be loaded immediately or lazily when scrolled into view.
   * [See MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#loading).
   */
  loading?: 'eager' | 'lazy';
  /**
   * A string indicating which referrer to use when fetching the resource.
   * [See MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#referrerpolicy).
   */
  referrerPolicy?: HTMLAttributeReferrerPolicy;
  /**
   * The intrinsic width of the image.
   * [See MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#width).
   */
  width?: number;
  /**
   * The intrinsic height of the image.
   * [See MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#height).
   */
  height?: number;
  /** Spectrum-defined styles, returned by the `style()` macro. */
  styles?: StyleString;
  /** A function that is called to render a fallback when the image fails to load. */
  renderError?: () => JSX.Element;
  /**
   * A group of images to coordinate between, matching the group passed to the `<ImageCoordinator>`
   * component. If not provided, the default image group is used.
   */
  group?: ImageGroup;
  /**
   * Associates the image with a microdata object. See
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/itemprop).
   */
  itemProp?: string;
}

interface ImageContextValue extends ImageProps {
  hidden?: boolean;
}

export const ImageContext =
  createContext<ContextValue<Partial<ImageContextValue>, HTMLDivElement>>(null);

type ImageState = 'loading' | 'loaded' | 'revealed' | 'error';
interface State {
  state: ImageState;
  src: string;
  startTime: number;
  loadTime: number;
}

type Action =
  | {type: 'update'; src: string}
  | {type: 'loaded'}
  | {type: 'revealed'}
  | {type: 'error'};

function createState(src: string): State {
  return {
    state: 'loading',
    src,
    startTime: Date.now(),
    loadTime: 0
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'update': {
      return {
        state: 'loading',
        src: action.src,
        startTime: Date.now(),
        loadTime: 0
      };
    }
    case 'loaded':
    case 'error': {
      return {
        ...state,
        state: action.type
      };
    }
    case 'revealed': {
      return {
        ...state,
        state: 'revealed',
        loadTime: Date.now() - state.startTime
      };
    }
    default:
      return state;
  }
}

const wrapperStyles = style({
  backgroundColor: 'gray-100',
  overflow: 'hidden'
});

const imgStyles = style({
  display: 'block',
  width: 'full',
  height: 'full',
  objectFit: 'inherit',
  objectPosition: 'inherit',
  opacity: {
    default: 0,
    isRevealed: 1
  },
  transition: {
    default: 'none',
    isTransitioning: 'opacity'
  },
  transitionDuration: 500
});

/**
 * An image with support for skeleton loading and custom error states.
 */
export function Image(inputProps: ImageProps & {ref?: Ref<HTMLDivElement>}): JSX.Element {
  let [props, domRef] = useSpectrumContextProps(inputProps, untrack(() => inputProps.ref), ImageContext);
  let hidden = () => (props as ImageContextValue).hidden;
  let srcProp = () => props.src ?? '';
  let colorScheme = createMemo(() => useContext(ColorSchemeContext));
  let cacheKey = createMemo(() => {
    let src = srcProp();
    return typeof src === 'object' ? JSON.stringify(src) : src;
  });
  let group = createMemo(() => useContext(props.group ?? DefaultImageGroup));
  let [state, setState] = createSignal<State>(untrack(() => createState(cacheKey())));
  let dispatch = (action: Action) => setState(previous => reducer(previous, action));
  createEffect(() => ({key: cacheKey(), hidden: hidden()}), ({key, hidden}) => {
    if (!hidden && key !== untrack(state).src) {dispatch({type: 'update', src: key});}
  });
  createEffect(() => ({state: state().state, revealAll: group().revealAll, hidden: hidden()}), value => {
    if (value.state === 'loaded' && value.revealAll && !value.hidden) {dispatch({type: 'revealed'});}
  });
  let imgRef = useObjectRef<HTMLImageElement>();
  createEffect(() => ({key: cacheKey(), hidden: hidden(), group: group()}), value => {
    if (value.hidden) {return;}
    value.group.register(value.key);
    return () => value.group.unregister(value.key);
  });
  let onLoad = () => {group().load(cacheKey()); dispatch({type: 'loaded'});};
  let onError = () => {dispatch({type: 'error'}); group().unregister(cacheKey());};
  let isSkeleton = useIsSkeleton();
  let isAnimating = () => isSkeleton() || state().state === 'loading' || state().state === 'loaded';
  let animation = useLoadingAnimation(isAnimating);
  let disposed = false;
  onCleanup(() => {disposed = true;});
  createEffect(() => ({hidden: hidden(), img: imgRef.current, node: domRef.current, state: state().state, key: cacheKey(), animating: isAnimating()}), value => {
    if (value.hidden) {return;}
    onSettled(() => {
      // Cached-image checks run after native host attachment, under this owner.
      // Source's queued production check is retained without React act globals.
      if (value.state === 'loading' && value.img?.complete) {
        queueMicrotask(() => {
          if (disposed || imgRef.current !== value.img || hidden() || cacheKey() !== value.key) {return;}
          if (value.img!.naturalWidth === 0 && value.img!.naturalHeight === 0) {onError();}
          else {onLoad();}
        });
      }
      animation(value.node);
    });
  });
  createEffect(() => props.alt, alt => {
    if (alt == null && process.env.NODE_ENV !== 'production') {
      console.warn('The `alt` prop was not provided to an image. ' +
        'Add `alt` text for screen readers, or set `alt=""` prop to indicate that the image ' +
        'is decorative or redundant with displayed text and should not be announced by screen readers.');
    }
  });
  let errorState = createMemo(() => !isSkeleton() && state().state === 'error' && props.renderError?.());
  let isRevealed = () => state().state === 'revealed' && !isSkeleton();
  let isTransitioning = () => isRevealed() && state().loadTime > 200;
  let renderImage = () => <img
    fetchpriority={props.fetchPriority}
    src={typeof srcProp() === 'string' && srcProp() ? srcProp() as string : undefined}
    alt={props.alt}
    crossorigin={props.crossOrigin}
    decoding={props.decoding}
    loading={props.loading}
    referrerpolicy={props.referrerPolicy}
    width={props.width}
    height={props.height}
    ref={imgRef}
    itemprop={props.itemProp}
    onLoad={onLoad}
    onError={onError}
    class={imgStyles({isRevealed: isRevealed(), isTransitioning: isTransitioning()})}
  />;
  return <>{!hidden() && <div
    ref={domRef}
    slot={props.slot || undefined}
    style={props.UNSAFE_style}
    class={(props.UNSAFE_className ?? '') + mergeStyles(wrapperStyles, props.styles) + ' ' + (isAnimating() ? loadingStyle : '')}>
    {errorState()}
    {!errorState() && (Array.isArray(srcProp()) ?
      <picture class={style({objectFit: 'inherit', objectPosition: 'inherit'})}>
        <For each={srcProp() as ImageSource[]} keyed={false}>{source => {
          let sourceProps = omit(merge(source), 'colorScheme', 'srcSet');
          let sourceColorScheme = () => source().colorScheme;
          return <>{!sourceColorScheme() || !colorScheme() || colorScheme() === 'light dark' || sourceColorScheme() === colorScheme() ?
            <source {...sourceProps}
              srcset={source().srcSet}
              media={sourceColorScheme() && (!colorScheme() || colorScheme() === 'light dark')
                ? `${source().media ? `${source().media} and ` : ''}(prefers-color-scheme: ${sourceColorScheme()})`
                : source().media} /> : null}</>;
        }}</For>
        {renderImage()}
      </picture> : renderImage())}
  </div>}</>;
}
