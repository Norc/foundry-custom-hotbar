import { CustomHotbarPopulator }  from './custom-hotbar-populator.js';
import { CustomHotbar }  from './custom-hotbar.js';
import { CustomHotbarSettings } from './custom-hotbar-settings.js';

Hooks.once('ready', () => {
    try{window.Ardittristan.ColorSetting.tester} catch {
        ui.notifications.notify('Please make sure you have the "lib - ColorSettings" module installed', "error", {permanent: true});
    }
});

async function customHotbarInit() {
  console.debug("Custom Hotbar | Initializing...");
  window.customHotbar = new CustomHotbarPopulator();
  ui.customHotbar = new CustomHotbar(window.customHotbar);
  ui.customHotbar.macros = ui.customHotbar.getData();
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



CustomHotbarSettings.register();

//apply settings styles
var css =
    '#custom-hotbar .macro' 
  + ' { background: rgba(255, 255, 255, 0.5); ' 
  + '   border: 1px solid #FFFFFFff;'
  + ' }'
  + '#custom-hotbar' 
    + ' { bottom: 0px; ' 
    + '   left: 0px;'
    + ' }',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

head.appendChild(style);

style.type = 'text/css';
style.appendChild(document.createTextNode(css));


/*var css =
  '#custom-hotbar .macro' 
    + ' { background: rgba(255, 255, 255, 0.5); ' 
    + '   bottom: 0px;'
    + '   left: 0px;'
    + ' }'*/

/*
#custom-hotbar {
  z-index: 69;
  position: fixed;
  bottom: 63px;
  left: 220px;
  width: 600px;
  height: 52px;
  box-sizing: border-box;
}

#custom-hotbar .macro {
  position: relative;
  flex: 0 0 50px;
  height: 50px;
  border: 1px solid #0000ff;
  border-radius: 3px;
  background: rgba(0, 0, 200, 0.5);
  box-shadow: 0 0 5px #000 inset;
  cursor: pointer;
}
*/

  ui.hotbar.render();
  Array.from(document.getElementsByClassName("macro")).forEach(function (element) {
    element.ondragstart = ui.hotbar._onDragStart;
    element.ondragend = ui.hotbar._onDrop;
  });

  ui.customHotbar.render(true, obj);
}

Hooks.on("init", async () => {
  CONFIG.ui.hotbar = class extends Hotbar {
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
      const slot = ui.customHotbar.macros.find(m => m.key === num);
      if ( ui.customHotbar.macros[num] ) slot.macro.execute();
      return false;
    }
  });

});

Hooks.on("renderCustomHotbar", async () => {
  ui.customHotbar.expand();
  console.debug("Custom Hotbar | The custom hotbar just rendered!");
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
//Freely draggable bar with remembered location
//multiple hotbars
*/
