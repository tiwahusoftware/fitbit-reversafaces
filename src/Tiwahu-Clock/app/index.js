import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const localLabel = document.getElementById("localLabel");
const localHours = document.getElementById("localHours");
const localMinutes = document.getElementById("localMinutes");
const localSeconds = document.getElementById("localSeconds");
const utcLabel = document.getElementById("utcLabel");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let now = evt.date;
  let hours = now.getHours();
  
  let utc = now.toISOString();
  
  console.log(`${now} => ${utc}`);
  
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(now.getMinutes());
  let secs = util.zeroPad(now.getSeconds());
  
  //localLabel.text = `${hours}:${mins}:${secs}`;

  localHours.text = `${hours}`;
  localMinutes.text = `${mins}`;
  localSeconds.text = `${secs}`;

  utcLabel.text = `${utc.slice(0, 19)}Z`;
}

