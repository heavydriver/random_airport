require("dotenv").config();
const fs = require("fs");
const Twitter = require("twitter");
const airport = require("./airport");

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const tweet = (message) => {
  const data = fs.readFileSync("image/airport.jpg");

  client.post(
    "media/upload",
    { media: data },
    function (error, media, response) {
      if (!error) {
        console.log(media);

        var status = {
          status: message,
          media_ids: media.media_id_string,
        };

        client.post(
          "statuses/update",
          status,
          function (error, tweet, response) {
            if (!error) {
              console.log(tweet);
            }
          }
        );
      }
    }
  );
};

const message = airport();

setTimeout(() => {
  message.then((message) => {
    tweet(message);
  });
}, 2500);
