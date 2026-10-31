/*#__PURE__*/ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "hideNav", ()=>hideNav);
parcelHelpers.export(exports, "isSubpage", ()=>isSubpage);
parcelHelpers.export(exports, "section", ()=>section);
parcelHelpers.export(exports, "keywords", ()=>keywords);
parcelHelpers.export(exports, "description", ()=>description);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _layout = require("../../../src/Layout");
var _exampleApp = require("../../../src/ExampleApp");
var _componentCard = require("../../../src/ComponentCard");
const MDXLayout = (0, _layout.Layout);
const hideNav = true;
const isSubpage = true;
const section = 'Examples';
const keywords = [
    'react-aria',
    'example',
    'gridlist',
    'autocomplete',
    'searchfield',
    'virtualizer',
    'view transition',
    'tree',
    'selection',
    'drag and drop',
    'slider'
];
const description = 'Virtualized photo grid, view transitions, folder tree, search, and drag and drop.';
function _createMdxContent(props) {
    const _components = Object.assign({
        h1: "h1",
        div: "div",
        h2: "h2"
    }, props.components), { PageDescription } = _components;
    if (!PageDescription) _missingMdxReference("PageDescription", true, "19:1-19:198");
    return (0, _jsxDevRuntime.jsxDEV)((0, _jsxDevRuntime.Fragment), {
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)(_components.h1, {
                children: "Photo Library"
            }, void 0, false, void 0, this),
            "\n",
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)(PageDescription, {
                children: "A photo library app with virtualized scrolling, view transitions, adjustable waterfall layout, folder tree, search, multi-selection, and accessible drag and drop."
            }, void 0, false, void 0, this),
            "\n",
            "\n",
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                "data-unavailable-demo": "",
                children: "TO BE DONE LATER"
            }, void 0, false, void 0, this),
            "\n",
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _exampleApp.ExampleApp), {
                dir: "packages/dev/s2-docs/pages/react-aria/examples/photos",
                defaultSelected: "App.tsx"
            }, void 0, false, void 0, this),
            "\n",
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)(_components.h2, {
                children: "Components"
            }, void 0, false, void 0, this),
            "\n",
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _componentCard.ComponentList), {
                pages: props.pages,
                components: [
                    'react-aria/Autocomplete',
                    'react-aria/Button',
                    'react-aria/GridList',
                    'react-aria/SearchField',
                    'react-aria/Slider',
                    'react-aria/Tree',
                    'react-aria/Virtualizer',
                    'react-aria/dnd'
                ]
            }, void 0, false, void 0, this)
        ]
    }, void 0, true);
}
function MDXContent(props = {}) {
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)(MDXLayout, {
        ...props,
        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)(_createMdxContent, {
            ...props
        }, void 0, false, void 0, this)
    }, void 0, false, void 0, this);
}
exports.default = MDXContent;
function _missingMdxReference(id, component, place) {
    throw new Error("Expected " + (component ? "component" : "object") + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it." + (place ? "\nIt\u2019s referenced in your code at `" + place + "` in `packages/dev/s2-docs/pages/react-aria/examples/photos.mdx`" : ""));
}
