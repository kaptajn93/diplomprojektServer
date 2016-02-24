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
function receiveApiValue(id, json) {
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
