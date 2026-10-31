/* Copyright 2022 Adobe. Licensed under the Apache License, Version 2.0. */
// Terminal-extracted original Table.ssr.test.js body; frozen 3bdef480e85ff135cd485e9f4511b98300127d4b.

      import {Provider} from '../../packages/@adobe/react-spectrum/src/provider/Provider';
      import {defaultTheme as theme} from '../../packages/@adobe/react-spectrum/src/theme-default/defaultTheme';
      import {Cell, Column, Row, TableBody, TableHeader, TableView} from '../../packages/@adobe/react-spectrum/src/table/TableView';
      import {enableTableNestedRows} from 'react-stately/private/flags/flags';
export function Fixture() {
      enableTableNestedRows();

      let nestedItems: {foo: string; bar: string; baz: string; childRows?: any[]}[] = [
        {foo: 'Lvl 1 Foo 1', bar: 'Lvl 1 Bar 1', baz: 'Lvl 1 Baz 1', childRows: [
          {foo: 'Lvl 2 Foo 1', bar: 'Lvl 2 Bar 1', baz: 'Lvl 2 Baz 1', childRows: [
            {foo: 'Lvl 3 Foo 1', bar: 'Lvl 3 Bar 1', baz: 'Lvl 3 Baz 1'}
          ]},
          {foo: 'Lvl 2 Foo 2', bar: 'Lvl 2 Bar 2', baz: 'Lvl 2 Baz 2'}
        ]}
      ];

      let columns = [
        {name: 'Foo', key: 'foo'},
        {name: 'Bar', key: 'bar'},
        {name: 'Baz', key: 'baz'}
      ];

  return (
      <Provider theme={theme}>
        <TableView aria-label="example table with nested rows" UNSTABLE_allowsExpandableRows width={500} height={200} >
          <TableHeader columns={columns}>
            {column => <Column>{column.name}</Column>}
          </TableHeader>
          <TableBody items={nestedItems}>
            {(item) =>
              (<Row key={item.foo} UNSTABLE_childItems={item.childRows}>
                {(key) => {
                   return <Cell>{item[key.toString() as 'foo' | 'bar' | 'baz']}</Cell>;
                }}
              </Row>)
            }
          </TableBody>
        </TableView>
      </Provider>
  );
}
    
