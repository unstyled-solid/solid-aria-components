/*
 * Copyright 2023 Adobe. All rights reserved.
 * Licensed under the Apache License, Version 2.0.
 * Extracted from react-aria-components/test/Table.ssr.test.js:20–53,
 * frozen 3bdef480e85ff135cd485e9f4511b98300127d4b.
 * Source SHA-256: 164cd7c6320d4bc1a9f7c589bff80315be0e073d18a50cc8e1c3fd2638d91565.
 */
import {createSignal} from 'solid-js';
import {Table, TableHeader, Column, TableBody, Row, Cell} from '../../src/Table';

export function Fixture() {
  let [show, setShow] = createSignal(false);
  return (
    <>
      <button onClick={() => setShow(true)}>Show</button>
      <Table aria-label="Table">
        <TableHeader>
          <Column>Foo</Column>
          <Column isRowHeader>Bar</Column>
        </TableHeader>
        <TableBody>
          <Row id="1">
            <Cell>Foo 1</Cell>
            <Cell>Bar 1</Cell>
          </Row>
          <Row id="2">
            <Cell>Foo 2</Cell>
            <Cell>Bar 2</Cell>
          </Row>
          {show() && <Row id="4">
            <Cell>Foo 3</Cell>
            <Cell>Bar 3</Cell>
          </Row>}
          <Row id="3">
            <Cell>Foo 4</Cell>
            <Cell>Bar 4</Cell>
          </Row>
        </TableBody>
      </Table>
    </>
  );
}
