/* Copyright 2020 Adobe. Licensed under the Apache License, Version 2.0.
 * Original TagGroup.ssr.test.js inline fixture, frozen
 * 3bdef480e85ff135cd485e9f4511b98300127d4b.
 */
import {TagGroup} from '../../packages/@adobe/react-spectrum/src/tag/TagGroup';
import {Item} from 'react-stately/Item';
import {Provider} from '../../packages/@adobe/react-spectrum/src/provider/Provider';
import {defaultTheme as theme} from '../../packages/@adobe/react-spectrum/src/theme-default/defaultTheme';

export function Fixture() {
  return (
    <Provider theme={theme}>
      <TagGroup aria-label="Static TagGroup items example">
        <Item>News</Item>
        <Item>Travel</Item>
        <Item>Gaming</Item>
        <Item>Shopping</Item>
      </TagGroup>
    </Provider>
  );
}
