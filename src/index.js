import React from 'react'
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import todoApp from './reducers'
import App from './components/App'

import Dashboard from './pages/Dashboard'
import CourseModule from './pages/CourseModule'

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

let store = createStore(todoApp)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard}/>
        <Route path="module" component={CourseModule}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'));
