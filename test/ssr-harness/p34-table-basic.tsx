/* Copyright 2022 Adobe. Licensed under the Apache License, Version 2.0. */
// Terminal-extracted original Table.ssr.test.js body; frozen 3bdef480e85ff135cd485e9f4511b98300127d4b.

      import {Provider} from '../../packages/@adobe/react-spectrum/src/provider/Provider';
      import {defaultTheme as theme} from '../../packages/@adobe/react-spectrum/src/theme-default/defaultTheme';
      import {Cell, Column, Row, TableBody, TableHeader, TableView} from '../../packages/@adobe/react-spectrum/src/table/TableView';
export function Fixture() {
  return (
      <Provider theme={theme}>
        <TableView aria-label="Table">
          <TableHeader>
            <Column>Foo</Column>
            <Column>Bar</Column>
            <Column>Baz</Column>
          </TableHeader>
          <TableBody>
            <Row>
              <Cell>Foo 1</Cell>
              <Cell>Bar 1</Cell>
              <Cell>Baz 1</Cell>
            </Row>
            <Row>
              <Cell>Foo 2</Cell>
              <Cell>Bar 2</Cell>
              <Cell>Baz 2</Cell>
            </Row>
          </TableBody>
        </TableView>
      </Provider>
  );
}
    
