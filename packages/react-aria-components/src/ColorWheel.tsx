import {AriaColorWheelOptions, useColorWheel} from 'react-aria/useColorWheel';
import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  Provider,
  RenderProps,
  SlotProps,
  StyleRenderProps,
  useContextProps,
  useRenderProps
} from './utils';
import {ColorWheelState, useColorWheelState} from 'react-stately/useColorWheelState';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {GlobalDOMAttributes} from '@react-types/shared';
import {InternalColorThumbContext} from './ColorThumb';
import {createContext, merge, omit, useContext} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef, type Ref} from 'react-aria/private/utils/useObjectRef';
import {useSyncRef} from 'react-aria/private/utils/useSyncRef';

export interface ColorWheelRenderProps {
  /**
   * Whether the color wheel is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * State of the color wheel.
   */
  state: ColorWheelState;
}

export interface ColorWheelProps
  extends
    AriaColorWheelOptions,
    RenderProps<ColorWheelRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-ColorWheel'
   */
  className?: ClassNameOrFunction<ColorWheelRenderProps>;
  ref?: Ref<HTMLDivElement>;
}

export const ColorWheelContext =
  createContext<ContextValue<Partial<ColorWheelProps>, HTMLDivElement>>(null);
export const ColorWheelStateContext = createContext<ColorWheelState | null>(null);

/**
 * A color wheel allows users to adjust the hue of an HSL or HSB color value on a circular track.
 */
export function ColorWheel(props: ColorWheelProps) {
  let localRef = useObjectRef<HTMLDivElement>();
  useSyncRef(props, localRef);
  let resolved = useContextProps<ColorWheelProps, Partial<ColorWheelProps>, HTMLDivElement>(props, localRef, ColorWheelContext);
  props = resolved[0];
  let ref = resolved[1];
  let state = useColorWheelState(props);
  let inputRef = useObjectRef<HTMLInputElement>();
  let {trackProps, inputProps, thumbProps} = useColorWheel(props, state, inputRef);

  let renderProps = useRenderProps(merge(props, {
    values: {
      state,
      get isDisabled() {return props.isDisabled || false;}
    },
    defaultClassName: 'react-aria-ColorWheel',
    defaultStyle: {
      position: 'relative' as const
    }
  }));

  let DOMProps = omit(filterDOMProps(props, {global: true}), 'id');

  return (
    <dom.div
      {...DOMProps}
      {...renderProps}
      ref={ref}
      slot={props.slot || undefined}
      data-disabled={props.isDisabled ? 'true' : undefined}>
      <Provider
        values={[
          [ColorWheelStateContext, state],
          [ColorWheelTrackContext, trackProps as ColorWheelTrackContextValue],
          [
            InternalColorThumbContext,
            {
              state,
              thumbProps,
              inputXRef: inputRef,
              xInputProps: inputProps,
              get isDisabled() {return props.isDisabled;}
            }
          ]
        ]}>
        {renderProps.children}
      </Provider>
    </dom.div>
  );
}

export interface ColorWheelTrackRenderProps extends ColorWheelRenderProps {}
export interface ColorWheelTrackProps
  extends StyleRenderProps<ColorWheelTrackRenderProps>, GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-ColorWheelTrack'
   */
  className?: ClassNameOrFunction<ColorWheelTrackRenderProps>;
  ref?: Ref<HTMLDivElement>;
}
interface ColorWheelTrackContextValue
  extends
    Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children' | 'class' | 'className' | 'style' | 'slot'>,
    StyleRenderProps<ColorWheelTrackRenderProps>,
    SlotProps {}

export const ColorWheelTrackContext =
  createContext<ContextValue<ColorWheelTrackContextValue, HTMLDivElement>>(null);

/**
 * A color wheel track renders a circular gradient track.
 */
export function ColorWheelTrack(props: ColorWheelTrackProps) {
  let localRef = useObjectRef<HTMLDivElement>();
  useSyncRef(props, localRef);
  let resolved = useContextProps<ColorWheelTrackProps, ColorWheelTrackContextValue, HTMLDivElement>(props, localRef, ColorWheelTrackContext);
  props = resolved[0];
  let ref = resolved[1];
  let state = useContext(ColorWheelStateContext)!;
  let rest = omit(props, 'className', 'style');

  let renderProps = useRenderProps(merge(props, {
    defaultClassName: 'react-aria-ColorWheelTrack',
    values: {
      get isDisabled() {return state.isDisabled;},
      state
    }
  }));

  return (
    <dom.div {...rest} {...renderProps} ref={ref} data-disabled={state.isDisabled ? 'true' : undefined} />
  );
}
