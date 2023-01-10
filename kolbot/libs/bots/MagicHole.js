/**
*	@filename	MagicHole.js
*	@author		kolton
*	@desc		clear MagicHole
*/

function MagicHole() {
	Config.MaxGameTime = 900;
	Town.doChores();
	Pather.useWaypoint(115);
	Precast.doPrecast(true);
	Attack.clearLevel();

	return true;
}