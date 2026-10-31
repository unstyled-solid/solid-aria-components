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

import {AriaPopoverProps, PopoverAria, usePopover} from 'react-aria/usePopover';

import {classNames} from '../utils/classNames';
import {DismissButton} from 'react-aria/Overlay';
import {RefObject, StyleProps} from '@react-types/shared';
import {FocusWithinProps, useFocusWithin} from 'react-aria/useFocusWithin';
import {mergeProps} from 'react-aria/mergeProps';
import {Overlay} from './Overlay';
import {OverlayTriggerState} from 'react-stately/useOverlayTriggerState';
import overrideStyles from './overlays.css';
import {createEffect, createSignal, merge, omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import type {ObjectRef} from 'react-aria/private/utils/useObjectRef';
import styles from '@adobe/spectrum-css-temp/components/popover/vars.css';
import {Underlay} from './Underlay';
import {DOMRef, useDOMRef} from '../utils/useDOMRef';
import {useObjectRef} from 'react-aria/useObjectRef';
import {useStyleProps} from '../utils/styleProps';

interface PopoverProps
  extends Omit<AriaPopoverProps, 'popoverRef' | 'maxHeight'>, FocusWithinProps, StyleProps {
  children: JSX.Element;
  ref?: DOMRef<HTMLDivElement>;
  hideArrow?: boolean;
  state: OverlayTriggerState;
  shouldContainFocus?: boolean;
  onEntering?: () => void;
  onEnter?: () => void;
  onEntered?: () => void;
  onExiting?: () => void;
  onExited?: () => void;
  onExit?: () => void;
  container?: HTMLElement;
  disableFocusManagement?: boolean;
  enableBothDismissButtons?: boolean;
  onDismissButtonPress?: () => void;
}

interface PopoverWrapperProps extends PopoverProps, FocusWithinProps {
  isOpen?: boolean;
  wrapperRef: ObjectRef<HTMLDivElement>;
  domRef: ObjectRef<HTMLDivElement>;
}

interface ArrowProps {
  arrowProps: PopoverAria['arrowProps'];
  isLandscape: boolean;
  arrowRef?: ObjectRef<SVGSVGElement>;
  primary: number;
  secondary: number;
  borderDiagonal: number;
}

/**
 * Arrow placement can be done pointing right or down because those paths start at 0, x or y.
 * Because the other two don't, they start at a fractional pixel value, it introduces rounding
 * differences between browsers and between display types (retina with subpixels vs not retina). By
 * flipping them with CSS we can ensure that the path always starts at 0 so that it perfectly
 * overlaps the popover's border. See bottom of file for more explanation.
 */
let arrowPlacement: Record<string, string> = {
  left: 'right',
  right: 'right',
  top: 'bottom',
  bottom: 'bottom'
};

export function Popover(props: PopoverProps): JSX.Element {
  let otherProps = omit(props, 'children', 'state', 'ref');
  let domRef = useDOMRef<HTMLDivElement>(props.ref);
  let wrapperRef = useObjectRef<HTMLDivElement>();

  return (
    <Overlay {...otherProps} isOpen={props.state.isOpen} nodeRef={wrapperRef}>
      {transition => <PopoverWrapper {...props} isOpen={transition.isOpen} wrapperRef={wrapperRef} domRef={domRef}>
        {props.children}
      </PopoverWrapper>}
    </Overlay>
  );
}

function PopoverWrapper(props: PopoverWrapperProps): JSX.Element {
    let onDismissButtonPress = () => (props.onDismissButtonPress ?? props.state.close)();
    let {styleProps} = useStyleProps(props);
    let objRef = props.domRef;

    let {size, borderWidth, arrowRef} = useArrowSize();
    const borderRadius = usePopoverBorderRadius(objRef);
    let borderDiagonal = () => borderWidth() * Math.SQRT2;
    let primary = () => size() + borderDiagonal();
    let secondary = () => primary() * 2;
    let {popoverProps, arrowProps, underlayProps, placement} = usePopover(
      merge(omit(props, 'maxHeight'), {
        popoverRef: objRef,
        maxHeight: undefined,
        get arrowSize() { return props.hideArrow ? 0 : secondary(); },
        get arrowBoundaryOffset() { return borderRadius(); }
      }),
      props.state
    );
    let {focusWithinProps} = useFocusWithin(props);

    // Attach Transition's nodeRef to outermost wrapper for node.reflow: https://github.com/reactjs/react-transition-group/blob/c89f807067b32eea6f68fd6c622190d88ced82e2/src/Transition.js#L231
    return (
      <div ref={props.wrapperRef}>
        {!props.isNonModal && <Underlay isTransparent {...omit(underlayProps, 'ref')} isOpen={props.isOpen} />}
        <div
          {...styleProps}
          {...mergeProps(popoverProps, focusWithinProps)}
          style={{
            ...styleProps.style as JSX.CSSProperties,
            ...popoverProps.style
          }}
          ref={objRef}
          class={classNames(
            styles,
            'spectrum-Popover',
            `spectrum-Popover--${placement()}`,
            {
              'spectrum-Popover--withTip': !props.hideArrow,
              'is-open': props.isOpen,
              [`is-open--${placement()}`]: props.isOpen,
              'is-exiting': !props.state.isOpen
            },
            classNames(overrideStyles, 'spectrum-Popover', 'react-spectrum-Popover'),
            styleProps.class as string | undefined
          )}
          role="presentation"
          data-testid="popover">
          {(!props.isNonModal || props.enableBothDismissButtons) && (
            <DismissButton onDismiss={onDismissButtonPress} />
          )}
          {props.children}
          {props.hideArrow ? null : (
            <Arrow
              arrowProps={arrowProps}
              isLandscape={placement() != null ? arrowPlacement[placement()!] === 'bottom' : false}
              arrowRef={arrowRef}
              primary={primary()}
              secondary={secondary()}
              borderDiagonal={borderDiagonal()}
            />
          )}
          <DismissButton onDismiss={onDismissButtonPress} />
        </div>
      </div>
    );
}

function usePopoverBorderRadius(popoverRef: RefObject<HTMLDivElement | null>) {
  let [borderRadius, setBorderRadius] = createSignal(0);
  createEffect(() => popoverRef.current, element => {
    if (element) {
      let spectrumBorderRadius = window.getComputedStyle(element).borderRadius;
      if (spectrumBorderRadius !== '') {
        setBorderRadius(parseInt(spectrumBorderRadius, 10));
      }
    }
  });
  return borderRadius;
}

function useArrowSize() {
  let [size, setSize] = createSignal(20);
  let [borderWidth, setBorderWidth] = createSignal(1);
  let arrowRef = useObjectRef<SVGSVGElement>();
  // get the css value for the tip size and divide it by 2 for this arrow implementation
  createEffect(() => arrowRef.current, element => {
    if (element) {
      let spectrumTipWidth = window
        .getComputedStyle(element)
        .getPropertyValue('--spectrum-popover-tip-size');
      if (spectrumTipWidth !== '') {
        setSize(parseInt(spectrumTipWidth, 10) / 2);
      }

      let spectrumBorderWidth = window
        .getComputedStyle(element)
        .getPropertyValue('--spectrum-popover-tip-borderWidth');
      if (spectrumBorderWidth !== '') {
        setBorderWidth(parseInt(spectrumBorderWidth, 10));
      }
    }
  });
  return {size, borderWidth, arrowRef};
}

function Arrow(props: ArrowProps) {
  let halfBorderDiagonal = () => props.borderDiagonal / 2;

  let primaryStart = 0;
  let primaryEnd = () => props.primary - halfBorderDiagonal();

  let secondaryStart = halfBorderDiagonal;
  let secondaryMiddle = () => props.secondary / 2;
  let secondaryEnd = () => props.secondary - halfBorderDiagonal();

  let pathData = () => props.isLandscape
    ? [
        'M',
        secondaryStart(),
        primaryStart,
        'L',
        secondaryMiddle(),
        primaryEnd(),
        'L',
        secondaryEnd(),
        primaryStart
      ]
    : [
        'M',
        primaryStart,
        secondaryStart(),
        'L',
        primaryEnd(),
        secondaryMiddle(),
        'L',
        primaryStart,
        secondaryEnd()
      ];

  /* use ceil because the svg needs to always accommodate the path inside it */
  return (
    <svg
      xmlns="http://www.w3.org/svg/2000"
      width={Math.ceil(props.isLandscape ? props.secondary : props.primary)}
      height={Math.ceil(props.isLandscape ? props.primary : props.secondary)}
      class={classNames(styles, 'spectrum-Popover-tip')}
      ref={props.arrowRef}
      {...omit(props.arrowProps, 'ref')}>
      <path
        class={classNames(styles, 'spectrum-Popover-tip-triangle')}
        d={pathData().join(' ')}
      />
    </svg>
  );
}

/**
 * More explanation on popover tips. - I tried changing the calculation of the popover placement in
 * an effort to get it squarely onto the pixel grid. This did not work because the problem was in
 * the svg partial pixel end of the path in the popover right and popover bottom. - I tried creating
 * an extra 'bandaid' path that matched the background color and would overlap the popover border.
 * This didn't work because the border on the svg triangle didn't extend all the way to match nicely
 * with the popover border. - I tried getting the client bounding box and setting the svg to that
 * partial pixel value This didn't work because again the issue was inside the svg - I didn't try
 * drawing the svg backwards This could still be tried - I tried changing the calculation of the
 * popover placement AND the svg height/width so that they were all rounded This seems to have done
 * the trick.
 */
