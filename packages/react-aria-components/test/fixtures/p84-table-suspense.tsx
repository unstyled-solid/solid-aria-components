// Source-copied from p23-table-suspense.source.txt: original launch data,
// 1000ms promises, fallback row, button and collection composition.
// Loading.on maps replacement; held updates/isPending map transitions.
// Unqualified: replacement currently reports LOADING_ON_OUTSIDE_HOLD;
// transition completion hits FocusScope.tsx:184. No production workaround.
import {createMemo, createSignal, For, isPending, Loading} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {Table, TableHeader, TableBody, Row, Column, Cell} from '../../src/Table';

interface Launch {
  id: number;
  mission_name: string;
  launch_year: number;
}

const items: Launch[] = [
  {id: 0, mission_name: 'FalconSat', launch_year: 2006},
  {id: 1, mission_name: 'DemoSat', launch_year: 2007},
  {id: 2, mission_name: 'Trailblazer', launch_year: 2008},
  {id: 3, mission_name: 'RatSat', launch_year: 2009}
];

export function makePromise(items: Launch[]): Promise<Launch[]> {
  return new Promise(resolve => setTimeout(() => resolve(items), 1000));
}

export function TableWithSuspense(props: {reactTransition?: boolean}): JSX.Element {
  let [promise, setPromise] = createSignal(makePromise(items.slice(0, 2)));
  let launches = createMemo(() => promise());
  return (
    <div>
      <Table aria-label="Suspense table">
        <TableHeader>
          <Column isRowHeader>Name</Column>
          <Column>Year</Column>
        </TableHeader>
        <TableBody>
          <Loading
            on={props.reactTransition ? undefined : promise()}
            fallback={
              <Row>
                <Cell colSpan={2}>Loading...</Cell>
              </Row>
            }>
            <LocationsTableBody items={launches} />
          </Loading>
        </TableBody>
      </Table>
      <button
        onClick={() => {
          setPromise(makePromise(items));
        }}>
        <Loading fallback="Load more">
          {props.reactTransition && isPending(launches) ? 'Loading' : 'Load more'}
        </Loading>
      </button>
    </div>
  );
}

function LocationsTableBody(props: {items: () => Launch[]}) {
  return <For each={props.items()} keyed={item => item.id}>{item => (
    <Row id={item().id}>
      <Cell>{item().mission_name}</Cell>
      <Cell>{item().launch_year}</Cell>
    </Row>
  )}</For>;
}
