import { CustomHotbarPopulator }  from './custom-hotbar-populator.js';
import { CustomHotbar }  from './custom-hotbar.js';
//import { HotbarPlus } from './hotbar-plus.js';

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

  //ui.hotbar = new HotbarPlus(); 
  ui.hotbar.render();
  Array.from(document.getElementsByClassName("macro")).forEach(function (element) { 
    element.ondragstart = ui.hotbar._onDragStart;
    element.ondragend = ui.hotbar._onDrop;
  }); 

/*
  for (item of document.getElementsByClassName("macro")) {
    item.ondragstart = ui.hotbar._onDragStart;
  }
*/
  ui.CustomHotbar.render(true, obj);
}

Hooks.on("init", async () => {
  CONFIG.ui.hotbar = class HotbarPlus extends Hotbar {
    _onDragStart(...arg) {
      document.getElementsByClassName("tooltip")[0].style.display = "none";
      super._onDragStart(...arg);
    }
  };
});

Hooks.on("ready", async () => {
  await customHotbarInit();

  window.addEventListener('keydown', (e) => {
    if( (48 <= e.which <=57)  && e.shiftKey) {
      const num = parseInt(e.code.slice(e.code.length -1));
      console.debug(`Custom Hotbar | You pressed shift and ${num} on a ${e.target.tagName}`);
      //disable firing macro on keystrokes meant to enter text
      if (e.target.tagName == "INPUT" || e.target.tagName == "TEXTAREA") {
        console.debug("Custom Hotbar | Preventing keybind, invalid target.");
        return;
      }
      //translate valid keypress into slot number
      const slot = ui.CustomHotbar.macros.find(m => m.key === num);
      if ( ui.CustomHotbar.macros[num] ) slot.macro.execute();
      return false;
    }
  });

});

Hooks.on("renderCustomHotbar", async () => {
  console.debug("Custom Hotbar | The custom hotbar just rendered!");
  // console.log(chbMacroMap);
});


/* NOTE: ERRORS/ISSUES WITH CORE HOTBAR (LOL, SHRUG)
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


//ROADMAP
//Color and position settings
//multiple hotbars

//CODE REFACTORING
//comment/dead code cleanup
//make sure CustomHotbar (case) is only used in Object Type Name.
*/
