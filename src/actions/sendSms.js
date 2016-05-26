import axios from 'axios'

export const REQUEST_SEND_SMS = 'REQUEST_SEND_SMS'
function requestSendSms(id) {
  return {
    type: REQUEST_SEND_SMS,
    id
  }
}

export const RECEIVE_SEND_SMS = 'RECEIVE_SEND_SMS'
function receiveSendSms(id, json) {
  return {
    type: RECEIVE_SEND_SMS,
    id,
    posts: json,//json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export function sendSms(id) {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestSendSms(id))

    // Secondly invoke the remote API and return a promise
    return axios.get('http://betterways-api.azurewebsites.net/api/Notifications/' + id)
      .then(response => response.data)
      .then(json =>

        // Final dispatch: Here, we update the app state with the results of the API call.
        // NOTE: We can dispatch many times!
        dispatch(receiveSendSms(id, json))
      )
      .catch(response => {
        console.log(response);
      });
  }
}
