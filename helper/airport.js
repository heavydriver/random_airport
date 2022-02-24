require("dotenv").config();
const fs = require("fs");
const downloadFile = require("./download");

const airport = async () => {
  let airports = [];
  let zoom = 13;

  try {
    const jsonString = fs.readFileSync("lib/airports copy.json", "utf-8");
    airports = JSON.parse(jsonString);
  } catch (error) {
    console.log(error);
  }

  const index = Math.floor(Math.random() * (airports.length - 1 - 0 + 1) + 0);

  try {
    fs.writeFileSync(
      "lib/airports copy.json",
      JSON.stringify(
        airports.filter((airport) => {
          return airport?.id !== airports[index].id;
        }),
        null,
        2
      )
    );
  } catch (error) {
    console.log(error);
  }

  const airport = airports[index];

  if (airport?.type === "small_airport") {
    zoom = 14;
  } else if (airport?.type === "medium_airport") {
    zoom = 13.5;
  } else {
    zoom = 13;
  }

  const url = `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${airport?.longitude_deg},${airport?.latitude_deg},${zoom},0/800x800?access_token=${process.env.MAPBOX_TOKEN}`;
  const message = `${airport?.iata_code} - ${airport?.name}\nISO region - ${airport?.iso_region}\nElevation - ${airport?.elevation_ft}ft`;

  await downloadFile(url, "../image", "airport.jpg");

  return message;
};

module.exports = airport;
