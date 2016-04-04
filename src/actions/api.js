import axios from 'axios'

export const REQUEST_API_ALL_COURSES = 'REQUEST_API_ALL_COURSES'
function requestApiAllCourses() {
  return {
    type: REQUEST_API_ALL_COURSES
  }
}

export const RECEIVE_API_ALL_COURSES = 'RECEIVE_API_ALL_COURSES'

export function receiveApiAllCourses(json) {
  return {
    type: RECEIVE_API_ALL_COURSES,
    courses: json,//json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export function getAllCourses(){
  return function (dispatch){
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestApiAllCourses())

    return axios.get('http://localhost:58982/api/Course/')
      .then(response => response.data)
      .then(json =>

        // Final dispatch: Here, we update the app state with the results of the API call.
        // NOTE: We can dispatch many times!
        dispatch(receiveApiAllCourses(json))
      )
      .catch(response => {
        console.log(response);
      });
  }
}

//GEt all course modules
export const REQUEST_API_ALL_COURSE_MODULES = 'REQUEST_API_ALL_COURSE_MODULES'
function requestApiAllCourseModules(courseId) {
  return {
    type: REQUEST_API_ALL_COURSE_MODULES,
    courseId
  }
}

export const RECEIVE_API_ALL_COURSE_MODULES = 'RECEIVE_API_ALL_COURSE_MODULES'
export function receiveApiAllCourseModules(courseId, json) {
  return {
    type: RECEIVE_API_ALL_COURSE_MODULES,
    courseId,
    modules: json,//json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export function getAllCourseModules(courseId){
  return function (dispatch){
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestApiAllCourseModules(courseId))

    return axios.get('http://localhost:58982/api/course/' + courseId + '/modules')
      .then(response => response.data)
      .then(json =>

        // Final dispatch: Here, we update the app state with the results of the API call.
        // NOTE: We can dispatch many times!
        dispatch(receiveApiAllCourseModules(courseId, json))
      )
      .catch(response => {
        console.log(response);
      });
  }
}

//Get module
export const REQUEST_API_MODULE = 'REQUEST_API_MODULE'
function requestApiModule(moduleId) {
  return {
    type: REQUEST_API_MODULE,
    moduleId
  }
}

export const RECEIVE_API_MODULE = 'RECEIVE_API_MODULE'
export function receiveApiModule(moduleId, json) {
  return {
    type: RECEIVE_API_MODULE,
    moduleId,
    module: json,//json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export function getModule(moduleId){
  return function (dispatch){
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestApiModule(moduleId))

    return axios.get('http://localhost:58982/api/module/' + moduleId)
      .then(response => response.data)
      .then(json =>

        // Final dispatch: Here, we update the app state with the results of the API call.
        // NOTE: We can dispatch many times!
        dispatch(receiveApiModule(moduleId, json))
      )
      .catch(response => {
        console.log(response);
      });
  }
}

//getResourceById

export const REQUEST_API_RESOUCE_BY_ID = 'REQUEST_API_RESOUCE_BY_ID'
function requestApiResource(resourceId) {
  return {
    type: REQUEST_API_RESOUCE_BY_ID,
    resourceId
  }
}

export const RECEIVE_API_RESOUCE_BY_ID = 'RECEIVE_API_RESOUCE_BY_ID'
export function receiveApiResource(resourceId, json) {
  return {
    type: RECEIVE_API_RESOUCE_BY_ID,
    resourceId,
    resource: json,//json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export function getResourceById(resourceId){
  return function (dispatch){
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestApiResource(resourceId))

    return axios.get('http://localhost:58982/api/Resource/' + resourceId)
      .then(response => response.data)
      .then(json =>

        // Final dispatch: Here, we update the app state with the results of the API call.
        // NOTE: We can dispatch many times!
        dispatch(receiveApiResource(resourceId, json))
      )
      .catch(response => {
        console.log(response);
      });
  }
}

//Get exercise resource
export const REQUEST_API_EXERCISE_RESOUCE_BY_ID = 'REQUEST_API_EXERCISE_RESOUCE_BY_ID'
function requestApiExerciseResource(resourceId) {
  return {
    type: REQUEST_API_EXERCISE_RESOUCE_BY_ID,
    resourceId
  }
}

export const RECEIVE_API_EXERCISE_RESOUCE_BY_ID = 'RECEIVE_API_EXERCISE_RESOUCE_BY_ID'
export function receiveApiExerciseResource(resourceId, json) {
  return {
    type: RECEIVE_API_EXERCISE_RESOUCE_BY_ID,
    resourceId,
    resource: json,//json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export function getExerciseResourceById(resourceId){
  return function (dispatch){
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestApiExerciseResource(resourceId))

    return axios.get('http://localhost:58982/api/ExerciseResource/' + resourceId)
      .then(response => response.data)
      .then(json =>

        // Final dispatch: Here, we update the app state with the results of the API call.
        // NOTE: We can dispatch many times!
        dispatch(receiveApiExerciseResource(resourceId, json))
      )
      .catch(response => {
        console.log(response);
      });
  }
}

