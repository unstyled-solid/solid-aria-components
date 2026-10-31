/* Copyright 2020 Adobe. Licensed under the Apache License, Version 2.0. */
import {Button, type SpectrumButtonProps} from '../../packages/@adobe/react-spectrum/src/button/Button';

export function Fixture() {
  // Original JS fixture intentionally omits the type-required variant.
  return <Button {...({} as SpectrumButtonProps)}>Button</Button>;
}
