/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * AppDispatcher
 *
 * A singleton that operates as the central hub for application updates.
 */
///<reference path="../../typings/tsd.d.ts"/>
import * as flux from 'flux';

export enum ActionType {
    Create,
    Complete,
    Destroy,
    DestroyComplete,
    ToggleComplete,
    UndoComplete,
    UpdateText,
    CompleteAll
}
export interface IPayload {
    actionType: ActionType;
    id?: string;
    text?: string;
}
export var AppDispatcher: flux.Dispatcher<IPayload> = new flux.Dispatcher();
