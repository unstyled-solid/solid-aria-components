import {ClassNameOrFunction, dom, RenderProps, useRenderProps} from './utils';
import {Color} from 'react-stately/Color';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {DOMAttributes, GlobalDOMAttributes, HoverEvents, RefObject} from '@react-types/shared';
import {mergeProps} from 'react-aria/mergeProps';
import {createContext, merge, omit, useContext} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef, type Ref} from 'react-aria/private/utils/useObjectRef';
import {useSyncRef} from 'react-aria/private/utils/useSyncRef';
type InputHTMLAttributes<T> = JSX.InputHTMLAttributes<T>;
import {useFocusRing} from 'react-aria/useFocusRing';
import {useHover} from 'react-aria/useHover';

interface ColorState {
  getDisplayColor(): Color;
  isDragging: boolean;
}

interface InternalColorThumbContextValue {
  state: ColorState;
  thumbProps: DOMAttributes;
  inputXRef: RefObject<HTMLInputElement | null>;
  inputYRef?: RefObject<HTMLInputElement | null>;
  xInputProps: InputHTMLAttributes<HTMLInputElement>;
  yInputProps?: InputHTMLAttributes<HTMLInputElement>;
  isDisabled?: boolean;
}

export const InternalColorThumbContext = createContext<InternalColorThumbContextValue | null>(null);

export interface ColorThumbRenderProps {
  /**
   * The selected color, excluding the alpha channel.
   */
  color: Color;
  /**
   * Whether this thumb is currently being dragged.
   *
   * @selector [data-dragging]
   */
  isDragging: boolean;
  /**
   * Whether the thumb is currently hovered with a mouse.
   *
   * @selector [data-hovered]
   */
  isHovered: boolean;
  /**
   * Whether the thumb is currently focused.
   *
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the thumb is keyboard focused.
   *
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the thumb is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
}

export interface ColorThumbProps
  extends HoverEvents, RenderProps<ColorThumbRenderProps>, GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-ColorThumb'
   */
  className?: ClassNameOrFunction<ColorThumbRenderProps>;
  ref?: Ref<HTMLDivElement>;
}

/**
 * A color thumb appears within a ColorArea, ColorSlider, or ColorWheel and allows a user to drag to
 * adjust the color value.
 */
export function ColorThumb(props: ColorThumbProps) {
  let ref = useObjectRef<HTMLDivElement>();
  useSyncRef(props, ref);
  let context = useContext(InternalColorThumbContext)!;
  let inputXRef = useObjectRef<HTMLInputElement>(context.inputXRef);
  let inputYRef = useObjectRef<HTMLInputElement>(context.inputYRef);
  let {focusProps, isFocused, isFocusVisible} = useFocusRing();
  let {hoverProps, isHovered} = useHover(props);

  let renderProps = useRenderProps(merge(props, {
    defaultClassName: 'react-aria-ColorThumb',
    get defaultStyle() {return merge(context.thumbProps.style ?? {}, {get backgroundColor() {return context.state.getDisplayColor().toString();}});},
    values: {
      get color() {return context.state.getDisplayColor();},
      get isHovered() {return isHovered();},
      get isDragging() {return context.state.isDragging;},
      get isFocused() {return isFocused();},
      get isFocusVisible() {return isFocusVisible();},
      get isDisabled() {return context.isDisabled ?? false;}
    }
  }));

  let DOMProps = omit(filterDOMProps(props, {global: true}), 'id');

  return (
    <dom.div
      {...mergeProps(context.thumbProps, hoverProps, DOMProps)}
      {...renderProps}
      ref={ref}
      data-hovered={isHovered() ? 'true' : undefined}
      data-dragging={context.state.isDragging ? 'true' : undefined}
      data-focused={isFocused() ? 'true' : undefined}
      data-focus-visible={isFocusVisible() ? 'true' : undefined}
      data-disabled={context.isDisabled ? 'true' : undefined}>
      <input {...context.xInputProps} {...focusProps} ref={inputXRef} />
      {context.yInputProps && <input {...context.yInputProps} {...focusProps} ref={inputYRef} />}
      {renderProps.children}
    </dom.div>
  );
}
