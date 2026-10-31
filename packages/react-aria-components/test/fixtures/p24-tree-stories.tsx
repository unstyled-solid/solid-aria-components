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

import {action} from 'storybook/actions';

import {Button} from '../../src/Button';

import {Checkbox, CheckboxProps} from '../../src/Checkbox';

import {classNames} from '@adobe/react-spectrum/private/utils/classNames';

import {Collection} from 'react-aria/Collection';

import {ComboBox} from '../../src/ComboBox';


import {DroppableCollectionReorderEvent, Key} from '@react-types/shared';

import {Input} from '../../src/Input';

import {isTextDropItem} from 'react-aria/useDrop';
import {useDragAndDrop} from '../../src/useDragAndDrop';

import {ListBox} from '../../src/ListBox';


import {Menu, MenuItem, MenuTrigger} from '../../src/Menu';


import {MyListBoxItem} from './p24-my-listbox-item';
import {MyMenuItem} from './p24-tree-menu-item';

import {Popover} from '../../src/Popover';

import {For, merge, omit, untrack, type Element as ReactNode} from 'solid-js';
import type {JSX} from '@solidjs/web';

import styles from '../../example/index.css';

import {Text} from '../../src/Text';

import {TextField} from '../../src/TextField';

import {Toolbar} from '../../src/Toolbar';

import {
  Tree,
  TreeHeader,
  TreeItem,
  TreeItemContent,
  TreeItemProps,
  TreeProps,
  TreeSection
} from '../../src/Tree';

import {TreeLoadMoreItem} from '../../src/Tree';



import {useTreeData} from 'react-stately/useTreeData';


import '../../stories/styles.css';

type StoryObj<T> = {render: (args: any) => JSX.Element; args?: Record<string, any>; argTypes?: Record<string, any>; name?: string; parameters?: unknown};

interface StaticTreeItemProps extends TreeItemProps {
  title?: string;
  children: ReactNode;
  interactive?: ReactNode;
}

interface MyCheckboxProps extends CheckboxProps {
  children?: ReactNode;
}

function MyCheckbox(props: MyCheckboxProps) {
  return (
    <Checkbox {...omit(props, 'children')}>
      {values => (
        <>
          <div class="checkbox">
            <svg viewBox="0 0 18 18" aria-hidden="true">
              {values.isIndeterminate ? (
                <rect x={1} y={7.5} width={15} height={3} />
              ) : (
                <polyline points="1 9 7 14 15 4" />
              )}
            </svg>
          </div>
          {props.children}
        </>
      )}
    </Checkbox>
  );
}

const StaticTreeItem = (props: StaticTreeItemProps) => {
  return (
    <TreeItem
      {...props}
      className={({isFocused, isSelected, isHovered, isFocusVisible}) =>
        classNames(styles, 'tree-item', {
          focused: isFocused,
          'focus-visible': isFocusVisible,
          selected: isSelected,
          hovered: isHovered
        })
      }>
      <TreeItemContent>
        {values => (
          <>
            {values.selectionMode !== 'none' && values.selectionBehavior === 'toggle' && (
              <MyCheckbox slot="selection" />
            )}
            <div
              class={classNames(styles, 'content-wrapper')}
              style={{'margin-inline-start': `${(!values.hasChildItems ? 20 : 0) + (values.level - 1) * 15}px`}}>
              {values.hasChildItems && (
                <Button className={styles.chevron} slot="chevron">
                  <div
                    style={{
                      transform: `rotate(${values.isExpanded ? 90 : 0}deg)`,
                      width: '16px',
                      height: '16px'
                    }}>
                    <svg viewBox="0 0 24 24" style={{width: '16px', height: '16px'}}>
                      <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </Button>
              )}
              <Text class={styles.title}>{props.title || props.children}</Text>
              {props.interactive}
              <Button className={styles.button} aria-label="Info" onPress={action('Info press')}>
                ⓘ
              </Button>
              <MenuTrigger>
                <Button aria-label="Menu">☰</Button>
                <Popover>
                  <Menu className={styles.menu} onAction={action('menu action')}>
                    <MyMenuItem>Foo</MyMenuItem>
                    <MyMenuItem>Bar</MyMenuItem>
                    <MyMenuItem>Baz</MyMenuItem>
                  </Menu>
                </Popover>
              </MenuTrigger>
            </div>
          </>
        )}
      </TreeItemContent>
      {props.title && props.children}
    </TreeItem>
  );
};

