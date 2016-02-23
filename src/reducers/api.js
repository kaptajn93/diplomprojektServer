import {TEST_API, REQUEST_POSTS, RECEIVE_POSTS} from '../actions/api'

const api = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case TEST_API:
      console.log("REDUCER GOT TEST_API ACTION");
      
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      console.log("REDUCER GOT REQUEST_POSTS ACTION");

      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      console.log("REDUCER GOT RECEIVE_POSTS ACTION");

      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export default api
