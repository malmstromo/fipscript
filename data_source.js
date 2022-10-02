const { default: axios } = require('axios');
require('dotenv').config()

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const refresh_token = process.env.REFRESH_TOKEN;
const playlist_id = process.env.PLAYLIST_ID;
let access_token;

exports.getFipTrack = function() {
  const url = 'https://www.radiofrance.fr/api/v2.0/stations/fip/webradios/fip_pop';
  return axios.get(url);
}

exports.getSpotifySongUri = async function(artist, track) {   
  return refreshToken().then((token) => {
    access_token = token;
    var options = {
      url: `https://api.spotify.com/v1/search?type=track&limit=1&q=artist:${encodeURI(artist)}%20track:${encodeURI(track)}`,
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
    };
    return axios(options);
  });
}


exports.addTrack = function(uri) {
  const request = {
    method: 'POST',
    url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=${uri}`,
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
  }
  return axios(request);
}  

async function refreshToken() {
  const request = {
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: { 
      'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded' 
    },
    params: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    }
  };

  return axios(request).then((res) => {
    return res.data.access_token;
  }).catch(err => {
    console.log('error when fetching access token ', err);
    return;
  })
}

// might be useful to implement an interceptor for handling access token validity.
// not sure where to store lifetime and rotating tokens.
/* axios.interceptors.request.use(
    function (req) {
      return req;
    },
    (err) => {
      return Promise.reject(err);
    }
  ); */
