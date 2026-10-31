import {DisclosureGroup, Disclosure, DisclosurePanel} from '../../packages/react-aria-components/src/Disclosure';
import {Heading} from '../../packages/react-aria-components/src/Heading';
import {Button} from '../../packages/react-aria-components/src/Button';

// Physical translation of the original Disclosure.ssr.test.js two-item group.
export function Fixture() {
  return (
    <DisclosureGroup>
      <Disclosure>
        <Heading level={3}><Button slot="trigger">Trigger 1</Button></Heading>
        <DisclosurePanel data-testid="panel1"><p>Content 1</p></DisclosurePanel>
      </Disclosure>
      <Disclosure>
        <Heading level={3}><Button slot="trigger">Trigger 2</Button></Heading>
        <DisclosurePanel data-testid="panel2"><p>Content 2</p></DisclosurePanel>
      </Disclosure>
    </DisclosureGroup>
  );
}
