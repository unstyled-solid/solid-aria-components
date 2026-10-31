/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import {SSRProvider, useSSRSafeId} from '../../src/ssr/SSRProvider';

function Test() {
  const id = useSSRSafeId();
  return <div id={id()} />;
}

// The three trees from the copied SSR suite, independently compiled on server/client.
export function Basic() {
  return <SSRProvider><Test /><Test /></SSRProvider>;
}

export function StrictOwnership() {
  // Native development ownership checks are always active; no double-render wrapper.
  return <><SSRProvider><Test /><Test /></SSRProvider></>;
}

export function NestedStrictOwnership() {
  return <><SSRProvider>
    <SSRProvider><Test /></SSRProvider>
    <SSRProvider><Test /></SSRProvider>
  </SSRProvider></>;
}