export function TreeExampleStaticRender<T>(props: TreeProps<T>) {
  return (
    <Tree
      className={styles.tree}
      {...props}
      disabledKeys={['projects']}
      aria-label="test static tree"
      onExpandedChange={action('onExpandedChange')}
      onSelectionChange={action('onSelectionChange')}>
      <StaticTreeItem id="Photos" textValue="Photos">
        Photos
      </StaticTreeItem>
      <StaticTreeItem id="projects" textValue="Projects" title="Projects">
        <StaticTreeItem id="projects-1" textValue="Projects-1" title="Projects-1">
          <StaticTreeItem id="projects-1A" textValue="Projects-1A">
            Projects-1A
          </StaticTreeItem>
        </StaticTreeItem>
        <StaticTreeItem id="projects-2" textValue="Projects-2">
          Projects-2
        </StaticTreeItem>
        <StaticTreeItem id="projects-3" textValue="Projects-3">
          Projects-3
        </StaticTreeItem>
      </StaticTreeItem>
      <TreeItem
        id="reports"
        textValue="Reports"
        className={({isFocused, isSelected, isHovered, isFocusVisible}) =>
          classNames(styles, 'tree-item', {
            focused: isFocused,
            'focus-visible': isFocusVisible,
            selected: isSelected,
            hovered: isHovered
          })
        }>
        <TreeItemContent>Reports</TreeItemContent>
      </TreeItem>
      <TreeItem
        id="Tests"
        textValue="Tests"
        className={({isFocused, isSelected, isHovered, isFocusVisible}) =>
          classNames(styles, 'tree-item', {
            focused: isFocused,
            'focus-visible': isFocusVisible,
            selected: isSelected,
            hovered: isHovered
          })
        }>
        <TreeItemContent>{({isFocused}) => <Text>{`${isFocused} Tests`}</Text>}</TreeItemContent>
      </TreeItem>
    </Tree>
  );
}

export const TreeExampleStatic: StoryObj<typeof TreeExampleStaticRender> = {
  render: args => <TreeExampleStaticRender {...args} />,
  args: {
    selectionMode: 'none',
    selectionBehavior: 'toggle',
    disabledBehavior: 'selection'
  },
  argTypes: {
    selectionMode: {
      control: 'radio',
      options: ['none', 'single', 'multiple']
    },
    selectionBehavior: {
      control: 'radio',
      options: ['toggle', 'replace']
    },
    disabledBehavior: {
      control: 'radio',
      options: ['selection', 'all']
    }
  },
  parameters: {
    description: {
      data: 'Note that the last two items are just to test bare minimum TreeItem and thus dont have the checkbox or any of the other contents that the other items have. The last item tests the isFocused renderProp'
    }
  }
};

let rows = [
  {
    id: 'projects',
    name: 'Projects',
    childItems: [
      {id: 'project-1', name: 'Project 1'},
      {
        id: 'project-2',
        name: 'Project 2',
        childItems: [
          {id: 'project-2A', name: 'Project 2A'},
          {id: 'project-2B', name: 'Project 2B'},
          {id: 'project-2C', name: 'Project 2C'}
        ]
      },
      {id: 'project-3', name: 'Project 3'},
      {id: 'project-4', name: 'Project 4'},
      {
        id: 'project-5',
        name: 'Project 5',
        childItems: [
          {id: 'project-5A', name: 'Project 5A'},
          {id: 'project-5B', name: 'Project 5B'},
          {id: 'project-5C', name: 'Project 5C'}
        ]
      }
    ]
  },
  {
    id: 'reports',
    name: 'Reports',
    childItems: [
      {
        id: 'reports-1',
        name: 'Reports 1',
        childItems: [
          {
            id: 'reports-1A',
            name: 'Reports 1A',
            childItems: [
              {
                id: 'reports-1AB',
                name: 'Reports 1AB',
                childItems: [{id: 'reports-1ABC', name: 'Reports 1ABC'}]
              }
            ]
          },
          {id: 'reports-1B', name: 'Reports 1B'},
          {id: 'reports-1C', name: 'Reports 1C'}
        ]
      },
      {id: 'reports-2', name: 'Reports 2'}
    ]
  }
];

