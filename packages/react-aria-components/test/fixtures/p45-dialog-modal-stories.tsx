/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import {Button} from '../../src/Button';
import {DateRangePickerExample} from './p45-dialog-date-range';
import {Dialog, DialogTrigger} from '../../src/Dialog';
import {Modal, ModalOverlay} from '../../src/Modal';
import '../../stories/styles.css';
import type {ComponentAnnotations, Renderer, StoryAnnotations} from 'storybook/internal/csf';
import type {JSX} from '@solidjs/web';

interface NativeStoryRenderer extends Renderer {
  component: (props: this['T']) => JSX.Element;
  storyResult: JSX.Element;
  canvasElement: HTMLElement;
}
type StoryArgs<T> = T extends (props: infer P) => unknown ? P : T;
type Meta<T> = ComponentAnnotations<NativeStoryRenderer, StoryArgs<T>>;

export default {
  title: 'React Aria Components/Modal',
  component: Modal
} as Meta<typeof Modal>;

function DateRangePickerInsideModal() {
  return (
    <DialogTrigger>
      <Button>Open modal</Button>
      <ModalOverlay isDismissable style={{
        'align-items': 'center', background: 'rgba(0, 0, 0, 0.5)', display: 'flex',
        'justify-content': 'center', position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, 'z-index': 100
      }}>
        <Modal style={{background: 'Canvas', border: '1px solid gray', color: 'CanvasText', padding: '30px'}}>
          <Dialog>
            <DateRangePickerExample />
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}

export const DateRangePickerInsideModalStory = {
  render: () => <DateRangePickerInsideModal />,
  parameters: {
    description: {
      data: 'Open the Modal, then open the DateRangePicker and select a start date. Clicking outside the Modal should close the picker but keep the Modal open.'
    }
  }
} satisfies StoryAnnotations<NativeStoryRenderer, StoryArgs<typeof Modal>, Partial<StoryArgs<typeof Modal>>>;
