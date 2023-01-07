/**
*	@filename	Pit.js
*	@author		kolton
*	@desc		clear Pit
*/

function Pit() {
	Town.doChores();
	Pather.useWaypoint(6);
	Precast.doPrecast(true);
	Skill.setSkill(Config.AttackSkill[4], 0);

	if (!Pather.moveToExit([7, 12], true)) {
		throw new Error("Failed to move to Pit level 1");
	}
	
	if (Config.PublicMode) {
		Pather.makePortal();
	}

	if (Config.Pit.ClearPit1) {
		if (Config.PublicMode) {
			Attack.clearLevel(0);
		} else {
			Attack.clearLevel(Config.ClearType);
		}
	}

	if (!Pather.moveToExit(16, true, Config.Pit.ClearPath)) {
		throw new Error("Failed to move to Pit level 2");
	}
	
	if (Config.PublicMode) {
		Pather.makePortal();
	}

	Attack.clearLevel();

	return true;
}