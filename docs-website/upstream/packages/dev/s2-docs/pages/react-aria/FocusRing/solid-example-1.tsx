import {render} from '@solidjs/web';
'use client';
import { FocusRing } from 'react-aria/FocusRing';
import './FocusRingExample.css';
export const title = "FocusRing upstream example 1";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <FocusRing focusRingClass="focus-ring">
  {compose => <button {...compose({class: 'button'})}>Test</button>}
</FocusRing>, element); }
