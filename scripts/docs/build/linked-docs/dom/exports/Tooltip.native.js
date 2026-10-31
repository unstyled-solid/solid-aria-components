import "./Tooltip.native.css";
import {createEffect as $9Xv0G$createEffect, untrack as $9Xv0G$untrack, createContext as $9Xv0G$createContext, useContext as $9Xv0G$useContext, createSignal as $9Xv0G$createSignal, isHydrating as $9Xv0G$isHydrating, onSettled as $9Xv0G$onSettled, merge as $9Xv0G$merge, omit as $9Xv0G$omit, $PROXY as $9Xv0G$$PROXY, createUniqueId as $9Xv0G$createUniqueId, onCleanup as $9Xv0G$onCleanup, action as $9Xv0G$action, runWithOwner as $9Xv0G$runWithOwner, createRenderEffect as $9Xv0G$createRenderEffect, createMemo as $9Xv0G$createMemo, Show as $9Xv0G$Show} from "solid-js";
import {createComponent as $9Xv0G$createComponent, memo as $9Xv0G$memo, isServer as $9Xv0G$isServer, dynamic as $9Xv0G$dynamic, mergeProps as $9Xv0G$mergeProps, useHead as $9Xv0G$useHead, template as $9Xv0G$template, applyRef as $9Xv0G$applyRef, getNextElement as $9Xv0G$getNextElement, effect as $9Xv0G$effect, readShallow as $9Xv0G$readShallow, className as $9Xv0G$className, spread as $9Xv0G$spread, runHydrationEvents as $9Xv0G$runHydrationEvents, Portal as $9Xv0G$Portal} from "@solidjs/web";
import $9Xv0G$clsx from "clsx";


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

