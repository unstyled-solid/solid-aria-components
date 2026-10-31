# Component browser audit

Started 2026-10-12T21:05:53.169Z. Audited 61/61. Complete.

| Page | HTTP | Native mounted/total (Vanilla) | Tailwind mounted/total | Placeholders V/T | Errors |
|---|---|---|---|---|---|
| Autocomplete | failed | 0/0 | 0/0 | ?/? | 0 |
| Breadcrumbs | failed | 0/0 | 0/0 | ?/? | 0 |
| Button | failed | 0/0 | 0/0 | ?/? | 0 |
| Calendar | failed | 0/0 | 0/0 | ?/? | 0 |
| Checkbox | failed | 0/0 | 0/0 | ?/? | 0 |
| CheckboxGroup | failed | 0/0 | 0/0 | ?/? | 0 |
| ColorArea | failed | 0/0 | 0/0 | ?/? | 0 |
| ColorField | failed | 0/0 | 0/0 | ?/? | 0 |
| ColorPicker | failed | 0/0 | 0/0 | ?/? | 0 |
| ColorSlider | failed | 0/0 | 0/0 | ?/? | 0 |
| ColorSwatch | failed | 0/0 | 0/0 | ?/? | 0 |
| ColorSwatchPicker | failed | 0/0 | 0/0 | ?/? | 0 |
| ColorWheel | failed | 0/0 | 0/0 | ?/? | 0 |
| ComboBox | failed | 0/0 | 0/0 | ?/? | 0 |
| DateField | failed | 0/0 | 0/0 | ?/? | 0 |
| DatePicker | failed | 0/0 | 0/0 | ?/? | 0 |
| DateRangePicker | failed | 0/0 | 0/0 | ?/? | 0 |
| Disclosure | failed | 0/0 | 0/0 | ?/? | 0 |
| DisclosureGroup | failed | 0/0 | 0/0 | ?/? | 0 |
| DropZone | failed | 0/0 | 0/0 | ?/? | 0 |
| FileTrigger | failed | 0/0 | 0/0 | ?/? | 0 |
| FocusRing | failed | 0/0 | 0/0 | ?/? | 0 |
| FocusScope | failed | 0/0 | 0/0 | ?/? | 0 |
| Form | failed | 0/0 | 0/0 | ?/? | 0 |
| GridList | failed | 0/0 | 0/0 | ?/? | 0 |
| Group | failed | 0/0 | 0/0 | ?/? | 0 |
| I18nProvider | failed | 0/0 | 0/0 | ?/? | 0 |
| Link | failed | 0/0 | 0/0 | ?/? | 0 |
| ListBox | failed | 0/0 | 0/0 | ?/? | 0 |
| Menu | failed | 0/0 | 0/0 | ?/? | 0 |
| Meter | failed | 0/0 | 0/0 | ?/? | 0 |
| Modal | failed | 0/0 | 0/0 | ?/? | 0 |
| NavigationTree | failed | 0/0 | 0/0 | ?/? | 0 |
| NumberField | failed | 0/0 | 0/0 | ?/? | 0 |
| Popover | failed | 0/0 | 0/0 | ?/? | 0 |
| PortalProvider | failed | 0/0 | 0/0 | ?/? | 0 |
| PreviewTrigger | failed | 0/0 | 0/0 | ?/? | 0 |
| ProgressBar | failed | 0/0 | 0/0 | ?/? | 0 |
| RadioGroup | failed | 0/0 | 0/0 | ?/? | 0 |
| RangeCalendar | failed | 0/0 | 0/0 | ?/? | 0 |
| SSRProvider | failed | 0/0 | 0/0 | ?/? | 0 |
| SearchField | failed | 0/0 | 0/0 | ?/? | 0 |
| Select | failed | 0/0 | 0/0 | ?/? | 0 |
| Separator | failed | 0/0 | 0/0 | ?/? | 0 |
| Sheet | failed | 0/0 | 0/0 | ?/? | 0 |
| Slider | failed | 0/0 | 0/0 | ?/? | 0 |
| Switch | failed | 0/0 | 0/0 | ?/? | 0 |
| Table | failed | 0/0 | 0/0 | ?/? | 0 |
| Tabs | failed | 0/0 | 0/0 | ?/? | 0 |
| TagGroup | failed | 0/0 | 0/0 | ?/? | 0 |
| TextField | failed | 0/0 | 0/0 | ?/? | 0 |
| TimeField | failed | 0/0 | 0/0 | ?/? | 0 |
| Toast | failed | 0/0 | 0/0 | ?/? | 0 |
| ToggleButton | failed | 0/0 | 0/0 | ?/? | 0 |
| ToggleButtonGroup | failed | 0/0 | 0/0 | ?/? | 0 |
| TokenField | failed | 0/0 | 0/0 | ?/? | 0 |
| Toolbar | failed | 0/0 | 0/0 | ?/? | 0 |
| Tooltip | failed | 0/0 | 0/0 | ?/? | 0 |
| Tree | failed | 0/0 | 0/0 | ?/? | 0 |
| Virtualizer | failed | 0/0 | 0/0 | ?/? | 0 |
| VisuallyHidden | failed | 0/0 | 0/0 | ?/? | 0 |

