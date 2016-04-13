import axios from 'axios'

const apiUrl = 'http://localhost:58982/api'
//const apiUrl = 'http://betterways-test.azurewebsites.net/api'

// Add a request interceptor
axios.interceptors.request.use(function (config) {

    //If logged in, add token to request
    if (sessionStorage.getItem('isLoggedIn') === "true"){
      var token = sessionStorage.getItem('sessionToken');
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function logOut() {
  sessionStorage.removeItem('sessionToken');
  sessionStorage.removeItem('sessionUser');
  sessionStorage.removeItem('isLoggedIn');
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${creds.userId}&password=${creds.password}`
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return axios.post(apiUrl + '/login', creds)
      .then(response => {
        if (response.statusText.toLowerCase() !== "ok") {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(response.message))
          return Promise.reject(response)
        } else {
          // If login was successful, set the token in local storage
          sessionStorage.setItem('sessionToken', response.data.token);
          sessionStorage.setItem('sessionUser', response.data.user.id);
          sessionStorage.setItem('sessionUserRole', response.data.user.role);
          sessionStorage.setItem('sessionFirstName',response.data.user.firstName);
          sessionStorage.setItem('sessionLastName',response.data.user.lastName);
          sessionStorage.setItem('isLoggedIn', true);
          // Dispatch the success action
          dispatch(receiveLogin(response))
          return response;
        }
      })
      .then(response => response.data)
      .catch(err => {
        console.log("Error: ", err);
        sessionStorage.setItem('isLoggedIn', false);
        throw err;
      })
  }
}
