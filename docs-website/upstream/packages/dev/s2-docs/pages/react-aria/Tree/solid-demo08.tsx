import {render} from '@solidjs/web';
// Extracted from Tree.mdx render example 8; source content and algorithms retained.
import type {Selection} from 'solid-aria-components/Tree';
import {Tree, TreeItem} from '../ListBox/native/vanilla/solid-Tree';
import {createSignal} from 'solid-js';

function Example(props: Record<string, unknown>) {
  let [selected, setSelected] = createSignal<Selection>(new Set());

  return (
    <div>
      <Tree
        {...props}
        aria-label="Pokemon evolution"
        style={{height: "250px"}}
        defaultExpandedKeys={['bulbasaur', 'ivysaur']}
        ///- begin highlight -///
        {...props}
        selectedKeys={selected()}
        onSelectionChange={setSelected}
        onAction={key => alert(`Clicked ${key}`)}
        ///- end highlight -///
      >
        <TreeItem id="bulbasaur" title="Bulbasaur">
          <TreeItem id="ivysaur" title="Ivysaur">
            <TreeItem id="venusaur" title="Venusaur" isDisabled />
          </TreeItem>
        </TreeItem>
        <TreeItem id="charmander" title="Charmander">
          <TreeItem id="charmeleon" title="Charmeleon">
            <TreeItem id="charizard" title="Charizard" />
          </TreeItem>
        </TreeItem>
        <TreeItem id="squirtle" title="Squirtle">
          <TreeItem id="wartortle" title="Wartortle">
            <TreeItem id="blastoise" title="Blastoise" />
          </TreeItem>
        </TreeItem>
      </Tree>
      <p>Current selection: {selected() === 'all' ? 'all' : [...selected()].join(', ')}</p>
    </div>
  );
}

export default Example;

export const title = "Tree: upstream example 8";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{selectionMode: 'multiple'}} {...props} />, element);
}
