import {render} from '@solidjs/web';
// Extracted from Tooltip.mdx render example 3; source content and algorithms retained.
import {TooltipTrigger} from 'solid-aria-components/Tooltip';
import {Tooltip} from '../ListBox/native/vanilla/solid-Tooltip';
import {Button} from '../ListBox/native/vanilla/solid-Button';
import {Edit} from './../ListBox/native-icons/solid-icons';
import {Save} from './../ListBox/native-icons/solid-icons';

function Example(props: Record<string, unknown>) {
  return (
    <div style={{display: 'flex', gap: "8px"}}>
      {/*- begin highlight -*/}
      <TooltipTrigger {...props}{...props}>
      {/*- end highlight -*/}
        <Button aria-label="Edit">
          <Edit size={18} />
        </Button>
        <Tooltip>
          Edit
        </Tooltip>
      </TooltipTrigger>
      <TooltipTrigger {...props}{...props}>
        <Button aria-label="Save">
          <Save size={18} />
        </Button>
        <Tooltip>
          Save
        </Tooltip>
      </TooltipTrigger>
    </div>
  );
}

export default Example;

export const title = "Tooltip: upstream example 3";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{}} {...props} />, element);
}
