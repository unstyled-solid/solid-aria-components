/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {ActionButtonGroupContext} from './ActionButtonGroup';
import {AvatarContext} from './Avatar';
import {
  baseColor,
  focusRing,
  fontRelative,
  lightDark,
  space,
  style
} from '../style' with {type: 'macro'};
import {ButtonProps, ButtonRenderProps, Button as RACButton} from 'react-aria-components/Button';
import {centerBaseline} from './CenterBaseline';
import {ContextValue, Provider, useSlottedContext} from 'react-aria-components/slots';
import {
  control,
  getAllowedOverrides,
  staticColor,
  StyleProps
} from './style-utils' with {type: 'macro'};
import CornerTriangle from '../ui-icons/CornerTriangle';
import {createContext, createMemo, untrack, useContext, type Element as ReactNode} from 'solid-js';
import {FocusableRef, FocusableRefValue, GlobalDOMAttributes} from '@react-types/shared';
import {IconContext} from './Icon';
import {ImageContext} from './Image';
import intlMessages from '../intl/*.json';
import {NotificationBadgeContext} from './NotificationBadge';
import {OverlayTriggerStateContext} from 'react-aria-components/Dialog';
import {pressScale} from './pressScale';
import {ProgressCircle} from './ProgressCircle';
import {SkeletonContext} from './Skeleton';
import {Text, TextContext} from './Content';
import {useFocusableRef} from './useDOMRef';
import {useFormProps} from './Form';
import {useLocale} from 'react-aria/I18nProvider';
import {useLocalizedStringFormatter} from 'react-aria/useLocalizedStringFormatter';
import {usePendingState} from './Button';
import {useSpectrumContextProps} from './useSpectrumContextProps';

export interface ActionButtonStyleProps {
  /**
   * The size of the ActionButton.
   *
   * @default 'M'
   */
  size?: 'XS' | 'S' | 'M' | 'L' | 'XL';
  /** The static color style to apply. Useful when the ActionButton appears over a color background. */
  staticColor?: 'black' | 'white' | 'auto';
  /**
   * Whether the button should be displayed with a [quiet
   * style](https://spectrum.adobe.com/web/rsp/components/action-button#component-options).
   */
  isQuiet?: boolean;
}

interface ToggleButtonStyleProps {
  /** Whether the ActionButton should be selected (controlled). */
  isSelected?: boolean;
  /**
   * Whether the button should be displayed with an [emphasized
   * style](https://spectrum.adobe.com/web/rsp/components/action-button#component-options).
   */
  isEmphasized?: boolean;
}

interface ActionGroupItemStyleProps {
  density?: 'regular' | 'compact';
  orientation?: 'horizontal' | 'vertical';
  isJustified?: boolean;
}

export interface ActionButtonProps
  extends
    Omit<
      ButtonProps,
      | 'className'
      | 'style'
      | 'render'
      | 'children'
      | 'onHover'
      | 'onHoverStart'
      | 'onHoverEnd'
      | 'onHoverChange'
      | 'onClick'
      | keyof GlobalDOMAttributes
    >,
    StyleProps,
    ActionButtonStyleProps {
  /** The content to display in the ActionButton. */
  children: ReactNode;
}

// These styles handle both ActionButton and ToggleButton
const iconOnly = ':has([slot=icon], [slot=avatar]):not(:has([data-rsp-slot=text]))';
const avatarOnly = ':has([slot=avatar]):not(:has([slot=icon], [data-rsp-slot=text]))';
const textOnly = ':has([data-rsp-slot=text]):not(:has([slot=icon], [slot=avatar]))';
const controlStyle = control({shape: 'default', icon: true});
export const btnStyles = style<
  ButtonRenderProps &
    ActionButtonStyleProps &
    ToggleButtonStyleProps &
    ActionGroupItemStyleProps & {isInGroup: boolean; isStaticColor: boolean}
