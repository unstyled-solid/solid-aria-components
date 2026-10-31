/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/** Widths that result in a constant pixel value for the same Table width. */
export type ColumnStaticSize = number | `${number}` | `${number}%`; // match regex: /^(\d+)(?=%$)/
/**
 * Widths that change size in relation to the remaining space and in ratio to other dynamic columns.
 * All numbers must be integers and greater than 0.
 * FR units take up remaining, if any, space in the table.
 */
export type ColumnDynamicSize = `${number}fr`; // match regex: /^(\d+)(?=fr$)/
/** All possible sizes a column can be assigned. */
export type ColumnSize = ColumnStaticSize | ColumnDynamicSize;
