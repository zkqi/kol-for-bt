	include("OOG.js");
	include("json2.js");
	include("common/Attack.js");
	include("common/Config.js");
	include("common/Pather.js");
	include("common/Misc.js");
	include("common/Prototypes.js");
	include("common/Town.js");

	include("common/Cubing.js");
	include("common/Runewords.js");
	include("common/Precast.js");
	include("common/Storage.js");
	include("common/CollMap.js");
	
	//include("automule.js");
	//include("craftingsystem.js");
	//include("common/Pickit.js");
/*include("NTItemParser.dbl");
include("Gambling.js");
include("CraftingSystem.js");

include("common/Loader.js");
include("common/Pickit.js");
*/

	

var autoparty=true;
var needchangeparty=true;


function main() {
		var i, mercHP, ironGolem, merc,
		quitFlag = false,
		canQuit = true,
		timerLastDrink = [];
	NPC = {
	Akara: getLocaleString(2892),
	Gheed: getLocaleString(2891),
	Charsi: getLocaleString(2894),
	Kashya: getLocaleString(2893),

	Fara: getLocaleString(3025),
	Drognan: getLocaleString(3023),
	Elzix: getLocaleString(3030),
	Greiz: getLocaleString(3031),
	Lysander: getLocaleString(3026),

	Ormus: getLocaleString(1011),
	Alkor: getLocaleString(1010),
	Hratli: getLocaleString(1009),
	Asheara: getLocaleString(1008),

	Jamella: getLocaleString(1016),
	Halbu: getLocaleString(1017),
	Tyrael: getLocaleString(1013),

	Malah: getLocaleString(22478),
	Anya: getLocaleString(22477),
	Larzuk: getLocaleString(22476),
	"Qual-Kehk": getLocaleString(22480),

	Cain: getLocaleString(2890)
	};

	// General functions
	this.getPotion = function (pottype, type) {
		var i,
			items = me.getItems();

		if (!items || items.length === 0) {
			return false;
		}

		// Get highest id = highest potion first
		items.sort(function (a, b) {
			return b.classid - a.classid;
		});

		for (i = 0; i < items.length; i += 1) {
			if (type < 3 && items[i].mode === 0 && items[i].location === 3 && items[i].itemType === pottype) {
				print("ÿc2Drinking potion from inventory.");

				return copyUnit(items[i]);
			}

			if (items[i].mode === 2 && items[i].itemType === pottype) {
				return copyUnit(items[i]);
			}
		}

		return false;
	};

	this.togglePause = function () {
		var script;
		
			script = getScript("tools/loxxolMap.js");

			if (script) {
				if (script.running) 
					script.pause();
				else 
					script.resume();
			}
		return true;
	};

	this.stopDefault = function () {
		var script = getScript("default.dbj");

		if (script && script.running) {
			script.stop();
		}
		return true;
	};

	this.exit = function () {
		this.stopDefault();
		quit();
	};

	this.drinkPotion = function (type) {
		var pottype, potion,
			tNow = getTickCount();

		switch (type) {
		case 0:
		case 1:
			if ((timerLastDrink[type] && (tNow - timerLastDrink[type] < 1000)) || me.getState(type === 0 ? 100 : 106)) {
				return false;
			}

			break;
		case 2:
		case 4:
			if (timerLastDrink[type] && (tNow - timerLastDrink[type] < 500)) { // small delay for juvs just to prevent using more at once
				return false;
			}

			break;
		default:
			if (timerLastDrink[type] && (tNow - timerLastDrink[type] < 8000)) {
				return false;
			}

			break;
		}

		if (me.mode === 0 || me.mode === 17 || me.mode === 18) { // mode 18 - can't drink while leaping/whirling etc.
			return false;
		}

		switch (type) {
		case 0:
		case 3:
			pottype = 76;

			break;
		case 1:
			pottype = 77;

			break;
		default:
			pottype = 78;

			break;
		}

		potion = this.getPotion(pottype, type);

		if (potion) {
			if (me.mode === 0 || me.mode === 17) {
				return false;
			}

			if (type < 3) {
				potion.interact();
			} else {
				try {
					clickItem(2, potion);
				} catch (e) {
					print("Couldn't give the potion to merc.");
				}
			}

			timerLastDrink[type] = getTickCount();

			return true;
		}

		return false;
	};

	this.getNearestMonster = function () {
		var gid, distance,
			monster = getUnit(1),
			range = 30;

		if (monster) {
			do {
				if (monster.hp > 0 && Attack.checkMonster(monster) && !monster.getParent()) {
					distance = getDistance(me, monster);

					if (distance < range) {
						range = distance;
						gid = monster.gid;
					}
				}
			} while (monster.getNext());
		}

		if (gid) {
			monster = getUnit(1, -1, -1, gid);
		} else {
			monster = false;
		}

		if (monster) {
			return " to " + monster.name;
		}

		return "";
	};

	this.getIronGolem = function () {
		var owner,
			golem = getUnit(1, 291);

		if (golem) {
			do {
				owner = golem.getParent();

				if (owner && owner.name === me.name) {
					return copyUnit(golem);
				}
			} while (golem.getNext());
		}

		return false;
	};


	// Event functions
	this.keyEvent = function (key) {
		switch (key) {
		case 189: // -
			checkbelt();
			break;
		case 45: // ins
			this.togglePause();
			break;
		case 19: // Pause/Break key
			var script;
			script = getScript("tools/loxxolMap.js");
		
			if(script && script.running){
				script.stop();
				print("tools/loxxolMap.js stopped!");
				autoparty=false;
			}
			else{
				autoparty=true;
				load("tools/loxxolMap.js");
			}
			break;
		}
	};
	this.scriptEvent = function (msg) {
		var obj;

		switch (msg) {
		case "quit":
			quitFlag = true;
			break;
		}
	}


	// Cache variables to prevent a bug where d2bs loses the reference to Config object
	//Config = Misc.copy(Config);
	// Start

	addEventListener("keyup", this.keyEvent);
	addEventListener("scriptmsg", this.scriptEvent);
	Town.initialize();
	Town.tasks = [
		{Heal: NPC.Akara, Shop: NPC.Akara, Gamble: NPC.Gheed, Repair: NPC.Charsi, Merc: NPC.Kashya, Key: NPC.Akara, CainID: NPC.Cain},
		{Heal: NPC.Fara, Shop: NPC.Drognan, Gamble: NPC.Elzix, Repair: NPC.Fara, Merc: NPC.Greiz, Key: NPC.Lysander, CainID: NPC.Cain},
		{Heal: NPC.Ormus, Shop: NPC.Ormus, Gamble: NPC.Alkor, Repair: NPC.Hratli, Merc: NPC.Asheara, Key: NPC.Hratli, CainID: NPC.Cain},
		{Heal: NPC.Jamella, Shop: NPC.Jamella, Gamble: NPC.Jamella, Repair: NPC.Halbu, Merc: NPC.Tyrael, Key: NPC.Jamella, CainID: NPC.Cain},
		{Heal: NPC.Malah, Shop: NPC.Malah, Gamble: NPC.Anya, Repair: NPC.Larzuk, Merc: NPC["Qual-Kehk"], Key: NPC.Malah, CainID: NPC.Cain}
	];
	Town.clearInventory = function(){};
	delay(200);
	//D2Bot.init();
	var script;
	script = getScript("tools/ToolsThread.js");
		
	if(script && script.running){
		script.stop();
	}
	for (i = 0; i < 5; i += 1) {
		timerLastDrink[i] = 0;
	}
	/*addEventListener("scriptmsg",
		function (msg) {
			if (msg === "townCheck") {
				if (me.area === 136) {
					print("Can't tp from uber trist.");
				} else {
					townCheck = true;
				}
			}
		});*/
	load("tools/loxxolMap.js");
	checkbelt();
	Storage.Init();
	/*Config.TownCheck = true;
	

	
	Cubing.init();*/

	// Reset core chicken
	me.chickenhp = -1;
	me.chickenmp = -1;
	Config.UseHP = 70; // ÑªÁ¿¶àÉÙ°Ù·Ö±ÈºÈºìÒ©¡£ // Drink a healing potion if life is under designated percent.
	Config.UseRejuvHP = 40;  // ÑªÁ¿¶àÉÙ°Ù·Ö±ÈºÈ×ÏÒ©¡£ // Drink a rejuvenation potion if life is under designated percent.
	Config.UseMP = 20; // Ä§·¨Öµ¶àÉÙ°Ù·Ö±ÈºÈÀ¶Ò©¡£ // Drink a mana potion if mana is under designated percent.
	Config.UseRejuvMP = 0; // Ä§·¨Öµ¶àÉÙ°Ù·Ö±ÈºÈ×ÏÒ©¡£ // Drink a rejuvenation potion if mana is under designated percent.
	Config.UseMercHP = 50; // Ó¶±øÑªÁ¿¶àÉÙ°Ù·Ö±ÈºÈºìÒ©¡£ // Give a healing potion to your merc if his/her life is under designated percent.
	Config.UseMercRejuv = 30; // Ó¶±øÑªÁ¿¶àÉÙ°Ù·Ö±ÈºÈ×ÏÒ©¡£ // Give a rejuvenation potion to your merc if his/her life is under designated percent.

	// ³Ô¼¦Éè¶¨ // Chicken settings
	Config.LifeChicken = -1; // ÑªÁ¿¶àÉÙ°Ù·Ö±ÈÍË³öÓÎÏ·¡£ // Exit game if life is less or equal to designated percent.
	Config.ManaChicken = 0; // Ä§·¨Öµ¶àÉÙ°Ù·Ö±ÈÍË³öÓÎÏ·¡£ // Exit game if mana is less or equal to designated percent.
	Config.MercChicken = 0; // Ó¶±øÑªÁ¿¶àÉÙ°Ù·Ö±ÈÍË³öÓÎÏ·¡£ // Exit game if merc's life is less or equal to designated percent.
	Config.TownHP = 15; // Go to town if life is under designated percent.
	Config.TownMP = 0; // Go to town if mana is under designated percent.
	Config.HPBuffer = 40; // Number of healing potions to keep in inventory.
	Config.MPBuffer = 40; // Number of mana potions to keep in inventory.
	Config.RejuvBuffer = 40; // Number of rejuvenation potions to keep in inventory.

	while (true) {
		if (getUIFlag(0x16) && needchangeparty){ 
			needchangeparty=false;
			autoparty=!autoparty;
			print("autoparty="+autoparty);
		}
		if(!getUIFlag(0x16))needchangeparty=true;
		if(autoparty)
			MWC_ManageParty();
		
		if(fullbelt())checkbelt();
		try {
			if (me.gameReady && !me.inTown) {
				if (Config.UseHP > 0 && me.hp < Math.floor(me.hpmax * Config.UseHP / 100)) {
					this.drinkPotion(0);
				}

				if (Config.UseRejuvHP > 0 && me.hp < Math.floor(me.hpmax * Config.UseRejuvHP / 100)) {
					this.drinkPotion(2);
				}

				if (Config.LifeChicken > 0 && me.hp <= Math.floor(me.hpmax * Config.LifeChicken / 100)) {
					D2Bot.printToConsole("MapThread Life Chicken (" + me.hp + "/" + me.hpmax + ")" + this.getNearestMonster() + " in " + Pather.getAreaName(me.area) + ". Ping: " + me.ping, 9);
					D2Bot.updateChickens();
					this.exit();

					break;
				}

				if (Config.UseMP > 0 && me.mp < Math.floor(me.mpmax * Config.UseMP / 100)) {
					this.drinkPotion(1);
				}

				if (Config.UseRejuvMP > 0 && me.mp < Math.floor(me.mpmax * Config.UseRejuvMP / 100)) {
					this.drinkPotion(2);
				}

				if (Config.ManaChicken > 0 && me.mp <= Math.floor(me.mpmax * Config.ManaChicken / 100)) {
					D2Bot.printToConsole("Mana Chicken: (" + me.mp + "/" + me.mpmax + ") in " + Pather.getAreaName(me.area), 9);
					D2Bot.updateChickens();
					this.exit();

					break;
				}

				if (Config.IronGolemChicken > 0 && me.classid === 2) {
					if (!ironGolem || copyUnit(ironGolem).x === undefined) {
						ironGolem = this.getIronGolem();
					}

					if (ironGolem) {
						if (ironGolem.hp <= Math.floor(128 * Config.IronGolemChicken / 100)) { // ironGolem.hpmax is bugged with BO
							D2Bot.printToConsole("Irom Golem Chicken in " + Pather.getAreaName(me.area), 9);
							D2Bot.updateChickens();
							this.exit();

							break;
						}
					}
				}

				if (Config.UseMerc) {
					mercHP = getMercHP();
					merc = me.getMerc();

					if (mercHP > 0 && merc && merc.mode !== 12) {
						if (mercHP < Config.MercChicken) {
							D2Bot.printToConsole("Merc Chicken in " + Pather.getAreaName(me.area), 9);
							D2Bot.updateChickens();
							this.exit();

							break;
						}

						if (mercHP < Config.UseMercHP) {
							this.drinkPotion(3);
						}

						if (mercHP < Config.UseMercRejuv) {
							this.drinkPotion(4);
						}
					}
				}
			}
		} catch (e) {
			Misc.errorReport(e, "MapThread");

			quitFlag = true;
		}

		if (quitFlag && canQuit) {
			print("ÿc8Run duration ÿc2" + ((getTickCount() - me.gamestarttime) / 1000));

			if (Config.LogExperience) {
				Experience.log();
			}

			this.exit();

			break;
		}
		if (!me.inTown && (townpotionCheck() ||
			(Config.TownHP > 0 && me.hp < Math.floor(me.hpmax * Config.TownHP / 100)) ||
			(Config.TownMP > 0 && me.mp < Math.floor(me.mpmax * Config.TownMP / 100)))) {
			this.togglePause();

			while (!me.gameReady) {
				delay(100);
			}

			try {
				//me.overhead("Going to town");
				delay(500);
				Config.HPBuffer = 0;
				Config.MPBuffer = 0;
				Town.visitTown();
			} catch (e) {
				Misc.errorReport(e, "MapThread");
				quitFlag = true;
				//Misc.errorReport(e, "TownChicken.js");
				//scriptBroadcast("quit");

				//return;
			} finally {
				this.togglePause();
				Config.HPBuffer = 40;
				Config.MPBuffer = 40;
				
				//townCheck = false;
			}
		}
		
		delay(20);
	}

	return true;
}

