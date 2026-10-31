/* Copyright 2020 Adobe. Licensed under the Apache License, Version 2.0. */
import {ActionGroup} from '../../packages/@adobe/react-spectrum/src/actiongroup/ActionGroup';
import {Item} from '../../packages/react-stately/src/collections/Item';
import {Provider} from '../../packages/@adobe/react-spectrum/src/provider/Provider';
import {defaultTheme as theme} from '../../packages/@adobe/react-spectrum/src/theme-default/defaultTheme';
export function Fixture() {
  return <Provider theme={theme}><ActionGroup><Item key="one">One</Item></ActionGroup></Provider>;
}
