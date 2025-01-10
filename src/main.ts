import RustPlus, {
  type AppBroadcast,
  type AppResponse,
} from "@liamcottle/rustplus.js";

const playerId = "76561198025040446";
const playerToken = "-1179547628";
const ip = "148.113.198.4";
const port = "28082";

let rustplus = new RustPlus(ip, port, playerId, playerToken);

export type MessageType = "response" | "broadcast";

function handleBroadcast(broadcast: AppBroadcast) {
  console.log("Broadcast received.");
  if (broadcast.teamChanged) {
    let data = broadcast.teamChanged;
    console.log(data);
  }
  // console.log(broadcast);
}

function handleResponse(response: AppResponse) {}

rustplus.on("connected", () => {
  // rustplus.sendTeamMessage("Ima touch you");
  // rustplus.getMap((data) => console.log(data));
  rustplus.getTeamInfo((data) => {
    console.log(data.response.teamInfo);
    let steamid = data.response.teamInfo.members.at(0)?.steamId;
    if (!steamid) return;
    console.log(steamid.toString(10));
    console.log(steamid.low);
    console.log(steamid.high);
  });
});

rustplus.on("message", (message) => {
  if (message.broadcast) handleBroadcast(message.broadcast);
  if (message.response) handleResponse(message.response);
  console.log("Message received.");
  return true;
});
rustplus.connect();
