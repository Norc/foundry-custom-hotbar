# Custom Hotbar
Foundry VTT module to add an extra functional macro hotbar above the first. 

**Features:**
• Adds easy access to 10 additional macros in a separate visual grouping
• Broad compatibility: 
  -Closely mimics built-in methods to allow modules like Minor Quality of Life to use the Custom Hotbar without specific support
  -Does not interfere with the operation of the original Macro Hotbar
• Fully system agnostic

**Changelog:**
*v0.0.5* (2020/06/14)
Basic macro hotbar functionality established (writing to and reading from User.Data.Flags. Also handles the most important events to allow basic custom hotbar funtionality to be performed.

*v.0.0.1*
Initial version to attempt to display the hotbar in any fashion.

**Roadmap:**
 • Continue to mimic regular Macro Hotbar behavior for new events
 • Minor refactoring of code and UI now that basic functionality established
 • Add keyboard shortcut support (shift-digit)
 • Add option to unlock Custom Hotbar rows 2-5
 • Investigate if renumbering slots to 101, 102, etc has any benefits
 *Post 0.7:* Use new Canvas OnDrop hook to allow starting a drag maneuver. This will allow the last missing Hotbar functionality to be added.
