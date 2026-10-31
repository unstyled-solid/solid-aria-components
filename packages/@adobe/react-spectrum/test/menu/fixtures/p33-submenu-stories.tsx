/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

// Frozen Submenu.stories.tsx selected source ranges: [(50, 79), (86, 100), (117, 145), (259, 319), (478, 540), (789, 806)]
import {action} from 'storybook/actions';
import type {JSX} from '@solidjs/web';
import {ActionButton} from '../../../src/button/ActionButton';
import AlignCenter from '@spectrum-icons/workflow/AlignCenter';
import AlignLeft from '@spectrum-icons/workflow/AlignLeft';
import AlignRight from '@spectrum-icons/workflow/AlignRight';
import AnnotatePen from '@spectrum-icons/workflow/AnnotatePen';
import TextIndentIncrease from '@spectrum-icons/workflow/TextIndentIncrease';
import TextItalics from '@spectrum-icons/workflow/TextItalic';
import {Item} from 'react-stately/Item';
import {Section} from 'react-stately/Section';
import {Keyboard} from '../../../src/text/Keyboard';
import {Text} from '../../../src/text/Text';
import {Menu, type SpectrumMenuProps} from '../../../src/menu/Menu';
import {MenuTrigger, type SpectrumMenuTriggerProps} from '../../../src/menu/MenuTrigger';
import {SubmenuTrigger} from '../../../src/menu/SubmenuTrigger';
import {render as renderMenuTrigger} from './p33-submenu-trigger-render';
export const SubmenuStaticRender = (
  args: Omit<SpectrumMenuProps<unknown>, 'children'> & {
    menuTriggerProps?: Omit<SpectrumMenuTriggerProps, 'children'>;
    submenu1Props?: Omit<SpectrumMenuProps<unknown>, 'children'>;
    submenu2Props?: Omit<SpectrumMenuProps<unknown>, 'children'>;
  }
): JSX.Element => {
  return renderMenuTrigger(
    menuProps => <Menu onAction={action('lvl 1 menu onAction')} {...args} {...menuProps}>
      <Item key="Lvl 1 Item 1">Lvl 1 Item 1</Item>
      <SubmenuTrigger>
        <Item key="Lvl 1 Item 2">Lvl 1 Item 2</Item>
        <Menu onAction={action('lvl 2 menu onAction')} {...args.submenu1Props}>
          <Item key="Lvl 2 Item 1">Lvl 2 Item 1</Item>
          <Item key="Lvl 2 Item 2">Lvl 2 Item 2</Item>
          <SubmenuTrigger>
            <Item key="Lvl 2 Item 3">Lvl 2 Item 3</Item>
            <Menu onAction={action('lvl 3 menu onAction')} {...args.submenu2Props}>
              <Item key="Lvl 3 Item 1">Lvl 3 Item 1</Item>
              <Item key="Lvl 3 Item 2">Lvl 3 Item 2</Item>
              <Item key="Lvl 3 Item 3">Lvl 3 Item 3</Item>
            </Menu>
          </SubmenuTrigger>
        </Menu>
      </SubmenuTrigger>
      <Item key="Lvl 1 Item 3">Lvl 1 Item 3</Item>
    </Menu>,
    args.menuTriggerProps
  );
};

let dynamicSubmenu = [
  {name: 'Lvl 1 Item 1'},
  {
    name: 'Lvl 1 Item 2',
    children: [
      {name: 'Lvl 2 Item 1'},
      {name: 'Lvl 2 Item 2'},
      {
        name: 'Lvl 2 Item 3',
        children: [{name: 'Lvl 3 Item 1'}, {name: 'Lvl 3 Item 2'}, {name: 'Lvl 3 Item 3'}]
      }
    ]
  },
  {name: 'Lvl 1 Item 3'}
];

// TODO: is this really the only way to define the dynamic render func? Kinda annoying that we have
// to define this func separately and recursively call it, but I don't think we can do the same approach as
// collapsible rows tableview since Menu isn't a collection component nor are we making the parent Menu tree collection
// track the full "tree" of menu items (we aren't making Item take other items/sections as children and are relying on each submenu having its own
// tree state + collection tracking its own level of items).
let dynamicRenderFunc = (item: ItemNode): JSX.Element => {
  if (item.children) {
    return (
      <SubmenuTrigger>
        <Item key={item.name}>{item.name}</Item>
        <Menu items={item.children} onAction={action(`${item.name} onAction`)}>
          {item => dynamicRenderFunc(item)}
        </Menu>
      </SubmenuTrigger>
    );
  } else {
    return <Item key={item.name}>{item.name}</Item>;
  }
};