const MyTreeLoader = (props: any) => {
  return (
    <TreeLoadMoreItem className={classNames(styles, 'tree-loader')} {...props}>
      {values => <>{!props.omitChildren && (
        <span style={{'margin-inline-start': `${(values.level > 1 ? 25 : 0) + (values.level - 1) * 15}px`}}>
          {values.level === 1 ? 'Load more spinner' : `Level ${values.level} loading spinner`}
        </span>
      )}</>}
    </TreeLoadMoreItem>
  );
};

interface DynamicTreeItemProps extends TreeItemProps<object> {
  children: ReactNode;
  childItems?: Iterable<object>;
  isLoading?: boolean;
  onLoadMore?: () => void;
  renderLoader?: (id: Key | undefined) => boolean;
  supportsDragging?: boolean;
  isLastInRoot?: boolean;
}

const DynamicTreeItem = (props: DynamicTreeItemProps) => {

  return (
    <>
      <TreeItem
        {...props}
        className={({isFocused, isSelected, isHovered, isFocusVisible, isDropTarget}) =>
          classNames(styles, 'tree-item', {
            focused: isFocused,
            'focus-visible': isFocusVisible,
            selected: isSelected,
            hovered: isHovered,
            'drop-target': isDropTarget
          })
        }>
        <TreeItemContent>
          {values => (
            <>
              {values.selectionMode !== 'none' && values.selectionBehavior === 'toggle' && (
                <MyCheckbox slot="selection" />
              )}
              <div
                class={styles['content-wrapper']}
                style={{'margin-inline-start': `${(!values.hasChildItems ? 20 : 0) + (values.level - 1) * 15}px`}}>
                {values.hasChildItems && (
                  <Button className={styles.chevron} slot="chevron">
                    <div
                      style={{
                        transform: `rotate(${values.isExpanded ? 90 : 0}deg)`,
                        width: '16px',
                        height: '16px'
                      }}>
                      <svg viewBox="0 0 24 24" style={{width: '16px', height: '16px'}}>
                        <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </Button>
                )}
                {props.supportsDragging && <Button slot="drag">≡</Button>}
                <Text>{props.children}</Text>
                <Button className={styles.button} aria-label="Info" onPress={action('Info press')}>
                  ⓘ
                </Button>
                <MenuTrigger>
                  <Button aria-label="Menu">☰</Button>
                  <Popover>
                    <Menu className={styles.menu} onAction={action('menu action')}>
                      <MyMenuItem>Foo</MyMenuItem>
                      <MyMenuItem>Bar</MyMenuItem>
                      <MyMenuItem>Baz</MyMenuItem>
                    </Menu>
                  </Popover>
                </MenuTrigger>
              </div>
            </>
          )}
        </TreeItemContent>
        <For each={Array.from(props.childItems ?? []) as any[]} keyed={item => item.key ?? item.name}>
          {item => (
            <DynamicTreeItem
              supportsDragging={props.supportsDragging}
              renderLoader={props.renderLoader}
              isLoading={props.isLoading}
              id={item().key ?? item().name}
              childItems={item().children}
              textValue={item().name ?? item().value.name}
              href={props.href}>
              {item().name ?? item().value.name}
            </DynamicTreeItem>
          )}
        </For>
        {props.renderLoader?.(props.id) && (
          <MyTreeLoader isLoading={props.isLoading} onLoadMore={props.onLoadMore} />
        )}
      </TreeItem>
      {props.isLastInRoot && (
        <MyTreeLoader isLoading={props.isLoading} onLoadMore={props.onLoadMore} />
      )}
    </>
  );
};

let defaultExpandedKeys = new Set([
  'projects',
  'project-2',
  'project-5',
  'reports',
  'reports-1',
  'reports-1A',
  'reports-1AB'
]);

