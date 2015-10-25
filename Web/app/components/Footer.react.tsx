/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

///<reference path="../../typings/tsd.d.ts"/>
import * as React from 'react';
import TodoActions from '../actions/TodoActions';
import Task from '../stores/Task';

interface FooterProps { todos: Array<Task> }
interface FooterState { total: number, todos: Array<Task>}

export default class Footer extends React.Component<FooterProps, FooterState> {

    static propTypes: React.ValidationMap<FooterProps> = {
        todos: React.PropTypes.array.isRequired
    }

    constructor(props : FooterProps) {
        super(props);
        this.state = {
          total: this.props.todos.length,
          todos: this.props.todos,
        }
    }

  _updateState(props: FooterProps) {
    this.setState({
      total: props.todos.length,
      todos: props.todos,
    });
  }

  componentDidMount() {
    console.log('footer:componentDidMount');
    this._updateState(this.props);
  }

  componentWillReceiveProps(nextProps: FooterProps) {
    console.log('footer:componentWillReceiveProps');
    this._updateState(nextProps);
  }

  /**
   * @return {object}
   */
  render() {
    var allTodos = this.state.todos;
    var total = this.state.total;

    if (total === 0) {
      return null;
    }

    var completed = allTodos.reduce((prev,curr)=>{if (curr.done){prev++} return prev;},0);

    var itemsLeft = total - completed;
    var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
    itemsLeftPhrase += 'left';

    // Undefined and thus not rendered if no completed items are left.
    var clearCompletedButton;
    if (completed) {
      clearCompletedButton =
        <button
          id="clear-completed"
          onClick={this._onClearCompletedClick.bind(this)}>
          Clear completed ({completed})
        </button>;
    }

  	return (
      <footer id="footer">
        <span id="todo-count">
          <strong>
            {itemsLeft}
          </strong>
          {itemsLeftPhrase}
        </span>
        {clearCompletedButton}
      </footer>
    );
  };

  /**
   * Event handler to delete all completed TODOs
   */
  _onClearCompletedClick() {
    TodoActions.destroyCompleted();
  };
}
