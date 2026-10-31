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

import {AriaModalOverlayProps, useModalOverlay} from 'react-aria/useModalOverlay';

import {classNames} from '../utils/classNames';
import {DismissButton} from 'react-aria/Overlay';
import {StyleProps} from '@react-types/shared';
import {Overlay, OverlayProps} from './Overlay';
import {OverlayTriggerState} from 'react-stately/useOverlayTriggerState';
import overrideStyles from './overlays.css';
import {merge, omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import type {ObjectRef} from 'react-aria/private/utils/useObjectRef';
import trayStyles from '@adobe/spectrum-css-temp/components/tray/vars.css';
import {Underlay} from './Underlay';
import {DOMRef, useDOMRef} from '../utils/useDOMRef';
import {useObjectRef} from 'react-aria/useObjectRef';
import {useStyleProps} from '../utils/styleProps';
import {useViewportSize} from 'react-aria/private/utils/useViewportSize';

interface TrayProps
  extends AriaModalOverlayProps, StyleProps, Omit<OverlayProps, 'nodeRef' | 'shouldContainFocus' | 'children'> {
  children: JSX.Element;
  state: OverlayTriggerState;
  isFixedHeight?: boolean;
}

interface TrayWrapperProps extends TrayProps {
  isOpen?: boolean;
  wrapperRef: ObjectRef<HTMLDivElement>;
  domRef: ObjectRef<HTMLDivElement>;
}

export function Tray(props: TrayProps & {ref?: DOMRef<HTMLDivElement>}): JSX.Element {
  let otherProps = omit(props, 'children', 'state', 'ref');
  let domRef = useDOMRef<HTMLDivElement>(props.ref);
  let wrapperRef = useObjectRef<HTMLDivElement>();

  return (
    <Overlay {...otherProps} isOpen={props.state.isOpen} nodeRef={wrapperRef}>
      {transition => <TrayWrapper {...props} isOpen={transition.isOpen} wrapperRef={wrapperRef} domRef={domRef}>
        {props.children}
      </TrayWrapper>}
    </Overlay>
  );
}

function TrayWrapper(props: TrayWrapperProps): JSX.Element {
  let {styleProps} = useStyleProps(props);
  let objRef = props.domRef;

  let {modalProps, underlayProps} = useModalOverlay(
    merge(props, {
      isDismissable: true
    }),
    props.state,
    objRef
  );

  // We need to measure the window's height in JS rather than using percentages in CSS
  // so that contents (e.g. menu) can inherit the max-height properly. Using percentages
  // does not work properly because there is nothing to base the percentage on.
  // We cannot use vh units because mobile browsers adjust the window height dynamically
  // when the address bar/bottom toolbars show and hide on scroll and vh units are fixed.
  // Also, the visual viewport is smaller than the layout viewport when the virtual keyboard
  // is up, so use the VisualViewport API to ensure the tray is displayed above the keyboard.
  let viewport = useViewportSize();
  let wrapperStyle = () => ({
    '--spectrum-visual-viewport-height': viewport.height + 'px',
    // position: fixed elements are clipped by Safari on iOS 26, so we use
    // position: absolute and manually set the top to the scrollY.
    // The page can't scroll while the tray is open so this doesn't need to update.
    top: (typeof window !== 'undefined' ? window.scrollY : 0) + 'px'
  });

  let wrapperClassName = classNames(trayStyles, 'spectrum-Tray-wrapper');

  let className = () => classNames(
    trayStyles,
    'spectrum-Tray',
    {
      'is-open': props.isOpen,
      'spectrum-Tray--fixedHeight': props.isFixedHeight
    },
    classNames(overrideStyles, 'spectrum-Tray', 'react-spectrum-Tray'),
    styleProps.class as string | undefined
  );

  // Attach Transition's nodeRef to outer most wrapper for node.reflow: https://github.com/reactjs/react-transition-group/blob/c89f807067b32eea6f68fd6c622190d88ced82e2/src/Transition.js#L231
  return (
    <div ref={props.wrapperRef}>
      <Underlay {...omit(underlayProps, 'ref')} isOpen={props.isOpen} />
      <div class={wrapperClassName} style={wrapperStyle()}>
        <div {...styleProps} {...modalProps} class={className()} ref={objRef} data-testid="tray">
          <DismissButton onDismiss={props.state.close} />
          {props.children}
          <DismissButton onDismiss={props.state.close} />
        </div>
      </div>
    </div>
  );
}
