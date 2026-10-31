import {render} from '@solidjs/web';
// Extracted from ToggleButtonGroup.mdx render example 4; source content and algorithms retained.
import {ToggleButtonGroup, ToggleButton, ToggleButtonProps, SelectionIndicator} from 'solid-aria-components/ToggleButtonGroup';
import {composeRenderProps} from 'solid-aria-components/composeRenderProps';
import '../ListBox/native/vanilla/SegmentedControl.css';

function SegmentedControlItem(props: ToggleButtonProps) {
  return (
    <ToggleButton {...props} className="segmented-control-item">
      {/*- begin highlight -*/}
      {composeRenderProps(props.children, (children) => (<>
        <SelectionIndicator className="react-aria-SelectionIndicator button-base" data-selected />
        <span>{children}</span>
      </>))}
      {/*- end highlight -*/}
    </ToggleButton>
  );
}

export default function Demo(props: Record<string, unknown> = {}) {
  return (<ToggleButtonGroup
  className="segmented-control button-base"
  data-variant="secondary"
  aria-label="Time period"
  defaultSelectedKeys={['day']}
  disallowEmptySelection>
  <SegmentedControlItem id="day">Day</SegmentedControlItem>
  <SegmentedControlItem id="week">Week</SegmentedControlItem>
  <SegmentedControlItem id="month">Month</SegmentedControlItem>
  <SegmentedControlItem id="year">Year</SegmentedControlItem>
</ToggleButtonGroup>);
}


export const title = "ToggleButtonGroup: upstream example 4";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
