import {DOMAttributes} from '@react-types/shared';
import {isFocusVisible, useFocusVisibleListener} from '../interactions/useFocusVisible';
import {Accessor, createSignal} from 'solid-js';
import {useFocus} from '../interactions/useFocus';
import {useFocusWithin} from '../interactions/useFocusWithin';

export interface AriaFocusRingProps {
  /**
   * Whether to show the focus ring when something
   * inside the container element has focus (true), or
   * only if the container itself has focus (false).
   *
   * @default 'false'
   */
  within?: boolean;

  /** Whether the element is a text input. */
  isTextInput?: boolean;

  /** Whether the element will be auto focused. */
  autoFocus?: boolean;
}

export interface FocusRingAria {
  /** Whether the element is currently focused. */
  isFocused: Accessor<boolean>;

  /** Whether keyboard focus should be visible. */
  isFocusVisible: Accessor<boolean>;

  /** Props to apply to the container element with the focus ring. */
  focusProps: DOMAttributes;
}

/**
 * Determines whether a focus ring should be shown to indicate keyboard focus.
 * Focus rings are visible only when the user is interacting with a keyboard,
 * not with a mouse, touch, or other input methods.
 */
export function useFocusRing(props: AriaFocusRingProps = {}): FocusRingAria {
  let visibility: boolean | undefined;
  let state = {current: {
    isFocused: false,
    // The source initial default is dormant until focus: every focus/modality
    // notification replaces it before publication. Keep it lazy so setup does
    // not snapshot a live autoFocus prop merely to initialize an unfocused ring.
    get isFocusVisible() { return visibility ?? (props.autoFocus || isFocusVisible()); },
    set isFocusVisible(value: boolean) { visibility = value; }
  }};
  let [isFocused, setFocused] = createSignal(false);
  let [isFocusVisibleState, setFocusVisible] = createSignal(false);

  let updateState = () => setFocusVisible(state.current.isFocused && state.current.isFocusVisible);

  let onFocusChange = (isFocused: boolean) => {
      state.current.isFocused = isFocused;
      state.current.isFocusVisible = isFocusVisible();
      setFocused(isFocused);
      updateState();
    };

  useFocusVisibleListener(
    isFocusVisible => {
      state.current.isFocusVisible = isFocusVisible;
      updateState();
    },
    [],
    {get enabled() { return isFocused(); }, get isTextInput() { return props.isTextInput; }}
  );

  let {focusProps} = useFocus({
    get isDisabled() { return props.within; },
    onFocusChange
  });

  let {focusWithinProps} = useFocusWithin({
    get isDisabled() { return !props.within; },
    onFocusWithinChange: onFocusChange
  });

  return {
    isFocused,
    isFocusVisible: isFocusVisibleState,
    focusProps: {
      get onFocusIn() { return (props.within ? focusWithinProps : focusProps).onFocusIn; },
      get onFocusOut() { return (props.within ? focusWithinProps : focusProps).onFocusOut; }
    }
  };
}
