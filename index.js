import { CustomHotbarPopulator }  from './custom-hotbar-populator.js';
import { CustomHotbar }  from './custom-hotbar.js';
import { HotbarPlus } from './hotbar-plus.js';

async function customHotbarInit() {
  console.debug("Custom Hotbar | Initializing...");
  window.CustomHotbar = new CustomHotbarPopulator();
  ui.CustomHotbar = new CustomHotbar(window.CustomHotbar);
  ui.CustomHotbar.macros = ui.CustomHotbar.getData();
  let obj = {
      left: 100,
      top: 100,
      width: 502,
      height: 52,
      scale: 1.0,
      log: true,
      renderContext: "custom-hotbar",
      renderData: "init"
  };
  //Not sure why this ISN'T needed?
  //await ui.CustomHotbar.getCustomHotbarMacros(1);

  ui.hotbar = new HotbarPlus(); 
  ui.hotbar.render();
  ui.CustomHotbar.render(true, obj);
}

//        html.find('.macro').dragstart(this._onDragStart.bind(this));

Hooks.on("ready", async () => {
  await customHotbarInit();

  window.addEventListener('keypress', (e) => {
    if( (48 <= e.which <=57)  && e.shiftKey) { 
      //translate keypress into slot number
      const num = parseInt(e.code.slice(e.code.length -1));
      console.log("Custom Hotbar | You pressed shift and:", num);
      const slot = ui.CustomHotbar.macros.find(m => m.key === num);
      if ( ui.CustomHotbar.macros[num] ) slot.macro.execute();
      //not sure what to do here
      //this._handled.add(modifiers.key);
    }
  });
});

Hooks.on("renderCustomHotbar", async () => {
  console.debug("Custom Hotbar | The custom hotbar just rendered!");
  // console.log(chbMacroMap);
});


/*ERRORS/ISSUES WITH CORE (LOL, SHRUG)
0.6.4, DND 5E 0.93 (ALL MODS DISABLED)

1. file directory to canvas: 
foundry.js:29725 Uncaught (in promise) Error: No available Hotbar slot exists
at User.assignHotbarMacro (foundry.js:29725)
at Canvas._onDrop (foundry.js:11425)
at DragDrop.callback (foundry.js:13785)
at DragDrop._handleDrop (foundry.js:13836)

2. Macro execute for spell, than cancel : uncaught in promise, 5e error?)

3. Drag macro onto itself, it is removed

4. Sometimes when you drag off of core, a ghost set of slots to left and right of core slot is grabbed also. Seems to happen if you click near a border between macro slots.



//TO DO for 1.5:
//1. edge case when copying from core to custom hotbars (drag and drop straight up, or within 1 slot of either direction, fails to trigger drop event 99% of the time)
      // No idea why the hotbar drop isn't DETECTED AT ALL.  

//2. edge case where if you drag from Custom onto Core, and you have a Core macro in same slot, the core slot is incorrectly blanked.
      //must be somehow passing a fromSlot to the core assignHotbarMacro somehow.

//3. Dropping onto canvas from customHotbar blanks the slot in the core hotbar (which makes sense)
    //hook pre-delete regualar hotbar macro to deal with canvas drop? Or make the drop handler ONLY handle dropping onto Core or Custom hotbar maybe, if possible?
    //otherwise just wait for 0.7....


//Milestones Future:
//delete hover?

//CODE REFACTORING?
//build global scope functions into class?
//make sure CustomHotbar (case) is only used in Object Type Name.
//make macroMap named customHotbar, and make it an object instead of an array?
//renumber custom hotbar slots to +100 per bar?
*/
