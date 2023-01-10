/**
*	@filename	Pass.js
*	@author		kolton
*	@desc		Pass Act 1 - 5
*/

function Pass() {
	this.changeAct = function (act) {
		print("change Act " + act);
		var npc, time, tpTome,
			preArea = me.area;
		if (me.act === act) {
			return true;
		}
		try {
			switch (act) {
			case 2:
				if (me.act >= 2) {
					break;
				}
				Town.move("warriv");
				npc = getUnit(1, "warriv");
				if (!npc || !npc.openMenu()) {
					return false;
				}
				Misc.useMenu(0x0D36);
				break;
			case 3:
				if (me.act >= 3) {
					break;
				}
				Town.move("palace");
				npc = getUnit(1, "jerhyn");
				if (!npc || !npc.openMenu()) {
					Pather.moveTo(5166, 5206);
					return false;
				}
				me.cancel();
				tpTome = me.findItem("tbk", 0, 3);
				if (tpTome && tpTome.getStat(70) > 0 ) {
					try{
						Pather.moveToExit(50, true);
						if(!Pather.usePortal(40, null)){
							if(!me.inTown){
								Town.goToTown();
							}
						}
					}catch(e){
						print(e);
					}finally{
						if(!me.inTown){
							Town.goToTown();
						}
					}
				}
				Town.move("meshif");
				npc = getUnit(1, "meshif");
				if (!npc || !npc.openMenu()) {
					return false;
				}
				Misc.useMenu(0x0D38);
				break;
			case 4:
				if (me.act >= 4) {
					break;
				}
				this.mephisto();
				break;
			case 5:
				if (me.act >= 5) {
					break;
				}
				Town.move("tyrael");
				npc = getUnit(1, "tyrael");
				if (!npc || !npc.openMenu()) {
					return false;
				}
				delay(me.ping + 1);
				if (getUnit(2, 566)) {
					me.cancel();
					Pather.useUnit(2, 566, 109);
				} else {
					Misc.useMenu(0x58D2);
				}
				break;
			}
			delay(1000 + me.ping * 2);
			while (!me.area) {
				delay(500);
			}
			if (me.area === preArea) {
				me.cancel();
				Town.move("portalspot");
				print("Act change failed.");
				return false;
			}
		} catch (e) {
			return false;
		}
		
		return true;
	};
	
	this.getQuestItem = function (classid, chestid) { // Accepts classid only or a classid/chestid combination.
		var i, chest, item,
			tick = getTickCount();

		if (me.findItem(classid)) { // Don't open "chest" or try picking up item if we already have it.
			return true;
		}

		if (me.inTown) {
			return false;
		}

		if (arguments.length > 1) {
			chest = getUnit(2, chestid);

			if (chest) {
				Misc.openChest(chest);
			}
		}

		for (i = 0 ; i < 50 ; i += 1) { // Give the quest item plenty of time (up to two seconds) to drop because if it's not detected the function will end.
			item = getUnit(4, classid);

			if (item) {
				break;
			}

			delay(40);
		}

		while (!me.findItem(classid)) { // Try more than once in case someone beats me to it.
			item = getUnit(4, classid);

			if (item) {
				if (Storage.Inventory.CanFit(item)) {
					Pickit.pickItem(item);

					delay(me.ping * 2 + 500);
				} else {
					if (Pickit.canMakeRoom()) {
						print("ÿc7Trying to make room for " + Pickit.itemColor(item) + item.name);

						Town.visitTown(); // Go to Town and do chores. Will throw an error if it fails to return from Town.
					} else {
						print("ÿc7Not enough room for " + Pickit.itemColor(item) + item.name);

						return false;
					}
				}
			} else {
				return false;
			}
		}

		return true;
	};
	
	this.placeStaff = function () {
		print("place staff");
		var staff, item, orifice,
			tick = getTickCount(),
			preArea = me.area;
		Town.goToTown();
		Town.move("stash");
		this.toInventory();
		Town.move("portalspot");
		if (!Pather.usePortal(preArea, me.name)) {
			throw new Error("placeStaff: Failed to take TP");
		}
		delay(1000);
		orifice = getUnit(2, 152);
		if (!orifice) {
			return false;
		}
		Misc.openChest(orifice);
		staff = me.getItem("hst");
		if (!staff) {
			if (getTickCount() - tick < 500) {
				delay(500);
			}
			return false;
		}
		staff.toCursor();
		submitItem();
		delay(750 + me.ping);

		return true;
	};
	
	this.toInventory = function () {
		print("toInventory");
		var i,
		items = [],
		item = me.getItem(-1, 0);
		if (!Town.openStash()) {
			Town.openStash();
		}
		if (item) {
			do {
				if (item.code === "hst" || item.code === "qf2" || item.code === "qey" || item.code === "qhr") {
					items.push(copyUnit(item));
				}
			} while (item.getNext());
		}
		for (i = 0; i < items.length; i += 1) {
			if ( Storage.Inventory.CanFit(items[i])) {
				Storage.Inventory.MoveTo(items[i]);
			}
		}
		delay(1000);
		me.cancel();

		return true;
	};

	this.cubeStaff = function () {
		print("cubing staff");
		var amulet = me.getItem("vip"),
			staff = me.getItem("msf");
		if (!staff || !amulet) {
			return false;
		}
		Town.move("stash");
		if (!Town.openStash()) {
			Town.openStash();
		}
		Storage.Cube.MoveTo(amulet);
		Storage.Cube.MoveTo(staff);
		Cubing.openCube();
		transmute();
		delay(750 + me.ping);
		Cubing.emptyCube();
		me.cancel();

		return true;
	};
	
	this.presetUnit = function () {
		var i, n;
		for (i = 700; i < 1000; i+= 1) {
			n = getPresetUnit(me.area, 1, i);
			if (n) {
				return i;
			}
		}
		
		return false;
	};
	
	//QUESTS
	this.den = function () {
		var i, akara;
		print("den");
		if (!me.getQuest(1, 1)) { // Haven't cleared the Den yet.
			if (!Town.goToTown(1) || !Pather.moveToExit([2, 8], true)) {
				throw new Error();
			}
			Precast.doPrecast(true);
			Attack.clearLevel();
			Town.goToTown();
			Town.move("akara");
			akara = getUnit(1, "akara");
			akara.openMenu();
			me.cancel();
		}

		return true;
	};
		
	this.cain = function () { // Dark-f: rewrite rescue cain
		var i, j, akara, cain, slave, scroll1, scroll2, stoneA, stoneB, stoneC, stoneD, stoneE;		
		print("cain");
		Town.doChores();
		if (!me.getQuest(4, 1)) { // not rescues Cain
			if (!me.getQuest(4, 4) && !me.getQuest(4, 3) ) {//4,4redportal already open ; 4,3 holding scroll
				if(!me.getItem("bks")) { 	// Scroll of Inifuss	
					Pather.useWaypoint(5); //dark wood
					Precast.doPrecast(true);
					Pather.moveToPreset(me.area, 1, this.presetUnit(), 0, 0, false, true); //move to tree				
					//Attack.clear(40); // treehead
					this.getQuestItem("bks", 30);
					Town.goToTown();
				}
				Town.move("akara");
				akara = getUnit(1, "akara");
				if (akara && akara.openMenu()) {
					me.cancel();
				}
			}
			Pather.useWaypoint(4); //stoney field
			Precast.doPrecast(true);
			Pather.moveToPreset(me.area, 1, this.presetUnit(), 0, 0, false, true);
			try{
				Attack.clear(15, 0, getLocaleString(2872));// Rakanishu
			} catch (e) {
				Attack.clear(20);
			}
			Attack.clear(20);
			if (!me.getQuest(4, 4) ) {		 //redportal already open
				stoneA = getUnit(2, 17);
				stoneB = getUnit(2, 18);
				stoneC = getUnit(2, 19);
				stoneD = getUnit(2, 20);
				stoneE = getUnit(2, 21);
				for (i = 0; i < 5; i += 1) {
					Misc.openChest(stoneA);
					Misc.openChest(stoneB);
					Misc.openChest(stoneC);
					Misc.openChest(stoneD);
					Misc.openChest(stoneE);
				}
			}
			if (me.diff !== 2) {//菊花服务器 dy不救老头先
				for (i = 0; i < 5; i += 1) {
					if (Pather.usePortal(38)) {
						break;
					}
					delay(1000);
				}
				slave = getUnit(2, 26);
				if (!slave) {
					return false;
				}
				for (i = 0; i < 5; i += 1) {
					if (getDistance(me, slave) > 3) {
						Pather.moveToUnit(slave);
					}
				}
				Misc.openChest(slave);
				if(!Pather.usePortal(null, null)){
					Town.goToTown();
				}
				delay(3000);
			}
		}
		if (me.diff !== 2) {//菊花服务器 dy不救老头先
			Town.move("akara");
			akara = getUnit(1, "akara");
			if (akara && akara.openMenu()) {
				me.cancel();
			}
			Town.move("cain");
			cain = getUnit(1, NPC.Cain);
			if (cain && cain.openMenu()) {
				me.cancel();
			}
		}

		return true;
	};

	this.andy = function () {
		print("killing andy");
		Town.doChores();
		if (me.getQuest(6, 0) && !me.getQuest(7, 0)) {
			this.changeAct(2);
			return true;
		}
		if (!me.getQuest(6, 1)) {
			if(!me.inTown){
				Town.goToTown();
			}
			Pather.useWaypoint(35);
			Precast.doPrecast(true);
			if (!Pather.moveToExit([36, 37], true)) {
				throw new Error("Failed to move to Catacombs Level 4");
			}
			Pather.moveTo(22549, 9520);
			Attack.kill(156); // Andariel
			delay(2000); // Wait for minions to die.
			Town.goToTown();
		}
		delay(2000);
		this.changeAct(2);

		return true;
	};

	this.amulet = function () {
		var i, drognan;
		print("getting amulet");
		Town.doChores();
		Pather.useWaypoint(44, true);
		Precast.doPrecast(true);
		if (!Pather.moveToExit([45, 58, 61], true)) {
			throw new Error("Failed to move to Viper Temple Level 2");
		}
		this.getQuestItem("vip", 149);
		delay(500);
		Town.goToTown();
		if (me.getItem("vip")) {
			Town.move("stash");
			delay(me.ping);
			Town.openStash();
			Storage.Stash.MoveTo(me.getItem("vip"));
		}
		Town.move("drognan");
		while (!drognan || !drognan.openMenu()) { // Try more than once to interact with Drognan.
			Packet.flash(me.gid);
			Town.move("drognan");
			drognan = getUnit(1, "drognan");
			delay(1000);
		}
		me.cancel();

		return true;
	};

	this.staff = function () { // Only the Teleporting Sorc does this. She will be at least level 18 as required by MAIN to reach this stage.
		print("getting staff");
		Town.doChores();
		Pather.useWaypoint(43, true);
		Precast.doPrecast(true);
		if (!Pather.moveToExit([62, 63, 64], true)) {
			throw new Error("Failed to move to Maggot Lair Level 3");
		}
		var presetUnit = getPresetUnit(64, 2, 356);
		if (!presetUnit) {
			return false;
		}
		Pather.moveTo(presetUnit.roomx * 5 + presetUnit.x, presetUnit.roomy * 5 + presetUnit.y, 15, false);
		this.getQuestItem("msf", 356);
		Town.goToTown();
		if (me.getItem("msf")) {
			Town.move("stash");
			delay(me.ping);
			Town.openStash();
			Storage.Stash.MoveTo(me.getItem("msf"));
		}

		return true;
	};

	this.summoner = function () { // Teleporting Sorc will be at least level 18 as required by MAIN to reach this stage.
		var i, journal;
		print("killing summoner");
		Town.doChores();
		Pather.useWaypoint(74, true);
		Precast.doPrecast(true);
		journal = getPresetUnit(74, 2, 357);
		if (!journal) {
			throw new Error("AutoSmurf.summoner: No preset unit in Arcane Sanctuary.");
		}
		while (getDistance(me.x, me.y, journal.roomx * 5 + journal.x - 3, journal.roomy * 5 + journal.y - 3) > 10) {
			try {
				Pather.moveToPreset(74, 2, 357, -3, -3, false, false);
			} catch (e) {
				print("Caught Error.");

				print(e);
			}
		}
		try {
			Attack.kill(250);
		} catch (e) {
			Attack.clear(20);
		}
		Pickit.pickItems();
		Pather.moveToPreset(74, 2, 357, -3, -3, Config.ClearType);
		journal = getUnit(2, 357);
		for (i = 0; i < 5; i += 1) {
			if (journal) {
				sendPacket(1, 0x13, 4, journal.type, 4, journal.gid);
				delay(1000);
				me.cancel();
			}
			if (Pather.getPortal(46)) {
				break;
			}
		}
		if (i === 5) {
			throw new Error("summoner failed");
		}
		Pather.usePortal(46);

		return true;
	};

	this.radament = function () {
		var i, radament, book, atma;
		print("radament");
		Town.doChores();
		if (!me.getQuest(9, 1)) {
			Pather.useWaypoint(48, true);
			Precast.doPrecast(true);
			if (!Pather.moveToExit(49, true)) {
				throw new Error("Failed to move to Sewers Level 3");
			}
			for (i = 0 ; i < 5 ; i += 1) {
				radament = getPresetUnit(49, 2, 355); // Chest by Radament.
				if (radament) {
					break;
				}
				delay(me.ping * 2 + 250);
			}
			while (getDistance(me.x, me.y, radament.roomx * 5 + radament.x, radament.roomy * 5 + radament.y) > 10) {
				try {
					Pather.moveToPreset(49, 2, 355, 0, 0, false, false);
				} catch (e) {
					print("Caught Error.");
					print(e);
				}
			}
			radament = getUnit(1, 229); // Radament.
			Pather.moveToUnit(radament, 0, 0, false);
			try {
				Attack.kill(229); // Radament
			} catch (e) {
				print("Caught Error.");
				print(e);
				Attack.clear(30);
			}
			this.getQuestItem("ass");
			book = me.findItem("ass");
			if (book) {
				clickItem(1, book);
			}
			Town.goToTown();
		}
		Town.move("atma");
		atma = getUnit(1, "atma");
		atma.openMenu();
		me.cancel();

		return true;
	};

	this.duriel = function () {
		var i, cain, orifice, hole, npc;
		print("killing duriel");
		Town.doChores();
		if (!me.getQuest(14, 1) && !me.getQuest(14, 3) && !me.getQuest(14, 4)) {
			if(!me.inTown){
				Town.goToTown();
			}
			Pather.useWaypoint(46, true);
			Precast.doPrecast(true);
			if (!Pather.moveToExit(getRoom().correcttomb, true)) {
				throw new Error("Failed to move to Tal Rasha's Tomb");
			}
			if (!Pather.moveToPreset(me.area, 2, 152, -11, 3)) {
				throw new Error("Failed to move to Orifice");
			}
			if (!me.getQuest(10, 0)) { //horadric staff
				this.placeStaff();
			}
			for (i = 0 ; i < 30 ; i += 1) {
				delay(1000);
				hole = getUnit(2, 100);
				delay(1000);
				Attack.clear(20);
				if (hole) {
					Precast.doPrecast(true);
					Pather.useUnit(2, 100, 73);
					break;
				}
			}
			try {
				Attack.kill(211);
			} catch(e) {
				print(e);
				Attack.clearLevel();
			}
			Pickit.pickItems();
			Pather.moveTo(22579, 15706);
			Pather.moveTo(22577, 15649, 10);
			Pather.moveTo(22577, 15609, 10);
			npc = getUnit(1, "tyrael");
			if (!npc) {
				return false;
			}
			for (i = 0; i < 3; i += 1) {
				if (getDistance(me, npc) > 3) {
					Pather.moveToUnit(npc);
				}
				npc.interact();
				delay(1000 + me.ping);
				me.cancel();
				if (Pather.getPortal(null)) {
					me.cancel();
					break;
				}
			}
			Town.goToTown();
		}
		this.changeAct(3);

		return true;
	};

	this.lamEsen = function () { // Teleporting Sorc walks over to Alkor and completes the quest for everyone via exploit.
		var i, alkor, target;
		print("Lam Essen's Tome");
		Town.goToTown(3);
		Town.doChores();
		if (!Town.goToTown() || !Pather.useWaypoint(80, true)) {
			throw new Error("Lam Essen quest failed");
		}
		Precast.doPrecast(true);
		if (!Pather.moveToExit(94, true) || !Pather.moveToPreset(me.area, 2, 193)) {
			throw new Error("Lam Essen quest failed");
		}
		target = getUnit(2, 193);
		Misc.openChest(target);
		delay(300);
		target = getUnit(4, "bbb");
		Pickit.pickItem(target);
		Town.goToTown();
		Town.move("alkor");
		target = getUnit(1, "alkor");
		if (target && target.openMenu()) {
			me.cancel();
		}

		return true;
	};

	this.mephisto = function () {
		var cain;
		print("mephisto");
		Town.doChores();
		Pather.useWaypoint(101,true);
		Precast.doPrecast(true);
		if (!Pather.moveToExit(102, true)) {
			throw new Error("Failed to move to Durance Level 3");
		}
		Pather.moveTo(17566, 8069);
		Attack.kill(242); // Mephisto
		Pickit.pickItems();
		Pather.moveTo(17590, 8068);
		delay(1500);
		Pather.moveTo(17601, 8070);
		Pather.usePortal(null);
		
		return true;
	};

	this.izual = function () {
		var tyrael;
		print("izual");
		Town.doChores();
		if (!me.getQuest(25, 1)) {
			Town.doChores();
			Pather.useWaypoint(106);
			Precast.doPrecast(true);
			if (!Pather.moveToPreset(105, 1, 256)) {
				throw new Error("Failed to move to Izual.");
			}
			Attack.kill(256); // Izual
			Pickit.pickItems();
			Town.goToTown();
		}
		Town.move("tyrael");
		tyrael = getUnit(1, "tyrael");
		tyrael.openMenu();
		me.cancel();

		return true;
	};

	this.diablo = function () {
		this.getLayout = function (seal, value) {
			var sealPreset = getPresetUnit(108, 2, seal);
			if (!seal) {
				throw new Error("Seal preset not found");
			}
			if (sealPreset.roomy * 5 + sealPreset.y === value || sealPreset.roomx * 5 + sealPreset.x === value) {
				return 1;
			}
			return 2;
		};
		this.initLayout = function () {
			this.vizLayout = this.getLayout(396, 5275);
			this.seisLayout = this.getLayout(394, 7773);
			this.infLayout = this.getLayout(392, 7893);
		};
		var immuneBossFound = false;
		this.getBoss = function (name) {
			var i, boss,
				glow = getUnit(2, 131);
			for (i = 0; i < 24; i += 1) {
				boss = getUnit(1, name);
				if (boss) {
					this.chaosPreattack(name, 8);
					try {
						Attack.kill(name);
					} catch (e) {
						Attack.clear(10, 0, name);
					}
					Pickit.pickItems();
					return true;
				}
				delay(250);
			}
			return !!glow;
		};
		this.chaosPreattack = function (name, amount) {
			var i, n, target, positions;
			switch (me.classid) {
			case 0:
				break;
			case 1:
				break;
			case 2:
				break;
			case 3:
				target = getUnit(1, name);
				if (!target) {
					return;
				}
				positions = [[6, 11], [0, 8], [8, -1], [-9, 2], [0, -11], [8, -8]];
				for (i = 0; i < positions.length; i += 1) {
					if (Attack.validSpot(target.x + positions[i][0], target.y + positions[i][1])) { // check if we can move there
						Pather.moveTo(target.x + positions[i][0], target.y + positions[i][1]);
						Skill.setSkill(Config.AttackSkill[2], 0);
						for (n = 0; n < amount; n += 1) {
							Skill.cast(Config.AttackSkill[1], 1);
						}
						break;
					}
				}
				break;
			case 4:
				break;
			case 5:
				break;
			case 6:
				break;
			}
		};
		this.diabloPrep = function () {
			var trapCheck,
				tick = getTickCount();
			while (getTickCount() - tick < 17500) {
				if (getTickCount() - tick >= 8000) {
					switch (me.classid) {
					case 1: // Sorceress
						if ([56, 59, 64].indexOf(Config.AttackSkill[1]) > -1) {
							if (me.getState(121)) {
								delay(500);
							} else {
								Skill.cast(Config.AttackSkill[1], 0, 7793, 5293);
							}
							break;
						}
						delay(500);
						break;
					case 3: // Paladin
						Skill.setSkill(Config.AttackSkill[2]);
						Skill.cast(Config.AttackSkill[1], 1);
						break;
					case 5: // Druid
						if (Config.AttackSkill[1] === 245) {
							Skill.cast(Config.AttackSkill[1], 0, 7793, 5293);
							break;
						}
						delay(500);
						break;
					case 6: // Assassin
						if (Config.UseTraps) {
							trapCheck = ClassAttack.checkTraps({x: 7793, y: 5293});
							if (trapCheck) {
								ClassAttack.placeTraps({x: 7793, y: 5293, classid: 243}, trapCheck);
								break;
							}
						}
						delay(500);
						break;
					default:
						delay(500);
					}
				} else {
					delay(500);
				}
				if (getUnit(1, 243)) {
					return true;
				}
			}
			throw new Error("Diablo not found");
		};
		this.openSeal = function (classid) {
			var i, j, seal;
			for (i = 0; i < 5; i += 1) {
				Pather.moveToPreset(108, 2, classid, classid === 394 ? 5 : 2, classid === 394 ? 5 : 0);
				if (i > 1) {
					Attack.clear(10);
				}
				for (j = 0; j < 3; j += 1) {
					seal = getUnit(2, classid);
					if (seal) {
						break;
					}
					delay(100);
				}
				if (!seal) {
					throw new Error("Seal not found (id " + classid + ")");
				}
				if (seal.mode) {
					return true;
				}
				seal.interact();
				delay(classid === 394 ? 1000 : 500);
				if (!seal.mode) {
					if (classid === 394 && Attack.validSpot(seal.x + 15, seal.y)) { // de seis optimization
						Pather.moveTo(seal.x + 15, seal.y);
					} else {
						Pather.moveTo(seal.x - 5, seal.y - 5);
					}
					delay(500);
				} else {
					return true;
				}
			}
			throw new Error("Failed to open seal (id " + classid + ")");
		};
		//开始
		delay(2000);
		Town.doChores();
		Pather.useWaypoint(107);
		Precast.doPrecast(true);
		this.initLayout();
		this.openSeal(395);
		this.openSeal(396);
		if (this.vizLayout === 1) {
			Pather.moveTo(7691, 5292);
		} else {
			Pather.moveTo(7695, 5316);
		}
		if (!this.getBoss(getLocaleString(2851))) {
			throw new Error("Failed to kill Vizier");
		}
		this.openSeal(394);
		if (this.seisLayout === 1) {
			Pather.moveTo(7771, 5196);
		} else {
			Pather.moveTo(7798, 5186);
		}
		if (!this.getBoss(getLocaleString(2852))) {
			throw new Error("Failed to kill de Seis");
		}
		this.openSeal(392);
		this.openSeal(393);

		if (this.infLayout === 1) {
			delay(10);
		} else {
			Pather.moveTo(7928, 5295); // temp
		}
		if (!this.getBoss(getLocaleString(2853))) {
			throw new Error("Failed to kill Infector");
		}
		Pather.moveTo(7792, 5294);
		this.diabloPrep();
		Attack.kill(243); // Diablo
		Pickit.pickItems();
		
		return true;
	};

	this.shenk = function () {
		Pather.useWaypoint(111, true);
		Precast.doPrecast(true);
		Pather.moveTo(3883, 5113);
		Attack.kill(getLocaleString(22435)); // Shenk the Overseer
		Town.goToTown();

		return true;
	};

	this.anya = function () { // Dark-f: Rewrite this.
		print("anya");
		Pather.useWaypoint(113, true);
		Precast.doPrecast(true);
		if (!Pather.moveToExit(114, true) || !Pather.moveToPreset(me.area, 2, 460)) {
			throw new Error();
		}
		delay(1000);
		var anya = getUnit(2, 558);
		Pather.moveToUnit(anya);
		sendPacket(1, 0x13, 4, 0x2, 4, anya.gid);
		delay(300);
		me.cancel();
		Town.goToTown();
		Town.move("malah");
		var malah = getUnit(1, "malah");
		malah.openMenu();
		me.cancel();
		Town.move("portalspot");
		Pather.usePortal(114, me.name);
		anya.interact();
		delay(300);
		me.cancel();
		Town.goToTown();
		Town.move("malah");
		malah.openMenu();
		me.cancel();
		delay(500);
		scroll = me.getItem("tr2");
		if (scroll) {
			clickItem(1, scroll);
		}
		anya = getUnit(1, "anya");
		Town.move("anya");
		if(!anya){
			for (waitAnya=0 ; waitAnya<30 ; waitAnya+=1){
				delay(1000);
				anya = getUnit(1, "anya");
				if(anya){
					break;
				}
			}
		}
		if(anya){
			Town.move("anya");
			anya.openMenu();
			me.cancel();
		}

		return true;
	};
	
	
	//////////////////////////////////////start/////////////////////////////////////////////////
	Config.MaxGameTime = 1200;
	Town.doChores();
	
	if (!me.getQuest(7, 0)) { // Andariel is not done.
        Town.goToTown(1);
        //den
        if (!me.getQuest(1, 0)) {
            this.den();
        }
		if (!me.getQuest(4, 0)) {
			this.cain();
		}
		//andy
		if (!me.getQuest(7, 0)) {
			this.andy();
		}
	}
	
	//act2
	if (!me.getQuest(15, 0) && me.getQuest(7, 0)) { // Duriel is not done and Andariel is.
		Town.goToTown(2);
		if (!me.getQuest(9, 0)) { // Haven't finished Radament's Lair.
			this.radament();
		}
		if ((!me.getItem("vip") && !me.getItem("hst") && !me.getQuest(10, 0)) || !me.getQuest(11, 0)) { // No Amulet of the Viper/Horadric Staff and Horadric Staff quest (staff placed in orifice) is incomplete or The Tainted Sun quest is incomplete.
			this.amulet();
		}
		if (!me.getItem("msf") && !me.getItem("hst") && !me.getQuest(10, 0)) { // No Staff of Kings nor Horadric Staff and Horadric Staff quest (staff placed in orifice) not complete.
			this.staff();
		}
		if (me.getItem("msf") && me.getItem("vip") && me.getItem("box")) { // Have The Staff of Kings, The Viper Amulet, and The Horadric Cube.
			this.cubeStaff();
		}
		if (!me.getQuest(13, 0) && me.getQuest(11 , 0) || !Pather.useWaypoint(46, true)) { // Summoner quest incomplete but The Tainted Sun is complete.
			this.summoner();
		}
		if (!me.getQuest(14, 0)) { // Haven't completed Duriel and team has reached level goal or this isn't normal difficulty.
			this.duriel();
		}
	}
	
	//act3
	if (!me.getQuest(23, 0) && me.getQuest(15, 0)) { // "Able to go to Act IV" (AKA haven't gone thru red portal to Act 4) is not done and Duriel is.
		Town.goToTown(3);
		if (!me.getQuest(17, 0)) { // Haven't completed Lam Esen's Tome.
			this.lamEsen();
		}
		if (!me.getQuest(23, 0)) {
			this.mephisto();
		}
	}
	
	//act4
	if (me.getQuest(23, 0) && !me.getQuest(28, 0)) {
		Town.goToTown(4);
		if (!me.getQuest(25, 0) || me.getQuest(25, 1)) { // The Fallen Angel is not done or it has been started.
			this.izual();
		}
		if (!me.getQuest(28, 0)) {
			if (!this.changeAct(5)) {
				this.diablo();
			}	
		}
	}
	
	//act5
	if (me.getQuest(28, 0)) {
		Town.goToTown(5);
		if (!me.getQuest(35, 1) && !me.getQuest(35, 0)) {
			this.shenk();
		}
		if (!me.getQuest(37, 0) && !me.getQuest(37, 1)) {
			this.anya();
		} else if (me.getQuest(37, 1)) {
			Town.goToTown(5);
			var anya = getUnit(1, "anya");
			Town.move("anya");
			if(!anya){
				for (var waitAnya=0 ; waitAnya<30 ; waitAnya+=1){
					delay(1000);
					anya = getUnit(1, "anya");
					if(anya){
						break;
					}
				}
			}
			if(anya){
				Town.move("anya");
				anya.openMenu();
				me.cancel();
			}
		}
	}
	
	if (me.getQuest(7, 0) && me.getQuest(15, 0) && me.getQuest(23, 0) && me.getQuest(28, 0) && me.getQuest(1, 0) && (me.getQuest(4, 0) || me.getQuest(4, 4)) && me.getQuest(9, 0) && me.getQuest(17, 0) && me.getQuest(25, 0) && (me.getQuest(35, 0) || me.getQuest(35, 1)) && me.getQuest(37, 0)) {
		D2Bot.printToConsole("All quests done. Stopping profile.");
		D2Bot.stop();
	} else {
		if (!me.getQuest(1, 0)) {
            this.den();
        }
		if (!me.getQuest(4, 0)) {
			this.cain();
		}
		if (!me.getQuest(9, 0)) { // Haven't finished Radament's Lair.
			this.radament();
		}
		if (!me.getQuest(17, 0)) { // Haven't completed Lam Esen's Tome.
			this.lamEsen();
		}
		if (!me.getQuest(25, 0) || me.getQuest(25, 1)) { // The Fallen Angel is not done or it has been started.
			this.izual();
		}
	}
	
	return true;
}