	//////////////////////////Zkqi//////////////////////////////////////////////////////////
	//////////////////////////Zkqi//////////////////////////////////////////////////////////
	Config.LowGold = 2e5;
	Config.LowGoldA = 6e5;
	//Config.AutoEquip = true;	
	if (Config.AutoEquip) {
		Config.PickitFiles.push("Autoequip/sorc.nip");
	}
	if ((me.getStat(14) + me.getStat(15)) <= 1e6) {
		Config.PickitFiles.push("money.nip");
	}
	if ((me.getStat(14) + me.getStat(15)) < 200000 && me.diff >= 1 && me.getSkill(54, 1)) {
		Config.StashGold = 10000;
		Scripts.ChestMania = true; // Open chests in configured areas. See sdk/areas.txt
			//Config.ChestMania.Act1 = [13, 14, 15, 16, 18, 19]; // List of act 1 areas to open chests in
			//Config.ChestMania.Act2 = [55, 59, 65, 66, 67, 68, 69, 70, 71, 72]; // List of act 2 areas to open chests in
			Config.ChestMania.Act3 = [79, 80, 81, 92, 93]; // List of act 3 areas to open chests in
			//Config.ChestMania.Act4 = []; // List of act 4 areas to open chests in
			//Config.ChestMania.Act5 = [115, 116, 119, 125, 126, 127]; // List of act 5 areas to open chests in
		if (Scripts.ChestMania) {
			Config.LowGold = 2000000;
		}
	} else {
		Config.StashGold = 100000; // Minimum amount of gold to stash.
	}
	
	// Town settings
	Config.HealHP = 50; // Go to a healer if under designated percent of life.
	Config.HealMP = 0; // Go to a healer if under designated percent of mana.
	Config.HealStatus = true; // Go to a healer if poisoned or cursed
	Config.UseMerc = true; // Use merc. This is ignored and always false in d2classic.
	Config.MercWatch = false; // Instant merc revive during battle.

	// Potion settings
	Config.UseHP = 75; // Drink a healing potion if life is under designated percent.
	Config.UseRejuvHP = 50;  // Drink a rejuvenation potion if life is under designated percent.
	Config.UseMP = 30; // Drink a mana potion if mana is under designated percent.
	Config.UseRejuvMP = 0; // Drink a rejuvenation potion if mana is under designated percent.
	Config.UseMercHP = 75; // Give a healing potion to your merc if his/her life is under designated percent.
	Config.UseMercRejuv = 10; // Give a rejuvenation potion to your merc if his/her life is under designated percent.
	Config.HPBuffer = 1; // Number of healing potions to keep in inventory.
	Config.MPBuffer = 0; // Number of mana potions to keep in inventory.
	Config.RejuvBuffer = 0; // Number of rejuvenation potions to keep in inventory.

	// Chicken settings
	Config.LifeChicken = 5; // Exit game if life is less or equal to designated percent.
	Config.ManaChicken = 0; // Exit game if mana is less or equal to designated percent.
	Config.MercChicken = 0; // Exit game if merc's life is less or equal to designated percent.
	Config.TownHP = 0; // Go to town if life is under designated percent.
	Config.TownMP = 0; // Go to town if mana is under designated percent.
	
	/* Minimum amount of potions. If we have less, go to vendor to purchase more.
	 * Set rejuvenation columns to 0, because they can't be bought.
	 */
	Config.MinColumn[0] = 3;
	Config.MinColumn[1] = 3;
	Config.MinColumn[2] = 3;
	Config.MinColumn[3] = 3;

	// Pickit config. Default folder is kolbot/pickit.
	Config.PickitFiles.push("zkqinewbie.nip");
	Config.PickRange = 100; // Pick radius
	Config.FastPick = true; // Check and pick items between attacks

	// Additional item info log settings. All info goes to \logs\ItemLog.txt
	Config.ItemInfo = false; // Log stashed, skipped (due to no space) or sold items.
	Config.ItemInfoQuality = []; // The quality of sold items to log. See NTItemAlias.dbl for values. Example: Config.ItemInfoQuality = [6, 7, 8];

	// Item identification settings
	Config.CainID.Enable = false; // Identify items at Cain
	Config.CainID.MinGold = 2500000; // Minimum gold (stash + character) to have in order to use Cain.
	Config.CainID.MinUnids = 3; // Minimum number of unid items in order to use Cain.
	Config.FieldID = false; // Identify items in the field instead of going to town.
	Config.DroppedItemsAnnounce.Enable = false;	// Announce Dropped Items to in-game newbs
	Config.DroppedItemsAnnounce.Quality = []; // Quality of item to announce. See NTItemAlias.dbl for values. Example: Config.DroppedItemsAnnounce.Quality = [6, 7, 8];

	// Repair settings
	Config.CubeRepair = false; // Repair weapons with Ort and armor with Ral rune. Don't use it if you don't understand the risk of losing items.
	Config.RepairPercent = 40; // Durability percent of any equipped item that will trigger repairs.

	// Gambling config
	Config.Gamble = false;
	Config.GambleGoldStart = 1000000;
	Config.GambleGoldStop = 500000;

	// List of item names or classids for gambling. Check libs/NTItemAlias.dbl file for other item classids.
	Config.GambleItems.push("Amulet");
	Config.GambleItems.push("Ring");
	Config.GambleItems.push("Circlet");
	Config.GambleItems.push("Coronet");

	/* Cubing config. All recipe names are available in Templates/Cubing.txt. For item names/classids check NTItemAlias.dbl
	 * The format is Config.Recipes.push([recipe_name, item_name_or_classid, etherealness]). Etherealness is optional and only applies to some recipes.
	 */
	Config.Cubing = true; // Set to true to enable cubing.
	Config.Recipes.push([Recipe.Zkqia, 743]); // 抽奖
	//Config.Recipes.push([Recipe.Zkqib, 300]); // 回收cy
	Config.Recipes.push([Recipe.Zkqib, 209]); // 回收py
	Config.Recipes.push([Recipe.Zkqib, 428]); // 回收tg
	//Config.Recipes.push([Recipe.Zkqib, 422]); // 回收glf
	Config.Recipes.push([Recipe.Zkqib, 263]); // 回收梅格之杖
	Config.Recipes.push([Recipe.Zkqic, 612]); // Ugc洗技能
	Config.Recipes.push([Recipe.Zkqic, 611]); // Ulc洗技能
	Config.Recipes.push([Recipe.Zkqie, 611]); // 回收不要的ulc
	Config.Recipes.push([Recipe.Zkqie, 612]); // 回收不要的ugc
	Config.Recipes.push([Recipe.Zkqid]); //合成旗帜

	/* Runeword config. All recipes are available in Templates/Runewords.txt
	 * Keep lines follow pickit format and any given runeword is tested vs ALL lines so you don't need to repeat them
	 */
	Config.MakeRunewords = false; // Set to true to enable runeword making/rerolling

	// Shrine Scanner - scan for shrines while moving.
	// Put the shrine types in order of priority (from highest to lowest). For a list of types, see sdk/shrines.txt
	Config.ScanShrines = [12,15];
	
	// Anti-hostile config
	Config.AntiHostile = false; // Enable anti-hostile
	Config.HostileAction = 0; // 0 - quit immediately, 1 - quit when hostile player is sighted, 2 - attack hostile
	Config.TownOnHostile = false; // Go to town instead of quitting when HostileAction is 0 or 1
	Config.RandomPrecast = false; // Anti-PK measure, only supported in Baal and BaalHelper and BaalAssisstant at the moment.
	Config.ViperCheck = false; // Quit if revived Tomb Vipers are sighted

	// DClone config
	Config.StopOnDClone = false; // Go to town and idle as soon as Diablo walks the Earth
	Config.SoJWaitTime = 0; // Time in minutes to wait for another SoJ sale before leaving game. 0 = disabled
	Config.KillDclone = false; // Go to Palace Cellar 3 and try to kill Diablo Clone. Pointless if you already have Annihilus.
	Config.DCloneQuit = false; // 1 = quit when Diablo walks, 2 = quit on soj sales, 0 = disabled
