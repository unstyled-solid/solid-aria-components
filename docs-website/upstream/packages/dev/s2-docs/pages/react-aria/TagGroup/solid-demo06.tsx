import {render} from '@solidjs/web';
// Extracted from TagGroup.mdx render example 6; source content and algorithms retained.
import {TagGroup, Tag} from '../ListBox/native/vanilla/solid-TagGroup';

function Example() {
  return (
    <TagGroup
      label="Music genres"
      ///- begin highlight -///
      onAction={key => alert(`Clicked ${key}`)}
      ///- end highlight -///
    >
      <Tag id="rock">Rock</Tag>
      <Tag id="jazz">Jazz</Tag>
      <Tag id="pop">Pop</Tag>
      <Tag id="classical">Classical</Tag>
      <Tag id="edm">EDM</Tag>
    </TagGroup>
  );
}

export default Example;

export const title = "TagGroup: upstream example 6";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{}} {...props} />, element);
}
