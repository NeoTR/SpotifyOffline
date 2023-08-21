# Spotify Offline

Spotify Offline is a Node.js application that allows you to download your favorite Spotify playlists and listen to them offline. The application uses the Spotify Web API to authenticate with your Spotify account and download your playlists as one MP3 file. It uses React with Tailwind Css for the frontend.

## Installation

To install Spotify Offline, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies by running the command `npm install`.
3. Create a `config.json` file in the root directory of the project and add your Spotify API credentials and YouTube API key. Here's an example `config.json` file:

```json
{
  "youtubeApiKey": "YOUR_YOUTUBE_API_KEY",
  "spotify": [
    {
      "bearer": "",
      "clientID": "YOUR_SPOTIFY_CLIENT_ID",
      "clientSecret": "YOUR_SPOTIFY_CLIENT_SECRET"
    }
  ]
}
```

4. Run the command `node .` to start the application.
5. Repeat for the frontend too but use `npm run dev` or `npm run build` to build the frontend.

## Usage

To use Spotify Offline, follow these steps:

1. Open a web browser and navigate to `http://localhost:3000`.
2. Copy your spotify playlist link into the input field.
3. Click the "Download" button next to a playlist to download it as an MP3 file.
4. The downloaded MP3 playlist will be saved to the `downloads` directory on your computer.

## Contributing

If you would like to contribute to Spotify Offline, please follow these steps:

1. Fork the repository to your own GitHub account.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them to your branch.
4. Push your changes to your forked repository.
5. Create a pull request to merge your changes into the main repository.

## Credits

Spotify Offline was created by @NeoTR. Special thanks to the following libraries and APIs:

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [YouTube Data API](https://developers.google.com/youtube/v3)

## Preview
![Site](https://i.imgur.com/ZD9Su6t.png)
