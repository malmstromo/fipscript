const ds = require('./data_source')


function run() {
  getFipTrack().then(res => {
    const track = res.data.now.firstLine;
    const artist = res.data.now.secondLine;
    getSpotifySongUri(artist, track).then(uri => {
      if (uri) {
        console.log(`want to add track ${artist} - ${track}`);
        addTrack(uri);
      }
    })
  })
}

/**
 * @returns artist and songame of currently played track on FIP Pop radio, consumes FIP API
 */
async function getFipTrack() {
  return ds.getFipTrack();
}

/**
 * adds track to (hardcoded) playlist
 * @param {string} uri 
 */
function addTrack(uri) {
  ds.addTrack(uri).then(res => {
    if(res.status === 201) {
      console.log('successfully added track');
    }
  }).catch(err => {
    console.log('error when adding track: ', err.code);
  });
}


function getSpotifySongUri(artist, track) {
  return ds.getSpotifySongUri(artist, track).then(res => {
    if(res.data.tracks.items.length > 0) {
      return res.data.tracks.items[0].uri;
    } else {
      console.log(`track not found on spotify: ${artist} - ${track}`)
    }
  }).catch(err => {
    console.log('error when fetching spotify track uri ', err);
  })
}

run();