export const SubmenuDynamicRender = (
  args: Omit<SpectrumMenuProps<unknown>, 'children'>
): JSX.Element => {
  return renderMenuTrigger(
    menuProps => <Menu items={dynamicSubmenu} onAction={action('onAction')} {...args} {...menuProps}>
      {item => dynamicRenderFunc(item)}
    </Menu>
  );
};

interface ItemNode {
  name?: string;
  icon?: string;
  shortcut?: string;
  textValue?: string;
  isSection?: boolean;
  children?: ItemNode[];
}

let iconMap = {
  AlignCenter,
  AlignLeft,
  AlignRight,
  AnnotatePen,
  TextIndentIncrease,
  TextItalics
};

let dynamicRenderTrigger = (item: ItemNode, Icon: typeof AlignCenter): JSX.Element => (
  <SubmenuTrigger>
    <Item key={item.name} textValue={item.name}>
      {item.icon && <Icon size="S" />}
      <Text>{item.name}</Text>
    </Item>
    <Menu items={item.children} onAction={action(`${item.name} onAction`)}>
      {item => dynamicRenderFuncSections(item)}
    </Menu>
  </SubmenuTrigger>
);

let dynamicRenderItem = (item: ItemNode, Icon: typeof AlignCenter): JSX.Element => (
  <Item key={item.name} textValue={item.name}>
    {item.icon && <Icon size="S" />}
    <Text>{item.name}</Text>
    {item.shortcut && <Keyboard>{item.shortcut}</Keyboard>}
  </Item>
);

let dynamicRenderFuncSections = (item: ItemNode): JSX.Element => {
  let Icon = iconMap[item.icon! as keyof typeof iconMap];
  if (item.children) {
    if (item.isSection) {
      let key = item.name ?? item.textValue;
      return (
        <Section key={key} title={item?.name} aria-label={item?.textValue} items={item.children}>
          {item => {
            if (item.children) {
              return dynamicRenderTrigger(item, Icon);
            } else {
              return dynamicRenderItem(item, Icon);
            }
          }}
        </Section>
      );
    } else {
      return dynamicRenderTrigger(item, Icon);
    }
  } else {
    return dynamicRenderItem(item, Icon);
  }
};

let complex = [
  {
    name: 'Font',
    icon: 'AnnotatePen',
    children: [
      {
        textValue: 'Font styles',
        isSection: true,
        children: [
          {name: 'Show Fonts', shortcut: '⌘T'},
          {name: 'Bold', shortcut: '⌘B'},
          {name: 'Italics', shortcut: '⌘I'},
          {name: 'Underline', shortcut: '⌘U'},
          {name: 'Strikethrough'}
        ]
      },
      {
        textValue: 'Font size',
        isSection: true,
        children: [
          {name: 'Bigger', shortcut: '⌘+'},
          {name: 'Smaller', shortcut: '⌘-'}
        ]
      },
      {
        textValue: 'Baseline section',
        isSection: true,
        children: [
          {
            name: 'Baseline',
            children: [{name: 'Use default'}, {name: 'Superscript'}, {name: 'Subscript'}]
          }
        ]
      }
    ]
  },
  {
    name: 'Text',
    icon: 'TextItalics',
    children: [
      {name: 'Align Left', icon: 'AlignLeft', shortcut: '⌘{'},
      {name: 'Center', icon: 'AlignCenter', shortcut: '⌘|'},
      {name: 'Justify'},
      {name: 'Align Right', icon: 'AlignRight', shortcut: '⌘}'}
    ]
  },
  {
    name: 'Indentation',
    icon: 'TextIndentIncrease',
    children: [
      {name: 'Increase', shortcut: '⌘]'},
      {name: 'Decrease', shortcut: '⌘['}
    ]
  }
];

export const ComplexRender = (args: Omit<SpectrumMenuProps<unknown>, 'children'>): JSX.Element => {
  return renderMenuTrigger(
    menuProps => <Menu items={complex} onAction={action('onAction')} {...args} {...menuProps}>
      {(item: any) => dynamicRenderFuncSections(item)}
    </Menu>
  );
};

export const TabBehaviorRender = (
  args: Omit<SpectrumMenuProps<unknown>, 'children'>
): JSX.Element => {
  return (
    <>
      <input data-testid="inputleft" />
      <div style={{display: 'flex', width: 'auto', margin: '250px 0'}}>
        <MenuTrigger onOpenChange={action('onOpenChange')}>
          <ActionButton>Menu Button</ActionButton>
          <Menu items={dynamicSubmenu} onAction={action('onAction')} {...args}>
            {item => dynamicRenderFunc(item)}
          </Menu>
        </MenuTrigger>
      </div>
      <input data-testid="inputright" />
    </>
  );
};
