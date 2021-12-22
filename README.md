UPDATE: Should be v9 compatible after v2.2 release. Please log issue if any remaining problems arise. v9 core keybind system adoption is planned for next update.

# Custom Hotbar
Foundry VTT module to add an extra, fully functional macro hotbar above the core Foundry macro hotbar:

![Image of custom hotbar](https://i.imgur.com/L9QwR9u.png)

Module and system compatibility is a primary goal of Custom Hotbar. If Custom Hotbar isn't compatible with a module or system that you think it should be, please let me know as a GitHub issue or ping me on Discord (Norc#5108).

The Custom Hotbar now matches the core Foundry hotbar styling by default, but it can now be repositioned and recolored as needed, and the same control is also granted over the core Foundry hotbar:

![Image of customized hotbar](https://imgur.com/EKSjoYf.png)

Additionally, players (or GMs I guess!) can disable either hotbar entirely if they don't want it for themselves.

Lastly, additional keybinds are also available: **Shift-Number** to run a macro on the custom hotbar, and **Ctrl-Shift-1 through 5** to change the core Foundry Hotbar page

## Installation
* **Manifest**: Use this manifest link to install the module (https://raw.githubusercontent.com/Norc/foundry-custom-hotbar/master/module.json)

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
   1. Closely mimics built-in methods to allow modules like Midi QoL and Better Rolls to use the Custom Hotbar without specific support
   1. Does not interfere with the operation of the original Macro Hotbar

## Changelog
See the [changelog.](https://github.com/Norc/foundry-custom-hotbar/blob/dev/CHANGELOG.md)

## Roadmap:
_Next releases (minor cleanup):_
1. Ongoing bug/stability/module compat cleanup for v9 as needed.

_Next major version:_
1. Add ability to create multiple Custom Hotbars, not just one

_Potential Future Features (Undecided)_
1. Add option to popout hotbars for positioning by dragging and dropping
1. Add pages 2-4 or more for each Custom Hotbar.

### Special Thanks
Special thanks to Ardistristan for his excellent Lib - Color Settings Module and extraordinary support as I implemented it! Thanks to DF (flamewave000) for the Library: DF Hotkeys library. Both of these libraries do a better job than I *ever* could.

Further thanks to Stan of Token Hotbar fame for everything he's done and to the awesome Foundry modding community as a whole.

