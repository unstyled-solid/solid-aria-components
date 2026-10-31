/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {FocusScope, FocusScopeProps} from '../../src/focus/FocusScope';
import {createSignal, onSettled} from 'solid-js';
import {JSX, Portal} from '@solidjs/web';

const dialogsRoot = 'dialogsRoot';

interface StoryProps {
  isPortaled: boolean;
  contain: boolean;
}

const meta = {
  title: 'FocusScope',
  parameters: {
    description: {
      data: 'Should not be able to click or navigate back into inputs from previous "dialogs".'
    }
  },
  excludeStories: ['Example']
};

export default meta;

export type FocusScopeStory = ((props: FocusScopeProps & Partial<StoryProps>) => JSX.Element) & {storyName?: string};
export interface FocusScopeStoryObj {
  render: FocusScopeStory;
  name?: string;
  args?: FocusScopeProps & Partial<StoryProps>;
  argTypes?: Record<string, unknown>;
  parameters?: Record<string, unknown>;
}

function MaybePortal(props: {children?: JSX.Element; isPortaled?: boolean}) {
  return <>{props.isPortaled ? <Portal mount={document.getElementById(dialogsRoot)!}>{props.children}</Portal> : props.children}</>;
}

function NestedDialog(props: {
  onClose: VoidFunction;
  isPortaled?: boolean;
  contain?: boolean;
}) {
  let [open, setOpen] = createSignal(false);
  let [showNew, setShowNew] = createSignal(false);
  let onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      props.onClose();
    }
  };

  return (
    <MaybePortal isPortaled={props.isPortaled}>
      <FocusScope contain={props.contain} restoreFocus autoFocus>
        {!showNew() && (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <div role="dialog" onKeyDown={onKeyDown}>
            <input />
            <input />
            <input />
            <button onClick={() => setShowNew(true)}>replace focusscope children</button>
            <button type="button" onClick={() => setOpen(true)}>
              Open dialog
            </button>
            <button type="button" onClick={props.onClose}>
              close
            </button>
            {open() && (
              <NestedDialog
                contain={props.contain}
                onClose={() => setOpen(false)}
                isPortaled={props.isPortaled}
              />
            )}
          </div>
        )}
        {showNew() && (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <div role="dialog" onKeyDown={onKeyDown}>
            <input />
            <input autofocus />
            <input />
          </div>
        )}
      </FocusScope>
    </MaybePortal>
  );
}

export let Example = (props: FocusScopeProps & Partial<StoryProps>): JSX.Element => {
  let [open, setOpen] = createSignal(false);

  return (
    <div>
      <input aria-label="input before" />
      <button type="button" onClick={() => setOpen(true)}>
        Open dialog
      </button>
      <input aria-label="input after" />
      {open() && (
        <NestedDialog onClose={() => setOpen(false)} isPortaled={props.isPortaled} contain={props.contain} />
      )}

      <div id={dialogsRoot} />
    </div>
  );
};

export let ExampleStory: FocusScopeStory = args => <Example {...args} />;
ExampleStory.storyName = 'Example';

function FocusableFirstInScopeExample() {
  let [contentIndex, setContentIndex] = createSignal(0);
  let [buttonRemoved, setButtonRemoved] = createSignal(false);
  function DialogContent(index = 0) {
    const nextIndex = index === 2 ? 0 : index + 1;
    return (
      <>
        <h1 id={`heading-${index}`}>Dialog {index + 1}</h1>
        {index === 2 ? (
          <>
            <p>The end of the road.</p>
            <button
              id={`button-${index}`}
              onClick={e => {
                (e.target as Element).remove();
                setButtonRemoved(true);
              }}>
              Remove Me
            </button>
            {buttonRemoved() && (
              <p>
                With no tabbable elements within the scope, FocusScope will try to focus the first
                focusable element within the scope, in this case, the dialog itself.
              </p>
            )}
          </>
        ) : (
          <>
            <p>
              Content that will be replaced by <strong>Dialog {nextIndex + 1}</strong>.
            </p>
            <button
              id={`button-${index}`}
              onClick={() => setContentIndex(nextIndex)}>
              Go to Dialog {nextIndex + 1}
            </button>
          </>
        )}
      </>
    );
  }
  const contents: (() => JSX.Element)[] = [];
  for (let i = 0; i < 3; i++) {
    contents.push(() => DialogContent(i));
  }
  return (
    <FocusScope contain>
      <div
        role="dialog"
        tabindex={-1}
        aria-labelledby={`heading-${contentIndex()}`}
        style={{
          border: '1px solid currentColor',
          'border-radius': '5px',
          padding: '0 1.5rem 1.5rem',
          width: '15rem'
        }}>
        {contents[contentIndex()]()}
      </div>
    </FocusScope>
  );
}

