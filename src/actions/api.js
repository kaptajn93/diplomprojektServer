import axios from 'axios'

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
    posts: json//json.data.children.map(child => child.data),
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

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return axios.get('http://betterways-api.azurewebsites.net/api/Values/${id}')
      .then(response => response.data)
      .then(json =>

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

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
