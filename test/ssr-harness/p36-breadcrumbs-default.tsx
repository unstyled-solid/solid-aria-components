/* Copyright 2020 Adobe. Licensed under the Apache License, Version 2.0. */
import {Breadcrumbs} from '../../packages/@adobe/react-spectrum/src/breadcrumbs/Breadcrumbs';
import {Item} from '../../packages/react-stately/src/collections/Item';
export function Fixture() {
  return <Breadcrumbs><Item key="one">One</Item></Breadcrumbs>;
}
