import { createContext, createSignal, createUniqueId, onSettled, useContext } from 'solid-js';
import {ProgressBar} from '../../packages/react-aria-components/src/ProgressBar';
import {Meter} from '../../packages/react-aria-components/src/Meter';
import {Label} from '../../packages/react-aria-components/src/Label';
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
