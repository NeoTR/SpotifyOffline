import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="box bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Spotify Offline</h1>
          <h2 className="text-lg text-gray-600 mb-8">Download your Spotify playlist for free to watch it offline!</h2>
          <div className="input-group mb-3">
            <input type="text" className="form-control py-2 px-4 border border-gray-400 rounded-lg w-full" placeholder="Playlist URL" aria-label="Playlist URL" aria-describedby="button-addon2" />
            <button className="btn btn-primary py-2 px-4 ml-2" type="button" id="button-addon2">
              Download
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