//Put module description
export const PUT_API_MODULE_DESCRIPTION = 'PUT_API_MODULE_DESCRIPTION'
function putApiModuleDescription(moduleId, description) {
  return {
    type: PUT_API_MODULE_DESCRIPTION,
    moduleId,
    description
  }
}

export function putModuleDescription(moduleId, description){
  return function (dispatch){
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    var foo = 2;
    dispatch(putApiModuleDescription(moduleId))

    return axios.put('http://localhost:58982/api/module/' + moduleId + '/description', '=' + description)
      .then(response => response.data)

      .catch(response => {
        console.log(response);
      });
  }
}


//Put resource

export const PUT_API_RESOUCE = 'PUT_API_RESOUCE'
function putApiResource(resourceId, moduleId, newContent) {
  return {
    type: PUT_API_RESOUCE,
    resourceId,
    moduleId,
    newContent
  }
}

export const RECEIVE_API_UPDATED_RESOUCE_ID = 'RECEIVE_API_UPDATED_RESOUCE_ID'
export function receiveApiUpdatedResourceId(resourceId, json) {
  return {
    type: RECEIVE_API_UPDATED_RESOUCE_ID,
    response:json,
    receivedAt: Date.now()
  }
}

export function putResourceById(resourceId, moduleId, newContent){
  return function (dispatch){
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(putApiResource(resourceId))

    return axios.put('http://localhost:58982/api/Resource/', {
      resourceId: resourceId,
      moduleId: moduleId,
      updatedContent: newContent})
      .then(response => response.data)
      .then(json =>

        // Final dispatch: Here, we update the app state with the results of the API call.
        // NOTE: We can dispatch many times!
        dispatch(receiveApiUpdatedResourceId(resourceId, json))
      )
      .catch(response => {
        console.log(response);
      });
  }
}

//Put exercise resource

export const PUT_API_EXERCISE_RESOUCE = 'PUT_API_EXERCISE_RESOUCE'
function putApiExerciseResource(resourceId, moduleId, newContent) {
  return {
    type: PUT_API_EXERCISE_RESOUCE,
    resourceId,
    moduleId,
    newContent
  }
}

export function putExerciseResourceById(resourceId, moduleId, updatedElements){
  return function (dispatch){
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(putApiExerciseResource(resourceId))

    return axios.put('http://localhost:58982/api/ExerciseResource/', {
      resourceId: resourceId,
      moduleId: moduleId,
      updatedElements: updatedElements})
      .then(response => response.data)
      .then(json =>

        // Final dispatch: Here, we update the app state with the results of the API call.
        // NOTE: We can dispatch many times!
        dispatch(receiveApiUpdatedResourceId(resourceId, json))
      )
      .catch(response => {
        console.log(response);
      });
  }
}

//Current user
export const REQUEST_GET_CURRENT_USER = 'REQUEST_GET_CURRENT_USER'
function requestCurrentUser() {
  return {
    type: REQUEST_GET_CURRENT_USER
  }
}

export const RECEIVE_GET_CURRENT_USER = 'RECEIVE_GET_CURRENT_USER'

export function receiveCurrentUser(json) {
  return {
    type: RECEIVE_GET_CURRENT_USER,
    user: json,//json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}


// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function getCurrentUser() {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestCurrentUser())

    // Secondly invoke the remote API and return a promise
    return axios.get('http://localhost:58982/api/user/currentUser')
      .then(response => response.data)
      .then(json =>

        // Final dispatch: Here, we update the app state with the results of the API call.
        // NOTE: We can dispatch many times!
        dispatch(receiveCurrentUser(json))
      )
      .catch(response => {
        console.log(response);
      });

  }
}

//Current user result
export const REQUEST_GET_CURRENT_USER_RESULT = 'REQUEST_GET_CURRENT_USER_RESULT'
function requestCurrentUserResult() {
  return {
    type: REQUEST_GET_CURRENT_USER_RESULT
  }
}

export const RECEIVE_GET_CURRENT_USER_RESULT = 'RECEIVE_GET_CURRENT_USER_RESULT'

