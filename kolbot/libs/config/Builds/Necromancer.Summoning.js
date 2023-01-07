/**
*
* Instructions:	See /d2bs/kolbot/libs/config/Builds/README.txt
*
* Skill IDs:	See /d2bs/kolbot/sdk/skills.txt for a list of skill IDs.
*
* Stat IDs:
*
* 	Strength	= 0
* 	Energy		= 1
* 	Dexterity	= 2
* 	Vitality	= 3
*

Finished Char Build:

	Stats													Base Stats
	------------											----------
 	Strength: 40 (15 points used)								25
 	Energy: 15 (no points)										15
 	Dexterity: 20 (no points)									20
 	Vitality: 500 (15 points remain from level 97, 98, and 99)	25

	Skills				Levelreq			SkillID			TotalPoints
	------------		--------			-------			-----------
	Might 				    1				   98				 1	- Done @ level 2
	Smite 				    1				   97				 1	- Done @ level 3
	Prayer 				    1				   99				 1	- Done @ level 4
	Holy Bolt 			    6				  101				 1	- Done @ level 6
	Defiance 			    6				  104				 1	- Done @ level 6
	Charge 				   12				  107				 1	- Done @ level 12
	Blessed Aim 		   12				  108				20	- Done @ level 78 *****PUMP SKILL QUEST POINTS HERE***** (12 + 1 = 13)
	Cleansing 			   12				  109				 1	- Done @ level 12
	Concentration 		   18				  113				20	- Done @ level 52
	Blessed Hammer 		   18				  112				20	- Done @ level 37
	Vigor 				   18				  115				20	- Done @ level 71
	Holy Shield 		   24				  117				20	- Done @ level 98
	Meditation 			   24				  120				 1	- Done @ level 24
	
	TOTAL Points Spent --------------------------------------> 108
	
	**********REMAINING SKILL POINTS =   2  ******** (110 - 108 = 2)

	Quest Skill Point   Level Used			SkillID			TotalPoints
	-----------------	----------			-------			-----------
	Norm Den of Evil        13                108                 1
	Norm Radament           27                108                 1
	Norm Izual              30                108                 2
	NM Den of Evil          43                108                 1
	NM Radament             43                108                 1
	NM Izual                43                108                 2
	Hell Den of Evil        70                108                 1
	Hell Radament           70                108                 1
	Hell Izual              70                108                 2
	
	TOTAL Quest Points Spent ----------------------------------> 12
	
	**********REMAINING QUEST SKILL POINTS =   0  ******** (12 - 12 = 0)

	Attack Config Variables For Paladin
	---------------------------------------------------------------------------------------------------------------------
	Config.AttackSkill[0] = -1; // Preattack skill.
	Config.AttackSkill[1] = 112; // Primary skill to bosses.
	Config.AttackSkill[2] = 113; // Primary aura to bosses
	Config.AttackSkill[3] = 112; // Primary skill to others.
	Config.AttackSkill[4] = 113; // Primary aura to others.
	Config.AttackSkill[5] = 101; // Secondary skill if monster is immune to primary.
	Config.AttackSkill[6] = 120; // Secondary aura.
*/
js_strict(true);

if (!isIncluded("common/Cubing.js")) { include("common/Cubing.js"); };
if (!isIncluded("common/Prototypes.js")) { include("common/Prototypes.js"); };
if (!isIncluded("common/Runewords.js")) { include("common/Runewords.js"); };

