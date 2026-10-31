/* Copyright 2022 Adobe. Licensed under the Apache License, Version 2.0. */
// Terminal-extracted original Table.ssr.test.js body; frozen 3bdef480e85ff135cd485e9f4511b98300127d4b.

      import {Provider} from '../../packages/@adobe/react-spectrum/src/provider/Provider';
      import {defaultTheme as theme} from '../../packages/@adobe/react-spectrum/src/theme-default/defaultTheme';
      import {Cell, Column, Row, TableBody, TableHeader, TableView} from '../../packages/@adobe/react-spectrum/src/table/TableView';
      import {enableTableNestedRows} from 'react-stately/private/flags/flags';
export function Fixture() {
      enableTableNestedRows();

  return (
      <Provider theme={theme}>
        <TableView aria-label="Example table with static contents">
          <TableHeader>
            <Column>Name</Column>
            <Column>Type</Column>
            <Column>Date Modified</Column>
          </TableHeader>
          <TableBody>
            <Row>
              <Cell>Games</Cell>
              <Cell>File folder</Cell>
              <Cell>6/7/2020</Cell>
            </Row>
            <Row>
              <Cell>Program Files</Cell>
              <Cell>File folder</Cell>
              <Cell>4/7/2021</Cell>
            </Row>
            <Row>
              <Cell>bootmgr</Cell>
              <Cell>System file</Cell>
              <Cell>11/20/2010</Cell>
            </Row>
            <Row>
              <Cell>log.txt</Cell>
              <Cell>Text Document</Cell>
              <Cell>1/18/2016</Cell>
            </Row>
          </TableBody>
        </TableView>
      </Provider>
  );
}
    
