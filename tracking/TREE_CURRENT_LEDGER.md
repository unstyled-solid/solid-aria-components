# Tree original named ledger

Current gates: `tree-final-pointer-fixed-originals.json/log` + `tree-final-pointer-current-focus.json/log` in approved OpenCode temp, 2026-10-12. **115 PASS /0 FAIL /1 original skip**, actual entire original file together, not109+6 arithmetic. User-reported whole-page native pointer crash separately FIXED and verified on same live page +frozenReact paired source pointer flow; runtimeerrors0/consoleerrors0/secondmove+click/keyboard/cancel work, original treegrid hosts retained. Warnings remain visible. Each line is the runner's parameter-expanded identity; separators are rendered spaces as supplied by Vitest. SSR1/browser3 separately previously qualified unchanged input after terminal hook fix. Native fixture adaptations/fingerprints/exact producer timing: TREE_GRID_COMPLETION.md. Owned useDragSHA `f2fadc37bdb205949cc6766db143720f8ccfaba7b884cebba73266f87d93ee15`; source sharedutils14ed… stable, sharedselectioned9→a991 concurrent revision noted rather than assuming old hashes. No new skips/assertion changes.

## PASS65

- Tree should render a Tree with default classes
- Tree should render a Tree with custom classes
- Tree should support DOM props
- Tree should support custom render function
- Tree should support style
- Tree should have the base set of data attributes
- Tree should have the expected attributes on the rows
- Tree should include the row as part of the expand/collapse button accessible label
- Tree should not label an expandable row as having an action if it supports selection
- Tree should support dynamic trees
- Tree should render checkboxes for selection using Checkbox
- Tree should render checkboxes for selection using CheckboxField
- Tree should allow unslotted checkboxes in item content
- Tree should not render checkboxes for selection with selectionBehavior=replace
- Tree general interactions should support hover on rows
- Tree general interactions should show hover state on draggable rows even when not selectable/actionable
- Tree general interactions should not update the hover state if the row is not interactive
- Tree general interactions should support press on rows
- Tree general interactions should not update the press state if the row is not interactive
- Tree general interactions should support actions on rows
- Tree general interactions should prevent Esc from clearing selection if escapeKeyBehavior is "none"
- Tree general interactions should support onScroll
- Tree general interactions links mouse should support links with selectionMode="none"
- Tree general interactions links mouse should support links with selectionBehavior="toggle" selectionMode="single"
- Tree general interactions links mouse should support links with selectionBehavior="toggle" selectionMode="multiple"
- Tree general interactions links mouse should support links with selectionBehavior="replace" selectionMode="single"
- Tree general interactions links mouse should support links with selectionBehavior="replace" selectionMode="multiple"
- Tree expanding and collapsing should apply the proper attributes to the chevron
- Tree empty state should allow the user to tab to the empty tree
- Tree load more should render the load more element with the expected attributes
- Tree load more should not render no results state and the loader at the same time
- Tree loading sentinels should render the loading elements when loading
- Tree loading sentinels should render the sentinel but not the loading indicator when not loading
- Tree loading sentinels should only fire loadMore when intersection is detected regardless of loading state
- Tree loading sentinels virtualized should always render the sentinel even when virtualized
- Tree loading sentinels virtualized should not reserve room for the loader if isLoading is false
- Tree shouldSelectOnPressUp should select an item on pressing down when shouldSelectOnPressUp is not provided
- Tree shouldSelectOnPressUp should select an item on pressing down when shouldSelectOnPressUp is false
- Tree shouldSelectOnPressUp should select an item on pressing up when shouldSelectOnPressUp is true
- Tree drag and drop should support drag button slot
- Tree drag and drop should support disabled drag and drop
- Tree drag and drop should allow selection even when drag and drop is disabled
- Tree drag and drop should filter out selected child keys in getItems if a parent is also selected
- Tree press events should support press events on items when using 'mouse'
- Tree sections should support sections
- Tree should have the expected attributes on the rows in sections
- Tree should support dynamic trees with sections
- rac-staticAriaTree should have the base set of aria and data attributes
- rac-staticAriaTree interaction - 'mouse' should have the expected attributes on the rows
- rac-staticAriaTree interaction - 'touch' should have the expected attributes on the rows
- rac-staticAriaTree single selection interaction - 'mouse' can select items
- rac-staticAriaTree single selection interaction - 'keyboard' can select items
- rac-staticAriaTree single selection interaction - 'touch' can select items
- rac-staticAriaTree all interactions disabled interaction - 'mouse' should not be able to interact with the tree
- rac-staticAriaTree all interactions disabled interaction - 'keyboard' should not be able to interact with the tree
- rac-staticAriaTree all interactions disabled interaction - 'touch' should not be able to interact with the tree
- rac-controlled-dynamicAriaTree should have the base set of aria and data attributes
- rac-controlled-dynamicAriaTree interaction - 'mouse' should have the expected attributes on the rows
- rac-controlled-dynamicAriaTree interaction - 'touch' should have the expected attributes on the rows
- rac-controlled-dynamicAriaTree single selection interaction - 'mouse' can select items
- rac-controlled-dynamicAriaTree single selection interaction - 'keyboard' can select items
- rac-controlled-dynamicAriaTree single selection interaction - 'touch' can select items
- rac-controlled-dynamicAriaTree all interactions disabled interaction - 'mouse' should not be able to interact with the tree
- rac-controlled-dynamicAriaTree all interactions disabled interaction - 'keyboard' should not be able to interact with the tree
- rac-controlled-dynamicAriaTree all interactions disabled interaction - 'touch' should not be able to interact with the tree

