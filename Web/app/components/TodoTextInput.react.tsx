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

var ENTER_KEY_CODE = 13;

interface TodoTextInputProps { className?: string, id?: string, placeholder?: string, onSave: Function, value?: string }
interface TodoTextInputState { className: string, id: string, placeholder:string, onSave:Function, value: string }

export default class TodoTextInput extends React.Component<TodoTextInputProps, TodoTextInputState> {

    static propTypes: React.ValidationMap<TodoTextInputProps> = {
        id: React.PropTypes.string.isRequired,
        onSave: React.PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
          className: props.className || '',
          id: props.id,
          placeholder: props.placeholder,
          onSave: props.onSave,
          value: props.value || ''
        }
  }

  /**
   * @return {object}
   */
  render() /*object*/ {
    return (
      <input
        className={this.state.className}
        id={this.state.id}
        placeholder={this.state.placeholder}
        onBlur={this._save.bind(this)}
        onChange={this._onChange.bind(this)}
        onKeyDown={this._onKeyDown.bind(this)}
        value={this.state.value}
        autoFocus={true}
      />
    );
  };

  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  _save() {
    this.state.onSave(this.state.value);
    this.setState({
        className: this.state.className,
        id: this.state.id,
        placeholder: this.state.placeholder,
        onSave: this.state.onSave,
        value: ''
    });
  };

  /**
   * @param {object} event
   */
  _onChange(/*object*/ event) {
    this.setState({
        className: this.state.className,
        id: this.state.id,
        placeholder: this.state.placeholder,
        onSave: this.state.onSave,
        value: event.target.value
    });
  };

  /**
   * @param  {object} event
   */
  _onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  }

}
