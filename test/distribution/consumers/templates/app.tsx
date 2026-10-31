// Existing qualified HydrationFixture; only imports changed for packed use.
import { createContext, createSignal, createUniqueId, onSettled, useContext } from 'solid-js';
import {ProgressBar, Meter, Label} from 'react-aria-components';
import {ProgressBar as SubProgressBar} from 'react-aria-components/ProgressBar';
import {Meter as SubMeter} from 'react-aria-components/Meter';
import {Label as SubLabel} from 'react-aria-components/Label';
if (ProgressBar !== SubProgressBar || Meter !== SubMeter || Label !== SubLabel) throw new Error('Root/subpath identity mismatch');
const RequestLabel = createContext<string>();
function Field(props: { settled?: () => void; disposed?: () => void }) {
  const id = createUniqueId();
  const label = useContext(RequestLabel);
  const [value, setValue] = createSignal('25');
  onSettled(() => { props.settled?.(); return () => { props.disposed?.(); }; });
  return <section><label for={id}>{label}</label><input id={id} value={value()} onInput={(event) => setValue(event.currentTarget.value)} /><output>{value()}</output>
    <ProgressBar value={Number(value())}><Label>{label}</Label></ProgressBar>
    <Meter value={Number(value())}><Label>{label}</Label></Meter>
  </section>;
}
export function HydrationFixture(props: { label: string; settled?: () => void; disposed?: () => void }) {
  return <RequestLabel value={props.label}><Field settled={props.settled} disposed={props.disposed} /></RequestLabel>;
}