function checkbelt()
{
	var i;
	for(i=0;i<4;i++)
	{
		Config.BeltColumn[i] = "hp";
		Config.MinColumn[i] = 4;
	}

	var _items;
	_items = me.getItems();
	if(!_items)
		return;
	for(i = 0 ; i < _items.length ; i++)
	{		
		if(_items[i].mode == 2 && _items[i].x < 4)
		{
			switch(_items[i].itemType)
			{
			case 76:
				Config.BeltColumn[_items[i].x] = "hp";
				break;
			case 77:
				Config.BeltColumn[_items[i].x] = "mp";
				break;
			case 78:
				Config.BeltColumn[_items[i].x] = "rv";
				Config.MinColumn[_items[i].x] = 0;
				break;
			}
		}
	}
}

function fullbelt()
{
	var beltSize,col;
	var i;
	beltSize = Storage.BeltSize();
	col = Town.checkColumns(beltSize);
	for(i=0;i<4;i++){
		if(Config.BeltColumn[i]=="rv")
			col[i]=0;
	}
	if(eval(col.join('+'))===0){
		return true;
	}
	return false;
}

function townpotionCheck() {
		var i, potion, 
			check = false,
			needhp = true,
			needmp = true;

		// Can't tp from uber trist or when dead
		if (me.area === 136 || me.dead) {
			return false;
		}

		if (!me.inTown) {
			try {
				if (me.gold > 3000 && me.getItem(518) && me.getStat(12)>=40) {
					for (i = 0; i < 4; i += 1) {
						if (Config.BeltColumn[i] === "hp" && Config.MinColumn[i] > 0) {
							potion = me.getItem(-1, 2); // belt item

							if (potion) {
								do {
									if (potion.code.indexOf("hp") > -1) {
										needhp = false;

										break;
									}
								} while (potion.getNext());
							}

							if (needhp) {
								me.overhead("We need healing potions");

								check = true;
							}
						}

						if (Config.BeltColumn[i] === "mp" && Config.MinColumn[i] > 0) {
							potion = me.getItem(-1, 2); // belt item

							if (potion) {
								do {
									if (potion.code.indexOf("mp") > -1) {
										needmp = false;

										break;
									}
								} while (potion.getNext());
							}

							if (needmp) {
								me.overhead("We need mana potions");

								check = true;
							}
						}
					}
				}

				if (Config.OpenChests && Town.needKeys()) {
					check = true;
				}
			} catch (e) {
				check = false;
			}
		}
		delay(500);
		return check;
}


function MWC_ManageParty()
{
	var _player, _myPartyId, _existingPartyId;
	
	_player = getParty();

	if(_player)
	{
		_myPartyId = _player.partyid;
		
		while(_player.getNext())
		{
			_existingPartyId = MWC_GetExistingParty();
			
			if(_player.partyflag == 2 && (_existingPartyId == _player.partyid || _existingPartyId == 65535) || _player.partyflag == 0 && (_existingPartyId == 65535 || _existingPartyId == _myPartyId))
			{
				clickParty(_player, 2);
				Config.PublicMode=1;
				delay(800);
			}
		}
	
		return true;
	}
	
	return false;
}

function MWC_GetExistingParty()
{
	var _player;
	
	_player = getParty();

	if(_player)
	{
		while(_player.getNext())
		{
			if(_player.partyid != 65535)
				return _player.partyid;
		}
	}

	return 65535;
}
