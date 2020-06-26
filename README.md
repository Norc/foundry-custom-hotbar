# Custom Hotbar
Foundry VTT module to add an extra functional macro hotbar above the first. 

**PLEASE NOTE:** This is an early BETA version! There a few known issues involving dragging and dropping between the Core hotbar and the Custom Hotbar. Dragging from Custom Hotbar and dropping on the Canvas also will not be supported until Foundry 0.70.

Everything else should be fully functional.

**Manifest**: Use this manifest link to install the module(https://raw.githubusercontent.com/Norc/foundry-custom-hotbar/master/module.json), or manually deploy the zip file from the Dist folder.

**Features:**
• Adds easy access to 10 additional macros in a separate visual grouping
• Broad compatibility: 
  -Closely mimics built-in methods to allow modules like Minor Quality of Life to use the Custom Hotbar without specific support
  -Does not interfere with the operation of the original Macro Hotbar
• Fully system agnostic

**Changelog:**
INITIAL BETA RELEASE:
*v0.1.0* (2020/06/25)
1. Added ability to automatically handle dragging from character sheet onto custom hotbar, including full MQoL and BetterRolls support.
2. Added keybinding for CHB: Shift + slot number
3. Added support for dragging macros around from one CustomHotbar slot to another
4. General improvements/bugfixes

*v0.0.5* (2020/06/14)
Basic macro hotbar functionality established (writing to and reading from User.Data.Flags. Also handles the most important events to allow basic custom hotbar funtionality to be performed.

*v.0.0.1*
Initial version to attempt to display the hotbar in any fashion.

**Roadmap:**
 • Add ability to create multiple Custom Hotbars, not just one
 • Add ability to pop out Custom Hotbars to new locations
 • Add option to unlock Custom Hotbar pages 2-5
 • Add ability to highlight hotbar if various flags/system values are present
 • Add integraction with Color Picker library to allow control over Custom Hotbar appearance
 • Continue to mimic regular Macro Hotbar behavior as closely as possible
 • Minor refactoring of code and UI now that basic functionality established
 *Post 0.7:* Use new Canvas OnDrop hook to allow starting a drag maneuver. This will allow the last missing Hotbar functionality to be added.
