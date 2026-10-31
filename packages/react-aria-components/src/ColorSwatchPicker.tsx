import {
  AriaLabelingProps,
  GlobalDOMAttributes,
  HoverEvents,
  PressEvents,
  ValueBase
} from '@react-types/shared';
import {
  ClassNameOrFunction,
  ContextValue,
  RenderProps,
  StyleRenderProps,
  useContextProps
} from './utils';
import {Color} from 'react-stately/Color';
import {ColorSwatchContext} from './ColorSwatch';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import intlMessages from '../intl/*.json';
import {ListBox, ListBoxItem, ListBoxItemRenderProps, ListBoxRenderProps} from './ListBox';
import {parseColor} from 'react-stately/Color';
import {createContext, createEffect, createMemo, merge, useContext, type Ref} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useColorPickerState} from 'react-stately/useColorPickerState';
import {useLocale} from 'react-aria/I18nProvider';
import {useLocalizedStringFormatter} from 'react-aria/useLocalizedStringFormatter';
import {useObjectRef} from 'react-aria/useObjectRef';
import {mergeRefs} from 'react-aria/mergeRefs';
import {useSyncRef} from 'react-aria/private/utils/useSyncRef';

export interface ColorSwatchPickerRenderProps extends Omit<ListBoxRenderProps, 'isDropTarget'> {}
export interface ColorSwatchPickerProps
  extends
    ValueBase<string | Color, Color>,
    AriaLabelingProps,
    StyleRenderProps<ColorSwatchPickerRenderProps>,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-ColorSwatchPicker'
   */
  className?: ClassNameOrFunction<ColorSwatchPickerRenderProps>;
  /** The children of the ColorSwatchPicker. */
  children?: JSX.Element;
  ref?: Ref<HTMLDivElement>;
  /**
   * Whether the items are arranged in a stack or grid.
   *
   * @default 'grid'
   */
  layout?: 'grid' | 'stack';
}

export const ColorSwatchPickerContext =
  createContext<ContextValue<ColorSwatchPickerProps, HTMLDivElement>>(null);
const ColorMapContext = createContext<Map<string, Color> | null>(null);

/**
 * A ColorSwatchPicker displays a list of color swatches and allows a user to select one of them.
 */
export function ColorSwatchPicker(props: ColorSwatchPickerProps) {
  let localRef = useObjectRef<HTMLDivElement>();
  let originalProps = props;
  useSyncRef({get ref() { return mergeRefs(originalProps.ref); }}, localRef);
  let resolved = useContextProps(props, localRef, ColorSwatchPickerContext);
  props = resolved[0];
  let ref = resolved[1];
  let state = useColorPickerState(props);
  let colorMap = new Map<string, Color>();
  let formatter = useLocalizedStringFormatter(intlMessages, 'react-aria-components');

  return (
    <ListBox
      {...filterDOMProps(props, {labelable: true})}
      ref={ref}
      className={props.className || 'react-aria-ColorSwatchPicker'}
      style={props.style}
      aria-label={
        props['aria-label'] ||
        (!props['aria-labelledby'] ? formatter.format('colorSwatchPicker') : undefined)
      }
      layout={props.layout || 'grid'}
      selectionMode="single"
      selectedKeys={[state.color.toString('hexa')]}
      onSelectionChange={keys => {
        // single select, 'all' cannot occur. appease typescript.
        if (keys !== 'all') {
          state.setColor(colorMap.get([...keys][0] as string) ?? null);
        }
      }}
      disallowEmptySelection>
      <ColorMapContext value={colorMap}>{props.children}</ColorMapContext>
    </ListBox>
  );
}

export interface ColorSwatchPickerItemRenderProps extends Omit<
  ListBoxItemRenderProps,
  'selectionMode' | 'selectionBehavior'
> {
  /** The color of the swatch. */
  color: Color;
}

export interface ColorSwatchPickerItemProps
  extends
    RenderProps<ColorSwatchPickerItemRenderProps>,
    HoverEvents,
    PressEvents,
    Omit<GlobalDOMAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-ColorSwatchPickerItem'
   */
  className?: ClassNameOrFunction<ColorSwatchPickerItemRenderProps>;
  /** The color of the swatch. */
  color: string | Color;
  /** Whether the color swatch is disabled. */
  isDisabled?: boolean;
  ref?: Ref<HTMLDivElement>;
}

export function ColorSwatchPickerItem(props: ColorSwatchPickerItemProps) {
  let color = createMemo(() => {
    let propColor = props.color || '#0000';
    return typeof propColor === 'string' ? parseColor(propColor) : propColor;
  });
  let localeInfo = useLocale();
  let map = useContext(ColorMapContext)!;
  createEffect(color, color => {
    let key = color.toString('hexa');
    map.set(key, color);
    return () => {
      map.delete(key);
    };
  });

  let wrap = <T, U extends ColorSwatchPickerItemRenderProps>(v: T | ((renderProps: U) => T)) => {
    if (typeof v === 'function') {
      return (renderProps: Omit<U, 'color'>) =>
        (v as (renderProps: U) => T)(merge(renderProps, {
          get color() { return color(); }
        }) as U);
    }
    return v;
  };

  return (
    <ListBoxItem
      {...props}
      // ColorSwatchPickerItem is never a link.
      render={props.render as any}
      ref={props.ref}
      id={color().toString('hexa')}
      textValue={color().getColorName(localeInfo.locale)}
      className={wrap(props.className || 'react-aria-ColorSwatchPickerItem')}
      style={wrap(props.style)}>
      {renderProps => (
        <ColorSwatchContext value={{get color() { return color(); }}}>
          {typeof props.children === 'function'
            ? props.children(merge(renderProps, {get color() { return color(); }}))
            : props.children}
        </ColorSwatchContext>
      )}
    </ListBoxItem>
  );
}
