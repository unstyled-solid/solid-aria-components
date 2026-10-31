import "./ActionButtonGroup.native.css";
import {createComponent as $3RlMb$createComponent, mergeProps as $3RlMb$mergeProps, applyRef as $3RlMb$applyRef, template as $3RlMb$template, isServer as $3RlMb$isServer, getNextElement as $3RlMb$getNextElement, ref as $3RlMb$ref, memo as $3RlMb$memo, dynamic as $3RlMb$dynamic, insert as $3RlMb$insert, effect as $3RlMb$effect, readShallow as $3RlMb$readShallow, className as $3RlMb$className, spread as $3RlMb$spread, scope as $3RlMb$scope, runHydrationEvents as $3RlMb$runHydrationEvents, setAttribute as $3RlMb$setAttribute, getNextMarker as $3RlMb$getNextMarker, style as $3RlMb$style, useHead as $3RlMb$useHead, Portal as $3RlMb$Portal, setStyleProperty as $3RlMb$setStyleProperty} from "@solidjs/web";
import {createContext as $3RlMb$createContext, untrack as $3RlMb$untrack, merge as $3RlMb$merge, omit as $3RlMb$omit, createSignal as $3RlMb$createSignal, createEffect as $3RlMb$createEffect, useContext as $3RlMb$useContext, onSettled as $3RlMb$onSettled, onCleanup as $3RlMb$onCleanup, isHydrating as $3RlMb$isHydrating, createUniqueId as $3RlMb$createUniqueId, action as $3RlMb$action, runWithOwner as $3RlMb$runWithOwner, $PROXY as $3RlMb$$PROXY, createMemo as $3RlMb$createMemo, For as $3RlMb$For, Switch as $3RlMb$Switch, Match as $3RlMb$Match, createRenderEffect as $3RlMb$createRenderEffect, children as $3RlMb$children} from "solid-js";
import $3RlMb$clsx from "clsx";


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
parcelRegister("kaciT", function(module, exports) {

$parcel$export(module.exports, "ActionButtonGroupContext", function () { return $eade49173e37a646$export$33f5f2f2cb85d743; });
$parcel$export(module.exports, "ActionButtonGroup", function () { return $eade49173e37a646$export$73d695ae27330056; });


parcelRequire("hlBgO");
var $9zcdk = parcelRequire("9zcdk");

var $1NDEx = parcelRequire("1NDEx");
const $eade49173e37a646$export$641cbcd1f6f6802f = function anonymous(props, overrides) {
    let rules = " ", currentRules = {};
    rules += (String(overrides || '').match(/(?:^|\s)(J|G|I|H|_u|_v|_s|__A|_d|_J|z|y|B|A|_P|_9|W|_l|_A|_z|_6|Z|N|L|F|M|K|-macro\$)[^\s]+/g) || []).join('');
    rules += ' sd18';
    currentRules["display"] = "flex";
    if (props.orientation === "vertical") {
        rules += ' _ta18';
        currentRules["flexDirection"] = typeof currentRules["flexDirection"] === 'object' ? currentRules["flexDirection"] : {
            "default": currentRules["flexDirection"]
        };
        currentRules["flexDirection"]["orientation === \"vertical\""] = "column";
    } else if (props.orientation === "horizontal") {
        rules += ' _tc18';
        currentRules["flexDirection"] = typeof currentRules["flexDirection"] === 'object' ? currentRules["flexDirection"] : {
            "default": currentRules["flexDirection"]
        };
        currentRules["flexDirection"]["orientation === \"horizontal\""] = "row";
    }
    if (props.density === "regular") {
        if (props.size === "XL") {
            rules += ' UH5kTnc18';
            currentRules["rowGap"] = typeof currentRules["rowGap"] === 'object' ? currentRules["rowGap"] : {
                "default": currentRules["rowGap"]
            };
            currentRules["rowGap"]["density === \"regular\" && size === \"XL\""] = 8;
        } else if (props.size === "L") {
            rules += ' UH5kTnc18';
            currentRules["rowGap"] = typeof currentRules["rowGap"] === 'object' ? currentRules["rowGap"] : {
                "default": currentRules["rowGap"]
            };
            currentRules["rowGap"]["density === \"regular\" && size === \"L\""] = 8;
        } else if (props.size === "M") {
            rules += ' UH5kTnc18';
            currentRules["rowGap"] = typeof currentRules["rowGap"] === 'object' ? currentRules["rowGap"] : {
                "default": currentRules["rowGap"]
            };
            currentRules["rowGap"]["density === \"regular\" && size === \"M\""] = 8;
        } else if (props.size === "S") {
            rules += ' UR3ltQc18';
            currentRules["rowGap"] = typeof currentRules["rowGap"] === 'object' ? currentRules["rowGap"] : {
                "default": currentRules["rowGap"]
            };
            currentRules["rowGap"]["density === \"regular\" && size === \"S\""] = 4;
        } else if (props.size === "XS") {
            rules += ' UR3ltQc18';
            currentRules["rowGap"] = typeof currentRules["rowGap"] === 'object' ? currentRules["rowGap"] : {
                "default": currentRules["rowGap"]
            };
            currentRules["rowGap"]["density === \"regular\" && size === \"XS\""] = 4;
        }
    } else if (props.density === "compact") {
        rules += ' Uahikk18';
        currentRules["rowGap"] = typeof currentRules["rowGap"] === 'object' ? currentRules["rowGap"] : {
            "default": currentRules["rowGap"]
        };
        currentRules["rowGap"]["density === \"compact\""] = 2;
    }
    if (props.density === "regular") {
        if (props.size === "XL") {
            rules += ' qH5kTnc18';
            currentRules["columnGap"] = typeof currentRules["columnGap"] === 'object' ? currentRules["columnGap"] : {
                "default": currentRules["columnGap"]
            };
            currentRules["columnGap"]["density === \"regular\" && size === \"XL\""] = 8;
        } else if (props.size === "L") {
            rules += ' qH5kTnc18';
            currentRules["columnGap"] = typeof currentRules["columnGap"] === 'object' ? currentRules["columnGap"] : {
                "default": currentRules["columnGap"]
            };
            currentRules["columnGap"]["density === \"regular\" && size === \"L\""] = 8;
        } else if (props.size === "M") {
            rules += ' qH5kTnc18';
            currentRules["columnGap"] = typeof currentRules["columnGap"] === 'object' ? currentRules["columnGap"] : {
                "default": currentRules["columnGap"]
            };
            currentRules["columnGap"]["density === \"regular\" && size === \"M\""] = 8;
        } else if (props.size === "S") {
            rules += ' qR3ltQc18';
            currentRules["columnGap"] = typeof currentRules["columnGap"] === 'object' ? currentRules["columnGap"] : {
                "default": currentRules["columnGap"]
            };
            currentRules["columnGap"]["density === \"regular\" && size === \"S\""] = 4;
        } else if (props.size === "XS") {
            rules += ' qR3ltQc18';
            currentRules["columnGap"] = typeof currentRules["columnGap"] === 'object' ? currentRules["columnGap"] : {
                "default": currentRules["columnGap"]
            };
            currentRules["columnGap"]["density === \"regular\" && size === \"XS\""] = 4;
        }
    } else if (props.density === "compact") {
        rules += ' qahikk18';
        currentRules["columnGap"] = typeof currentRules["columnGap"] === 'object' ? currentRules["columnGap"] : {
            "default": currentRules["columnGap"]
        };
        currentRules["columnGap"]["density === \"compact\""] = 2;
    }
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ActionButtonGroup.native.js:8:32";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ActionButtonGroup.native.js:8:32"
        };
    }
    return rules;
};
const $eade49173e37a646$export$33f5f2f2cb85d743 = (0, $3RlMb$createContext)(null);
function $eade49173e37a646$export$73d695ae27330056(inputProps) {
    let [props, ref] = (0, $1NDEx.useSpectrumContextProps)(inputProps, (0, $3RlMb$untrack)(()=>inputProps.ref), $eade49173e37a646$export$33f5f2f2cb85d743);
    let density = ()=>props.density ?? 'regular';
    let size = ()=>props.size ?? 'M';
    let orientation = ()=>props.orientation ?? 'horizontal';
    // Make sure we get all the same defaults as the ActionButtonGroup
    let context = {
        get size () {
            return size();
        },
        get density () {
            return density();
        },
        get orientation () {
            return orientation();
        },
        get isJustified () {
            return props.isJustified;
        },
        get isQuiet () {
            return props.isQuiet;
        },
        get staticColor () {
            return props.staticColor;
        },
        get isDisabled () {
            return props.isDisabled;
        }
    };
    return (0, $3RlMb$createComponent)((0, $9zcdk.Toolbar), (0, $3RlMb$mergeProps)(props, {
        ref: (value)=>{
            ref.current = value;
        },
        get style () {
            return props.UNSAFE_style;
        },
        get className () {
            return (props.UNSAFE_className || '') + $eade49173e37a646$export$641cbcd1f6f6802f({
                size: size(),
                density: density(),
                orientation: orientation(),
                isJustified: props.isJustified
            }, props.styles);
        },
        get children () {
            return (0, $3RlMb$createComponent)($eade49173e37a646$export$33f5f2f2cb85d743, {
                value: context,
                get children () {
                    return props.children;
                }
            });
        }
    }));
}

});
parcelRegister("hlBgO", function(module, exports) {

$parcel$export(module.exports, "Toolbar", function () { return (parcelRequire("9zcdk")).Toolbar; });
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
var $9zcdk = parcelRequire("9zcdk");

});
parcelRegister("9zcdk", function(module, exports) {

$parcel$export(module.exports, "Toolbar", function () { return $6f70db640efdd639$export$4c260019440d418f; });


var $6MKdm = parcelRequire("6MKdm");

var $2A4az = parcelRequire("2A4az");
parcelRequire("bAtJj");
var $5gAIA = parcelRequire("5gAIA");
parcelRequire("2iotZ");
var $7boJ2 = parcelRequire("7boJ2");


var $6p9dH = parcelRequire("6p9dH");
const $6f70db640efdd639$export$6311e7ab80ef752f = (0, $3RlMb$createContext)({});
function $6f70db640efdd639$export$4c260019440d418f(originalProps) {
    let [props, mergedRef] = (0, $2A4az.useContextProps)(originalProps, originalProps.ref, $6f70db640efdd639$export$6311e7ab80ef752f);
    let ref = (0, $6p9dH.useObjectRef)(mergedRef);
    let { toolbarProps: toolbarProps } = (0, $6MKdm.useToolbar)(props, ref);
    let renderProps = (0, $2A4az.useRenderProps)((0, $3RlMb$merge)(props, {
        values: {
            get orientation () {
                return props.orientation || 'horizontal';
            }
        },
        defaultClassName: 'react-aria-Toolbar'
    }));
    let DOMProps = (0, $3RlMb$omit)((0, $5gAIA.filterDOMProps)(props, {
        global: true
    }), 'id');
    return (0, $3RlMb$createComponent)((0, $2A4az.dom).div, (0, $3RlMb$mergeProps)(()=>(0, $7boJ2.mergeProps)(DOMProps, renderProps, toolbarProps), {
        ref (r$) {
            var _ref$ = ref;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $3RlMb$applyRef)(_ref$, r$) : ref = r$;
        },
        get slot () {
            return props.slot || undefined;
        },
        get "data-orientation" () {
            return props.orientation || 'horizontal';
        },
        get children () {
            return renderProps.children;
        }
    }));
}

});
parcelRegister("6MKdm", function(module, exports) {

$parcel$export(module.exports, "useToolbar", function () { return $4f0b12ff0b666eb7$export$fa142eb1681c520; });
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
 */ 
var $eoq2Z = parcelRequire("eoq2Z");

var $5gAIA = parcelRequire("5gAIA");


var $ed1Px = parcelRequire("ed1Px");

var $dnlDG = parcelRequire("dnlDG");
function $4f0b12ff0b666eb7$export$fa142eb1681c520(props, ref) {
    let orientation = ()=>props.orientation ?? 'horizontal';
    let [isInToolbar, setInToolbar] = (0, $3RlMb$createSignal)(false);
    // should be safe because re-calling set state with the same value it already has is a no-op
    // this will allow us to react should a parent re-render and change its role though
    // eslint-disable-next-line react-hooks/exhaustive-deps
    (0, $3RlMb$createEffect)(()=>ref.current, (element)=>{
        let update = ()=>setInToolbar(!!element?.parentElement?.closest('[role="toolbar"]'));
        update();
        if (!element) return;
        // Native components do not rerun when an ancestor's role changes. Observe
        // exactly those role attributes the source's repeated layout read depends on.
        let observer = new MutationObserver(update);
        for(let ancestor = element.parentElement; ancestor; ancestor = ancestor.parentElement)observer.observe(ancestor, {
            attributes: true,
            attributeFilter: [
                'role'
            ]
        });
        return ()=>observer.disconnect();
    });
    const locale = (0, $dnlDG.useLocale)();
    const shouldReverse = ()=>locale.direction === 'rtl' && orientation() === 'horizontal';
    // oxlint-disable-next-line react/react-compiler
    let focusManager = (0, $eoq2Z.createFocusManager)(ref);
    const onKeyDown = (e)=>{
        // don't handle portalled events
        if (!(0, $ed1Px.nodeContains)(e.currentTarget, (0, $ed1Px.getEventTarget)(e))) return;
        if (orientation() === 'horizontal' && e.key === 'ArrowRight' || orientation() === 'vertical' && e.key === 'ArrowDown') {
            if (shouldReverse()) focusManager.focusPrevious();
            else focusManager.focusNext();
        } else if (orientation() === 'horizontal' && e.key === 'ArrowLeft' || orientation() === 'vertical' && e.key === 'ArrowUp') {
            if (shouldReverse()) focusManager.focusNext();
            else focusManager.focusPrevious();
        } else if (e.key === 'Tab') {
            // When the tab key is pressed, we want to move focus
            // out of the entire toolbar. To do this, move focus
            // to the first or last focusable child, and let the
            // browser handle the Tab key as usual from there.
            lastFocused.current = (0, $ed1Px.getActiveElement)();
            if (e.shiftKey) focusManager.focusFirst();
            else focusManager.focusLast();
            return;
        } else // if we didn't handle anything, return early so we don't preventDefault
        return;
        // Prevent arrow keys from being handled by nested action groups.
        e.stopPropagation();
        e.preventDefault();
    };
    // Record the last focused child when focus moves out of the toolbar.
    const lastFocused = {
        current: null
    };
    const onBlur = (e)=>{
        if (!(0, $ed1Px.nodeContains)(e.currentTarget, e.relatedTarget) && !lastFocused.current) lastFocused.current = (0, $ed1Px.getEventTarget)(e);
    };
    // Restore focus to the last focused child when focus returns into the toolbar.
    // If the element was removed, do nothing, either the first item in the first group,
    // or the last item in the last group will be focused, depending on direction.
    const onFocus = (e)=>{
        if (lastFocused.current && !(0, $ed1Px.nodeContains)(e.currentTarget, e.relatedTarget) && (0, $ed1Px.nodeContains)(ref.current, (0, $ed1Px.getEventTarget)(e))) {
            lastFocused.current?.focus();
            lastFocused.current = null;
        }
    };
    return {
        // Source object spread overrides even with undefined. Unlike interaction
        // merging, an explicit label must remove the earlier aria-labelledby.
        toolbarProps: (0, $3RlMb$merge)((0, $5gAIA.filterDOMProps)(props, {
            labelable: true
        }), {
            get role () {
                return !isInToolbar() ? 'toolbar' : 'group';
            },
            get 'aria-orientation' () {
                return orientation();
            },
            get 'aria-label' () {
                return props['aria-label'];
            },
            get 'aria-labelledby' () {
                return props['aria-label'] == null ? props['aria-labelledby'] : undefined;
            },
            get onKeyDownCapture () {
                return !isInToolbar() ? onKeyDown : undefined;
            },
            get onFocusCapture () {
                return !isInToolbar() ? onFocus : undefined;
            },
            get onBlurCapture () {
                return !isInToolbar() ? onBlur : undefined;
            }
        })
    };
}

});
parcelRegister("eoq2Z", function(module, exports) {

$parcel$export(module.exports, "FocusScope", function () { return $a7a7830a5e3accdc$export$20e40289641fbbb6; });
$parcel$export(module.exports, "createFocusManager", function () { return $a7a7830a5e3accdc$export$c5251b9e124bf29; });


var $6MMIu = parcelRequire("6MMIu");

var $8XaA3 = parcelRequire("8XaA3");

var $ed1Px = parcelRequire("ed1Px");

var $es0xi = parcelRequire("es0xi");

var $gi7Zf = parcelRequire("gi7Zf");

var $1FDXt = parcelRequire("1FDXt");

var $6MYlq = parcelRequire("6MYlq");


var $6p9dH = parcelRequire("6p9dH");
var $a7a7830a5e3accdc$var$_tmpl$ = /*#__PURE__*/ (0, $3RlMb$template)(`<span data-focus-scope-start hidden>`), $a7a7830a5e3accdc$var$_tmpl$2 = /*#__PURE__*/ (0, $3RlMb$template)(`<span data-focus-scope-end hidden>`);
function $a7a7830a5e3accdc$var$readScope(ref) {
    return ref.read ? ref.read() : ref.current;
}
const $a7a7830a5e3accdc$var$FocusContext = (0, $3RlMb$createContext)(null);
const $a7a7830a5e3accdc$var$RESTORE_FOCUS_EVENT = 'react-aria-focus-scope-restore';
let $a7a7830a5e3accdc$var$activeScope = null;
function $a7a7830a5e3accdc$export$20e40289641fbbb6(props) {
    let startRef = (0, $6p9dH.useObjectRef)();
    let endRef = (0, $6p9dH.useObjectRef)();
    let [scopeNodes, setScopeNodes] = (0, $3RlMb$createSignal)(null);
    let lastScopeNodes = null;
    let scopeRef = {
        get current () {
            // Native child updates do not rerun FocusScope setup. A focus event may
            // arrive in the same turn, before MutationObserver publishes the range.
            // Sample the actual sentinel range for imperative traversal/restoration,
            // retaining the last range once the sentinels are detached on disposal.
            let [start, end] = (0, $3RlMb$untrack)(()=>[
                    startRef.current,
                    endRef.current
                ]);
            if (start?.parentNode && start.parentNode === end?.parentNode) {
                let nodes1 = [];
                let node = start.nextSibling;
                while(node && node !== end){
                    if (node.nodeType === 1) nodes1.push(node);
                    node = node.nextSibling;
                }
                lastScopeNodes = nodes1;
            }
            return lastScopeNodes;
        },
        set current (nodes){
            lastScopeNodes = nodes;
        },
        read: scopeNodes
    };
    let { parentNode: parentNode } = (0, $3RlMb$useContext)($a7a7830a5e3accdc$var$FocusContext) || {};
    // Create a tree node here so we can add children to it even before it is added to the tree.
    let node = new $a7a7830a5e3accdc$var$TreeNode({
        scopeRef: scopeRef
    });
    (0, $3RlMb$onSettled)(()=>{
        // If a new scope mounts outside the active scope, (e.g. DialogContainer launched from a menu),
        // use the active scope as the parent instead of the parent from context. Layout effects run bottom
        // up, so if the parent is not yet added to the tree, don't do this. Only the outer-most FocusScope
        // that is being added should get the activeScope as its parent.
        let parent = parentNode || $a7a7830a5e3accdc$export$d06fae2ee68b101e.root;
        if ($a7a7830a5e3accdc$export$d06fae2ee68b101e.getTreeNode(parent.scopeRef) && $a7a7830a5e3accdc$var$activeScope && !$a7a7830a5e3accdc$var$isAncestorScope($a7a7830a5e3accdc$var$activeScope, parent.scopeRef)) {
            let activeNode = $a7a7830a5e3accdc$export$d06fae2ee68b101e.getTreeNode($a7a7830a5e3accdc$var$activeScope);
            if (activeNode) parent = activeNode;
        }
        // Add the node to the parent, and to the tree.
        parent.addChild(node);
        $a7a7830a5e3accdc$export$d06fae2ee68b101e.addNode(node);
    });
    (0, $3RlMb$createEffect)(()=>({
            scope: $a7a7830a5e3accdc$var$readScope(scopeRef),
            contain: props.contain
        }), ({ contain: contain })=>{
        let node = $a7a7830a5e3accdc$export$d06fae2ee68b101e.getTreeNode(scopeRef);
        if (node) node.contain = !!contain;
    });
    (0, $3RlMb$onSettled)(()=>{
        // Find all rendered nodes between the sentinels and add them to the scope.
        let nodes1 = [];
        let stopPropagation = (e)=>e.stopPropagation();
        let update = ()=>{
            let next = [];
            let node = startRef.current?.nextSibling;
            while(node && node !== endRef.current){
                if (node.nodeType === 1) next.push(node);
                node = node.nextSibling;
            }
            if (scopeRef.current && next.length === nodes1.length && next.every((node, i)=>node === nodes1[i])) return;
            for (let node of nodes1)node.removeEventListener($a7a7830a5e3accdc$var$RESTORE_FOCUS_EVENT, stopPropagation);
            nodes1 = next;
            for (let node of nodes1)// Stop custom restore focus event from propagating to parent focus scopes.
            node.addEventListener($a7a7830a5e3accdc$var$RESTORE_FOCUS_EVENT, stopPropagation);
            scopeRef.current = nodes1;
            setScopeNodes(nodes1);
        };
        update();
        // Solid updates children without rerunning component setup. Observe the
        // sentinel range so the same source scope tracks replacement root nodes.
        let observer = new ((0, $gi7Zf.getOwnerWindow)(startRef.current)).MutationObserver(update);
        observer.observe(startRef.current.parentNode, {
            childList: true
        });
        return ()=>{
            observer.disconnect();
            for (let node of nodes1)node.removeEventListener($a7a7830a5e3accdc$var$RESTORE_FOCUS_EVENT, stopPropagation);
        };
    });
    $a7a7830a5e3accdc$var$useActiveScopeTracker(scopeRef, ()=>props.restoreFocus, ()=>props.contain);
    $a7a7830a5e3accdc$var$useFocusContainment(scopeRef, ()=>props.contain);
    $a7a7830a5e3accdc$var$useRestoreFocus(scopeRef, ()=>props.restoreFocus, ()=>props.contain);
    $a7a7830a5e3accdc$var$useAutoFocus(scopeRef, (0, $3RlMb$untrack)(()=>props.autoFocus));
    // This needs to be an effect so that activeScope is updated after the FocusScope tree is complete.
    // It cannot be a useLayoutEffect because the parent of this node hasn't been attached in the tree yet.
    (0, $3RlMb$createEffect)(()=>$a7a7830a5e3accdc$var$readScope(scopeRef), ()=>{
        const activeElement = (0, $ed1Px.getActiveElement)((0, $gi7Zf.getOwnerDocument)(scopeRef.current ? scopeRef.current[0] : undefined));
        let scope = null;
        if ($a7a7830a5e3accdc$var$isElementInScope(activeElement, scopeRef.current)) {
            // We need to traverse the focusScope tree and find the bottom most scope that
            // contains the active element and set that as the activeScope.
            for (let node of $a7a7830a5e3accdc$export$d06fae2ee68b101e.traverse())if (node.scopeRef && $a7a7830a5e3accdc$var$isElementInScope(activeElement, node.scopeRef.current)) scope = node;
            if (scope === $a7a7830a5e3accdc$export$d06fae2ee68b101e.getTreeNode(scopeRef)) $a7a7830a5e3accdc$var$activeScope = scope.scopeRef;
        }
    });
    // This layout effect cleanup is so that the tree node is removed synchronously with react before the RAF
    // in useRestoreFocus cleanup runs.
    (0, $3RlMb$onCleanup)(()=>{
        // React's layout-effect cleanup is client-only. Native server owners also
        // dispose, but onSettled never published this scope into the browser tree.
        if (0, $3RlMb$isServer) return;
        // Scope may have been re-parented.
        let parentScope = $a7a7830a5e3accdc$export$d06fae2ee68b101e.getTreeNode(scopeRef)?.parent?.scopeRef ?? null;
        if ((scopeRef === $a7a7830a5e3accdc$var$activeScope || $a7a7830a5e3accdc$var$isAncestorScope(scopeRef, $a7a7830a5e3accdc$var$activeScope)) && (!parentScope || $a7a7830a5e3accdc$export$d06fae2ee68b101e.getTreeNode(parentScope))) $a7a7830a5e3accdc$var$activeScope = parentScope;
        $a7a7830a5e3accdc$export$d06fae2ee68b101e.removeTreeNode(scopeRef);
        // A portaled descendant can survive the removal of its logical ancestor
        // (e.g. a menu launching a sibling DialogContainer). Native transition
        // cleanup runs after the dialog's mount effect, so reconcile against the
        // completed surviving tree rather than leaving its active scope at the
        // removed ancestor's parent. This is the same deepest-scope traversal
        // used by the post-mount tracker above; body focus keeps the source
        // parent fallback for restoration.
        let activeElement = (0, $ed1Px.getActiveElement)((0, $gi7Zf.getOwnerDocument)(lastScopeNodes?.[0]));
        for (let node of $a7a7830a5e3accdc$export$d06fae2ee68b101e.traverse())if (node.scopeRef && $a7a7830a5e3accdc$var$isElementInScope(activeElement, node.scopeRef.current)) $a7a7830a5e3accdc$var$activeScope = node.scopeRef;
    });
    // oxlint-disable-next-line react/react-compiler
    let focusManager = $a7a7830a5e3accdc$var$createFocusManagerForScope(scopeRef);
    let value = {
        focusManager: focusManager,
        parentNode: node
    };
    return (0, $3RlMb$createComponent)($a7a7830a5e3accdc$var$FocusContext, {
        value: value,
        get children () {
            return [
                (()=>{
                    var _el$ = (0, $3RlMb$getNextElement)($a7a7830a5e3accdc$var$_tmpl$);
                    var _ref$ = startRef;
                    typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $3RlMb$ref)(()=>_ref$, _el$) : startRef = _el$;
                    return _el$;
                })(),
                (0, $3RlMb$memo)(()=>props.children),
                (()=>{
                    var _el$2 = (0, $3RlMb$getNextElement)($a7a7830a5e3accdc$var$_tmpl$2);
                    var _ref$2 = endRef;
                    typeof _ref$2 === "function" || Array.isArray(_ref$2) ? (0, $3RlMb$ref)(()=>_ref$2, _el$2) : endRef = _el$2;
                    return _el$2;
                })()
            ];
        }
    });
}
function $a7a7830a5e3accdc$export$10c5169755ce7bd7() {
    return (0, $3RlMb$useContext)($a7a7830a5e3accdc$var$FocusContext)?.focusManager;
}
function $a7a7830a5e3accdc$var$createFocusManagerForScope(scopeRef) {
    return {
        focusNext (opts = {}) {
            let scope = scopeRef.current;
            let { from: from, tabbable: tabbable, wrap: wrap, accept: accept } = opts;
            let node = from || (0, $ed1Px.getActiveElement)((0, $gi7Zf.getOwnerDocument)(scope[0] ?? undefined));
            let sentinel = scope[0].previousElementSibling;
            let scopeRoot = $a7a7830a5e3accdc$var$getScopeRoot(scope);
            let walker = $a7a7830a5e3accdc$export$2d6ec8fc375ceafa(scopeRoot, {
                tabbable: tabbable,
                accept: accept
            }, scope);
            walker.currentNode = $a7a7830a5e3accdc$var$isElementInScope(node, scope) ? node : sentinel;
            let nextNode = walker.nextNode();
            if (!nextNode && wrap) {
                walker.currentNode = sentinel;
                nextNode = walker.nextNode();
            }
            if (nextNode) $a7a7830a5e3accdc$var$focusElement(nextNode, true);
            return nextNode;
        },
        focusPrevious (opts = {}) {
            let scope = scopeRef.current;
            let { from: from, tabbable: tabbable, wrap: wrap, accept: accept } = opts;
            let node = from || (0, $ed1Px.getActiveElement)((0, $gi7Zf.getOwnerDocument)(scope[0] ?? undefined));
            let sentinel = scope[scope.length - 1].nextElementSibling;
            let scopeRoot = $a7a7830a5e3accdc$var$getScopeRoot(scope);
            let walker = $a7a7830a5e3accdc$export$2d6ec8fc375ceafa(scopeRoot, {
                tabbable: tabbable,
                accept: accept
            }, scope);
            walker.currentNode = $a7a7830a5e3accdc$var$isElementInScope(node, scope) ? node : sentinel;
            let previousNode = walker.previousNode();
            if (!previousNode && wrap) {
                walker.currentNode = sentinel;
                previousNode = walker.previousNode();
            }
            if (previousNode) $a7a7830a5e3accdc$var$focusElement(previousNode, true);
            return previousNode;
        },
        focusFirst (opts = {}) {
            let scope = scopeRef.current;
            let { tabbable: tabbable, accept: accept } = opts;
            let scopeRoot = $a7a7830a5e3accdc$var$getScopeRoot(scope);
            let walker = $a7a7830a5e3accdc$export$2d6ec8fc375ceafa(scopeRoot, {
                tabbable: tabbable,
                accept: accept
            }, scope);
            walker.currentNode = scope[0].previousElementSibling;
            let nextNode = walker.nextNode();
            if (nextNode) $a7a7830a5e3accdc$var$focusElement(nextNode, true);
            return nextNode;
        },
        focusLast (opts = {}) {
            let scope = scopeRef.current;
            let { tabbable: tabbable, accept: accept } = opts;
            let scopeRoot = $a7a7830a5e3accdc$var$getScopeRoot(scope);
            let walker = $a7a7830a5e3accdc$export$2d6ec8fc375ceafa(scopeRoot, {
                tabbable: tabbable,
                accept: accept
            }, scope);
            walker.currentNode = scope[scope.length - 1].nextElementSibling;
            let previousNode = walker.previousNode();
            if (previousNode) $a7a7830a5e3accdc$var$focusElement(previousNode, true);
            return previousNode;
        }
    };
}
function $a7a7830a5e3accdc$var$getScopeRoot(scope) {
    return scope[0].parentElement;
}
function $a7a7830a5e3accdc$var$shouldContainFocus(scopeRef) {
    let scope = $a7a7830a5e3accdc$export$d06fae2ee68b101e.getTreeNode($a7a7830a5e3accdc$var$activeScope);
    while(scope && scope.scopeRef !== scopeRef){
        if (scope.contain) return false;
        scope = scope.parent;
    }
    return true;
}
function $a7a7830a5e3accdc$var$getRadiosInGroup(element) {
    if (!element.form) // Radio buttons outside a form - query the document
    return Array.from((0, $gi7Zf.getOwnerDocument)(element).querySelectorAll(`input[type="radio"][name="${CSS.escape(element.name)}"]`)).filter((radio)=>!radio.form);
    // namedItem returns RadioNodeList (iterable) for 2+ elements, but a single Element for exactly 1.
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormControlsCollection/namedItem
    const radioList = element.form.elements.namedItem(element.name);
    let ownerWindow = (0, $gi7Zf.getOwnerWindow)(element);
    if (radioList instanceof ownerWindow.RadioNodeList) return Array.from(radioList).filter((el)=>el instanceof ownerWindow.HTMLInputElement);
    if (radioList instanceof ownerWindow.HTMLInputElement) return [
        radioList
    ];
    return [];
}
function $a7a7830a5e3accdc$var$isTabbableRadio(element) {
    if (element.checked) return true;
    const radios = $a7a7830a5e3accdc$var$getRadiosInGroup(element);
    return radios.length > 0 && !radios.some((radio)=>radio.checked);
}
function $a7a7830a5e3accdc$var$useFocusContainment(scopeRef, contains) {
    let focusedNode = {
        current: undefined
    };
    let raf = {
        current: undefined
    };
    (0, $3RlMb$createEffect)(()=>({
            scope: $a7a7830a5e3accdc$var$readScope(scopeRef),
            contain: contains()
        }), ({ scope: scope, contain: contain })=>{
        if (!contain) {
            // if contain was changed, then we should cancel any ongoing waits to pull focus back into containment
            if (raf.current) {
                cancelAnimationFrame(raf.current);
                raf.current = undefined;
            }
            return;
        }
        const ownerDocument = (0, $gi7Zf.getOwnerDocument)(scope ? scope[0] : undefined);
        // Handle the Tab key to contain focus within the scope
        let onKeyDown = (e)=>{
            if (e.key !== 'Tab' || e.altKey || e.ctrlKey || e.metaKey || !$a7a7830a5e3accdc$var$shouldContainFocus(scopeRef) || e.isComposing) return;
            let focusedElement = (0, $ed1Px.getActiveElement)(ownerDocument);
            let scope = scopeRef.current;
            if (!scope || !$a7a7830a5e3accdc$var$isElementInScope(focusedElement, scope)) return;
            let scopeRoot = $a7a7830a5e3accdc$var$getScopeRoot(scope);
            let walker = $a7a7830a5e3accdc$export$2d6ec8fc375ceafa(scopeRoot, {
                tabbable: true
            }, scope);
            if (!focusedElement) return;
            walker.currentNode = focusedElement;
            let nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode();
            if (!nextElement) {
                walker.currentNode = e.shiftKey ? scope[scope.length - 1].nextElementSibling : scope[0].previousElementSibling;
                nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode();
            }
            e.preventDefault();
            if (nextElement) {
                $a7a7830a5e3accdc$var$focusElement(nextElement, true);
                if (nextElement instanceof (0, $gi7Zf.getOwnerWindow)(nextElement).HTMLInputElement) nextElement.select();
            }
        };
        let onFocus = (e)=>{
            // If focusing an element in a child scope of the currently active scope, the child becomes active.
            // Moving out of the active scope to an ancestor is not allowed.
            if ((!$a7a7830a5e3accdc$var$activeScope || $a7a7830a5e3accdc$var$isAncestorScope($a7a7830a5e3accdc$var$activeScope, scopeRef)) && $a7a7830a5e3accdc$var$isElementInScope((0, $ed1Px.getEventTarget)(e), scopeRef.current)) {
                $a7a7830a5e3accdc$var$activeScope = scopeRef;
                focusedNode.current = (0, $ed1Px.getEventTarget)(e);
            } else if ($a7a7830a5e3accdc$var$shouldContainFocus(scopeRef) && !$a7a7830a5e3accdc$var$isElementInChildScope((0, $ed1Px.getEventTarget)(e), scopeRef)) {
                // If a focus event occurs outside the active scope (e.g. user tabs from browser location bar),
                // restore focus to the previously focused node or the first tabbable element in the active scope.
                if (focusedNode.current) $a7a7830a5e3accdc$var$focusElement(focusedNode.current);
                else if ($a7a7830a5e3accdc$var$activeScope && $a7a7830a5e3accdc$var$activeScope.current) $a7a7830a5e3accdc$var$focusFirstInScope($a7a7830a5e3accdc$var$activeScope.current);
            } else if ($a7a7830a5e3accdc$var$shouldContainFocus(scopeRef)) focusedNode.current = (0, $ed1Px.getEventTarget)(e);
        };
        let onBlur = (e)=>{
            // Firefox doesn't shift focus back to the Dialog properly without this
            if (raf.current) cancelAnimationFrame(raf.current);
            raf.current = requestAnimationFrame(()=>{
                // Patches infinite focus coersion loop for Android Talkback where the user isn't able to move the virtual cursor
                // if within a containing focus scope. Bug filed against Chrome: https://issuetracker.google.com/issues/384844019.
                // Note that this means focus can leave focus containing modals due to this, but it is isolated to Chrome Talkback.
                let modality = (0, $es0xi.getInteractionModality)();
                let shouldSkipFocusRestore = (modality === 'virtual' || modality === null) && (0, $1FDXt.isAndroid)() && (0, $1FDXt.isChrome)();
                // Use document.activeElement instead of e.relatedTarget so we can tell if user clicked into iframe
                let activeElement = (0, $ed1Px.getActiveElement)(ownerDocument);
                if (!shouldSkipFocusRestore && activeElement && $a7a7830a5e3accdc$var$shouldContainFocus(scopeRef) && !$a7a7830a5e3accdc$var$isElementInChildScope(activeElement, scopeRef)) {
                    $a7a7830a5e3accdc$var$activeScope = scopeRef;
                    let target = (0, $ed1Px.getEventTarget)(e);
                    if (target && target.isConnected) {
                        focusedNode.current = target;
                        $a7a7830a5e3accdc$var$focusElement(focusedNode.current);
                    } else if ($a7a7830a5e3accdc$var$activeScope.current) $a7a7830a5e3accdc$var$focusFirstInScope($a7a7830a5e3accdc$var$activeScope.current);
                }
            });
        };
        ownerDocument.addEventListener('keydown', onKeyDown, false);
        ownerDocument.addEventListener('focusin', onFocus, false);
        scope?.forEach((element)=>element.addEventListener('focusin', onFocus, false));
        scope?.forEach((element)=>element.addEventListener('focusout', onBlur, false));
        return ()=>{
            ownerDocument.removeEventListener('keydown', onKeyDown, false);
            ownerDocument.removeEventListener('focusin', onFocus, false);
            scope?.forEach((element)=>element.removeEventListener('focusin', onFocus, false));
            scope?.forEach((element)=>element.removeEventListener('focusout', onBlur, false));
        };
    });
    // This is a useLayoutEffect so it is guaranteed to run before our async synthetic blur
    (0, $3RlMb$onCleanup)(()=>{
        if (raf.current) cancelAnimationFrame(raf.current);
    });
}
function $a7a7830a5e3accdc$var$isElementInAnyScope(element) {
    return $a7a7830a5e3accdc$var$isElementInChildScope(element);
}
function $a7a7830a5e3accdc$var$isElementInScope(element, scope) {
    if (!element) return false;
    if (!scope) return false;
    return scope.some((node)=>(0, $ed1Px.nodeContains)(node, element));
}
function $a7a7830a5e3accdc$var$isElementInChildScope(element, scope = null) {
    // If the element is within a top layer element (e.g. toasts), always allow moving focus there.
    if (element instanceof Element && element.closest('[data-react-aria-top-layer]')) return true;
    // node.contains in isElementInScope covers child scopes that are also DOM children,
    // but does not cover child scopes in portals.
    for (let { scopeRef: s } of $a7a7830a5e3accdc$export$d06fae2ee68b101e.traverse($a7a7830a5e3accdc$export$d06fae2ee68b101e.getTreeNode(scope))){
        if (s && $a7a7830a5e3accdc$var$isElementInScope(element, s.current)) return true;
    }
    return false;
}
function $a7a7830a5e3accdc$export$1258395f99bf9cbf(element) {
    return $a7a7830a5e3accdc$var$isElementInChildScope(element, $a7a7830a5e3accdc$var$activeScope);
}
function $a7a7830a5e3accdc$var$isAncestorScope(ancestor, scope) {
    let parent = $a7a7830a5e3accdc$export$d06fae2ee68b101e.getTreeNode(scope)?.parent;
    while(parent){
        if (parent.scopeRef === ancestor) return true;
        parent = parent.parent;
    }
    return false;
}
function $a7a7830a5e3accdc$var$focusElement(element, scroll = false) {
    if (element != null && !scroll) try {
        (0, $8XaA3.focusSafely)(element);
    } catch  {
    // ignore
    }
    else if (element != null) try {
        element.focus();
    } catch  {
    // ignore
    }
}
function $a7a7830a5e3accdc$var$getFirstInScope(scope, tabbable = true) {
    let sentinel = scope[0].previousElementSibling;
    let scopeRoot = $a7a7830a5e3accdc$var$getScopeRoot(scope);
    let walker = $a7a7830a5e3accdc$export$2d6ec8fc375ceafa(scopeRoot, {
        tabbable: tabbable
    }, scope);
    walker.currentNode = sentinel;
    let nextNode = walker.nextNode();
    // If the scope does not contain a tabbable element, use the first focusable element.
    if (tabbable && !nextNode) {
        scopeRoot = $a7a7830a5e3accdc$var$getScopeRoot(scope);
        walker = $a7a7830a5e3accdc$export$2d6ec8fc375ceafa(scopeRoot, {
            tabbable: false
        }, scope);
        walker.currentNode = sentinel;
        nextNode = walker.nextNode();
    }
    // TreeWalker.nextNode() returns null when the scope contains no focusable element.
    return nextNode;
}
function $a7a7830a5e3accdc$var$focusFirstInScope(scope, tabbable = true) {
    $a7a7830a5e3accdc$var$focusElement($a7a7830a5e3accdc$var$getFirstInScope(scope, tabbable));
}
function $a7a7830a5e3accdc$var$useAutoFocus(scopeRef, autoFocus) {
    const autoFocusRef = {
        current: autoFocus
    };
    (0, $3RlMb$createEffect)(()=>$a7a7830a5e3accdc$var$readScope(scopeRef), (scope)=>{
        if (!scope) return;
        if (autoFocusRef.current) {
            $a7a7830a5e3accdc$var$activeScope = scopeRef;
            const ownerDocument = (0, $gi7Zf.getOwnerDocument)(scopeRef.current ? scopeRef.current[0] : undefined);
            if (!$a7a7830a5e3accdc$var$isElementInScope((0, $ed1Px.getActiveElement)(ownerDocument), $a7a7830a5e3accdc$var$activeScope.current) && scopeRef.current) $a7a7830a5e3accdc$var$focusFirstInScope(scopeRef.current);
        }
        autoFocusRef.current = false;
    });
}
function $a7a7830a5e3accdc$var$useActiveScopeTracker(scopeRef, restores, contains) {
    // tracks the active scope, in case restore and contain are both false.
    // if either are true, this is tracked in useRestoreFocus or useFocusContainment.
    (0, $3RlMb$createEffect)(()=>({
            scope: $a7a7830a5e3accdc$var$readScope(scopeRef),
            restore: restores(),
            contain: contains()
        }), ({ scope: scope, restore: restore, contain: contain })=>{
        if (restore || contain) return;
        const ownerDocument = (0, $gi7Zf.getOwnerDocument)(scope ? scope[0] : undefined);
        let onFocus = (e)=>{
            let target = (0, $ed1Px.getEventTarget)(e);
            if ($a7a7830a5e3accdc$var$isElementInScope(target, scopeRef.current)) $a7a7830a5e3accdc$var$activeScope = scopeRef;
            else if (!$a7a7830a5e3accdc$var$isElementInAnyScope(target)) $a7a7830a5e3accdc$var$activeScope = null;
        };
        ownerDocument.addEventListener('focusin', onFocus, false);
        scope?.forEach((element)=>element.addEventListener('focusin', onFocus, false));
        return ()=>{
            ownerDocument.removeEventListener('focusin', onFocus, false);
            scope?.forEach((element)=>element.removeEventListener('focusin', onFocus, false));
        };
    });
}
function $a7a7830a5e3accdc$var$shouldRestoreFocus(scopeRef) {
    let scope = $a7a7830a5e3accdc$export$d06fae2ee68b101e.getTreeNode($a7a7830a5e3accdc$var$activeScope);
    while(scope && scope.scopeRef !== scopeRef){
        if (scope.nodeToRestore) return false;
        scope = scope.parent;
    }
    return scope?.scopeRef === scopeRef;
}
function $a7a7830a5e3accdc$var$useRestoreFocus(scopeRef, restores, contains) {
    // create a ref during render instead of useLayoutEffect so the active element is saved before a child with autoFocus=true mounts.
    const nodeToRestoreRef = {
        current: (0, $3RlMb$untrack)(()=>typeof document !== 'undefined' ? (0, $ed1Px.getActiveElement)(// oxlint-disable-next-line react/react-compiler
            (0, $gi7Zf.getOwnerDocument)(scopeRef.current ? scopeRef.current[0] : undefined)) : null)
    };
    // restoring scopes should all track if they are active regardless of contain, but contain already tracks it plus logic to contain the focus
    // restoring-non-containing scopes should only care if they become active so they can perform the restore
    (0, $3RlMb$createEffect)(()=>({
            scope: $a7a7830a5e3accdc$var$readScope(scopeRef),
            restoreFocus: restores(),
            contain: contains()
        }), ({ scope: scope, restoreFocus: restoreFocus, contain: contain })=>{
        const ownerDocument = (0, $gi7Zf.getOwnerDocument)(scope ? scope[0] : undefined);
        if (!restoreFocus || contain) return;
        let onFocus = ()=>{
            // If focusing an element in a child scope of the currently active scope, the child becomes active.
            // Moving out of the active scope to an ancestor is not allowed.
            if ((!$a7a7830a5e3accdc$var$activeScope || $a7a7830a5e3accdc$var$isAncestorScope($a7a7830a5e3accdc$var$activeScope, scopeRef)) && $a7a7830a5e3accdc$var$isElementInScope((0, $ed1Px.getActiveElement)(ownerDocument), scopeRef.current)) $a7a7830a5e3accdc$var$activeScope = scopeRef;
        };
        ownerDocument.addEventListener('focusin', onFocus, false);
        scope?.forEach((element)=>element.addEventListener('focusin', onFocus, false));
        return ()=>{
            ownerDocument.removeEventListener('focusin', onFocus, false);
            scope?.forEach((element)=>element.removeEventListener('focusin', onFocus, false));
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    (0, $3RlMb$createEffect)(()=>({
            scope: $a7a7830a5e3accdc$var$readScope(scopeRef),
            restoreFocus: restores(),
            contain: contains()
        }), ({ restoreFocus: restoreFocus, contain: contain })=>{
        const ownerDocument = (0, $gi7Zf.getOwnerDocument)(scopeRef.current ? scopeRef.current[0] : undefined);
        if (!restoreFocus) return;
        // Handle the Tab key so that tabbing out of the scope goes to the next element
        // after the node that had focus when the scope mounted. This is important when
        // using portals for overlays, so that focus goes to the expected element when
        // tabbing out of the overlay.
        let onKeyDown = (e)=>{
            if (e.key !== 'Tab' || e.altKey || e.ctrlKey || e.metaKey || !$a7a7830a5e3accdc$var$shouldContainFocus(scopeRef) || e.isComposing) return;
            let focusedElement = ownerDocument.activeElement;
            if (!$a7a7830a5e3accdc$var$isElementInChildScope(focusedElement, scopeRef) || !$a7a7830a5e3accdc$var$shouldRestoreFocus(scopeRef)) return;
            let treeNode = $a7a7830a5e3accdc$export$d06fae2ee68b101e.getTreeNode(scopeRef);
            if (!treeNode) return;
            let nodeToRestore = treeNode.nodeToRestore;
            // Create a DOM tree walker that matches all tabbable elements
            let walker = $a7a7830a5e3accdc$export$2d6ec8fc375ceafa(ownerDocument.body, {
                tabbable: true
            });
            // Find the next tabbable element after the currently focused element
            walker.currentNode = focusedElement;
            let nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode();
            if (!nodeToRestore || !nodeToRestore.isConnected || nodeToRestore === ownerDocument.body) {
                nodeToRestore = undefined;
                treeNode.nodeToRestore = undefined;
            }
            // If there is no next element, or it is outside the current scope, move focus to the
            // next element after the node to restore to instead.
            if ((!nextElement || !$a7a7830a5e3accdc$var$isElementInChildScope(nextElement, scopeRef)) && nodeToRestore) {
                walker.currentNode = nodeToRestore;
                // Skip over elements within the scope, in case the scope immediately follows the node to restore.
                do nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode();
                while ($a7a7830a5e3accdc$var$isElementInChildScope(nextElement, scopeRef));
                e.preventDefault();
                e.stopPropagation();
                if (nextElement) $a7a7830a5e3accdc$var$focusElement(nextElement, true);
                else // If there is no next element and the nodeToRestore isn't within a FocusScope (i.e. we are leaving the top level focus scope)
                // then move focus to the body.
                // Otherwise restore focus to the nodeToRestore (e.g menu within a popover -> tabbing to close the menu should move focus to menu trigger)
                if (!$a7a7830a5e3accdc$var$isElementInAnyScope(nodeToRestore)) focusedElement.blur();
                else $a7a7830a5e3accdc$var$focusElement(nodeToRestore, true);
            }
        };
        if (!contain) ownerDocument.addEventListener('keydown', onKeyDown, true);
        return ()=>{
            if (!contain) ownerDocument.removeEventListener('keydown', onKeyDown, true);
        };
    });
    // useLayoutEffect instead of useEffect so the active element is saved synchronously instead of asynchronously.
    (0, $3RlMb$createEffect)(()=>({
            scope: $a7a7830a5e3accdc$var$readScope(scopeRef),
            restoreFocus: restores()
        }), ({ scope: scope, restoreFocus: restoreFocus })=>{
        const ownerDocument = (0, $gi7Zf.getOwnerDocument)(scope ? scope[0] : undefined);
        if (!restoreFocus) return;
        let treeNode = $a7a7830a5e3accdc$export$d06fae2ee68b101e.getTreeNode(scopeRef);
        if (!treeNode) return;
        treeNode.nodeToRestore = nodeToRestoreRef.current ?? undefined;
        return ()=>{
            let treeNode = $a7a7830a5e3accdc$export$d06fae2ee68b101e.getTreeNode(scopeRef);
            if (!treeNode) return;
            let nodeToRestore = treeNode.nodeToRestore;
            // if we already lost focus to the body and this was the active scope, then we should attempt to restore
            let activeElement = (0, $ed1Px.getActiveElement)(ownerDocument);
            if (restoreFocus && nodeToRestore && (activeElement && $a7a7830a5e3accdc$var$isElementInChildScope(activeElement, scopeRef) || activeElement === ownerDocument.body && $a7a7830a5e3accdc$var$shouldRestoreFocus(scopeRef))) {
                // freeze the focusScopeTree so it persists after the raf, otherwise during unmount nodes are removed from it
                let clonedTree = $a7a7830a5e3accdc$export$d06fae2ee68b101e.clone();
                requestAnimationFrame(()=>{
                    // Only restore focus if we've lost focus to the body, the alternative is that focus has been purposefully moved elsewhere
                    if (ownerDocument.activeElement === ownerDocument.body) {
                        // look up the tree starting with our scope to find a nodeToRestore still in the DOM
                        let treeNode = clonedTree.getTreeNode(scopeRef);
                        while(treeNode){
                            if (treeNode.nodeToRestore && treeNode.nodeToRestore.isConnected) {
                                $a7a7830a5e3accdc$var$restoreFocusToElement(treeNode.nodeToRestore);
                                return;
                            }
                            treeNode = treeNode.parent;
                        }
                        // If no nodeToRestore was found, focus the first element in the nearest
                        // ancestor scope that is still in the tree.
                        treeNode = clonedTree.getTreeNode(scopeRef);
                        while(treeNode){
                            if (treeNode.scopeRef && // TODO: this is probably a false positive based on naming, it's not a real ref, rename.
                            // oxlint-disable-next-line react-hooks/exhaustive-deps
                            treeNode.scopeRef.current && $a7a7830a5e3accdc$export$d06fae2ee68b101e.getTreeNode(treeNode.scopeRef)) {
                                // oxlint-disable-next-line react-hooks/exhaustive-deps
                                let node = $a7a7830a5e3accdc$var$getFirstInScope(treeNode.scopeRef.current, true);
                                // The scope may have nothing focusable in it, e.g. if its focusable
                                // content was removed or hidden. Keep walking up in that case.
                                if (node) {
                                    $a7a7830a5e3accdc$var$restoreFocusToElement(node);
                                    return;
                                }
                            }
                            treeNode = treeNode.parent;
                        }
                    }
                });
            }
        };
    });
}
function $a7a7830a5e3accdc$var$restoreFocusToElement(node) {
    // Dispatch a custom event that parent elements can intercept to customize focus restoration.
    // For example, virtualized collection components reuse DOM elements, so the original element
    // might still exist in the DOM but representing a different item.
    if (node.dispatchEvent(new CustomEvent($a7a7830a5e3accdc$var$RESTORE_FOCUS_EVENT, {
        bubbles: true,
        cancelable: true
    }))) $a7a7830a5e3accdc$var$focusElement(node);
}
function $a7a7830a5e3accdc$export$2d6ec8fc375ceafa(root, opts, scope) {
    let filter = opts?.tabbable ? (0, $6MYlq.isTabbable) : (0, $6MYlq.isFocusable);
    // Ensure that root is an Element or fall back appropriately
    let rootElement = root?.nodeType === Node.ELEMENT_NODE ? root : null;
    // Determine the document to use
    let doc = (0, $gi7Zf.getOwnerDocument)(rootElement);
    // Create a TreeWalker, ensuring the root is an Element or Document
    let walker = (0, $6MMIu.createShadowTreeWalker)(doc, root || doc, NodeFilter.SHOW_ELEMENT, {
        acceptNode (node) {
            // Skip nodes inside the starting node.
            if ((0, $ed1Px.nodeContains)(opts?.from, node)) return NodeFilter.FILTER_REJECT;
            if (opts?.tabbable && node.tagName === 'INPUT' && node.getAttribute('type') === 'radio') {
                // If the radio is in a form, we can get all the other radios by name
                if (!$a7a7830a5e3accdc$var$isTabbableRadio(node)) return NodeFilter.FILTER_REJECT;
                // If the radio is in the same group as the current node and none are selected, we can skip it
                if (walker.currentNode.tagName === 'INPUT' && walker.currentNode.type === 'radio' && walker.currentNode.name === node.name) return NodeFilter.FILTER_REJECT;
            }
            if (filter(node) && (!scope || $a7a7830a5e3accdc$var$isElementInScope(node, scope)) && (!opts?.accept || opts.accept(node))) return NodeFilter.FILTER_ACCEPT;
            return NodeFilter.FILTER_SKIP;
        }
    });
    if (opts?.from) walker.currentNode = opts.from;
    return walker;
}
function $a7a7830a5e3accdc$export$c5251b9e124bf29(ref, defaultOptions = {}) {
    return {
        focusNext (opts = {}) {
            let root = ref.current;
            if (!root) return null;
            let { from: from, tabbable: tabbable = defaultOptions.tabbable, wrap: wrap = defaultOptions.wrap, accept: accept = defaultOptions.accept } = opts;
            let node = from || (0, $ed1Px.getActiveElement)((0, $gi7Zf.getOwnerDocument)(root));
            let walker = $a7a7830a5e3accdc$export$2d6ec8fc375ceafa(root, {
                tabbable: tabbable,
                accept: accept
            });
            if ((0, $ed1Px.nodeContains)(root, node)) walker.currentNode = node;
            let nextNode = walker.nextNode();
            if (!nextNode && wrap) {
                walker.currentNode = root;
                nextNode = walker.nextNode();
            }
            if (nextNode) $a7a7830a5e3accdc$var$focusElement(nextNode, true);
            return nextNode;
        },
        focusPrevious (opts = defaultOptions) {
            let root = ref.current;
            if (!root) return null;
            let { from: from, tabbable: tabbable = defaultOptions.tabbable, wrap: wrap = defaultOptions.wrap, accept: accept = defaultOptions.accept } = opts;
            let node = from || (0, $ed1Px.getActiveElement)((0, $gi7Zf.getOwnerDocument)(root));
            let walker = $a7a7830a5e3accdc$export$2d6ec8fc375ceafa(root, {
                tabbable: tabbable,
                accept: accept
            });
            if ((0, $ed1Px.nodeContains)(root, node)) walker.currentNode = node;
            else {
                let next = $a7a7830a5e3accdc$var$last(walker);
                if (next) $a7a7830a5e3accdc$var$focusElement(next, true);
                return next ?? null;
            }
            let previousNode = walker.previousNode();
            if (!previousNode && wrap) {
                walker.currentNode = root;
                let lastNode = $a7a7830a5e3accdc$var$last(walker);
                if (!lastNode) // couldn't wrap
                return null;
                previousNode = lastNode;
            }
            if (previousNode) $a7a7830a5e3accdc$var$focusElement(previousNode, true);
            return previousNode ?? null;
        },
        focusFirst (opts = defaultOptions) {
            let root = ref.current;
            if (!root) return null;
            let { tabbable: tabbable = defaultOptions.tabbable, accept: accept = defaultOptions.accept } = opts;
            let walker = $a7a7830a5e3accdc$export$2d6ec8fc375ceafa(root, {
                tabbable: tabbable,
                accept: accept
            });
            let nextNode = walker.nextNode();
            if (nextNode) $a7a7830a5e3accdc$var$focusElement(nextNode, true);
            return nextNode;
        },
        focusLast (opts = defaultOptions) {
            let root = ref.current;
            if (!root) return null;
            let { tabbable: tabbable = defaultOptions.tabbable, accept: accept = defaultOptions.accept } = opts;
            let walker = $a7a7830a5e3accdc$export$2d6ec8fc375ceafa(root, {
                tabbable: tabbable,
                accept: accept
            });
            let next = $a7a7830a5e3accdc$var$last(walker);
            if (next) $a7a7830a5e3accdc$var$focusElement(next, true);
            return next ?? null;
        }
    };
}
function $a7a7830a5e3accdc$var$last(walker) {
    let next = undefined;
    let last;
    do {
        last = walker.lastChild();
        if (last) next = last;
    }while (last);
    return next;
}
class $a7a7830a5e3accdc$var$Tree {
    root;
    fastMap = new Map();
    constructor(){
        this.root = new $a7a7830a5e3accdc$var$TreeNode({
            scopeRef: null
        });
        this.fastMap.set(null, this.root);
    }
    get size() {
        return this.fastMap.size;
    }
    getTreeNode(data) {
        return this.fastMap.get(data);
    }
    addTreeNode(scopeRef, parent, nodeToRestore) {
        let parentNode = this.fastMap.get(parent ?? null);
        if (!parentNode) return;
        let node = new $a7a7830a5e3accdc$var$TreeNode({
            scopeRef: scopeRef
        });
        parentNode.addChild(node);
        node.parent = parentNode;
        this.fastMap.set(scopeRef, node);
        if (nodeToRestore) node.nodeToRestore = nodeToRestore;
    }
    addNode(node) {
        this.fastMap.set(node.scopeRef, node);
    }
    removeTreeNode(scopeRef) {
        // never remove the root
        if (scopeRef === null) return;
        let node = this.fastMap.get(scopeRef);
        if (!node) return;
        let parentNode = node.parent;
        // when we remove a scope, check if any sibling scopes are trying to restore focus to something inside the scope we're removing
        // if we are, then replace the siblings restore with the restore from the scope we're removing
        for (let current of this.traverse())if (current !== node && node.nodeToRestore && current.nodeToRestore && node.scopeRef && node.scopeRef.current && $a7a7830a5e3accdc$var$isElementInScope(current.nodeToRestore, node.scopeRef.current)) current.nodeToRestore = node.nodeToRestore;
        let children = node.children;
        if (parentNode) {
            parentNode.removeChild(node);
            if (children.size > 0) children.forEach((child)=>parentNode && parentNode.addChild(child));
        }
        this.fastMap.delete(node.scopeRef);
    }
    // Pre Order Depth First
    *traverse(node = this.root) {
        if (node.scopeRef != null) yield node;
        if (node.children.size > 0) for (let child of node.children)yield* this.traverse(child);
    }
    clone() {
        let newTree = new $a7a7830a5e3accdc$var$Tree();
        for (let node of this.traverse())newTree.addTreeNode(node.scopeRef, node.parent?.scopeRef ?? null, node.nodeToRestore);
        return newTree;
    }
}
class $a7a7830a5e3accdc$var$TreeNode {
    scopeRef;
    nodeToRestore;
    parent;
    children = new Set();
    contain = false;
    constructor(props){
        this.scopeRef = props.scopeRef;
    }
    addChild(node) {
        this.children.add(node);
        node.parent = this;
    }
    removeChild(node) {
        this.children.delete(node);
        node.parent = undefined;
    }
}
let $a7a7830a5e3accdc$export$d06fae2ee68b101e = new $a7a7830a5e3accdc$var$Tree();

});
parcelRegister("6MMIu", function(module, exports) {

$parcel$export(module.exports, "createShadowTreeWalker", function () { return $4f0d03e3e99a15f0$export$4d0f8be8b12a7ef6; });
// https://github.com/microsoft/tabster/blob/a89fc5d7e332d48f68d03b1ca6e344489d1c3898/src/Shadowdomize/ShadowTreeWalker.ts

var $ed1Px = parcelRequire("ed1Px");

var $fy4Mq = parcelRequire("fy4Mq");
class $4f0d03e3e99a15f0$export$63eb3ababa9c55c4 {
    filter;
    root;
    whatToShow;
    _doc;
    _walkerStack = [];
    _currentNode;
    _currentSetFor = new Set();
    constructor(doc, root, whatToShow, filter){
        this._doc = doc;
        this.root = root;
        this.filter = filter ?? null;
        this.whatToShow = whatToShow ?? NodeFilter.SHOW_ALL;
        this._currentNode = root;
        this._walkerStack.unshift(doc.createTreeWalker(root, whatToShow, this._acceptNode));
        const shadowRoot = root.shadowRoot;
        if (shadowRoot) {
            const walker = this._doc.createTreeWalker(shadowRoot, this.whatToShow, {
                acceptNode: this._acceptNode
            });
            this._walkerStack.unshift(walker);
        }
    }
    _acceptNode = (node)=>{
        if (node.nodeType === Node.ELEMENT_NODE) {
            const shadowRoot = node.shadowRoot;
            if (shadowRoot) {
                const walker = this._doc.createTreeWalker(shadowRoot, this.whatToShow, {
                    acceptNode: this._acceptNode
                });
                this._walkerStack.unshift(walker);
                return NodeFilter.FILTER_ACCEPT;
            } else {
                if (typeof this.filter === 'function') return this.filter(node);
                else if (this.filter?.acceptNode) return this.filter.acceptNode(node);
                else if (this.filter === null) return NodeFilter.FILTER_ACCEPT;
            }
        }
        return NodeFilter.FILTER_SKIP;
    };
    get currentNode() {
        return this._currentNode;
    }
    set currentNode(node) {
        if (!(0, $ed1Px.nodeContains)(this.root, node)) throw new Error('Cannot set currentNode to a node that is not contained by the root node.');
        const walkers = [];
        let curNode = node;
        let currentWalkerCurrentNode = node;
        this._currentNode = node;
        while(curNode && curNode !== this.root)if (curNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            const shadowRoot = curNode;
            const walker = this._doc.createTreeWalker(shadowRoot, this.whatToShow, {
                acceptNode: this._acceptNode
            });
            walkers.push(walker);
            walker.currentNode = currentWalkerCurrentNode;
            this._currentSetFor.add(walker);
            curNode = currentWalkerCurrentNode = shadowRoot.host;
        } else curNode = curNode.parentNode;
        const walker = this._doc.createTreeWalker(this.root, this.whatToShow, {
            acceptNode: this._acceptNode
        });
        walkers.push(walker);
        walker.currentNode = currentWalkerCurrentNode;
        this._currentSetFor.add(walker);
        this._walkerStack = walkers;
    }
    get doc() {
        return this._doc;
    }
    firstChild() {
        let currentNode = this.currentNode;
        let newNode = this.nextNode();
        if (!(0, $ed1Px.nodeContains)(currentNode, newNode)) {
            this.currentNode = currentNode;
            return null;
        }
        if (newNode) this.currentNode = newNode;
        return newNode;
    }
    lastChild() {
        let walker = this._walkerStack[0];
        let newNode = walker.lastChild();
        if (newNode) this.currentNode = newNode;
        return newNode;
    }
    nextNode() {
        const nextNode = this._walkerStack[0].nextNode();
        if (nextNode) {
            const shadowRoot = nextNode.shadowRoot;
            if (shadowRoot) {
                let nodeResult;
                if (typeof this.filter === 'function') nodeResult = this.filter(nextNode);
                else if (this.filter?.acceptNode) nodeResult = this.filter.acceptNode(nextNode);
                if (nodeResult === NodeFilter.FILTER_ACCEPT) {
                    this.currentNode = nextNode;
                    return nextNode;
                }
                // _acceptNode should have added new walker for this shadow,
                // go in recursively.
                let newNode = this.nextNode();
                if (newNode) this.currentNode = newNode;
                return newNode;
            }
            if (nextNode) this.currentNode = nextNode;
            return nextNode;
        } else {
            if (this._walkerStack.length > 1) {
                this._walkerStack.shift();
                let newNode = this.nextNode();
                if (newNode) this.currentNode = newNode;
                return newNode;
            } else return null;
        }
    }
    previousNode() {
        const currentWalker = this._walkerStack[0];
        if (currentWalker.currentNode === currentWalker.root) {
            if (this._currentSetFor.has(currentWalker)) {
                this._currentSetFor.delete(currentWalker);
                if (this._walkerStack.length > 1) {
                    this._walkerStack.shift();
                    let newNode = this.previousNode();
                    if (newNode) this.currentNode = newNode;
                    return newNode;
                } else return null;
            }
            return null;
        }
        const previousNode = currentWalker.previousNode();
        if (previousNode) {
            const shadowRoot = previousNode.shadowRoot;
            if (shadowRoot) {
                let nodeResult;
                if (typeof this.filter === 'function') nodeResult = this.filter(previousNode);
                else if (this.filter?.acceptNode) nodeResult = this.filter.acceptNode(previousNode);
                if (nodeResult === NodeFilter.FILTER_ACCEPT) {
                    if (previousNode) this.currentNode = previousNode;
                    return previousNode;
                }
                // _acceptNode should have added new walker for this shadow,
                // go in recursively.
                let newNode = this.lastChild();
                if (newNode) this.currentNode = newNode;
                return newNode;
            }
            if (previousNode) this.currentNode = previousNode;
            return previousNode;
        } else {
            if (this._walkerStack.length > 1) {
                this._walkerStack.shift();
                let newNode = this.previousNode();
                if (newNode) this.currentNode = newNode;
                return newNode;
            } else return null;
        }
    }
    /**
     * @deprecated
     */ nextSibling() {
        // if (__DEV__) {
        //     throw new Error("Method not implemented.");
        // }
        return null;
    }
    /**
     * @deprecated
     */ previousSibling() {
        // if (__DEV__) {
        //     throw new Error("Method not implemented.");
        // }
        return null;
    }
    /**
     * @deprecated
     */ parentNode() {
        // if (__DEV__) {
        //     throw new Error("Method not implemented.");
        // }
        return null;
    }
}
function $4f0d03e3e99a15f0$export$4d0f8be8b12a7ef6(doc, root, whatToShow, filter) {
    if ((0, $fy4Mq.shadowDOM)()) return new $4f0d03e3e99a15f0$export$63eb3ababa9c55c4(doc, root, whatToShow, filter);
    return doc.createTreeWalker(root, whatToShow, filter);
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
    let [modality, setModality] = (0, $3RlMb$createSignal)($a85418a6e737a800$var$currentModality);
    let handler = ()=>{
        setModality($a85418a6e737a800$var$currentModality);
    };
    $a85418a6e737a800$export$901e90a13c50a14e.add(handler);
    (0, $3RlMb$onCleanup)(()=>{
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
    let [isFocusVisibleState, setFocusVisible] = (0, $3RlMb$createSignal)(props.autoFocus || $a85418a6e737a800$export$b9b3dfddab17db27());
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
    (0, $3RlMb$createEffect)(()=>opts?.enabled !== false, (enabled)=>{
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
    (0, $3RlMb$onCleanup)(()=>{
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

const $b7fdaee6ddcf59c4$var$RouterContext = (0, $3RlMb$createContext)({
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
    return (0, $3RlMb$createComponent)($b7fdaee6ddcf59c4$var$RouterContext, {
        value: ctx,
        get children () {
            return props.children;
        }
    });
}
function $b7fdaee6ddcf59c4$export$9a302a45f65d0572() {
    return (0, $3RlMb$useContext)($b7fdaee6ddcf59c4$var$RouterContext);
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
    const [isSSR, setIsSSR] = (0, $3RlMb$createSignal)((0, $3RlMb$isServer) || (0, $3RlMb$isHydrating)());
    // Reserve the same lifecycle slot on server and client.
    (0, $3RlMb$onSettled)(()=>{
        setIsSSR(false);
    });
    return isSSR;
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
    const prefix = (0, $3RlMb$isServer) || (0, $3RlMb$isHydrating)() || false ? 'react-aria' : `react-aria${$9de886171f524ac8$var$clientPrefix}`;
    const generated = `${prefix}-${(0, $3RlMb$createUniqueId)()}`;
    // Adobe negotiates IDs while composing props. This internal signal deliberately
    // accepts those in-scope requests; ordinary component state does not opt in.
    const [value, setValue] = (0, $3RlMb$createSignal)(undefined, {
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
    register((0, $3RlMb$untrack)(res));
    (0, $3RlMb$createEffect)(res, register);
    (0, $3RlMb$onCleanup)(unregister);
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
    let [resolvedId, setResolvedId] = (0, $3RlMb$createSignal)((0, $3RlMb$untrack)(id1));
    let [publication, setPublication] = (0, $3RlMb$createSignal)(0);
    (0, $3RlMb$onSettled)(()=>{
        const currentId = (0, $3RlMb$untrack)(id1);
        setResolvedId(document.getElementById(currentId) ? currentId : undefined);
    });
    (0, $3RlMb$createEffect)(()=>[
            id1(),
            ...typeof depArray === 'function' ? depArray() : depArray
        ], ([currentId])=>{
        // Source useValueEffect first yields the generated ID, allowing new slot hosts
        // to receive it, then checks the DOM after that publication commits.
        setResolvedId(currentId);
        setPublication((value)=>value + 1);
    });
    (0, $3RlMb$createEffect)(()=>{
        publication();
        return id1();
    }, (currentId)=>{
        setResolvedId(document.getElementById(currentId) ? currentId : undefined);
    });
    return resolvedId;
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
        let cleanup = (0, $3RlMb$untrack)(()=>ref(instance));
        return typeof cleanup === 'function' ? cleanup : ()=>{
            (0, $3RlMb$untrack)(()=>ref(null));
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
    let [revision, setRevision] = (0, $3RlMb$createSignal)(0);
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
    let detach = (0, $3RlMb$action)(function*() {
        attach(null);
    });
    Object.defineProperty(attach, 'current', {
        get () {
            revision();
            return current;
        },
        set: attach
    });
    (0, $3RlMb$onCleanup)(()=>(0, $3RlMb$runWithOwner)(null, detach));
    return attach;
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

parcelRegister("dnlDG", function(module, exports) {

$parcel$export(module.exports, "I18nProvider", function () { return $9bce356509de5990$export$a54013f0d02a8f82; });
$parcel$export(module.exports, "useLocale", function () { return $9bce356509de5990$export$43bb16f9c6d9e3f7; });


var $fWxcB = parcelRequire("fWxcB");


var $kIyoO = parcelRequire("kIyoO");
const $9bce356509de5990$var$I18nContext = (0, $3RlMb$createContext)(null);
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
    return (0, $3RlMb$createComponent)($9bce356509de5990$var$I18nContext, {
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
    return (0, $3RlMb$createComponent)($9bce356509de5990$var$I18nContext, {
        value: defaultLocale,
        get children () {
            return props.children;
        }
    });
}
function $9bce356509de5990$export$a54013f0d02a8f82(props) {
    return (0, $3RlMb$memo)(()=>(0, $3RlMb$memo)(()=>!!props.locale)() ? (0, $3RlMb$createComponent)($9bce356509de5990$var$I18nProviderWithLocale, {
            get locale () {
                return props.locale;
            },
            get children () {
                return props.children;
            }
        }) : (0, $3RlMb$createComponent)($9bce356509de5990$var$I18nProviderWithDefaultLocale, {
            get children () {
                return props.children;
            }
        }));
}
function $9bce356509de5990$export$43bb16f9c6d9e3f7() {
    let defaultLocale = (0, $kIyoO.useDefaultLocale)();
    let context = (0, $3RlMb$useContext)($9bce356509de5990$var$I18nContext);
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
    let [isSSR, setSSR] = (0, $3RlMb$createSignal)((0, $3RlMb$isServer) || (0, $3RlMb$isHydrating)());
    let [defaultLocale, setDefaultLocale] = (0, $3RlMb$createSignal)($f15299abd09b0542$var$currentLocale);
    (0, $3RlMb$onSettled)(()=>{
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
        return (0, $3RlMb$createComponent)(Context, {
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
            return (typeof value === 'function' ? value((0, $3RlMb$merge)(props.values, {
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
    let ctx = (0, $3RlMb$useContext)(context);
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
    let contextProps = (0, $3RlMb$omit)(ctx, 'ref');
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
    let finalProps = (0, $3RlMb$merge)(mergedProps, styleOverride);
    return [
        finalProps,
        mergedRef
    ];
}
function $1e122d8834d59736$export$9d4c57ee4c6ffdd8(initialState = true) {
    // Initial state is typically based on the parent having an aria-label or aria-labelledby.
    // If it does, this value should be false so that we don't update the state and cause a rerender when we go through the layoutEffect
    let [hasSlot, setHasSlot] = (0, $3RlMb$createSignal)(typeof initialState === 'function' ? initialState() : initialState);
    let hasRun = false;
    // A callback ref which will run when the slotted element mounts.
    // This should happen before the useLayoutEffect below.
    let ref = (el)=>{
        hasRun = true;
        setHasSlot(!!el);
    };
    // If the callback hasn't been called, then reset to false.
    (0, $3RlMb$onSettled)(()=>{
        if (!hasRun) setHasSlot(false);
    });
    return [
        ref,
        hasSlot
    ];
}
function $1e122d8834d59736$export$ef03459518577ad4(props) {
    return (0, $3RlMb$omit)(props, (key)=>key === (0, $3RlMb$$PROXY) || typeof key === 'string' && key.startsWith('data-'));
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
    (0, $3RlMb$createEffect)(()=>props.ref, (targetRef)=>{
        let node = (0, $3RlMb$untrack)(()=>ref.current);
        if (node && targetRef !== deliveredRef) {
            ref(null);
            ref(node);
        }
    });
    // RC13 supports native listener options through addEventListener, not *Capture JSX props.
    (0, $3RlMb$createEffect)(()=>({
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
    (0, $3RlMb$onSettled)(()=>{
        // One-time custom-host conformance observation after attachment.
        let element = (0, $3RlMb$untrack)(()=>ref.current);
    });
    let domProps = (0, $3RlMb$merge)((0, $3RlMb$omit)(props, (key)=>key === 'render' || key === 'ref' || key === 'className' || key === 'htmlFor' || /^on[A-Z].*Capture$/.test(String(key))), {
        ref: ref,
        get class () {
            return props.className;
        },
        get for () {
            return props.htmlFor ?? props.for;
        }
    });
    const CustomRender = (hostProps)=>props.render(hostProps, undefined);
    const Host = (0, $3RlMb$dynamic)(()=>props.render ? CustomRender : ElementType);
    return (0, $3RlMb$createComponent)(Host, domProps);
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
        has: (_, key)=>key !== (0, $3RlMb$$PROXY) && args.some((props)=>props != null && key in props),
        getOwnPropertyDescriptor: (_, key)=>args.some((props)=>props != null && key in props) ? {
                enumerable: true,
                configurable: true,
                get: ()=>mergeProperty(key)
            } : undefined,
        get: (_, key)=>key === (0, $3RlMb$$PROXY) ? undefined : mergeProperty(key)
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
                else if ((key === 'className' || key === 'UNSAFE_className') && typeof a === 'string' && typeof b === 'string') result[key] = (0, $3RlMb$clsx)(a, b);
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




parcelRegister("bAtJj", function(module, exports) {

$parcel$export(module.exports, "filterDOMProps", function () { return (parcelRequire("5gAIA")).filterDOMProps; });

var $5gAIA = parcelRequire("5gAIA");

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
    let ctx = (0, $3RlMb$createMemo)(()=>(0, $2A4az.useSlottedContext)(context, props.slot) || {});
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



parcelRegister("2w6bN", function(module, exports) {

$parcel$export(module.exports, "ActionButtonContext", function () { return $1d535efc4bf5a673$export$2ff682723a46d413; });
$parcel$export(module.exports, "ActionButton", function () { return $1d535efc4bf5a673$export$cfc7921d29ef7b80; });


var $kaciT = parcelRequire("kaciT");

var $2for9 = parcelRequire("2for9");
parcelRequire("h5JLT");
var $2ZmcB = parcelRequire("2ZmcB");

var $3BNNa = parcelRequire("3BNNa");

var $2A4az = parcelRequire("2A4az");

var $jAA3o = parcelRequire("jAA3o");


var $9RJLv = parcelRequire("9RJLv");

var $3kDOI = parcelRequire("3kDOI");

var $dBSpv = parcelRequire("dBSpv");

var $k0dKS = parcelRequire("k0dKS");
parcelRequire("8i1yT");
var $6tJ0n = parcelRequire("6tJ0n");

var $5seyF = parcelRequire("5seyF");

var $gPqiz = parcelRequire("gPqiz");

var $esT6z = parcelRequire("esT6z");

var $4fCJc = parcelRequire("4fCJc");

var $eXdQ3 = parcelRequire("eXdQ3");

var $5gcT0 = parcelRequire("5gcT0");
parcelRequire("ig9q0");
var $dnlDG = parcelRequire("dnlDG");
parcelRequire("2fwg4");
var $jeZsY = parcelRequire("jeZsY");

var $k9l9B = parcelRequire("k9l9B");

var $1NDEx = parcelRequire("1NDEx");
var $1d535efc4bf5a673$var$_tmpl$ = /*#__PURE__*/ (0, $3RlMb$template)(`<div>`);
// These styles handle both ActionButton and ToggleButton
const $1d535efc4bf5a673$var$iconOnly = ':has([slot=icon], [slot=avatar]):not(:has([data-rsp-slot=text]))';
const $1d535efc4bf5a673$var$avatarOnly = ':has([slot=avatar]):not(:has([slot=icon], [data-rsp-slot=text]))';
const $1d535efc4bf5a673$var$textOnly = ':has([data-rsp-slot=text]):not(:has([slot=icon], [slot=avatar]))';
const $1d535efc4bf5a673$var$controlStyle = {
    font: {
        "default": "ui",
        size: {
            XS: "ui-xs",
            S: "ui-sm",
            L: "ui-lg",
            XL: "ui-xl"
        }
    },
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    paddingX: {
        "default": "edge-to-text",
        ":has([slot=icon]):not(:has([data-rsp-slot=text]))": 0
    },
    minWidth: {
        "default": 32,
        size: {
            XS: 20,
            S: 24,
            L: 40,
            XL: 48
        }
    },
    "--size": {
        type: "order",
        value: {
            "default": 1,
            size: {
                XS: 0.7901234567901234,
                S: 0.8888888888888888,
                L: 1.125,
                XL: 1.265625
            }
        }
    },
    "--radius": {
        type: "borderTopStartRadius",
        value: "default"
    },
    borderRadius: "round(var(--radius) * var(--size), 1px)",
    columnGap: "text-to-visual",
    "--iconMargin": {
        type: "marginStart",
        value: {
            "default": "[-0.14285714285714285em]",
            ":has([slot=icon]):not(:has([data-rsp-slot=text]))": 0
        }
    },
    height: {
        "default": 32,
        size: {
            XS: 20,
            S: 24,
            L: 40,
            XL: 48
        }
    }
};
const $1d535efc4bf5a673$export$446543cff2a0f496 = function anonymous(props, overrides) {
    let rules = " ", currentRules = {};
    let minWidth = false;
    let flexShrink = false;
    let flexGrow = false;
    let flexBasis = false;
    let width = false;
    let position = false;
    let zIndex = false;
    let matches = String(overrides || '').matchAll(/(?:^|\s)(J|G|I|H|_u|_v|_s|__A|_d|_J|z|y|B|A|_P|_9|W|_l|_A|_z|_6|Z|N|L|-macro\$)[^\s]+/g);
    for (let p of matches){
        if (p[1] === "N") minWidth = true;
        if (p[1] === "_v") flexShrink = true;
        if (p[1] === "_u") flexGrow = true;
        if (p[1] === "_s") flexBasis = true;
        if (p[1] === "Z") width = true;
        if (p[1] === "_P") position = true;
        if (p[1] === "_9") zIndex = true;
        rules += p[0];
    }
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
    if (props.size === "XL") {
        rules += ' uk18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XL\""] = "sans";
        rules += ' ucJ9TBTb18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XL\" && :lang(ar)"] = "sans";
        rules += ' ud3Euai18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XL\" && :lang(he)"] = "sans";
        rules += ' uea18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XL\" && :lang(ja)"] = "sans";
        rules += ' ugb18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XL\" && :lang(ko)"] = "sans";
        rules += ' uhd18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XL\" && :lang(zh)"] = "sans";
        rules += ' uje18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XL\" && :lang(zh-hant)"] = "sans";
        rules += ' u2NhKxcl18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XL\" && :lang(zh-HK)"] = "sans";
        rules += ' uic18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XL\" && :lang(zh-Hans, zh-CN, zh-SG)"] = "sans";
    } else if (props.size === "L") {
        rules += ' uk18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"L\""] = "sans";
        rules += ' ucJ9TBTb18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"L\" && :lang(ar)"] = "sans";
        rules += ' ud3Euai18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"L\" && :lang(he)"] = "sans";
        rules += ' uea18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"L\" && :lang(ja)"] = "sans";
        rules += ' ugb18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"L\" && :lang(ko)"] = "sans";
        rules += ' uhd18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"L\" && :lang(zh)"] = "sans";
        rules += ' uje18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"L\" && :lang(zh-hant)"] = "sans";
        rules += ' u2NhKxcl18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"L\" && :lang(zh-HK)"] = "sans";
        rules += ' uic18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"L\" && :lang(zh-Hans, zh-CN, zh-SG)"] = "sans";
    } else if (props.size === "S") {
        rules += ' uk18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"S\""] = "sans";
        rules += ' ucJ9TBTb18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"S\" && :lang(ar)"] = "sans";
        rules += ' ud3Euai18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"S\" && :lang(he)"] = "sans";
        rules += ' uea18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"S\" && :lang(ja)"] = "sans";
        rules += ' ugb18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"S\" && :lang(ko)"] = "sans";
        rules += ' uhd18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"S\" && :lang(zh)"] = "sans";
        rules += ' uje18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"S\" && :lang(zh-hant)"] = "sans";
        rules += ' u2NhKxcl18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"S\" && :lang(zh-HK)"] = "sans";
        rules += ' uic18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"S\" && :lang(zh-Hans, zh-CN, zh-SG)"] = "sans";
    } else if (props.size === "XS") {
        rules += ' uk18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XS\""] = "sans";
        rules += ' ucJ9TBTb18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XS\" && :lang(ar)"] = "sans";
        rules += ' ud3Euai18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XS\" && :lang(he)"] = "sans";
        rules += ' uea18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XS\" && :lang(ja)"] = "sans";
        rules += ' ugb18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XS\" && :lang(ko)"] = "sans";
        rules += ' uhd18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XS\" && :lang(zh)"] = "sans";
        rules += ' uje18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XS\" && :lang(zh-hant)"] = "sans";
        rules += ' u2NhKxcl18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XS\" && :lang(zh-HK)"] = "sans";
        rules += ' uic18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XS\" && :lang(zh-Hans, zh-CN, zh-SG)"] = "sans";
    } else {
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
    }
    if (props.size === "XL") {
        rules += ' -_6BNtrc-e18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"XL\""] = "ui-xl";
        rules += ' vFHT6Dd18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"XL\""] = "ui-xl";
    } else if (props.size === "L") {
        rules += ' -_6BNtrc-d18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"L\""] = "ui-lg";
        rules += ' vFHT6Dd18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"L\""] = "ui-lg";
    } else if (props.size === "S") {
        rules += ' -_6BNtrc-b18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"S\""] = "ui-sm";
        rules += ' vFHT6Dd18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"S\""] = "ui-sm";
    } else if (props.size === "XS") {
        rules += ' -_6BNtrc-a18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"XS\""] = "ui-xs";
        rules += ' vFHT6Dd18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"XS\""] = "ui-xs";
    } else {
        rules += ' -_6BNtrc-c18';
        currentRules["fontSize"] = "ui";
        rules += ' vFHT6Dd18';
        currentRules["fontSize"] = "ui";
    }
    rules += ' xc18';
    currentRules["fontWeight"] = "medium";
    rules += ' _xa18';
    currentRules["fontWeight"] = "medium";
    if (props.size === "XL") {
        rules += ' _Fd18';
        currentRules["lineHeight"] = typeof currentRules["lineHeight"] === 'object' ? currentRules["lineHeight"] : {
            "default": currentRules["lineHeight"]
        };
        currentRules["lineHeight"]["size === \"XL\""] = "ui";
        rules += ' _FnuYUweb18';
        currentRules["lineHeight"] = typeof currentRules["lineHeight"] === 'object' ? currentRules["lineHeight"] : {
            "default": currentRules["lineHeight"]
        };
        currentRules["lineHeight"]["size === \"XL\" && :lang(ja, ko, zh, zh-Hant, zh-Hans, zh-CN, zh-SG)"] = "ui";
    } else if (props.size === "L") {
        rules += ' _Fd18';
        currentRules["lineHeight"] = typeof currentRules["lineHeight"] === 'object' ? currentRules["lineHeight"] : {
            "default": currentRules["lineHeight"]
        };
        currentRules["lineHeight"]["size === \"L\""] = "ui";
        rules += ' _FnuYUweb18';
        currentRules["lineHeight"] = typeof currentRules["lineHeight"] === 'object' ? currentRules["lineHeight"] : {
            "default": currentRules["lineHeight"]
        };
        currentRules["lineHeight"]["size === \"L\" && :lang(ja, ko, zh, zh-Hant, zh-Hans, zh-CN, zh-SG)"] = "ui";
    } else if (props.size === "S") {
        rules += ' _Fd18';
        currentRules["lineHeight"] = typeof currentRules["lineHeight"] === 'object' ? currentRules["lineHeight"] : {
            "default": currentRules["lineHeight"]
        };
        currentRules["lineHeight"]["size === \"S\""] = "ui";
        rules += ' _FnuYUweb18';
        currentRules["lineHeight"] = typeof currentRules["lineHeight"] === 'object' ? currentRules["lineHeight"] : {
            "default": currentRules["lineHeight"]
        };
        currentRules["lineHeight"]["size === \"S\" && :lang(ja, ko, zh, zh-Hant, zh-Hans, zh-CN, zh-SG)"] = "ui";
    } else if (props.size === "XS") {
        rules += ' _Fd18';
        currentRules["lineHeight"] = typeof currentRules["lineHeight"] === 'object' ? currentRules["lineHeight"] : {
            "default": currentRules["lineHeight"]
        };
        currentRules["lineHeight"]["size === \"XS\""] = "ui";
        rules += ' _FnuYUweb18';
        currentRules["lineHeight"] = typeof currentRules["lineHeight"] === 'object' ? currentRules["lineHeight"] : {
            "default": currentRules["lineHeight"]
        };
        currentRules["lineHeight"]["size === \"XS\" && :lang(ja, ko, zh, zh-Hant, zh-Hans, zh-CN, zh-SG)"] = "ui";
    } else {
        rules += ' _Fd18';
        currentRules["lineHeight"] = "ui";
        rules += ' _FnuYUweb18';
        currentRules["lineHeight"] = typeof currentRules["lineHeight"] === 'object' ? currentRules["lineHeight"] : {
            "default": currentRules["lineHeight"]
        };
        currentRules["lineHeight"][":lang(ja, ko, zh, zh-Hant, zh-Hans, zh-CN, zh-SG)"] = "ui";
    }
    if (props.isStaticColor) {
        if (props.isDisabled) {
            rules += ' pi18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["isStaticColor && isDisabled"] = "transparent-overlay-400";
        } else if (props.isSelected) {
            rules += ' ph18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["isStaticColor && isSelected"] = "auto";
        } else {
            rules += ' pl18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["isStaticColor"] = "transparent-overlay-1000";
        }
    } else if (props.isDisabled) {
        rules += ' pp18';
        currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
            "default": currentRules["color"]
        };
        currentRules["color"]["isDisabled"] = "disabled";
    } else if (props.isSelected) {
        if (props.isEmphasized) {
            rules += ' px18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["isSelected && isEmphasized"] = "white";
        } else {
            rules += ' pr18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["isSelected"] = "gray-25";
        }
    } else {
        if (props.isPressed) {
            rules += ' po18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["isPressed"] = "neutral:pressed";
        } else if (props.isFocusVisible) {
            rules += ' po18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["isFocusVisible"] = "neutral:focused";
        } else if (props.isHovered) {
            rules += ' po18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["isHovered"] = "neutral:hovered";
        } else {
            rules += ' pt18';
            currentRules["color"] = "neutral";
        }
    }
    if (props.isDisabled) {
        rules += ' plOVIhfcYMPQu18';
        currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
            "default": currentRules["color"]
        };
        currentRules["color"]["forcedColors && isDisabled"] = "GrayText";
    } else if (props.isSelected) {
        rules += ' plOVIhfcgp5Dcd18';
        currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
            "default": currentRules["color"]
        };
        currentRules["color"]["forcedColors && isSelected"] = "HighlightText";
    } else {
        rules += ' plOVIhfc6LxY918';
        currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
            "default": currentRules["color"]
        };
        currentRules["color"]["forcedColors"] = "ButtonText";
    }
    if (props.isDisabled) {
        rules += ' plOVIhfcYMPQu18';
        currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
            "default": currentRules["color"]
        };
        currentRules["color"]["isDisabled && :is([data-hcm], [data-hcm] *)"] = "GrayText";
    } else if (props.isSelected) {
        rules += ' plOVIhfcgp5Dcd18';
        currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
            "default": currentRules["color"]
        };
        currentRules["color"]["isSelected && :is([data-hcm], [data-hcm] *)"] = "HighlightText";
    } else {
        rules += ' plOVIhfc6LxY918';
        currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
            "default": currentRules["color"]
        };
        currentRules["color"][":is([data-hcm], [data-hcm] *)"] = "ButtonText";
    }
    rules += ' se18';
    currentRules["display"] = "grid";
    rules += ' eb18';
    currentRules["alignItems"] = "center";
    rules += ' _oa18';
    currentRules["boxSizing"] = "border-box";
    rules += ' Sv18';
    currentRules["paddingStart"] = "edge-to-text";
    rules += ' SgLWx3bd18';
    currentRules["paddingStart"] = typeof currentRules["paddingStart"] === 'object' ? currentRules["paddingStart"] : {
        "default": currentRules["paddingStart"]
    };
    currentRules["paddingStart"][":has([slot=icon]):not(:has([data-rsp-slot=text]))"] = 0;
    rules += ' SsAUsHd18';
    currentRules["paddingStart"] = typeof currentRules["paddingStart"] === 'object' ? currentRules["paddingStart"] : {
        "default": currentRules["paddingStart"]
    };
    currentRules["paddingStart"][":has([slot=avatar]):not(:has([slot=icon], [data-rsp-slot=text]))"] = 0;
    rules += ' Rv18';
    currentRules["paddingEnd"] = "edge-to-text";
    rules += ' RgLWx3bd18';
    currentRules["paddingEnd"] = typeof currentRules["paddingEnd"] === 'object' ? currentRules["paddingEnd"] : {
        "default": currentRules["paddingEnd"]
    };
    currentRules["paddingEnd"][":has([slot=icon]):not(:has([data-rsp-slot=text]))"] = 0;
    rules += ' RsAUsHd18';
    currentRules["paddingEnd"] = typeof currentRules["paddingEnd"] === 'object' ? currentRules["paddingEnd"] : {
        "default": currentRules["paddingEnd"]
    };
    currentRules["paddingEnd"][":has([slot=avatar]):not(:has([slot=icon], [data-rsp-slot=text]))"] = 0;
    if (props.size === "XL") {
        if (!minWidth) rules += ' NBaYFfc18';
        currentRules["minWidth"] = typeof currentRules["minWidth"] === 'object' ? currentRules["minWidth"] : {
            "default": currentRules["minWidth"]
        };
        currentRules["minWidth"]["size === \"XL\""] = 48;
    } else if (props.size === "L") {
        if (!minWidth) rules += ' N3JjxG18';
        currentRules["minWidth"] = typeof currentRules["minWidth"] === 'object' ? currentRules["minWidth"] : {
            "default": currentRules["minWidth"]
        };
        currentRules["minWidth"]["size === \"L\""] = 40;
    } else if (props.size === "S") {
        if (!minWidth) rules += ' NCe2o8c18';
        currentRules["minWidth"] = typeof currentRules["minWidth"] === 'object' ? currentRules["minWidth"] : {
            "default": currentRules["minWidth"]
        };
        currentRules["minWidth"]["size === \"S\""] = 24;
    } else if (props.size === "XS") {
        if (!minWidth) rules += ' NifsFYc18';
        currentRules["minWidth"] = typeof currentRules["minWidth"] === 'object' ? currentRules["minWidth"] : {
            "default": currentRules["minWidth"]
        };
        currentRules["minWidth"]["size === \"XS\""] = 20;
    } else {
        if (!minWidth) rules += ' N4dY0ec18';
        currentRules["minWidth"] = 32;
    }
    if (props.size === "XL") {
        rules += ' -SFnbic-_JaP8ec18';
        currentRules["--size"] = typeof currentRules["--size"] === 'object' ? currentRules["--size"] : {
            "default": currentRules["--size"]
        };
        currentRules["--size"]["size === \"XL\""] = 1.265625;
    } else if (props.size === "L") {
        rules += ' -SFnbic-_J0K2hn18';
        currentRules["--size"] = typeof currentRules["--size"] === 'object' ? currentRules["--size"] : {
            "default": currentRules["--size"]
        };
        currentRules["--size"]["size === \"L\""] = 1.125;
    } else if (props.size === "S") {
        rules += ' -SFnbic-_JJOW22b18';
        currentRules["--size"] = typeof currentRules["--size"] === 'object' ? currentRules["--size"] : {
            "default": currentRules["--size"]
        };
        currentRules["--size"]["size === \"S\""] = 0.8888888888888888;
    } else if (props.size === "XS") {
        rules += ' -SFnbic-_JICefdd18';
        currentRules["--size"] = typeof currentRules["--size"] === 'object' ? currentRules["--size"] : {
            "default": currentRules["--size"]
        };
        currentRules["--size"]["size === \"XS\""] = 0.7901234567901234;
    } else {
        rules += ' -SFnbic-_Jb18';
        currentRules["--size"] = 1;
    }
    rules += ' -Bu7z1c-oH5kTnc18';
    currentRules["--radius"] = "default";
    if (props.density === "compact") {
        rules += ' od18';
        currentRules["borderTopStartRadius"] = typeof currentRules["borderTopStartRadius"] === 'object' ? currentRules["borderTopStartRadius"] : {
            "default": currentRules["borderTopStartRadius"]
        };
        currentRules["borderTopStartRadius"]["density === \"compact\""] = "none";
        rules += ' obj18';
        currentRules["borderTopStartRadius"] = typeof currentRules["borderTopStartRadius"] === 'object' ? currentRules["borderTopStartRadius"] : {
            "default": currentRules["borderTopStartRadius"]
        };
        currentRules["borderTopStartRadius"]["density === \"compact\" && :first-child"] = "round(var(--radius) * var(--size), 1px)";
    } else {
        rules += ' oj18';
        currentRules["borderTopStartRadius"] = "round(var(--radius) * var(--size), 1px)";
    }
    if (props.density === "compact") {
        if (props.orientation === "vertical") {
            rules += ' nd18';
            currentRules["borderTopEndRadius"] = typeof currentRules["borderTopEndRadius"] === 'object' ? currentRules["borderTopEndRadius"] : {
                "default": currentRules["borderTopEndRadius"]
            };
            currentRules["borderTopEndRadius"]["density === \"compact\" && orientation === \"vertical\""] = "none";
            rules += ' nbj18';
            currentRules["borderTopEndRadius"] = typeof currentRules["borderTopEndRadius"] === 'object' ? currentRules["borderTopEndRadius"] : {
                "default": currentRules["borderTopEndRadius"]
            };
            currentRules["borderTopEndRadius"]["density === \"compact\" && orientation === \"vertical\" && :first-child"] = "round(var(--radius) * var(--size), 1px)";
        } else if (props.orientation === "horizontal") {
            rules += ' nd18';
            currentRules["borderTopEndRadius"] = typeof currentRules["borderTopEndRadius"] === 'object' ? currentRules["borderTopEndRadius"] : {
                "default": currentRules["borderTopEndRadius"]
            };
            currentRules["borderTopEndRadius"]["density === \"compact\" && orientation === \"horizontal\""] = "none";
            rules += ' nkj18';
            currentRules["borderTopEndRadius"] = typeof currentRules["borderTopEndRadius"] === 'object' ? currentRules["borderTopEndRadius"] : {
                "default": currentRules["borderTopEndRadius"]
            };
            currentRules["borderTopEndRadius"]["density === \"compact\" && orientation === \"horizontal\" && :last-child"] = "round(var(--radius) * var(--size), 1px)";
        } else {
            rules += ' nd18';
            currentRules["borderTopEndRadius"] = typeof currentRules["borderTopEndRadius"] === 'object' ? currentRules["borderTopEndRadius"] : {
                "default": currentRules["borderTopEndRadius"]
            };
            currentRules["borderTopEndRadius"]["density === \"compact\""] = "none";
        }
    } else {
        rules += ' nj18';
        currentRules["borderTopEndRadius"] = "round(var(--radius) * var(--size), 1px)";
    }
    if (props.density === "compact") {
        if (props.orientation === "vertical") {
            rules += ' kd18';
            currentRules["borderBottomStartRadius"] = typeof currentRules["borderBottomStartRadius"] === 'object' ? currentRules["borderBottomStartRadius"] : {
                "default": currentRules["borderBottomStartRadius"]
            };
            currentRules["borderBottomStartRadius"]["density === \"compact\" && orientation === \"vertical\""] = "none";
            rules += ' kkj18';
            currentRules["borderBottomStartRadius"] = typeof currentRules["borderBottomStartRadius"] === 'object' ? currentRules["borderBottomStartRadius"] : {
                "default": currentRules["borderBottomStartRadius"]
            };
            currentRules["borderBottomStartRadius"]["density === \"compact\" && orientation === \"vertical\" && :last-child"] = "round(var(--radius) * var(--size), 1px)";
        } else if (props.orientation === "horizontal") {
            rules += ' kd18';
            currentRules["borderBottomStartRadius"] = typeof currentRules["borderBottomStartRadius"] === 'object' ? currentRules["borderBottomStartRadius"] : {
                "default": currentRules["borderBottomStartRadius"]
            };
            currentRules["borderBottomStartRadius"]["density === \"compact\" && orientation === \"horizontal\""] = "none";
            rules += ' kbj18';
            currentRules["borderBottomStartRadius"] = typeof currentRules["borderBottomStartRadius"] === 'object' ? currentRules["borderBottomStartRadius"] : {
                "default": currentRules["borderBottomStartRadius"]
            };
            currentRules["borderBottomStartRadius"]["density === \"compact\" && orientation === \"horizontal\" && :first-child"] = "round(var(--radius) * var(--size), 1px)";
        } else {
            rules += ' kd18';
            currentRules["borderBottomStartRadius"] = typeof currentRules["borderBottomStartRadius"] === 'object' ? currentRules["borderBottomStartRadius"] : {
                "default": currentRules["borderBottomStartRadius"]
            };
            currentRules["borderBottomStartRadius"]["density === \"compact\""] = "none";
        }
    } else {
        rules += ' kj18';
        currentRules["borderBottomStartRadius"] = "round(var(--radius) * var(--size), 1px)";
    }
    if (props.density === "compact") {
        rules += ' jd18';
        currentRules["borderBottomEndRadius"] = typeof currentRules["borderBottomEndRadius"] === 'object' ? currentRules["borderBottomEndRadius"] : {
            "default": currentRules["borderBottomEndRadius"]
        };
        currentRules["borderBottomEndRadius"]["density === \"compact\""] = "none";
        rules += ' jkj18';
        currentRules["borderBottomEndRadius"] = typeof currentRules["borderBottomEndRadius"] === 'object' ? currentRules["borderBottomEndRadius"] : {
            "default": currentRules["borderBottomEndRadius"]
        };
        currentRules["borderBottomEndRadius"]["density === \"compact\" && :last-child"] = "round(var(--radius) * var(--size), 1px)";
    } else {
        rules += ' jj18';
        currentRules["borderBottomEndRadius"] = "round(var(--radius) * var(--size), 1px)";
    }
    rules += ' qc18';
    currentRules["columnGap"] = "text-to-visual";
    rules += ' qsd18';
    currentRules["columnGap"] = typeof currentRules["columnGap"] === 'object' ? currentRules["columnGap"] : {
        "default": currentRules["columnGap"]
    };
    currentRules["columnGap"]["touch"] = "text-to-visual";
    rules += ' -Qg41Lb-IAxCW0c18';
    currentRules["--iconMargin"] = "[-0.14285714285714285em]";
    rules += ' -Qg41Lb-y5UFLdIYB8I18';
    currentRules["--iconMargin"] = typeof currentRules["--iconMargin"] === 'object' ? currentRules["--iconMargin"] : {
        "default": currentRules["--iconMargin"]
    };
    currentRules["--iconMargin"][":has([slot=icon], [slot=avatar]):not(:has([data-rsp-slot=text]))"] = 0;
    rules += ' -Qg41Lb-sAUsHIYB8I18';
    currentRules["--iconMargin"] = typeof currentRules["--iconMargin"] === 'object' ? currentRules["--iconMargin"] : {
        "default": currentRules["--iconMargin"]
    };
    currentRules["--iconMargin"][":has([slot=avatar]):not(:has([slot=icon], [data-rsp-slot=text]))"] = 0;
    rules += ' FRuFGYc18';
    rules += ' _Ca18';
    currentRules["justifyContent"] = "center";
    if (props.isInGroup) {
        if (!flexShrink) rules += ' _va18';
        currentRules["flexShrink"] = typeof currentRules["flexShrink"] === 'object' ? currentRules["flexShrink"] : {
            "default": currentRules["flexShrink"]
        };
        currentRules["flexShrink"]["isInGroup"] = 0;
    } else {
        if (!flexShrink) rules += ' _vb18';
        currentRules["flexShrink"] = 1;
    }
    if (props.isJustified) {
        if (!flexGrow) rules += ' _ub18';
        currentRules["flexGrow"] = typeof currentRules["flexGrow"] === 'object' ? currentRules["flexGrow"] : {
            "default": currentRules["flexGrow"]
        };
        currentRules["flexGrow"]["isJustified"] = 1;
    }
    if (props.isJustified) {
        if (!flexBasis) rules += ' _sb18';
        currentRules["flexBasis"] = typeof currentRules["flexBasis"] === 'object' ? currentRules["flexBasis"] : {
            "default": currentRules["flexBasis"]
        };
        currentRules["flexBasis"]["isJustified"] = 0;
    }
    if (props.isInGroup) {
        if (props.orientation === "vertical") {
            if (!width) rules += ' Za18';
            currentRules["width"] = typeof currentRules["width"] === 'object' ? currentRules["width"] : {
                "default": currentRules["width"]
            };
            currentRules["width"]["isInGroup && orientation === \"vertical\""] = "100%";
        }
    } else {
        if (!width) rules += ' ZJ18';
        currentRules["width"] = "fit";
    }
    rules += ' _4c18';
    currentRules["userSelect"] = "none";
    rules += ' Yd18';
    currentRules["transition"] = "default";
    rules += ' Xb18';
    currentRules["transitionDuration"] = 150;
    rules += ' _2b18';
    currentRules["transitionTimingFunction"] = "default";
    rules += ' _yb18';
    currentRules["forcedColorAdjust"] = "none";
    if (!position) rules += ' _Pc18';
    currentRules["position"] = "relative";
    rules += ' CjpxCZ18';
    currentRules["gridTemplateAreas"] = [
        "icon text"
    ];
    rules += ' Cy5UFLd2sgPTb18';
    currentRules["gridTemplateAreas"] = typeof currentRules["gridTemplateAreas"] === 'object' ? currentRules["gridTemplateAreas"] : {
        "default": currentRules["gridTemplateAreas"]
    };
    currentRules["gridTemplateAreas"][":has([slot=icon], [slot=avatar]):not(:has([data-rsp-slot=text]))"] = [
        "icon"
    ];
    rules += ' CwAP22cUolIUb18';
    currentRules["gridTemplateAreas"] = typeof currentRules["gridTemplateAreas"] === 'object' ? currentRules["gridTemplateAreas"] : {
        "default": currentRules["gridTemplateAreas"]
    };
    currentRules["gridTemplateAreas"][":has([data-rsp-slot=text]):not(:has([slot=icon], [slot=avatar]))"] = [
        "text"
    ];
    rules += ' DZQmDFe18';
    currentRules["gridTemplateColumns"] = [
        "auto",
        "auto"
    ];
    rules += ' Dy5UFLdQgYBrc18';
    currentRules["gridTemplateColumns"] = typeof currentRules["gridTemplateColumns"] === 'object' ? currentRules["gridTemplateColumns"] : {
        "default": currentRules["gridTemplateColumns"]
    };
    currentRules["gridTemplateColumns"][":has([slot=icon], [slot=avatar]):not(:has([data-rsp-slot=text]))"] = [
        "auto"
    ];
    rules += ' DwAP22cQgYBrc18';
    currentRules["gridTemplateColumns"] = typeof currentRules["gridTemplateColumns"] === 'object' ? currentRules["gridTemplateColumns"] : {
        "default": currentRules["gridTemplateColumns"]
    };
    currentRules["gridTemplateColumns"][":has([data-rsp-slot=text]):not(:has([slot=icon], [slot=avatar]))"] = [
        "auto"
    ];
    rules += ' gqMFGYc18';
    rules += ' -_8sjo0b-t5ZbAob18';
    currentRules["--iconPrimary"] = "currentColor";
    rules += ' _je18';
    currentRules["borderStyle"] = "none";
    if (props.isFocusVisible) {
        if (!zIndex) rules += ' _9d18';
        currentRules["zIndex"] = typeof currentRules["zIndex"] === 'object' ? currentRules["zIndex"] : {
            "default": currentRules["zIndex"]
        };
        currentRules["zIndex"]["isFocusVisible"] = 2;
    }
    rules += ' __ca18';
    currentRules["disableTapHighlight"] = true;
    rules += ' -B5H9Ae-WXN7eQb18';
    currentRules["--badgeTop"] = "calc(self(height)/2 - var(--iconWidth)/2)";
    rules += ' -B5H9Ae-wAP22cWr18';
    currentRules["--badgeTop"] = typeof currentRules["--badgeTop"] === 'object' ? currentRules["--badgeTop"] : {
        "default": currentRules["--badgeTop"]
    };
    currentRules["--badgeTop"][":has([data-rsp-slot=text]):not(:has([slot=icon], [slot=avatar]))"] = 0;
    rules += ' -SqFa4c-ZObNfn18';
    currentRules["--iconWidth"] = "1lh";
    rules += ' -dcAs1c-ZaP94G18';
    currentRules["--badgePosition"] = "--iconWidth";
    rules += ' -dcAs1c-wAP22cZa18';
    currentRules["--badgePosition"] = typeof currentRules["--badgePosition"] === 'object' ? currentRules["--badgePosition"] : {
        "default": currentRules["--badgePosition"]
    };
    currentRules["--badgePosition"][":has([data-rsp-slot=text]):not(:has([slot=icon], [slot=avatar]))"] = "full";
    if (props.size === "XL") {
        rules += ' -F_-FBaYFfc18';
        currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
            "default": currentRules["height"]
        };
        currentRules["height"]["size === \"XL\""] = 48;
    } else if (props.size === "L") {
        rules += ' -F_-F3JjxG18';
        currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
            "default": currentRules["height"]
        };
        currentRules["height"]["size === \"L\""] = 40;
    } else if (props.size === "S") {
        rules += ' -F_-FCe2o8c18';
        currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
            "default": currentRules["height"]
        };
        currentRules["height"]["size === \"S\""] = 24;
    } else if (props.size === "XS") {
        rules += ' -F_-FifsFYc18';
        currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
            "default": currentRules["height"]
        };
        currentRules["height"]["size === \"XS\""] = 20;
    } else {
        rules += ' -F_-F4dY0ec18';
        currentRules["height"] = 32;
    }
    if (props.isStaticColor) {
        if (props.isSelected) {
            if (props.isDisabled) {
                if (props.isQuiet) {
                    rules += ' -g_-g918';
                    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                        "default": currentRules["backgroundColor"]
                    };
                    currentRules["backgroundColor"]["isStaticColor && isSelected && isDisabled && isQuiet"] = "transparent";
                } else {
                    rules += ' -g_-gf18';
                    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                        "default": currentRules["backgroundColor"]
                    };
                    currentRules["backgroundColor"]["isStaticColor && isSelected && isDisabled"] = "transparent-overlay-100";
                }
            } else {
                if (props.isPressed) {
                    rules += ' -g_-gj18';
                    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                        "default": currentRules["backgroundColor"]
                    };
                    currentRules["backgroundColor"]["isStaticColor && isSelected && isPressed"] = "transparent-overlay-800:pressed";
                } else if (props.isFocusVisible) {
                    rules += ' -g_-gj18';
                    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                        "default": currentRules["backgroundColor"]
                    };
                    currentRules["backgroundColor"]["isStaticColor && isSelected && isFocusVisible"] = "transparent-overlay-800:focused";
                } else if (props.isHovered) {
                    rules += ' -g_-gj18';
                    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                        "default": currentRules["backgroundColor"]
                    };
                    currentRules["backgroundColor"]["isStaticColor && isSelected && isHovered"] = "transparent-overlay-800:hovered";
                } else {
                    rules += ' -g_-gi18';
                    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                        "default": currentRules["backgroundColor"]
                    };
                    currentRules["backgroundColor"]["isStaticColor && isSelected"] = "transparent-overlay-800";
                }
            }
        } else if (props.isPressed) {
            rules += ' -g_-gg18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["isStaticColor && isPressed"] = "transparent-overlay-100:pressed";
        } else if (props.isFocusVisible) {
            rules += ' -g_-gg18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["isStaticColor && isFocusVisible"] = "transparent-overlay-100:focused";
        } else if (props.isHovered) {
            rules += ' -g_-gg18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["isStaticColor && isHovered"] = "transparent-overlay-100:hovered";
        } else if (props.isQuiet) {
            rules += ' -g_-g918';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["isStaticColor && isQuiet"] = "transparent";
        } else {
            rules += ' -g_-gf18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["isStaticColor"] = "transparent-overlay-100";
        }
    } else if (props.isSelected) {
        if (props.isDisabled) {
            if (props.isQuiet) {
                rules += ' -g_-g918';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["isSelected && isDisabled && isQuiet"] = "transparent";
            } else {
                rules += ' -g_-gH18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["isSelected && isDisabled"] = "gray-100";
            }
        } else if (props.isEmphasized) {
            if (props.isFocusVisible) {
                rules += ' -g_-gUgARdd18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["isSelected && isEmphasized && isFocusVisible"] = "[light-dark(light-dark(rgb(39, 77, 234), rgb(105, 149, 254)), light-dark(rgb(114, 158, 253), rgb(37, 73, 229)))]";
            } else if (props.isPressed) {
                rules += ' -g_-gUgARdd18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["isSelected && isEmphasized && isPressed"] = "[light-dark(light-dark(rgb(39, 77, 234), rgb(105, 149, 254)), light-dark(rgb(114, 158, 253), rgb(37, 73, 229)))]";
            } else if (props.isHovered) {
                rules += ' -g_-gUgARdd18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["isSelected && isEmphasized && isHovered"] = "[light-dark(light-dark(rgb(39, 77, 234), rgb(105, 149, 254)), light-dark(rgb(114, 158, 253), rgb(37, 73, 229)))]";
            } else {
                rules += ' -g_-g5qAiPc18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["isSelected && isEmphasized"] = "[light-dark(light-dark(rgb(59, 99, 251), rgb(86, 129, 255)), light-dark(rgb(93, 137, 255), rgb(52, 91, 248)))]";
            }
        } else {
            if (props.isPressed) {
                rules += ' -g_-gu18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["isSelected && isPressed"] = "neutral:pressed";
            } else if (props.isFocusVisible) {
                rules += ' -g_-gu18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["isSelected && isFocusVisible"] = "neutral:focused";
            } else if (props.isHovered) {
                rules += ' -g_-gu18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["isSelected && isHovered"] = "neutral:hovered";
            } else {
                rules += ' -g_-g018';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["isSelected"] = "neutral";
            }
        }
    } else {
        if (props.isPressed) {
            rules += ' -g_-gF18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["isPressed"] = "gray-100:pressed";
        } else if (props.isFocusVisible) {
            rules += ' -g_-gF18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["isFocusVisible"] = "gray-100:focused";
        } else if (props.isHovered) {
            rules += ' -g_-gF18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["isHovered"] = "gray-100:hovered";
        } else if (props.isQuiet) {
            rules += ' -g_-g918';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["isQuiet"] = "transparent";
        } else {
            rules += ' -g_-gH18';
            currentRules["backgroundColor"] = "gray-100";
        }
    }
    if (props.isSelected) {
        if (props.isDisabled) {
            rules += ' -g_-lOVIhfcg8qxrJ18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["forcedColors && isSelected && isDisabled"] = "ButtonFace";
        } else {
            rules += ' -g_-lOVIhfcgebS7sd18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["forcedColors && isSelected"] = "Highlight";
        }
    } else {
        rules += ' -g_-lOVIhfcg8qxrJ18';
        currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
            "default": currentRules["backgroundColor"]
        };
        currentRules["backgroundColor"]["forcedColors"] = "ButtonFace";
    }
    if (props.isSelected) {
        if (props.isDisabled) {
            rules += ' -g_-lOVIhfcg8qxrJ18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["isSelected && isDisabled && :is([data-hcm], [data-hcm] *)"] = "ButtonFace";
        } else {
            rules += ' -g_-lOVIhfcgebS7sd18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["isSelected && :is([data-hcm], [data-hcm] *)"] = "Highlight";
        }
    } else {
        rules += ' -g_-lOVIhfcg8qxrJ18';
        currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
            "default": currentRules["backgroundColor"]
        };
        currentRules["backgroundColor"][":is([data-hcm], [data-hcm] *)"] = "ButtonFace";
    }
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ActionButton.native.js:54:25";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ActionButton.native.js:54:25"
        };
    }
    return rules;
};
const $1d535efc4bf5a673$export$2ff682723a46d413 = (0, $3RlMb$createContext)(null);
function $1d535efc4bf5a673$export$cfc7921d29ef7b80(inputProps) {
    // oxlint-disable-next-line react/react-compiler
    let [contextProps, ref] = (0, $1NDEx.useSpectrumContextProps)(inputProps, (0, $3RlMb$untrack)(()=>inputProps.ref), $1d535efc4bf5a673$export$2ff682723a46d413);
    let props1 = (0, $5gcT0.useFormProps)(contextProps);
    let stringFormatter = (0, $jeZsY.useLocalizedStringFormatter)((0, $dBSpv.default), '@react-spectrum/s2');
    let isPending = ()=>props1.isPending ?? false;
    let holdAffordance = ()=>props1.holdAffordance;
    let domRef = (0, $eXdQ3.useFocusableRef)(ref);
    let overlayTriggerState = (0, $3RlMb$useContext)((0, $6tJ0n.OverlayTriggerStateContext));
    let ctx = (0, $3RlMb$createMemo)(()=>(0, $2A4az.useSlottedContext)((0, $kaciT.ActionButtonGroupContext)));
    let density = ()=>ctx()?.density ?? 'regular';
    let orientation = ()=>ctx()?.orientation ?? 'horizontal';
    let staticColor = ()=>ctx()?.staticColor ?? props1.staticColor;
    let isQuiet = ()=>ctx()?.isQuiet ?? props1.isQuiet;
    let size = ()=>ctx()?.size ?? (props1.size || 'M');
    let pendingState = (0, $k9l9B.usePendingState)(isPending);
    let locale = (0, $dnlDG.useLocale)();
    // oxlint-disable react/react-compiler
    return (0, $3RlMb$createComponent)((0, $2ZmcB.Button), (0, $3RlMb$mergeProps)(props1, {
        get isDisabled () {
            return props1.isDisabled ?? ctx()?.isDisabled;
        },
        ref: (value)=>{
            domRef.current = value;
        },
        get style () {
            return (0, $5seyF.pressScale)(domRef, props1.UNSAFE_style);
        },
        className: (renderProps)=>(props1.UNSAFE_className || '') + $1d535efc4bf5a673$export$446543cff2a0f496({
                ...renderProps,
                // Retain hover styles when an overlay is open.
                isHovered: renderProps.isHovered || overlayTriggerState?.isOpen || false,
                isDisabled: renderProps.isDisabled || pendingState.isProgressVisible,
                staticColor: staticColor(),
                isStaticColor: !!staticColor(),
                size: size(),
                isQuiet: isQuiet(),
                density: density(),
                isJustified: ctx()?.isJustified,
                orientation: orientation(),
                isInGroup: !!ctx()
            }, props1.styles),
        children: (renderProps)=>[
                (0, $3RlMb$createComponent)((0, $2A4az.Provider), {
                    get values () {
                        return [
                            [
                                (0, $esT6z.SkeletonContext),
                                null
                            ],
                            [
                                (0, $4fCJc.TextContext),
                                {
                                    get styles () {
                                        return function anonymous(props) {
                                            let rules = " ", currentRules = {};
                                            rules += ' zYoLErc18';
                                            currentRules["gridColumnStart"] = "text";
                                            rules += ' yYoLErc18';
                                            currentRules["gridColumnEnd"] = "text";
                                            rules += ' BYoLErc18';
                                            currentRules["gridRowStart"] = "text";
                                            rules += ' AYoLErc18';
                                            currentRules["gridRowEnd"] = "text";
                                            rules += ' _Nc18';
                                            currentRules["overflowX"] = "hidden";
                                            rules += ' Pc18';
                                            currentRules["overflowY"] = "hidden";
                                            rules += ' _Yb18';
                                            currentRules["textOverflow"] = "ellipsis";
                                            rules += ' _7c18';
                                            currentRules["whiteSpace"] = "nowrap";
                                            if (props.isProgressVisible) {
                                                rules += ' _6b18';
                                                currentRules["visibility"] = typeof currentRules["visibility"] === 'object' ? currentRules["visibility"] : {
                                                    "default": currentRules["visibility"]
                                                };
                                                currentRules["visibility"]["isProgressVisible"] = "hidden";
                                            }
                                            let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ActionButton.native.js:304:43";
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
                                                    loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ActionButton.native.js:304:43"
                                                };
                                            }
                                            return rules;
                                        }({
                                            isProgressVisible: pendingState.isProgressVisible
                                        });
                                    }
                                }
                            ],
                            [
                                (0, $9RJLv.IconContext),
                                {
                                    render: (0, $3BNNa.centerBaseline)({
                                        slot: 'icon',
                                        styles: " z2U5Crc18 y2U5Crc18 B2U5Crc18 A2U5Crc18 -macro-static-AZWJmd"
                                    }),
                                    get styles () {
                                        return function anonymous(props) {
                                            let rules = " ", currentRules = {};
                                            rules += ' ZObNfn18';
                                            currentRules["width"] = "1lh";
                                            rules += ' FObNfn18';
                                            currentRules["height"] = "1lh";
                                            rules += ' I67logd18';
                                            currentRules["marginStart"] = "--iconMargin";
                                            if (props.isProgressVisible) {
                                                rules += ' _6b18';
                                                currentRules["visibility"] = typeof currentRules["visibility"] === 'object' ? currentRules["visibility"] : {
                                                    "default": currentRules["visibility"]
                                                };
                                                currentRules["visibility"]["isProgressVisible"] = "hidden";
                                            }
                                            let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ActionButton.native.js:322:43";
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
                                                    loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ActionButton.native.js:322:43"
                                                };
                                            }
                                            return rules;
                                        }({
                                            isProgressVisible: pendingState.isProgressVisible
                                        });
                                    }
                                }
                            ],
                            [
                                (0, $2for9.AvatarContext),
                                {
                                    size: '1lh',
                                    styles: " I67logd18 z2U5Crc18 y2U5Crc18 B2U5Crc18 A2U5Crc18 -macro-static-GQsv9"
                                }
                            ],
                            [
                                (0, $3kDOI.ImageContext),
                                {
                                    get styles () {
                                        return function anonymous(props) {
                                            let rules = " ", currentRules = {};
                                            if (props.isProgressVisible) {
                                                rules += ' _6b18';
                                                currentRules["visibility"] = typeof currentRules["visibility"] === 'object' ? currentRules["visibility"] : {
                                                    "default": currentRules["visibility"]
                                                };
                                                currentRules["visibility"]["isProgressVisible"] = "hidden";
                                            }
                                            let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ActionButton.native.js:340:43";
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
                                                    loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ActionButton.native.js:340:43"
                                                };
                                            }
                                            return rules;
                                        }({
                                            isProgressVisible: pendingState.isProgressVisible
                                        });
                                    }
                                }
                            ],
                            [
                                (0, $k0dKS.NotificationBadgeContext),
                                {
                                    get staticColor () {
                                        return staticColor();
                                    },
                                    get size () {
                                        return props1.size === 'XS' ? undefined : props1.size;
                                    },
                                    get isDisabled () {
                                        return renderProps.isDisabled;
                                    },
                                    get styles () {
                                        return function anonymous(props) {
                                            let rules = " ", currentRules = {};
                                            rules += ' _Pa18';
                                            currentRules["position"] = "absolute";
                                            rules += ' WtedXZc18';
                                            currentRules["top"] = "--badgeTop";
                                            rules += ' JlZStSb18';
                                            currentRules["marginTop"] = "calc((self(height) * -1)/2)";
                                            rules += ' Ijgro3c18';
                                            currentRules["marginStart"] = "calc(var(--iconMargin) * 2 + (self(height) * -1)/4)";
                                            rules += ' z2mU18';
                                            currentRules["gridColumnStart"] = 1;
                                            rules += ' _A1IiWH18';
                                            currentRules["insetStart"] = "--badgePosition";
                                            if (props.isProgressVisible) {
                                                rules += ' _6b18';
                                                currentRules["visibility"] = typeof currentRules["visibility"] === 'object' ? currentRules["visibility"] : {
                                                    "default": currentRules["visibility"]
                                                };
                                                currentRules["visibility"]["isProgressVisible"] = "hidden";
                                            }
                                            let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ActionButton.native.js:359:43";
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
                                                    loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ActionButton.native.js:359:43"
                                                };
                                            }
                                            return rules;
                                        }({
                                            isProgressVisible: pendingState.isProgressVisible
                                        });
                                    }
                                }
                            ]
                        ];
                    },
                    get children () {
                        return [
                            (0, $3RlMb$memo)(()=>(0, $3RlMb$memo)(()=>typeof props1.children === 'string')() ? (0, $3RlMb$createComponent)((0, $4fCJc.Text), {
                                    get children () {
                                        return props1.children;
                                    }
                                }) : props1.children),
                            (0, $3RlMb$memo)(()=>(0, $3RlMb$memo)(()=>!!isPending())() ? (()=>{
                                    var _el$ = (0, $3RlMb$getNextElement)($1d535efc4bf5a673$var$_tmpl$);
                                    (0, $3RlMb$insert)(_el$, (0, $3RlMb$createComponent)((0, $gPqiz.ProgressCircle), {
                                        isIndeterminate: true,
                                        get "aria-label" () {
                                            return stringFormatter.format('actionbutton.pending');
                                        },
                                        size: "S",
                                        get staticColor () {
                                            return staticColor();
                                        },
                                        get styles () {
                                            return " ZObNfn18 FObNfn18 -macro-static-QBmhwc";
                                        }
                                    }));
                                    (0, $3RlMb$effect)(()=>(0, $3RlMb$readShallow)(function anonymous(props) {
                                            let rules = " ", currentRules = {};
                                            rules += ' _Pa18';
                                            currentRules["position"] = "absolute";
                                            rules += ' WF18';
                                            currentRules["top"] = "50%";
                                            rules += ' _EF18';
                                            currentRules["left"] = "50%";
                                            rules += ' _Zc18';
                                            currentRules["transform"] = "translate(-50%, -50%)";
                                            if (props.isProgressVisible) {
                                                rules += ' _6c18';
                                                currentRules["visibility"] = typeof currentRules["visibility"] === 'object' ? currentRules["visibility"] : {
                                                    "default": currentRules["visibility"]
                                                };
                                                currentRules["visibility"]["isProgressVisible"] = "visible";
                                            } else {
                                                rules += ' _6b18';
                                                currentRules["visibility"] = "hidden";
                                            }
                                            let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ActionButton.native.js:397:57";
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
                                                    loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ActionButton.native.js:397:57"
                                                };
                                            }
                                            return rules;
                                        }({
                                            isProgressVisible: pendingState.isProgressVisible,
                                            isPending: isPending()
                                        })), (_v$, _$p)=>{
                                        (0, $3RlMb$className)(_el$, _v$, _$p);
                                    });
                                    return _el$;
                                })() : isPending())
                        ];
                    }
                }),
                (0, $3RlMb$memo)(()=>(0, $3RlMb$memo)(()=>!!holdAffordance())() ? (0, $3RlMb$createComponent)((0, $jAA3o.default), {
                        get size () {
                            return (0, $3RlMb$memo)(()=>size() === 'XS')() ? 'S' : size();
                        },
                        get className () {
                            return function anonymous(props) {
                                let rules = " ", currentRules = {};
                                rules += ' _Pa18';
                                currentRules["position"] = "absolute";
                                if (props.size === "XL") {
                                    rules += ' _zbCyY5d18';
                                    currentRules["insetEnd"] = typeof currentRules["insetEnd"] === 'object' ? currentRules["insetEnd"] : {
                                        "default": currentRules["insetEnd"]
                                    };
                                    currentRules["insetEnd"]["size === \"XL\""] = "[calc(0.375 * var(--rem, 1rem))]";
                                } else if (props.size === "L") {
                                    rules += ' _zrEMFue18';
                                    currentRules["insetEnd"] = typeof currentRules["insetEnd"] === 'object' ? currentRules["insetEnd"] : {
                                        "default": currentRules["insetEnd"]
                                    };
                                    currentRules["insetEnd"]["size === \"L\""] = "[calc(0.3125 * var(--rem, 1rem))]";
                                } else if (props.size === "M") {
                                    rules += ' _zE18';
                                    currentRules["insetEnd"] = typeof currentRules["insetEnd"] === 'object' ? currentRules["insetEnd"] : {
                                        "default": currentRules["insetEnd"]
                                    };
                                    currentRules["insetEnd"]["size === \"M\""] = 4;
                                } else if (props.size === "S") {
                                    rules += ' _zflWog18';
                                    currentRules["insetEnd"] = typeof currentRules["insetEnd"] === 'object' ? currentRules["insetEnd"] : {
                                        "default": currentRules["insetEnd"]
                                    };
                                    currentRules["insetEnd"]["size === \"S\""] = "[calc(0.1875 * var(--rem, 1rem))]";
                                } else if (props.size === "XS") {
                                    rules += ' _zflWog18';
                                    currentRules["insetEnd"] = typeof currentRules["insetEnd"] === 'object' ? currentRules["insetEnd"] : {
                                        "default": currentRules["insetEnd"]
                                    };
                                    currentRules["insetEnd"]["size === \"XS\""] = "[calc(0.1875 * var(--rem, 1rem))]";
                                }
                                if (props.size === "XL") {
                                    rules += ' _lbCyY5d18';
                                    currentRules["bottom"] = typeof currentRules["bottom"] === 'object' ? currentRules["bottom"] : {
                                        "default": currentRules["bottom"]
                                    };
                                    currentRules["bottom"]["size === \"XL\""] = "[calc(0.375 * var(--rem, 1rem))]";
                                } else if (props.size === "L") {
                                    rules += ' _lrEMFue18';
                                    currentRules["bottom"] = typeof currentRules["bottom"] === 'object' ? currentRules["bottom"] : {
                                        "default": currentRules["bottom"]
                                    };
                                    currentRules["bottom"]["size === \"L\""] = "[calc(0.3125 * var(--rem, 1rem))]";
                                } else if (props.size === "M") {
                                    rules += ' _lE18';
                                    currentRules["bottom"] = typeof currentRules["bottom"] === 'object' ? currentRules["bottom"] : {
                                        "default": currentRules["bottom"]
                                    };
                                    currentRules["bottom"]["size === \"M\""] = 4;
                                } else if (props.size === "S") {
                                    rules += ' _lflWog18';
                                    currentRules["bottom"] = typeof currentRules["bottom"] === 'object' ? currentRules["bottom"] : {
                                        "default": currentRules["bottom"]
                                    };
                                    currentRules["bottom"]["size === \"S\""] = "[calc(0.1875 * var(--rem, 1rem))]";
                                } else if (props.size === "XS") {
                                    rules += ' _lflWog18';
                                    currentRules["bottom"] = typeof currentRules["bottom"] === 'object' ? currentRules["bottom"] : {
                                        "default": currentRules["bottom"]
                                    };
                                    currentRules["bottom"]["size === \"XS\""] = "[calc(0.1875 * var(--rem, 1rem))]";
                                }
                                if (props.direction === "rtl") {
                                    rules += ' -Z4Pn4c-a18';
                                    currentRules["scaleX"] = typeof currentRules["scaleX"] === 'object' ? currentRules["scaleX"] : {
                                        "default": currentRules["scaleX"]
                                    };
                                    currentRules["scaleX"]["direction === \"rtl\""] = -1;
                                    rules += ' __Ha18';
                                    currentRules["scaleX"] = typeof currentRules["scaleX"] === 'object' ? currentRules["scaleX"] : {
                                        "default": currentRules["scaleX"]
                                    };
                                    currentRules["scaleX"]["direction === \"rtl\""] = -1;
                                }
                                let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ActionButton.native.js:420:27";
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
                                        loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ActionButton.native.js:420:27"
                                    };
                                }
                                return rules;
                            }({
                                direction: locale.direction,
                                size: size()
                            });
                        }
                    }) : holdAffordance())
            ]
    }));
// oxlint-enable react/react-compiler
}

});
parcelRegister("2for9", function(module, exports) {

$parcel$export(module.exports, "AvatarContext", function () { return $1a2ff02647122ccf$export$a20dad690e1279e2; });
$parcel$export(module.exports, "Avatar", function () { return $1a2ff02647122ccf$export$e2255cf6045e8d47; });


var $3BNNa = parcelRequire("3BNNa");

parcelRequire("bAtJj");
var $5gAIA = parcelRequire("5gAIA");

var $3kDOI = parcelRequire("3kDOI");

var $eXdQ3 = parcelRequire("eXdQ3");

var $1NDEx = parcelRequire("1NDEx");
const $1a2ff02647122ccf$var$imageStyles = function anonymous(props, overrides) {
    let rules = " ", currentRules = {};
    let flexShrink = false;
    let flexGrow = false;
    let matches = String(overrides || '').matchAll(/(?:^|\s)(J|G|I|H|_u|_v|_s|__A|_d|_J|z|y|B|A|_P|_9|W|_l|_A|_z|_6|-macro\$)[^\s]+/g);
    for (let p of matches){
        if (p[1] === "_v") flexShrink = true;
        if (p[1] === "_u") flexGrow = true;
        rules += p[0];
    }
    rules += ' sd18';
    currentRules["display"] = "flex";
    rules += ' eb18';
    currentRules["alignItems"] = "center";
    rules += ' og18';
    currentRules["borderTopStartRadius"] = "full";
    rules += ' ng18';
    currentRules["borderTopEndRadius"] = "full";
    rules += ' kg18';
    currentRules["borderBottomStartRadius"] = "full";
    rules += ' jg18';
    currentRules["borderBottomEndRadius"] = "full";
    rules += ' ZifsFYc18';
    currentRules["width"] = 20;
    rules += ' FifsFYc18';
    currentRules["height"] = 20;
    if (!flexShrink) rules += ' _va18';
    currentRules["flexShrink"] = 0;
    if (!flexGrow) rules += ' _ua18';
    currentRules["flexGrow"] = 0;
    rules += ' __ca18';
    currentRules["disableTapHighlight"] = true;
    if (props.isOverBackground) {
        rules += ' _Lf18';
        currentRules["outlineStyle"] = typeof currentRules["outlineStyle"] === 'object' ? currentRules["outlineStyle"] : {
            "default": currentRules["outlineStyle"]
        };
        currentRules["outlineStyle"]["isOverBackground"] = "solid";
    } else {
        rules += ' _Le18';
        currentRules["outlineStyle"] = "none";
    }
    rules += ' OEzkoQe18';
    currentRules["outlineColor"] = "--s2-container-bg";
    if (props.isLH) {
        rules += ' _MBJrsse18';
        currentRules["outlineWidth"] = typeof currentRules["outlineWidth"] === 'object' ? currentRules["outlineWidth"] : {
            "default": currentRules["outlineWidth"]
        };
        currentRules["outlineWidth"]["isLH"] = "min(2px, max(1px, calc((((1lh / 64) - 1px) * 9999) + 1px)))";
    } else if (props.isLarge) {
        rules += ' _Mc18';
        currentRules["outlineWidth"] = typeof currentRules["outlineWidth"] === 'object' ? currentRules["outlineWidth"] : {
            "default": currentRules["outlineWidth"]
        };
        currentRules["outlineWidth"]["isLarge"] = 2;
    } else {
        rules += ' _Mb18';
        currentRules["outlineWidth"] = 1;
    }
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Avatar.native.js:23:20";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Avatar.native.js:23:20"
        };
    }
    return rules;
};
const $1a2ff02647122ccf$export$a20dad690e1279e2 = (0, $3RlMb$createContext)(null);
function $1a2ff02647122ccf$export$e2255cf6045e8d47(inputProps) {
    let [props, ref] = (0, $1NDEx.useSpectrumContextProps)(inputProps, (0, $3RlMb$untrack)(()=>inputProps.ref), $1a2ff02647122ccf$export$a20dad690e1279e2);
    let domRef = (0, $eXdQ3.useDOMRef)(ref);
    let otherProps = (0, $3RlMb$omit)(props, 'alt', 'src', 'UNSAFE_style', 'UNSAFE_className', 'size', 'isOverBackground', 'slot', 'ref');
    const domProps = (0, $5gAIA.filterDOMProps)(otherProps);
    // In the docs build, we need to be able to simulate font scaling.
    let sizeInfo = (0, $3RlMb$createMemo)(()=>{
        let size = props.size ?? 24;
        let remSize;
        let isLarge = false;
        let isLH = false;
        if (typeof size === 'string') {
            remSize = size;
            isLH = size.endsWith('lh');
        } else {
            remSize = `calc(${size / 16} * var(--rem, 1rem))`;
            isLarge = size >= 64;
        }
        return {
            remSize: remSize,
            isLarge: isLarge,
            isLH: isLH
        };
    });
    return (0, $3RlMb$createComponent)((0, $3kDOI.ImageContext), {
        value: {},
        get children () {
            return (0, $3RlMb$createComponent)((0, $3kDOI.Image), (0, $3RlMb$mergeProps)(domProps, {
                ref: (node)=>domRef(node),
                get slot () {
                    return props.slot ?? 'avatar';
                },
                get alt () {
                    return props.alt ?? '';
                },
                get UNSAFE_style () {
                    return {
                        ...props.UNSAFE_style,
                        width: sizeInfo().remSize,
                        height: sizeInfo().remSize
                    };
                },
                get UNSAFE_className () {
                    return (props.UNSAFE_className ?? '') + ' ' + (0, $3BNNa.centerBaselineBefore);
                },
                get styles () {
                    return $1a2ff02647122ccf$var$imageStyles({
                        isOverBackground: props.isOverBackground,
                        isLarge: sizeInfo().isLarge,
                        isLH: sizeInfo().isLH
                    }, props.styles);
                },
                get src () {
                    return props.src;
                }
            }));
        }
    });
}

});
parcelRegister("3BNNa", function(module, exports) {

$parcel$export(module.exports, "centerBaselineBefore", function () { return $2a0b736edbe29175$export$179e9489a09b14ac; });
$parcel$export(module.exports, "centerBaseline", function () { return $2a0b736edbe29175$export$9d7e2342a7e53afa; });

parcelRequire("bAtJj");
var $5gAIA = parcelRequire("5gAIA");

var $cJuZp = parcelRequire("cJuZp");
var $2a0b736edbe29175$var$_tmpl$ = /*#__PURE__*/ (0, $3RlMb$template)(`<div>`);
const $2a0b736edbe29175$var$styles = " sd18 eb18 -macro-static-UwrWLe";
function $2a0b736edbe29175$export$768dac55bb57081d(props) {
    let domProps = (0, $5gAIA.filterDOMProps)(props);
    var _el$ = (0, $3RlMb$getNextElement)($2a0b736edbe29175$var$_tmpl$);
    (0, $3RlMb$spread)(_el$, [
        domProps,
        {
            get slot () {
                return props.slot;
            },
            get style () {
                return props.style;
            },
            get "class" () {
                return (0, $cJuZp.mergeStyles)($2a0b736edbe29175$var$styles, props.styles) + ' ' + $2a0b736edbe29175$export$179e9489a09b14ac;
            }
        }
    ], true);
    (0, $3RlMb$insert)(_el$, (0, $3RlMb$scope)(()=>props.children));
    (0, $3RlMb$runHydrationEvents)();
    return _el$;
}
const $2a0b736edbe29175$export$179e9489a09b14ac = "FRGfhd";
function $2a0b736edbe29175$export$9d7e2342a7e53afa(props = {}) {
    return (icon)=>(0, $3RlMb$createComponent)($2a0b736edbe29175$export$768dac55bb57081d, (0, $3RlMb$mergeProps)(props, {
            children: icon
        }));
}

});

parcelRegister("3kDOI", function(module, exports) {

$parcel$export(module.exports, "ImageContext", function () { return $26d2202ec5ab80cc$export$8151eb379fcf2442; });
$parcel$export(module.exports, "Image", function () { return $26d2202ec5ab80cc$export$3e431a229df88919; });


var $4SbjT = parcelRequire("4SbjT");


var $6p9dH = parcelRequire("6p9dH");

var $6VqtR = parcelRequire("6VqtR");

var $esT6z = parcelRequire("esT6z");

var $cJuZp = parcelRequire("cJuZp");

var $1NDEx = parcelRequire("1NDEx");
var $26d2202ec5ab80cc$var$_tmpl$ = /*#__PURE__*/ (0, $3RlMb$template)(`<img>`, 1), $26d2202ec5ab80cc$var$_tmpl$2 = /*#__PURE__*/ (0, $3RlMb$template)(`<div><!$><!/><!$><!/>`), $26d2202ec5ab80cc$var$_tmpl$3 = /*#__PURE__*/ (0, $3RlMb$template)(`<picture><!$><!/><!$><!/>`), $26d2202ec5ab80cc$var$_tmpl$4 = /*#__PURE__*/ (0, $3RlMb$template)(`<source>`);
const $26d2202ec5ab80cc$export$8151eb379fcf2442 = (0, $3RlMb$createContext)(null);
function $26d2202ec5ab80cc$var$createState(src) {
    return {
        state: 'loading',
        src: src,
        startTime: Date.now(),
        loadTime: 0
    };
}
function $26d2202ec5ab80cc$var$reducer(state, action) {
    switch(action.type){
        case 'update':
            return {
                state: 'loading',
                src: action.src,
                startTime: Date.now(),
                loadTime: 0
            };
        case 'loaded':
        case 'error':
            return {
                ...state,
                state: action.type
            };
        case 'revealed':
            return {
                ...state,
                state: 'revealed',
                loadTime: Date.now() - state.startTime
            };
        default:
            return state;
    }
}
const $26d2202ec5ab80cc$var$wrapperStyles = " gH18 _Nc18 Pc18 -macro-static-g1owt";
const $26d2202ec5ab80cc$var$imgStyles = function anonymous(props) {
    let rules = " ", currentRules = {};
    rules += ' sb18';
    currentRules["display"] = "block";
    rules += ' Za18';
    currentRules["width"] = "full";
    rules += ' Fb18';
    currentRules["height"] = "full";
    rules += ' _H40ub4c18';
    currentRules["objectFit"] = "inherit";
    rules += ' __D40ub4c18';
    currentRules["objectPosition"] = "inherit";
    if (props.isRevealed) {
        rules += ' _Ib18';
        currentRules["opacity"] = typeof currentRules["opacity"] === 'object' ? currentRules["opacity"] : {
            "default": currentRules["opacity"]
        };
        currentRules["opacity"]["isRevealed"] = 1;
    } else {
        rules += ' _Ia18';
        currentRules["opacity"] = 0;
    }
    if (props.isTransitioning) {
        rules += ' Yf18';
        currentRules["transition"] = typeof currentRules["transition"] === 'object' ? currentRules["transition"] : {
            "default": currentRules["transition"]
        };
        currentRules["transition"]["isTransitioning"] = "opacity";
    } else {
        rules += ' Ye18';
        currentRules["transition"] = "none";
    }
    rules += ' Xe18';
    currentRules["transitionDuration"] = 500;
    if (props.isTransitioning) {
        rules += ' _2b18';
        currentRules["transitionTimingFunction"] = typeof currentRules["transitionTimingFunction"] === 'object' ? currentRules["transitionTimingFunction"] : {
            "default": currentRules["transitionTimingFunction"]
        };
        currentRules["transitionTimingFunction"]["isTransitioning"] = "default";
    } else {
        rules += ' _2b18';
        currentRules["transitionTimingFunction"] = "default";
    }
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Image.native.js:69:18";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Image.native.js:69:18"
        };
    }
    return rules;
};
function $26d2202ec5ab80cc$export$3e431a229df88919(inputProps) {
    let [props, domRef] = (0, $1NDEx.useSpectrumContextProps)(inputProps, (0, $3RlMb$untrack)(()=>inputProps.ref), $26d2202ec5ab80cc$export$8151eb379fcf2442);
    let hidden = ()=>props.hidden;
    let srcProp = ()=>props.src ?? '';
    let colorScheme = (0, $3RlMb$createMemo)(()=>(0, $3RlMb$useContext)((0, $4SbjT.ColorSchemeContext)));
    let cacheKey = (0, $3RlMb$createMemo)(()=>{
        let src = srcProp();
        return typeof src === 'object' ? JSON.stringify(src) : src;
    });
    let group = (0, $3RlMb$createMemo)(()=>(0, $3RlMb$useContext)(props.group ?? (0, $6VqtR.DefaultImageGroup)));
    let [state, setState] = (0, $3RlMb$createSignal)((0, $3RlMb$untrack)(()=>$26d2202ec5ab80cc$var$createState(cacheKey())));
    let dispatch = (action)=>setState((previous)=>$26d2202ec5ab80cc$var$reducer(previous, action));
    (0, $3RlMb$createEffect)(()=>({
            key: cacheKey(),
            hidden: hidden()
        }), ({ key: key, hidden: hidden })=>{
        if (!hidden && key !== (0, $3RlMb$untrack)(state).src) dispatch({
            type: 'update',
            src: key
        });
    });
    (0, $3RlMb$createEffect)(()=>({
            state: state().state,
            revealAll: group().revealAll,
            hidden: hidden()
        }), (value)=>{
        if (value.state === 'loaded' && value.revealAll && !value.hidden) dispatch({
            type: 'revealed'
        });
    });
    let imgRef = (0, $6p9dH.useObjectRef)();
    (0, $3RlMb$createEffect)(()=>({
            key: cacheKey(),
            hidden: hidden(),
            group: group()
        }), (value)=>{
        if (value.hidden) return;
        value.group.register(value.key);
        return ()=>value.group.unregister(value.key);
    });
    let onLoad = ()=>{
        group().load(cacheKey());
        dispatch({
            type: 'loaded'
        });
    };
    let onError = ()=>{
        dispatch({
            type: 'error'
        });
        group().unregister(cacheKey());
    };
    let isSkeleton = (0, $esT6z.useIsSkeleton)();
    let isAnimating = ()=>isSkeleton() || state().state === 'loading' || state().state === 'loaded';
    let animation = (0, $esT6z.useLoadingAnimation)(isAnimating);
    let disposed = false;
    (0, $3RlMb$onCleanup)(()=>{
        disposed = true;
    });
    (0, $3RlMb$createEffect)(()=>({
            hidden: hidden(),
            img: imgRef.current,
            node: domRef.current,
            state: state().state,
            key: cacheKey(),
            animating: isAnimating()
        }), (value)=>{
        if (value.hidden) return;
        (0, $3RlMb$onSettled)(()=>{
            // Cached-image checks run after native host attachment, under this owner.
            // Source's queued production check is retained without React act globals.
            if (value.state === 'loading' && value.img?.complete) queueMicrotask(()=>{
                if (disposed || imgRef.current !== value.img || hidden() || cacheKey() !== value.key) return;
                if (value.img.naturalWidth === 0 && value.img.naturalHeight === 0) onError();
                else onLoad();
            });
            animation(value.node);
        });
    });
    (0, $3RlMb$createEffect)(()=>props.alt, (alt)=>{
        alt;
    });
    let errorState = (0, $3RlMb$createMemo)(()=>!isSkeleton() && state().state === 'error' && props.renderError?.());
    let isRevealed = ()=>state().state === 'revealed' && !isSkeleton();
    let isTransitioning = ()=>isRevealed() && state().loadTime > 200;
    let renderImage = ()=>(()=>{
            var _el$ = (0, $3RlMb$getNextElement)($26d2202ec5ab80cc$var$_tmpl$);
            _el$.addEventListener("error", onError);
            _el$.addEventListener("load", onLoad);
            var _ref$ = imgRef;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $3RlMb$ref)(()=>_ref$, _el$) : imgRef = _el$;
            (0, $3RlMb$effect)(()=>({
                    e: props.fetchPriority,
                    t: typeof srcProp() === 'string' && srcProp() ? srcProp() : undefined,
                    a: props.alt,
                    o: props.crossOrigin,
                    i: props.decoding,
                    n: props.loading,
                    s: props.referrerPolicy,
                    h: props.width,
                    r: props.height,
                    d: props.itemProp,
                    l: (0, $3RlMb$readShallow)($26d2202ec5ab80cc$var$imgStyles({
                        isRevealed: isRevealed(),
                        isTransitioning: isTransitioning()
                    }))
                }), ({ e: e, t: t, a: a, o: o, i: i, n: n, s: s, h: h, r: r, d: d, l: l }, _p$)=>{
                e !== _p$?.e && (0, $3RlMb$setAttribute)(_el$, "fetchpriority", e);
                t !== _p$?.t && (0, $3RlMb$setAttribute)(_el$, "src", t);
                a !== _p$?.a && (0, $3RlMb$setAttribute)(_el$, "alt", a);
                o !== _p$?.o && (0, $3RlMb$setAttribute)(_el$, "crossorigin", o);
                i !== _p$?.i && (0, $3RlMb$setAttribute)(_el$, "decoding", i);
                n !== _p$?.n && (0, $3RlMb$setAttribute)(_el$, "loading", n);
                s !== _p$?.s && (0, $3RlMb$setAttribute)(_el$, "referrerpolicy", s);
                h !== _p$?.h && (0, $3RlMb$setAttribute)(_el$, "width", h);
                r !== _p$?.r && (0, $3RlMb$setAttribute)(_el$, "height", r);
                d !== _p$?.d && (0, $3RlMb$setAttribute)(_el$, "itemprop", d);
                (0, $3RlMb$className)(_el$, l, _p$?.l);
            });
            return _el$;
        })();
    return (0, $3RlMb$memo)(()=>(0, $3RlMb$memo)(()=>!hidden())() && (()=>{
            var _el$2 = (0, $3RlMb$getNextElement)($26d2202ec5ab80cc$var$_tmpl$2), _el$3 = _el$2.firstChild, [_el$4, _co$] = (0, $3RlMb$getNextMarker)(_el$3.nextSibling), _el$5 = _el$4.nextSibling, [_el$6, _co$2] = (0, $3RlMb$getNextMarker)(_el$5.nextSibling);
            var _ref$2 = domRef;
            typeof _ref$2 === "function" || Array.isArray(_ref$2) ? (0, $3RlMb$ref)(()=>_ref$2, _el$2) : domRef = _el$2;
            (0, $3RlMb$insert)(_el$2, (0, $3RlMb$scope)(()=>errorState()), _el$4, _co$);
            (0, $3RlMb$insert)(_el$2, (0, $3RlMb$scope)((()=>{
                var _c$ = (0, $3RlMb$memo)(()=>!errorState());
                return ()=>_c$() && (Array.isArray(srcProp()) ? (()=>{
                        var _el$7 = (0, $3RlMb$getNextElement)($26d2202ec5ab80cc$var$_tmpl$3), _el$8 = _el$7.firstChild, [_el$9, _co$3] = (0, $3RlMb$getNextMarker)(_el$8.nextSibling), _el$0 = _el$9.nextSibling, [_el$1, _co$4] = (0, $3RlMb$getNextMarker)(_el$0.nextSibling);
                        (0, $3RlMb$insert)(_el$7, (0, $3RlMb$createComponent)((0, $3RlMb$For), {
                            get each () {
                                return srcProp();
                            },
                            keyed: false,
                            children: (source)=>{
                                let sourceProps = (0, $3RlMb$omit)((0, $3RlMb$merge)(source), 'colorScheme', 'srcSet');
                                let sourceColorScheme = ()=>source().colorScheme;
                                return (0, $3RlMb$memo)(()=>(0, $3RlMb$memo)(()=>!!(!sourceColorScheme() || !colorScheme() || colorScheme() === 'light dark' || sourceColorScheme() === colorScheme()))() ? (()=>{
                                        var _el$10 = (0, $3RlMb$getNextElement)($26d2202ec5ab80cc$var$_tmpl$4);
                                        (0, $3RlMb$spread)(_el$10, [
                                            sourceProps,
                                            {
                                                get srcset () {
                                                    return source().srcSet;
                                                },
                                                get media () {
                                                    return sourceColorScheme() && (!colorScheme() || colorScheme() === 'light dark') ? `${source().media ? `${source().media} and ` : ''}(prefers-color-scheme: ${sourceColorScheme()})` : source().media;
                                                }
                                            }
                                        ], false);
                                        (0, $3RlMb$runHydrationEvents)();
                                        return _el$10;
                                    })() : null);
                            }
                        }), _el$9, _co$3);
                        (0, $3RlMb$insert)(_el$7, (0, $3RlMb$scope)(()=>renderImage()), _el$1, _co$4);
                        (0, $3RlMb$effect)(()=>(0, $3RlMb$readShallow)(" _H40ub4c18 __D40ub4c18 -macro-static-CqXRF"), (_v$, _$p)=>{
                            (0, $3RlMb$className)(_el$7, _v$, _$p);
                        });
                        return _el$7;
                    })() : renderImage());
            })()), _el$6, _co$2);
            (0, $3RlMb$effect)(()=>({
                    e: props.slot || undefined,
                    t: (0, $3RlMb$readShallow)(props.UNSAFE_style),
                    a: (props.UNSAFE_className ?? '') + (0, $cJuZp.mergeStyles)($26d2202ec5ab80cc$var$wrapperStyles, props.styles) + ' ' + (isAnimating() ? (0, $esT6z.loadingStyle) : '')
                }), ({ e: e, t: t, a: a }, _p$)=>{
                e !== _p$?.e && (0, $3RlMb$setAttribute)(_el$2, "slot", e);
                (0, $3RlMb$style)(_el$2, t, _p$?.t);
                (0, $3RlMb$className)(_el$2, a, _p$?.a);
            });
            return _el$2;
        })());
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
const $38c4fc7450edae36$export$374e0245597d19a3 = (0, $3RlMb$createContext)(null);
function $38c4fc7450edae36$export$2881499e37b75b9a(props) {
    let parentColorScheme = (0, $3RlMb$useContext)($38c4fc7450edae36$export$374e0245597d19a3);
    let content = ()=>(0, $3RlMb$createComponent)($38c4fc7450edae36$export$374e0245597d19a3, {
            get value () {
                return props.colorScheme || parentColorScheme;
            },
            get children () {
                return (0, $3RlMb$createComponent)($38c4fc7450edae36$var$ProviderInner, props);
            }
        });
    let localizedContent = ()=>props.locale ? (0, $3RlMb$createComponent)((0, $dnlDG.I18nProvider), {
            get locale () {
                return props.locale;
            },
            get children () {
                return content();
            }
        }) : content();
    return (0, $3RlMb$memo)(()=>(0, $3RlMb$memo)(()=>!!props.router)() ? (0, $3RlMb$createComponent)((0, $fNnwP.RouterProvider), (0, $3RlMb$mergeProps)(()=>props.router, {
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
    let Element = (0, $3RlMb$dynamic)(()=>props.elementType || 'div');
    return (0, $3RlMb$createComponent)(Element, (0, $3RlMb$mergeProps)(()=>(0, $5gAIA.filterDOMProps)(props), {
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
                (0, $3RlMb$createComponent)((0, $hL2UH.Fonts), {}),
                (0, $3RlMb$memo)(()=>props.children)
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
    (0, $3RlMb$useHead)(()=>{
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
    (0, $3RlMb$createEffect)(script, (src)=>{
        if (!src) return;
        let scriptEl = Array.from(document.scripts).find((s)=>s.src === src);
        if (scriptEl) {
            let onLoad = ()=>{
                let typekit = window.Typekit;
                if (typeof typekit !== 'undefined' && typeof typekit.load === 'function') typekit.load();
            };
            scriptEl.addEventListener('load', onLoad);
            (0, $3RlMb$onCleanup)(()=>scriptEl.removeEventListener('load', onLoad));
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



parcelRegister("6VqtR", function(module, exports) {

$parcel$export(module.exports, "DefaultImageGroup", function () { return $50ac9b7193eef459$export$a37e899304e5fef0; });


const $50ac9b7193eef459$var$defaultContext = {
    revealAll: true,
    register () {},
    unregister () {},
    load () {}
};
const $50ac9b7193eef459$export$a37e899304e5fef0 = $50ac9b7193eef459$export$c991cd1e9f87d921();
function $50ac9b7193eef459$export$c991cd1e9f87d921() {
    return (0, $3RlMb$createContext)($50ac9b7193eef459$var$defaultContext);
}
function $50ac9b7193eef459$var$reducer(state, action) {
    switch(action.type){
        case 'register':
            if (state.loaded.get(action.url) !== false) {
                let loaded = new Map(state.loaded);
                loaded.set(action.url, false);
                return {
                    loadedAll: false,
                    // If we had previously loaded all items, then reset the timed out state
                    // since this is the first item of a new batch.
                    timedOut: state.loadedAll ? false : state.timedOut,
                    loadStartTime: state.loadedAll ? Date.now() : state.loadStartTime,
                    loaded: loaded
                };
            }
            return state;
        case 'unregister':
            if (state.loaded.has(action.url)) {
                let loaded = new Map(state.loaded);
                loaded.delete(action.url);
                return {
                    loadedAll: $50ac9b7193eef459$var$isAllLoaded(loaded),
                    timedOut: state.timedOut,
                    loadStartTime: state.loadStartTime,
                    loaded: loaded
                };
            }
            return state;
        case 'load':
            if (state.loaded.get(action.url) === false) {
                let loaded = new Map(state.loaded);
                loaded.set(action.url, true);
                return {
                    loadedAll: $50ac9b7193eef459$var$isAllLoaded(loaded),
                    timedOut: state.timedOut,
                    loadStartTime: state.loadStartTime,
                    loaded: loaded
                };
            }
            return state;
        case 'timeout':
            if (!state.loadedAll && !state.timedOut) return {
                ...state,
                timedOut: true
            };
            return state;
        default:
            return state;
    }
}
function $50ac9b7193eef459$var$isAllLoaded(loaded) {
    for (let isLoaded of loaded.values()){
        if (!isLoaded) return false;
    }
    return true;
}
function $50ac9b7193eef459$export$1b926c015f09611d(props) {
    // If we are already inside another ImageCoordinator, just pass
    // through children and coordinate loading at the root.
    let ctx = (0, $3RlMb$createMemo)(()=>(0, $3RlMb$useContext)(props.group || $50ac9b7193eef459$export$a37e899304e5fef0));
    return (0, $3RlMb$memo)(()=>(0, $3RlMb$memo)(()=>ctx() !== $50ac9b7193eef459$var$defaultContext)() ? props.children : (0, $3RlMb$createComponent)($50ac9b7193eef459$var$ImageCoordinatorRoot, props));
}
function $50ac9b7193eef459$var$ImageCoordinatorRoot(props) {
    let [state, setState] = (0, $3RlMb$createSignal)({
        loadedAll: true,
        timedOut: false,
        loadStartTime: 0,
        loaded: new Map()
    });
    let dispatch = (action)=>setState((previous)=>$50ac9b7193eef459$var$reducer(previous, action));
    let register = (url)=>{
        dispatch({
            type: 'register',
            url: url
        });
    };
    let unregister = (url)=>{
        dispatch({
            type: 'unregister',
            url: url
        });
    };
    let load = (url)=>{
        dispatch({
            type: 'load',
            url: url
        });
    };
    (0, $3RlMb$createEffect)(()=>({
            loadedAll: state().loadedAll,
            loadStartTime: state().loadStartTime,
            timeout: props.timeout ?? 5000
        }), ({ loadedAll: loadedAll, loadStartTime: loadStartTime, timeout: timeout })=>{
        if (!loadedAll) {
            let timeoutId = setTimeout(()=>{
                dispatch({
                    type: 'timeout'
                });
            }, loadStartTime + timeout - Date.now());
            return ()=>clearTimeout(timeoutId);
        }
    });
    let Group = (0, $3RlMb$dynamic)(()=>props.group || $50ac9b7193eef459$export$a37e899304e5fef0);
    let value = {
        get revealAll () {
            return state().loadedAll || state().timedOut;
        },
        register: register,
        unregister: unregister,
        load: load
    };
    return (0, $3RlMb$createComponent)(Group, {
        value: value,
        get children () {
            return props.children;
        }
    });
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
var $a87e6cec5d101a93$var$_tmpl$ = /*#__PURE__*/ (0, $3RlMb$template)(`<span>`);
function $a87e6cec5d101a93$export$6b288fe07640c94c(isAnimating) {
    let animationRef = null;
    let [element, setElement] = (0, $3RlMb$createSignal)(null);
    let reduceMotion = (0, $5OYjY.useMediaQuery)('(prefers-reduced-motion: reduce)');
    (0, $3RlMb$createEffect)(()=>({
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
    (0, $3RlMb$onCleanup)(()=>animationRef?.cancel());
    return (element)=>{
        setElement(element);
    };
}
const $a87e6cec5d101a93$export$74e166679b1f49ee = (0, $3RlMb$createContext)(null);
function $a87e6cec5d101a93$export$4f8dc7555740235c() {
    return (0, $3RlMb$createMemo)(()=>(0, $3RlMb$useContext)($a87e6cec5d101a93$export$74e166679b1f49ee) || false);
}
function $a87e6cec5d101a93$export$8f31e4c4a37b8e9c(props) {
    // Disable all form components inside a skeleton.
    return (0, $3RlMb$createComponent)($a87e6cec5d101a93$export$74e166679b1f49ee, {
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
        ()=>isSkeleton() ? (0, $3RlMb$createComponent)($a87e6cec5d101a93$export$cb6ddd830302c2a8, {
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
    var _el$ = (0, $3RlMb$getNextElement)($a87e6cec5d101a93$var$_tmpl$);
    var _ref$ = $a87e6cec5d101a93$export$6b288fe07640c94c(true);
    (typeof _ref$ === "function" || Array.isArray(_ref$)) && (0, $3RlMb$ref)(()=>_ref$, _el$);
    (0, $3RlMb$insert)(_el$, (0, $3RlMb$scope)(()=>props.children));
    (0, $3RlMb$effect)(()=>({
            e: (0, $f8FiF.inertValue)(true),
            t: $a87e6cec5d101a93$export$d2353276f167b21f + " pw18 _ma18 oR3ltQc18 nR3ltQc18 kR3ltQc18 jR3ltQc18 -macro-static-2uZMFe"
        }), ({ e: e, t: t }, _p$)=>{
        e !== _p$?.e && (0, $3RlMb$setAttribute)(_el$, "inert", e);
        (0, $3RlMb$className)(_el$, t, _p$?.t);
    });
    return _el$;
}
function $a87e6cec5d101a93$export$6069cbe61f690103(props) {
    let isLoading = (0, $3RlMb$createMemo)(()=>(0, $3RlMb$useContext)($a87e6cec5d101a93$export$74e166679b1f49ee));
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
    return (0, $3RlMb$createComponent)($a87e6cec5d101a93$export$74e166679b1f49ee, {
        value: null,
        get children () {
            return props.children(overrides);
        }
    });
}
// Adds default border radius around icons when displayed in a skeleton.
const $a87e6cec5d101a93$var$skeletonIconStyle = " oR3ltQc18 nR3ltQc18 kR3ltQc18 jR3ltQc18 -macro-static-aBGxE";
function $a87e6cec5d101a93$export$4b7803c08fe9a32b(styles) {
    return (0, $3RlMb$useContext)($a87e6cec5d101a93$export$74e166679b1f49ee) ? (0, $cJuZp.mergeStyles)($a87e6cec5d101a93$var$skeletonIconStyle, styles) : styles || '';
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
    let [matches, setMatches] = (0, $3RlMb$createSignal)(supportsMatchMedia ? window.matchMedia(query).matches : false);
    (0, $3RlMb$createEffect)(()=>query, (query)=>{
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
    (0, $3RlMb$onSettled)(()=>(0, $6p9dH.attachRef)(typeof ref === 'function' ? ref : undefined, $ae314f6cf80336a8$export$a5795cc979dfae80(domRef)));
    return domRef;
}
function $ae314f6cf80336a8$export$96a734597687c040(ref, focusableRef) {
    let domRef = (0, $6p9dH.useObjectRef)();
    (0, $3RlMb$onSettled)(()=>(0, $6p9dH.attachRef)(typeof ref === 'function' ? ref : undefined, $ae314f6cf80336a8$export$79d69eee6ae4b329(domRef, focusableRef)));
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


parcelRegister("h5JLT", function(module, exports) {

$parcel$export(module.exports, "Button", function () { return (parcelRequire("2ZmcB")).Button; });
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
var $2ZmcB = parcelRequire("2ZmcB");

});
parcelRegister("2ZmcB", function(module, exports) {

$parcel$export(module.exports, "ButtonContext", function () { return $22d2802c3c47d0c8$export$24d547caef80ccd1; });
$parcel$export(module.exports, "Button", function () { return $22d2802c3c47d0c8$export$353f5b6fc5456de1; });


var $imHDx = parcelRequire("imHDx");

var $8ByXH = parcelRequire("8ByXH");

var $2A4az = parcelRequire("2A4az");

var $7A3TT = parcelRequire("7A3TT");
parcelRequire("bAtJj");
var $5gAIA = parcelRequire("5gAIA");
parcelRequire("2iotZ");
var $7boJ2 = parcelRequire("7boJ2");

var $broa7 = parcelRequire("broa7");


var $6p9dH = parcelRequire("6p9dH");

var $9HiNI = parcelRequire("9HiNI");

var $8k5ge = parcelRequire("8k5ge");

var $dyxC2 = parcelRequire("dyxC2");
const $22d2802c3c47d0c8$export$24d547caef80ccd1 = (0, $3RlMb$createContext)({});
const $22d2802c3c47d0c8$export$353f5b6fc5456de1 = /*#__PURE__*/ (0, $7A3TT.createHideableComponent)(function Button(props, ref) {
    [props, ref] = (0, $2A4az.useContextProps)(props, ref, $22d2802c3c47d0c8$export$24d547caef80ccd1);
    let domRef = (0, $6p9dH.useObjectRef)(ref);
    let ctx = props;
    let isPending = ()=>!!ctx.isPending;
    let { buttonProps: buttonProps, isPressed: isPressed } = (0, $8ByXH.useButton)(props, domRef);
    buttonProps = $22d2802c3c47d0c8$var$useDisableInteractions(buttonProps, isPending);
    let { focusProps: focusProps, isFocused: isFocused, isFocusVisible: isFocusVisible } = (0, $9HiNI.useFocusRing)(props);
    let { hoverProps: hoverProps, isHovered: isHovered } = (0, $8k5ge.useHover)((0, $3RlMb$merge)(props, {
        get isDisabled () {
            return props.isDisabled || isPending();
        }
    }));
    let renderValues = {
        get isHovered () {
            return isHovered();
        },
        get isPressed () {
            return (ctx.isPressed || isPressed()) && !isPending();
        },
        get isFocused () {
            return isFocused();
        },
        get isFocusVisible () {
            return isFocusVisible();
        },
        get isDisabled () {
            return props.isDisabled || false;
        },
        get isPending () {
            return isPending();
        }
    };
    let renderProps = (0, $2A4az.useRenderProps)((0, $3RlMb$merge)(props, {
        values: renderValues,
        defaultClassName: 'react-aria-Button'
    }));
    let buttonId = (0, $dyxC2.useId)(()=>{
        let id = buttonProps.id;
        return typeof id === 'string' ? id : undefined;
    });
    let progressId = (0, $dyxC2.useId)();
    let ariaLabelledby = ()=>{
        let labelledby = buttonProps['aria-labelledby'];
        if (isPending()) {
            // aria-labelledby wins over aria-label
            // https://www.w3.org/TR/accname-1.2/#computation-steps
            if (labelledby) labelledby = `${labelledby} ${progressId()}`;
            else if (buttonProps['aria-label']) labelledby = `${buttonId()} ${progressId()}`;
        }
        return labelledby;
    };
    let wasPending;
    (0, $3RlMb$createEffect)(()=>({
            pending: isPending(),
            focused: isFocused(),
            labelledby: ariaLabelledby(),
            id: buttonId()
        }), ({ pending: pending, focused: focused, labelledby: labelledby, id: id })=>{
        let message = {
            'aria-labelledby': labelledby || id
        };
        if (wasPending !== undefined && wasPending !== pending && focused) (0, $imHDx.announce)(message, 'assertive');
        wasPending = pending;
    });
    let DOMProps = (0, $3RlMb$omit)((0, $5gAIA.filterDOMProps)(props, {
        global: true
    }), 'onClick');
    return (0, $3RlMb$createComponent)((0, $2A4az.dom).button, (0, $3RlMb$mergeProps)(()=>(0, $7boJ2.mergeProps)(DOMProps, renderProps, buttonProps, focusProps, hoverProps), {
        get type () {
            return (0, $3RlMb$memo)(()=>!!(buttonProps.type === 'submit' && isPending()))() ? 'button' : buttonProps.type;
        },
        get id () {
            return buttonId();
        },
        ref (r$) {
            var _ref$ = domRef;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $3RlMb$applyRef)(_ref$, r$) : domRef = r$;
        },
        get "aria-labelledby" () {
            return ariaLabelledby();
        },
        get slot () {
            return props.slot || undefined;
        },
        get "aria-disabled" () {
            return (0, $3RlMb$memo)(()=>!!isPending())() ? 'true' : buttonProps['aria-disabled'];
        },
        get "data-disabled" () {
            return props.isDisabled ? 'true' : undefined;
        },
        get "data-pressed" () {
            return renderValues.isPressed ? 'true' : undefined;
        },
        get "data-hovered" () {
            return isHovered() ? 'true' : undefined;
        },
        get "data-focused" () {
            return isFocused() ? 'true' : undefined;
        },
        get "data-pending" () {
            return isPending() ? 'true' : undefined;
        },
        get "data-focus-visible" () {
            return isFocusVisible() ? 'true' : undefined;
        },
        get children () {
            return (0, $3RlMb$createComponent)((0, $broa7.ProgressBarContext), {
                value: {
                    get id () {
                        return progressId();
                    }
                },
                get children () {
                    return renderProps.children;
                }
            });
        }
    }));
});
// Events to preserve when isPending is true (for tooltips and other overlays)
const $22d2802c3c47d0c8$var$PRESERVED_EVENT_PATTERN = /Focus|Blur|Hover|Pointer(Enter|Leave|Over|Out)|Mouse(Enter|Leave|Over|Out)/;
function $22d2802c3c47d0c8$var$useDisableInteractions(props, isPending) {
    // Keep the source event-preservation rule as a live view instead of mutating
    // a hook's shared prop bag when pending changes.
    return (0, $3RlMb$omit)(props, (key)=>isPending() && typeof key === 'string' && (key === 'href' || key === 'target' || key.startsWith('on') && !$22d2802c3c47d0c8$var$PRESERVED_EVENT_PATTERN.test(key)));
}

});
parcelRegister("imHDx", function(module, exports) {

$parcel$export(module.exports, "announce", function () { return $d5ec216696680f68$export$a9b970dcc4ae71a9; });
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
 */ /* Inspired by https://github.com/AlmeroSteyn/react-aria-live */ const $d5ec216696680f68$var$LIVEREGION_TIMEOUT_DELAY = 7000;
let $d5ec216696680f68$var$liveAnnouncer = null;
function $d5ec216696680f68$export$a9b970dcc4ae71a9(message, assertiveness = 'assertive', timeout = $d5ec216696680f68$var$LIVEREGION_TIMEOUT_DELAY) {
    if (!$d5ec216696680f68$var$liveAnnouncer) {
        $d5ec216696680f68$var$liveAnnouncer = new $d5ec216696680f68$var$LiveAnnouncer();
        setTimeout(()=>{
            if ($d5ec216696680f68$var$liveAnnouncer?.isAttached()) $d5ec216696680f68$var$liveAnnouncer?.announce(message, assertiveness, timeout);
        }, 100);
    } else $d5ec216696680f68$var$liveAnnouncer.announce(message, assertiveness, timeout);
}
function $d5ec216696680f68$export$d10ae4f68404609a(assertiveness) {
    if ($d5ec216696680f68$var$liveAnnouncer) $d5ec216696680f68$var$liveAnnouncer.clear(assertiveness);
}
function $d5ec216696680f68$export$d8686216b8b81b2f() {
    if ($d5ec216696680f68$var$liveAnnouncer) {
        $d5ec216696680f68$var$liveAnnouncer.destroy();
        $d5ec216696680f68$var$liveAnnouncer = null;
    }
}
// LiveAnnouncer is implemented using vanilla DOM, not React. That's because as of React 18
// ReactDOM.render is deprecated, and the replacement, ReactDOM.createRoot is moved into a
// subpath import `react-dom/client`. That makes it hard for us to support multiple React versions.
// As a global API, we can't use portals without introducing a breaking API change. LiveAnnouncer
// is simple enough to implement without React, so that's what we do here.
// See this discussion for more details: https://github.com/reactwg/react-18/discussions/125#discussioncomment-2382638
class $d5ec216696680f68$var$LiveAnnouncer {
    node = null;
    assertiveLog = null;
    politeLog = null;
    constructor(){
        if (typeof document !== 'undefined') {
            this.node = document.createElement('div');
            this.node.dataset.liveAnnouncer = 'true';
            // copied from VisuallyHidden
            Object.assign(this.node.style, {
                border: 0,
                clip: 'rect(0 0 0 0)',
                clipPath: 'inset(50%)',
                height: '1px',
                margin: '-1px',
                overflow: 'hidden',
                padding: 0,
                position: 'absolute',
                width: '1px',
                whiteSpace: 'nowrap'
            });
            this.assertiveLog = this.createLog('assertive');
            this.node.appendChild(this.assertiveLog);
            this.politeLog = this.createLog('polite');
            this.node.appendChild(this.politeLog);
            document.body.prepend(this.node);
        }
    }
    isAttached() {
        return this.node?.isConnected;
    }
    createLog(ariaLive) {
        let node = document.createElement('div');
        node.setAttribute('role', 'log');
        node.setAttribute('aria-live', ariaLive);
        node.setAttribute('aria-relevant', 'additions');
        return node;
    }
    destroy() {
        if (!this.node) return;
        document.body.removeChild(this.node);
        this.node = null;
    }
    announce(message, assertiveness = 'assertive', timeout = $d5ec216696680f68$var$LIVEREGION_TIMEOUT_DELAY) {
        if (!this.node) return;
        let node = document.createElement('div');
        if (typeof message === 'object') {
            // To read an aria-labelledby, the element must have an appropriate role, such as img.
            node.setAttribute('role', 'img');
            node.setAttribute('aria-labelledby', message['aria-labelledby']);
        } else node.textContent = message;
        if (assertiveness === 'assertive') this.assertiveLog?.appendChild(node);
        else this.politeLog?.appendChild(node);
        if (message !== '') setTimeout(()=>{
            node.remove();
        }, timeout);
    }
    clear(assertiveness) {
        if (!this.node) return;
        if ((!assertiveness || assertiveness === 'assertive') && this.assertiveLog) this.assertiveLog.innerHTML = '';
        if ((!assertiveness || assertiveness === 'polite') && this.politeLog) this.politeLog.innerHTML = '';
    }
}

});

parcelRegister("8ByXH", function(module, exports) {

$parcel$export(module.exports, "useButton", function () { return $643ce6207ab13461$export$ea18c227d4417cc3; });
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

var $kKI9C = parcelRequire("kKI9C");

var $eTc6R = parcelRequire("eTc6R");
function $643ce6207ab13461$export$ea18c227d4417cc3(props, ref) {
    let elementType = ()=>props.elementType ?? 'button';
    let additionalProps = {
        get role () {
            return elementType() === 'button' ? undefined : 'button';
        },
        get type () {
            return elementType() === 'button' || elementType() === 'input' ? props.type ?? 'button' : undefined;
        },
        get disabled () {
            return elementType() === 'button' || elementType() === 'input' ? props.isDisabled : undefined;
        },
        get href () {
            return elementType() === 'a' && !props.isDisabled ? props.href : undefined;
        },
        get target () {
            return elementType() === 'a' ? props.target : undefined;
        },
        get rel () {
            return elementType() === 'a' ? props.rel : undefined;
        },
        get 'aria-disabled' () {
            return !props.isDisabled || elementType() === 'button' || elementType() === 'input' ? undefined : props.isDisabled;
        },
        get form () {
            return elementType() === 'button' ? props.form : undefined;
        },
        get formAction () {
            return elementType() === 'button' ? props.formAction : undefined;
        },
        get formEncType () {
            return elementType() === 'button' ? props.formEncType : undefined;
        },
        get formMethod () {
            return elementType() === 'button' ? props.formMethod : undefined;
        },
        get formNoValidate () {
            return elementType() === 'button' ? props.formNoValidate : undefined;
        },
        get formTarget () {
            return elementType() === 'button' ? props.formTarget : undefined;
        },
        get name () {
            return elementType() === 'button' ? props.name : undefined;
        },
        get value () {
            return elementType() === 'button' ? props.value : undefined;
        }
    };
    let { pressProps: pressProps, isPressed: isPressed } = (0, $eTc6R.usePress)({
        get onPressStart () {
            return props.onPressStart;
        },
        get onPressEnd () {
            return props.onPressEnd;
        },
        get onPressChange () {
            return props.onPressChange;
        },
        get onPress () {
            return props.onPress;
        },
        get onPressUp () {
            return props.onPressUp;
        },
        get onClick () {
            return props.onClick;
        },
        get isDisabled () {
            return props.isDisabled;
        },
        get preventFocusOnPress () {
            return props.preventFocusOnPress;
        },
        ref: ref
    });
    let { focusableProps: focusableProps } = (0, $kKI9C.useFocusable)(props, ref);
    let focusProps = (0, $7boJ2.mergeProps)(focusableProps, {
        get tabIndex () {
            return props.allowFocusWhenDisabled && props.isDisabled ? -1 : focusableProps.tabIndex;
        }
    });
    let buttonProps = (0, $7boJ2.mergeProps)(focusProps, pressProps, (0, $5gAIA.filterDOMProps)(props, {
        labelable: true
    }));
    return {
        isPressed: isPressed,
        // Used to indicate press state for visual
        buttonProps: (0, $7boJ2.mergeProps)(additionalProps, buttonProps, {
            get 'aria-haspopup' () {
                return props['aria-haspopup'];
            },
            get 'aria-expanded' () {
                return props['aria-expanded'];
            },
            get 'aria-controls' () {
                return props['aria-controls'];
            },
            get 'aria-pressed' () {
                return props['aria-pressed'];
            },
            get 'aria-current' () {
                return props['aria-current'];
            },
            get 'aria-disabled' () {
                return props['aria-disabled'];
            }
        })
    };
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
    let context = (0, $3RlMb$useContext)((0, $cpleU.FocusableContext)) || {};
    (0, $khPAm.useSyncRef)(context, ref);
    // eslint-disable-next-line
    return (0, $3RlMb$omit)(context, 'ref');
}
function $f1ba5a9e4c9cb049$export$13f3202a3e5ddd5(props) {
    let objRef = (0, $6p9dH.useObjectRef)(props.ref);
    let context = (0, $7boJ2.mergeProps)((0, $3RlMb$omit)(props, 'children', 'ref'), {
        ref: objRef
    });
    return (0, $3RlMb$createComponent)((0, $cpleU.FocusableContext), {
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
        current: (0, $3RlMb$untrack)(()=>props.autoFocus)
    };
    (0, $3RlMb$onSettled)(()=>{
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
    (0, $3RlMb$onSettled)(()=>{
        return;
    });
    return props.children((0, $7boJ2.mergeProps)(focusableProps, {
        ref: ref
    }));
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
    (0, $3RlMb$createEffect)(()=>({
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

const $90884b889dc4fa67$export$f9762fab77588ecb = (0, $3RlMb$createContext)(null);

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
    let context = (0, $3RlMb$useContext)((0, $fpC5Z.PressResponderContext));
    if (context) {
        // Prevent mergeProps from merging ref.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let contextProps = (0, $3RlMb$omit)(context, 'register', 'ref');
        props = (0, $7boJ2.mergeProps)(contextProps, props);
        // Registration is a one-time imperative ownership operation, not a read
        // of the responder's reactive controlled-press prop view.
        (0, $3RlMb$untrack)(()=>context.register());
    }
    // Ref handles belong to hook setup, not the controlled press-state derivation.
    (0, $khPAm.useSyncRef)(context, (0, $3RlMb$untrack)(()=>props.ref));
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
    let domProps = (0, $3RlMb$omit)(props, 'onPress', 'onPressChange', 'onPressStart', 'onPressEnd', 'onPressUp', 'onClick', 'isDisabled', 'isPressed', 'preventFocusOnPress', 'shouldCancelOnPointerExit', 'allowTextSelectionOnPress', 'ref');
    let [isPressed, setPressed] = (0, $3RlMb$createSignal)(false);
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
    (0, $3RlMb$createEffect)(()=>props.isDisabled, (isDisabled)=>{
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
    (0, $3RlMb$onSettled)(()=>{
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
    (0, $3RlMb$onSettled)(()=>()=>{
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
const $b386bdce3a6b1ef7$export$5165eccb35aaadb5 = (0, $3RlMb$createContext)({
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
    return (...args)=>(0, $3RlMb$untrack)(()=>(getCallback ? getCallback() : fn)?.(...args));
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
    (0, $3RlMb$onCleanup)(removeAllGlobalListeners);
    return {
        addGlobalListener: addGlobalListener,
        removeGlobalListener: removeGlobalListener,
        removeAllGlobalListeners: removeAllGlobalListeners
    };
}

});



parcelRegister("7A3TT", function(module, exports) {

$parcel$export(module.exports, "Hidden", function () { return $584eebc12d596346$export$8dc98ba7eadeaa56; });
$parcel$export(module.exports, "createHideableComponent", function () { return $584eebc12d596346$export$86427a43e3e48ebb; });
$parcel$export(module.exports, "useIsHidden", function () { return $584eebc12d596346$export$b5d7cc18bb8d2b59; });



var $6p9dH = parcelRequire("6p9dH");
var $584eebc12d596346$var$_tmpl$ = /*#__PURE__*/ (0, $3RlMb$template)(`<template>`);
const $584eebc12d596346$export$94b6d0abf7d33e8c = (0, $3RlMb$createContext)(false);
function $584eebc12d596346$export$8dc98ba7eadeaa56(props) {
    let isHidden = (0, $3RlMb$useContext)($584eebc12d596346$export$94b6d0abf7d33e8c);
    if (isHidden) // Don't hide again if we are already hidden.
    return (0, $3RlMb$memo)(()=>props.children);
    // In SSR, portals are not supported by React. Instead, always render into a <template>
    // element, which the browser will never display to the user. In addition, the
    // content is not part of the accessible DOM tree, so it won't affect ids or other accessibility attributes.
    var _el$ = (0, $3RlMb$getNextElement)($584eebc12d596346$var$_tmpl$);
    (0, $3RlMb$insert)(_el$, (0, $3RlMb$createComponent)($584eebc12d596346$export$94b6d0abf7d33e8c, {
        value: true,
        get children () {
            return props.children;
        }
    }));
    return _el$;
}
function $584eebc12d596346$export$86427a43e3e48ebb(fn) {
    let Wrapper = (props)=>{
        let isHidden = (0, $3RlMb$useContext)($584eebc12d596346$export$94b6d0abf7d33e8c);
        if (isHidden) return null;
        // oxlint-disable-next-line react/react-compiler
        let deliveredRef;
        let forwardedRef = (0, $6p9dH.useObjectRef)((node)=>{
            // Preserve synchronous source attachment; A's bridge owns delivery/cleanup.
            deliveredRef = props.ref;
            return (0, $6p9dH.attachRef)(deliveredRef, node);
        });
        (0, $3RlMb$createEffect)(()=>props.ref, (target)=>{
            let node = (0, $3RlMb$untrack)(()=>forwardedRef.current);
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
    return (0, $3RlMb$useContext)($584eebc12d596346$export$94b6d0abf7d33e8c);
}

});

parcelRegister("broa7", function(module, exports) {

$parcel$export(module.exports, "ProgressBarContext", function () { return $8544f5739652ef94$export$e9f3bf65a26ce129; });
$parcel$export(module.exports, "ProgressBar", function () { return $8544f5739652ef94$export$c17561cb55d4db30; });


var $1ex1R = parcelRequire("1ex1R");

var $h2cIl = parcelRequire("h2cIl");

var $2A4az = parcelRequire("2A4az");
parcelRequire("bAtJj");
var $5gAIA = parcelRequire("5gAIA");

var $eIZqF = parcelRequire("eIZqF");
parcelRequire("2iotZ");
var $7boJ2 = parcelRequire("7boJ2");

const $8544f5739652ef94$export$e9f3bf65a26ce129 = (0, $3RlMb$createContext)(null);
function $8544f5739652ef94$export$c17561cb55d4db30(props) {
    let ref = props.ref;
    [props, ref] = (0, $2A4az.useContextProps)(props, ref, $8544f5739652ef94$export$e9f3bf65a26ce129);
    const minValue = ()=>props.minValue ?? 0;
    const maxValue = ()=>props.maxValue ?? 100;
    const value = ()=>(0, $h2cIl.clamp)(props.value ?? 0, minValue(), maxValue());
    const isIndeterminate = ()=>props.isIndeterminate ?? false;
    let [labelRef, label] = (0, $2A4az.useSlot)(!props['aria-label'] && !props['aria-labelledby']);
    let { progressBarProps: progressBarProps, labelProps: labelProps } = (0, $1ex1R.useProgressBar)((0, $3RlMb$merge)(props, {
        get label () {
            return label();
        }
    }));
    let range = ()=>maxValue() - minValue();
    // Calculate the width of the progress bar as a percentage
    let percentage = ()=>isIndeterminate() ? undefined : range() === 0 ? 0 : (value() - minValue()) / range() * 100;
    let renderProps = (0, $2A4az.useRenderProps)((0, $3RlMb$merge)(props, {
        defaultClassName: 'react-aria-ProgressBar',
        values: {
            get percentage () {
                return percentage();
            },
            get valueText () {
                return progressBarProps['aria-valuetext'];
            },
            get isIndeterminate () {
                return isIndeterminate();
            }
        }
    }));
    let DOMProps = (0, $5gAIA.filterDOMProps)(props, {
        global: true
    });
    let hostProps = (0, $7boJ2.mergeProps)(DOMProps, renderProps, progressBarProps);
    let labelContext = (0, $3RlMb$merge)(labelProps, {
        ref: labelRef,
        elementType: 'span'
    });
    return (0, $3RlMb$createComponent)((0, $2A4az.dom).div, (0, $3RlMb$mergeProps)(hostProps, {
        ref (r$) {
            var _ref$ = ref;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $3RlMb$applyRef)(_ref$, r$) : ref = r$;
        },
        get slot () {
            return props.slot || undefined;
        },
        get children () {
            return (0, $3RlMb$createComponent)((0, $eIZqF.LabelContext), {
                value: labelContext,
                get children () {
                    return renderProps.children;
                }
            });
        }
    }));
}

});
parcelRegister("1ex1R", function(module, exports) {

$parcel$export(module.exports, "useProgressBar", function () { return $0e60b81bd883b833$export$ed5abd763a836edc; });
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

var $5gAIA = parcelRequire("5gAIA");

var $7boJ2 = parcelRequire("7boJ2");

var $bqsTN = parcelRequire("bqsTN");

var $eTmjo = parcelRequire("eTmjo");

function $0e60b81bd883b833$export$ed5abd763a836edc(props) {
    const minValue = ()=>props.minValue ?? 0;
    const maxValue = ()=>props.maxValue ?? 100;
    const formatOptions = ()=>props.formatOptions ?? {
            style: 'percent'
        };
    let domProps = (0, $5gAIA.filterDOMProps)(props, {
        labelable: true
    });
    let { labelProps: labelProps, fieldProps: fieldProps } = (0, $bqsTN.useLabel)((0, $3RlMb$merge)(props, {
        // Progress bar is not an HTML input element so it
        // shouldn't be labeled by a <label> element.
        labelElementType: 'span'
    }));
    let value = ()=>(0, $h2cIl.clamp)(props.value ?? 0, minValue(), maxValue());
    let range = ()=>maxValue() - minValue();
    let percentage = ()=>range() === 0 ? 0 : (value() - minValue()) / range();
    let formatter = (0, $eTmjo.useNumberFormatter)(formatOptions);
    let valueLabel = ()=>props.valueLabel || formatter().format(formatOptions().style === 'percent' ? percentage() : value());
    return {
        progressBarProps: (0, $7boJ2.mergeProps)(domProps, {
            get id () {
                return fieldProps.id;
            },
            get 'aria-label' () {
                return fieldProps['aria-label'];
            },
            get 'aria-labelledby' () {
                return fieldProps['aria-labelledby'];
            },
            get 'aria-valuenow' () {
                return props.isIndeterminate ? undefined : value();
            },
            get 'aria-valuemin' () {
                return minValue();
            },
            get 'aria-valuemax' () {
                return maxValue();
            },
            get 'aria-valuetext' () {
                return props.isIndeterminate ? undefined : valueLabel();
            },
            role: 'progressbar'
        }),
        labelProps: labelProps
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

parcelRegister("bqsTN", function(module, exports) {

$parcel$export(module.exports, "useLabel", function () { return $85188a27f2b2691e$export$8467354a121f1b9f; });
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
var $dyxC2 = parcelRequire("dyxC2");

var $62s3i = parcelRequire("62s3i");

function $85188a27f2b2691e$export$8467354a121f1b9f(props) {
    let id = (0, $dyxC2.useId)(()=>props.id);
    let labelId = (0, $dyxC2.useId)();
    let labelProps = {
        get id () {
            return props.label ? labelId() : undefined;
        },
        get htmlFor () {
            return props.label && (props.labelElementType ?? 'label') === 'label' ? id() : undefined;
        }
    };
    (0, $3RlMb$createEffect)(()=>!props.label && !props['aria-labelledby'] && !props['aria-label'], (missing)=>{});
    let fieldProps = (0, $62s3i.useLabels)({
        get id () {
            return id();
        },
        get 'aria-label' () {
            return props['aria-label'];
        },
        get 'aria-labelledby' () {
            let labelledBy = props['aria-labelledby'];
            return props.label ? labelledBy ? `${labelId()} ${labelledBy}` : labelId() : labelledBy;
        }
    });
    return {
        labelProps: labelProps,
        fieldProps: fieldProps
    };
}

});
parcelRegister("62s3i", function(module, exports) {

$parcel$export(module.exports, "useLabels", function () { return $4658b08851968062$export$d6875122194c7b44; });
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
var $dyxC2 = parcelRequire("dyxC2");
function $4658b08851968062$export$d6875122194c7b44(props, defaultLabel) {
    const id = (0, $dyxC2.useId)(()=>props.id);
    return {
        get id () {
            return id();
        },
        get 'aria-label' () {
            return !props['aria-label'] && !props['aria-labelledby'] && defaultLabel ? defaultLabel : props['aria-label'];
        },
        get 'aria-labelledby' () {
            let labelledBy = props['aria-labelledby'];
            if (labelledBy && props['aria-label']) return [
                ...new Set([
                    id(),
                    ...labelledBy.trim().split(/\s+/)
                ])
            ].join(' ');
            return labelledBy ? labelledBy.trim().split(/\s+/).join(' ') : labelledBy;
        }
    };
}

});


parcelRegister("eTmjo", function(module, exports) {

$parcel$export(module.exports, "useNumberFormatter", function () { return $ad778265343530ec$export$b7a616150fdb9f44; });
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
var $81zYK = parcelRequire("81zYK");

var $dnlDG = parcelRequire("dnlDG");

function $ad778265343530ec$export$b7a616150fdb9f44(options = {}) {
    let locale = (0, $dnlDG.useLocale)();
    return (0, $3RlMb$createMemo)(()=>new (0, $81zYK.NumberFormatter)(locale.locale, typeof options === 'function' ? options() : options));
}

});
parcelRegister("81zYK", function(module, exports) {

$parcel$export(module.exports, "NumberFormatter", function () { return $5d7a535e5a5ee7e3$export$cc77c4ff7e8673c5; });
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
 */ let $5d7a535e5a5ee7e3$var$formatterCache = new Map();
let $5d7a535e5a5ee7e3$var$supportsSignDisplay = false;
try {
    $5d7a535e5a5ee7e3$var$supportsSignDisplay = new Intl.NumberFormat('de-DE', {
        signDisplay: 'exceptZero'
    }).resolvedOptions().signDisplay === 'exceptZero';
// eslint-disable-next-line no-empty
} catch  {}
class $5d7a535e5a5ee7e3$export$cc77c4ff7e8673c5 {
    numberFormatter;
    options;
    constructor(locale, options = {}){
        this.numberFormatter = $5d7a535e5a5ee7e3$var$getCachedNumberFormatter(locale, options);
        this.options = options;
    }
    /**
     * Formats a number value as a string, according to the locale and options provided to the
     * constructor.
     */ format(value) {
        let res = '';
        if (!$5d7a535e5a5ee7e3$var$supportsSignDisplay && this.options.signDisplay != null) res = $5d7a535e5a5ee7e3$export$711b50b3c525e0f2(this.numberFormatter, this.options.signDisplay, value);
        else res = this.numberFormatter.format(value);
        return res;
    }
    /** Formats a number to an array of parts such as separators, digits, punctuation, and more. */ formatToParts(value) {
        // TODO: implement signDisplay for formatToParts
        return this.numberFormatter.formatToParts(value);
    }
    /** Formats a number range as a string. */ formatRange(start, end) {
        if (typeof this.numberFormatter.formatRange === 'function') return this.numberFormatter.formatRange(start, end);
        if (end < start) throw new RangeError('End date must be >= start date');
        // Very basic fallback for old browsers.
        return `${this.format(start)} \u{2013} ${this.format(end)}`;
    }
    /** Formats a number range as an array of parts. */ formatRangeToParts(start, end) {
        if (typeof this.numberFormatter.formatRangeToParts === 'function') return this.numberFormatter.formatRangeToParts(start, end);
        if (end < start) throw new RangeError('End date must be >= start date');
        let startParts = this.numberFormatter.formatToParts(start);
        let endParts = this.numberFormatter.formatToParts(end);
        return [
            ...startParts.map((p)=>({
                    ...p,
                    source: 'startRange'
                })),
            {
                type: 'literal',
                value: " \u2013 ",
                source: 'shared'
            },
            ...endParts.map((p)=>({
                    ...p,
                    source: 'endRange'
                }))
        ];
    }
    /** Returns the resolved formatting options based on the values passed to the constructor. */ resolvedOptions() {
        let options = this.numberFormatter.resolvedOptions();
        if (!$5d7a535e5a5ee7e3$var$supportsSignDisplay && this.options.signDisplay != null) options = {
            ...options,
            signDisplay: this.options.signDisplay
        };
        return options;
    }
}
function $5d7a535e5a5ee7e3$var$getCachedNumberFormatter(locale, options = {}) {
    let { numberingSystem: numberingSystem } = options;
    if (numberingSystem && locale.includes('-nu-')) {
        if (!locale.includes('-u-')) locale += '-u-';
        locale += `-nu-${numberingSystem}`;
    }
    let cacheKey = locale + (options ? Object.entries(options).sort((a, b)=>a[0] < b[0] ? -1 : 1).join() : '');
    if ($5d7a535e5a5ee7e3$var$formatterCache.has(cacheKey)) return $5d7a535e5a5ee7e3$var$formatterCache.get(cacheKey);
    let numberFormatter = new Intl.NumberFormat(locale, options);
    $5d7a535e5a5ee7e3$var$formatterCache.set(cacheKey, numberFormatter);
    return numberFormatter;
}
function $5d7a535e5a5ee7e3$export$711b50b3c525e0f2(numberFormat, signDisplay, num) {
    if (signDisplay === 'auto') return numberFormat.format(num);
    else if (signDisplay === 'never') return numberFormat.format(Math.abs(num));
    else {
        let needsPositiveSign = false;
        if (signDisplay === 'always') needsPositiveSign = num > 0 || Object.is(num, 0);
        else if (signDisplay === 'exceptZero') {
            if (Object.is(num, -0) || Object.is(num, 0)) num = Math.abs(num);
            else needsPositiveSign = num > 0;
        }
        if (needsPositiveSign) {
            let negative = numberFormat.format(-num);
            let noSign = numberFormat.format(num);
            // ignore RTL/LTR marker character
            let minus = negative.replace(noSign, '').replace(/\u200e|\u061C/, '');
            if ([
                ...minus
            ].length !== 1) console.warn('@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case');
            let positive = negative.replace(noSign, '!!!').replace(minus, '+').replace('!!!', noSign);
            return positive;
        } else return numberFormat.format(num);
    }
}

});



parcelRegister("eIZqF", function(module, exports) {

$parcel$export(module.exports, "LabelContext", function () { return $ab84d34872d750ee$export$75b6ee27786ba447; });


var $2A4az = parcelRequire("2A4az");

var $7A3TT = parcelRequire("7A3TT");

const $ab84d34872d750ee$export$75b6ee27786ba447 = (0, $3RlMb$createContext)({});
const $ab84d34872d750ee$export$b04be29aa201d4f5 = /*#__PURE__*/ (0, $7A3TT.createHideableComponent)(function Label(props, ref) {
    [props, ref] = (0, $2A4az.useContextProps)(props, ref, $ab84d34872d750ee$export$75b6ee27786ba447);
    let labelProps = (0, $3RlMb$omit)(props, 'elementType');
    let ElementType = (0, $3RlMb$dynamic)(()=>(0, $2A4az.dom)[props.elementType ?? 'label']);
    // @ts-ignore
    return (0, $3RlMb$createComponent)(ElementType, (0, $3RlMb$mergeProps)({
        className: "react-aria-Label"
    }, labelProps, {
        ref (r$) {
            var _ref$ = ref;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $3RlMb$applyRef)(_ref$, r$) : ref = r$;
        }
    }));
});

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
    let [isFocused, setFocused] = (0, $3RlMb$createSignal)(false);
    let [isFocusVisibleState, setFocusVisible] = (0, $3RlMb$createSignal)(false);
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
    let [isHovered, setHovered] = (0, $3RlMb$createSignal)(false);
    let state = {
        isHovered: false,
        ignoreEmulatedMouseEvents: false,
        pointerType: '',
        target: null
    };
    (0, $3RlMb$onSettled)($60f445a8cbdb845e$var$setupGlobalTouchEvents);
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
    (0, $3RlMb$createEffect)(()=>props.isDisabled, (isDisabled)=>{
        // Call the triggerHoverEnd as soon as isDisabled changes to true
        // Safe to call triggerHoverEnd, it will early return if we aren't currently hovering
        if (isDisabled) triggerHoverEnd({
            currentTarget: state.target
        }, state.pointerType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    (0, $3RlMb$onCleanup)(removeAllGlobalListeners);
    return {
        hoverProps: hoverProps,
        isHovered: isHovered
    };
}

});



parcelRegister("jAA3o", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $e42d58a1266ece1b$export$2e2bcd8739ae039; });


var $e42d58a1266ece1b$var$_tmpl$ = /*#__PURE__*/ (0, $3RlMb$template)(`<svg><path d=m.15411,4.14619L4.14677.15375c.31502-.315.85364-.09183.85354.35367l-.00079,3.7427c-.00009.41417-.33587.74986-.75004.74984l-3.74186-.00021c-.44545-.00002-.6685-.53859-.35352-.85356Z fill="var(--iconPrimary, #222)">`), $e42d58a1266ece1b$var$_tmpl$2 = /*#__PURE__*/ (0, $3RlMb$template)(`<svg><path d=m.82619,5.14621L5.14704.8256c.31502-.315.85364-.09183.85354.35367l-.00086,4.07089c-.00009.41417-.33587.74986-.75004.74984l-4.06998-.00023c-.44545-.00002-.6685-.53859-.35352-.85356Z fill="var(--iconPrimary, #222)">`), $e42d58a1266ece1b$var$_tmpl$3 = /*#__PURE__*/ (0, $3RlMb$template)(`<svg><path d=m.82095,6.14616L6.1465.82091c.31502-.315.85364-.09183.85354.35367l-.00107,5.07559c-.00009.41417-.33587.74986-.75004.74984l-5.07447-.00028c-.44545-.00002-.6685-.53859-.35352-.85356Z fill="var(--iconPrimary, #222)"stroke-width=0>`), $e42d58a1266ece1b$var$_tmpl$4 = /*#__PURE__*/ (0, $3RlMb$template)(`<svg><path d=m.76379,4.48791L4.48941.76228c.18901-.18901.51219-.05511.51213.2122l-.00069,3.2759c-.00009.41417-.33587.74986-.75004.74984l-3.27491-.00018c-.26726-.00001-.4011-.32315-.21212-.51213Z fill="var(--iconPrimary, #222)">`);
// Native JSX transport of the four adjacent frozen SVG inputs. Geometry and
// attributes are literal source data, not a replacement icon algorithm.
function $e42d58a1266ece1b$var$CornerTriangle_M(props) {
    var _el$ = (0, $3RlMb$getNextElement)($e42d58a1266ece1b$var$_tmpl$);
    (0, $3RlMb$spread)(_el$, [
        {
            "width": "5",
            "height": "5",
            "viewBox": "0 0 5 5"
        },
        ()=>(0, $3RlMb$omit)(props, 'className'),
        {
            get "class" () {
                return props.className;
            }
        }
    ], true);
    (0, $3RlMb$runHydrationEvents)();
    return _el$;
}
function $e42d58a1266ece1b$var$CornerTriangle_L(props) {
    var _el$2 = (0, $3RlMb$getNextElement)($e42d58a1266ece1b$var$_tmpl$2);
    (0, $3RlMb$spread)(_el$2, [
        {
            "width": "6",
            "height": "6",
            "viewBox": "0 0 6 6"
        },
        ()=>(0, $3RlMb$omit)(props, 'className'),
        {
            get "class" () {
                return props.className;
            }
        }
    ], true);
    (0, $3RlMb$runHydrationEvents)();
    return _el$2;
}
function $e42d58a1266ece1b$var$CornerTriangle_XL(props) {
    var _el$3 = (0, $3RlMb$getNextElement)($e42d58a1266ece1b$var$_tmpl$3);
    (0, $3RlMb$spread)(_el$3, [
        {
            "id": "e",
            "data-name": "ICONS",
            "width": "7",
            "height": "7",
            "viewBox": "0 0 7 7"
        },
        ()=>(0, $3RlMb$omit)(props, 'className'),
        {
            get "class" () {
                return props.className;
            }
        }
    ], true);
    (0, $3RlMb$runHydrationEvents)();
    return _el$3;
}
function $e42d58a1266ece1b$var$CornerTriangle_S(props) {
    var _el$4 = (0, $3RlMb$getNextElement)($e42d58a1266ece1b$var$_tmpl$4);
    (0, $3RlMb$spread)(_el$4, [
        {
            "width": "5",
            "height": "5",
            "viewBox": "0 0 5 5"
        },
        ()=>(0, $3RlMb$omit)(props, 'className'),
        {
            get "class" () {
                return props.className;
            }
        }
    ], true);
    (0, $3RlMb$runHydrationEvents)();
    return _el$4;
}
let $e42d58a1266ece1b$var$styles = function anonymous(props) {
    let rules = " ", currentRules = {};
    if (props.size === "S") {
        rules += ' ZrIlH4c18';
        currentRules["width"] = typeof currentRules["width"] === 'object' ? currentRules["width"] : {
            "default": currentRules["width"]
        };
        currentRules["width"]["size === \"S\""] = 5;
    } else if (props.size === "XL") {
        rules += ' ZFJusud18';
        currentRules["width"] = typeof currentRules["width"] === 'object' ? currentRules["width"] : {
            "default": currentRules["width"]
        };
        currentRules["width"]["size === \"XL\""] = 7;
    } else if (props.size === "L") {
        rules += ' Z1cJjHb18';
        currentRules["width"] = typeof currentRules["width"] === 'object' ? currentRules["width"] : {
            "default": currentRules["width"]
        };
        currentRules["width"]["size === \"L\""] = 6;
    } else if (props.size === "M") {
        rules += ' ZrIlH4c18';
        currentRules["width"] = typeof currentRules["width"] === 'object' ? currentRules["width"] : {
            "default": currentRules["width"]
        };
        currentRules["width"]["size === \"M\""] = 5;
    }
    if (props.size === "S") {
        rules += ' FrIlH4c18';
        currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
            "default": currentRules["height"]
        };
        currentRules["height"]["size === \"S\""] = 5;
    } else if (props.size === "XL") {
        rules += ' FFJusud18';
        currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
            "default": currentRules["height"]
        };
        currentRules["height"]["size === \"XL\""] = 7;
    } else if (props.size === "L") {
        rules += ' F1cJjHb18';
        currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
            "default": currentRules["height"]
        };
        currentRules["height"]["size === \"L\""] = 6;
    } else if (props.size === "M") {
        rules += ' FrIlH4c18';
        currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
            "default": currentRules["height"]
        };
        currentRules["height"]["size === \"M\""] = 5;
    }
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/ui-icons/CornerTriangle.native.js:81:13";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/ui-icons/CornerTriangle.native.js:81:13"
        };
    }
    return rules;
};
function $e42d58a1266ece1b$export$2e2bcd8739ae039(props) {
    let size = ()=>props.size ?? 'M';
    let otherProps = (0, $3RlMb$omit)(props, 'size');
    return (0, $3RlMb$createComponent)((0, $3RlMb$Switch), {
        get children () {
            return [
                (0, $3RlMb$createComponent)((0, $3RlMb$Match), {
                    get when () {
                        return size() === 'M';
                    },
                    get children () {
                        return (0, $3RlMb$createComponent)($e42d58a1266ece1b$var$CornerTriangle_M, (0, $3RlMb$mergeProps)(otherProps, {
                            get className () {
                                return (otherProps.className || '') + $e42d58a1266ece1b$var$styles({
                                    size: size()
                                });
                            }
                        }));
                    }
                }),
                (0, $3RlMb$createComponent)((0, $3RlMb$Match), {
                    get when () {
                        return size() === 'L';
                    },
                    get children () {
                        return (0, $3RlMb$createComponent)($e42d58a1266ece1b$var$CornerTriangle_L, (0, $3RlMb$mergeProps)(otherProps, {
                            get className () {
                                return (otherProps.className || '') + $e42d58a1266ece1b$var$styles({
                                    size: size()
                                });
                            }
                        }));
                    }
                }),
                (0, $3RlMb$createComponent)((0, $3RlMb$Match), {
                    get when () {
                        return size() === 'XL';
                    },
                    get children () {
                        return (0, $3RlMb$createComponent)($e42d58a1266ece1b$var$CornerTriangle_XL, (0, $3RlMb$mergeProps)(otherProps, {
                            get className () {
                                return (otherProps.className || '') + $e42d58a1266ece1b$var$styles({
                                    size: size()
                                });
                            }
                        }));
                    }
                }),
                (0, $3RlMb$createComponent)((0, $3RlMb$Match), {
                    get when () {
                        return size() === 'S';
                    },
                    get children () {
                        return (0, $3RlMb$createComponent)($e42d58a1266ece1b$var$CornerTriangle_S, (0, $3RlMb$mergeProps)(otherProps, {
                            get className () {
                                return (otherProps.className || '') + $e42d58a1266ece1b$var$styles({
                                    size: size()
                                });
                            }
                        }));
                    }
                })
            ];
        }
    });
}

});

parcelRegister("9RJLv", function(module, exports) {

$parcel$export(module.exports, "IconContext", function () { return $72ec9054f1194d6d$export$a49f528ae1a4d0ed; });



var $cJuZp = parcelRequire("cJuZp");

var $esT6z = parcelRequire("esT6z");

var $1NDEx = parcelRequire("1NDEx");

var $hp4AJ = parcelRequire("hp4AJ");
// Custom list of overrides, excluding width/height/flexGrow/flexShrink/flexBasis
const $72ec9054f1194d6d$var$allowedOverrides = [
    'margin',
    'marginStart',
    'marginEnd',
    'marginTop',
    'marginBottom',
    'marginX',
    'marginY',
    'justifySelf',
    'alignSelf',
    'order',
    'gridArea',
    'gridRowStart',
    'gridRowEnd',
    'gridColumnStart',
    'gridColumnEnd',
    'position',
    'zIndex',
    'top',
    'bottom',
    'inset',
    'insetX',
    'insetY',
    'insetStart',
    'insetEnd',
    'rotate',
    '--iconPrimary',
    'size'
];
const $72ec9054f1194d6d$export$a49f528ae1a4d0ed = (0, $3RlMb$createContext)({});
const $72ec9054f1194d6d$export$207c7561471de4bd = (0, $3RlMb$createContext)({});
const $72ec9054f1194d6d$var$iconStyles = function anonymous(props, overrides) {
    let rules = " ", currentRules = {};
    let width = false;
    let height = false;
    let matches = String(overrides || '').matchAll(/(?:^|\s)(J|G|I|H|__A|_d|_J|z|y|B|A|_P|_9|W|_l|_A|_z|_S|-_8sjo0b-|Z|F|-macro\$)[^\s]+/g);
    for (let p of matches){
        if (p[1] === "Z") width = true;
        if (p[1] === "F") height = true;
        rules += p[0];
    }
    if (!width) rules += ' ZifsFYc18';
    currentRules["width"] = 20;
    if (!height) rules += ' FifsFYc18';
    currentRules["height"] = 20;
    rules += ' _va18';
    currentRules["flexShrink"] = 0;
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Icon.native.js:15:19";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Icon.native.js:15:19"
        };
    }
    return rules;
};
function $72ec9054f1194d6d$export$274edc73af1ae9c8(Component, context = $72ec9054f1194d6d$export$a49f528ae1a4d0ed) {
    return (props)=>{
        let [ctx, ref] = (0, $3RlMb$untrack)(()=>(0, $1NDEx.useSpectrumContextProps)(// TODO: remove this default once we release RAC and use DEFAULT_SLOT.
            {
                get slot () {
                    return props.slot || 'icon';
                }
            }, undefined, context));
        let otherProps = (0, $3RlMb$omit)(props, 'UNSAFE_className', 'UNSAFE_style', 'slot', 'aria-label', 'aria-hidden', 'styles');
        // Allocate context-dependent style derivation outside the cleared skeleton provider.
        let skeletonStyles = (0, $3RlMb$createMemo)(()=>(0, $esT6z.useSkeletonIcon)((0, $cJuZp.mergeStyles)($72ec9054f1194d6d$var$iconStyles(null, props.styles), ctx.styles)));
        const Svg = ()=>(0, $3RlMb$createComponent)((0, $esT6z.SkeletonWrapper), {
                children: (overrides)=>(()=>{
                        var _ref$ = (0, $hp4AJ.mergeRefs)(ref, overrides.ref);
                        return (0, $3RlMb$createComponent)(Component, (0, $3RlMb$mergeProps)(otherProps, {
                            "attr:focusable": "false",
                            ref (r$) {
                                (typeof _ref$ === "function" || Array.isArray(_ref$)) && (0, $3RlMb$applyRef)(_ref$, r$);
                            },
                            get inert () {
                                return overrides.inert;
                            },
                            get "aria-label" () {
                                return props['aria-label'];
                            },
                            get "aria-hidden" () {
                                return (0, $3RlMb$memo)(()=>!!props['aria-label'])() ? (0, $3RlMb$memo)(()=>props['aria-hidden'] === true)() ? 'true' : props['aria-hidden'] || undefined : 'true';
                            },
                            role: "img",
                            get "data-slot" () {
                                return props.slot;
                            },
                            get "class" () {
                                return (props.UNSAFE_className ?? '') + ' ' + skeletonStyles() + (overrides.className ? ' ' + overrides.className : '');
                            },
                            get style () {
                                return props.UNSAFE_style;
                            }
                        }));
                    })()
            });
        return (0, $3RlMb$memo)(()=>(0, $3RlMb$memo)(()=>!!ctx.render)() ? ctx.render((0, $3RlMb$createComponent)(Svg, {})) : (0, $3RlMb$createComponent)(Svg, {}));
    };
}
const $72ec9054f1194d6d$var$illustrationStyles = function anonymous(props, overrides) {
    let rules = " ", currentRules = {};
    let width = false;
    let height = false;
    let matches = String(overrides || '').matchAll(/(?:^|\s)(J|G|I|H|__A|_d|_J|z|y|B|A|_P|_9|W|_l|_A|_z|_S|-_8sjo0b-|Z|F|-macro\$)[^\s]+/g);
    for (let p of matches){
        if (p[1] === "Z") width = true;
        if (p[1] === "F") height = true;
        rules += p[0];
    }
    if (props.size === "L") {
        if (!width) rules += ' Z3HJbhc18';
        currentRules["width"] = typeof currentRules["width"] === 'object' ? currentRules["width"] : {
            "default": currentRules["width"]
        };
        currentRules["width"]["size === \"L\""] = 160;
    } else if (props.size === "M") {
        if (!width) rules += ' Zc0XEhc18';
        currentRules["width"] = typeof currentRules["width"] === 'object' ? currentRules["width"] : {
            "default": currentRules["width"]
        };
        currentRules["width"]["size === \"M\""] = 96;
    } else if (props.size === "S") {
        if (!width) rules += ' ZBaYFfc18';
        currentRules["width"] = typeof currentRules["width"] === 'object' ? currentRules["width"] : {
            "default": currentRules["width"]
        };
        currentRules["width"]["size === \"S\""] = 48;
    }
    if (props.size === "L") {
        if (!height) rules += ' F3HJbhc18';
        currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
            "default": currentRules["height"]
        };
        currentRules["height"]["size === \"L\""] = 160;
    } else if (props.size === "M") {
        if (!height) rules += ' Fc0XEhc18';
        currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
            "default": currentRules["height"]
        };
        currentRules["height"]["size === \"M\""] = 96;
    } else if (props.size === "S") {
        if (!height) rules += ' FBaYFfc18';
        currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
            "default": currentRules["height"]
        };
        currentRules["height"]["size === \"S\""] = 48;
    }
    rules += ' _va18';
    currentRules["flexShrink"] = 0;
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Icon.native.js:64:27";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Icon.native.js:64:27"
        };
    }
    return rules;
};
function $72ec9054f1194d6d$export$4d00e7be716a0093(Component) {
    return (props)=>{
        let [ctx, ref] = (0, $3RlMb$untrack)(()=>(0, $1NDEx.useSpectrumContextProps)({
                get slot () {
                    return props.slot || 'icon';
                }
            }, undefined, $72ec9054f1194d6d$export$207c7561471de4bd));
        let size = ()=>props.size ?? ctx.size ?? 'M';
        let otherProps = (0, $3RlMb$omit)(props, 'UNSAFE_className', 'UNSAFE_style', 'slot', 'aria-label', 'aria-hidden', 'size', 'styles', 'render');
        const Svg = ()=>(0, $3RlMb$createComponent)(Component, (0, $3RlMb$mergeProps)(otherProps, {
                ref (r$) {
                    var _ref$2 = ref;
                    typeof _ref$2 === "function" || Array.isArray(_ref$2) ? (0, $3RlMb$applyRef)(_ref$2, r$) : ref = r$;
                },
                get size () {
                    return size();
                },
                "attr:focusable": "false",
                get "aria-label" () {
                    return props['aria-label'];
                },
                get "aria-hidden" () {
                    return (0, $3RlMb$memo)(()=>!!props['aria-label'])() ? (0, $3RlMb$memo)(()=>props['aria-hidden'] === true)() ? 'true' : props['aria-hidden'] || undefined : 'true';
                },
                role: "img",
                get "data-slot" () {
                    return props.slot;
                },
                get "class" () {
                    return (props.UNSAFE_className ?? '') + ' ' + $72ec9054f1194d6d$var$illustrationStyles({
                        size: size()
                    }, props.styles) + (ctx.styles || '');
                },
                get style () {
                    return props.UNSAFE_style;
                }
            }));
        return (0, $3RlMb$memo)(()=>(0, $3RlMb$memo)(()=>!!props.render)() ? props.render((0, $3RlMb$createComponent)(Svg, {})) : (0, $3RlMb$createComponent)(Svg, {}));
    };
}

});

parcelRegister("dBSpv", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $9e88efdb2e50319b$export$2e2bcd8739ae039; });
var $9e88efdb2e50319b$export$2e2bcd8739ae039 = {
    "ar-AE": {
        "actionbar.actions": `\u{627}\u{644}\u{625}\u{62C}\u{631}\u{627}\u{621}\u{627}\u{62A}`,
        "actionbar.actionsAvailable": `\u{627}\u{644}\u{625}\u{62C}\u{631}\u{627}\u{621}\u{627}\u{62A} \u{627}\u{644}\u{645}\u{62A}\u{627}\u{62D}\u{629}.`,
        "actionbar.clearSelection": `\u{625}\u{632}\u{627}\u{644}\u{629} \u{627}\u{644}\u{62A}\u{62D}\u{62F}\u{64A}\u{62F}`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{63A}\u{64A}\u{631} \u{645}\u{62D}\u{62F}\u{62F}`,
                other: ()=>`${formatter.number(args.count)} \u{645}\u{62D}\u{62F}\u{62F}`
            })}`,
        "actionbar.selectedAll": `\u{62A}\u{645} \u{62A}\u{62D}\u{62F}\u{64A}\u{62F} \u{627}\u{644}\u{643}\u{644}`,
        "actionbutton.pending": `\u{642}\u{64A}\u{62F} \u{627}\u{644}\u{627}\u{646}\u{62A}\u{638}\u{627}\u{631}`,
        "breadcrumbs.more": `\u{627}\u{644}\u{645}\u{632}\u{64A}\u{62F} \u{645}\u{646} \u{627}\u{644}\u{639}\u{646}\u{627}\u{635}\u{631}`,
        "button.pending": `\u{642}\u{64A}\u{62F} \u{627}\u{644}\u{627}\u{646}\u{62A}\u{638}\u{627}\u{631}`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `\u{627}\u{644}\u{62A}\u{627}\u{631}\u{64A}\u{62E}`,
                other: `\u{627}\u{644}\u{62A}\u{648}\u{627}\u{631}\u{64A}\u{62E}`
            })} \u{627}\u{644}\u{645}\u{62D}\u{62F}\u{62F}/\u{627}\u{644}\u{645}\u{62D}\u{62F}\u{62F}\u{629} \u{63A}\u{64A}\u{631} \u{645}\u{62A}\u{648}\u{641}\u{631}\u{629}.`,
        "combobox.loading": `\u{62C}\u{627}\u{631}\u{64D} \u{627}\u{644}\u{62A}\u{62D}\u{645}\u{64A}\u{644}...`,
        "combobox.loadingMore": `\u{62C}\u{627}\u{631}\u{64D} \u{62A}\u{62D}\u{645}\u{64A}\u{644} \u{627}\u{644}\u{645}\u{632}\u{64A}\u{62F}...`,
        "combobox.noResults": `\u{644}\u{627} \u{62A}\u{648}\u{62C}\u{62F} \u{646}\u{62A}\u{627}\u{626}\u{62C}`,
        "contextualhelp.help": `\u{645}\u{633}\u{627}\u{639}\u{62F}\u{629}`,
        "contextualhelp.info": `\u{645}\u{639}\u{644}\u{648}\u{645}\u{627}\u{62A}`,
        "datepicker.endTime": `\u{648}\u{642}\u{62A} \u{627}\u{644}\u{627}\u{646}\u{62A}\u{647}\u{627}\u{621}`,
        "datepicker.startTime": `\u{648}\u{642}\u{62A} \u{627}\u{644}\u{628}\u{62F}\u{621}`,
        "datepicker.time": `\u{627}\u{644}\u{648}\u{642}\u{62A}`,
        "dialog.alert": `\u{62A}\u{646}\u{628}\u{64A}\u{647}`,
        "dialog.dismiss": `\u{62A}\u{62C}\u{627}\u{647}\u{644}`,
        "dropzone.replaceMessage": `\u{644}\u{644}\u{627}\u{633}\u{62A}\u{628}\u{62F}\u{627}\u{644}\u{60C} \u{642}\u{645} \u{628}\u{625}\u{641}\u{644}\u{627}\u{62A} \u{627}\u{644}\u{645}\u{644}\u{641}`,
        "inlinealert.informative": `\u{645}\u{639}\u{644}\u{648}\u{645}\u{627}\u{62A}`,
        "inlinealert.negative": `\u{62E}\u{637}\u{623}`,
        "inlinealert.notice": `\u{62A}\u{62D}\u{630}\u{64A}\u{631}`,
        "inlinealert.positive": `\u{62A}\u{645} \u{628}\u{646}\u{62C}\u{627}\u{62D}`,
        "label.(optional)": `(\u{627}\u{62E}\u{62A}\u{64A}\u{627}\u{631}\u{64A})`,
        "label.(required)": `(\u{645}\u{637}\u{644}\u{648}\u{628})`,
        "listview.loading": `\u{62C}\u{627}\u{631}\u{64D} \u{627}\u{644}\u{62A}\u{62D}\u{645}\u{64A}\u{644}...`,
        "listview.loadingMore": `\u{62C}\u{627}\u{631}\u{64D} \u{62A}\u{62D}\u{645}\u{64A}\u{644} \u{627}\u{644}\u{645}\u{632}\u{64A}\u{62F}...`,
        "menu.loading": `\u{62C}\u{627}\u{631}\u{64D} \u{627}\u{644}\u{62A}\u{62D}\u{645}\u{64A}\u{644}...`,
        "menu.loadingMore": `\u{62C}\u{627}\u{631}\u{64D} \u{62A}\u{62D}\u{645}\u{64A}\u{644} \u{627}\u{644}\u{645}\u{632}\u{64A}\u{62F}...`,
        "menu.moreActions": `\u{627}\u{644}\u{645}\u{632}\u{64A}\u{62F} \u{645}\u{646} \u{627}\u{644}\u{625}\u{62C}\u{631}\u{627}\u{621}\u{627}\u{62A}`,
        "menu.noResults": `\u{644}\u{627} \u{62A}\u{648}\u{62C}\u{62F} \u{646}\u{62A}\u{627}\u{626}\u{62C}`,
        "menu.unavailable": `\u{63A}\u{64A}\u{631} \u{645}\u{64F}\u{62A}\u{648}\u{641}\u{631}\u{60C} \u{642}\u{64F}\u{645} \u{628}\u{627}\u{644}\u{62A}\u{648}\u{633}\u{64A}\u{639} \u{644}\u{644}\u{62D}\u{635}\u{648}\u{644} \u{639}\u{644}\u{649} \u{627}\u{644}\u{62A}\u{641}\u{627}\u{635}\u{64A}\u{644}`,
        "notificationbadge.indicatorOnly": `\u{646}\u{634}\u{627}\u{637} \u{62C}\u{62F}\u{64A}\u{62F}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `\u{62C}\u{627}\u{631}\u{64D} \u{627}\u{644}\u{62A}\u{62D}\u{645}\u{64A}\u{644}...`,
        "picker.loadingMore": `\u{62C}\u{627}\u{631}\u{64D} \u{62A}\u{62D}\u{645}\u{64A}\u{644} \u{627}\u{644}\u{645}\u{632}\u{64A}\u{62F}...`,
        "picker.placeholder": `\u{62A}\u{62D}\u{62F}\u{64A}\u{62F}\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{644}\u{645} \u{64A}\u{62A}\u{645} \u{62A}\u{62D}\u{62F}\u{64A}\u{62F} \u{623}\u{64A} \u{639}\u{646}\u{635}\u{631}`,
                one: `\u{62A}\u{645} \u{62A}\u{62D}\u{62F}\u{64A}\u{62F} \u{639}\u{646}\u{635}\u{631} \u{648}\u{627}\u{62D}\u{62F}`,
                two: `\u{62A}\u{645} \u{62A}\u{62D}\u{62F}\u{64A}\u{62F} \u{639}\u{646}\u{635}\u{631}\u{64A}\u{646}`,
                few: ()=>`\u{62A}\u{645} \u{62A}\u{62D}\u{62F}\u{64A}\u{62F} ${formatter.number(args.count)} \u{639}\u{646}\u{627}\u{635}\u{631}`,
                other: ()=>`\u{62A}\u{645} \u{62A}\u{62D}\u{62F}\u{64A}\u{62F} ${formatter.number(args.count)} \u{639}\u{646}\u{635}\u{631}`
            })}`,
        "sidepanel.collapse": `\u{637}\u{64A} \u{627}\u{644}\u{644}\u{648}\u{62D}\u{629} \u{627}\u{644}\u{62C}\u{627}\u{646}\u{628}\u{64A}\u{629}`,
        "sidepanel.expand": `\u{62A}\u{648}\u{633}\u{64A}\u{639} \u{627}\u{644}\u{644}\u{648}\u{62D}\u{629} \u{627}\u{644}\u{62C}\u{627}\u{646}\u{628}\u{64A}\u{629}`,
        "slider.maximum": `\u{623}\u{642}\u{635}\u{649}`,
        "slider.minimum": `\u{623}\u{62F}\u{646}\u{649}`,
        "table.cancel": `\u{625}\u{644}\u{63A}\u{627}\u{621}`,
        "table.drag": `\u{633}\u{62D}\u{628}`,
        "table.editCell": `\u{62A}\u{639}\u{62F}\u{64A}\u{644} \u{627}\u{644}\u{62E}\u{644}\u{64A}\u{629}`,
        "table.loading": `\u{62C}\u{627}\u{631}\u{64D} \u{627}\u{644}\u{62A}\u{62D}\u{645}\u{64A}\u{644}...`,
        "table.loadingMore": `\u{62C}\u{627}\u{631}\u{64D} \u{62A}\u{62D}\u{645}\u{64A}\u{644} \u{627}\u{644}\u{645}\u{632}\u{64A}\u{62F}...`,
        "table.resizeColumn": `\u{62A}\u{63A}\u{64A}\u{64A}\u{631} \u{62D}\u{62C}\u{645} \u{627}\u{644}\u{639}\u{645}\u{648}\u{62F}`,
        "table.save": `\u{62D}\u{641}\u{638}`,
        "table.sortAscending": `\u{641}\u{631}\u{632} \u{628}\u{62A}\u{631}\u{62A}\u{64A}\u{628} \u{62A}\u{635}\u{627}\u{639}\u{62F}\u{64A}`,
        "table.sortDescending": `\u{641}\u{631}\u{632} \u{628}\u{62A}\u{631}\u{62A}\u{64A}\u{628} \u{62A}\u{646}\u{627}\u{632}\u{644}\u{64A}`,
        "tag.actions": `\u{627}\u{644}\u{625}\u{62C}\u{631}\u{627}\u{621}\u{627}\u{62A}`,
        "tag.hideButtonLabel": `\u{625}\u{638}\u{647}\u{627}\u{631} \u{623}\u{642}\u{644}`,
        "tag.noTags": `\u{628}\u{62F}\u{648}\u{646}`,
        "tag.showAllButtonLabel": (args, formatter)=>`\u{639}\u{631}\u{636} \u{627}\u{644}\u{643}\u{644} (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `\u{645}\u{633}\u{62D} \u{627}\u{644}\u{643}\u{644}`,
        "toast.collapse": `\u{637}\u{64A}`,
        "toast.showAll": `\u{625}\u{638}\u{647}\u{627}\u{631} \u{627}\u{644}\u{643}\u{644}`,
        "treeview.loadingMore": `\u{62C}\u{627}\u{631}\u{64D} \u{62A}\u{62D}\u{645}\u{64A}\u{644} \u{627}\u{644}\u{645}\u{632}\u{64A}\u{62F}...`
    },
    "bg-BG": {
        "actionbar.actions": `\u{414}\u{435}\u{439}\u{441}\u{442}\u{432}\u{438}\u{44F}`,
        "actionbar.actionsAvailable": `\u{41D}\u{430}\u{43B}\u{438}\u{447}\u{43D}\u{438} \u{434}\u{435}\u{439}\u{441}\u{442}\u{432}\u{438}\u{44F}.`,
        "actionbar.clearSelection": `\u{418}\u{437}\u{447}\u{438}\u{441}\u{442}\u{432}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{438}\u{437}\u{431}\u{43E}\u{440}\u{430}`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{41D}\u{44F}\u{43C}\u{430} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{438}`,
                one: ()=>`${formatter.number(args.count)} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D}`,
                other: ()=>`${formatter.number(args.count)} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{438}`
            })}`,
        "actionbar.selectedAll": `\u{412}\u{441}\u{438}\u{447}\u{43A}\u{438} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{438}`,
        "actionbutton.pending": `\u{43D}\u{435}\u{434}\u{43E}\u{432}\u{44A}\u{440}\u{448}\u{435}\u{43D}\u{43E}`,
        "breadcrumbs.more": `\u{41E}\u{449}\u{435} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{438}`,
        "button.pending": `\u{43D}\u{435}\u{434}\u{43E}\u{432}\u{44A}\u{440}\u{448}\u{435}\u{43D}\u{43E}`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `\u{418}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{430}\u{442}\u{430} \u{434}\u{430}\u{442}\u{430} \u{43D}\u{435} \u{435} \u{43D}\u{430}\u{43B}\u{438}\u{447}\u{43D}\u{430}`,
                other: `\u{418}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{438}\u{442}\u{435} \u{434}\u{430}\u{442}\u{438} \u{43D}\u{435} \u{441}\u{430} \u{43D}\u{430}\u{43B}\u{438}\u{447}\u{43D}\u{438}`
            })}.`,
        "combobox.loading": `\u{417}\u{430}\u{440}\u{435}\u{436}\u{434}\u{430}\u{43D}\u{435}...`,
        "combobox.loadingMore": `\u{417}\u{430}\u{440}\u{435}\u{436}\u{434}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{43E}\u{449}\u{435}...`,
        "combobox.noResults": `\u{41D}\u{44F}\u{43C}\u{430} \u{440}\u{435}\u{437}\u{443}\u{43B}\u{442}\u{430}\u{442}\u{438}`,
        "contextualhelp.help": `\u{41F}\u{43E}\u{43C}\u{43E}\u{449}`,
        "contextualhelp.info": `\u{418}\u{43D}\u{444}\u{43E}\u{440}\u{43C}\u{430}\u{446}\u{438}\u{44F}`,
        "datepicker.endTime": `\u{41A}\u{440}\u{430}\u{435}\u{43D} \u{447}\u{430}\u{441}`,
        "datepicker.startTime": `\u{41D}\u{430}\u{447}\u{430}\u{43B}\u{435}\u{43D} \u{447}\u{430}\u{441}`,
        "datepicker.time": `\u{412}\u{440}\u{435}\u{43C}\u{435}`,
        "dialog.alert": `\u{421}\u{438}\u{433}\u{43D}\u{430}\u{43B}`,
        "dialog.dismiss": `\u{41E}\u{442}\u{445}\u{432}\u{44A}\u{440}\u{43B}\u{44F}\u{43D}\u{435}`,
        "dropzone.replaceMessage": `\u{41F}\u{443}\u{441}\u{43D}\u{435}\u{442}\u{435} \u{444}\u{430}\u{439}\u{43B} \u{437}\u{430} \u{437}\u{430}\u{43C}\u{44F}\u{43D}\u{430}`,
        "inlinealert.informative": `\u{418}\u{43D}\u{444}\u{43E}\u{440}\u{43C}\u{430}\u{446}\u{438}\u{44F}`,
        "inlinealert.negative": `\u{413}\u{440}\u{435}\u{448}\u{43A}\u{430}`,
        "inlinealert.notice": `\u{41F}\u{440}\u{435}\u{434}\u{443}\u{43F}\u{440}\u{435}\u{436}\u{434}\u{435}\u{43D}\u{438}\u{435}`,
        "inlinealert.positive": `\u{423}\u{441}\u{43F}\u{435}\u{448}\u{43D}\u{43E}`,
        "label.(optional)": `(\u{43D}\u{435}\u{437}\u{430}\u{434}\u{44A}\u{43B}\u{436}\u{438}\u{442}\u{435}\u{43B}\u{43D}\u{43E})`,
        "label.(required)": `(\u{437}\u{430}\u{434}\u{44A}\u{43B}\u{436}\u{438}\u{442}\u{435}\u{43B}\u{43D}\u{43E})`,
        "listview.loading": `\u{417}\u{430}\u{440}\u{435}\u{436}\u{434}\u{430}\u{43D}\u{435}...`,
        "listview.loadingMore": `\u{417}\u{430}\u{440}\u{435}\u{436}\u{434}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{43E}\u{449}\u{435}...`,
        "menu.loading": `\u{417}\u{430}\u{440}\u{435}\u{436}\u{434}\u{430}\u{43D}\u{435}...`,
        "menu.loadingMore": `\u{417}\u{430}\u{440}\u{435}\u{436}\u{434}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{43E}\u{449}\u{435}...`,
        "menu.moreActions": `\u{41F}\u{43E}\u{432}\u{435}\u{447}\u{435} \u{434}\u{435}\u{439}\u{441}\u{442}\u{432}\u{438}\u{44F}`,
        "menu.noResults": `\u{41D}\u{44F}\u{43C}\u{430} \u{440}\u{435}\u{437}\u{443}\u{43B}\u{442}\u{430}\u{442}\u{438}`,
        "menu.unavailable": `\u{41D}\u{435}\u{434}\u{43E}\u{441}\u{442}\u{44A}\u{43F}\u{43D}\u{43E}, \u{440}\u{430}\u{437}\u{433}\u{44A}\u{43D}\u{435}\u{442}\u{435} \u{437}\u{430} \u{43F}\u{43E}\u{434}\u{440}\u{43E}\u{431}\u{43D}\u{43E}\u{441}\u{442}\u{438}`,
        "notificationbadge.indicatorOnly": `\u{41D}\u{43E}\u{432}\u{430} \u{434}\u{435}\u{439}\u{43D}\u{43E}\u{441}\u{442}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `\u{417}\u{430}\u{440}\u{435}\u{436}\u{434}\u{430}\u{43D}\u{435}...`,
        "picker.loadingMore": `\u{417}\u{430}\u{440}\u{435}\u{436}\u{434}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{43E}\u{449}\u{435}...`,
        "picker.placeholder": `\u{418}\u{437}\u{431}\u{435}\u{440}\u{435}\u{442}\u{435}\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{41D}\u{44F}\u{43C}\u{430} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{438} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{438}`,
                one: ()=>`${formatter.number(args.count)} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}`,
                other: ()=>`${formatter.number(args.count)} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{438} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{430}`
            })}`,
        "sidepanel.collapse": `\u{421}\u{433}\u{44A}\u{432}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{441}\u{442}\u{440}\u{430}\u{43D}\u{438}\u{447}\u{43D}\u{438}\u{44F} \u{43F}\u{430}\u{43D}\u{435}\u{43B}`,
        "sidepanel.expand": `\u{420}\u{430}\u{437}\u{433}\u{44A}\u{432}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{441}\u{442}\u{440}\u{430}\u{43D}\u{438}\u{447}\u{43D}\u{438}\u{44F} \u{43F}\u{430}\u{43D}\u{435}\u{43B}`,
        "slider.maximum": `\u{41C}\u{430}\u{43A}\u{441}\u{438}\u{43C}\u{443}\u{43C}`,
        "slider.minimum": `\u{41C}\u{438}\u{43D}\u{438}\u{43C}\u{443}\u{43C}`,
        "table.cancel": `\u{41E}\u{442}\u{43A}\u{430}\u{437}`,
        "table.drag": `\u{41F}\u{43B}\u{44A}\u{437}\u{43D}\u{435}\u{442}\u{435}`,
        "table.editCell": `\u{420}\u{435}\u{434}\u{430}\u{43A}\u{442}\u{438}\u{440}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{43A}\u{43B}\u{435}\u{442}\u{43A}\u{430}`,
        "table.loading": `\u{417}\u{430}\u{440}\u{435}\u{436}\u{434}\u{430}\u{43D}\u{435}...`,
        "table.loadingMore": `\u{417}\u{430}\u{440}\u{435}\u{436}\u{434}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{43E}\u{449}\u{435}...`,
        "table.resizeColumn": `\u{41F}\u{440}\u{435}\u{43E}\u{440}\u{430}\u{437}\u{43C}\u{435}\u{440}\u{44F}\u{432}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{43A}\u{43E}\u{43B}\u{43E}\u{43D}\u{430}`,
        "table.save": `\u{417}\u{430}\u{43F}\u{430}\u{437}\u{432}\u{430}\u{43D}\u{435}`,
        "table.sortAscending": `\u{412}\u{44A}\u{437}\u{445}\u{43E}\u{434}\u{44F}\u{449}\u{43E} \u{441}\u{43E}\u{440}\u{442}\u{438}\u{440}\u{430}\u{43D}\u{435}`,
        "table.sortDescending": `\u{41D}\u{438}\u{437}\u{445}\u{43E}\u{434}\u{44F}\u{449}\u{43E} \u{441}\u{43E}\u{440}\u{442}\u{438}\u{440}\u{430}\u{43D}\u{435} `,
        "tag.actions": `\u{414}\u{435}\u{439}\u{441}\u{442}\u{432}\u{438}\u{44F}`,
        "tag.hideButtonLabel": `\u{41F}\u{43E}\u{43A}\u{430}\u{437}\u{432}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{43F}\u{43E}-\u{43C}\u{430}\u{43B}\u{43A}\u{43E}`,
        "tag.noTags": `\u{41D}\u{438}\u{442}\u{43E} \u{435}\u{434}\u{438}\u{43D}`,
        "tag.showAllButtonLabel": (args, formatter)=>`\u{41F}\u{43E}\u{43A}\u{430}\u{437}\u{432}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{432}\u{441}\u{438}\u{447}\u{43A}\u{438} (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `\u{418}\u{437}\u{447}\u{438}\u{441}\u{442}\u{438} \u{432}\u{441}\u{438}\u{447}\u{43A}\u{438}`,
        "toast.collapse": `\u{421}\u{432}\u{438}\u{432}\u{430}\u{43D}\u{435}`,
        "toast.showAll": `\u{41F}\u{43E}\u{43A}\u{430}\u{436}\u{438} \u{432}\u{441}\u{438}\u{447}\u{43A}\u{438}`,
        "treeview.loadingMore": `\u{417}\u{430}\u{440}\u{435}\u{436}\u{434}\u{430}\u{43D}\u{435} \u{43D}\u{430} \u{43E}\u{449}\u{435}...`
    },
    "cs-CZ": {
        "actionbar.actions": `Akce`,
        "actionbar.actionsAvailable": `Dostupn\xe9 akce.`,
        "actionbar.clearSelection": `Vymazat v\xfdb\u{11B}r`,
        "actionbar.selected": (args)=>`Vybr\xe1no: ${args.count}`,
        "actionbar.selectedAll": `Vybr\xe1no v\u{161}e`,
        "actionbutton.pending": `\u{10D}ek\xe1 na vy\u{159}\xedzen\xed`,
        "breadcrumbs.more": `Dal\u{161}\xed polo\u{17E}ky`,
        "button.pending": `\u{10D}ek\xe1 na vy\u{159}\xedzen\xed`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `Vybran\xe9 datum nen\xed`,
                other: `Vybran\xe1 data nejsou`
            })} k dispozici.`,
        "combobox.loading": `Na\u{10D}\xedt\xe1n\xed...`,
        "combobox.loadingMore": `Na\u{10D}\xedt\xe1n\xed dal\u{161}\xedch...`,
        "combobox.noResults": `\u{17D}\xe1dn\xe9 v\xfdsledky`,
        "contextualhelp.help": `N\xe1pov\u{11B}da`,
        "contextualhelp.info": `Informace`,
        "datepicker.endTime": `Kone\u{10D}n\xfd \u{10D}as`,
        "datepicker.startTime": `Po\u{10D}\xe1te\u{10D}n\xed \u{10D}as`,
        "datepicker.time": `\u{10C}as`,
        "dialog.alert": `V\xfdstraha`,
        "dialog.dismiss": `Odstranit`,
        "dropzone.replaceMessage": `P\u{159}et\xe1hn\u{11B}te soubor k nahrazen\xed`,
        "inlinealert.informative": `Informace`,
        "inlinealert.negative": `Chyba`,
        "inlinealert.notice": `Varov\xe1n\xed`,
        "inlinealert.positive": `\xdasp\u{11B}ch`,
        "label.(optional)": `(voliteln\u{11B})`,
        "label.(required)": `(po\u{17E}adov\xe1no)`,
        "listview.loading": `Na\u{10D}\xedt\xe1n\xed...`,
        "listview.loadingMore": `Na\u{10D}\xedt\xe1n\xed dal\u{161}\xedch...`,
        "menu.loading": `Na\u{10D}\xedt\xe1n\xed...`,
        "menu.loadingMore": `Na\u{10D}\xedt\xe1n\xed dal\u{161}\xedch...`,
        "menu.moreActions": `Dal\u{161}\xed akce`,
        "menu.noResults": `\u{17D}\xe1dn\xe9 v\xfdsledky`,
        "menu.unavailable": `Nen\xed k dispozici, rozbalen\xedm zobraz\xedte podrobnosti`,
        "notificationbadge.indicatorOnly": `Nov\xe1 aktivita`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Na\u{10D}\xedt\xe1n\xed...`,
        "picker.loadingMore": `Na\u{10D}\xedt\xe1n\xed dal\u{161}\xedch...`,
        "picker.placeholder": `Vybrat\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nevybr\xe1ny \u{17E}\xe1dn\xe9 polo\u{17E}ky`,
                one: ()=>`Vybr\xe1na ${formatter.number(args.count)} polo\u{17E}ka`,
                few: ()=>`Vybr\xe1ny ${formatter.number(args.count)} polo\u{17E}ky`,
                other: ()=>`Vybr\xe1no ${formatter.number(args.count)} polo\u{17E}ek`
            })}`,
        "sidepanel.collapse": `Sbalit postrann\xed panel`,
        "sidepanel.expand": `Rozbalit postrann\xed panel`,
        "slider.maximum": `Maximum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `Zru\u{161}it`,
        "table.drag": `P\u{159}et\xe1hnout`,
        "table.editCell": `Upravit bu\u{148}ku`,
        "table.loading": `Na\u{10D}\xedt\xe1n\xed...`,
        "table.loadingMore": `Na\u{10D}\xedt\xe1n\xed dal\u{161}\xedch...`,
        "table.resizeColumn": `Zm\u{11B}nit velikost sloupce`,
        "table.save": `Ulo\u{17E}it`,
        "table.sortAscending": `Se\u{159}adit vzestupn\u{11B}`,
        "table.sortDescending": `Se\u{159}adit sestupn\u{11B}`,
        "tag.actions": `Akce`,
        "tag.hideButtonLabel": `Zobrazit m\xe9n\u{11B}`,
        "tag.noTags": `\u{17D}\xe1dn\xfd`,
        "tag.showAllButtonLabel": (args, formatter)=>`Zobrazit v\u{161}e (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Smazat v\u{161}e`,
        "toast.collapse": `Sbalit`,
        "toast.showAll": `Zobrazit v\u{161}e`,
        "treeview.loadingMore": `Na\u{10D}\xedt\xe1n\xed dal\u{161}\xedch...`
    },
    "da-DK": {
        "actionbar.actions": `Handlinger`,
        "actionbar.actionsAvailable": `Tilg\xe6ngelige handlinger.`,
        "actionbar.clearSelection": `Ryd markering`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Ingen valgt`,
                other: ()=>`${formatter.number(args.count)} valgt`
            })}`,
        "actionbar.selectedAll": `Alle valgt`,
        "actionbutton.pending": `afventende`,
        "breadcrumbs.more": `Flere elementer`,
        "button.pending": `afventende`,
        "calendar.invalidSelection": (args, formatter)=>`Valgte ${formatter.plural(args.selectedCount, {
                one: `dato`,
                other: `datoer`
            })} ikke ledige.`,
        "combobox.loading": `Indl\xe6ser...`,
        "combobox.loadingMore": `Indl\xe6ser flere...`,
        "combobox.noResults": `Ingen resultater`,
        "contextualhelp.help": `Hj\xe6lp`,
        "contextualhelp.info": `Oplysninger`,
        "datepicker.endTime": `Sluttidspunkt`,
        "datepicker.startTime": `Starttidspunkt`,
        "datepicker.time": `Klokkesl\xe6t`,
        "dialog.alert": `Advarsel`,
        "dialog.dismiss": `Luk`,
        "dropzone.replaceMessage": `Drop fil for at erstatte`,
        "inlinealert.informative": `Oplysninger`,
        "inlinealert.negative": `Fejl`,
        "inlinealert.notice": `Advarsel`,
        "inlinealert.positive": `Fuldf\xf8rt`,
        "label.(optional)": `(valgfrit)`,
        "label.(required)": `(obligatorisk)`,
        "listview.loading": `Indl\xe6ser...`,
        "listview.loadingMore": `Indl\xe6ser flere...`,
        "menu.loading": `Indl\xe6ser...`,
        "menu.loadingMore": `Indl\xe6ser flere...`,
        "menu.moreActions": `Flere handlinger`,
        "menu.noResults": `Ingen resultater`,
        "menu.unavailable": `Ikke tilg\xe6ngelig, udvid for detaljer`,
        "notificationbadge.indicatorOnly": `Ny aktivitet`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Indl\xe6ser...`,
        "picker.loadingMore": `Indl\xe6ser flere...`,
        "picker.placeholder": `V\xe6lg\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Ingen elementer valgt`,
                one: ()=>`${formatter.number(args.count)} element valgt`,
                other: ()=>`${formatter.number(args.count)} elementer valgt`
            })}`,
        "sidepanel.collapse": `Skjul sidepanel`,
        "sidepanel.expand": `Udvid sidepanel`,
        "slider.maximum": `Maksimum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `Annuller`,
        "table.drag": `Tr\xe6k`,
        "table.editCell": `Rediger celle`,
        "table.loading": `Indl\xe6ser...`,
        "table.loadingMore": `Indl\xe6ser flere...`,
        "table.resizeColumn": `Tilpas st\xf8rrelse p\xe5 kolonne`,
        "table.save": `Gem`,
        "table.sortAscending": `Sorter stigende`,
        "table.sortDescending": `Sorter faldende`,
        "tag.actions": `Handlinger`,
        "tag.hideButtonLabel": `Vis mindre`,
        "tag.noTags": `Ingen`,
        "tag.showAllButtonLabel": (args, formatter)=>`Vis alle (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Ryd alle`,
        "toast.collapse": `Skjul`,
        "toast.showAll": `Vis alle`,
        "treeview.loadingMore": `Indl\xe6ser flere...`
    },
    "de-DE": {
        "actionbar.actions": `Aktionen`,
        "actionbar.actionsAvailable": `Aktionen verf\xfcgbar.`,
        "actionbar.clearSelection": `Auswahl l\xf6schen`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nichts ausgew\xe4hlt`,
                one: ()=>`${formatter.number(args.count)} ausgew\xe4hlt`,
                other: ()=>`${formatter.number(args.count)} ausgew\xe4hlt`
            })}`,
        "actionbar.selectedAll": `Alles ausgew\xe4hlt`,
        "actionbutton.pending": `Ausstehend`,
        "breadcrumbs.more": `Weitere Elemente`,
        "button.pending": `Ausstehend`,
        "calendar.invalidSelection": (args, formatter)=>`Ausgew\xe4hlte(s) ${formatter.plural(args.selectedCount, {
                one: `Datum`,
                other: `Daten`
            })} nicht verf\xfcgbar.`,
        "combobox.loading": `Laden...`,
        "combobox.loadingMore": `Mehr laden ...`,
        "combobox.noResults": `Keine Ergebnisse`,
        "contextualhelp.help": `Hilfe`,
        "contextualhelp.info": `Informationen`,
        "datepicker.endTime": `Endzeit`,
        "datepicker.startTime": `Startzeit`,
        "datepicker.time": `Uhrzeit`,
        "dialog.alert": `Warnhinweis`,
        "dialog.dismiss": `Schlie\xdfen`,
        "dropzone.replaceMessage": `Datei zum Ersetzen ablegen`,
        "inlinealert.informative": `Informationen`,
        "inlinealert.negative": `Fehler`,
        "inlinealert.notice": `Warnung`,
        "inlinealert.positive": `Erfolg`,
        "label.(optional)": `(optional)`,
        "label.(required)": `(erforderlich)`,
        "listview.loading": `Laden...`,
        "listview.loadingMore": `Mehr laden ...`,
        "menu.loading": `Laden...`,
        "menu.loadingMore": `Mehr laden ...`,
        "menu.moreActions": `Mehr Aktionen`,
        "menu.noResults": `Keine Ergebnisse`,
        "menu.unavailable": `Nicht verf\xfcgbar, f\xfcr Details erweitern`,
        "notificationbadge.indicatorOnly": `Neue Aktivit\xe4t`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Laden...`,
        "picker.loadingMore": `Mehr laden ...`,
        "picker.placeholder": `Ausw\xe4hlen\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Keine Elemente ausgew\xe4hlt`,
                one: ()=>`${formatter.number(args.count)} Element ausgew\xe4hlt`,
                other: ()=>`${formatter.number(args.count)} Elemente ausgew\xe4hlt`
            })}`,
        "sidepanel.collapse": `Seitliches Panel reduzieren`,
        "sidepanel.expand": `Seitliches Panel erweitern`,
        "slider.maximum": `Maximum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `Abbrechen`,
        "table.drag": `Ziehen`,
        "table.editCell": `Zelle bearbeiten`,
        "table.loading": `Laden...`,
        "table.loadingMore": `Mehr laden ...`,
        "table.resizeColumn": `Spaltengr\xf6\xdfe \xe4ndern`,
        "table.save": `Speichern`,
        "table.sortAscending": `Aufsteigend sortieren`,
        "table.sortDescending": `Absteigend sortieren`,
        "tag.actions": `Aktionen`,
        "tag.hideButtonLabel": `Weniger zeigen`,
        "tag.noTags": `Keine`,
        "tag.showAllButtonLabel": (args, formatter)=>`Alle anzeigen (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Alle l\xf6schen`,
        "toast.collapse": `Reduzieren`,
        "toast.showAll": `Alle anzeigen`,
        "treeview.loadingMore": `Mehr laden ...`
    },
    "el-GR": {
        "actionbar.actions": `\u{395}\u{3BD}\u{3AD}\u{3C1}\u{3B3}\u{3B5}\u{3B9}\u{3B5}\u{3C2}`,
        "actionbar.actionsAvailable": `\u{3A5}\u{3C0}\u{3AC}\u{3C1}\u{3C7}\u{3BF}\u{3C5}\u{3BD} \u{3B4}\u{3B9}\u{3B1}\u{3B8}\u{3AD}\u{3C3}\u{3B9}\u{3BC}\u{3B5}\u{3C2} \u{3B5}\u{3BD}\u{3AD}\u{3C1}\u{3B3}\u{3B5}\u{3B9}\u{3B5}\u{3C2}.`,
        "actionbar.clearSelection": `\u{395}\u{3BA}\u{3BA}\u{3B1}\u{3B8}\u{3AC}\u{3C1}\u{3B9}\u{3C3}\u{3B7} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3BF}\u{3B3}\u{3AE}\u{3C2}`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{394}\u{3B5}\u{3BD} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3AD}\u{3C7}\u{3B8}\u{3B7}\u{3BA}\u{3B5} \u{3BA}\u{3B1}\u{3BD}\u{3AD}\u{3BD}\u{3B1}`,
                one: ()=>`${formatter.number(args.count)} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3B5}\u{3B3}\u{3BC}\u{3AD}\u{3BD}\u{3BF}`,
                other: ()=>`${formatter.number(args.count)} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3B5}\u{3B3}\u{3BC}\u{3AD}\u{3BD}\u{3B1}`
            })}`,
        "actionbar.selectedAll": `\u{395}\u{3C0}\u{3B9}\u{3BB}\u{3AD}\u{3C7}\u{3B8}\u{3B7}\u{3BA}\u{3B1}\u{3BD} \u{3CC}\u{3BB}\u{3B1}`,
        "actionbutton.pending": `\u{3C3}\u{3B5} \u{3B5}\u{3BA}\u{3BA}\u{3C1}\u{3B5}\u{3BC}\u{3CC}\u{3C4}\u{3B7}\u{3C4}\u{3B1}`,
        "breadcrumbs.more": `\u{3A0}\u{3B5}\u{3C1}\u{3B9}\u{3C3}\u{3C3}\u{3CC}\u{3C4}\u{3B5}\u{3C1}\u{3B1} \u{3C3}\u{3C4}\u{3BF}\u{3B9}\u{3C7}\u{3B5}\u{3AF}\u{3B1}`,
        "button.pending": `\u{3C3}\u{3B5} \u{3B5}\u{3BA}\u{3BA}\u{3C1}\u{3B5}\u{3BC}\u{3CC}\u{3C4}\u{3B7}\u{3C4}\u{3B1}`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `\u{397} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3B5}\u{3B3}\u{3BC}\u{3AD}\u{3BD}\u{3B7} \u{3B7}\u{3BC}\u{3B5}\u{3C1}\u{3BF}\u{3BC}\u{3B7}\u{3BD}\u{3AF}\u{3B1} \u{3B4}\u{3B5}\u{3BD} \u{3B5}\u{3AF}\u{3BD}\u{3B1}\u{3B9} \u{3B4}\u{3B9}\u{3B1}\u{3B8}\u{3AD}\u{3C3}\u{3B9}\u{3BC}\u{3B7}`,
                other: `\u{39F}\u{3B9} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3B5}\u{3B3}\u{3BC}\u{3AD}\u{3BD}\u{3B5}\u{3C2} \u{3B7}\u{3BC}\u{3B5}\u{3C1}\u{3BF}\u{3BC}\u{3B7}\u{3BD}\u{3AF}\u{3B5}\u{3C2} \u{3B4}\u{3B5}\u{3BD} \u{3B5}\u{3AF}\u{3BD}\u{3B1}\u{3B9} \u{3B4}\u{3B9}\u{3B1}\u{3B8}\u{3AD}\u{3C3}\u{3B9}\u{3BC}\u{3B5}\u{3C2}`
            })}.`,
        "combobox.loading": `\u{3A6}\u{3CC}\u{3C1}\u{3C4}\u{3C9}\u{3C3}\u{3B7}...`,
        "combobox.loadingMore": `\u{3A6}\u{3CC}\u{3C1}\u{3C4}\u{3C9}\u{3C3}\u{3B7} \u{3C0}\u{3B5}\u{3C1}\u{3B9}\u{3C3}\u{3C3}\u{3CC}\u{3C4}\u{3B5}\u{3C1}\u{3C9}\u{3BD}...`,
        "combobox.noResults": `\u{39A}\u{3B1}\u{3BD}\u{3AD}\u{3BD}\u{3B1} \u{3B1}\u{3C0}\u{3BF}\u{3C4}\u{3AD}\u{3BB}\u{3B5}\u{3C3}\u{3BC}\u{3B1}`,
        "contextualhelp.help": `\u{392}\u{3BF}\u{3AE}\u{3B8}\u{3B5}\u{3B9}\u{3B1}`,
        "contextualhelp.info": `\u{3A0}\u{3BB}\u{3B7}\u{3C1}\u{3BF}\u{3C6}\u{3BF}\u{3C1}\u{3AF}\u{3B5}\u{3C2}`,
        "datepicker.endTime": `\u{3A7}\u{3C1}\u{3CC}\u{3BD}\u{3BF}\u{3C2} \u{3BB}\u{3AE}\u{3BE}\u{3B7}\u{3C2}`,
        "datepicker.startTime": `\u{38F}\u{3C1}\u{3B1} \u{3AD}\u{3BD}\u{3B1}\u{3C1}\u{3BE}\u{3B7}\u{3C2}`,
        "datepicker.time": `\u{3A7}\u{3C1}\u{3CC}\u{3BD}\u{3BF}\u{3C2}`,
        "dialog.alert": `\u{395}\u{3B9}\u{3B4}\u{3BF}\u{3C0}\u{3BF}\u{3AF}\u{3B7}\u{3C3}\u{3B7}`,
        "dialog.dismiss": `\u{391}\u{3C0}\u{3CC}\u{3C1}\u{3C1}\u{3B9}\u{3C8}\u{3B7}`,
        "dropzone.replaceMessage": `\u{391}\u{3C0}\u{3CC}\u{3B8}\u{3B5}\u{3C3}\u{3B7} \u{3B1}\u{3C1}\u{3C7}\u{3B5}\u{3AF}\u{3BF}\u{3C5} \u{3B3}\u{3B9}\u{3B1} \u{3B1}\u{3BD}\u{3C4}\u{3B9}\u{3BA}\u{3B1}\u{3C4}\u{3AC}\u{3C3}\u{3C4}\u{3B1}\u{3C3}\u{3B7}`,
        "inlinealert.informative": `\u{3A0}\u{3BB}\u{3B7}\u{3C1}\u{3BF}\u{3C6}\u{3BF}\u{3C1}\u{3AF}\u{3B5}\u{3C2}`,
        "inlinealert.negative": `\u{3A3}\u{3C6}\u{3AC}\u{3BB}\u{3BC}\u{3B1}`,
        "inlinealert.notice": `\u{3A0}\u{3C1}\u{3BF}\u{3B5}\u{3B9}\u{3B4}\u{3BF}\u{3C0}\u{3BF}\u{3AF}\u{3B7}\u{3C3}\u{3B7}`,
        "inlinealert.positive": `\u{395}\u{3C0}\u{3B9}\u{3C4}\u{3C5}\u{3C7}\u{3AF}\u{3B1}`,
        "label.(optional)": `(\u{3C0}\u{3C1}\u{3BF}\u{3B1}\u{3B9}\u{3C1}\u{3B5}\u{3C4}\u{3B9}\u{3BA}\u{3CC})`,
        "label.(required)": `(\u{3B1}\u{3C0}\u{3B1}\u{3B9}\u{3C4}\u{3B5}\u{3AF}\u{3C4}\u{3B1}\u{3B9})`,
        "listview.loading": `\u{3A6}\u{3CC}\u{3C1}\u{3C4}\u{3C9}\u{3C3}\u{3B7}...`,
        "listview.loadingMore": `\u{3A6}\u{3CC}\u{3C1}\u{3C4}\u{3C9}\u{3C3}\u{3B7} \u{3C0}\u{3B5}\u{3C1}\u{3B9}\u{3C3}\u{3C3}\u{3CC}\u{3C4}\u{3B5}\u{3C1}\u{3C9}\u{3BD}...`,
        "menu.loading": `\u{3A6}\u{3CC}\u{3C1}\u{3C4}\u{3C9}\u{3C3}\u{3B7}...`,
        "menu.loadingMore": `\u{3A6}\u{3CC}\u{3C1}\u{3C4}\u{3C9}\u{3C3}\u{3B7} \u{3C0}\u{3B5}\u{3C1}\u{3B9}\u{3C3}\u{3C3}\u{3CC}\u{3C4}\u{3B5}\u{3C1}\u{3C9}\u{3BD}...`,
        "menu.moreActions": `\u{3A0}\u{3B5}\u{3C1}\u{3B9}\u{3C3}\u{3C3}\u{3CC}\u{3C4}\u{3B5}\u{3C1}\u{3B5}\u{3C2} \u{3B5}\u{3BD}\u{3AD}\u{3C1}\u{3B3}\u{3B5}\u{3B9}\u{3B5}\u{3C2}`,
        "menu.noResults": `\u{39A}\u{3B1}\u{3BD}\u{3AD}\u{3BD}\u{3B1} \u{3B1}\u{3C0}\u{3BF}\u{3C4}\u{3AD}\u{3BB}\u{3B5}\u{3C3}\u{3BC}\u{3B1}`,
        "menu.unavailable": `\u{39C}\u{3B7} \u{3B4}\u{3B9}\u{3B1}\u{3B8}\u{3AD}\u{3C3}\u{3B9}\u{3BC}\u{3BF}, \u{3B1}\u{3BD}\u{3AC}\u{3C0}\u{3C4}\u{3C5}\u{3BE}\u{3B7} \u{3B3}\u{3B9}\u{3B1} \u{3BB}\u{3B5}\u{3C0}\u{3C4}\u{3BF}\u{3BC}\u{3AD}\u{3C1}\u{3B5}\u{3B9}\u{3B5}\u{3C2}`,
        "notificationbadge.indicatorOnly": `\u{39D}\u{3AD}\u{3B1} \u{3B4}\u{3C1}\u{3B1}\u{3C3}\u{3C4}\u{3B7}\u{3C1}\u{3B9}\u{3CC}\u{3C4}\u{3B7}\u{3C4}\u{3B1}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `\u{3A6}\u{3CC}\u{3C1}\u{3C4}\u{3C9}\u{3C3}\u{3B7}...`,
        "picker.loadingMore": `\u{3A6}\u{3CC}\u{3C1}\u{3C4}\u{3C9}\u{3C3}\u{3B7} \u{3C0}\u{3B5}\u{3C1}\u{3B9}\u{3C3}\u{3C3}\u{3CC}\u{3C4}\u{3B5}\u{3C1}\u{3C9}\u{3BD}...`,
        "picker.placeholder": `\u{395}\u{3C0}\u{3B9}\u{3BB}\u{3BF}\u{3B3}\u{3AE}\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{394}\u{3B5}\u{3BD} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3AD}\u{3C7}\u{3B8}\u{3B7}\u{3BA}\u{3B1}\u{3BD} \u{3C3}\u{3C4}\u{3BF}\u{3B9}\u{3C7}\u{3B5}\u{3AF}\u{3B1}`,
                one: ()=>`\u{395}\u{3C0}\u{3B9}\u{3BB}\u{3AD}\u{3C7}\u{3B8}\u{3B7}\u{3BA}\u{3B5} ${formatter.number(args.count)} \u{3C3}\u{3C4}\u{3BF}\u{3B9}\u{3C7}\u{3B5}\u{3AF}\u{3BF}`,
                other: ()=>`\u{395}\u{3C0}\u{3B9}\u{3BB}\u{3AD}\u{3C7}\u{3B8}\u{3B7}\u{3BA}\u{3B1}\u{3BD} ${formatter.number(args.count)} \u{3C3}\u{3C4}\u{3BF}\u{3B9}\u{3C7}\u{3B5}\u{3AF}\u{3B1}`
            })}`,
        "sidepanel.collapse": `\u{3A3}\u{3CD}\u{3BC}\u{3C0}\u{3C4}\u{3C5}\u{3BE}\u{3B7} \u{3C0}\u{3BB}\u{3B5}\u{3C5}\u{3C1}\u{3B9}\u{3BA}\u{3BF}\u{3CD} \u{3C0}\u{3BB}\u{3B1}\u{3B9}\u{3C3}\u{3AF}\u{3BF}\u{3C5}`,
        "sidepanel.expand": `\u{395}\u{3C0}\u{3AD}\u{3BA}\u{3C4}\u{3B1}\u{3C3}\u{3B7} \u{3C0}\u{3BB}\u{3B5}\u{3C5}\u{3C1}\u{3B9}\u{3BA}\u{3BF}\u{3CD} \u{3C0}\u{3BB}\u{3B1}\u{3B9}\u{3C3}\u{3AF}\u{3BF}\u{3C5}`,
        "slider.maximum": `\u{39C}\u{3AD}\u{3B3}\u{3B9}\u{3C3}\u{3C4}\u{3BF}`,
        "slider.minimum": `\u{395}\u{3BB}\u{3AC}\u{3C7}\u{3B9}\u{3C3}\u{3C4}\u{3BF}`,
        "table.cancel": `\u{391}\u{3BA}\u{3CD}\u{3C1}\u{3C9}\u{3C3}\u{3B7}`,
        "table.drag": `\u{39C}\u{3B5}\u{3C4}\u{3B1}\u{3C6}\u{3BF}\u{3C1}\u{3AC}`,
        "table.editCell": `\u{395}\u{3C0}\u{3B5}\u{3BE}\u{3B5}\u{3C1}\u{3B3}\u{3B1}\u{3C3}\u{3AF}\u{3B1} \u{3BA}\u{3B5}\u{3BB}\u{3B9}\u{3BF}\u{3CD}`,
        "table.loading": `\u{3A6}\u{3CC}\u{3C1}\u{3C4}\u{3C9}\u{3C3}\u{3B7}...`,
        "table.loadingMore": `\u{3A6}\u{3CC}\u{3C1}\u{3C4}\u{3C9}\u{3C3}\u{3B7} \u{3C0}\u{3B5}\u{3C1}\u{3B9}\u{3C3}\u{3C3}\u{3CC}\u{3C4}\u{3B5}\u{3C1}\u{3C9}\u{3BD}...`,
        "table.resizeColumn": `\u{391}\u{3BB}\u{3BB}\u{3B1}\u{3B3}\u{3AE} \u{3BC}\u{3B5}\u{3B3}\u{3AD}\u{3B8}\u{3BF}\u{3C5}\u{3C2} \u{3C3}\u{3C4}\u{3AE}\u{3BB}\u{3B7}\u{3C2}`,
        "table.save": `\u{391}\u{3C0}\u{3BF}\u{3B8}\u{3AE}\u{3BA}\u{3B5}\u{3C5}\u{3C3}\u{3B7}`,
        "table.sortAscending": `\u{3A4}\u{3B1}\u{3BE}\u{3B9}\u{3BD}\u{3CC}\u{3BC}\u{3B7}\u{3C3}\u{3B7} \u{3BA}\u{3B1}\u{3C4}\u{3AC} \u{3B1}\u{3CD}\u{3BE}\u{3BF}\u{3C5}\u{3C3}\u{3B1} \u{3C3}\u{3B5}\u{3B9}\u{3C1}\u{3AC}`,
        "table.sortDescending": `\u{3A4}\u{3B1}\u{3BE}\u{3B9}\u{3BD}\u{3CC}\u{3BC}\u{3B7}\u{3C3}\u{3B7} \u{3BA}\u{3B1}\u{3C4}\u{3AC} \u{3C6}\u{3B8}\u{3AF}\u{3BD}\u{3BF}\u{3C5}\u{3C3}\u{3B1} \u{3C3}\u{3B5}\u{3B9}\u{3C1}\u{3AC}`,
        "tag.actions": `\u{395}\u{3BD}\u{3AD}\u{3C1}\u{3B3}\u{3B5}\u{3B9}\u{3B5}\u{3C2}`,
        "tag.hideButtonLabel": `\u{395}\u{3BC}\u{3C6}\u{3AC}\u{3BD}\u{3B9}\u{3C3}\u{3B7} \u{3BB}\u{3B9}\u{3B3}\u{3CC}\u{3C4}\u{3B5}\u{3C1}\u{3C9}\u{3BD}`,
        "tag.noTags": `\u{39A}\u{3B1}\u{3BD}\u{3AD}\u{3BD}\u{3B1}`,
        "tag.showAllButtonLabel": (args, formatter)=>`\u{395}\u{3BC}\u{3C6}\u{3AC}\u{3BD}\u{3B9}\u{3C3}\u{3B7} \u{3CC}\u{3BB}\u{3C9}\u{3BD} (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `\u{395}\u{3BA}\u{3BA}\u{3B1}\u{3B8}\u{3AC}\u{3C1}\u{3B9}\u{3C3}\u{3B7} \u{3CC}\u{3BB}\u{3C9}\u{3BD}`,
        "toast.collapse": `\u{3A3}\u{3CD}\u{3BC}\u{3C0}\u{3C4}\u{3C5}\u{3BE}\u{3B7}`,
        "toast.showAll": `\u{395}\u{3BC}\u{3C6}\u{3AC}\u{3BD}\u{3B9}\u{3C3}\u{3B7} \u{3CC}\u{3BB}\u{3C9}\u{3BD}`,
        "treeview.loadingMore": `\u{3A6}\u{3CC}\u{3C1}\u{3C4}\u{3C9}\u{3C3}\u{3B7} \u{3C0}\u{3B5}\u{3C1}\u{3B9}\u{3C3}\u{3C3}\u{3CC}\u{3C4}\u{3B5}\u{3C1}\u{3C9}\u{3BD}...`
    },
    "en-US": {
        "actionbar.actions": `Actions`,
        "actionbar.actionsAvailable": `Actions available.`,
        "actionbar.clearSelection": `Clear selection`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `None selected`,
                other: ()=>`${formatter.number(args.count)} selected`
            })}`,
        "actionbar.selectedAll": `All selected`,
        "actionbutton.pending": `pending`,
        "breadcrumbs.more": `More items`,
        "button.pending": `pending`,
        "calendar.invalidSelection": (args, formatter)=>`Selected ${formatter.plural(args.selectedCount, {
                one: `date`,
                other: `dates`
            })} unavailable.`,
        "combobox.loading": `Loading\u{2026}`,
        "combobox.loadingMore": `Loading more\u{2026}`,
        "combobox.noResults": `No results`,
        "contextualhelp.help": `Help`,
        "contextualhelp.info": `Information`,
        "datepicker.endTime": `End time`,
        "datepicker.startTime": `Start time`,
        "datepicker.time": `Time`,
        "dialog.alert": `Alert`,
        "dialog.dismiss": `Dismiss`,
        "dropzone.replaceMessage": `Drop file to replace`,
        "inlinealert.informative": `Information`,
        "inlinealert.negative": `Error`,
        "inlinealert.notice": `Warning`,
        "inlinealert.positive": `Success`,
        "label.(optional)": `(optional)`,
        "label.(required)": `(required)`,
        "listview.loading": `Loading\u{2026}`,
        "listview.loadingMore": `Loading more\u{2026}`,
        "menu.loading": `Loading\u{2026}`,
        "menu.loadingMore": `Loading more\u{2026}`,
        "menu.moreActions": `More actions`,
        "menu.noResults": `No results`,
        "menu.unavailable": `Unavailable, expand for details`,
        "notificationbadge.indicatorOnly": `New activity`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Loading\u{2026}`,
        "picker.loadingMore": `Loading more\u{2026}`,
        "picker.placeholder": `Select\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `No items selected`,
                one: ()=>`${formatter.number(args.count)} item selected`,
                other: ()=>`${formatter.number(args.count)} items selected`
            })}`,
        "sidepanel.collapse": `Collapse side panel`,
        "sidepanel.expand": `Expand side panel`,
        "slider.maximum": `Maximum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `Cancel`,
        "table.drag": `Drag`,
        "table.editCell": `Edit cell`,
        "table.loading": `Loading\u{2026}`,
        "table.loadingMore": `Loading more\u{2026}`,
        "table.resizeColumn": `Resize column`,
        "table.save": `Save`,
        "table.sortAscending": `Sort Ascending`,
        "table.sortDescending": `Sort Descending`,
        "tag.actions": `Actions`,
        "tag.hideButtonLabel": `Show less`,
        "tag.noTags": `None`,
        "tag.showAllButtonLabel": (args, formatter)=>`Show all (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Clear all`,
        "toast.collapse": `Collapse`,
        "toast.showAll": `Show all`,
        "treeview.loadingMore": `Loading more\u{2026}`
    },
    "es-ES": {
        "actionbar.actions": `Acciones`,
        "actionbar.actionsAvailable": `Acciones disponibles.`,
        "actionbar.clearSelection": `Borrar selecci\xf3n`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nada seleccionado`,
                one: ()=>`${formatter.number(args.count)} seleccionado`,
                other: ()=>`${formatter.number(args.count)} seleccionados`
            })}`,
        "actionbar.selectedAll": `Todos seleccionados`,
        "actionbutton.pending": `pendiente`,
        "breadcrumbs.more": `M\xe1s elementos`,
        "button.pending": `pendiente`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `La fecha seleccionada no est\xe1 disponible`,
                other: `Las fechas seleccionadas no est\xe1n disponibles`
            })}.`,
        "combobox.loading": `Cargando\u{2026}`,
        "combobox.loadingMore": `Cargando m\xe1s\u{2026}`,
        "combobox.noResults": `Sin resultados`,
        "contextualhelp.help": `Ayuda`,
        "contextualhelp.info": `Informaci\xf3n`,
        "datepicker.endTime": `Hora de finalizaci\xf3n`,
        "datepicker.startTime": `Hora de inicio`,
        "datepicker.time": `Hora`,
        "dialog.alert": `Alerta`,
        "dialog.dismiss": `Descartar`,
        "dropzone.replaceMessage": `Suelte el archivo para reemplazar`,
        "inlinealert.informative": `Informaci\xf3n`,
        "inlinealert.negative": `Error`,
        "inlinealert.notice": `Advertencia`,
        "inlinealert.positive": `\xc9xito`,
        "label.(optional)": `(opcional)`,
        "label.(required)": `(obligatorio)`,
        "listview.loading": `Cargando\u{2026}`,
        "listview.loadingMore": `Cargando m\xe1s\u{2026}`,
        "menu.loading": `Cargando\u{2026}`,
        "menu.loadingMore": `Cargando m\xe1s\u{2026}`,
        "menu.moreActions": `M\xe1s acciones`,
        "menu.noResults": `Sin resultados`,
        "menu.unavailable": `No disponible, ampliar para m\xe1s detalles`,
        "notificationbadge.indicatorOnly": `Nueva actividad`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Cargando\u{2026}`,
        "picker.loadingMore": `Cargando m\xe1s\u{2026}`,
        "picker.placeholder": `Seleccionar\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Ning\xfan elemento seleccionado`,
                one: ()=>`${formatter.number(args.count)} elemento seleccionado`,
                other: ()=>`${formatter.number(args.count)} elementos seleccionados`
            })}`,
        "sidepanel.collapse": `Contraer el panel lateral`,
        "sidepanel.expand": `Expandir el panel lateral`,
        "slider.maximum": `M\xe1ximo`,
        "slider.minimum": `M\xednimo`,
        "table.cancel": `Cancelar`,
        "table.drag": `Arrastrar`,
        "table.editCell": `Editar celda`,
        "table.loading": `Cargando\u{2026}`,
        "table.loadingMore": `Cargando m\xe1s\u{2026}`,
        "table.resizeColumn": `Cambiar el tama\xf1o de la columna`,
        "table.save": `Guardar`,
        "table.sortAscending": `Orden ascendente`,
        "table.sortDescending": `Orden descendente`,
        "tag.actions": `Acciones`,
        "tag.hideButtonLabel": `Mostrar menos`,
        "tag.noTags": `Ninguno`,
        "tag.showAllButtonLabel": (args, formatter)=>`Mostrar todo (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Borrar todo`,
        "toast.collapse": `Contraer`,
        "toast.showAll": `Mostrar todo`,
        "treeview.loadingMore": `Cargando m\xe1s\u{2026}`
    },
    "et-EE": {
        "actionbar.actions": `Toimingud`,
        "actionbar.actionsAvailable": `Toimingud saadaval.`,
        "actionbar.clearSelection": `Puhasta valik`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Pole valitud`,
                other: ()=>`${formatter.number(args.count)} valitud`
            })}`,
        "actionbar.selectedAll": `K\xf5ik valitud`,
        "actionbutton.pending": `ootel`,
        "breadcrumbs.more": `Veel \xfcksusi`,
        "button.pending": `ootel`,
        "calendar.invalidSelection": (args, formatter)=>`Valitud ${formatter.plural(args.selectedCount, {
                one: `kuup\xe4ev`,
                other: `kuup\xe4evad`
            })} pole saadaval.`,
        "combobox.loading": `Laadimine...`,
        "combobox.loadingMore": `Laadi rohkem...`,
        "combobox.noResults": `Tulemusi pole`,
        "contextualhelp.help": `Spikker`,
        "contextualhelp.info": `Teave`,
        "datepicker.endTime": `L\xf5puaeg`,
        "datepicker.startTime": `Algusaeg`,
        "datepicker.time": `Aeg`,
        "dialog.alert": `Teade`,
        "dialog.dismiss": `L\xf5peta`,
        "dropzone.replaceMessage": `Kukuta fail asendamiseks`,
        "inlinealert.informative": `Teave`,
        "inlinealert.negative": `Viga`,
        "inlinealert.notice": `Hoiatus`,
        "inlinealert.positive": `Valmis`,
        "label.(optional)": `(valikuline)`,
        "label.(required)": `(n\xf5utav)`,
        "listview.loading": `Laadimine...`,
        "listview.loadingMore": `Laadi rohkem...`,
        "menu.loading": `Laadimine...`,
        "menu.loadingMore": `Laadi rohkem...`,
        "menu.moreActions": `Veel toiminguid`,
        "menu.noResults": `Tulemusi pole`,
        "menu.unavailable": `Pole k\xe4ttesaadav, \xfcksikasjade vaatamiseks laiendage`,
        "notificationbadge.indicatorOnly": `Uus tegevus`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Laadimine...`,
        "picker.loadingMore": `Laadi rohkem...`,
        "picker.placeholder": `Valige\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\xfcksuseid pole valitud`,
                one: ()=>`${formatter.number(args.count)} \xfcksus valitud`,
                other: ()=>`${formatter.number(args.count)} \xfcksust valitud`
            })}`,
        "sidepanel.collapse": `Ahenda k\xfclgpaneel`,
        "sidepanel.expand": `Laienda k\xfclgpaneel`,
        "slider.maximum": `Maksimaalne`,
        "slider.minimum": `Minimaalne`,
        "table.cancel": `T\xfchista`,
        "table.drag": `Lohista`,
        "table.editCell": `Muuda lahtrit`,
        "table.loading": `Laadimine...`,
        "table.loadingMore": `Laadi rohkem...`,
        "table.resizeColumn": `Muuda veeru suurust`,
        "table.save": `Salvesta`,
        "table.sortAscending": `Sordi kasvavalt`,
        "table.sortDescending": `Sordi kahanevalt`,
        "tag.actions": `Toimingud`,
        "tag.hideButtonLabel": `Kuva v\xe4hem`,
        "tag.noTags": `Puudub`,
        "tag.showAllButtonLabel": (args, formatter)=>`Kuva k\xf5ik (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `T\xfchjenda k\xf5ik`,
        "toast.collapse": `Ahenda`,
        "toast.showAll": `Kuva k\xf5ik`,
        "treeview.loadingMore": `Laadi rohkem...`
    },
    "fi-FI": {
        "actionbar.actions": `Toiminnot`,
        "actionbar.actionsAvailable": `Toiminnot k\xe4ytett\xe4viss\xe4.`,
        "actionbar.clearSelection": `Poista valinta`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Ei mit\xe4\xe4n valittu`,
                other: ()=>`${formatter.number(args.count)} valittu`
            })}`,
        "actionbar.selectedAll": `Kaikki valittu`,
        "actionbutton.pending": `odottaa`,
        "breadcrumbs.more": `Lis\xe4\xe4 kohteita`,
        "button.pending": `odottaa`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `Valittu p\xe4iv\xe4m\xe4\xe4r\xe4 ei ole`,
                other: `Valitut p\xe4iv\xe4m\xe4\xe4r\xe4t eiv\xe4t ole`
            })} saatavilla.`,
        "combobox.loading": `Ladataan\u{2026}`,
        "combobox.loadingMore": `Ladataan lis\xe4\xe4\u{2026}`,
        "combobox.noResults": `Ei tuloksia`,
        "contextualhelp.help": `Ohje`,
        "contextualhelp.info": `Tiedot`,
        "datepicker.endTime": `P\xe4\xe4ttymisaika`,
        "datepicker.startTime": `Alkamisaika`,
        "datepicker.time": `Aika`,
        "dialog.alert": `H\xe4lytys`,
        "dialog.dismiss": `Hylk\xe4\xe4`,
        "dropzone.replaceMessage": `Pudota korvaava tiedosto`,
        "inlinealert.informative": `Tiedot`,
        "inlinealert.negative": `Virhe`,
        "inlinealert.notice": `Varoitus`,
        "inlinealert.positive": `Onnistui`,
        "label.(optional)": `(valinnainen)`,
        "label.(required)": `(pakollinen)`,
        "listview.loading": `Ladataan\u{2026}`,
        "listview.loadingMore": `Ladataan lis\xe4\xe4\u{2026}`,
        "menu.loading": `Ladataan\u{2026}`,
        "menu.loadingMore": `Ladataan lis\xe4\xe4\u{2026}`,
        "menu.moreActions": `Lis\xe4\xe4 toimintoja`,
        "menu.noResults": `Ei tuloksia`,
        "menu.unavailable": `Ei saatavilla, laajenna saadaksesi lis\xe4tietoja`,
        "notificationbadge.indicatorOnly": `Uusi toiminta`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Ladataan\u{2026}`,
        "picker.loadingMore": `Ladataan lis\xe4\xe4\u{2026}`,
        "picker.placeholder": `Valitse\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Kohteita ei ole valittu`,
                one: ()=>`${formatter.number(args.count)} kohde valittu`,
                other: ()=>`${formatter.number(args.count)} kohdetta valittu`
            })}`,
        "sidepanel.collapse": `Kutista sivupaneeli`,
        "sidepanel.expand": `Laajenna sivupaneelia`,
        "slider.maximum": `Maksimi`,
        "slider.minimum": `Minimi`,
        "table.cancel": `Peruuta`,
        "table.drag": `Ved\xe4`,
        "table.editCell": `Muokkaa solua`,
        "table.loading": `Ladataan\u{2026}`,
        "table.loadingMore": `Ladataan lis\xe4\xe4\u{2026}`,
        "table.resizeColumn": `Muuta sarakkeen kokoa`,
        "table.save": `Tallenna`,
        "table.sortAscending": `Lajitteluj\xe4rjestys: nouseva`,
        "table.sortDescending": `Lajitteluj\xe4rjestys: laskeva`,
        "tag.actions": `Toiminnot`,
        "tag.hideButtonLabel": `N\xe4yt\xe4 v\xe4hemm\xe4n`,
        "tag.noTags": `Ei mit\xe4\xe4n`,
        "tag.showAllButtonLabel": (args, formatter)=>`N\xe4yt\xe4 kaikki (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Tyhjenn\xe4 kaikki`,
        "toast.collapse": `Pienenn\xe4`,
        "toast.showAll": `N\xe4yt\xe4 kaikki`,
        "treeview.loadingMore": `Ladataan lis\xe4\xe4\u{2026}`
    },
    "fr-FR": {
        "actionbar.actions": `Actions`,
        "actionbar.actionsAvailable": `Actions disponibles.`,
        "actionbar.clearSelection": `Supprimer la s\xe9lection`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Aucun \xe9l\xe9ment s\xe9lectionn\xe9`,
                one: ()=>`${formatter.number(args.count)} s\xe9lectionn\xe9`,
                other: ()=>`${formatter.number(args.count)} s\xe9lectionn\xe9s`
            })}`,
        "actionbar.selectedAll": `Toute la s\xe9lection`,
        "actionbutton.pending": `En attente`,
        "breadcrumbs.more": `Plus d\u{2019}\xe9l\xe9ments`,
        "button.pending": `En attente`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `La date s\xe9lectionn\xe9e est indisponible`,
                other: `Les dates s\xe9lectionn\xe9es sont indisponibles`
            })}.`,
        "combobox.loading": `Chargement...`,
        "combobox.loadingMore": `Chargement suppl\xe9mentaire...`,
        "combobox.noResults": `Aucun r\xe9sultat`,
        "contextualhelp.help": `Aide`,
        "contextualhelp.info": `Informations`,
        "datepicker.endTime": `Heure de fin`,
        "datepicker.startTime": `Heure de d\xe9but`,
        "datepicker.time": `Heure`,
        "dialog.alert": `Alerte`,
        "dialog.dismiss": `Rejeter`,
        "dropzone.replaceMessage": `D\xe9poser le fichier \xe0 remplacer`,
        "inlinealert.informative": `Informations`,
        "inlinealert.negative": `Erreur`,
        "inlinealert.notice": `Avertissement`,
        "inlinealert.positive": `Succ\xe8s`,
        "label.(optional)": `(facultatif)`,
        "label.(required)": `(requis)`,
        "listview.loading": `Chargement...`,
        "listview.loadingMore": `Chargement suppl\xe9mentaire...`,
        "menu.loading": `Chargement...`,
        "menu.loadingMore": `Chargement suppl\xe9mentaire...`,
        "menu.moreActions": `Autres actions`,
        "menu.noResults": `Aucun r\xe9sultat`,
        "menu.unavailable": `Indisponible, d\xe9velopper pour plus de d\xe9tails`,
        "notificationbadge.indicatorOnly": `Nouvelle activit\xe9`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Chargement...`,
        "picker.loadingMore": `Chargement suppl\xe9mentaire...`,
        "picker.placeholder": `S\xe9lectionner\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Aucun \xe9l\xe9ment s\xe9lectionn\xe9`,
                one: ()=>`${formatter.number(args.count)} \xe9l\xe9ment s\xe9lectionn\xe9`,
                other: ()=>`${formatter.number(args.count)} \xe9l\xe9ments s\xe9lectionn\xe9s`
            })}`,
        "sidepanel.collapse": `R\xe9duire le panneau lat\xe9ral`,
        "sidepanel.expand": `D\xe9velopper le panneau lat\xe9ral`,
        "slider.maximum": `Maximum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `Annuler`,
        "table.drag": `Faire glisser`,
        "table.editCell": `Modifier la cellule`,
        "table.loading": `Chargement...`,
        "table.loadingMore": `Chargement suppl\xe9mentaire...`,
        "table.resizeColumn": `Redimensionner la colonne`,
        "table.save": `Enregistrer`,
        "table.sortAscending": `Trier par ordre croissant`,
        "table.sortDescending": `Trier par ordre d\xe9croissant`,
        "tag.actions": `Actions`,
        "tag.hideButtonLabel": `Afficher moins`,
        "tag.noTags": `Aucun`,
        "tag.showAllButtonLabel": (args, formatter)=>`Tout afficher (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Tout effacer`,
        "toast.collapse": `R\xe9duire`,
        "toast.showAll": `Tout afficher`,
        "treeview.loadingMore": `Chargement suppl\xe9mentaire...`
    },
    "he-IL": {
        "actionbar.actions": `\u{5E4}\u{5E2}\u{5D5}\u{5DC}\u{5D5}\u{5EA}`,
        "actionbar.actionsAvailable": `\u{5E4}\u{5E2}\u{5D5}\u{5DC}\u{5D5}\u{5EA} \u{5D6}\u{5DE}\u{5D9}\u{5E0}\u{5D5}\u{5EA}.`,
        "actionbar.clearSelection": `\u{5E0}\u{5E7}\u{5D4} \u{5D1}\u{5D7}\u{5D9}\u{5E8}\u{5D4}`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{5DC}\u{5D0} \u{5D1}\u{5D5}\u{5E6}\u{5E2}\u{5D4} \u{5D1}\u{5D7}\u{5D9}\u{5E8}\u{5D4}`,
                one: ()=>` ${formatter.number(args.count)} \u{5D1}\u{5D7}\u{5E8}`,
                other: ()=>`${formatter.number(args.count)} \u{5E0}\u{5D1}\u{5D7}\u{5E8}\u{5D5}`
            })}",`,
        "actionbar.selectedAll": `\u{5DB}\u{5DC} \u{5D4}\u{5E4}\u{5E8}\u{5D9}\u{5D8}\u{5D9}\u{5DD} \u{5E9}\u{5E0}\u{5D1}\u{5D7}\u{5E8}\u{5D5}`,
        "actionbutton.pending": `\u{5DE}\u{5DE}\u{5EA}\u{5D9}\u{5DF} \u{5DC}`,
        "breadcrumbs.more": `\u{5E4}\u{5E8}\u{5D9}\u{5D8}\u{5D9}\u{5DD} \u{5E0}\u{5D5}\u{5E1}\u{5E4}\u{5D9}\u{5DD}`,
        "button.pending": `\u{5DE}\u{5DE}\u{5EA}\u{5D9}\u{5DF} \u{5DC}`,
        "calendar.invalidSelection": (args, formatter)=>`\u{5E0}\u{5D1}\u{5D7}\u{5E8} ${formatter.plural(args.selectedCount, {
                one: `\u{5EA}\u{5D0}\u{5E8}\u{5D9}\u{5DA}`,
                other: `\u{5EA}\u{5D0}\u{5E8}\u{5D9}\u{5DB}\u{5D9}\u{5DD}`
            })} \u{5D0}\u{5D9}\u{5E0}\u{5D5} \u{5D6}\u{5DE}\u{5D9}\u{5DF}.`,
        "combobox.loading": `\u{5D8}\u{5D5}\u{5E2}\u{5DF}...`,
        "combobox.loadingMore": `\u{5D8}\u{5D5}\u{5E2}\u{5DF} \u{5E2}\u{5D5}\u{5D3}...`,
        "combobox.noResults": `\u{5D0}\u{5D9}\u{5DF} \u{5EA}\u{5D5}\u{5E6}\u{5D0}\u{5D5}\u{5EA}`,
        "contextualhelp.help": `\u{5E2}\u{5D6}\u{5E8}\u{5D4}`,
        "contextualhelp.info": `\u{5DE}\u{5D9}\u{5D3}\u{5E2}`,
        "datepicker.endTime": `\u{5E9}\u{5E2}\u{5EA} \u{5E1}\u{5D9}\u{5D5}\u{5DD}`,
        "datepicker.startTime": `\u{5E9}\u{5E2}\u{5EA} \u{5D4}\u{5EA}\u{5D7}\u{5DC}\u{5D4}`,
        "datepicker.time": `\u{5D6}\u{5DE}\u{5DF}`,
        "dialog.alert": `\u{5D4}\u{5EA}\u{5E8}\u{5D0}\u{5D4}`,
        "dialog.dismiss": `\u{5D4}\u{5EA}\u{5E2}\u{5DC}\u{5DD}`,
        "dropzone.replaceMessage": `\u{5E9}\u{5D7}\u{5E8}\u{5E8} \u{5D0}\u{5EA} \u{5D4}\u{5E7}\u{5D5}\u{5D1}\u{5E5} \u{5DC}\u{5D4}\u{5D7}\u{5DC}\u{5E4}\u{5D4}`,
        "inlinealert.informative": `\u{5DE}\u{5D9}\u{5D3}\u{5E2}`,
        "inlinealert.negative": `\u{5E9}\u{5D2}\u{5D9}\u{5D0}\u{5D4}`,
        "inlinealert.notice": `\u{5D0}\u{5D6}\u{5D4}\u{5E8}\u{5D4}`,
        "inlinealert.positive": `\u{5D4}\u{5E6}\u{5DC}\u{5D7}\u{5D4}`,
        "label.(optional)": `(\u{5D0}\u{5D5}\u{5E4}\u{5E6}\u{5D9}\u{5D5}\u{5E0}\u{5DC}\u{5D9})`,
        "label.(required)": `(\u{5E0}\u{5D3}\u{5E8}\u{5E9})`,
        "listview.loading": `\u{5D8}\u{5D5}\u{5E2}\u{5DF}...`,
        "listview.loadingMore": `\u{5D8}\u{5D5}\u{5E2}\u{5DF} \u{5E2}\u{5D5}\u{5D3}...`,
        "menu.loading": `\u{5D8}\u{5D5}\u{5E2}\u{5DF}...`,
        "menu.loadingMore": `\u{5D8}\u{5D5}\u{5E2}\u{5DF} \u{5E2}\u{5D5}\u{5D3}...`,
        "menu.moreActions": `\u{5E4}\u{5E2}\u{5D5}\u{5DC}\u{5D5}\u{5EA} \u{5E0}\u{5D5}\u{5E1}\u{5E4}\u{5D5}\u{5EA}`,
        "menu.noResults": `\u{5D0}\u{5D9}\u{5DF} \u{5EA}\u{5D5}\u{5E6}\u{5D0}\u{5D5}\u{5EA}`,
        "menu.unavailable": `\u{5DC}\u{5D0} \u{5D6}\u{5DE}\u{5D9}\u{5DF}, \u{5D4}\u{5E8}\u{5D7}\u{5D1} \u{5DC}\u{5E4}\u{5E8}\u{5D8}\u{5D9}\u{5DD}`,
        "notificationbadge.indicatorOnly": `\u{5E4}\u{5E2}\u{5D9}\u{5DC}\u{5D5}\u{5EA} \u{5D7}\u{5D3}\u{5E9}\u{5D4}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `\u{5D8}\u{5D5}\u{5E2}\u{5DF}...`,
        "picker.loadingMore": `\u{5D8}\u{5D5}\u{5E2}\u{5DF} \u{5E2}\u{5D5}\u{5D3}...`,
        "picker.placeholder": `\u{5D1}\u{5D7}\u{5E8}\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{5DC}\u{5D0} \u{5E0}\u{5D1}\u{5D7}\u{5E8}\u{5D5} \u{5E4}\u{5E8}\u{5D9}\u{5D8}\u{5D9}\u{5DD}`,
                one: ()=>`\u{5E4}\u{5E8}\u{5D9}\u{5D8} ${formatter.number(args.count)} \u{5E0}\u{5D1}\u{5D7}\u{5E8}`,
                other: ()=>`${formatter.number(args.count)} \u{5E4}\u{5E8}\u{5D9}\u{5D8}\u{5D9}\u{5DD} \u{5E0}\u{5D1}\u{5D7}\u{5E8}\u{5D5}`
            })}`,
        "sidepanel.collapse": `\u{5DB}\u{5D5}\u{5D5}\u{5E5} \u{5D0}\u{5EA} \u{5D4}\u{5DC}\u{5D5}\u{5D7} \u{5D4}\u{5E6}\u{5D3}\u{5D3}\u{5D9}`,
        "sidepanel.expand": `\u{5D4}\u{5E8}\u{5D7}\u{5D1} \u{5D0}\u{5EA} \u{5D4}\u{5DC}\u{5D5}\u{5D7} \u{5D4}\u{5E6}\u{5D3}\u{5D3}\u{5D9}`,
        "slider.maximum": `\u{5DE}\u{5E7}\u{5E1}\u{5D9}\u{5DE}\u{5D5}\u{5DD}`,
        "slider.minimum": `\u{5DE}\u{5D9}\u{5E0}\u{5D9}\u{5DE}\u{5D5}\u{5DD}`,
        "table.cancel": `\u{5D1}\u{5D9}\u{5D8}\u{5D5}\u{5DC}`,
        "table.drag": `\u{5D2}\u{5E8}\u{5D9}\u{5E8}\u{5D4}`,
        "table.editCell": `\u{5E2}\u{5E8}\u{5D9}\u{5DB}\u{5EA} \u{5EA}\u{5D0}`,
        "table.loading": `\u{5D8}\u{5D5}\u{5E2}\u{5DF}...`,
        "table.loadingMore": `\u{5D8}\u{5D5}\u{5E2}\u{5DF} \u{5E2}\u{5D5}\u{5D3}...`,
        "table.resizeColumn": `\u{5E9}\u{5E0}\u{5D4} \u{5D0}\u{5EA} \u{5D2}\u{5D5}\u{5D3}\u{5DC} \u{5D4}\u{5E2}\u{5DE}\u{5D5}\u{5D3}\u{5D4}`,
        "table.save": `\u{5E9}\u{5DE}\u{5D9}\u{5E8}\u{5D4}`,
        "table.sortAscending": `\u{5DE}\u{5D9}\u{5D9}\u{5DF} \u{5D1}\u{5E1}\u{5D3}\u{5E8} \u{5E2}\u{5D5}\u{5DC}\u{5D4}`,
        "table.sortDescending": `\u{5DE}\u{5D9}\u{5D9}\u{5DF} \u{5D1}\u{5E1}\u{5D3}\u{5E8} \u{5D9}\u{5D5}\u{5E8}\u{5D3}`,
        "tag.actions": `\u{5E4}\u{5E2}\u{5D5}\u{5DC}\u{5D5}\u{5EA}`,
        "tag.hideButtonLabel": `\u{5D4}\u{5E6}\u{5D2} \u{5E4}\u{5D7}\u{5D5}\u{5EA}`,
        "tag.noTags": `\u{5DC}\u{5DC}\u{5D0}`,
        "tag.showAllButtonLabel": (args, formatter)=>`\u{5D4}\u{5E6}\u{5D2} \u{5D4}\u{5DB}\u{5DC} (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `\u{5E0}\u{5E7}\u{5D4} \u{5D4}\u{5DB}\u{5D5}\u{5DC}`,
        "toast.collapse": `\u{5DB}\u{5D5}\u{5D5}\u{5E5}`,
        "toast.showAll": `\u{5D4}\u{5E6}\u{5D2} \u{5D4}\u{5DB}\u{5D5}\u{5DC}`,
        "treeview.loadingMore": `\u{5D8}\u{5D5}\u{5E2}\u{5DF} \u{5E2}\u{5D5}\u{5D3}...`
    },
    "hr-HR": {
        "actionbar.actions": `Radnje`,
        "actionbar.actionsAvailable": `Dostupne radnje.`,
        "actionbar.clearSelection": `Poni\u{161}ti odabir`,
        "actionbar.selected": (args)=>`Odabrano: ${args.count}`,
        "actionbar.selectedAll": `Sve odabrano`,
        "actionbutton.pending": `u tijeku`,
        "breadcrumbs.more": `Vi\u{161}e stavki`,
        "button.pending": `u tijeku`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `Odabrani datum nije dostupan`,
                other: `Odabrani datumi nisu dostupni`
            })}.`,
        "combobox.loading": `U\u{10D}itavam...`,
        "combobox.loadingMore": `U\u{10D}itavam jo\u{161}...`,
        "combobox.noResults": `Nema rezultata`,
        "contextualhelp.help": `Pomo\u{107}`,
        "contextualhelp.info": `Informacije`,
        "datepicker.endTime": `Vrijeme zavr\u{161}etka`,
        "datepicker.startTime": `Vrijeme po\u{10D}etka`,
        "datepicker.time": `Vrijeme`,
        "dialog.alert": `Upozorenje`,
        "dialog.dismiss": `Odbaci`,
        "dropzone.replaceMessage": `Ispustite datoteku za zamjenu`,
        "inlinealert.informative": `Informacije`,
        "inlinealert.negative": `Pogre\u{161}ka`,
        "inlinealert.notice": `Upozorenje`,
        "inlinealert.positive": `Uspje\u{161}no`,
        "label.(optional)": `(opcionalno)`,
        "label.(required)": `(obvezno)`,
        "listview.loading": `U\u{10D}itavam...`,
        "listview.loadingMore": `U\u{10D}itavam jo\u{161}...`,
        "menu.loading": `U\u{10D}itavam...`,
        "menu.loadingMore": `U\u{10D}itavam jo\u{161}...`,
        "menu.moreActions": `Dodatne radnje`,
        "menu.noResults": `Nema rezultata`,
        "menu.unavailable": `Nije dostupno, pro\u{161}iri za detalje`,
        "notificationbadge.indicatorOnly": `Nova aktivnost`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `U\u{10D}itavam...`,
        "picker.loadingMore": `U\u{10D}itavam jo\u{161}...`,
        "picker.placeholder": `Odaberite\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nije odabrana nijedna stavka`,
                one: ()=>`Odabrana je ${formatter.number(args.count)} stavka`,
                other: ()=>`Odabrano je ${formatter.number(args.count)} stavki`
            })}`,
        "sidepanel.collapse": `Sklapanje bo\u{10D}nog panela`,
        "sidepanel.expand": `Pro\u{161}irenje bo\u{10D}ne plo\u{10D}e`,
        "slider.maximum": `Najvi\u{161}e`,
        "slider.minimum": `Najmanje`,
        "table.cancel": `Poni\u{161}ti`,
        "table.drag": `Povucite`,
        "table.editCell": `Uredi \u{107}eliju`,
        "table.loading": `U\u{10D}itavam...`,
        "table.loadingMore": `U\u{10D}itavam jo\u{161}...`,
        "table.resizeColumn": `Promijeni veli\u{10D}inu stupca`,
        "table.save": `Spremi`,
        "table.sortAscending": `Sortiraj uzlazno`,
        "table.sortDescending": `Sortiraj silazno`,
        "tag.actions": `Radnje`,
        "tag.hideButtonLabel": `Prika\u{17E}i manje`,
        "tag.noTags": `Nema`,
        "tag.showAllButtonLabel": (args, formatter)=>`Prika\u{17E}i sve (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Poni\u{161}ti sve`,
        "toast.collapse": `Sa\u{17E}mi`,
        "toast.showAll": `Prika\u{17E}i sve`,
        "treeview.loadingMore": `U\u{10D}itavam jo\u{161}...`
    },
    "hu-HU": {
        "actionbar.actions": `M\u{171}veletek`,
        "actionbar.actionsAvailable": `M\u{171}veletek \xe1llnak rendelkez\xe9sre.`,
        "actionbar.clearSelection": `Kijel\xf6l\xe9s t\xf6rl\xe9se`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Egy sincs kijel\xf6lve`,
                other: ()=>`${formatter.number(args.count)} kijel\xf6lve`
            })}`,
        "actionbar.selectedAll": `Mind kijel\xf6lve`,
        "actionbutton.pending": `f\xfcgg\u{151}ben lev\u{151}`,
        "breadcrumbs.more": `Tov\xe1bbi elemek`,
        "button.pending": `f\xfcgg\u{151}ben lev\u{151}`,
        "calendar.invalidSelection": (args, formatter)=>`A kijel\xf6lt ${formatter.plural(args.selectedCount, {
                one: `d\xe1tum nem \xe9rhet\u{151} el`,
                other: `d\xe1tumok nem \xe9rhet\u{151}ek el`
            })}.`,
        "combobox.loading": `Bet\xf6lt\xe9s folyamatban\u{2026}`,
        "combobox.loadingMore": `Tov\xe1bbiak bet\xf6lt\xe9se folyamatban\u{2026}`,
        "combobox.noResults": `Nincsenek tal\xe1latok`,
        "contextualhelp.help": `S\xfag\xf3`,
        "contextualhelp.info": `Inform\xe1ci\xf3`,
        "datepicker.endTime": `Befejez\xe9s ideje`,
        "datepicker.startTime": `Kezd\xe9s ideje`,
        "datepicker.time": `Id\u{151}`,
        "dialog.alert": `Figyelmeztet\xe9s`,
        "dialog.dismiss": `Elutas\xedt\xe1s`,
        "dropzone.replaceMessage": `Ejtse le a f\xe1jlt a cser\xe9hez`,
        "inlinealert.informative": `Inform\xe1ci\xf3`,
        "inlinealert.negative": `Hiba`,
        "inlinealert.notice": `Figyelmeztet\xe9s`,
        "inlinealert.positive": `Siker`,
        "label.(optional)": `(opcion\xe1lis)`,
        "label.(required)": `(k\xf6telez\u{151})`,
        "listview.loading": `Bet\xf6lt\xe9s folyamatban\u{2026}`,
        "listview.loadingMore": `Tov\xe1bbiak bet\xf6lt\xe9se folyamatban\u{2026}`,
        "menu.loading": `Bet\xf6lt\xe9s folyamatban\u{2026}`,
        "menu.loadingMore": `Tov\xe1bbiak bet\xf6lt\xe9se folyamatban\u{2026}`,
        "menu.moreActions": `Tov\xe1bbi lehet\u{151}s\xe9gek`,
        "menu.noResults": `Nincsenek tal\xe1latok`,
        "menu.unavailable": `Nem \xe9rhet\u{151} el, a r\xe9szletek\xe9rt bontsa ki`,
        "notificationbadge.indicatorOnly": `\xdaj tev\xe9kenys\xe9g`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Bet\xf6lt\xe9s folyamatban\u{2026}`,
        "picker.loadingMore": `Tov\xe1bbiak bet\xf6lt\xe9se folyamatban\u{2026}`,
        "picker.placeholder": `Kiv\xe1laszt\xe1s\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nincs kijel\xf6lve elem`,
                one: ()=>`${formatter.number(args.count)} elem kijel\xf6lve`,
                other: ()=>`${formatter.number(args.count)} elem kijel\xf6lve`
            })}`,
        "sidepanel.collapse": `Oldalpanel \xf6sszecsuk\xe1sa`,
        "sidepanel.expand": `Oldalpanel kibont\xe1sa`,
        "slider.maximum": `Maximum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `M\xe9gse`,
        "table.drag": `H\xfaz\xe1s`,
        "table.editCell": `Cella szerkeszt\xe9se`,
        "table.loading": `Bet\xf6lt\xe9s folyamatban\u{2026}`,
        "table.loadingMore": `Tov\xe1bbiak bet\xf6lt\xe9se folyamatban\u{2026}`,
        "table.resizeColumn": `Oszlop \xe1tm\xe9retez\xe9se`,
        "table.save": `Ment\xe9s`,
        "table.sortAscending": `N\xf6vekv\u{151} rendez\xe9s`,
        "table.sortDescending": `Cs\xf6kken\u{151} rendez\xe9s`,
        "tag.actions": `M\u{171}veletek`,
        "tag.hideButtonLabel": `Mutass kevesebbet`,
        "tag.noTags": `Egyik sem`,
        "tag.showAllButtonLabel": (args, formatter)=>`Az \xf6sszes megjelen\xedt\xe9se (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `\xd6sszes t\xf6rl\xe9se`,
        "toast.collapse": `\xd6sszecsuk\xe1s`,
        "toast.showAll": `\xd6sszes megjelen\xedt\xe9se`,
        "treeview.loadingMore": `Tov\xe1bbiak bet\xf6lt\xe9se folyamatban\u{2026}`
    },
    "it-IT": {
        "actionbar.actions": `Azioni`,
        "actionbar.actionsAvailable": `Azioni disponibili.`,
        "actionbar.clearSelection": `Annulla selezione`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nessuno selezionato`,
                one: ()=>`${formatter.number(args.count)} selezionato`,
                other: ()=>`${formatter.number(args.count)} selezionati`
            })}`,
        "actionbar.selectedAll": `Tutti selezionati`,
        "actionbutton.pending": `in sospeso`,
        "breadcrumbs.more": `Altri elementi`,
        "button.pending": `in sospeso`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `Data selezionata non disponibile`,
                other: `Date selezionate non disponibili`
            })}.`,
        "combobox.loading": `Caricamento...`,
        "combobox.loadingMore": `Caricamento altri...`,
        "combobox.noResults": `Nessun risultato`,
        "contextualhelp.help": `Aiuto`,
        "contextualhelp.info": `Informazioni`,
        "datepicker.endTime": `Ora di fine`,
        "datepicker.startTime": `Ora di inizio`,
        "datepicker.time": `Ora`,
        "dialog.alert": `Avviso`,
        "dialog.dismiss": `Ignora`,
        "dropzone.replaceMessage": `Rilascia il file da sostituire`,
        "inlinealert.informative": `Informazioni`,
        "inlinealert.negative": `Errore`,
        "inlinealert.notice": `Avvertenza`,
        "inlinealert.positive": `Operazione riuscita`,
        "label.(optional)": `(facoltativo)`,
        "label.(required)": `(obbligatorio)`,
        "listview.loading": `Caricamento...`,
        "listview.loadingMore": `Caricamento altri...`,
        "menu.loading": `Caricamento...`,
        "menu.loadingMore": `Caricamento altri...`,
        "menu.moreActions": `Altre azioni`,
        "menu.noResults": `Nessun risultato`,
        "menu.unavailable": `Non disponibile, espandi per i dettagli`,
        "notificationbadge.indicatorOnly": `Nuova attivit\xe0`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Caricamento...`,
        "picker.loadingMore": `Caricamento altri...`,
        "picker.placeholder": `Seleziona\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nessun elemento selezionato`,
                one: ()=>`${formatter.number(args.count)} elemento selezionato`,
                other: ()=>`${formatter.number(args.count)} elementi selezionati`
            })}`,
        "sidepanel.collapse": `Comprimi pannello laterale`,
        "sidepanel.expand": `Espandi pannello laterale`,
        "slider.maximum": `Massimo`,
        "slider.minimum": `Minimo`,
        "table.cancel": `Annulla`,
        "table.drag": `Trascina`,
        "table.editCell": `Modifica cella`,
        "table.loading": `Caricamento...`,
        "table.loadingMore": `Caricamento altri...`,
        "table.resizeColumn": `Ridimensiona colonna`,
        "table.save": `Salva`,
        "table.sortAscending": `Ordinamento crescente`,
        "table.sortDescending": `Ordinamento decrescente`,
        "tag.actions": `Azioni`,
        "tag.hideButtonLabel": `Mostra meno`,
        "tag.noTags": `Nessuno`,
        "tag.showAllButtonLabel": (args, formatter)=>`Mostra tutto (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Cancella tutto`,
        "toast.collapse": `Comprimi`,
        "toast.showAll": `Mostra tutto`,
        "treeview.loadingMore": `Caricamento altri...`
    },
    "ja-JP": {
        "actionbar.actions": `\u{30A2}\u{30AF}\u{30B7}\u{30E7}\u{30F3}`,
        "actionbar.actionsAvailable": `\u{30A2}\u{30AF}\u{30B7}\u{30E7}\u{30F3}\u{3092}\u{5229}\u{7528}\u{3067}\u{304D}\u{307E}\u{3059}\u{3002}`,
        "actionbar.clearSelection": `\u{9078}\u{629E}\u{3092}\u{30AF}\u{30EA}\u{30A2}`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{9078}\u{629E}\u{3055}\u{308C}\u{3066}\u{3044}\u{307E}\u{305B}\u{3093}`,
                other: ()=>`${formatter.number(args.count)} \u{500B}\u{3092}\u{9078}\u{629E}\u{3057}\u{307E}\u{3057}\u{305F}`
            })}`,
        "actionbar.selectedAll": `\u{3059}\u{3079}\u{3066}\u{3092}\u{9078}\u{629E}`,
        "actionbutton.pending": `\u{4FDD}\u{7559}`,
        "breadcrumbs.more": `\u{305D}\u{306E}\u{4ED6}\u{306E}\u{9805}\u{76EE}`,
        "button.pending": `\u{4FDD}\u{7559}`,
        "calendar.invalidSelection": (args, formatter)=>`\u{9078}\u{629E}\u{3057}\u{305F}${formatter.plural(args.selectedCount, {
                one: `\u{65E5}\u{4ED8}`,
                other: `\u{65E5}\u{4ED8}`
            })}\u{306F}\u{4F7F}\u{7528}\u{3067}\u{304D}\u{307E}\u{305B}\u{3093}\u{3002}`,
        "combobox.loading": `\u{8AAD}\u{307F}\u{8FBC}\u{307F}\u{4E2D}...`,
        "combobox.loadingMore": `\u{3055}\u{3089}\u{306B}\u{8AAD}\u{307F}\u{8FBC}\u{307F}\u{4E2D}...`,
        "combobox.noResults": `\u{7D50}\u{679C}\u{306A}\u{3057}`,
        "contextualhelp.help": `\u{30D8}\u{30EB}\u{30D7}`,
        "contextualhelp.info": `\u{60C5}\u{5831}`,
        "datepicker.endTime": `\u{7D42}\u{4E86}\u{6642}\u{523B}`,
        "datepicker.startTime": `\u{958B}\u{59CB}\u{6642}\u{523B}`,
        "datepicker.time": `\u{6642}\u{523B}`,
        "dialog.alert": `\u{30A2}\u{30E9}\u{30FC}\u{30C8}`,
        "dialog.dismiss": `\u{9589}\u{3058}\u{308B}`,
        "dropzone.replaceMessage": `\u{30D5}\u{30A1}\u{30A4}\u{30EB}\u{3092}\u{30C9}\u{30ED}\u{30C3}\u{30D7}\u{3057}\u{3066}\u{7F6E}\u{63DB}`,
        "inlinealert.informative": `\u{60C5}\u{5831}`,
        "inlinealert.negative": `\u{30A8}\u{30E9}\u{30FC}`,
        "inlinealert.notice": `\u{8B66}\u{544A}`,
        "inlinealert.positive": `\u{6210}\u{529F}`,
        "label.(optional)": `\u{FF08}\u{30AA}\u{30D7}\u{30B7}\u{30E7}\u{30F3}\u{FF09}`,
        "label.(required)": `\u{FF08}\u{5FC5}\u{9808}\u{FF09}`,
        "listview.loading": `\u{8AAD}\u{307F}\u{8FBC}\u{307F}\u{4E2D}...`,
        "listview.loadingMore": `\u{3055}\u{3089}\u{306B}\u{8AAD}\u{307F}\u{8FBC}\u{307F}\u{4E2D}...`,
        "menu.loading": `\u{8AAD}\u{307F}\u{8FBC}\u{307F}\u{4E2D}...`,
        "menu.loadingMore": `\u{3055}\u{3089}\u{306B}\u{8AAD}\u{307F}\u{8FBC}\u{307F}\u{4E2D}...`,
        "menu.moreActions": `\u{305D}\u{306E}\u{4ED6}\u{306E}\u{30A2}\u{30AF}\u{30B7}\u{30E7}\u{30F3}`,
        "menu.noResults": `\u{7D50}\u{679C}\u{306A}\u{3057}`,
        "menu.unavailable": `\u{5229}\u{7528}\u{3067}\u{304D}\u{307E}\u{305B}\u{3093}\u{3002}\u{8A73}\u{3057}\u{304F}\u{306F}\u{3001}\u{5C55}\u{958B}\u{3057}\u{3066}\u{78BA}\u{8A8D}\u{3057}\u{3066}\u{304F}\u{3060}\u{3055}\u{3044}`,
        "notificationbadge.indicatorOnly": `\u{65B0}\u{898F}\u{30A2}\u{30AF}\u{30C6}\u{30A3}\u{30D3}\u{30C6}\u{30A3}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `\u{8AAD}\u{307F}\u{8FBC}\u{307F}\u{4E2D}...`,
        "picker.loadingMore": `\u{3055}\u{3089}\u{306B}\u{8AAD}\u{307F}\u{8FBC}\u{307F}\u{4E2D}...`,
        "picker.placeholder": `\u{9078}\u{629E}\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{9805}\u{76EE}\u{304C}\u{9078}\u{629E}\u{3055}\u{308C}\u{3066}\u{3044}\u{307E}\u{305B}\u{3093}`,
                one: ()=>`${formatter.number(args.count)} \u{9805}\u{76EE}\u{3092}\u{9078}\u{629E}\u{3057}\u{307E}\u{3057}\u{305F}`,
                other: ()=>`${formatter.number(args.count)} \u{9805}\u{76EE}\u{3092}\u{9078}\u{629E}\u{3057}\u{307E}\u{3057}\u{305F}`
            })}`,
        "sidepanel.collapse": `\u{30B5}\u{30A4}\u{30C9}\u{30D1}\u{30CD}\u{30EB}\u{3092}\u{6298}\u{308A}\u{305F}\u{305F}\u{3080}`,
        "sidepanel.expand": `\u{30B5}\u{30A4}\u{30C9}\u{30D1}\u{30CD}\u{30EB}\u{3092}\u{5C55}\u{958B}`,
        "slider.maximum": `\u{6700}\u{5927}`,
        "slider.minimum": `\u{6700}\u{5C0F}`,
        "table.cancel": `\u{30AD}\u{30E3}\u{30F3}\u{30BB}\u{30EB}`,
        "table.drag": `\u{30C9}\u{30E9}\u{30C3}\u{30B0}`,
        "table.editCell": `\u{30BB}\u{30EB}\u{3092}\u{7DE8}\u{96C6}`,
        "table.loading": `\u{8AAD}\u{307F}\u{8FBC}\u{307F}\u{4E2D}...`,
        "table.loadingMore": `\u{3055}\u{3089}\u{306B}\u{8AAD}\u{307F}\u{8FBC}\u{307F}\u{4E2D}...`,
        "table.resizeColumn": `\u{5217}\u{5E45}\u{3092}\u{5909}\u{66F4}`,
        "table.save": `\u{4FDD}\u{5B58}`,
        "table.sortAscending": `\u{6607}\u{9806}\u{306B}\u{4E26}\u{3079}\u{66FF}\u{3048}`,
        "table.sortDescending": `\u{964D}\u{9806}\u{306B}\u{4E26}\u{3079}\u{66FF}\u{3048}`,
        "tag.actions": `\u{30A2}\u{30AF}\u{30B7}\u{30E7}\u{30F3}`,
        "tag.hideButtonLabel": `\u{8868}\u{793A}\u{3092}\u{6E1B}\u{3089}\u{3059}`,
        "tag.noTags": `\u{306A}\u{3057}`,
        "tag.showAllButtonLabel": (args, formatter)=>`\u{3059}\u{3079}\u{3066}\u{306E} (${formatter.number(args.tagCount)}) \u{3092}\u{8868}\u{793A}`,
        "toast.clearAll": `\u{3059}\u{3079}\u{3066}\u{30AF}\u{30EA}\u{30A2}`,
        "toast.collapse": `\u{6298}\u{308A}\u{305F}\u{305F}\u{3080}`,
        "toast.showAll": `\u{3059}\u{3079}\u{3066}\u{3092}\u{8868}\u{793A}`,
        "treeview.loadingMore": `\u{3055}\u{3089}\u{306B}\u{8AAD}\u{307F}\u{8FBC}\u{307F}\u{4E2D}...`
    },
    "ko-KR": {
        "actionbar.actions": `\u{C561}\u{C158}`,
        "actionbar.actionsAvailable": `\u{C0AC}\u{C6A9} \u{AC00}\u{B2A5}\u{D55C} \u{C561}\u{C158}`,
        "actionbar.clearSelection": `\u{C120}\u{D0DD} \u{D56D}\u{BAA9} \u{C9C0}\u{C6B0}\u{AE30}`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{C120}\u{D0DD}\u{B41C} \u{D56D}\u{BAA9} \u{C5C6}\u{C74C}`,
                other: ()=>`${formatter.number(args.count)}\u{AC1C} \u{C120}\u{D0DD}\u{B428}`
            })}`,
        "actionbar.selectedAll": `\u{BAA8}\u{B450} \u{C120}\u{D0DD}\u{B428}`,
        "actionbutton.pending": `\u{BCF4}\u{B958} \u{C911}`,
        "breadcrumbs.more": `\u{AE30}\u{D0C0} \u{D56D}\u{BAA9}`,
        "button.pending": `\u{BCF4}\u{B958} \u{C911}`,
        "calendar.invalidSelection": (args, formatter)=>`\u{C120}\u{D0DD}\u{D55C} ${formatter.plural(args.selectedCount, {
                one: `\u{C77C}\u{C790}\u{B97C}`,
                other: `\u{C77C}\u{C790}\u{B97C}`
            })} \u{C0AC}\u{C6A9}\u{D560} \u{C218} \u{C5C6}\u{C2B5}\u{B2C8}\u{B2E4}.`,
        "combobox.loading": `\u{B85C}\u{B4DC} \u{C911}\u{2026}`,
        "combobox.loadingMore": `\u{CD94}\u{AC00} \u{B85C}\u{B4DC} \u{C911}\u{2026}`,
        "combobox.noResults": `\u{ACB0}\u{ACFC} \u{C5C6}\u{C74C}`,
        "contextualhelp.help": `\u{B3C4}\u{C6C0}\u{B9D0}`,
        "contextualhelp.info": `\u{C815}\u{BCF4}`,
        "datepicker.endTime": `\u{C885}\u{B8CC} \u{C2DC}\u{AC04}`,
        "datepicker.startTime": `\u{C2DC}\u{C791} \u{C2DC}\u{AC04}`,
        "datepicker.time": `\u{C2DC}\u{AC04}`,
        "dialog.alert": `\u{ACBD}\u{ACE0}`,
        "dialog.dismiss": `\u{BB34}\u{C2DC}`,
        "dropzone.replaceMessage": `\u{D30C}\u{C77C}\u{C744} \u{B4DC}\u{B86D}\u{D558}\u{C5EC} \u{BC14}\u{AFB8}\u{AE30}`,
        "inlinealert.informative": `\u{C815}\u{BCF4}`,
        "inlinealert.negative": `\u{C624}\u{B958}`,
        "inlinealert.notice": `\u{ACBD}\u{ACE0}`,
        "inlinealert.positive": `\u{C131}\u{ACF5}`,
        "label.(optional)": `(\u{C120}\u{D0DD} \u{C0AC}\u{D56D})`,
        "label.(required)": `(\u{D544}\u{C218} \u{C0AC}\u{D56D})`,
        "listview.loading": `\u{B85C}\u{B4DC} \u{C911}\u{2026}`,
        "listview.loadingMore": `\u{CD94}\u{AC00} \u{B85C}\u{B4DC} \u{C911}\u{2026}`,
        "menu.loading": `\u{B85C}\u{B4DC} \u{C911}\u{2026}`,
        "menu.loadingMore": `\u{CD94}\u{AC00} \u{B85C}\u{B4DC} \u{C911}\u{2026}`,
        "menu.moreActions": `\u{AE30}\u{D0C0} \u{C561}\u{C158}`,
        "menu.noResults": `\u{ACB0}\u{ACFC} \u{C5C6}\u{C74C}`,
        "menu.unavailable": `\u{C0AC}\u{C6A9}\u{D560} \u{C218} \u{C5C6}\u{C74C}, \u{C790}\u{C138}\u{D788} \u{BCF4}\u{B824}\u{BA74} \u{D3BC}\u{CE58}\u{AE30}`,
        "notificationbadge.indicatorOnly": `\u{C0C8}\u{B85C}\u{C6B4} \u{D65C}\u{B3D9}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `\u{B85C}\u{B4DC} \u{C911}\u{2026}`,
        "picker.loadingMore": `\u{CD94}\u{AC00} \u{B85C}\u{B4DC} \u{C911}\u{2026}`,
        "picker.placeholder": `\u{C120}\u{D0DD}\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{C120}\u{D0DD}\u{D55C} \u{D56D}\u{BAA9} \u{C5C6}\u{C74C}`,
                one: ()=>`${formatter.number(args.count)}\u{AC1C} \u{D56D}\u{BAA9} \u{C120}\u{D0DD}\u{B428}`,
                other: ()=>`${formatter.number(args.count)}\u{AC1C} \u{D56D}\u{BAA9} \u{C120}\u{D0DD}\u{B428}`
            })}`,
        "sidepanel.collapse": `\u{C0AC}\u{C774}\u{B4DC} \u{D328}\u{B110} \u{CD95}\u{C18C}`,
        "sidepanel.expand": `\u{C0AC}\u{C774}\u{B4DC} \u{D328}\u{B110} \u{D655}\u{C7A5}`,
        "slider.maximum": `\u{CD5C}\u{B300}`,
        "slider.minimum": `\u{CD5C}\u{C18C}`,
        "table.cancel": `\u{CDE8}\u{C18C}`,
        "table.drag": `\u{B4DC}\u{B798}\u{ADF8}`,
        "table.editCell": `\u{C140} \u{D3B8}\u{C9D1}`,
        "table.loading": `\u{B85C}\u{B4DC} \u{C911}\u{2026}`,
        "table.loadingMore": `\u{CD94}\u{AC00} \u{B85C}\u{B4DC} \u{C911}\u{2026}`,
        "table.resizeColumn": `\u{C5F4} \u{D06C}\u{AE30} \u{C870}\u{C815}`,
        "table.save": `\u{C800}\u{C7A5}`,
        "table.sortAscending": `\u{C624}\u{B984}\u{CC28}\u{C21C} \u{C815}\u{B82C}`,
        "table.sortDescending": `\u{B0B4}\u{B9BC}\u{CC28}\u{C21C} \u{C815}\u{B82C}`,
        "tag.actions": `\u{C561}\u{C158}`,
        "tag.hideButtonLabel": `\u{AC04}\u{B7B5}\u{D788} \u{BCF4}\u{AE30}`,
        "tag.noTags": `\u{C5C6}\u{C74C}`,
        "tag.showAllButtonLabel": (args, formatter)=>`\u{BAA8}\u{B450} \u{D45C}\u{C2DC} (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `\u{BAA8}\u{B450} \u{C9C0}\u{C6B0}\u{AE30}`,
        "toast.collapse": `\u{C811}\u{AE30}`,
        "toast.showAll": `\u{BAA8}\u{B450} \u{D45C}\u{C2DC}`,
        "treeview.loadingMore": `\u{CD94}\u{AC00} \u{B85C}\u{B4DC} \u{C911}\u{2026}`
    },
    "lt-LT": {
        "actionbar.actions": `Veiksmai`,
        "actionbar.actionsAvailable": `Galimi veiksmai.`,
        "actionbar.clearSelection": `I\u{161}valyti pasirinkim\u{105}`,
        "actionbar.selected": (args)=>`Pasirinkta: ${args.count}`,
        "actionbar.selectedAll": `Pasirinkta viskas`,
        "actionbutton.pending": `laukiama`,
        "breadcrumbs.more": `Daugiau element\u{173}`,
        "button.pending": `laukiama`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `Datos`,
                other: `Dat\u{173}`
            })} pasirinkimas negalimas.`,
        "combobox.loading": `\u{12E}keliama...`,
        "combobox.loadingMore": `\u{12E}keliama daugiau...`,
        "combobox.noResults": `Rezultat\u{173} n\u{117}ra`,
        "contextualhelp.help": `\u{17D}inynas`,
        "contextualhelp.info": `Informacija`,
        "datepicker.endTime": `Pabaigos laikas`,
        "datepicker.startTime": `Prad\u{17E}ios laikas`,
        "datepicker.time": `Laikas`,
        "dialog.alert": `\u{12E}sp\u{117}jimas`,
        "dialog.dismiss": `Atmesti`,
        "dropzone.replaceMessage": `Pa\u{161}alinkite fail\u{105}, kad pakeistum\u{117}te`,
        "inlinealert.informative": `Informacija`,
        "inlinealert.negative": `Klaida`,
        "inlinealert.notice": `\u{12E}sp\u{117}jimas`,
        "inlinealert.positive": `S\u{117}kmingai`,
        "label.(optional)": `(pasirenkama)`,
        "label.(required)": `(privaloma)`,
        "listview.loading": `\u{12E}keliama...`,
        "listview.loadingMore": `\u{12E}keliama daugiau...`,
        "menu.loading": `\u{12E}keliama...`,
        "menu.loadingMore": `\u{12E}keliama daugiau...`,
        "menu.moreActions": `Daugiau veiksm\u{173}`,
        "menu.noResults": `Rezultat\u{173} n\u{117}ra`,
        "menu.unavailable": `Nepasiekiama, nor\u{117}dami gauti daugiau informacijos, i\u{161}skleiskite`,
        "notificationbadge.indicatorOnly": `Nauja veikla`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `\u{12E}keliama...`,
        "picker.loadingMore": `\u{12E}keliama daugiau...`,
        "picker.placeholder": `Pasirinkite\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nepasirinktas n\u{117} vienas elementas`,
                one: ()=>`Pasirinktas ${formatter.number(args.count)} elementas`,
                other: ()=>`Pasirinkta element\u{173}: ${formatter.number(args.count)}`
            })}`,
        "sidepanel.collapse": `Sutraukti \u{161}onin\u{119} srit\u{12F}`,
        "sidepanel.expand": `I\u{161}skleisti \u{161}onin\u{119} srit\u{12F}`,
        "slider.maximum": `Daugiausia`,
        "slider.minimum": `Ma\u{17E}iausia`,
        "table.cancel": `At\u{161}aukti`,
        "table.drag": `Vilkti`,
        "table.editCell": `Redaguoti langel\u{12F}`,
        "table.loading": `\u{12E}keliama...`,
        "table.loadingMore": `\u{12E}keliama daugiau...`,
        "table.resizeColumn": `Keisti stulpelio dyd\u{12F}`,
        "table.save": `\u{12E}ra\u{161}yti`,
        "table.sortAscending": `Rikiuoti did\u{117}jimo tvarka`,
        "table.sortDescending": `Rikiuoti ma\u{17E}\u{117}jimo tvarka`,
        "tag.actions": `Veiksmai`,
        "tag.hideButtonLabel": `Rodyti ma\u{17E}iau`,
        "tag.noTags": `N\u{117}ra`,
        "tag.showAllButtonLabel": (args, formatter)=>`Rodyti visk\u{105} (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `I\u{161}valyti visk\u{105}`,
        "toast.collapse": `Sutraukti`,
        "toast.showAll": `Rodyti visk\u{105}`,
        "treeview.loadingMore": `\u{12E}keliama daugiau...`
    },
    "lv-LV": {
        "actionbar.actions": `Darb\u{12B}bas`,
        "actionbar.actionsAvailable": `Pieejamas darb\u{12B}bas.`,
        "actionbar.clearSelection": `Not\u{12B}r\u{12B}t atlasi`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nav atlas\u{12B}ts nekas`,
                other: ()=>`Atlas\u{12B}ts(-i): ${formatter.number(args.count)}`
            })}`,
        "actionbar.selectedAll": `Atlas\u{12B}ts viss`,
        "actionbutton.pending": `gaida`,
        "breadcrumbs.more": `Vair\u{101}k vienumu`,
        "button.pending": `gaida`,
        "calendar.invalidSelection": (args, formatter)=>`Atlas\u{12B}tais(-ie) ${formatter.plural(args.selectedCount, {
                one: `date`,
                other: `dates`
            })} nav pieejams(-i).`,
        "combobox.loading": `Notiek iel\u{101}de...`,
        "combobox.loadingMore": `Tiek iel\u{101}d\u{113}ts v\u{113}l...`,
        "combobox.noResults": `Nav rezult\u{101}tu`,
        "contextualhelp.help": `Pal\u{12B}dz\u{12B}ba`,
        "contextualhelp.info": `Inform\u{101}cija`,
        "datepicker.endTime": `Beigu laiks`,
        "datepicker.startTime": `S\u{101}kuma laiks`,
        "datepicker.time": `Laiks`,
        "dialog.alert": `Br\u{12B}din\u{101}jums`,
        "dialog.dismiss": `Ner\u{101}d\u{12B}t`,
        "dropzone.replaceMessage": `Lai aizst\u{101}tu, nometiet failu`,
        "inlinealert.informative": `Inform\u{101}cija`,
        "inlinealert.negative": `K\u{13C}\u{16B}da`,
        "inlinealert.notice": `Br\u{12B}din\u{101}jums`,
        "inlinealert.positive": `Izdev\u{101}s`,
        "label.(optional)": `(neoblig\u{101}ti)`,
        "label.(required)": `(oblig\u{101}ti)`,
        "listview.loading": `Notiek iel\u{101}de...`,
        "listview.loadingMore": `Tiek iel\u{101}d\u{113}ts v\u{113}l...`,
        "menu.loading": `Notiek iel\u{101}de...`,
        "menu.loadingMore": `Tiek iel\u{101}d\u{113}ts v\u{113}l...`,
        "menu.moreActions": `Citas darb\u{12B}bas`,
        "menu.noResults": `Nav rezult\u{101}tu`,
        "menu.unavailable": `Nav pieejams, izv\u{113}rsiet, lai skat\u{12B}tu s\u{12B}k\u{101}ku inform\u{101}ciju`,
        "notificationbadge.indicatorOnly": `Jauna aktivit\u{101}te`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Notiek iel\u{101}de...`,
        "picker.loadingMore": `Tiek iel\u{101}d\u{113}ts v\u{113}l...`,
        "picker.placeholder": `Izv\u{113}l\u{113}ties\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nav atlas\u{12B}ts neviens vienums`,
                one: ()=>`${formatter.number(args.count)} vienums atlas\u{12B}ts`,
                other: ()=>`${formatter.number(args.count)} ieraksti vienumi`
            })}`,
        "sidepanel.collapse": `Sak\u{13C}aut s\u{101}nu paneli`,
        "sidepanel.expand": `Izv\u{113}rst s\u{101}nu paneli`,
        "slider.maximum": `Maksim\u{101}l\u{101} v\u{113}rt\u{12B}ba`,
        "slider.minimum": `Minim\u{101}l\u{101} v\u{113}rt\u{12B}ba`,
        "table.cancel": `Atcelt`,
        "table.drag": `Vilk\u{161}ana`,
        "table.editCell": `Redi\u{123}\u{113}t \u{161}\u{16B}nu`,
        "table.loading": `Notiek iel\u{101}de...`,
        "table.loadingMore": `Tiek iel\u{101}d\u{113}ts v\u{113}l...`,
        "table.resizeColumn": `Main\u{12B}t kolonnas lielumu`,
        "table.save": `Saglab\u{101}t`,
        "table.sortAscending": `K\u{101}rtot augo\u{161}\u{101} sec\u{12B}b\u{101}`,
        "table.sortDescending": `K\u{101}rtot dilsto\u{161}\u{101} sec\u{12B}b\u{101}`,
        "tag.actions": `Darb\u{12B}bas`,
        "tag.hideButtonLabel": `R\u{101}d\u{12B}t maz\u{101}k`,
        "tag.noTags": `Nav`,
        "tag.showAllButtonLabel": (args, formatter)=>`R\u{101}d\u{12B}t visu (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Not\u{12B}r\u{12B}t visu`,
        "toast.collapse": `Sak\u{13C}aut`,
        "toast.showAll": `R\u{101}d\u{12B}t visu`,
        "treeview.loadingMore": `Tiek iel\u{101}d\u{113}ts v\u{113}l...`
    },
    "nb-NO": {
        "actionbar.actions": `Handlinger`,
        "actionbar.actionsAvailable": `Tilgjengelige handlinger.`,
        "actionbar.clearSelection": `T\xf8m utvalg`,
        "actionbar.selected": (args)=>`Valde element: ${args.count}`,
        "actionbar.selectedAll": `Alle er valgt`,
        "actionbutton.pending": `avventer`,
        "breadcrumbs.more": `Flere elementer`,
        "button.pending": `avventer`,
        "calendar.invalidSelection": (args, formatter)=>`Valgt(e) ${formatter.plural(args.selectedCount, {
                one: `dato`,
                other: `datoer`
            })} er utilgjengelig.`,
        "combobox.loading": `Laster inn...`,
        "combobox.loadingMore": `Laster inn flere...`,
        "combobox.noResults": `Ingen resultater`,
        "contextualhelp.help": `Hjelp`,
        "contextualhelp.info": `Informasjon`,
        "datepicker.endTime": `Sluttid`,
        "datepicker.startTime": `Starttid`,
        "datepicker.time": `Tid`,
        "dialog.alert": `Varsel`,
        "dialog.dismiss": `Lukk`,
        "dropzone.replaceMessage": `Slipp filen for \xe5 erstatte`,
        "inlinealert.informative": `Informasjon`,
        "inlinealert.negative": `Feil`,
        "inlinealert.notice": `Advarsel`,
        "inlinealert.positive": `Vellykket`,
        "label.(optional)": `(valgfritt)`,
        "label.(required)": `(obligatorisk)`,
        "listview.loading": `Laster inn...`,
        "listview.loadingMore": `Laster inn flere...`,
        "menu.loading": `Laster inn...`,
        "menu.loadingMore": `Laster inn flere...`,
        "menu.moreActions": `Flere handlinger`,
        "menu.noResults": `Ingen resultater`,
        "menu.unavailable": `Utilgjengelig, utvid for detaljer`,
        "notificationbadge.indicatorOnly": `Ny aktivitet`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Laster inn...`,
        "picker.loadingMore": `Laster inn flere...`,
        "picker.placeholder": `Velg \u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Ingen elementer er valgt`,
                one: ()=>`${formatter.number(args.count)} element er valgt`,
                other: ()=>`${formatter.number(args.count)} elementer er valgt`
            })}`,
        "sidepanel.collapse": `Skjul sidepanelet`,
        "sidepanel.expand": `Vis sidepanelet`,
        "slider.maximum": `Maksimum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `Avbryt`,
        "table.drag": `Dra`,
        "table.editCell": `Rediger celle`,
        "table.loading": `Laster inn...`,
        "table.loadingMore": `Laster inn flere...`,
        "table.resizeColumn": `Endre st\xf8rrelse p\xe5 kolonne`,
        "table.save": `Lagre`,
        "table.sortAscending": `Sorter stigende`,
        "table.sortDescending": `Sorter synkende`,
        "tag.actions": `Handlinger`,
        "tag.hideButtonLabel": `Vis mindre`,
        "tag.noTags": `Ingen`,
        "tag.showAllButtonLabel": (args, formatter)=>`Vis alle (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Fjern alle`,
        "toast.collapse": `Skjul`,
        "toast.showAll": `Vis alle`,
        "treeview.loadingMore": `Laster inn flere...`
    },
    "nl-NL": {
        "actionbar.actions": `Acties`,
        "actionbar.actionsAvailable": `Acties beschikbaar.`,
        "actionbar.clearSelection": `Selectie wissen`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Niets geselecteerd`,
                other: ()=>`${formatter.number(args.count)} geselecteerd`
            })}`,
        "actionbar.selectedAll": `Alles geselecteerd`,
        "actionbutton.pending": `in behandeling`,
        "breadcrumbs.more": `Meer items`,
        "button.pending": `in behandeling`,
        "calendar.invalidSelection": (args, formatter)=>`Geselecteerde ${formatter.plural(args.selectedCount, {
                one: `datum`,
                other: `datums`
            })} niet beschikbaar.`,
        "combobox.loading": `Laden...`,
        "combobox.loadingMore": `Meer laden...`,
        "combobox.noResults": `Geen resultaten`,
        "contextualhelp.help": `Help`,
        "contextualhelp.info": `Informatie`,
        "datepicker.endTime": `Eindtijd`,
        "datepicker.startTime": `Starttijd`,
        "datepicker.time": `Tijd`,
        "dialog.alert": `Melding`,
        "dialog.dismiss": `Negeren`,
        "dropzone.replaceMessage": `Bestand neerzetten om te vervangen`,
        "inlinealert.informative": `Informatie`,
        "inlinealert.negative": `Fout`,
        "inlinealert.notice": `Waarschuwing`,
        "inlinealert.positive": `Geslaagd`,
        "label.(optional)": `(optioneel)`,
        "label.(required)": `(vereist)`,
        "listview.loading": `Laden...`,
        "listview.loadingMore": `Meer laden...`,
        "menu.loading": `Laden...`,
        "menu.loadingMore": `Meer laden...`,
        "menu.moreActions": `Meer handelingen`,
        "menu.noResults": `Geen resultaten`,
        "menu.unavailable": `Niet beschikbaar, uitvouwen voor meer informatie`,
        "notificationbadge.indicatorOnly": `Nieuwe activiteit`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Laden...`,
        "picker.loadingMore": `Meer laden...`,
        "picker.placeholder": `Selecteren\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Geen items geselecteerd`,
                one: ()=>`${formatter.number(args.count)} item geselecteerd`,
                other: ()=>`${formatter.number(args.count)} items geselecteerd`
            })}`,
        "sidepanel.collapse": `Zijpaneel samenvouwen`,
        "sidepanel.expand": `Zijpaneel uitvouwen`,
        "slider.maximum": `Maximum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `Annuleren`,
        "table.drag": `Slepen`,
        "table.editCell": `Cel bewerken`,
        "table.loading": `Laden...`,
        "table.loadingMore": `Meer laden...`,
        "table.resizeColumn": `Kolomgrootte wijzigen`,
        "table.save": `Opslaan`,
        "table.sortAscending": `Oplopend sorteren`,
        "table.sortDescending": `Aflopend sorteren`,
        "tag.actions": `Acties`,
        "tag.hideButtonLabel": `Minder weergeven`,
        "tag.noTags": `Geen`,
        "tag.showAllButtonLabel": (args, formatter)=>`Alles tonen (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Alles wissen`,
        "toast.collapse": `Samenvouwen`,
        "toast.showAll": `Alles weergeven`,
        "treeview.loadingMore": `Meer laden...`
    },
    "pl-PL": {
        "actionbar.actions": `Dzia\u{142}ania`,
        "actionbar.actionsAvailable": `Dost\u{119}pne dzia\u{142}ania.`,
        "actionbar.clearSelection": `Wyczy\u{15B}\u{107} zaznaczenie`,
        "actionbar.selected": (args)=>`Zaznaczono: ${args.count}`,
        "actionbar.selectedAll": `Wszystkie zaznaczone`,
        "actionbutton.pending": `oczekuj\u{105}ce`,
        "breadcrumbs.more": `Wi\u{119}cej element\xf3w`,
        "button.pending": `oczekuj\u{105}ce`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `Wybrana data jest niedost\u{119}pna`,
                other: `Wybrane daty s\u{105} niedost\u{119}pne`
            })}.`,
        "combobox.loading": `Wczytywanie...`,
        "combobox.loadingMore": `Wczytywanie wi\u{119}kszej liczby...`,
        "combobox.noResults": `Brak wynik\xf3w`,
        "contextualhelp.help": `Pomoc`,
        "contextualhelp.info": `Informacja`,
        "datepicker.endTime": `Godzina ko\u{144}cowa`,
        "datepicker.startTime": `Godzina pocz\u{105}tkowa`,
        "datepicker.time": `Godzina`,
        "dialog.alert": `Ostrze\u{17C}enie`,
        "dialog.dismiss": `Zignoruj`,
        "dropzone.replaceMessage": `Upu\u{15B}\u{107} plik, aby zast\u{105}pi\u{107}`,
        "inlinealert.informative": `Informacja`,
        "inlinealert.negative": `B\u{142}\u{105}d`,
        "inlinealert.notice": `Ostrze\u{17C}enie`,
        "inlinealert.positive": `Powodzenie`,
        "label.(optional)": `(opcjonalne)`,
        "label.(required)": `(wymagane)`,
        "listview.loading": `Wczytywanie...`,
        "listview.loadingMore": `Wczytywanie wi\u{119}kszej liczby...`,
        "menu.loading": `Wczytywanie...`,
        "menu.loadingMore": `Wczytywanie wi\u{119}kszej liczby...`,
        "menu.moreActions": `Wi\u{119}cej akcji`,
        "menu.noResults": `Brak wynik\xf3w`,
        "menu.unavailable": `Niedost\u{119}pne, rozwi\u{144}, aby zobaczy\u{107} szczeg\xf3\u{142}y`,
        "notificationbadge.indicatorOnly": `Nowa aktywno\u{15B}\u{107}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Wczytywanie...`,
        "picker.loadingMore": `Wczytywanie wi\u{119}kszej liczby...`,
        "picker.placeholder": `Zaznacz\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nie zaznaczono \u{17C}adnych element\xf3w`,
                one: ()=>`${formatter.number(args.count)} zaznaczony element`,
                few: ()=>`${formatter.number(args.count)} zaznaczone elementy`,
                many: ()=>`${formatter.number(args.count)} zaznaczonych element\xf3w`,
                other: ()=>`${formatter.number(args.count)} zaznaczonych element\xf3w`
            })}`,
        "sidepanel.collapse": `Zwi\u{144} panel boczny`,
        "sidepanel.expand": `Rozwi\u{144} panel boczny`,
        "slider.maximum": `Maksimum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `Anuluj`,
        "table.drag": `Przeci\u{105}gnij`,
        "table.editCell": `Edytuj kom\xf3rk\u{119}`,
        "table.loading": `Wczytywanie...`,
        "table.loadingMore": `Wczytywanie wi\u{119}kszej liczby...`,
        "table.resizeColumn": `Zmie\u{144} rozmiar kolumny`,
        "table.save": `Zapisz`,
        "table.sortAscending": `Sortuj rosn\u{105}co`,
        "table.sortDescending": `Sortuj malej\u{105}co`,
        "tag.actions": `Dzia\u{142}ania`,
        "tag.hideButtonLabel": `Wy\u{15B}wietl mniej`,
        "tag.noTags": `Brak`,
        "tag.showAllButtonLabel": (args, formatter)=>`Poka\u{17C} wszystko (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Wyczy\u{15B}\u{107} wszystko`,
        "toast.collapse": `Zwi\u{144}`,
        "toast.showAll": `Poka\u{17C} wszystko`,
        "treeview.loadingMore": `Wczytywanie wi\u{119}kszej liczby...`
    },
    "pt-BR": {
        "actionbar.actions": `A\xe7\xf5es`,
        "actionbar.actionsAvailable": `A\xe7\xf5es dispon\xedveis.`,
        "actionbar.clearSelection": `Limpar sele\xe7\xe3o`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nenhum selecionado`,
                one: ()=>`${formatter.number(args.count)} selecionado`,
                other: ()=>`${formatter.number(args.count)} selecionados`
            })}`,
        "actionbar.selectedAll": `Todos selecionados`,
        "actionbutton.pending": `pendente`,
        "breadcrumbs.more": `Mais itens`,
        "button.pending": `pendente`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `Data`,
                other: `Datas`
            })} selecionada(s) indispon\xedvel(is).`,
        "combobox.loading": `Carregando...`,
        "combobox.loadingMore": `Carregando mais...`,
        "combobox.noResults": `Nenhum resultado`,
        "contextualhelp.help": `Ajuda`,
        "contextualhelp.info": `Informa\xe7\xf5es`,
        "datepicker.endTime": `Hora final`,
        "datepicker.startTime": `Hora inicial`,
        "datepicker.time": `Hora`,
        "dialog.alert": `Alerta`,
        "dialog.dismiss": `Descartar`,
        "dropzone.replaceMessage": `Solte o arquivo para substituir`,
        "inlinealert.informative": `Informa\xe7\xf5es`,
        "inlinealert.negative": `Erro`,
        "inlinealert.notice": `Aviso`,
        "inlinealert.positive": `Sucesso`,
        "label.(optional)": `(opcional)`,
        "label.(required)": `(obrigat\xf3rio)`,
        "listview.loading": `Carregando...`,
        "listview.loadingMore": `Carregando mais...`,
        "menu.loading": `Carregando...`,
        "menu.loadingMore": `Carregando mais...`,
        "menu.moreActions": `Mais a\xe7\xf5es`,
        "menu.noResults": `Nenhum resultado`,
        "menu.unavailable": `Indispon\xedvel. Expanda para ver os detalhes`,
        "notificationbadge.indicatorOnly": `Nova atividade`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Carregando...`,
        "picker.loadingMore": `Carregando mais...`,
        "picker.placeholder": `Selecionar\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nenhum item selecionado`,
                one: ()=>`${formatter.number(args.count)} item selecionado`,
                other: ()=>`${formatter.number(args.count)} itens selecionados`
            })}`,
        "sidepanel.collapse": `Recolher o painel lateral`,
        "sidepanel.expand": `Expandir o painel lateral`,
        "slider.maximum": `M\xe1ximo`,
        "slider.minimum": `M\xednimo`,
        "table.cancel": `Cancelar`,
        "table.drag": `Arraste`,
        "table.editCell": `Editar c\xe9lula`,
        "table.loading": `Carregando...`,
        "table.loadingMore": `Carregando mais...`,
        "table.resizeColumn": `Redimensionar coluna`,
        "table.save": `Salvar`,
        "table.sortAscending": `Ordenar por ordem crescente`,
        "table.sortDescending": `Ordenar por ordem decrescente`,
        "tag.actions": `A\xe7\xf5es`,
        "tag.hideButtonLabel": `Mostrar menos`,
        "tag.noTags": `Nenhum`,
        "tag.showAllButtonLabel": (args, formatter)=>`Mostrar tudo (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Limpar tudo`,
        "toast.collapse": `Recolher`,
        "toast.showAll": `Mostrar tudo`,
        "treeview.loadingMore": `Carregando mais...`
    },
    "pt-PT": {
        "actionbar.actions": `A\xe7\xf5es`,
        "actionbar.actionsAvailable": `A\xe7\xf5es dispon\xedveis.`,
        "actionbar.clearSelection": `Limpar sele\xe7\xe3o`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nenhum selecionado`,
                one: ()=>`${formatter.number(args.count)} selecionado`,
                other: ()=>`${formatter.number(args.count)} selecionados`
            })}`,
        "actionbar.selectedAll": `Tudo selecionado`,
        "actionbutton.pending": `pendente`,
        "breadcrumbs.more": `Mais artigos`,
        "button.pending": `pendente`,
        "calendar.invalidSelection": (args, formatter)=>`A(s) ${formatter.plural(args.selectedCount, {
                one: `data`,
                other: `datas`
            })} selecionada(s) n\xe3o est\xe1(\xe3o) dispon\xedvel/dispon\xedvel(eis).`,
        "combobox.loading": `A carregar...`,
        "combobox.loadingMore": `A carregar mais...`,
        "combobox.noResults": `Sem resultados`,
        "contextualhelp.help": `Ajuda`,
        "contextualhelp.info": `Informa\xe7\xe3o`,
        "datepicker.endTime": `Terminar tempo`,
        "datepicker.startTime": `Iniciar tempo`,
        "datepicker.time": `Tempo`,
        "dialog.alert": `Alerta`,
        "dialog.dismiss": `Dispensar`,
        "dropzone.replaceMessage": `Largar ficheiro para substituir`,
        "inlinealert.informative": `Informa\xe7\xe3o`,
        "inlinealert.negative": `Erro`,
        "inlinealert.notice": `Aviso`,
        "inlinealert.positive": `Sucesso`,
        "label.(optional)": `(opcional)`,
        "label.(required)": `(obrigat\xf3rio)`,
        "listview.loading": `A carregar...`,
        "listview.loadingMore": `A carregar mais...`,
        "menu.loading": `A carregar...`,
        "menu.loadingMore": `A carregar mais...`,
        "menu.moreActions": `Mais a\xe7\xf5es`,
        "menu.noResults": `Sem resultados`,
        "menu.unavailable": `Indispon\xedvel, expandir para mais detalhes`,
        "notificationbadge.indicatorOnly": `Nova atividade`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `A carregar...`,
        "picker.loadingMore": `A carregar mais...`,
        "picker.placeholder": `Selecionar\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nenhum item selecionado`,
                one: ()=>`${formatter.number(args.count)} item selecionado`,
                other: ()=>`${formatter.number(args.count)} itens selecionados`
            })}.`,
        "sidepanel.collapse": `Fechar o painel lateral`,
        "sidepanel.expand": `Expandir o painel lateral`,
        "slider.maximum": `M\xe1ximo`,
        "slider.minimum": `M\xednimo`,
        "table.cancel": `Cancelar`,
        "table.drag": `Arrastar`,
        "table.editCell": `Editar c\xe9lula`,
        "table.loading": `A carregar...`,
        "table.loadingMore": `A carregar mais...`,
        "table.resizeColumn": `Redimensionar coluna`,
        "table.save": `Guardar`,
        "table.sortAscending": `Ordenar por ordem ascendente`,
        "table.sortDescending": `Ordenar por ordem decrescente`,
        "tag.actions": `A\xe7\xf5es`,
        "tag.hideButtonLabel": `Mostrar menos`,
        "tag.noTags": `Nenhum`,
        "tag.showAllButtonLabel": (args, formatter)=>`Mostrar tudo (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Limpar tudo`,
        "toast.collapse": `Colapsar`,
        "toast.showAll": `Mostrar tudo`,
        "treeview.loadingMore": `A carregar mais...`
    },
    "ro-RO": {
        "actionbar.actions": `Ac\u{21B}iuni`,
        "actionbar.actionsAvailable": `Ac\u{21B}iuni disponibile.`,
        "actionbar.clearSelection": `Goli\u{21B}i selec\u{21B}ia`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Niciunul selectat`,
                one: ()=>` ${formatter.number(args.count)} selectat`,
                other: ()=>`${formatter.number(args.count)} selectate`
            })}`,
        "actionbar.selectedAll": `Toate elementele selectate`,
        "actionbutton.pending": `\xeen a\u{219}teptare`,
        "breadcrumbs.more": `Mai multe articole`,
        "button.pending": `\xeen a\u{219}teptare`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `Data selectat\u{103} nu este disponibil\u{103}`,
                other: `Datele selectate nu sunt disponibile`
            })}.`,
        "combobox.loading": `Se \xeencarc\u{103}...`,
        "combobox.loadingMore": `Se \xeencarc\u{103} mai multe...`,
        "combobox.noResults": `Niciun rezultat`,
        "contextualhelp.help": `Ajutor`,
        "contextualhelp.info": `Informa\u{21B}ii`,
        "datepicker.endTime": `Ora de sf\xe2r\u{219}it`,
        "datepicker.startTime": `Ora de \xeenceput`,
        "datepicker.time": `Ora`,
        "dialog.alert": `Alert\u{103}`,
        "dialog.dismiss": `Revocare`,
        "dropzone.replaceMessage": `Plasa\u{21B}i fi\u{219}ierul pentru a \xeenlocui`,
        "inlinealert.informative": `Informa\u{21B}ii`,
        "inlinealert.negative": `Eroare`,
        "inlinealert.notice": `Avertisment`,
        "inlinealert.positive": `Succes`,
        "label.(optional)": `(op\u{163}ional)`,
        "label.(required)": `(obligatoriu)`,
        "listview.loading": `Se \xeencarc\u{103}...`,
        "listview.loadingMore": `Se \xeencarc\u{103} mai multe...`,
        "menu.loading": `Se \xeencarc\u{103}...`,
        "menu.loadingMore": `Se \xeencarc\u{103} mai multe...`,
        "menu.moreActions": `Mai multe ac\u{21B}iuni`,
        "menu.noResults": `Niciun rezultat`,
        "menu.unavailable": `Indisponibil, extinde\u{21B}i pentru detalii`,
        "notificationbadge.indicatorOnly": `Activitate nou\u{103}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Se \xeencarc\u{103}...`,
        "picker.loadingMore": `Se \xeencarc\u{103} mai multe...`,
        "picker.placeholder": `Selecta\u{21B}i\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Niciun articol selectat`,
                one: ()=>`${formatter.number(args.count)} articol selectat`,
                other: ()=>`${formatter.number(args.count)} articole selectate`
            })}`,
        "sidepanel.collapse": `Restr\xe2nge\u{21B}i panoul lateral`,
        "sidepanel.expand": ` Extinde\u{21B}i panoul lateral`,
        "slider.maximum": `Maximum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `Anulare`,
        "table.drag": `Trage\u{21B}i`,
        "table.editCell": `Edita\u{21B}i celula`,
        "table.loading": `Se \xeencarc\u{103}...`,
        "table.loadingMore": `Se \xeencarc\u{103} mai multe...`,
        "table.resizeColumn": `Redimensiona\u{21B}i coloana`,
        "table.save": `Salva\u{21B}i`,
        "table.sortAscending": `Sorta\u{21B}i cresc\u{103}tor`,
        "table.sortDescending": `Sorta\u{21B}i descresc\u{103}tor`,
        "tag.actions": `Ac\u{21B}iuni`,
        "tag.hideButtonLabel": `Se afi\u{219}eaz\u{103} mai pu\u{21B}in`,
        "tag.noTags": `Niciuna`,
        "tag.showAllButtonLabel": (args, formatter)=>`Se afi\u{219}eaz\u{103} tot (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Goli\u{21B}i tot`,
        "toast.collapse": `Restr\xe2nge\u{21B}i`,
        "toast.showAll": `Afi\u{219}a\u{21B}i tot`,
        "treeview.loadingMore": `Se \xeencarc\u{103} mai multe...`
    },
    "ru-RU": {
        "actionbar.actions": `\u{414}\u{435}\u{439}\u{441}\u{442}\u{432}\u{438}\u{44F}`,
        "actionbar.actionsAvailable": `\u{414}\u{435}\u{439}\u{441}\u{442}\u{432}\u{438}\u{44F} \u{434}\u{43E}\u{441}\u{442}\u{443}\u{43F}\u{43D}\u{44B}.`,
        "actionbar.clearSelection": `\u{41E}\u{447}\u{438}\u{441}\u{442}\u{438}\u{442}\u{44C} \u{432}\u{44B}\u{431}\u{43E}\u{440}`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{41D}\u{435} \u{432}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43E}`,
                other: ()=>`\u{412}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43E} ${formatter.number(args.count)}`
            })}`,
        "actionbar.selectedAll": `\u{412}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43E} \u{432}\u{441}\u{435}`,
        "actionbutton.pending": `\u{432} \u{43E}\u{436}\u{438}\u{434}\u{430}\u{43D}\u{438}\u{438}`,
        "breadcrumbs.more": `\u{414}\u{43E}\u{43F}\u{43E}\u{43B}\u{43D}\u{438}\u{442}\u{435}\u{43B}\u{44C}\u{43D}\u{44B}\u{435} \u{44D}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{44B}`,
        "button.pending": `\u{432} \u{43E}\u{436}\u{438}\u{434}\u{430}\u{43D}\u{438}\u{438}`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `\u{412}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43D}\u{430}\u{44F} \u{434}\u{430}\u{442}\u{430} \u{43D}\u{435}\u{434}\u{43E}\u{441}\u{442}\u{443}\u{43F}\u{43D}\u{430}`,
                other: `\u{412}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43D}\u{44B}\u{435} \u{434}\u{430}\u{442}\u{44B} \u{43D}\u{435}\u{434}\u{43E}\u{441}\u{442}\u{443}\u{43F}\u{43D}\u{44B}`
            })}.`,
        "combobox.loading": `\u{417}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...`,
        "combobox.loadingMore": `\u{414}\u{43E}\u{43F}\u{43E}\u{43B}\u{43D}\u{438}\u{442}\u{435}\u{43B}\u{44C}\u{43D}\u{430}\u{44F} \u{437}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...`,
        "combobox.noResults": `\u{420}\u{435}\u{437}\u{443}\u{43B}\u{44C}\u{442}\u{430}\u{442}\u{44B} \u{43E}\u{442}\u{441}\u{443}\u{442}\u{441}\u{442}\u{432}\u{443}\u{44E}\u{442}`,
        "contextualhelp.help": `\u{421}\u{43F}\u{440}\u{430}\u{432}\u{43A}\u{430}`,
        "contextualhelp.info": `\u{418}\u{43D}\u{444}\u{43E}\u{440}\u{43C}\u{430}\u{446}\u{438}\u{44F}`,
        "datepicker.endTime": `\u{412}\u{440}\u{435}\u{43C}\u{44F} \u{43E}\u{43A}\u{43E}\u{43D}\u{447}\u{430}\u{43D}\u{438}\u{44F}`,
        "datepicker.startTime": `\u{412}\u{440}\u{435}\u{43C}\u{44F} \u{43D}\u{430}\u{447}\u{430}\u{43B}\u{430}`,
        "datepicker.time": `\u{412}\u{440}\u{435}\u{43C}\u{44F}`,
        "dialog.alert": `\u{41F}\u{440}\u{435}\u{434}\u{443}\u{43F}\u{440}\u{435}\u{436}\u{434}\u{435}\u{43D}\u{438}\u{435}`,
        "dialog.dismiss": `\u{41F}\u{440}\u{43E}\u{43F}\u{443}\u{441}\u{442}\u{438}\u{442}\u{44C}`,
        "dropzone.replaceMessage": `\u{41F}\u{435}\u{440}\u{435}\u{442}\u{430}\u{449}\u{438}\u{442}\u{435} \u{444}\u{430}\u{439}\u{43B} \u{434}\u{43B}\u{44F} \u{437}\u{430}\u{43C}\u{435}\u{43D}\u{44B}`,
        "inlinealert.informative": `\u{418}\u{43D}\u{444}\u{43E}\u{440}\u{43C}\u{430}\u{446}\u{438}\u{44F}`,
        "inlinealert.negative": `\u{41E}\u{448}\u{438}\u{431}\u{43A}\u{430}`,
        "inlinealert.notice": `\u{41F}\u{440}\u{435}\u{434}\u{443}\u{43F}\u{440}\u{435}\u{436}\u{434}\u{435}\u{43D}\u{438}\u{435}`,
        "inlinealert.positive": `\u{423}\u{441}\u{43F}\u{435}\u{448}\u{43D}\u{43E}`,
        "label.(optional)": `(\u{434}\u{43E}\u{43F}\u{43E}\u{43B}\u{43D}\u{438}\u{442}\u{435}\u{43B}\u{44C}\u{43D}\u{43E})`,
        "label.(required)": `(\u{43E}\u{431}\u{44F}\u{437}\u{430}\u{442}\u{435}\u{43B}\u{44C}\u{43D}\u{43E})`,
        "listview.loading": `\u{417}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...`,
        "listview.loadingMore": `\u{414}\u{43E}\u{43F}\u{43E}\u{43B}\u{43D}\u{438}\u{442}\u{435}\u{43B}\u{44C}\u{43D}\u{430}\u{44F} \u{437}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...`,
        "menu.loading": `\u{417}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...`,
        "menu.loadingMore": `\u{414}\u{43E}\u{43F}\u{43E}\u{43B}\u{43D}\u{438}\u{442}\u{435}\u{43B}\u{44C}\u{43D}\u{430}\u{44F} \u{437}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...`,
        "menu.moreActions": `\u{414}\u{43E}\u{43F}\u{43E}\u{43B}\u{43D}\u{438}\u{442}\u{435}\u{43B}\u{44C}\u{43D}\u{44B}\u{435} \u{434}\u{435}\u{439}\u{441}\u{442}\u{432}\u{438}\u{44F}`,
        "menu.noResults": `\u{420}\u{435}\u{437}\u{443}\u{43B}\u{44C}\u{442}\u{430}\u{442}\u{44B} \u{43E}\u{442}\u{441}\u{443}\u{442}\u{441}\u{442}\u{432}\u{443}\u{44E}\u{442}`,
        "menu.unavailable": `\u{41D}\u{435}\u{434}\u{43E}\u{441}\u{442}\u{443}\u{43F}\u{43D}\u{43E}, \u{440}\u{430}\u{437}\u{432}\u{435}\u{440}\u{43D}\u{438}\u{442}\u{435} \u{434}\u{43B}\u{44F} \u{43F}\u{43E}\u{434}\u{440}\u{43E}\u{431}\u{43D}\u{43E}\u{441}\u{442}\u{435}\u{439}`,
        "notificationbadge.indicatorOnly": `\u{41D}\u{43E}\u{432}\u{430}\u{44F} \u{430}\u{43A}\u{442}\u{438}\u{432}\u{43D}\u{43E}\u{441}\u{442}\u{44C}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `\u{417}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...`,
        "picker.loadingMore": `\u{414}\u{43E}\u{43F}\u{43E}\u{43B}\u{43D}\u{438}\u{442}\u{435}\u{43B}\u{44C}\u{43D}\u{430}\u{44F} \u{437}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...`,
        "picker.placeholder": `\u{412}\u{44B}\u{431}\u{440}\u{430}\u{442}\u{44C}\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{41D}\u{435}\u{442} \u{432}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43D}\u{44B}\u{445} \u{44D}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{43E}\u{432}`,
                one: ()=>`${formatter.number(args.count)} \u{44D}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442} \u{432}\u{44B}\u{431}\u{440}\u{430}\u{43D}`,
                other: ()=>`${formatter.number(args.count)} \u{44D}\u{43B}. \u{432}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43E}`
            })}`,
        "sidepanel.collapse": `\u{421}\u{432}\u{435}\u{440}\u{43D}\u{443}\u{442}\u{44C} \u{431}\u{43E}\u{43A}\u{43E}\u{432}\u{443}\u{44E} \u{43F}\u{430}\u{43D}\u{435}\u{43B}\u{44C}`,
        "sidepanel.expand": `\u{420}\u{430}\u{437}\u{432}\u{435}\u{440}\u{43D}\u{443}\u{442}\u{44C} \u{431}\u{43E}\u{43A}\u{43E}\u{432}\u{443}\u{44E} \u{43F}\u{430}\u{43D}\u{435}\u{43B}\u{44C}`,
        "slider.maximum": `\u{41C}\u{430}\u{43A}\u{441}\u{438}\u{43C}\u{443}\u{43C}`,
        "slider.minimum": `\u{41C}\u{438}\u{43D}\u{438}\u{43C}\u{443}\u{43C}`,
        "table.cancel": `\u{41E}\u{442}\u{43C}\u{435}\u{43D}\u{430}`,
        "table.drag": `\u{41F}\u{435}\u{440}\u{435}\u{442}\u{430}\u{441}\u{43A}\u{438}\u{432}\u{430}\u{43D}\u{438}\u{435}`,
        "table.editCell": `\u{420}\u{435}\u{434}\u{430}\u{43A}\u{442}\u{438}\u{440}\u{43E}\u{432}\u{430}\u{442}\u{44C} \u{44F}\u{447}\u{435}\u{439}\u{43A}\u{443}`,
        "table.loading": `\u{417}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...`,
        "table.loadingMore": `\u{414}\u{43E}\u{43F}\u{43E}\u{43B}\u{43D}\u{438}\u{442}\u{435}\u{43B}\u{44C}\u{43D}\u{430}\u{44F} \u{437}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...`,
        "table.resizeColumn": `\u{418}\u{437}\u{43C}\u{435}\u{43D}\u{438}\u{442}\u{44C} \u{440}\u{430}\u{437}\u{43C}\u{435}\u{440} \u{441}\u{442}\u{43E}\u{43B}\u{431}\u{446}\u{430}`,
        "table.save": `\u{421}\u{43E}\u{445}\u{440}\u{430}\u{43D}\u{438}\u{442}\u{44C}`,
        "table.sortAscending": `\u{421}\u{43E}\u{440}\u{442}\u{438}\u{440}\u{43E}\u{432}\u{430}\u{442}\u{44C} \u{43F}\u{43E} \u{432}\u{43E}\u{437}\u{440}\u{430}\u{441}\u{442}\u{430}\u{43D}\u{438}\u{44E}`,
        "table.sortDescending": `\u{421}\u{43E}\u{440}\u{442}\u{438}\u{440}\u{43E}\u{432}\u{430}\u{442}\u{44C} \u{43F}\u{43E} \u{443}\u{431}\u{44B}\u{432}\u{430}\u{43D}\u{438}\u{44E}`,
        "tag.actions": `\u{414}\u{435}\u{439}\u{441}\u{442}\u{432}\u{438}\u{44F}`,
        "tag.hideButtonLabel": `\u{41F}\u{43E}\u{43A}\u{430}\u{437}\u{430}\u{442}\u{44C} \u{43C}\u{435}\u{43D}\u{44C}\u{448}\u{435}`,
        "tag.noTags": `\u{41D}\u{435}\u{442}`,
        "tag.showAllButtonLabel": (args, formatter)=>`\u{41F}\u{43E}\u{43A}\u{430}\u{437}\u{430}\u{442}\u{44C} \u{432}\u{441}\u{435} (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `\u{41E}\u{447}\u{438}\u{441}\u{442}\u{438}\u{442}\u{44C} \u{432}\u{441}\u{435}`,
        "toast.collapse": `\u{421}\u{432}\u{435}\u{440}\u{43D}\u{443}\u{442}\u{44C}`,
        "toast.showAll": `\u{41F}\u{43E}\u{43A}\u{430}\u{437}\u{430}\u{442}\u{44C} \u{432}\u{441}\u{435}`,
        "treeview.loadingMore": `\u{414}\u{43E}\u{43F}\u{43E}\u{43B}\u{43D}\u{438}\u{442}\u{435}\u{43B}\u{44C}\u{43D}\u{430}\u{44F} \u{437}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...`
    },
    "sk-SK": {
        "actionbar.actions": `Akcie`,
        "actionbar.actionsAvailable": `Dostupn\xe9 akcie.`,
        "actionbar.clearSelection": `Vymaza\u{165} v\xfdber`,
        "actionbar.selected": (args)=>`Vybran\xe9 polo\u{17E}ky: ${args.count}`,
        "actionbar.selectedAll": `V\u{161}etky vybrat\xe9 polo\u{17E}ky`,
        "actionbutton.pending": `\u{10D}akaj\xface`,
        "breadcrumbs.more": `\u{10E}al\u{161}ie polo\u{17E}ky`,
        "button.pending": `\u{10D}akaj\xface`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `Vybrat\xfd d\xe1tum`,
                other: `Vybrat\xe9 d\xe1tumy`
            })}: nedostupn\xe9.`,
        "combobox.loading": `Na\u{10D}\xedtava sa...`,
        "combobox.loadingMore": `Na\u{10D}\xedtava sa viac...`,
        "combobox.noResults": `\u{17D}iadne v\xfdsledky`,
        "contextualhelp.help": `Pomoc`,
        "contextualhelp.info": `Inform\xe1cie`,
        "datepicker.endTime": `\u{10C}as ukon\u{10D}enia`,
        "datepicker.startTime": `\u{10C}as za\u{10D}iatku`,
        "datepicker.time": `\u{10C}as`,
        "dialog.alert": `Upozornenie`,
        "dialog.dismiss": `Zru\u{161}i\u{165}`,
        "dropzone.replaceMessage": `Presu\u{148}te s\xfabor, ktor\xfd chcete nahradi\u{165}`,
        "inlinealert.informative": `Inform\xe1cie`,
        "inlinealert.negative": `Chyba`,
        "inlinealert.notice": `Upozornenie`,
        "inlinealert.positive": `\xdaspech`,
        "label.(optional)": `(nepovinn\xe9)`,
        "label.(required)": `(povinn\xe9)`,
        "listview.loading": `Na\u{10D}\xedtava sa...`,
        "listview.loadingMore": `Na\u{10D}\xedtava sa viac...`,
        "menu.loading": `Na\u{10D}\xedtava sa...`,
        "menu.loadingMore": `Na\u{10D}\xedtava sa viac...`,
        "menu.moreActions": `\u{10E}al\u{161}ie akcie`,
        "menu.noResults": `\u{17D}iadne v\xfdsledky`,
        "menu.unavailable": `Nedostupn\xe9, rozba\u{13E}te podrobnosti`,
        "notificationbadge.indicatorOnly": `Nov\xe1 aktivita`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Na\u{10D}\xedtava sa...`,
        "picker.loadingMore": `Na\u{10D}\xedtava sa viac...`,
        "picker.placeholder": `Vybra\u{165}\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{17D}iadne vybrat\xe9 polo\u{17E}ky`,
                one: ()=>`${formatter.number(args.count)} vybrat\xe1 polo\u{17E}ka`,
                other: ()=>`Po\u{10D}et vybrat\xfdch polo\u{17E}iek ${formatter.number(args.count)}`
            })}`,
        "sidepanel.collapse": `Zbali\u{165} bo\u{10D}n\xfd panel`,
        "sidepanel.expand": `Rozbali\u{165} bo\u{10D}n\xfd panel`,
        "slider.maximum": `Maximum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `Zru\u{161}i\u{165}`,
        "table.drag": `Presun\xfa\u{165}`,
        "table.editCell": `Upravi\u{165} bunku`,
        "table.loading": `Na\u{10D}\xedtava sa...`,
        "table.loadingMore": `Na\u{10D}\xedtava sa viac...`,
        "table.resizeColumn": `Zmeni\u{165} ve\u{13E}kos\u{165} st\u{13A}pca`,
        "table.save": `Ulo\u{17E}i\u{165}`,
        "table.sortAscending": `Zoradi\u{165} vzostupne`,
        "table.sortDescending": `Zoradi\u{165} zostupne`,
        "tag.actions": `Akcie`,
        "tag.hideButtonLabel": `Zobrazi\u{165} menej`,
        "tag.noTags": `\u{17D}iadne`,
        "tag.showAllButtonLabel": (args, formatter)=>`Zobrazi\u{165} v\u{161}etko (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Vymaza\u{165} v\u{161}etko`,
        "toast.collapse": `Zbali\u{165}`,
        "toast.showAll": `Zobrazi\u{165} v\u{161}etko`,
        "treeview.loadingMore": `Na\u{10D}\xedtava sa viac...`
    },
    "sl-SI": {
        "actionbar.actions": `Dejanja`,
        "actionbar.actionsAvailable": `Na voljo so dejanja.`,
        "actionbar.clearSelection": `Po\u{10D}isti izbor`,
        "actionbar.selected": (args)=>`Izbrano: ${args.count}`,
        "actionbar.selectedAll": `Izbrano vse`,
        "actionbutton.pending": `v teku`,
        "breadcrumbs.more": `Ve\u{10D} elementov`,
        "button.pending": `v teku`,
        "calendar.invalidSelection": (args, formatter)=>`Izbrano ${formatter.plural(args.selectedCount, {
                one: `date`,
                other: `dates`
            })} ni na voljo.`,
        "combobox.loading": `Nalaganje...`,
        "combobox.loadingMore": `Nalaganje ve\u{10D} vsebine...`,
        "combobox.noResults": `Ni rezultatov`,
        "contextualhelp.help": `Pomo\u{10D}`,
        "contextualhelp.info": `Informacije`,
        "datepicker.endTime": `Kon\u{10D}ni \u{10D}as`,
        "datepicker.startTime": `Za\u{10D}etni \u{10D}as`,
        "datepicker.time": `\u{10C}as`,
        "dialog.alert": `Opozorilo`,
        "dialog.dismiss": `Opusti`,
        "dropzone.replaceMessage": `Spustite datoteko za zamenjavo`,
        "inlinealert.informative": `Informacije`,
        "inlinealert.negative": `Napaka`,
        "inlinealert.notice": `Opozorilo`,
        "inlinealert.positive": `Uspe\u{161}no`,
        "label.(optional)": `(opcijsko)`,
        "label.(required)": `(obvezno)`,
        "listview.loading": `Nalaganje...`,
        "listview.loadingMore": `Nalaganje ve\u{10D} vsebine...`,
        "menu.loading": `Nalaganje...`,
        "menu.loadingMore": `Nalaganje ve\u{10D} vsebine...`,
        "menu.moreActions": `Ve\u{10D} mo\u{17E}nosti`,
        "menu.noResults": `Ni rezultatov`,
        "menu.unavailable": `Ni na voljo, raz\u{161}irite za podrobnosti`,
        "notificationbadge.indicatorOnly": `Nova dejavnost`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Nalaganje...`,
        "picker.loadingMore": `Nalaganje ve\u{10D} vsebine...`,
        "picker.placeholder": `Izberite\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Ni izbranih elementov`,
                one: ()=>`izbran je ${formatter.number(args.count)} element`,
                other: ()=>`izbranih je ${formatter.number(args.count)} elementov`
            })}.`,
        "sidepanel.collapse": `Strni stransko podokno`,
        "sidepanel.expand": `Raz\u{161}iri stransko podokno`,
        "slider.maximum": `Najve\u{10D}ji`,
        "slider.minimum": `Najmanj`,
        "table.cancel": `Prekli\u{10D}i`,
        "table.drag": `Povleci`,
        "table.editCell": `Uredi celico`,
        "table.loading": `Nalaganje...`,
        "table.loadingMore": `Nalaganje ve\u{10D} vsebine...`,
        "table.resizeColumn": `Spremeni velikost stolpca`,
        "table.save": `Shrani`,
        "table.sortAscending": `Razvrsti nara\u{161}\u{10D}ajo\u{10D}e`,
        "table.sortDescending": `Razvrsti padajo\u{10D}e`,
        "tag.actions": `Dejanja`,
        "tag.hideButtonLabel": `Prika\u{17E}i manj`,
        "tag.noTags": `Ni\u{10D}`,
        "tag.showAllButtonLabel": (args, formatter)=>`Prika\u{17E} vse (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Po\u{10D}isti vse`,
        "toast.collapse": `Strni`,
        "toast.showAll": `Prika\u{17E}i vse`,
        "treeview.loadingMore": `Nalaganje ve\u{10D} vsebine...`
    },
    "sr-SP": {
        "actionbar.actions": `Radnje`,
        "actionbar.actionsAvailable": `Dostupne su radnje.`,
        "actionbar.clearSelection": `Poni\u{161}ti izbor`,
        "actionbar.selected": (args)=>`Izabrano: ${args.count}`,
        "actionbar.selectedAll": `Sve je izabrano`,
        "actionbutton.pending": `nere\u{161}eno`,
        "breadcrumbs.more": `Vi\u{161}e stavki`,
        "button.pending": `nere\u{161}eno`,
        "calendar.invalidSelection": (args, formatter)=>`Izabrani ${formatter.plural(args.selectedCount, {
                one: `date`,
                other: `dates`
            })} nije dostupan.`,
        "combobox.loading": `U\u{10D}itavam...`,
        "combobox.loadingMore": `U\u{10D}itavam jo\u{161}...`,
        "combobox.noResults": `Nema rezultata`,
        "contextualhelp.help": `Pomo\u{107}`,
        "contextualhelp.info": `Informacije`,
        "datepicker.endTime": `Zavr\u{161}no vreme`,
        "datepicker.startTime": `Po\u{10D}etno vreme`,
        "datepicker.time": `Vreme`,
        "dialog.alert": `Upozorenje`,
        "dialog.dismiss": `Odbaci`,
        "dropzone.replaceMessage": `Otpustite datoteku radi zamene`,
        "inlinealert.informative": `Informacije`,
        "inlinealert.negative": `Gre\u{161}ka`,
        "inlinealert.notice": `Upozorenje`,
        "inlinealert.positive": `Uspe\u{161}no`,
        "label.(optional)": `(opciono)`,
        "label.(required)": `(obavezno)`,
        "listview.loading": `U\u{10D}itavam...`,
        "listview.loadingMore": `U\u{10D}itavam jo\u{161}...`,
        "menu.loading": `U\u{10D}itavam...`,
        "menu.loadingMore": `U\u{10D}itavam jo\u{161}...`,
        "menu.moreActions": `Dodatne radnje`,
        "menu.noResults": `Nema rezultata`,
        "menu.unavailable": `Nije dostupno, pro\u{161}irite za detalje`,
        "notificationbadge.indicatorOnly": `Nova aktivnost`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `U\u{10D}itavam...`,
        "picker.loadingMore": `U\u{10D}itavam jo\u{161}...`,
        "picker.placeholder": `Izaberite...`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Nije izabrana nijedna stavka`,
                one: ()=>`Izabrana je ${formatter.number(args.count)} stavka`,
                other: ()=>`Izabrano je ${formatter.number(args.count)} stavki`
            })}`,
        "sidepanel.collapse": `Skupi bo\u{10D}nu tablu`,
        "sidepanel.expand": `Pro\u{161}iri bo\u{10D}nu tablu`,
        "slider.maximum": `Najvi\u{161}e`,
        "slider.minimum": `Najmanje`,
        "table.cancel": `Otka\u{17E}i`,
        "table.drag": `Prevuci`,
        "table.editCell": `Uredi \u{107}eliju`,
        "table.loading": `U\u{10D}itavam...`,
        "table.loadingMore": `U\u{10D}itavam jo\u{161}...`,
        "table.resizeColumn": `Promeni veli\u{10D}inu kolone`,
        "table.save": `Sa\u{10D}uvaj`,
        "table.sortAscending": `Sortiraj po rastu\u{107}em redosledu`,
        "table.sortDescending": `Sortiraj po opadaju\u{107}em redosledu`,
        "tag.actions": `Radnje`,
        "tag.hideButtonLabel": `Prika\u{17E}i manje`,
        "tag.noTags": `Ne postoji`,
        "tag.showAllButtonLabel": (args, formatter)=>`Prika\u{17E}i sve (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Obri\u{161}i sve`,
        "toast.collapse": ` Skupi`,
        "toast.showAll": `Prika\u{17E}i sve`,
        "treeview.loadingMore": `U\u{10D}itavam jo\u{161}...`
    },
    "sv-SE": {
        "actionbar.actions": `\xc5tg\xe4rder`,
        "actionbar.actionsAvailable": `\xc5tg\xe4rder finns.`,
        "actionbar.clearSelection": `Rensa markering`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Inga valda`,
                one: ()=>`${formatter.number(args.count)} vald`,
                other: ()=>`${formatter.number(args.count)} valda`
            })}`,
        "actionbar.selectedAll": `Alla markerade`,
        "actionbutton.pending": `v\xe4ntande`,
        "breadcrumbs.more": `Fler artiklar`,
        "button.pending": `v\xe4ntande`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `Valt datum \xe4r inte tillg\xe4ngligt.`,
                other: `Valda datum \xe4r inte tillg\xe4ngliga.`
            })}`,
        "combobox.loading": `L\xe4ser in...`,
        "combobox.loadingMore": `L\xe4ser in mer...`,
        "combobox.noResults": `Inga resultat`,
        "contextualhelp.help": `Hj\xe4lp`,
        "contextualhelp.info": `Information`,
        "datepicker.endTime": `Sluttid`,
        "datepicker.startTime": `Starttid`,
        "datepicker.time": `Tid`,
        "dialog.alert": `Varning`,
        "dialog.dismiss": `Avvisa`,
        "dropzone.replaceMessage": `Sl\xe4pp filen f\xf6r att ers\xe4tta`,
        "inlinealert.informative": `Information`,
        "inlinealert.negative": `Fel`,
        "inlinealert.notice": `Varning`,
        "inlinealert.positive": `Lyckades`,
        "label.(optional)": `(valfritt)`,
        "label.(required)": `(kr\xe4vs)`,
        "listview.loading": `L\xe4ser in...`,
        "listview.loadingMore": `L\xe4ser in mer...`,
        "menu.loading": `L\xe4ser in...`,
        "menu.loadingMore": `L\xe4ser in mer...`,
        "menu.moreActions": `Fler \xe5tg\xe4rder`,
        "menu.noResults": `Inga resultat`,
        "menu.unavailable": `Ej tillg\xe4nglig, expandera f\xf6r mer information`,
        "notificationbadge.indicatorOnly": `Ny aktivitet`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `L\xe4ser in...`,
        "picker.loadingMore": `L\xe4ser in mer...`,
        "picker.placeholder": `V\xe4lj\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Inga objekt markerade`,
                one: ()=>`${formatter.number(args.count)} objekt markerat`,
                other: ()=>`${formatter.number(args.count)} objekt markerade`
            })}.`,
        "sidepanel.collapse": `D\xf6lj sidopanelen`,
        "sidepanel.expand": `Expandera sidopanelen`,
        "slider.maximum": `Maximum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `Avbryt`,
        "table.drag": `Dra`,
        "table.editCell": `Redigera cell`,
        "table.loading": `L\xe4ser in...`,
        "table.loadingMore": `L\xe4ser in mer...`,
        "table.resizeColumn": `\xc4ndra storlek p\xe5 kolumn`,
        "table.save": `Spara`,
        "table.sortAscending": `Sortera i stigande ordning`,
        "table.sortDescending": `Sortera i fallande ordning`,
        "tag.actions": `\xc5tg\xe4rder`,
        "tag.hideButtonLabel": `Visa mindre`,
        "tag.noTags": `Ingen`,
        "tag.showAllButtonLabel": (args, formatter)=>`Visa alla (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `Rensa alla`,
        "toast.collapse": `D\xf6lj`,
        "toast.showAll": `Visa alla`,
        "treeview.loadingMore": `L\xe4ser in mer...`
    },
    "tr-TR": {
        "actionbar.actions": `Eylemler`,
        "actionbar.actionsAvailable": `Eylemler mevcut.`,
        "actionbar.clearSelection": `Se\xe7imi temizle`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Hi\xe7biri se\xe7ilmedi`,
                other: ()=>`${formatter.number(args.count)} se\xe7ildi`
            })}`,
        "actionbar.selectedAll": `T\xfcm\xfc se\xe7ildi`,
        "actionbutton.pending": `beklemede`,
        "breadcrumbs.more": `Daha fazla \xf6\u{11F}e`,
        "button.pending": `beklemede`,
        "calendar.invalidSelection": (args, formatter)=>`Se\xe7ilen ${formatter.plural(args.selectedCount, {
                one: `tarih`,
                other: `tarihler`
            })} m\xfcsait de\u{11F}il.`,
        "combobox.loading": `Y\xfckleniyor...`,
        "combobox.loadingMore": `Daha fazla y\xfckleniyor...`,
        "combobox.noResults": `Sonu\xe7 yok`,
        "contextualhelp.help": `Yard\u{131}m`,
        "contextualhelp.info": `Bilgiler`,
        "datepicker.endTime": `Biti\u{15F} saati`,
        "datepicker.startTime": `Ba\u{15F}lang\u{131}\xe7 saati`,
        "datepicker.time": `Saat`,
        "dialog.alert": `Uyar\u{131}`,
        "dialog.dismiss": `Kapat`,
        "dropzone.replaceMessage": `De\u{11F}i\u{15F}tirmek i\xe7in dosyay\u{131} b\u{131}rak\u{131}n`,
        "inlinealert.informative": `Bilgiler`,
        "inlinealert.negative": `Hata`,
        "inlinealert.notice": `Uyar\u{131}`,
        "inlinealert.positive": `Ba\u{15F}ar\u{131}l\u{131}`,
        "label.(optional)": `(iste\u{11F}e ba\u{11F}l\u{131})`,
        "label.(required)": `(gerekli)`,
        "listview.loading": `Y\xfckleniyor...`,
        "listview.loadingMore": `Daha fazla y\xfckleniyor...`,
        "menu.loading": `Y\xfckleniyor...`,
        "menu.loadingMore": `Daha fazla y\xfckleniyor...`,
        "menu.moreActions": `Daha fazla eylem`,
        "menu.noResults": `Sonu\xe7 yok`,
        "menu.unavailable": `Kullan\u{131}lam\u{131}yor, ayr\u{131}nt\u{131}lar\u{131} g\xf6rmek i\xe7in geni\u{15F}letin`,
        "notificationbadge.indicatorOnly": `Yeni etkinlik`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `Y\xfckleniyor...`,
        "picker.loadingMore": `Daha fazla y\xfckleniyor...`,
        "picker.placeholder": `Se\xe7in\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `Hi\xe7bir \xf6ge se\xe7ilmedi`,
                one: ()=>`${formatter.number(args.count)} \xf6ge se\xe7ildi`,
                other: ()=>`${formatter.number(args.count)} \xf6ge se\xe7ildi`
            })}`,
        "sidepanel.collapse": `Yan paneli daralt`,
        "sidepanel.expand": `Yan paneli geni\u{15F}let`,
        "slider.maximum": `Maksimum`,
        "slider.minimum": `Minimum`,
        "table.cancel": `\u{130}ptal et`,
        "table.drag": `S\xfcr\xfckle`,
        "table.editCell": `H\xfccreyi d\xfczenle`,
        "table.loading": `Y\xfckleniyor...`,
        "table.loadingMore": `Daha fazla y\xfckleniyor...`,
        "table.resizeColumn": `S\xfctunu yeniden boyutland\u{131}r`,
        "table.save": `Kaydet`,
        "table.sortAscending": `Artan S\u{131}ralama`,
        "table.sortDescending": `Azalan S\u{131}ralama`,
        "tag.actions": `Eylemler`,
        "tag.hideButtonLabel": `Daha az g\xf6ster`,
        "tag.noTags": `Hi\xe7biri`,
        "tag.showAllButtonLabel": (args, formatter)=>`T\xfcm\xfcn\xfc g\xf6ster (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `T\xfcm\xfcn\xfc temizle`,
        "toast.collapse": `Daralt`,
        "toast.showAll": `T\xfcm\xfcn\xfc g\xf6ster`,
        "treeview.loadingMore": `Daha fazla y\xfckleniyor...`
    },
    "uk-UA": {
        "actionbar.actions": `\u{414}\u{456}\u{457}`,
        "actionbar.actionsAvailable": `\u{414}\u{43E}\u{441}\u{442}\u{443}\u{43F}\u{43D}\u{456} \u{434}\u{456}\u{457}.`,
        "actionbar.clearSelection": `\u{41E}\u{447}\u{438}\u{441}\u{442}\u{438}\u{442}\u{438} \u{432}\u{438}\u{431}\u{456}\u{440}`,
        "actionbar.selected": (args)=>`\u{412}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{43E}: ${args.count}`,
        "actionbar.selectedAll": `\u{423}\u{441}\u{435} \u{432}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{43E}`,
        "actionbutton.pending": `\u{432} \u{43E}\u{447}\u{456}\u{43A}\u{443}\u{432}\u{430}\u{43D}\u{43D}\u{456}`,
        "breadcrumbs.more": `\u{411}\u{456}\u{43B}\u{44C}\u{448}\u{435} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{456}\u{432}`,
        "button.pending": `\u{432} \u{43E}\u{447}\u{456}\u{43A}\u{443}\u{432}\u{430}\u{43D}\u{43D}\u{456}`,
        "calendar.invalidSelection": (args, formatter)=>`${formatter.plural(args.selectedCount, {
                one: `\u{412}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{430} \u{434}\u{430}\u{442}\u{430} \u{43D}\u{435}\u{434}\u{43E}\u{441}\u{442}\u{443}\u{43F}\u{43D}\u{430}`,
                other: `\u{412}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{456} \u{434}\u{430}\u{442}\u{438} \u{43D}\u{435}\u{434}\u{43E}\u{441}\u{442}\u{443}\u{43F}\u{43D}\u{456}`
            })}.`,
        "combobox.loading": `\u{417}\u{430}\u{432}\u{430}\u{43D}\u{442}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F}\u{2026}`,
        "combobox.loadingMore": `\u{417}\u{430}\u{432}\u{430}\u{43D}\u{442}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F} \u{456}\u{43D}\u{448}\u{438}\u{445} \u{43E}\u{431}\u{2019}\u{454}\u{43A}\u{442}\u{456}\u{432}...`,
        "combobox.noResults": `\u{420}\u{435}\u{437}\u{443}\u{43B}\u{44C}\u{442}\u{430}\u{442}\u{456}\u{432} \u{43D}\u{435}\u{43C}\u{430}\u{454}`,
        "contextualhelp.help": `\u{414}\u{43E}\u{432}\u{456}\u{434}\u{43A}\u{430}`,
        "contextualhelp.info": `\u{406}\u{43D}\u{444}\u{43E}\u{440}\u{43C}\u{430}\u{446}\u{456}\u{44F}`,
        "datepicker.endTime": `\u{427}\u{430}\u{441} \u{437}\u{430}\u{432}\u{435}\u{440}\u{448}\u{435}\u{43D}\u{43D}\u{44F}`,
        "datepicker.startTime": `\u{427}\u{430}\u{441} \u{43F}\u{43E}\u{447}\u{430}\u{442}\u{43A}\u{443}`,
        "datepicker.time": `\u{427}\u{430}\u{441}`,
        "dialog.alert": `\u{421}\u{438}\u{433}\u{43D}\u{430}\u{43B} \u{442}\u{440}\u{438}\u{432}\u{43E}\u{433}\u{438}`,
        "dialog.dismiss": `\u{421}\u{43A}\u{430}\u{441}\u{443}\u{432}\u{430}\u{442}\u{438}`,
        "dropzone.replaceMessage": `\u{41F}\u{435}\u{440}\u{435}\u{442}\u{44F}\u{433}\u{43D}\u{456}\u{442}\u{44C} \u{444}\u{430}\u{439}\u{43B} \u{434}\u{43B}\u{44F} \u{437}\u{430}\u{43C}\u{456}\u{43D}\u{438}`,
        "inlinealert.informative": `\u{406}\u{43D}\u{444}\u{43E}\u{440}\u{43C}\u{430}\u{446}\u{456}\u{44F}`,
        "inlinealert.negative": `\u{41F}\u{43E}\u{43C}\u{438}\u{43B}\u{43A}\u{430}`,
        "inlinealert.notice": `\u{41F}\u{43E}\u{43F}\u{435}\u{440}\u{435}\u{434}\u{436}\u{435}\u{43D}\u{43D}\u{44F}`,
        "inlinealert.positive": `\u{423}\u{441}\u{43F}\u{456}\u{448}\u{43D}\u{43E}`,
        "label.(optional)": `(\u{43D}\u{435}\u{43E}\u{431}\u{43E}\u{432}\u{2019}\u{44F}\u{437}\u{43A}\u{43E}\u{432}\u{43E})`,
        "label.(required)": `(\u{43E}\u{431}\u{43E}\u{432}\u{2019}\u{44F}\u{437}\u{43A}\u{43E}\u{432}\u{43E})`,
        "listview.loading": `\u{417}\u{430}\u{432}\u{430}\u{43D}\u{442}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F}\u{2026}`,
        "listview.loadingMore": `\u{417}\u{430}\u{432}\u{430}\u{43D}\u{442}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F} \u{456}\u{43D}\u{448}\u{438}\u{445} \u{43E}\u{431}\u{2019}\u{454}\u{43A}\u{442}\u{456}\u{432}...`,
        "menu.loading": `\u{417}\u{430}\u{432}\u{430}\u{43D}\u{442}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F}\u{2026}`,
        "menu.loadingMore": `\u{417}\u{430}\u{432}\u{430}\u{43D}\u{442}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F} \u{456}\u{43D}\u{448}\u{438}\u{445} \u{43E}\u{431}\u{2019}\u{454}\u{43A}\u{442}\u{456}\u{432}...`,
        "menu.moreActions": `\u{411}\u{456}\u{43B}\u{44C}\u{448}\u{435} \u{434}\u{456}\u{439}`,
        "menu.noResults": `\u{420}\u{435}\u{437}\u{443}\u{43B}\u{44C}\u{442}\u{430}\u{442}\u{456}\u{432} \u{43D}\u{435}\u{43C}\u{430}\u{454}`,
        "menu.unavailable": `\u{41D}\u{435}\u{434}\u{43E}\u{441}\u{442}\u{443}\u{43F}\u{43D}\u{43E}, \u{440}\u{43E}\u{437}\u{433}\u{43E}\u{440}\u{43D}\u{456}\u{442}\u{44C} \u{434}\u{43B}\u{44F} \u{434}\u{43E}\u{43A}\u{43B}\u{430}\u{434}\u{43D}\u{456}\u{448}\u{43E}\u{457} \u{456}\u{43D}\u{444}\u{43E}\u{440}\u{43C}\u{430}\u{446}\u{456}\u{457}`,
        "notificationbadge.indicatorOnly": `\u{41D}\u{43E}\u{432}\u{430} \u{430}\u{43A}\u{442}\u{438}\u{432}\u{43D}\u{456}\u{441}\u{442}\u{44C}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `\u{417}\u{430}\u{432}\u{430}\u{43D}\u{442}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F}\u{2026}`,
        "picker.loadingMore": `\u{417}\u{430}\u{432}\u{430}\u{43D}\u{442}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F} \u{456}\u{43D}\u{448}\u{438}\u{445} \u{43E}\u{431}\u{2019}\u{454}\u{43A}\u{442}\u{456}\u{432}...`,
        "picker.placeholder": `\u{412}\u{438}\u{431}\u{440}\u{430}\u{442}\u{438}\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{416}\u{43E}\u{434}\u{43D}\u{438}\u{445} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{456}\u{432} \u{43D}\u{435} \u{432}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{43E}`,
                one: ()=>`${formatter.number(args.count)} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442} \u{432}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{43E}`,
                other: ()=>`\u{415}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{456}\u{432} \u{432}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{43E}: ${formatter.number(args.count)}`
            })}`,
        "sidepanel.collapse": `\u{417}\u{433}\u{43E}\u{440}\u{43D}\u{443}\u{442}\u{438} \u{431}\u{456}\u{447}\u{43D}\u{443} \u{43F}\u{430}\u{43D}\u{435}\u{43B}\u{44C}`,
        "sidepanel.expand": `\u{420}\u{43E}\u{437}\u{433}\u{43E}\u{440}\u{43D}\u{443}\u{442}\u{438} \u{431}\u{456}\u{447}\u{43D}\u{443} \u{43F}\u{430}\u{43D}\u{435}\u{43B}\u{44C}`,
        "slider.maximum": `\u{41C}\u{430}\u{43A}\u{441}\u{438}\u{43C}\u{443}\u{43C}`,
        "slider.minimum": `\u{41C}\u{456}\u{43D}\u{456}\u{43C}\u{443}\u{43C}`,
        "table.cancel": `\u{421}\u{43A}\u{430}\u{441}\u{443}\u{432}\u{430}\u{442}\u{438}`,
        "table.drag": `\u{41F}\u{435}\u{440}\u{435}\u{442}\u{44F}\u{433}\u{43D}\u{443}\u{442}\u{438}`,
        "table.editCell": `\u{420}\u{435}\u{434}\u{430}\u{433}\u{443}\u{432}\u{430}\u{442}\u{438} \u{43A}\u{43B}\u{456}\u{442}\u{438}\u{43D}\u{43A}\u{443}`,
        "table.loading": `\u{417}\u{430}\u{432}\u{430}\u{43D}\u{442}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F}\u{2026}`,
        "table.loadingMore": `\u{417}\u{430}\u{432}\u{430}\u{43D}\u{442}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F} \u{456}\u{43D}\u{448}\u{438}\u{445} \u{43E}\u{431}\u{2019}\u{454}\u{43A}\u{442}\u{456}\u{432}...`,
        "table.resizeColumn": `\u{417}\u{43C}\u{456}\u{43D}\u{438}\u{442}\u{438} \u{440}\u{43E}\u{437}\u{43C}\u{456}\u{440} \u{441}\u{442}\u{43E}\u{432}\u{43F}\u{446}\u{44F}`,
        "table.save": `\u{417}\u{431}\u{435}\u{440}\u{435}\u{433}\u{442}\u{438}`,
        "table.sortAscending": `\u{421}\u{43E}\u{440}\u{442}\u{443}\u{432}\u{430}\u{442}\u{438} \u{437}\u{430} \u{437}\u{440}\u{43E}\u{441}\u{442}\u{430}\u{43D}\u{43D}\u{44F}\u{43C}`,
        "table.sortDescending": `\u{421}\u{43E}\u{440}\u{442}\u{443}\u{432}\u{430}\u{442}\u{438} \u{437}\u{430} \u{441}\u{43F}\u{430}\u{434}\u{430}\u{43D}\u{43D}\u{44F}\u{43C}`,
        "tag.actions": `\u{414}\u{456}\u{457}`,
        "tag.hideButtonLabel": `\u{41F}\u{43E}\u{43A}\u{430}\u{437}\u{443}\u{432}\u{430}\u{442}\u{438} \u{43C}\u{435}\u{43D}\u{448}\u{435}`,
        "tag.noTags": `\u{41D}\u{435}\u{43C}\u{430}\u{454}`,
        "tag.showAllButtonLabel": (args, formatter)=>`\u{41F}\u{43E}\u{43A}\u{430}\u{437}\u{430}\u{442}\u{438} \u{432}\u{441}\u{456} (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `\u{41E}\u{447}\u{438}\u{441}\u{442}\u{438}\u{442}\u{438} \u{432}\u{441}\u{435}`,
        "toast.collapse": `\u{417}\u{433}\u{43E}\u{440}\u{43D}\u{443}\u{442}\u{438}`,
        "toast.showAll": `\u{41F}\u{43E}\u{43A}\u{430}\u{437}\u{430}\u{442}\u{438} \u{432}\u{441}\u{435}`,
        "treeview.loadingMore": `\u{417}\u{430}\u{432}\u{430}\u{43D}\u{442}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F} \u{456}\u{43D}\u{448}\u{438}\u{445} \u{43E}\u{431}\u{2019}\u{454}\u{43A}\u{442}\u{456}\u{432}...`
    },
    "zh-CN": {
        "actionbar.actions": `\u{64CD}\u{4F5C}`,
        "actionbar.actionsAvailable": `\u{6709}\u{53EF}\u{7528}\u{64CD}\u{4F5C}\u{3002}`,
        "actionbar.clearSelection": `\u{6E05}\u{9664}\u{9009}\u{62E9}`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{65E0}\u{9009}\u{62E9}`,
                other: ()=>`\u{5DF2}\u{9009}\u{62E9} ${formatter.number(args.count)} \u{4E2A}`
            })}`,
        "actionbar.selectedAll": `\u{5168}\u{9009}`,
        "actionbutton.pending": `\u{5F85}\u{5904}\u{7406}`,
        "breadcrumbs.more": `\u{66F4}\u{591A}\u{9879}\u{76EE}`,
        "button.pending": `\u{5F85}\u{5904}\u{7406}`,
        "calendar.invalidSelection": (args, formatter)=>`\u{9009}\u{5B9A}\u{7684} ${formatter.plural(args.selectedCount, {
                one: `\u{4E2A}\u{65E5}\u{671F}`,
                other: `\u{4E2A}\u{65E5}\u{671F}`
            })} \u{4E0D}\u{53EF}\u{7528}\u{3002}`,
        "combobox.loading": `\u{6B63}\u{5728}\u{52A0}\u{8F7D}...`,
        "combobox.loadingMore": `\u{6B63}\u{5728}\u{52A0}\u{8F7D}\u{66F4}\u{591A}...`,
        "combobox.noResults": `\u{65E0}\u{7ED3}\u{679C}`,
        "contextualhelp.help": `\u{5E2E}\u{52A9}`,
        "contextualhelp.info": `\u{4FE1}\u{606F}`,
        "datepicker.endTime": `\u{7ED3}\u{675F}\u{65F6}\u{95F4}`,
        "datepicker.startTime": `\u{5F00}\u{59CB}\u{65F6}\u{95F4}`,
        "datepicker.time": `\u{65F6}\u{95F4}`,
        "dialog.alert": `\u{8B66}\u{62A5}`,
        "dialog.dismiss": `\u{53D6}\u{6D88}`,
        "dropzone.replaceMessage": `\u{5220}\u{9664}\u{8981}\u{66FF}\u{6362}\u{7684}\u{6587}\u{4EF6}`,
        "inlinealert.informative": `\u{4FE1}\u{606F}`,
        "inlinealert.negative": `\u{9519}\u{8BEF}`,
        "inlinealert.notice": `\u{8B66}\u{544A}`,
        "inlinealert.positive": `\u{6210}\u{529F}`,
        "label.(optional)": `\u{FF08}\u{975E}\u{5FC5}\u{987B}\u{FF09}`,
        "label.(required)": `\u{FF08}\u{5FC5}\u{586B}\u{FF09}`,
        "listview.loading": `\u{6B63}\u{5728}\u{52A0}\u{8F7D}...`,
        "listview.loadingMore": `\u{6B63}\u{5728}\u{52A0}\u{8F7D}\u{66F4}\u{591A}...`,
        "menu.loading": `\u{6B63}\u{5728}\u{52A0}\u{8F7D}...`,
        "menu.loadingMore": `\u{6B63}\u{5728}\u{52A0}\u{8F7D}\u{66F4}\u{591A}...`,
        "menu.moreActions": `\u{66F4}\u{591A}\u{64CD}\u{4F5C}`,
        "menu.noResults": `\u{65E0}\u{7ED3}\u{679C}`,
        "menu.unavailable": `\u{4E0D}\u{53EF}\u{7528}\u{FF0C}\u{5C55}\u{5F00}\u{4EE5}\u{67E5}\u{770B}\u{8BE6}\u{7EC6}\u{4FE1}\u{606F}`,
        "notificationbadge.indicatorOnly": `\u{65B0}\u{6D3B}\u{52A8}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `\u{6B63}\u{5728}\u{52A0}\u{8F7D}...`,
        "picker.loadingMore": `\u{6B63}\u{5728}\u{52A0}\u{8F7D}\u{66F4}\u{591A}...`,
        "picker.placeholder": `\u{8BF7}\u{9009}\u{62E9}\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{672A}\u{9009}\u{62E9}\u{4EFB}\u{4F55}\u{9879}`,
                one: ()=>`\u{5DF2}\u{9009}\u{62E9} ${formatter.number(args.count)} \u{4E2A}\u{9879}`,
                other: ()=>`\u{5DF2}\u{9009}\u{62E9} ${formatter.number(args.count)} \u{4E2A}\u{9879}`
            })}`,
        "sidepanel.collapse": `\u{6298}\u{53E0}\u{4FA7}\u{9762}\u{677F}`,
        "sidepanel.expand": `\u{5C55}\u{5F00}\u{4FA7}\u{9762}\u{677F}`,
        "slider.maximum": `\u{6700}\u{5927}`,
        "slider.minimum": `\u{6700}\u{5C0F}`,
        "table.cancel": `\u{53D6}\u{6D88}`,
        "table.drag": `\u{62D6}\u{52A8}`,
        "table.editCell": `\u{7F16}\u{8F91}\u{5355}\u{5143}\u{683C}`,
        "table.loading": `\u{6B63}\u{5728}\u{52A0}\u{8F7D}...`,
        "table.loadingMore": `\u{6B63}\u{5728}\u{52A0}\u{8F7D}\u{66F4}\u{591A}...`,
        "table.resizeColumn": `\u{8C03}\u{6574}\u{5217}\u{5927}\u{5C0F}`,
        "table.save": `\u{4FDD}\u{5B58}`,
        "table.sortAscending": `\u{5347}\u{5E8F}\u{6392}\u{5E8F}`,
        "table.sortDescending": `\u{964D}\u{5E8F}\u{6392}\u{5E8F}`,
        "tag.actions": `\u{64CD}\u{4F5C}`,
        "tag.hideButtonLabel": `\u{663E}\u{793A}\u{66F4}\u{5C11}`,
        "tag.noTags": `\u{65E0}`,
        "tag.showAllButtonLabel": (args, formatter)=>`\u{5168}\u{90E8}\u{663E}\u{793A} (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `\u{5168}\u{90E8}\u{6E05}\u{9664}`,
        "toast.collapse": `\u{6298}\u{53E0}`,
        "toast.showAll": `\u{663E}\u{793A}\u{5168}\u{90E8}`,
        "treeview.loadingMore": `\u{6B63}\u{5728}\u{52A0}\u{8F7D}\u{66F4}\u{591A}...`
    },
    "zh-TW": {
        "actionbar.actions": `\u{52D5}\u{4F5C}`,
        "actionbar.actionsAvailable": `\u{53EF}\u{57F7}\u{884C}\u{7684}\u{52D5}\u{4F5C}\u{3002}`,
        "actionbar.clearSelection": `\u{6E05}\u{9664}\u{9078}\u{53D6}\u{9805}\u{76EE}`,
        "actionbar.selected": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{672A}\u{9078}\u{53D6}\u{4EFB}\u{4F55}\u{9805}\u{76EE}`,
                other: ()=>`\u{5DF2}\u{9078}\u{53D6} ${formatter.number(args.count)} \u{500B}`
            })}`,
        "actionbar.selectedAll": `\u{5DF2}\u{9078}\u{53D6}\u{6240}\u{6709}\u{9805}\u{76EE}`,
        "actionbutton.pending": `\u{5F85}\u{8655}\u{7406}`,
        "breadcrumbs.more": `\u{66F4}\u{591A}\u{9805}\u{76EE}`,
        "button.pending": `\u{5F85}\u{8655}\u{7406}`,
        "calendar.invalidSelection": (args, formatter)=>`\u{6240}\u{9078}\u{7684}${formatter.plural(args.selectedCount, {
                one: `\u{65E5}\u{671F}`,
                other: `\u{65E5}\u{671F}`
            })}\u{7121}\u{6CD5}\u{4F7F}\u{7528}\u{3002}`,
        "combobox.loading": `\u{8F09}\u{5165}\u{4E2D}\u{2026}`,
        "combobox.loadingMore": `\u{6B63}\u{5728}\u{8F09}\u{5165}\u{66F4}\u{591A}\u{2026}`,
        "combobox.noResults": `\u{7121}\u{4EFB}\u{4F55}\u{7D50}\u{679C}`,
        "contextualhelp.help": `\u{8AAA}\u{660E}`,
        "contextualhelp.info": `\u{8CC7}\u{8A0A}`,
        "datepicker.endTime": `\u{7D50}\u{675F}\u{6642}\u{9593}`,
        "datepicker.startTime": `\u{958B}\u{59CB}\u{6642}\u{9593}`,
        "datepicker.time": `\u{6642}\u{9593}`,
        "dialog.alert": `\u{8B66}\u{793A}`,
        "dialog.dismiss": `\u{95DC}\u{9589}`,
        "dropzone.replaceMessage": `\u{653E}\u{7F6E}\u{8981}\u{53D6}\u{4EE3}\u{7684}\u{6A94}\u{6848}`,
        "inlinealert.informative": `\u{8CC7}\u{8A0A}`,
        "inlinealert.negative": `\u{932F}\u{8AA4}`,
        "inlinealert.notice": `\u{8B66}\u{544A}`,
        "inlinealert.positive": `\u{6210}\u{529F}`,
        "label.(optional)": `(\u{9078}\u{586B})`,
        "label.(required)": `(\u{5FC5}\u{586B})`,
        "listview.loading": `\u{8F09}\u{5165}\u{4E2D}\u{2026}`,
        "listview.loadingMore": `\u{6B63}\u{5728}\u{8F09}\u{5165}\u{66F4}\u{591A}\u{2026}`,
        "menu.loading": `\u{8F09}\u{5165}\u{4E2D}\u{2026}`,
        "menu.loadingMore": `\u{6B63}\u{5728}\u{8F09}\u{5165}\u{66F4}\u{591A}\u{2026}`,
        "menu.moreActions": `\u{66F4}\u{591A}\u{52D5}\u{4F5C}`,
        "menu.noResults": `\u{7121}\u{4EFB}\u{4F55}\u{7D50}\u{679C}`,
        "menu.unavailable": `\u{7121}\u{6CD5}\u{4F7F}\u{7528}\u{FF0C}\u{5C55}\u{958B}\u{4EE5}\u{53D6}\u{5F97}\u{8A73}\u{7D30}\u{8CC7}\u{6599}`,
        "notificationbadge.indicatorOnly": `\u{65B0}\u{6D3B}\u{52D5}`,
        "notificationbadge.plus": (args)=>`${args.notifications}+`,
        "picker.loading": `\u{8F09}\u{5165}\u{4E2D}\u{2026}`,
        "picker.loadingMore": `\u{6B63}\u{5728}\u{8F09}\u{5165}\u{66F4}\u{591A}\u{2026}`,
        "picker.placeholder": `\u{9078}\u{53D6}\u{2026}`,
        "picker.selectedCount": (args, formatter)=>`${formatter.plural(args.count, {
                "=0": `\u{672A}\u{9078}\u{53D6}\u{4EFB}\u{4F55}\u{9805}\u{76EE}`,
                one: ()=>`\u{5DF2}\u{9078}\u{53D6} ${formatter.number(args.count)} \u{500B}\u{9805}\u{76EE}`,
                other: ()=>`\u{5DF2}\u{9078}\u{53D6} ${formatter.number(args.count)} \u{500B}\u{9805}\u{76EE}`
            })}`,
        "sidepanel.collapse": `\u{6536}\u{5408}\u{5074}\u{9762}\u{677F}`,
        "sidepanel.expand": `\u{5C55}\u{958B}\u{5074}\u{9762}\u{677F}`,
        "slider.maximum": `\u{6700}\u{5927}\u{503C}`,
        "slider.minimum": `\u{6700}\u{5C0F}\u{503C}`,
        "table.cancel": `\u{53D6}\u{6D88}`,
        "table.drag": `\u{62D6}\u{66F3}`,
        "table.editCell": `\u{7DE8}\u{8F2F}\u{5132}\u{5B58}\u{683C}`,
        "table.loading": `\u{8F09}\u{5165}\u{4E2D}\u{2026}`,
        "table.loadingMore": `\u{6B63}\u{5728}\u{8F09}\u{5165}\u{66F4}\u{591A}\u{2026}`,
        "table.resizeColumn": `\u{8ABF}\u{6574}\u{6B04}\u{5927}\u{5C0F}`,
        "table.save": `\u{5132}\u{5B58}`,
        "table.sortAscending": `\u{905E}\u{589E}\u{6392}\u{5E8F}`,
        "table.sortDescending": `\u{905E}\u{6E1B}\u{6392}\u{5E8F}`,
        "tag.actions": `\u{52D5}\u{4F5C}`,
        "tag.hideButtonLabel": `\u{986F}\u{793A}\u{8F03}\u{5C11}`,
        "tag.noTags": `\u{7121}`,
        "tag.showAllButtonLabel": (args, formatter)=>`\u{986F}\u{793A}\u{5168}\u{90E8} (${formatter.number(args.tagCount)})`,
        "toast.clearAll": `\u{5168}\u{90E8}\u{6E05}\u{9664}`,
        "toast.collapse": `\u{6536}\u{5408}`,
        "toast.showAll": `\u{986F}\u{793A}\u{5168}\u{90E8}`,
        "treeview.loadingMore": `\u{6B63}\u{5728}\u{8F09}\u{5165}\u{66F4}\u{591A}\u{2026}`
    }
};

});

parcelRegister("k0dKS", function(module, exports) {

$parcel$export(module.exports, "NotificationBadgeContext", function () { return $e8fe7a2fd970d55e$export$9ab75c96ebaa396c; });
$parcel$export(module.exports, "NotificationBadge", function () { return $e8fe7a2fd970d55e$export$529cab0ca6be204e; });

parcelRequire("bAtJj");
var $5gAIA = parcelRequire("5gAIA");

var $dBSpv = parcelRequire("dBSpv");

var $81zYK = parcelRequire("81zYK");


var $eXdQ3 = parcelRequire("eXdQ3");
parcelRequire("ig9q0");
var $dnlDG = parcelRequire("dnlDG");
parcelRequire("2fwg4");
var $jeZsY = parcelRequire("jeZsY");

var $1NDEx = parcelRequire("1NDEx");
var $e8fe7a2fd970d55e$var$_tmpl$ = /*#__PURE__*/ (0, $3RlMb$template)(`<span>`);
const $e8fe7a2fd970d55e$export$9ab75c96ebaa396c = (0, $3RlMb$createContext)(null);
const $e8fe7a2fd970d55e$var$badge = function anonymous(props, overrides) {
    let rules = " ", currentRules = {};
    let width = false;
    let matches = String(overrides || '').matchAll(/(?:^|\s)(J|G|I|H|_u|_v|_s|__A|_d|_J|z|y|B|A|_P|_9|W|_l|_A|_z|_6|Z|N|L|-macro\$)[^\s]+/g);
    for (let p of matches){
        if (p[1] === "Z") width = true;
        rules += p[0];
    }
    if (props.isDisabled) {
        rules += ' sk18';
        currentRules["display"] = typeof currentRules["display"] === 'object' ? currentRules["display"] : {
            "default": currentRules["display"]
        };
        currentRules["display"]["isDisabled"] = "none";
    } else {
        rules += ' sd18';
        currentRules["display"] = "flex";
    }
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
    if (props.size === "XL") {
        rules += ' -_6BNtrc-c18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"XL\""] = "ui";
        rules += ' vFHT6Dd18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"XL\""] = "ui";
    } else if (props.size === "L") {
        rules += ' -_6BNtrc-b18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"L\""] = "ui-sm";
        rules += ' vFHT6Dd18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"L\""] = "ui-sm";
    } else if (props.size === "M") {
        rules += ' -_6BNtrc-a18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"M\""] = "ui-xs";
        rules += ' vFHT6Dd18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"M\""] = "ui-xs";
    } else if (props.size === "S") {
        rules += ' -_6BNtrc-a18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"S\""] = "ui-xs";
        rules += ' vFHT6Dd18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"S\""] = "ui-xs";
    }
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
    if (props.isStaticColor) {
        rules += ' ph18';
        currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
            "default": currentRules["color"]
        };
        currentRules["color"]["isStaticColor"] = "auto";
    } else {
        rules += ' px18';
        currentRules["color"] = "white";
    }
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
    rules += ' _klOVIhfcb18';
    currentRules["borderTopWidth"] = typeof currentRules["borderTopWidth"] === 'object' ? currentRules["borderTopWidth"] : {
        "default": currentRules["borderTopWidth"]
    };
    currentRules["borderTopWidth"]["forcedColors"] = "[1px]";
    rules += ' _klOVIhfcb18';
    currentRules["borderTopWidth"] = typeof currentRules["borderTopWidth"] === 'object' ? currentRules["borderTopWidth"] : {
        "default": currentRules["borderTopWidth"]
    };
    currentRules["borderTopWidth"][":is([data-hcm], [data-hcm] *)"] = "[1px]";
    rules += ' hlOVIhfcb18';
    currentRules["borderBottomWidth"] = typeof currentRules["borderBottomWidth"] === 'object' ? currentRules["borderBottomWidth"] : {
        "default": currentRules["borderBottomWidth"]
    };
    currentRules["borderBottomWidth"]["forcedColors"] = "[1px]";
    rules += ' hlOVIhfcb18';
    currentRules["borderBottomWidth"] = typeof currentRules["borderBottomWidth"] === 'object' ? currentRules["borderBottomWidth"] : {
        "default": currentRules["borderBottomWidth"]
    };
    currentRules["borderBottomWidth"][":is([data-hcm], [data-hcm] *)"] = "[1px]";
    rules += ' mlOVIhfcb18';
    currentRules["borderStartWidth"] = typeof currentRules["borderStartWidth"] === 'object' ? currentRules["borderStartWidth"] : {
        "default": currentRules["borderStartWidth"]
    };
    currentRules["borderStartWidth"]["forcedColors"] = "[1px]";
    rules += ' mlOVIhfcb18';
    currentRules["borderStartWidth"] = typeof currentRules["borderStartWidth"] === 'object' ? currentRules["borderStartWidth"] : {
        "default": currentRules["borderStartWidth"]
    };
    currentRules["borderStartWidth"][":is([data-hcm], [data-hcm] *)"] = "[1px]";
    rules += ' llOVIhfcb18';
    currentRules["borderEndWidth"] = typeof currentRules["borderEndWidth"] === 'object' ? currentRules["borderEndWidth"] : {
        "default": currentRules["borderEndWidth"]
    };
    currentRules["borderEndWidth"]["forcedColors"] = "[1px]";
    rules += ' llOVIhfcb18';
    currentRules["borderEndWidth"] = typeof currentRules["borderEndWidth"] === 'object' ? currentRules["borderEndWidth"] : {
        "default": currentRules["borderEndWidth"]
    };
    currentRules["borderEndWidth"][":is([data-hcm], [data-hcm] *)"] = "[1px]";
    rules += ' ilOVIhfcCp4usd18';
    currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
        "default": currentRules["borderColor"]
    };
    currentRules["borderColor"]["forcedColors"] = "ButtonBorder";
    rules += ' ilOVIhfcCp4usd18';
    currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
        "default": currentRules["borderColor"]
    };
    currentRules["borderColor"][":is([data-hcm], [data-hcm] *)"] = "ButtonBorder";
    rules += ' _Ca18';
    currentRules["justifyContent"] = "center";
    rules += ' eb18';
    currentRules["alignItems"] = "center";
    rules += ' gqMFGYc18';
    rules += ' FRuFGYc18';
    if (props.isSingleDigit) {
        rules += ' fa18';
        currentRules["aspectRatio"] = typeof currentRules["aspectRatio"] === 'object' ? currentRules["aspectRatio"] : {
            "default": currentRules["aspectRatio"]
        };
        currentRules["aspectRatio"]["isSingleDigit"] = "square";
    } else if (props.isIndicatorOnly) {
        rules += ' fa18';
        currentRules["aspectRatio"] = typeof currentRules["aspectRatio"] === 'object' ? currentRules["aspectRatio"] : {
            "default": currentRules["aspectRatio"]
        };
        currentRules["aspectRatio"]["isIndicatorOnly"] = "square";
    }
    if (!width) rules += ' ZK18';
    currentRules["width"] = "max";
    if (props.isDoubleDigit) {
        rules += ' Sv18';
        currentRules["paddingStart"] = typeof currentRules["paddingStart"] === 'object' ? currentRules["paddingStart"] : {
            "default": currentRules["paddingStart"]
        };
        currentRules["paddingStart"]["isDoubleDigit"] = "edge-to-text";
    }
    if (props.isDoubleDigit) {
        rules += ' Rv18';
        currentRules["paddingEnd"] = typeof currentRules["paddingEnd"] === 'object' ? currentRules["paddingEnd"] : {
            "default": currentRules["paddingEnd"]
        };
        currentRules["paddingEnd"]["isDoubleDigit"] = "edge-to-text";
    }
    rules += ' oh18';
    currentRules["borderTopStartRadius"] = "pill";
    rules += ' nh18';
    currentRules["borderTopEndRadius"] = "pill";
    rules += ' kh18';
    currentRules["borderBottomStartRadius"] = "pill";
    rules += ' jh18';
    currentRules["borderBottomEndRadius"] = "pill";
    if (props.isStaticColor) {
        rules += ' -g_-g_c18';
        currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
            "default": currentRules["backgroundColor"]
        };
        currentRules["backgroundColor"]["isStaticColor"] = "transparent-overlay-1000";
    } else {
        rules += ' -g_-g218';
        currentRules["backgroundColor"] = "accent";
    }
    rules += ' -g_-lOVIhfcg8qxrJ18';
    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
        "default": currentRules["backgroundColor"]
    };
    currentRules["backgroundColor"]["forcedColors"] = "ButtonFace";
    rules += ' -g_-lOVIhfcg8qxrJ18';
    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
        "default": currentRules["backgroundColor"]
    };
    currentRules["backgroundColor"][":is([data-hcm], [data-hcm] *)"] = "ButtonFace";
    if (props.size === "XL") {
        if (props.isIndicatorOnly) {
            rules += ' -F_-Fspvr8c18';
            currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
                "default": currentRules["height"]
            };
            currentRules["height"]["size === \"XL\" && isIndicatorOnly"] = "[0.8571428571428571em]";
        } else {
            rules += ' -F_-Fd60gf18';
            currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
                "default": currentRules["height"]
            };
            currentRules["height"]["size === \"XL\""] = 18;
        }
    } else if (props.size === "L") {
        if (props.isIndicatorOnly) {
            rules += ' -F_-Fspvr8c18';
            currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
                "default": currentRules["height"]
            };
            currentRules["height"]["size === \"L\" && isIndicatorOnly"] = "[0.8571428571428571em]";
        } else {
            rules += ' -F_-FxhYlec18';
            currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
                "default": currentRules["height"]
            };
            currentRules["height"]["size === \"L\""] = 16;
        }
    } else if (props.size === "M") {
        if (props.isIndicatorOnly) {
            rules += ' -F_-F7wvBT18';
            currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
                "default": currentRules["height"]
            };
            currentRules["height"]["size === \"M\" && isIndicatorOnly"] = 8;
        } else {
            rules += ' -F_-FObNfn18';
            currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
                "default": currentRules["height"]
            };
            currentRules["height"]["size === \"M\""] = "1lh";
        }
    } else if (props.size === "S") {
        if (props.isIndicatorOnly) {
            rules += ' -F_-F7wvBT18';
            currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
                "default": currentRules["height"]
            };
            currentRules["height"]["size === \"S\" && isIndicatorOnly"] = 8;
        } else {
            rules += ' -F_-FAMzobb18';
            currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
                "default": currentRules["height"]
            };
            currentRules["height"]["size === \"S\""] = 12;
        }
    }
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/NotificationBadge.native.js:20:14";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/NotificationBadge.native.js:20:14"
        };
    }
    return rules;
};
function $e8fe7a2fd970d55e$export$529cab0ca6be204e(inputProps) {
    let stringFormatter = (0, $jeZsY.useLocalizedStringFormatter)((0, $dBSpv.default), '@react-spectrum/s2');
    let [input, ref] = (0, $1NDEx.useSpectrumContextProps)(inputProps, (0, $3RlMb$untrack)(()=>inputProps.ref), $e8fe7a2fd970d55e$export$9ab75c96ebaa396c);
    let props = input;
    let otherProps = (0, $3RlMb$omit)(props, 'size', 'value', 'isDisabled', 'staticColor');
    let domRef = (0, $eXdQ3.useDOMRef)(ref);
    let locale = (0, $dnlDG.useLocale)();
    let valueInfo = (0, $3RlMb$createMemo)(()=>{
        let value = props.value;
        let formattedValue = '';
        let isIndicatorOnly = false;
        let isSingleDigit = false;
        let isDoubleDigit = false;
        if (value == null) isIndicatorOnly = true;
        else if (value <= 0) throw new Error('Value cannot be negative or zero');
        else if (!Number.isInteger(value)) throw new Error('Value must be a positive integer');
        else {
            formattedValue = new (0, $81zYK.NumberFormatter)(locale.locale).format(Math.min(value, 99));
            let length = Math.log(value <= 99 ? value : 99) * Math.LOG10E + 1 | 0; // for positive integers (https://stackoverflow.com/questions/14879691/get-number-of-digits-with-javascript)
            if (length === 1) isSingleDigit = true;
            else if (length === 2) isDoubleDigit = true;
            if (value > 99) formattedValue = stringFormatter.format('notificationbadge.plus', {
                notifications: formattedValue
            });
        }
        return {
            formattedValue: formattedValue,
            isIndicatorOnly: isIndicatorOnly,
            isSingleDigit: isSingleDigit,
            isDoubleDigit: isDoubleDigit
        };
    });
    let ariaLabel = ()=>props['aria-label'] || (valueInfo().isIndicatorOnly ? stringFormatter.format('notificationbadge.indicatorOnly') : undefined);
    var _el$ = (0, $3RlMb$getNextElement)($e8fe7a2fd970d55e$var$_tmpl$);
    (0, $3RlMb$spread)(_el$, [
        ()=>(0, $5gAIA.filterDOMProps)(otherProps, {
                labelable: true
            }),
        {
            get role () {
                return ariaLabel() ? 'img' : undefined;
            },
            get "aria-label" () {
                return ariaLabel();
            },
            get "class" () {
                return (props.UNSAFE_className || '') + $e8fe7a2fd970d55e$var$badge({
                    size: props.size ?? 'S',
                    isIndicatorOnly: valueInfo().isIndicatorOnly,
                    isSingleDigit: valueInfo().isSingleDigit,
                    isDoubleDigit: valueInfo().isDoubleDigit,
                    isDisabled: props.isDisabled ?? false,
                    isStaticColor: !!props.staticColor
                }, props.styles);
            },
            get style () {
                return props.UNSAFE_style;
            }
        }
    ], true);
    (0, $3RlMb$ref)(()=>(node)=>domRef(node), _el$);
    (0, $3RlMb$insert)(_el$, (0, $3RlMb$scope)(()=>valueInfo().formattedValue));
    (0, $3RlMb$runHydrationEvents)();
    return _el$;
}

});
parcelRegister("2fwg4", function(module, exports) {

$parcel$export(module.exports, "useLocalizedStringFormatter", function () { return (parcelRequire("jeZsY")).useLocalizedStringFormatter; });
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
var $jeZsY = parcelRequire("jeZsY");

});
parcelRegister("jeZsY", function(module, exports) {

$parcel$export(module.exports, "useLocalizedStringFormatter", function () { return $039d673e4449a9dc$export$f12b703ca79dfbb1; });
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
var $1KHpV = parcelRequire("1KHpV");
var $6T0Up = parcelRequire("6T0Up");

var $dnlDG = parcelRequire("dnlDG");

const $039d673e4449a9dc$var$cache = new WeakMap();
function $039d673e4449a9dc$var$getCachedDictionary(strings) {
    let dictionary = $039d673e4449a9dc$var$cache.get(strings);
    if (!dictionary) {
        dictionary = new (0, $1KHpV.LocalizedStringDictionary)(strings);
        $039d673e4449a9dc$var$cache.set(strings, dictionary);
    }
    return dictionary;
}
function $039d673e4449a9dc$export$87b761675e8eaa10(strings, packageName) {
    return packageName && (0, $1KHpV.LocalizedStringDictionary).getGlobalDictionaryForPackage(packageName) || $039d673e4449a9dc$var$getCachedDictionary(strings);
}
function $039d673e4449a9dc$export$f12b703ca79dfbb1(strings, packageName) {
    let locale = (0, $dnlDG.useLocale)();
    let dictionary = $039d673e4449a9dc$export$87b761675e8eaa10(strings, packageName);
    let formatter = (0, $3RlMb$createMemo)(()=>new (0, $6T0Up.LocalizedStringFormatter)(locale.locale, dictionary));
    return {
        format: (key, variables)=>formatter().format(key, variables)
    };
}

});
parcelRegister("1KHpV", function(module, exports) {

$parcel$export(module.exports, "LocalizedStringDictionary", function () { return $146bc4121ea31084$export$c17fa47878dc55b6; });
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
 */ const $146bc4121ea31084$var$localeSymbol = Symbol.for('react-aria.i18n.locale');
const $146bc4121ea31084$var$stringsSymbol = Symbol.for('react-aria.i18n.strings');
let $146bc4121ea31084$var$cachedGlobalStrings = undefined;
class $146bc4121ea31084$export$c17fa47878dc55b6 {
    strings;
    defaultLocale;
    constructor(messages, defaultLocale = 'en-US'){
        // Clone messages so we don't modify the original object.
        // Filter out entries with falsy values which may have been caused by applying optimize-locales-plugin.
        this.strings = Object.fromEntries(Object.entries(messages).filter(([, v])=>v));
        this.defaultLocale = defaultLocale;
    }
    /** Returns a localized string for the given key and locale. */ getStringForLocale(key, locale) {
        let strings = this.getStringsForLocale(locale);
        let string = strings[key];
        if (!string) throw new Error(`Could not find intl message ${key} in ${locale} locale`);
        return string;
    }
    /** Returns all localized strings for the given locale. */ getStringsForLocale(locale) {
        let strings = this.strings[locale];
        if (!strings) {
            strings = $146bc4121ea31084$var$getStringsForLocale(locale, this.strings, this.defaultLocale);
            this.strings[locale] = strings;
        }
        return strings;
    }
    static getGlobalDictionaryForPackage(packageName) {
        if (typeof window === 'undefined') return null;
        let locale = window[$146bc4121ea31084$var$localeSymbol];
        if ($146bc4121ea31084$var$cachedGlobalStrings === undefined) {
            let globalStrings = window[$146bc4121ea31084$var$stringsSymbol];
            if (!globalStrings) return null;
            $146bc4121ea31084$var$cachedGlobalStrings = {};
            for(let pkg in globalStrings)$146bc4121ea31084$var$cachedGlobalStrings[pkg] = new $146bc4121ea31084$export$c17fa47878dc55b6({
                [locale]: globalStrings[pkg]
            }, locale);
        }
        let dictionary = $146bc4121ea31084$var$cachedGlobalStrings?.[packageName];
        if (!dictionary) throw new Error(`Strings for package "${packageName}" were not included by LocalizedStringProvider. Please add it to the list passed to createLocalizedStringDictionary.`);
        return dictionary;
    }
}
function $146bc4121ea31084$var$getStringsForLocale(locale, strings, defaultLocale = 'en-US') {
    // If there is an exact match, use it.
    if (strings[locale]) return strings[locale];
    // Attempt to find the closest match by language.
    // For example, if the locale is fr-CA (French Canadian), but there is only
    // an fr-FR (France) set of strings, use that.
    // This could be replaced with Intl.LocaleMatcher once it is supported.
    // https://github.com/tc39/proposal-intl-localematcher
    let language = $146bc4121ea31084$var$getLanguage(locale);
    // If the locale has an explicit script (e.g. sr-Latn-RS), prefer a
    // language-script match (sr-Latn) over a language-only match (sr), since
    // those may represent entirely different scripts.
    let script = $146bc4121ea31084$var$getScript(locale);
    if (script && strings[`${language}-${script}`]) return strings[`${language}-${script}`];
    if (strings[language]) return strings[language];
    for(let key in strings){
        if (key.startsWith(language + '-')) return strings[key];
    }
    // Nothing close, use english.
    return strings[defaultLocale];
}
function $146bc4121ea31084$var$getLanguage(locale) {
    // @ts-ignore
    if (Intl.Locale) // @ts-ignore
    return new Intl.Locale(locale).language;
    return locale.split('-')[0];
}
function $146bc4121ea31084$var$getScript(locale) {
    // @ts-ignore
    if (Intl.Locale) // @ts-ignore
    return new Intl.Locale(locale).script;
    return undefined;
}

});

parcelRegister("6T0Up", function(module, exports) {

$parcel$export(module.exports, "LocalizedStringFormatter", function () { return $5038959e5c6897bf$export$2f817fcdc4b89ae0; });
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
 */ const $5038959e5c6897bf$var$pluralRulesCache = new Map();
const $5038959e5c6897bf$var$numberFormatCache = new Map();
class $5038959e5c6897bf$export$2f817fcdc4b89ae0 {
    locale;
    strings;
    constructor(locale, strings){
        this.locale = locale;
        this.strings = strings;
    }
    /** Formats a localized string for the given key with the provided variables. */ format(key, variables) {
        let message = this.strings.getStringForLocale(key, this.locale);
        return typeof message === 'function' ? message(variables, this) : message;
    }
    plural(count, options, type = 'cardinal') {
        let opt = options['=' + count];
        if (opt) return typeof opt === 'function' ? opt() : opt;
        let key = this.locale + ':' + type;
        let pluralRules = $5038959e5c6897bf$var$pluralRulesCache.get(key);
        if (!pluralRules) {
            pluralRules = new Intl.PluralRules(this.locale, {
                type: type
            });
            $5038959e5c6897bf$var$pluralRulesCache.set(key, pluralRules);
        }
        let selected = pluralRules.select(count);
        opt = options[selected] || options.other;
        return typeof opt === 'function' ? opt() : opt;
    }
    number(value) {
        let numberFormat = $5038959e5c6897bf$var$numberFormatCache.get(this.locale);
        if (!numberFormat) {
            numberFormat = new Intl.NumberFormat(this.locale);
            $5038959e5c6897bf$var$numberFormatCache.set(this.locale, numberFormat);
        }
        return numberFormat.format(value);
    }
    select(options, value) {
        let opt = options[value] || options.other;
        return typeof opt === 'function' ? opt() : opt;
    }
}

});




parcelRegister("8i1yT", function(module, exports) {

$parcel$export(module.exports, "OverlayTriggerStateContext", function () { return (parcelRequire("6tJ0n")).OverlayTriggerStateContext; });
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
var $6tJ0n = parcelRequire("6tJ0n");


});
parcelRegister("6tJ0n", function(module, exports) {

$parcel$export(module.exports, "OverlayTriggerStateContext", function () { return $4b785c97ebac4686$export$d2f961adcb0afbe; });


var $10x8G = parcelRequire("10x8G");

var $2ZmcB = parcelRequire("2ZmcB");

var $2A4az = parcelRequire("2A4az");
parcelRequire("bAtJj");
var $5gAIA = parcelRequire("5gAIA");

var $3X6A9 = parcelRequire("3X6A9");
parcelRequire("2iotZ");
var $7boJ2 = parcelRequire("7boJ2");

var $fgwSE = parcelRequire("fgwSE");

var $91byJ = parcelRequire("91byJ");


var $6p9dH = parcelRequire("6p9dH");

var $lzOnJ = parcelRequire("lzOnJ");

var $flgph = parcelRequire("flgph");

var $dyxC2 = parcelRequire("dyxC2");

var $7A3TT = parcelRequire("7A3TT");

var $6hSxN = parcelRequire("6hSxN");

var $cRirm = parcelRequire("cRirm");
const $4b785c97ebac4686$export$8b93a07348a7730c = (0, $3RlMb$createContext)(null);
const $4b785c97ebac4686$export$d2f961adcb0afbe = (0, $3RlMb$createContext)(null);
function $4b785c97ebac4686$export$2e1e1122cf0cba88(props) {
    // Use useMenuTriggerState instead of useOverlayTriggerState in case a menu is embedded in the dialog.
    // This is needed to handle submenus.
    let state = (0, $6hSxN.useMenuTriggerState)(props);
    let buttonRef = (0, $6p9dH.useObjectRef)();
    let { triggerProps: baseTriggerProps, overlayProps: baseOverlayProps } = (0, $cRirm.useOverlayTrigger)({
        type: 'dialog'
    }, state, buttonRef);
    // Label dialog by the trigger as a fallback if there is no title slot.
    // This is done in RAC instead of hooks because otherwise we cannot distinguish
    // between context and props. Normally aria-labelledby overrides the title
    // but when sent by context we want the title to win.
    // oxlint-disable-next-line react/react-compiler
    let triggerId = (0, $dyxC2.useId)();
    let triggerProps = (0, $7boJ2.mergeProps)(baseTriggerProps, {
        get id () {
            return triggerId();
        }
    });
    // oxlint-disable-next-line react/react-compiler
    let overlayProps = (0, $7boJ2.mergeProps)(baseOverlayProps, {
        get 'aria-labelledby' () {
            return triggerId();
        }
    });
    // If within a collection (e.g. Tabs), render nothing.
    // Not using createHideableComponent for this because that also creates a forwardRef.
    let isHidden = (0, $7A3TT.useIsHidden)();
    if (isHidden) return null;
    return (0, $3RlMb$createComponent)((0, $2A4az.Provider), {
        values: [
            [
                $4b785c97ebac4686$export$d2f961adcb0afbe,
                state
            ],
            [
                (0, $lzOnJ.RootMenuTriggerStateContext),
                state
            ],
            [
                $4b785c97ebac4686$export$8b93a07348a7730c,
                overlayProps
            ],
            [
                (0, $fgwSE.PopoverContext),
                {
                    trigger: 'DialogTrigger',
                    triggerRef: buttonRef,
                    get id () {
                        return overlayProps.id;
                    },
                    get 'aria-labelledby' () {
                        return overlayProps['aria-labelledby'];
                    }
                }
            ]
        ],
        get children () {
            return (0, $3RlMb$createComponent)((0, $91byJ.PressResponder), (0, $3RlMb$mergeProps)(triggerProps, {
                ref (r$) {
                    var _ref$ = buttonRef;
                    typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $3RlMb$applyRef)(_ref$, r$) : buttonRef = r$;
                },
                get isPressed () {
                    return state.isOpen;
                },
                get children () {
                    return props.children;
                }
            }));
        }
    });
}
function $4b785c97ebac4686$export$3ddf2d174ce01153(originalProps) {
    let originalAriaLabelledby = ()=>originalProps['aria-labelledby'];
    let [props, mergedRef] = (0, $2A4az.useContextProps)(originalProps, originalProps.ref, $4b785c97ebac4686$export$8b93a07348a7730c);
    let ref = (0, $6p9dH.useObjectRef)(mergedRef);
    let { dialogProps: dialogProps, titleProps: titleProps, contentProps: contentProps } = (0, $10x8G.useDialog)((0, $7boJ2.mergeProps)(props, {
        // Only pass aria-labelledby from props, not context.
        // Context is used as a fallback below.
        get 'aria-labelledby' () {
            return originalAriaLabelledby();
        }
    }), ref);
    let state = (0, $3RlMb$useContext)($4b785c97ebac4686$export$d2f961adcb0afbe);
    let resolvedDialogProps = (0, $7boJ2.mergeProps)(dialogProps, {
        get 'aria-labelledby' () {
            return !dialogProps['aria-label'] && !dialogProps['aria-labelledby'] ? props['aria-labelledby'] : dialogProps['aria-labelledby'];
        }
    });
    (0, $3RlMb$createEffect)(()=>({
            label: dialogProps['aria-label'],
            labelledby: dialogProps['aria-labelledby'],
            fallback: props['aria-labelledby']
        }), ({ label: label, labelledby: labelledby, fallback: fallback })=>{
        if (!label && !labelledby) // If aria-labelledby exists on props, we know it came from context.
        // Use that as a fallback in case there is no title slot.
        fallback;
    });
    let renderProps = (0, $2A4az.useRenderProps)({
        defaultClassName: 'react-aria-Dialog',
        get className () {
            return props.className;
        },
        get style () {
            return props.style;
        },
        get children () {
            return props.children;
        },
        values: {
            close: state?.close || (()=>{})
        }
    });
    let DOMProps = (0, $5gAIA.filterDOMProps)(props, {
        global: true
    });
    return (0, $3RlMb$createComponent)((0, $2A4az.dom).section, (0, $3RlMb$mergeProps)(()=>(0, $7boJ2.mergeProps)(DOMProps, renderProps, resolvedDialogProps), {
        get render () {
            return props.render;
        },
        ref (r$) {
            var _ref$2 = ref;
            typeof _ref$2 === "function" || Array.isArray(_ref$2) ? (0, $3RlMb$applyRef)(_ref$2, r$) : ref = r$;
        },
        get slot () {
            return props.slot || undefined;
        },
        get children () {
            return (0, $3RlMb$createComponent)((0, $2A4az.Provider), {
                get values () {
                    return [
                        [
                            (0, $3X6A9.HeadingContext),
                            {
                                slots: {
                                    [(0, $2A4az.DEFAULT_SLOT)]: {},
                                    // The frozen hook's title/content bags contain only live IDs.
                                    title: (0, $7boJ2.mergeProps)(titleProps, {
                                        level: 2
                                    })
                                }
                            }
                        ],
                        [
                            (0, $flgph.TextContext),
                            {
                                slots: {
                                    [(0, $2A4az.DEFAULT_SLOT)]: {},
                                    description: contentProps
                                }
                            }
                        ],
                        [
                            (0, $2ZmcB.ButtonContext),
                            {
                                slots: {
                                    [(0, $2A4az.DEFAULT_SLOT)]: {},
                                    close: {
                                        onPress: ()=>state?.close()
                                    }
                                }
                            }
                        ]
                    ];
                },
                get children () {
                    return renderProps.children;
                }
            });
        }
    }));
}

});
parcelRegister("10x8G", function(module, exports) {

$parcel$export(module.exports, "useDialog", function () { return $0bbf7f3d9b198d24$export$d55e7ee900f34e93; });
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

var $8XaA3 = parcelRequire("8XaA3");

var $ed1Px = parcelRequire("ed1Px");


var $gJ1hM = parcelRequire("gJ1hM");

var $dyxC2 = parcelRequire("dyxC2");
function $0bbf7f3d9b198d24$export$d55e7ee900f34e93(props, ref) {
    let role = ()=>props.role ?? 'dialog';
    let generatedTitleId = (0, $dyxC2.useSlotId)();
    let titleId = ()=>props['aria-label'] ? undefined : generatedTitleId();
    let generatedContentId = (0, $dyxC2.useSlotId)();
    let contentId = ()=>role() === 'alertdialog' && !props['aria-describedby'] ? generatedContentId() : undefined;
    let isRefocusing = false;
    // Focus the dialog itself on mount (or once it has entered), unless a child element is already focused.
    (0, $3RlMb$createEffect)(()=>({
            isEntering: props.isEntering,
            element: ref.current
        }), ({ isEntering: isEntering, element: element })=>{
        if (!isEntering && element && !(0, $ed1Px.isFocusWithin)(element)) {
            (0, $8XaA3.focusSafely)(element);
            // Safari on iOS does not move the VoiceOver cursor to the dialog
            // or announce that it has opened until it has rendered. A workaround
            // is to wait for half a second, then blur and re-focus the dialog.
            let timeout = setTimeout(()=>{
                // Check that the dialog is still focused, or focused was lost to the body.
                if ((0, $ed1Px.getActiveElement)() === element || (0, $ed1Px.getActiveElement)() === document.body) {
                    isRefocusing = true;
                    element.blur();
                    (0, $8XaA3.focusSafely)(element);
                    isRefocusing = false;
                }
            }, 500);
            return ()=>{
                clearTimeout(timeout);
            };
        }
    });
    (0, $gJ1hM.useOverlayFocusContain)();
    // Warn in dev mode if the dialog has no accessible title.
    // This catches a common mistake where useDialog and useOverlayTriggerState
    // are used in the same component, causing the title element to not be
    // in the DOM when useSlotId queries for it.
    // Check the DOM element directly since aria-labelledby may be added by
    // wrapper components (e.g. RAC Dialog uses trigger ID as a fallback).
    let hasWarned = false;
    let checkTitle = (el)=>{};
    (0, $3RlMb$onSettled)(()=>checkTitle((0, $3RlMb$untrack)(()=>ref.current)));
    (0, $3RlMb$createEffect)(()=>{
        props['aria-label'];
        props['aria-labelledby'];
        titleId();
        return ref.current;
    }, checkTitle);
    // We do not use aria-modal due to a Safari bug which forces the first focusable element to be focused
    // on mount when inside an iframe, no matter which element we programmatically focus.
    // See https://bugs.webkit.org/show_bug.cgi?id=211934.
    // useModal sets aria-hidden on all elements outside the dialog, so the dialog will behave as a modal
    // even without aria-modal on the dialog itself.
    return {
        dialogProps: (0, $3RlMb$merge)((0, $5gAIA.filterDOMProps)(props, {
            labelable: true
        }), {
            get role () {
                return role();
            },
            tabIndex: -1,
            get 'aria-labelledby' () {
                return props['aria-labelledby'] ?? titleId();
            },
            get 'aria-describedby' () {
                return props['aria-describedby'] ?? contentId();
            },
            // Prevent blur events from reaching useOverlay, which may cause
            // popovers to close. Since focus is contained within the dialog,
            // we don't want this to occur due to the above useEffect.
            onFocusOut: (e)=>{
                if (isRefocusing) e.stopPropagation();
            }
        }),
        titleProps: {
            get id () {
                return titleId();
            }
        },
        contentProps: {
            get id () {
                return contentId();
            }
        }
    };
}

});
parcelRegister("gJ1hM", function(module, exports) {

$parcel$export(module.exports, "useOverlayFocusContain", function () { return $c2d1d8a1cb445735$export$14c98a7594375490; });


var $91byJ = parcelRequire("91byJ");
parcelRequire("kKI9C");
var $cpleU = parcelRequire("cpleU");

var $eoq2Z = parcelRequire("eoq2Z");


var $aPfEU = parcelRequire("aPfEU");

var $6SohG = parcelRequire("6SohG");
const $c2d1d8a1cb445735$export$a2200b96afd16271 = (0, $3RlMb$createContext)(null);
function $c2d1d8a1cb445735$export$c6fdb837b070b4ff(props) {
    let isSSR = (0, $aPfEU.useIsSSR)();
    let [contain, setContain] = (0, $3RlMb$createSignal)(false);
    let contextValue = {
        get contain () {
            return contain();
        },
        setContain: setContain
    };
    let portalContext = (0, $6SohG.useUNSAFE_PortalContext)();
    let portalContainer = ()=>{
        if (!props.portalContainer && portalContext.getContainer) return portalContext.getContainer();
        return props.portalContainer === undefined ? isSSR() ? null : document.body : props.portalContainer;
    };
    return ()=>{
        let mount = portalContainer();
        return mount ? (0, $3RlMb$createComponent)((0, $3RlMb$Portal), {
            mount: mount,
            get children () {
                return (0, $3RlMb$createComponent)($c2d1d8a1cb445735$export$a2200b96afd16271, {
                    value: contextValue,
                    get children () {
                        return (0, $3RlMb$createComponent)((0, $91byJ.ClearPressResponder), {
                            get children () {
                                return (0, $3RlMb$createComponent)((0, $cpleU.FocusableContext), {
                                    value: null,
                                    get children () {
                                        return ()=>props.disableFocusManagement ? props.children : (0, $3RlMb$createComponent)((0, $eoq2Z.FocusScope), {
                                                restoreFocus: true,
                                                get contain () {
                                                    return (0, $3RlMb$memo)(()=>!!(props.shouldContainFocus || contain()))() ? !props.isExiting : props.shouldContainFocus || contain();
                                                },
                                                get children () {
                                                    return props.children;
                                                }
                                            });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }) : null;
    };
}
function $c2d1d8a1cb445735$export$14c98a7594375490() {
    let ctx = (0, $3RlMb$useContext)($c2d1d8a1cb445735$export$a2200b96afd16271);
    let setContain = ctx?.setContain;
    (0, $3RlMb$onSettled)(()=>{
        setContain?.(true);
    });
}

});
parcelRegister("91byJ", function(module, exports) {

$parcel$export(module.exports, "PressResponder", function () { return $690d2c753070cb8e$export$3351871ee4b288b8; });
$parcel$export(module.exports, "ClearPressResponder", function () { return $690d2c753070cb8e$export$cf75428e0b9ed1ea; });


var $7boJ2 = parcelRequire("7boJ2");

var $fpC5Z = parcelRequire("fpC5Z");


var $6p9dH = parcelRequire("6p9dH");

var $khPAm = parcelRequire("khPAm");
function $690d2c753070cb8e$export$3351871ee4b288b8(props) {
    let isRegistered = false;
    let prevContext = (0, $3RlMb$useContext)((0, $fpC5Z.PressResponderContext));
    // oxlint-disable-next-line react/react-compiler
    let context = (0, $7boJ2.mergeProps)((0, $3RlMb$omit)(prevContext, 'ref'), (0, $3RlMb$omit)(props, 'children', 'ref'), {
        register () {
            isRegistered = true;
            if (prevContext) prevContext.register();
        },
        // The attachment handle is established once, just like other native ref
        // bridges. S6's live prop bag may derive this stable handle reactively.
        ref: (0, $6p9dH.useObjectRef)((0, $3RlMb$untrack)(()=>props.ref || prevContext?.ref))
    });
    (0, $khPAm.useSyncRef)(prevContext, context.ref);
    (0, $3RlMb$onSettled)(()=>{
        if (!isRegistered) isRegistered = true;
    });
    return (0, $3RlMb$createComponent)((0, $fpC5Z.PressResponderContext), {
        value: context,
        get children () {
            return props.children;
        }
    });
}
function $690d2c753070cb8e$export$cf75428e0b9ed1ea(props) {
    let context = {
        register: ()=>{}
    };
    return (0, $3RlMb$createComponent)((0, $fpC5Z.PressResponderContext), {
        value: context,
        get children () {
            return props.children;
        }
    });
}

});

parcelRegister("6SohG", function(module, exports) {

$parcel$export(module.exports, "useUNSAFE_PortalContext", function () { return $501a9f8f61398eac$export$9fc1347d4195ccb3; });


const $501a9f8f61398eac$export$60d741e20e0aa309 = (0, $3RlMb$createContext)({});
function $501a9f8f61398eac$export$78efe591171d7d45(props) {
    let parent = $501a9f8f61398eac$export$9fc1347d4195ccb3();
    let value = {
        get getContainer () {
            return props.getContainer === null ? undefined : props.getContainer ?? parent.getContainer;
        }
    };
    return (0, $3RlMb$createComponent)($501a9f8f61398eac$export$60d741e20e0aa309, {
        value: value,
        get children () {
            return props.children;
        }
    });
}
function $501a9f8f61398eac$export$9fc1347d4195ccb3() {
    return (0, $3RlMb$useContext)($501a9f8f61398eac$export$60d741e20e0aa309) ?? {};
}

});



parcelRegister("3X6A9", function(module, exports) {

$parcel$export(module.exports, "HeadingContext", function () { return $2e0bfcdf24fbc8e2$export$d688439359537581; });
$parcel$export(module.exports, "Heading", function () { return $2e0bfcdf24fbc8e2$export$a8a3e93435678ff9; });


var $2A4az = parcelRequire("2A4az");

const $2e0bfcdf24fbc8e2$export$d688439359537581 = (0, $3RlMb$createContext)({});
function $2e0bfcdf24fbc8e2$export$a8a3e93435678ff9(inputProps) {
    let [props, ref] = (0, $2A4az.useContextProps)(inputProps, inputProps.ref, $2e0bfcdf24fbc8e2$export$d688439359537581);
    let domProps = (0, $3RlMb$omit)(props, 'children', 'level', 'className', 'ref');
    let Element = (0, $3RlMb$dynamic)(()=>(0, $2A4az.dom)[`h${props.level === undefined ? 3 : props.level}`]);
    return (0, $3RlMb$createComponent)(Element, (0, $3RlMb$mergeProps)(domProps, {
        ref (r$) {
            var _ref$ = ref;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $3RlMb$applyRef)(_ref$, r$) : ref = r$;
        },
        get slot () {
            return props.slot ?? undefined;
        },
        get className () {
            return props.className ?? 'react-aria-Heading';
        },
        get children () {
            return props.children;
        }
    }));
}

});

parcelRegister("fgwSE", function(module, exports) {

$parcel$export(module.exports, "PopoverContext", function () { return $b1d1db09573a75c4$export$9b9a0cd73afb7ca4; });
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
const $b1d1db09573a75c4$export$9b9a0cd73afb7ca4 = (0, $3RlMb$createContext)(null);

});

parcelRegister("lzOnJ", function(module, exports) {

$parcel$export(module.exports, "RootMenuTriggerStateContext", function () { return $fb53f2a633646db4$export$795aec4671cbae19; });
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
const $fb53f2a633646db4$export$795aec4671cbae19 = (0, $3RlMb$createContext)(null);

});

parcelRegister("flgph", function(module, exports) {

$parcel$export(module.exports, "TextContext", function () { return $b2b58b3270d1fb61$export$9afb8bc826b033ea; });
$parcel$export(module.exports, "Text", function () { return $b2b58b3270d1fb61$export$5f1af8db9871e1d6; });


var $2A4az = parcelRequire("2A4az");

var $7A3TT = parcelRequire("7A3TT");

const $b2b58b3270d1fb61$export$9afb8bc826b033ea = (0, $3RlMb$createContext)({});
const $b2b58b3270d1fb61$export$5f1af8db9871e1d6 = /*#__PURE__*/ (0, $7A3TT.createHideableComponent)(function Text(props, ref) {
    [props, ref] = (0, $2A4az.useContextProps)(props, ref, $b2b58b3270d1fb61$export$9afb8bc826b033ea);
    let domProps = (0, $3RlMb$omit)(props, 'elementType');
    let ElementType = (0, $2A4az.dom)[props.elementType ?? 'span'];
    // @ts-ignore
    return (0, $3RlMb$createComponent)(ElementType, (0, $3RlMb$mergeProps)({
        className: "react-aria-Text"
    }, domProps, {
        ref (r$) {
            var _ref$ = ref;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $3RlMb$applyRef)(_ref$, r$) : ref = r$;
        }
    }));
});

});

parcelRegister("6hSxN", function(module, exports) {

$parcel$export(module.exports, "useMenuTriggerState", function () { return $493ea3f0089bdc64$export$79fefeb1c2091ac3; });
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

function $493ea3f0089bdc64$export$79fefeb1c2091ac3(props) {
    let overlayTriggerState = (0, $ckc8K.useOverlayTriggerState)(props);
    let [focusStrategy, setFocusStrategy] = (0, $3RlMb$createSignal)(null);
    let pendingExpandedKeysStack = [];
    let [expandedKeysStack, publishExpandedKeysStack] = (0, $3RlMb$createSignal)(pendingExpandedKeysStack);
    // Submenu commands consume the accepted predecessor even before native
    // staged writes commit, including a preceding close of the root menu.
    let setExpandedKeysStack = (update)=>{
        let next = typeof update === 'function' ? update(pendingExpandedKeysStack) : update;
        pendingExpandedKeysStack = next;
        publishExpandedKeysStack(next);
    };
    let closeAll = ()=>{
        setExpandedKeysStack([]);
        overlayTriggerState.close();
    };
    let openSubmenu = (triggerKey, level)=>{
        setExpandedKeysStack((oldStack)=>{
            if (level > oldStack.length) return oldStack;
            return [
                ...oldStack.slice(0, level),
                triggerKey
            ];
        });
    };
    let closeSubmenu = (triggerKey, level)=>{
        setExpandedKeysStack((oldStack)=>{
            let key = oldStack[level];
            if (key === triggerKey) return oldStack.slice(0, level);
            else return oldStack;
        });
    };
    return {
        get focusStrategy () {
            return focusStrategy();
        },
        get isOpen () {
            return overlayTriggerState.isOpen;
        },
        setOpen: overlayTriggerState.setOpen,
        get point () {
            return overlayTriggerState.point;
        },
        setPoint: overlayTriggerState.setPoint,
        open (focusStrategy = null) {
            setFocusStrategy(focusStrategy);
            overlayTriggerState.open();
        },
        toggle (focusStrategy = null) {
            setFocusStrategy(focusStrategy);
            overlayTriggerState.toggle();
        },
        close () {
            closeAll();
        },
        get expandedKeysStack () {
            return expandedKeysStack();
        },
        openSubmenu: openSubmenu,
        closeSubmenu: closeSubmenu
    };
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
    let [isOpen, setOpen] = (0, $3Ic1F.useControlledState)(()=>props.isOpen, (0, $3RlMb$untrack)(()=>props.defaultOpen || false), (value)=>props.onOpenChange?.(value));
    let [point, setPoint] = (0, $3RlMb$createSignal)(null);
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
    let initialValue = (0, $3RlMb$untrack)(externalValue);
    let [stateValue, setStateValue] = (0, $3RlMb$createSignal)(initialValue || defaultValue);
    let currentValue = ()=>{
        let value = externalValue();
        return value !== undefined ? value : stateValue();
    };
    let valueRef = (0, $3RlMb$untrack)(currentValue);
    let wasControlled = initialValue !== undefined;
    (0, $3RlMb$createEffect)(()=>externalValue() !== undefined, (isControlled)=>{
        wasControlled = isControlled;
    });
    // Reset proposals when an external value or a local request commits.
    let [revision, setRevision] = (0, $3RlMb$createSignal)(0);
    (0, $3RlMb$createRenderEffect)(()=>{
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
                valueRef = (0, $3RlMb$untrack)(currentValue);
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



parcelRegister("cRirm", function(module, exports) {

$parcel$export(module.exports, "useOverlayTrigger", function () { return $95c8bd274522c876$export$f9d5c8beee7d008d; });
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
var $cxzEt = parcelRequire("cxzEt");


var $dyxC2 = parcelRequire("dyxC2");
function $95c8bd274522c876$export$f9d5c8beee7d008d(props, state, ref) {
    // Backward compatibility. Share state close function with useOverlayPosition so it can close on scroll
    // without forcing users to pass onClose.
    (0, $3RlMb$createEffect)(()=>ref?.current, (element)=>{
        if (element) {
            (0, $cxzEt.onCloseMap).set(element, state.close);
            return ()=>{
                if ((0, $cxzEt.onCloseMap).get(element) === state.close) (0, $cxzEt.onCloseMap).delete(element);
            };
        }
    });
    // Aria 1.1 supports multiple values for aria-haspopup other than just menus.
    // https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup
    // However, we only add it for menus for now because screen readers often
    // announce it as a menu even for other values.
    let ariaHasPopup = ()=>props.type === 'menu' ? true : props.type === 'listbox' ? 'listbox' : undefined;
    let overlayId = (0, $dyxC2.useId)();
    return {
        triggerProps: {
            get 'aria-haspopup' () {
                return ariaHasPopup();
            },
            get 'aria-expanded' () {
                return state.isOpen;
            },
            get 'aria-controls' () {
                return state.isOpen ? overlayId() : undefined;
            },
            onPress: state.toggle
        },
        overlayProps: {
            get id () {
                return overlayId();
            }
        }
    };
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
    (0, $3RlMb$createEffect)(()=>({
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




parcelRegister("5seyF", function(module, exports) {

$parcel$export(module.exports, "pressScale", function () { return $3f8adc37874f1004$export$56e8cba416805d8d; });
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
 */ parcelRequire("7rCr3");
var $2A4az = parcelRequire("2A4az");
function $3f8adc37874f1004$export$56e8cba416805d8d(ref, style) {
    return (0, $2A4az.composeRenderProps)(style, (style, renderProps)=>{
        if (renderProps.isPressed && ref.current) {
            let { width: width = 0, height: height = 0 } = ref.current.getBoundingClientRect() ?? {};
            return {
                ...style,
                'will-change': `${style?.['will-change'] ?? ''} transform`,
                transform: `${style?.transform ?? ''} perspective(${Math.max(height, width / 3, 24)}px) translate3d(0, 0, -2px)`
            };
        } else return {
            ...style,
            'will-change': `${style?.['will-change'] ?? ''} transform`
        };
    });
}

});
parcelRegister("7rCr3", function(module, exports) {

$parcel$export(module.exports, "composeRenderProps", function () { return (parcelRequire("2A4az")).composeRenderProps; });

var $2A4az = parcelRequire("2A4az");

});


parcelRegister("gPqiz", function(module, exports) {

$parcel$export(module.exports, "ProgressCircleContext", function () { return $c405cf1fa9bf4fd5$export$afffa1e5edf12209; });
$parcel$export(module.exports, "ProgressCircle", function () { return $c405cf1fa9bf4fd5$export$c79b9d6b4cc92af7; });


parcelRequire("8HZqa");
var $broa7 = parcelRequire("broa7");

var $eXdQ3 = parcelRequire("eXdQ3");

var $1NDEx = parcelRequire("1NDEx");
var $c405cf1fa9bf4fd5$var$_tmpl$ = /*#__PURE__*/ (0, $3RlMb$template)(`<svg fill=none width=100% height=100% style=display:block><circle cx=50% cy=50%></circle><circle cx=50% cy=50%></circle><circle cx=50% cy=50% pathLength=100 stroke-dasharray="100 200"stroke-linecap=round>`);
const $c405cf1fa9bf4fd5$var$pxToRemDynamic = (px)=>px / 16 + 'rem';
const $c405cf1fa9bf4fd5$export$afffa1e5edf12209 = (0, $3RlMb$createContext)(null);
// Double check the types passed to each style, may not need all for each
const $c405cf1fa9bf4fd5$var$wrapper = function anonymous(props, overrides) {
    let rules = " ", currentRules = {};
    let width = false;
    let height = false;
    let matches = String(overrides || '').matchAll(/(?:^|\s)(J|G|I|H|_u|_v|_s|__A|_d|_J|z|y|B|A|_P|_9|W|_l|_A|_z|_6|Z|N|L|F|M|K|-macro\$)[^\s]+/g);
    for (let p of matches){
        if (p[1] === "Z") width = true;
        if (p[1] === "F") height = true;
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
    if (props.size === "L") {
        if (!width) rules += ' Z86Xkgc18';
        currentRules["width"] = typeof currentRules["width"] === 'object' ? currentRules["width"] : {
            "default": currentRules["width"]
        };
        currentRules["width"]["size === \"L\""] = 64;
    } else if (props.size === "S") {
        if (!width) rules += ' ZxhYlec18';
        currentRules["width"] = typeof currentRules["width"] === 'object' ? currentRules["width"] : {
            "default": currentRules["width"]
        };
        currentRules["width"]["size === \"S\""] = 16;
    } else {
        if (!width) rules += ' Z4dY0ec18';
        currentRules["width"] = 32;
    }
    if (props.size === "L") {
        if (!height) rules += ' F86Xkgc18';
        currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
            "default": currentRules["height"]
        };
        currentRules["height"]["size === \"L\""] = 64;
    } else if (props.size === "S") {
        if (!height) rules += ' FxhYlec18';
        currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
            "default": currentRules["height"]
        };
        currentRules["height"]["size === \"S\""] = 16;
    } else {
        if (!height) rules += ' F4dY0ec18';
        currentRules["height"] = 32;
    }
    rules += ' fa18';
    currentRules["aspectRatio"] = "square";
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ProgressCircle.native.js:23:16";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ProgressCircle.native.js:23:16"
        };
    }
    return rules;
};
const $c405cf1fa9bf4fd5$var$track = function anonymous(props) {
    let rules = " ", currentRules = {};
    if (props.isStaticColor) {
        rules += ' Vd18';
        currentRules["stroke"] = typeof currentRules["stroke"] === 'object' ? currentRules["stroke"] : {
            "default": currentRules["stroke"]
        };
        currentRules["stroke"]["isStaticColor"] = "transparent-overlay-300";
    } else {
        rules += ' Vf18';
        currentRules["stroke"] = "gray-300";
    }
    rules += ' VlOVIhfcceMNLe18';
    currentRules["stroke"] = typeof currentRules["stroke"] === 'object' ? currentRules["stroke"] : {
        "default": currentRules["stroke"]
    };
    currentRules["stroke"]["forcedColors"] = "Background";
    rules += ' VlOVIhfcceMNLe18';
    currentRules["stroke"] = typeof currentRules["stroke"] === 'object' ? currentRules["stroke"] : {
        "default": currentRules["stroke"]
    };
    currentRules["stroke"][":is([data-hcm], [data-hcm] *)"] = "Background";
    if (props.size === "L") {
        rules += ' _VuNalie18';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"]["size === \"L\""] = "[0.25rem]";
    } else if (props.size === "S") {
        rules += ' _V7m7Gv18';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"]["size === \"S\""] = "[0.125rem]";
    } else {
        rules += ' _Vwtfhvc18';
        currentRules["strokeWidth"] = "[0.1875rem]";
    }
    if (props.size === "L") {
        rules += ' _VlOVIhfcwtfhvc18';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"]["forcedColors && size === \"L\""] = "[0.1875rem]";
    } else if (props.size === "S") {
        rules += ' _VlOVIhfcai5a018';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"]["forcedColors && size === \"S\""] = "[0.0625rem]";
    } else {
        rules += ' _VlOVIhfc7m7Gv18';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"]["forcedColors"] = "[0.125rem]";
    }
    if (props.size === "L") {
        rules += ' _VlOVIhfcwtfhvc18';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"]["size === \"L\" && :is([data-hcm], [data-hcm] *)"] = "[0.1875rem]";
    } else if (props.size === "S") {
        rules += ' _VlOVIhfcai5a018';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"]["size === \"S\" && :is([data-hcm], [data-hcm] *)"] = "[0.0625rem]";
    } else {
        rules += ' _VlOVIhfc7m7Gv18';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"][":is([data-hcm], [data-hcm] *)"] = "[0.125rem]";
    }
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ProgressCircle.native.js:36:14";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ProgressCircle.native.js:36:14"
        };
    }
    return rules;
};
const $c405cf1fa9bf4fd5$var$fill = function anonymous(props) {
    let rules = " ", currentRules = {};
    if (props.isStaticColor) {
        rules += ' Ve18';
        currentRules["stroke"] = typeof currentRules["stroke"] === 'object' ? currentRules["stroke"] : {
            "default": currentRules["stroke"]
        };
        currentRules["stroke"]["isStaticColor"] = "transparent-overlay-900";
    } else {
        rules += ' Vh18';
        currentRules["stroke"] = "blue-900";
    }
    rules += ' VlOVIhfc6LxY918';
    currentRules["stroke"] = typeof currentRules["stroke"] === 'object' ? currentRules["stroke"] : {
        "default": currentRules["stroke"]
    };
    currentRules["stroke"]["forcedColors"] = "ButtonText";
    rules += ' VlOVIhfc6LxY918';
    currentRules["stroke"] = typeof currentRules["stroke"] === 'object' ? currentRules["stroke"] : {
        "default": currentRules["stroke"]
    };
    currentRules["stroke"][":is([data-hcm], [data-hcm] *)"] = "ButtonText";
    rules += ' _Sa18';
    currentRules["rotate"] = -90;
    rules += ' _0d18';
    currentRules["transformOrigin"] = "center";
    if (props.size === "L") {
        rules += ' _VuNalie18';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"]["size === \"L\""] = "[0.25rem]";
    } else if (props.size === "S") {
        rules += ' _V7m7Gv18';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"]["size === \"S\""] = "[0.125rem]";
    } else {
        rules += ' _Vwtfhvc18';
        currentRules["strokeWidth"] = "[0.1875rem]";
    }
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ProgressCircle.native.js:57:13";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ProgressCircle.native.js:57:13"
        };
    }
    return rules;
};
const $c405cf1fa9bf4fd5$var$hcmStroke = function anonymous(props) {
    let rules = " ", currentRules = {};
    rules += ' VRWHrbc18';
    currentRules["stroke"] = "transparent";
    rules += ' VlOVIhfc6LxY918';
    currentRules["stroke"] = typeof currentRules["stroke"] === 'object' ? currentRules["stroke"] : {
        "default": currentRules["stroke"]
    };
    currentRules["stroke"]["forcedColors"] = "ButtonText";
    rules += ' VlOVIhfc6LxY918';
    currentRules["stroke"] = typeof currentRules["stroke"] === 'object' ? currentRules["stroke"] : {
        "default": currentRules["stroke"]
    };
    currentRules["stroke"][":is([data-hcm], [data-hcm] *)"] = "ButtonText";
    if (props.size === "L") {
        rules += ' _VuNalie18';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"]["size === \"L\""] = "[0.25rem]";
    } else if (props.size === "S") {
        rules += ' _V7m7Gv18';
        currentRules["strokeWidth"] = typeof currentRules["strokeWidth"] === 'object' ? currentRules["strokeWidth"] : {
            "default": currentRules["strokeWidth"]
        };
        currentRules["strokeWidth"]["size === \"S\""] = "[0.125rem]";
    } else {
        rules += ' _Vwtfhvc18';
        currentRules["strokeWidth"] = "[0.1875rem]";
    }
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ProgressCircle.native.js:73:18";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/ProgressCircle.native.js:73:18"
        };
    }
    return rules;
};
const $c405cf1fa9bf4fd5$var$rotationAnimation = "Z8Un9b";
// stroke-dashoffset represents `100 - percentage`. See below for how this works.
const $c405cf1fa9bf4fd5$var$dashoffsetAnimation = "uw9JJd";
function $c405cf1fa9bf4fd5$export$c79b9d6b4cc92af7(props) {
    let { ref: forwardedRef } = props;
    // oxlint-disable-next-line react/react-compiler
    let [contextProps, ref] = (0, $3RlMb$untrack)(()=>(0, $1NDEx.useSpectrumContextProps)(props, forwardedRef, $c405cf1fa9bf4fd5$export$afffa1e5edf12209));
    props = contextProps;
    let size = ()=>props.size ?? 'M';
    let domRef = (0, $eXdQ3.useDOMRef)(ref);
    let strokeWidth = ()=>size() === 'S' ? 2 : size() === 'L' ? 4 : 3;
    // SVG strokes are centered, so subtract half the stroke width from the radius to create an inner stroke.
    let radius = ()=>`calc(50% - ${$c405cf1fa9bf4fd5$var$pxToRemDynamic(strokeWidth() / 2)})`;
    let isStaticColor = ()=>!!props.staticColor;
    return (0, $3RlMb$createComponent)((0, $broa7.ProgressBar), (0, $3RlMb$mergeProps)(props, {
        ref (r$) {
            var _ref$ = domRef;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $3RlMb$applyRef)(_ref$, r$) : domRef = r$;
        },
        get style () {
            return props.UNSAFE_style;
        },
        className: (renderProps)=>(props.UNSAFE_className ?? '') + $c405cf1fa9bf4fd5$var$wrapper({
                ...renderProps,
                size: size(),
                staticColor: props.staticColor
            }, props.styles),
        children: (renderProps)=>(()=>{
                var _el$ = (0, $3RlMb$getNextElement)($c405cf1fa9bf4fd5$var$_tmpl$), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.nextSibling;
                (0, $3RlMb$effect)(()=>({
                        e: radius(),
                        t: (0, $3RlMb$readShallow)($c405cf1fa9bf4fd5$var$hcmStroke({
                            size: size()
                        })),
                        a: radius(),
                        o: (0, $3RlMb$readShallow)($c405cf1fa9bf4fd5$var$track({
                            isStaticColor: isStaticColor(),
                            size: size()
                        })),
                        i: radius(),
                        n: (0, $3RlMb$readShallow)($c405cf1fa9bf4fd5$var$fill({
                            isStaticColor: isStaticColor(),
                            size: size()
                        })),
                        s: renderProps.isIndeterminate ? `${$c405cf1fa9bf4fd5$var$rotationAnimation} 1s cubic-bezier(.6, .1, .3, .9) infinite, ${$c405cf1fa9bf4fd5$var$dashoffsetAnimation} 1s cubic-bezier(.25, .1, .25, 1.3) infinite` : undefined,
                        h: renderProps.isIndeterminate || renderProps.percentage == null ? undefined : 100 - renderProps.percentage
                    }), ({ e: e, t: t, a: a, o: o, i: i, n: n, s: s, h: h }, _p$)=>{
                    e !== _p$?.e && (0, $3RlMb$setAttribute)(_el$2, "r", e);
                    (0, $3RlMb$className)(_el$2, t, _p$?.t);
                    a !== _p$?.a && (0, $3RlMb$setAttribute)(_el$3, "r", a);
                    (0, $3RlMb$className)(_el$3, o, _p$?.o);
                    i !== _p$?.i && (0, $3RlMb$setAttribute)(_el$4, "r", i);
                    (0, $3RlMb$className)(_el$4, n, _p$?.n);
                    s !== _p$?.s && (0, $3RlMb$setStyleProperty)(_el$4, "animation", s);
                    h !== _p$?.h && (0, $3RlMb$setAttribute)(_el$4, "stroke-dashoffset", h);
                });
                return _el$;
            })()
    }));
}

});
parcelRegister("8HZqa", function(module, exports) {

$parcel$export(module.exports, "ProgressBar", function () { return (parcelRequire("broa7")).ProgressBar; });
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
var $broa7 = parcelRequire("broa7");


});


parcelRegister("4fCJc", function(module, exports) {

$parcel$export(module.exports, "TextContext", function () { return $31869ab78a06e8ab$export$9afb8bc826b033ea; });
$parcel$export(module.exports, "Text", function () { return $31869ab78a06e8ab$export$5f1af8db9871e1d6; });



var $f8FiF = parcelRequire("f8FiF");
parcelRequire("hnLCe");
var $aykd0 = parcelRequire("aykd0");
parcelRequire("lJpJI");
var $k1Tpf = parcelRequire("k1Tpf");

var $3X6A9 = parcelRequire("3X6A9");
parcelRequire("bcyTS");
var $flgph = parcelRequire("flgph");

var $eXdQ3 = parcelRequire("eXdQ3");

var $esT6z = parcelRequire("esT6z");

var $1NDEx = parcelRequire("1NDEx");
var $31869ab78a06e8ab$var$_tmpl$ = /*#__PURE__*/ (0, $3RlMb$template)(`<div>`), $31869ab78a06e8ab$var$_tmpl$2 = /*#__PURE__*/ (0, $3RlMb$template)(`<footer>`);
const $31869ab78a06e8ab$export$d688439359537581 = (0, $3RlMb$createContext)(null);
const $31869ab78a06e8ab$export$a8a3e93435678ff9 = // Wrapper around RAC Heading to unmount when hidden.
function Heading(props) {
    let ref = props.ref;
    [props, ref] = (0, $3RlMb$untrack)(()=>(0, $1NDEx.useSpectrumContextProps)(props, ref, $31869ab78a06e8ab$export$d688439359537581));
    let domRef = (0, $eXdQ3.useDOMRef)(ref);
    let otherProps = (0, $3RlMb$omit)(props, 'UNSAFE_className', 'UNSAFE_style', 'styles', 'isHidden', 'slot', 'ref');
    return (0, $3RlMb$memo)(()=>(0, $3RlMb$memo)(()=>!props.isHidden)() && (0, $3RlMb$createComponent)((0, $3X6A9.Heading), (0, $3RlMb$mergeProps)(otherProps, {
            ref (r$) {
                var _ref$ = domRef;
                typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $3RlMb$applyRef)(_ref$, r$) : domRef = r$;
            },
            get className () {
                return (props.UNSAFE_className ?? '') + (props.styles ?? '');
            },
            get style () {
                return props.UNSAFE_style;
            },
            get slot () {
                return props.slot || undefined;
            }
        })));
};
const $31869ab78a06e8ab$export$e0e4026c12a8bdbb = (0, $3RlMb$createContext)(null);
function $31869ab78a06e8ab$export$8b251419efc915eb(props) {
    let ref = props.ref;
    [props, ref] = (0, $3RlMb$untrack)(()=>(0, $1NDEx.useSpectrumContextProps)(props, ref, $31869ab78a06e8ab$export$e0e4026c12a8bdbb));
    let domRef = (0, $eXdQ3.useDOMRef)(ref);
    let otherProps = (0, $3RlMb$omit)(props, 'UNSAFE_className', 'UNSAFE_style', 'styles', 'isHidden', 'slot', 'ref');
    return (0, $3RlMb$memo)(()=>(0, $3RlMb$memo)(()=>!props.isHidden)() && (0, $3RlMb$createComponent)((0, $k1Tpf.Header), (0, $3RlMb$mergeProps)(otherProps, {
            ref (r$) {
                var _ref$2 = domRef;
                typeof _ref$2 === "function" || Array.isArray(_ref$2) ? (0, $3RlMb$applyRef)(_ref$2, r$) : domRef = r$;
            },
            get "class" () {
                return (props.UNSAFE_className ?? '') + (props.styles ?? '');
            },
            get style () {
                return props.UNSAFE_style;
            },
            get slot () {
                return props.slot || undefined;
            }
        })));
}
const $31869ab78a06e8ab$export$1cbdd774077931b4 = (0, $3RlMb$createContext)(null);
function $31869ab78a06e8ab$export$7c6e2c02157bb7d2(props) {
    let ref = props.ref;
    [props, ref] = (0, $3RlMb$untrack)(()=>(0, $1NDEx.useSpectrumContextProps)(props, ref, $31869ab78a06e8ab$export$1cbdd774077931b4));
    let domRef = (0, $eXdQ3.useDOMRef)(ref);
    let otherProps = (0, $3RlMb$omit)(props, 'UNSAFE_className', 'UNSAFE_style', 'styles', 'isHidden', 'slot', 'ref');
    return (0, $3RlMb$memo)(()=>(0, $3RlMb$memo)(()=>!props.isHidden)() && (()=>{
            var _el$ = (0, $3RlMb$getNextElement)($31869ab78a06e8ab$var$_tmpl$);
            (0, $3RlMb$spread)(_el$, [
                otherProps,
                {
                    get "class" () {
                        return (props.UNSAFE_className ?? '') + (props.styles ?? '');
                    },
                    get style () {
                        return props.UNSAFE_style;
                    },
                    get slot () {
                        return props.slot || undefined;
                    }
                }
            ], false);
            var _ref$3 = domRef;
            typeof _ref$3 === "function" || Array.isArray(_ref$3) ? (0, $3RlMb$ref)(()=>_ref$3, _el$) : domRef = _el$;
            (0, $3RlMb$runHydrationEvents)();
            return _el$;
        })());
}
const $31869ab78a06e8ab$export$9afb8bc826b033ea = (0, $3RlMb$createContext)(null);
function $31869ab78a06e8ab$export$5f1af8db9871e1d6(props) {
    let ref = props.ref;
    [props, ref] = (0, $3RlMb$untrack)(()=>(0, $1NDEx.useSpectrumContextProps)(props, ref, $31869ab78a06e8ab$export$9afb8bc826b033ea));
    let domRef = (0, $eXdQ3.useDOMRef)(ref);
    let otherProps = (0, $3RlMb$omit)(props, 'UNSAFE_className', 'UNSAFE_style', 'styles', 'isHidden', 'slot', 'children', 'ref');
    let racContext = (0, $3RlMb$createMemo)(()=>(0, $3RlMb$useContext)((0, $flgph.TextContext)));
    let isSkeleton = (0, $esT6z.useIsSkeleton)();
    let [children, skeletonStyle] = (0, $esT6z.useSkeletonText)(()=>props.children, ()=>props.UNSAFE_style);
    const RenderText = ()=>(0, $3RlMb$createComponent)((0, $flgph.Text), (0, $3RlMb$mergeProps)(otherProps, {
            ref (r$) {
                var _ref$4 = domRef;
                typeof _ref$4 === "function" || Array.isArray(_ref$4) ? (0, $3RlMb$applyRef)(_ref$4, r$) : domRef = r$;
            },
            get inert () {
                return (0, $f8FiF.inertValue)(isSkeleton());
            },
            get "class" () {
                return (props.UNSAFE_className ?? '') + (props.styles ?? '');
            },
            get style () {
                return skeletonStyle();
            },
            get slot () {
                return props.slot || undefined;
            },
            "data-rsp-slot": "text",
            get children () {
                return children();
            }
        }));
    const clearContext = ()=>{
        const ctx = racContext();
        return props.slot && ctx && 'slots' in ctx && !ctx.slots?.[props.slot];
    };
    return (0, $3RlMb$memo)(()=>(0, $3RlMb$memo)(()=>!props.isHidden)() && (clearContext() ? (0, $3RlMb$createComponent)((0, $flgph.TextContext), {
            value: null,
            get children () {
                return (0, $3RlMb$createComponent)(RenderText, {});
            }
        }) : (0, $3RlMb$createComponent)(RenderText, {})));
}
const $31869ab78a06e8ab$export$744d98a3b8a94e1c = (0, $3RlMb$createContext)({});
function $31869ab78a06e8ab$export$16e4d70cc375e707(props) {
    let ref = props.ref;
    [props, ref] = (0, $3RlMb$untrack)(()=>(0, $1NDEx.useSpectrumContextProps)(props, ref, $31869ab78a06e8ab$export$744d98a3b8a94e1c));
    let domRef = (0, $eXdQ3.useDOMRef)(ref);
    let otherProps = (0, $3RlMb$omit)(props, 'UNSAFE_className', 'UNSAFE_style', 'styles', 'isHidden', 'slot', 'ref');
    return (0, $3RlMb$memo)(()=>(0, $3RlMb$memo)(()=>!props.isHidden)() && (0, $3RlMb$createComponent)((0, $aykd0.Keyboard), (0, $3RlMb$mergeProps)(otherProps, {
            ref (r$) {
                var _ref$5 = domRef;
                typeof _ref$5 === "function" || Array.isArray(_ref$5) ? (0, $3RlMb$applyRef)(_ref$5, r$) : domRef = r$;
            },
            get className () {
                return (props.UNSAFE_className ?? '') + (props.styles ?? '');
            },
            get style () {
                return props.UNSAFE_style;
            },
            get slot () {
                return props.slot || undefined;
            }
        })));
}
const $31869ab78a06e8ab$export$5630640b68817ed6 = (0, $3RlMb$createContext)({});
function $31869ab78a06e8ab$export$a06f1c675e846f6f(props) {
    let ref = props.ref;
    [props, ref] = (0, $3RlMb$untrack)(()=>(0, $1NDEx.useSpectrumContextProps)(props, ref, $31869ab78a06e8ab$export$5630640b68817ed6));
    let domRef = (0, $eXdQ3.useDOMRef)(ref);
    let otherProps = (0, $3RlMb$omit)(props, 'UNSAFE_className', 'UNSAFE_style', 'styles', 'isHidden', 'slot', 'ref');
    return (0, $3RlMb$memo)(()=>(0, $3RlMb$memo)(()=>!props.isHidden)() && (()=>{
            var _el$2 = (0, $3RlMb$getNextElement)($31869ab78a06e8ab$var$_tmpl$2);
            (0, $3RlMb$spread)(_el$2, [
                otherProps,
                {
                    get "class" () {
                        return (props.UNSAFE_className ?? '') + (props.styles ?? '');
                    },
                    get style () {
                        return props.UNSAFE_style;
                    },
                    get slot () {
                        return props.slot || undefined;
                    }
                }
            ], false);
            var _ref$6 = domRef;
            typeof _ref$6 === "function" || Array.isArray(_ref$6) ? (0, $3RlMb$ref)(()=>_ref$6, _el$2) : domRef = _el$2;
            (0, $3RlMb$runHydrationEvents)();
            return _el$2;
        })());
}

});
parcelRegister("hnLCe", function(module, exports) {

$parcel$export(module.exports, "Keyboard", function () { return (parcelRequire("aykd0")).Keyboard; });
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
var $aykd0 = parcelRequire("aykd0");

});
parcelRegister("aykd0", function(module, exports) {

$parcel$export(module.exports, "Keyboard", function () { return $7aecc1672e008359$export$16e4d70cc375e707; });


var $2A4az = parcelRequire("2A4az");

const $7aecc1672e008359$export$744d98a3b8a94e1c = (0, $3RlMb$createContext)({});
function $7aecc1672e008359$export$16e4d70cc375e707(inputProps) {
    let [props, ref] = (0, $2A4az.useContextProps)(inputProps, inputProps.ref, $7aecc1672e008359$export$744d98a3b8a94e1c);
    return (0, $3RlMb$createComponent)((0, $2A4az.dom).kbd, (0, $3RlMb$mergeProps)({
        dir: "ltr"
    }, props, {
        ref (r$) {
            var _ref$ = ref;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $3RlMb$applyRef)(_ref$, r$) : ref = r$;
        },
        get slot () {
            return props.slot ?? undefined;
        }
    }));
}

});


parcelRegister("lJpJI", function(module, exports) {

$parcel$export(module.exports, "Header", function () { return (parcelRequire("k1Tpf")).Header; });
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
var $k1Tpf = parcelRequire("k1Tpf");

});
parcelRegister("k1Tpf", function(module, exports) {

$parcel$export(module.exports, "Header", function () { return $e94ee12a823b8476$export$8b251419efc915eb; });


var $2A4az = parcelRequire("2A4az");

var $9jLe3 = parcelRequire("9jLe3");

var $iFg3Z = parcelRequire("iFg3Z");


var $cYm00 = parcelRequire("cYm00");
const $e94ee12a823b8476$export$8b251419efc915eb = /*#__PURE__*/ (0, $9jLe3.createLeafComponent)((0, $iFg3Z.HeaderNode), function Header(input, forwardedRef) {
    let [props, ref] = (0, $2A4az.useContextProps)(input, forwardedRef, (0, $cYm00.HeaderContext));
    return (0, $3RlMb$createComponent)((0, $2A4az.dom).header, (0, $3RlMb$mergeProps)({
        className: "react-aria-Header"
    }, ()=>(0, $3RlMb$omit)(props, 'ref', 'children'), {
        ref (r$) {
            var _ref$ = ref;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $3RlMb$applyRef)(_ref$, r$) : ref = r$;
        },
        get children () {
            return props.children;
        }
    }));
});

});
parcelRegister("9jLe3", function(module, exports) {

$parcel$export(module.exports, "createLeafComponent", function () { return $6c8a857437fa30d4$export$18af5c7a9e9b3664; });


var $iFg3Z = parcelRequire("iFg3Z");

var $beLUg = parcelRequire("beLUg");

var $j5TE6 = parcelRequire("j5TE6");

var $cpleU = parcelRequire("cpleU");

var $7A3TT = parcelRequire("7A3TT");

const $6c8a857437fa30d4$var$ShallowRenderContext = (0, $3RlMb$createContext)(false);
const $6c8a857437fa30d4$var$CollectionDocumentContext = (0, $3RlMb$createContext)(null);
function $6c8a857437fa30d4$export$bf788dd355e3a401(props) {
    // If a document was provided above us, we're already in a hidden tree. Just render the content.
    let doc = (0, $3RlMb$useContext)($6c8a857437fa30d4$var$CollectionDocumentContext);
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
        (0, $3RlMb$createComponent)((0, $7A3TT.Hidden), {
            get children () {
                return (0, $3RlMb$createComponent)($6c8a857437fa30d4$var$CollectionDocumentContext, {
                    value: document,
                    get children () {
                        return props.content;
                    }
                });
            }
        }),
        (0, $3RlMb$createComponent)($6c8a857437fa30d4$var$CollectionInner, {
            get render () {
                return props.children;
            },
            collection: collection
        })
    ];
}
function $6c8a857437fa30d4$var$CollectionInner(props) {
    return (0, $3RlMb$memo)(()=>props.render(props.collection()));
}
function $6c8a857437fa30d4$var$useCollectionDocument(createCollection) {
    // The document instance is mutable, and should never change between renders.
    // useSyncExternalStore is used to subscribe to updates, which vends immutable Collection objects.
    let document = new (0, $beLUg.Document)(createCollection?.() || new (0, $iFg3Z.BaseCollection)());
    document.isSSR = (0, $3RlMb$isServer) || (0, $3RlMb$isHydrating)();
    // Notifications invalidate the snapshot; finalize only after the fake renderer's
    // mutation transaction, never from inside Document's subscription callback.
    let [revision, setRevision] = (0, $3RlMb$createSignal)(0, {
        ownedWrite: true
    });
    (0, $3RlMb$onCleanup)(document.subscribe(()=>{
        if (!(0, $3RlMb$isServer)) setRevision((n)=>n + 1);
    }));
    (0, $3RlMb$onSettled)(()=>{
        if (!(0, $3RlMb$isServer) && document.isSSR) {
            // Unlike React's SSR-to-portal switch, native owners retain the same fake
            // nodes during hydration. Finalize them without clearing/recreating the tree.
            document.isSSR = false;
            document.getCollection();
            setRevision((n)=>n + 1);
        }
    });
    // Server memos evaluate eagerly. The source snapshot is read only after the
    // hidden subtree builds the document; an early read freezes an empty snapshot.
    let snapshot = (0, $3RlMb$createMemo)(()=>{
        revision();
        return (0, $3RlMb$isServer) ? ()=>document.getCollection() : document.getCollection();
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
const $6c8a857437fa30d4$var$SSRContext = (0, $3RlMb$createContext)(null);
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
    let parentNode = (0, $3RlMb$useContext)($6c8a857437fa30d4$var$SSRContext);
    if (!parentNode) throw new Error('Collection node requires a collection document.');
    let element = parentNode.ownerDocument.createElement(CollectionNodeClass.type);
    let NodeClass = CollectionNodeClass;
    // Resolve descendants first, matching the source renderer's child-before-parent
    // ref delivery (and therefore its generated key order).
    $6c8a857437fa30d4$var$renderCollectionChildren(element, ()=>(0, $3RlMb$createComponent)($6c8a857437fa30d4$var$SSRContext, {
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
    (0, $3RlMb$createRenderEffect)(updateProps, (value)=>{
        element.setProps(value.props, ref, NodeClass, value.rendered, render);
    });
    (0, $3RlMb$onCleanup)(()=>element.parentNode?.removeChild(element));
    // This value is consumed by the collection renderer, never by the web renderer.
    return element;
}
/** Native renderer for the source fake DOM. Solid owns child lifetimes; the
 * Document still owns all mutation, dirty tracking and immutable snapshots. */ function $6c8a857437fa30d4$var$renderCollectionChildren(parent, content) {
    let children = (0, $3RlMb$children)(content);
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
    (0, $3RlMb$createRenderEffect)(read, reconcile);
    return children;
}
function $6c8a857437fa30d4$export$18af5c7a9e9b3664(CollectionNodeClass, render) {
    let Component = ({ node: node })=>render(node.props, node.props.ref, node);
    let Result = (input)=>{
        let item = (0, $3RlMb$useContext)((0, $j5TE6.CachedItemContext));
        let props = (0, $3RlMb$merge)(input, item ? {
            get id () {
                return input.id ?? item.id;
            },
            get value () {
                return item.value;
            }
        } : {});
        let ref = props.ref;
        let focusableProps = (0, $3RlMb$useContext)((0, $cpleU.FocusableContext));
        let isShallow = (0, $3RlMb$useContext)($6c8a857437fa30d4$var$ShallowRenderContext);
        if (!isShallow) {
            if (render.length >= 3) throw new Error(render.name + ' cannot be rendered outside a collection.');
            return render(props, ref);
        }
        return $6c8a857437fa30d4$var$useSSRCollectionNode(CollectionNodeClass, props, ref, (...args)=>{
            let child = 'children' in props ? props.children : null;
            // Render-prop callbacks receive the real consumer's state; native lazy
            // JSX resolves here as well, never in the fake collection owner.
            return typeof child === 'function' ? child(...args) : child;
        }, null, (node)=>(0, $3RlMb$createComponent)((0, $cpleU.FocusableContext), {
                value: focusableProps,
                get children () {
                    return (0, $3RlMb$createComponent)(Component, {
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
        let item = (0, $3RlMb$useContext)((0, $j5TE6.CachedItemContext));
        let props = (0, $3RlMb$merge)(input, item ? {
            get id () {
                return input.id ?? item.id;
            },
            get value () {
                return item.value;
            }
        } : {});
        let ref = props.ref;
        let children = (0, $3RlMb$createComponent)((0, $j5TE6.CachedItemContext), {
            value: null,
            get children () {
                return useChildren(props);
            }
        });
        return $6c8a857437fa30d4$var$useSSRCollectionNode(CollectionNodeClass, props, ref, null, children, (node)=>(0, $3RlMb$createComponent)(Component, {
                node: node
            })) ?? [];
    };
    // @ts-ignore
    Result.displayName = render.name;
    return Result;
}
function $6c8a857437fa30d4$var$useCollectionChildren(options) {
    return (0, $j5TE6.useCachedChildren)((0, $3RlMb$merge)(options, {
        addIdAndValue: true
    }));
}
const $6c8a857437fa30d4$var$CollectionContext = (0, $3RlMb$createContext)(null);
function $6c8a857437fa30d4$export$fb8073518f34e6ec(props) {
    let ctx = (0, $3RlMb$useContext)($6c8a857437fa30d4$var$CollectionContext);
    let options = (0, $3RlMb$merge)(props, {
        get dependencies () {
            return (ctx?.dependencies || []).concat(props.dependencies || []);
        },
        get idScope () {
            return props.idScope ?? ctx?.idScope;
        }
    });
    let children = $6c8a857437fa30d4$var$useCollectionChildren(options);
    let doc = (0, $3RlMb$useContext)($6c8a857437fa30d4$var$CollectionDocumentContext);
    if (doc) children = (0, $3RlMb$createComponent)($6c8a857437fa30d4$var$CollectionRoot, {
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
    return (0, $3RlMb$createComponent)($6c8a857437fa30d4$var$CollectionContext, {
        value: value,
        children: children
    });
}
function $6c8a857437fa30d4$var$CollectionRoot(props) {
    let doc = (0, $3RlMb$useContext)($6c8a857437fa30d4$var$CollectionDocumentContext);
    if (!doc) throw new Error('CollectionRoot requires a collection document.');
    $6c8a857437fa30d4$var$renderCollectionChildren(doc, ()=>(0, $3RlMb$createComponent)($6c8a857437fa30d4$var$CollectionDocumentContext, {
            value: null,
            get children () {
                return (0, $3RlMb$createComponent)($6c8a857437fa30d4$var$ShallowRenderContext, {
                    value: true,
                    get children () {
                        return (0, $3RlMb$createComponent)($6c8a857437fa30d4$var$SSRContext, {
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
const $de69a611ef9c0aab$export$f44063955319d654 = (0, $3RlMb$createContext)(null);
function $de69a611ef9c0aab$export$727c8fc270210f13(props) {
    let previousDependencies = [];
    let previousChildrenString;
    let cache = new WeakMap();
    let rows = (0, $3RlMb$createMemo)(()=>{
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
    const createDynamic = ()=>(0, $3RlMb$For)({
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


parcelRegister("cYm00", function(module, exports) {

$parcel$export(module.exports, "HeaderContext", function () { return $971c27326acf91fc$export$e0e4026c12a8bdbb; });
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
const $971c27326acf91fc$export$e0e4026c12a8bdbb = (0, $3RlMb$createContext)({});

});



parcelRegister("bcyTS", function(module, exports) {

$parcel$export(module.exports, "Text", function () { return (parcelRequire("flgph")).Text; });
$parcel$export(module.exports, "TextContext", function () { return (parcelRequire("flgph")).TextContext; });
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
var $flgph = parcelRequire("flgph");

});


parcelRegister("5gcT0", function(module, exports) {

$parcel$export(module.exports, "useFormProps", function () { return $3d487150b5edcc7d$export$a6b5be5c6b451665; });


parcelRequire("5gXHG");
var $a5Jqw = parcelRequire("a5Jqw");

var $eXdQ3 = parcelRequire("eXdQ3");

var $esT6z = parcelRequire("esT6z");
const $3d487150b5edcc7d$export$c24727297075ec6a = (0, $3RlMb$createContext)(null);
function $3d487150b5edcc7d$export$a6b5be5c6b451665(props) {
    let context = (0, $3RlMb$createMemo)(()=>(0, $3RlMb$useContext)($3d487150b5edcc7d$export$c24727297075ec6a));
    let isSkeleton = (0, $esT6z.useIsSkeleton)();
    let result = (0, $3RlMb$createMemo)(()=>{
        let ctx = context();
        let result = props;
        if (ctx || isSkeleton()) result = {
            ...props
        };
        if (ctx) {
            // This is a subset of mergeProps. We just need to merge non-undefined values.
            for (let key of Object.keys(ctx))if (result[key] === undefined) // oxlint-disable-next-line react/react-compiler
            Object.assign(result, {
                [key]: ctx[key]
            });
        }
        // Skeleton always wins over local props.
        if (isSkeleton()) // oxlint-disable-next-line react/react-compiler
        result.isDisabled = true;
        return result;
    });
    return new Proxy({}, {
        get: (_, key)=>Reflect.get(result(), key),
        has: (_, key)=>key in result(),
        ownKeys: ()=>Reflect.ownKeys(result()),
        getOwnPropertyDescriptor: (_, key)=>key in result() ? {
                enumerable: true,
                configurable: true
            } : undefined
    });
}
function $3d487150b5edcc7d$export$a7fed597f4b8afd8(props) {
    let formProps = (0, $3RlMb$omit)(props, 'labelPosition', 'labelAlign', 'necessityIndicator', 'isRequired', 'isDisabled', 'isEmphasized', 'size', 'UNSAFE_style', 'UNSAFE_className', 'ref');
    let domRef = (0, $eXdQ3.useDOMRef)(props.ref);
    return (0, $3RlMb$createComponent)((0, $a5Jqw.Form), (0, $3RlMb$mergeProps)(formProps, {
        ref (r$) {
            var _ref$ = domRef;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $3RlMb$applyRef)(_ref$, r$) : domRef = r$;
        },
        get style () {
            return props.UNSAFE_style;
        },
        get className () {
            return (props.UNSAFE_className ?? '') + function anonymous(props, overrides) {
                let rules = " ", currentRules = {};
                rules += (String(overrides || '').match(/(?:^|\s)(J|G|I|H|_u|_v|_s|__A|_d|_J|z|y|B|A|_P|_9|W|_l|_A|_z|_6|Z|N|L|-macro\$)[^\s]+/g) || []).join('');
                rules += ' se18';
                currentRules["display"] = "grid";
                if (props.labelPosition === "side") {
                    rules += ' Dfzkwne18';
                    currentRules["gridTemplateColumns"] = typeof currentRules["gridTemplateColumns"] === 'object' ? currentRules["gridTemplateColumns"] : {
                        "default": currentRules["gridTemplateColumns"]
                    };
                    currentRules["gridTemplateColumns"]["labelPosition === \"side\""] = [
                        "[label] auto",
                        "[field] 1fr"
                    ];
                } else if (props.labelPosition === "top") {
                    rules += ' DS1aTJb18';
                    currentRules["gridTemplateColumns"] = typeof currentRules["gridTemplateColumns"] === 'object' ? currentRules["gridTemplateColumns"] : {
                        "default": currentRules["gridTemplateColumns"]
                    };
                    currentRules["gridTemplateColumns"]["labelPosition === \"top\""] = [
                        "[field] 1fr"
                    ];
                }
                if (props.size === "XL") {
                    rules += ' Ud9wcl18';
                    currentRules["rowGap"] = typeof currentRules["rowGap"] === 'object' ? currentRules["rowGap"] : {
                        "default": currentRules["rowGap"]
                    };
                    currentRules["rowGap"]["size === \"XL\""] = 40;
                } else if (props.size === "L") {
                    rules += ' UerlM8c18';
                    currentRules["rowGap"] = typeof currentRules["rowGap"] === 'object' ? currentRules["rowGap"] : {
                        "default": currentRules["rowGap"]
                    };
                    currentRules["rowGap"]["size === \"L\""] = 32;
                } else if (props.size === "M") {
                    rules += ' Us7Vxmb18';
                    currentRules["rowGap"] = typeof currentRules["rowGap"] === 'object' ? currentRules["rowGap"] : {
                        "default": currentRules["rowGap"]
                    };
                    currentRules["rowGap"]["size === \"M\""] = 24;
                } else if (props.size === "S") {
                    rules += ' UkmMJWb18';
                    currentRules["rowGap"] = typeof currentRules["rowGap"] === 'object' ? currentRules["rowGap"] : {
                        "default": currentRules["rowGap"]
                    };
                    currentRules["rowGap"]["size === \"S\""] = 20;
                } else if (props.size === "XS") {
                    rules += ' UB1JKEb18';
                    currentRules["rowGap"] = typeof currentRules["rowGap"] === 'object' ? currentRules["rowGap"] : {
                        "default": currentRules["rowGap"]
                    };
                    currentRules["rowGap"]["size === \"XS\""] = 16;
                }
                rules += ' qf18';
                currentRules["columnGap"] = "text-to-control";
                let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Form.native.js:77:52";
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
                        loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Form.native.js:77:52"
                    };
                }
                return rules;
            }({
                labelPosition: props.labelPosition ?? 'top',
                size: props.size ?? 'M'
            }, props.styles);
        },
        get children () {
            return (0, $3RlMb$createComponent)($3d487150b5edcc7d$export$c24727297075ec6a, {
                get value () {
                    return {
                        labelPosition: props.labelPosition ?? 'top',
                        labelAlign: props.labelAlign,
                        necessityIndicator: props.necessityIndicator,
                        isRequired: props.isRequired,
                        isDisabled: props.isDisabled,
                        isEmphasized: props.isEmphasized,
                        size: props.size ?? 'M'
                    };
                },
                get children () {
                    return props.children;
                }
            });
        }
    }));
}

});
parcelRegister("5gXHG", function(module, exports) {

$parcel$export(module.exports, "Form", function () { return (parcelRequire("a5Jqw")).Form; });
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
var $a5Jqw = parcelRequire("a5Jqw");

});
parcelRegister("a5Jqw", function(module, exports) {

$parcel$export(module.exports, "Form", function () { return $758d9bd633f9eba4$export$a7fed597f4b8afd8; });


var $2A4az = parcelRequire("2A4az");

var $2W8HB = parcelRequire("2W8HB");

const $758d9bd633f9eba4$export$c24727297075ec6a = (0, $3RlMb$createContext)(null);
function $758d9bd633f9eba4$export$a7fed597f4b8afd8(props) {
    let ref = (0, $3RlMb$untrack)(()=>props.ref);
    [props, ref] = (0, $2A4az.useContextProps)(props, ref, $758d9bd633f9eba4$export$c24727297075ec6a);
    let domProps = (0, $3RlMb$omit)(props, 'validationErrors', 'validationBehavior', 'children', 'className', 'ref');
    let context = (0, $3RlMb$merge)(props, {
        get validationBehavior () {
            return props.validationBehavior ?? 'native';
        }
    });
    return (0, $3RlMb$createComponent)((0, $2A4az.dom).form, (0, $3RlMb$mergeProps)({
        get novalidate () {
            return context.validationBehavior !== 'native';
        }
    }, domProps, {
        ref (r$) {
            var _ref$ = ref;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $3RlMb$applyRef)(_ref$, r$) : ref = r$;
        },
        get className () {
            return props.className || 'react-aria-Form';
        },
        get children () {
            return (0, $3RlMb$createComponent)($758d9bd633f9eba4$export$c24727297075ec6a, {
                value: context,
                get children () {
                    return (0, $3RlMb$createComponent)((0, $2W8HB.FormValidationContext), {
                        get value () {
                            return props.validationErrors ?? {};
                        },
                        get children () {
                            return props.children;
                        }
                    });
                }
            });
        }
    }));
}

});
parcelRegister("2W8HB", function(module, exports) {

$parcel$export(module.exports, "FormValidationContext", function () { return $2237bfa7a6008b9a$export$571b5131b7e65c11; });
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
 */ 
const $2237bfa7a6008b9a$export$aca958c65c314e6c = {
    badInput: false,
    customError: false,
    patternMismatch: false,
    rangeOverflow: false,
    rangeUnderflow: false,
    stepMismatch: false,
    tooLong: false,
    tooShort: false,
    typeMismatch: false,
    valueMissing: false,
    valid: true
};
const $2237bfa7a6008b9a$var$CUSTOM_VALIDITY_STATE = {
    ...$2237bfa7a6008b9a$export$aca958c65c314e6c,
    customError: true,
    valid: false
};
const $2237bfa7a6008b9a$export$dad6ae84456c676a = {
    isInvalid: false,
    validationDetails: $2237bfa7a6008b9a$export$aca958c65c314e6c,
    validationErrors: []
};
const $2237bfa7a6008b9a$export$571b5131b7e65c11 = (0, $3RlMb$createContext)({});
const $2237bfa7a6008b9a$export$a763b9476acd3eb = '__reactAriaFormValidationState';
function $2237bfa7a6008b9a$export$fc1a364ae1f3ff10(props) {
    // Private prop for parent components to pass state to children.
    let inherited = (0, $3RlMb$untrack)(()=>props[$2237bfa7a6008b9a$export$a763b9476acd3eb]);
    if (inherited) return {
        get realtimeValidation () {
            return inherited.realtimeValidation;
        },
        get displayValidation () {
            return inherited.displayValidation;
        },
        updateValidation: inherited.updateValidation,
        resetValidation: inherited.resetValidation,
        commitValidation: inherited.commitValidation
    };
    return $2237bfa7a6008b9a$var$useFormValidationStateImpl(props);
}
function $2237bfa7a6008b9a$var$useFormValidationStateImpl(props) {
    let validationBehavior = ()=>props.validationBehavior ?? 'aria';
    // If the isInvalid prop is controlled, update validation result in realtime.
    let controlledError = (0, $3RlMb$createMemo)(()=>{
        let isInvalid = props.isInvalid;
        if (props.validationState) isInvalid ||= props.validationState === 'invalid';
        return isInvalid !== undefined ? {
            isInvalid: isInvalid,
            validationErrors: [],
            validationDetails: $2237bfa7a6008b9a$var$CUSTOM_VALIDITY_STATE
        } : null;
    });
    // Perform custom client side validation.
    let clientError = (0, $3RlMb$createMemo)(()=>{
        let { validate: validate, value: value } = props;
        if (!validate || value == null) return null;
        let validateErrors = $2237bfa7a6008b9a$var$runValidate(validate, value);
        return $2237bfa7a6008b9a$var$getValidationResult(validateErrors);
    });
    let builtinValidation = ()=>props.builtinValidation?.validationDetails.valid ? undefined : props.builtinValidation;
    // Get relevant server errors from the form.
    let serverResponse = (0, $3RlMb$createMemo)(()=>({
            errors: (0, $3RlMb$useContext)($2237bfa7a6008b9a$export$571b5131b7e65c11)
        }));
    let serverErrors = ()=>serverResponse().errors;
    let serverErrorMessages = (0, $3RlMb$createMemo)(()=>{
        let { name: name } = props;
        if (name) return Array.isArray(name) ? name.flatMap((name)=>$2237bfa7a6008b9a$var$asArray(serverErrors()[name])) : $2237bfa7a6008b9a$var$asArray(serverErrors()[name]);
        return [];
    });
    // Show server errors when the form gets a new value, and clear when the user changes the value.
    // Store which server response was cleared, so a new response is visible immediately.
    let [clearedServerErrors, setClearedServerErrors] = (0, $3RlMb$createSignal)(null);
    let serverError = (0, $3RlMb$createMemo)(()=>$2237bfa7a6008b9a$var$getValidationResult(clearedServerErrors() === serverResponse() ? [] : serverErrorMessages()));
    // Track the next validation state in a ref until commitValidation is called.
    let nextValidation = $2237bfa7a6008b9a$export$dad6ae84456c676a;
    let [currentValidity, setCurrentValidity] = (0, $3RlMb$createSignal)($2237bfa7a6008b9a$export$dad6ae84456c676a);
    // Imperative methods compare against the accepted same-turn proposal, not a
    // reactive read from their caller's effect or an older committed signal value.
    let acceptedValidity = $2237bfa7a6008b9a$export$dad6ae84456c676a;
    let publishValidity = (value)=>{
        acceptedValidity = value;
        setCurrentValidity(value);
    };
    let lastError = $2237bfa7a6008b9a$export$dad6ae84456c676a;
    let [commitQueued, setCommitQueued] = (0, $3RlMb$createSignal)(false);
    let commitGeneration = 0;
    let disposed = false;
    (0, $3RlMb$onCleanup)(()=>{
        disposed = true;
    });
    (0, $3RlMb$createEffect)(()=>({
            queued: commitQueued(),
            value: props.value,
            client: clientError(),
            builtin: builtinValidation()
        }), (result)=>{
        if (!result.queued) return;
        let generation = commitGeneration;
        // Register after the value render has committed. The source's layout-phase
        // native validity effects finish before this settled passive-phase commit.
        (0, $3RlMb$onSettled)(()=>{
            if (disposed || generation !== commitGeneration || !(0, $3RlMb$untrack)(commitQueued)) return;
            setCommitQueued(false);
            let error = (0, $3RlMb$untrack)(clientError) || (0, $3RlMb$untrack)(builtinValidation) || nextValidation;
            if (!$2237bfa7a6008b9a$var$isEqualValidation(error, lastError)) {
                lastError = error;
                publishValidity(error);
            }
        });
    });
    // realtimeValidation is used to update the native input element's state based on custom validation logic.
    // displayValidation is the currently displayed validation state that the user sees (e.g. on input change/form submit).
    // With validationBehavior="aria", all errors are displayed in realtime rather than on submit.
    let realtimeValidation = ()=>{
        // The source layout effect remeasures native validity after each value render,
        // even when client validation still resolves to the same (e.g. valid) result.
        props.value;
        return controlledError() || serverError() || clientError() || builtinValidation() || $2237bfa7a6008b9a$export$dad6ae84456c676a;
    };
    let displayValidation = ()=>validationBehavior() === 'native' ? controlledError() || serverError() || currentValidity() : controlledError() || serverError() || clientError() || builtinValidation() || currentValidity();
    return {
        get realtimeValidation () {
            return realtimeValidation();
        },
        get displayValidation () {
            return displayValidation();
        },
        updateValidation (value) {
            // If validationBehavior is 'aria', update in realtime. Otherwise, store in a ref until commit.
            if (validationBehavior() === 'aria' && !$2237bfa7a6008b9a$var$isEqualValidation(acceptedValidity, value)) publishValidity(value);
            else nextValidation = value;
        },
        resetValidation () {
            // Update the currently displayed validation state to valid on form reset,
            // even if the native validity says it isn't. It'll show again on the next form submit.
            let error = $2237bfa7a6008b9a$export$dad6ae84456c676a;
            if (!$2237bfa7a6008b9a$var$isEqualValidation(error, lastError)) {
                lastError = error;
                publishValidity(error);
            }
            // Do not commit validation after the next render. This avoids a condition where
            // useSelect calls commitValidation inside an onReset handler.
            if (validationBehavior() === 'native') {
                commitGeneration++;
                setCommitQueued(false);
            }
            setClearedServerErrors(serverResponse());
        },
        commitValidation () {
            // Commit validation state so the user sees it on blur/change/submit. Also clear any server errors.
            // Wait until after the next render to commit so that the latest value has been validated.
            if (validationBehavior() === 'native') setCommitQueued(true);
            setClearedServerErrors(serverResponse());
        }
    };
}
function $2237bfa7a6008b9a$var$asArray(v) {
    if (!v) return [];
    return Array.isArray(v) ? v : [
        v
    ];
}
function $2237bfa7a6008b9a$var$runValidate(validate, value) {
    if (typeof validate === 'function') {
        let e = validate(value);
        if (e && typeof e !== 'boolean') return $2237bfa7a6008b9a$var$asArray(e);
    }
    return [];
}
function $2237bfa7a6008b9a$var$getValidationResult(errors) {
    return errors.length ? {
        isInvalid: true,
        validationErrors: errors,
        validationDetails: $2237bfa7a6008b9a$var$CUSTOM_VALIDITY_STATE
    } : null;
}
function $2237bfa7a6008b9a$var$isEqualValidation(a, b) {
    if (a === b) return true;
    return !!a && !!b && a.isInvalid === b.isInvalid && a.validationErrors.length === b.validationErrors.length && a.validationErrors.every((a, i)=>a === b.validationErrors[i]) && Object.entries(a.validationDetails).every(([k, v])=>b.validationDetails[k] === v);
}
function $2237bfa7a6008b9a$export$75ee7c75d68f5b0e(...results) {
    let errors = new Set();
    let isInvalid = false;
    let validationDetails = {
        ...$2237bfa7a6008b9a$export$aca958c65c314e6c
    };
    for (let v of results){
        for (let e of v.validationErrors)errors.add(e);
        // Only these properties apply for checkboxes.
        isInvalid ||= v.isInvalid;
        for(let key in validationDetails){
            let validityKey = key;
            validationDetails[validityKey] ||= v.validationDetails[validityKey];
        }
    }
    validationDetails.valid = !isInvalid;
    return {
        isInvalid: isInvalid,
        validationErrors: [
            ...errors
        ],
        validationDetails: validationDetails
    };
}

});




parcelRegister("k9l9B", function(module, exports) {

$parcel$export(module.exports, "ButtonContext", function () { return $eab50ea25d9ba632$export$24d547caef80ccd1; });
$parcel$export(module.exports, "LinkButtonContext", function () { return $eab50ea25d9ba632$export$1c1a176f3b9e48d3; });
$parcel$export(module.exports, "usePendingState", function () { return $eab50ea25d9ba632$export$edc9ced5c3e5ff00; });
$parcel$export(module.exports, "Button", function () { return $eab50ea25d9ba632$export$353f5b6fc5456de1; });
$parcel$export(module.exports, "LinkButton", function () { return $eab50ea25d9ba632$export$29d11c0fe2fc51d8; });

parcelRequire("h5JLT");
var $2ZmcB = parcelRequire("2ZmcB");

var $3BNNa = parcelRequire("3BNNa");

var $2A4az = parcelRequire("2A4az");


var $9RJLv = parcelRequire("9RJLv");

var $dBSpv = parcelRequire("dBSpv");
parcelRequire("lB2Ba");
var $gSanO = parcelRequire("gSanO");
parcelRequire("8i1yT");
var $6tJ0n = parcelRequire("6tJ0n");

var $5seyF = parcelRequire("5seyF");

var $gPqiz = parcelRequire("gPqiz");

var $esT6z = parcelRequire("esT6z");

var $4fCJc = parcelRequire("4fCJc");

var $eXdQ3 = parcelRequire("eXdQ3");

var $5gcT0 = parcelRequire("5gcT0");
parcelRequire("2fwg4");
var $jeZsY = parcelRequire("jeZsY");

var $1NDEx = parcelRequire("1NDEx");
var $eab50ea25d9ba632$var$_tmpl$ = /*#__PURE__*/ (0, $3RlMb$template)(`<span>`), $eab50ea25d9ba632$var$_tmpl$2 = /*#__PURE__*/ (0, $3RlMb$template)(`<div>`);
const $eab50ea25d9ba632$export$24d547caef80ccd1 = (0, $3RlMb$createContext)(null);
const $eab50ea25d9ba632$export$1c1a176f3b9e48d3 = (0, $3RlMb$createContext)(null);
const $eab50ea25d9ba632$var$button = function anonymous(props, overrides) {
    let rules = " ", currentRules = {};
    let minWidth = false;
    let position = false;
    let width = false;
    let matches = String(overrides || '').matchAll(/(?:^|\s)(J|G|I|H|_u|_v|_s|__A|_d|_J|z|y|B|A|_P|_9|W|_l|_A|_z|_6|Z|N|L|-macro\$)[^\s]+/g);
    for (let p of matches){
        if (p[1] === "N") minWidth = true;
        if (p[1] === "_P") position = true;
        if (p[1] === "Z") width = true;
        rules += p[0];
    }
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
    if (props.size === "XL") {
        rules += ' uk18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XL\""] = "sans";
        rules += ' ucJ9TBTb18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XL\" && :lang(ar)"] = "sans";
        rules += ' ud3Euai18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XL\" && :lang(he)"] = "sans";
        rules += ' uea18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XL\" && :lang(ja)"] = "sans";
        rules += ' ugb18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XL\" && :lang(ko)"] = "sans";
        rules += ' uhd18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XL\" && :lang(zh)"] = "sans";
        rules += ' uje18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XL\" && :lang(zh-hant)"] = "sans";
        rules += ' u2NhKxcl18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XL\" && :lang(zh-HK)"] = "sans";
        rules += ' uic18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XL\" && :lang(zh-Hans, zh-CN, zh-SG)"] = "sans";
    } else if (props.size === "L") {
        rules += ' uk18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"L\""] = "sans";
        rules += ' ucJ9TBTb18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"L\" && :lang(ar)"] = "sans";
        rules += ' ud3Euai18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"L\" && :lang(he)"] = "sans";
        rules += ' uea18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"L\" && :lang(ja)"] = "sans";
        rules += ' ugb18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"L\" && :lang(ko)"] = "sans";
        rules += ' uhd18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"L\" && :lang(zh)"] = "sans";
        rules += ' uje18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"L\" && :lang(zh-hant)"] = "sans";
        rules += ' u2NhKxcl18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"L\" && :lang(zh-HK)"] = "sans";
        rules += ' uic18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"L\" && :lang(zh-Hans, zh-CN, zh-SG)"] = "sans";
    } else if (props.size === "S") {
        rules += ' uk18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"S\""] = "sans";
        rules += ' ucJ9TBTb18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"S\" && :lang(ar)"] = "sans";
        rules += ' ud3Euai18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"S\" && :lang(he)"] = "sans";
        rules += ' uea18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"S\" && :lang(ja)"] = "sans";
        rules += ' ugb18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"S\" && :lang(ko)"] = "sans";
        rules += ' uhd18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"S\" && :lang(zh)"] = "sans";
        rules += ' uje18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"S\" && :lang(zh-hant)"] = "sans";
        rules += ' u2NhKxcl18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"S\" && :lang(zh-HK)"] = "sans";
        rules += ' uic18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"S\" && :lang(zh-Hans, zh-CN, zh-SG)"] = "sans";
    } else if (props.size === "XS") {
        rules += ' uk18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XS\""] = "sans";
        rules += ' ucJ9TBTb18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XS\" && :lang(ar)"] = "sans";
        rules += ' ud3Euai18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XS\" && :lang(he)"] = "sans";
        rules += ' uea18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XS\" && :lang(ja)"] = "sans";
        rules += ' ugb18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XS\" && :lang(ko)"] = "sans";
        rules += ' uhd18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XS\" && :lang(zh)"] = "sans";
        rules += ' uje18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XS\" && :lang(zh-hant)"] = "sans";
        rules += ' u2NhKxcl18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XS\" && :lang(zh-HK)"] = "sans";
        rules += ' uic18';
        currentRules["fontFamily"] = typeof currentRules["fontFamily"] === 'object' ? currentRules["fontFamily"] : {
            "default": currentRules["fontFamily"]
        };
        currentRules["fontFamily"]["size === \"XS\" && :lang(zh-Hans, zh-CN, zh-SG)"] = "sans";
    } else {
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
    }
    if (props.size === "XL") {
        rules += ' -_6BNtrc-e18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"XL\""] = "ui-xl";
        rules += ' vFHT6Dd18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"XL\""] = "ui-xl";
    } else if (props.size === "L") {
        rules += ' -_6BNtrc-d18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"L\""] = "ui-lg";
        rules += ' vFHT6Dd18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"L\""] = "ui-lg";
    } else if (props.size === "S") {
        rules += ' -_6BNtrc-b18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"S\""] = "ui-sm";
        rules += ' vFHT6Dd18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"S\""] = "ui-sm";
    } else if (props.size === "XS") {
        rules += ' -_6BNtrc-a18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"XS\""] = "ui-xs";
        rules += ' vFHT6Dd18';
        currentRules["fontSize"] = typeof currentRules["fontSize"] === 'object' ? currentRules["fontSize"] : {
            "default": currentRules["fontSize"]
        };
        currentRules["fontSize"]["size === \"XS\""] = "ui-xs";
    } else {
        rules += ' -_6BNtrc-c18';
        currentRules["fontSize"] = "ui";
        rules += ' vFHT6Dd18';
        currentRules["fontSize"] = "ui";
    }
    rules += ' xd18';
    currentRules["fontWeight"] = "bold";
    rules += ' _xa18';
    currentRules["fontWeight"] = "bold";
    rules += ' xX0cczbc18';
    currentRules["fontWeight"] = typeof currentRules["fontWeight"] === 'object' ? currentRules["fontWeight"] : {
        "default": currentRules["fontWeight"]
    };
    currentRules["fontWeight"][":lang(ja, ko, zh)"] = "bold";
    rules += ' _xX0cczba18';
    currentRules["fontWeight"] = typeof currentRules["fontWeight"] === 'object' ? currentRules["fontWeight"] : {
        "default": currentRules["fontWeight"]
    };
    currentRules["fontWeight"][":lang(ja, ko, zh)"] = "bold";
    if (props.size === "XL") {
        rules += ' _Fd18';
        currentRules["lineHeight"] = typeof currentRules["lineHeight"] === 'object' ? currentRules["lineHeight"] : {
            "default": currentRules["lineHeight"]
        };
        currentRules["lineHeight"]["size === \"XL\""] = "ui";
        rules += ' _FnuYUweb18';
        currentRules["lineHeight"] = typeof currentRules["lineHeight"] === 'object' ? currentRules["lineHeight"] : {
            "default": currentRules["lineHeight"]
        };
        currentRules["lineHeight"]["size === \"XL\" && :lang(ja, ko, zh, zh-Hant, zh-Hans, zh-CN, zh-SG)"] = "ui";
    } else if (props.size === "L") {
        rules += ' _Fd18';
        currentRules["lineHeight"] = typeof currentRules["lineHeight"] === 'object' ? currentRules["lineHeight"] : {
            "default": currentRules["lineHeight"]
        };
        currentRules["lineHeight"]["size === \"L\""] = "ui";
        rules += ' _FnuYUweb18';
        currentRules["lineHeight"] = typeof currentRules["lineHeight"] === 'object' ? currentRules["lineHeight"] : {
            "default": currentRules["lineHeight"]
        };
        currentRules["lineHeight"]["size === \"L\" && :lang(ja, ko, zh, zh-Hant, zh-Hans, zh-CN, zh-SG)"] = "ui";
    } else if (props.size === "S") {
        rules += ' _Fd18';
        currentRules["lineHeight"] = typeof currentRules["lineHeight"] === 'object' ? currentRules["lineHeight"] : {
            "default": currentRules["lineHeight"]
        };
        currentRules["lineHeight"]["size === \"S\""] = "ui";
        rules += ' _FnuYUweb18';
        currentRules["lineHeight"] = typeof currentRules["lineHeight"] === 'object' ? currentRules["lineHeight"] : {
            "default": currentRules["lineHeight"]
        };
        currentRules["lineHeight"]["size === \"S\" && :lang(ja, ko, zh, zh-Hant, zh-Hans, zh-CN, zh-SG)"] = "ui";
    } else if (props.size === "XS") {
        rules += ' _Fd18';
        currentRules["lineHeight"] = typeof currentRules["lineHeight"] === 'object' ? currentRules["lineHeight"] : {
            "default": currentRules["lineHeight"]
        };
        currentRules["lineHeight"]["size === \"XS\""] = "ui";
        rules += ' _FnuYUweb18';
        currentRules["lineHeight"] = typeof currentRules["lineHeight"] === 'object' ? currentRules["lineHeight"] : {
            "default": currentRules["lineHeight"]
        };
        currentRules["lineHeight"]["size === \"XS\" && :lang(ja, ko, zh, zh-Hant, zh-Hans, zh-CN, zh-SG)"] = "ui";
    } else {
        rules += ' _Fd18';
        currentRules["lineHeight"] = "ui";
        rules += ' _FnuYUweb18';
        currentRules["lineHeight"] = typeof currentRules["lineHeight"] === 'object' ? currentRules["lineHeight"] : {
            "default": currentRules["lineHeight"]
        };
        currentRules["lineHeight"][":lang(ja, ko, zh, zh-Hant, zh-Hans, zh-CN, zh-SG)"] = "ui";
    }
    if (props.isStaticColor) {
        if (props.isDisabled) {
            rules += ' pi18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["isStaticColor && isDisabled"] = "transparent-overlay-400";
        } else if (props.fillStyle === "outline") {
            if (props.variant === "genai") {
                rules += ' px18';
                currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                    "default": currentRules["color"]
                };
                currentRules["color"]["isStaticColor && fillStyle === \"outline\" && variant === \"genai\""] = "white";
            } else if (props.variant === "premium") {
                rules += ' px18';
                currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                    "default": currentRules["color"]
                };
                currentRules["color"]["isStaticColor && fillStyle === \"outline\" && variant === \"premium\""] = "white";
            } else {
                if (props.isPressed) {
                    rules += ' pl18';
                    currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                        "default": currentRules["color"]
                    };
                    currentRules["color"]["isStaticColor && fillStyle === \"outline\" && isPressed"] = "transparent-overlay-1000";
                } else if (props.isFocusVisible) {
                    rules += ' pl18';
                    currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                        "default": currentRules["color"]
                    };
                    currentRules["color"]["isStaticColor && fillStyle === \"outline\" && isFocusVisible"] = "transparent-overlay-1000";
                } else if (props.isHovered) {
                    rules += ' pl18';
                    currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                        "default": currentRules["color"]
                    };
                    currentRules["color"]["isStaticColor && fillStyle === \"outline\" && isHovered"] = "transparent-overlay-1000";
                } else {
                    rules += ' pl18';
                    currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                        "default": currentRules["color"]
                    };
                    currentRules["color"]["isStaticColor && fillStyle === \"outline\""] = "transparent-overlay-1000";
                }
            }
        } else if (props.fillStyle === "fill") {
            if (props.variant === "genai") {
                rules += ' px18';
                currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                    "default": currentRules["color"]
                };
                currentRules["color"]["isStaticColor && fillStyle === \"fill\" && variant === \"genai\""] = "white";
            } else if (props.variant === "premium") {
                rules += ' px18';
                currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                    "default": currentRules["color"]
                };
                currentRules["color"]["isStaticColor && fillStyle === \"fill\" && variant === \"premium\""] = "white";
            } else if (props.variant === "secondary") {
                if (props.isPressed) {
                    rules += ' pl18';
                    currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                        "default": currentRules["color"]
                    };
                    currentRules["color"]["isStaticColor && fillStyle === \"fill\" && variant === \"secondary\" && isPressed"] = "transparent-overlay-1000";
                } else if (props.isFocusVisible) {
                    rules += ' pl18';
                    currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                        "default": currentRules["color"]
                    };
                    currentRules["color"]["isStaticColor && fillStyle === \"fill\" && variant === \"secondary\" && isFocusVisible"] = "transparent-overlay-1000";
                } else if (props.isHovered) {
                    rules += ' pl18';
                    currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                        "default": currentRules["color"]
                    };
                    currentRules["color"]["isStaticColor && fillStyle === \"fill\" && variant === \"secondary\" && isHovered"] = "transparent-overlay-1000";
                } else {
                    rules += ' pl18';
                    currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                        "default": currentRules["color"]
                    };
                    currentRules["color"]["isStaticColor && fillStyle === \"fill\" && variant === \"secondary\""] = "transparent-overlay-1000";
                }
            } else if (props.variant === "primary") {
                rules += ' ph18';
                currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                    "default": currentRules["color"]
                };
                currentRules["color"]["isStaticColor && fillStyle === \"fill\" && variant === \"primary\""] = "auto";
            }
        }
    } else if (props.fillStyle === "outline") {
        if (props.isDisabled) {
            rules += ' pp18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["fillStyle === \"outline\" && isDisabled"] = "disabled";
        } else if (props.variant === "genai") {
            rules += ' px18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["fillStyle === \"outline\" && variant === \"genai\""] = "white";
        } else if (props.variant === "premium") {
            rules += ' px18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["fillStyle === \"outline\" && variant === \"premium\""] = "white";
        } else {
            if (props.isPressed) {
                rules += ' po18';
                currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                    "default": currentRules["color"]
                };
                currentRules["color"]["fillStyle === \"outline\" && isPressed"] = "neutral:pressed";
            } else if (props.isFocusVisible) {
                rules += ' po18';
                currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                    "default": currentRules["color"]
                };
                currentRules["color"]["fillStyle === \"outline\" && isFocusVisible"] = "neutral:focused";
            } else if (props.isHovered) {
                rules += ' po18';
                currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                    "default": currentRules["color"]
                };
                currentRules["color"]["fillStyle === \"outline\" && isHovered"] = "neutral:hovered";
            } else {
                rules += ' pt18';
                currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                    "default": currentRules["color"]
                };
                currentRules["color"]["fillStyle === \"outline\""] = "neutral";
            }
        }
    } else if (props.fillStyle === "fill") {
        if (props.isDisabled) {
            rules += ' pp18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["fillStyle === \"fill\" && isDisabled"] = "disabled";
        } else if (props.variant === "genai") {
            rules += ' px18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["fillStyle === \"fill\" && variant === \"genai\""] = "white";
        } else if (props.variant === "premium") {
            rules += ' px18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["fillStyle === \"fill\" && variant === \"premium\""] = "white";
        } else if (props.variant === "negative") {
            rules += ' px18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["fillStyle === \"fill\" && variant === \"negative\""] = "white";
        } else if (props.variant === "accent") {
            rules += ' px18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["fillStyle === \"fill\" && variant === \"accent\""] = "white";
        } else if (props.variant === "secondary") {
            if (props.isPressed) {
                rules += ' po18';
                currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                    "default": currentRules["color"]
                };
                currentRules["color"]["fillStyle === \"fill\" && variant === \"secondary\" && isPressed"] = "neutral:pressed";
            } else if (props.isFocusVisible) {
                rules += ' po18';
                currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                    "default": currentRules["color"]
                };
                currentRules["color"]["fillStyle === \"fill\" && variant === \"secondary\" && isFocusVisible"] = "neutral:focused";
            } else if (props.isHovered) {
                rules += ' po18';
                currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                    "default": currentRules["color"]
                };
                currentRules["color"]["fillStyle === \"fill\" && variant === \"secondary\" && isHovered"] = "neutral:hovered";
            } else {
                rules += ' pt18';
                currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                    "default": currentRules["color"]
                };
                currentRules["color"]["fillStyle === \"fill\" && variant === \"secondary\""] = "neutral";
            }
        } else if (props.variant === "primary") {
            rules += ' pr18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["fillStyle === \"fill\" && variant === \"primary\""] = "gray-25";
        }
    }
    if (props.fillStyle === "outline") {
        if (props.isDisabled) {
            rules += ' plOVIhfcYMPQu18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["forcedColors && fillStyle === \"outline\" && isDisabled"] = "GrayText";
        } else {
            rules += ' plOVIhfc6LxY918';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["forcedColors && fillStyle === \"outline\""] = "ButtonText";
        }
    } else if (props.fillStyle === "fill") {
        if (props.isDisabled) {
            rules += ' plOVIhfcgp5Dcd18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["forcedColors && fillStyle === \"fill\" && isDisabled"] = "HighlightText";
        } else {
            rules += ' plOVIhfc8qxrJ18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["forcedColors && fillStyle === \"fill\""] = "ButtonFace";
        }
    }
    if (props.fillStyle === "outline") {
        if (props.isDisabled) {
            rules += ' plOVIhfcYMPQu18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["fillStyle === \"outline\" && isDisabled && :is([data-hcm], [data-hcm] *)"] = "GrayText";
        } else {
            rules += ' plOVIhfc6LxY918';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["fillStyle === \"outline\" && :is([data-hcm], [data-hcm] *)"] = "ButtonText";
        }
    } else if (props.fillStyle === "fill") {
        if (props.isDisabled) {
            rules += ' plOVIhfcgp5Dcd18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["fillStyle === \"fill\" && isDisabled && :is([data-hcm], [data-hcm] *)"] = "HighlightText";
        } else {
            rules += ' plOVIhfc8qxrJ18';
            currentRules["color"] = typeof currentRules["color"] === 'object' ? currentRules["color"] : {
                "default": currentRules["color"]
            };
            currentRules["color"]["fillStyle === \"fill\" && :is([data-hcm], [data-hcm] *)"] = "ButtonFace";
        }
    }
    rules += ' sd18';
    currentRules["display"] = "flex";
    rules += ' ea18';
    currentRules["alignItems"] = "baseline";
    rules += ' egLWx3bb18';
    currentRules["alignItems"] = typeof currentRules["alignItems"] === 'object' ? currentRules["alignItems"] : {
        "default": currentRules["alignItems"]
    };
    currentRules["alignItems"][":has([slot=icon]):not(:has([data-rsp-slot=text]))"] = "center";
    rules += ' _oa18';
    currentRules["boxSizing"] = "border-box";
    rules += ' Sw18';
    currentRules["paddingStart"] = "pill";
    rules += ' SgLWx3bd18';
    currentRules["paddingStart"] = typeof currentRules["paddingStart"] === 'object' ? currentRules["paddingStart"] : {
        "default": currentRules["paddingStart"]
    };
    currentRules["paddingStart"][":has([slot=icon]):not(:has([data-rsp-slot=text]))"] = 0;
    rules += ' Rw18';
    currentRules["paddingEnd"] = "pill";
    rules += ' RgLWx3bd18';
    currentRules["paddingEnd"] = typeof currentRules["paddingEnd"] === 'object' ? currentRules["paddingEnd"] : {
        "default": currentRules["paddingEnd"]
    };
    currentRules["paddingEnd"][":has([slot=icon]):not(:has([data-rsp-slot=text]))"] = 0;
    if (props.size === "XL") {
        if (!minWidth) rules += ' NBaYFfc18';
        currentRules["minWidth"] = typeof currentRules["minWidth"] === 'object' ? currentRules["minWidth"] : {
            "default": currentRules["minWidth"]
        };
        currentRules["minWidth"]["size === \"XL\""] = 48;
    } else if (props.size === "L") {
        if (!minWidth) rules += ' N3JjxG18';
        currentRules["minWidth"] = typeof currentRules["minWidth"] === 'object' ? currentRules["minWidth"] : {
            "default": currentRules["minWidth"]
        };
        currentRules["minWidth"]["size === \"L\""] = 40;
    } else if (props.size === "S") {
        if (!minWidth) rules += ' NCe2o8c18';
        currentRules["minWidth"] = typeof currentRules["minWidth"] === 'object' ? currentRules["minWidth"] : {
            "default": currentRules["minWidth"]
        };
        currentRules["minWidth"]["size === \"S\""] = 24;
    } else if (props.size === "XS") {
        if (!minWidth) rules += ' NifsFYc18';
        currentRules["minWidth"] = typeof currentRules["minWidth"] === 'object' ? currentRules["minWidth"] : {
            "default": currentRules["minWidth"]
        };
        currentRules["minWidth"]["size === \"XS\""] = 20;
    } else {
        if (!minWidth) rules += ' N4dY0ec18';
        currentRules["minWidth"] = 32;
    }
    rules += ' oh18';
    currentRules["borderTopStartRadius"] = "pill";
    rules += ' nh18';
    currentRules["borderTopEndRadius"] = "pill";
    rules += ' kh18';
    currentRules["borderBottomStartRadius"] = "pill";
    rules += ' jh18';
    currentRules["borderBottomEndRadius"] = "pill";
    rules += ' qc18';
    currentRules["columnGap"] = "text-to-visual";
    rules += ' qsd18';
    currentRules["columnGap"] = typeof currentRules["columnGap"] === 'object' ? currentRules["columnGap"] : {
        "default": currentRules["columnGap"]
    };
    currentRules["columnGap"]["touch"] = "text-to-visual";
    rules += ' -Qg41Lb-IAxCW0c18';
    currentRules["--iconMargin"] = "[-0.14285714285714285em]";
    rules += ' -Qg41Lb-gLWx3bIYB8I18';
    currentRules["--iconMargin"] = typeof currentRules["--iconMargin"] === 'object' ? currentRules["--iconMargin"] : {
        "default": currentRules["--iconMargin"]
    };
    currentRules["--iconMargin"][":has([slot=icon]):not(:has([data-rsp-slot=text]))"] = 0;
    rules += ' MAyFGYc18';
    rules += ' Td18';
    currentRules["paddingTop"] = 0;
    rules += ' Qd18';
    currentRules["paddingBottom"] = 0;
    rules += ' -aRvJDd-Tu7Fubd18';
    currentRules["--labelPadding"] = "[calc((self(minHeight) - self(borderTopWidth, 0px) - self(borderBottomWidth, 0px) - 1lh) / 2)]";
    if (!position) rules += ' _Pc18';
    currentRules["position"] = "relative";
    rules += ' _Ca18';
    currentRules["justifyContent"] = "center";
    rules += ' _Wd18';
    currentRules["textAlign"] = "start";
    rules += ' _4c18';
    currentRules["userSelect"] = "none";
    if (!width) rules += ' ZJ18';
    currentRules["width"] = "fit";
    rules += ' _Xa18';
    currentRules["textDecoration"] = "none";
    rules += ' Yd18';
    currentRules["transition"] = "default";
    rules += ' Xb18';
    currentRules["transitionDuration"] = 150;
    rules += ' _2b18';
    currentRules["transitionTimingFunction"] = "default";
    rules += ' _jf18';
    currentRules["borderStyle"] = "solid";
    rules += ' _kJ8iPYd18';
    rules += ' hXMFGYc18';
    if (props.variant === "genai") {
        rules += ' ma18';
        currentRules["borderStartWidth"] = typeof currentRules["borderStartWidth"] === 'object' ? currentRules["borderStartWidth"] : {
            "default": currentRules["borderStartWidth"]
        };
        currentRules["borderStartWidth"]["variant === \"genai\""] = 0;
    } else if (props.variant === "premium") {
        rules += ' ma18';
        currentRules["borderStartWidth"] = typeof currentRules["borderStartWidth"] === 'object' ? currentRules["borderStartWidth"] : {
            "default": currentRules["borderStartWidth"]
        };
        currentRules["borderStartWidth"]["variant === \"premium\""] = 0;
    } else if (props.fillStyle === "outline") {
        rules += ' mc18';
        currentRules["borderStartWidth"] = typeof currentRules["borderStartWidth"] === 'object' ? currentRules["borderStartWidth"] : {
            "default": currentRules["borderStartWidth"]
        };
        currentRules["borderStartWidth"]["fillStyle === \"outline\""] = 2;
    } else if (props.fillStyle === "fill") {
        rules += ' ma18';
        currentRules["borderStartWidth"] = typeof currentRules["borderStartWidth"] === 'object' ? currentRules["borderStartWidth"] : {
            "default": currentRules["borderStartWidth"]
        };
        currentRules["borderStartWidth"]["fillStyle === \"fill\""] = 0;
    }
    if (props.variant === "genai") {
        rules += ' la18';
        currentRules["borderEndWidth"] = typeof currentRules["borderEndWidth"] === 'object' ? currentRules["borderEndWidth"] : {
            "default": currentRules["borderEndWidth"]
        };
        currentRules["borderEndWidth"]["variant === \"genai\""] = 0;
    } else if (props.variant === "premium") {
        rules += ' la18';
        currentRules["borderEndWidth"] = typeof currentRules["borderEndWidth"] === 'object' ? currentRules["borderEndWidth"] : {
            "default": currentRules["borderEndWidth"]
        };
        currentRules["borderEndWidth"]["variant === \"premium\""] = 0;
    } else if (props.fillStyle === "outline") {
        rules += ' lc18';
        currentRules["borderEndWidth"] = typeof currentRules["borderEndWidth"] === 'object' ? currentRules["borderEndWidth"] : {
            "default": currentRules["borderEndWidth"]
        };
        currentRules["borderEndWidth"]["fillStyle === \"outline\""] = 2;
    } else if (props.fillStyle === "fill") {
        rules += ' la18';
        currentRules["borderEndWidth"] = typeof currentRules["borderEndWidth"] === 'object' ? currentRules["borderEndWidth"] : {
            "default": currentRules["borderEndWidth"]
        };
        currentRules["borderEndWidth"]["fillStyle === \"fill\""] = 0;
    }
    if (props.isStaticColor) {
        if (props.isDisabled) {
            rules += ' ig18';
            currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
                "default": currentRules["borderColor"]
            };
            currentRules["borderColor"]["isStaticColor && isDisabled"] = "transparent-overlay-300";
        } else if (props.variant === "secondary") {
            if (props.isPressed) {
                rules += ' ih18';
                currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
                    "default": currentRules["borderColor"]
                };
                currentRules["borderColor"]["isStaticColor && variant === \"secondary\" && isPressed"] = "transparent-overlay-300:pressed";
            } else if (props.isFocusVisible) {
                rules += ' ih18';
                currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
                    "default": currentRules["borderColor"]
                };
                currentRules["borderColor"]["isStaticColor && variant === \"secondary\" && isFocusVisible"] = "transparent-overlay-300:focused";
            } else if (props.isHovered) {
                rules += ' ih18';
                currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
                    "default": currentRules["borderColor"]
                };
                currentRules["borderColor"]["isStaticColor && variant === \"secondary\" && isHovered"] = "transparent-overlay-300:hovered";
            } else {
                rules += ' ig18';
                currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
                    "default": currentRules["borderColor"]
                };
                currentRules["borderColor"]["isStaticColor && variant === \"secondary\""] = "transparent-overlay-300";
            }
        } else if (props.variant === "primary") {
            if (props.isPressed) {
                rules += ' ij18';
                currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
                    "default": currentRules["borderColor"]
                };
                currentRules["borderColor"]["isStaticColor && variant === \"primary\" && isPressed"] = "transparent-overlay-800:pressed";
            } else if (props.isFocusVisible) {
                rules += ' ij18';
                currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
                    "default": currentRules["borderColor"]
                };
                currentRules["borderColor"]["isStaticColor && variant === \"primary\" && isFocusVisible"] = "transparent-overlay-800:focused";
            } else if (props.isHovered) {
                rules += ' ij18';
                currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
                    "default": currentRules["borderColor"]
                };
                currentRules["borderColor"]["isStaticColor && variant === \"primary\" && isHovered"] = "transparent-overlay-800:hovered";
            } else {
                rules += ' ii18';
                currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
                    "default": currentRules["borderColor"]
                };
                currentRules["borderColor"]["isStaticColor && variant === \"primary\""] = "transparent-overlay-800";
            }
        }
    } else if (props.isDisabled) {
        rules += ' iq18';
        currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
            "default": currentRules["borderColor"]
        };
        currentRules["borderColor"]["isDisabled"] = "disabled";
    } else if (props.variant === "secondary") {
        if (props.isPressed) {
            rules += ' io18';
            currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
                "default": currentRules["borderColor"]
            };
            currentRules["borderColor"]["variant === \"secondary\" && isPressed"] = "gray-300:pressed";
        } else if (props.isFocusVisible) {
            rules += ' io18';
            currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
                "default": currentRules["borderColor"]
            };
            currentRules["borderColor"]["variant === \"secondary\" && isFocusVisible"] = "gray-300:focused";
        } else if (props.isHovered) {
            rules += ' io18';
            currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
                "default": currentRules["borderColor"]
            };
            currentRules["borderColor"]["variant === \"secondary\" && isHovered"] = "gray-300:hovered";
        } else {
            rules += ' iq18';
            currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
                "default": currentRules["borderColor"]
            };
            currentRules["borderColor"]["variant === \"secondary\""] = "gray-300";
        }
    } else if (props.variant === "primary") {
        if (props.isPressed) {
            rules += ' in18';
            currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
                "default": currentRules["borderColor"]
            };
            currentRules["borderColor"]["variant === \"primary\" && isPressed"] = "gray-800:pressed";
        } else if (props.isFocusVisible) {
            rules += ' in18';
            currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
                "default": currentRules["borderColor"]
            };
            currentRules["borderColor"]["variant === \"primary\" && isFocusVisible"] = "gray-800:focused";
        } else if (props.isHovered) {
            rules += ' in18';
            currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
                "default": currentRules["borderColor"]
            };
            currentRules["borderColor"]["variant === \"primary\" && isHovered"] = "gray-800:hovered";
        } else {
            rules += ' iv18';
            currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
                "default": currentRules["borderColor"]
            };
            currentRules["borderColor"]["variant === \"primary\""] = "gray-800";
        }
    }
    if (props.isDisabled) {
        rules += ' ilOVIhfcYMPQu18';
        currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
            "default": currentRules["borderColor"]
        };
        currentRules["borderColor"]["forcedColors && isDisabled"] = "GrayText";
    } else if (props.isHovered) {
        rules += ' ilOVIhfcebS7sd18';
        currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
            "default": currentRules["borderColor"]
        };
        currentRules["borderColor"]["forcedColors && isHovered"] = "Highlight";
    } else {
        rules += ' ilOVIhfcCp4usd18';
        currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
            "default": currentRules["borderColor"]
        };
        currentRules["borderColor"]["forcedColors"] = "ButtonBorder";
    }
    if (props.isDisabled) {
        rules += ' ilOVIhfcYMPQu18';
        currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
            "default": currentRules["borderColor"]
        };
        currentRules["borderColor"]["isDisabled && :is([data-hcm], [data-hcm] *)"] = "GrayText";
    } else if (props.isHovered) {
        rules += ' ilOVIhfcebS7sd18';
        currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
            "default": currentRules["borderColor"]
        };
        currentRules["borderColor"]["isHovered && :is([data-hcm], [data-hcm] *)"] = "Highlight";
    } else {
        rules += ' ilOVIhfcCp4usd18';
        currentRules["borderColor"] = typeof currentRules["borderColor"] === 'object' ? currentRules["borderColor"] : {
            "default": currentRules["borderColor"]
        };
        currentRules["borderColor"][":is([data-hcm], [data-hcm] *)"] = "ButtonBorder";
    }
    rules += ' gqMFGYc18';
    rules += ' -_8sjo0b-t5ZbAob18';
    currentRules["--iconPrimary"] = "currentColor";
    rules += ' _yb18';
    currentRules["forcedColorAdjust"] = "none";
    rules += ' __ca18';
    currentRules["disableTapHighlight"] = true;
    if (props.size === "XL") {
        rules += ' -M_-MBaYFfc18';
        currentRules["minHeight"] = typeof currentRules["minHeight"] === 'object' ? currentRules["minHeight"] : {
            "default": currentRules["minHeight"]
        };
        currentRules["minHeight"]["size === \"XL\""] = 48;
    } else if (props.size === "L") {
        rules += ' -M_-M3JjxG18';
        currentRules["minHeight"] = typeof currentRules["minHeight"] === 'object' ? currentRules["minHeight"] : {
            "default": currentRules["minHeight"]
        };
        currentRules["minHeight"]["size === \"L\""] = 40;
    } else if (props.size === "S") {
        rules += ' -M_-MCe2o8c18';
        currentRules["minHeight"] = typeof currentRules["minHeight"] === 'object' ? currentRules["minHeight"] : {
            "default": currentRules["minHeight"]
        };
        currentRules["minHeight"]["size === \"S\""] = 24;
    } else if (props.size === "XS") {
        rules += ' -M_-MifsFYc18';
        currentRules["minHeight"] = typeof currentRules["minHeight"] === 'object' ? currentRules["minHeight"] : {
            "default": currentRules["minHeight"]
        };
        currentRules["minHeight"]["size === \"XS\""] = 20;
    } else {
        rules += ' -M_-M4dY0ec18';
        currentRules["minHeight"] = 32;
    }
    if (props.variant === "genai") {
        rules += ' -_k_-_ka18';
        currentRules["borderTopWidth"] = typeof currentRules["borderTopWidth"] === 'object' ? currentRules["borderTopWidth"] : {
            "default": currentRules["borderTopWidth"]
        };
        currentRules["borderTopWidth"]["variant === \"genai\""] = 0;
    } else if (props.variant === "premium") {
        rules += ' -_k_-_ka18';
        currentRules["borderTopWidth"] = typeof currentRules["borderTopWidth"] === 'object' ? currentRules["borderTopWidth"] : {
            "default": currentRules["borderTopWidth"]
        };
        currentRules["borderTopWidth"]["variant === \"premium\""] = 0;
    } else if (props.fillStyle === "outline") {
        rules += ' -_k_-_kc18';
        currentRules["borderTopWidth"] = typeof currentRules["borderTopWidth"] === 'object' ? currentRules["borderTopWidth"] : {
            "default": currentRules["borderTopWidth"]
        };
        currentRules["borderTopWidth"]["fillStyle === \"outline\""] = 2;
    } else if (props.fillStyle === "fill") {
        rules += ' -_k_-_ka18';
        currentRules["borderTopWidth"] = typeof currentRules["borderTopWidth"] === 'object' ? currentRules["borderTopWidth"] : {
            "default": currentRules["borderTopWidth"]
        };
        currentRules["borderTopWidth"]["fillStyle === \"fill\""] = 0;
    }
    if (props.variant === "genai") {
        rules += ' -h_-ha18';
        currentRules["borderBottomWidth"] = typeof currentRules["borderBottomWidth"] === 'object' ? currentRules["borderBottomWidth"] : {
            "default": currentRules["borderBottomWidth"]
        };
        currentRules["borderBottomWidth"]["variant === \"genai\""] = 0;
    } else if (props.variant === "premium") {
        rules += ' -h_-ha18';
        currentRules["borderBottomWidth"] = typeof currentRules["borderBottomWidth"] === 'object' ? currentRules["borderBottomWidth"] : {
            "default": currentRules["borderBottomWidth"]
        };
        currentRules["borderBottomWidth"]["variant === \"premium\""] = 0;
    } else if (props.fillStyle === "outline") {
        rules += ' -h_-hc18';
        currentRules["borderBottomWidth"] = typeof currentRules["borderBottomWidth"] === 'object' ? currentRules["borderBottomWidth"] : {
            "default": currentRules["borderBottomWidth"]
        };
        currentRules["borderBottomWidth"]["fillStyle === \"outline\""] = 2;
    } else if (props.fillStyle === "fill") {
        rules += ' -h_-ha18';
        currentRules["borderBottomWidth"] = typeof currentRules["borderBottomWidth"] === 'object' ? currentRules["borderBottomWidth"] : {
            "default": currentRules["borderBottomWidth"]
        };
        currentRules["borderBottomWidth"]["fillStyle === \"fill\""] = 0;
    }
    if (props.isStaticColor) {
        if (props.fillStyle === "outline") {
            if (props.isDisabled) {
                if (props.variant === "genai") {
                    rules += ' -g_-gf18';
                    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                        "default": currentRules["backgroundColor"]
                    };
                    currentRules["backgroundColor"]["isStaticColor && fillStyle === \"outline\" && isDisabled && variant === \"genai\""] = "transparent-overlay-100";
                } else if (props.variant === "premium") {
                    rules += ' -g_-gf18';
                    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                        "default": currentRules["backgroundColor"]
                    };
                    currentRules["backgroundColor"]["isStaticColor && fillStyle === \"outline\" && isDisabled && variant === \"premium\""] = "transparent-overlay-100";
                } else {
                    rules += ' -g_-g918';
                    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                        "default": currentRules["backgroundColor"]
                    };
                    currentRules["backgroundColor"]["isStaticColor && fillStyle === \"outline\" && isDisabled"] = "transparent";
                }
            } else if (props.isFocusVisible) {
                rules += ' -g_-gf18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["isStaticColor && fillStyle === \"outline\" && isFocusVisible"] = "transparent-overlay-100";
            } else if (props.isPressed) {
                rules += ' -g_-gf18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["isStaticColor && fillStyle === \"outline\" && isPressed"] = "transparent-overlay-100";
            } else if (props.isHovered) {
                rules += ' -g_-gf18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["isStaticColor && fillStyle === \"outline\" && isHovered"] = "transparent-overlay-100";
            } else if (props.variant === "genai") {
                rules += ' -g_-gf18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["isStaticColor && fillStyle === \"outline\" && variant === \"genai\""] = "transparent-overlay-100";
            } else if (props.variant === "premium") {
                rules += ' -g_-gf18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["isStaticColor && fillStyle === \"outline\" && variant === \"premium\""] = "transparent-overlay-100";
            } else {
                rules += ' -g_-g918';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["isStaticColor && fillStyle === \"outline\""] = "transparent";
            }
        } else if (props.fillStyle === "fill") {
            if (props.isDisabled) {
                rules += ' -g_-gf18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["isStaticColor && fillStyle === \"fill\" && isDisabled"] = "transparent-overlay-100";
            } else if (props.variant === "genai") {
                rules += ' -g_-gf18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["isStaticColor && fillStyle === \"fill\" && variant === \"genai\""] = "transparent-overlay-100";
            } else if (props.variant === "premium") {
                rules += ' -g_-gf18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["isStaticColor && fillStyle === \"fill\" && variant === \"premium\""] = "transparent-overlay-100";
            } else if (props.variant === "secondary") {
                if (props.isPressed) {
                    rules += ' -g_-gg18';
                    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                        "default": currentRules["backgroundColor"]
                    };
                    currentRules["backgroundColor"]["isStaticColor && fillStyle === \"fill\" && variant === \"secondary\" && isPressed"] = "transparent-overlay-100:pressed";
                } else if (props.isFocusVisible) {
                    rules += ' -g_-gg18';
                    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                        "default": currentRules["backgroundColor"]
                    };
                    currentRules["backgroundColor"]["isStaticColor && fillStyle === \"fill\" && variant === \"secondary\" && isFocusVisible"] = "transparent-overlay-100:focused";
                } else if (props.isHovered) {
                    rules += ' -g_-gg18';
                    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                        "default": currentRules["backgroundColor"]
                    };
                    currentRules["backgroundColor"]["isStaticColor && fillStyle === \"fill\" && variant === \"secondary\" && isHovered"] = "transparent-overlay-100:hovered";
                } else {
                    rules += ' -g_-gf18';
                    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                        "default": currentRules["backgroundColor"]
                    };
                    currentRules["backgroundColor"]["isStaticColor && fillStyle === \"fill\" && variant === \"secondary\""] = "transparent-overlay-100";
                }
            } else if (props.variant === "primary") {
                if (props.isPressed) {
                    rules += ' -g_-gj18';
                    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                        "default": currentRules["backgroundColor"]
                    };
                    currentRules["backgroundColor"]["isStaticColor && fillStyle === \"fill\" && variant === \"primary\" && isPressed"] = "transparent-overlay-800:pressed";
                } else if (props.isFocusVisible) {
                    rules += ' -g_-gj18';
                    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                        "default": currentRules["backgroundColor"]
                    };
                    currentRules["backgroundColor"]["isStaticColor && fillStyle === \"fill\" && variant === \"primary\" && isFocusVisible"] = "transparent-overlay-800:focused";
                } else if (props.isHovered) {
                    rules += ' -g_-gj18';
                    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                        "default": currentRules["backgroundColor"]
                    };
                    currentRules["backgroundColor"]["isStaticColor && fillStyle === \"fill\" && variant === \"primary\" && isHovered"] = "transparent-overlay-800:hovered";
                } else {
                    rules += ' -g_-gi18';
                    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                        "default": currentRules["backgroundColor"]
                    };
                    currentRules["backgroundColor"]["isStaticColor && fillStyle === \"fill\" && variant === \"primary\""] = "transparent-overlay-800";
                }
            }
        }
    } else if (props.fillStyle === "outline") {
        if (props.isDisabled) {
            if (props.variant === "genai") {
                rules += ' -g_-gH18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["fillStyle === \"outline\" && isDisabled && variant === \"genai\""] = "gray-100";
            } else if (props.variant === "premium") {
                rules += ' -g_-gH18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["fillStyle === \"outline\" && isDisabled && variant === \"premium\""] = "gray-100";
            } else {
                rules += ' -g_-g918';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["fillStyle === \"outline\" && isDisabled"] = "transparent";
            }
        } else if (props.isFocusVisible) {
            rules += ' -g_-gH18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["fillStyle === \"outline\" && isFocusVisible"] = "gray-100";
        } else if (props.isPressed) {
            rules += ' -g_-gH18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["fillStyle === \"outline\" && isPressed"] = "gray-100";
        } else if (props.isHovered) {
            rules += ' -g_-gH18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["fillStyle === \"outline\" && isHovered"] = "gray-100";
        } else if (props.variant === "genai") {
            rules += ' -g_-gH18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["fillStyle === \"outline\" && variant === \"genai\""] = "gray-100";
        } else if (props.variant === "premium") {
            rules += ' -g_-gH18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["fillStyle === \"outline\" && variant === \"premium\""] = "gray-100";
        } else {
            rules += ' -g_-g918';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["fillStyle === \"outline\""] = "transparent";
        }
    } else if (props.fillStyle === "fill") {
        if (props.isDisabled) {
            rules += ' -g_-gH18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["fillStyle === \"fill\" && isDisabled"] = "disabled";
        } else if (props.variant === "genai") {
            rules += ' -g_-gH18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["fillStyle === \"fill\" && variant === \"genai\""] = "gray-100";
        } else if (props.variant === "premium") {
            rules += ' -g_-gH18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["fillStyle === \"fill\" && variant === \"premium\""] = "gray-100";
        } else if (props.variant === "negative") {
            if (props.isFocusVisible) {
                rules += ' -g_-gYvV9s18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["fillStyle === \"fill\" && variant === \"negative\" && isFocusVisible"] = "[light-dark(light-dark(rgb(183, 40, 24), rgb(255, 103, 86)), light-dark(rgb(255, 118, 101), rgb(177, 38, 23)))]";
            } else if (props.isPressed) {
                rules += ' -g_-gYvV9s18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["fillStyle === \"fill\" && variant === \"negative\" && isPressed"] = "[light-dark(light-dark(rgb(183, 40, 24), rgb(255, 103, 86)), light-dark(rgb(255, 118, 101), rgb(177, 38, 23)))]";
            } else if (props.isHovered) {
                rules += ' -g_-gYvV9s18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["fillStyle === \"fill\" && variant === \"negative\" && isHovered"] = "[light-dark(light-dark(rgb(183, 40, 24), rgb(255, 103, 86)), light-dark(rgb(255, 118, 101), rgb(177, 38, 23)))]";
            } else {
                rules += ' -g_-g7aei818';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["fillStyle === \"fill\" && variant === \"negative\""] = "[light-dark(light-dark(rgb(215, 50, 32), rgb(252, 67, 46)), light-dark(rgb(255, 81, 61), rgb(205, 46, 29)))]";
            }
        } else if (props.variant === "accent") {
            if (props.isFocusVisible) {
                rules += ' -g_-gUgARdd18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["fillStyle === \"fill\" && variant === \"accent\" && isFocusVisible"] = "[light-dark(light-dark(rgb(39, 77, 234), rgb(105, 149, 254)), light-dark(rgb(114, 158, 253), rgb(37, 73, 229)))]";
            } else if (props.isPressed) {
                rules += ' -g_-gUgARdd18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["fillStyle === \"fill\" && variant === \"accent\" && isPressed"] = "[light-dark(light-dark(rgb(39, 77, 234), rgb(105, 149, 254)), light-dark(rgb(114, 158, 253), rgb(37, 73, 229)))]";
            } else if (props.isHovered) {
                rules += ' -g_-gUgARdd18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["fillStyle === \"fill\" && variant === \"accent\" && isHovered"] = "[light-dark(light-dark(rgb(39, 77, 234), rgb(105, 149, 254)), light-dark(rgb(114, 158, 253), rgb(37, 73, 229)))]";
            } else {
                rules += ' -g_-g5qAiPc18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["fillStyle === \"fill\" && variant === \"accent\""] = "[light-dark(light-dark(rgb(59, 99, 251), rgb(86, 129, 255)), light-dark(rgb(93, 137, 255), rgb(52, 91, 248)))]";
            }
        } else if (props.variant === "secondary") {
            if (props.isPressed) {
                rules += ' -g_-gF18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["fillStyle === \"fill\" && variant === \"secondary\" && isPressed"] = "gray-100:pressed";
            } else if (props.isFocusVisible) {
                rules += ' -g_-gF18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["fillStyle === \"fill\" && variant === \"secondary\" && isFocusVisible"] = "gray-100:focused";
            } else if (props.isHovered) {
                rules += ' -g_-gF18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["fillStyle === \"fill\" && variant === \"secondary\" && isHovered"] = "gray-100:hovered";
            } else {
                rules += ' -g_-gH18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["fillStyle === \"fill\" && variant === \"secondary\""] = "gray-100";
            }
        } else if (props.variant === "primary") {
            if (props.isPressed) {
                rules += ' -g_-gu18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["fillStyle === \"fill\" && variant === \"primary\" && isPressed"] = "neutral:pressed";
            } else if (props.isFocusVisible) {
                rules += ' -g_-gu18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["fillStyle === \"fill\" && variant === \"primary\" && isFocusVisible"] = "neutral:focused";
            } else if (props.isHovered) {
                rules += ' -g_-gu18';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["fillStyle === \"fill\" && variant === \"primary\" && isHovered"] = "neutral:hovered";
            } else {
                rules += ' -g_-g018';
                currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                    "default": currentRules["backgroundColor"]
                };
                currentRules["backgroundColor"]["fillStyle === \"fill\" && variant === \"primary\""] = "neutral";
            }
        }
    }
    if (props.fillStyle === "outline") {
        rules += ' -g_-lOVIhfcg8qxrJ18';
        currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
            "default": currentRules["backgroundColor"]
        };
        currentRules["backgroundColor"]["forcedColors && fillStyle === \"outline\""] = "ButtonFace";
    } else if (props.fillStyle === "fill") {
        if (props.isDisabled) {
            rules += ' -g_-lOVIhfcgYMPQu18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["forcedColors && fillStyle === \"fill\" && isDisabled"] = "GrayText";
        } else if (props.isHovered) {
            rules += ' -g_-lOVIhfcgebS7sd18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["forcedColors && fillStyle === \"fill\" && isHovered"] = "Highlight";
        } else {
            rules += ' -g_-lOVIhfcg6LxY918';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["forcedColors && fillStyle === \"fill\""] = "ButtonText";
        }
    }
    if (props.fillStyle === "outline") {
        rules += ' -g_-lOVIhfcg8qxrJ18';
        currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
            "default": currentRules["backgroundColor"]
        };
        currentRules["backgroundColor"]["fillStyle === \"outline\" && :is([data-hcm], [data-hcm] *)"] = "ButtonFace";
    } else if (props.fillStyle === "fill") {
        if (props.isDisabled) {
            rules += ' -g_-lOVIhfcgYMPQu18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["fillStyle === \"fill\" && isDisabled && :is([data-hcm], [data-hcm] *)"] = "GrayText";
        } else if (props.isHovered) {
            rules += ' -g_-lOVIhfcgebS7sd18';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["fillStyle === \"fill\" && isHovered && :is([data-hcm], [data-hcm] *)"] = "Highlight";
        } else {
            rules += ' -g_-lOVIhfcg6LxY918';
            currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
                "default": currentRules["backgroundColor"]
            };
            currentRules["backgroundColor"]["fillStyle === \"fill\" && :is([data-hcm], [data-hcm] *)"] = "ButtonText";
        }
    }
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Button.native.js:43:15";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Button.native.js:43:15"
        };
    }
    return rules;
};
// Put the gradient background on a separate element from the button to work around a Safari
// bug where transitions of custom properties cause layout flickering if any properties use rems. 🤣
// https://bugs.webkit.org/show_bug.cgi?id=285622
const $eab50ea25d9ba632$var$gradient = function anonymous(props) {
    let rules = " ", currentRules = {};
    rules += ' _Pa18';
    currentRules["position"] = "absolute";
    rules += ' Wr18';
    currentRules["top"] = 0;
    rules += ' _lr18';
    currentRules["bottom"] = 0;
    rules += ' _Ar18';
    currentRules["insetStart"] = 0;
    rules += ' _zr18';
    currentRules["insetEnd"] = 0;
    rules += ' _9a18';
    currentRules["zIndex"] = -1;
    rules += ' Yd18';
    currentRules["transition"] = "default";
    rules += ' Xb18';
    currentRules["transitionDuration"] = 150;
    rules += ' _2b18';
    currentRules["transitionTimingFunction"] = "default";
    rules += ' oi18';
    currentRules["borderTopStartRadius"] = "inherit";
    rules += ' ni18';
    currentRules["borderTopEndRadius"] = "inherit";
    rules += ' ki18';
    currentRules["borderBottomStartRadius"] = "inherit";
    rules += ' ji18';
    currentRules["borderBottomEndRadius"] = "inherit";
    if (props.isDisabled) {
        rules += ' _ic18';
        currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
            "default": currentRules["backgroundImage"]
        };
        currentRules["backgroundImage"]["isDisabled"] = "none";
    } else if (props.variant === "genai") {
        if (props.isFocusVisible) {
            rules += ' _ia18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"genai\" && isFocusVisible"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "red-1000",
                            0
                        ],
                        [
                            "magenta-1000",
                            33
                        ],
                        [
                            "indigo-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -yBNtrc-37ZLpd18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"genai\" && isFocusVisible"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "red-1000",
                            0
                        ],
                        [
                            "magenta-1000",
                            33
                        ],
                        [
                            "indigo-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -zBNtrc-plLfSc18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"genai\" && isFocusVisible"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "red-1000",
                            0
                        ],
                        [
                            "magenta-1000",
                            33
                        ],
                        [
                            "indigo-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -ABNtrc-z2bZib18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"genai\" && isFocusVisible"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "red-1000",
                            0
                        ],
                        [
                            "magenta-1000",
                            33
                        ],
                        [
                            "indigo-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -ACNtrc-tQ56Od18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"genai\" && isFocusVisible"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "red-1000",
                            0
                        ],
                        [
                            "magenta-1000",
                            33
                        ],
                        [
                            "indigo-1000",
                            100
                        ]
                    ]
                }
            ];
        } else if (props.isPressed) {
            rules += ' _ia18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"genai\" && isPressed"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "red-1000",
                            0
                        ],
                        [
                            "magenta-1000",
                            33
                        ],
                        [
                            "indigo-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -yBNtrc-37ZLpd18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"genai\" && isPressed"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "red-1000",
                            0
                        ],
                        [
                            "magenta-1000",
                            33
                        ],
                        [
                            "indigo-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -zBNtrc-plLfSc18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"genai\" && isPressed"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "red-1000",
                            0
                        ],
                        [
                            "magenta-1000",
                            33
                        ],
                        [
                            "indigo-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -ABNtrc-z2bZib18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"genai\" && isPressed"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "red-1000",
                            0
                        ],
                        [
                            "magenta-1000",
                            33
                        ],
                        [
                            "indigo-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -ACNtrc-tQ56Od18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"genai\" && isPressed"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "red-1000",
                            0
                        ],
                        [
                            "magenta-1000",
                            33
                        ],
                        [
                            "indigo-1000",
                            100
                        ]
                    ]
                }
            ];
        } else if (props.isHovered) {
            rules += ' _ia18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"genai\" && isHovered"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "red-1000",
                            0
                        ],
                        [
                            "magenta-1000",
                            33
                        ],
                        [
                            "indigo-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -yBNtrc-37ZLpd18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"genai\" && isHovered"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "red-1000",
                            0
                        ],
                        [
                            "magenta-1000",
                            33
                        ],
                        [
                            "indigo-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -zBNtrc-plLfSc18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"genai\" && isHovered"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "red-1000",
                            0
                        ],
                        [
                            "magenta-1000",
                            33
                        ],
                        [
                            "indigo-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -ABNtrc-z2bZib18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"genai\" && isHovered"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "red-1000",
                            0
                        ],
                        [
                            "magenta-1000",
                            33
                        ],
                        [
                            "indigo-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -ACNtrc-tQ56Od18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"genai\" && isHovered"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "red-1000",
                            0
                        ],
                        [
                            "magenta-1000",
                            33
                        ],
                        [
                            "indigo-1000",
                            100
                        ]
                    ]
                }
            ];
        } else {
            rules += ' _ia18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"genai\""] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "red-900",
                            0
                        ],
                        [
                            "magenta-900",
                            33
                        ],
                        [
                            "indigo-900",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -yBNtrc-Nitqwc18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"genai\""] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "red-900",
                            0
                        ],
                        [
                            "magenta-900",
                            33
                        ],
                        [
                            "indigo-900",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -zBNtrc-ugAmz18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"genai\""] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "red-900",
                            0
                        ],
                        [
                            "magenta-900",
                            33
                        ],
                        [
                            "indigo-900",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -ABNtrc-j7ulPc18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"genai\""] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "red-900",
                            0
                        ],
                        [
                            "magenta-900",
                            33
                        ],
                        [
                            "indigo-900",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -ACNtrc-tQ56Od18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"genai\""] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "red-900",
                            0
                        ],
                        [
                            "magenta-900",
                            33
                        ],
                        [
                            "indigo-900",
                            100
                        ]
                    ]
                }
            ];
        }
    } else if (props.variant === "premium") {
        if (props.isFocusVisible) {
            rules += ' _ib18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"premium\" && isFocusVisible"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "fuchsia-1000",
                            0
                        ],
                        [
                            "indigo-1000",
                            66
                        ],
                        [
                            "blue-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -yBNtrc-1gYRFc18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"premium\" && isFocusVisible"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "fuchsia-1000",
                            0
                        ],
                        [
                            "indigo-1000",
                            66
                        ],
                        [
                            "blue-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -zBNtrc-z2bZib18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"premium\" && isFocusVisible"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "fuchsia-1000",
                            0
                        ],
                        [
                            "indigo-1000",
                            66
                        ],
                        [
                            "blue-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -ABNtrc-BorWLb18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"premium\" && isFocusVisible"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "fuchsia-1000",
                            0
                        ],
                        [
                            "indigo-1000",
                            66
                        ],
                        [
                            "blue-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -ACNtrc-tQ56Od18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"premium\" && isFocusVisible"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "fuchsia-1000",
                            0
                        ],
                        [
                            "indigo-1000",
                            66
                        ],
                        [
                            "blue-1000",
                            100
                        ]
                    ]
                }
            ];
        } else if (props.isPressed) {
            rules += ' _ib18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"premium\" && isPressed"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "fuchsia-1000",
                            0
                        ],
                        [
                            "indigo-1000",
                            66
                        ],
                        [
                            "blue-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -yBNtrc-1gYRFc18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"premium\" && isPressed"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "fuchsia-1000",
                            0
                        ],
                        [
                            "indigo-1000",
                            66
                        ],
                        [
                            "blue-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -zBNtrc-z2bZib18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"premium\" && isPressed"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "fuchsia-1000",
                            0
                        ],
                        [
                            "indigo-1000",
                            66
                        ],
                        [
                            "blue-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -ABNtrc-BorWLb18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"premium\" && isPressed"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "fuchsia-1000",
                            0
                        ],
                        [
                            "indigo-1000",
                            66
                        ],
                        [
                            "blue-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -ACNtrc-tQ56Od18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"premium\" && isPressed"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "fuchsia-1000",
                            0
                        ],
                        [
                            "indigo-1000",
                            66
                        ],
                        [
                            "blue-1000",
                            100
                        ]
                    ]
                }
            ];
        } else if (props.isHovered) {
            rules += ' _ib18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"premium\" && isHovered"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "fuchsia-1000",
                            0
                        ],
                        [
                            "indigo-1000",
                            66
                        ],
                        [
                            "blue-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -yBNtrc-1gYRFc18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"premium\" && isHovered"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "fuchsia-1000",
                            0
                        ],
                        [
                            "indigo-1000",
                            66
                        ],
                        [
                            "blue-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -zBNtrc-z2bZib18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"premium\" && isHovered"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "fuchsia-1000",
                            0
                        ],
                        [
                            "indigo-1000",
                            66
                        ],
                        [
                            "blue-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -ABNtrc-BorWLb18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"premium\" && isHovered"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "fuchsia-1000",
                            0
                        ],
                        [
                            "indigo-1000",
                            66
                        ],
                        [
                            "blue-1000",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -ACNtrc-tQ56Od18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"premium\" && isHovered"] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "fuchsia-1000",
                            0
                        ],
                        [
                            "indigo-1000",
                            66
                        ],
                        [
                            "blue-1000",
                            100
                        ]
                    ]
                }
            ];
        } else {
            rules += ' _ib18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"premium\""] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "fuchsia-900",
                            0
                        ],
                        [
                            "indigo-900",
                            66
                        ],
                        [
                            "blue-900",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -yBNtrc-X7W3Sb18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"premium\""] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "fuchsia-900",
                            0
                        ],
                        [
                            "indigo-900",
                            66
                        ],
                        [
                            "blue-900",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -zBNtrc-j7ulPc18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"premium\""] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "fuchsia-900",
                            0
                        ],
                        [
                            "indigo-900",
                            66
                        ],
                        [
                            "blue-900",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -ABNtrc-fHZGqb18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"premium\""] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "fuchsia-900",
                            0
                        ],
                        [
                            "indigo-900",
                            66
                        ],
                        [
                            "blue-900",
                            100
                        ]
                    ]
                }
            ];
            rules += ' -ACNtrc-tQ56Od18';
            currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
                "default": currentRules["backgroundImage"]
            };
            currentRules["backgroundImage"]["variant === \"premium\""] = [
                {
                    "type": "linear-gradient",
                    "angle": "to bottom right",
                    "stops": [
                        [
                            "fuchsia-900",
                            0
                        ],
                        [
                            "indigo-900",
                            66
                        ],
                        [
                            "blue-900",
                            100
                        ]
                    ]
                }
            ];
        }
    }
    rules += ' _ilOVIhfcc18';
    currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
        "default": currentRules["backgroundImage"]
    };
    currentRules["backgroundImage"]["forcedColors"] = "none";
    rules += ' _ilOVIhfcc18';
    currentRules["backgroundImage"] = typeof currentRules["backgroundImage"] === 'object' ? currentRules["backgroundImage"] : {
        "default": currentRules["backgroundImage"]
    };
    currentRules["backgroundImage"][":is([data-hcm], [data-hcm] *)"] = "none";
    if (props.variant === "genai") {
        rules += ' _pb18';
        currentRules["colorScheme"] = typeof currentRules["colorScheme"] === 'object' ? currentRules["colorScheme"] : {
            "default": currentRules["colorScheme"]
        };
        currentRules["colorScheme"]["variant === \"genai\""] = "light";
    } else if (props.variant === "premium") {
        rules += ' _pb18';
        currentRules["colorScheme"] = typeof currentRules["colorScheme"] === 'object' ? currentRules["colorScheme"] : {
            "default": currentRules["colorScheme"]
        };
        currentRules["colorScheme"]["variant === \"premium\""] = "light";
    }
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Button.native.js:252:17";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Button.native.js:252:17"
        };
    }
    return rules;
};
function $eab50ea25d9ba632$export$edc9ced5c3e5ff00(isPending) {
    let [isProgressVisible, setIsProgressVisible] = (0, $3RlMb$createSignal)(false);
    (0, $3RlMb$createEffect)(()=>typeof isPending === 'function' ? isPending() : isPending, (pending)=>{
        let timeout;
        if (pending) timeout = setTimeout(()=>{
            setIsProgressVisible(true);
        }, 1000);
        else // oxlint-disable-next-line react/react-compiler
        setIsProgressVisible(false);
        (0, $3RlMb$onCleanup)(()=>{
            clearTimeout(timeout);
        });
    });
    return {
        get isProgressVisible () {
            return isProgressVisible();
        }
    };
}
function $eab50ea25d9ba632$export$353f5b6fc5456de1(inputProps) {
    // oxlint-disable-next-line react/react-compiler
    let [props1, ref] = (0, $1NDEx.useSpectrumContextProps)(inputProps, inputProps.ref, $eab50ea25d9ba632$export$24d547caef80ccd1);
    props1 = (0, $5gcT0.useFormProps)(props1);
    let stringFormatter = (0, $jeZsY.useLocalizedStringFormatter)((0, $dBSpv.default), '@react-spectrum/s2');
    let isPending = ()=>props1.isPending ?? false;
    let variant = ()=>props1.variant ?? 'primary';
    let fillStyle = ()=>props1.fillStyle ?? 'fill';
    let size = ()=>props1.size ?? 'M';
    let domRef = (0, $eXdQ3.useFocusableRef)(ref);
    let overlayTriggerState = (0, $3RlMb$useContext)((0, $6tJ0n.OverlayTriggerStateContext));
    let pendingState = $eab50ea25d9ba632$export$edc9ced5c3e5ff00(isPending);
    // oxlint-disable react/react-compiler
    return (0, $3RlMb$createComponent)((0, $2ZmcB.Button), (0, $3RlMb$mergeProps)(props1, {
        ref: (value)=>{
            domRef.current = value;
        },
        get style () {
            return (0, $5seyF.pressScale)(domRef, props1.UNSAFE_style);
        },
        className: (renderProps)=>(props1.UNSAFE_className || '') + $eab50ea25d9ba632$var$button({
                ...renderProps,
                // Retain hover styles when an overlay is open.
                isHovered: renderProps.isHovered || overlayTriggerState?.isOpen || false,
                isDisabled: renderProps.isDisabled || pendingState.isProgressVisible,
                variant: variant(),
                fillStyle: fillStyle(),
                size: size(),
                staticColor: props1.staticColor,
                isStaticColor: !!props1.staticColor
            }, props1.styles),
        children: (renderProps)=>[
                (0, $3RlMb$memo)(()=>(0, $3RlMb$memo)(()=>!!(variant() === 'genai' || variant() === 'premium'))() ? (()=>{
                        var _el$ = (0, $3RlMb$getNextElement)($eab50ea25d9ba632$var$_tmpl$);
                        (0, $3RlMb$effect)(()=>(0, $3RlMb$readShallow)($eab50ea25d9ba632$var$gradient({
                                ...renderProps,
                                // Retain hover styles when an overlay is open.
                                isHovered: renderProps.isHovered || overlayTriggerState?.isOpen || false,
                                isDisabled: renderProps.isDisabled || pendingState.isProgressVisible,
                                variant: variant()
                            })), (_v$, _$p)=>{
                            (0, $3RlMb$className)(_el$, _v$, _$p);
                        });
                        return _el$;
                    })() : null),
                (0, $3RlMb$createComponent)((0, $2A4az.Provider), {
                    get values () {
                        return [
                            [
                                (0, $esT6z.SkeletonContext),
                                null
                            ],
                            [
                                (0, $4fCJc.TextContext),
                                {
                                    styles: function anonymous(props) {
                                        let rules = " ", currentRules = {};
                                        rules += ' TAzEcG18';
                                        currentRules["paddingTop"] = "--labelPadding";
                                        rules += ' QAzEcG18';
                                        currentRules["paddingBottom"] = "--labelPadding";
                                        rules += ' _Jb18';
                                        currentRules["order"] = 1;
                                        if (props.isProgressVisible) {
                                            rules += ' _6b18';
                                            currentRules["visibility"] = typeof currentRules["visibility"] === 'object' ? currentRules["visibility"] : {
                                                "default": currentRules["visibility"]
                                            };
                                            currentRules["visibility"]["isProgressVisible"] = "hidden";
                                        }
                                        let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Button.native.js:358:40";
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
                                                loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Button.native.js:358:40"
                                            };
                                        }
                                        return rules;
                                    }({
                                        isProgressVisible: pendingState.isProgressVisible
                                    }),
                                    'data-rsp-slot': 'text'
                                }
                            ],
                            [
                                (0, $9RJLv.IconContext),
                                {
                                    render: (0, $3BNNa.centerBaseline)({
                                        slot: 'icon',
                                        styles: " _Ja18 -macro-static-9u9Suc"
                                    }),
                                    styles: function anonymous(props) {
                                        let rules = " ", currentRules = {};
                                        rules += ' ZObNfn18';
                                        currentRules["width"] = "1lh";
                                        rules += ' FObNfn18';
                                        currentRules["height"] = "1lh";
                                        rules += ' I67logd18';
                                        currentRules["marginStart"] = "--iconMargin";
                                        rules += ' _va18';
                                        currentRules["flexShrink"] = 0;
                                        if (props.isProgressVisible) {
                                            rules += ' _6b18';
                                            currentRules["visibility"] = typeof currentRules["visibility"] === 'object' ? currentRules["visibility"] : {
                                                "default": currentRules["visibility"]
                                            };
                                            currentRules["visibility"]["isProgressVisible"] = "hidden";
                                        }
                                        let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Button.native.js:377:40";
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
                                                loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Button.native.js:377:40"
                                            };
                                        }
                                        return rules;
                                    }({
                                        isProgressVisible: pendingState.isProgressVisible
                                    })
                                }
                            ]
                        ];
                    },
                    get children () {
                        return [
                            (0, $3RlMb$memo)(()=>(0, $3RlMb$memo)(()=>typeof props1.children === 'string')() ? (0, $3RlMb$createComponent)((0, $4fCJc.Text), {
                                    get children () {
                                        return props1.children;
                                    }
                                }) : props1.children),
                            (0, $3RlMb$memo)(()=>(0, $3RlMb$memo)(()=>!!isPending())() ? (()=>{
                                    var _el$2 = (0, $3RlMb$getNextElement)($eab50ea25d9ba632$var$_tmpl$2);
                                    (0, $3RlMb$insert)(_el$2, (0, $3RlMb$createComponent)((0, $gPqiz.ProgressCircle), {
                                        isIndeterminate: true,
                                        get "aria-label" () {
                                            return stringFormatter.format('button.pending');
                                        },
                                        size: "S",
                                        get staticColor () {
                                            return props1.staticColor;
                                        },
                                        get styles () {
                                            return function anonymous(props) {
                                                let rules = " ", currentRules = {};
                                                if (props.size === "XL") {
                                                    rules += ' ZCe2o8c18';
                                                    currentRules["width"] = typeof currentRules["width"] === 'object' ? currentRules["width"] : {
                                                        "default": currentRules["width"]
                                                    };
                                                    currentRules["width"]["size === \"XL\""] = 24;
                                                } else if (props.size === "L") {
                                                    rules += ' ZifsFYc18';
                                                    currentRules["width"] = typeof currentRules["width"] === 'object' ? currentRules["width"] : {
                                                        "default": currentRules["width"]
                                                    };
                                                    currentRules["width"]["size === \"L\""] = 20;
                                                } else if (props.size === "M") {
                                                    rules += ' Zd60gf18';
                                                    currentRules["width"] = typeof currentRules["width"] === 'object' ? currentRules["width"] : {
                                                        "default": currentRules["width"]
                                                    };
                                                    currentRules["width"]["size === \"M\""] = 18;
                                                } else if (props.size === "S") {
                                                    rules += ' ZokSYvd18';
                                                    currentRules["width"] = typeof currentRules["width"] === 'object' ? currentRules["width"] : {
                                                        "default": currentRules["width"]
                                                    };
                                                    currentRules["width"]["size === \"S\""] = 14;
                                                }
                                                if (props.size === "XL") {
                                                    rules += ' FCe2o8c18';
                                                    currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
                                                        "default": currentRules["height"]
                                                    };
                                                    currentRules["height"]["size === \"XL\""] = 24;
                                                } else if (props.size === "L") {
                                                    rules += ' FifsFYc18';
                                                    currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
                                                        "default": currentRules["height"]
                                                    };
                                                    currentRules["height"]["size === \"L\""] = 20;
                                                } else if (props.size === "M") {
                                                    rules += ' Fd60gf18';
                                                    currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
                                                        "default": currentRules["height"]
                                                    };
                                                    currentRules["height"]["size === \"M\""] = 18;
                                                } else if (props.size === "S") {
                                                    rules += ' FokSYvd18';
                                                    currentRules["height"] = typeof currentRules["height"] === 'object' ? currentRules["height"] : {
                                                        "default": currentRules["height"]
                                                    };
                                                    currentRules["height"]["size === \"S\""] = 14;
                                                }
                                                let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Button.native.js:406:43";
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
                                                        loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Button.native.js:406:43"
                                                    };
                                                }
                                                return rules;
                                            }({
                                                size: size()
                                            });
                                        }
                                    }));
                                    (0, $3RlMb$effect)(()=>(0, $3RlMb$readShallow)(function anonymous(props) {
                                            let rules = " ", currentRules = {};
                                            rules += ' _Pa18';
                                            currentRules["position"] = "absolute";
                                            rules += ' WF18';
                                            currentRules["top"] = "50%";
                                            rules += ' _EF18';
                                            currentRules["left"] = "50%";
                                            rules += ' _Zc18';
                                            currentRules["transform"] = "translate(-50%, -50%)";
                                            if (props.isProgressVisible) {
                                                rules += ' _6c18';
                                                currentRules["visibility"] = typeof currentRules["visibility"] === 'object' ? currentRules["visibility"] : {
                                                    "default": currentRules["visibility"]
                                                };
                                                currentRules["visibility"]["isProgressVisible"] = "visible";
                                            } else {
                                                rules += ' _6b18';
                                                currentRules["visibility"] = "hidden";
                                            }
                                            let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Button.native.js:420:57";
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
                                                    loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/build/input/dom/src/Button.native.js:420:57"
                                                };
                                            }
                                            return rules;
                                        }({
                                            isProgressVisible: pendingState.isProgressVisible,
                                            isPending: isPending()
                                        })), (_v$, _$p)=>{
                                        (0, $3RlMb$className)(_el$2, _v$, _$p);
                                    });
                                    return _el$2;
                                })() : isPending())
                        ];
                    }
                })
            ]
    }));
// oxlint-enable react/react-compiler
}
function $eab50ea25d9ba632$export$29d11c0fe2fc51d8(inputProps) {
    // oxlint-disable-next-line react/react-compiler
    let [props, ref] = (0, $1NDEx.useSpectrumContextProps)(inputProps, inputProps.ref, $eab50ea25d9ba632$export$1c1a176f3b9e48d3);
    props = (0, $5gcT0.useFormProps)(props);
    let domRef = (0, $eXdQ3.useFocusableRef)(ref);
    let overlayTriggerState = (0, $3RlMb$useContext)((0, $6tJ0n.OverlayTriggerStateContext));
    let fillStyle = ()=>props.fillStyle ?? 'fill';
    let size = ()=>props.size ?? 'M';
    let variant = ()=>props.variant ?? 'primary';
    // oxlint-disable react/react-compiler
    return (0, $3RlMb$createComponent)((0, $gSanO.Link), (0, $3RlMb$mergeProps)(props, {
        ref: (value)=>{
            domRef.current = value;
        },
        get style () {
            return (0, $5seyF.pressScale)(domRef, props.UNSAFE_style);
        },
        className: (renderProps)=>(props.UNSAFE_className || '') + $eab50ea25d9ba632$var$button({
                ...renderProps,
                // Retain hover styles when an overlay is open.
                isHovered: renderProps.isHovered || overlayTriggerState?.isOpen || false,
                variant: variant(),
                fillStyle: fillStyle(),
                size: size(),
                staticColor: props.staticColor,
                isStaticColor: !!props.staticColor,
                isPending: false
            }, props.styles),
        children: (renderProps)=>[
                (0, $3RlMb$memo)(()=>(0, $3RlMb$memo)(()=>!!(variant() === 'genai' || variant() === 'premium'))() ? (()=>{
                        var _el$3 = (0, $3RlMb$getNextElement)($eab50ea25d9ba632$var$_tmpl$);
                        (0, $3RlMb$effect)(()=>(0, $3RlMb$readShallow)($eab50ea25d9ba632$var$gradient({
                                ...renderProps,
                                // Retain hover styles when an overlay is open.
                                isHovered: renderProps.isHovered || overlayTriggerState?.isOpen || false,
                                variant: variant()
                            })), (_v$, _$p)=>{
                            (0, $3RlMb$className)(_el$3, _v$, _$p);
                        });
                        return _el$3;
                    })() : null),
                (0, $3RlMb$createComponent)((0, $2A4az.Provider), {
                    get values () {
                        return [
                            [
                                (0, $esT6z.SkeletonContext),
                                null
                            ],
                            [
                                (0, $4fCJc.TextContext),
                                {
                                    styles: " TAzEcG18 QAzEcG18 _Jb18 -macro-static-mexTqc",
                                    'data-rsp-slot': 'text'
                                }
                            ],
                            [
                                (0, $9RJLv.IconContext),
                                {
                                    render: (0, $3BNNa.centerBaseline)({
                                        slot: 'icon',
                                        styles: " _Ja18 -macro-static-Pa4Hxc"
                                    }),
                                    styles: " ZObNfn18 FObNfn18 I67logd18 _va18 -macro-static-q0Exm"
                                }
                            ]
                        ];
                    },
                    get children () {
                        return (0, $3RlMb$memo)(()=>typeof props.children === 'string')() ? (0, $3RlMb$createComponent)((0, $4fCJc.Text), {
                            get children () {
                                return props.children;
                            }
                        }) : props.children;
                    }
                })
            ]
    }));
// oxlint-enable react/react-compiler
}

});
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
const $c489be55202de4a6$export$e2509388b49734e7 = (0, $3RlMb$createContext)(null);
function $c489be55202de4a6$export$a6c7ac8248d6e38a(inputProps) {
    let [props, contextRef] = (0, $2A4az.useContextProps)(inputProps, inputProps.ref, $c489be55202de4a6$export$e2509388b49734e7);
    // useContextProps composes renderer refs into a callable attachment handle.
    let ref = (0, $6p9dH.useObjectRef)(contextRef);
    let elementType = ()=>props.href && !props.isDisabled ? 'a' : 'span';
    let { linkProps: linkProps, isPressed: isPressed } = (0, $aUh1K.useLink)((0, $3RlMb$merge)(props, {
        get elementType () {
            return elementType();
        }
    }), ref);
    let ElementType = (0, $3RlMb$dynamic)(()=>(0, $2A4az.dom)[elementType()]);
    let { hoverProps: hoverProps, isHovered: isHovered } = (0, $8k5ge.useHover)(props);
    let { focusProps: focusProps, isFocused: isFocused, isFocusVisible: isFocusVisible } = (0, $9HiNI.useFocusRing)();
    let renderProps = (0, $2A4az.useRenderProps)((0, $3RlMb$merge)((0, $3RlMb$omit)(props, 'render'), {
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
    let DOMProps = (0, $3RlMb$omit)((0, $5gAIA.filterDOMProps)(props, {
        global: true
    }), 'onClick');
    return (0, $3RlMb$createComponent)(ElementType, (0, $3RlMb$mergeProps)({
        ref (r$) {
            var _ref$ = ref;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $3RlMb$applyRef)(_ref$, r$) : ref = r$;
        },
        get slot () {
            return props.slot || undefined;
        }
    }, ()=>(0, $3RlMb$omit)((0, $7boJ2.mergeProps)(DOMProps, renderProps, linkProps, hoverProps, focusProps), 'ref'), {
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
        linkProps: (0, $7boJ2.mergeProps)((0, $3RlMb$omit)(domProps, 'onClick'), routerLinkProps, (0, $3RlMb$omit)(interactionHandlers, 'onClick'), linkProps, {
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






var $kaciT = parcelRequire("kaciT");

var $2w6bN = parcelRequire("2w6bN");

var $4fCJc = parcelRequire("4fCJc");


var $eade49173e37a646$export$73d695ae27330056 = parcelRequire("kaciT").ActionButtonGroup;
var $eade49173e37a646$export$33f5f2f2cb85d743 = parcelRequire("kaciT").ActionButtonGroupContext;
var $1d535efc4bf5a673$export$cfc7921d29ef7b80 = parcelRequire("2w6bN").ActionButton;
var $31869ab78a06e8ab$export$5f1af8db9871e1d6 = parcelRequire("4fCJc").Text;
export {$eade49173e37a646$export$73d695ae27330056 as ActionButtonGroup, $eade49173e37a646$export$33f5f2f2cb85d743 as ActionButtonGroupContext, $1d535efc4bf5a673$export$cfc7921d29ef7b80 as ActionButton, $31869ab78a06e8ab$export$5f1af8db9871e1d6 as Text};
//# sourceMappingURL=ActionButtonGroup.native.js.map