## PASS42 — owned live handler-key repair

All42 now PASS in the final109 gate. The exact owned useTree wrapper capture showed source onFocusIn became a function while Tree's static merged wrapper remained undefined. Function-source merge preserves native dynamic handler keys; generic grid/focus code untouched.

- Tree should support items with falsy keys
- Tree should support virtualizer
- Tree general interactions should support focus
- Tree general interactions links keyboard should support links with selectionMode="none"
- Tree general interactions links keyboard should support links with selectionBehavior="toggle" selectionMode="single"
- Tree general interactions links keyboard should support links with selectionBehavior="toggle" selectionMode="multiple"
- Tree general interactions links keyboard should support links with selectionBehavior="replace" selectionMode="single"
- Tree general interactions links keyboard should support links with selectionBehavior="replace" selectionMode="multiple"
- Tree general interactions keyboard interactions DynamicTree left and right arrows should navigate between interactive elements in the row
- Tree general interactions keyboard interactions DynamicTree should support type ahead
- Tree general interactions keyboard interactions DynamicTree should support collapse key to navigate to parent
- Tree general interactions keyboard interactions DynamicTree should navigate between visible rows when using Arrow Up/Down
- Tree general interactions keyboard interactions DynamicTree should navigate between visible rows when using Home/End
- Tree general interactions keyboard interactions DynamicSectionTree left and right arrows should navigate between interactive elements in the row
- Tree general interactions keyboard interactions DynamicSectionTree should support type ahead
- Tree general interactions keyboard interactions DynamicSectionTree should support collapse key to navigate to parent
- Tree general interactions keyboard interactions DynamicSectionTree should navigate between visible rows when using Arrow Up/Down
- Tree general interactions keyboard interactions DynamicSectionTree should navigate between visible rows when using Home/End
- Tree expanding and collapsing mouse should expand/collapse a row when clicking/using Enter on the row itself and there arent any other primary actions
- Tree expanding and collapsing mouse should not expand when clicking/using Enter on the row if the row is selectable
- Tree expanding and collapsing mouse should not expand when clicking/using Enter on the row if the row has an action
- Tree expanding and collapsing mouse should not expand when clicking/using Enter on the row if the row has a link
- Tree expanding and collapsing keyboard should expand/collapse a row when clicking/using Enter on the row itself and there arent any other primary actions
- Tree expanding and collapsing keyboard should not expand when clicking/using Enter on the row if the row is selectable
- Tree expanding and collapsing keyboard should not expand when clicking/using Enter on the row if the row has an action
- Tree expanding and collapsing keyboard should not expand when clicking/using Enter on the row if the row has a link
- Tree load more should not focus the load more row when using ArrowDown/ArrowUp
- Tree load more should not focus the load more row when using End
- Tree load more should not focus the load more row when using PageDown
- Tree press events should support press events on items when using 'keyboard'
- Tree tab navigation and textfields should not navigate rows when arrow keys are pressed while a text input child has focus
- Tree tab navigation and textfields should not trigger typeahead when typing in a text input child
- Tree tab navigation and textfields should not trigger selection when pressing Space in a text input child of a leaf row
- Tree tab navigation and textfields should allow typing space in the text input child of a parent row
- Tree focusMode and allowsArrowNavigation focusMode="child" auto-focuses first child when item receives focus
- Tree focusMode and allowsArrowNavigation allowsArrowNavigation allows arrow key navigation when focused on child
- Tree focusMode and allowsArrowNavigation focusMode="child" with default arrow navigation ArrowDown from child navigates to first child of next item
- Tree focusMode and allowsArrowNavigation focusMode="child" with default arrow navigation ArrowUp from child navigates to first child of previous item
- Tree focusMode and allowsArrowNavigation focusMode="row" (default) with tab navigation Tab into tree focuses row, Tab from row enters child, Shift+Tab returns to row
- Tree focusMode and allowsArrowNavigation focusMode="row" (default) with tab navigation ArrowRight expands collapsed parent item in tab mode
- rac-staticAriaTree interaction - 'keyboard' should have the expected attributes on the rows
- rac-controlled-dynamicAriaTree interaction - 'keyboard' should have the expected attributes on the rows

## PASS2 — existing original DnD indicators

- Tree drag and drop should render drop indicators
- Tree drag and drop should not skip drop positions before/after a disabled item

## PASS6 — final original DnD closure / original skip1

All6 PASS in targeted gate and current full115 gate. useDroppableItem tracks actual activate-button DOM in compute and registers a plain snapshot; previous global drag-ref comparison is an intentional terminal snapshot. Native asynchronous drop fixture settles decoding/publication before source50ms fallback timer; source actions/assertions unchanged. Trusted physical parent selection9/9 and collapsed/expanded parent focus/captured treegrid identity qualified; TREE_GRID_COMPLETION records evidence. Original skip unchanged.

- Tree drag and drop should support dropping on items
- Tree drag and drop should support dropping on the root
- Tree drag and drop should automatically focus the newly added dropped item
- Tree drag and drop should select the parent and all its children when dropped
- Tree drag and drop should focus the parent row when dropped on if it isnt expanded
- Tree drag and drop should focus the dropped row when dropped on a parent that is expanded
- ORIGINAL SKIP: Tree loading sentinels virtualized should restore focus to the tree if the loader is keyboard focused when loading finishes