## Current causal failures

### Autocomplete

page.goto: net::ERR_EMPTY_RESPONSE at http://localhost:4340/Autocomplete.html
Call log:
[2m  - navigating to "http://localhost:4340/Autocomplete.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Breadcrumbs

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Breadcrumbs.html
Call log:
[2m  - navigating to "http://localhost:4340/Breadcrumbs.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Button

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Button.html
Call log:
[2m  - navigating to "http://localhost:4340/Button.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Calendar

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Calendar.html
Call log:
[2m  - navigating to "http://localhost:4340/Calendar.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Checkbox

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Checkbox.html
Call log:
[2m  - navigating to "http://localhost:4340/Checkbox.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### CheckboxGroup

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/CheckboxGroup.html
Call log:
[2m  - navigating to "http://localhost:4340/CheckboxGroup.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### ColorArea

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/ColorArea.html
Call log:
[2m  - navigating to "http://localhost:4340/ColorArea.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### ColorField

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/ColorField.html
Call log:
[2m  - navigating to "http://localhost:4340/ColorField.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### ColorPicker

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/ColorPicker.html
Call log:
[2m  - navigating to "http://localhost:4340/ColorPicker.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### ColorSlider

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/ColorSlider.html
Call log:
[2m  - navigating to "http://localhost:4340/ColorSlider.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### ColorSwatch

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/ColorSwatch.html
Call log:
[2m  - navigating to "http://localhost:4340/ColorSwatch.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### ColorSwatchPicker

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/ColorSwatchPicker.html
Call log:
[2m  - navigating to "http://localhost:4340/ColorSwatchPicker.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### ColorWheel

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/ColorWheel.html
Call log:
[2m  - navigating to "http://localhost:4340/ColorWheel.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### ComboBox

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/ComboBox.html
Call log:
[2m  - navigating to "http://localhost:4340/ComboBox.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### DateField

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/DateField.html
Call log:
[2m  - navigating to "http://localhost:4340/DateField.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### DatePicker

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/DatePicker.html
Call log:
[2m  - navigating to "http://localhost:4340/DatePicker.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### DateRangePicker

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/DateRangePicker.html
Call log:
[2m  - navigating to "http://localhost:4340/DateRangePicker.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Disclosure

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Disclosure.html
Call log:
[2m  - navigating to "http://localhost:4340/Disclosure.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### DisclosureGroup

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/DisclosureGroup.html
Call log:
[2m  - navigating to "http://localhost:4340/DisclosureGroup.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### DropZone

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/DropZone.html
Call log:
[2m  - navigating to "http://localhost:4340/DropZone.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### FileTrigger

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/FileTrigger.html
Call log:
[2m  - navigating to "http://localhost:4340/FileTrigger.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### FocusRing

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/FocusRing.html
Call log:
[2m  - navigating to "http://localhost:4340/FocusRing.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### FocusScope

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/FocusScope.html
Call log:
[2m  - navigating to "http://localhost:4340/FocusScope.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Form

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Form.html
Call log:
[2m  - navigating to "http://localhost:4340/Form.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### GridList

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/GridList.html
Call log:
[2m  - navigating to "http://localhost:4340/GridList.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Group

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Group.html
Call log:
[2m  - navigating to "http://localhost:4340/Group.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### I18nProvider

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/I18nProvider.html
Call log:
[2m  - navigating to "http://localhost:4340/I18nProvider.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Link

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Link.html
Call log:
[2m  - navigating to "http://localhost:4340/Link.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### ListBox

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/ListBox.html
Call log:
[2m  - navigating to "http://localhost:4340/ListBox.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Menu

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Menu.html
Call log:
[2m  - navigating to "http://localhost:4340/Menu.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Meter

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Meter.html
Call log:
[2m  - navigating to "http://localhost:4340/Meter.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Modal

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Modal.html
Call log:
[2m  - navigating to "http://localhost:4340/Modal.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### NavigationTree

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/NavigationTree.html
Call log:
[2m  - navigating to "http://localhost:4340/NavigationTree.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### NumberField

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/NumberField.html
Call log:
[2m  - navigating to "http://localhost:4340/NumberField.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Popover

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Popover.html
Call log:
[2m  - navigating to "http://localhost:4340/Popover.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### PortalProvider

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/PortalProvider.html
Call log:
[2m  - navigating to "http://localhost:4340/PortalProvider.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### PreviewTrigger

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/PreviewTrigger.html
Call log:
[2m  - navigating to "http://localhost:4340/PreviewTrigger.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### ProgressBar

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/ProgressBar.html
Call log:
[2m  - navigating to "http://localhost:4340/ProgressBar.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### RadioGroup

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/RadioGroup.html
Call log:
[2m  - navigating to "http://localhost:4340/RadioGroup.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### RangeCalendar

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/RangeCalendar.html
Call log:
[2m  - navigating to "http://localhost:4340/RangeCalendar.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### SSRProvider

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/SSRProvider.html
Call log:
[2m  - navigating to "http://localhost:4340/SSRProvider.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### SearchField

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/SearchField.html
Call log:
[2m  - navigating to "http://localhost:4340/SearchField.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Select

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Select.html
Call log:
[2m  - navigating to "http://localhost:4340/Select.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Separator

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Separator.html
Call log:
[2m  - navigating to "http://localhost:4340/Separator.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Sheet

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Sheet.html
Call log:
[2m  - navigating to "http://localhost:4340/Sheet.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Slider

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Slider.html
Call log:
[2m  - navigating to "http://localhost:4340/Slider.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Switch

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Switch.html
Call log:
[2m  - navigating to "http://localhost:4340/Switch.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Table

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Table.html
Call log:
[2m  - navigating to "http://localhost:4340/Table.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Tabs

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Tabs.html
Call log:
[2m  - navigating to "http://localhost:4340/Tabs.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### TagGroup

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/TagGroup.html
Call log:
[2m  - navigating to "http://localhost:4340/TagGroup.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### TextField

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/TextField.html
Call log:
[2m  - navigating to "http://localhost:4340/TextField.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### TimeField

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/TimeField.html
Call log:
[2m  - navigating to "http://localhost:4340/TimeField.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Toast

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Toast.html
Call log:
[2m  - navigating to "http://localhost:4340/Toast.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### ToggleButton

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/ToggleButton.html
Call log:
[2m  - navigating to "http://localhost:4340/ToggleButton.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### ToggleButtonGroup

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/ToggleButtonGroup.html
Call log:
[2m  - navigating to "http://localhost:4340/ToggleButtonGroup.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### TokenField

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/TokenField.html
Call log:
[2m  - navigating to "http://localhost:4340/TokenField.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Toolbar

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Toolbar.html
Call log:
[2m  - navigating to "http://localhost:4340/Toolbar.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Tooltip

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Tooltip.html
Call log:
[2m  - navigating to "http://localhost:4340/Tooltip.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Tree

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Tree.html
Call log:
[2m  - navigating to "http://localhost:4340/Tree.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### Virtualizer

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/Virtualizer.html
Call log:
[2m  - navigating to "http://localhost:4340/Virtualizer.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19


### VisuallyHidden

page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4340/VisuallyHidden.html
Call log:
[2m  - navigating to "http://localhost:4340/VisuallyHidden.html", waiting until "domcontentloaded"[22m

    at [stdin]:10:19



Full module identifiers, error stacks, interaction outcomes, timestamps and fingerprints are in the JSON. Empty native islands are recorded as unmounted, not passing. Visible placeholders are incomplete docs coverage, not diagnosed library bugs.
