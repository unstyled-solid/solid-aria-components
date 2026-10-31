import { createComponent as _$createComponent } from "@solidjs/web";
import { memo as _$memo } from "@solidjs/web";
import { createContext, createEffect, createMemo, createSignal, useContext } from "solid-js";
import { dynamic } from "@solidjs/web";
const defaultContext = {
    revealAll: true,
    register() { },
    unregister() { },
    load() { }
};
export const DefaultImageGroup = createImageGroup();
export function createImageGroup() {
    return createContext(defaultContext);
}
function reducer(state, action) {
    switch (action.type) {
        case 'register':
            {
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
        case 'unregister':
            {
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
        case 'load':
            {
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
        case 'timeout':
            {
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
function isAllLoaded(loaded) {
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
export function ImageCoordinator(props) {
    // If we are already inside another ImageCoordinator, just pass
    // through children and coordinate loading at the root.
    let ctx = createMemo(() => useContext(props.group || DefaultImageGroup));
    return _$memo(() => _$memo(() => ctx() !== defaultContext)() ? props.children : _$createComponent(ImageCoordinatorRoot, props));
}
function ImageCoordinatorRoot(props) {
    let [state, setState] = createSignal({
        loadedAll: true,
        timedOut: false,
        loadStartTime: 0,
        loaded: new Map()
    });
    let dispatch = (action) => setState(previous => reducer(previous, action));
    let register = (url) => {
        dispatch({
            type: 'register',
            url
        });
    };
    let unregister = (url) => {
        dispatch({
            type: 'unregister',
            url
        });
    };
    let load = (url) => {
        dispatch({
            type: 'load',
            url
        });
    };
    createEffect(() => ({
        loadedAll: state().loadedAll,
        loadStartTime: state().loadStartTime,
        timeout: props.timeout ?? 5000
    }), ({ loadedAll, loadStartTime, timeout }) => {
        if (!loadedAll) {
            let timeoutId = setTimeout(() => {
                dispatch({
                    type: 'timeout'
                });
            }, loadStartTime + timeout - Date.now());
            return () => clearTimeout(timeoutId);
        }
    });
    let Group = dynamic(() => props.group || DefaultImageGroup);
    let value = {
        get revealAll() {
            return state().loadedAll || state().timedOut;
        },
        register,
        unregister,
        load
    };
    return _$createComponent(Group, {
        value: value,
        get children() {
            return props.children;
        }
    });
}