var AutoBuildTemplate = {

	1:	{	
			//SkillPoints: [-1],										// This doesn't matter. We don't have skill points to spend at lvl 1]
			//StatPoints: [-1,-1,-1,-1,-1],								// This doesn't matter. We don't have stat points to spend at lvl 1
			Update: function () {
				Config.TownCheck		= true;						// 回鎮上買藥水.Don't go to town for more potions
				Config.StashGold 		= 10000;							// 錢少於多少不要存.Minimum amount of gold to stash.
				Config.AttackSkill		= [-1, 500, 0, 500, 0, -1, -1];
				Config.LowManaSkill		= [0, -1];
				Config.ScanShrines		= [15, 13, 12, 14, 7, 6, 2];	
				Config.BeltColumn		= ["hp", "hp", "hp", "mp"];		// Keep tons of health potions!
				Config.MinColumn 		= [1, 1, 1, 1];
				//Config.PickitFiles.push("belowlevelseven.nip");		// Pick up normal armor, belts, etc. Keep ID scrolls and TP scrolls.


				Config.Inventory[0] = [1,1,1,1,1,1,1,1,1,1];
				Config.Inventory[1] = [1,1,1,1,1,1,1,1,1,1];
				Config.Inventory[2] = [1,1,1,1,1,1,1,1,1,1];
				Config.Inventory[3] = [1,1,1,1,1,1,1,1,1,1];

				// Speedup config. Full packet casting is not recommended for melee skills.
				Config.FCR = 255; 
				Config.FHR = 255; 
				Config.FBR = 255; 
				Config.IAS = 255; 
			}
		},
		
	2:	{
			SkillPoints: [70], 											// Might + 1 (level 1)
			StatPoints: [0, 0, 0, 3, 3],								// Strength + 1, Vitality + 4 (26) (29)
			Update: function () {
				Config.AttackSkill = [-1, 0, -1, 0, -1, -1, -1];		// Use Might
				Config.LowManaSkill = [0, 0];							// Use Might while hitting stuff.
			   
			}
		},
		
	3:	{
			SkillPoints: [66], 											// Smite + 1 (level 1)
			StatPoints: [0, 0, 0, 3, 3],								// Strength + 2, Vitality + 3 (28) (32)
			Update: function () { 	
			Config.AttackSkill = [-1, 0, -1, 0, -1, -1, -1];		// Use Might
			Config.LowManaSkill = [0, -1];							// Use Might while hitting stuff.
			Config.Curse[0] = 66; 
           
			Config.ActiveSummon = true;
			Config.Skeletons = "max"; 
			}
		},
		
	4:	{
			SkillPoints: [68],											// Prayer + 1 (level 1)
			StatPoints: [0, 0, 0, 3, 3],								// Strength + 3, Vitality + 2 (31) (34)
			Update: function () {
				Config.AttackSkill = [68, 500, 0, 500, 0, -1, -1];		// Use Might
				Config.LowManaSkill = [0, -1];							// Use Might while hitting stuff.
			}
		},

	5:	{
			SkillPoints: [-1],											// Save Point + 1 (1 saved point remains)
			StatPoints: [0, 0, 0, 3, 3],								// Strength + 4, Vitality + 1 (35) (35)
			Update: function () {
				Config.ScanShrines = [15, 13, 12];
				Config.MinColumn = [1, 1, 1, 1];
			}
		},

	6:	{
			SkillPoints: [69, 75],									// Holy Bolt + 1, Defiance + 1 (level 1) (level 2) (0 saved points remain)
			StatPoints: [0, 0, 0, 3, 3],								// Strength + 2, Vitality + 3 (37) (38)
			Update: function () {
				Config.AttackSkill = [68, 500, 0, 500, 0, -1, -1];		// Holy Bolt and Might for Secondary Skill/Aura.
			    Config.Golem = 1;
				Config.Skeletons = "max"; 
			}
		},

	7:	{
			SkillPoints: [70],											// Save Point + 1 (1 saved point remains)
			StatPoints: [0, 0, 0, 3, 3],								// Strength + 2, Vitality + 3 (39) (41)
			Update: function () {
			}
		},

	8:	{
			SkillPoints: [70],											// Save Point + 1 (2 saved points remain)
			StatPoints: [0, 0, 0, 3, 3],								// Strength + 1, Vitality + 4 (40) (45)
			Update: function () {
				
			}
		},

	9:	{
			SkillPoints: [70],											// Save Point + 1 (1 saved points remain)
			StatPoints: [0, 0, 0, 3, 3],								// Vitality + 5 (50)
			Update: function () {
				
			}
		},

	10:	{
			SkillPoints: [-1],											// Save Point + 1 (2 saved points remain)
			StatPoints: [0, 0, 0, 3, 3],								// Vitality + 5 (55)
			Update: function () {
				Config.StashGold = 10000;								// Minimum amount of gold to stash.
				Config.BeltColumn = ["hp", "hp", "mp", "mp"]; 			// Start keeping rejuvs
				Config.MinColumn = [2, 2, 2, 2];
	
			}
		},

	11:	{	
			SkillPoints: [-1],											// Save Point + 1 (3 saved points remain)
			StatPoints: [0, 0, 0, 3, 3],								// Vitality + 5 (60)
			Update: function () {
				
			}
		},

	12:	{
			SkillPoints: [79, 80],								// Charge + 1, Blessed Aim + 1, Cleansing + 1 (level 1) (level 1) (level 1) (2 saved points remain)
			StatPoints: [0, 0, 0, 3, 3],								// Vitality + 5 (65)
			Update: function () {
				Config.AttackSkill = [68, 500, 0, 500, 0, -1, -1];	// Use Blessed Aim
				Config.LowManaSkill = [0, -1];							// Use Blessed Aim while hitting stuff.
			    Config.SkeletonMages = "max"; 
			}
		},

	13:	{
			SkillPoints: [-1],											// Blessed Aim + 1 (level 2) Save Point + 1 (3 saved points remain) (Normal Den of Evil Used)
			StatPoints: [0, 0, 0, 3, 3],								// Vitality + 5 (70)
			Update: function () {
				
			}
		},

	14:	{
			SkillPoints: [70, 70],											// Save Point + 1 (4 saved points remain)
			StatPoints: [0, 0, 0, 3, 3],								// Vitality + 5 (75)
			Update: function () {
				
			}
		},

	15:	{
			SkillPoints: [-1],											// Save Point + 1 (6 saved points remain)
			StatPoints: [0, 3, 3, 3, 3],								// Vitality + 5 (80)
			Update: function () {
				Config.OpenChests = false;								// Eyes on the prize!
				Config.LowGold = 100000;
			}
		},

	16:	{
			SkillPoints: [-1],											// Save Point + 1 (7 saved points remain)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (85)
			Update: function () {
				
			}
		},

	17:	{
			SkillPoints: [67, 74],											// Save Point + 1 (8 saved points remain)
			StatPoints: [0, 0, 0, 3, 3],								// Vitality + 5 (90)
			Update: function () {
				Config.Curse[1] = 66;
				Config.AttackSkill = [68, 500, 0, 500, 0, -1, -1];
				Config.LowManaSkill = [0, -1];
				Config.ExplodeCorpses = 74; 	
			}
		},

	18:	{
			SkillPoints: [70],								// Blessed Hammer + 1, Concentration + 1, Vigor + 1 (level 1) (level 1) (level 1) (6 saved points remain)
			StatPoints: [0, 0, 0, 3, 3],								// Vitality + 5 (95)
			Update: function () {
				Config.AttackSkill = [68, 500, 0, 500, 0, -1, -1];// Blessed Hammer and Concentration!
				Config.LowManaSkill = [0, -1];							// Use Concentration while hitting stuff.
				Config.TownCheck = true;								// Do go to town for more potions
				Config.MinColumn = [3, 3, 3, 0];						// Should have a decent belt by now
				Config.Charge = false;									// Don't waste mana on charging while walking
				Config.MPBuffer = 8;									// Need lots of mana for Blessed Hammer!
				Config.ExplodeCorpses = 74; 
			}
		},

	19:	{
			SkillPoints: [71, 81],									// Blessed Hammer + 1, Concentration + 1 (level 2) (level 2) (5 saved points remain)
			StatPoints: [0, 0, 0, 3, 3],								// Vitality + 5 (100)
			Update: function () {
				
			}
		},

	20:	{
			SkillPoints: [70],									// Blessed Hammer + 1, Concentration + 1 (level 3) (level 3) (4 saved points remain)
			StatPoints: [0, 0, 0, 3, 3],								// Vitality + 5 (105)
			Update: function () {
	
			}
		},

	21:	{	
			SkillPoints: [69],									// Blessed Hammer + 1, Concentration + 1 (level 4) (level 4) (3 saved points remain)
			StatPoints: [0, 0, 0, 3, 3],								// Vitality + 5 (110)
			Update: function () {
				
			}
		},

	22:	{
			SkillPoints: [69, 69],									// Blessed Hammer + 1, Concentration + 1 (level 5) (level 5) (2 saved points remain)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (115)
			Update: function () {
				
			}
		},

	23:	{
			SkillPoints: [-1],											// Blessed Hammer + 1 (level 6) (2 saved points remain)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (120)
			Update: function () {
				
			}
		},

	24:	{
			SkillPoints: [89, 72, 77, 87],								// Blessed Hammer + 1, Holy Shield + 1, Meditation + 1 (level 7) (level 1) (level 1) (0 saved points remain)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (125)
			Update: function () {
				Config.AttackSkill = [68, 500, -1, 500, -1, -1, -1];// Holy Bolt and Meditation for Secondary Skill/Aura.
				Config.LowManaSkill = [-1, -1];				// Use Meditation while hitting stuff.
				Config.ExplodeCorpses = 74; 
				Config.Golem = "1";
				Config.Skeletons = "max"; 
				Config.SkeletonMages = "max"; 	
				Config.Revives = "max"; 
				Config.PoisonNovaDelay = 2; 	
				Config.ActiveSummon = true; 	
				Config.ReviveUnstackable = false
				Config.IronGolemChicken = 30; 
				Config.Cubing = true;				// Will have a cube by now.
			    Config.Dodge = true; // Move away from monsters that get too close. Don't use with short-ranged attacks like Poison Dagger.
	            Config.DodgeRange = 15; // Distance to keep from monsters.		
			}
		},

	25:	{
			SkillPoints: [86],											// Blessed Hammer + 1 (level 8)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (130)
			Update: function () {

			}
		},

	26:	{
			SkillPoints: [85],											// Blessed Hammer + 1 (level 9)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (135)
			Update: function () {
				
			}
		},

	27:	{
			SkillPoints: [70, 90],									// Blessed Hammer + 1, Blessed Aim + 1 (level 10) (level 3) (Norm Radament)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (140)
			Update: function () {
				
			}
		},

	28:	{
			SkillPoints: [70],											// Blessed Hammer + 1 (level 11)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (145)
			Update: function () {
				
			}
		},

	29:	{
			SkillPoints: [70],											// Blessed Hammer + 1 (level 12)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (150)
			Update: function () {
				
			}
		},

	30:	{
			SkillPoints: [70, 70, 95],								// Blessed Hammer + 1, Blessed Aim + 2 (level 13) (level 5) (Norm Izual)
			StatPoints: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],					// Vitality + 10 (160) (Norm Lam Esen's Tome)
			Update: function () {
				Config.Curse[0] = 87; 
                Config.Curse[1] = 87; 
				//Config.ExplodeCorpses = 74; 
				Config.Golem = "Clay";
				Config.Skeletons = "max"; 
				Config.SkeletonMages = "max"; 	
				Config.Revives = "max"; 
 				

			}
		},

	31:	{	
			SkillPoints: [69],											// Blessed Hammer + 1 (level 14)
			StatPoints: [0, 0, 0, 0, 0],								// Vitality + 5 (165)
			Update: function () {
				
			}
		},

	32:	{
			SkillPoints: [69],											// Blessed Hammer + 1 (level 15)
			StatPoints: [0, 0, 0, 0, 0],								// Vitality + 5 (170)
			Update: function () {
				
			}
		},

	33:	{
			SkillPoints: [69],											// Blessed Hammer + 1 (level 16)
			StatPoints: [0, 0, 0, 0, 0],								// Vitality + 5 (175)
			Update: function () {
				
			}
		},

	34:	{
			SkillPoints: [69],											// Blessed Hammer + 1 (level 17)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (180)
			Update: function () {
				
			}
		},

	35:	{
			SkillPoints: [69],											// Blessed Hammer + 1 (level 18)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (185)
			Update: function () {
				Config.LowManaSkill = [-1, -1];							// Stop trying to hit stuff.

			}
		},

	36:	{
			SkillPoints: [69],											// Blessed Hammer + 1 (level 19)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (190)
			Update: function () {
				
			}
		},

	37:	{
			SkillPoints: [69],											// Blessed Hammer + 1 (level 20)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (195)
			Update: function () {
				
			}
		},

	38:	{
			SkillPoints: [69],											// Concentration + 1 (level 6)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (200)
			Update: function () {
				
			}
		},

	39:	{
			SkillPoints: [69],											// Concentration + 1 (level 7)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (205)
			Update: function () {
				
			}
		},

	40:	{
			SkillPoints: [69],											// Concentration + 1 (level 8)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (210)
			Update: function () {

			}
		},

	41:	{	
			SkillPoints: [69],											// Concentration + 1 (level 9)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (215)
			Update: function () {
				
			}
		},

	42:	{
			SkillPoints: [69],											// Concentration + 1 (level 10)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (220)
			Update: function () {
				
			}
		},

	43:	{
			SkillPoints: [70, 69, 69, 69, 69],						// Concentration + 1, Blessed Aim + 4 (level 11) (level 9) (NM Den of Evil, NM Radament, NM Izual)
			StatPoints: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],					// Vitality + 10 (230) (NM Lam Esen's Tome)
			Update: function () {
				
			}
		},

	44:	{
			SkillPoints: [70],											// Concentration + 1 (level 12)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (235)
			Update: function () {
				
			}
		},

	45:	{
			SkillPoints: [70],											// Concentration + 1 (level 13)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (240)
			Update: function () {
	
			}
		},

	46:	{
			SkillPoints: [70],											// Concentration + 1 (level 14)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (245)
			Update: function () {
				
			}
		},

	47:	{
			SkillPoints: [70],											// Concentration + 1 (level 15)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (250)
			Update: function () {
				
			}
		},

	48:	{
			SkillPoints: [70],											// Concentration + 1 (level 16)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (255)
			Update: function () {
				
			}
		},

	49:	{
			SkillPoints: [70],											// Concentration + 1 (level 17)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (260)
			Update: function () {
				
			}
		},

	50:	{
			SkillPoints: [78],											// Concentration + 1 (level 18)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (265)
			Update: function () {
				Config.StashGold = 100000;								// Minimum amount of gold to stash.
				Config.MPBuffer = 4;									// Nightmare has stronger potions.
				Config.HPBuffer = 0;									// Nightmare has stronger potions.
				Config.BeltColumn = ["hp", "hp", "mp", "mp"];			// Regular potion settings
				Config.MinColumn = [3, 3, 3, 0];						// Regular potion settings

			}
		},

	51:	{	
			SkillPoints: [95],											// Concentration + 1 (level 19)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (270)
			Update: function () {
				Config.UseRejuvHP = 55;
				Config.LifeChicken = 45;
				Config.TownHP = 65;
			}
		},

	52:	{
			SkillPoints: [95],											// Concentration + 1 (level 20)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (275)
			Update: function () {
				
			}
		},

	53:	{
			SkillPoints: [95],											// Vigor + 1 (level 2)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (280)
			Update: function () {
				
			}
		},

	54:	{
			SkillPoints: [94],											// Vigor + 1 (level 3)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (285)
			Update: function () {
				
			}
		},

	55:	{
			SkillPoints: [95],											// Vigor + 1 (level 4)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (290)
			Update: function () {
	
			}
		},

	56:	{
			SkillPoints: [95],											// Vigor + 1 (level 5)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (295)
			Update: function () {
				
			}
		},

	57:	{
			SkillPoints: [95],											// Vigor + 1 (level 6)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (300)
			Update: function () {
				
			}
		},

	58:	{
			SkillPoints: [95],											// Vigor + 1 (level 7)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (305)
			Update: function () {
				
			}
		},

	59:	{
			SkillPoints: [95],											// Vigor + 1 (level 8)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (310)
			Update: function () {
				
			}
		},

	60:	{
			SkillPoints: [95],											// Vigor + 1 (level 9)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (315)
			Update: function () {
	
			}
		},

	61:	{	
			SkillPoints: [95],											// Vigor + 1 (level 10)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (320)
			Update: function () {
				
			}
		},

	62:	{
			SkillPoints: [95],											// Vigor + 1 (level 11)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (325)
			Update: function () {
				
			}
		},

	63:	{
			SkillPoints: [89],											// Vigor + 1 (level 12)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (330)
			Update: function () {
				
			}
		},

	64:	{
			SkillPoints: [89],											// Vigor + 1 (level 13)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (335)
			Update: function () {
				
			}
		},

	65:	{
			SkillPoints: [89],											// Vigor + 1 (level 14)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (340)
			Update: function () {
	
			}
		},

	66:	{
			SkillPoints: [89],											// Vigor + 1 (level 15)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (345)
			Update: function () {
				
			}
		},

	67:	{
			SkillPoints: [89],											// Vigor + 1 (level 16)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (350)
			Update: function () {
				
			}
		},

	68:	{
			SkillPoints: [89],											// Vigor + 1 (level 17)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (355)
			Update: function () {
				
			}
		},

	69:	{
			SkillPoints: [89],											// Vigor + 1 (level 18)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (360)
			Update: function () {
				
			}
		},

	70:	{
			SkillPoints: [89, 89, 89, 89, 89],						// Vigor + 1, Blessed Aim + 4 (level 19) (level 13) (Hell Den of Evil, Hell Radament, Hell Izual)
			StatPoints: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],					// Vitality + 10 (370) (Hell Lam Esen's Tome)
			Update: function () {

			}
		},

	71:	{	
			SkillPoints: [74],											// Vigor + 1 (level 20)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (375)
			Update: function () {
				
			}
		},

	72:	{
			SkillPoints: [89],											// Blessed Aim + 1 (level 14)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (380)
			Update: function () {
				
			}
		},

	73:	{
			SkillPoints: [89],											// Blessed Aim + 1 (level 15)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (385)
			Update: function () {
				
			}
		},

	74:	{
			SkillPoints: [89],											// Blessed Aim + 1 (level 16)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (390)
			Update: function () {
				
			}
		},

	75:	{
			SkillPoints: [89],											// Blessed Aim + 1 (level 17)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (395)
			Update: function () {
				Config.HPBuffer = 0; 
				Config.MPBuffer = 0; 
				Config.RejuvBuffer = 20; 
				Config.UseRejuvHP = 70;
				Config.LifeChicken = 60;
				Config.TownHP = 80 ;
			}
		},

	76:	{
			SkillPoints: [74],											// Blessed Aim + 1 (level 18)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (400)
			Update: function () {
				
			}
		},

	77:	{
			SkillPoints: [89],											// Blessed Aim + 1 (level 19)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (405)
			Update: function () {
				
			}
		},

	78:	{
			SkillPoints: [95],											// Blessed Aim + 1 (level 20)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (410)
			Update: function () {
				
			}
		},

	79:	{
			SkillPoints: [95],											// Holy Shield + 1 (level 2)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (415)
			Update: function () {
				
			}
		},

	80:	{
			SkillPoints: [68],											// Holy Shield + 1 (level 3)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (420)
			Update: function () {
				Config.Gamble = true;									// Time to spend dat ca$h!!
			}
		},

	81:	{	
			SkillPoints: [68],											// Holy Shield + 1 (level 4)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (425)
			Update: function () {
				
			}
		},

	82:	{
			SkillPoints: [68],											// Holy Shield + 1 (level 5)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (430)
			Update: function () {
				
			}
		},

	83:	{
			SkillPoints: [68],											// Holy Shield + 1 (level 6)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (435)
			Update: function () {
				
			}
		},

	84:	{
			SkillPoints: [68],											// Holy Shield + 1 (level 7)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (440)
			Update: function () {
				
			}
		},

	85:	{
			SkillPoints: [68],											// Holy Shield + 1 (level 8)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (445)
			Update: function () {
				
			}
		},

	86:	{
			SkillPoints: [68],											// Holy Shield + 1 (level 9)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (450)
			Update: function () {
				
			}
		},

	87:	{
			SkillPoints: [68],											// Holy Shield + 1 (level 10)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (455)
			Update: function () {
				
			}
		},

	88:	{
			SkillPoints: [68],											// Holy Shield + 1 (level 11)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (460)
			Update: function () {
				
			}
		},

	89:	{
			SkillPoints: [68],											// Holy Shield + 1 (level 12)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (465)
			Update: function () {
				
			}
		},

	90:	{
			SkillPoints: [68],											// Holy Shield + 1 (level 13)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (470)
			Update: function () {
				Config.MPBuffer = 0;									// CS runs, no longer need buffer because of taxi rides!
			}
		},

	91:	{	
			SkillPoints: [68],											// Holy Shield + 1 (level 14)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (475)
			Update: function () {
				
			}
		},

	92:	{
			SkillPoints: [80],											// Holy Shield + 1 (level 15)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (480)
			Update: function () {
				
			}
		},

	93:	{
			SkillPoints: [80],											// Holy Shield + 1 (level 16)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (485)
			Update: function () {
				
			}
		},

	94:	{
			SkillPoints: [80],											// Holy Shield + 1 (level 17)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (490)
			Update: function () {
				
			}
		},

	95:	{
			SkillPoints: [80],											// Holy Shield + 1 (level 18)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (495)
			Update: function () {
				
			}
		},

	96:	{
			SkillPoints: [80],											// Holy Shield + 1 (level 19)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (500)
			Update: function () {
				
			}
		},

	97:	{
			SkillPoints: [80],											// Holy Shield + 1 (level 20)
			StatPoints: [-1,-1,-1,-1,-1],								//
			Update: function () {
				
			}
		},

	98:	{
			SkillPoints: [80],											//
			StatPoints: [-1,-1,-1,-1,-1],								//
			Update: function () {
				
			}
		},

	99:	{
			SkillPoints: [80],											//
			StatPoints: [-1,-1,-1,-1,-1],								//
			Update: function () {
				
			}
		}
};