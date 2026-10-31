/*
 * Copyright 2023 Adobe. All rights reserved.
 * Licensed under the Apache License, Version 2.0.
 */
// Frozen ListBox.ssr.test.js:63–80; original labelled sections fixture.
import {ListBox, ListBoxSection, ListBoxItem} from '../../packages/react-aria-components/src/ListBox';
import {Header} from '../../packages/react-aria-components/src/Header';

export function Fixture() {
  return (
    <ListBox aria-label="Listbox">
      <ListBoxSection>
        <Header>Veggies</Header>
        <ListBoxItem id="lettuce">Lettuce</ListBoxItem>
        <ListBoxItem id="tomato">Tomato</ListBoxItem>
        <ListBoxItem id="onion">Onion</ListBoxItem>
      </ListBoxSection>
      <ListBoxSection>
        <Header>Protein</Header>
        <ListBoxItem id="ham">Ham</ListBoxItem>
        <ListBoxItem id="tuna">Tuna</ListBoxItem>
        <ListBoxItem id="tofu">Tofu</ListBoxItem>
      </ListBoxSection>
    </ListBox>
  );
}
