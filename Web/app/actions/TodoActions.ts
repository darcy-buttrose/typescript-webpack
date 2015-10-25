/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoActions
 */
import {AppDispatcher, ActionType} from "../dispatcher/AppDispatcher";
import Task from '../stores/Task';

var TodoActions = {

  /**
   * @param  {string} text
   */
  create: (text:string) => {
      AppDispatcher.dispatch({
          actionType: ActionType.Create,
          text: text
      });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  updateText: (id:string, text:string) => {
      AppDispatcher.dispatch({
          actionType: ActionType.UpdateText,
          id: id,
          text: text
      });
  },

  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} todo
   */
  toggleComplete: (todo:Task) => {
      var id = todo.id;
      var actionType = todo.done ?
          ActionType.UndoComplete :
          ActionType.Complete;

      AppDispatcher.dispatch({
          actionType: actionType,
          id: id
      });
  },

  /**
   * Mark all ToDos as complete
   */
  toggleCompleteAll: () => {
      AppDispatcher.dispatch({
          actionType: ActionType.CompleteAll
      });
  },

  /**
   * @param  {string} id
   */
  destroy: (id:string) => {
      AppDispatcher.dispatch({
          actionType: ActionType.Destroy,
          id: id
      });
  },

  /**
   * Delete all the completed ToDos
   */
  destroyCompleted: () => {
      AppDispatcher.dispatch({
          actionType: ActionType.DestroyComplete
      });
  }

};
export default TodoActions;