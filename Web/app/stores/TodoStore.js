/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */
import { AppDispatcher, ActionType } from '../dispatcher/AppDispatcher';
import * as EventEmitter from 'events';
import assign from 'object-assign';
import * as falcor from 'falcor';
import falcorDataSource from 'falcor-http-datasource';
var CHANGE_EVENT = 'change';
var TodoStore = assign({}, EventEmitter.prototype, {
    emitChange: () => {
        this.emit(CHANGE_EVENT);
    },
    /**
     * @param {function} callback
     */
    addChangeListener: (callback) => {
        this.on(CHANGE_EVENT, callback);
    },
    /**
     * @param {function} callback
     */
    removeChangeListener: (callback) => {
        this.removeListener(CHANGE_EVENT, callback);
    }
});
export default TodoStore;
let todoModel = new falcor.Model({
    source: new falcorDataSource('http://localhost:1337/model.json')
});
function create(text) {
    console.log('todoStore:create => ' + text);
    var newtodo = [];
    todoModel.getValue("todos.length")
        .then(len => {
        newtodo[len] = {
            name: text,
            done: false
        };
        newtodo.length = len + 1;
        return newtodo;
    })
        .then(_ => {
        console.log('todoStore:create.set => ' + JSON.stringify(newtodo));
        todoModel.set({ json: { todos: newtodo } })
            .then(res => {
            TodoStore.emitChange();
        });
    });
}
function updateName(id, name) {
    todoModel.setValue(['todos', id, 'name'], name)
        .then((res) => {
        TodoStore.emitChange();
    });
}
function updateDone(id, done) {
    console.log('updateDone=> id:' + id + ' done:' + done);
    todoModel.setValue(['todos', id, 'done'], done)
        .then((res) => {
        TodoStore.emitChange();
    });
}
function destroy(id) {
    todoModel.call(['todos', 'splice'], [id, id + 1]);
}
// Register callback to handle all updates
AppDispatcher.register((action) => {
    var text;
    switch (action.actionType) {
        case ActionType.Create:
            text = action.text.trim();
            if (text !== '') {
                create(text);
            }
            break;
        case ActionType.UndoComplete:
            updateDone(action.id, false);
            break;
        case ActionType.Complete:
            updateDone(action.id, true);
            break;
        case ActionType.UpdateText:
            text = action.text.trim();
            if (text !== '') {
                updateName(action.id, text);
            }
            break;
        case ActionType.Destroy:
            destroy(action.id);
            break;
        default:
    }
});
