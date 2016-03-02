import React from 'react'
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger';

import todoApp from './reducers'
import App from './components/App'

import Dashboard from './pages/Dashboard'
import CourseModule from './pages/CourseModule'
import AdministrationModule from  './pages/AdministrationModule'

import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const loggerMiddleware = createLogger();

let store = createStore(
  todoApp,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  ));

/*
store.dispatch(selectSubreddit('reactjs'))
store.dispatch(fetchPosts('reactjs')).then(() =>
  console.log(store.getState())
)
*/

document.body.style.margin = "0px";
document.body.style.padding = "0px";
document.body.style.background = "#FAFAFA"

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard}/>
        <Route path="module" component={CourseModule}/>
        <Route path="administration" component={AdministrationModule}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'));
