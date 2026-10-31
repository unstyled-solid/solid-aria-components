import {AriaColorAreaProps, useColorArea} from 'react-aria/useColorArea';
import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  Provider,
  RenderProps,
  SlotProps,
  useContextProps,
  useRenderProps
} from './utils';
import {ColorAreaState, useColorAreaState} from 'react-stately/useColorAreaState';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {GlobalDOMAttributes} from '@react-types/shared';
import {InternalColorThumbContext} from './ColorThumb';
import {mergeProps} from 'react-aria/mergeProps';
import {createContext, merge, omit} from 'solid-js';
import {useObjectRef, type Ref} from 'react-aria/private/utils/useObjectRef';
import {useSyncRef} from 'react-aria/private/utils/useSyncRef';

export interface ColorAreaRenderProps {
  /**
   * Whether the color area is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * State of the color area.
   */
  state: ColorAreaState;
}

export interface ColorAreaProps
  extends
    AriaColorAreaProps,
    RenderProps<ColorAreaRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-ColorArea'
   */
  className?: ClassNameOrFunction<ColorAreaRenderProps>;
  ref?: Ref<HTMLDivElement>;
}

export const ColorAreaContext =
  createContext<ContextValue<Partial<ColorAreaProps>, HTMLDivElement>>(null);
export const ColorAreaStateContext = createContext<ColorAreaState | null>(null);

/**
 * A color area allows users to adjust two channels of an RGB, HSL or HSB color value against a
 * two-dimensional gradient background.
 */
export function ColorArea(props: ColorAreaProps) {
  let localRef = useObjectRef<HTMLDivElement>();
  useSyncRef(props, localRef);
  let resolved = useContextProps<ColorAreaProps, Partial<ColorAreaProps>, HTMLDivElement>(props, localRef, ColorAreaContext);
  props = resolved[0];
  let ref = useObjectRef<HTMLDivElement>();
  let inputXRef = useObjectRef<HTMLInputElement>();
  let inputYRef = useObjectRef<HTMLInputElement>();

  let state = useColorAreaState(props);
  let {colorAreaProps, xInputProps, yInputProps, thumbProps} = useColorArea(
    merge(props, {
      inputXRef,
      inputYRef,
      containerRef: ref
    }),
    state
  );

  let renderProps = useRenderProps(merge(props, {
    defaultClassName: 'react-aria-ColorArea',
    get defaultStyle() {return colorAreaProps.style;},
    values: {
      state,
      get isDisabled() {return props.isDisabled || false;}
    }
  }));

  let DOMProps = omit(filterDOMProps(props, {global: true}), 'id');

  return (
    <dom.div
      {...mergeProps(DOMProps, colorAreaProps, renderProps)}
      ref={[resolved[1], ref]}
      slot={props.slot || undefined}
      data-disabled={props.isDisabled ? 'true' : undefined}>
      <Provider
        values={[
          [ColorAreaStateContext, state],
          [
            InternalColorThumbContext,
            {
              state,
              thumbProps,
              inputXRef,
              xInputProps,
              inputYRef,
              yInputProps,
               get isDisabled() {return props.isDisabled;}
            }
          ]
        ]}>
        {renderProps.children}
      </Provider>
    </dom.div>
  );
}
