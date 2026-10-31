import "./Divider.native.css";
import {createComponent as $gJMb6$createComponent, mergeProps as $gJMb6$mergeProps, applyRef as $gJMb6$applyRef} from "@solidjs/web";
import {createContext as $gJMb6$createContext, untrack as $gJMb6$untrack} from "solid-js";
import {Separator as $gJMb6$Separator} from "react-aria-components/Separator";
import {useDOMRef as $gJMb6$useDOMRef} from "./useDOMRef";
import {useSpectrumContextProps as $gJMb6$useSpectrumContextProps} from "./useSpectrumContextProps";






const $51486837c8a5ad54$export$30fbfd376abdf190 = (0, $gJMb6$createContext)(null);
const $51486837c8a5ad54$export$e8c9778bf415dd08 = function anonymous(props, overrides) {
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
    rules += ' gl_a18';
    currentRules["backgroundColor"] = typeof currentRules["backgroundColor"] === 'object' ? currentRules["backgroundColor"] : {
        "default": currentRules["backgroundColor"]
    };
    currentRules["backgroundColor"]["forcedColors"] = "ButtonBorder";
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
    if (!marginTop) rules += ' Jy18';
    currentRules["marginTop"] = 0;
    if (!marginBottom) rules += ' Gy18';
    currentRules["marginBottom"] = 0;
    if (!marginInlineStart) rules += ' Iy18';
    currentRules["marginStart"] = 0;
    if (!marginInlineEnd) rules += ' Hy18';
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
    let targetRules = rules + "/Users/avi/avir-oss/solid-aria-components/scripts/docs/macros/parcel-input/dom/Divider.native.js:11:23";
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
            loc: "/Users/avi/avir-oss/solid-aria-components/scripts/docs/macros/parcel-input/dom/Divider.native.js:11:23"
        };
    }
    return rules;
};
function $51486837c8a5ad54$export$2e0a83ec2e27ecbb(inputProps) {
    let [props, ref] = (0, $gJMb6$useSpectrumContextProps)(inputProps, (0, $gJMb6$untrack)(()=>inputProps.ref), $51486837c8a5ad54$export$30fbfd376abdf190);
    let domRef = (0, $gJMb6$useDOMRef)(ref);
    return (0, $gJMb6$createComponent)((0, $gJMb6$Separator), (0, $gJMb6$mergeProps)(props, {
        ref (r$) {
            var _ref$ = domRef;
            typeof _ref$ === "function" || Array.isArray(_ref$) ? (0, $gJMb6$applyRef)(_ref$, r$) : domRef = r$;
        },
        get style () {
            return props.UNSAFE_style;
        },
        get className () {
            return (props.UNSAFE_className || '') + $51486837c8a5ad54$export$e8c9778bf415dd08({
                size: props.size || 'M',
                orientation: props.orientation || 'horizontal',
                staticColor: props.staticColor,
                isStaticColor: !!props.staticColor
            }, props.styles);
        }
    }));
}


export {$51486837c8a5ad54$export$30fbfd376abdf190 as DividerContext, $51486837c8a5ad54$export$e8c9778bf415dd08 as divider, $51486837c8a5ad54$export$2e0a83ec2e27ecbb as Divider};
//# sourceMappingURL=Divider.native.js.map
