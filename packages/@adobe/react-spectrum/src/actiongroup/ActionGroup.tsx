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

import {ActionButton} from '../button/ActionButton';
import {AriaActionGroupProps, useActionGroup} from 'react-aria/private/actiongroup/useActionGroup';
import {AriaLabelingProps, DOMProps, Key, Node, StyleProps} from '@react-types/shared';
import buttonStyles from '@adobe/spectrum-css-temp/components/button/vars.css';
import ChevronDownMedium from '@spectrum-icons/ui/ChevronDownMedium';
import {classNames} from '../utils/classNames';
import {ClearSlots, SlotProvider, useSlotProps} from '../utils/Slots';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {FocusScope} from 'react-aria/FocusScope';
import intlMessages from '../../intl/actiongroup/*.json';
import {Item} from 'react-stately/Item';
import {ListState, useListState} from 'react-stately/useListState';
import {Menu} from '../menu/Menu';
import {MenuTrigger} from '../menu/MenuTrigger';
import {mergeProps} from 'react-aria/mergeProps';
import More from '@spectrum-icons/workflow/More';
import {PressResponder} from 'react-aria/private/interactions/PressResponder';
import {Provider, useProviderProps} from '../provider/Provider';
import {createEffect, createMemo, createSignal, For, merge, omit} from 'solid-js';
import type {ComponentProps, JSX} from '@solidjs/web';
import styles from '@adobe/spectrum-css-temp/components/actiongroup/vars.css';
import {Text} from '../text/Text';
import {Tooltip} from '../tooltip/Tooltip';
import {TooltipTrigger} from '../tooltip/TooltipTrigger';
import {useActionGroupItem} from 'react-aria/private/actiongroup/useActionGroupItem';
import {useDOMRef, type DOMRef} from '../utils/useDOMRef';
import {useObjectRef} from 'react-aria/useObjectRef';
import {useHover} from 'react-aria/useHover';
import {useId} from 'react-aria/useId';
import {useLocalizedStringFormatter} from 'react-aria/useLocalizedStringFormatter';
import {useResizeObserver} from 'react-aria/private/utils/useResizeObserver';
import {useStyleProps} from '../utils/styleProps';
import {useValueEffect} from 'react-aria/private/utils/useValueEffect';

export interface SpectrumActionGroupProps<T> extends AriaActionGroupProps<T>, StyleProps {
  /**
   * Whether the ActionButtons should be displayed with a [emphasized
   * style](https://spectrum.adobe.com/page/action-button/#Emphasis).
   */
  isEmphasized?: boolean;
  /**
   * Sets the amount of space between buttons.
   *
   * @default 'regular'
   */
  density?: 'compact' | 'regular';
  /** Whether the ActionButtons should be justified in their container. */
  isJustified?: boolean;
  /**
   * Whether ActionButtons should use the [quiet
   * style](https://spectrum.adobe.com/page/action-button/#Quiet).
   */
  isQuiet?: boolean;
  /** The static color style to apply. Useful when the ActionGroup appears over a color background. */
  staticColor?: 'white' | 'black';
  /**
   * Defines the behavior of the ActionGroup when the buttons do not fit in the available space.
   * When set to 'wrap', the items wrap to form a new line. When set to 'collapse', the items that
   * do not fit are collapsed into a dropdown menu.
   *
   * @default 'wrap'
   */
  overflowMode?: 'wrap' | 'collapse';
  /**
   * Defines when the text within the buttons should be hidden and only the icon should be shown.
   * When set to 'hide', the text is always shown in a tooltip. When set to 'collapse', the text is
   * visible if space is available, and hidden when space is limited. The text is always visible
   * when the item is collapsed into a menu.
   *
   * @default 'show'
   */
  buttonLabelBehavior?: 'show' | 'collapse' | 'hide';
  /** The icon displayed in the dropdown menu button when a selectable ActionGroup is collapsed. */
  summaryIcon?: JSX.Element;
}

/**
 * An ActionGroup is a grouping of ActionButtons that are related to one another.
 */
