import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  StyleRenderProps,
  SlotProps,
  useContextProps,
  useRenderProps
} from './utils';
import {AriaLabelingProps, HoverEvents} from '@react-types/shared';
import {InputRenderProps} from './Input';
import {mergeProps} from 'react-aria/mergeProps';
import {createContext, merge, omit, untrack, type Ref} from 'solid-js';
import type {JSX} from '@solidjs/web';
type TextareaHTMLAttributes<T> = JSX.TextareaHTMLAttributes<T>;
import {useFocusRing} from 'react-aria/useFocusRing';
import {useHover} from 'react-aria/useHover';

export interface TextAreaProps
  extends
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'class' | 'style' | 'render' | 'slot' | 'id' | keyof AriaLabelingProps>,
    AriaLabelingProps,
    SlotProps,
    HoverEvents,
    StyleRenderProps<InputRenderProps, 'textarea'> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-TextArea'
   */
  className?: ClassNameOrFunction<InputRenderProps>;
  id?: string;
  autoFocus?: boolean;
}

export const TextAreaContext = createContext<ContextValue<TextAreaProps, HTMLTextAreaElement>>({});

let filterHoverProps = (props: TextAreaProps): TextAreaProps => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return omit(props, 'onHoverStart', 'onHoverChange', 'onHoverEnd');
};

/**
 * A textarea allows a user to input mult-line text.
 */
export function TextArea(props: TextAreaProps & {ref?: Ref<HTMLTextAreaElement>}) {
  let ref = untrack(() => props.ref);
  [props, ref] = useContextProps(props, ref, TextAreaContext);

  let {hoverProps, isHovered} = useHover(props);
  let {isFocused, isFocusVisible, focusProps} = useFocusRing({
    isTextInput: true,
    get autoFocus() {return props.autoFocus;}
  });

  let isInvalid = () => !!props['aria-invalid'] && props['aria-invalid'] !== 'false';
  let renderProps = useRenderProps(merge(props, {
    values: {
      get isHovered() {return isHovered();},
      get isFocused() {return isFocused();},
      get isFocusVisible() {return isFocusVisible();},
      get isDisabled() {return !!props.disabled;},
      get isInvalid() {return isInvalid();}
    },
    defaultClassName: 'react-aria-TextArea'
  }));
  // Keep the callback value intact so the attachment bridge receives its
  // replacement-aware teardown rather than a compiled applyRef wrapper.
  let refProps = {ref};

  return (
    <dom.textarea
      {...mergeProps(filterHoverProps(props), focusProps, hoverProps)}
      {...renderProps}
      {...refProps}
      data-focused={isFocused() || undefined}
      data-disabled={props.disabled || undefined}
      data-hovered={isHovered() || undefined}
      data-focus-visible={isFocusVisible() || undefined}
      data-invalid={isInvalid() || undefined}
    />
  );
}
