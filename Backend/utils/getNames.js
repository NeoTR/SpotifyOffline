const axios = require("axios");
const config = require("../config.json");

async function getNames(url) {
  url = url.replace("https://open.spotify.com/playlist/", "https://api.spotify.com/v1/playlists/");
  let allTracks = [];
  const headers = {
    Authorization: `Bearer ${config.spotify.bearer}`,
  };

  try {
    const response = await axios.get(url, { headers });
    response.data.tracks.items.forEach((track) => {
      const fullTrack = `${track.track.name} - ${track.track.artists[0].name}`;
      allTracks.push(fullTrack);
    });
    return allTracks;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

module.exports = {
  getNames,
};
