/*
 * Copyright 2020 Adobe. Licensed under the Apache License, Version 2.0.
 * Source: Spectrum test/picker/Picker.ssr.test.js:20–30, frozen
 * 3bdef480e85ff135cd485e9f4511b98300127d4b.
 * SHA256 2033431776c7b27d8da40a1b9bdbba1d08c4632271b2dc979d8be37e69945e2d.
 */
import {Picker} from '../../packages/@adobe/react-spectrum/src/picker/Picker';
import {Item} from 'react-stately/Item';
import {Provider} from '../../packages/@adobe/react-spectrum/src/provider/Provider';
import {defaultTheme as theme} from '../../packages/@adobe/react-spectrum/src/theme-default/defaultTheme';

export function Fixture() {
  return (
    <Provider theme={theme}>
      <Picker label="Picker">
        <Item>One</Item>
        <Item>Two</Item>
        <Item>Three</Item>
      </Picker>
    </Provider>
  );
}
