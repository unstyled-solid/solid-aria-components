import { template as _$template } from "@solidjs/web";
import { createComponent as _$createComponent } from "@solidjs/web";
import { mergeProps as _$mergeProps } from "@solidjs/web";
import { getNextElement as _$getNextElement } from "@solidjs/web";
import { runHydrationEvents as _$runHydrationEvents } from "@solidjs/web";
import { spread as _$spread } from "@solidjs/web";
var _tmpl$ = /*#__PURE__*/ _$template(`<svg><path d=m.15411,4.14619L4.14677.15375c.31502-.315.85364-.09183.85354.35367l-.00079,3.7427c-.00009.41417-.33587.74986-.75004.74984l-3.74186-.00021c-.44545-.00002-.6685-.53859-.35352-.85356Z fill="var(--iconPrimary, #222)">`), _tmpl$2 = /*#__PURE__*/ _$template(`<svg><path d=m.82619,5.14621L5.14704.8256c.31502-.315.85364-.09183.85354.35367l-.00086,4.07089c-.00009.41417-.33587.74986-.75004.74984l-4.06998-.00023c-.44545-.00002-.6685-.53859-.35352-.85356Z fill="var(--iconPrimary, #222)">`), _tmpl$3 = /*#__PURE__*/ _$template(`<svg><path d=m.82095,6.14616L6.1465.82091c.31502-.315.85364-.09183.85354.35367l-.00107,5.07559c-.00009.41417-.33587.74986-.75004.74984l-5.07447-.00028c-.44545-.00002-.6685-.53859-.35352-.85356Z fill="var(--iconPrimary, #222)"stroke-width=0>`), _tmpl$4 = /*#__PURE__*/ _$template(`<svg><path d=m.76379,4.48791L4.48941.76228c.18901-.18901.51219-.05511.51213.2122l-.00069,3.2759c-.00009.41417-.33587.74986-.75004.74984l-3.27491-.00018c-.26726-.00001-.4011-.32315-.21212-.51213Z fill="var(--iconPrimary, #222)">`);
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
import { omit, Switch, Match } from "solid-js";
import { style } from "../style" with { type: 'macro' };
// Native JSX transport of the four adjacent frozen SVG inputs. Geometry and
// attributes are literal source data, not a replacement icon algorithm.
function CornerTriangle_M(props) {
    var _el$ = _$getNextElement(_tmpl$);
    _$spread(_el$, [{
            "width": "5",
            "height": "5",
            "viewBox": "0 0 5 5"
        }, () => omit(props, 'className'), {
            get "class"() {
                return props.className;
            }
        }], true);
    _$runHydrationEvents();
    return _el$;
}
function CornerTriangle_L(props) {
    var _el$2 = _$getNextElement(_tmpl$2);
    _$spread(_el$2, [{
            "width": "6",
            "height": "6",
            "viewBox": "0 0 6 6"
        }, () => omit(props, 'className'), {
            get "class"() {
                return props.className;
            }
        }], true);
    _$runHydrationEvents();
    return _el$2;
}
function CornerTriangle_XL(props) {
    var _el$3 = _$getNextElement(_tmpl$3);
    _$spread(_el$3, [{
            "id": "e",
            "data-name": "ICONS",
            "width": "7",
            "height": "7",
            "viewBox": "0 0 7 7"
        }, () => omit(props, 'className'), {
            get "class"() {
                return props.className;
            }
        }], true);
    _$runHydrationEvents();
    return _el$3;
}
function CornerTriangle_S(props) {
    var _el$4 = _$getNextElement(_tmpl$4);
    _$spread(_el$4, [{
            "width": "5",
            "height": "5",
            "viewBox": "0 0 5 5"
        }, () => omit(props, 'className'), {
            get "class"() {
                return props.className;
            }
        }], true);
    _$runHydrationEvents();
    return _el$4;
}
let styles = style({
    width: {
        size: {
            M: 5,
            L: 6,
            XL: 7,
            S: 5
        }
    },
    height: {
        size: {
            M: 5,
            L: 6,
            XL: 7,
            S: 5
        }
    }
});
export default function CornerTriangle(props) {
    let size = () => props.size ?? 'M';
    let otherProps = omit(props, 'size');
    return _$createComponent(Switch, {
        get children() {
            return [_$createComponent(Match, {
                    get when() {
                        return size() === 'M';
                    },
                    get children() {
                        return _$createComponent(CornerTriangle_M, _$mergeProps(otherProps, {
                            get className() {
                                return (otherProps.className || '') + styles({
                                    size: size()
                                });
                            }
                        }));
                    }
                }), _$createComponent(Match, {
                    get when() {
                        return size() === 'L';
                    },
                    get children() {
                        return _$createComponent(CornerTriangle_L, _$mergeProps(otherProps, {
                            get className() {
                                return (otherProps.className || '') + styles({
                                    size: size()
                                });
                            }
                        }));
                    }
                }), _$createComponent(Match, {
                    get when() {
                        return size() === 'XL';
                    },
                    get children() {
                        return _$createComponent(CornerTriangle_XL, _$mergeProps(otherProps, {
                            get className() {
                                return (otherProps.className || '') + styles({
                                    size: size()
                                });
                            }
                        }));
                    }
                }), _$createComponent(Match, {
                    get when() {
                        return size() === 'S';
                    },
                    get children() {
                        return _$createComponent(CornerTriangle_S, _$mergeProps(otherProps, {
                            get className() {
                                return (otherProps.className || '') + styles({
                                    size: size()
                                });
                            }
                        }));
                    }
                })];
        }
    });
}
