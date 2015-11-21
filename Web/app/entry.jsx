// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as ReactDOM from 'react-dom';
import TodoApp from './components/TodoApp.react';
import '../css/base.css';
import '../css/app.css';
ReactDOM.render(<TodoApp />, document.getElementById('content'));
