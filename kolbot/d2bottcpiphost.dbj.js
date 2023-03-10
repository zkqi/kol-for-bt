// No touchy!
include("json2.js");
include("OOG.js");
include("gambling.js");
include("craftingsystem.js");
include("common/misc.js");

if (!FileTools.exists("data/" + me.profile + ".json")) {
	DataFile.create();
}

var gameInfo, gameStart, ingame, handle,
	gameCount = DataFile.getStats().runs + 1,
	lastGameStatus = "ready",
	isUp = "no";

function ReceiveCopyData(mode, msg) {
	var obj;

	switch (msg) {
	case "Handle":
		handle = mode;
	break;
	}

	switch (mode) {
		case 2: // Game info
			gameInfo = JSON.parse(msg);
		break;
		case 3: // Game request
			// Don't let others join mule/torch/key/gold drop game
			if (AutoMule.inGame || Gambling.inGame || TorchSystem.inGame || CraftingSystem.inGame) {
				break;
			}
			if (gameInfo) {
				obj = JSON.parse(msg);

				if (me.gameReady) {
					D2Bot.joinMe(obj.profile, me.gamename.toLowerCase(), "", me.gamepassword.toLowerCase(), isUp);
				} else {
					D2Bot.joinMe(obj.profile, gameInfo.gameName.toLowerCase(), gameCount, gameInfo.gamePass.toLowerCase(), isUp);
				}
			}
		break;
		case 4: // Heartbeat ping
			if (msg === "pingreq") {
				sendCopyData(null, me.windowtitle, 4, "pingrep");
			}
		break;
		case 0xf124: // Cached info retreival
			if (msg !== "null") {
				gameInfo.crashInfo = JSON.parse(msg);
			}
		break;
	}
}

function timer (tick) {
	return " (" + new Date(getTickCount() - tick).toISOString().slice(11, -5) + ")";
}

function main() {
	debugLog(me.profile);
	addEventListener('copydata', ReceiveCopyData);

	while (!handle) {
		delay(100);
	}

	DataFile.updateStats("handle", handle);
	delay(500);
	D2Bot.init();
	load("tools/heartbeat.js");

	while (!gameInfo) {
		D2Bot.requestGameInfo();
		delay(500);
	}

	if (gameInfo.error) {
		delay(200);
		if (!!DataFile.getStats().debugInfo) {
			gameInfo.crashInfo = DataFile.getStats().debugInfo;
			D2Bot.printToConsole("Crash Info: Script: " + JSON.parse(gameInfo.crashInfo).currScript + " Area: " + JSON.parse(gameInfo.crashInfo).area, 10);
		}
		ControlAction.timeoutDelay("Crash Delay", 3000);
		D2Bot.updateRuns();
	}
	DataFile.updateStats("debugInfo", JSON.stringify({currScript: "none", area: "out of game"}));

	while (true) {
		while (me.ingame) { // returns true before actually in game so we can't only use this check
			if (me.gameReady) { // returns false when switching acts so we can't use while
				isUp = "yes";
				if (!ingame) {
					gameStart = getTickCount();
					print("Updating Status");
					lastGameStatus = "ingame";
					ingame = true;
					DataFile.updateStats("runs", gameCount);
					DataFile.updateStats("ingameTick");
				}
				D2Bot.updateStatus("Game: " + me.gamename + timer(gameStart));
			}
			delay(1000);
		}
		isUp = "no";
		locationAction(getLocation());
		print(getLocation());
		delay(1000);
	}
}

/*Find a control*/
// for(var y=0; y<1000; y++){
	// for(var x=0; x<1000; x++){
		// for(var w=0; w<150; w++){
			// for(var h=0; h<50; h++){
				// if(getControl(6, x, y, w, h)){
					// D2Bot.updateStatus(x+", "+y);
					// delay(5000);
				// }
			// }
		// }
	// }
// }

function locationAction(location) {
	var i, control, string, text;
	
	MainSwitch:
	switch (location) {
		case 0:// Splash Screen
		break;
		case 8:// Main Screen
			ControlAction.click(6, 264, 433, 272, 35);//Other Multiplayer
		break;
		case 12:// Character Select Screen
			try {
				login(me.profile);
			} catch (err) {
				print(err+" "+getLocation());
			}
		break;
		case 39:// Other Multiplayer Screen
			ControlAction.click(6, 264, 350, 272, 35);//TCP/IP Game
		break;
		case 40:// TCP IP Screen
			D2Bot.updateStatus("Create Game");
			ControlAction.click(6, 265, 206, 272, 35);//Host Game
			D2Bot.updateCount();
			// ControlAction.click(6, 265, 264, 272, 35);//Join Game
		break;
		case 41:// Join Game
			ControlAction.click(6, 281, 337, 96, 32);//Cancel
			// ControlAction.click(6, 421, 337, 96, 32);//Join
		break;
		default:
			if (location !== undefined) {
				D2Bot.printToConsole("Unhandled location " + location);
				delay(500);
				D2Bot.restart();
			}
		break;
	}
}