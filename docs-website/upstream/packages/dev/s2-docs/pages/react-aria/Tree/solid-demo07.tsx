import {render} from '@solidjs/web';
// Extracted from Tree.mdx render example 7; source content and algorithms retained.
import {Tree, TreeHeader, TreeItem, TreeSection} from '../ListBox/native/vanilla/solid-Tree';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<Tree aria-label="Files">
  <TreeSection>
    <TreeHeader>Photos</TreeHeader>
    <TreeItem id="my-photos" title="My Photos">
      <TreeItem id="photo-1" title="Photo 1" />
      <TreeItem id="photo-2" title="Photo 2" />
    </TreeItem>
    <TreeItem id="shared-photos" title="Shared Photos">
      <TreeItem id="shared-photo-1" title="Shared Photo 1" />
      <TreeItem id="shared-photo-2" title="Shared Photo 2" />
    </TreeItem>
  </TreeSection>
  <TreeSection>
    <TreeHeader>Documents</TreeHeader>
    <TreeItem id="my-documents" title="My Documents">
      <TreeItem id="document-1" title="Document 1" />
      <TreeItem id="document-2" title="Document 2" />
    </TreeItem>
    <TreeItem id="shared-documents" title="Shared Documents">
      <TreeItem id="shared-document-1" title="Shared Document 1" />
      <TreeItem id="shared-document-2" title="Shared Document 2" />
    </TreeItem>
  </TreeSection>
</Tree>);
}


export const title = "Tree: upstream example 7";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
