import {render} from '@solidjs/web';
// Extracted from Tree.mdx render example 9; source content and algorithms retained.
import {Tree, TreeItem, TreeItemContent} from '../ListBox/native/vanilla/solid-Tree';
import {TextField} from '../ListBox/native/vanilla/solid-TextField';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<Tree
  /*- begin highlight -*/
  keyboardNavigationBehavior="tab"
  /*- end highlight -*/
  selectionMode="multiple"
  defaultExpandedKeys={['documents', 'photos']}
  aria-label="Shared files">
  <TreeItem id="documents" textValue="Documents">
    <TreeItemContent>
      <TextField aria-label="title" defaultValue="Documents" placeholder="Enter name" />
    </TreeItemContent>
    <TreeItem id="weekly" textValue="Weekly Report.pdf">
      <TreeItemContent>
        <TextField aria-label="title" defaultValue="Weekly Report.pdf" placeholder="Enter name" />
      </TreeItemContent>
    </TreeItem>
    <TreeItem id="budget" textValue="Budget.xlsx">
      <TreeItemContent>
        <TextField aria-label="title" defaultValue="Budget.xlsx" placeholder="Enter name" />
      </TreeItemContent>
    </TreeItem>
  </TreeItem>
  <TreeItem id="photos" textValue="Photos">
    <TreeItemContent>
      <TextField aria-label="title" defaultValue="Photos" placeholder="Enter name" />
    </TreeItemContent>
    <TreeItem id="sunset" textValue="Sunset.jpg">
      <TreeItemContent>
        <TextField aria-label="title" defaultValue="Sunset.jpg" placeholder="Enter name" />
      </TreeItemContent>
    </TreeItem>
  </TreeItem>
</Tree>);
}


export const title = "Tree: upstream example 9";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
