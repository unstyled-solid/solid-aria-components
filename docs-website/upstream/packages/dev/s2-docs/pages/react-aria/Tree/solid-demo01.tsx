import {render} from '@solidjs/web';
// Extracted from Tree.mdx render example 1; source content and algorithms retained.
  import {Tree, TreeItem} from '../ListBox/native/vanilla/solid-Tree';

  export default function Demo(props: Record<string, unknown> = {}) {
  return (<Tree
    {...props}
    aria-label="Files">
    <TreeItem title="Documents">
      <TreeItem title="Project">
        <TreeItem title="Weekly Report" />
      </TreeItem>
    </TreeItem>
    <TreeItem title="Photos">
      <TreeItem title="Image 1" />
      <TreeItem title="Image 2" />
    </TreeItem>
  </Tree>);
}


export const title = "Tree: upstream example 1";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{selectionMode: 'multiple'}} {...props} />, element);
}
