import "./Divider.native.css";
import $38WsQ$clsx from "clsx";
import {$PROXY as $38WsQ$$PROXY, isHydrating as $38WsQ$isHydrating, createUniqueId as $38WsQ$createUniqueId, createSignal as $38WsQ$createSignal, untrack as $38WsQ$untrack, createEffect as $38WsQ$createEffect, onCleanup as $38WsQ$onCleanup, onSettled as $38WsQ$onSettled, merge as $38WsQ$merge, useContext as $38WsQ$useContext, omit as $38WsQ$omit, action as $38WsQ$action, runWithOwner as $38WsQ$runWithOwner, createContext as $38WsQ$createContext, createMemo as $38WsQ$createMemo, createRenderEffect as $38WsQ$createRenderEffect, children as $38WsQ$children, For as $38WsQ$For} from "solid-js";
import {isServer as $38WsQ$isServer, createComponent as $38WsQ$createComponent, dynamic as $38WsQ$dynamic, memo as $38WsQ$memo, template as $38WsQ$template, getNextElement as $38WsQ$getNextElement, insert as $38WsQ$insert, mergeProps as $38WsQ$mergeProps, applyRef as $38WsQ$applyRef} from "@solidjs/web";


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
        has: (_, key)=>key !== (0, $38WsQ$$PROXY) && args.some((props)=>props != null && key in props),
        getOwnPropertyDescriptor: (_, key)=>args.some((props)=>props != null && key in props) ? {
                enumerable: true,
                configurable: true,
                get: ()=>mergeProperty(key)
            } : undefined,
        get: (_, key)=>key === (0, $38WsQ$$PROXY) ? undefined : mergeProperty(key)
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
                else if ((key === 'className' || key === 'UNSAFE_className') && typeof a === 'string' && typeof b === 'string') result[key] = (0, $38WsQ$clsx)(a, b);
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
    const prefix = (0, $38WsQ$isServer) || (0, $38WsQ$isHydrating)() || false ? 'react-aria' : `react-aria${$9de886171f524ac8$var$clientPrefix}`;
    const generated = `${prefix}-${(0, $38WsQ$createUniqueId)()}`;
    // Adobe negotiates IDs while composing props. This internal signal deliberately
    // accepts those in-scope requests; ordinary component state does not opt in.
    const [value, setValue] = (0, $38WsQ$createSignal)(undefined, {
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
    register((0, $38WsQ$untrack)(res));
    (0, $38WsQ$createEffect)(res, register);
    (0, $38WsQ$onCleanup)(unregister);
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
    let [resolvedId, setResolvedId] = (0, $38WsQ$createSignal)((0, $38WsQ$untrack)(id1));
    let [publication, setPublication] = (0, $38WsQ$createSignal)(0);
    (0, $38WsQ$onSettled)(()=>{
        const currentId = (0, $38WsQ$untrack)(id1);
        setResolvedId(document.getElementById(currentId) ? currentId : undefined);
    });
    (0, $38WsQ$createEffect)(()=>[
            id1(),
            ...typeof depArray === 'function' ? depArray() : depArray
        ], ([currentId])=>{
        // Source useValueEffect first yields the generated ID, allowing new slot hosts
        // to receive it, then checks the DOM after that publication commits.
        setResolvedId(currentId);
        setPublication((value)=>value + 1);
    });
    (0, $38WsQ$createEffect)(()=>{
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


parcelRegister("iFg3Z", function(module, exports) {

$parcel$export(module.exports, "CollectionNode", function () { return $d968842819faa3aa$export$d68d59712b04d9d1; });
$parcel$export(module.exports, "HeaderNode", function () { return $d968842819faa3aa$export$5ae2504e948afce5; });
$parcel$export(module.exports, "BaseCollection", function () { return $d968842819faa3aa$export$408d25a4e12db025; });
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
 */ /** An immutable object representing a Node in a Collection. */ class $d968842819faa3aa$export$d68d59712b04d9d1 {
    static type;
    type;
    key;
    value = null;
    level = 0;
    hasChildNodes = false;
    rendered = null;
    textValue = '';
    'aria-label' = undefined;
    index = 0;
    parentKey = null;
    prevKey = null;
    nextKey = null;
    firstChildKey = null;
    lastChildKey = null;
    props = {};
    render;
    colSpan = null;
    colIndex = null;
    constructor(key){
        this.type = this.constructor.type;
        this.key = key;
    }
    get childNodes() {
        throw new Error('childNodes is not supported');
    }
    clone() {
        let node = new this.constructor(this.key);
        node.value = this.value;
        node.level = this.level;
        node.hasChildNodes = this.hasChildNodes;
        node.rendered = this.rendered;
        node.textValue = this.textValue;
        node['aria-label'] = this['aria-label'];
        node.index = this.index;
        node.parentKey = this.parentKey;
        node.prevKey = this.prevKey;
        node.nextKey = this.nextKey;
        node.firstChildKey = this.firstChildKey;
        node.lastChildKey = this.lastChildKey;
        node.props = this.props;
        node.render = this.render;
        node.colSpan = this.colSpan;
        node.colIndex = this.colIndex;
        return node;
    }
    filter(collection, newCollection, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filterFn) {
        let clone = this.clone();
        newCollection.addDescendants(clone, collection);
        return clone;
    }
}
class $d968842819faa3aa$export$b1918e978f1ee46f extends $d968842819faa3aa$export$d68d59712b04d9d1 {
    filter(collection, newCollection, filterFn) {
        let [firstKey, lastKey] = $d968842819faa3aa$var$filterChildren(collection, newCollection, this.firstChildKey, filterFn);
        let newNode = this.clone();
        newNode.firstChildKey = firstKey;
        newNode.lastChildKey = lastKey;
        return newNode;
    }
}
class $d968842819faa3aa$export$5ae2504e948afce5 extends $d968842819faa3aa$export$d68d59712b04d9d1 {
    static type = 'header';
}
class $d968842819faa3aa$export$8258a0665a675899 extends $d968842819faa3aa$export$d68d59712b04d9d1 {
    static type = 'loader';
}
class $d968842819faa3aa$export$fd11f34e1d07f134 extends $d968842819faa3aa$export$b1918e978f1ee46f {
    static type = 'item';
    filter(collection, newCollection, filterFn) {
        if (filterFn(this.textValue, this)) {
            let clone = this.clone();
            newCollection.addDescendants(clone, collection);
            return clone;
        }
        return null;
    }
}
class $d968842819faa3aa$export$437f11dc9b403b78 extends $d968842819faa3aa$export$b1918e978f1ee46f {
    static type = 'section';
    filter(collection, newCollection, filterFn) {
        let filteredSection = super.filter(collection, newCollection, filterFn);
        if (filteredSection) {
            if (filteredSection.lastChildKey !== null) {
                let lastChild = collection.getItem(filteredSection.lastChildKey);
                if (lastChild && lastChild.type !== 'header') return filteredSection;
            }
        }
        return null;
    }
}
class $d968842819faa3aa$export$408d25a4e12db025 {
    keyMap = new Map();
    firstKey = null;
    lastKey = null;
    frozen = false;
    itemCount = 0;
    get size() {
        return this.itemCount;
    }
    getKeys() {
        return this.keyMap.keys();
    }
    *[Symbol.iterator]() {
        let node = this.firstKey != null ? this.keyMap.get(this.firstKey) : undefined;
        while(node){
            yield node;
            node = node.nextKey != null ? this.keyMap.get(node.nextKey) : undefined;
        }
    }
    getChildren(key) {
        let keyMap = this.keyMap;
        return {
            *[Symbol.iterator] () {
                let parent = keyMap.get(key);
                let node = parent?.firstChildKey != null ? keyMap.get(parent.firstChildKey) : null;
                while(node){
                    yield node;
                    node = node.nextKey != null ? keyMap.get(node.nextKey) : undefined;
                }
            }
        };
    }
    getKeyBefore(key) {
        let node = this.keyMap.get(key);
        if (!node) return null;
        if (node.prevKey != null) {
            node = this.keyMap.get(node.prevKey);
            while(node && node.type !== 'item' && node.lastChildKey != null)node = this.keyMap.get(node.lastChildKey);
            return node?.key ?? null;
        }
        return node.parentKey;
    }
    getKeyAfter(key) {
        let node = this.keyMap.get(key);
        if (!node) return null;
        if (node.type !== 'item' && node.firstChildKey != null) return node.firstChildKey;
        while(node){
            if (node.nextKey != null) return node.nextKey;
            if (node.parentKey != null) node = this.keyMap.get(node.parentKey);
            else return null;
        }
        return null;
    }
    getFirstKey() {
        return this.firstKey;
    }
    getLastKey() {
        let node = this.lastKey != null ? this.keyMap.get(this.lastKey) : null;
        while(node?.lastChildKey != null)node = this.keyMap.get(node.lastChildKey);
        return node?.key ?? null;
    }
    getItem(key) {
        return this.keyMap.get(key) ?? null;
    }
    at() {
        throw new Error('Not implemented');
    }
    clone() {
        // We need to clone using this.constructor so that subclasses have the right prototype.
        // TypeScript isn't happy about this yet.
        // https://github.com/microsoft/TypeScript/issues/3841
        let Constructor = this.constructor;
        let collection = new Constructor();
        collection.keyMap = new Map(this.keyMap);
        collection.firstKey = this.firstKey;
        collection.lastKey = this.lastKey;
        collection.itemCount = this.itemCount;
        return collection;
    }
    addNode(node) {
        if (this.frozen) throw new Error('Cannot add a node to a frozen collection');
        if (node.type === 'item' && this.keyMap.get(node.key) == null) this.itemCount++;
        this.keyMap.set(node.key, node);
    }
    // Deeply add a node and its children to the collection from another collection, primarily used when filtering a collection
    addDescendants(node, oldCollection) {
        this.addNode(node);
        let children = oldCollection.getChildren(node.key);
        for (let child of children)this.addDescendants(child, oldCollection);
    }
    removeNode(key) {
        if (this.frozen) throw new Error('Cannot remove a node to a frozen collection');
        let node = this.keyMap.get(key);
        if (node != null && node.type === 'item') this.itemCount--;
        this.keyMap.delete(key);
    }
    commit(firstKey, lastKey, isSSR = false) {
        if (this.frozen) throw new Error('Cannot commit a frozen collection');
        this.firstKey = firstKey;
        this.lastKey = lastKey;
        this.frozen = !isSSR;
    }
    filter(filterFn) {
        let newCollection = new this.constructor();
        let [firstKey, lastKey] = $d968842819faa3aa$var$filterChildren(this, newCollection, this.firstKey, filterFn);
        newCollection?.commit(firstKey, lastKey);
        return newCollection;
    }
}
function $d968842819faa3aa$var$filterChildren(collection, newCollection, firstChildKey, filterFn) {
    // loop over the siblings for firstChildKey
    // create new nodes based on calling node.filter for each child
    // if it returns null then don't include it, otherwise update its prev/next keys
    // add them to the newCollection
    if (firstChildKey == null) return [
        null,
        null
    ];
    let firstNode = null;
    let lastNode = null;
    let currentNode = collection.getItem(firstChildKey);
    while(currentNode != null){
        let newNode = currentNode.filter(collection, newCollection, filterFn);
        if (newNode != null) {
            newNode.nextKey = null;
            if (lastNode) {
                newNode.prevKey = lastNode.key;
                lastNode.nextKey = newNode.key;
            }
            if (firstNode == null) firstNode = newNode;
            newCollection.addNode(newNode);
            lastNode = newNode;
        }
        currentNode = currentNode.nextKey != null ? collection.getItem(currentNode.nextKey) : null;
    }
    // TODO: this is pretty specific to dividers but doesn't feel like there is a good way to get around it since we only can know
    // to filter the last separator in a collection only after performing a filter for the rest of the contents after it
    // Its gross that it needs to live here, might be nice if somehow we could have this live in the separator code
    if (lastNode && lastNode.type === 'separator') {
        let prevKey = lastNode.prevKey;
        newCollection.removeNode(lastNode.key);
        if (prevKey != null) {
            lastNode = newCollection.getItem(prevKey);
            lastNode.nextKey = null;
        } else lastNode = null;
    }
    return [
        firstNode?.key ?? null,
        lastNode?.key ?? null
    ];
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
        return (0, $38WsQ$createComponent)(Context, {
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
            return (typeof value === 'function' ? value((0, $38WsQ$merge)(props.values, {
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
    let ctx = (0, $38WsQ$useContext)(context);
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
    let contextProps = (0, $38WsQ$omit)(ctx, 'ref');
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
    let finalProps = (0, $38WsQ$merge)(mergedProps, styleOverride);
    return [
        finalProps,
        mergedRef
    ];
}
function $1e122d8834d59736$export$9d4c57ee4c6ffdd8(initialState = true) {
    // Initial state is typically based on the parent having an aria-label or aria-labelledby.
    // If it does, this value should be false so that we don't update the state and cause a rerender when we go through the layoutEffect
    let [hasSlot, setHasSlot] = (0, $38WsQ$createSignal)(typeof initialState === 'function' ? initialState() : initialState);
    let hasRun = false;
    // A callback ref which will run when the slotted element mounts.
    // This should happen before the useLayoutEffect below.
    let ref = (el)=>{
        hasRun = true;
        setHasSlot(!!el);
    };
    // If the callback hasn't been called, then reset to false.
    (0, $38WsQ$onSettled)(()=>{
        if (!hasRun) setHasSlot(false);
    });
    return [
        ref,
        hasSlot
    ];
}
function $1e122d8834d59736$export$ef03459518577ad4(props) {
    return (0, $38WsQ$omit)(props, (key)=>key === (0, $38WsQ$$PROXY) || typeof key === 'string' && key.startsWith('data-'));
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
    (0, $38WsQ$createEffect)(()=>props.ref, (targetRef)=>{
        let node = (0, $38WsQ$untrack)(()=>ref.current);
        if (node && targetRef !== deliveredRef) {
            ref(null);
            ref(node);
        }
    });
    // RC13 supports native listener options through addEventListener, not *Capture JSX props.
    (0, $38WsQ$createEffect)(()=>({
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
    (0, $38WsQ$onSettled)(()=>{
        // One-time custom-host conformance observation after attachment.
        let element = (0, $38WsQ$untrack)(()=>ref.current);
    });
    let domProps = (0, $38WsQ$merge)((0, $38WsQ$omit)(props, (key)=>key === 'render' || key === 'ref' || key === 'className' || key === 'htmlFor' || /^on[A-Z].*Capture$/.test(String(key))), {
        ref: ref,
        get class () {
            return props.className;
        },
        get for () {
            return props.htmlFor ?? props.for;
        }
    });
    const CustomRender = (hostProps)=>props.render(hostProps, undefined);
    const Host = (0, $38WsQ$dynamic)(()=>props.render ? CustomRender : ElementType);
    return (0, $38WsQ$createComponent)(Host, domProps);
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
        let cleanup = (0, $38WsQ$untrack)(()=>ref(instance));
        return typeof cleanup === 'function' ? cleanup : ()=>{
            (0, $38WsQ$untrack)(()=>ref(null));
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
    let [revision, setRevision] = (0, $38WsQ$createSignal)(0);
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
    let detach = (0, $38WsQ$action)(function*() {
        attach(null);
    });
    Object.defineProperty(attach, 'current', {
        get () {
            revision();
            return current;
        },
        set: attach
    });
    (0, $38WsQ$onCleanup)(()=>(0, $38WsQ$runWithOwner)(null, detach));
    return attach;
}

});


parcelRegister("9jLe3", function(module, exports) {

$parcel$export(module.exports, "createLeafComponent", function () { return $6c8a857437fa30d4$export$18af5c7a9e9b3664; });


var $iFg3Z = parcelRequire("iFg3Z");

var $beLUg = parcelRequire("beLUg");

var $j5TE6 = parcelRequire("j5TE6");

var $cpleU = parcelRequire("cpleU");

var $7A3TT = parcelRequire("7A3TT");

const $6c8a857437fa30d4$var$ShallowRenderContext = (0, $38WsQ$createContext)(false);
const $6c8a857437fa30d4$var$CollectionDocumentContext = (0, $38WsQ$createContext)(null);
function $6c8a857437fa30d4$export$bf788dd355e3a401(props) {
    // If a document was provided above us, we're already in a hidden tree. Just render the content.
    let doc = (0, $38WsQ$useContext)($6c8a857437fa30d4$var$CollectionDocumentContext);
    if (doc) // The React types prior to 18 did not allow returning ReactNode from components
    // even though the actual implementation since React 16 did.
    // We must return ReactElement so that TS does not complain that <CollectionBuilder>
    // is not a valid JSX element with React 16 and 17 types.
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20544
    return props.content;
    // Otherwise, render a hidden copy of the children so that we can build the collection before constructing the state.
    // This should always come before the real DOM content so we have built the collection by the time it renders during SSR.
    // This is fine. CollectionDocumentContext never changes after mounting.
    // oxlint-disable-next-line react/react-compiler, react-hooks/rules-of-hooks
    let { collection: collection, document: document } = $6c8a857437fa30d4$var$useCollectionDocument(props.createCollection);
    return [
        (0, $38WsQ$createComponent)((0, $7A3TT.Hidden), {
            get children () {
                return (0, $38WsQ$createComponent)($6c8a857437fa30d4$var$CollectionDocumentContext, {
                    value: document,
                    get children () {
                        return props.content;
                    }
                });
            }
        }),
        (0, $38WsQ$createComponent)($6c8a857437fa30d4$var$CollectionInner, {
            get render () {
                return props.children;
            },
            collection: collection
        })
    ];
}
function $6c8a857437fa30d4$var$CollectionInner(props) {
    return (0, $38WsQ$memo)(()=>props.render(props.collection()));
}
function $6c8a857437fa30d4$var$useCollectionDocument(createCollection) {
    // The document instance is mutable, and should never change between renders.
    // useSyncExternalStore is used to subscribe to updates, which vends immutable Collection objects.
    let document = new (0, $beLUg.Document)(createCollection?.() || new (0, $iFg3Z.BaseCollection)());
    document.isSSR = (0, $38WsQ$isServer) || (0, $38WsQ$isHydrating)();
    // Notifications invalidate the snapshot; finalize only after the fake renderer's
    // mutation transaction, never from inside Document's subscription callback.
    let [revision, setRevision] = (0, $38WsQ$createSignal)(0, {
        ownedWrite: true
    });
    (0, $38WsQ$onCleanup)(document.subscribe(()=>{
        if (!(0, $38WsQ$isServer)) setRevision((n)=>n + 1);
    }));
    (0, $38WsQ$onSettled)(()=>{
        if (!(0, $38WsQ$isServer) && document.isSSR) {
            // Unlike React's SSR-to-portal switch, native owners retain the same fake
            // nodes during hydration. Finalize them without clearing/recreating the tree.
            document.isSSR = false;
            document.getCollection();
            setRevision((n)=>n + 1);
        }
    });
    // Server memos evaluate eagerly. The source snapshot is read only after the
    // hidden subtree builds the document; an early read freezes an empty snapshot.
    let snapshot = (0, $38WsQ$createMemo)(()=>{
        revision();
        return (0, $38WsQ$isServer) ? ()=>document.getCollection() : document.getCollection();
    });
    let collection = ()=>{
        let value = snapshot();
        return typeof value === 'function' ? value() : value;
    };
    return {
        collection: collection,
        document: document
    };
}
const $6c8a857437fa30d4$var$SSRContext = (0, $38WsQ$createContext)(null);
function $6c8a857437fa30d4$var$createCollectionNodeClass(type) {
    let NodeClass = class extends (0, $iFg3Z.CollectionNode) {
        static type = type;
    };
    return NodeClass;
}
function $6c8a857437fa30d4$var$useSSRCollectionNode(CollectionNodeClass, props, ref, rendered, children, render) {
    // To prevent breaking change, if CollectionNodeClass is a string, create a CollectionNodeClass using the string as the type
    if (typeof CollectionNodeClass === 'string') // oxlint-disable-next-line react/react-compiler
    CollectionNodeClass = $6c8a857437fa30d4$var$createCollectionNodeClass(CollectionNodeClass);
    // SSRContext supplies the fake parent node on both server and client. Native
    // owners retain these nodes during hydration and manage subsequent updates.
    let parentNode = (0, $38WsQ$useContext)($6c8a857437fa30d4$var$SSRContext);
    if (!parentNode) throw new Error('Collection node requires a collection document.');
    let element = parentNode.ownerDocument.createElement(CollectionNodeClass.type);
    let NodeClass = CollectionNodeClass;
    // Resolve descendants first, matching the source renderer's child-before-parent
    // ref delivery (and therefore its generated key order).
    $6c8a857437fa30d4$var$renderCollectionChildren(element, ()=>(0, $38WsQ$createComponent)($6c8a857437fa30d4$var$SSRContext, {
            value: element,
            children: children
        }));
    let updateProps = ()=>{
        let view = props;
        let snapshot = Object.fromEntries(Object.keys(view).filter((key)=>key !== 'children').map((key)=>[
                key,
                view[key]
            ]));
        // Native JSX children must stay lazy until their consuming owner. Enumerating
        // this getter here would execute a branch's descendants a second time.
        if ('children' in view) {
            if (children == null) {
                // Keep a literal child literal for source textValue inference. Native
                // JSX getters must instead execute beneath the real leaf's providers.
                let descriptor = Object.getOwnPropertyDescriptor(view, 'children');
                snapshot.children = descriptor && 'value' in descriptor && typeof descriptor.value === 'string' ? descriptor.value : rendered;
            } else // Source node.props retains the original branch children, independently
            // of useChildren's selected fake-tree descendants. Keep native elements
            // lazy: only the real branch renderer consumes e.g. the Popover at [1].
            Object.defineProperty(snapshot, 'children', {
                enumerable: true,
                configurable: true,
                get: ()=>view.children
            });
        }
        return {
            props: snapshot,
            rendered: rendered
        };
    };
    (0, $38WsQ$createRenderEffect)(updateProps, (value)=>{
        element.setProps(value.props, ref, NodeClass, value.rendered, render);
    });
    (0, $38WsQ$onCleanup)(()=>element.parentNode?.removeChild(element));
    // This value is consumed by the collection renderer, never by the web renderer.
    return element;
}
/** Native renderer for the source fake DOM. Solid owns child lifetimes; the
 * Document still owns all mutation, dirty tracking and immutable snapshots. */ function $6c8a857437fa30d4$var$renderCollectionChildren(parent, content) {
    let children = (0, $38WsQ$children)(content);
    let read = ()=>children.toArray().filter((child)=>child instanceof (0, $beLUg.ElementNode));
    let reconcile = (next)=>{
        let retained = new Set(next);
        for (let child of [
            ...parent
        ])if (!retained.has(child)) parent.removeChild(child);
        let reference = parent.firstChild;
        for (let child of next){
            if (child !== reference) parent.insertBefore(child, reference);
            reference = child.nextSibling;
        }
    };
    (0, $38WsQ$createRenderEffect)(read, reconcile);
    return children;
}
function $6c8a857437fa30d4$export$18af5c7a9e9b3664(CollectionNodeClass, render) {
    let Component = ({ node: node })=>render(node.props, node.props.ref, node);
    let Result = (input)=>{
        let item = (0, $38WsQ$useContext)((0, $j5TE6.CachedItemContext));
        let props = (0, $38WsQ$merge)(input, item ? {
            get id () {
                return input.id ?? item.id;
            },
            get value () {
                return item.value;
            }
        } : {});
        let ref = props.ref;
        let focusableProps = (0, $38WsQ$useContext)((0, $cpleU.FocusableContext));
        let isShallow = (0, $38WsQ$useContext)($6c8a857437fa30d4$var$ShallowRenderContext);
        if (!isShallow) {
            if (render.length >= 3) throw new Error(render.name + ' cannot be rendered outside a collection.');
            return render(props, ref);
        }
        return $6c8a857437fa30d4$var$useSSRCollectionNode(CollectionNodeClass, props, ref, (...args)=>{
            let child = 'children' in props ? props.children : null;
            // Render-prop callbacks receive the real consumer's state; native lazy
            // JSX resolves here as well, never in the fake collection owner.
            return typeof child === 'function' ? child(...args) : child;
        }, null, (node)=>(0, $38WsQ$createComponent)((0, $cpleU.FocusableContext), {
                value: focusableProps,
                get children () {
                    return (0, $38WsQ$createComponent)(Component, {
                        node: node
                    });
                }
            }));
    };
    // @ts-ignore
    Result.displayName = render.name;
    return Result;
}
function $6c8a857437fa30d4$export$e953bb1cd0f19726(CollectionNodeClass, render, useChildren = $6c8a857437fa30d4$var$useCollectionChildren) {
    let Component = ({ node: node })=>render(node.props, node.props.ref, node);
    let Result = (input)=>{
        let item = (0, $38WsQ$useContext)((0, $j5TE6.CachedItemContext));
        let props = (0, $38WsQ$merge)(input, item ? {
            get id () {
                return input.id ?? item.id;
            },
            get value () {
                return item.value;
            }
        } : {});
        let ref = props.ref;
        let children = (0, $38WsQ$createComponent)((0, $j5TE6.CachedItemContext), {
            value: null,
            get children () {
                return useChildren(props);
            }
        });
        return $6c8a857437fa30d4$var$useSSRCollectionNode(CollectionNodeClass, props, ref, null, children, (node)=>(0, $38WsQ$createComponent)(Component, {
                node: node
            })) ?? [];
    };
    // @ts-ignore
    Result.displayName = render.name;
    return Result;
}
function $6c8a857437fa30d4$var$useCollectionChildren(options) {
    return (0, $j5TE6.useCachedChildren)((0, $38WsQ$merge)(options, {
        addIdAndValue: true
    }));
}
const $6c8a857437fa30d4$var$CollectionContext = (0, $38WsQ$createContext)(null);
function $6c8a857437fa30d4$export$fb8073518f34e6ec(props) {
    let ctx = (0, $38WsQ$useContext)($6c8a857437fa30d4$var$CollectionContext);
    let options = (0, $38WsQ$merge)(props, {
        get dependencies () {
            return (ctx?.dependencies || []).concat(props.dependencies || []);
        },
        get idScope () {
            return props.idScope ?? ctx?.idScope;
        }
    });
    let children = $6c8a857437fa30d4$var$useCollectionChildren(options);
    let doc = (0, $38WsQ$useContext)($6c8a857437fa30d4$var$CollectionDocumentContext);
    if (doc) children = (0, $38WsQ$createComponent)($6c8a857437fa30d4$var$CollectionRoot, {
        children: children
    });
    // Propagate dependencies and idScope to child collections.
    let value = {
        get dependencies () {
            return options.dependencies;
        },
        get idScope () {
            return options.idScope;
        }
    };
    return (0, $38WsQ$createComponent)($6c8a857437fa30d4$var$CollectionContext, {
        value: value,
        children: children
    });
}
function $6c8a857437fa30d4$var$CollectionRoot(props) {
    let doc = (0, $38WsQ$useContext)($6c8a857437fa30d4$var$CollectionDocumentContext);
    if (!doc) throw new Error('CollectionRoot requires a collection document.');
    $6c8a857437fa30d4$var$renderCollectionChildren(doc, ()=>(0, $38WsQ$createComponent)($6c8a857437fa30d4$var$CollectionDocumentContext, {
            value: null,
            get children () {
                return (0, $38WsQ$createComponent)($6c8a857437fa30d4$var$ShallowRenderContext, {
                    value: true,
                    get children () {
                        return (0, $38WsQ$createComponent)($6c8a857437fa30d4$var$SSRContext, {
                            value: doc,
                            get children () {
                                return props.children;
                            }
                        });
                    }
                });
            }
        }));
    // During SSR, we render the content directly, and append nodes to the document during render.
    // The collection children return null so that nothing is actually rendered into the HTML.
    return null;
}

});
parcelRegister("beLUg", function(module, exports) {

$parcel$export(module.exports, "ElementNode", function () { return $82e629beb595dcb6$export$dc064fe9e59310fd; });
$parcel$export(module.exports, "Document", function () { return $82e629beb595dcb6$export$b34a105447964f9f; });
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
 */ // This Collection implementation is perhaps a little unusual. It works by rendering the React tree into a
// Portal to a fake DOM implementation. This gives us efficient access to the tree of rendered objects, and
// supports React features like composition and context. We use this fake DOM to access the full set of elements
// before we render into the real DOM, which allows us to render a subset of the elements (e.g. virtualized scrolling),
// and compute properties like the total number of items. It also enables keyboard navigation, selection, and other features.
// React takes care of efficiently rendering components and updating the collection for us via this fake DOM.
//
// The DOM is a mutable API, and React expects the node instances to remain stable over time. So the implementation is split
// into two parts. Each mutable fake DOM node owns an instance of an immutable collection node. When a fake DOM node is updated,
// it queues a second render for the collection. Multiple updates to a collection can be queued at once. Collection nodes are
// lazily copied on write, so only the changed nodes need to be cloned. During the second render, the new immutable collection
// is finalized by updating the map of Key -> Node with the new cloned nodes. Then the new collection is frozen so it can no
// longer be mutated, and returned to the calling component to render.
/**
 * A mutable node in the fake DOM tree. When mutated, it marks itself as dirty
 * and queues an update with the owner document.
 */ class $82e629beb595dcb6$export$410b0c854570d131 {
    _firstChild = null;
    _lastChild = null;
    _previousSibling = null;
    _nextSibling = null;
    _parentNode = null;
    _minInvalidChildIndex = null;
    ownerDocument;
    constructor(ownerDocument){
        this.ownerDocument = ownerDocument;
    }
    *[Symbol.iterator]() {
        let node = this.firstChild;
        while(node){
            yield node;
            node = node.nextSibling;
        }
    }
    get firstChild() {
        return this._firstChild;
    }
    set firstChild(firstChild) {
        this._firstChild = firstChild;
        this.ownerDocument.markDirty(this);
    }
    get lastChild() {
        return this._lastChild;
    }
    set lastChild(lastChild) {
        this._lastChild = lastChild;
        this.ownerDocument.markDirty(this);
    }
    get previousSibling() {
        return this._previousSibling;
    }
    set previousSibling(previousSibling) {
        this._previousSibling = previousSibling;
        this.ownerDocument.markDirty(this);
    }
    get nextSibling() {
        return this._nextSibling;
    }
    set nextSibling(nextSibling) {
        this._nextSibling = nextSibling;
        this.ownerDocument.markDirty(this);
    }
    get parentNode() {
        return this._parentNode;
    }
    set parentNode(parentNode) {
        this._parentNode = parentNode;
        this.ownerDocument.markDirty(this);
    }
    get isConnected() {
        return this.parentNode?.isConnected || false;
    }
    invalidateChildIndices(child) {
        if (this._minInvalidChildIndex == null || !this._minInvalidChildIndex.isConnected || child.index < this._minInvalidChildIndex.index) {
            this._minInvalidChildIndex = child;
            this.ownerDocument.markDirty(this);
        }
    }
    updateChildIndices() {
        let node = this._minInvalidChildIndex;
        while(node){
            node.index = node.previousSibling ? node.previousSibling.index + 1 : 0;
            node = node.nextSibling;
        }
        this._minInvalidChildIndex = null;
    }
    appendChild(child) {
        if (child.parentNode) child.parentNode.removeChild(child);
        if (this.firstChild == null) this.firstChild = child;
        if (this.lastChild) {
            this.lastChild.nextSibling = child;
            child.index = this.lastChild.index + 1;
            child.previousSibling = this.lastChild;
        } else {
            child.previousSibling = null;
            child.index = 0;
        }
        child.parentNode = this;
        child.nextSibling = null;
        this.lastChild = child;
        this.ownerDocument.markDirty(this);
        if (this.isConnected) this.ownerDocument.queueUpdate();
    }
    insertBefore(newNode, referenceNode) {
        if (referenceNode == null) return this.appendChild(newNode);
        if (newNode.parentNode) newNode.parentNode.removeChild(newNode);
        newNode.nextSibling = referenceNode;
        newNode.previousSibling = referenceNode.previousSibling;
        // Ensure that the newNode's index is less than that of the reference node so that
        // invalidateChildIndices will properly use the newNode as the _minInvalidChildIndex, thus making sure
        // we will properly update the indexes of all sibiling nodes after the newNode. The value here doesn't matter
        // since updateChildIndices should calculate the proper indexes.
        newNode.index = referenceNode.index - 1;
        if (this.firstChild === referenceNode) this.firstChild = newNode;
        else if (referenceNode.previousSibling) referenceNode.previousSibling.nextSibling = newNode;
        referenceNode.previousSibling = newNode;
        newNode.parentNode = referenceNode.parentNode;
        this.invalidateChildIndices(newNode);
        if (this.isConnected) this.ownerDocument.queueUpdate();
    }
    removeChild(child) {
        if (child.parentNode !== this) return;
        if (this._minInvalidChildIndex === child) this._minInvalidChildIndex = null;
        if (child.nextSibling) {
            this.invalidateChildIndices(child.nextSibling);
            child.nextSibling.previousSibling = child.previousSibling;
        }
        if (child.previousSibling) child.previousSibling.nextSibling = child.nextSibling;
        if (this.firstChild === child) this.firstChild = child.nextSibling;
        if (this.lastChild === child) this.lastChild = child.previousSibling;
        child.parentNode = null;
        child.nextSibling = null;
        child.previousSibling = null;
        child.index = 0;
        this.ownerDocument.markDirty(child);
        if (this.isConnected) this.ownerDocument.queueUpdate();
    }
    addEventListener() {}
    removeEventListener() {}
    get previousVisibleSibling() {
        let node = this.previousSibling;
        while(node && node.isHidden)node = node.previousSibling;
        return node;
    }
    get nextVisibleSibling() {
        let node = this.nextSibling;
        while(node && node.isHidden)node = node.nextSibling;
        return node;
    }
    get firstVisibleChild() {
        let node = this.firstChild;
        while(node && node.isHidden)node = node.nextSibling;
        return node;
    }
    get lastVisibleChild() {
        let node = this.lastChild;
        while(node && node.isHidden)node = node.previousSibling;
        return node;
    }
}
class $82e629beb595dcb6$export$dc064fe9e59310fd extends $82e629beb595dcb6$export$410b0c854570d131 {
    nodeType = 8;
    node;
    isMutated = true;
    _index = 0;
    isHidden = false;
    constructor(type, ownerDocument){
        super(ownerDocument);
        this.node = null;
    }
    get index() {
        return this._index;
    }
    set index(index) {
        this._index = index;
        this.ownerDocument.markDirty(this);
    }
    get level() {
        if (this.parentNode instanceof $82e629beb595dcb6$export$dc064fe9e59310fd) return this.parentNode.level + (this.parentNode.node?.type === 'item' ? 1 : 0);
        return 0;
    }
    /**
     * Lazily gets a mutable instance of a Node. If the node has already
     * been cloned during this update cycle, it just returns the existing one.
     */ getMutableNode() {
        if (this.node == null) return null;
        if (!this.isMutated) {
            this.node = this.node.clone();
            this.isMutated = true;
        }
        this.ownerDocument.markDirty(this);
        return this.node;
    }
    updateNode() {
        let nextSibling = this.nextVisibleSibling;
        let node = this.getMutableNode();
        if (node == null) return;
        node.index = this.index;
        node.level = this.level;
        node.parentKey = this.parentNode instanceof $82e629beb595dcb6$export$dc064fe9e59310fd ? this.parentNode.node?.key ?? null : null;
        node.prevKey = this.previousVisibleSibling?.node?.key ?? null;
        node.nextKey = nextSibling?.node?.key ?? null;
        node.hasChildNodes = !!this.firstChild;
        node.firstChildKey = this.firstVisibleChild?.node?.key ?? null;
        node.lastChildKey = this.lastVisibleChild?.node?.key ?? null;
        // Update the colIndex of sibling nodes if this node has a colSpan.
        if ((node.colSpan != null || node.colIndex != null) && nextSibling) {
            // This queues the next sibling for update, which means this happens recursively.
            let nextColIndex = (node.colIndex ?? node.index) + (node.colSpan ?? 1);
            if (nextSibling.node != null && nextColIndex !== nextSibling.node.colIndex) {
                let siblingNode = nextSibling.getMutableNode();
                siblingNode.colIndex = nextColIndex;
            }
        }
    }
    setProps(obj, ref, CollectionNodeClass, rendered, render) {
        let node;
        let { value: value1, textValue: textValue, id: id, ...props } = obj;
        if (this.node == null) {
            node = new CollectionNodeClass(id ?? `react-aria-${++this.ownerDocument.nodeId}`);
            this.node = node;
        } else node = this.getMutableNode();
        props.ref = ref;
        node.props = props;
        node.rendered = rendered;
        node.render = render;
        node.value = value1;
        if (obj['aria-label']) node['aria-label'] = obj['aria-label'];
        node.textValue = textValue || (typeof props.children === 'string' ? props.children : '') || obj['aria-label'] || '';
        if (id != null && id !== node.key) throw new Error('Cannot change the id of an item');
        if (props.colSpan != null) node.colSpan = props.colSpan;
        if (this.isConnected) this.ownerDocument.queueUpdate();
    }
    get style() {
        // React sets display: none to hide elements during Suspense.
        // We'll handle this by setting the element to hidden and invalidating
        // its siblings/parent. Hidden elements remain in the Document, but
        // are removed from the Collection.
        let element = this;
        return {
            get display () {
                return element.isHidden ? 'none' : '';
            },
            set display (value){
                let isHidden = value === 'none';
                if (element.isHidden !== isHidden) {
                    // Mark parent node dirty if this element is currently the first or last visible child.
                    if (element.parentNode?.firstVisibleChild === element || element.parentNode?.lastVisibleChild === element) element.ownerDocument.markDirty(element.parentNode);
                    // Mark sibling visible elements dirty.
                    let prev = element.previousVisibleSibling;
                    let next = element.nextVisibleSibling;
                    if (prev) element.ownerDocument.markDirty(prev);
                    if (next) element.ownerDocument.markDirty(next);
                    // Mark self dirty.
                    element.isHidden = isHidden;
                    element.ownerDocument.markDirty(element);
                }
            }
        };
    }
    hasAttribute() {}
    setAttribute() {}
    setAttributeNS() {}
    removeAttribute() {}
}
class $82e629beb595dcb6$export$b34a105447964f9f extends $82e629beb595dcb6$export$410b0c854570d131 {
    nodeType = 11;
    ownerDocument = this;
    dirtyNodes = new Set();
    isSSR = false;
    nodeId = 0;
    nodesByProps = new WeakMap();
    keyOwners = new Map();
    collection;
    nextCollection = null;
    subscriptions = new Set();
    queuedRender = false;
    inSubscription = false;
    constructor(collection){
        // @ts-ignore
        super(null);
        this.collection = collection;
        this.nextCollection = collection;
    }
    get isConnected() {
        return true;
    }
    createElement(type) {
        return new $82e629beb595dcb6$export$dc064fe9e59310fd(type, this);
    }
    getMutableCollection() {
        if (!this.nextCollection) this.nextCollection = this.collection.clone();
        return this.nextCollection;
    }
    markDirty(node) {
        this.dirtyNodes.add(node);
    }
    addNode(element) {
        if (element.isHidden || element.node == null) return;
        let collection = this.getMutableCollection();
        if (!collection.getItem(element.node.key)) for (let child of element)this.addNode(child);
        collection.addNode(element.node);
    }
    removeNode(node) {
        for (let child of node)this.removeNode(child);
        if (node.node) {
            let collection = this.getMutableCollection();
            collection.removeNode(node.node.key);
        }
    }
    /** Finalizes the collection update, updating all nodes and freezing the collection. */ getCollection() {
        // If in a subscription update, return return the existing collection.
        // React will call getCollection again during render, at which point all the updates will be complete.
        if (this.inSubscription) return this.collection;
        // Reset queuedRender to false when getCollection is called during render.
        this.queuedRender = false;
        this.updateCollection();
        return this.collection;
    }
    updateCollection() {
        // First, remove disconnected nodes and update the indices of dirty element children.
        for (let element of this.dirtyNodes)if (element instanceof $82e629beb595dcb6$export$dc064fe9e59310fd && (!element.isConnected || element.isHidden)) this.removeNode(element);
        else element.updateChildIndices();
        // Next, update dirty collection nodes.
        for (let element of this.dirtyNodes)if (element instanceof $82e629beb595dcb6$export$dc064fe9e59310fd) {
            if (element.isConnected && !element.isHidden) {
                element.updateNode();
                this.addNode(element);
            }
            if (element.node) this.dirtyNodes.delete(element);
            element.isMutated = false;
        } else this.dirtyNodes.delete(element);
        // Finally, update the collection.
        if (this.nextCollection) {
            this.nextCollection.commit(this.firstVisibleChild?.node?.key ?? null, this.lastVisibleChild?.node?.key ?? null, this.isSSR);
            if (!this.isSSR) {
                this.collection = this.nextCollection;
                this.nextCollection = null;
            }
        }
    }
    queueUpdate() {
        if (this.dirtyNodes.size === 0 || this.queuedRender) return;
        // Only trigger subscriptions once during an update, when the first item changes.
        // React's useSyncExternalStore will call getCollection immediately, to check whether the snapshot changed.
        // If so, React will queue a render to happen after the current commit to our fake DOM finishes.
        // We track whether getCollection is called in a subscription, and once it is called during render,
        // we reset queuedRender back to false.
        this.queuedRender = true;
        this.inSubscription = true;
        // Clone the collection to ensure that React queues a render. It will call getCollection again
        // during render, at which point all the updates will be complete and we can return
        // the new collection.
        if (!this.isSSR) this.collection = this.collection.clone();
        for (let fn of this.subscriptions)fn();
        this.inSubscription = false;
    }
    subscribe(fn) {
        this.subscriptions.add(fn);
        // Ensure that React reads the collection if we re-subscribe after updates were
        // already queued. When a hidden Activity is revealed, child nodes re-attach and call
        // queueUpdate before we can re-subscribe, so the notification is lost.
        if (this.queuedRender) fn();
        return ()=>this.subscriptions.delete(fn);
    }
    resetAfterSSR() {
        if (this.isSSR) {
            this.isSSR = false;
            this.firstChild = null;
            this.lastChild = null;
            this.nodeId = 0;
            this.keyOwners.clear();
        }
    }
}

});

parcelRegister("j5TE6", function(module, exports) {

$parcel$export(module.exports, "CachedItemContext", function () { return $de69a611ef9c0aab$export$f44063955319d654; });
$parcel$export(module.exports, "useCachedChildren", function () { return $de69a611ef9c0aab$export$727c8fc270210f13; });
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
const $de69a611ef9c0aab$export$f44063955319d654 = (0, $38WsQ$createContext)(null);
function $de69a611ef9c0aab$export$727c8fc270210f13(props) {
    let previousDependencies = [];
    let previousChildrenString;
    let cache = new WeakMap();
    let rows = (0, $38WsQ$createMemo)(()=>{
        let dependencies = props.dependencies || [];
        let childrenString = undefined;
        if (dependencies.length !== previousDependencies.length || dependencies.some((value, i)=>value !== previousDependencies[i]) || childrenString !== previousChildrenString) {
            cache = new WeakMap();
            previousDependencies = dependencies.slice();
            previousChildrenString = childrenString;
        }
        return Array.from(props.items || [], (item)=>{
            let cacheKey = $de69a611ef9c0aab$var$isWeakKey(item) ? item : null;
            let row = cacheKey ? cache.get(cacheKey) : undefined;
            if (!row) {
                row = {
                    item: item
                };
                if (cacheKey) cache.set(cacheKey, row);
            }
            return row;
        });
    });
    // For owns cached row lifetimes. Cache entries contain data rather than mounted
    // JSX so a removed/reinserted row never reuses a disposed native owner.
    let dynamic;
    const createDynamic = ()=>(0, $38WsQ$For)({
            get each () {
                return rows();
            },
            children: (row)=>{
                let value = {
                    get id () {
                        let item = row.item;
                        let id = item?.key ?? item?.id;
                        return props.addIdAndValue && id != null ? props.idScope != null ? `${props.idScope}:${id}` : id : undefined;
                    },
                    get value () {
                        return props.addIdAndValue ? row.item : undefined;
                    }
                };
                return $de69a611ef9c0aab$export$f44063955319d654({
                    value: value,
                    get children () {
                        return props.children(row.item);
                    }
                });
            }
        });
    // Like native For, the renderer resolves this lazy value under its owner.
    return ()=>{
        let children = props.children;
        if (props.items && typeof children === 'function') // For captures its creation owner. Initialize only under the consumer's
        // shallow collection provider, not the caller's outer Collection owner.
        return dynamic ??= createDynamic();
        // Native rendered elements (e.g. For) can be zero-argument accessors,
        // unlike React elements. Forward them lazily; an item callback accepts an
        // item and must remain undefined when no items were supplied.
        if (typeof children !== 'function' || children.length === 0) return children;
        return undefined;
    };
}
function $de69a611ef9c0aab$var$isWeakKey(value) {
    switch(typeof value){
        case 'object':
            return value != null;
        case 'function':
        case 'symbol':
            return true;
        default:
            return false;
    }
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

const $90884b889dc4fa67$export$f9762fab77588ecb = (0, $38WsQ$createContext)(null);

});

parcelRegister("7A3TT", function(module, exports) {

$parcel$export(module.exports, "Hidden", function () { return $584eebc12d596346$export$8dc98ba7eadeaa56; });
$parcel$export(module.exports, "createHideableComponent", function () { return $584eebc12d596346$export$86427a43e3e48ebb; });
$parcel$export(module.exports, "useIsHidden", function () { return $584eebc12d596346$export$b5d7cc18bb8d2b59; });



var $6p9dH = parcelRequire("6p9dH");
var $584eebc12d596346$var$_tmpl$ = /*#__PURE__*/ (0, $38WsQ$template)(`<template>`);
const $584eebc12d596346$export$94b6d0abf7d33e8c = (0, $38WsQ$createContext)(false);
function $584eebc12d596346$export$8dc98ba7eadeaa56(props) {
    let isHidden = (0, $38WsQ$useContext)($584eebc12d596346$export$94b6d0abf7d33e8c);
    if (isHidden) // Don't hide again if we are already hidden.
    return (0, $38WsQ$memo)(()=>props.children);
    // In SSR, portals are not supported by React. Instead, always render into a <template>
    // element, which the browser will never display to the user. In addition, the
    // content is not part of the accessible DOM tree, so it won't affect ids or other accessibility attributes.
    var _el$ = (0, $38WsQ$getNextElement)($584eebc12d596346$var$_tmpl$);
    (0, $38WsQ$insert)(_el$, (0, $38WsQ$createComponent)($584eebc12d596346$export$94b6d0abf7d33e8c, {
        value: true,
        get children () {
            return props.children;
        }
    }));
    return _el$;
}
function $584eebc12d596346$export$86427a43e3e48ebb(fn) {
    let Wrapper = (props)=>{
        let isHidden = (0, $38WsQ$useContext)($584eebc12d596346$export$94b6d0abf7d33e8c);
        if (isHidden) return null;
        // oxlint-disable-next-line react/react-compiler
        let deliveredRef;
        let forwardedRef = (0, $6p9dH.useObjectRef)((node)=>{
            // Preserve synchronous source attachment; A's bridge owns delivery/cleanup.
            deliveredRef = props.ref;
            return (0, $6p9dH.attachRef)(deliveredRef, node);
        });
        (0, $38WsQ$createEffect)(()=>props.ref, (target)=>{
            let node = (0, $38WsQ$untrack)(()=>forwardedRef.current);
            if (node && target !== deliveredRef) {
                forwardedRef(null);
                forwardedRef(node);
            }
        });
        return fn(props, forwardedRef);
    };
    // @ts-ignore - for react dev tools
    Wrapper.displayName = fn.displayName || fn.name;
    return Wrapper;
}
function $584eebc12d596346$export$b5d7cc18bb8d2b59() {
    return (0, $38WsQ$useContext)($584eebc12d596346$export$94b6d0abf7d33e8c);
}

});


parcelRegister("bAtJj", function(module, exports) {

$parcel$export(module.exports, "filterDOMProps", function () { return (parcelRequire("5gAIA")).filterDOMProps; });

var $5gAIA = parcelRequire("5gAIA");

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
    (0, $38WsQ$onSettled)(()=>(0, $6p9dH.attachRef)(typeof ref === 'function' ? ref : undefined, $ae314f6cf80336a8$export$a5795cc979dfae80(domRef)));
    return domRef;
}
function $ae314f6cf80336a8$export$96a734597687c040(ref, focusableRef) {
    let domRef = (0, $6p9dH.useObjectRef)();
    (0, $38WsQ$onSettled)(()=>(0, $6p9dH.attachRef)(typeof ref === 'function' ? ref : undefined, $ae314f6cf80336a8$export$79d69eee6ae4b329(domRef, focusableRef)));
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
    let ctx = (0, $38WsQ$createMemo)(()=>(0, $2A4az.useSlottedContext)(context, props.slot) || {});
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
var $5gAIA = parcelRequire("5gAIA");

var $7boJ2 = parcelRequire("7boJ2");
function $5354581ea9255dfc$export$52210f68a14655d0(props) {
    let domProps = (0, $5gAIA.filterDOMProps)(props, {
        labelable: true
    });
    // if orientation is horizontal, aria-orientation default is horizontal, so we leave it undefined
    // if it's vertical, we need to specify it
    // hr elements implicitly have role = separator and a horizontal orientation
    return {
        separatorProps: (0, $7boJ2.mergeProps)(domProps, {
            get role () {
                return props.elementType !== 'hr' ? 'separator' : undefined;
            },
            get 'aria-orientation' () {
                return props.elementType !== 'hr' && props.orientation === 'vertical' ? 'vertical' : undefined;
            }
        })
    };
}



var $iFg3Z = parcelRequire("iFg3Z");

var $2A4az = parcelRequire("2A4az");

var $9jLe3 = parcelRequire("9jLe3");
parcelRequire("bAtJj");
var $5gAIA = parcelRequire("5gAIA");
parcelRequire("2iotZ");
var $7boJ2 = parcelRequire("7boJ2");

const $7f44ca3fb1b5a9fb$export$6615d83f6de245ce = (0, $38WsQ$createContext)({});
class $7f44ca3fb1b5a9fb$export$7750289ca694c0b5 extends (0, $iFg3Z.CollectionNode) {
    static type = 'separator';
    filter(collection, newCollection) {
        let prevItem = newCollection.getItem(this.prevKey);
        if (prevItem && prevItem.type !== 'separator') {
            let clone = this.clone();
            newCollection.addDescendants(clone, collection);
            return clone;
        }
        return null;
    }
}
const $7f44ca3fb1b5a9fb$export$1ff3c3f08ae963c0 = /*#__PURE__*/ (0, $9jLe3.createLeafComponent)($7f44ca3fb1b5a9fb$export$7750289ca694c0b5, function Separator(props, ref) {
    [props, ref] = (0, $2A4az.useContextProps)(props, ref, $7f44ca3fb1b5a9fb$export$6615d83f6de245ce);
    let ElementType = ()=>{
        let element = props.elementType || 'hr';
        return (0, $2A4az.dom)[element === 'hr' && props.orientation === 'vertical' ? 'div' : element];
    };
    let { separatorProps: separatorProps } = (0, $5354581ea9255dfc$export$52210f68a14655d0)(props);
    let DOMProps = (0, $5gAIA.filterDOMProps)(props, {
        global: true
    });
    let hostProps = (0, $7boJ2.mergeProps)(DOMProps, separatorProps, {
        get render () {
            return props.render;
        },
        get style () {
            return props.style;
        },
        get className () {
            return props.className ?? 'react-aria-Separator';
        },
        // useContextProps composes native refs into a callback accepting either host.
        ref: ref,
        get slot () {
            return props.slot || undefined;
        }
    });
    let Host = (0, $38WsQ$dynamic)(ElementType);
    return (0, $38WsQ$createComponent)(Host, hostProps);
});





var $eXdQ3 = parcelRequire("eXdQ3");

var $1NDEx = parcelRequire("1NDEx");
const $6d42148a3dcb50d9$export$30fbfd376abdf190 = (0, $38WsQ$createContext)(null);
const $6d42148a3dcb50d9$export$e8c9778bf415dd08 = function anonymous(props, overrides) {
    let rules = " ", currentRules = {};
    let alignSelf = false;
    let marginTop = false;
    let marginBottom = false;
    let marginInlineStart = false;
    let marginInlineEnd = false;
    let flexGrow = false;
    let flexShrink = false;
    let width = false;
    let matches = String(overrides || '').matchAll(/(?:^|\s)(J|G|I|H|_u|_v|_s|__A|_d|_J|z|y|B|A|_P|_9|W|_l|_A|_z|_6|Z|N|L|-macro\$)[^\s]+/g);
    for (let p of matches){
        if (p[1] === "_d") alignSelf = true;
        if (p[1] === "J") marginTop = true;
        if (p[1] === "G") marginBottom = true;
        if (p[1] === "I") marginInlineStart = true;
        if (p[1] === "H") marginInlineEnd = true;
        if (p[1] === "_u") flexGrow = true;
        if (p[1] === "_v") flexShrink = true;
        if (p[1] === "Z") width = true;
        rules += p[0];
    }
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
    if (!alignSelf) rules += ' _df18';
    currentRules["alignSelf"] = "stretch";
    if (props.isStaticColor) {
        if (props.size === "L") {
            rules += ' gi18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["isStaticColor && size === \"L\""] = "transparent-overlay-800";
        } else {
            rules += ' gg18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["isStaticColor"] = "transparent-overlay-200";
        }
    } else if (props.size === "L") {
        rules += ' g018';
        currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
            "default": currentRules["backgroundColor"]
        };
        currentRules["backgroundColor"]["size === \"L\""] = "gray-800";
    } else {
        rules += ' gF18';
        currentRules["backgroundColor"] = "gray-200";
    }
    rules += ' glOVIhfcCp4usd18';
    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
        "default": currentRules["backgroundColor"]
    };
    currentRules["backgroundColor"]["forcedColors"] = "ButtonBorder";
    rules += ' glOVIhfcCp4usd18';
    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
        "default": currentRules["backgroundColor"]
    };
    currentRules["backgroundColor"][":is([data-hcm], [data-hcm] *)"] = "ButtonBorder";
    rules += ' _je18';
    currentRules["borderStyle"] = "none";
    rules += ' og18';
    currentRules["borderTopStartRadius"] = "full";
    rules += ' ng18';
    currentRules["borderTopEndRadius"] = "full";
    rules += ' kg18';
    currentRules["borderBottomStartRadius"] = "full";
    rules += ' jg18';
    currentRules["borderBottomEndRadius"] = "full";
    if (!marginTop) rules += ' JYB8I18';
    currentRules["marginTop"] = 0;
    if (!marginBottom) rules += ' GYB8I18';
    currentRules["marginBottom"] = 0;
    if (!marginInlineStart) rules += ' IYB8I18';
    currentRules["marginStart"] = 0;
    if (!marginInlineEnd) rules += ' HYB8I18';
    currentRules["marginEnd"] = 0;
    if (!flexGrow) rules += ' _ua18';
    currentRules["flexGrow"] = 0;
    if (!flexShrink) rules += ' _va18';
    currentRules["flexShrink"] = 0;
    if (props.orientation === "horizontal") {
        if (props.size === "L") {
            rules += ' FT4Nfn18';
            currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
                "default": currentRules["height"]
            };
            currentRules["height"]["orientation === \"horizontal\" && size === \"L\""] = "[4px]";
        } else if (props.size === "S") {
            rules += ' FceNfn18';
            currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
                "default": currentRules["height"]
            };
            currentRules["height"]["orientation === \"horizontal\" && size === \"S\""] = "[1px]";
        } else {
            rules += ' FLvNfn18';
            currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
                "default": currentRules["height"]
            };
            currentRules["height"]["orientation === \"horizontal\""] = "[2px]";
        }
    }
    if (props.orientation === "vertical") {
        if (props.size === "L") {
            if (!width) rules += ' ZT4Nfn18';
            currentRules["width"] = typeof currentRules["width"] === 'object' ? currentRules["width"] : {
                "default": currentRules["width"]
            };
            currentRules["width"]["orientation === \"vertical\" && size === \"L\""] = "[4px]";
        } else if (props.size === "S") {
            if (!width) rules += ' ZceNfn18';
            currentRules["width"] = typeof currentRules["width"] === 'object' ? currentRules["width"] : {
                "default": currentRules["width"]
            };
            currentRules["width"]["orientation === \"vertical\" && size === \"S\""] = "[1px]";
        } else {
            if (!width) rules += ' ZLvNfn18';
            currentRules["width"] = typeof currentRules["width"] === 'object' ? currentRules["width"] : {
                "default": currentRules["width"]
            };
            currentRules["width"]["orientation === \"vertical\""] = "[2px]";
        }
    }
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Divider.native.js:11:23";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Divider.native.js:11:23"
        };
    }
    return rules;
};
function $6d42148a3dcb50d9$export$2e0a83ec2e27ecbb(inputProps) {
    let [props, ref] = (0, $1NDEx.useSpectrumContextProps)(inputProps, (0, $38WsQ$untrack)(()=>inputProps.ref), $6d42148a3dcb50d9$export$30fbfd376abdf190);
    let domRef = (0, $eXdQ3.useDOMRef)(ref);
    return (0, $38WsQ$createComponent)((0, $7f44ca3fb1b5a9fb$export$1ff3c3f08ae963c0), (0, $38WsQ$mergeProps)(props, {
        ref (r$) {
            var _ref$ = domRef;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $38WsQ$applyRef)(_ref$, r$) : domRef = r$;
        },
        get style () {
            return props.UNSAFE_style;
        },
        get className () {
            return (props.UNSAFE_className || '') + $6d42148a3dcb50d9$export$e8c9778bf415dd08({
                size: props.size || 'M',
                orientation: props.orientation || 'horizontal',
                staticColor: props.staticColor,
                isStaticColor: !!props.staticColor
            }, props.styles);
        }
    }));
}




export {$6d42148a3dcb50d9$export$2e0a83ec2e27ecbb as Divider, $6d42148a3dcb50d9$export$30fbfd376abdf190 as DividerContext};
//# sourceMappingURL=Divider.native.js.map
