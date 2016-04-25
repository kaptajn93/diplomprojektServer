import axios from 'axios'

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

export function shareVideo(videoUuid) {
  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestShareVideo(videoUuid))

    // Secondly invoke the remote API and return a promise
    var url = "http://localhost:58982/api/Exercise";
    //var url = "http://betterways-api.azurewebsites.net/api/Exercise";

    console.log("Sending video UUID:", videoUuid);

    return axios.post(url, {
      videoUuid: videoUuid
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
