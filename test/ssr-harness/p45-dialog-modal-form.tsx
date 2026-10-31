/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

// Physical native translation of the complete original Dialog.ssr.test.js fixture.
// Frozen source: 3bdef480e85ff135cd485e9f4511b98300127d4b.
import {Button} from '../../packages/react-aria-components/src/Button';
import {Dialog, DialogTrigger} from '../../packages/react-aria-components/src/Dialog';
import {Heading} from '../../packages/react-aria-components/src/Heading';
import {Input} from '../../packages/react-aria-components/src/Input';
import {Label} from '../../packages/react-aria-components/src/Label';
import {Modal} from '../../packages/react-aria-components/src/Modal';
import {TextField} from '../../packages/react-aria-components/src/TextField';

export function Fixture() {
  return (
    <DialogTrigger isOpen>
      <Button>Sign up…</Button>
      <Modal>
        <Dialog>
          {values => (
            <form>
              <Heading slot="title">Sign up</Heading>
              <TextField autoFocus>
                <Label>First Name:</Label>
                <Input />
              </TextField>
              <TextField>
                <Label>Last Name:</Label>
                <Input />
              </TextField>
              <Button onPress={values.close}>
                Submit
              </Button>
            </form>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