function IgnoreRestoreFocusExample() {
  const [display, setDisplay] = createSignal(false);
  onSettled(() => {
    let handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDisplay(false);
      }
    };
    document.body.addEventListener('keyup', handleKeyDown);
    return () => {
      document.body.removeEventListener('keyup', handleKeyDown);
    };
  });

  return (
    <div>
      <button type="button" onClick={() => setDisplay(state => !state)}>
        {display() ? 'Close dialog 1' : 'Open dialog 1'}
      </button>
      <button type="button" onClick={() => setDisplay(state => !state)}>
        {display() ? 'Close dialog 2' : 'Open dialog 2'}
      </button>
      {display() && (
        <FocusScope restoreFocus>
          <div role="dialog">
            <input />
            <input />
            <input />
          </div>
        </FocusScope>
      )}
    </div>
  );
}

export const KeyboardNavigation: FocusScopeStoryObj = {
  render: args => <Example {...args} />,
  args: {isPortaled: false}
};

export const KeyboardNavigationInsidePortal: FocusScopeStoryObj = {
  render: args => <Example {...args} />,
  args: {isPortaled: true}
};

export const KeyboardNavigationNoContain: FocusScopeStoryObj = {
  render: args => <Example {...args} />,
  args: {isPortaled: false, contain: false}
};

export const KeyboardNavigationInsidePortalNoContain: FocusScopeStoryObj = {
  render: args => <Example {...args} />,
  args: {isPortaled: true, contain: false}
};

export const IgnoreRestoreFocus: FocusScopeStoryObj = {
  render: () => <IgnoreRestoreFocusExample />
};

export const FocusableFirstInScope: FocusScopeStoryObj = {
  render: () => <FocusableFirstInScopeExample />
};

function FocusableInputFormExample(args: FocusScopeProps) {
  let [isOpen, setOpen] = createSignal(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      {isOpen() && (
        <>
          <div style={{display: 'flex', 'flex-direction': 'column', 'margin-bottom': '10px'}}>
            <FocusScope contain={args.contain} restoreFocus={args.restoreFocus} autoFocus={args.autoFocus}>
              <label for="first-input">First Input</label>
              <input id="first-input" />
              <label for="second-input">Second Input</label>
              <input id="second-input" />
            </FocusScope>
          </div>
          <div style={{display: 'flex', 'flex-direction': 'column'}}>
            <label for="third-input">Third Input</label>
            <input id="third-input" />
          </div>
          <button onClick={() => setOpen(false)}>Close</button>
        </>
      )}
    </>
  );
}

export const FocusableInputForm: FocusScopeStoryObj = {
  name: 'FocusableInputForm',
  render: args => <FocusableInputFormExample {...args} />,
  args: {
    contain: true,
    restoreFocus: true,
    autoFocus: true
  },
  argTypes: {
    contain: {
      control: 'boolean'
    },
    restoreFocus: {
      control: 'boolean'
    },
    autoFocus: {
      control: 'boolean'
    }
  },
  parameters: {
    description: {
      data: `
1. Open OS keyboard settings
2. Add Chinese Pinyin - Simplified
3. Go to the third input
4. Type "ni", a set of suggestions should appear
5. Press Tab 3x and see how it shows different suggestions
6. Go to the first input
7. Repeat steps 4&5
8. See how it leaves the suggestions and jumps to the form button
`
    }
  }
};

export let ContainsHiddenElement: FocusScopeStoryObj = {
  render: args => (
    <FocusScope {...args}>
      <input />
      <input style={{visibility: 'hidden'}} />
      <input />
    </FocusScope>
  ),
  args: {
    contain: true
  },
  argTypes: {
    contain: {
      control: 'boolean'
    },
    restoreFocus: {
      control: 'boolean'
    },
    autoFocus: {
      control: 'boolean'
    }
  },
  parameters: {
    description: {
      data: `
Should be able to tab navigate from the first input to the last input.
`
    }
  }
};
