import {render} from '@solidjs/web';
// Extracted from Tooltip.mdx render example 2; source content and algorithms retained.
  import {TooltipTrigger} from 'solid-aria-components/Tooltip';
  import {Tooltip} from '../ListBox/native/tailwind/solid-Tooltip';
  import {Button} from '../ListBox/native/tailwind/solid-Button';
  import {Edit} from './../ListBox/native-icons/solid-icons';

  function Example(props: Record<string, unknown>) {
    return (
      <TooltipTrigger>
        <Button aria-label="Edit" variant="secondary">
          <Edit size={18} />
        </Button>
        {/*- begin highlight -*/}
        <Tooltip{...props} {...props}>
          Edit
        </Tooltip>
        {/*- end highlight -*/}
      </TooltipTrigger>
    );
  }

export default Example;

export const title = "Tooltip: upstream example 2";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{}} {...props} />, element);
}