>(
  {
    ...focusRing(),
    ...staticColor(),
    ...controlStyle,
    display: 'grid',
    justifyContent: 'center',
    flexShrink: {
      default: 1,
      isInGroup: 0
    },
    flexGrow: {
      isJustified: 1
    },
    flexBasis: {
      isJustified: 0
    },
    fontWeight: 'medium',
    width: {
      default: 'fit',
      isInGroup: {
        orientation: {
          vertical: '100%'
        }
      }
    },
    userSelect: 'none',
    transition: 'default',
    forcedColorAdjust: 'none',
    position: 'relative',
    gridTemplateAreas: {
      default: ['icon text'],
      [iconOnly]: ['icon'],
      [textOnly]: ['text']
    },
    gridTemplateColumns: {
      default: ['auto', 'auto'],
      [iconOnly]: ['auto'],
      [textOnly]: ['auto']
    },
    backgroundColor: {
      default: {
        ...baseColor('gray-100'),
        default: {
          default: 'gray-100',
          isQuiet: 'transparent'
        }
      },
      isSelected: {
        default: baseColor('neutral'),
        isEmphasized: {
          default: lightDark('accent-900', 'accent-700'),
          isHovered: lightDark('accent-1000', 'accent-600'),
          isPressed: lightDark('accent-1000', 'accent-600'),
          isFocusVisible: lightDark('accent-1000', 'accent-600')
        },
        isDisabled: {
          default: 'gray-100',
          isQuiet: 'transparent'
        }
      },
      isStaticColor: {
        ...baseColor('transparent-overlay-100'),
        default: {
          default: 'transparent-overlay-100',
          isQuiet: 'transparent'
        },
        isSelected: {
          default: baseColor('transparent-overlay-800'),
          isDisabled: {
            default: 'transparent-overlay-100',
            isQuiet: 'transparent'
          }
        }
      },
      forcedColors: {
        default: 'ButtonFace',
        isSelected: {
          default: 'Highlight',
          isDisabled: 'ButtonFace'
        }
      }
    },
    color: {
      default: baseColor('neutral'),
      isSelected: {
        default: 'gray-25',
        isEmphasized: 'white'
      },
      isDisabled: 'disabled',
      isStaticColor: {
        default: 'transparent-overlay-1000',
        isSelected: 'auto',
        isDisabled: 'transparent-overlay-400'
      },
      forcedColors: {
        default: 'ButtonText',
        isSelected: 'HighlightText',
        isDisabled: {
          default: 'GrayText'
        }
      }
    },
    '--iconPrimary': {
      type: 'fill',
      value: 'currentColor'
    },
    outlineColor: {
      default: 'focus-ring',
      isStaticColor: 'transparent-overlay-1000',
      forcedColors: 'Highlight'
    },
    borderStyle: 'none',
    borderTopStartRadius: {
      default: controlStyle.borderRadius,
      density: {
        compact: {
          default: 'none',
          ':first-child': controlStyle.borderRadius
        }
      }
    },
    borderTopEndRadius: {
      default: controlStyle.borderRadius,
      density: {
        compact: {
          default: 'none',
          orientation: {
            horizontal: {
              ':last-child': controlStyle.borderRadius
            },
            vertical: {
              ':first-child': controlStyle.borderRadius
            }
          }
        }
      }
    },
    borderBottomStartRadius: {
      default: controlStyle.borderRadius,
      density: {
        compact: {
          default: 'none',
          orientation: {
            horizontal: {
              ':first-child': controlStyle.borderRadius
            },
            vertical: {
              ':last-child': controlStyle.borderRadius
            }
          }
        }
      }
    },
    borderBottomEndRadius: {
      default: controlStyle.borderRadius,
      density: {
        compact: {
          default: 'none',
          ':last-child': controlStyle.borderRadius
        }
      }
    },
    zIndex: {
      isFocusVisible: 2
    },
    disableTapHighlight: true,
    '--badgeTop': {
      type: 'top',
      value: {
        default: 'calc(self(height)/2 - var(--iconWidth)/2)',
        [textOnly]: 0
      }
    },
    '--iconWidth': {
      type: 'width',
      value: '1lh'
    },
    '--badgePosition': {
      type: 'width',
      value: {
        default: '--iconWidth',
        [textOnly]: 'full'
      }
    },
    paddingX: {
      default: controlStyle.paddingX,
      [avatarOnly]: 0
    },
    // `control` sets this, but we need to override it for avatar only buttons.
    '--iconMargin': {
      type: 'marginStart',
      value: {
        default: fontRelative(-2),
        [iconOnly]: 0,
        [avatarOnly]: 0
      }
    }
  },
  getAllowedOverrides()
);

interface ActionButtonContextProps extends Partial<ActionButtonProps> {
  holdAffordance?: boolean;
}

export const ActionButtonContext =
  createContext<ContextValue<ActionButtonContextProps, FocusableRefValue<HTMLButtonElement>>>(null);

/**
 * ActionButtons allow users to perform an action. They're used for similar, task-based options
 * within a workflow, and are ideal for interfaces where buttons aren't meant to draw a lot of
 * attention.
 */
