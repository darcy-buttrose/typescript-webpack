/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

///<reference path="../../typings/tsd.d.ts"/>
import Footer from './Footer.react';
import Header from './Header.react';
import MainSection from './MainSection.react';
import * as React from 'react';
import TodoStore from '../stores/TodoStore';
import Task from '../stores/Task';
import * as fjs from 'functional.js';

interface TodoAppProps { }
interface TodoAppState { range: number, todos: Array<Task> }

export default class TodoApp extends React.Component<TodoAppProps, TodoAppState> {

    constructor(props) {
        super(props);
        this.state = {
            range: 0,
            todos: []
        }
    }

    _updateState() {
        let model = TodoStore.getModel();
        model.getValue("todos.length")
            .then(len => {
                console.log('len=' + len);
                return len - 1;
            })
            .then(len => {
                model.get(`todos[0..${len}].['name','done']`)
                    .then(res=> {
                        console.log('get=> ' + JSON.stringify(res));
                        this.setState({
                            range: len,
                            todos: fjs.toArray(res.json.todos)
                        });
                    })
            })
    }

    componentDidMount() {
        TodoStore.addChangeListener(this._onChange.bind(this));
        this._updateState();
    };

    componentWillUnmount() {
        TodoStore.removeChangeListener(this._onChange);
    };

    /**
     * @return {object}
     */
    render() {
        console.log('todoApp:render');
        return (
            <div>
                <Header />
                <MainSection todos={this.state.todos}/>
                <Footer todos={this.state.todos} />
            </div>
        );
    };

    /**
     * Event handler for 'change' events coming from the TodoStore
     */
    _onChange() {
        this._updateState();
    };

}