const TreeExampleDynamicRender = <T extends any>(args: TreeProps<T>): JSX.Element => {
  let treeData = useTreeData<any>({
    initialItems: untrack(() => (args.items as any) ?? rows),
    getKey: item => item.id,
    getChildren: item => item.childItems
  });

  return (
    <Tree
      {...args}
      defaultExpandedKeys={defaultExpandedKeys}
      disabledKeys={['reports-1AB']}
      className={styles.tree}
      aria-label="test dynamic tree"
      items={treeData.items}
      onExpandedChange={action('onExpandedChange')}
      onSelectionChange={action('onSelectionChange')}>
      {item => (
        <DynamicTreeItem id={item.key} childItems={item.children ?? []} textValue={item.value.name}>
          {item.value.name}
        </DynamicTreeItem>
      )}
    </Tree>
  );
};

export const TreeExampleDynamic: StoryObj<typeof TreeExampleDynamicRender> = {
  ...TreeExampleStatic,
  render: args => <TreeExampleDynamicRender {...args} />,
  parameters: undefined
};

function renderEmptyLoader({isLoading}: {isLoading?: boolean}) {
  return isLoading ? 'Root level loading spinner' : 'Nothing in tree';
}

const EmptyTreeStatic = <T extends any>(args: TreeProps<T> & {isLoading: boolean}): JSX.Element => (
  <Tree
    {...args}
    className={styles.tree}
    aria-label="test empty static tree"
    renderEmptyState={() => renderEmptyLoader({isLoading: args.isLoading})}>
    <Collection items={[]} dependencies={[args.isLoading]}>
      {(item: any) => (
        <DynamicTreeItem
          renderLoader={id => id === 'project-2'}
          isLoading={args.isLoading}
          id={item.id}
          childItems={item.childItems}
          textValue={item.name}>
          {item.name}
        </DynamicTreeItem>
      )}
    </Collection>
  </Tree>
);

export const EmptyTreeStaticStory: StoryObj<typeof EmptyTreeStatic> = {
  render: args => <EmptyTreeStatic {...args} />,
  args: {
    isLoading: false
  },
  name: 'Empty/Loading Tree rendered with TreeLoader collection element'
};

function LoadingStoryDepOnTop<T>(args: TreeProps<T> & {isLoading: boolean}): JSX.Element {
  let treeData = useTreeData<any>({
    initialItems: rows,
    getKey: item => item.id,
    getChildren: item => item.childItems
  });

  return (
    <Tree
      {...args}
      dependencies={[args.isLoading]}
      defaultExpandedKeys={defaultExpandedKeys}
      disabledKeys={['reports-1AB']}
      className={styles.tree}
      aria-label="test dynamic tree"
      onExpandedChange={action('onExpandedChange')}
      onSelectionChange={action('onSelectionChange')}>
      <For each={treeData.items} keyed={item => item.key}>{item => (
        <DynamicTreeItem
          isLastInRoot={item().key === 'reports'}
          renderLoader={id => id === 'root' || id === 'project-2'}
          isLoading={args.isLoading}
          id={item().key}
          childItems={item().children ?? []}
          textValue={item().value.name}>
          {item().value.name}
        </DynamicTreeItem>
      )}</For>
    </Tree>
  );
}

export const LoadingStoryDepOnTopStory: StoryObj<typeof LoadingStoryDepOnTop> = {
  render: args => <LoadingStoryDepOnTop {...args} />,
  args: {
    isLoading: false
  },
  name: 'Loading, dynamic rows, root loader rendered dynamically as well',
  parameters: {
    description: {
      data: 'Test that Level 3 loading spinner and the root level load spinner appear when toggling isLoading in the controls'
    }
  }
};

interface Character {
  name: string;
  height: number;
  mass: number;
  birth_year: number;
}

