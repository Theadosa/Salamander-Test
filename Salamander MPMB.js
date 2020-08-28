/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file. You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
	It is recommended to enter the code in a freshly downloaded or reset sheet before adding any other information so that there won't be any conflicts.
*/

/*	-INFORMATION-
	Subject:	(sub)race
	Effect:		This is the syntax for adding a new (sub)race to the sheet.
				Note that you will need to define a race using this syntax once for every sub-race (i.e. there is a separate entry for High Elf, Wood Elf, and Dark Elf)
				You will use this for a race that doesn't have a subrace, like Dragonborn and also for a subrace of a race, like Hill Dwarf and Mountain Dwarf.
				You do not make a separate entry for the parent of a subrace. So there is no Dwarf or Elf entry!
				For races that have variants, like the human, you can define a variant using the RaceSubList. Any variant defined like that will only be selectable through the "Racial Options" button
	Sheet:		v13.00.00 (2018-??-??) [identical to v12.999 syntax, except v12.999 uses 'borrow' for the burrow speed]
*/

var iFileName = "Homebrew Syntax - Salamander Amphibian.js"; // Optional; This is how the file will be named in the sheet if you import it as a file and not copy-paste its content. Only the first occurrence of this variable will be used
RequiredSheetVersion(12.999); // Optional; This is the minimum required version number of the sheet for the script to work. If the sheet being used to import the script is of an earlier version, the user will be warned

RaceList["Salamander, Amphibian"] = { //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []

	regExpSearch : /^(?=.*Salamander)(?=.*Amphibian).*$/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has both the words "something" and "catlike" in it, disregarding capitalization). If this looks too complicated, just write: /something catlike/i

	name : "Amphibian", //required; the name to use for the race

	sortname : "Amphibian", //optional; this is the name used to fill the drop-down boxes. If you don't include this, the 'name' will used instead

	source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]

	plural : "Amphibians", //required; the name to use for the race when the plural form is used

	size : 4, //required;  the size of the race (Gargantuan = 0, Huge = 1, Large = 2, Medium = 3, Small = 4, Tiny = 5)

	speed : { //required; This sets a value for one or more speed modes, and/or a value to be added to a specific speed mode or to all speed modes // the attributes of this object can be "walk", "burrow", "climb", "fly", "swim", and "allModes"

		// all of the following attributes are optional and you can add more ("burrow" isn't part of this example!)

		walk : { spd : 30, enc : 20 }, // the objects "walk", "burrow", "climb", "fly", "swim" are all the same, they are an object with two attributes, 'spd' for the speed in feet, and 'enc' for the encumbered speed in feet.

		climb : { spd : "walk", enc : 0 }, // instead of numbers, you can also have modifiers. Modifiers are a string, starting with a mathematical operator, followed by a number (e.g. "-10", "+20"). // a value that is zero is ignored

		fly : { spd : "walk", enc : 0 }, // instead of a number/modifier, you can also set the attribute to "walk". This makes the speed mode assume the walking speed // Using an underscore as the first character means the value is only added if the value would be non-zero

		swim : { spd : "fixed 90", enc : "fixed 90" }, // if you include the word "fixed" together with a number, the movement mode will be that number, without any modifiers from other sources (like the Monk's speed bonus). However, if another entry that isn't 'fixed' does end up with a higher total while including any modifiers, that speed is used instead

        burrow : { spd : 60, enc : 50}
	},

