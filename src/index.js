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

import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import CourseModule from './pages/CourseModule'
import AdministrationModule from  './pages/AdministrationModule'
import VideoReview from  './pages/VideoReview'
import DialogModule from  './pages/DialogModule'
import ExerciseResultPage from './pages/ExerciseResultPage'
import LoginPage from './pages/LoginPage'
import VideoRecord from './pages/VideoRecord'

import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';
import Theme from './components/Theme'

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

var loginState = {
  isLoggedIn : sessionStorage.getItem('isLoggedIn')
}

document.body.style.margin = "0px";
document.body.style.padding = "0px";
document.body.style.background = Theme.palette.backgroundColor;

/*<IndexRoute component={LandingPage}/>*/
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} loginState={loginState}>
        <IndexRoute component={LoginPage}  loginState={loginState}/>

        <Route path="dashboard" component={Dashboard}/>
        <Route path="module/:moduleId" component={CourseModule}/>
        <Route path="administration" component={AdministrationModule}/>
        <Route path="videoreview" component={VideoReview}/>
        <Route path="dialog" component={DialogModule} />
        <Route path="coachDialogOverview" isCoachDialog={true} component={DialogModule} />
        <Route path="exerciseResult/:userId" component={ExerciseResultPage} />
        <Route path="videorecord/:exerciseId" component={VideoRecord} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'));
