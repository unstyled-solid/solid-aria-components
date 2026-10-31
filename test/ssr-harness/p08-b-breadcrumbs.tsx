import {Breadcrumbs, Breadcrumb} from '../../packages/react-aria-components/src/Breadcrumbs';

// Physical translation of the original Breadcrumbs.ssr.test.js fixture.
export function Fixture() {
  return <Breadcrumbs>
    <Breadcrumb>One</Breadcrumb>
    <Breadcrumb>Two</Breadcrumb>
    <Breadcrumb>Three</Breadcrumb>
  </Breadcrumbs>;
}
