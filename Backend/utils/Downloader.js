const fs = require("fs");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const { google } = require("googleapis");
const config = require("../config.json");

async function Downloader(keywords) {
  const youtube = google.youtube({
    version: "v3",
    auth: `${config.youtubeApiKey}`,
  });

  let counter = 1;
  const allAudioPaths = [];

  for (const keyword of keywords) {
    const response = await youtube.search.list({
      part: "id",
      q: keyword,
      type: "video",
      maxResults: 1,
    });

    const videoId = response.data.items[0].id.videoId;
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const videoInfo = await ytdl.getInfo(videoUrl);

    const audioStream = ytdl(videoUrl, {
      quality: "highestaudio",
      highWaterMark: 1 << 25,
    });

    const audioName = `audio_${counter}`;
    const audioPath = `./audio/${audioName}.mp3`;

    audioStream.pipe(fs.createWriteStream(audioPath));

    await new Promise((resolve, reject) => {
      audioStream.on("end", () => {
        ffmpeg()
          .input(audioPath)
          .outputOptions("-c:a libmp3lame")
          .save(`./audio/${audioName}_converted.mp3`)
          .on("end", () => {
            fs.unlinkSync(audioPath);

            allAudioPaths.push(`./audio/${audioName}_converted.mp3`);

            counter++;

            if (counter > keywords.length) {
              const mergedAudioPath = `./audio/playlist.mp3`;

              const mergedAudioStream = fs.createWriteStream(mergedAudioPath);

              const ffmpegProcess = ffmpeg();

              for (const audioPath of allAudioPaths) {
                ffmpegProcess.input(audioPath);
              }

              ffmpegProcess
                .on("error", (err) => {
                  console.error(err);
                })
                .on("end", () => {
                  for (const audioPath of allAudioPaths) {
                    fs.unlinkSync(audioPath);
                  }

                  resolve(mergedAudioPath);
                })
                .mergeToFile(mergedAudioPath);
            } else {
              resolve();
            }
          })
          .on("error", (err) => {
            console.error(err);
            reject(err);
          });
      });

      audioStream.on("error", (err) => {
        console.error(err);
        reject(err);
      });
    });
  }
}

module.exports = { Downloader };
