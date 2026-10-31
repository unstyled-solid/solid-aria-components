/*
 * Copyright 2023 Adobe. All rights reserved.
 * Licensed under the Apache License, Version 2.0.
 */
// Frozen TagGroup.ssr.test.js:20–42; original insertion/order fixture.
import {createSignal} from 'solid-js';
import {TagGroup, TagList, Tag} from '../../packages/react-aria-components/src/TagGroup';
import {Label} from '../../packages/react-aria-components/src/Label';

export function Fixture() {
  let [show, setShow] = createSignal(false);
  return (
    <>
      <button onClick={() => setShow(true)}>Show</button>
      <TagGroup aria-label="TagGroup">
        <Label>Test</Label>
        <TagList>
          <Tag id="1">Left</Tag>
          <Tag id="2">Middle</Tag>
          {show() && <Tag id="4">Extra</Tag>}
          <Tag id="3">Right</Tag>
        </TagList>
      </TagGroup>
    </>
  );
}
