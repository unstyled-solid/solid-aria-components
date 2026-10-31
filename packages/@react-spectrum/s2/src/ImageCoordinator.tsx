import {createContext, createEffect, createMemo, createSignal, useContext, type Context} from 'solid-js';
import {dynamic, type JSX} from '@solidjs/web';

export interface ImageCoordinatorProps {
  /** Children within the ImageCoordinator. */
  children: JSX.Element;
  /**
   * Time in milliseconds after which images are always displayed, even if all images are not yet
   * loaded.
   *
   * @default 5000
   */
  timeout?: number;
  /**
   * A group of images to coordinate between, matching the group passed to the `<Image>` component.
   * If not provided, the default image group is used.
   */
  group?: ImageGroup;
}

export type ImageGroup = Context<ImageGroupValue>;

interface ImageGroupValue {
  revealAll: boolean;
  register(url: string): void;
  unregister(url: string): void;
  load(url: string): void;
}

const defaultContext: ImageGroupValue = {
  revealAll: true,
  register() {},
  unregister() {},
  load() {}
};

export const DefaultImageGroup = createImageGroup();

export function createImageGroup(): ImageGroup {
  return createContext(defaultContext);
}

interface State {
  loadedAll: boolean;
  timedOut: boolean;
  loadStartTime: number;
  loaded: Map<string, boolean>;
}

type Action =
  | {type: 'register'; url: string}
  | {type: 'unregister'; url: string}
  | {type: 'load'; url: string}
  | {type: 'timeout'};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'register': {
      if (state.loaded.get(action.url) !== false) {
        let loaded = new Map(state.loaded);
        loaded.set(action.url, false);
        return {
          loadedAll: false,
          // If we had previously loaded all items, then reset the timed out state
          // since this is the first item of a new batch.
          timedOut: state.loadedAll ? false : state.timedOut,
          loadStartTime: state.loadedAll ? Date.now() : state.loadStartTime,
          loaded
        };
      }
      return state;
    }
    case 'unregister': {
      if (state.loaded.has(action.url)) {
        let loaded = new Map(state.loaded);
        loaded.delete(action.url);
        return {
          loadedAll: isAllLoaded(loaded),
          timedOut: state.timedOut,
          loadStartTime: state.loadStartTime,
          loaded
        };
      }
      return state;
    }
    case 'load': {
      if (state.loaded.get(action.url) === false) {
        let loaded = new Map(state.loaded);
        loaded.set(action.url, true);
        return {
          loadedAll: isAllLoaded(loaded),
          timedOut: state.timedOut,
          loadStartTime: state.loadStartTime,
          loaded
        };
      }
      return state;
    }
    case 'timeout': {
      if (!state.loadedAll && !state.timedOut) {
        return {
          ...state,
          timedOut: true
        };
      }
      return state;
    }
    default:
      return state;
  }
}

function isAllLoaded(loaded: Map<string, boolean>) {
  for (let isLoaded of loaded.values()) {
    if (!isLoaded) {
      return false;
    }
  }
  return true;
}

/**
 * An ImageCoordinator coordinates loading behavior for a group of images.
 * Images within an ImageCoordinator are revealed together once all of them have loaded.
 */
export function ImageCoordinator(props: ImageCoordinatorProps): JSX.Element {
  // If we are already inside another ImageCoordinator, just pass
  // through children and coordinate loading at the root.
  let ctx = createMemo(() => useContext(props.group || DefaultImageGroup));
  return <>{ctx() !== defaultContext ? props.children : <ImageCoordinatorRoot {...props} />}</>;
}

function ImageCoordinatorRoot(props: ImageCoordinatorProps) {
  let [state, setState] = createSignal<State>({
    loadedAll: true,
    timedOut: false,
    loadStartTime: 0,
    loaded: new Map()
  });

  let dispatch = (action: Action) => setState(previous => reducer(previous, action));
  let register = (url: string) => {dispatch({type: 'register', url});};
  let unregister = (url: string) => {dispatch({type: 'unregister', url});};
  let load = (url: string) => {dispatch({type: 'load', url});};

  createEffect(() => ({loadedAll: state().loadedAll, loadStartTime: state().loadStartTime, timeout: props.timeout ?? 5000}), ({loadedAll, loadStartTime, timeout}) => {
    if (!loadedAll) {
      let timeoutId = setTimeout(
        () => {
          dispatch({type: 'timeout'});
        },
        loadStartTime + timeout - Date.now()
      );

      return () => clearTimeout(timeoutId);
    }
  });

  let Group = dynamic(() => props.group || DefaultImageGroup);
  let value = {get revealAll() {return state().loadedAll || state().timedOut;}, register, unregister, load};
  return <Group value={value}>{props.children}</Group>;
}
