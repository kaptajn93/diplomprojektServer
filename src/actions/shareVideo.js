import axios from 'axios'

const apiUrl = 'http://localhost:58982/api'
//const apiUrl = 'http://betterways-test.azurewebsites.net/api'

export const REQUEST_SHARE_VIDEO = 'REQUEST_SHARE_VIDEO'
function requestShareVideo(videoUuid) {
  return {
    type: REQUEST_SHARE_VIDEO,
    videoUuid
  }
}

export const RECEIVE_SHARE_VIDEO = 'RECEIVE_SHARE_VIDEO'
function receiveShareVideo(videoUuid, result) {
  return {
    type: RECEIVE_SHARE_VIDEO,
    videoUuid,
    result: result,
    receivedAt: Date.now()
  }
}

export function shareVideo(videoUuid, exerciseId) {
  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestShareVideo(videoUuid))

    // Secondly invoke the remote API and return a promise
    var url = apiUrl + "/videoExercise";
    //var url = 'http://betterways-test.azurewebsites.net/api';

    console.log("Sending video UUID:", videoUuid);

    return axios.post(url, {
      videoUuid: videoUuid,
      exerciseId: exerciseId
    })
      .then(response => response.data)
      .then(json => {
        console.log(json);
        dispatch(receiveSendSms(videoUuid, json))
      })
      .catch(response => {
        console.log(response);
      });
  }
}

//Get the video exercise

//get video exercise
export const REQUEST_GET_VIDEO_EXERCISE = 'REQUEST_GET_VIDEO_EXERCISE'
function requestVideoExercise(userId, videoUuid) {
  return {
    userId,
    videoUuid,
    type: REQUEST_GET_VIDEO_EXERCISE
  }
}

export const RECEIVE_GET_VIDEO_EXERCISE = 'RECEIVE_GET_VIDEO_EXERCISE'

export function receiveVideoExercise(userId, videoUuid, json) {
  return {
    type: RECEIVE_GET_VIDEO_EXERCISE,
    result: json,
    userId,
    videoUuid,
    receivedAt: Date.now()
  }
}

export function getVideoExercise(userId, videoUuid) {

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestVideoExercise());

    var url = apiUrl + '/videoExercise/user/' + userId + '/video/' + videoUuid;

    // Secondly invoke the remote API and return a promise
    return axios.get(url)
      .then(response => response.data)
      .then(json =>

        // Final dispatch: Here, we update the app state with the results of the API call.
        // NOTE: We can dispatch many times!
        dispatch(receiveVideoExercise(userId, videoUuid, json))
      )
      .catch(response => {
        console.log(response);
      });

  }
}

//post video reply
export const REQUEST_POST_VIDEO_REPLY = 'REQUEST_POST_VIDEO_REPLY'
function requestPostVideoReply(userId, videoUuid, reply) {
  return {
    userId,
    videoUuid,
    reply,
    type: REQUEST_POST_VIDEO_REPLY
  }
}

export const RECEIVE_POST_VIDEO_REPLY = 'RECEIVE_POST_VIDEO_REPLY'

export function receivePostVideoReply(userId, videoUuid, reply, json) {
  return {
    type: RECEIVE_POST_VIDEO_REPLY,
    result: json,
    userId,
    videoUuid,
    reply,
    receivedAt: Date.now()
  }
}

export function postVideoReply(userId, videoUuid, reply) {

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestPostVideoReply());

    var url = apiUrl + '/videoExercise/user/' + userId + '/video/' + videoUuid +'/reply';

    // Secondly invoke the remote API and return a promise
    return axios.post(url, {reply})
      .then(response => response.data)
      .then(json =>

        // Final dispatch: Here, we update the app state with the results of the API call.
        // NOTE: We can dispatch many times!
        dispatch(receivePostVideoReply(userId, videoUuid, json))
      )
      .catch(response => {
        console.log(response);
      });

  }
}