parcelRegister("h2cIl", function(module, exports) {

$parcel$export(module.exports, "clamp", function () { return $c66c7c584a75e6dd$export$7d15b64cf5a3a4c4; });
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
 * Takes a value and forces it to the closest min/max if it's outside. Also forces it to the closest
 * valid step.
 */ function $c66c7c584a75e6dd$export$7d15b64cf5a3a4c4(value, min = -Infinity, max = Infinity) {
    let newValue = Math.min(Math.max(value, min), max);
    return newValue;
}
function $c66c7c584a75e6dd$export$e1a7b8e69ef6c52f(value, step) {
    let roundedValue = value;
    let precision = 0;
    let stepString = step.toString();
    // Handle negative exponents in exponential notation (e.g., "1e-7" → precision 8)
    let eIndex = stepString.toLowerCase().indexOf('e-');
    if (eIndex > 0) precision = Math.abs(Math.floor(Math.log10(Math.abs(step)))) + eIndex;
    else {
        let pointIndex = stepString.indexOf('.');
        if (pointIndex >= 0) precision = stepString.length - pointIndex;
    }
    if (precision > 0) {
        let pow = Math.pow(10, precision);
        roundedValue = Math.round(roundedValue * pow) / pow;
    }
    return roundedValue;
}
function $c66c7c584a75e6dd$export$cb6e0bb50bc19463(value, min, max, step) {
    min = Number(min);
    max = Number(max);
    let remainder = (value - (isNaN(min) ? 0 : min)) % step;
    let snappedValue = $c66c7c584a75e6dd$export$e1a7b8e69ef6c52f(Math.abs(remainder) * 2 >= step ? value + Math.sign(remainder) * (step - Math.abs(remainder)) : value - remainder, step);
    if (!isNaN(min)) {
        if (snappedValue < min) snappedValue = min;
        else if (!isNaN(max) && snappedValue > max) snappedValue = min + Math.floor($c66c7c584a75e6dd$export$e1a7b8e69ef6c52f((max - min) / step, step)) * step;
    } else if (!isNaN(max) && snappedValue > max) snappedValue = Math.floor($c66c7c584a75e6dd$export$e1a7b8e69ef6c52f(max / step, step)) * step;
    // correct floating point behavior by rounding to step precision
    snappedValue = $c66c7c584a75e6dd$export$e1a7b8e69ef6c52f(snappedValue, step);
    return snappedValue;
}
function $c66c7c584a75e6dd$export$b6268554fba451f(value, digits, base = 10) {
    const pow = Math.pow(base, digits);
    return Math.round(value * pow) / pow;
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


parcelRegister("cxzEt", function(module, exports) {

$parcel$export(module.exports, "onCloseMap", function () { return $921438ccf1c28ea5$export$f6211563215e3b37; });
$parcel$export(module.exports, "useCloseOnScroll", function () { return $921438ccf1c28ea5$export$18fc8428861184da; });
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

const $921438ccf1c28ea5$export$f6211563215e3b37 = new WeakMap();
function $921438ccf1c28ea5$export$18fc8428861184da(opts) {
    (0, $9Xv0G$createEffect)(()=>({
            isOpen: opts.isOpen,
            onClose: opts.onClose,
            trigger: opts.triggerRef.current
        }), ({ isOpen: isOpen, onClose: onClose, trigger: trigger })=>{
        if (!isOpen || onClose === null) return;
        let onScroll = (e)=>{
            // Ignore if scrolling an scrollable region outside the trigger's tree.
            let target = (0, $ed1Px.getEventTarget)(e);
            // window is not a Node and doesn't have contain, but window contains everything
            if (!trigger || target instanceof Node && !(0, $ed1Px.nodeContains)(target, trigger)) return;
            // Ignore scroll events on any input or textarea as the cursor position can cause it to scroll
            // such as in a combobox. Clicking the dropdown button places focus on the input, and if the
            // text inside the input extends beyond the 'end', then it will scroll so the cursor is visible at the end.
            if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
            let onCloseHandler = opts.onClose || $921438ccf1c28ea5$export$f6211563215e3b37.get(trigger);
            if (onCloseHandler) onCloseHandler();
        };
        return (0, $gi7Zf.addEvent)((0, $ed1Px.getPropagationTargets)(trigger), 'scroll', onScroll, true);
    });
}

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
    return (...args)=>(0, $9Xv0G$untrack)(()=>(getCallback ? getCallback() : fn)?.(...args));
}

});

parcelRegister("dnlDG", function(module, exports) {

$parcel$export(module.exports, "I18nProvider", function () { return $9bce356509de5990$export$a54013f0d02a8f82; });
$parcel$export(module.exports, "useLocale", function () { return $9bce356509de5990$export$43bb16f9c6d9e3f7; });


var $fWxcB = parcelRequire("fWxcB");


var $kIyoO = parcelRequire("kIyoO");
const $9bce356509de5990$var$I18nContext = (0, $9Xv0G$createContext)(null);
/**
 * Internal component that handles the case when locale is provided.
 */ function $9bce356509de5990$var$I18nProviderWithLocale(props) {
    let value = {
        get locale () {
            return props.locale;
        },
        get direction () {
            return (0, $fWxcB.isRTL)(props.locale) ? 'rtl' : 'ltr';
        }
    };
    return (0, $9Xv0G$createComponent)($9bce356509de5990$var$I18nContext, {
        value: value,
        get children () {
            return props.children;
        }
    });
}
/**
 * Internal component that handles the case when no locale is provided.
 */ function $9bce356509de5990$var$I18nProviderWithDefaultLocale(props) {
    let defaultLocale = (0, $kIyoO.useDefaultLocale)();
    return (0, $9Xv0G$createComponent)($9bce356509de5990$var$I18nContext, {
        value: defaultLocale,
        get children () {
            return props.children;
        }
    });
}
function $9bce356509de5990$export$a54013f0d02a8f82(props) {
    return (0, $9Xv0G$memo)(()=>(0, $9Xv0G$memo)(()=>!!props.locale)() ? (0, $9Xv0G$createComponent)($9bce356509de5990$var$I18nProviderWithLocale, {
            get locale () {
                return props.locale;
            },
            get children () {
                return props.children;
            }
        }) : (0, $9Xv0G$createComponent)($9bce356509de5990$var$I18nProviderWithDefaultLocale, {
            get children () {
                return props.children;
            }
        }));
}
function $9bce356509de5990$export$43bb16f9c6d9e3f7() {
    let defaultLocale = (0, $kIyoO.useDefaultLocale)();
    let context = (0, $9Xv0G$useContext)($9bce356509de5990$var$I18nContext);
    return context || defaultLocale;
}

});
parcelRegister("fWxcB", function(module, exports) {

$parcel$export(module.exports, "isRTL", function () { return $b9b60714bf7cb967$export$702d680b21cbd764; });
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
 */ // https://en.wikipedia.org/wiki/Right-to-left
const $b9b60714bf7cb967$var$RTL_SCRIPTS = new Set([
    'Arab',
    'Syrc',
    'Samr',
    'Mand',
    'Thaa',
    'Mend',
    'Nkoo',
    'Adlm',
    'Rohg',
    'Hebr'
]);
const $b9b60714bf7cb967$var$RTL_LANGS = new Set([
    'ae',
    'ar',
    'arc',
    'bcc',
    'bqi',
    'ckb',
    'dv',
    'fa',
    'glk',
    'he',
    'ku',
    'mzn',
    'nqo',
    'pnb',
    'ps',
    'sd',
    'ug',
    'ur',
    'yi'
]);
function $b9b60714bf7cb967$export$702d680b21cbd764(localeString) {
    // If the Intl.Locale API is available, use it to get the locale's text direction.
    if (Intl.Locale) {
        let locale = new Intl.Locale(localeString).maximize();
        // Use the text info object to get the direction if possible.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getTextInfo
        let textInfo = // @ts-ignore - this was implemented as a property by some browsers before it was standardized as a function.
        typeof locale.getTextInfo === 'function' ? locale.getTextInfo() : locale.textInfo;
        if (textInfo) return textInfo.direction === 'rtl';
        // Fallback: guess using the script.
        // This is more accurate than guessing by language, since languages can be written in multiple scripts.
        if (locale.script) return $b9b60714bf7cb967$var$RTL_SCRIPTS.has(locale.script);
    }
    // If not, just guess by the language (first part of the locale)
    let lang = localeString.split('-')[0];
    return $b9b60714bf7cb967$var$RTL_LANGS.has(lang);
}

});

parcelRegister("kIyoO", function(module, exports) {

$parcel$export(module.exports, "useDefaultLocale", function () { return $f15299abd09b0542$export$188ec29ebc2bdc3a; });
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
var $fWxcB = parcelRequire("fWxcB");


// Locale passed from server by PackageLocalizationProvider.
const $f15299abd09b0542$var$localeSymbol = Symbol.for('react-aria.i18n.locale');
function $f15299abd09b0542$export$f09106e7c6677ec5() {
    let locale = typeof window !== 'undefined' && window[$f15299abd09b0542$var$localeSymbol] || // @ts-ignore
    typeof navigator !== 'undefined' && (navigator.language || navigator.userLanguage) || 'en-US';
    try {
        Intl.DateTimeFormat.supportedLocalesOf([
            locale
        ]);
    } catch  {
        locale = 'en-US';
    }
    return {
        locale: locale,
        direction: (0, $fWxcB.isRTL)(locale) ? 'rtl' : 'ltr'
    };
}
let $f15299abd09b0542$var$currentLocale = $f15299abd09b0542$export$f09106e7c6677ec5();
let $f15299abd09b0542$var$listeners = new Set();
function $f15299abd09b0542$var$updateLocale() {
    $f15299abd09b0542$var$currentLocale = $f15299abd09b0542$export$f09106e7c6677ec5();
    for (let listener of $f15299abd09b0542$var$listeners)listener($f15299abd09b0542$var$currentLocale);
}
function $f15299abd09b0542$export$188ec29ebc2bdc3a() {
    let [isSSR, setSSR] = (0, $9Xv0G$createSignal)((0, $9Xv0G$isServer) || (0, $9Xv0G$isHydrating)());
    let [defaultLocale, setDefaultLocale] = (0, $9Xv0G$createSignal)($f15299abd09b0542$var$currentLocale);
    (0, $9Xv0G$onSettled)(()=>{
        setSSR(false);
        if ($f15299abd09b0542$var$listeners.size === 0) window.addEventListener('languagechange', $f15299abd09b0542$var$updateLocale);
        $f15299abd09b0542$var$listeners.add(setDefaultLocale);
        return ()=>{
            $f15299abd09b0542$var$listeners.delete(setDefaultLocale);
            if ($f15299abd09b0542$var$listeners.size === 0) window.removeEventListener('languagechange', $f15299abd09b0542$var$updateLocale);
        };
    });
    // We cannot determine the browser's language on the server, so default to
    // en-US. This will be updated after hydration on the client to the correct value.
    return {
        get locale () {
            return isSSR() ? typeof window !== 'undefined' && window[$f15299abd09b0542$var$localeSymbol] || 'en-US' : defaultLocale().locale;
        },
        get direction () {
            return isSSR() ? 'ltr' : defaultLocale().direction;
        }
    };
}

});


parcelRegister("fDU3z", function(module, exports) {

$parcel$export(module.exports, "useResizeObserver", function () { return $b635fb3ac7031c5a$export$683480f191c0e3ea; });


var $czX2l = parcelRequire("czX2l");
function $b635fb3ac7031c5a$var$hasResizeObserver() {
    return typeof window.ResizeObserver !== 'undefined';
}
function $b635fb3ac7031c5a$export$683480f191c0e3ea(options) {
    // Only call onResize from inside the effect, otherwise we'll void our assumption that
    // useEffectEvents are safe to pass in.
    let onResizeEvent = (0, $czX2l.useEffectEvent)(undefined, ()=>options.onResize);
    (0, $9Xv0G$createEffect)(()=>({
            element: options.ref?.current,
            box: options.box
        }), ({ element: element, box: box })=>{
        if (!element) return;
        if (!$b635fb3ac7031c5a$var$hasResizeObserver()) {
            window.addEventListener('resize', onResizeEvent, false);
            return ()=>{
                window.removeEventListener('resize', onResizeEvent, false);
            };
        } else {
            const resizeObserverInstance = new window.ResizeObserver((entries)=>{
                if (!entries.length) return;
                onResizeEvent();
            });
            resizeObserverInstance.observe(element, {
                box: box
            });
            return ()=>{
                if (element) resizeObserverInstance.unobserve(element);
            };
        }
    });
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
        return (0, $9Xv0G$createComponent)(Context, {
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
            return (typeof value === 'function' ? value((0, $9Xv0G$merge)(props.values, {
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
    let ctx = (0, $9Xv0G$useContext)(context);
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
    let contextProps = (0, $9Xv0G$omit)(ctx, 'ref');
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
    let finalProps = (0, $9Xv0G$merge)(mergedProps, styleOverride);
    return [
        finalProps,
        mergedRef
    ];
}
function $1e122d8834d59736$export$9d4c57ee4c6ffdd8(initialState = true) {
    // Initial state is typically based on the parent having an aria-label or aria-labelledby.
    // If it does, this value should be false so that we don't update the state and cause a rerender when we go through the layoutEffect
    let [hasSlot, setHasSlot] = (0, $9Xv0G$createSignal)(typeof initialState === 'function' ? initialState() : initialState);
    let hasRun = false;
    // A callback ref which will run when the slotted element mounts.
    // This should happen before the useLayoutEffect below.
    let ref = (el)=>{
        hasRun = true;
        setHasSlot(!!el);
    };
    // If the callback hasn't been called, then reset to false.
    (0, $9Xv0G$onSettled)(()=>{
        if (!hasRun) setHasSlot(false);
    });
    return [
        ref,
        hasSlot
    ];
}
function $1e122d8834d59736$export$ef03459518577ad4(props) {
    return (0, $9Xv0G$omit)(props, (key)=>key === (0, $9Xv0G$$PROXY) || typeof key === 'string' && key.startsWith('data-'));
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
    (0, $9Xv0G$createEffect)(()=>props.ref, (targetRef)=>{
        let node = (0, $9Xv0G$untrack)(()=>ref.current);
        if (node && targetRef !== deliveredRef) {
            ref(null);
            ref(node);
        }
    });
    // RC13 supports native listener options through addEventListener, not *Capture JSX props.
    (0, $9Xv0G$createEffect)(()=>({
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
    (0, $9Xv0G$onSettled)(()=>{
        // One-time custom-host conformance observation after attachment.
        let element = (0, $9Xv0G$untrack)(()=>ref.current);
    });
    let domProps = (0, $9Xv0G$merge)((0, $9Xv0G$omit)(props, (key)=>key === 'render' || key === 'ref' || key === 'className' || key === 'htmlFor' || /^on[A-Z].*Capture$/.test(String(key))), {
        ref: ref,
        get class () {
            return props.className;
        },
        get for () {
            return props.htmlFor ?? props.for;
        }
    });
    const CustomRender = (hostProps)=>props.render(hostProps, undefined);
    const Host = (0, $9Xv0G$dynamic)(()=>props.render ? CustomRender : ElementType);
    return (0, $9Xv0G$createComponent)(Host, domProps);
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
        has: (_, key)=>key !== (0, $9Xv0G$$PROXY) && args.some((props)=>props != null && key in props),
        getOwnPropertyDescriptor: (_, key)=>args.some((props)=>props != null && key in props) ? {
                enumerable: true,
                configurable: true,
                get: ()=>mergeProperty(key)
            } : undefined,
        get: (_, key)=>key === (0, $9Xv0G$$PROXY) ? undefined : mergeProperty(key)
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
                else if ((key === 'className' || key === 'UNSAFE_className') && typeof a === 'string' && typeof b === 'string') result[key] = (0, $9Xv0G$clsx)(a, b);
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
    const prefix = (0, $9Xv0G$isServer) || (0, $9Xv0G$isHydrating)() || false ? 'react-aria' : `react-aria${$9de886171f524ac8$var$clientPrefix}`;
    const generated = `${prefix}-${(0, $9Xv0G$createUniqueId)()}`;
    // Adobe negotiates IDs while composing props. This internal signal deliberately
    // accepts those in-scope requests; ordinary component state does not opt in.
    const [value, setValue] = (0, $9Xv0G$createSignal)(undefined, {
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
    register((0, $9Xv0G$untrack)(res));
    (0, $9Xv0G$createEffect)(res, register);
    (0, $9Xv0G$onCleanup)(unregister);
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
    let [resolvedId, setResolvedId] = (0, $9Xv0G$createSignal)((0, $9Xv0G$untrack)(id1));
    let [publication, setPublication] = (0, $9Xv0G$createSignal)(0);
    (0, $9Xv0G$onSettled)(()=>{
        const currentId = (0, $9Xv0G$untrack)(id1);
        setResolvedId(document.getElementById(currentId) ? currentId : undefined);
    });
    (0, $9Xv0G$createEffect)(()=>[
            id1(),
            ...typeof depArray === 'function' ? depArray() : depArray
        ], ([currentId])=>{
        // Source useValueEffect first yields the generated ID, allowing new slot hosts
        // to receive it, then checks the DOM after that publication commits.
        setResolvedId(currentId);
        setPublication((value)=>value + 1);
    });
    (0, $9Xv0G$createEffect)(()=>{
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
        let cleanup = (0, $9Xv0G$untrack)(()=>ref(instance));
        return typeof cleanup === 'function' ? cleanup : ()=>{
            (0, $9Xv0G$untrack)(()=>ref(null));
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
    let [revision, setRevision] = (0, $9Xv0G$createSignal)(0);
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
    let detach = (0, $9Xv0G$action)(function*() {
        attach(null);
    });
    Object.defineProperty(attach, 'current', {
        get () {
            revision();
            return current;
        },
        set: attach
    });
    (0, $9Xv0G$onCleanup)(()=>(0, $9Xv0G$runWithOwner)(null, detach));
    return attach;
}

});


parcelRegister("bAtJj", function(module, exports) {

$parcel$export(module.exports, "filterDOMProps", function () { return (parcelRequire("5gAIA")).filterDOMProps; });

var $5gAIA = parcelRequire("5gAIA");

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
    let context = (0, $9Xv0G$useContext)((0, $cpleU.FocusableContext)) || {};
    (0, $khPAm.useSyncRef)(context, ref);
    // eslint-disable-next-line
    return (0, $9Xv0G$omit)(context, 'ref');
}
function $f1ba5a9e4c9cb049$export$13f3202a3e5ddd5(props) {
    let objRef = (0, $6p9dH.useObjectRef)(props.ref);
    let context = (0, $7boJ2.mergeProps)((0, $9Xv0G$omit)(props, 'children', 'ref'), {
        ref: objRef
    });
    return (0, $9Xv0G$createComponent)((0, $cpleU.FocusableContext), {
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
        current: (0, $9Xv0G$untrack)(()=>props.autoFocus)
    };
    (0, $9Xv0G$onSettled)(()=>{
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
    (0, $9Xv0G$onSettled)(()=>{
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
    let [modality, setModality] = (0, $9Xv0G$createSignal)($a85418a6e737a800$var$currentModality);
    let handler = ()=>{
        setModality($a85418a6e737a800$var$currentModality);
    };
    $a85418a6e737a800$export$901e90a13c50a14e.add(handler);
    (0, $9Xv0G$onCleanup)(()=>{
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
    let [isFocusVisibleState, setFocusVisible] = (0, $9Xv0G$createSignal)(props.autoFocus || $a85418a6e737a800$export$b9b3dfddab17db27());
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
    (0, $9Xv0G$createEffect)(()=>opts?.enabled !== false, (enabled)=>{
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
    (0, $9Xv0G$onCleanup)(()=>{
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

parcelRegister("fNnwP", function(module, exports) {

$parcel$export(module.exports, "RouterProvider", function () { return $b7fdaee6ddcf59c4$export$323e4fc2fa4753fb; });
$parcel$export(module.exports, "openLink", function () { return $b7fdaee6ddcf59c4$export$95185d699e05d4d7; });
$parcel$export(module.exports, "useRouter", function () { return $b7fdaee6ddcf59c4$export$9a302a45f65d0572; });
$parcel$export(module.exports, "useLinkProps", function () { return $b7fdaee6ddcf59c4$export$7e924b3091a3bd18; });
$parcel$export(module.exports, "handleLinkClick", function () { return $b7fdaee6ddcf59c4$export$13aea1a3cb5e3f1f; });


var $jBlzr = parcelRequire("jBlzr");

var $1FDXt = parcelRequire("1FDXt");

const $b7fdaee6ddcf59c4$var$RouterContext = (0, $9Xv0G$createContext)({
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
    return (0, $9Xv0G$createComponent)($b7fdaee6ddcf59c4$var$RouterContext, {
        value: ctx,
        get children () {
            return props.children;
        }
    });
}
function $b7fdaee6ddcf59c4$export$9a302a45f65d0572() {
    return (0, $9Xv0G$useContext)($b7fdaee6ddcf59c4$var$RouterContext);
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
    const [isSSR, setIsSSR] = (0, $9Xv0G$createSignal)((0, $9Xv0G$isServer) || (0, $9Xv0G$isHydrating)());
    // Reserve the same lifecycle slot on server and client.
    (0, $9Xv0G$onSettled)(()=>{
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
    (0, $9Xv0G$createEffect)(()=>({
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

const $90884b889dc4fa67$export$f9762fab77588ecb = (0, $9Xv0G$createContext)(null);

});


parcelRegister("6SohG", function(module, exports) {

$parcel$export(module.exports, "useUNSAFE_PortalContext", function () { return $501a9f8f61398eac$export$9fc1347d4195ccb3; });


const $501a9f8f61398eac$export$60d741e20e0aa309 = (0, $9Xv0G$createContext)({});
function $501a9f8f61398eac$export$78efe591171d7d45(props) {
    let parent = $501a9f8f61398eac$export$9fc1347d4195ccb3();
    let value = {
        get getContainer () {
            return props.getContainer === null ? undefined : props.getContainer ?? parent.getContainer;
        }
    };
    return (0, $9Xv0G$createComponent)($501a9f8f61398eac$export$60d741e20e0aa309, {
        value: value,
        get children () {
            return props.children;
        }
    });
}
function $501a9f8f61398eac$export$9fc1347d4195ccb3() {
    return (0, $9Xv0G$useContext)($501a9f8f61398eac$export$60d741e20e0aa309) ?? {};
}

});

parcelRegister("ckc8K", function(module, exports) {

$parcel$export(module.exports, "useOverlayTriggerState", function () { return $8f90c5151e61b391$export$61c6a8c84e605fb6; });
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

var $3Ic1F = parcelRequire("3Ic1F");
function $8f90c5151e61b391$export$61c6a8c84e605fb6(props) {
    let [isOpen, setOpen] = (0, $3Ic1F.useControlledState)(()=>props.isOpen, (0, $9Xv0G$untrack)(()=>props.defaultOpen || false), (value)=>props.onOpenChange?.(value));
    let [point, setPoint] = (0, $9Xv0G$createSignal)(null);
    const open = ()=>{
        setOpen(true);
    };
    const close = ()=>{
        setOpen(false);
    };
    const toggle = ()=>{
        setOpen((value)=>!value);
    };
    return {
        get isOpen () {
            return isOpen();
        },
        setOpen: setOpen,
        open: open,
        close: close,
        toggle: toggle,
        get point () {
            return point();
        },
        setPoint: setPoint
    };
}

});
parcelRegister("3Ic1F", function(module, exports) {

$parcel$export(module.exports, "useControlledState", function () { return $2b3ecf3c2a05639b$export$40bfa8c7b0832715; });
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
function $2b3ecf3c2a05639b$export$40bfa8c7b0832715(value, defaultValue, onChange) {
    // Store the value in both state and a ref. The state value will only be used when uncontrolled.
    // The ref is used to track the most current value, which is passed to the function setState callback.
    let externalValue = typeof value === 'function' ? value : ()=>value;
    let initialValue = (0, $9Xv0G$untrack)(externalValue);
    let [stateValue, setStateValue] = (0, $9Xv0G$createSignal)(initialValue || defaultValue);
    let currentValue = ()=>{
        let value = externalValue();
        return value !== undefined ? value : stateValue();
    };
    let valueRef = (0, $9Xv0G$untrack)(currentValue);
    let wasControlled = initialValue !== undefined;
    (0, $9Xv0G$createEffect)(()=>externalValue() !== undefined, (isControlled)=>{
        wasControlled = isControlled;
    });
    // Reset proposals when an external value or a local request commits.
    let [revision, setRevision] = (0, $9Xv0G$createSignal)(0);
    (0, $9Xv0G$createRenderEffect)(()=>{
        revision();
        return currentValue();
    }, (value)=>{
        valueRef = value;
    });
    let setValue = (value, ...args)=>{
        let newValue = typeof value === 'function' ? value(valueRef) : value;
        if (!Object.is(valueRef, newValue)) {
            // Update the ref so that the next setState callback has the most recent value.
            valueRef = newValue;
            setStateValue(()=>newValue);
            // Also invalidate the reset effect when a controlled parent refuses the request.
            setRevision((previous)=>previous + 1);
            // Held updates need the same next-turn reset as an abandoned source render.
            // Keep proposals only for the current synchronous event.
            queueMicrotask(()=>{
                valueRef = (0, $9Xv0G$untrack)(currentValue);
            });
            // Trigger onChange. Note that if setState is called multiple times in a single event,
            // onChange will be called for each one instead of only once.
            onChange?.(newValue, ...args);
        }
    };
    return [
        currentValue,
        setValue
    ];
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
    let [isHovered, setHovered] = (0, $9Xv0G$createSignal)(false);
    let state = {
        isHovered: false,
        ignoreEmulatedMouseEvents: false,
        pointerType: '',
        target: null
    };
    (0, $9Xv0G$onSettled)($60f445a8cbdb845e$var$setupGlobalTouchEvents);
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
    (0, $9Xv0G$createEffect)(()=>props.isDisabled, (isDisabled)=>{
        // Call the triggerHoverEnd as soon as isDisabled changes to true
        // Safe to call triggerHoverEnd, it will early return if we aren't currently hovering
        if (isDisabled) triggerHoverEnd({
            currentTarget: state.target
        }, state.pointerType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    (0, $9Xv0G$onCleanup)(removeAllGlobalListeners);
    return {
        hoverProps: hoverProps,
        isHovered: isHovered
    };
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
    (0, $9Xv0G$onCleanup)(removeAllGlobalListeners);
    return {
        addGlobalListener: addGlobalListener,
        removeGlobalListener: removeGlobalListener,
        removeAllGlobalListeners: removeAllGlobalListeners
    };
}

});


parcelRegister("4SbjT", function(module, exports) {

$parcel$export(module.exports, "ColorSchemeContext", function () { return $38c4fc7450edae36$export$374e0245597d19a3; });
$parcel$export(module.exports, "Provider", function () { return $38c4fc7450edae36$export$2881499e37b75b9a; });


parcelRequire("bAtJj");
var $5gAIA = parcelRequire("5gAIA");

var $hL2UH = parcelRequire("hL2UH");
parcelRequire("ig9q0");
var $dnlDG = parcelRequire("dnlDG");

var $cJuZp = parcelRequire("cJuZp");

var $fNnwP = parcelRequire("fNnwP");
const $38c4fc7450edae36$export$374e0245597d19a3 = (0, $9Xv0G$createContext)(null);
function $38c4fc7450edae36$export$2881499e37b75b9a(props) {
    let parentColorScheme = (0, $9Xv0G$useContext)($38c4fc7450edae36$export$374e0245597d19a3);
    let content = ()=>(0, $9Xv0G$createComponent)($38c4fc7450edae36$export$374e0245597d19a3, {
            get value () {
                return props.colorScheme || parentColorScheme;
            },
            get children () {
                return (0, $9Xv0G$createComponent)($38c4fc7450edae36$var$ProviderInner, props);
            }
        });
    let localizedContent = ()=>props.locale ? (0, $9Xv0G$createComponent)((0, $dnlDG.I18nProvider), {
            get locale () {
                return props.locale;
            },
            get children () {
                return content();
            }
        }) : content();
    return (0, $9Xv0G$memo)(()=>(0, $9Xv0G$memo)(()=>!!props.router)() ? (0, $9Xv0G$createComponent)((0, $fNnwP.RouterProvider), (0, $9Xv0G$mergeProps)(()=>props.router, {
            get children () {
                return localizedContent();
            }
        })) : localizedContent());
}
undefined;
let $38c4fc7450edae36$var$providerStyles = function anonymous(props) {
    let rules = " ", currentRules = {};
    if (props.colorScheme === "dark") {
        rules += ' -ICUGx-_pa18';
        currentRules["--s2-color-scheme"] = typeof currentRules["--s2-color-scheme"] === 'object' ? currentRules["--s2-color-scheme"] : {
            "default": currentRules["--s2-color-scheme"]
        };
        currentRules["--s2-color-scheme"]["colorScheme === \"dark\""] = "dark";
    } else if (props.colorScheme === "light") {
        rules += ' -ICUGx-_pb18';
        currentRules["--s2-color-scheme"] = typeof currentRules["--s2-color-scheme"] === 'object' ? currentRules["--s2-color-scheme"] : {
            "default": currentRules["--s2-color-scheme"]
        };
        currentRules["--s2-color-scheme"]["colorScheme === \"light\""] = "light";
    } else if (props.colorScheme === "light dark") {
        rules += ' -ICUGx-_pb18';
        currentRules["--s2-color-scheme"] = typeof currentRules["--s2-color-scheme"] === 'object' ? currentRules["--s2-color-scheme"] : {
            "default": currentRules["--s2-color-scheme"]
        };
        currentRules["--s2-color-scheme"]["colorScheme === \"light dark\""] = "light";
        rules += ' -ICUGx-D1v0V_pa18';
        currentRules["--s2-color-scheme"] = typeof currentRules["--s2-color-scheme"] === 'object' ? currentRules["--s2-color-scheme"] : {
            "default": currentRules["--s2-color-scheme"]
        };
        currentRules["--s2-color-scheme"]["colorScheme === \"light dark\" && @media (prefers-color-scheme: dark)"] = "dark";
    }
    rules += ' _pK8eoyd18';
    currentRules["colorScheme"] = "--s2-color-scheme";
    if (props.colorScheme === "dark") {
        rules += ' -NvXmrd-_ZLmU18';
        currentRules["--lightningcss-light"] = typeof currentRules["--lightningcss-light"] === 'object' ? currentRules["--lightningcss-light"] : {
            "default": currentRules["--lightningcss-light"]
        };
        currentRules["--lightningcss-light"]["colorScheme === \"dark\""] = " ";
    } else if (props.colorScheme === "light") {
        rules += ' -NvXmrd-_ZN8Gi4c18';
        currentRules["--lightningcss-light"] = typeof currentRules["--lightningcss-light"] === 'object' ? currentRules["--lightningcss-light"] : {
            "default": currentRules["--lightningcss-light"]
        };
        currentRules["--lightningcss-light"]["colorScheme === \"light\""] = "initial";
    } else if (props.colorScheme === "light dark") {
        rules += ' -NvXmrd-_ZN8Gi4c18';
        currentRules["--lightningcss-light"] = typeof currentRules["--lightningcss-light"] === 'object' ? currentRules["--lightningcss-light"] : {
            "default": currentRules["--lightningcss-light"]
        };
        currentRules["--lightningcss-light"]["colorScheme === \"light dark\""] = "initial";
        rules += ' -NvXmrd-D1v0V_ZLmU18';
        currentRules["--lightningcss-light"] = typeof currentRules["--lightningcss-light"] === 'object' ? currentRules["--lightningcss-light"] : {
            "default": currentRules["--lightningcss-light"]
        };
        currentRules["--lightningcss-light"]["colorScheme === \"light dark\" && @media (prefers-color-scheme: dark)"] = " ";
    }
    if (props.colorScheme === "dark") {
        rules += ' -j9blY-_ZN8Gi4c18';
        currentRules["--lightningcss-dark"] = typeof currentRules["--lightningcss-dark"] === 'object' ? currentRules["--lightningcss-dark"] : {
            "default": currentRules["--lightningcss-dark"]
        };
        currentRules["--lightningcss-dark"]["colorScheme === \"dark\""] = "initial";
    } else if (props.colorScheme === "light") {
        rules += ' -j9blY-_ZLmU18';
        currentRules["--lightningcss-dark"] = typeof currentRules["--lightningcss-dark"] === 'object' ? currentRules["--lightningcss-dark"] : {
            "default": currentRules["--lightningcss-dark"]
        };
        currentRules["--lightningcss-dark"]["colorScheme === \"light\""] = " ";
    } else if (props.colorScheme === "light dark") {
        rules += ' -j9blY-_ZLmU18';
        currentRules["--lightningcss-dark"] = typeof currentRules["--lightningcss-dark"] === 'object' ? currentRules["--lightningcss-dark"] : {
            "default": currentRules["--lightningcss-dark"]
        };
        currentRules["--lightningcss-dark"]["colorScheme === \"light dark\""] = " ";
        rules += ' -j9blY-D1v0V_ZN8Gi4c18';
        currentRules["--lightningcss-dark"] = typeof currentRules["--lightningcss-dark"] === 'object' ? currentRules["--lightningcss-dark"] : {
            "default": currentRules["--lightningcss-dark"]
        };
        currentRules["--lightningcss-dark"]["colorScheme === \"light dark\" && @media (prefers-color-scheme: dark)"] = "initial";
    }
    if (props.background === "layer-2") {
        rules += ' -Ovbhqd-g_g18';
        currentRules["--s2-container-bg"] = typeof currentRules["--s2-container-bg"] === 'object' ? currentRules["--s2-container-bg"] : {
            "default": currentRules["--s2-container-bg"]
        };
        currentRules["--s2-container-bg"]["background === \"layer-2\""] = "layer-2";
    } else if (props.background === "layer-1") {
        rules += ' -Ovbhqd-gqlRAZb18';
        currentRules["--s2-container-bg"] = typeof currentRules["--s2-container-bg"] === 'object' ? currentRules["--s2-container-bg"] : {
            "default": currentRules["--s2-container-bg"]
        };
        currentRules["--s2-container-bg"]["background === \"layer-1\""] = "layer-1";
    } else if (props.background === "base") {
        rules += ' -Ovbhqd-gX18';
        currentRules["--s2-container-bg"] = typeof currentRules["--s2-container-bg"] === 'object' ? currentRules["--s2-container-bg"] : {
            "default": currentRules["--s2-container-bg"]
        };
        currentRules["--s2-container-bg"]["background === \"base\""] = "base";
    }
    if (props.background === "layer-2") {
        rules += ' gEzkoQe18';
        currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
            "default": currentRules["backgroundColor"]
        };
        currentRules["backgroundColor"]["background === \"layer-2\""] = "--s2-container-bg";
    } else if (props.background === "layer-1") {
        rules += ' gEzkoQe18';
        currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
            "default": currentRules["backgroundColor"]
        };
        currentRules["backgroundColor"]["background === \"layer-1\""] = "--s2-container-bg";
    } else if (props.background === "base") {
        rules += ' gEzkoQe18';
        currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
            "default": currentRules["backgroundColor"]
        };
        currentRules["backgroundColor"]["background === \"base\""] = "--s2-container-bg";
    }
    rules += ' _Bb18';
    currentRules["isolation"] = "isolate";
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Provider.native.js:54:21";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Provider.native.js:54:21"
        };
    }
    return rules;
};
function $38c4fc7450edae36$var$ProviderInner(props) {
    let locale = (0, $dnlDG.useLocale)();
    // This wrapper binds only shared DOM attributes; the intrinsic tag remains unrestricted.
    let Element = (0, $9Xv0G$dynamic)(()=>props.elementType || 'div');
    return (0, $9Xv0G$createComponent)(Element, (0, $9Xv0G$mergeProps)(()=>(0, $5gAIA.filterDOMProps)(props), {
        get lang () {
            return locale.locale;
        },
        get dir () {
            return locale.direction;
        },
        get style () {
            return props.UNSAFE_style;
        },
        get "class" () {
            return (props.UNSAFE_className ?? '') + (0, $cJuZp.mergeStyles)(props.styles, $38c4fc7450edae36$var$providerStyles({
                // Set a default background if the provider is rendered as the root <html> element.
                background: props.background === undefined ? props.elementType === 'html' ? 'base' : undefined : props.background,
                colorScheme: props.colorScheme
            }));
        },
        get children () {
            return [
                (0, $9Xv0G$createComponent)((0, $hL2UH.Fonts), {}),
                (0, $9Xv0G$memo)(()=>props.children)
            ];
        }
    }));
}

});
parcelRegister("hL2UH", function(module, exports) {

$parcel$export(module.exports, "Fonts", function () { return $ced9160395cef184$export$20f257fc407da7a3; });


parcelRequire("ig9q0");
var $dnlDG = parcelRequire("dnlDG");

// Typekit ids for each CJK locale. These use dynamic subsetting, so cannot be loaded as CSS.
// Because of the large size of the JS, we only download the script for the locale that is used.
// Each of these kits includes regular, bold, extra bold, and black weights. Spectrum 2 does not use any lighter weights.
let $ced9160395cef184$var$scripts = {
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
let $ced9160395cef184$var$preloads = {
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
function $ced9160395cef184$export$20f257fc407da7a3() {
    let localeState = (0, $dnlDG.useLocale)();
    let locale = ()=>new Intl.Locale(localeState.locale);
    let languageAndRegion = ()=>locale().language + (locale().region ? '-' + locale().region : '');
    let languageAndScript = ()=>locale().language + (locale().script ? '-' + locale().script : '');
    // Load script tag for CJK font
    let typekitId = ()=>$ced9160395cef184$var$scripts[locale().baseName] || $ced9160395cef184$var$scripts[languageAndRegion()] || $ced9160395cef184$var$scripts[languageAndScript()] || $ced9160395cef184$var$scripts[locale().language];
    let script = ()=>typekitId() ? `https://use.typekit.net/${typekitId()}.js` : null;
    // Native head resources are deduped and retained after scope disposal, including during SSR.
    // Preserve the React 19 CJK early return: a script locale does not also preload fonts.
    (0, $9Xv0G$useHead)(()=>{
        let src = script();
        if (src) return {
            tag: 'script',
            props: {
                async: true,
                src: src
            }
        };
        // Start font loading before the stylesheet downloads, including during SSR.
        let preloadUrls = $ced9160395cef184$var$preloads[locale().language] || $ced9160395cef184$var$preloads.en;
        return preloadUrls.map((href)=>({
                tag: 'link',
                props: {
                    rel: 'preload',
                    href: href,
                    as: 'font',
                    type: 'font/woff2',
                    crossorigin: ''
                }
            }));
    });
    // useHead deliberately does not bind event/ref props. Attach only the owned load listener;
    // never remove a shared kit script when this provider or locale scope is disposed.
    (0, $9Xv0G$createEffect)(script, (src)=>{
        if (!src) return;
        let scriptEl = Array.from(document.scripts).find((s)=>s.src === src);
        if (scriptEl) {
            let onLoad = ()=>{
                let typekit = window.Typekit;
                if (typeof typekit !== 'undefined' && typeof typekit.load === 'function') typekit.load();
            };
            scriptEl.addEventListener('load', onLoad);
            (0, $9Xv0G$onCleanup)(()=>scriptEl.removeEventListener('load', onLoad));
        }
    });
    return null;
}

});
parcelRegister("ig9q0", function(module, exports) {

$parcel$export(module.exports, "I18nProvider", function () { return (parcelRequire("dnlDG")).I18nProvider; });
$parcel$export(module.exports, "useLocale", function () { return (parcelRequire("dnlDG")).useLocale; });
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
var $dnlDG = parcelRequire("dnlDG");


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
    (0, $9Xv0G$onSettled)(()=>(0, $6p9dH.attachRef)(typeof ref === 'function' ? ref : undefined, $ae314f6cf80336a8$export$a5795cc979dfae80(domRef)));
    return domRef;
}
function $ae314f6cf80336a8$export$96a734597687c040(ref, focusableRef) {
    let domRef = (0, $6p9dH.useObjectRef)();
    (0, $9Xv0G$onSettled)(()=>(0, $6p9dH.attachRef)(typeof ref === 'function' ? ref : undefined, $ae314f6cf80336a8$export$79d69eee6ae4b329(domRef, focusableRef)));
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
var $h2cIl = parcelRequire("h2cIl");

var $1FDXt = parcelRequire("1FDXt");

var $ed1Px = parcelRequire("ed1Px");
const $b4defc8a2c1050ed$var$AXIS = {
    top: 'top',
    bottom: 'top',
    left: 'left',
    right: 'left'
};
const $b4defc8a2c1050ed$var$FLIPPED_DIRECTION = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
};
const $b4defc8a2c1050ed$var$CROSS_AXIS = {
    top: 'left',
    left: 'top'
};
const $b4defc8a2c1050ed$var$AXIS_SIZE = {
    top: 'height',
    left: 'width'
};
const $b4defc8a2c1050ed$var$TOTAL_SIZE = {
    width: 'totalWidth',
    height: 'totalHeight'
};
const $b4defc8a2c1050ed$var$PARSED_PLACEMENT_CACHE = {};
let $b4defc8a2c1050ed$var$getVisualViewport = ()=>typeof document !== 'undefined' ? window.visualViewport : null;
function $b4defc8a2c1050ed$var$getContainerDimensions(containerNode, visualViewport) {
    let width = 0, height = 0, totalWidth = 0, totalHeight = 0, top = 0, left = 0;
    let scroll = {};
    let isPinchZoomedIn = (visualViewport?.scale ?? 1) > 1;
    // In the case where the container is `html` or `body` and the container doesn't have something like `position: relative`,
    // then position absolute will be positioned relative to the viewport, also known as the `initial containing block`.
    // That's why we use the visual viewport instead.
    if (containerNode.tagName === 'BODY' || containerNode.tagName === 'HTML') {
        let documentElement = document.documentElement;
        totalWidth = documentElement.clientWidth;
        totalHeight = documentElement.clientHeight;
        width = visualViewport?.width ?? totalWidth;
        height = visualViewport?.height ?? totalHeight;
        scroll.top = documentElement.scrollTop || containerNode.scrollTop;
        scroll.left = documentElement.scrollLeft || containerNode.scrollLeft;
        // The goal of the below is to get a top/left value that represents the top/left of the visual viewport with
        // respect to the layout viewport origin. This combined with the scrollTop/scrollLeft will allow us to calculate
        // coordinates/values with respect to the visual viewport or with respect to the layout viewport.
        // Uses pageTop/pageLeft instead of offsetTop/offsetLeft because WebKit misreports those during pans.
        if (visualViewport) {
            top = Math.max(0, visualViewport.pageTop - (scroll.top ?? 0));
            left = Math.max(0, visualViewport.pageLeft - (scroll.left ?? 0));
        }
    } else {
        ({ width: width, height: height, top: top, left: left } = $b4defc8a2c1050ed$var$getOffset(containerNode, false));
        scroll.top = containerNode.scrollTop;
        scroll.left = containerNode.scrollLeft;
        totalWidth = width;
        totalHeight = height;
    }
    if ((0, $1FDXt.isWebKit)() && (containerNode.tagName === 'BODY' || containerNode.tagName === 'HTML') && isPinchZoomedIn) {
        // Safari will report a non-zero scrollTop/Left for the non-scrolling body/HTML element when pinch zoomed in unlike other browsers.
        // Set to zero for parity calculations so we get consistent positioning of overlays across all browsers.
        // Also switch to visualViewport.pageTop/pageLeft so that we still accomodate for scroll positioning for body/HTML elements that are actually scrollable
        // before pinch zoom happens
        scroll.top = 0;
        scroll.left = 0;
        top = visualViewport?.pageTop ?? 0;
        left = visualViewport?.pageLeft ?? 0;
    }
    return {
        width: width,
        height: height,
        totalWidth: totalWidth,
        totalHeight: totalHeight,
        scroll: scroll,
        top: top,
        left: left
    };
}
function $b4defc8a2c1050ed$var$getScroll(node) {
    return {
        top: node.scrollTop,
        left: node.scrollLeft,
        width: node.scrollWidth,
        height: node.scrollHeight
    };
}
// Determines the amount of space required when moving the overlay to ensure it remains in the boundary
function $b4defc8a2c1050ed$var$getDelta(axis, offset, size, // The dimensions of the boundary element that the popover is
// positioned within (most of the time this is the <body>).
boundaryDimensions, // The dimensions of the containing block element that the popover is
// positioned relative to (e.g. parent with position: relative).
// Usually this is the same as the boundary element, but if the popover
// is portaled somewhere other than the body and has an ancestor with
// position: relative/absolute, it will be different.
containerDimensions, padding, containerOffsetWithBoundary) {
    let containerScroll = containerDimensions.scroll[axis] ?? 0;
    // The height/width of the boundary. Matches the axis along which we are adjusting the overlay position
    let boundarySize = boundaryDimensions[$b4defc8a2c1050ed$var$AXIS_SIZE[axis]];
    // Calculate the edges of the boundary (accomodating for the boundary padding) and the edges of the overlay.
    // Note that these values are with respect to the visual viewport (aka 0,0 is the top left of the viewport)
    let boundaryStartEdge = containerOffsetWithBoundary[axis] + boundaryDimensions.scroll[$b4defc8a2c1050ed$var$AXIS[axis]] + padding;
    let boundaryEndEdge = containerOffsetWithBoundary[axis] + boundaryDimensions.scroll[$b4defc8a2c1050ed$var$AXIS[axis]] + boundarySize - padding;
    // transformed value of the left edge of the overlay
    let startEdgeOffset = offset - containerScroll + boundaryDimensions.scroll[$b4defc8a2c1050ed$var$AXIS[axis]] + containerOffsetWithBoundary[axis] - boundaryDimensions[$b4defc8a2c1050ed$var$AXIS[axis]];
    // transformed value of the right edge of the overlay
    let endEdgeOffset = offset - containerScroll + size + boundaryDimensions.scroll[$b4defc8a2c1050ed$var$AXIS[axis]] + containerOffsetWithBoundary[axis] - boundaryDimensions[$b4defc8a2c1050ed$var$AXIS[axis]];
    // If any of the overlay edges falls outside of the boundary, shift the overlay the required amount to align one of the overlay's
    // edges with the closest boundary edge.
    if (startEdgeOffset < boundaryStartEdge) return boundaryStartEdge - startEdgeOffset;
    else if (endEdgeOffset > boundaryEndEdge) return Math.max(boundaryEndEdge - endEdgeOffset, boundaryStartEdge - startEdgeOffset);
    else return 0;
}
function $b4defc8a2c1050ed$var$getMargins(node) {
    let style = window.getComputedStyle(node);
    return {
        top: parseInt(style.marginTop, 10) || 0,
        bottom: parseInt(style.marginBottom, 10) || 0,
        left: parseInt(style.marginLeft, 10) || 0,
        right: parseInt(style.marginRight, 10) || 0
    };
}
function $b4defc8a2c1050ed$var$parsePlacement(input) {
    if ($b4defc8a2c1050ed$var$PARSED_PLACEMENT_CACHE[input]) return $b4defc8a2c1050ed$var$PARSED_PLACEMENT_CACHE[input];
    let [placement, crossPlacement] = input.split(' ');
    let axis = $b4defc8a2c1050ed$var$AXIS[placement] || 'right';
    let crossAxis = $b4defc8a2c1050ed$var$CROSS_AXIS[axis];
    if (!$b4defc8a2c1050ed$var$AXIS[crossPlacement]) crossPlacement = 'center';
    let size = $b4defc8a2c1050ed$var$AXIS_SIZE[axis];
    let crossSize = $b4defc8a2c1050ed$var$AXIS_SIZE[crossAxis];
    $b4defc8a2c1050ed$var$PARSED_PLACEMENT_CACHE[input] = {
        placement: placement,
        crossPlacement: crossPlacement,
        axis: axis,
        crossAxis: crossAxis,
        size: size,
        crossSize: crossSize
    };
    return $b4defc8a2c1050ed$var$PARSED_PLACEMENT_CACHE[input];
}
function $b4defc8a2c1050ed$var$computePosition(childOffset, boundaryDimensions, overlaySize, placementInfo, offset, crossOffset, containerOffsetWithBoundary, isContainerPositioned, arrowSize, arrowBoundaryOffset, containerDimensions) {
    let { placement: placement, crossPlacement: crossPlacement, axis: axis, crossAxis: crossAxis, size: size, crossSize: crossSize } = placementInfo;
    let position = {};
    // button position
    position[crossAxis] = childOffset[crossAxis] ?? 0;
    if (crossPlacement === 'center') //  + (button size / 2) - (overlay size / 2)
    // at this point the overlay center should match the button center
    position[crossAxis] += ((childOffset[crossSize] ?? 0) - (overlaySize[crossSize] ?? 0)) / 2;
    else if (crossPlacement !== crossAxis) //  + (button size) - (overlay size)
    // at this point the overlay bottom should match the button bottom
    position[crossAxis] += (childOffset[crossSize] ?? 0) - (overlaySize[crossSize] ?? 0);
     /* else {
      the overlay top should match the button top
      } */ 
    position[crossAxis] += crossOffset;
    // overlay top or left overlapping arrow with button bottom or right
    const minPosition = childOffset[crossAxis] - overlaySize[crossSize] + arrowSize + arrowBoundaryOffset;
    // overlay bottom or right overlapping arrow with button top or left
    const maxPosition = childOffset[crossAxis] + childOffset[crossSize] - arrowSize - arrowBoundaryOffset;
    position[crossAxis] = (0, $h2cIl.clamp)(position[crossAxis], minPosition, maxPosition);
    // Floor these so the position isn't placed on a partial pixel, only whole pixels. Shouldn't matter if it was floored or ceiled, so chose one.
    if (placement === axis) {
        // If the container is positioned (non-static), then we use the container's actual
        // height, as `bottom` will be relative to this height.  But if the container is static,
        // then it can only be the `document.body`, and `bottom` will be relative to _its_
        // container.
        let containerHeight = isContainerPositioned ? containerDimensions[size] : containerDimensions[$b4defc8a2c1050ed$var$TOTAL_SIZE[size]];
        position[$b4defc8a2c1050ed$var$FLIPPED_DIRECTION[axis]] = Math.floor(containerHeight - childOffset[axis] + offset);
    } else position[axis] = Math.floor(childOffset[axis] + childOffset[size] + offset);
    return position;
}
function $b4defc8a2c1050ed$var$getMaxHeight(position, boundaryDimensions, containerOffsetWithBoundary, isContainerPositioned, margins, padding, overlayHeight, heightGrowthDirection, containerDimensions, isContainerDescendentOfBoundary, visualViewport) {
    // For cases where position is set via "bottom" instead of "top", we need to calculate the true overlay top
    // with respect to the container.
    let overlayTop = (position.top != null ? position.top : containerDimensions[$b4defc8a2c1050ed$var$TOTAL_SIZE.height] - (position.bottom ?? 0) - overlayHeight) - (containerDimensions.scroll.top ?? 0);
    // calculate the dimentions of the "boundingRect" which is most restrictive top/bottom of the boundaryRect and the visual view port
    let boundaryToContainerTransformOffset = isContainerDescendentOfBoundary ? containerOffsetWithBoundary.top : 0;
    let boundingRect = {
        // This should be boundary top in container coord system vs viewport top in container coord system
        // For the viewport top, there are several cases
        // 1. pinchzoom case where we want the viewports offset top as top here
        // 2. case where container is offset from the boundary and is contained by the boundary. In this case the top we want here is NOT 0, we want to take boundary's top even though is is a negative number OR the visual viewport, whichever is more restrictive
        top: Math.max(boundaryDimensions.top + boundaryToContainerTransformOffset, (visualViewport?.offsetTop ?? boundaryDimensions.top) + boundaryToContainerTransformOffset),
        bottom: Math.min(boundaryDimensions.top + boundaryDimensions.height + boundaryToContainerTransformOffset, (visualViewport?.offsetTop ?? 0) + (visualViewport?.height ?? 0))
    };
    let maxHeight = heightGrowthDirection !== 'top' ? // We want the distance between the top of the overlay to the bottom of the boundary
    Math.max(0, boundingRect.bottom - // this is the bottom of the boundary
    overlayTop - (// this is the top of the overlay
    (margins.top ?? 0) + (margins.bottom ?? 0) + padding // save additional space for margin and padding
    )) : // We want the distance between the bottom of the overlay to the top of the boundary
    Math.max(0, overlayTop + overlayHeight - // this is the bottom of the overlay
    boundingRect.top - (// this is the top of the boundary
    (margins.top ?? 0) + (margins.bottom ?? 0) + padding // save additional space for margin and padding
    ));
    return maxHeight;
}
function $b4defc8a2c1050ed$var$getAvailableSpace(boundaryDimensions, // boundary
containerOffsetWithBoundary, childOffset, // trigger, position based of container's non-viewport 0,0
margins, // overlay
padding, // overlay <-> boundary
placementInfo, containerDimensions, isContainerDescendentOfBoundary) {
    let { placement: placement, axis: axis, size: size } = placementInfo;
    if (placement === axis) return Math.max(0, childOffset[axis] - // trigger start
    (containerDimensions.scroll[axis] ?? 0) - // transform trigger position to be with respect to viewport 0,0
    (boundaryDimensions[axis] + (isContainerDescendentOfBoundary ? containerOffsetWithBoundary[axis] : 0)) - // boundary start
    (margins[axis] ?? 0) - // margins usually for arrows or other decorations
    margins[$b4defc8a2c1050ed$var$FLIPPED_DIRECTION[axis]] - padding); // padding between overlay and boundary
    return Math.max(0, boundaryDimensions[size] + boundaryDimensions[axis] + (isContainerDescendentOfBoundary ? containerOffsetWithBoundary[axis] : 0) - childOffset[axis] - childOffset[size] + (containerDimensions.scroll[axis] ?? 0) - (margins[axis] ?? 0) - margins[$b4defc8a2c1050ed$var$FLIPPED_DIRECTION[axis]] - padding);
}
function $b4defc8a2c1050ed$export$6839422d1f33cee9(placementInput, childOffset, overlaySize, scrollSize, margins, padding, flip, boundaryDimensions, containerDimensions, containerOffsetWithBoundary, offset, crossOffset, isContainerPositioned, userSetMaxHeight, arrowSize, arrowBoundaryOffset, isContainerDescendentOfBoundary, visualViewport) {
    let placementInfo = $b4defc8a2c1050ed$var$parsePlacement(placementInput);
    let { size: size, crossAxis: crossAxis, crossSize: crossSize, placement: placement, crossPlacement: crossPlacement } = placementInfo;
    let position = $b4defc8a2c1050ed$var$computePosition(childOffset, boundaryDimensions, overlaySize, placementInfo, offset, crossOffset, containerOffsetWithBoundary, isContainerPositioned, arrowSize, arrowBoundaryOffset, containerDimensions);
    let normalizedOffset = offset;
    let space = $b4defc8a2c1050ed$var$getAvailableSpace(boundaryDimensions, containerOffsetWithBoundary, childOffset, margins, padding + offset, placementInfo, containerDimensions, isContainerDescendentOfBoundary);
    // Check if the scroll size of the overlay is greater than the available space to determine if we need to flip
    if (flip && overlaySize[size] > space) {
        let flippedPlacementInfo = $b4defc8a2c1050ed$var$parsePlacement(`${$b4defc8a2c1050ed$var$FLIPPED_DIRECTION[placement]} ${crossPlacement}`);
        let flippedPosition = $b4defc8a2c1050ed$var$computePosition(childOffset, boundaryDimensions, overlaySize, flippedPlacementInfo, offset, crossOffset, containerOffsetWithBoundary, isContainerPositioned, arrowSize, arrowBoundaryOffset, containerDimensions);
        let flippedSpace = $b4defc8a2c1050ed$var$getAvailableSpace(boundaryDimensions, containerOffsetWithBoundary, childOffset, margins, padding + offset, flippedPlacementInfo, containerDimensions, isContainerDescendentOfBoundary);
        // If the available space for the flipped position is greater than the original available space, flip.
        if (flippedSpace > space) {
            placementInfo = flippedPlacementInfo;
            position = flippedPosition;
            normalizedOffset = offset;
        }
    }
    // Determine the direction the height of the overlay can grow so that we can choose how to calculate the max height
    let heightGrowthDirection = 'bottom';
    if (placementInfo.axis === 'top') {
        if (placementInfo.placement === 'top') heightGrowthDirection = 'top';
        else if (placementInfo.placement === 'bottom') heightGrowthDirection = 'bottom';
    } else if (placementInfo.crossAxis === 'top') {
        if (placementInfo.crossPlacement === 'top') heightGrowthDirection = 'bottom';
        else if (placementInfo.crossPlacement === 'bottom') heightGrowthDirection = 'top';
    }
    let delta = $b4defc8a2c1050ed$var$getDelta(crossAxis, position[crossAxis], overlaySize[crossSize], boundaryDimensions, containerDimensions, padding, containerOffsetWithBoundary);
    position[crossAxis] += delta;
    let maxHeight = $b4defc8a2c1050ed$var$getMaxHeight(position, boundaryDimensions, containerOffsetWithBoundary, isContainerPositioned, margins, padding, overlaySize.height, heightGrowthDirection, containerDimensions, isContainerDescendentOfBoundary, visualViewport);
    if (userSetMaxHeight && userSetMaxHeight < maxHeight) maxHeight = userSetMaxHeight;
    overlaySize.height = Math.min(overlaySize.height, maxHeight);
    position = $b4defc8a2c1050ed$var$computePosition(childOffset, boundaryDimensions, overlaySize, placementInfo, normalizedOffset, crossOffset, containerOffsetWithBoundary, isContainerPositioned, arrowSize, arrowBoundaryOffset, containerDimensions);
    delta = $b4defc8a2c1050ed$var$getDelta(crossAxis, position[crossAxis], overlaySize[crossSize], boundaryDimensions, containerDimensions, padding, containerOffsetWithBoundary);
    position[crossAxis] += delta;
    let arrowPosition = {};
    // All values are transformed so that 0 is at the top/left of the overlay depending on the orientation
    // Prefer the arrow being in the center of the trigger/overlay anchor element
    // childOffset[crossAxis] + .5 * childOffset[crossSize] = absolute position with respect to the trigger's coordinate system that would place the arrow in the center of the trigger
    // position[crossAxis] - margins[AXIS[crossAxis]] = value use to transform the position to a value with respect to the overlay's coordinate system. A child element's (aka arrow) position absolute's "0"
    // is positioned after the margin of its parent (aka overlay) so we need to subtract it to get the proper coordinate transform
    let origin = childOffset[crossAxis] - position[crossAxis] - margins[$b4defc8a2c1050ed$var$AXIS[crossAxis]];
    let preferredArrowPosition = origin + 0.5 * childOffset[crossSize];
    // Min/Max position limits for the arrow with respect to the overlay
    const arrowMinPosition = arrowSize / 2 + arrowBoundaryOffset;
    // overlaySize[crossSize] - margins = true size of the overlay
    const overlayMargin = $b4defc8a2c1050ed$var$AXIS[crossAxis] === 'left' ? (margins.left ?? 0) + (margins.right ?? 0) : (margins.top ?? 0) + (margins.bottom ?? 0);
    const arrowMaxPosition = overlaySize[crossSize] - overlayMargin - arrowSize / 2 - arrowBoundaryOffset;
    // Min/Max position limits for the arrow with respect to the trigger/overlay anchor element
    // Same margin accomodation done here as well as for the preferredArrowPosition
    const arrowOverlappingChildMinEdge = childOffset[crossAxis] + arrowSize / 2 - (position[crossAxis] + margins[$b4defc8a2c1050ed$var$AXIS[crossAxis]]);
    const arrowOverlappingChildMaxEdge = childOffset[crossAxis] + childOffset[crossSize] - arrowSize / 2 - (position[crossAxis] + margins[$b4defc8a2c1050ed$var$AXIS[crossAxis]]);
    // Clamp the arrow positioning so that it always is within the bounds of the anchor and the overlay
    const arrowPositionOverlappingChild = (0, $h2cIl.clamp)(preferredArrowPosition, arrowOverlappingChildMinEdge, arrowOverlappingChildMaxEdge);
    arrowPosition[crossAxis] = (0, $h2cIl.clamp)(arrowPositionOverlappingChild, arrowMinPosition, arrowMaxPosition);
    // If there is an arrow, use that as the origin so that animations are smooth.
    // Otherwise use the target edge.
    ({ placement: placement, crossPlacement: crossPlacement } = placementInfo);
    if (arrowSize) origin = arrowPosition[crossAxis];
    else if (crossPlacement === 'right') origin += childOffset[crossSize];
    else if (crossPlacement === 'center') origin += childOffset[crossSize] / 2;
    let crossOrigin = placement === 'left' || placement === 'top' ? overlaySize[size] : 0;
    let triggerAnchorPoint = {
        x: placement === 'top' || placement === 'bottom' ? origin : crossOrigin,
        y: placement === 'left' || placement === 'right' ? origin : crossOrigin
    };
    return {
        position: position,
        maxHeight: maxHeight,
        arrowOffsetLeft: arrowPosition.left,
        arrowOffsetTop: arrowPosition.top,
        placement: placement,
        triggerAnchorPoint: triggerAnchorPoint
    };
}
function $b4defc8a2c1050ed$export$b3ceb0cbf1056d98(opts) {
    let { placement: placement, targetNode: targetNode, overlayNode: overlayNode, scrollNode: scrollNode, padding: padding, shouldFlip: shouldFlip, boundaryElement: boundaryElement, offset: offset, crossOffset: crossOffset, maxHeight: maxHeight, arrowSize: arrowSize = 0, arrowBoundaryOffset: arrowBoundaryOffset = 0, targetRect: targetRect } = opts;
    let visualViewport = $b4defc8a2c1050ed$var$getVisualViewport();
    let container = overlayNode instanceof HTMLElement ? $b4defc8a2c1050ed$var$getContainingBlock(overlayNode) : document.documentElement;
    let isViewportContainer = container === document.documentElement;
    const containerPositionStyle = window.getComputedStyle(container).position;
    let isContainerPositioned = !!containerPositionStyle && containerPositionStyle !== 'static';
    let childOffset = isViewportContainer ? $b4defc8a2c1050ed$var$getOffset(targetNode, false, targetRect) : $b4defc8a2c1050ed$var$getPosition(targetNode, container, false, targetRect);
    if (!isViewportContainer) {
        let { marginTop: marginTop, marginLeft: marginLeft } = window.getComputedStyle(targetNode);
        childOffset.top += parseInt(marginTop, 10) || 0;
        childOffset.left += parseInt(marginLeft, 10) || 0;
    }
    let overlaySize = $b4defc8a2c1050ed$var$getOffset(overlayNode, true);
    let margins = $b4defc8a2c1050ed$var$getMargins(overlayNode);
    overlaySize.width += (margins.left ?? 0) + (margins.right ?? 0);
    overlaySize.height += (margins.top ?? 0) + (margins.bottom ?? 0);
    let scrollSize = $b4defc8a2c1050ed$var$getScroll(scrollNode);
    // Note that due to logic inside getContainerDimensions, for cases where the boundary element is the body, we will return
    // a height/width that matches the visual viewport size rather than the body's height/width (aka for zoom it will be zoom adjusted size)
    // and a top/left that is adjusted as well (will return the top/left of the zoomed in viewport, or 0,0 for a non-zoomed body)
    // Otherwise this returns the height/width of a arbitrary boundary element, and its top/left with respect to the viewport (NOTE THIS MEANS IT DOESNT INCLUDE SCROLL)
    let boundaryDimensions = $b4defc8a2c1050ed$var$getContainerDimensions(boundaryElement, visualViewport);
    let containerDimensions = $b4defc8a2c1050ed$var$getContainerDimensions(container, visualViewport);
    // There are several difference cases of how to calculate the containerOffsetWithBoundary:
    // - boundaryElement is body or HTML and the container is an arbitrary element in the boundary (aka submenu with parent menu as container in v3)
    // - boundaryElement and container are both body or HTML element (aka standard popover case)
    // - boundaryElement is customized by the user. Container can also be arbitrary (either body/HTML or some other element)
    // containerOffsetWithBoundary should always return a value that is the boundary's coordinate offset with respect to the container coord system (container is 0, 0)
    let containerOffsetWithBoundary;
    if ((boundaryElement.tagName === 'BODY' || boundaryElement.tagName === 'HTML') && !isViewportContainer) {
        // Use getRect instead of getOffset because boundaryDimensions for BODY/HTML is in viewport coordinate space,
        // not document coordinate space
        let containerRect = $b4defc8a2c1050ed$export$4b834cebd9e5cebe(container, false);
        // the offset should be negative because if container is at viewport position x,y, then viewport top (aka 0)
        // is at position -x,y in container-relative coordinates
        containerOffsetWithBoundary = {
            top: -(containerRect.top - boundaryDimensions.top),
            left: -(containerRect.left - boundaryDimensions.left),
            width: 0,
            height: 0
        };
    } else if ((boundaryElement.tagName === 'BODY' || boundaryElement.tagName === 'HTML') && isViewportContainer) // both are the same viewport container, no offset needed
    containerOffsetWithBoundary = {
        top: 0,
        left: 0,
        width: 0,
        height: 0
    };
    else // This returns the boundary's coordinate with respect to the container. This case captures cases such as when you provide a custom boundary
    // like in ScrollingBoundaryContainerExample in Popover.stories.
    containerOffsetWithBoundary = $b4defc8a2c1050ed$var$getPosition(boundaryElement, container, false);
    let isContainerDescendentOfBoundary = (0, $ed1Px.nodeContains)(boundaryElement, container);
    return $b4defc8a2c1050ed$export$6839422d1f33cee9(placement, childOffset, overlaySize, scrollSize, margins, padding, shouldFlip, boundaryDimensions, containerDimensions, containerOffsetWithBoundary, offset, crossOffset, isContainerPositioned, maxHeight, arrowSize, arrowBoundaryOffset, isContainerDescendentOfBoundary, visualViewport);
}
function $b4defc8a2c1050ed$export$4b834cebd9e5cebe(node, ignoreScale) {
    let { top: top, left: left, width: width, height: height } = node.getBoundingClientRect();
    // Use offsetWidth and offsetHeight if this is an HTML element, so that
    // the size is not affected by scale transforms.
    if (ignoreScale && node instanceof node.ownerDocument.defaultView.HTMLElement) {
        width = node.offsetWidth;
        height = node.offsetHeight;
    }
    return {
        top: top,
        left: left,
        width: width,
        height: height
    };
}
function $b4defc8a2c1050ed$var$getOffset(node, ignoreScale, overrideRect) {
    let { top: top, left: left, width: width, height: height } = overrideRect || $b4defc8a2c1050ed$export$4b834cebd9e5cebe(node, ignoreScale);
    let { scrollTop: scrollTop, scrollLeft: scrollLeft, clientTop: clientTop, clientLeft: clientLeft } = document.documentElement;
    return {
        top: top + scrollTop - clientTop,
        left: left + scrollLeft - clientLeft,
        width: width,
        height: height
    };
}
function $b4defc8a2c1050ed$var$getPosition(node, parent, ignoreScale, overrideRect) {
    let style = window.getComputedStyle(node);
    let offset;
    if (style.position === 'fixed') offset = overrideRect || $b4defc8a2c1050ed$export$4b834cebd9e5cebe(node, ignoreScale);
    else {
        offset = $b4defc8a2c1050ed$var$getOffset(node, ignoreScale, overrideRect);
        let parentOffset = $b4defc8a2c1050ed$var$getOffset(parent, ignoreScale);
        let parentStyle = window.getComputedStyle(parent);
        parentOffset.top += (parseInt(parentStyle.borderTopWidth, 10) || 0) - parent.scrollTop;
        parentOffset.left += (parseInt(parentStyle.borderLeftWidth, 10) || 0) - parent.scrollLeft;
        offset.top -= parentOffset.top;
        offset.left -= parentOffset.left;
    }
    offset.top -= parseInt(style.marginTop, 10) || 0;
    offset.left -= parseInt(style.marginLeft, 10) || 0;
    return offset;
}
// Returns the containing block of an element, which is the element that
// this element will be positioned relative to.
// https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block
function $b4defc8a2c1050ed$var$getContainingBlock(node) {
    // The offsetParent of an element in most cases equals the containing block.
    // https://w3c.github.io/csswg-drafts/cssom-view/#dom-htmlelement-offsetparent
    let offsetParent = node.offsetParent;
    // The offsetParent algorithm terminates at the document body,
    // even if the body is not a containing block. Double check that
    // and use the documentElement if so.
    if (offsetParent && offsetParent === document.body && window.getComputedStyle(offsetParent).position === 'static' && !$b4defc8a2c1050ed$var$isContainingBlock(offsetParent)) offsetParent = document.documentElement;
    // TODO(later): handle table elements?
    // The offsetParent can be null if the element has position: fixed, or a few other cases.
    // We have to walk up the tree manually in this case because fixed positioned elements
    // are still positioned relative to their containing block, which is not always the viewport.
    if (offsetParent == null) {
        offsetParent = node.parentElement;
        while(offsetParent && !$b4defc8a2c1050ed$var$isContainingBlock(offsetParent))offsetParent = offsetParent.parentElement;
    }
    // Fall back to the viewport.
    return offsetParent || document.documentElement;
}
// https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
function $b4defc8a2c1050ed$var$isContainingBlock(node) {
    let style = window.getComputedStyle(node);
    return style.transform !== 'none' || /transform|perspective/.test(style.willChange) || style.filter !== 'none' || style.contain === 'paint' || 'backdropFilter' in style && style.backdropFilter !== 'none' || 'WebkitBackdropFilter' in style && style.WebkitBackdropFilter !== 'none';
}



var $ed1Px = parcelRequire("ed1Px");


var $cxzEt = parcelRequire("cxzEt");

var $czX2l = parcelRequire("czX2l");

var $dnlDG = parcelRequire("dnlDG");

var $fDU3z = parcelRequire("fDU3z");
let $be5c4a35d39b34ae$var$visualViewport = typeof document !== 'undefined' ? window.visualViewport : null;
function $be5c4a35d39b34ae$export$d39e1813b3bdd0e1(props) {
    let locale = (0, $dnlDG.useLocale)();
    let [position, setPosition] = (0, $9Xv0G$createSignal)(null);
    let deps = ()=>[
            props.shouldUpdatePosition,
            props.placement,
            props.overlayRef.current,
            props.targetRef.current,
            props.arrowRef?.current,
            (props.scrollRef ?? props.overlayRef).current,
            props.containerPadding,
            props.shouldFlip,
            props.boundaryElement,
            props.offset,
            props.crossOffset,
            props.isOpen,
            locale.direction,
            props.maxHeight,
            props.arrowBoundaryOffset,
            props.arrowSize,
            props.getTargetRect
        ];
    let lastScale = {
        current: $be5c4a35d39b34ae$var$visualViewport?.scale
    };
    (0, $9Xv0G$createEffect)(()=>props.isOpen ?? true, (isOpen)=>{
        if (isOpen) lastScale.current = $be5c4a35d39b34ae$var$visualViewport?.scale;
    });
    // Measurement is also called by native resize/scroll observers. Sample live
    // inputs at dispatch; deps above owns the reactive invalidation separately.
    let updatePosition = (0, $czX2l.useEffectEvent)(()=>{
        let { direction: direction } = locale;
        let { arrowSize: arrowSize, targetRef: targetRef, overlayRef: overlayRef, arrowRef: arrowRef, scrollRef: scrollRef = overlayRef, placement: placement = 'bottom', containerPadding: containerPadding = 12, shouldFlip: shouldFlip = true, boundaryElement: boundaryElement = typeof document !== 'undefined' ? document.body : null, offset: offset = 0, crossOffset: crossOffset = 0, shouldUpdatePosition: shouldUpdatePosition = true, isOpen: isOpen = true, onClose: onClose, maxHeight: maxHeight, arrowBoundaryOffset: arrowBoundaryOffset = 0, getTargetRect: getTargetRect } = props;
        if (shouldUpdatePosition === false || !isOpen || !overlayRef.current || !targetRef.current || !boundaryElement) return;
        if ($be5c4a35d39b34ae$var$visualViewport?.scale !== lastScale.current) return;
        // Determine a scroll anchor based on the focused element.
        // This stores the offset of the anchor element from the scroll container
        // so it can be restored after repositioning. This way if the overlay height
        // changes, the focused element appears to stay in the same position.
        let anchor = null;
        if (scrollRef.current && (0, $ed1Px.isFocusWithin)(scrollRef.current)) {
            let anchorRect = (0, $ed1Px.getActiveElement)()?.getBoundingClientRect();
            let scrollRect = scrollRef.current.getBoundingClientRect();
            // Anchor from the top if the offset is in the top half of the scrollable element,
            // otherwise anchor from the bottom.
            anchor = {
                type: 'top',
                offset: (anchorRect?.top ?? 0) - scrollRect.top
            };
            if (anchor.offset > scrollRect.height / 2) {
                anchor.type = 'bottom';
                anchor.offset = (anchorRect?.bottom ?? 0) - scrollRect.bottom;
            }
        }
        // Always reset the overlay's previous max height if not defined by the user so that we can compensate for
        // RAC collections populating after a second render and properly set a correct max height + positioning when it populates.
        let overlay = overlayRef.current;
        if (!maxHeight && overlayRef.current) {
            overlay.style.top = '0px';
            overlay.style.bottom = '';
            overlay.style.maxHeight = (window.visualViewport?.height ?? window.innerHeight) + 'px';
        }
        let position = (0, $b4defc8a2c1050ed$export$b3ceb0cbf1056d98)({
            placement: $be5c4a35d39b34ae$var$translateRTL(placement, direction),
            overlayNode: overlayRef.current,
            targetNode: targetRef.current,
            scrollNode: scrollRef.current || overlayRef.current,
            padding: containerPadding,
            shouldFlip: shouldFlip,
            boundaryElement: boundaryElement,
            offset: offset,
            crossOffset: crossOffset,
            maxHeight: maxHeight,
            arrowSize: arrowSize ?? (arrowRef?.current ? (0, $b4defc8a2c1050ed$export$4b834cebd9e5cebe)(arrowRef.current, true).width : 0),
            arrowBoundaryOffset: arrowBoundaryOffset,
            targetRect: getTargetRect?.(targetRef.current)
        });
        if (!position.position) return;
        // Modify overlay styles directly so positioning happens immediately without the need of a second render
        // This is so we don't have to delay autoFocus scrolling or delay applying preventScroll for popovers
        overlay.style.top = '';
        overlay.style.bottom = '';
        overlay.style.left = '';
        overlay.style.right = '';
        Object.keys(position.position).forEach((key)=>overlay.style[key] = position.position[key] + 'px');
        overlay.style.maxHeight = position.maxHeight != null ? position.maxHeight + 'px' : '';
        // Restore scroll position relative to anchor element.
        let activeElement = (0, $ed1Px.getActiveElement)();
        if (anchor && activeElement && scrollRef.current) {
            let anchorRect = activeElement.getBoundingClientRect();
            let scrollRect = scrollRef.current.getBoundingClientRect();
            let newOffset = anchorRect[anchor.type] - scrollRect[anchor.type];
            scrollRef.current.scrollTop += newOffset - anchor.offset;
        }
        // Trigger a set state for a second render anyway for arrow positioning
        setPosition(position);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // oxlint-disable-next-line react/react-compiler, react-hooks/exhaustive-deps
    });
    // Update position when anything changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // oxlint-disable-next-line react/react-compiler, react-hooks/exhaustive-deps
    (0, $9Xv0G$createEffect)(deps, ()=>{
        updatePosition();
    });
    (0, $9Xv0G$onSettled)(()=>{
        updatePosition();
    });
    // Update position on window resize
    $be5c4a35d39b34ae$var$useResize(updatePosition);
    // Update position when the overlay changes size (might need to flip).
    (0, $fDU3z.useResizeObserver)({
        get ref () {
            return props.overlayRef;
        },
        onResize: updatePosition
    });
    // Update position when the target changes size (might need to flip).
    (0, $fDU3z.useResizeObserver)({
        get ref () {
            return props.targetRef;
        },
        onResize: updatePosition
    });
    // Reposition the overlay and do not close on scroll while the visual viewport is resizing.
    // This will ensure that overlays adjust their positioning when the iOS virtual keyboard appears.
    let isResizing = {
        current: false
    };
    (0, $9Xv0G$onSettled)(()=>{
        let timeout;
        let onResize = ()=>{
            isResizing.current = true;
            clearTimeout(timeout);
            timeout = setTimeout(()=>{
                isResizing.current = false;
            }, 500);
            updatePosition();
        };
        // Only reposition the overlay if a scroll event happens immediately as a result of resize (aka the virtual keyboard has appears)
        // We don't want to reposition the overlay if the user has pinch zoomed in and is scrolling the viewport around.
        let onScroll = ()=>{
            if (isResizing.current) onResize();
        };
        $be5c4a35d39b34ae$var$visualViewport?.addEventListener('resize', onResize);
        $be5c4a35d39b34ae$var$visualViewport?.addEventListener('scroll', onScroll);
        let cleanup = (0, $gi7Zf.addEvent)(// @ts-expect-error
        (0, $ed1Px.getPropagationTargets)(window), 'scroll', onScroll);
        return ()=>{
            $be5c4a35d39b34ae$var$visualViewport?.removeEventListener('resize', onResize);
            $be5c4a35d39b34ae$var$visualViewport?.removeEventListener('scroll', onScroll);
            cleanup();
            clearTimeout(timeout);
        };
    });
    let close = ()=>{
        if (!isResizing.current) props.onClose?.();
    };
    // When scrolling a parent scrollable region of the trigger (other than the body),
    // we hide the popover. Otherwise, its position would be incorrect.
    (0, $cxzEt.useCloseOnScroll)({
        get triggerRef () {
            return props.targetRef;
        },
        get isOpen () {
            return props.isOpen ?? true;
        },
        get onClose () {
            return props.onClose && close;
        }
    });
    return {
        overlayProps: {
            get style () {
                return {
                    position: position() ? 'absolute' : 'fixed',
                    top: !position() ? '0px' : undefined,
                    left: !position() ? '0px' : undefined,
                    'z-index': 100000,
                    // should match the z-index in ModalTrigger
                    ...Object.fromEntries(Object.entries(position()?.position ?? {}).map(([key, value])=>[
                            key,
                            value + 'px'
                        ])),
                    'max-height': position()?.maxHeight != null ? position().maxHeight + 'px' : '100vh'
                };
            }
        },
        placement: ()=>position()?.placement ?? null,
        triggerAnchorPoint: ()=>position()?.triggerAnchorPoint ?? null,
        arrowProps: {
            'aria-hidden': 'true',
            role: 'presentation',
            get style () {
                return {
                    left: position()?.arrowOffsetLeft != null ? position().arrowOffsetLeft + 'px' : undefined,
                    top: position()?.arrowOffsetTop != null ? position().arrowOffsetTop + 'px' : undefined
                };
            }
        },
        updatePosition: updatePosition
    };
}
function $be5c4a35d39b34ae$var$useResize(onResize) {
    (0, $9Xv0G$onSettled)(()=>{
        window.addEventListener('resize', onResize, false);
        return ()=>{
            window.removeEventListener('resize', onResize, false);
        };
    });
}
function $be5c4a35d39b34ae$var$translateRTL(position, direction) {
    if (direction === 'rtl') return position.replace('start', 'right').replace('end', 'left');
    return position.replace('start', 'left').replace('end', 'right');
}



var $2A4az = parcelRequire("2A4az");
parcelRequire("bAtJj");
var $5gAIA = parcelRequire("5gAIA");

var $kKI9C = parcelRequire("kKI9C");
parcelRequire("2iotZ");
var $7boJ2 = parcelRequire("7boJ2");


var $2A4az = parcelRequire("2A4az");
parcelRequire("bAtJj");
var $5gAIA = parcelRequire("5gAIA");


var $6p9dH = parcelRequire("6p9dH");
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
const $aef7c61a0449de74$export$2de4954e8ae13b9f = (0, $9Xv0G$createContext)({
    placement: 'bottom'
});


function $ae17fb6c158e830b$export$746d02f47f4d381(props) {
    let ref = (0, $9Xv0G$untrack)(()=>props.ref);
    // The canonical native HTML bag also accepts removal values. RAC's source
    // slot/label helper consumes the source-compatible subset without changing
    // the context identity or the live values it supplies.
    [props, ref] = (0, $2A4az.useContextProps)(props, ref, (0, $aef7c61a0449de74$export$2de4954e8ae13b9f));
    let domRef = (0, $6p9dH.useObjectRef)(ref);
    let placement = ()=>props.placement;
    let style = ()=>({
            position: 'absolute',
            transform: placement() === 'top' || placement() === 'bottom' ? 'translateX(-50%)' : 'translateY(-50%)',
            ...placement() != null ? {
                [placement()]: '100%'
            } : {}
        });
    let renderProps = (0, $2A4az.useRenderProps)((0, $9Xv0G$merge)(props, {
        defaultClassName: 'react-aria-OverlayArrow',
        values: {
            get placement () {
                return placement();
            }
        }
    }));
    // remove undefined values from renderProps.style object so that it can be
    // spread merged with the other style object
    let mergedStyle = ()=>{
        let overrides = Object.fromEntries(Object.entries(renderProps.style ?? {}).filter(([, value])=>value !== undefined));
        return {
            ...style(),
            ...overrides
        };
    };
    let DOMProps = (0, $5gAIA.filterDOMProps)(props);
    return (0, $9Xv0G$createComponent)((0, $2A4az.dom).div, (0, $9Xv0G$mergeProps)(DOMProps, renderProps, {
        get style () {
            return mergedStyle();
        },
        ref (r$) {
            var _ref$ = domRef;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $9Xv0G$applyRef)(_ref$, r$) : domRef = r$;
        },
        get "data-placement" () {
            return placement();
        }
    }));
}





var $aPfEU = parcelRequire("aPfEU");

var $6SohG = parcelRequire("6SohG");
var $874d59d8f72b9c60$var$_tmpl$ = /*#__PURE__*/ (0, $9Xv0G$template)(`<div>`);
const $874d59d8f72b9c60$var$Context = (0, $9Xv0G$createContext)(null);
function $874d59d8f72b9c60$export$178405afcd8c5eb(props) {
    let parent = (0, $9Xv0G$useContext)($874d59d8f72b9c60$var$Context);
    let [modalCount, setModalCount] = (0, $9Xv0G$createSignal)(0);
    let context = {
        parent: parent,
        get modalCount () {
            return modalCount();
        },
        addModal () {
            setModalCount((count)=>count + 1);
            if (parent) parent.addModal();
        },
        removeModal () {
            setModalCount((count)=>count - 1);
            if (parent) parent.removeModal();
        }
    };
    return (0, $9Xv0G$createComponent)($874d59d8f72b9c60$var$Context, {
        value: context,
        get children () {
            return props.children;
        }
    });
}
function $874d59d8f72b9c60$export$d9aaed4c3ece1bc0() {
    let context = (0, $9Xv0G$useContext)($874d59d8f72b9c60$var$Context);
    return {
        modalProviderProps: {
            get 'aria-hidden' () {
                return context && context.modalCount > 0 ? 'true' : undefined;
            }
        }
    };
}
/**
 * Creates a root node that will be aria-hidden if there are other modals open.
 */ function $874d59d8f72b9c60$var$OverlayContainerDOM(props) {
    let { modalProviderProps: modalProviderProps } = $874d59d8f72b9c60$export$d9aaed4c3ece1bc0();
    var _el$ = (0, $9Xv0G$getNextElement)($874d59d8f72b9c60$var$_tmpl$);
    (0, $9Xv0G$spread)(_el$, [
        {
            "data-overlay-container": "true"
        },
        props,
        modalProviderProps
    ], false);
    (0, $9Xv0G$runHydrationEvents)();
    return _el$;
}
function $874d59d8f72b9c60$export$bf688221f59024e5(props) {
    return (0, $9Xv0G$createComponent)($874d59d8f72b9c60$export$178405afcd8c5eb, {
        get children () {
            return (0, $9Xv0G$createComponent)($874d59d8f72b9c60$var$OverlayContainerDOM, props);
        }
    });
}
function $874d59d8f72b9c60$export$b47c3594eab58386(props) {
    let isSSR = (0, $aPfEU.useIsSSR)();
    let portalContext = (0, $6SohG.useUNSAFE_PortalContext)();
    let portalContainer = ()=>{
        if (!props.portalContainer && portalContext.getContainer) return portalContext.getContainer();
        return props.portalContainer === undefined ? isSSR() ? null : document.body : props.portalContainer;
    };
    let rest = new Proxy(props, {
        get (target, key) {
            return key === 'portalContainer' ? undefined : Reflect.get(target, key, target);
        },
        ownKeys (target) {
            return Reflect.ownKeys(target).filter((key)=>key !== 'portalContainer');
        },
        getOwnPropertyDescriptor (target, key) {
            return key === 'portalContainer' ? undefined : Object.getOwnPropertyDescriptor(target, key);
        }
    });
    (0, $9Xv0G$createEffect)(portalContainer, (container)=>{
        if (container?.closest('[data-overlay-container]')) throw new Error('An OverlayContainer must not be inside another container. Please change the portalContainer prop.');
    });
    return ()=>{
        let mount = portalContainer();
        return mount ? (0, $9Xv0G$createComponent)((0, $9Xv0G$Portal), {
            mount: mount,
            get children () {
                return (0, $9Xv0G$createComponent)($874d59d8f72b9c60$export$bf688221f59024e5, rest);
            }
        }) : null;
    };
}
function $874d59d8f72b9c60$export$33ffd74ebf07f060(options) {
    // Add aria-hidden to all parent providers on mount, and restore on unmount.
    let context = (0, $9Xv0G$useContext)($874d59d8f72b9c60$var$Context);
    if (!context) throw new Error('Modal is not contained within a provider');
    (0, $9Xv0G$createEffect)(()=>options?.isDisabled, (isDisabled)=>{
        if (isDisabled || !context.parent) return;
        // The immediate context is from the provider containing this modal, so we only
        // want to trigger aria-hidden on its parents not on the modal provider itself.
        context.parent.addModal();
        return ()=>{
            if (context && context.parent) context.parent.removeModal();
        };
    });
    return {
        modalProps: {
            get 'data-ismodal' () {
                return options?.isDisabled ? 'false' : 'true';
            }
        }
    };
}




var $6p9dH = parcelRequire("6p9dH");
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
var $ckc8K = parcelRequire("ckc8K");

const $6f64bc76bc8fc0e4$var$TOOLTIP_DELAY = 1500; // this seems to be a 1.5 second delay, check with design
const $6f64bc76bc8fc0e4$var$TOOLTIP_COOLDOWN = 500;
let $6f64bc76bc8fc0e4$var$tooltips = {};
let $6f64bc76bc8fc0e4$var$tooltipId = 0;
let $6f64bc76bc8fc0e4$var$globalWarmedUp = false;
let $6f64bc76bc8fc0e4$var$globalWarmUpTimeout = null;
let $6f64bc76bc8fc0e4$var$globalCooldownTimeout = null;
function $6f64bc76bc8fc0e4$export$4d40659c25ecb50b(props = {}) {
    let delay = ()=>props.delay ?? $6f64bc76bc8fc0e4$var$TOOLTIP_DELAY;
    let closeDelay = ()=>props.closeDelay ?? $6f64bc76bc8fc0e4$var$TOOLTIP_COOLDOWN;
    let overlayState = (0, $ckc8K.useOverlayTriggerState)(props);
    let { open: open, close: close } = overlayState;
    // Whether the current open/close transition should skip its animation. Set when swapping
    // between tooltips during the global warmup period.
    let [shouldSkipAnimation, setIsInstant] = (0, $9Xv0G$createSignal)(false);
    let id = `${++$6f64bc76bc8fc0e4$var$tooltipId}`;
    let closeTimeout = {
        current: null
    };
    let closeCallback = {
        current: close
    };
    let ensureTooltipEntry = ()=>{
        $6f64bc76bc8fc0e4$var$tooltips[id] = hideTooltip;
    };
    let closeOpenTooltips = ()=>{
        for(let hideTooltipId in $6f64bc76bc8fc0e4$var$tooltips)if (hideTooltipId !== id) {
            // Close other open tooltips instantly (no exit animation), since they are being
            // replaced by this one during the warmup period.
            $6f64bc76bc8fc0e4$var$tooltips[hideTooltipId](true, true);
            delete $6f64bc76bc8fc0e4$var$tooltips[hideTooltipId];
        }
    };
    let showTooltip = (instant)=>{
        if (closeTimeout.current) clearTimeout(closeTimeout.current);
        closeTimeout.current = null;
        closeOpenTooltips();
        ensureTooltipEntry();
        setIsInstant(!!instant);
        $6f64bc76bc8fc0e4$var$globalWarmedUp = true;
        open();
        if ($6f64bc76bc8fc0e4$var$globalWarmUpTimeout) {
            clearTimeout($6f64bc76bc8fc0e4$var$globalWarmUpTimeout);
            $6f64bc76bc8fc0e4$var$globalWarmUpTimeout = null;
        }
        if ($6f64bc76bc8fc0e4$var$globalCooldownTimeout) {
            clearTimeout($6f64bc76bc8fc0e4$var$globalCooldownTimeout);
            $6f64bc76bc8fc0e4$var$globalCooldownTimeout = null;
        }
    };
    let hideTooltip = (immediate, instant)=>{
        setIsInstant(!!instant);
        if (immediate || closeDelay() <= 0) {
            if (closeTimeout.current) clearTimeout(closeTimeout.current);
            closeTimeout.current = null;
            closeCallback.current();
        } else if (!closeTimeout.current) closeTimeout.current = setTimeout(()=>{
            closeTimeout.current = null;
            closeCallback.current();
        }, closeDelay());
        if ($6f64bc76bc8fc0e4$var$globalWarmUpTimeout) {
            clearTimeout($6f64bc76bc8fc0e4$var$globalWarmUpTimeout);
            $6f64bc76bc8fc0e4$var$globalWarmUpTimeout = null;
        }
        if ($6f64bc76bc8fc0e4$var$globalWarmedUp) {
            if ($6f64bc76bc8fc0e4$var$globalCooldownTimeout) clearTimeout($6f64bc76bc8fc0e4$var$globalCooldownTimeout);
            $6f64bc76bc8fc0e4$var$globalCooldownTimeout = setTimeout(()=>{
                delete $6f64bc76bc8fc0e4$var$tooltips[id];
                $6f64bc76bc8fc0e4$var$globalCooldownTimeout = null;
                $6f64bc76bc8fc0e4$var$globalWarmedUp = false;
            }, Math.max($6f64bc76bc8fc0e4$var$TOOLTIP_COOLDOWN, closeDelay()));
        }
    };
    let warmupTooltip = ()=>{
        closeOpenTooltips();
        ensureTooltipEntry();
        if (!overlayState.isOpen && !$6f64bc76bc8fc0e4$var$globalWarmedUp) {
            if ($6f64bc76bc8fc0e4$var$globalWarmUpTimeout) clearTimeout($6f64bc76bc8fc0e4$var$globalWarmUpTimeout);
            $6f64bc76bc8fc0e4$var$globalWarmUpTimeout = setTimeout(()=>{
                $6f64bc76bc8fc0e4$var$globalWarmUpTimeout = null;
                $6f64bc76bc8fc0e4$var$globalWarmedUp = true;
                // First tooltip in a sequence: animate in.
                showTooltip(false);
            }, delay());
        } else if (!overlayState.isOpen) // Already warmed up: appear instantly without an animation.
        showTooltip(true);
    };
    (0, $9Xv0G$onSettled)(()=>{
        return ()=>{
            if (closeTimeout.current) clearTimeout(closeTimeout.current);
            let tooltip = $6f64bc76bc8fc0e4$var$tooltips[id];
            if (tooltip) delete $6f64bc76bc8fc0e4$var$tooltips[id];
        };
    });
    return {
        get isOpen () {
            return overlayState.isOpen;
        },
        get shouldSkipAnimation () {
            return shouldSkipAnimation();
        },
        open: (immediate)=>{
            if (!immediate && delay() > 0 && !closeTimeout.current) warmupTooltip();
            else // Immediate opens (e.g. focus, or delay of 0) appear instantly without an animation
            // only if another tooltip is already warmed up.
            showTooltip($6f64bc76bc8fc0e4$var$globalWarmedUp);
        },
        close: hideTooltip
    };
}


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


var $gi7Zf = parcelRequire("gi7Zf");

var $czX2l = parcelRequire("czX2l");
function $9dd5f14b7a891d46$export$6d3443f2c48bfc20(ref, isReady = true, onEnter) {
    let ready = ()=>typeof isReady === 'function' ? isReady() : isReady;
    let [isEntering, setEntering] = (0, $9Xv0G$createSignal)(true);
    let isAnimationReady = ()=>isEntering() && ready();
    // Hide the element while it prepares for entry, using only non-layout-thrashing attributes.
    // This prevents accidental flashes of content in scenarios where no hidden styling is applied
    // while the enter animation is not yet ready (e.g. popovers prior to placement calculation).
    (0, $9Xv0G$createEffect)(()=>({
            element: ref.current,
            ready: ready()
        }), ({ element: element, ready: ready })=>{
        if (!ready && element) return (0, $fZRjG.chain)((0, $gi7Zf.setStyle)(element, 'opacity', '0'), (0, $gi7Zf.setStyle)(element, 'clip', 'rect(0 0 0 0)'), (0, $gi7Zf.setStyle)(element, 'clip-path', 'inset(50%)'), (0, $gi7Zf.setStyle)(element, 'mask-image', 'linear-gradient(#0000, #0000)'));
    });
    // There are two cases for entry animations:
    // 1. CSS @keyframes. The `animation` property is set during the isEntering state, and it is removed after the animation finishes.
    // 2. CSS transitions. The initial styles are applied during the isEntering state, and removed immediately, causing the transition to occur.
    //
    // In the second case, cancel any transitions that were triggered prior to the isEntering = false state (when the transition is supposed to start).
    // This can happen when isReady starts as false (e.g. popovers prior to placement calculation).
    (0, $9Xv0G$createEffect)(()=>({
            element: ref.current,
            active: isAnimationReady()
        }), ({ element: element, active: active })=>{
        if (active && element && 'getAnimations' in element) {
            for (let animation of element.getAnimations())if (typeof CSSTransition !== 'undefined' && animation instanceof CSSTransition) animation.cancel();
        }
    });
    $9dd5f14b7a891d46$var$useAnimation(ref, isAnimationReady, onEnter, ()=>{
        setEntering(false);
    });
    return isAnimationReady;
}
function $9dd5f14b7a891d46$export$45fda7c47f93fd48(ref, isOpen, onExit) {
    let open = ()=>typeof isOpen === 'function' ? isOpen() : isOpen;
    // Source open/closed/exiting history, with a separate completion acknowledgement.
    // Each hook owns its own generation, including overlay and modal exit lifetimes.
    let lifecycle = (0, $9Xv0G$createMemo)((previous)=>{
        let isOpen = open();
        if (previous?.open === isOpen) return previous;
        return {
            open: isOpen,
            generation: (previous?.generation ?? 0) + (previous?.open && !isOpen ? 1 : 0),
            hasOpened: isOpen || previous?.hasOpened || false
        };
    });
    let [completed, setCompleted] = (0, $9Xv0G$createSignal)(0);
    let isExiting = ()=>{
        let current = lifecycle();
        return !current.open && current.hasOpened && completed() !== current.generation;
    };
    $9dd5f14b7a891d46$var$useAnimation(ref, isExiting, onExit, ()=>{
        setCompleted(lifecycle().generation);
    });
    return isExiting;
}
function $9dd5f14b7a891d46$var$useAnimation(ref, isActive, onStart, onEnd) {
    let start = (0, $czX2l.useEffectEvent)(onStart);
    (0, $9Xv0G$createEffect)(()=>({
            element: ref.current,
            active: isActive()
        }), ({ element: element, active: active })=>{
        if (active && element) {
            let cancelled = false;
            if (!('getAnimations' in element)) {
                // JSDOM
                onEnd();
                return;
            }
            let startPromise = start?.(element);
            let animations = element.getAnimations().filter((a)=>(typeof DocumentTimeline === 'undefined' || a.timeline instanceof DocumentTimeline) && a.playState === 'running');
            if (animations.length === 0 && !startPromise) {
                onEnd();
                return;
            }
            Promise.all([
                startPromise,
                ...animations.map((a)=>a.finished)
            ]).then(()=>{
                if (!cancelled) onEnd();
            }).catch(()=>{});
            // Promise completion from an interrupted/replaced/disposed animation cannot
            // close a later generation. Do not cancel consumer-owned WAAPI animations.
            return ()=>{
                cancelled = true;
            };
        }
    });
}


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

var $7boJ2 = parcelRequire("7boJ2");

var $8k5ge = parcelRequire("8k5ge");
function $38e126341c2be1ae$export$1c4b08e0eca38426(props, state) {
    let domProps = (0, $5gAIA.filterDOMProps)(props, {
        labelable: true
    });
    let { hoverProps: hoverProps } = (0, $8k5ge.useHover)({
        onHoverStart: ()=>state?.open(true),
        onHoverEnd: ()=>state?.close()
    });
    return {
        tooltipProps: (0, $7boJ2.mergeProps)(domProps, hoverProps, {
            role: 'tooltip'
        })
    };
}

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
var $es0xi = parcelRequire("es0xi");

var $7boJ2 = parcelRequire("7boJ2");


var $kKI9C = parcelRequire("kKI9C");

var $8k5ge = parcelRequire("8k5ge");

var $dyxC2 = parcelRequire("dyxC2");
function $e3b1072855582364$export$a6da6c504e4bba8b(props, state, ref) {
    let tooltipId = (0, $dyxC2.useId)();
    let isHovered = {
        current: false
    };
    let isFocused = {
        current: false
    };
    let handleShow = ()=>{
        if (isHovered.current || isFocused.current) state.open(isFocused.current);
    };
    let handleHide = (immediate)=>{
        if (!isHovered.current && !isFocused.current) state.close(immediate);
    };
    (0, $9Xv0G$createEffect)(()=>state.isOpen, (isOpen)=>{
        let onKeyDown = (e)=>{
            if (ref && ref.current) // Escape after clicking something can give it keyboard focus
            // dismiss tooltip on esc key press
            {
                if (e.key === 'Escape') {
                    e.stopPropagation();
                    state.close(true);
                }
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', onKeyDown, true);
            return ()=>{
                document.removeEventListener('keydown', onKeyDown, true);
            };
        }
    });
    let onHoverStart = ()=>{
        if (props.trigger === 'focus') return;
        // In chrome, if you hover a trigger, then another element obscures it, due to keyboard
        // interactions for example, hover will end. When hover is restored after that element disappears,
        // focus moves on for example, then the tooltip will reopen. We check the modality to know if the hover
        // is the result of moving the mouse.
        if ((0, $es0xi.getInteractionModality)() === 'pointer') isHovered.current = true;
        else isHovered.current = false;
        handleShow();
    };
    let onHoverEnd = ()=>{
        if (props.trigger === 'focus') return;
        // no matter how the trigger is left, we should close the tooltip
        isFocused.current = false;
        isHovered.current = false;
        handleHide();
    };
    let onPressStart = ()=>{
        // if shouldCloseOnPress is false, we should not close the tooltip
        if (props.shouldCloseOnPress === false) return;
        // no matter how the trigger is pressed, we should close the tooltip
        isFocused.current = false;
        isHovered.current = false;
        handleHide(true);
    };
    let onFocus = ()=>{
        let isVisible = (0, $es0xi.isFocusVisible)();
        if (isVisible) {
            isFocused.current = true;
            handleShow();
        }
    };
    let onBlur = ()=>{
        isFocused.current = false;
        isHovered.current = false;
        handleHide(true);
    };
    let { hoverProps: hoverProps } = (0, $8k5ge.useHover)({
        get isDisabled () {
            return props.isDisabled;
        },
        onHoverStart: onHoverStart,
        onHoverEnd: onHoverEnd
    });
    let { focusableProps: focusableProps } = (0, $kKI9C.useFocusable)({
        get isDisabled () {
            return props.isDisabled;
        },
        onFocus: onFocus,
        onBlur: onBlur
    }, ref ?? {
        current: null
    });
    return {
        triggerProps: (0, $9Xv0G$merge)(// oxlint-disable-next-line react/react-compiler
        (0, $7boJ2.mergeProps)(focusableProps, hoverProps, {
            onPointerDown: onPressStart,
            onKeyDown: onPressStart
        }), {
            get 'aria-describedby' () {
                return state.isOpen ? tooltipId() : undefined;
            },
            tabIndex: undefined
        }),
        tooltipProps: {
            get id () {
                return tooltipId();
            }
        }
    };
}


const $ca46e2ce6f0cf00a$export$7a7623236eec67fa = (0, $9Xv0G$createContext)(null);
const $ca46e2ce6f0cf00a$export$39ae08fa83328b12 = (0, $9Xv0G$createContext)(null);
function $ca46e2ce6f0cf00a$export$8c610744efcf8a1d(props) {
    let state = (0, $6f64bc76bc8fc0e4$export$4d40659c25ecb50b)(props);
    let ref = (0, $6p9dH.useObjectRef)();
    let { triggerProps: triggerProps, tooltipProps: tooltipProps } = (0, $e3b1072855582364$export$a6da6c504e4bba8b)(props, state, ref);
    return (0, $9Xv0G$createComponent)($ca46e2ce6f0cf00a$export$7a7623236eec67fa, {
        value: state,
        get children () {
            return (0, $9Xv0G$createComponent)($ca46e2ce6f0cf00a$export$39ae08fa83328b12, {
                get value () {
                    return (0, $9Xv0G$merge)({
                        get id () {
                            return tooltipProps.id;
                        }
                    }, {
                        triggerRef: ref
                    });
                },
                get children () {
                    return (0, $9Xv0G$createComponent)((0, $kKI9C.FocusableProvider), (0, $9Xv0G$mergeProps)(triggerProps, {
                        ref (r$) {
                            var _ref$ = ref;
                            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $9Xv0G$applyRef)(_ref$, r$) : ref = r$;
                        },
                        get children () {
                            return props.children;
                        }
                    }));
                }
            });
        }
    });
}
function $ca46e2ce6f0cf00a$export$28c660c63b792dea(input) {
    let props = (0, $9Xv0G$omit)(input, 'UNSTABLE_portalContainer');
    let ref = (0, $9Xv0G$untrack)(()=>props.ref);
    [props, ref] = (0, $2A4az.useContextProps)(props, ref, $ca46e2ce6f0cf00a$export$39ae08fa83328b12);
    let domRef = (0, $6p9dH.useObjectRef)(ref);
    let contextState = (0, $9Xv0G$useContext)($ca46e2ce6f0cf00a$export$7a7623236eec67fa);
    let localState = (0, $6f64bc76bc8fc0e4$export$4d40659c25ecb50b)(props);
    let currentState = ()=>props.isOpen != null || props.defaultOpen != null || !contextState ? localState : contextState;
    let state = {
        get isOpen () {
            return currentState().isOpen;
        },
        get shouldSkipAnimation () {
            return currentState().shouldSkipAnimation;
        },
        open (immediate) {
            currentState().open(immediate);
        },
        close (immediate) {
            currentState().close(immediate);
        }
    };
    // Skip the automatic exit animation when closing instantly (e.g. swapping between tooltips
    // during warmup). An explicitly provided isExiting prop still takes precedence.
    let exitAnimation = (0, $9dd5f14b7a891d46$export$45fda7c47f93fd48)(domRef, ()=>state.isOpen);
    let isExiting = ()=>props.isExiting || !state.shouldSkipAnimation && exitAnimation() || false;
    return (0, $9Xv0G$createComponent)((0, $9Xv0G$Show), {
        get when () {
            return state.isOpen || isExiting();
        },
        get children () {
            return (0, $9Xv0G$createComponent)((0, $874d59d8f72b9c60$export$b47c3594eab58386), {
                get portalContainer () {
                    return input.UNSTABLE_portalContainer;
                },
                get children () {
                    return (0, $9Xv0G$createComponent)($ca46e2ce6f0cf00a$var$TooltipInner, (0, $9Xv0G$mergeProps)(props, {
                        tooltipRef: domRef,
                        get isExiting () {
                            return isExiting();
                        }
                    }));
                }
            });
        }
    });
}
function $ca46e2ce6f0cf00a$var$TooltipInner(props) {
    let state = (0, $9Xv0G$useContext)($ca46e2ce6f0cf00a$export$7a7623236eec67fa);
    let arrowRef = (0, $6p9dH.useObjectRef)();
    let { overlayProps: overlayProps, arrowProps: arrowProps, placement: placement, triggerAnchorPoint: triggerAnchorPoint } = (0, $be5c4a35d39b34ae$export$d39e1813b3bdd0e1)({
        get placement () {
            return props.placement || 'top';
        },
        get targetRef () {
            return props.triggerRef;
        },
        get overlayRef () {
            return props.tooltipRef;
        },
        arrowRef: arrowRef,
        get offset () {
            return props.offset;
        },
        get crossOffset () {
            return props.crossOffset;
        },
        get isOpen () {
            return state.isOpen;
        },
        get arrowBoundaryOffset () {
            return props.arrowBoundaryOffset;
        },
        get shouldFlip () {
            return props.shouldFlip;
        },
        get containerPadding () {
            return props.containerPadding;
        },
        onClose: ()=>state.close(true)
    });
    // Skip the automatic entry animation when opening instantly (e.g. swapping between tooltips
    // during warmup). An explicitly provided isEntering prop still takes precedence.
    let enterAnimation = (0, $9dd5f14b7a891d46$export$6d3443f2c48bfc20)(props.tooltipRef, ()=>!!placement());
    let isEntering = ()=>props.isEntering || !state.shouldSkipAnimation && enterAnimation() || false;
    let renderProps = (0, $2A4az.useRenderProps)((0, $9Xv0G$merge)(props, {
        defaultClassName: 'react-aria-Tooltip',
        values: {
            get placement () {
                return placement();
            },
            get isEntering () {
                return isEntering();
            },
            get isExiting () {
                return props.isExiting;
            },
            state: state
        }
    }));
    props = (0, $7boJ2.mergeProps)(props, overlayProps);
    let { tooltipProps: tooltipProps } = (0, $38e126341c2be1ae$export$1c4b08e0eca38426)(props, state);
    let DOMProps = (0, $5gAIA.filterDOMProps)(props, {
        global: true
    });
    // oxlint-disable react/react-compiler
    return (0, $9Xv0G$createComponent)((0, $2A4az.dom).div, (0, $9Xv0G$mergeProps)(()=>(0, $7boJ2.mergeProps)(DOMProps, renderProps, tooltipProps), {
        ref (r$) {
            var _ref$2 = props.tooltipRef;
            typeof _ref$2 === "function" || Array.isArray(_ref$2) ? (0, $9Xv0G$applyRef)(_ref$2, r$) : props.tooltipRef = r$;
        },
        get style () {
            return {
                ...overlayProps.style,
                '--trigger-anchor-point': triggerAnchorPoint() ? `${triggerAnchorPoint().x}px ${triggerAnchorPoint().y}px` : undefined,
                ...renderProps.style
            };
        },
        get "data-placement" () {
            return placement() ?? undefined;
        },
        get "data-entering" () {
            return isEntering() ? 'true' : undefined;
        },
        get "data-exiting" () {
            return props.isExiting ? 'true' : undefined;
        },
        get children () {
            return (0, $9Xv0G$createComponent)((0, $aef7c61a0449de74$export$2de4954e8ae13b9f), {
                get value () {
                    return (0, $9Xv0G$merge)(arrowProps, {
                        get placement () {
                            return placement();
                        },
                        ref: arrowRef
                    });
                },
                get children () {
                    return renderProps.children;
                }
            });
        }
    }));
// oxlint-enable react/react-compiler
}







var $4SbjT = parcelRequire("4SbjT");


var $eXdQ3 = parcelRequire("eXdQ3");
parcelRequire("ig9q0");
var $dnlDG = parcelRequire("dnlDG");
var $fd32b1555930feff$var$_tmpl$ = /*#__PURE__*/ (0, $9Xv0G$template)(`<svg viewBox="0 0 10 5"><path d="M4.29289 4.29289L0 0H10L5.70711 4.29289C5.31658 4.68342 4.68342 4.68342 4.29289 4.29289Z">`), $fd32b1555930feff$var$_tmpl$2 = /*#__PURE__*/ (0, $9Xv0G$template)(`<div>`);
const $fd32b1555930feff$var$tooltip = function anonymous(props) {
    let rules = " ", currentRules = {};
    if (props.colorScheme === "dark") {
        rules += ' -ICUGx-_pa18';
        currentRules["--s2-color-scheme"] = typeof currentRules["--s2-color-scheme"] === 'object' ? currentRules["--s2-color-scheme"] : {
            "default": currentRules["--s2-color-scheme"]
        };
        currentRules["--s2-color-scheme"]["colorScheme === \"dark\""] = "dark";
    } else if (props.colorScheme === "light") {
        rules += ' -ICUGx-_pb18';
        currentRules["--s2-color-scheme"] = typeof currentRules["--s2-color-scheme"] === 'object' ? currentRules["--s2-color-scheme"] : {
            "default": currentRules["--s2-color-scheme"]
        };
        currentRules["--s2-color-scheme"]["colorScheme === \"light\""] = "light";
    } else if (props.colorScheme === "light dark") {
        rules += ' -ICUGx-_pb18';
        currentRules["--s2-color-scheme"] = typeof currentRules["--s2-color-scheme"] === 'object' ? currentRules["--s2-color-scheme"] : {
            "default": currentRules["--s2-color-scheme"]
        };
        currentRules["--s2-color-scheme"]["colorScheme === \"light dark\""] = "light";
        rules += ' -ICUGx-D1v0V_pa18';
        currentRules["--s2-color-scheme"] = typeof currentRules["--s2-color-scheme"] === 'object' ? currentRules["--s2-color-scheme"] : {
            "default": currentRules["--s2-color-scheme"]
        };
        currentRules["--s2-color-scheme"]["colorScheme === \"light dark\" && @media (prefers-color-scheme: dark)"] = "dark";
    }
    rules += ' _pK8eoyd18';
    currentRules["colorScheme"] = "--s2-color-scheme";
    if (props.colorScheme === "dark") {
        rules += ' -NvXmrd-_ZLmU18';
        currentRules["--lightningcss-light"] = typeof currentRules["--lightningcss-light"] === 'object' ? currentRules["--lightningcss-light"] : {
            "default": currentRules["--lightningcss-light"]
        };
        currentRules["--lightningcss-light"]["colorScheme === \"dark\""] = " ";
    } else if (props.colorScheme === "light") {
        rules += ' -NvXmrd-_ZN8Gi4c18';
        currentRules["--lightningcss-light"] = typeof currentRules["--lightningcss-light"] === 'object' ? currentRules["--lightningcss-light"] : {
            "default": currentRules["--lightningcss-light"]
        };
        currentRules["--lightningcss-light"]["colorScheme === \"light\""] = "initial";
    } else if (props.colorScheme === "light dark") {
        rules += ' -NvXmrd-_ZN8Gi4c18';
        currentRules["--lightningcss-light"] = typeof currentRules["--lightningcss-light"] === 'object' ? currentRules["--lightningcss-light"] : {
            "default": currentRules["--lightningcss-light"]
        };
        currentRules["--lightningcss-light"]["colorScheme === \"light dark\""] = "initial";
        rules += ' -NvXmrd-D1v0V_ZLmU18';
        currentRules["--lightningcss-light"] = typeof currentRules["--lightningcss-light"] === 'object' ? currentRules["--lightningcss-light"] : {
            "default": currentRules["--lightningcss-light"]
        };
        currentRules["--lightningcss-light"]["colorScheme === \"light dark\" && @media (prefers-color-scheme: dark)"] = " ";
    }
    if (props.colorScheme === "dark") {
        rules += ' -j9blY-_ZN8Gi4c18';
        currentRules["--lightningcss-dark"] = typeof currentRules["--lightningcss-dark"] === 'object' ? currentRules["--lightningcss-dark"] : {
            "default": currentRules["--lightningcss-dark"]
        };
        currentRules["--lightningcss-dark"]["colorScheme === \"dark\""] = "initial";
    } else if (props.colorScheme === "light") {
        rules += ' -j9blY-_ZLmU18';
        currentRules["--lightningcss-dark"] = typeof currentRules["--lightningcss-dark"] === 'object' ? currentRules["--lightningcss-dark"] : {
            "default": currentRules["--lightningcss-dark"]
        };
        currentRules["--lightningcss-dark"]["colorScheme === \"light\""] = " ";
    } else if (props.colorScheme === "light dark") {
        rules += ' -j9blY-_ZLmU18';
        currentRules["--lightningcss-dark"] = typeof currentRules["--lightningcss-dark"] === 'object' ? currentRules["--lightningcss-dark"] : {
            "default": currentRules["--lightningcss-dark"]
        };
        currentRules["--lightningcss-dark"]["colorScheme === \"light dark\""] = " ";
        rules += ' -j9blY-D1v0V_ZN8Gi4c18';
        currentRules["--lightningcss-dark"] = typeof currentRules["--lightningcss-dark"] === 'object' ? currentRules["--lightningcss-dark"] : {
            "default": currentRules["--lightningcss-dark"]
        };
        currentRules["--lightningcss-dark"]["colorScheme === \"light dark\" && @media (prefers-color-scheme: dark)"] = "initial";
    }
    rules += ' _Ca18';
    currentRules["justifyContent"] = "center";
    rules += ' eb18';
    currentRules["alignItems"] = "center";
    rules += ' L3HJbhc18';
    currentRules["maxWidth"] = 160;
    rules += ' MAyFGYc18';
    rules += ' _oa18';
    currentRules["boxSizing"] = "border-box";
    rules += ' uk18';
    currentRules["fontFamily"] = "sans";
    rules += ' ucJ9TBTb18';
    currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
        "default": currentRules["fontFamily"]
    };
    currentRules["fontFamily"][":lang(ar)"] = "sans";
    rules += ' ud3Euai18';
    currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
        "default": currentRules["fontFamily"]
    };
    currentRules["fontFamily"][":lang(he)"] = "sans";
    rules += ' uea18';
    currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
        "default": currentRules["fontFamily"]
    };
    currentRules["fontFamily"][":lang(ja)"] = "sans";
    rules += ' ugb18';
    currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
        "default": currentRules["fontFamily"]
    };
    currentRules["fontFamily"][":lang(ko)"] = "sans";
    rules += ' uhd18';
    currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
        "default": currentRules["fontFamily"]
    };
    currentRules["fontFamily"][":lang(zh)"] = "sans";
    rules += ' uje18';
    currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
        "default": currentRules["fontFamily"]
    };
    currentRules["fontFamily"][":lang(zh-hant)"] = "sans";
    rules += ' u2NhKxcl18';
    currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
        "default": currentRules["fontFamily"]
    };
    currentRules["fontFamily"][":lang(zh-HK)"] = "sans";
    rules += ' uic18';
    currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
        "default": currentRules["fontFamily"]
    };
    currentRules["fontFamily"][":lang(zh-Hans, zh-CN, zh-SG)"] = "sans";
    rules += ' -_6BNtrc-b18';
    currentRules["fontSize"] = "ui-sm";
    rules += ' vFHT6Dd18';
    currentRules["fontSize"] = "ui-sm";
    rules += ' xb18';
    currentRules["fontWeight"] = "normal";
    rules += ' _xa18';
    currentRules["fontWeight"] = "normal";
    rules += ' _Fd18';
    currentRules["lineHeight"] = "ui";
    rules += ' _FnuYUweb18';
    currentRules["lineHeight"] = typeof currentRules["lineHeight"] === 'object' ? currentRules["lineHeight"] : {
        "default": currentRules["lineHeight"]
    };
    currentRules["lineHeight"][":lang(ja, ko, zh, zh-Hant, zh-Hans, zh-CN, zh-SG)"] = "ui";
    rules += ' pr18';
    currentRules["color"] = "gray-25";
    rules += ' plOVIhfc6LxY918';
    currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
        "default": currentRules["color"]
    };
    currentRules["color"]["forcedColors"] = "ButtonText";
    rules += ' plOVIhfc6LxY918';
    currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
        "default": currentRules["color"]
    };
    currentRules["color"][":is([data-hcm], [data-hcm] *)"] = "ButtonText";
    rules += ' _kJ8iPYd18';
    rules += ' hXMFGYc18';
    rules += ' mlOVIhfcb18';
    currentRules["borderStartWidth"] = typeof currentRules["borderStartWidth"] === 'object' ? currentRules["borderStartWidth"] : {
        "default": currentRules["borderStartWidth"]
    };
    currentRules["borderStartWidth"]["forcedColors"] = 1;
    rules += ' mlOVIhfcb18';
    currentRules["borderStartWidth"] = typeof currentRules["borderStartWidth"] === 'object' ? currentRules["borderStartWidth"] : {
        "default": currentRules["borderStartWidth"]
    };
    currentRules["borderStartWidth"][":is([data-hcm], [data-hcm] *)"] = 1;
    rules += ' llOVIhfcb18';
    currentRules["borderEndWidth"] = typeof currentRules["borderEndWidth"] === 'object' ? currentRules["borderEndWidth"] : {
        "default": currentRules["borderEndWidth"]
    };
    currentRules["borderEndWidth"]["forcedColors"] = 1;
    rules += ' llOVIhfcb18';
    currentRules["borderEndWidth"] = typeof currentRules["borderEndWidth"] === 'object' ? currentRules["borderEndWidth"] : {
        "default": currentRules["borderEndWidth"]
    };
    currentRules["borderEndWidth"][":is([data-hcm], [data-hcm] *)"] = 1;
    rules += ' _jlOVIhfcf18';
    currentRules["borderStyle"] = typeof currentRules["borderStyle"] === 'object' ? currentRules["borderStyle"] : {
        "default": currentRules["borderStyle"]
    };
    currentRules["borderStyle"]["forcedColors"] = "solid";
    rules += ' _jlOVIhfcf18';
    currentRules["borderStyle"] = typeof currentRules["borderStyle"] === 'object' ? currentRules["borderStyle"] : {
        "default": currentRules["borderStyle"]
    };
    currentRules["borderStyle"][":is([data-hcm], [data-hcm] *)"] = "solid";
    rules += ' ilOVIhfcA18';
    currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
        "default": currentRules["borderColor"]
    };
    currentRules["borderColor"]["forcedColors"] = "transparent";
    rules += ' ilOVIhfcA18';
    currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
        "default": currentRules["borderColor"]
    };
    currentRules["borderColor"][":is([data-hcm], [data-hcm] *)"] = "transparent";
    rules += ' g018';
    currentRules["backgroundColor"] = "neutral";
    rules += ' oH5kTnc18';
    currentRules["borderTopStartRadius"] = "default";
    rules += ' nH5kTnc18';
    currentRules["borderTopEndRadius"] = "default";
    rules += ' kH5kTnc18';
    currentRules["borderBottomStartRadius"] = "default";
    rules += ' jH5kTnc18';
    currentRules["borderBottomEndRadius"] = "default";
    rules += ' Sv18';
    currentRules["paddingStart"] = "edge-to-text";
    rules += ' Rv18';
    currentRules["paddingEnd"] = "edge-to-text";
    rules += ' Tu7Fubd18';
    currentRules["paddingTop"] = "[calc((self(minHeight) - self(borderTopWidth, 0px) - self(borderBottomWidth, 0px) - 1lh) / 2)]";
    rules += ' Qu7Fubd18';
    currentRules["paddingBottom"] = "[calc((self(minHeight) - self(borderTopWidth, 0px) - self(borderBottomWidth, 0px) - 1lh) / 2)]";
    rules += ' Yd18';
    currentRules["transition"] = "default";
    rules += ' Xc18';
    currentRules["transitionDuration"] = 200;
    if (props.isExiting) {
        rules += ' _2c18';
        currentRules["transitionTimingFunction"] = typeof currentRules["transitionTimingFunction"] === 'object' ? currentRules["transitionTimingFunction"] : {
            "default": currentRules["transitionTimingFunction"]
        };
        currentRules["transitionTimingFunction"]["isExiting"] = "in";
    }
    if (props.placement === "right") {
        if (props.isExiting) {
            rules += ' -_7PloMd-m18';
            currentRules["translateX"] = typeof currentRules["translateX"] === 'object' ? currentRules["translateX"] : {
                "default": currentRules["translateX"]
            };
            currentRules["translateX"]["placement === \"right\" && isExiting"] = -4;
            rules += ' __Ya18';
            currentRules["translateX"] = typeof currentRules["translateX"] === 'object' ? currentRules["translateX"] : {
                "default": currentRules["translateX"]
            };
            currentRules["translateX"]["placement === \"right\" && isExiting"] = -4;
        } else if (props.isEntering) {
            rules += ' -_7PloMd-m18';
            currentRules["translateX"] = typeof currentRules["translateX"] === 'object' ? currentRules["translateX"] : {
                "default": currentRules["translateX"]
            };
            currentRules["translateX"]["placement === \"right\" && isEntering"] = -4;
            rules += ' __Ya18';
            currentRules["translateX"] = typeof currentRules["translateX"] === 'object' ? currentRules["translateX"] : {
                "default": currentRules["translateX"]
            };
            currentRules["translateX"]["placement === \"right\" && isEntering"] = -4;
        }
    } else if (props.placement === "left") {
        if (props.isExiting) {
            rules += ' -_7PloMd-G18';
            currentRules["translateX"] = typeof currentRules["translateX"] === 'object' ? currentRules["translateX"] : {
                "default": currentRules["translateX"]
            };
            currentRules["translateX"]["placement === \"left\" && isExiting"] = 4;
            rules += ' __Ya18';
            currentRules["translateX"] = typeof currentRules["translateX"] === 'object' ? currentRules["translateX"] : {
                "default": currentRules["translateX"]
            };
            currentRules["translateX"]["placement === \"left\" && isExiting"] = 4;
        } else if (props.isEntering) {
            rules += ' -_7PloMd-G18';
            currentRules["translateX"] = typeof currentRules["translateX"] === 'object' ? currentRules["translateX"] : {
                "default": currentRules["translateX"]
            };
            currentRules["translateX"]["placement === \"left\" && isEntering"] = 4;
            rules += ' __Ya18';
            currentRules["translateX"] = typeof currentRules["translateX"] === 'object' ? currentRules["translateX"] : {
                "default": currentRules["translateX"]
            };
            currentRules["translateX"]["placement === \"left\" && isEntering"] = 4;
        }
    }
    if (props.placement === "bottom") {
        if (props.isExiting) {
            rules += ' -_8PloMd-l18';
            currentRules["translateY"] = typeof currentRules["translateY"] === 'object' ? currentRules["translateY"] : {
                "default": currentRules["translateY"]
            };
            currentRules["translateY"]["placement === \"bottom\" && isExiting"] = -4;
            rules += ' __Ya18';
            currentRules["translateY"] = typeof currentRules["translateY"] === 'object' ? currentRules["translateY"] : {
                "default": currentRules["translateY"]
            };
            currentRules["translateY"]["placement === \"bottom\" && isExiting"] = -4;
        } else if (props.isEntering) {
            rules += ' -_8PloMd-l18';
            currentRules["translateY"] = typeof currentRules["translateY"] === 'object' ? currentRules["translateY"] : {
                "default": currentRules["translateY"]
            };
            currentRules["translateY"]["placement === \"bottom\" && isEntering"] = -4;
            rules += ' __Ya18';
            currentRules["translateY"] = typeof currentRules["translateY"] === 'object' ? currentRules["translateY"] : {
                "default": currentRules["translateY"]
            };
            currentRules["translateY"]["placement === \"bottom\" && isEntering"] = -4;
        }
    } else if (props.placement === "top") {
        if (props.isExiting) {
            rules += ' -_8PloMd-F18';
            currentRules["translateY"] = typeof currentRules["translateY"] === 'object' ? currentRules["translateY"] : {
                "default": currentRules["translateY"]
            };
            currentRules["translateY"]["placement === \"top\" && isExiting"] = 4;
            rules += ' __Ya18';
            currentRules["translateY"] = typeof currentRules["translateY"] === 'object' ? currentRules["translateY"] : {
                "default": currentRules["translateY"]
            };
            currentRules["translateY"]["placement === \"top\" && isExiting"] = 4;
        } else if (props.isEntering) {
            rules += ' -_8PloMd-F18';
            currentRules["translateY"] = typeof currentRules["translateY"] === 'object' ? currentRules["translateY"] : {
                "default": currentRules["translateY"]
            };
            currentRules["translateY"]["placement === \"top\" && isEntering"] = 4;
            rules += ' __Ya18';
            currentRules["translateY"] = typeof currentRules["translateY"] === 'object' ? currentRules["translateY"] : {
                "default": currentRules["translateY"]
            };
            currentRules["translateY"]["placement === \"top\" && isEntering"] = 4;
        }
    }
    if (props.isExiting) {
        rules += ' _Ia18';
        currentRules["opacity"] = typeof currentRules["opacity"] === 'object' ? currentRules["opacity"] : {
            "default": currentRules["opacity"]
        };
        currentRules["opacity"]["isExiting"] = 0;
    } else if (props.isEntering) {
        rules += ' _Ia18';
        currentRules["opacity"] = typeof currentRules["opacity"] === 'object' ? currentRules["opacity"] : {
            "default": currentRules["opacity"]
        };
        currentRules["opacity"]["isEntering"] = 0;
    }
    rules += ' -nTSCV-LTAEPe18';
    currentRules["overflowWrap"] = "break-word";
    rules += ' -M_-MCe2o8c18';
    currentRules["minHeight"] = 24;
    rules += ' -_k_-lOVIhfc_kb18';
    currentRules["borderTopWidth"] = typeof currentRules["borderTopWidth"] === 'object' ? currentRules["borderTopWidth"] : {
        "default": currentRules["borderTopWidth"]
    };
    currentRules["borderTopWidth"]["forcedColors"] = 1;
    rules += ' -_k_-lOVIhfc_kb18';
    currentRules["borderTopWidth"] = typeof currentRules["borderTopWidth"] === 'object' ? currentRules["borderTopWidth"] : {
        "default": currentRules["borderTopWidth"]
    };
    currentRules["borderTopWidth"][":is([data-hcm], [data-hcm] *)"] = 1;
    rules += ' -h_-lOVIhfchb18';
    currentRules["borderBottomWidth"] = typeof currentRules["borderBottomWidth"] === 'object' ? currentRules["borderBottomWidth"] : {
        "default": currentRules["borderBottomWidth"]
    };
    currentRules["borderBottomWidth"]["forcedColors"] = 1;
    rules += ' -h_-lOVIhfchb18';
    currentRules["borderBottomWidth"] = typeof currentRules["borderBottomWidth"] === 'object' ? currentRules["borderBottomWidth"] : {
        "default": currentRules["borderBottomWidth"]
    };
    currentRules["borderBottomWidth"][":is([data-hcm], [data-hcm] *)"] = 1;
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Tooltip.native.js:28:16";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Tooltip.native.js:28:16"
        };
    }
    return rules;
};
const $fd32b1555930feff$var$arrowStyles = function anonymous(props) {
    let rules = " ", currentRules = {};
    rules += ' sb18';
    currentRules["display"] = "block";
    rules += ' tr18';
    currentRules["fill"] = "gray-800";
    rules += ' ZDldWXb18';
    currentRules["width"] = 10;
    rules += ' FrIlH4c18';
    currentRules["height"] = 5;
    if (props.placement === "right") {
        rules += ' _Sd18';
        currentRules["rotate"] = typeof currentRules["rotate"] === 'object' ? currentRules["rotate"] : {
            "default": currentRules["rotate"]
        };
        currentRules["rotate"]["placement === \"right\""] = "90deg";
    } else if (props.placement === "left") {
        rules += ' _Sa18';
        currentRules["rotate"] = typeof currentRules["rotate"] === 'object' ? currentRules["rotate"] : {
            "default": currentRules["rotate"]
        };
        currentRules["rotate"]["placement === \"left\""] = "-90deg";
    } else if (props.placement === "bottom") {
        rules += ' _Sc18';
        currentRules["rotate"] = typeof currentRules["rotate"] === 'object' ? currentRules["rotate"] : {
            "default": currentRules["rotate"]
        };
        currentRules["rotate"]["placement === \"bottom\""] = "180deg";
    } else if (props.placement === "top") {
        rules += ' _Sb18';
        currentRules["rotate"] = typeof currentRules["rotate"] === 'object' ? currentRules["rotate"] : {
            "default": currentRules["rotate"]
        };
        currentRules["rotate"]["placement === \"top\""] = 0;
    }
    if (props.placement === "right") {
        rules += ' -_7PloMd-y18';
        currentRules["translateX"] = typeof currentRules["translateX"] === 'object' ? currentRules["translateX"] : {
            "default": currentRules["translateX"]
        };
        currentRules["translateX"]["placement === \"right\""] = "25%";
        rules += ' __Ya18';
        currentRules["translateX"] = typeof currentRules["translateX"] === 'object' ? currentRules["translateX"] : {
            "default": currentRules["translateX"]
        };
        currentRules["translateX"]["placement === \"right\""] = "25%";
    } else if (props.placement === "left") {
        rules += ' -_7PloMd-e18';
        currentRules["translateX"] = typeof currentRules["translateX"] === 'object' ? currentRules["translateX"] : {
            "default": currentRules["translateX"]
        };
        currentRules["translateX"]["placement === \"left\""] = "-25%";
        rules += ' __Ya18';
        currentRules["translateX"] = typeof currentRules["translateX"] === 'object' ? currentRules["translateX"] : {
            "default": currentRules["translateX"]
        };
        currentRules["translateX"]["placement === \"left\""] = "-25%";
    }
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Tooltip.native.js:90:20";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Tooltip.native.js:90:20"
        };
    }
    return rules;
};
let $fd32b1555930feff$var$InternalTooltipTriggerContext = (0, $9Xv0G$createContext)({});
function $fd32b1555930feff$export$28c660c63b792dea(props) {
    let domRef = (0, $eXdQ3.useDOMRef)((0, $9Xv0G$untrack)(()=>props.ref));
    let triggerContext = (0, $9Xv0G$useContext)($fd32b1555930feff$var$InternalTooltipTriggerContext);
    let colorScheme = (0, $9Xv0G$createMemo)(()=>(0, $9Xv0G$useContext)((0, $4SbjT.ColorSchemeContext)));
    let locale = (0, $dnlDG.useLocale)();
    let [borderRadius, setBorderRadius] = (0, $9Xv0G$createSignal)(0);
    // TODO: should we pass through lang and dir props in RAC?
    (0, $9Xv0G$createEffect)(()=>({
            el: domRef.current,
            locale: locale.locale,
            direction: locale.direction
        }), ({ el: el, locale: locale, direction: direction })=>{
        if (el) {
            el.lang = locale;
            el.dir = direction;
            let spectrumBorderRadius = typeof window !== 'undefined' ? window.getComputedStyle(el).borderRadius : '';
            if (spectrumBorderRadius !== '') setBorderRadius(parseInt(spectrumBorderRadius, 10));
        }
    });
    return (0, $9Xv0G$createComponent)((0, $ca46e2ce6f0cf00a$export$28c660c63b792dea), (0, $9Xv0G$mergeProps)(()=>(0, $9Xv0G$omit)(props, 'ref'), {
        get arrowBoundaryOffset () {
            return borderRadius();
        },
        get containerPadding () {
            return triggerContext.containerPadding;
        },
        get crossOffset () {
            return triggerContext.crossOffset;
        },
        offset: 9,
        get placement () {
            return triggerContext.placement ?? 'top';
        },
        get shouldFlip () {
            return triggerContext.shouldFlip;
        },
        ref (r$) {
            var _ref$ = domRef;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $9Xv0G$applyRef)(_ref$, r$) : domRef = r$;
        },
        get style () {
            return props.UNSAFE_style;
        },
        className: (renderProps)=>(props.UNSAFE_className ?? '') + $fd32b1555930feff$var$tooltip({
                ...renderProps,
                colorScheme: colorScheme()
            }),
        children: (renderProps)=>[
                (0, $9Xv0G$createComponent)((0, $ae17fb6c158e830b$export$746d02f47f4d381), {
                    className: "",
                    get children () {
                        var _el$ = (0, $9Xv0G$getNextElement)($fd32b1555930feff$var$_tmpl$);
                        (0, $9Xv0G$effect)(()=>(0, $9Xv0G$readShallow)($fd32b1555930feff$var$arrowStyles(renderProps)), (_v$, _$p)=>{
                            (0, $9Xv0G$className)(_el$, _v$, _$p);
                        });
                        return _el$;
                    }
                }),
                (0, $9Xv0G$memo)(()=>props.children)
            ]
    }));
}
function $fd32b1555930feff$export$8c610744efcf8a1d(props) {
    let triggerProps = (0, $9Xv0G$omit)(props, 'containerPadding', 'crossOffset', 'placement', 'shouldFlip');
    let value = {
        get containerPadding () {
            return props.containerPadding;
        },
        get crossOffset () {
            return props.crossOffset;
        },
        get placement () {
            return props.placement;
        },
        get shouldFlip () {
            return props.shouldFlip;
        }
    };
    return (0, $9Xv0G$createComponent)((0, $ca46e2ce6f0cf00a$export$8c610744efcf8a1d), (0, $9Xv0G$mergeProps)(triggerProps, {
        get children () {
            return (0, $9Xv0G$createComponent)($fd32b1555930feff$var$InternalTooltipTriggerContext, {
                value: value,
                get children () {
                    return props.children;
                }
            });
        }
    }));
}
function $fd32b1555930feff$export$92ee03cda75aac2b(props) {
    return (0, $9Xv0G$getNextElement)($fd32b1555930feff$var$_tmpl$2);
}




export {$fd32b1555930feff$export$28c660c63b792dea as Tooltip, $fd32b1555930feff$export$8c610744efcf8a1d as TooltipTrigger};
//# sourceMappingURL=Tooltip.native.js.map