export function ActionGroup<T extends object>(input: SpectrumActionGroupProps<T> & {ref?: DOMRef<HTMLDivElement>}) {
  let props = useSlotProps(useProviderProps(input), 'actionGroup');
  let orientation = () => props.orientation ?? 'horizontal';
  let overflowMode = () => props.overflowMode ?? 'wrap';
  let otherProps = omit(props, 'isEmphasized', 'density', 'isJustified', 'isDisabled', 'orientation', 'isQuiet', 'staticColor', 'overflowMode', 'onAction', 'buttonLabelBehavior', 'summaryIcon', 'ref');
  let domRef = useDOMRef(input.ref);
  let wrapperRef = useObjectRef<HTMLDivElement>();
  let state = useListState(merge(props, {suppressTextValueWarning: true}));
  let {actionGroupProps} = useActionGroup(props, state, domRef);
  let isVertical = () => orientation() === 'vertical';
  let providerProps = {
    get isEmphasized() {return props.isEmphasized;},
    get isDisabled() {return props.isDisabled;},
    get isQuiet() {return props.isQuiet;}
  };
  let {styleProps} = useStyleProps(props);

  // Only hide button text if every item contains more than just plain text (we assume an icon).
  let isIconCollapsible = createMemo(() => [...state.collection].every(item => typeof item.rendered !== 'string'));
  let [measurement, setVisibleItems] = useValueEffect(() => ({
    visibleItems: state.collection.size,
    hideButtonText: props.buttonLabelBehavior === 'hide' && isIconCollapsible(),
    isMeasuring: false
  }));

  let visibleItems = () => measurement().visibleItems;
  let hideButtonText = () => measurement().hideButtonText;
  let isMeasuring = () => measurement().isMeasuring;
  let selectionMode = () => state.selectionManager.selectionMode;
  let updateOverflow = createMemo(() => {
    let mode = overflowMode();
    let direction = orientation();
    let selection = selectionMode();
    let collection = state.collection;
    let labelBehavior = props.buttonLabelBehavior;
    let iconCollapsible = isIconCollapsible();
    let element = domRef.current;
    let wrapper = wrapperRef.current;
    return () => {
    if (mode === 'wrap') {
      return;
    }

    if (direction === 'vertical' && selection !== 'none') {
      // Collapsing vertical action groups with selection is currently unsupported by Spectrum.
      return;
    }

    let computeVisibleItems = (visibleItems: number) => {
      if (element && wrapper) {
        let listItems = Array.from(element.children) as HTMLLIElement[];
        let containerSize =
          direction === 'horizontal'
            ? wrapper.getBoundingClientRect().width
            : wrapper.getBoundingClientRect().height;

        let isShowingMenu = visibleItems < collection.size;
        let calculatedSize = 0;
        let newVisibleItems = 0;

        if (isShowingMenu) {
          let item = listItems.pop();
          if (item) {
            calculatedSize +=
              direction === 'horizontal'
                ? outerWidth(item, false, true)
                : outerHeight(item, false, true);
          }
        }

        for (let [i, item] of listItems.entries()) {
          calculatedSize +=
            direction === 'horizontal'
              ? outerWidth(item, i === 0, i === listItems.length - 1)
              : outerHeight(item, i === 0, i === listItems.length - 1);
          if (Math.round(calculatedSize) <= Math.round(containerSize)) {
            newVisibleItems++;
          } else {
            break;
          }
        }

        // If selection is enabled, and not all of the items fit, collapse all of them into a dropdown
        // immediately rather than having some visible and some not.
        if (selection !== 'none' && newVisibleItems < collection.size) {
          return 0;
        }

        return newVisibleItems;
      }
      return visibleItems;
    };

    setVisibleItems(function* () {
      let hideButtonText = labelBehavior === 'hide' && iconCollapsible;

      // Update to show all items.
      yield {
        visibleItems: collection.size,
        hideButtonText,
        isMeasuring: true
      };

      // Measure, and update to show the items that fit.
      let newVisibleItems = computeVisibleItems(collection.size);
      let isMeasuring = newVisibleItems < collection.size && newVisibleItems > 0;

      // If not all of the buttons fit, and buttonLabelBehavior is 'collapse', then first try hiding
      // the button text and only showing icons. Only if that still doesn't fit collapse into a menu.
      if (
        newVisibleItems < collection.size &&
        labelBehavior === 'collapse' &&
        iconCollapsible
      ) {
        yield {
          visibleItems: collection.size,
          hideButtonText: true,
          isMeasuring: true
        };

        newVisibleItems = computeVisibleItems(collection.size);
        isMeasuring = newVisibleItems < collection.size && newVisibleItems > 0;
        hideButtonText = true;
      }

      yield {
        visibleItems: newVisibleItems,
        hideButtonText,
        isMeasuring
      };

      // If the number of items is less than the number of children,
      // then update again to ensure that the menu fits.
      if (isMeasuring) {
        yield {
          visibleItems: computeVisibleItems(newVisibleItems),
          hideButtonText,
          isMeasuring: false
        };
      }
    });
    };
  });

  // Watch the parent element for size changes. Watching only the action group itself may not work
  // in all scenarios because it may not shrink when available space is reduced.
  let parentRef = {
      get current() {
        return wrapperRef.current?.parentElement;
      }
    };
  useResizeObserver({
    get ref() {return overflowMode() !== 'wrap' ? parentRef : undefined;},
    onResize: () => {updateOverflow()();}
  });
  createEffect(updateOverflow, update => {update();});

  let children = createMemo(() => {
    let items = [...state.collection];
    return overflowMode() === 'collapse' && visibleItems() < state.collection.size ? items.slice(0, visibleItems()) : items;
  });
  let menuProps = merge(() => overflowMode() === 'collapse' && visibleItems() === 0 ? filterDOMProps(props, {labelable: true}) : {});
  let groupProps = merge(() => overflowMode() === 'collapse' && visibleItems() === 0 ? {} : actionGroupProps);

  // If there are no visible items, don't apply any props to the action group container
  // and pass all aria labeling props through to the menu button.
  let menuItem = () => overflowMode() === 'collapse' && visibleItems() < state.collection.size ? (
      <ActionGroupMenu
        {...menuProps}
        items={[...state.collection].slice(visibleItems())}
        onAction={key => props.onAction?.(key)}
        isDisabled={props.isDisabled}
        isEmphasized={props.isEmphasized}
        staticColor={props.staticColor}
        state={state}
        summaryIcon={props.summaryIcon}
        hideButtonText={hideButtonText()}
        isOnlyItem={visibleItems() === 0}
        orientation={orientation()}
      />
    ) : null;

  let style = merge(() => styleProps.style as JSX.CSSProperties, {
    // While measuring, take up as much space as possible.
    get 'flex-basis'() {return isMeasuring() ? '100%' : undefined;}
  });

  return (
    <FocusScope>
      <div
        {...styleProps}
        style={style}
        class={classNames(styles, 'flex-container', styleProps.class as string | undefined)}
        ref={wrapperRef}>
        <div
          {...groupProps}
          ref={domRef}
          class={classNames(
            styles,
            'flex-gap',
            'spectrum-ActionGroup',
            {
              'spectrum-ActionGroup--quiet': props.isQuiet,
              'spectrum-ActionGroup--vertical': isVertical(),
              'spectrum-ActionGroup--compact': props.density === 'compact',
              'spectrum-ActionGroup--justified': props.isJustified && !isMeasuring(),
              'spectrum-ActionGroup--overflowCollapse': overflowMode() === 'collapse'
            },
            otherProps.UNSAFE_className
          )}>
          <Provider {...providerProps}>
            <For each={children()} keyed={item => item.key}>{item => (
              <ActionGroupItem
                onAction={props.onAction}
                isDisabled={props.isDisabled}
                isEmphasized={props.isEmphasized}
                staticColor={props.staticColor}
                item={item()}
                state={state}
                hideButtonText={hideButtonText()}
                orientation={orientation()}
              />
            )}</For>
            {menuItem()}
          </Provider>
        </div>
      </div>
    </FocusScope>
  );
}

