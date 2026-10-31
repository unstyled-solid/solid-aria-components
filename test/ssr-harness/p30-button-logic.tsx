/* Copyright 2020 Adobe. Licensed under the Apache License, Version 2.0. */
import {LogicButton, type SpectrumLogicButtonProps} from '../../packages/@adobe/react-spectrum/src/button/LogicButton';

export function Fixture() {
  // Original JS fixture intentionally omits the type-required variant.
  return <LogicButton {...({} as SpectrumLogicButtonProps)}>Button</LogicButton>;
}
