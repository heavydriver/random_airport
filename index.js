const cron = require("node-cron");
const shell = require("shelljs");

cron.schedule("0 */4 * * *", () => {
  console.log("running a task every minute");
  if (shell.exec("node ./helper/tweet.js").code !== 0) {
    console.log("Something went wrong");
  }
});
