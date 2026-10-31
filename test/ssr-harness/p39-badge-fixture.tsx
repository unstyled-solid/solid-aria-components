/* Copyright 2022 Adobe. Licensed under the Apache License, Version 2.0. */
import {Badge, type SpectrumBadgeProps} from '../../packages/@adobe/react-spectrum/src/badge/Badge';

// Original unchecked JS fixture omits the required variant. Preserve that input
// without weakening SpectrumBadgeProps or inventing a variant.
export function Fixture() {
  return <Badge {...({children: 'Badge text'} as SpectrumBadgeProps)} />;
}
