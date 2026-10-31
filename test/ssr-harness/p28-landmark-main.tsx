/* Copyright 2023 Adobe. Licensed under the Apache License, Version 2.0. */
// Frozen useLandmark.ssr.test.js Main fixture.
import {merge} from 'solid-js';
import {useLandmark} from '../../packages/react-aria/src/landmark/useLandmark';
import {useObjectRef} from '../../packages/react-aria/src/utils/useObjectRef';

function Main(props: {children?: import('@solidjs/web').JSX.Element}) {
  let ref = useObjectRef<HTMLElement>();
  let {landmarkProps} = useLandmark(merge(props, {role: 'main' as const}), ref);
  return <main {...landmarkProps} ref={ref}>{props.children}</main>;
}

export function Fixture() {
  return <Main />;
}
