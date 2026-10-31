import {AriaColorSliderProps, useColorSlider} from 'react-aria/useColorSlider';
import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  RenderProps,
  SlotProps,
  useContextProps,
  useRenderProps,
  useSlot
} from './utils';
import {ColorSliderState, useColorSliderState} from 'react-stately/useColorSliderState';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {GlobalDOMAttributes} from '@react-types/shared';
import {InternalColorThumbContext} from './ColorThumb';
import {LabelContext} from './Label';
import {Orientation} from '@react-types/shared';
import {createContext, merge, omit, untrack, type Context, type Ref} from 'solid-js';
import {useObjectRef} from 'react-aria/private/utils/useObjectRef';
import {SliderOutputContext, SliderStateContext, SliderTrackContext} from './Slider';
import {useLocale} from 'react-aria/I18nProvider';

// Aria DOM bags have the renderer's broad attribute union. As in native Slider,
// narrow the source-generated bags at their render-prop context boundaries.
type ContextValueOf<T> = T extends Context<infer V> ? V : never;

export interface ColorSliderRenderProps {
  /**
   * The orientation of the color slider.
   *
   * @selector [data-orientation="horizontal | vertical"]
   */
  orientation: Orientation;
  /**
   * Whether the color slider is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * State of the color slider.
   */
  state: ColorSliderState;
}

export interface ColorSliderProps
  extends
    Omit<AriaColorSliderProps, 'label'>,
    RenderProps<ColorSliderRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-ColorSlider'
   */
  className?: ClassNameOrFunction<ColorSliderRenderProps>;
  ref?: Ref<HTMLDivElement>;
}

export const ColorSliderContext =
  createContext<ContextValue<Partial<ColorSliderProps>, HTMLDivElement>>(null);
export const ColorSliderStateContext = createContext<ColorSliderState | null>(null);

/**
 * A color slider allows users to adjust an individual channel of a color value.
 */
export function ColorSlider(input: ColorSliderProps) {
  let [props, ref] = useContextProps(input, untrack(() => input.ref), ColorSliderContext);
  let locale = useLocale();
  let state = useColorSliderState(merge(props, {get locale() { return locale.locale; }}));
  let trackRef = useObjectRef<HTMLDivElement>();
  let inputRef = useObjectRef<HTMLInputElement>();

  let [labelRef, label] = useSlot(() => !props['aria-label'] && !props['aria-labelledby']);
  let {trackProps, thumbProps, inputProps, labelProps, outputProps} = useColorSlider(
    merge(props, {
      get label() { return label(); },
      trackRef,
      inputRef
    }),
    state
  );

  let renderProps = useRenderProps(merge(props, {
    values: {
      get orientation() { return state.orientation; },
      get isDisabled() { return state.isDisabled; },
      state
    },
    defaultClassName: 'react-aria-ColorSlider'
  }));

  let DOMProps = omit(filterDOMProps(props, {global: true}), 'id');
  let trackContext = merge(trackProps, {ref: trackRef});
  let labelContext = merge(labelProps, {
    ref: labelRef,
    get children() { return state.value.getChannelName(props.channel, locale.locale); }
  });
  let thumbContext = {
    state,
    thumbProps,
    inputXRef: inputRef,
    xInputProps: inputProps,
    get isDisabled() { return props.isDisabled; }
  };

  return (
    <ColorSliderStateContext value={state}>
      <SliderStateContext value={state}>
        <SliderTrackContext value={trackContext as ContextValueOf<typeof SliderTrackContext>}>
          <SliderOutputContext value={outputProps as ContextValueOf<typeof SliderOutputContext>}>
            <LabelContext value={labelContext}>
              <InternalColorThumbContext value={thumbContext}>
      <dom.div
        {...DOMProps}
        {...renderProps}
        ref={ref}
        slot={props.slot || undefined}
        data-orientation={state.orientation}
        data-disabled={state.isDisabled ? 'true' : undefined}
      />
              </InternalColorThumbContext>
            </LabelContext>
          </SliderOutputContext>
        </SliderTrackContext>
      </SliderStateContext>
    </ColorSliderStateContext>
  );
}