interface ActionGroupItemProps<T> extends DOMProps, StyleProps {
  item: Node<T>;
  state: ListState<T>;
  isDisabled?: boolean;
  isEmphasized?: boolean;
  staticColor?: 'white' | 'black';
  hideButtonText?: boolean;
  orientation?: 'horizontal' | 'vertical';
  onAction?: (key: Key) => void;
}

function ActionGroupItem<T>(props: ActionGroupItemProps<T>) {
  let {buttonProps: sourceButtonProps} = useActionGroupItem({get key() {return props.item.key;}}, props.state);
  let isDisabled = () => props.isDisabled || props.state.disabledKeys.has(props.item.key);
  let isSelected = () => props.state.selectionManager.isSelected(props.item.key);
  let {hoverProps, isHovered} = useHover({get isDisabled() {return isDisabled();}});
  let domProps = merge(() => filterDOMProps(props.item.props));
  let buttonProps = mergeProps(sourceButtonProps, merge(() => props.onAction && !isDisabled() ? {
    onPress: () => props.onAction?.(props.item.key)
  } : {}));

  // If button text is hidden, we need to show it as a tooltip instead, so
  // go find the text element in the DOM after rendering.
  let textId = useId();
  let [textContent, setTextContent] = createSignal<string | null | undefined>('');
  createEffect(() => ({hide: props.hideButtonText, rendered: props.item.rendered, id: textId()}), ({hide, id}) => {
    if (hide) {
      setTextContent(document.getElementById(id)?.textContent);
    }
  });

  let button = () => (
    // Use a PressResponder to send DOM props through.
    // ActionButton doesn't allow overriding the role by default.
    <PressResponder {...mergeProps(buttonProps, hoverProps, domProps) as unknown as ComponentProps<typeof PressResponder>}>
      <ClearSlots>
        <SlotProvider
          slots={{
            text: {
              get id() {return props.hideButtonText ? textId() : null;},
              get isHidden() {return props.hideButtonText;}
            }
          }}>
          <ActionButton
            // @ts-ignore (private)
            hideButtonText={props.hideButtonText}
            UNSAFE_className={classNames(
              styles,
              'spectrum-ActionGroup-item',
              {
                'is-selected': isSelected(),
                'is-hovered': isHovered(),
                'spectrum-ActionGroup-item--iconOnly': props.hideButtonText,
                'spectrum-ActionGroup-item--isDisabled': isDisabled()
              },
              classNames(buttonStyles, {
                'spectrum-ActionButton--emphasized': props.isEmphasized,
                'is-selected': isSelected()
              })
            )}
            isDisabled={isDisabled()}
            staticColor={props.staticColor}
            aria-label={props.item['aria-label']}
            aria-labelledby={props.item['aria-label'] == null && props.hideButtonText ? textId() : undefined}>
            {props.item.rendered}
          </ActionButton>
        </SlotProvider>
      </ClearSlots>
    </PressResponder>
  );

  let withTooltip = () => props.hideButtonText && textContent() ? (
      <TooltipTrigger placement={props.orientation === 'vertical' ? 'end' : 'top'}>
        {button()}
        <Tooltip>{textContent()}</Tooltip>
      </TooltipTrigger>
    ) : button();
  return <>{props.item.wrapper ? props.item.wrapper(withTooltip()) : withTooltip()}</>;
}

