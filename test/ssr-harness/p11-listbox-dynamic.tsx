/*
 * Copyright 2023 Adobe. All rights reserved.
 * Licensed under the Apache License, Version 2.0.
 */
// Frozen ListBox.ssr.test.js:20–39; original dynamic insertion fixture.
import {createSignal} from 'solid-js';
import {ListBox, ListBoxItem} from '../../packages/react-aria-components/src/ListBox';

export function Fixture() {
  let [show, setShow] = createSignal(false);
  return (
    <>
      <button onClick={() => setShow(true)}>Show</button>
      <ListBox aria-label="Listbox">
        <ListBoxItem id="1">Left</ListBoxItem>
        <ListBoxItem id="2">Middle</ListBoxItem>
        {show() && <ListBoxItem id="4">Extra</ListBoxItem>}
        <ListBoxItem id="3">Right</ListBoxItem>
      </ListBox>
    </>
  );
}
