# Custom Hotbar
Foundry VTT module to add an extra, fully functional macro hotbar above the core Foundry macro hotbar:

![Image of custom hotbar](https://i.imgur.com/L9QwR9u.png)

The Custom Hotbar can now be repositioned and recolored as needed, and the same control is also granted over the core Foundry hotbar:

![Image of customized hotbar](https://imgur.com/EKSjoYf.png)

Lastly, additional keybinds are also available: **Shift-Number** to run a macro on the custom hotbar, and **Ctrl-Shift-1 through 5** to change the core Foundry Hotbar page

If you encounter an issue or have a suggestion for a feature not currently on the roadmap, please let me know on Discord (Norc#5108) or log an issue here on GitHub.

### Special Thanks
Special thanks to Ardistristan for his excellent Lib - Color Settings Module and extraordinary support as I implemented it! Further thanks to Stan for his continued support and to the awesome Foundry modding community as a whole.

## Installation
* **Manifest**: Use this manifest link to install the DEV ALPHA version of the module (https://raw.githubusercontent.com/Norc/foundry-custom-hotbar/beta/module.json)

* **Zip file**: or manually deploy the zip file from the Dist folder.
  
## Features
1. Adds easy access to 10 additional macros in a separate visual grouping
1. Provides advamced color and position control over both the existing core hotbar and new custom hotbars 
1. Fully system agnostic
   1. Tested with 5E, PF2E, and WFRP
   1. Requests for features that would help support specfic systems are welcomed
1. Keybinding for changing Core Foundry Hotbar page (**Ctrl-Shift-1 through 5**) and new macro slots (**Shift + digit**)
1. Full Token Hotbar module support
   This module was originally created to enhance [Stan's Token Hotbar module](https://github.com/janssen-io/foundry-token-hotbar). We encourage you to try the two modules together! Custom Hotbar and Token Hotbar in action:
   
   <img src="https://github.com/janssen-io/foundry-token-hotbar/blob/master/img/thb-custom-hotbar.gif" width="40%" height = "40%">)
1. Broad compatibility:
   1. Closely mimics built-in methods to allow modules like Minor Quality of Life and Better Rolls to use the Custom Hotbar without specific support
   1. Does not interfere with the operation of the original Macro Hotbar

## Changelog
*Version 2.0* (2020/07/19)
1. Added settings to control Custom Hotbar position and color
1. Added settings to provide the same control to the Core Hotbar
1. Added settings for both global defaults and individual user settings
1. Added new keybinding (Ctrl-Shift-1 through 5) to change core Foundry Hotbar page number
1. Fixed compatibility with Firefox
1. Added localization strings for the new settings

*INITIAL RELEASE v1.5* (2020/07/05)
1. Added ability to automatically handle dragging from character sheet onto custom hotbar, including full MQoL and BetterRolls support.
1. Added support for all reamining dragging and dropping scenarios, including between Core and Custom Hotbars. 
1. Added keybinding for CHB: Shift + slot number (just like a regular macro keybinding, but with Shift added).
1. General improvements/bugfixes

*v0.0.5* (2020/06/14)
Basic macro hotbar functionality established (writing to and reading from User.Data.Flags). Also handles the most important events to allow basic custom hotbar funtionality to be performed.

*v.0.0.1*
Initial version to attempt to display the hotbar in any fashion.

## Roadmap:
_Next release (minor cleanup):_
Minor features and bugfixes that didn't make it into 2.0.

_Next major version:_
1. Add option to popout hotbars for positioning by dragging and dropping
1. Add ability to create multiple Custom Hotbars, not just one

_Potential Future Features (Undecided)_
1. Add pages 2-4 or more for each Custom Hotbar.
