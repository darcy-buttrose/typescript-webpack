/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

///<reference path="../../typings/tsd.d.ts"/>
import * as React from 'react';
import TodoActions from '../actions/TodoActions';
import TodoItem from './TodoItem.react';
import Task from '../stores/Task';

interface MainSectionProps { todos: Array<Task> }
interface MainSectionState {range: number, todos: Array<Task>, filter: Function}

export default class MainSection extends React.Component<MainSectionProps, MainSectionState> {

    static propTypes: React.ValidationMap<MainSectionProps> = {
        todos: React.PropTypes.array.isRequired
    }

    private filters: any = {
      all: x=>true,
      completed: x=>x.done,
      active: x=>!x.done
    };

  constructor(props: MainSectionProps) {
      super(props);
      this.state = {
          range: this.props.todos.length,
          todos: this.props.todos,
          filter: this.filters.all
      };
      console.log('mainSect:ctor => ' + JSON.stringify(this.state));
  }

  _changeFilter(filter: string){
      this.setState({
          range: this.state.range,
          todos: this.state.todos,
          filter: this.filters[filter]
      });
  }

  _updateState(props : MainSectionProps) {
    this.setState({
      range: props.todos.length,
      todos: props.todos,
      filter: this.state.filter
    });
  }

  componentDidMount() {
    console.log('mainSect:componentDidMount');
    this._updateState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('mainSect:componentWillReceiveProps');
    this._updateState(nextProps);
  }

  /**
   * @return {object}
   */
  render() {
    let todoList = this.state.todos
        .filter(x=>this.state.filter(x[1]))
        .map((todo,idx)=> {
          console.log('todo=> id:' + todo[0] + ' item:' + JSON.stringify(todo[1]));
          return (<TodoItem todoid={todo[0]} key={todo[0]} name={todo[1].name} done={todo[1].done} />)
        })

    return (
      <section id="main">
        <ul id="todo-list">{todoList}</ul>
      </section>
    );
  };

  /**
   * Event handler to mark all TODOs as complete
   */
  _onToggleCompleteAll() {
    TodoActions.toggleCompleteAll();
  };
}

