import "./Link.native.css";
import {dynamic as $l0gtI$dynamic, createComponent as $l0gtI$createComponent, mergeProps as $l0gtI$mergeProps, applyRef as $l0gtI$applyRef, isServer as $l0gtI$isServer, template as $l0gtI$template, getNextElement as $l0gtI$getNextElement, ref as $l0gtI$ref, insert as $l0gtI$insert, scope as $l0gtI$scope, effect as $l0gtI$effect, setAttribute as $l0gtI$setAttribute, className as $l0gtI$className} from "@solidjs/web";
import {createContext as $l0gtI$createContext, merge as $l0gtI$merge, omit as $l0gtI$omit, useContext as $l0gtI$useContext, $PROXY as $l0gtI$$PROXY, isHydrating as $l0gtI$isHydrating, createUniqueId as $l0gtI$createUniqueId, createSignal as $l0gtI$createSignal, untrack as $l0gtI$untrack, createEffect as $l0gtI$createEffect, onCleanup as $l0gtI$onCleanup, onSettled as $l0gtI$onSettled, action as $l0gtI$action, runWithOwner as $l0gtI$runWithOwner, createMemo as $l0gtI$createMemo, createRenderEffect as $l0gtI$createRenderEffect} from "solid-js";
import $l0gtI$clsx from "clsx";


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

      var $parcel$global =
        typeof globalThis !== 'undefined'
          ? globalThis
          : typeof self !== 'undefined'
          ? self
          : typeof window !== 'undefined'
          ? window
          : typeof global !== 'undefined'
          ? global
          : {};
  
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire90fa"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire90fa"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;
parcelRegister("lB2Ba", function(module, exports) {

$parcel$export(module.exports, "Link", function () { return (parcelRequire("gSanO")).Link; });
/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $gSanO = parcelRequire("gSanO");

});
parcelRegister("gSanO", function(module, exports) {

$parcel$export(module.exports, "Link", function () { return $c489be55202de4a6$export$a6c7ac8248d6e38a; });


var $aUh1K = parcelRequire("aUh1K");

var $2A4az = parcelRequire("2A4az");
parcelRequire("bAtJj");
var $5gAIA = parcelRequire("5gAIA");
parcelRequire("2iotZ");
var $7boJ2 = parcelRequire("7boJ2");


var $6p9dH = parcelRequire("6p9dH");

var $9HiNI = parcelRequire("9HiNI");

var $8k5ge = parcelRequire("8k5ge");
const $c489be55202de4a6$export$e2509388b49734e7 = (0, $l0gtI$createContext)(null);
function $c489be55202de4a6$export$a6c7ac8248d6e38a(inputProps) {
    let [props, contextRef] = (0, $2A4az.useContextProps)(inputProps, inputProps.ref, $c489be55202de4a6$export$e2509388b49734e7);
    // useContextProps composes renderer refs into a callable attachment handle.
    let ref = (0, $6p9dH.useObjectRef)(contextRef);
    let elementType = ()=>props.href && !props.isDisabled ? 'a' : 'span';
    let { linkProps: linkProps, isPressed: isPressed } = (0, $aUh1K.useLink)((0, $l0gtI$merge)(props, {
        get elementType () {
            return elementType();
        }
    }), ref);
    let ElementType = (0, $l0gtI$dynamic)(()=>(0, $2A4az.dom)[elementType()]);
    let { hoverProps: hoverProps, isHovered: isHovered } = (0, $8k5ge.useHover)(props);
    let { focusProps: focusProps, isFocused: isFocused, isFocusVisible: isFocusVisible } = (0, $9HiNI.useFocusRing)();
    let renderProps = (0, $2A4az.useRenderProps)((0, $l0gtI$merge)((0, $l0gtI$omit)(props, 'render'), {
        defaultClassName: 'react-aria-Link',
        values: {
            get isCurrent () {
                return !!props['aria-current'];
            },
            get isDisabled () {
                return props.isDisabled || false;
            },
            get isPressed () {
                return isPressed();
            },
            get isHovered () {
                return isHovered();
            },
            get isFocused () {
                return isFocused();
            },
            get isFocusVisible () {
                return isFocusVisible();
            }
        }
    }));
    let DOMProps = (0, $l0gtI$omit)((0, $5gAIA.filterDOMProps)(props, {
        global: true
    }), 'onClick');
    return (0, $l0gtI$createComponent)(ElementType, (0, $l0gtI$mergeProps)({
        ref (r$) {
            var _ref$ = ref;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $l0gtI$applyRef)(_ref$, r$) : ref = r$;
        },
        get slot () {
            return props.slot || undefined;
        }
    }, ()=>(0, $l0gtI$omit)((0, $7boJ2.mergeProps)(DOMProps, renderProps, linkProps, hoverProps, focusProps), 'ref'), {
        get render () {
            return props.render;
        },
        get "aria-disabled" () {
            return props.isDisabled ? 'true' : undefined;
        },
        get "data-focused" () {
            return isFocused() ? 'true' : undefined;
        },
        get "data-hovered" () {
            return isHovered() ? 'true' : undefined;
        },
        get "data-pressed" () {
            return isPressed() ? 'true' : undefined;
        },
        get "data-focus-visible" () {
            return isFocusVisible() ? 'true' : undefined;
        },
        get "data-current" () {
            return props['aria-current'] ? 'true' : undefined;
        },
        get "data-disabled" () {
            return props.isDisabled ? 'true' : undefined;
        },
        get children () {
            return renderProps.children;
        }
    }));
}

});
parcelRegister("aUh1K", function(module, exports) {

$parcel$export(module.exports, "useLink", function () { return $7f0c579a10201436$export$dcf14c9974fe2767; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $5gAIA = parcelRequire("5gAIA");

var $fNnwP = parcelRequire("fNnwP");

var $7boJ2 = parcelRequire("7boJ2");


var $kKI9C = parcelRequire("kKI9C");

var $eTc6R = parcelRequire("eTc6R");

var $6p9dH = parcelRequire("6p9dH");
function $7f0c579a10201436$export$dcf14c9974fe2767(props, ref) {
    let domRef = ref ?? (0, $6p9dH.useObjectRef)();
    let linkProps = {
        get role () {
            return (props.elementType ?? 'a') !== 'a' ? 'link' : undefined;
        },
        get tabIndex () {
            return (props.elementType ?? 'a') !== 'a' && !props.isDisabled ? 0 : undefined;
        }
    };
    let { focusableProps: focusableProps } = (0, $kKI9C.useFocusable)(props, domRef);
    let { pressProps: pressProps, isPressed: isPressed } = (0, $eTc6R.usePress)({
        get onPress () {
            return props.onPress;
        },
        get onPressStart () {
            return props.onPressStart;
        },
        get onPressEnd () {
            return props.onPressEnd;
        },
        get onPressChange () {
            return props.onPressChange;
        },
        get onClick () {
            return props.onClick;
        },
        get isDisabled () {
            return props.isDisabled;
        },
        ref: domRef
    });
    let domProps = (0, $5gAIA.filterDOMProps)(props, {
        labelable: true
    });
    let interactionHandlers = (0, $7boJ2.mergeProps)(focusableProps, pressProps);
    let router = (0, $fNnwP.useRouter)();
    let routerLinkProps = (0, $fNnwP.useLinkProps)(props);
    return {
        isPressed: isPressed,
        // Used to indicate press state for visual
        linkProps: (0, $7boJ2.mergeProps)((0, $l0gtI$omit)(domProps, 'onClick'), routerLinkProps, (0, $l0gtI$omit)(interactionHandlers, 'onClick'), linkProps, {
            get 'aria-disabled' () {
                return props.isDisabled || undefined;
            },
            get 'aria-current' () {
                return props['aria-current'];
            },
            onClick: (e)=>{
                let handler = pressProps.onClick;
                if (typeof handler === 'function') handler(e);
                else if (handler) handler[0](handler[1], e);
                (0, $fNnwP.handleLinkClick)(e, router, props.href, props.routerOptions);
            }
        })
    };
}

});
parcelRegister("5gAIA", function(module, exports) {

$parcel$export(module.exports, "filterDOMProps", function () { return $3d5aedd7cf5e55dc$export$457c3d6518dd4c6f; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ const $3d5aedd7cf5e55dc$var$DOMPropNames = new Set([
    'id'
]);
const $3d5aedd7cf5e55dc$var$labelablePropNames = new Set([
    'aria-label',
    'aria-labelledby',
    'aria-describedby',
    'aria-details'
]);
// See LinkDOMProps in dom.d.ts.
const $3d5aedd7cf5e55dc$var$linkPropNames = new Set([
    'href',
    'hrefLang',
    'target',
    'rel',
    'download',
    'ping',
    'referrerPolicy'
]);
const $3d5aedd7cf5e55dc$var$globalAttrs = new Set([
    'dir',
    'lang',
    'hidden',
    'inert',
    'translate',
    'suppressHydrationWarning'
]);
const $3d5aedd7cf5e55dc$var$globalEvents = new Set([
    'onClick',
    'onAuxClick',
    'onContextMenu',
    'onDoubleClick',
    'onMouseDown',
    'onMouseEnter',
    'onMouseLeave',
    'onMouseMove',
    'onMouseOut',
    'onMouseOver',
    'onMouseUp',
    'onTouchCancel',
    'onTouchEnd',
    'onTouchMove',
    'onTouchStart',
    'onPointerDown',
    'onPointerMove',
    'onPointerUp',
    'onPointerCancel',
    'onPointerEnter',
    'onPointerLeave',
    'onPointerOver',
    'onPointerOut',
    'onGotPointerCapture',
    'onLostPointerCapture',
    'onScroll',
    'onWheel',
    'onAnimationStart',
    'onAnimationEnd',
    'onAnimationIteration',
    'onTransitionCancel',
    'onTransitionEnd',
    'onTransitionRun',
    'onTransitionStart'
]);
const $3d5aedd7cf5e55dc$var$propRe = /^(data-.*)$/;
function $3d5aedd7cf5e55dc$export$457c3d6518dd4c6f(props, opts = {}) {
    let { labelable: labelable, isLink: isLink, global: global, events: events = global, propNames: propNames } = opts;
    const allowed = (prop)=>typeof prop === 'string' && ($3d5aedd7cf5e55dc$var$DOMPropNames.has(prop) || labelable && $3d5aedd7cf5e55dc$var$labelablePropNames.has(prop) || isLink && $3d5aedd7cf5e55dc$var$linkPropNames.has(prop) || global && $3d5aedd7cf5e55dc$var$globalAttrs.has(prop) || events && ($3d5aedd7cf5e55dc$var$globalEvents.has(prop) || prop.endsWith('Capture') && $3d5aedd7cf5e55dc$var$globalEvents.has(prop.slice(0, -7))) || propNames?.has(prop) || $3d5aedd7cf5e55dc$var$propRe.test(prop));
    const present = (prop)=>allowed(prop) && Object.getOwnPropertyDescriptor(props, prop)?.enumerable === true;
    // Native props may have reactive key membership (e.g. merge/omit views).
    // Build the filter once, but enumerate/read its source only when a consumer
    // does so in its own tracking scope. Omission and present-undefined differ.
    return new Proxy({}, {
        get (_target, prop) {
            return present(prop) ? props[prop] : undefined;
        },
        has (_target, prop) {
            return present(prop);
        },
        ownKeys () {
            return Reflect.ownKeys(props).filter(present);
        },
        getOwnPropertyDescriptor (_target, prop) {
            if (!present(prop)) return undefined;
            return {
                enumerable: true,
                configurable: true,
                get: ()=>props[prop]
            };
        }
    });
}

});

parcelRegister("fNnwP", function(module, exports) {

$parcel$export(module.exports, "RouterProvider", function () { return $b7fdaee6ddcf59c4$export$323e4fc2fa4753fb; });
$parcel$export(module.exports, "openLink", function () { return $b7fdaee6ddcf59c4$export$95185d699e05d4d7; });
$parcel$export(module.exports, "useRouter", function () { return $b7fdaee6ddcf59c4$export$9a302a45f65d0572; });
$parcel$export(module.exports, "useLinkProps", function () { return $b7fdaee6ddcf59c4$export$7e924b3091a3bd18; });
$parcel$export(module.exports, "handleLinkClick", function () { return $b7fdaee6ddcf59c4$export$13aea1a3cb5e3f1f; });


var $jBlzr = parcelRequire("jBlzr");

var $1FDXt = parcelRequire("1FDXt");

const $b7fdaee6ddcf59c4$var$RouterContext = (0, $l0gtI$createContext)({
    isNative: true,
    open: $b7fdaee6ddcf59c4$var$openSyntheticLink,
    useHref: (href)=>href
});
function $b7fdaee6ddcf59c4$export$323e4fc2fa4753fb(props) {
    let ctx = {
        isNative: false,
        open: (target, modifiers, href, routerOptions)=>{
            $b7fdaee6ddcf59c4$var$getSyntheticLink(target, (link)=>{
                if ($b7fdaee6ddcf59c4$export$efa8c9099e530235(link, modifiers)) props.navigate(href, routerOptions);
                else $b7fdaee6ddcf59c4$export$95185d699e05d4d7(link, modifiers);
            });
        },
        useHref: (href)=>props.useHref ? props.useHref(href) : href
    };
    return (0, $l0gtI$createComponent)($b7fdaee6ddcf59c4$var$RouterContext, {
        value: ctx,
        get children () {
            return props.children;
        }
    });
}
function $b7fdaee6ddcf59c4$export$9a302a45f65d0572() {
    return (0, $l0gtI$useContext)($b7fdaee6ddcf59c4$var$RouterContext);
}
function $b7fdaee6ddcf59c4$export$efa8c9099e530235(link, modifiers) {
    // Use getAttribute here instead of link.target. Firefox will default link.target to "_parent" when inside an iframe.
    let target = link.getAttribute('target');
    return (!target || target === '_self') && link.origin === location.origin && !link.hasAttribute('download') && !modifiers.metaKey && // open in new tab (mac)
    !modifiers.ctrlKey && // open in new tab (windows)
    !modifiers.altKey && // download
    !modifiers.shiftKey;
}
function $b7fdaee6ddcf59c4$export$95185d699e05d4d7(target, modifiers, setOpening = true) {
    let { metaKey: metaKey, ctrlKey: ctrlKey, altKey: altKey, shiftKey: shiftKey } = modifiers;
    // WebKit does not support firing click events with modifier keys, but does support keyboard events.
    // https://github.com/WebKit/WebKit/blob/c03d0ac6e6db178f90923a0a63080b5ca210d25f/Source/WebCore/html/HTMLAnchorElement.cpp#L184
    let event = (0, $1FDXt.isWebKit)() && (0, $1FDXt.isMac)() && !(0, $1FDXt.isIPad)() && true ? // @ts-ignore - keyIdentifier is a non-standard property, but it's what webkit expects
    new KeyboardEvent('keydown', {
        keyIdentifier: 'Enter',
        metaKey: metaKey,
        ctrlKey: ctrlKey,
        altKey: altKey,
        shiftKey: shiftKey
    }) : new MouseEvent('click', {
        metaKey: metaKey,
        ctrlKey: ctrlKey,
        altKey: altKey,
        shiftKey: shiftKey,
        detail: 1,
        bubbles: true,
        cancelable: true
    });
    $b7fdaee6ddcf59c4$export$95185d699e05d4d7.isOpening = setOpening;
    (0, $jBlzr.focusWithoutScrolling)(target);
    target.dispatchEvent(event);
    $b7fdaee6ddcf59c4$export$95185d699e05d4d7.isOpening = false;
}
// https://github.com/parcel-bundler/parcel/issues/8724
$b7fdaee6ddcf59c4$export$95185d699e05d4d7.isOpening = false;
function $b7fdaee6ddcf59c4$var$getSyntheticLink(target, open) {
    if (target instanceof HTMLAnchorElement) open(target);
    else if (target.hasAttribute('data-href')) {
        let link = document.createElement('a');
        link.href = target.getAttribute('data-href');
        if (target.hasAttribute('data-target')) link.target = target.getAttribute('data-target');
        if (target.hasAttribute('data-rel')) link.rel = target.getAttribute('data-rel');
        if (target.hasAttribute('data-download')) link.download = target.getAttribute('data-download');
        if (target.hasAttribute('data-ping')) link.ping = target.getAttribute('data-ping');
        if (target.hasAttribute('data-referrer-policy')) link.referrerPolicy = target.getAttribute('data-referrer-policy');
        target.appendChild(link);
        open(link);
        target.removeChild(link);
    }
}
function $b7fdaee6ddcf59c4$var$openSyntheticLink(target, modifiers) {
    $b7fdaee6ddcf59c4$var$getSyntheticLink(target, (link)=>$b7fdaee6ddcf59c4$export$95185d699e05d4d7(link, modifiers));
}
function $b7fdaee6ddcf59c4$export$bdc77b0c0a3a85d6(props) {
    let router = $b7fdaee6ddcf59c4$export$9a302a45f65d0572();
    return {
        get 'data-href' () {
            return props.href ? router.useHref(props.href) : undefined;
        },
        get 'data-target' () {
            return props.target;
        },
        get 'data-rel' () {
            return props.rel;
        },
        get 'data-download' () {
            return props.download;
        },
        get 'data-ping' () {
            return props.ping;
        },
        get 'data-referrer-policy' () {
            return props.referrerPolicy;
        }
    };
}
function $b7fdaee6ddcf59c4$export$51437d503373d223(props) {
    return {
        get 'data-href' () {
            return props.href;
        },
        get 'data-target' () {
            return props.target;
        },
        get 'data-rel' () {
            return props.rel;
        },
        get 'data-download' () {
            return props.download;
        },
        get 'data-ping' () {
            return props.ping;
        },
        get 'data-referrer-policy' () {
            return props.referrerPolicy;
        }
    };
}
function $b7fdaee6ddcf59c4$export$7e924b3091a3bd18(props) {
    let router = $b7fdaee6ddcf59c4$export$9a302a45f65d0572();
    const keys = [
        'href',
        'target',
        'rel',
        'download',
        'ping',
        'referrerPolicy'
    ];
    const isLinkKey = (key)=>keys.some((value)=>value === key);
    return new Proxy({}, {
        get: (_, key)=>isLinkKey(key) && props && props[key] !== undefined ? key === 'href' ? router.useHref(props.href ?? '') : props[key] : undefined,
        ownKeys: ()=>keys.filter((key)=>props && key in props && props[key] !== undefined),
        has: (_, key)=>isLinkKey(key) && !!props && key in props && props[key] !== undefined,
        getOwnPropertyDescriptor: (_, key)=>isLinkKey(key) && props && key in props && props[key] !== undefined ? {
                enumerable: true,
                configurable: true
            } : undefined
    });
}
function $b7fdaee6ddcf59c4$export$13aea1a3cb5e3f1f(e, router, href, routerOptions) {
    // If a custom router is provided, prevent default and forward if this link should client navigate.
    if (!router.isNative && e.currentTarget instanceof HTMLAnchorElement && e.currentTarget.href && // If props are applied to a router Link component, it may have already prevented default.
    !e.defaultPrevented && $b7fdaee6ddcf59c4$export$efa8c9099e530235(e.currentTarget, e) && href) {
        e.preventDefault();
        router.open(e.currentTarget, e, href, routerOptions);
    }
}

});
parcelRegister("jBlzr", function(module, exports) {

$parcel$export(module.exports, "focusWithoutScrolling", function () { return $e45234824899ea9d$export$de79e2c695e052f3; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ function $e45234824899ea9d$export$de79e2c695e052f3(element) {
    element.focus({
        preventScroll: true
    });
}

});

parcelRegister("1FDXt", function(module, exports) {

$parcel$export(module.exports, "isMac", function () { return $13789dac9c7006f0$export$9ac100e40613ea10; });
$parcel$export(module.exports, "isIPad", function () { return $13789dac9c7006f0$export$7bef049ce92e4224; });
$parcel$export(module.exports, "isIOS", function () { return $13789dac9c7006f0$export$fedb369cb70207f1; });
$parcel$export(module.exports, "isWebKit", function () { return $13789dac9c7006f0$export$78551043582a6a98; });
$parcel$export(module.exports, "isChrome", function () { return $13789dac9c7006f0$export$6446a186d09e379e; });
$parcel$export(module.exports, "isAndroid", function () { return $13789dac9c7006f0$export$a11b0059900ceec8; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ function $13789dac9c7006f0$var$testUserAgent(re) {
    if (typeof window === 'undefined' || window.navigator == null) return false;
    let brands = window.navigator.userAgentData?.brands;
    return Array.isArray(brands) && brands.some((brand)=>re.test(brand.brand)) || re.test(window.navigator.userAgent);
}
function $13789dac9c7006f0$var$testPlatform(re) {
    return typeof window !== 'undefined' && window.navigator != null ? re.test(window.navigator.userAgentData?.platform || window.navigator.platform) : false;
}
function $13789dac9c7006f0$var$cached(fn) {
    let res = null;
    return ()=>{
        if (res == null) res = fn();
        return res;
    };
}
const $13789dac9c7006f0$export$9ac100e40613ea10 = $13789dac9c7006f0$var$cached(function() {
    return $13789dac9c7006f0$var$testPlatform(/^Mac/i);
});
const $13789dac9c7006f0$export$186c6964ca17d99 = $13789dac9c7006f0$var$cached(function() {
    return $13789dac9c7006f0$var$testPlatform(/^iPhone/i);
});
const $13789dac9c7006f0$export$7bef049ce92e4224 = $13789dac9c7006f0$var$cached(function() {
    return $13789dac9c7006f0$var$testPlatform(/^iPad/i) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
    $13789dac9c7006f0$export$9ac100e40613ea10() && navigator.maxTouchPoints > 1;
});
const $13789dac9c7006f0$export$fedb369cb70207f1 = $13789dac9c7006f0$var$cached(function() {
    return $13789dac9c7006f0$export$186c6964ca17d99() || $13789dac9c7006f0$export$7bef049ce92e4224();
});
const $13789dac9c7006f0$export$e1865c3bedcd822b = $13789dac9c7006f0$var$cached(function() {
    return $13789dac9c7006f0$export$9ac100e40613ea10() || $13789dac9c7006f0$export$fedb369cb70207f1();
});
const $13789dac9c7006f0$export$78551043582a6a98 = $13789dac9c7006f0$var$cached(function() {
    return $13789dac9c7006f0$var$testUserAgent(/AppleWebKit/i) && ($13789dac9c7006f0$export$fedb369cb70207f1() || !$13789dac9c7006f0$export$6446a186d09e379e());
});
const $13789dac9c7006f0$export$95df08bae54cb4df = $13789dac9c7006f0$var$cached(function() {
    return $13789dac9c7006f0$export$78551043582a6a98() && !$13789dac9c7006f0$export$6446a186d09e379e() && !$13789dac9c7006f0$export$b7d78993b74f766d();
});
const $13789dac9c7006f0$export$6446a186d09e379e = $13789dac9c7006f0$var$cached(function() {
    return $13789dac9c7006f0$var$testUserAgent(/Chrome|CriOS|CrMo/i);
});
const $13789dac9c7006f0$export$a11b0059900ceec8 = $13789dac9c7006f0$var$cached(function() {
    return $13789dac9c7006f0$var$testUserAgent(/Android/i);
});
const $13789dac9c7006f0$export$b7d78993b74f766d = $13789dac9c7006f0$var$cached(function() {
    return $13789dac9c7006f0$var$testUserAgent(/(Firefox|FxiOS)/i);
});

});


parcelRegister("7boJ2", function(module, exports) {

$parcel$export(module.exports, "mergeProps", function () { return $53acbd7400b441e9$export$9d1611c77c2fe928; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $fZRjG = parcelRequire("fZRjG");


var $dyxC2 = parcelRequire("dyxC2");

var $hp4AJ = parcelRequire("hp4AJ");

function $53acbd7400b441e9$export$9d1611c77c2fe928(...args) {
    // Preserve source merge rules per property, without evaluating lazy children or
    // freezing reactive props while the component is being set up.
    return new Proxy({}, {
        ownKeys: ()=>[
                ...new Set(args.flatMap((props)=>props ? Reflect.ownKeys(props) : []))
            ],
        // This is an Adobe merge view, not one of Solid's own flattenable views.
        // Forwarding a source's $PROXY marker also forwards its internal view record,
        // causing native merge to flatten that one source and discard our merge rules.
        has: (_, key)=>key !== (0, $l0gtI$$PROXY) && args.some((props)=>props != null && key in props),
        getOwnPropertyDescriptor: (_, key)=>args.some((props)=>props != null && key in props) ? {
                enumerable: true,
                configurable: true,
                get: ()=>mergeProperty(key)
            } : undefined,
        get: (_, key)=>key === (0, $l0gtI$$PROXY) ? undefined : mergeProperty(key)
    });
    function mergeProperty(key) {
        // Start with a base clone of the first argument. This is a lot faster than starting
        // with an empty object and adding properties as we go.
        let result = {
            [key]: args[0]?.[key]
        };
        for(let i = 1; i < args.length; i++){
            let props = args[i];
            if (props && key in props) {
                let a = result[key];
                let b = props[key];
                // Chain events
                if (typeof a === 'function' && typeof b === 'function' && // This is a lot faster than a regex.
                typeof key === 'string' && key[0] === 'o' && key[1] === 'n' && key.charCodeAt(2) >= /* 'A' */ 65 && key.charCodeAt(2) <= /* 'Z' */ 90) result[key] = (0, $fZRjG.chain)(a, b);
                else if ((key === 'className' || key === 'UNSAFE_className') && typeof a === 'string' && typeof b === 'string') result[key] = (0, $l0gtI$clsx)(a, b);
                else if (key === 'id' && a && b) result.id = (0, $dyxC2.mergeIds)(a, b);
                else if (key === 'ref' && a && b) result.ref = (0, $hp4AJ.mergeRefs)(a, b);
                else result[key] = b !== undefined ? b : a;
            }
        }
        return result[key];
    }
}

});
parcelRegister("fZRjG", function(module, exports) {

$parcel$export(module.exports, "chain", function () { return $ba55e90e7f40fcb4$export$e08e3b67e392101e; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /**
 * Calls all functions in the order they were chained with the same arguments.
 */ function $ba55e90e7f40fcb4$export$e08e3b67e392101e(...callbacks) {
    return (...args)=>{
        for (let callback of callbacks)if (typeof callback === 'function') callback(...args);
    };
}

});

parcelRegister("dyxC2", function(module, exports) {

$parcel$export(module.exports, "useId", function () { return $9de886171f524ac8$export$f680877a34711e37; });
$parcel$export(module.exports, "mergeIds", function () { return $9de886171f524ac8$export$cd8c9cb68f842629; });
$parcel$export(module.exports, "useSlotId", function () { return $9de886171f524ac8$export$b4cc09c592e8fdb8; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 

// Preserve the modern source branch's client-only collision prefix. SSR/hydration
// and tests use the deterministic prefix; native createUniqueId supplies root ownership.
const $9de886171f524ac8$var$clientPrefix = String(Math.round(Math.random() * 10000000000));
// copied from SSRProvider.tsx to reduce exports, if needed again, consider sharing
let $9de886171f524ac8$var$canUseDOM = Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);
let $9de886171f524ac8$export$d41a04c74483c6ef = new Map();
// This allows us to clean up the idsUpdaterMap when the id is no longer used.
// Map is a strong reference, so unused ids wouldn't be cleaned up otherwise.
// This can happen in suspended components where mount/unmount is not called.
let $9de886171f524ac8$var$registry;
if (typeof FinalizationRegistry !== 'undefined') $9de886171f524ac8$var$registry = new FinalizationRegistry((heldValue)=>{
    $9de886171f524ac8$export$d41a04c74483c6ef.delete(heldValue);
});
let $9de886171f524ac8$var$registeredIds = new WeakMap();
function $9de886171f524ac8$export$f680877a34711e37(defaultId) {
    const prefix = (0, $l0gtI$isServer) || (0, $l0gtI$isHydrating)() || false ? 'react-aria' : `react-aria${$9de886171f524ac8$var$clientPrefix}`;
    const generated = `${prefix}-${(0, $l0gtI$createUniqueId)()}`;
    // Adobe negotiates IDs while composing props. This internal signal deliberately
    // accepts those in-scope requests; ordinary component state does not opt in.
    const [value, setValue] = (0, $l0gtI$createSignal)(undefined, {
        ownedWrite: true
    });
    const res = ()=>value() || (typeof defaultId === 'function' ? defaultId() : defaultId) || generated;
    const cleanupRef = {};
    let pending = null;
    const nextId = {
        get current () {
            return pending;
        },
        set current (id){
            pending = id;
            if (id) setValue(id);
        }
    };
    let registered;
    function unregister() {
        if (!registered) return;
        $9de886171f524ac8$var$registry?.unregister(cleanupRef);
        $9de886171f524ac8$var$registeredIds.delete(cleanupRef);
        const refs = $9de886171f524ac8$export$d41a04c74483c6ef.get(registered)?.filter((ref)=>ref !== nextId);
        if (refs?.length) $9de886171f524ac8$export$d41a04c74483c6ef.set(registered, refs);
        else $9de886171f524ac8$export$d41a04c74483c6ef.delete(registered);
        registered = undefined;
    }
    function register(id1) {
        if (id1 === registered) return;
        unregister();
        registered = id1;
        if ($9de886171f524ac8$var$registry) {
            $9de886171f524ac8$var$registry.register(cleanupRef, id1, cleanupRef);
            $9de886171f524ac8$var$registeredIds.set(cleanupRef, id1);
        }
        if ($9de886171f524ac8$var$canUseDOM) $9de886171f524ac8$export$d41a04c74483c6ef.set(id1, [
            ...$9de886171f524ac8$export$d41a04c74483c6ef.get(id1) || [],
            nextId
        ]);
    }
    // Initial registration must precede mergeProps in the same setup turn.
    register((0, $l0gtI$untrack)(res));
    (0, $l0gtI$createEffect)(res, register);
    (0, $l0gtI$onCleanup)(unregister);
    return res;
}
function $9de886171f524ac8$export$cd8c9cb68f842629(idA, idB) {
    if (idA === idB) return idA;
    let setIdsA = $9de886171f524ac8$export$d41a04c74483c6ef.get(idA);
    if (setIdsA) {
        setIdsA.forEach((ref)=>ref.current = idB);
        return idB;
    }
    let setIdsB = $9de886171f524ac8$export$d41a04c74483c6ef.get(idB);
    if (setIdsB) {
        setIdsB.forEach((ref)=>ref.current = idA);
        return idA;
    }
    return idB;
}
function $9de886171f524ac8$export$b4cc09c592e8fdb8(depArray = []) {
    let id1 = $9de886171f524ac8$export$f680877a34711e37();
    let [resolvedId, setResolvedId] = (0, $l0gtI$createSignal)((0, $l0gtI$untrack)(id1));
    let [publication, setPublication] = (0, $l0gtI$createSignal)(0);
    (0, $l0gtI$onSettled)(()=>{
        const currentId = (0, $l0gtI$untrack)(id1);
        setResolvedId(document.getElementById(currentId) ? currentId : undefined);
    });
    (0, $l0gtI$createEffect)(()=>[
            id1(),
            ...typeof depArray === 'function' ? depArray() : depArray
        ], ([currentId])=>{
        // Source useValueEffect first yields the generated ID, allowing new slot hosts
        // to receive it, then checks the DOM after that publication commits.
        setResolvedId(currentId);
        setPublication((value)=>value + 1);
    });
    (0, $l0gtI$createEffect)(()=>{
        publication();
        return id1();
    }, (currentId)=>{
        setResolvedId(document.getElementById(currentId) ? currentId : undefined);
    });
    return resolvedId;
}

});

parcelRegister("hp4AJ", function(module, exports) {

$parcel$export(module.exports, "mergeRefs", function () { return $cab85537f21dacdb$export$c9058316764c140e; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /**
 * Merges multiple refs into one. Works with either callback or object refs.
 */ function $cab85537f21dacdb$export$c9058316764c140e(...refs) {
    if (refs.length === 1 && typeof refs[0] === 'function') return refs[0];
    return (value)=>{
        let hasCleanup = false;
        const cleanups = refs.map((ref)=>{
            const cleanup = $cab85537f21dacdb$var$setRef(ref, value);
            hasCleanup ||= typeof cleanup == 'function';
            return cleanup;
        });
        if (hasCleanup) return ()=>{
            cleanups.forEach((cleanup, i)=>{
                if (typeof cleanup === 'function') cleanup();
                else $cab85537f21dacdb$var$setRef(refs[i], null);
            });
        };
    };
}
function $cab85537f21dacdb$var$setRef(ref, value) {
    if (Array.isArray(ref)) return $cab85537f21dacdb$export$c9058316764c140e(...ref)(value);
    if (typeof ref === 'function') return ref(value);
    else if (ref != null && typeof ref === 'object' && 'current' in ref) ref.current = value;
}

});


parcelRegister("kKI9C", function(module, exports) {

$parcel$export(module.exports, "FocusableProvider", function () { return $f1ba5a9e4c9cb049$export$13f3202a3e5ddd5; });
$parcel$export(module.exports, "useFocusable", function () { return $f1ba5a9e4c9cb049$export$4c014de7c8940b4c; });
$parcel$export(module.exports, "FocusableContext", function () { return (parcelRequire("cpleU")).FocusableContext; });


var $8XaA3 = parcelRequire("8XaA3");

parcelRequire("6MYlq");

var $7boJ2 = parcelRequire("7boJ2");


var $8uTEk = parcelRequire("8uTEk");

var $akk5I = parcelRequire("akk5I");

var $6p9dH = parcelRequire("6p9dH");

var $khPAm = parcelRequire("khPAm");

var $cpleU = parcelRequire("cpleU");
function $f1ba5a9e4c9cb049$var$useFocusableContext(ref) {
    let context = (0, $l0gtI$useContext)((0, $cpleU.FocusableContext)) || {};
    (0, $khPAm.useSyncRef)(context, ref);
    // eslint-disable-next-line
    return (0, $l0gtI$omit)(context, 'ref');
}
function $f1ba5a9e4c9cb049$export$13f3202a3e5ddd5(props) {
    let objRef = (0, $6p9dH.useObjectRef)(props.ref);
    let context = (0, $7boJ2.mergeProps)((0, $l0gtI$omit)(props, 'children', 'ref'), {
        ref: objRef
    });
    return (0, $l0gtI$createComponent)((0, $cpleU.FocusableContext), {
        value: context,
        get children () {
            return props.children;
        }
    });
}
function $f1ba5a9e4c9cb049$export$4c014de7c8940b4c(props, domRef) {
    let { focusProps: focusProps } = (0, $8uTEk.useFocus)(props);
    let { keyboardProps: keyboardProps } = (0, $akk5I.useKeyboard)(props);
    let interactions = (0, $7boJ2.mergeProps)(focusProps, keyboardProps);
    let domProps = $f1ba5a9e4c9cb049$var$useFocusableContext(domRef);
    let interactionProps = new Proxy(domProps, {
        get (target, key) {
            return props.isDisabled ? undefined : Reflect.get(target, key);
        }
    });
    // Source useRef captures autoFocus only on initial setup; subsequent prop
    // changes must not request another autofocus after the settled mount.
    let autoFocusRef = {
        current: (0, $l0gtI$untrack)(()=>props.autoFocus)
    };
    (0, $l0gtI$onSettled)(()=>{
        if (autoFocusRef.current && domRef.current) (0, $8XaA3.focusSafely)(domRef.current);
        autoFocusRef.current = false;
    });
    // Always set a tabIndex so that Safari allows focusing native buttons and inputs.
    return {
        focusableProps: (0, $7boJ2.mergeProps)({
            get onFocusIn () {
                return interactions.onFocusIn;
            },
            get onFocusOut () {
                return interactions.onFocusOut;
            },
            get onKeyDown () {
                return interactions.onKeyDown;
            },
            get onKeyUp () {
                return interactions.onKeyUp;
            },
            get tabIndex () {
                return props.isDisabled ? undefined : props.excludeFromTabOrder ? -1 : 0;
            }
        }, interactionProps)
    };
}
function $f1ba5a9e4c9cb049$export$35a3bebf7ef2d934(props) {
    let ref = (0, $6p9dH.useObjectRef)(props.ref);
    let { focusableProps: focusableProps } = $f1ba5a9e4c9cb049$export$4c014de7c8940b4c(props, ref);
    (0, $l0gtI$onSettled)(()=>{
        return;
    });
    return props.children((0, $7boJ2.mergeProps)(focusableProps, {
        ref: ref
    }));
}

});
parcelRegister("8XaA3", function(module, exports) {

$parcel$export(module.exports, "focusSafely", function () { return $684c0a77e0eea05f$export$80f3e147d781571c; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $jBlzr = parcelRequire("jBlzr");

var $ed1Px = parcelRequire("ed1Px");

var $es0xi = parcelRequire("es0xi");

var $gi7Zf = parcelRequire("gi7Zf");

var $ic9IB = parcelRequire("ic9IB");
function $684c0a77e0eea05f$export$80f3e147d781571c(element) {
    if (!element.isConnected) return;
    // If the user is interacting with a virtual cursor, e.g. screen reader, then
    // wait until after any animated transitions that are currently occurring on
    // the page before shifting focus. This avoids issues with VoiceOver on iOS
    // causing the page to scroll when moving focus if the element is transitioning
    // from off the screen.
    const ownerDocument = (0, $gi7Zf.getOwnerDocument)(element);
    if ((0, $es0xi.getInteractionModality)() === 'virtual') {
        let lastFocusedElement = (0, $ed1Px.getActiveElement)(ownerDocument);
        (0, $ic9IB.runAfterTransition)(()=>{
            const activeElement = (0, $ed1Px.getActiveElement)(ownerDocument);
            // If focus did not move or focus was lost to the body, and the element is still in the document, focus it.
            if ((activeElement === lastFocusedElement || activeElement === ownerDocument.body) && element.isConnected) (0, $jBlzr.focusWithoutScrolling)(element);
        });
    } else (0, $jBlzr.focusWithoutScrolling)(element);
}

});
parcelRegister("ed1Px", function(module, exports) {

$parcel$export(module.exports, "nodeContains", function () { return $a583b306edb4a9f1$export$4282f70798064fe0; });
$parcel$export(module.exports, "getActiveElement", function () { return $a583b306edb4a9f1$export$cd4e5573fbe2b576; });
$parcel$export(module.exports, "getEventTarget", function () { return $a583b306edb4a9f1$export$e58f029f0fbfdb29; });
$parcel$export(module.exports, "getPropagationTargets", function () { return $a583b306edb4a9f1$export$da7af4355d792141; });
$parcel$export(module.exports, "isFocusWithin", function () { return $a583b306edb4a9f1$export$b4f377a2b6254582; });
// Source: https://github.com/microsoft/tabster/blob/a89fc5d7e332d48f68d03b1ca6e344489d1c3898/src/Shadowdomize/DOMFunctions.ts#L16
/* eslint-disable rsp-rules/no-non-shadow-contains, rsp-rules/safe-event-target */ 
var $gi7Zf = parcelRequire("gi7Zf");

var $fy4Mq = parcelRequire("fy4Mq");
function $a583b306edb4a9f1$export$4282f70798064fe0(node, otherNode) {
    if (!(0, $fy4Mq.shadowDOM)()) return otherNode && node ? node.contains(otherNode) : false;
    if (!node || !otherNode) return false;
    let currentNode = otherNode;
    while(currentNode != null){
        if (currentNode === node) return true;
        if (typeof currentNode.assignedElements !== 'function' && currentNode.assignedSlot?.parentNode) // Element is slotted
        currentNode = currentNode.assignedSlot.parentNode;
        else if ((0, $gi7Zf.isShadowRoot)(currentNode)) // Element is in shadow root
        currentNode = currentNode.host;
        else currentNode = currentNode.parentNode;
    }
    return false;
}
const $a583b306edb4a9f1$export$cd4e5573fbe2b576 = (doc = document)=>{
    if (!(0, $fy4Mq.shadowDOM)()) return doc.activeElement;
    let activeElement = doc.activeElement;
    while(activeElement && 'shadowRoot' in activeElement && activeElement.shadowRoot?.activeElement)activeElement = activeElement.shadowRoot.activeElement;
    return activeElement;
};
function $a583b306edb4a9f1$export$e58f029f0fbfdb29(event) {
    if ((0, $fy4Mq.shadowDOM)() && event.target instanceof Element && event.target.shadowRoot) {
        if ('composedPath' in event) return event.composedPath()[0] ?? null;
    }
    return event.target;
}
function $a583b306edb4a9f1$export$da7af4355d792141(from, to) {
    // If `to` is coming from a ref, its type technically allows `null`.
    // In practice, this function will generally be called from within a useEffect.
    // If the ref has not resolved by that point, then a coding error has been made.
    // Better to return an empty array than `[window]`, which may appear to work
    // in the light DOM, but fail in the shadow DOM.
    if (to === null) return [];
    to = to ?? (0, $gi7Zf.getOwnerWindow)(from);
    let targets = [
        to
    ];
    if (!(0, $fy4Mq.shadowDOM)() || !from || from === to) return targets;
    // The root `to` itself lives in. The event already reaches `to` once
    // it is inside this root, so we must NOT collect this root or anything above
    // it — only the shadow roots strictly between `refNode` and `to`.
    // `window` has no getRootNode; its boundary is the document, which the walk
    // reaches naturally (the document is not a ShadowRoot, so the loop exits).
    let toRoot = 'getRootNode' in to ? to.getRootNode() : null;
    let current = from.getRootNode() ?? null;
    while((0, $gi7Zf.isShadowRoot)(current) && current !== toRoot){
        // order shouldn't matter
        targets.push(current);
        current = current.host.getRootNode();
    }
    return targets;
}
function $a583b306edb4a9f1$export$b4f377a2b6254582(node) {
    if (!node) return false;
    // Get the active element within the node's parent shadow root (or the document). Can return null.
    let root = node.getRootNode();
    let ownerWindow = (0, $gi7Zf.getOwnerWindow)(node);
    if (!(root instanceof ownerWindow.Document || root instanceof ownerWindow.ShadowRoot)) return false;
    let activeElement = root.activeElement;
    // Check if the active element is within this node. These nodes are within the same shadow root.
    return activeElement != null && node.contains(activeElement);
}

});
parcelRegister("gi7Zf", function(module, exports) {

$parcel$export(module.exports, "getOwnerDocument", function () { return $bdc485d4f8205593$export$b204af158042fbac; });
$parcel$export(module.exports, "getOwnerWindow", function () { return $bdc485d4f8205593$export$f21a1ffae260145a; });
$parcel$export(module.exports, "isNode", function () { return $bdc485d4f8205593$export$8ee0fc9ee280b4ee; });
$parcel$export(module.exports, "isShadowRoot", function () { return $bdc485d4f8205593$export$af51f0f06c0f328a; });
$parcel$export(module.exports, "addEvent", function () { return $bdc485d4f8205593$export$f531f92e2a15358f; });
$parcel$export(module.exports, "setStyle", function () { return $bdc485d4f8205593$export$37a5fde709c1db82; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ const $bdc485d4f8205593$export$b204af158042fbac = (target)=>{
    if ($bdc485d4f8205593$var$isWindow(target)) return target.document;
    if ($bdc485d4f8205593$export$62858bae88b53fd0(target)) return target;
    // @ts-expect-error Ensure safe access in SSR environments.
    return target?.ownerDocument ?? (typeof document !== 'undefined' ? document : undefined);
};
const $bdc485d4f8205593$export$f21a1ffae260145a = (target)=>{
    let ownerDocument = $bdc485d4f8205593$export$b204af158042fbac(target);
    // @ts-expect-error Ensure safe access in SSR environments.
    return ownerDocument?.defaultView ?? (typeof window !== 'undefined' ? window : undefined);
};
function $bdc485d4f8205593$export$8ee0fc9ee280b4ee(value) {
    return value !== null && typeof value === 'object' && 'nodeType' in value && typeof value.nodeType === 'number';
}
/**
 * Type guard that checks if a value is a Window. Uses window self reference checks to
 * distinguish Window from other values.
 */ function $bdc485d4f8205593$var$isWindow(value) {
    return typeof value === 'object' && value != null && 'window' in value && value.window === value;
}
function $bdc485d4f8205593$export$62858bae88b53fd0(value) {
    return $bdc485d4f8205593$export$8ee0fc9ee280b4ee(value) && value.nodeType === 9;
}
function $bdc485d4f8205593$export$af51f0f06c0f328a(value) {
    // 11 = DOCUMENT_FRAGMENT_NODE
    return $bdc485d4f8205593$export$8ee0fc9ee280b4ee(value) && value.nodeType === 11 && 'host' in value;
}
function $bdc485d4f8205593$export$f531f92e2a15358f(target, event, listener, options) {
    if (listener == null || target == null) return ()=>{};
    let eventTargets = Array.isArray(target) ? target : [
        target
    ];
    for (let eventTarget of eventTargets)eventTarget.addEventListener(event, listener, options);
    return ()=>{
        for (let eventTarget of eventTargets)eventTarget.removeEventListener(event, listener, options);
    };
}
function $bdc485d4f8205593$export$37a5fde709c1db82(target, property, value, priority) {
    if (target == null) return ()=>{};
    let restore = new Array();
    let styleTargets = Array.isArray(target) ? target : [
        target
    ];
    for (let styleTarget of styleTargets){
        let initialValue = styleTarget.style.getPropertyValue(property);
        let initialPriority = styleTarget.style.getPropertyPriority(property);
        styleTarget.style.setProperty(property, value, priority);
        restore.unshift(()=>{
            if (initialValue) styleTarget.style.setProperty(property, initialValue, initialPriority);
            else styleTarget.style.removeProperty(property);
        });
    }
    return ()=>{
        for (let cleanup of restore)cleanup();
    };
}

});

parcelRegister("fy4Mq", function(module, exports) {

$parcel$export(module.exports, "shadowDOM", function () { return $b51dbd3bd7f08931$export$98658e8c59125e6a; });
/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ let $b51dbd3bd7f08931$var$_tableNestedRows = false;
let $b51dbd3bd7f08931$var$_shadowDOM = false;
function $b51dbd3bd7f08931$export$d9d8a0f82de49530() {
    $b51dbd3bd7f08931$var$_tableNestedRows = true;
}
function $b51dbd3bd7f08931$export$1b00cb14a96194e6() {
    return $b51dbd3bd7f08931$var$_tableNestedRows;
}
function $b51dbd3bd7f08931$export$12b151d9882e9985() {
    $b51dbd3bd7f08931$var$_shadowDOM = true;
}
function $b51dbd3bd7f08931$export$98658e8c59125e6a() {
    return $b51dbd3bd7f08931$var$_shadowDOM;
}

});


parcelRegister("es0xi", function(module, exports) {

$parcel$export(module.exports, "isFocusVisible", function () { return $a85418a6e737a800$export$b9b3dfddab17db27; });
$parcel$export(module.exports, "getInteractionModality", function () { return $a85418a6e737a800$export$630ff653c5ada6a9; });
$parcel$export(module.exports, "useFocusVisibleListener", function () { return $a85418a6e737a800$export$ec71b4b83ac08ec3; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // Portions of the code in this file are based on code from react.
// Original licensing for the following can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/facebook/react/tree/cc7c1aece46a6b69b41958d731e0fd27c94bfc6c/packages/react-interactions

var $ed1Px = parcelRequire("ed1Px");

var $gi7Zf = parcelRequire("gi7Zf");

var $34B6C = parcelRequire("34B6C");

var $1FDXt = parcelRequire("1FDXt");

var $1oGtO = parcelRequire("1oGtO");

var $fNnwP = parcelRequire("fNnwP");


var $aPfEU = parcelRequire("aPfEU");
let $a85418a6e737a800$var$currentModality = null;
let $a85418a6e737a800$var$currentPointerType = 'keyboard';
const $a85418a6e737a800$export$901e90a13c50a14e = new Set();
let $a85418a6e737a800$export$d90243b58daecda7 = new Map(); // We use a map here to support setting event listeners across multiple document objects.
let $a85418a6e737a800$var$hasEventBeforeFocus = false;
let $a85418a6e737a800$var$hasBlurredWindowRecently = false;
// Only Tab or Esc keys will make focus visible on text input elements
const $a85418a6e737a800$var$FOCUS_VISIBLE_INPUT_KEYS = {
    Tab: true,
    Escape: true
};
function $a85418a6e737a800$var$triggerChangeHandlers(modality, e) {
    for (let handler of $a85418a6e737a800$export$901e90a13c50a14e)handler(modality, e);
}
/**
 * Helper function to determine if a KeyboardEvent is unmodified and could make keyboard focus
 * styles visible.
 */ function $a85418a6e737a800$var$isValidKey(e) {
    // Control and Shift keys trigger when navigating back to the tab with keyboard.
    return !(e.metaKey || !(0, $1FDXt.isMac)() && e.altKey || e.ctrlKey || e.key === 'Control' || e.key === 'Shift' || e.key === 'Meta');
}
function $a85418a6e737a800$var$handleKeyboardEvent(e) {
    $a85418a6e737a800$var$hasEventBeforeFocus = true;
    if (!(0, $fNnwP.openLink).isOpening && $a85418a6e737a800$var$isValidKey(e)) {
        $a85418a6e737a800$var$currentModality = 'keyboard';
        $a85418a6e737a800$var$currentPointerType = 'keyboard';
        $a85418a6e737a800$var$triggerChangeHandlers('keyboard', e);
    }
}
function $a85418a6e737a800$var$handlePointerEvent(e) {
    $a85418a6e737a800$var$currentModality = 'pointer';
    $a85418a6e737a800$var$currentPointerType = 'pointerType' in e ? e.pointerType : 'mouse';
    if (e.type === 'mousedown' || e.type === 'pointerdown') {
        $a85418a6e737a800$var$hasEventBeforeFocus = true;
        $a85418a6e737a800$var$triggerChangeHandlers('pointer', e);
    }
}
function $a85418a6e737a800$var$handleClickEvent(e) {
    if (!(0, $fNnwP.openLink).isOpening && (0, $1oGtO.isVirtualClick)(e)) {
        $a85418a6e737a800$var$hasEventBeforeFocus = true;
        $a85418a6e737a800$var$currentModality = 'virtual';
        $a85418a6e737a800$var$currentPointerType = 'virtual';
    }
}
function $a85418a6e737a800$var$handleFocusEvent(e) {
    if (0, $34B6C.ignoreFocusEvent) return;
    let target = (0, $ed1Px.getEventTarget)(e);
    let ownerWindow = (0, $gi7Zf.getOwnerWindow)(target);
    let ownerDocument = (0, $gi7Zf.getOwnerDocument)(target);
    // When the window regains focus, the browser restores focus to the element that was focused
    // before, firing a focus event the user did not initiate. handleWindowBlur sets
    // hasBlurredWindowRecently so restored focus doesn't switch to virtual modality below, but
    // Safari fires the window/element focus pair twice when returning to a tab or app and the first
    // element focus event clears the flag, so re-arm it whenever the window itself is focused.
    // Like handleWindowBlur, this intentionally doesn't check isTrusted.
    if (target === ownerWindow) {
        $a85418a6e737a800$var$hasBlurredWindowRecently = true;
        return;
    }
    // Firefox fires two extra focus events when the user first clicks into an iframe:
    // first on the window, then on the document. We ignore these events so they don't
    // cause keyboard focus rings to appear.
    if (target === ownerDocument || !e.isTrusted) return;
    // If a focus event occurs without a preceding keyboard or pointer event, switch to virtual modality.
    // This occurs, for example, when navigating a form with the next/previous buttons on iOS.
    if (!$a85418a6e737a800$var$hasEventBeforeFocus && !$a85418a6e737a800$var$hasBlurredWindowRecently) {
        $a85418a6e737a800$var$currentModality = 'virtual';
        $a85418a6e737a800$var$currentPointerType = 'virtual';
        $a85418a6e737a800$var$triggerChangeHandlers('virtual', e);
    }
    $a85418a6e737a800$var$hasEventBeforeFocus = false;
    $a85418a6e737a800$var$hasBlurredWindowRecently = false;
}
function $a85418a6e737a800$var$handleWindowBlur() {
    if (0, $34B6C.ignoreFocusEvent) return;
    // When the window is blurred, reset state. This is necessary when tabbing out of the window,
    // for example, since a subsequent focus event won't be fired.
    $a85418a6e737a800$var$hasEventBeforeFocus = false;
    $a85418a6e737a800$var$hasBlurredWindowRecently = true;
}
function $a85418a6e737a800$var$handleInvalidEvent(e) {
    let startingActiveElement = (0, $ed1Px.getActiveElement)((0, $gi7Zf.getOwnerDocument)((0, $ed1Px.getEventTarget)(e)));
    queueMicrotask(()=>{
        // If focus was moved to a different element after the form became invalid,
        // then it was likely a forms library that moved focus to the first invalid field.
        // In this case, we want to set the modality to keyboard.
        if ((0, $ed1Px.getActiveElement)((0, $gi7Zf.getOwnerDocument)((0, $ed1Px.getEventTarget)(e))) !== startingActiveElement) $a85418a6e737a800$export$8397ddfc504fdb9a('keyboard');
    });
}
/**
 * Setup global event listeners to control when keyboard focus style should be visible.
 */ function $a85418a6e737a800$var$setupGlobalFocusEvents(element) {
    // eslint-disable-next-line no-restricted-globals
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const windowObject = (0, $gi7Zf.getOwnerWindow)(element);
    const documentObject = (0, $gi7Zf.getOwnerDocument)(element);
    if ($a85418a6e737a800$export$d90243b58daecda7.get(windowObject)) return;
    // Programmatic focus() calls shouldn't affect the current input modality.
    // However, we need to detect other cases when a focus event occurs without
    // a preceding user event (e.g. screen reader focus). Overriding the focus
    // method on HTMLElement.prototype is a bit hacky, but works.
    // defineProperty (not assignment) so this works even if `focus` is currently
    // a getter-only accessor — e.g. when @testing-library/user-event's setup()
    // has instrumented it. Plain assignment throws in that case.
    let focus = windowObject.HTMLElement.prototype.focus;
    Reflect.defineProperty(windowObject.HTMLElement.prototype, 'focus', {
        configurable: true,
        writable: true,
        value: function() {
            $a85418a6e737a800$var$hasEventBeforeFocus = true;
            focus.apply(this, arguments);
        }
    });
    documentObject.addEventListener('keydown', $a85418a6e737a800$var$handleKeyboardEvent, true);
    documentObject.addEventListener('keyup', $a85418a6e737a800$var$handleKeyboardEvent, true);
    documentObject.addEventListener('click', $a85418a6e737a800$var$handleClickEvent, true);
    documentObject.addEventListener('invalid', $a85418a6e737a800$var$handleInvalidEvent, true);
    // Register focus events on the window so they are sure to happen
    // before React's event listeners (registered on the document).
    windowObject.addEventListener('focus', $a85418a6e737a800$var$handleFocusEvent, true);
    windowObject.addEventListener('blur', $a85418a6e737a800$var$handleWindowBlur, false);
    if (typeof PointerEvent !== 'undefined') {
        documentObject.addEventListener('pointerdown', $a85418a6e737a800$var$handlePointerEvent, true);
        documentObject.addEventListener('pointermove', $a85418a6e737a800$var$handlePointerEvent, true);
        documentObject.addEventListener('pointerup', $a85418a6e737a800$var$handlePointerEvent, true);
    }
    // Add unmount handler
    windowObject.addEventListener('beforeunload', ()=>{
        $a85418a6e737a800$var$tearDownWindowFocusTracking(element);
    }, {
        once: true
    });
    $a85418a6e737a800$export$d90243b58daecda7.set(windowObject, {
        focus: focus
    });
}
const $a85418a6e737a800$var$tearDownWindowFocusTracking = (element, loadListener)=>{
    const windowObject = (0, $gi7Zf.getOwnerWindow)(element);
    const documentObject = (0, $gi7Zf.getOwnerDocument)(element);
    if (loadListener) documentObject.removeEventListener('DOMContentLoaded', loadListener);
    if (!$a85418a6e737a800$export$d90243b58daecda7.has(windowObject)) return;
    Reflect.defineProperty(windowObject.HTMLElement.prototype, 'focus', {
        configurable: true,
        writable: true,
        value: $a85418a6e737a800$export$d90243b58daecda7.get(windowObject).focus
    });
    documentObject.removeEventListener('keydown', $a85418a6e737a800$var$handleKeyboardEvent, true);
    documentObject.removeEventListener('keyup', $a85418a6e737a800$var$handleKeyboardEvent, true);
    documentObject.removeEventListener('click', $a85418a6e737a800$var$handleClickEvent, true);
    documentObject.removeEventListener('invalid', $a85418a6e737a800$var$handleInvalidEvent, true);
    windowObject.removeEventListener('focus', $a85418a6e737a800$var$handleFocusEvent, true);
    windowObject.removeEventListener('blur', $a85418a6e737a800$var$handleWindowBlur, false);
    if (typeof PointerEvent !== 'undefined') {
        documentObject.removeEventListener('pointerdown', $a85418a6e737a800$var$handlePointerEvent, true);
        documentObject.removeEventListener('pointermove', $a85418a6e737a800$var$handlePointerEvent, true);
        documentObject.removeEventListener('pointerup', $a85418a6e737a800$var$handlePointerEvent, true);
    }
    $a85418a6e737a800$export$d90243b58daecda7.delete(windowObject);
};
function $a85418a6e737a800$export$2f1888112f558a7d(element) {
    const documentObject = (0, $gi7Zf.getOwnerDocument)(element);
    let loadListener;
    if (documentObject.readyState !== 'loading') $a85418a6e737a800$var$setupGlobalFocusEvents(element);
    else {
        loadListener = ()=>{
            $a85418a6e737a800$var$setupGlobalFocusEvents(element);
        };
        documentObject.addEventListener('DOMContentLoaded', loadListener);
    }
    return ()=>$a85418a6e737a800$var$tearDownWindowFocusTracking(element, loadListener);
}
// Server-side rendering does not have the document object defined
// eslint-disable-next-line no-restricted-globals
if (typeof document !== 'undefined') $a85418a6e737a800$export$2f1888112f558a7d();
function $a85418a6e737a800$export$b9b3dfddab17db27() {
    return $a85418a6e737a800$var$currentModality !== 'pointer';
}
function $a85418a6e737a800$export$630ff653c5ada6a9() {
    return $a85418a6e737a800$var$currentModality;
}
function $a85418a6e737a800$export$8397ddfc504fdb9a(modality) {
    $a85418a6e737a800$var$currentModality = modality;
    $a85418a6e737a800$var$currentPointerType = modality === 'pointer' ? 'mouse' : modality;
    $a85418a6e737a800$var$triggerChangeHandlers(modality, null);
}
function $a85418a6e737a800$export$887a228355cf7d95() {
    return $a85418a6e737a800$var$currentPointerType;
}
function $a85418a6e737a800$export$98e20ec92f614cfe() {
    $a85418a6e737a800$var$setupGlobalFocusEvents();
    let [modality, setModality] = (0, $l0gtI$createSignal)($a85418a6e737a800$var$currentModality);
    let handler = ()=>{
        setModality($a85418a6e737a800$var$currentModality);
    };
    $a85418a6e737a800$export$901e90a13c50a14e.add(handler);
    (0, $l0gtI$onCleanup)(()=>{
        $a85418a6e737a800$export$901e90a13c50a14e.delete(handler);
    });
    let isSSR = (0, $aPfEU.useIsSSR)();
    return ()=>isSSR() ? null : modality();
}
const $a85418a6e737a800$var$nonTextInputTypes = new Set([
    'checkbox',
    'radio',
    'range',
    'color',
    'file',
    'image',
    'button',
    'submit',
    'reset'
]);
/**
 * If this is attached to text input component, return if the event is a focus event (Tab/Escape
 * keys pressed) so that focus visible style can be properly set.
 */ function $a85418a6e737a800$var$isKeyboardFocusEvent(isTextInput, modality, e) {
    let eventTarget = e ? (0, $ed1Px.getEventTarget)(e) : undefined;
    let ownerDocument = (0, $gi7Zf.getOwnerDocument)(eventTarget);
    let ownerWindow = (0, $gi7Zf.getOwnerWindow)(eventTarget);
    const IHTMLInputElement = typeof ownerWindow !== 'undefined' ? ownerWindow.HTMLInputElement : HTMLInputElement;
    const IHTMLTextAreaElement = typeof ownerWindow !== 'undefined' ? ownerWindow.HTMLTextAreaElement : HTMLTextAreaElement;
    const IHTMLElement = typeof ownerWindow !== 'undefined' ? ownerWindow.HTMLElement : HTMLElement;
    const IKeyboardEvent = typeof ownerWindow !== 'undefined' ? ownerWindow.KeyboardEvent : KeyboardEvent;
    // For keyboard events that occur on a non-input element that will move focus into input element (aka ArrowLeft going from Datepicker button to the main input group)
    // we need to rely on the user passing isTextInput into here. This way we can skip toggling focus visiblity for said input element
    let activeElement = (0, $ed1Px.getActiveElement)(ownerDocument);
    isTextInput = isTextInput || activeElement instanceof IHTMLInputElement && !$a85418a6e737a800$var$nonTextInputTypes.has(activeElement.type) || activeElement instanceof IHTMLTextAreaElement || activeElement instanceof IHTMLElement && activeElement.isContentEditable;
    return !(isTextInput && modality === 'keyboard' && e instanceof IKeyboardEvent && !$a85418a6e737a800$var$FOCUS_VISIBLE_INPUT_KEYS[e.key]);
}
function $a85418a6e737a800$export$ffd9e5021c1fb2d6(props = {}) {
    let [isFocusVisibleState, setFocusVisible] = (0, $l0gtI$createSignal)(props.autoFocus || $a85418a6e737a800$export$b9b3dfddab17db27());
    $a85418a6e737a800$export$ec71b4b83ac08ec3((isFocusVisible)=>{
        setFocusVisible(isFocusVisible);
    }, [], {
        get isTextInput () {
            return props.isTextInput;
        }
    });
    return {
        isFocusVisible: isFocusVisibleState
    };
}
function $a85418a6e737a800$export$ec71b4b83ac08ec3(fn, deps, opts) {
    $a85418a6e737a800$var$setupGlobalFocusEvents();
    (0, $l0gtI$createEffect)(()=>opts?.enabled !== false, (enabled)=>{
        if (!enabled) return;
        let handler = (modality, e)=>{
            // We want to early return for any keyboard events that occur inside text inputs EXCEPT for Tab and Escape
            if (!$a85418a6e737a800$var$isKeyboardFocusEvent(!!opts?.isTextInput, modality, e)) return;
            fn($a85418a6e737a800$export$b9b3dfddab17db27());
        };
        $a85418a6e737a800$export$901e90a13c50a14e.add(handler);
        return ()=>{
            $a85418a6e737a800$export$901e90a13c50a14e.delete(handler);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    });
}

});
parcelRegister("34B6C", function(module, exports) {

$parcel$export(module.exports, "createSyntheticEvent", function () { return $23ce873f5df381ac$export$525bc4921d56d4a; });
$parcel$export(module.exports, "setEventTarget", function () { return $23ce873f5df381ac$export$c2b7abe5d61ec696; });
$parcel$export(module.exports, "useSyntheticBlurEvent", function () { return $23ce873f5df381ac$export$715c682d09d639cc; });
$parcel$export(module.exports, "ignoreFocusEvent", function () { return $23ce873f5df381ac$export$fda7da73ab5d4c48; });
$parcel$export(module.exports, "preventFocus", function () { return $23ce873f5df381ac$export$cabe61c495ee3649; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $jBlzr = parcelRequire("jBlzr");

var $ed1Px = parcelRequire("ed1Px");

var $gi7Zf = parcelRequire("gi7Zf");

var $6MYlq = parcelRequire("6MYlq");

function $23ce873f5df381ac$export$525bc4921d56d4a(nativeEvent) {
    // Source handlers expect enumerable event fields (the propagation helper
    // composes these). Keep the native event untouched outside this boundary.
    let event = {};
    for(let proto = nativeEvent; proto && proto !== Object.prototype; proto = Object.getPrototypeOf(proto))for (let key of Object.getOwnPropertyNames(proto)){
        if (key === 'constructor' || key in event) continue;
        let value = nativeEvent[key];
        Object.defineProperty(event, key, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: typeof value === 'function' ? value.bind(nativeEvent) : value
        });
    }
    event.type = nativeEvent.type === 'focusin' ? 'focus' : nativeEvent.type === 'focusout' ? 'blur' : nativeEvent.type;
    event.nativeEvent = nativeEvent;
    event.isDefaultPrevented = ()=>nativeEvent.defaultPrevented;
    // cancelBubble is technically deprecated in the spec, but still supported in all browsers.
    event.isPropagationStopped = ()=>nativeEvent.cancelBubble;
    event.persist = ()=>{};
    return event;
}
function $23ce873f5df381ac$export$c2b7abe5d61ec696(event, target) {
    Object.defineProperty(event, 'target', {
        value: target
    });
    Object.defineProperty(event, 'currentTarget', {
        value: target
    });
}
function $23ce873f5df381ac$export$715c682d09d639cc(onBlur) {
    let stateRef = {
        current: {
            isFocused: false,
            observer: null
        }
    };
    let removeBlurListener;
    // Clean up MutationObserver on unmount. See below.
    (0, $l0gtI$onCleanup)(()=>{
        const state = stateRef.current;
        removeBlurListener?.();
        if (state.observer) {
            state.observer.disconnect();
            state.observer = null;
        }
    });
    // This function is called during a React onFocus event.
    return (e)=>{
        // React does not fire onBlur when an element is disabled. https://github.com/facebook/react/issues/9142
        // Most browsers fire a native focusout event in this case, except for Firefox. In that case, we use a
        // MutationObserver to watch for the disabled attribute, and dispatch these events ourselves.
        // For browsers that do, focusout fires before the MutationObserver, so onBlur should not fire twice.
        let eventTarget = (0, $ed1Px.getEventTarget)(e);
        if (eventTarget instanceof HTMLButtonElement || eventTarget instanceof HTMLInputElement || eventTarget instanceof HTMLTextAreaElement || eventTarget instanceof HTMLSelectElement) {
            removeBlurListener?.();
            stateRef.current.observer?.disconnect();
            stateRef.current.isFocused = true;
            let target = eventTarget;
            let onBlurHandler = (e)=>{
                stateRef.current.isFocused = false;
                if (target.disabled) {
                    // For backward compatibility, dispatch a (fake) React synthetic event.
                    let event = $23ce873f5df381ac$export$525bc4921d56d4a(e);
                    onBlur?.(event);
                }
                // We no longer need the MutationObserver once the target is blurred.
                if (stateRef.current.observer) {
                    stateRef.current.observer.disconnect();
                    stateRef.current.observer = null;
                }
            };
            target.addEventListener('focusout', onBlurHandler, {
                once: true
            });
            removeBlurListener = ()=>target.removeEventListener('focusout', onBlurHandler);
            stateRef.current.observer = new MutationObserver(()=>{
                if (stateRef.current.isFocused && target.disabled) {
                    stateRef.current.observer?.disconnect();
                    let relatedTargetEl = target === (0, $ed1Px.getActiveElement)() ? null : (0, $ed1Px.getActiveElement)();
                    target.dispatchEvent(new globalThis.FocusEvent('blur', {
                        relatedTarget: relatedTargetEl
                    }));
                    target.dispatchEvent(new globalThis.FocusEvent('focusout', {
                        bubbles: true,
                        relatedTarget: relatedTargetEl
                    }));
                }
            });
            stateRef.current.observer.observe(target, {
                attributes: true,
                attributeFilter: [
                    'disabled'
                ]
            });
        }
    };
}
let $23ce873f5df381ac$export$fda7da73ab5d4c48 = false;
function $23ce873f5df381ac$export$cabe61c495ee3649(target) {
    // The browser will focus the nearest focusable ancestor of our target.
    while(target && !(0, $6MYlq.isFocusable)(target, {
        skipVisibilityCheck: true
    }))target = target.parentElement;
    let ownerWindow = (0, $gi7Zf.getOwnerWindow)(target);
    let activeElement = (0, $ed1Px.getActiveElement)(ownerWindow.document);
    if (!activeElement || activeElement === target) return;
    // Listen on the target's root (document or shadow root) so we catch focus events inside
    // shadow DOM; they do not reach the main window.
    let targetRoot = target?.getRootNode();
    let root = targetRoot != null && (0, $gi7Zf.isShadowRoot)(targetRoot) ? targetRoot : (0, $gi7Zf.getOwnerWindow)(target);
    // Focus is "moving to target" when it moves to the button or to a descendant of the button
    // (e.g. SVG icon)
    let isFocusMovingToTarget = (focusTarget)=>focusTarget === target || (0, $gi7Zf.isNode)(focusTarget) && (0, $ed1Px.nodeContains)(target, focusTarget);
    // Blur/focusout events have their target as the element losing focus. Stop propagation when
    // that is the previously focused element (activeElement) or a descendant (e.g. in shadow DOM).
    let isBlurFromActiveElement = (eventTarget)=>eventTarget === activeElement || activeElement != null && (0, $gi7Zf.isNode)(eventTarget) && (0, $ed1Px.nodeContains)(activeElement, eventTarget);
    $23ce873f5df381ac$export$fda7da73ab5d4c48 = true;
    let isRefocusing = false;
    let onBlur = (e)=>{
        if (isBlurFromActiveElement((0, $ed1Px.getEventTarget)(e)) || isRefocusing) e.stopImmediatePropagation();
    };
    let onFocusOut = (e)=>{
        if (isBlurFromActiveElement((0, $ed1Px.getEventTarget)(e)) || isRefocusing) {
            e.stopImmediatePropagation();
            // If there was no focusable ancestor, we don't expect a focus event.
            // Re-focus the original active element here.
            if (!target && !isRefocusing) {
                isRefocusing = true;
                (0, $jBlzr.focusWithoutScrolling)(activeElement);
                cleanup();
            }
        }
    };
    let onFocus = (e)=>{
        if (isFocusMovingToTarget((0, $ed1Px.getEventTarget)(e)) || isRefocusing) e.stopImmediatePropagation();
    };
    let onFocusIn = (e)=>{
        if (isFocusMovingToTarget((0, $ed1Px.getEventTarget)(e)) || isRefocusing) {
            e.stopImmediatePropagation();
            if (!isRefocusing) {
                isRefocusing = true;
                (0, $jBlzr.focusWithoutScrolling)(activeElement);
                cleanup();
            }
        }
    };
    root.addEventListener('blur', onBlur, true);
    root.addEventListener('focusout', onFocusOut, true);
    root.addEventListener('focusin', onFocusIn, true);
    root.addEventListener('focus', onFocus, true);
    let cleanup = ()=>{
        cancelAnimationFrame(raf);
        root.removeEventListener('blur', onBlur, true);
        root.removeEventListener('focusout', onFocusOut, true);
        root.removeEventListener('focusin', onFocusIn, true);
        root.removeEventListener('focus', onFocus, true);
        $23ce873f5df381ac$export$fda7da73ab5d4c48 = false;
        isRefocusing = false;
    };
    let raf = requestAnimationFrame(cleanup);
    return cleanup;
}

});
parcelRegister("6MYlq", function(module, exports) {

$parcel$export(module.exports, "isFocusable", function () { return $4f1608f31dbbf3ae$export$4c063cf1350e6fed; });
$parcel$export(module.exports, "isTabbable", function () { return $4f1608f31dbbf3ae$export$bebd5a1431fec25d; });
/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $gi7Zf = parcelRequire("gi7Zf");

var $gMKUF = parcelRequire("gMKUF");
const $4f1608f31dbbf3ae$var$focusableElements = [
    'input:not([disabled]):not([type=hidden])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'a[href]',
    'area[href]',
    'summary',
    'iframe',
    'object',
    'embed',
    'audio[controls]',
    'video[controls]',
    '[contenteditable]:not([contenteditable^="false"])',
    'permission'
];
const $4f1608f31dbbf3ae$var$FOCUSABLE_ELEMENT_SELECTOR = $4f1608f31dbbf3ae$var$focusableElements.join(':not([hidden]),') + ',[tabindex]:not([disabled]):not([hidden])';
$4f1608f31dbbf3ae$var$focusableElements.push('[tabindex]:not([tabindex="-1"]):not([disabled])');
const $4f1608f31dbbf3ae$var$TABBABLE_ELEMENT_SELECTOR = $4f1608f31dbbf3ae$var$focusableElements.join(':not([hidden]):not([tabindex="-1"]),');
function $4f1608f31dbbf3ae$export$4c063cf1350e6fed(element, options) {
    return element.matches($4f1608f31dbbf3ae$var$FOCUSABLE_ELEMENT_SELECTOR) && !$4f1608f31dbbf3ae$var$isInert(element) && (options?.skipVisibilityCheck || (0, $gMKUF.isElementVisible)(element));
}
function $4f1608f31dbbf3ae$export$bebd5a1431fec25d(element) {
    return element.matches($4f1608f31dbbf3ae$var$TABBABLE_ELEMENT_SELECTOR) && (0, $gMKUF.isElementVisible)(element) && !$4f1608f31dbbf3ae$var$isInert(element);
}
function $4f1608f31dbbf3ae$var$isInert(element) {
    let node = element;
    while(node != null){
        if (node instanceof (0, $gi7Zf.getOwnerWindow)(node).HTMLElement && node.inert) return true;
        node = node.parentElement;
    }
    return false;
}

});
parcelRegister("gMKUF", function(module, exports) {

$parcel$export(module.exports, "isElementVisible", function () { return $c38584f79c24d8dd$export$e989c0fffaa6b27a; });
/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $gi7Zf = parcelRequire("gi7Zf");
const $c38584f79c24d8dd$var$supportsCheckVisibility = typeof Element !== 'undefined' && 'checkVisibility' in Element.prototype;
function $c38584f79c24d8dd$var$isStyleVisible(element) {
    // Adoption changes ownerDocument, but does not change an element's realm/prototype.
    // HTML and SVG namespaces remain stable across iframe/Portal adoption.
    if (element.namespaceURI !== 'http://www.w3.org/1999/xhtml' && element.namespaceURI !== 'http://www.w3.org/2000/svg') return false;
    let { display: display, visibility: visibility } = element.style;
    let isVisible = display !== 'none' && visibility !== 'hidden' && visibility !== 'collapse';
    if (isVisible) {
        const { getComputedStyle: getComputedStyle } = (0, $gi7Zf.getOwnerWindow)(element);
        let { display: computedDisplay, visibility: computedVisibility } = getComputedStyle(element);
        isVisible = computedDisplay !== 'none' && computedVisibility !== 'hidden' && computedVisibility !== 'collapse';
    }
    return isVisible;
}
function $c38584f79c24d8dd$var$isAttributeVisible(element, childElement) {
    return !element.hasAttribute('hidden') && // Ignore HiddenSelect when tree walking.
    !element.hasAttribute('data-react-aria-prevent-focus') && (element.nodeName === 'DETAILS' && childElement && childElement.nodeName !== 'SUMMARY' ? element.hasAttribute('open') : true);
}
function $c38584f79c24d8dd$export$e989c0fffaa6b27a(element, childElement) {
    if ($c38584f79c24d8dd$var$supportsCheckVisibility) return element.checkVisibility({
        visibilityProperty: true
    }) && !element.closest('[data-react-aria-prevent-focus]');
    return element.nodeName !== '#comment' && $c38584f79c24d8dd$var$isStyleVisible(element) && $c38584f79c24d8dd$var$isAttributeVisible(element, childElement) && (!element.parentElement || $c38584f79c24d8dd$export$e989c0fffaa6b27a(element.parentElement, element));
}

});



parcelRegister("1oGtO", function(module, exports) {

$parcel$export(module.exports, "isVirtualClick", function () { return $1048fbf3b4458e88$export$60278871457622de; });
$parcel$export(module.exports, "isVirtualPointerEvent", function () { return $1048fbf3b4458e88$export$29bf1b5f2c56cf63; });
/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $1FDXt = parcelRequire("1FDXt");
function $1048fbf3b4458e88$export$60278871457622de(event) {
    // JAWS/NVDA with Firefox.
    if (event.pointerType === '' && event.isTrusted) return true;
    // Android TalkBack's detail value varies depending on the event listener providing the event so we have specific logic here instead
    // If pointerType is defined, event is from a click listener. For events from mousedown listener, detail === 0 is a sufficient check
    // to detect TalkBack virtual clicks.
    if ((0, $1FDXt.isAndroid)() && event.pointerType) return event.type === 'click' && event.buttons === 1;
    return event.detail === 0 && !event.pointerType;
}
function $1048fbf3b4458e88$export$29bf1b5f2c56cf63(event) {
    // If the pointer size is zero, then we assume it's from a screen reader.
    // Android TalkBack double tap will sometimes return a event with width and height of 1
    // and pointerType === 'mouse' so we need to check for a specific combination of event attributes.
    // Cannot use "event.pressure === 0" as the sole check due to Safari pointer events always returning pressure === 0
    // instead of .5, see https://bugs.webkit.org/show_bug.cgi?id=206216. event.pointerType === 'mouse' is to distingush
    // Talkback double tap from Windows Firefox touch screen press
    return !(0, $1FDXt.isAndroid)() && event.width === 0 && event.height === 0 || (0, $1FDXt.isAndroid)() && event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === 'mouse';
}

});

parcelRegister("aPfEU", function(module, exports) {

$parcel$export(module.exports, "useIsSSR", function () { return $7e1ad04bebf79fde$export$535bd6ca7f90a273; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 


var $dyxC2 = parcelRequire("dyxC2");
function $7e1ad04bebf79fde$export$9f8ac96af4b1b2ae(props) {
    return props.children;
}
const $7e1ad04bebf79fde$export$619500959fc48b26 = (0, $dyxC2.useId);
function $7e1ad04bebf79fde$export$535bd6ca7f90a273() {
    const [isSSR, setIsSSR] = (0, $l0gtI$createSignal)((0, $l0gtI$isServer) || (0, $l0gtI$isHydrating)());
    // Reserve the same lifecycle slot on server and client.
    (0, $l0gtI$onSettled)(()=>{
        setIsSSR(false);
    });
    return isSSR;
}

});


parcelRegister("ic9IB", function(module, exports) {

$parcel$export(module.exports, "runAfterTransition", function () { return $d3f0e2dce74924a2$export$24490316f764c430; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $gi7Zf = parcelRequire("gi7Zf");

var $ed1Px = parcelRequire("ed1Px");
// We store a global list of elements that are currently transitioning,
// mapped to a set of CSS properties that are transitioning for that element.
// This is necessary rather than a simple count of transitions because of browser
// bugs, e.g. Chrome sometimes fires both transitionend and transitioncancel rather
// than one or the other. So we need to track what's actually transitioning so that
// we can ignore these duplicate events.
const $d3f0e2dce74924a2$var$transitionsByElement = new Map();
const $d3f0e2dce74924a2$var$transitionCallbacks = new Set();
function $d3f0e2dce74924a2$var$isTransitionEvent(event) {
    return 'propertyName' in event;
}
function $d3f0e2dce74924a2$var$onTransitionStart(e) {
    let eventTarget = (0, $ed1Px.getEventTarget)(e);
    if (!$d3f0e2dce74924a2$var$isTransitionEvent(e) || !eventTarget) return;
    // Add the transitioning property to the list for this element.
    let transitions = $d3f0e2dce74924a2$var$transitionsByElement.get(eventTarget);
    if (!transitions) {
        transitions = new Set();
        $d3f0e2dce74924a2$var$transitionsByElement.set(eventTarget, transitions);
        // The transitioncancel event must be registered on the element itself, rather than as a global
        // event. This enables us to handle when the node is deleted from the document while it is transitioning.
        // In that case, the cancel event would have nowhere to bubble to so we need to handle it directly.
        eventTarget.addEventListener('transitioncancel', $d3f0e2dce74924a2$var$onTransitionEnd, {
            once: true
        });
    }
    transitions.add(e.propertyName);
}
function $d3f0e2dce74924a2$var$onTransitionEnd(e) {
    let eventTarget = (0, $ed1Px.getEventTarget)(e);
    if (!$d3f0e2dce74924a2$var$isTransitionEvent(e) || !eventTarget) return;
    // Remove property from list of transitioning properties.
    let properties = $d3f0e2dce74924a2$var$transitionsByElement.get(eventTarget);
    if (!properties) return;
    properties.delete(e.propertyName);
    // If empty, remove transitioncancel event, and remove the element from the list of transitioning elements.
    if (properties.size === 0) {
        eventTarget.removeEventListener('transitioncancel', $d3f0e2dce74924a2$var$onTransitionEnd);
        $d3f0e2dce74924a2$var$transitionsByElement.delete(eventTarget);
    }
    // If no transitioning elements, call all of the queued callbacks.
    if ($d3f0e2dce74924a2$var$transitionsByElement.size === 0) for (let callback of $d3f0e2dce74924a2$var$transitionCallbacks){
        callback(true);
        $d3f0e2dce74924a2$var$transitionCallbacks.delete(callback);
    }
}
function $d3f0e2dce74924a2$var$setupGlobalEvents() {
    (0, $gi7Zf.addEvent)(document, 'transitionrun', $d3f0e2dce74924a2$var$onTransitionStart);
    (0, $gi7Zf.addEvent)(document, 'transitionend', $d3f0e2dce74924a2$var$onTransitionEnd);
}
/**
 * Cleans up any elements that are no longer in the document.
 * This is necessary because we can't rely on transitionend events to fire
 * for elements that are removed from the document while transitioning.
 */ function $d3f0e2dce74924a2$var$cleanupDetachedElements() {
    for (const [eventTarget] of $d3f0e2dce74924a2$var$transitionsByElement)// Similar to `eventTarget instanceof Element && !eventTarget.isConnected`, but avoids
    // the explicit instanceof check, since it may be different in different contexts.
    if ('isConnected' in eventTarget && !eventTarget.isConnected) $d3f0e2dce74924a2$var$transitionsByElement.delete(eventTarget);
}
if (typeof document !== 'undefined') {
    if (document.readyState !== 'loading') $d3f0e2dce74924a2$var$setupGlobalEvents();
    else (0, $gi7Zf.addEvent)(document, 'DOMContentLoaded', $d3f0e2dce74924a2$var$setupGlobalEvents);
}
function $d3f0e2dce74924a2$export$24490316f764c430(fn) {
    // Wait one frame to see if an animation starts, e.g. a transition on mount.
    let frame = window.requestAnimationFrame(()=>{
        $d3f0e2dce74924a2$var$cleanupDetachedElements();
        // If no transitions are running, call the function immediately.
        // Otherwise, add it to a list of callbacks to run at the end of the animation.
        if ($d3f0e2dce74924a2$var$transitionsByElement.size === 0) return fn(false);
        $d3f0e2dce74924a2$var$transitionCallbacks.add(fn);
    });
    return ()=>{
        window.cancelAnimationFrame(frame);
        $d3f0e2dce74924a2$var$transitionCallbacks.delete(fn);
    };
}

});


parcelRegister("8uTEk", function(module, exports) {

$parcel$export(module.exports, "useFocus", function () { return $62fc4ae47542e295$export$f8168d8dd8fd66e6; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $ed1Px = parcelRequire("ed1Px");

var $gi7Zf = parcelRequire("gi7Zf");

var $34B6C = parcelRequire("34B6C");
function $62fc4ae47542e295$export$f8168d8dd8fd66e6(props) {
    const onBlur = (e)=>{
        if ((0, $ed1Px.getEventTarget)(e) === e.currentTarget) {
            if (props.onBlur) props.onBlur(e);
            if (props.onFocusChange) props.onFocusChange(false);
            return true;
        }
    };
    const onSyntheticFocus = (0, $34B6C.useSyntheticBlurEvent)(onBlur);
    const onFocus = (e)=>{
        // Double check that document.activeElement actually matches e.target in case a previously chained
        // focus handler already moved focus somewhere else.
        let eventTarget = (0, $ed1Px.getEventTarget)(e);
        const ownerDocument = (0, $gi7Zf.getOwnerDocument)(eventTarget);
        const activeElement = ownerDocument ? (0, $ed1Px.getActiveElement)(ownerDocument) : (0, $ed1Px.getActiveElement)();
        if (eventTarget === e.currentTarget && eventTarget === activeElement) {
            if (props.onFocus) props.onFocus(e);
            if (props.onFocusChange) props.onFocusChange(true);
            onSyntheticFocus(e);
        }
    };
    const focusIn = (e)=>onFocus((0, $34B6C.createSyntheticEvent)(e));
    const focusOut = (e)=>{
        // The source disabled-element fallback delivers this blur from its target
        // listener. Native focusout also bubbles, unlike React's disabled blur.
        let target = (0, $ed1Px.getEventTarget)(e);
        if (target && 'disabled' in target && target.disabled) return;
        onBlur((0, $34B6C.createSyntheticEvent)(e));
    };
    return {
        focusProps: {
            get onFocusIn () {
                return !props.isDisabled && (props.onFocus || props.onFocusChange || props.onBlur) ? focusIn : undefined;
            },
            get onFocusOut () {
                return !props.isDisabled && (props.onBlur || props.onFocusChange) ? focusOut : undefined;
            }
        }
    };
}

});

parcelRegister("akk5I", function(module, exports) {

$parcel$export(module.exports, "useKeyboard", function () { return $784b5b57aaea32db$export$8f71654801c2f7cd; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $fZRjG = parcelRequire("fZRjG");

var $2GTZ5 = parcelRequire("2GTZ5");

var $gmHob = parcelRequire("gmHob");

var $ed1Px = parcelRequire("ed1Px");

var $34B6C = parcelRequire("34B6C");
function $784b5b57aaea32db$export$8f71654801c2f7cd(props) {
    function handlers() {
        let { shortcuts: shortcuts, allowRepeats: allowRepeats = false, allowComposing: allowComposing = false } = props;
        let onKeyDown;
        let onKeyUp;
        if (shortcuts) {
            let shortcutHandler = (0, $gmHob.createKeyboardShortcutHandler)(shortcuts);
            let shortcutOnKeyDown = (0, $2GTZ5.createEventHandler)((e)=>{
                // If keyboard event didn't originate from a child of the current target,
                // then it's a React event coming through a portal. We should ignore it.
                if (!(0, $ed1Px.nodeContains)(e.currentTarget, (0, $ed1Px.getEventTarget)(e))) {
                    e.continuePropagation();
                    return;
                }
                if (e.nativeEvent?.repeat && !allowRepeats || e.nativeEvent?.isComposing && !allowComposing) {
                    e.continuePropagation();
                    return;
                }
                shortcutHandler(e);
            });
            let shortcutOnKeyUp = (0, $2GTZ5.createEventHandler)((e)=>{
                // If keyboard event didn't originate from a child of the current target,
                // then it's a React event coming through a portal. We should ignore it.
                if (!(0, $ed1Px.nodeContains)(e.currentTarget, (0, $ed1Px.getEventTarget)(e))) {
                    e.continuePropagation();
                    return;
                }
                if (e.nativeEvent?.repeat && !allowRepeats || e.nativeEvent?.isComposing && !allowComposing) {
                    e.continuePropagation();
                    return;
                }
                // implement shortcut handler on keyup, what should the map be called? or should it be another syntax on shortcuts?
                e.continuePropagation();
            });
            onKeyDown = props.onKeyDown ? (0, $fZRjG.chain)(props.onKeyDown, shortcutOnKeyDown) : shortcutOnKeyDown;
            onKeyUp = props.onKeyUp ? (0, $fZRjG.chain)(props.onKeyUp, shortcutOnKeyUp) : shortcutOnKeyUp;
        } else {
            onKeyDown = (0, $2GTZ5.createEventHandler)(props.onKeyDown);
            onKeyUp = (0, $2GTZ5.createEventHandler)(props.onKeyUp);
        }
        return {
            onKeyDown: onKeyDown,
            onKeyUp: onKeyUp
        };
    }
    let onKeyDown = (e)=>handlers().onKeyDown?.((0, $34B6C.createSyntheticEvent)(e));
    let onKeyUp = (e)=>handlers().onKeyUp?.((0, $34B6C.createSyntheticEvent)(e));
    return {
        keyboardProps: {
            get onKeyDown () {
                return props.isDisabled || !props.onKeyDown && !props.shortcuts ? undefined : onKeyDown;
            },
            get onKeyUp () {
                return props.isDisabled || !props.onKeyUp && !props.shortcuts ? undefined : onKeyUp;
            }
        }
    };
}

});
parcelRegister("2GTZ5", function(module, exports) {

$parcel$export(module.exports, "createEventHandler", function () { return $1f5aee515d2df988$export$48d1ea6320830260; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /**
 * This function wraps a native/source event handler to make stopPropagation the default, and support
 * continuePropagation instead.
 */ function $1f5aee515d2df988$export$48d1ea6320830260(handler) {
    if (!handler) return undefined;
    return (e)=>{
        let shouldStopPropagation = true;
        let event = {
            ...e,
            preventDefault () {
                e.preventDefault();
            },
            isDefaultPrevented () {
                return e.isDefaultPrevented?.() ?? e.defaultPrevented;
            },
            stopPropagation () {
                shouldStopPropagation = true;
            },
            continuePropagation () {
                shouldStopPropagation = false;
                // nested createEventHandler might have set continue propagation so we should continue
                // propagation on wrappers
                if (typeof e.continuePropagation === 'function') e.continuePropagation();
            },
            isPropagationStopped () {
                return shouldStopPropagation;
            }
        };
        handler(event);
        // nested createEventHandler calls may already have stopped propagation
        if (shouldStopPropagation && !(typeof e.isPropagationStopped === 'function' && e.isPropagationStopped())) e.stopPropagation();
    };
}

});

parcelRegister("gmHob", function(module, exports) {

$parcel$export(module.exports, "createKeyboardShortcutHandler", function () { return $bea05b93218ee9c7$export$2fd1fc8039383ae1; });
/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $1FDXt = parcelRequire("1FDXt");
/** Modifier names in shortcut strings (case-insensitive). Order in the string does not matter. */ const $bea05b93218ee9c7$var$MODIFIER_NAMES = new Set([
    'shift',
    'alt',
    'control',
    'meta',
    'mod' // OS dependent - Cmd on Mac, Control on Windows/Linux
]);
/** Canonical modifier order for stable keys (sorted, fixed order). */ const $bea05b93218ee9c7$var$CANONICAL_MODIFIER_ORDER = [
    'Alt',
    'Control',
    'Meta',
    'Shift'
];
function $bea05b93218ee9c7$export$9932402e211e7315(parsed) {
    let set = new Set();
    if (parsed.alt) set.add('Alt');
    if (parsed.shift) set.add('Shift');
    if (parsed.ctrl) set.add('Control');
    if (parsed.meta) set.add('Meta');
    if (parsed.mod) set.add((0, $1FDXt.isMac)() ? 'Meta' : 'Control');
    return set;
}
function $bea05b93218ee9c7$export$bf26c410e1f8fe6d(e) {
    let set = new Set();
    if (e.altKey) set.add('Alt');
    if (e.ctrlKey) set.add('Control');
    if (e.metaKey) set.add('Meta');
    if (e.shiftKey) set.add('Shift');
    return set;
}
function $bea05b93218ee9c7$var$sortedModifierTokens(set) {
    return $bea05b93218ee9c7$var$CANONICAL_MODIFIER_ORDER.filter((name)=>set.has(name));
}
function $bea05b93218ee9c7$export$d636f01a2eaffd51(spec) {
    let parts = spec.split('+').reduce((prev, part)=>{
        let lower = part.toLowerCase();
        if ($bea05b93218ee9c7$var$MODIFIER_NAMES.has(lower)) {
            if (lower === 'shift') prev.shift = true;
            else if (lower === 'alt') prev.alt = true;
            else if (lower === 'control') prev.ctrl = true;
            else if (lower === 'meta') prev.meta = true;
            else if (lower === 'mod') prev.mod = true;
        } else prev.key = part;
        return prev;
    }, {
        shift: false,
        alt: false,
        ctrl: false,
        meta: false,
        mod: false,
        key: ''
    });
    if (parts.key === '') throw new Error(`Invalid keyboard shortcut: "${spec}". Must include exactly one non-modifier key (e.g. "a", "Enter", "ArrowDown"). Combine any of Shift, Alt, Ctrl, Meta, and Mod.`);
    return parts;
}
function $bea05b93218ee9c7$var$normalizeEventKey(key) {
    return key.toLowerCase();
}
/** Short aliases for common keys (shortcut side, before match). */ const $bea05b93218ee9c7$var$KEY_ALIASES = {
    space: ' ',
    esc: 'escape',
    del: 'delete',
    ins: 'insert',
    left: 'arrowleft',
    right: 'arrowright',
    up: 'arrowup',
    down: 'arrowdown',
    pageup: 'pageup',
    pagedown: 'pagedown'
};
/** Canonical key segment (lowercase); aliases like `down` → `arrowdown`. */ function $bea05b93218ee9c7$var$canonicalKeyFromSpecKey(specKey) {
    let k = $bea05b93218ee9c7$var$normalizeEventKey(specKey);
    let aliased = $bea05b93218ee9c7$var$KEY_ALIASES[k];
    return aliased != null ? aliased : k;
}
function $bea05b93218ee9c7$export$6cfa2ace150c84a5(parsed) {
    let mods = $bea05b93218ee9c7$var$sortedModifierTokens($bea05b93218ee9c7$export$9932402e211e7315(parsed));
    let key = $bea05b93218ee9c7$var$canonicalKeyFromSpecKey(parsed.key);
    return mods.length > 0 ? `${mods.join('+')}+${key}` : key;
}
function $bea05b93218ee9c7$export$786304bda41dd69f(e) {
    let mods = $bea05b93218ee9c7$var$sortedModifierTokens($bea05b93218ee9c7$export$bf26c410e1f8fe6d(e));
    let key = $bea05b93218ee9c7$var$normalizeEventKey(e.key);
    let prefix = mods.length > 0 ? `${mods.join('+')}+` : '';
    return prefix + key;
}
function $bea05b93218ee9c7$export$2fd1fc8039383ae1(bindings) {
    let map = new Map();
    for (let [spec, action] of Object.entries(bindings)){
        let parsed = $bea05b93218ee9c7$export$d636f01a2eaffd51(spec);
        map.set($bea05b93218ee9c7$export$6cfa2ace150c84a5(parsed), action);
    }
    return (e)=>{
        let canonical = $bea05b93218ee9c7$export$786304bda41dd69f(e);
        let action = map.get(canonical);
        let result = action?.(e);
        if (result === undefined && action !== undefined) result = {
            shouldContinuePropagation: false,
            shouldPreventDefault: true
        };
        else if (typeof result === 'boolean') result = {
            shouldContinuePropagation: !result,
            shouldPreventDefault: result
        };
        if (result?.shouldPreventDefault) e.preventDefault();
        if (!action || result?.shouldContinuePropagation) e.continuePropagation();
    };
}

});


parcelRegister("6p9dH", function(module, exports) {

$parcel$export(module.exports, "attachRef", function () { return $4a9c3aca7d29f30f$export$ffee5bd706a2135a; });
$parcel$export(module.exports, "useObjectRef", function () { return $4a9c3aca7d29f30f$export$4338b53315abf666; });
/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
function $4a9c3aca7d29f30f$export$ffee5bd706a2135a(ref, instance) {
    if (Array.isArray(ref)) {
        let cleanups = ref.map((item)=>$4a9c3aca7d29f30f$export$ffee5bd706a2135a(item, instance));
        return ()=>{
            for (let cleanup of cleanups)cleanup();
        };
    }
    if (typeof ref === 'function') {
        let cleanup = (0, $l0gtI$untrack)(()=>ref(instance));
        return typeof cleanup === 'function' ? cleanup : ()=>{
            (0, $l0gtI$untrack)(()=>ref(null));
        };
    }
    if (ref) {
        let cell = ref;
        cell.current = instance;
        return ()=>{
            if (cell.current === instance) cell.current = null;
        };
    }
    return ()=>{};
}
function $4a9c3aca7d29f30f$export$4338b53315abf666(ref) {
    let current = null;
    let [revision, setRevision] = (0, $l0gtI$createSignal)(0);
    let cleanups = [];
    function deliver(ref, instance) {
        cleanups.push($4a9c3aca7d29f30f$export$ffee5bd706a2135a(ref, instance));
    }
    let attach = (instance)=>{
        if (instance === current) return;
        for (let cleanup of cleanups)cleanup();
        cleanups = [];
        current = instance;
        setRevision((n)=>n + 1);
        if (instance !== null) deliver(ref, instance);
    };
    // Detachment can run inside keyed-owner disposal. Keep forwarded teardown
    // synchronous, but give its reactive writes an explicit native transaction.
    let detach = (0, $l0gtI$action)(function*() {
        attach(null);
    });
    Object.defineProperty(attach, 'current', {
        get () {
            revision();
            return current;
        },
        set: attach
    });
    (0, $l0gtI$onCleanup)(()=>(0, $l0gtI$runWithOwner)(null, detach));
    return attach;
}

});

parcelRegister("khPAm", function(module, exports) {

$parcel$export(module.exports, "useSyncRef", function () { return $ec4d68fb01bc07a8$export$4debdb1a3f0fa79e; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 

var $6p9dH = parcelRequire("6p9dH");
function $ec4d68fb01bc07a8$export$4debdb1a3f0fa79e(context, ref) {
    // oxlint-disable-next-line react/react-compiler
    (0, $l0gtI$createEffect)(()=>({
            target: context?.ref,
            value: ref?.current
        }), ({ target: target, value: value })=>{
        if (target && ref) // oxlint-disable-next-line react/react-compiler
        return (0, $6p9dH.attachRef)(target, value ?? null);
    });
}

});

parcelRegister("cpleU", function(module, exports) {

$parcel$export(module.exports, "FocusableContext", function () { return $90884b889dc4fa67$export$f9762fab77588ecb; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // Extracted from the terminal copy of useFocusable.tsx so collection context
// forwarding does not load unrelated, not-yet-adapted interaction hooks.

const $90884b889dc4fa67$export$f9762fab77588ecb = (0, $l0gtI$createContext)(null);

});


parcelRegister("eTc6R", function(module, exports) {

$parcel$export(module.exports, "usePress", function () { return $ad6f987c65fbb6ed$export$45712eceda6fad21; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // Portions of the code in this file are based on code from react.
// Original licensing for the following can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/facebook/react/tree/cc7c1aece46a6b69b41958d731e0fd27c94bfc6c/packages/react-interactions

var $fZRjG = parcelRequire("fZRjG");

var $34B6C = parcelRequire("34B6C");

var $in5DT = parcelRequire("in5DT");

var $jBlzr = parcelRequire("jBlzr");

var $ed1Px = parcelRequire("ed1Px");

var $2HYad = parcelRequire("2HYad");

var $gi7Zf = parcelRequire("gi7Zf");

var $1FDXt = parcelRequire("1FDXt");

var $1oGtO = parcelRequire("1oGtO");

var $7boJ2 = parcelRequire("7boJ2");

var $fNnwP = parcelRequire("fNnwP");

var $fpC5Z = parcelRequire("fpC5Z");


var $czX2l = parcelRequire("czX2l");

var $khgX3 = parcelRequire("khgX3");

var $khPAm = parcelRequire("khPAm");
function $ad6f987c65fbb6ed$var$usePressResponderContext(props) {
    // Consume context from <PressResponder> and merge with props.
    let context = (0, $l0gtI$useContext)((0, $fpC5Z.PressResponderContext));
    if (context) {
        // Prevent mergeProps from merging ref.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let contextProps = (0, $l0gtI$omit)(context, 'register', 'ref');
        props = (0, $7boJ2.mergeProps)(contextProps, props);
        // Registration is a one-time imperative ownership operation, not a read
        // of the responder's reactive controlled-press prop view.
        (0, $l0gtI$untrack)(()=>context.register());
    }
    // Ref handles belong to hook setup, not the controlled press-state derivation.
    (0, $khPAm.useSyncRef)(context, (0, $l0gtI$untrack)(()=>props.ref));
    return props;
}
class $ad6f987c65fbb6ed$var$PressEvent {
    type;
    pointerType;
    target;
    shiftKey;
    ctrlKey;
    metaKey;
    altKey;
    x;
    y;
    key;
    #shouldStopPropagation = true;
    constructor(type, pointerType, originalEvent, state){
        let currentTarget = state?.target ?? originalEvent.currentTarget;
        const rect = currentTarget?.getBoundingClientRect();
        let x, y = 0;
        let clientX, clientY = null;
        if (originalEvent.clientX != null && originalEvent.clientY != null) {
            clientX = originalEvent.clientX;
            clientY = originalEvent.clientY;
        }
        if (rect) {
            if (clientX != null && clientY != null) {
                x = clientX - rect.left;
                y = clientY - rect.top;
            } else {
                x = rect.width / 2;
                y = rect.height / 2;
            }
        }
        this.type = type;
        this.pointerType = pointerType;
        this.target = originalEvent.currentTarget;
        this.shiftKey = originalEvent.shiftKey;
        this.metaKey = originalEvent.metaKey;
        this.ctrlKey = originalEvent.ctrlKey;
        this.altKey = originalEvent.altKey;
        this.x = x;
        this.y = y;
        this.key = originalEvent.key;
    }
    continuePropagation() {
        this.#shouldStopPropagation = false;
    }
    get shouldStopPropagation() {
        return this.#shouldStopPropagation;
    }
}
const $ad6f987c65fbb6ed$var$LINK_CLICKED = Symbol('linkClicked');
const $ad6f987c65fbb6ed$var$STYLE_ID = 'react-aria-pressable-style';
const $ad6f987c65fbb6ed$var$PRESSABLE_ATTRIBUTE = 'data-react-aria-pressable';
function $ad6f987c65fbb6ed$export$45712eceda6fad21(props) {
    props = $ad6f987c65fbb6ed$var$usePressResponderContext(props);
    let domProps = (0, $l0gtI$omit)(props, 'onPress', 'onPressChange', 'onPressStart', 'onPressEnd', 'onPressUp', 'onClick', 'isDisabled', 'isPressed', 'preventFocusOnPress', 'shouldCancelOnPointerExit', 'allowTextSelectionOnPress', 'ref');
    let [isPressed, setPressed] = (0, $l0gtI$createSignal)(false);
    let ref = {
        current: {
            isPressed: false,
            ignoreEmulatedMouseEvents: false,
            didFirePressStart: false,
            isTriggeringEvent: false,
            activePointerId: null,
            target: null,
            isOverTarget: false,
            pointerType: null,
            disposables: []
        }
    };
    let { addGlobalListener: addGlobalListener, removeAllGlobalListeners: removeAllGlobalListeners } = (0, $khgX3.useGlobalListeners)();
    let triggerPressStart = (originalEvent, pointerType)=>{
        let { isDisabled: isDisabled, onPressStart: onPressStart, onPressChange: onPressChange } = props;
        let state = ref.current;
        if (isDisabled || state.didFirePressStart) return false;
        let shouldStopPropagation = true;
        state.isTriggeringEvent = true;
        if (onPressStart) {
            let event = new $ad6f987c65fbb6ed$var$PressEvent('pressstart', pointerType, originalEvent);
            onPressStart(event);
            shouldStopPropagation = event.shouldStopPropagation;
        }
        if (onPressChange) onPressChange(true);
        state.isTriggeringEvent = false;
        state.didFirePressStart = true;
        setPressed(true);
        return shouldStopPropagation;
    };
    let triggerPressEnd = (originalEvent, pointerType, wasPressed = true)=>{
        let { isDisabled: isDisabled, onPressEnd: onPressEnd, onPressChange: onPressChange, onPress: onPress } = props;
        let state = ref.current;
        if (!state.didFirePressStart) return false;
        state.didFirePressStart = false;
        state.isTriggeringEvent = true;
        let shouldStopPropagation = true;
        if (onPressEnd) {
            let event = new $ad6f987c65fbb6ed$var$PressEvent('pressend', pointerType, originalEvent);
            onPressEnd(event);
            shouldStopPropagation = event.shouldStopPropagation;
        }
        if (onPressChange) onPressChange(false);
        setPressed(false);
        if (onPress && wasPressed && !isDisabled) {
            let event = new $ad6f987c65fbb6ed$var$PressEvent('press', pointerType, originalEvent);
            onPress(event);
            shouldStopPropagation &&= event.shouldStopPropagation;
        }
        state.isTriggeringEvent = false;
        return shouldStopPropagation;
    };
    let triggerPressEndEvent = (0, $czX2l.useEffectEvent)(triggerPressEnd);
    let triggerPressUp = (originalEvent, pointerType)=>{
        let { isDisabled: isDisabled, onPressUp: onPressUp } = props;
        let state = ref.current;
        if (isDisabled) return false;
        if (onPressUp) {
            state.isTriggeringEvent = true;
            let event = new $ad6f987c65fbb6ed$var$PressEvent('pressup', pointerType, originalEvent);
            onPressUp(event);
            state.isTriggeringEvent = false;
            return event.shouldStopPropagation;
        }
        return true;
    };
    let triggerPressUpEvent = (0, $czX2l.useEffectEvent)(triggerPressUp);
    let cancel = (e)=>{
        let state = ref.current;
        if (state.isPressed && state.target) {
            if (state.didFirePressStart && state.pointerType != null) triggerPressEnd($ad6f987c65fbb6ed$var$createEvent(state.target, e), state.pointerType, false);
            state.isPressed = false;
            state.isOverTarget = false;
            state.activePointerId = null;
            state.pointerType = null;
            removeAllGlobalListeners();
            if (!props.allowTextSelectionOnPress) (0, $in5DT.restoreTextSelection)(state.target);
            for (let dispose of state.disposables)dispose();
            state.disposables = [];
        }
    };
    let cancelEvent = (0, $czX2l.useEffectEvent)(cancel);
    (0, $l0gtI$createEffect)(()=>props.isDisabled, (isDisabled)=>{
        if (isDisabled && ref.current.isPressed) cancelEvent({
            currentTarget: ref.current.target,
            shiftKey: false,
            ctrlKey: false,
            metaKey: false,
            altKey: false
        });
    });
    let cancelOnPointerExit = (e)=>{
        if (props.shouldCancelOnPointerExit) cancel(e);
    };
    let triggerClick = (e)=>{
        let { isDisabled: isDisabled, onClick: onClick } = props;
        if (isDisabled) return;
        onClick?.(e);
    };
    let triggerSyntheticClick = (e, target)=>{
        let { isDisabled: isDisabled, onClick: onClick } = props;
        if (isDisabled) return;
        // Some third-party libraries pass in onClick instead of onPress.
        // Create a fake mouse event and trigger onClick as well.
        // This matches the browser's native activation behavior for certain elements (e.g. button).
        // https://html.spec.whatwg.org/#activation
        // https://html.spec.whatwg.org/#fire-a-synthetic-pointer-event
        if (onClick) {
            let event = new MouseEvent('click', e);
            (0, $34B6C.setEventTarget)(event, target);
            onClick((0, $34B6C.createSyntheticEvent)(event));
        }
    };
    let pressProps = (()=>{
        let state = ref.current;
        let pressProps = {
            onKeyDown (e) {
                if ($ad6f987c65fbb6ed$var$isValidKeyboardEvent(e, e.currentTarget) && (0, $ed1Px.nodeContains)(e.currentTarget, (0, $ed1Px.getEventTarget)(e))) {
                    if ($ad6f987c65fbb6ed$var$shouldPreventDefaultKeyboard((0, $ed1Px.getEventTarget)(e), e.key)) e.preventDefault();
                    // If the event is repeating, it may have started on a different element
                    // after which focus moved to the current element. Ignore these events and
                    // only handle the first key down event.
                    let shouldStopPropagation = true;
                    if (!state.isPressed && !e.repeat) {
                        state.target = e.currentTarget;
                        state.isPressed = true;
                        state.pointerType = 'keyboard';
                        shouldStopPropagation = triggerPressStart(e, 'keyboard');
                    }
                    // Focus may move before the key up event, so register the event on the document
                    // instead of the same element where the key down event occurred. Make it capturing so that it will trigger
                    // before stopPropagation from useKeyboard on a child element may happen and thus we can still call triggerPress for the parent element.
                    let originalTarget = e.currentTarget;
                    let pressUp = (e)=>{
                        if ($ad6f987c65fbb6ed$var$isValidKeyboardEvent(e, originalTarget) && !e.repeat && (0, $ed1Px.nodeContains)(originalTarget, (0, $ed1Px.getEventTarget)(e)) && state.target) triggerPressUpEvent($ad6f987c65fbb6ed$var$createEvent(state.target, e), 'keyboard');
                    };
                    addGlobalListener((0, $gi7Zf.getOwnerDocument)(e.currentTarget), 'keyup', (0, $fZRjG.chain)(pressUp, onKeyUp), true);
                    if (shouldStopPropagation) e.stopPropagation();
                    // Keep track of the keydown events that occur while the Meta (e.g. Command) key is held.
                    // macOS has a bug where keyup events are not fired while the Meta key is down.
                    // When the Meta key itself is released we will get an event for that, and we'll act as if
                    // all of these other keys were released as well.
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1393524
                    // https://bugs.webkit.org/show_bug.cgi?id=55291
                    // https://bugzilla.mozilla.org/show_bug.cgi?id=1299553
                    if (e.metaKey && (0, $1FDXt.isMac)()) state.metaKeyEvents?.set(e.key, e);
                } else if (e.key === 'Meta') state.metaKeyEvents = new Map();
            },
            onClick (e) {
                if (e && !(0, $ed1Px.nodeContains)(e.currentTarget, (0, $ed1Px.getEventTarget)(e))) return;
                if (e && e.button === 0 && !state.isTriggeringEvent && !(0, $fNnwP.openLink).isOpening) {
                    let shouldStopPropagation = true;
                    if (props.isDisabled) e.preventDefault();
                    // If triggered from a screen reader or by using element.click(),
                    // trigger as if it were a keyboard click.
                    if (!state.ignoreEmulatedMouseEvents && !state.isPressed && (state.pointerType === 'virtual' || (0, $1oGtO.isVirtualClick)(e))) {
                        let stopPressStart = triggerPressStart(e, 'virtual');
                        let stopPressUp = triggerPressUpEvent(e, 'virtual');
                        let stopPressEnd = triggerPressEndEvent(e, 'virtual');
                        triggerClick(e);
                        shouldStopPropagation = stopPressStart && stopPressUp && stopPressEnd;
                    } else if (state.isPressed && state.pointerType !== 'keyboard') {
                        let pointerType = state.pointerType || e.pointerType || 'virtual';
                        let stopPressUp = triggerPressUpEvent($ad6f987c65fbb6ed$var$createEvent(e.currentTarget, e), pointerType);
                        let stopPressEnd = triggerPressEndEvent($ad6f987c65fbb6ed$var$createEvent(e.currentTarget, e), pointerType, true);
                        shouldStopPropagation = stopPressUp && stopPressEnd;
                        state.isOverTarget = false;
                        triggerClick(e);
                        // oxlint-disable-next-line react/react-compiler
                        cancelEvent(e);
                    }
                    state.ignoreEmulatedMouseEvents = false;
                    if (shouldStopPropagation) e.stopPropagation();
                }
            }
        };
        let onKeyUp = (e)=>{
            if (state.isPressed && state.target && $ad6f987c65fbb6ed$var$isValidKeyboardEvent(e, state.target)) {
                if ($ad6f987c65fbb6ed$var$shouldPreventDefaultKeyboard((0, $ed1Px.getEventTarget)(e), e.key)) e.preventDefault();
                let target = (0, $ed1Px.getEventTarget)(e);
                let wasPressed = (0, $ed1Px.nodeContains)(state.target, target);
                triggerPressEndEvent($ad6f987c65fbb6ed$var$createEvent(state.target, e), 'keyboard', wasPressed);
                if (wasPressed) triggerSyntheticClick(e, state.target);
                removeAllGlobalListeners();
                // If a link was triggered with a key other than Enter, open the URL ourselves.
                // This means the link has a role override, and the default browser behavior
                // only applies when using the Enter key.
                if (e.key !== 'Enter' && $ad6f987c65fbb6ed$var$isHTMLAnchorLink(state.target) && (0, $ed1Px.nodeContains)(state.target, target) && !e[$ad6f987c65fbb6ed$var$LINK_CLICKED]) {
                    // Store a hidden property on the event so we only trigger link click once,
                    // even if there are multiple usePress instances attached to the element.
                    e[$ad6f987c65fbb6ed$var$LINK_CLICKED] = true;
                    (0, $fNnwP.openLink)(state.target, e, false);
                }
                state.isPressed = false;
                state.metaKeyEvents?.delete(e.key);
            } else if (e.key === 'Meta' && state.metaKeyEvents?.size) {
                // If we recorded keydown events that occurred while the Meta key was pressed,
                // and those haven't received keyup events already, fire keyup events ourselves.
                // See comment above for more info about the macOS bug causing this.
                let events = state.metaKeyEvents;
                state.metaKeyEvents = undefined;
                for (let event of events.values())state.target?.dispatchEvent(new KeyboardEvent('keyup', event));
            }
        };
        if (typeof PointerEvent !== 'undefined') {
            pressProps.onPointerDown = (e)=>{
                // Only handle left clicks, and ignore events that bubbled through portals.
                if (e.button !== 0 || !(0, $ed1Px.nodeContains)(e.currentTarget, (0, $ed1Px.getEventTarget)(e))) return;
                // iOS safari fires pointer events from VoiceOver with incorrect coordinates/target.
                // Ignore and let the onClick handler take care of it instead.
                // https://bugs.webkit.org/show_bug.cgi?id=222627
                // https://bugs.webkit.org/show_bug.cgi?id=223202
                if ((0, $1oGtO.isVirtualPointerEvent)(e)) {
                    state.pointerType = 'virtual';
                    return;
                }
                state.pointerType = e.pointerType;
                let shouldStopPropagation = true;
                if (!state.isPressed) {
                    state.isPressed = true;
                    state.isOverTarget = true;
                    state.activePointerId = e.pointerId;
                    state.target = e.currentTarget;
                    if (!props.allowTextSelectionOnPress) (0, $in5DT.disableTextSelection)(state.target);
                    shouldStopPropagation = triggerPressStart(e, state.pointerType);
                    // Release pointer capture so that touch interactions can leave the original target.
                    // This enables onPointerLeave and onPointerEnter to fire.
                    let target = (0, $ed1Px.getEventTarget)(e);
                    if ('releasePointerCapture' in target) {
                        if ('hasPointerCapture' in target) {
                            if (target.hasPointerCapture(e.pointerId)) target.releasePointerCapture(e.pointerId);
                        } else target.releasePointerCapture(e.pointerId);
                    }
                    addGlobalListener((0, $gi7Zf.getOwnerDocument)(e.currentTarget), 'pointerup', onPointerUp, false);
                    addGlobalListener((0, $gi7Zf.getOwnerDocument)(e.currentTarget), 'pointercancel', onPointerCancel, false);
                }
                if (shouldStopPropagation) e.stopPropagation();
            };
            pressProps.onMouseDown = (e)=>{
                if (!(0, $ed1Px.nodeContains)(e.currentTarget, (0, $ed1Px.getEventTarget)(e))) return;
                if (e.button === 0) {
                    if (props.preventFocusOnPress) {
                        let dispose = (0, $34B6C.preventFocus)(e.target);
                        if (dispose) state.disposables.push(dispose);
                    }
                    e.stopPropagation();
                }
            };
            pressProps.onPointerUp = (e)=>{
                // iOS fires pointerup with zero width and height, so check the pointerType recorded during pointerdown.
                if (!(0, $ed1Px.nodeContains)(e.currentTarget, (0, $ed1Px.getEventTarget)(e)) || state.pointerType === 'virtual') return;
                // Only handle left clicks. If isPressed is true, delay until onClick.
                if (e.button === 0 && !state.isPressed) triggerPressUpEvent(e, state.pointerType || e.pointerType);
            };
            pressProps.onPointerOver = (e)=>{
                if (e.relatedTarget && (0, $ed1Px.nodeContains)(e.currentTarget, e.relatedTarget)) return;
                if (e.pointerId === state.activePointerId && state.target && !state.isOverTarget && state.pointerType != null) {
                    state.isOverTarget = true;
                    triggerPressStart($ad6f987c65fbb6ed$var$createEvent(state.target, e), state.pointerType);
                }
            };
            pressProps.onPointerOut = (e)=>{
                if (e.relatedTarget && (0, $ed1Px.nodeContains)(e.currentTarget, e.relatedTarget)) return;
                if (e.pointerId === state.activePointerId && state.target && state.isOverTarget && state.pointerType != null) {
                    state.isOverTarget = false;
                    triggerPressEndEvent($ad6f987c65fbb6ed$var$createEvent(state.target, e), state.pointerType, false);
                    cancelOnPointerExit(e);
                }
            };
            let onPointerUp = (e)=>{
                if (e.pointerId === state.activePointerId && state.isPressed && e.button === 0 && state.target) {
                    if ((0, $ed1Px.nodeContains)(state.target, (0, $ed1Px.getEventTarget)(e)) && state.pointerType != null) {
                        // Wait for onClick to fire onPress. This avoids browser issues when the DOM
                        // is mutated between onPointerUp and onClick, and is more compatible with third party libraries.
                        // https://github.com/adobe/react-spectrum/issues/1513
                        // https://issues.chromium.org/issues/40732224
                        // However, iOS and Android do not focus or fire onClick after a long press.
                        // We work around this by triggering a click ourselves after a timeout.
                        // This timeout is canceled during the click event in case the real one fires first.
                        // The timeout must be at least 32ms, because Safari on iOS delays the click event on
                        // non-form elements without certain ARIA roles (for hover emulation).
                        // https://github.com/WebKit/WebKit/blob/dccfae42bb29bd4bdef052e469f604a9387241c0/Source/WebKit/WebProcess/WebPage/ios/WebPageIOS.mm#L875-L892
                        let clicked = false;
                        let timeout = setTimeout(()=>{
                            if (state.isPressed && state.target instanceof HTMLElement) {
                                if (clicked) cancelEvent(e);
                                else {
                                    (0, $jBlzr.focusWithoutScrolling)(state.target);
                                    state.target.click();
                                }
                            }
                        }, 80);
                        // Use a capturing listener to track if a click occurred.
                        // If stopPropagation is called it may never reach our handler.
                        addGlobalListener(e.currentTarget, 'click', ()=>clicked = true, true);
                        state.disposables.push(()=>clearTimeout(timeout));
                    } else cancelEvent(e);
                    // Ignore subsequent onPointerLeave event before onClick on touch devices.
                    state.isOverTarget = false;
                }
            };
            let onPointerCancel = (e)=>{
                cancelEvent(e);
            };
            pressProps.onDragStart = (e)=>{
                if (!(0, $ed1Px.nodeContains)(e.currentTarget, (0, $ed1Px.getEventTarget)(e))) return;
                // Safari does not call onPointerCancel when a drag starts, whereas Chrome and Firefox do.
                cancelEvent(e);
            };
        } else var e, e1, e2, e3, e4, e5, e6, e7, e8;
        return pressProps;
    })();
    // Avoid onClick delay for double tap to zoom by default.
    (0, $l0gtI$onSettled)(()=>{
        let domRef = props.ref;
        if (!domRef || false) return;
        const ownerDocument = (0, $gi7Zf.getOwnerDocument)(domRef.current);
        if (!ownerDocument || !ownerDocument.head || ownerDocument.getElementById($ad6f987c65fbb6ed$var$STYLE_ID)) return;
        const style = ownerDocument.createElement('style');
        style.id = $ad6f987c65fbb6ed$var$STYLE_ID;
        let nonce = (0, $2HYad.getNonce)(ownerDocument);
        if (nonce) style.nonce = nonce;
        // touchAction: 'manipulation' is supposed to be equivalent, but in
        // Safari it causes onPointerCancel not to fire on scroll.
        // https://bugs.webkit.org/show_bug.cgi?id=240917
        style.textContent = `
@layer {
  [${$ad6f987c65fbb6ed$var$PRESSABLE_ATTRIBUTE}] {
    touch-action: pan-x pan-y pinch-zoom;
  }
}
    `.trim();
        ownerDocument.head.prepend(style);
    });
    // Remove user-select: none in case component unmounts immediately after pressStart
    // Like the source useEffect, this browser teardown is not registered by SSR.
    // Server owners are disposed too, but cannot have acquired text selection.
    (0, $l0gtI$onSettled)(()=>()=>{
            let state = ref.current;
            removeAllGlobalListeners();
            if (!props.allowTextSelectionOnPress) (0, $in5DT.restoreTextSelection)(state.target ?? undefined);
            for (let dispose of state.disposables)dispose();
            state.disposables = [];
        });
    return {
        isPressed: ()=>!!props.isPressed || isPressed(),
        // oxlint-disable-next-line react/react-compiler
        pressProps: (0, $7boJ2.mergeProps)(domProps, pressProps, {
            [$ad6f987c65fbb6ed$var$PRESSABLE_ATTRIBUTE]: true
        })
    };
}
function $ad6f987c65fbb6ed$var$isHTMLAnchorLink(target) {
    return target.tagName === 'A' && target.hasAttribute('href');
}
function $ad6f987c65fbb6ed$var$isValidKeyboardEvent(event, currentTarget) {
    const { key: key, code: code } = event;
    const element = currentTarget;
    const role = element.getAttribute('role');
    // Accessibility for keyboards. Space and Enter only.
    // "Spacebar" is for IE 11
    return (key === 'Enter' || key === ' ' || key === 'Spacebar' || code === 'Space') && !(element instanceof (0, $gi7Zf.getOwnerWindow)(element).HTMLInputElement && !$ad6f987c65fbb6ed$var$isValidInputKey(element, key) || element instanceof (0, $gi7Zf.getOwnerWindow)(element).HTMLTextAreaElement || element.isContentEditable) && // Links should only trigger with Enter key
    !((role === 'link' || !role && $ad6f987c65fbb6ed$var$isHTMLAnchorLink(element)) && key !== 'Enter');
}
function $ad6f987c65fbb6ed$var$getTouchFromEvent(event) {
    const { targetTouches: targetTouches } = event;
    if (targetTouches.length > 0) return targetTouches[0];
    return null;
}
function $ad6f987c65fbb6ed$var$getTouchById(event, pointerId) {
    const changedTouches = event.changedTouches;
    for(let i = 0; i < changedTouches.length; i++){
        const touch = changedTouches[i];
        if (touch.identifier === pointerId) return touch;
    }
    return null;
}
function $ad6f987c65fbb6ed$var$createTouchEvent(target, e) {
    let clientX = 0;
    let clientY = 0;
    if (e.targetTouches && e.targetTouches.length === 1) {
        clientX = e.targetTouches[0].clientX;
        clientY = e.targetTouches[0].clientY;
    }
    return {
        currentTarget: target,
        shiftKey: e.shiftKey,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        altKey: e.altKey,
        clientX: clientX,
        clientY: clientY
    };
}
function $ad6f987c65fbb6ed$var$createEvent(target, e) {
    let clientX = e.clientX;
    let clientY = e.clientY;
    return {
        currentTarget: target,
        shiftKey: e.shiftKey,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        altKey: e.altKey,
        clientX: clientX,
        clientY: clientY,
        key: e.key
    };
}
function $ad6f987c65fbb6ed$var$getPointClientRect(point) {
    let offsetX = 0;
    let offsetY = 0;
    if (point.width !== undefined) offsetX = point.width / 2;
    else if (point.radiusX !== undefined) offsetX = point.radiusX;
    if (point.height !== undefined) offsetY = point.height / 2;
    else if (point.radiusY !== undefined) offsetY = point.radiusY;
    return {
        top: point.clientY - offsetY,
        right: point.clientX + offsetX,
        bottom: point.clientY + offsetY,
        left: point.clientX - offsetX
    };
}
function $ad6f987c65fbb6ed$var$areRectanglesOverlapping(a, b) {
    // check if they cannot overlap on x axis
    if (a.left > b.right || b.left > a.right) return false;
    // check if they cannot overlap on y axis
    if (a.top > b.bottom || b.top > a.bottom) return false;
    return true;
}
function $ad6f987c65fbb6ed$var$isOverTarget(point, target) {
    let rect = target.getBoundingClientRect();
    let pointRect = $ad6f987c65fbb6ed$var$getPointClientRect(point);
    return $ad6f987c65fbb6ed$var$areRectanglesOverlapping(rect, pointRect);
}
function $ad6f987c65fbb6ed$var$shouldPreventDefaultUp(target) {
    if (target instanceof HTMLInputElement) return false;
    if (target instanceof HTMLButtonElement) return target.type !== 'submit' && target.type !== 'reset';
    if ($ad6f987c65fbb6ed$var$isHTMLAnchorLink(target)) return false;
    return true;
}
function $ad6f987c65fbb6ed$var$shouldPreventDefaultKeyboard(target, key) {
    // Don't prevent the contextmenu shortcut on mac.
    if ((0, $1FDXt.isMac)() && key === 'Enter') return false;
    if (target instanceof HTMLInputElement) {
        if (key === 'Enter' && (target.type === 'checkbox' || target.type === 'radio')) // Enter on a checkbox or radio should do an implicit form submission, but not toggle the input.
        return false;
        return !$ad6f987c65fbb6ed$var$isValidInputKey(target, key);
    }
    return $ad6f987c65fbb6ed$var$shouldPreventDefaultUp(target);
}
const $ad6f987c65fbb6ed$var$nonTextInputTypes = new Set([
    'checkbox',
    'radio',
    'range',
    'color',
    'file',
    'image',
    'button',
    'submit',
    'reset'
]);
function $ad6f987c65fbb6ed$var$isValidInputKey(target, key) {
    // Only space should toggle checkboxes and radios, not enter.
    return target.type === 'checkbox' || target.type === 'radio' ? key === ' ' : $ad6f987c65fbb6ed$var$nonTextInputTypes.has(target.type);
}

});
parcelRegister("in5DT", function(module, exports) {

$parcel$export(module.exports, "disableTextSelection", function () { return $d5fec073d59d450c$export$16a4697467175487; });
$parcel$export(module.exports, "restoreTextSelection", function () { return $d5fec073d59d450c$export$b0d6fa1ab32e3295; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $gi7Zf = parcelRequire("gi7Zf");

var $1FDXt = parcelRequire("1FDXt");

var $ic9IB = parcelRequire("ic9IB");
// Note that state only matters here for iOS. Non-iOS gets user-select: none applied to the target element
// rather than at the document level so we just need to apply/remove user-select: none for each pressed element individually
let $d5fec073d59d450c$var$state = 'default';
let $d5fec073d59d450c$var$savedUserSelect = '';
let $d5fec073d59d450c$var$modifiedElementMap = new WeakMap();
function $d5fec073d59d450c$export$16a4697467175487(target) {
    if ((0, $1FDXt.isIOS)() && (0, $1FDXt.isWebKit)()) {
        if ($d5fec073d59d450c$var$state === 'default') {
            const documentObject = (0, $gi7Zf.getOwnerDocument)(target);
            $d5fec073d59d450c$var$savedUserSelect = documentObject.documentElement.style.webkitUserSelect;
            documentObject.documentElement.style.webkitUserSelect = 'none';
        }
        $d5fec073d59d450c$var$state = 'disabled';
    } else if (target instanceof HTMLElement || target instanceof SVGElement) {
        // If not iOS, store the target's original user-select and change to user-select: none
        // Ignore state since it doesn't apply for non iOS
        let style = target.style;
        let property = 'userSelect' in style ? 'userSelect' : 'webkitUserSelect';
        $d5fec073d59d450c$var$modifiedElementMap.set(target, style[property] ?? '');
        style[property] = 'none';
    }
}
function $d5fec073d59d450c$export$b0d6fa1ab32e3295(target) {
    if ((0, $1FDXt.isIOS)() && (0, $1FDXt.isWebKit)()) {
        // If the state is already default, there's nothing to do.
        // If it is restoring, then there's no need to queue a second restore.
        if ($d5fec073d59d450c$var$state !== 'disabled') return;
        $d5fec073d59d450c$var$state = 'restoring';
        // There appears to be a delay on iOS where selection still might occur
        // after pointer up, so wait a bit before removing user-select.
        setTimeout(()=>{
            // Wait for any CSS transitions to complete so we don't recompute style
            // for the whole page in the middle of the animation and cause jank.
            (0, $ic9IB.runAfterTransition)(()=>{
                // Avoid race conditions
                if ($d5fec073d59d450c$var$state === 'restoring') {
                    const documentObject = (0, $gi7Zf.getOwnerDocument)(target);
                    if (documentObject.documentElement.style.webkitUserSelect === 'none') documentObject.documentElement.style.webkitUserSelect = $d5fec073d59d450c$var$savedUserSelect || '';
                    $d5fec073d59d450c$var$savedUserSelect = '';
                    $d5fec073d59d450c$var$state = 'default';
                }
            });
        }, 300);
    } else if (target instanceof HTMLElement || target instanceof SVGElement) // If not iOS, restore the target's original user-select if any
    // Ignore state since it doesn't apply for non iOS
    {
        if (target && $d5fec073d59d450c$var$modifiedElementMap.has(target)) {
            let targetOldUserSelect = $d5fec073d59d450c$var$modifiedElementMap.get(target);
            let style = target.style;
            let property = 'userSelect' in style ? 'userSelect' : 'webkitUserSelect';
            if (style[property] === 'none') style[property] = targetOldUserSelect;
            if (target.getAttribute('style') === '') target.removeAttribute('style');
            $d5fec073d59d450c$var$modifiedElementMap.delete(target);
        }
    }
}

});

parcelRegister("2HYad", function(module, exports) {

$parcel$export(module.exports, "getNonce", function () { return $1f8e442c3858c621$export$2b85b721e524d74b; });
/*
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $8favh = parcelRequire("8favh");

var $gi7Zf = parcelRequire("gi7Zf");
let $1f8e442c3858c621$var$nonceCache = new WeakMap();
function $1f8e442c3858c621$export$88b319273f3705b4() {
    $1f8e442c3858c621$var$nonceCache = new WeakMap();
}
function $1f8e442c3858c621$export$2b85b721e524d74b(doc) {
    let ownerDocument = (0, $gi7Zf.getOwnerDocument)(doc);
    let nonce = $1f8e442c3858c621$var$nonceCache.get(ownerDocument);
    nonce ??= (0, $8favh.getMetaValue)('csp-nonce', ownerDocument);
    if (nonce !== undefined) $1f8e442c3858c621$var$nonceCache.set(ownerDocument, nonce);
    return nonce;
}

});
parcelRegister("8favh", function(module, exports) {

$parcel$export(module.exports, "getMetaValue", function () { return $6007df3b9c6ef202$export$a929f3f93e2cc67e; });
/*
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $gi7Zf = parcelRequire("gi7Zf");
function $6007df3b9c6ef202$export$a929f3f93e2cc67e(key, doc) {
    let ownerWindow = (0, $gi7Zf.getOwnerWindow)(doc);
    let ownerDocument = (0, $gi7Zf.getOwnerDocument)(doc);
    if (ownerDocument == null || ownerWindow == null) return;
    let content = undefined;
    let selector = `meta[name="${CSS.escape(key)}"], meta[property="${CSS.escape(key)}"]`;
    let meta = ownerDocument.querySelector(selector);
    if (meta && meta instanceof ownerWindow.HTMLMetaElement) {
        if (key === 'csp-nonce' && meta.nonce) content ??= meta.nonce || undefined;
        if (meta.content) content ??= meta.content || undefined;
    }
    if (key === 'csp-nonce') content ??= ownerWindow.__webpack_nonce__ || globalThis.__webpack_nonce__ || undefined;
    return content;
}

});


parcelRegister("fpC5Z", function(module, exports) {

$parcel$export(module.exports, "PressResponderContext", function () { return $b386bdce3a6b1ef7$export$5165eccb35aaadb5; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
const $b386bdce3a6b1ef7$export$5165eccb35aaadb5 = (0, $l0gtI$createContext)({
    register: ()=>{}
});

});

parcelRegister("czX2l", function(module, exports) {

$parcel$export(module.exports, "useEffectEvent", function () { return $92868c674b814c19$export$7f54fc3180508a52; });
/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /**
 * A stable event callback. Solid setup runs once: pass a closure that reads live
 * props, or a getter for a replaceable callback as the second argument.
 * Callback lookup happens at dispatch, without subscribing the caller.
 */ 
function $92868c674b814c19$export$7f54fc3180508a52(fn, getCallback) {
    return (...args)=>(0, $l0gtI$untrack)(()=>(getCallback ? getCallback() : fn)?.(...args));
}

});

parcelRegister("khgX3", function(module, exports) {

$parcel$export(module.exports, "useGlobalListeners", function () { return $ec328b5e0c286686$export$4eaf04e54aa8eed6; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
function $ec328b5e0c286686$export$4eaf04e54aa8eed6() {
    let globalListeners = {
        current: new Map()
    };
    let addGlobalListener = (eventTarget, type, listener, options)=>{
        // Make sure we remove the listener after it is called with the `once` option.
        let fn = options?.once ? (...args)=>{
            globalListeners.current.delete(listener);
            listener(...args);
        } : listener;
        globalListeners.current.set(listener, {
            type: type,
            eventTarget: eventTarget,
            fn: fn,
            options: options
        });
        eventTarget.addEventListener(type, fn, options);
    };
    let removeGlobalListener = (eventTarget, type, listener, options)=>{
        let fn = globalListeners.current.get(listener)?.fn || listener;
        eventTarget.removeEventListener(type, fn, options);
        globalListeners.current.delete(listener);
    };
    let removeAllGlobalListeners = ()=>{
        globalListeners.current.forEach((value, key)=>{
            removeGlobalListener(value.eventTarget, value.type, key, value.options);
        });
    };
    (0, $l0gtI$onCleanup)(removeAllGlobalListeners);
    return {
        addGlobalListener: addGlobalListener,
        removeGlobalListener: removeGlobalListener,
        removeAllGlobalListeners: removeAllGlobalListeners
    };
}

});



parcelRegister("2A4az", function(module, exports) {

$parcel$export(module.exports, "DEFAULT_SLOT", function () { return $1e122d8834d59736$export$c62b8e45d58ddad9; });
$parcel$export(module.exports, "Provider", function () { return $1e122d8834d59736$export$2881499e37b75b9a; });
$parcel$export(module.exports, "useRenderProps", function () { return $1e122d8834d59736$export$4d86445c2cf5e3; });
$parcel$export(module.exports, "composeRenderProps", function () { return $1e122d8834d59736$export$c245e6201fed2f75; });
$parcel$export(module.exports, "useSlottedContext", function () { return $1e122d8834d59736$export$fabf2dc03a41866e; });
$parcel$export(module.exports, "useContextProps", function () { return $1e122d8834d59736$export$29f1550f4b0d4415; });
$parcel$export(module.exports, "useSlot", function () { return $1e122d8834d59736$export$9d4c57ee4c6ffdd8; });
$parcel$export(module.exports, "dom", function () { return $1e122d8834d59736$export$df3a06d6289f983e; });

parcelRequire("2iotZ");
var $7boJ2 = parcelRequire("7boJ2");

var $hp4AJ = parcelRequire("hp4AJ");


var $6p9dH = parcelRequire("6p9dH");
const $1e122d8834d59736$export$c62b8e45d58ddad9 = Symbol('default');
function $1e122d8834d59736$export$2881499e37b75b9a(props) {
    function nest(index) {
        if (index < 0) return props.children;
        let [Context, value] = props.values[index];
        // Each tuple associates its own Context<T> and T; indexing a heterogeneous
        // tuple union loses that association in TypeScript (also present upstream).
        // @ts-expect-error correlated provider/value tuple
        return (0, $l0gtI$createComponent)(Context, {
            value: value,
            get children () {
                return nest(index - 1);
            }
        });
    }
    return nest(props.values.length - 1);
}
function $1e122d8834d59736$export$4d86445c2cf5e3(props) {
    return {
        get className () {
            let value = props.className;
            return (typeof value === 'function' ? value({
                ...props.values,
                defaultClassName: props.defaultClassName
            }) : value) ?? props.defaultClassName;
        },
        get style () {
            let value = props.style;
            let computed = typeof value === 'function' ? value({
                ...props.values,
                defaultStyle: props.defaultStyle || {}
            }) : value;
            return computed || props.defaultStyle ? {
                ...props.defaultStyle,
                ...computed
            } : undefined;
        },
        get children () {
            // Resolve content here, under the consuming provider/row owner, never in an outer memo.
            let value = props.children;
            return (typeof value === 'function' ? value((0, $l0gtI$merge)(props.values, {
                get defaultChildren () {
                    return props.defaultChildren;
                }
            })) : value) ?? props.defaultChildren;
        },
        'data-rac': '',
        get render () {
            return props.render ? (domProps)=>props.render(domProps, props.values) : undefined;
        }
    };
}
function $1e122d8834d59736$export$c245e6201fed2f75(// https://stackoverflow.com/questions/60898079/typescript-type-t-or-function-t-usage
value, wrap) {
    return (renderProps)=>wrap(typeof value === 'function' ? value(renderProps) : value, renderProps);
}
function $1e122d8834d59736$export$fabf2dc03a41866e(context, slot) {
    let ctx = (0, $l0gtI$useContext)(context);
    return $1e122d8834d59736$var$selectSlot(ctx, slot);
}
function $1e122d8834d59736$var$selectSlot(ctx, slot) {
    if (slot === null) // An explicit `null` slot means don't use context.
    return null;
    if (ctx && typeof ctx === 'object' && 'slots' in ctx && ctx.slots) {
        let slotKey = slot || $1e122d8834d59736$export$c62b8e45d58ddad9;
        if (!ctx.slots[slotKey]) {
            let availableSlots = new Intl.ListFormat().format(Object.keys(ctx.slots).map((p)=>`"${p}"`));
            let errorMessage = slot ? `Invalid slot "${slot}".` : 'A slot prop is required.';
            throw new Error(`${errorMessage} Valid slot names are ${availableSlots}.`);
        }
        return ctx.slots[slotKey];
    }
    // @ts-ignore
    return ctx;
}
function $1e122d8834d59736$export$29f1550f4b0d4415(props, ref, context) {
    let ctx = $1e122d8834d59736$export$fabf2dc03a41866e(context, props.slot) || {};
    let contextProps = (0, $l0gtI$omit)(ctx, 'ref');
    let mergedRef = (0, $hp4AJ.mergeRefs)(ref, ctx.ref);
    let mergedProps = (0, $7boJ2.mergeProps)(contextProps, props);
    let styleOverride = {};
    if ('style' in contextProps && contextProps.style && 'style' in props && props.style) {
        if (typeof contextProps.style === 'function' || typeof props.style === 'function') styleOverride.style = (renderProps)=>{
            let contextStyle = typeof contextProps.style === 'function' ? contextProps.style(renderProps) : contextProps.style;
            let defaultStyle = {
                ...renderProps.defaultStyle,
                ...contextStyle
            };
            let style = typeof props.style === 'function' ? props.style({
                ...renderProps,
                defaultStyle: defaultStyle
            }) : props.style;
            return {
                ...defaultStyle,
                ...style
            };
        };
        else Object.defineProperty(styleOverride, 'style', {
            enumerable: true,
            get: ()=>({
                    ...contextProps.style,
                    ...props.style
                })
        });
    }
    let finalProps = (0, $l0gtI$merge)(mergedProps, styleOverride);
    return [
        finalProps,
        mergedRef
    ];
}
function $1e122d8834d59736$export$9d4c57ee4c6ffdd8(initialState = true) {
    // Initial state is typically based on the parent having an aria-label or aria-labelledby.
    // If it does, this value should be false so that we don't update the state and cause a rerender when we go through the layoutEffect
    let [hasSlot, setHasSlot] = (0, $l0gtI$createSignal)(typeof initialState === 'function' ? initialState() : initialState);
    let hasRun = false;
    // A callback ref which will run when the slotted element mounts.
    // This should happen before the useLayoutEffect below.
    let ref = (el)=>{
        hasRun = true;
        setHasSlot(!!el);
    };
    // If the callback hasn't been called, then reset to false.
    (0, $l0gtI$onSettled)(()=>{
        if (!hasRun) setHasSlot(false);
    });
    return [
        ref,
        hasSlot
    ];
}
function $1e122d8834d59736$export$ef03459518577ad4(props) {
    return (0, $l0gtI$omit)(props, (key)=>key === (0, $l0gtI$$PROXY) || typeof key === 'string' && key.startsWith('data-'));
}
function $1e122d8834d59736$var$DOMElement(ElementType, props, forwardedRef) {
    let deliveredRef;
    let ref = (0, $6p9dH.useObjectRef)((node)=>{
        // Native attachment is synchronous: source slot refs must run before onSettled.
        // A's attachment bridge owns this callback's cleanup and isolates its reads.
        deliveredRef = props.ref;
        return (0, $6p9dH.attachRef)([
            forwardedRef,
            deliveredRef
        ], node);
    });
    (0, $l0gtI$createEffect)(()=>props.ref, (targetRef)=>{
        let node = (0, $l0gtI$untrack)(()=>ref.current);
        if (node && targetRef !== deliveredRef) {
            ref(null);
            ref(node);
        }
    });
    // RC13 supports native listener options through addEventListener, not *Capture JSX props.
    (0, $l0gtI$createEffect)(()=>({
            node: ref.current,
            captures: Object.keys(props).filter((key)=>/^on[A-Z].*Capture$/.test(key)).map((key)=>[
                    key,
                    props[key]
                ])
        }), ({ node: node, captures: captures })=>{
        if (!node) return;
        let cleanups = captures.map(([key, handler])=>{
            if (!handler) return ()=>{};
            let eventName = key.slice(2, -7).toLowerCase();
            const listener = (event)=>{
                if (Array.isArray(handler)) handler[0](handler[1], event);
                else handler(event);
            };
            node.addEventListener(eventName, listener, true);
            return ()=>node.removeEventListener(eventName, listener, true);
        });
        return ()=>{
            for (let cleanup of cleanups)cleanup();
        };
    });
    (0, $l0gtI$onSettled)(()=>{
        // One-time custom-host conformance observation after attachment.
        let element = (0, $l0gtI$untrack)(()=>ref.current);
    });
    let domProps = (0, $l0gtI$merge)((0, $l0gtI$omit)(props, (key)=>key === 'render' || key === 'ref' || key === 'className' || key === 'htmlFor' || /^on[A-Z].*Capture$/.test(String(key))), {
        ref: ref,
        get class () {
            return props.className;
        },
        get for () {
            return props.htmlFor ?? props.for;
        }
    });
    const CustomRender = (hostProps)=>props.render(hostProps, undefined);
    const Host = (0, $l0gtI$dynamic)(()=>props.render ? CustomRender : ElementType);
    return (0, $l0gtI$createComponent)(Host, domProps);
}
const $1e122d8834d59736$var$domComponentCache = {};
const $1e122d8834d59736$export$df3a06d6289f983e = new Proxy({}, {
    get (target, elementType) {
        if (typeof elementType !== 'string') return undefined;
        let res = $1e122d8834d59736$var$domComponentCache[elementType];
        if (!res) {
            res = (props)=>$1e122d8834d59736$var$DOMElement(elementType, props, undefined);
            $1e122d8834d59736$var$domComponentCache[elementType] = res;
        }
        return res;
    }
});

});
parcelRegister("2iotZ", function(module, exports) {

$parcel$export(module.exports, "mergeProps", function () { return (parcelRequire("7boJ2")).mergeProps; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $7boJ2 = parcelRequire("7boJ2");

});


parcelRegister("bAtJj", function(module, exports) {

$parcel$export(module.exports, "filterDOMProps", function () { return (parcelRequire("5gAIA")).filterDOMProps; });

var $5gAIA = parcelRequire("5gAIA");

});

parcelRegister("9HiNI", function(module, exports) {

$parcel$export(module.exports, "useFocusRing", function () { return $70f6b6a5a3f2c89d$export$4e328f61c538687f; });

var $es0xi = parcelRequire("es0xi");


var $8uTEk = parcelRequire("8uTEk");

var $6aWCa = parcelRequire("6aWCa");
function $70f6b6a5a3f2c89d$export$4e328f61c538687f(props = {}) {
    let state = {
        current: {
            isFocused: false,
            isFocusVisible: props.autoFocus || (0, $es0xi.isFocusVisible)()
        }
    };
    let [isFocused, setFocused] = (0, $l0gtI$createSignal)(false);
    let [isFocusVisibleState, setFocusVisible] = (0, $l0gtI$createSignal)(false);
    let updateState = ()=>setFocusVisible(state.current.isFocused && state.current.isFocusVisible);
    let onFocusChange = (isFocused)=>{
        state.current.isFocused = isFocused;
        state.current.isFocusVisible = (0, $es0xi.isFocusVisible)();
        setFocused(isFocused);
        updateState();
    };
    (0, $es0xi.useFocusVisibleListener)((isFocusVisible)=>{
        state.current.isFocusVisible = isFocusVisible;
        updateState();
    }, [], {
        get enabled () {
            return isFocused();
        },
        get isTextInput () {
            return props.isTextInput;
        }
    });
    let { focusProps: focusProps } = (0, $8uTEk.useFocus)({
        get isDisabled () {
            return props.within;
        },
        onFocusChange: onFocusChange
    });
    let { focusWithinProps: focusWithinProps } = (0, $6aWCa.useFocusWithin)({
        get isDisabled () {
            return !props.within;
        },
        onFocusWithinChange: onFocusChange
    });
    return {
        isFocused: isFocused,
        isFocusVisible: isFocusVisibleState,
        focusProps: {
            get onFocusIn () {
                return (props.within ? focusWithinProps : focusProps).onFocusIn;
            },
            get onFocusOut () {
                return (props.within ? focusWithinProps : focusProps).onFocusOut;
            }
        }
    };
}

});
parcelRegister("6aWCa", function(module, exports) {

$parcel$export(module.exports, "useFocusWithin", function () { return $47f124e288537ad6$export$420e68273165f4ec; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // Portions of the code in this file are based on code from react.
// Original licensing for the following can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/facebook/react/tree/cc7c1aece46a6b69b41958d731e0fd27c94bfc6c/packages/react-interactions

var $34B6C = parcelRequire("34B6C");

var $ed1Px = parcelRequire("ed1Px");

var $gi7Zf = parcelRequire("gi7Zf");

var $khgX3 = parcelRequire("khgX3");
function $47f124e288537ad6$export$420e68273165f4ec(props) {
    let state = {
        current: {
            isFocusWithin: false
        }
    };
    let { addGlobalListener: addGlobalListener, removeAllGlobalListeners: removeAllGlobalListeners } = (0, $khgX3.useGlobalListeners)();
    let onBlur = (e)=>{
        // Ignore events bubbling through portals.
        if (!(0, $ed1Px.nodeContains)(e.currentTarget, (0, $ed1Px.getEventTarget)(e))) return;
        // We don't want to trigger onBlurWithin and then immediately onFocusWithin again
        // when moving focus inside the element. Only trigger if the currentTarget doesn't
        // include the relatedTarget (where focus is moving).
        if (state.current.isFocusWithin && !(0, $ed1Px.nodeContains)(e.currentTarget, e.relatedTarget)) {
            state.current.isFocusWithin = false;
            removeAllGlobalListeners();
            if (props.onBlurWithin) props.onBlurWithin(e);
            if (props.onFocusWithinChange) props.onFocusWithinChange(false);
        }
    };
    let onSyntheticFocus = (0, $34B6C.useSyntheticBlurEvent)(onBlur);
    let onFocus = (e)=>{
        // Ignore events bubbling through portals.
        if (!(0, $ed1Px.nodeContains)(e.currentTarget, (0, $ed1Px.getEventTarget)(e))) return;
        // Double check that document.activeElement actually matches e.target in case a previously chained
        // focus handler already moved focus somewhere else.
        let eventTarget = (0, $ed1Px.getEventTarget)(e);
        const ownerDocument = (0, $gi7Zf.getOwnerDocument)(eventTarget);
        const activeElement = (0, $ed1Px.getActiveElement)(ownerDocument);
        if (!state.current.isFocusWithin && activeElement === eventTarget) {
            if (props.onFocusWithin) props.onFocusWithin(e);
            if (props.onFocusWithinChange) props.onFocusWithinChange(true);
            state.current.isFocusWithin = true;
            onSyntheticFocus(e);
            // Browsers don't fire blur events when elements are removed from the DOM.
            // However, if a focus event occurs outside the element we're tracking, we
            // can manually fire onBlur.
            let currentTarget = e.currentTarget;
            addGlobalListener(ownerDocument, 'focus', (e)=>{
                let eventTarget = (0, $ed1Px.getEventTarget)(e);
                if (state.current.isFocusWithin && !(0, $ed1Px.nodeContains)(currentTarget, eventTarget)) {
                    let nativeEvent = new ownerDocument.defaultView.FocusEvent('blur', {
                        relatedTarget: eventTarget
                    });
                    (0, $34B6C.setEventTarget)(nativeEvent, currentTarget);
                    let event = (0, $34B6C.createSyntheticEvent)(nativeEvent);
                    onBlur(event);
                }
            }, {
                capture: true
            });
        }
    };
    let focusIn = (e)=>onFocus((0, $34B6C.createSyntheticEvent)(e));
    let focusOut = (e)=>{
        if ((0, $ed1Px.getEventTarget)(e).disabled) return;
        onBlur((0, $34B6C.createSyntheticEvent)(e));
    };
    return {
        focusWithinProps: {
            get onFocusIn () {
                return props.isDisabled ? undefined : focusIn;
            },
            get onFocusOut () {
                return props.isDisabled ? undefined : focusOut;
            }
        }
    };
}

});


parcelRegister("8k5ge", function(module, exports) {

$parcel$export(module.exports, "useHover", function () { return $60f445a8cbdb845e$export$ae780daf29e6d456; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $ed1Px = parcelRequire("ed1Px");

var $gi7Zf = parcelRequire("gi7Zf");


var $khgX3 = parcelRequire("khgX3");
// iOS fires onPointerEnter twice: once with pointerType="touch" and again with pointerType="mouse".
// We want to ignore these emulated events so they do not trigger hover behavior.
// See https://bugs.webkit.org/show_bug.cgi?id=214609.
let $60f445a8cbdb845e$var$globalIgnoreEmulatedMouseEvents = false;
let $60f445a8cbdb845e$var$hoverCount = 0;
function $60f445a8cbdb845e$var$setGlobalIgnoreEmulatedMouseEvents() {
    $60f445a8cbdb845e$var$globalIgnoreEmulatedMouseEvents = true;
    // Clear globalIgnoreEmulatedMouseEvents after a short timeout. iOS fires onPointerEnter
    // with pointerType="mouse" immediately after onPointerUp and before onFocus. On other
    // devices that don't have this quirk, we don't want to ignore a mouse hover sometime in
    // the distant future because a user previously touched the element.
    setTimeout(()=>{
        $60f445a8cbdb845e$var$globalIgnoreEmulatedMouseEvents = false;
    }, 500);
}
function $60f445a8cbdb845e$var$handleGlobalPointerEvent(e) {
    if (e.pointerType === 'touch') $60f445a8cbdb845e$var$setGlobalIgnoreEmulatedMouseEvents();
}
function $60f445a8cbdb845e$var$setupGlobalTouchEvents() {
    let ownerDocument = (0, $gi7Zf.getOwnerDocument)(null);
    if (typeof ownerDocument === 'undefined') return;
    if ($60f445a8cbdb845e$var$hoverCount === 0) {
        if (typeof PointerEvent !== 'undefined') ownerDocument.addEventListener('pointerup', $60f445a8cbdb845e$var$handleGlobalPointerEvent);
    }
    $60f445a8cbdb845e$var$hoverCount++;
    return ()=>{
        $60f445a8cbdb845e$var$hoverCount--;
        if ($60f445a8cbdb845e$var$hoverCount > 0) return;
        if (typeof PointerEvent !== 'undefined') ownerDocument.removeEventListener('pointerup', $60f445a8cbdb845e$var$handleGlobalPointerEvent);
    };
}
function $60f445a8cbdb845e$export$ae780daf29e6d456(props) {
    let [isHovered, setHovered] = (0, $l0gtI$createSignal)(false);
    let state = {
        isHovered: false,
        ignoreEmulatedMouseEvents: false,
        pointerType: '',
        target: null
    };
    (0, $l0gtI$onSettled)($60f445a8cbdb845e$var$setupGlobalTouchEvents);
    let { addGlobalListener: addGlobalListener, removeAllGlobalListeners: removeAllGlobalListeners } = (0, $khgX3.useGlobalListeners)();
    let { hoverProps: hoverProps, triggerHoverEnd: triggerHoverEnd } = (()=>{
        let triggerHoverStart = (event, pointerType)=>{
            let { onHoverStart: onHoverStart, onHoverChange: onHoverChange, isDisabled: isDisabled } = props;
            state.pointerType = pointerType;
            if (isDisabled || pointerType === 'touch' || state.isHovered || !(0, $ed1Px.nodeContains)(event.currentTarget, (0, $ed1Px.getEventTarget)(event))) return;
            state.isHovered = true;
            let target = event.currentTarget;
            state.target = target;
            // When an element that is hovered over is removed, no pointerleave event is fired by the browser,
            // even though the originally hovered target may have shrunk in size so it is no longer hovered.
            // However, a pointerover event will be fired on the new target the mouse is over.
            // In Chrome this happens immediately. In Safari and Firefox, it happens upon moving the mouse one pixel.
            addGlobalListener((0, $gi7Zf.getOwnerDocument)((0, $ed1Px.getEventTarget)(event)), 'pointerover', (e)=>{
                if (state.isHovered && state.target && !(0, $ed1Px.nodeContains)(state.target, (0, $ed1Px.getEventTarget)(e))) // oxlint-disable-next-line react/react-compiler
                triggerHoverEnd(e, e.pointerType);
            }, {
                capture: true
            });
            if (onHoverStart) onHoverStart({
                type: 'hoverstart',
                target: target,
                pointerType: pointerType
            });
            if (onHoverChange) onHoverChange(true);
            setHovered(true);
        };
        let triggerHoverEnd = (event, pointerType)=>{
            let { onHoverEnd: onHoverEnd, onHoverChange: onHoverChange } = props;
            let target = state.target;
            state.pointerType = '';
            state.target = null;
            if (pointerType === 'touch' || !state.isHovered || !target) return;
            state.isHovered = false;
            removeAllGlobalListeners();
            if (onHoverEnd) onHoverEnd({
                type: 'hoverend',
                target: target,
                pointerType: pointerType
            });
            if (onHoverChange) onHoverChange(false);
            setHovered(false);
        };
        let hoverProps = {};
        if (typeof PointerEvent !== 'undefined') {
            hoverProps.onPointerOver = (e)=>{
                if (e.relatedTarget && (0, $ed1Px.nodeContains)(e.currentTarget, e.relatedTarget)) return;
                if ($60f445a8cbdb845e$var$globalIgnoreEmulatedMouseEvents && e.pointerType === 'mouse') return;
                triggerHoverStart(e, e.pointerType);
            };
            hoverProps.onPointerOut = (e)=>{
                if (e.relatedTarget && (0, $ed1Px.nodeContains)(e.currentTarget, e.relatedTarget)) return;
                if (!props.isDisabled && (0, $ed1Px.nodeContains)(e.currentTarget, (0, $ed1Px.getEventTarget)(e))) triggerHoverEnd(e, e.pointerType);
            };
        } else var e, e1;
        return {
            hoverProps: hoverProps,
            triggerHoverEnd: triggerHoverEnd
        };
    })();
    (0, $l0gtI$createEffect)(()=>props.isDisabled, (isDisabled)=>{
        // Call the triggerHoverEnd as soon as isDisabled changes to true
        // Safe to call triggerHoverEnd, it will early return if we aren't currently hovering
        if (isDisabled) triggerHoverEnd({
            currentTarget: state.target
        }, state.pointerType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    (0, $l0gtI$onCleanup)(removeAllGlobalListeners);
    return {
        hoverProps: hoverProps,
        isHovered: isHovered
    };
}

});



parcelRegister("esT6z", function(module, exports) {

$parcel$export(module.exports, "useLoadingAnimation", function () { return $a87e6cec5d101a93$export$6b288fe07640c94c; });
$parcel$export(module.exports, "SkeletonContext", function () { return $a87e6cec5d101a93$export$74e166679b1f49ee; });
$parcel$export(module.exports, "useIsSkeleton", function () { return $a87e6cec5d101a93$export$4f8dc7555740235c; });
$parcel$export(module.exports, "loadingStyle", function () { return $a87e6cec5d101a93$export$d2353276f167b21f; });
$parcel$export(module.exports, "useSkeletonText", function () { return $a87e6cec5d101a93$export$a05a0b8a311cd65f; });
$parcel$export(module.exports, "SkeletonWrapper", function () { return $a87e6cec5d101a93$export$6069cbe61f690103; });
$parcel$export(module.exports, "useSkeletonIcon", function () { return $a87e6cec5d101a93$export$4b7803c08fe9a32b; });



var $f8FiF = parcelRequire("f8FiF");

var $cJuZp = parcelRequire("cJuZp");

var $5OYjY = parcelRequire("5OYjY");
var $a87e6cec5d101a93$var$_tmpl$ = /*#__PURE__*/ (0, $l0gtI$template)(`<span>`);
function $a87e6cec5d101a93$export$6b288fe07640c94c(isAnimating) {
    let animationRef = null;
    let [element, setElement] = (0, $l0gtI$createSignal)(null);
    let reduceMotion = (0, $5OYjY.useMediaQuery)('(prefers-reduced-motion: reduce)');
    (0, $l0gtI$createEffect)(()=>({
            element: element(),
            isAnimating: typeof isAnimating === 'function' ? isAnimating() : isAnimating,
            reduceMotion: reduceMotion()
        }), ({ element: element, isAnimating: isAnimating, reduceMotion: reduceMotion })=>{
        if (isAnimating && !animationRef && element && !reduceMotion && typeof element.animate === 'function') {
            // Use web animation API instead of CSS animations so that we can
            // synchronize it between all loading elements on the page (via startTime).
            animationRef = element.animate([
                {
                    backgroundPosition: '100%'
                },
                {
                    backgroundPosition: '0%'
                }
            ], {
                duration: 2000,
                iterations: Infinity,
                easing: 'ease-in-out'
            });
            animationRef.startTime = 0;
        } else if (!isAnimating && animationRef) {
            animationRef.cancel();
            animationRef = null;
        }
    });
    (0, $l0gtI$onCleanup)(()=>animationRef?.cancel());
    return (element)=>{
        setElement(element);
    };
}
const $a87e6cec5d101a93$export$74e166679b1f49ee = (0, $l0gtI$createContext)(null);
function $a87e6cec5d101a93$export$4f8dc7555740235c() {
    return (0, $l0gtI$createMemo)(()=>(0, $l0gtI$useContext)($a87e6cec5d101a93$export$74e166679b1f49ee) || false);
}
function $a87e6cec5d101a93$export$8f31e4c4a37b8e9c(props) {
    // Disable all form components inside a skeleton.
    return (0, $l0gtI$createComponent)($a87e6cec5d101a93$export$74e166679b1f49ee, {
        get value () {
            return props.isLoading;
        },
        get children () {
            return props.children;
        }
    });
}
const $a87e6cec5d101a93$export$d2353276f167b21f = "bNU3Fb"; // add to a separate layer so it overrides default style macro styles
function $a87e6cec5d101a93$export$a05a0b8a311cd65f(children, style) {
    let isSkeleton = $a87e6cec5d101a93$export$4f8dc7555740235c();
    return [
        ()=>isSkeleton() ? (0, $l0gtI$createComponent)($a87e6cec5d101a93$export$cb6ddd830302c2a8, {
                get children () {
                    return children();
                }
            }) : children(),
        ()=>isSkeleton() ? {
                ...style(),
                // This ensures the ellipsis on truncated text is also hidden.
                // -webkit-text-fill-color overrides any `color` property that is also set.
                '-webkit-text-fill-color': 'transparent'
            } : style()
    ];
}
function $a87e6cec5d101a93$export$cb6ddd830302c2a8(props) {
    var _el$ = (0, $l0gtI$getNextElement)($a87e6cec5d101a93$var$_tmpl$);
    var _ref$ = $a87e6cec5d101a93$export$6b288fe07640c94c(true);
    (typeof _ref$ === "function" || Array.isArray(_ref$)) && (0, $l0gtI$ref)(()=>_ref$, _el$);
    (0, $l0gtI$insert)(_el$, (0, $l0gtI$scope)(()=>props.children));
    (0, $l0gtI$effect)(()=>({
            e: (0, $f8FiF.inertValue)(true),
            t: $a87e6cec5d101a93$export$d2353276f167b21f + " pw18 _ma18 oR3ltQc18 nR3ltQc18 kR3ltQc18 jR3ltQc18 -macro-static-2uZMFe"
        }), ({ e: e, t: t }, _p$)=>{
        e !== _p$?.e && (0, $l0gtI$setAttribute)(_el$, "inert", e);
        (0, $l0gtI$className)(_el$, t, _p$?.t);
    });
    return _el$;
}
function $a87e6cec5d101a93$export$6069cbe61f690103(props) {
    let isLoading = (0, $l0gtI$createMemo)(()=>(0, $l0gtI$useContext)($a87e6cec5d101a93$export$74e166679b1f49ee));
    let animation = $a87e6cec5d101a93$export$6b288fe07640c94c(()=>isLoading() || false);
    const overrides = {
        get ref () {
            return isLoading() ? animation : undefined;
        },
        get className () {
            return isLoading() ? $a87e6cec5d101a93$export$d2353276f167b21f : undefined;
        },
        get inert () {
            return isLoading() ? true : undefined;
        }
    };
    return (0, $l0gtI$createComponent)($a87e6cec5d101a93$export$74e166679b1f49ee, {
        value: null,
        get children () {
            return props.children(overrides);
        }
    });
}
// Adds default border radius around icons when displayed in a skeleton.
const $a87e6cec5d101a93$var$skeletonIconStyle = " oR3ltQc18 nR3ltQc18 kR3ltQc18 jR3ltQc18 -macro-static-aBGxE";
function $a87e6cec5d101a93$export$4b7803c08fe9a32b(styles) {
    return (0, $l0gtI$useContext)($a87e6cec5d101a93$export$74e166679b1f49ee) ? (0, $cJuZp.mergeStyles)($a87e6cec5d101a93$var$skeletonIconStyle, styles) : styles || '';
}

});
parcelRegister("f8FiF", function(module, exports) {

$parcel$export(module.exports, "inertValue", function () { return $b057a3b5466fa32b$export$a9d04c5684123369; });
function $b057a3b5466fa32b$export$a9d04c5684123369(value) {
    // Native DOM rendering serializes inert as a boolean attribute: true adds it,
    // false removes it. React-version compatibility is not a native concern.
    return value;
}

});

parcelRegister("cJuZp", function(module, exports) {

$parcel$export(module.exports, "mergeStyles", function () { return $9451b9e2e831d96c$export$e618dc39ac9ad607; });
/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // import {RuntimeStyleFunction, RenderProps} from './types';
// taken from: https://stackoverflow.com/questions/51603250/typescript-3-parameter-list-intersection-type/51604379#51604379
// type ArgTypes<T> = T extends (props: infer V) => any ? NullToObject<V> : never;
// type NullToObject<T> = T extends (null | undefined) ? {} : T;
// type BoxedTupleTypes<T extends any[]> = { [P in keyof T]: [ArgTypes<T[P]>] }[Exclude<keyof T, keyof any[]>];
// type BoxedReturnTypes<T extends any[]> = { [P in keyof T]: [InferReturn<T[P]>] }[Exclude<keyof T, keyof any[]>];
// type UnboxIntersection<T> = T extends { 0: infer U } ? U : never;
// type Arg<X, R> = RuntimeStyleFunction<X, R> | null | undefined;
// type NoInfer<T> = [T, void][T extends any ? 0 : 1];
// type InferReturn<T> = T extends (props: any) => infer R ? NullToObject<R> : never;
// type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
// type InferReturnType<T extends any[]> = UnboxIntersection<UnionToIntersection<BoxedReturnTypes<T>>>;
// Two overloads:
// 1. If a render props type is expected based on the return type, forward that type to all arguments.
// 2. Otherwise, infer the return type based on the arguments.
// export function merge<R extends RenderProps<string> = never, X = {}>(...args: Arg<NoInfer<X>, NoInfer<R>>[]): RuntimeStyleFunction<X, R>;
// export function merge<T extends Arg<any, any>[]>(...args: T): RuntimeStyleFunction<InferReturnType<T>, UnboxIntersection<UnionToIntersection<BoxedTupleTypes<T>>>>;
// export function merge(...args: any[]): RuntimeStyleFunction<any, any> {
//   return (props) => {
//     return mergeStyles(...args.map(f => typeof f === 'function' ? f(props) : null));
//   };
// }
/**
 * Merges multiple style strings together, combining the CSS properties from each.
 * Later styles take precedence over earlier ones for the same property.
 * Useful for composing styles from multiple `style()` macro calls.
 *
 * @example
 *   import {mergeStyles} from '@react-spectrum/s2';
 *   import {style} from '@react-spectrum/s2/style' with {type: 'macro'};
 *
 *   const baseStyles = style({padding: 8});
 *   const overrideStyles = style({padding: 16, color: 'heading'});
 *   const merged = mergeStyles(baseStyles, overrideStyles);
 *   // merged has `padding: 16` and `color: heading`.
 */ function $9451b9e2e831d96c$export$e618dc39ac9ad607(...styles) {
    let definedStyles = styles.filter(Boolean);
    if (definedStyles.length === 1) {
        let first = definedStyles[0];
        if (typeof first !== 'string') // static macro has a toString method so that we generate the style macro map for the entry
        // it's automatically called in other places, but for our merging, we have to call it ourselves
        return first.toString();
        return first;
    }
    let map = new Map();
    for (let style of definedStyles){
        // must call toString here for the static macro
        let str = style.toString();
        for (let [k, v] of $9451b9e2e831d96c$var$parse(str))map.set(k, v);
    }
    let res = '';
    for (let value of map.values())res += value;
    return res;
}
function $9451b9e2e831d96c$var$parse(s) {
    let properties = new Map();
    let i = 0;
    while(i < s.length){
        while(i < s.length && s[i] === ' ')i++;
        let start = i;
        readValue(); // property index
        // read conditions (up to the last segment)
        let condition = i;
        while(i < s.length && s[i] !== ' ')readValue();
        let property = s.slice(start, condition);
        properties.set(property, (properties.get(property) || '') + ' ' + s.slice(start, i));
    }
    function readValue() {
        if (s[i] === '-') // the beginning and end of arbitrary values are marked with -
        while(i < s.length && s[i] !== ' '){
            i++;
            if (s[i] === '-') {
                i++;
                break;
            }
        }
        else {
            while(i < s.length)if (s[i] === '_') i++;
            else {
                i++;
                break;
            }
        }
    }
    return properties;
}

});

parcelRegister("5OYjY", function(module, exports) {

$parcel$export(module.exports, "useMediaQuery", function () { return $43d069cb2f8e0f47$export$32d5543ab307c01; });
/*
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
parcelRequire("iI6XF");
var $aPfEU = parcelRequire("aPfEU");
function $43d069cb2f8e0f47$export$32d5543ab307c01(query) {
    let supportsMatchMedia = typeof window !== 'undefined' && typeof window.matchMedia === 'function';
    let [matches, setMatches] = (0, $l0gtI$createSignal)(supportsMatchMedia ? window.matchMedia(query).matches : false);
    (0, $l0gtI$createEffect)(()=>query, (query)=>{
        if (!supportsMatchMedia) return;
        let mq = window.matchMedia(query);
        let onChange = (evt)=>{
            setMatches(evt.matches);
        };
        mq.addListener(onChange);
        return ()=>{
            mq.removeListener(onChange);
        };
    });
    // If in SSR, the media query should never match. Once the page hydrates,
    // this will update and the real value will be returned.
    let isSSR = (0, $aPfEU.useIsSSR)();
    return ()=>isSSR() ? false : matches();
}

});
parcelRegister("iI6XF", function(module, exports) {

$parcel$export(module.exports, "useIsSSR", function () { return (parcelRequire("aPfEU")).useIsSSR; });
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
var $aPfEU = parcelRequire("aPfEU");

});



parcelRegister("eXdQ3", function(module, exports) {

$parcel$export(module.exports, "useDOMRef", function () { return $ae314f6cf80336a8$export$c2c55ef9111cafd8; });
$parcel$export(module.exports, "useFocusableRef", function () { return $ae314f6cf80336a8$export$96a734597687c040; });
/*
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 

var $6p9dH = parcelRequire("6p9dH");
function $ae314f6cf80336a8$export$a5795cc979dfae80(ref) {
    return {
        UNSAFE_getDOMNode () {
            return ref.current;
        }
    };
}
function $ae314f6cf80336a8$export$79d69eee6ae4b329(domRef, focusableRef) {
    let resolvedFocusableRef = focusableRef || domRef;
    return {
        ...$ae314f6cf80336a8$export$a5795cc979dfae80(domRef),
        focus () {
            if (resolvedFocusableRef.current) resolvedFocusableRef.current.focus();
        }
    };
}
function $ae314f6cf80336a8$export$c2c55ef9111cafd8(ref) {
    let domRef = (0, $6p9dH.useObjectRef)();
    (0, $l0gtI$onSettled)(()=>(0, $6p9dH.attachRef)(typeof ref === 'function' ? ref : undefined, $ae314f6cf80336a8$export$a5795cc979dfae80(domRef)));
    return domRef;
}
function $ae314f6cf80336a8$export$96a734597687c040(ref, focusableRef) {
    let domRef = (0, $6p9dH.useObjectRef)();
    (0, $l0gtI$onSettled)(()=>(0, $6p9dH.attachRef)(typeof ref === 'function' ? ref : undefined, $ae314f6cf80336a8$export$79d69eee6ae4b329(domRef, focusableRef)));
    return domRef;
}
function $ae314f6cf80336a8$export$c7e28c72a4823176(ref) {
    return {
        get current () {
            return ref.current && ref.current.UNSAFE_getDOMNode();
        }
    };
}
function $ae314f6cf80336a8$export$1d5cc31d9d8df817(ref) {
    return $ae314f6cf80336a8$export$c7e28c72a4823176(ref);
}

});

parcelRegister("1NDEx", function(module, exports) {

$parcel$export(module.exports, "useSpectrumContextProps", function () { return $14f920461cb26c44$export$764f6146fadd77f7; });
/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 

var $2A4az = parcelRequire("2A4az");
parcelRequire("2iotZ");
var $7boJ2 = parcelRequire("7boJ2");

var $hp4AJ = parcelRequire("hp4AJ");

var $cJuZp = parcelRequire("cJuZp");

var $6p9dH = parcelRequire("6p9dH");
function $14f920461cb26c44$export$764f6146fadd77f7(props, ref, context) {
    let ctx = (0, $l0gtI$createMemo)(()=>(0, $2A4az.useSlottedContext)(context, props.slot) || {});
    let contextProps = new Proxy({}, {
        ownKeys: ()=>Reflect.ownKeys(ctx()).filter((key)=>key !== 'ref'),
        has: (_, key)=>key !== 'ref' && key in ctx(),
        getOwnPropertyDescriptor: (_, key)=>key !== 'ref' && key in ctx() ? {
                enumerable: true,
                configurable: true
            } : undefined,
        get: (_, key)=>key === 'ref' ? undefined : Reflect.get(ctx(), key)
    });
    let mergedRef = (0, $6p9dH.useObjectRef)((0, $hp4AJ.mergeRefs)(ref, (value)=>{
        let contextRef = ctx().ref;
        return (0, $6p9dH.attachRef)(typeof contextRef === 'function' ? contextRef : undefined, value);
    }));
    let mergedProps = (0, $7boJ2.mergeProps)(contextProps, props);
    // mergeProps does not merge `UNSAFE_style`
    let result = new Proxy(mergedProps, {
        get (target, key) {
            if (key === 'UNSAFE_style' && 'UNSAFE_style' in contextProps && contextProps.UNSAFE_style && 'UNSAFE_style' in props && props.UNSAFE_style) return {
                ...contextProps.UNSAFE_style,
                ...props.UNSAFE_style
            };
            if (key === 'styles' && 'styles' in contextProps && contextProps.styles && 'styles' in props && props.styles) return (0, $cJuZp.mergeStyles)(contextProps.styles, props.styles);
            return Reflect.get(target, key);
        }
    });
    return [
        result,
        mergedRef
    ];
}

});



parcelRequire("lB2Ba");
var $gSanO = parcelRequire("gSanO");

var $esT6z = parcelRequire("esT6z");

var $eXdQ3 = parcelRequire("eXdQ3");

var $1NDEx = parcelRequire("1NDEx");
const $a425f36c3a133025$export$e2509388b49734e7 = (0, $l0gtI$createContext)(null);
const $a425f36c3a133025$var$link = function anonymous(props, overrides) {
    let rules = " ", currentRules = {};
    rules += (String(overrides || '').match(/(?:^|\s)(J|G|I|H|_u|_v|_s|__A|_d|_J|z|y|B|A|_P|_9|W|_l|_A|_z|_6|Z|N|L|-macro\$)[^\s]+/g) || []).join('');
    if (props.isFocusVisible) {
        rules += ' _Lf18';
        currentRules["outlineStyle"] = typeof currentRules["outlineStyle"] === 'object' ? currentRules["outlineStyle"] : {
            "default": currentRules["outlineStyle"]
        };
        currentRules["outlineStyle"]["isFocusVisible"] = "solid";
    } else {
        rules += ' _Le18';
        currentRules["outlineStyle"] = "none";
    }
    if (props.isStaticColor) {
        rules += ' Oe18';
        currentRules["outlineColor"] = typeof currentRules["outlineColor"] === 'object' ? currentRules["outlineColor"] : {
            "default": currentRules["outlineColor"]
        };
        currentRules["outlineColor"]["isStaticColor"] = "transparent-overlay-1000";
    } else {
        rules += ' Oh18';
        currentRules["outlineColor"] = "focus-ring";
    }
    rules += ' OlOVIhfcebS7sd18';
    currentRules["outlineColor"] = typeof currentRules["outlineColor"] === 'object' ? currentRules["outlineColor"] : {
        "default": currentRules["outlineColor"]
    };
    currentRules["outlineColor"]["forcedColors"] = "Highlight";
    rules += ' OlOVIhfcebS7sd18';
    currentRules["outlineColor"] = typeof currentRules["outlineColor"] === 'object' ? currentRules["outlineColor"] : {
        "default": currentRules["outlineColor"]
    };
    currentRules["outlineColor"][":is([data-hcm], [data-hcm] *)"] = "Highlight";
    rules += ' _Mc18';
    currentRules["outlineWidth"] = 2;
    rules += ' _Kd18';
    currentRules["outlineOffset"] = 2;
    if (props.staticColor === "white") {
        rules += ' -Ovbhqd-gcwrnr18';
        currentRules["--s2-container-bg"] = typeof currentRules["--s2-container-bg"] === 'object' ? currentRules["--s2-container-bg"] : {
            "default": currentRules["--s2-container-bg"]
        };
        currentRules["--s2-container-bg"]["staticColor === \"white\""] = "black";
    } else if (props.staticColor === "black") {
        rules += ' -Ovbhqd-g4hn3s18';
        currentRules["--s2-container-bg"] = typeof currentRules["--s2-container-bg"] === 'object' ? currentRules["--s2-container-bg"] : {
            "default": currentRules["--s2-container-bg"]
        };
        currentRules["--s2-container-bg"]["staticColor === \"black\""] = "white";
    }
    rules += ' oR3ltQc18';
    currentRules["borderTopStartRadius"] = "sm";
    rules += ' nR3ltQc18';
    currentRules["borderTopEndRadius"] = "sm";
    rules += ' kR3ltQc18';
    currentRules["borderBottomStartRadius"] = "sm";
    rules += ' jR3ltQc18';
    currentRules["borderBottomEndRadius"] = "sm";
    if (props.isStandalone) {
        rules += ' uk18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["isStandalone"] = "sans";
        rules += ' ucJ9TBTb18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["isStandalone && :lang(ar)"] = "sans";
        rules += ' ud3Euai18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["isStandalone && :lang(he)"] = "sans";
        rules += ' uea18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["isStandalone && :lang(ja)"] = "sans";
        rules += ' ugb18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["isStandalone && :lang(ko)"] = "sans";
        rules += ' uhd18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["isStandalone && :lang(zh)"] = "sans";
        rules += ' uje18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["isStandalone && :lang(zh-hant)"] = "sans";
        rules += ' u2NhKxcl18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["isStandalone && :lang(zh-HK)"] = "sans";
        rules += ' uic18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["isStandalone && :lang(zh-Hans, zh-CN, zh-SG)"] = "sans";
    }
    if (props.isStandalone) {
        rules += ' -_6BNtrc-c18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["isStandalone"] = "ui";
        rules += ' vFHT6Dd18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["isStandalone"] = "ui";
    }
    if (props.isStandalone) {
        rules += ' xc18';
        currentRules["fontWeight"] = typeof currentRules["fontWeight"] === 'object' ? currentRules["fontWeight"] : {
            "default": currentRules["fontWeight"]
        };
        currentRules["fontWeight"]["isStandalone"] = "medium";
        rules += ' _xa18';
        currentRules["fontWeight"] = typeof currentRules["fontWeight"] === 'object' ? currentRules["fontWeight"] : {
            "default": currentRules["fontWeight"]
        };
        currentRules["fontWeight"]["isStandalone"] = "medium";
    }
    if (props.isStandalone) {
        rules += ' _Fd18';
        currentRules["lineHeight"] = typeof currentRules["lineHeight"] === 'object' ? currentRules["lineHeight"] : {
            "default": currentRules["lineHeight"]
        };
        currentRules["lineHeight"]["isStandalone"] = "ui";
        rules += ' _FnuYUweb18';
        currentRules["lineHeight"] = typeof currentRules["lineHeight"] === 'object' ? currentRules["lineHeight"] : {
            "default": currentRules["lineHeight"]
        };
        currentRules["lineHeight"]["isStandalone && :lang(ja, ko, zh, zh-Hant, zh-Hans, zh-CN, zh-SG)"] = "ui";
    }
    if (props.isStaticColor) {
        rules += ' pl18';
        currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
            "default": currentRules["color"]
        };
        currentRules["color"]["isStaticColor"] = "transparent-overlay-1000";
    } else if (props.variant === "secondary") {
        if (props.isPressed) {
            rules += ' po18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["variant === \"secondary\" && isPressed"] = "neutral:pressed";
        } else if (props.isFocusVisible) {
            rules += ' po18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["variant === \"secondary\" && isFocusVisible"] = "neutral:focused";
        } else if (props.isHovered) {
            rules += ' po18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["variant === \"secondary\" && isHovered"] = "neutral:hovered";
        } else {
            rules += ' pt18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["variant === \"secondary\""] = "neutral";
        }
    } else if (props.variant === "primary") {
        if (props.isPressed) {
            rules += ' ps18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["variant === \"primary\" && isPressed"] = "accent:pressed";
        } else if (props.isFocusVisible) {
            rules += ' ps18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["variant === \"primary\" && isFocusVisible"] = "accent:focused";
        } else if (props.isHovered) {
            rules += ' ps18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["variant === \"primary\" && isHovered"] = "accent:hovered";
        } else {
            rules += ' pu18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["variant === \"primary\""] = "accent";
        }
    }
    rules += ' plOVIhfcA5Qiqd18';
    currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
        "default": currentRules["color"]
    };
    currentRules["color"]["forcedColors"] = "LinkText";
    rules += ' plOVIhfcA5Qiqd18';
    currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
        "default": currentRules["color"]
    };
    currentRules["color"][":is([data-hcm], [data-hcm] *)"] = "LinkText";
    rules += ' Yd18';
    currentRules["transition"] = "default";
    rules += ' Xb18';
    currentRules["transitionDuration"] = 150;
    rules += ' _2b18';
    currentRules["transitionTimingFunction"] = "default";
    if (props.isStandalone) {
        if (props.isQuiet) {
            if (props.isFocusVisible) {
                rules += ' _Xb18';
                currentRules["textDecoration"] = typeof currentRules["textDecoration"] === 'object' ? currentRules["textDecoration"] : {
                    "default": currentRules["textDecoration"]
                };
                currentRules["textDecoration"]["isStandalone && isQuiet && isFocusVisible"] = "underline";
                rules += ' __Va18';
                currentRules["textDecoration"] = typeof currentRules["textDecoration"] === 'object' ? currentRules["textDecoration"] : {
                    "default": currentRules["textDecoration"]
                };
                currentRules["textDecoration"]["isStandalone && isQuiet && isFocusVisible"] = "underline";
            } else if (props.isHovered) {
                rules += ' _Xb18';
                currentRules["textDecoration"] = typeof currentRules["textDecoration"] === 'object' ? currentRules["textDecoration"] : {
                    "default": currentRules["textDecoration"]
                };
                currentRules["textDecoration"]["isStandalone && isQuiet && isHovered"] = "underline";
                rules += ' __Va18';
                currentRules["textDecoration"] = typeof currentRules["textDecoration"] === 'object' ? currentRules["textDecoration"] : {
                    "default": currentRules["textDecoration"]
                };
                currentRules["textDecoration"]["isStandalone && isQuiet && isHovered"] = "underline";
            } else {
                rules += ' _Xa18';
                currentRules["textDecoration"] = typeof currentRules["textDecoration"] === 'object' ? currentRules["textDecoration"] : {
                    "default": currentRules["textDecoration"]
                };
                currentRules["textDecoration"]["isStandalone && isQuiet"] = "none";
            }
        }
    } else {
        rules += ' _Xb18';
        currentRules["textDecoration"] = "underline";
        rules += ' __Va18';
        currentRules["textDecoration"] = "underline";
    }
    rules += ' __ca18';
    currentRules["disableTapHighlight"] = true;
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Link.native.js:23:13";
    let hash = 5381;
    for(let i = 0; i < targetRules.length; i++)hash = (hash << 5) + hash + targetRules.charCodeAt(i) >>> 0;
    let hashStr = hash.toString(36);
    rules += " -macro-dynamic-" + hashStr;
    if (typeof window !== "undefined") {
        let g = window.__styleMacroDynamic__;
        if (!g) {
            g = window.__styleMacroDynamic__ = {
                map: {},
                _timer: null
            };
            g._timer = setInterval(function() {
                for(let k in g.map)try {
                    if (!document.querySelector("." + CSS.escape(k))) delete g.map[k];
                } catch (e) {}
            }, 300000);
        }
        g.map["-macro-dynamic-" + hashStr] = {
            style: currentRules,
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Link.native.js:23:13"
        };
    }
    return rules;
};
function $a425f36c3a133025$export$a6c7ac8248d6e38a(inputProps) {
    let [props, ref] = (0, $1NDEx.useSpectrumContextProps)(inputProps, inputProps.ref, $a425f36c3a133025$export$e2509388b49734e7);
    let domRef = (0, $eXdQ3.useFocusableRef)(ref);
    let isSkeleton = (0, $esT6z.useIsSkeleton)();
    let [children, unsafeStyle] = (0, $esT6z.useSkeletonText)(()=>props.children, ()=>props.UNSAFE_style);
    (0, $l0gtI$createRenderEffect)(()=>({
            element: domRef.current,
            isSkeleton: isSkeleton()
        }), ({ element: element, isSkeleton: isSkeleton })=>{
        if (element) // TODO: should RAC Link pass through inert?
        element.inert = isSkeleton;
    });
    return (0, $l0gtI$createComponent)((0, $gSanO.Link), (0, $l0gtI$mergeProps)(props, {
        ref (r$) {
            var _ref$ = domRef;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $l0gtI$applyRef)(_ref$, r$) : domRef = r$;
        },
        get style () {
            return unsafeStyle();
        },
        className: (renderProps)=>(props.UNSAFE_className ?? '') + $a425f36c3a133025$var$link({
                ...renderProps,
                variant: props.variant ?? 'primary',
                staticColor: props.staticColor,
                isStaticColor: !!props.staticColor,
                isQuiet: props.isQuiet,
                isStandalone: props.isStandalone,
                isSkeleton: isSkeleton()
            }, props.styles),
        get children () {
            return children();
        }
    }));
}




export {$a425f36c3a133025$export$a6c7ac8248d6e38a as Link, $a425f36c3a133025$export$e2509388b49734e7 as LinkContext};
//# sourceMappingURL=Link.native.js.map
