/* Copyright 2020 Adobe. Licensed under the Apache License, Version 2.0. */
import {Provider} from '../../packages/@adobe/react-spectrum/src/provider/Provider';
import {defaultTheme as theme} from '../../packages/@adobe/react-spectrum/src/theme-default/defaultTheme';
import {Form} from '../../packages/@adobe/react-spectrum/src/form/Form';
export function Fixture() {
  return <Provider theme={theme}><Form aria-label="Home" children={undefined} /></Provider>;
}
