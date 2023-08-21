import { useState } from "react";
import "./App.css";
import Spotify from "./assets/logo.png";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    const inputField = document.querySelector("input");
    const playlistUrl = inputField.value.trim();

    if (!playlistUrl.startsWith("https://open.spotify.com/playlist/")) {
      alert("Please enter a valid Spotify playlist URL.");
      return;
    }

    if (playlistUrl === "") {
      setLoading(false);
      return;
    }

    if (loading) {
      return;
    }

    axios
      .post("http://localhost:3000/api/download", {
        playlistUrl: playlistUrl,
      })
      .then((response) => {
        console.log(response);
        inputField.value = "";
        const playlist = document.createElement("a");
        playlist.href = `http://localhost:3000/audio/playlist.mp3`;
        playlist.download = "playlist.mp3";
        playlist.click();

        if (response.status === 200) {
          alert("Your playlist is ready to download. Please check your email.");
        } else {
          alert("Something went wrong. Please try again.");
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        inputField.value = "";
        alert("Something went wrong. Please try again.");
      });

    setLoading(true);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 h-[100%] flex justify-center items-center">
        <div className="box bg-white shadow-2xl rounded-lg p-6  h-[60%] w-[80%] 2xl:w-[30%] lg:w-[40%] md:w-[50%] sm:w-[50%] flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Spotify Offline</h1>
            <h2 className="text-lg text-gray-600 mb-8 text-center">Download your Spotify playlist for free to watch it offline!</h2>
          </div>
          <div className="flex justify-center items-center">
            <img src={Spotify} alt="spotify" className="w-[40%] h-[100%]" />
          </div>
          <div className="input-group mb-3 items-center flex">
            <input type="text" className="form-control py-2 px-4 border border-gray-400 rounded-lg w-full" placeholder="Playlist URL" aria-label="Playlist URL" aria-describedby="button-addon2" />
            <button className="btn btn-primary py-2 px-4 ml-2 bg-[#299e29] rounded-[20px] w-[50%] text-center" type="button" id="button-addon2" onClick={handleDownload}>
              {loading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                  <span className="text-[10px] sm:text-base md:text-[12px] lg:text-[10px] xl:text-[16px]">Downloading...</span>
                </div>
              ) : (
                <span>Download</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