export function ActionButton(inputProps: ActionButtonProps & {ref?: FocusableRef<HTMLButtonElement>}) {
  // oxlint-disable-next-line react/react-compiler
  let [contextProps, ref] = useSpectrumContextProps(inputProps, untrack(() => inputProps.ref), ActionButtonContext);
  let props = useFormProps(contextProps);
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-spectrum/s2');
  let isPending = () => props.isPending ?? false;
  let holdAffordance = () => (props as ActionButtonContextProps).holdAffordance;
  let domRef = useFocusableRef(ref);
  let overlayTriggerState = useContext(OverlayTriggerStateContext);
  let ctx = createMemo(() => useSlottedContext(ActionButtonGroupContext));
  let density = () => ctx()?.density ?? 'regular';
  let orientation = () => ctx()?.orientation ?? 'horizontal';
  let staticColor = () => ctx()?.staticColor ?? props.staticColor;
  let isQuiet = () => ctx()?.isQuiet ?? props.isQuiet;
  let size = () => ctx()?.size ?? (props.size || 'M');
  let pendingState = usePendingState(isPending);
  let locale = useLocale();

  // oxlint-disable react/react-compiler
  return (
    <RACButton
      {...props}
      isDisabled={props.isDisabled ?? ctx()?.isDisabled}
      ref={value => { domRef.current = value; }}
      style={pressScale(domRef, props.UNSAFE_style)}
      className={renderProps =>
        (props.UNSAFE_className || '') +
        btnStyles(
          {
            ...renderProps,
            // Retain hover styles when an overlay is open.
            isHovered: renderProps.isHovered || overlayTriggerState?.isOpen || false,
            isDisabled: renderProps.isDisabled || pendingState.isProgressVisible,
            staticColor: staticColor(),
            isStaticColor: !!staticColor(),
            size: size(),
            isQuiet: isQuiet(),
            density: density(),
            isJustified: ctx()?.isJustified,
            orientation: orientation(),
            isInGroup: !!ctx()
          },
          props.styles
        )
      }>
      {renderProps => (
        <>
          <Provider
            values={[
              [SkeletonContext, null],
              [
                TextContext,
                {
                  get styles() { return style({
                    gridArea: 'text',
                    truncate: true,
                    visibility: {
                      isProgressVisible: 'hidden'
                    }
                  })({isProgressVisible: pendingState.isProgressVisible}); }
                }
              ],
              [
                IconContext,
                {
                  render: centerBaseline({slot: 'icon', styles: style({gridArea: 'icon'})}),
                  get styles() { return style({
                    size: '1lh',
                    marginStart: '--iconMargin',
                    visibility: {
                      isProgressVisible: 'hidden'
                    }
                  })({isProgressVisible: pendingState.isProgressVisible}); }
                }
              ],
              [
                AvatarContext,
                {
                  size: '1lh',
                  styles: style({
                    marginStart: '--iconMargin',
                    gridArea: 'icon'
                  })
                }
              ],
              [
                ImageContext,
                {
                  get styles() { return style({
                    visibility: {
                      isProgressVisible: 'hidden'
                    }
                  })({isProgressVisible: pendingState.isProgressVisible}); }
                }
              ],
              [
                NotificationBadgeContext,
                {
                  get staticColor() { return staticColor(); },
                  get size() { return props.size === 'XS' ? undefined : props.size; },
                  get isDisabled() { return renderProps.isDisabled; },
                  get styles() { return style({
                    position: 'absolute',
                    top: '--badgeTop',
                    marginTop: 'calc((self(height) * -1)/2)',
                    marginStart: 'calc(var(--iconMargin) * 2 + (self(height) * -1)/4)',
                    gridColumnStart: 1,
                    insetStart: '--badgePosition',
                    visibility: {
                      isProgressVisible: 'hidden'
                    }
                  })({isProgressVisible: pendingState.isProgressVisible}); }
                }
              ]
            ]}>
            {typeof props.children === 'string' ? <Text>{props.children}</Text> : props.children}
            {isPending() && (
              <div
                class={style({
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  visibility: {
                    default: 'hidden',
                    isProgressVisible: 'visible'
                  }
                })({isProgressVisible: pendingState.isProgressVisible, isPending: isPending()})}>
                <ProgressCircle
                  isIndeterminate
                  aria-label={stringFormatter.format('actionbutton.pending')}
                  size="S"
                  staticColor={staticColor()}
                  styles={style({size: '1lh'})}
                />
              </div>
            )}
          </Provider>
          {holdAffordance() && (
            <CornerTriangle
              size={size() === 'XS' ? 'S' : size() as 'S' | 'M' | 'L' | 'XL'}
              className={style({
                position: 'absolute',
                insetEnd: {
                  size: {
                    XS: space(3),
                    S: space(3),
                    M: 4,
                    L: space(5),
                    XL: space(6)
                  }
                },
                bottom: {
                  size: {
                    XS: space(3),
                    S: space(3),
                    M: 4,
                    L: space(5),
                    XL: space(6)
                  }
                },
                scaleX: {
                  direction: {
                    rtl: -1
                  }
                }
              })({direction: locale.direction, size: size()})}
            />
          )}
        </>
      )}
    </RACButton>
  );
  // oxlint-enable react/react-compiler
}