interface ActionGroupMenuProps<T> extends AriaLabelingProps {
  state: ListState<T>;
  isDisabled?: boolean;
  isEmphasized?: boolean;
  staticColor?: 'white' | 'black';
  items: Node<T>[];
  hideButtonText?: boolean;
  summaryIcon?: JSX.Element;
  isOnlyItem?: boolean;
  orientation?: 'horizontal' | 'vertical';
  onAction?: (key: Key) => void;
}

function ActionGroupMenu<T>(props: ActionGroupMenuProps<T>) {
  let state = props.state;
  let otherProps = omit(props, 'state', 'isDisabled', 'isEmphasized', 'staticColor', 'items', 'onAction', 'summaryIcon', 'hideButtonText', 'isOnlyItem', 'orientation');
  // Use the key of the first item within the menu as the key of the button.
  // The key must actually exist in the collection for focus to work correctly.
  let {buttonProps: sourceButtonProps} = useActionGroupItem({get key() {return props.items[0].key;}}, state);
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-spectrum/actiongroup');

  // The menu button shouldn't act like an actual action group item.
  let buttonProps = omit(sourceButtonProps, 'onPress', 'role', 'aria-checked');

  let {hoverProps, isHovered} = useHover({get isDisabled() {return props.isDisabled;}});

  // If no aria-label or aria-labelledby is given, provide a default one.
  let ariaLabel = () =>
    otherProps['aria-label'] ||
    (otherProps['aria-labelledby'] ? undefined : stringFormatter.format('more'));
  let textId = useId();
  let id = useId();

  let selectedSummary = createMemo(() => {
    let summaryIcon = state.selectionManager.selectionMode === 'none' ? null : props.summaryIcon;
    let iconOnly = false;
    let wrapText = false;
    let ariaLabelledby = otherProps['aria-labelledby'];

  // If single selection and empty selection is not allowed, swap the contents of the button to the selected item (like a Picker).
  if (
    !summaryIcon &&
    state.selectionManager.selectionMode === 'single' &&
    state.selectionManager.disallowEmptySelection &&
    state.selectionManager.firstSelectedKey != null
  ) {
    let selectedItem = state.collection.getItem(state.selectionManager.firstSelectedKey);
    if (selectedItem) {
      summaryIcon = selectedItem.rendered;
      wrapText = typeof summaryIcon === 'string';
      iconOnly = !!props.hideButtonText;
      ariaLabelledby = `${ariaLabelledby ?? id()} ${textId()}`;
    }
  }

    return {summaryIcon, ariaLabelledby, iconOnly, wrapText};
  });
  let renderSummary = () => selectedSummary().summaryIcon ? (
      <>
        <ChevronDownMedium
          UNSAFE_className={classNames(styles, 'spectrum-ActionGroup-menu-chevron')}
        />
        <span
          class={classNames(styles, 'spectrum-ActionGroup-menu-contents', {
            'spectrum-ActionGroup-item--iconOnly': selectedSummary().iconOnly
          })}>
          {selectedSummary().wrapText
            ? <Text>{selectedSummary().summaryIcon}</Text>
            : selectedSummary().summaryIcon}
        </span>
      </>
    ) : <More />;
  let isSelected = () => state.selectionManager.selectionMode !== 'none' && !state.selectionManager.isEmpty;
  return (
    // Use a PressResponder to send DOM props through.
    <MenuTrigger
      align={props.isOnlyItem ? 'start' : 'end'}
      direction={props.orientation === 'vertical' ? 'end' : 'bottom'}>
      <SlotProvider
        slots={{
          text: {
            get id() {return props.hideButtonText ? textId() : null;},
            get isHidden() {return props.hideButtonText;},
            UNSAFE_className: classNames(styles, 'spectrum-ActionGroup-menu-text')
          }
        }}>
        <PressResponder {...mergeProps(buttonProps, hoverProps) as unknown as ComponentProps<typeof PressResponder>}>
          <ActionButton
            {...otherProps}
            id={id()}
            aria-label={ariaLabel()}
            aria-labelledby={selectedSummary().ariaLabelledby}
            UNSAFE_className={classNames(
              styles,
              'spectrum-ActionGroup-item',
              'spectrum-ActionGroup-menu',
              {
                'is-hovered': isHovered(),
                'is-selected': isSelected()
              },
              classNames(buttonStyles, {
                'is-selected': isSelected(),
                'spectrum-ActionButton--emphasized': props.isEmphasized
              })
            )}
            isDisabled={props.isDisabled}
            staticColor={props.staticColor}>
            {renderSummary()}
          </ActionButton>
        </PressResponder>
      </SlotProvider>
      <Menu
        items={props.items}
        disabledKeys={state.disabledKeys}
        selectionMode={state.selectionManager.selectionMode}
        selectedKeys={state.selectionManager.selectedKeys}
        disallowEmptySelection={state.selectionManager.disallowEmptySelection}
        onSelectionChange={keys => state.selectionManager.setSelectedKeys(keys)}
        onAction={props.onAction}>
        {node => (
          <Item textValue={node.textValue} {...filterDOMProps(node.props)}>
            {node.rendered}
          </Item>
        )}
      </Menu>
    </MenuTrigger>
  );
}

function outerWidth(element: HTMLElement, ignoreLeftMargin: boolean, ignoreRightMargin: boolean) {
  let style = window.getComputedStyle(element);
  return (
    element.getBoundingClientRect().width +
    (ignoreLeftMargin ? 0 : toNumber(style.marginLeft)) +
    (ignoreRightMargin ? 0 : toNumber(style.marginRight))
  );
}

function outerHeight(element: HTMLElement, ignoreTopMargin: boolean, ignoreBottomMargin: boolean) {
  let style = window.getComputedStyle(element);
  return (
    element.getBoundingClientRect().height +
    (ignoreTopMargin ? 0 : toNumber(style.marginTop)) +
    (ignoreBottomMargin ? 0 : toNumber(style.marginBottom))
  );
}

function toNumber(value: string) {
  let parsed = parseInt(value, 10);
  return isNaN(parsed) ? 0 : parsed;
}