/* SYNTAX CHANGE v12.998 >> old syntax for 'tools' and 'languages' are no longer supported!! */

	languageProfs : ["Common", "Reptilian", "Primordial"], // optional; this is an array of the language proficiencies gained. An entry can either be 1) a string that represents the language learned or 2) a number which is the number of language gained that can be chosen by the player

	weapons : ["Claw", "Bite", "Tail"], //optional; an array of weapons that are added to the attacks section; This will be the name of the weapon how it appears in the attack section, not necessarily the object name in the WeaponsList

	addarmor : "Natural Armor", //optional; a string of the name of the armour that is literally put in the Armor Description field when the class feature is applicable, and removed if not

	vision : [["Darkvision", 60], ["Sunlight Sensitivity", 0], ["Light Sensitivity", 10]], //optional; An array of arrays that each have a length of 2; This adds the first value of each array to the Senses field. The second value is the range in feet. If no range is needed, put a 0 there. You can also add a modifier like "+30" or "*2" to have the appropriate calculation done with the range of sense

	dmgres : [], //optional; damage resistance(s) the race has. This line can be deleted if you don't have anything to put here // If the resistance has a condition attached to it, like only being against nonmagical attacks, substitute the entry in the array with an array of 2: [the damage type, the damage type with the condition]. // For example: [["Bludgeoning", "Bludg. (nonmagical)"], ["Piercing", "Pierc. (nonmagical)"], ["Slashing", "Slash. (nonmagical)"]]

	savetxt : { // Optional; this attribute defines entries to add to the field for "Saving Throw Advantages / Disadvantages"

		text : [], // Optional; this is an array of strings, and each of those strings is added to the field exactly as presented here

		immune : ["Thunder"], // Optional; this is an array of strings that the character is immune to. This is put in the field after the text "Immune to ", so in this example it would result in "Immune to poison and disease"

		adv_vs : [] // Optional; this is an array of things that the character has advantage on saves against. This is put in the field after the text "Adv. on saves vs. ", so in this example it would result in "Adv. on saves vs. traps and charmed"
	},

	weaponprofs : [true, false, false] //optoinal; Weapon proficiencies the race has. This line can be deleted if you don't have anything to put here //the 3 entries are for: ["simple", "martial", "other"]

	age : " reach adulthood between age 20 and 40 and live around 1000 to 5000 years", //optional; the age tooltip/mouseover text (will be displayed in combination with the "plural" entry)

	height : " range from 3 to 4 feet tall ", //optional; the height tooltip/mouseover text (will be displayed in combination with the "plural" entry)

	weight : " weigh around 40 lb ", //optional; the weight tooltip/mouseover text (will be displayed in combination with the "plural" entry)

	heightMetric : " range from 1,5 to over 1,8 metres tall (145 + 5d8 cm)", //optional; the height tooltip/mouseover text (will be displayed in combination with the "plural" entry), when the metric system is chosen

	weightMetric : " weigh around 70 kg (50 + 5d8 \xD7 4d4 / 10 kg)", //optional; the weight tooltip/mouseover text (will be displayed in combination with the "plural" entry), when the metric system is chosen

	improvements : "Salamander, Amphibian: +1 Intelligence, +2 Charisma;", //required; the text that is displayed when listing all the ability score improvements

	scores : [0, 0, 0, 1, 0, 2], //required; the ability score improvements as used by the Ability Score dialog. The syntax is: [Str, Dex, Con, Int, Wis, Cha]

	trait : "Salamander, Amphibian (+1 Intelligence, +2 Charisma)\nWater Elemental:\n   I am a Subrace of the Water elemental.\n    I can breathe both air and water.\n Thunder Immunity:\n   I am immune to harmful sonic sounds.\n Tempered Scales:\n    My skin has a natural sharpness to it. When an enemy hits me with an unarmed strike they take half their damage as piercing damage. To a maximum of my level x 6.\n \nVacuum Breath: All within range (10 Feet) must make a Dexterity Saving throw (DC 8+Con modifier+proficiency) Dealing 2d4 Thunder Damage. You can only use this ability up to the number of your Charisma modifier times. This damage increases by 1d4 every level.\nPrismatic Glow: While in the water I can glow faintly like a prism or like the northern lights, granting 30ft bright light instead of 10 of dim. I may change the color at will.\n Sonic Vision:\n      Tremor sense: 30ft in Water.\nLightning Coat:\n       I can coat my weapon in lightning. As a bonus action, when landing an attack with a melee weapon, roll an extra 2d4 for lightning damage. I can only use this up to the number of my wisdom modifier times per long rest.\nBurrower: You have proficiency in digging and forging caves, pits. 60 ft burrow speed.\nLight sensitivity:\n         My eyes cannot handle bright lights, (the sun is excluded) and can be blinded by most light spells. I must make a Wisdom saving throw DC (10+level of the spell caster+their Wisdom modifier)\nSandweller: Hot temperatures are my friend. And grant me the favorite terrain ability for hot lands.\nCold blooded: I gain Vulnerability to Cold damage and while in Winter/snowy conditions or taking cold damage, I am slowed by 10ft of movement for 1 minute or as long as I stay within the conditions.\nNatural armor:\n      Ac 15 instead of 10. This AC does not increase by Dex modifier.", //required; the racial trait as it will be put in the Racial Trait field on the second page (note that "\n" is a line break).

	variants : [], //optional; the names of the racial variants, using the exact names of the entry of the variants given in the RaceSubList (note the use of only lower case)

	spellcastingAbility : 2, //required for a spellcaster; the ability score to use for spellcasting. Remove this line if your race has no spellcasting. (Str=1, Dex=2, Con=3, Int=4, Wis=5, Cha=6)

	spellcastingBonus : { //optional; an object that adds something to the "Bonus Spells" section of the spell selection dialog //this object can have all the same attributes as the "spellcastingList" object as defined in the ClassList, but must also have a "name" defined //the other things that can be defined in this that are not in the "spellcastingList" object, are the "selection", "times" and "prepared" values

		name : "Vacuum breath", //required; this is used to identify the object, so must be an unique name

		class : "any", //optional but required if not including the "spells" entry; The name of the class from whose spell list the spells come from. This can be "any" if the spells are not limited by a spell list of just one class. The entry has to match the name of the class in the SpellsList

		school : ["Evoc"], //optional; An array of abbreviations of spell school names (see SpellsList). These have to be in an array, even if it is just one value. Each entry has to match the name of the spell school in the SpellsList

		level : [0, 6], //Optional; The lower and upper limit of spell levels that the class has access to.

		ritual : false, //Optional; Donates if only ritual (true) or only non-ritual (false) spells should be included in the list

		spells : [], //Optional, but required if not including the "class" entry; If a "spells" array is present, all other objects will be ignored and only this list of spells will populate the list of available spells. each entry has to match the name of the spell in the SpellsList

		selection : [], //optional if "spells" is defined; this is the default selection for the array specified in "spells"

		times : 1, //optional; this is the number of times the bonus spells should be added. //This can also be an array of 20 values. That way the number of times are level-dependent

		prepared : true, //optional; if set to 'true', this makes the spell selected for this/these bonus spells to automatically get a checked off checkbox in the first column, similar to domain spells for a cleric

		atwill : true, //optional; if set to 'true', this makes the spell selected for this/these bonus spells to get "At Will" in the first column

		oncesr : false, //optional; if set to 'true', this makes the spell selected for this/these bonus spells to get "1×SR" in the first column

		oncelr : true, //optional; if set to 'true', this makes the spell selected for this/these bonus spells to get "1×LR" in the first column
	},

	features : { //optional; the racial features. Each works the same way, so only a couple of example are given. You can add as many as you want. If the race has no level-dependent or limited features, you can just delete the whole feature entry all together

		"vacuum breath" : { //note the use of lower case characters

			name : "Vacuum Breath", //required; the name of the racial feature
			minlevel : 1, //required; the level at which the feature is gained

			usages : 1, //optional; number of times it can be used. This can be one value, but can also be an array of 20 values, one for each level

			recovery : "long rest", //required if "usages" is defined; way of getting the limited feature recharged. If you can use anything, but use either "long rest" or "short rest" (note the lower case) for best compatibility with the limited features section. This can be one value, but can also be an array of 20 values, one for each level

			tooltip : "", //optional; the tooltip added to the entry in the Limited Feature section, this example will read "Lesser Restoration is gained from Something Catlike (Celestial Legacy)"

			action : ["action"], //optional; adds the name of the feature to the action list when chosen. The options are "action", "bonus action", and "reaction" //the second value in the array is added as a suffix for the "name" of the feature when entered into the action field

			calcChanges : { //optional; adds stuff to the calculation of attacks and/or HP

				hp : "", //optional; string to be run using eval() when calculating the number of HP in the HP tooltip and automation

				atkCalc : [""], //optional; ["eval string", "explanation string"]; change something in the calculation of the Damage and To Hit of attacks; The first value in the array is stringified code that is run using eval(), the second entry is an explanation of what is being altered so that it can be displayed in a dialogue. This second entry can be left empty, as ""

				atkAdd : [""], //optional; ["eval string", "explanation string"]; works just like atkDmg, but affects the weapon attributes when they are applied to the sheet. With this you can change the weapon's description, range, damage die, attribute, etc. etc. However, this will only be applied to recognized weapons

					// Note that you need to use two back slashes for things in the eval code here, because it is first added to a string, and then run as code. See the hp for an example, with the \\n

					// For the eval strings for the attack calculations ('atkCalc' or 'atkAdd') there are some variables that you can use to test against:

						// The variable WeaponName contains the recognized weapon object name as it is used in the WeaponsList object (or "" in atkCalc if the weapon is not a recognized weapon);

						// The object "theWea" is the WeaponsList[WeaponName] object for the recognized weapon (or 'undefined' in atkCalc if the weapon is not a recognized weapon);

						// You can use the booleans 'isOffHand', 'isMeleeWeapon', 'isRangedWeapon', 'isSpell' (also true for cantrips), 'isDC'

						// If the attack is a spell that is found on the SpellList, the variable thisWeapon[3] contains the name of the entry in the SpellList

						// The object "fields" has all the values of the different fields of the attack (fields.Proficiency, fields.Mod, fields.Range, fields.Damage_Type, fields.Description, fields.To_Hit_Bonus, fields.Damage_Bonus, fields.Damage_Die, fields.Weight);

						// You can change the attributes of the "fields" object with the eval-string of atkAdd to affect what is put into the fields.

						// You can use the attributes of the "fields" object with the eval-string of atkCalc to check for things, but changing them will have no effect on the sheet.

						// With the atkCalc you have to change the "output" object in order to affect the outcome of the calculations. This object has the following attributes: output.prof (wether or not to add the proficiency bonus to the To Hit), output.die (Damage Die to use), output.mod (ability modifier), output.modToDmg (wether or not to add the ability modifier to Damage), output.magic (any magic bonus that's to be added to both To Hit and Damage), output.bHit (the To Hit bonus from the Blue Text/Modifier field), output.bDmg (the Damage bonus from the Blue Text/Modifier field), output.extraHit (a number added to the To Hit that is reserved for this eval), output.extraDmg (a number added to the damage that is reserved for this eval)
			},

			dmgres : [""], //optional; an array of damage types that the racial feature give resistance against. // If the resistance has a condition attached to it, like only being against nonmagical attacks, substitute the entry in the array with an array of 2: [the damage type, the damage type with the condition]. // For example: [["Bludgeoning", "Bludg. (nonmagical)"], ["Piercing", "Pierc. (nonmagical)"], ["Slashing", "Slash. (nonmagical)"]]

			addMod : { type : "skill", field : "Init", mod : "Int", text : "I can add my Intelligence modifier to initiative rolls." } //optional; This is an object, or an array of similar objects, for adding a modifier to a modifier field. Using this will make it so that the modifier is added to any value that is already there. // The 'mod' attribute can be any combination of numbers, mathematical operators, and three-letter ability score abbreviations // The 'type' attribute can be "skill" or "save", but can also be left empty "" // The 'field' attribute depends on the type, for "skill" it can be the name of a skill, or "Init" for initiative, or "All" for the all skills modifier; for "save" it can be the three-letter abbreviation of an ability score, or "All" for the all saves modifier. // If the 'type' attribute is left empty, the 'field' attribute has to be the exact name of the field the modifier has to be added to // The 'text' attribute is an explanation of why the modifier was added //NOTE: for modifiers to attacks, use calcChanges
		},

		},
	}

};
