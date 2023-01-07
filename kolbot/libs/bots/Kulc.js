/**
*	@filename	Kulc.js
*	@author		kolton
*	@desc		Kulc
*/

function Kulc() {
	this.doneAreas = [];
	
	// Check if we have complete sets of organs
	this.completeSetCheck = function () {
		var horns = me.findItems("dhn"),
			brains = me.findItems("mbr"),
			eyes = me.findItems("bey");

		if (!horns || !brains || !eyes) {
			return false;
		}

		// We just need one set to make a torch
		if (Config.OrgTorch.MakeTorch) {
			return horns.length && brains.length && eyes.length;
		}

		return horns.length === brains.length && horns.length === eyes.length && brains.length === eyes.length;
	};
	
	// Open a red portal. Mode 0 = mini ubers, mode 1 = Tristram
	this.openPortal = function (mode) {
		var portal,
			item1 = mode === 0 ? me.findItem("pk1", 0) : me.findItem("dhn", 0),
			item2 = mode === 0 ? me.findItem("pk2", 0) : me.findItem("bey", 0),
			item3 = mode === 0 ?  me.findItem("pk3", 0) : me.findItem("mbr", 0);

		Town.goToTown(5);
		Town.doChores();

		if (Town.openStash() && Cubing.emptyCube()) {
			if (!Storage.Cube.MoveTo(item1) || !Storage.Cube.MoveTo(item2) || !Storage.Cube.MoveTo(item3)) {
				return false;
			}

			if (!Cubing.openCube()) {
				return false;
			}

			transmute();
			delay(1000);

			portal = getUnit(2, "portal");

			if (portal) {
				do {
					switch (mode) {
					case 0:
						if ([133, 134, 135].indexOf(portal.objtype) > -1 && this.doneAreas.indexOf(portal.objtype) === -1) {
							this.doneAreas.push(portal.objtype);

							return copyUnit(portal);
						}

						break;
					case 1:
						if (portal.objtype === 136) {
							return copyUnit(portal);
						}

						break;
					}
				} while (portal.getNext());
			}
		}

		return false;
	};
	
	this.findLevel = function (unit) {
		var room, result, rooms, myRoom;

		function RoomSort(a, b) {
			return getDistance(myRoom[0], myRoom[1], a[0], a[1]) - getDistance(myRoom[0], myRoom[1], b[0], b[1]);
		}
		room = getRoom();
		if (!room) {
			return false;
		}
		rooms = [];
		do {
			rooms.push([room.x * 5 + room.xsize / 2, room.y * 5 + room.ysize / 2]);
		} while (room.getNext());
		while (rooms.length > 0) {
			// get the first room + initialize myRoom var
			if (!myRoom) {
				room = getRoom(me.x, me.y);
			}
			if (room) {
				if (room instanceof Array) { // use previous room to calculate distance
					myRoom = [room[0], room[1]];
				} else { // create a new room to calculate distance (first room, done only once)
					myRoom = [room.x * 5 + room.xsize / 2, room.y * 5 + room.ysize / 2];
				}
			}
			rooms.sort(RoomSort);
			room = rooms.shift();
			result = Pather.getNearestWalkable(room[0], room[1], 18, 3);
			if (result) {
				Pather.moveTo(result[0], result[1], 3);
				if (getUnit(1, unit)) {
					var boss = getUnit(1, unit);
					Pather.moveTo(boss.x, boss.y, 3);
					return true;
				}
			}
		}

		return true;
	};
	
	this.lure = function (bossId) {
		var i = 0,
			unit = getUnit(1, bossId),
			unitx = unit.x,
			unity = unit.y;
		if (unit.y >= 5128 && i <= 50) {
			while (unit.y >= 5088) {
				Pather.moveTo(Math.round(unit.x + (Math.random() * 5) * Math.pow(-1,i)), Math.round(unit.y - 30));
				Skill.setSkill(123, 0);
				delay(500);
				i = i+1;
			}
		} else if (unit.y < 5128 && i <= 50) {
			while (unit.y <= 5168) {
				Pather.moveTo(Math.round(unit.x + (Math.random() * 5) * Math.pow(-1,i)), Math.round(unit.y + 30));
				Skill.setSkill(123, 0);
				delay(500);
				i = i+1;
			}
		}
			
		return true;
	};
	
	this.pandemoniumRun = function () {
		var i, findLoc, skillBackup;

		switch (me.area) {
		case 133: // Matron's Den
		    Precast.doPrecast(true);
			this.findLevel(707);
			Attack.kill(707);
			Pickit.pickItems();
			Town.goToTown();

			break;
		case 134: // Forgotten Sands
			Precast.doPrecast(true);
			this.findLevel(708);
			Attack.kill(708);
			Pickit.pickItems();
			Town.goToTown();

			break;
		case 135: // Furnace of Pain
		    Precast.doPrecast(true);
			findLoc = [20140, 14550, 20180, 14550, 20220, 14550, 20260, 14550, 20300, 14550, 20340, 14550, 20380, 14550, 20420, 14550, 20460, 14550, 20500, 14550, 20500, 14590, 20460, 14590, 20420, 14590, 20380, 14590, 20340, 14590, 20300, 14590, 20260, 14590, 20220, 14590, 20180, 14590, 20140, 14590, 20140, 14630, 20180, 14630, 20220, 14630, 20260, 14630, 20300, 14630, 20340, 14630, 20380, 14630, 20420, 14630, 20460, 14630, 20500, 14630, 20500, 14670, 20460, 14670, 20420, 14670, 20380, 14670, 20340, 14670, 20300, 14670, 20260, 14670, 20220, 14670, 20180, 14670, 20140, 14670, 20140, 14710, 20180, 14710, 20220, 14710, 20260, 14710, 20300, 14710, 20340, 14710, 20380, 14710, 20420, 14710, 20460, 14710, 20500, 14710, 20500, 14750, 20460, 14750, 20420, 14750, 20380, 14750, 20340, 14750, 20300, 14750, 20260, 14750, 20220, 14750, 20180, 14750, 20140, 14750, 20140, 14790, 20180, 14790, 20220, 14790, 20260, 14790, 20300, 14790, 20340, 14790, 20380, 14790, 20420, 14790, 20460, 14790, 20500, 14790, 20500, 14830, 20460, 14830, 20420, 14830, 20380, 14830, 20340, 14830, 20300, 14830, 20260, 14830, 20220, 14830, 20180, 14830, 20140, 14830, 20140, 14870, 20180, 14870, 20220, 14870, 20260, 14870, 20300, 14870, 20340, 14870, 20380, 14870, 20420, 14870, 20460, 14870, 20500, 14870, 20500, 14910, 20460, 14910, 20420, 14910, 20380, 14910, 20340, 14910, 20300, 14910, 20260, 14910, 20220, 14910, 20180, 14910, 20140, 14910];			
			for (i = 0; i < findLoc.length; i += 2) {
				if (Pather.moveTo(findLoc[i], findLoc[i + 1])) {
					delay(100);
					//Pickit.pickItems();
				}
				if (getUnit(1, 706)) {
					break;
				}
			}
			Attack.kill(706);
			Pickit.pickItems();
			Town.goToTown();

			break;
		case 136: // Tristram
			//Pather.moveTo(25068, 5078);
			Precast.doPrecast(true);
			this.findLevel(704);
			if (me.classid === 3 && me.getSkill(123, 1) >= 21) {
				skillBackup = Config.AttackSkill[2];
				Config.AttackSkill[2] = 123;
				Attack.init();
			}
			//this.lure(704);
			if (!getUnit(1, 704)) {
				this.findLevel(704);
			}
			if (getUnit(1, 704)) {
				Attack.kill(704);
			}
			/*
			Pather.moveTo(25068, 5078);
			if (skillBackup && me.classid === 3 && me.getSkill(123, 1) >= 21) {
				Config.AttackSkill[2] = skillBackup;
				Attack.init();
			}
			Precast.doPrecast(true);
			*/
			if (!getUnit(1, 709)) {
				this.findLevel(709);
			}
			if (getUnit(1, 709)) {
				Attack.kill(709);
			}
			if (!getUnit(1, 705)) {
				this.findLevel(705);
			}
			if (getUnit(1, 705)) {
				Attack.kill(705);
			}
			Pickit.pickItems();
			delay(1000);
			Pickit.pickItems();
			break;
		}
	};
	
	// Start
	var i, portal, item, tkeys, hkeys, dkeys, brains, eyes, horns;
	Town.doChores();
	tkeys = me.findItems("pk1", 0).length || 0;
	hkeys = me.findItems("pk2", 0).length || 0;
	dkeys = me.findItems("pk3", 0).length || 0;
	
	if (tkeys+hkeys+dkeys < 9) {
		print("Get Key");
		me.overhead("Get Key");
		Pather.useWaypoint(6);
		Precast.doPrecast(true);
		Pather.journeyTo(25);
		Pather.moveToPreset(me.area, 2, 580);
		Attack.kill(getLocaleString(2875));
		Pickit.pickItems();
	}
	
	tkeys = me.findItems("pk1", 0).length || 0;
	hkeys = me.findItems("pk2", 0).length || 0;
	dkeys = me.findItems("pk3", 0).length || 0;
	me.overhead("A1 - " + tkeys + " | A2 - " + hkeys + " | A3 - " + dkeys);

	while (tkeys > 3) {
		Town.goToTown();
		item = me.getItem(654);
		if (Town.openStash() && Cubing.emptyCube() && Cubing.openCube() && Storage.Cube.MoveTo(item)) {
			transmute();
			delay(100);
		}
		delay(100);
		tkeys = me.findItems("pk1", 0).length || 0;
	}
	hkeys = me.findItems("pk2", 0).length || 0;
	while (hkeys > 3) {
		Town.goToTown();
		item = me.getItem(655);
		if (Town.openStash() && Cubing.emptyCube() && Cubing.openCube() && Storage.Cube.MoveTo(item)) {
			transmute();
			delay(100);
		}
		delay(100);
		hkeys = me.findItems("pk2", 0).length || 0;
	}
	dkeys = me.findItems("pk3", 0).length || 0;
	while (dkeys > 3) {
		Town.goToTown();
		item = me.getItem(656);
		if (Town.openStash() && Cubing.emptyCube() && Cubing.openCube() && Storage.Cube.MoveTo(item)) {
			transmute();
			delay(100);
		}
		delay(100);
		dkeys = me.findItems("pk3", 0).length || 0;
	}
	me.cancel();
	
	// Count keys and organs
	tkeys = me.findItems("pk1", 0).length || 0;
	hkeys = me.findItems("pk2", 0).length || 0;
	dkeys = me.findItems("pk3", 0).length || 0;
	brains = me.findItems("mbr", 0).length || 0;
	eyes = me.findItems("bey", 0).length || 0;
	horns = me.findItems("dhn", 0).length || 0;
	
	if ((tkeys < 3 || hkeys < 3 || dkeys < 3) && (brains < 1 || eyes < 1 || horns < 1)) {
		print("Not enough keys or organs.");
		return true;
	}
	
	if (tkeys >= 3 && hkeys >= 3 && dkeys >= 3) {
		me.maxgametime = Config.OrgTorch.WaitTimeout * 1000 * 120;
		print("Making organs.");
		me.overhead("Making organs.");
		//D2Bot.printToConsole("OrgTorch: Making organs.", 7);
		for (i = 0; i < 3; i += 1) {
			// Abort if we have a complete set of organs
			// If Config.OrgTorch.MakeTorch is false, check after at least one portal is made
			if (i > 0 && this.completeSetCheck()) {
				break;
			}

			portal = this.openPortal(0);

			if (portal) {
				Pather.usePortal(null, null, portal);
			}

			this.pandemoniumRun();
		}
	}
	
	// Count organs
	brains = me.findItems("mbr", 0).length || 0;
	eyes = me.findItems("bey", 0).length || 0;
	horns = me.findItems("dhn", 0).length || 0;

	// We have enough organs, do Tristram
	if (brains && eyes && horns) {
		me.maxgametime = Config.OrgTorch.WaitTimeout * 1000 * 120;
		Town.doChores();
		Pather.useWaypoint("random");
		Precast.doPrecast(true);
		Pather.useWaypoint(109);
		print("Making torch");
		me.overhead("Making torch");
		//D2Bot.printToConsole("OrgTorch: Making torch.", 7);

		portal = this.openPortal(1);

		if (portal) {
			Pather.usePortal(null, null, portal);
		}

		this.pandemoniumRun();
	}
	
	return true;
}