import {createEffect, createSignal, onSettled, untrack} from 'solid-js';
import {useObjectRef} from '../../packages/react-aria/src/utils/useObjectRef';
import {createHideableComponent} from '../../packages/react-aria/src/collections/Hidden';
import type {JSX} from '@solidjs/web';
import {ComboBox} from '../../packages/react-aria-components/src/ComboBox';
import {Label} from '../../packages/react-aria-components/src/Label';
import {Input} from '../../packages/react-aria-components/src/Input';
import {Popover} from '../../packages/react-aria-components/src/Popover';
import {ListBox, ListBoxItem} from '../../packages/react-aria-components/src/ListBox';

// Physical translation of the original App: one post-mount layout capture and
// another after the source button changes otherState from zero to one.
// An authored grouping component participates in native collection discovery,
// just like RAC's other non-collection controls. Its visible markup stays the
// source's literal div; the inert discovery copy does not own a real DOM ref.
const FixtureGroup = createHideableComponent<HTMLDivElement, {children?: JSX.Element}>((props, ref) =>
  <div ref={ref} role="group">{props.children}</div>
);

export function Fixture() {
  let [triggers, setTriggers] = createSignal<(string | undefined)[]>(['null']);
  let [otherState, setOtherState] = createSignal(0);
  let ref = useObjectRef<HTMLDivElement>();
  let capture = () => {
    // This is the source layout observation on mount/otherState, not a ref
    // subscription. Capture before the signal updater, at the imperative edge.
    let html = untrack(() => ref.current?.outerHTML);
    setTriggers(prev => [...prev, html]);
  };
  onSettled(capture);
  createEffect(otherState, value => { if (value !== 0) { capture(); } });
  return <>
    <ComboBox defaultSelectedKey="dog">
      <FixtureGroup ref={ref}>
        <Label>Favorite Animal</Label>
        <Input />
      </FixtureGroup>
      <Popover>
        <ListBox>
          <ListBoxItem id="cat">Cat</ListBoxItem>
          <ListBoxItem id="dog">Dog</ListBoxItem>
          <ListBoxItem id="kangaroo">Kangaroo</ListBoxItem>
        </ListBox>
      </Popover>
    </ComboBox>
    <div role="button">{triggers().join(', ')}</div>
    <div role="button" onClick={() => setOtherState(1)}>{otherState()}</div>
  </>;
}
