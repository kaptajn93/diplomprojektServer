import axios from 'axios'

export const TEST_API = 'TEST_API'
/*export function testApi(id) {
  return {
    type: TEST_API,
    id
  }
}*/

export const REQUEST_API_VALUE = 'REQUEST_API_VALUE'
function requestApiValue(id) {
  return {
    type: REQUEST_API_VALUE,
    id
  }
}

export const RECEIVE_API_VALUE = 'RECEIVE_API_VALUE'

export function receiveApiValue(id, json) {
  return {
    type: RECEIVE_API_VALUE,
    id,
    posts: json,//json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}


// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function fetchApiValue(id) {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestApiValue(id))

    // Secondly invoke the remote API and return a promise
    return axios.get('http://betterways-api.azurewebsites.net/api/Values/' + id)
      .then(response => response.data)
      .then(json =>

        // Final dispatch: Here, we update the app state with the results of the API call.
        // NOTE: We can dispatch many times!
        dispatch(receiveApiValue(id, json))
      )
      .catch(response => {
        console.log(response);
      });

      /*
    return fetch('http://betterways-api.azurewebsites.net/api/Values/${id}')
      .then(response => response.json())
      .then(json =>

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receiveApiValue(id, json))
      )*/

      // In a real world app, you also want to
      // catch any error in the network call.
  }
}


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

    return axios.get('http://localhost:58982/api/CourseModule/' + courseId)
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
