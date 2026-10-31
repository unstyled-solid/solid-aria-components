// Physical extraction of frozen GridList.ssr.test.js's original Test fixture.
import {createSignal} from 'solid-js';
import {GridList, GridListItem} from '../../packages/react-aria-components/src/GridList';

export function Fixture() {
  let [show, setShow] = createSignal(false);
  return (
    <>
      <button onClick={() => setShow(true)}>Show</button>
      <GridList aria-label="GridList">
        <GridListItem id="1">Left</GridListItem>
        <GridListItem id="2">Middle</GridListItem>
        {show() && <GridListItem id="4">Extra</GridListItem>}
        <GridListItem id="3">Right</GridListItem>
      </GridList>
    </>
  );
}
