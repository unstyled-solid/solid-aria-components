import {AriaColorSwatchProps, useColorSwatch} from 'react-aria/useColorSwatch';
import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  SlotProps,
  RenderProps,
  useContextProps,
  useRenderProps
} from './utils';
import {Color} from 'react-stately/Color';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {GlobalDOMAttributes} from '@react-types/shared';
import {mergeProps} from 'react-aria/mergeProps';
import {createContext, merge} from 'solid-js';
import type {Ref} from 'solid-js';

export interface ColorSwatchRenderProps {
  /** The color of the swatch. */
  color: Color;
}

export interface ColorSwatchProps
  extends
    AriaColorSwatchProps,
    RenderProps<ColorSwatchRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-ColorSwatch'
   */
  className?: ClassNameOrFunction<ColorSwatchRenderProps>;
  ref?: Ref<HTMLDivElement>;
}

export const ColorSwatchContext =
  createContext<ContextValue<ColorSwatchProps, HTMLDivElement>>(null);

/**
 * A ColorSwatch displays a preview of a selected color.
 */
export function ColorSwatch(props: ColorSwatchProps) {
  let ref = props.ref;
  [props, ref] = useContextProps(props, ref, ColorSwatchContext);
  let swatch = useColorSwatch(props);
  let colorSwatchProps = swatch.colorSwatchProps;
  let renderProps = useRenderProps(merge(props, {
    defaultClassName: 'react-aria-ColorSwatch',
    get defaultStyle() { return colorSwatchProps.style; },
    values: {
      get color() { return swatch.color; }
    }
  }));

  let DOMProps = filterDOMProps(props, {global: true});

  return (
    <dom.div
      {...mergeProps(DOMProps, colorSwatchProps, renderProps)}
      slot={props.slot || undefined}
      ref={ref}
    />
  );
}
