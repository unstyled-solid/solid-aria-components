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
import {CalendarCell, CalendarGrid, RangeCalendar} from '../../src/Calendar';
import clsx from 'clsx';
import {DateInput, DateSegment} from '../../src/DateField';
import {DatePicker, DateRangePicker} from '../../src/DatePicker';
import {Dialog} from '../../src/Dialog';
import {Group} from '../../src/Group';
import {Heading} from '../../src/Heading';
import {Label} from '../../src/Label';
import {Popover} from '../../src/Popover';
import styles from '../../example/index.css';
import '../../stories/styles.css';
import type {AnnotatedStoryFn, ComponentAnnotations, Renderer} from 'storybook/internal/csf';
import type {JSX} from '@solidjs/web';

interface NativeStoryRenderer extends Renderer {
  component: (props: this['T']) => JSX.Element;
  storyResult: JSX.Element;
  canvasElement: HTMLElement;
}
type StoryArgs<T> = T extends (props: infer P) => unknown ? P : T;
type Meta<T> = ComponentAnnotations<NativeStoryRenderer, StoryArgs<T>>;
// The source example is also rendered directly without Storybook context/args.
export type DateRangePickerStory = ((args?: StoryArgs<typeof DateRangePicker>) => JSX.Element) &
  Partial<AnnotatedStoryFn<NativeStoryRenderer, StoryArgs<typeof DateRangePicker>>>;

export default {
  title: 'React Aria Components/DatePicker',
  component: DatePicker,
  argTypes: {
    onChange: {table: {disable: true}},
    granularity: {control: 'select', options: ['day', 'hour', 'minute', 'second']},
    isRequired: {control: 'boolean'},
    isInvalid: {control: 'boolean'},
    isDisabled: {control: 'boolean'},
    isReadOnly: {control: 'boolean'},
    validationBehavior: {control: 'select', options: ['native', 'aria']}
  }
} as Meta<typeof DatePicker>;

export const DateRangePickerExample: DateRangePickerStory = args => (
  <DateRangePicker data-testid="date-range-picker-example" {...args}>
    <Label style={{display: 'block'}}>Date</Label>
    <Group style={{display: 'inline-flex'}}>
      <div class={styles.field}>
        <DateInput data-testid="date-range-picker-date-input" slot="start" style={{display: 'inline'}}>
          {segment => (
            <DateSegment segment={segment} className={clsx(styles.segment, {[styles.placeholder]: segment.isPlaceholder})} />
          )}
        </DateInput>
        <span aria-hidden="true" style={{padding: '0 4px'}}>–</span>
        <DateInput slot="end" style={{display: 'inline'}}>
          {segment => (
            <DateSegment segment={segment} className={clsx(styles.segment, {[styles.placeholder]: segment.isPlaceholder})} />
          )}
        </DateInput>
      </div>
      <Button>🗓</Button>
    </Group>
    <Popover placement="bottom start" style={{background: 'Canvas', color: 'CanvasText', border: '1px solid gray', padding: '20px'}}>
      <Dialog>
        <RangeCalendar style={{width: '220px'}}>
          <div style={{display: 'flex', 'align-items': 'center'}}>
            <Button slot="previous">&lt;</Button>
            <Heading style={{flex: 1, 'text-align': 'center'}} />
            <Button slot="next">&gt;</Button>
          </div>
          <CalendarGrid style={{width: '100%'}}>
            {date => (
              <CalendarCell date={date} style={({isSelected, isOutsideMonth}) => ({
                display: isOutsideMonth ? 'none' : '',
                'text-align': 'center',
                cursor: 'default',
                background: isSelected ? 'blue' : ''
              })} />
            )}
          </CalendarGrid>
        </RangeCalendar>
      </Dialog>
    </Popover>
  </DateRangePicker>
);
