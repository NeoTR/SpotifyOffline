const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { getNames } = require("./utils/getNames.js");
const { Downloader } = require("./utils/Downloader.js");
const axios = require("axios");
const config = require("./config.json");
const fs = require("fs");
const path = require("path");

app.use(bodyParser.json());
app.use(cors());

function updateConfig() {
  const data = new URLSearchParams();
  data.append("grant_type", "client_credentials");
  data.append("client_id", config.spotify[0].clientID);
  data.append("client_secret", config.spotify[0].clientSecret);

  axios
    .post("https://accounts.spotify.com/api/token", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((response) => {
      config.spotify[0].bearer = response.data.access_token;
      fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
}

updateConfig();

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.post("/api/download", async (req, res) => {
  const { playlistUrl } = req.body;

  if (!playlistUrl) {
    return res.status(400).send("URL is required");
  }

  try {
    const tracks = await getNames(playlistUrl);
    await Downloader(tracks);

    res.status(200).send("success");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/audio/:file", (req, res) => {
  const file = `${__dirname}/audio/${req.params.file}`;
  res.download(file);
});

app.listen(3000, () => console.log(`Server started at: http://localhost:3000`));