export function receiveCurrentUserResult(json) {
  return {
    type: RECEIVE_GET_CURRENT_USER_RESULT,
    results: json,//json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}


// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function getCurrentUserResult() {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestCurrentUserResult())

    // Secondly invoke the remote API and return a promise
    return axios.get('http://localhost:58982/api/user/currentUser/results')
      .then(response => response.data)
      .then(json =>

        // Final dispatch: Here, we update the app state with the results of the API call.
        // NOTE: We can dispatch many times!
        dispatch(receiveCurrentUserResult(json))
      )
      .catch(response => {
        console.log(response);
      });

  }
}

//Update sort and eval exercise
export const PUT_API_SORT_AND_EVAL_RESULT = 'PUT_API_SORT_AND_EVAL_RESULT'
function putSortAndEvalResult(exerciseId, result) {
  return {
    type: PUT_API_SORT_AND_EVAL_RESULT,
    exerciseId,
    result
  }
}

export function putSortAndEvalResultById(exerciseId, result){
  return function (dispatch){
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(putSortAndEvalResult(exerciseId, result))

    return axios.put('http://localhost:58982/api/user/currentUser/sortandevalexercise/'+ exerciseId + '/result/', result)
      .then(response => response.data)
      .then(json =>

        // Final dispatch: Here, we update the app state with the results of the API call.
        // NOTE: We can dispatch many times!
        dispatch(receiveApiUpdatedResourceId(exerciseId, json))
      )
      .catch(response => {
        console.log(response);
      });
  }
};

export const PUT_API_KP_EXPLORER_RESULT = 'PUT_API_KP_EXPLORER_RESULT'
function putKpExplorerResult(exerciseId, result) {
  return {
    type: PUT_API_KP_EXPLORER_RESULT,
    exerciseId,
    result
  }
}

export function putKpExplorerResultById(exerciseId, result){
  return function (dispatch){
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(putKpExplorerResult(exerciseId, result))

    return axios.put('http://localhost:58982/api/user/currentUser/kpexplorerexercise/'+ exerciseId + '/result/', result)
      .then(response => response.data)
      .then(json =>

        // Final dispatch: Here, we update the app state with the results of the API call.
        // NOTE: We can dispatch many times!
        dispatch(receiveApiUpdatedResourceId(exerciseId, json))
      )
      .catch(response => {
        console.log(response);
      });
  }
};

//Get sort and eval result
export const REQUEST_EXERCISE_RESULT = 'REQUEST_EXERCISEL_RESULT'
function requestExerciseResult(exerciseId, userId) {
  return {
    type: REQUEST_EXERCISE_RESULT,
    exerciseId,
    userId
  }
}

export const RECEIVE_EXERCISE_RESULT = 'RECEIVE_EXERCISE_RESULT'
export function receiveExerciseResult(exerciseId, json, userId) {
  return {
    type: RECEIVE_EXERCISE_RESULT,
    result: json,//json.data.children.map(child => child.data),
    exerciseId,
    userId,
    receivedAt: Date.now()
  }
}

export function getExerciseResult(exerciseId, userId){
  return function (dispatch){
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestExerciseResult(exerciseId, userId))
    var url = 'http://localhost:58982/api/user/currentUser/exercise/' + exerciseId + '/result/';
    if (userId !== undefined)
      url = 'http://localhost:58982/api/user/'+ userId +'/exercise/' + exerciseId + '/result/';

    return axios.get(url)
      .then(response => response.data)
      .then(json =>

        // Final dispatch: Here, we update the app state with the results of the API call.
        // NOTE: We can dispatch many times!
        dispatch(receiveExerciseResult(exerciseId, json))
      )
      .catch(response => {
        console.log(response);
      });
  }
}

export const REQUEST_ALL_MODULE_EXERCISES = 'REQUEST_ALL_MODULE_EXERCISES'
function requestAllModuleExercises(moduleId) {
  return {
    type: REQUEST_ALL_MODULE_EXERCISES,
    moduleId
  }
}

export const RECEIVE_ALL_MODULE_EXERCISES = 'RECEIVE_ALL_MODULE_EXERCISES'
export function receiveAllModuleExercises(moduleId, json) {
  return {
    type: RECEIVE_ALL_MODULE_EXERCISES,
    exercises: json,//json.data.children.map(child => child.data),
    moduleId,
    receivedAt: Date.now()
  }
}

export function getModuleExercises(moduleId){
  return function (dispatch){
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestAllModuleExercises(moduleId))

    return axios.get('http://localhost:58982/api/module/' + moduleId + '/exercises/')
      .then(response => response.data)
      .then(json =>

        // Final dispatch: Here, we update the app state with the results of the API call.
        // NOTE: We can dispatch many times!
        dispatch(receiveAllModuleExercises(moduleId, json))
      )
      .catch(response => {
        console.log(response);
      });
  }
}
