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
import {StyleProps} from '@react-types/shared';
import modalStyles from '@adobe/spectrum-css-temp/components/modal/vars.css';
import {Overlay, OverlayProps} from './Overlay';
import {OverlayTriggerState} from 'react-stately/useOverlayTriggerState';
import overrideStyles from './overlays.css';
import {omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {Underlay} from './Underlay';
import {useDOMRef} from '../utils/useDOMRef';
import {useObjectRef} from 'react-aria/useObjectRef';
import type {ObjectRef} from 'react-aria/private/utils/useObjectRef';
import {useStyleProps} from '../utils/styleProps';
import {useViewportSize} from 'react-aria/private/utils/useViewportSize';

interface ModalProps
  extends AriaModalOverlayProps, StyleProps, Omit<OverlayProps, 'nodeRef' | 'shouldContainFocus' | 'children'> {
  children: JSX.Element;
  state: OverlayTriggerState;
  type?: 'modal' | 'fullscreen' | 'fullscreenTakeover';
}

interface ModalWrapperProps extends ModalProps {
  isOpen?: boolean;
  wrapperRef: ObjectRef<HTMLDivElement>;
  domRef: ObjectRef<HTMLDivElement>;
}

export function Modal(props: ModalProps): JSX.Element {
  let otherProps = omit(props, 'children', 'state', 'ref');
  let domRef = useDOMRef<HTMLDivElement>(props.ref);
  let wrapperRef = useObjectRef<HTMLDivElement>();

  return (
    <Overlay {...otherProps} isOpen={props.state.isOpen} nodeRef={wrapperRef}>
      {transition => <ModalWrapper {...props} isOpen={transition.isOpen} wrapperRef={wrapperRef} domRef={domRef}>
        {props.children}
      </ModalWrapper>}
    </Overlay>
  );
}

let typeMap: Partial<Record<NonNullable<ModalProps['type']>, string>> = {
  fullscreen: 'fullscreen',
  fullscreenTakeover: 'fullscreenTakeover'
};

function ModalWrapper(props: ModalWrapperProps): JSX.Element {
  let typeVariant = () => props.type != null ? typeMap[props.type] : undefined;
  let {styleProps} = useStyleProps(props);
  let objRef = props.domRef;
  let {modalProps, underlayProps} = useModalOverlay(props, props.state, objRef);

  let wrapperClassName = classNames(
    modalStyles,
    'spectrum-Modal-wrapper',
    classNames(overrideStyles, 'spectrum-Modal-wrapper', 'react-spectrum-Modal-wrapper')
  );

  let modalClassName = () => classNames(
    modalStyles,
    'spectrum-Modal',
    {
      'is-open': props.isOpen
    },
    classNames(overrideStyles, 'spectrum-Modal', 'react-spectrum-Modal'),
    {[`spectrum-Modal--${typeVariant()}`]: typeVariant()},
    styleProps.class as string | undefined
  );

  let viewport = useViewportSize();
  let style = () => ({'--spectrum-visual-viewport-height': viewport.height + 'px'});

  // Attach Transition's nodeRef to outer most wrapper for node.reflow: https://github.com/reactjs/react-transition-group/blob/c89f807067b32eea6f68fd6c622190d88ced82e2/src/Transition.js#L231
  return (
    <div ref={props.wrapperRef}>
      <Underlay {...omit(underlayProps, 'ref')} isOpen={props.isOpen} />
      <div class={wrapperClassName} style={style()}>
        <div
          {...styleProps}
          {...modalProps}
          ref={objRef}
          class={modalClassName()}
          data-testid="modal">
          {props.children}
        </div>
      </div>
    </div>
  );
}
