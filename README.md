# Custom Hotbar
Foundry VTT module to add an extra, fully functional macro hotbar above the core Foundry macro hotbar. 

**Manifest**: Use this manifest link to install the module (https://raw.githubusercontent.com/Norc/foundry-custom-hotbar/master/module.json), or manually deploy the zip file from the Dist folder.

**PLEASE NOTE:** This is an initial release! Basic functionality is tested, but if you encounter an issue or have a suggestion for a feature not currently on the roadmap, please let me know on Discord (Norc#5108) or log issue on GitHub.


## Features
1. Adds easy access to 10 additional macros in a separate visual grouping
1. Fully system agnostic
  1. Tested with 5E, PF2E, and WFRP
  1. Requests for features that would help support specfic systems are welcomed
1. Keybinding for new macro slots (shift + digit)
1. Full Token Hotbar module support
   >This module was originally created to enhance [Stan's Token Hotbar module](https://github.com/janssen-io/foundry-token-hotbar).
   >We encourage you to try the two modules together!
1. Broad compatibility: 
  1.Closely mimics built-in methods to allow modules like Minor Quality of Life and better rollsto use the Custom Hotbar without specific support
  1.Does not interfere with the operation of the original Macro Hotbar

## Changelog
INITIAL RELEASE:
*v1.5* (2020/07/05)
1. Added ability to automatically handle dragging from character sheet onto custom hotbar, including full MQoL and BetterRolls support.
1. Added support for all reamining dragging and dropping scenarios, including between Core and Custom Hotbars. 
1. Added keybinding for CHB: Shift + slot number (just like a regular macro keybinding, but with Shift added).
1. General improvements/bugfixes

*v0.0.5* (2020/06/14)
Basic macro hotbar functionality established (writing to and reading from User.Data.Flags). Also handles the most important events to allow basic custom hotbar funtionality to be performed.

*v.0.0.1*
Initial version to attempt to display the hotbar in any fashion.

## Roadmap:
_Next major version:_
1. Add better control for location of hotbar, including full popout mode with drag and drop.
1. Add color customization options for both Core and Custom Hotbar via Color Picker library

_Future versions:_
1. Add option to unlock Custom Hotbar pages 2-5, just like Core Hotbar
1. Add ability to create multiple Custom Hotbars, not just one
1. Add ability to highlight hotbar if various flags/system values are present

_Post Foundry 0.7:_
* Use new Canvas OnDrop hook to resolve harmless error when dropping onto Canvas from Custom Hotbar.