function TreeDragAndDropExample<T>(
  args: TreeProps<T> & {
    shouldAcceptItemDrop: 'folders' | 'all';
    dropFunction: 'onMove' | 'onInsert' | 'onRootDrop';
    shouldAllowInsert: boolean;
  }
): JSX.Element {
  let treeData = useTreeData<any>({
    initialItems: rows,
    getKey: item => item.id,
    getChildren: item => item.childItems
  });

  let getItems = (keys: Set<Key>) =>
    [...keys].map(key => {
      let item = treeData.getItem(key)!;

      let serializeItem = (nodeItem: any): any => ({
        ...nodeItem.value,
        childItems: nodeItem.children ? [...nodeItem.children].map(serializeItem) : []
      });

      return {
        'text/plain': item.value.name,
        'tree-item': JSON.stringify(serializeItem(item))
      };
    });

  let {dragAndDropHooks} = useDragAndDrop({
    getItems,
    getAllowedDropOperations: () => ['move'],
    renderDragPreview(items) {
      return (
        <div style={{background: 'blue', color: 'white', padding: '4px'}}>{items.length} items</div>
      );
    },
    shouldAcceptItemDrop: target => {
      if (args.shouldAcceptItemDrop === 'folders') {
        let item = treeData.getItem(target.key);
        return item?.value?.childItems?.length > 0;
      }
      return true;
    },
    get [untrack(() => args.dropFunction)]() {return (e: DroppableCollectionReorderEvent) => {
      console.log(`moving [${[...e.keys].join(',')}] ${e.target.dropPosition} ${e.target.key}`);
      try {
        if (e.target.dropPosition === 'before') {
          treeData.moveBefore(e.target.key, e.keys);
        } else if (e.target.dropPosition === 'after') {
          treeData.moveAfter(e.target.key, e.keys);
        } else if (e.target.dropPosition === 'on') {
          let targetNode = treeData.getItem(e.target.key);
          if (targetNode) {
            let targetIndex = targetNode.children ? targetNode.children.length : 0;
            let keyArray = Array.from(e.keys);
            for (let i = 0; i < keyArray.length; i++) {
              treeData.move(keyArray[i], e.target.key, targetIndex + i);
            }
          } else {
            console.error('Target node not found for drop on:', e.target.key);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };}
  });

  return (
    <Tree
      dragAndDropHooks={dragAndDropHooks}
      {...args}
      className={styles.tree}
      aria-label="Tree with drag and drop"
      items={treeData.items}>
      {(item: any) => (
        <DynamicTreeItem
          id={item.key}
          childItems={item.children ?? []}
          textValue={item.value.name}
          supportsDragging>
          {item.value.name}
        </DynamicTreeItem>
      )}
    </Tree>
  );
}

function SecondTree(args: any) {
  let treeData = useTreeData<any>({
    initialItems: [],
    getKey: item => item.id,
    getChildren: item => item.childItems
  });

  let processIncomingItems = async (e: {items: import('@react-types/shared').DropItem[]}) => {
    return await Promise.all(
      e.items.filter(isTextDropItem).map(async item => {
        let parsed = JSON.parse(await item.getText('tree-item'));
        let convertItem = (item: any): any => ({
          ...item,
          id: Math.random().toString(36),
          childItems: item.childItems?.map(convertItem)
        });
        return convertItem(parsed);
      })
    );
  };

  let getItems = (keys: Set<Key>) =>
    [...keys].map(key => {
      let item = treeData.getItem(key)!;

      let serializeItem = (nodeItem: any): any => ({
        ...nodeItem.value,
        childItems: nodeItem.children ? [...nodeItem.children].map(serializeItem) : []
      });

      return {
        'text/plain': item.value.name,
        'tree-item': JSON.stringify(serializeItem(item))
      };
    });

  let onInsert = async (e: import('@react-types/shared').DroppableCollectionInsertDropEvent) => {
    let items = await processIncomingItems(e);
    if (e.target.dropPosition === 'before') {
      treeData.insertBefore(e.target.key, ...items);
    } else if (e.target.dropPosition === 'after') {
      treeData.insertAfter(e.target.key, ...items);
    }
  };

  let {dragAndDropHooks} = useDragAndDrop({
    getItems, // Enable dragging FROM this tree
    getAllowedDropOperations: () => ['move'],
    acceptedDragTypes: ['tree-item'],
    get onInsert() {return args.shouldAllowInsert ? onInsert : undefined;},
    async onItemDrop(e) {
      let items = await processIncomingItems(e);
      treeData.insert(e.target.key, 0, ...items);
    },
    async onRootDrop(e) {
      let items = await processIncomingItems(e);
      treeData.insert(null, 0, ...items);
    },
    shouldAcceptItemDrop: target => {
      if (args.shouldAcceptItemDrop === 'folders') {
        let item = treeData.getItem(target.key);
        return item?.value?.childItems?.length > 0;
      }
      return true;
    },
    get [untrack(() => args.dropFunction)]() {return (e: DroppableCollectionReorderEvent) => {
      console.log(
        `moving [${[...e.keys].join(',')}] ${e.target.dropPosition} ${e.target.key} in SecondTree`
      );
      try {
        if (e.target.dropPosition === 'before') {
          treeData.moveBefore(e.target.key, e.keys);
        } else if (e.target.dropPosition === 'after') {
          treeData.moveAfter(e.target.key, e.keys);
        } else if (e.target.dropPosition === 'on') {
          let targetNode = treeData.getItem(e.target.key);
          if (targetNode) {
            let targetIndex = targetNode.children ? targetNode.children.length : 0;
            let keyArray = Array.from(e.keys);
            for (let i = 0; i < keyArray.length; i++) {
              treeData.move(keyArray[i], e.target.key, targetIndex + i);
            }
          } else {
            console.error('Target node not found for drop on:', e.target.key);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };}
  });

  return (
    <Tree
      dragAndDropHooks={dragAndDropHooks}
      {...args}
      className={styles.tree}
      aria-label="Tree with drag and drop"
      items={treeData.items}
      renderEmptyState={() => 'Drop items here'}>
      {(item: any) => (
        <DynamicTreeItem
          id={item.key}
          childItems={item.children ?? []}
          textValue={item.value.name}
          supportsDragging>
          {item.value.name}
        </DynamicTreeItem>
      )}
    </Tree>
  );
}

export const TreeWithDragAndDrop: StoryObj<typeof TreeDragAndDropExample> = {
  ...TreeExampleDynamic,
  render: args => {
    return (
      <div style={{display: 'flex', gap: '12px', 'flex-wrap': 'wrap'}}>
        <TreeDragAndDropExample {...args} />
        <SecondTree {...args} />
      </div>
    );
  },
  args: {
    dropFunction: 'onMove',
    shouldAcceptItemDrop: 'all',
    shouldAllowInsert: true,
    ...TreeExampleDynamic.args
  },
  argTypes: {
    dropFunction: {
      control: 'radio',
      options: ['onMove', 'onReorder']
    },
    shouldAcceptItemDrop: {
      control: 'radio',
      options: ['all', 'folders']
    },
    ...TreeExampleDynamic.argTypes
  }
};

interface ITreeItem {
  id: string;
  name: string;
  childItems?: Iterable<ITreeItem>;
}

let comboboxEmptyState = () => {
  return <div style={{height: '30px', width: '100%'}}>No results</div>;
};

export function TreeWithTextField<T>(props: TreeProps<T>) {
  return (
    <div style={{display: 'flex', 'flex-direction': 'column'}}>
      <input aria-label="Before tree" />
      <Tree
        className={styles.tree}
        style={{width: '400px'}}
        aria-label="tree with textfields"
        disabledKeys={['rawinput']}
        keyboardNavigationBehavior="tab"
        {...props}>
        <StaticTreeItem
          id="textfield"
          textValue="RAC TextField"
          interactive={
            <TextField aria-label="Name">
              <Input />
            </TextField>
          }>
          RAC TextField
        </StaticTreeItem>
        <StaticTreeItem
          id="rawinput"
          textValue="Raw input"
          interactive={<input aria-label="Raw text input" />}>
          Raw input
        </StaticTreeItem>
        <StaticTreeItem
          id="row1"
          textValue="row 1"
          title="row 1"
          interactive={
            <TextField aria-label="row 1 input">
              <Input />
            </TextField>
          }>
          <StaticTreeItem
            id="group1-textfield-button"
            textValue="TextField and Button"
            interactive={
              <>
                <TextField aria-label="Search">
                  <Input />
                </TextField>
                <Button>Go</Button>
              </>
            }>
            TextField + Button
          </StaticTreeItem>
          <StaticTreeItem
            id="group1-toolbar"
            textValue="Toolbar"
            interactive={
              <Toolbar aria-label="Text formatting" style={{gap: '4px'}}>
                <Button onPress={action('Bold press')}>Bold</Button>
                <Button onPress={action('Italics press')}>Italic</Button>
                <Button onPress={action('Underline press')}>Underline</Button>
              </Toolbar>
            }>
            Toolbar
          </StaticTreeItem>
          <StaticTreeItem
            id="group1-nested"
            textValue="Nested Group"
            title="Nested Group"
            interactive={<input aria-label="Nested group input" />}>
            <StaticTreeItem
              id="group1-nested-1"
              textValue="Nested child 1"
              interactive={
                <ComboBox aria-label="combobox" allowsEmptyCollection>
                  <div style={{display: 'flex'}}>
                    <Input />
                    <Button>
                      <span aria-hidden="true" style={{padding: '0 2px'}}>
                        ▼
                      </span>
                    </Button>
                  </div>
                  <Popover>
                    <ListBox
                      renderEmptyState={comboboxEmptyState}
                      data-testid="combo-box-list-box"
                      className={styles.menu}
                      style={{width: 'var(--trigger-width)'}}>
                      <MyListBoxItem>Foo</MyListBoxItem>
                      <MyListBoxItem>Bar</MyListBoxItem>
                      <MyListBoxItem>Baz</MyListBoxItem>
                      <MyListBoxItem href="http://google.com">Google</MyListBoxItem>
                    </ListBox>
                  </Popover>
                </ComboBox>
              }>
              Nested child 1
            </StaticTreeItem>
            <StaticTreeItem
              id="group1-nested-2"
              textValue="Nested child 2"
              interactive={
                <MenuTrigger>
                  <Button aria-label="Options">▾</Button>
                  <Popover>
                    <Menu className={styles.menu}>
                      <MenuItem>Cut</MenuItem>
                      <MenuItem>Copy</MenuItem>
                      <MenuItem>Paste</MenuItem>
                    </Menu>
                  </Popover>
                </MenuTrigger>
              }>
              Nested child 2
            </StaticTreeItem>
          </StaticTreeItem>
        </StaticTreeItem>
      </Tree>
      <input aria-label="After tree" />
    </div>
  );
}

export const TreeWithTextFieldStory: StoryObj<typeof TreeWithTextField> = {
  render: args => <TreeWithTextField {...args} />,
  args: {
    selectionMode: 'none',
    selectionBehavior: 'toggle',
    disabledBehavior: 'selection'
  },
  argTypes: {
    keyboardNavigationBehavior: {
      control: 'radio',
      options: ['arrow', 'tab']
    },
    selectionMode: {
      control: 'radio',
      options: ['none', 'single', 'multiple']
    },
    selectionBehavior: {
      control: 'radio',
      options: ['toggle', 'replace']
    },
    disabledBehavior: {
      control: 'radio',
      options: ['selection', 'all']
    }
  },
  name: 'Tree with Textfield'
};

// The selected source stories have no decorators or play functions. Keep their
// actual render bodies and inherited default args, with native live prop merging.
export function EmptyLoadingTree(props: Record<string, unknown>) {
  return <EmptyTreeStatic {...merge(EmptyTreeStaticStory.args || {}, props) as any} />;
}

export function LoadingMoreTree(props: Record<string, unknown>) {
  return <LoadingStoryDepOnTop {...merge(LoadingStoryDepOnTopStory.args || {}, props) as any} />;
}

export function TreeWithDragAndDropFixture(props: Record<string, unknown>) {
  return (TreeWithDragAndDrop.render as (args: any) => JSX.Element)(merge(TreeWithDragAndDrop.args || {}, props));
}

export function TreeWithTextFieldFixture(props: Record<string, unknown>) {
  return <TreeWithTextField {...merge(TreeWithTextFieldStory.args || {}, props)} />;
}
