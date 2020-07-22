import { CustomHotbarPopulator }  from './custom-hotbar-populator.js';
import { CustomHotbar }  from './custom-hotbar.js';
import { CustomHotbarSettings } from './custom-hotbar-settings.js';

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

  //apply settings styles, first for custom hotbar, then for core hotbar
  //For each setting, use flag if present, otherwise use game setting.

   var css =
      '#custom-hotbar' 
    + ` { bottom: ${CustomHotbarSettings.getCHBYPos()}px; ` 
    + `   left: ${CustomHotbarSettings.getCHBXPos()}px; `
    + ' }'

    + '#custom-hotbar #custom-macro-list' 
    + ` {` 
    + `   border: 1px solid ${CustomHotbarSettings.getCHBBorderColor()};`
    + ' }'
    
    + '#custom-hotbar .bar-controls' 
    + ` { background: ${CustomHotbarSettings.getCHBPrimaryColor()};` 
    + `   border: 1px solid ${CustomHotbarSettings.getCHBBorderColor()};`
    + ' }'

    + '#custom-hotbar .macro' 
    + ` { background: ${CustomHotbarSettings.getCHBPrimaryColor()};` 
    + `   border: 1px solid ${CustomHotbarSettings.getCHBBorderColor()};`
    + ' }'

    + '#custom-hotbar .macro.active:hover' 
    + ' {' 
    + `     border: 1px solid ${CustomHotbarSettings.getCHBBorderColorActive()};`
    + ' }'

    + '#custom-hotbar .macro.inactive:hover' 
    + ' {' 
    + `     border: 1px solid ${CustomHotbarSettings.getCHBBorderColorInactive()};`
    + ' }'



    + '#hotbar' 
    + ` { bottom: ${CustomHotbarSettings.getCoreYPos()}px; ` 
    + `   left: ${CustomHotbarSettings.getCoreXPos()}px; `
    + ' }'

    + '#hotbar #custom-macro-list' 
    + ` {` 
    + `   border: 1px solid ${CustomHotbarSettings.getCoreBorderColor()};`
    + ' }'
    
    + '#hotbar .bar-controls' 
    + ` { background: ${CustomHotbarSettings.getCorePrimaryColor()};` 
    + `   border: 1px solid ${CustomHotbarSettings.getCoreBorderColor()};`
    + ' }'

    + '#hotbar .macro' 
    + ` { background: ${CustomHotbarSettings.getCorePrimaryColor()};` 
    + `   border: 1px solid ${CustomHotbarSettings.getCoreBorderColor()};`
    + ' }'

    + '#hotbar .macro.active:hover' 
    + ' {' 
    + `     border: 1px solid ${CustomHotbarSettings.getCoreBorderColorActive()};`
    + ' }'

    + '#hotbar .macro.inactive:hover' 
    + ' {' 
    + `     border: 1px solid ${CustomHotbarSettings.getCoreBorderColorInactive()};`
    + ' }'
  , head = document.head || document.getElementsByTagName('head')[0]
  , style = document.createElement('style');

  head.appendChild(style);

  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));

  ui.hotbar.render();
  Array.from(document.getElementsByClassName("macro")).forEach(function (element) {
    element.ondragstart = ui.hotbar._onDragStart;
    element.ondragend = ui.hotbar._onDrop;
  });

  await ui.customHotbar.render(true, obj);

  window.addEventListener('keydown', (e) => {
    console.debug(`Custom Hotbar | Event keycode is ${e.which}`);
    
    //add Shift-digit keybinding to fire macros on Custom Hotbar
    if( (48 <= e.which && e.which <= 57)  && e.shiftKey && !e.ctrlKey && chbKeyEnabled) {
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
  
    //add ctrl-digit keybinding to change macro page
    if( (49 <= e.which && e.which <= 53)  && e.ctrlKey && e.shiftKey && hotbarPageKeyEnabled) {
      //when pages added to Custom Hotbar, extend to captuer 6-10 presses to change that page also?
      const num = parseInt(e.code.slice(e.code.length -1));
      console.debug(`Custom Hotbar | You pressed control and shift and ${num} on a ${e.target.tagName}`);
      //disable firing macro on keystrokes meant to enter text
      if (e.target.tagName == "INPUT" || e.target.tagName == "TEXTAREA") {
        console.debug("Custom Hotbar | Preventing keybind, invalid target.");
        return;
      }
      //translate valid keypress into core hotbar page change
      console.debug(`Custom Hotbar | Attempting to set page to ${num}`);
      ui.hotbar.page=num;
      ui.hotbar.render();
      return false;
    }
  });
}

Hooks.on("init", async () => {
  CONFIG.ui.hotbar = class extends Hotbar {
    _onDragStart(...arg) {
      document.getElementsByClassName("tooltip")[0].style.display = "none";
      super._onDragStart(...arg);
    }
  };
});

Hooks.once("renderHotbar", async () => {

  await customHotbarInit();

});

Hooks.on("renderHotbar", async () => {
  console.debug("Custom Hotbar | The core hotbar just rendered!");
});

Hooks.on("renderCustomHotbar", async () => {
  console.debug("Custom Hotbar | The custom hotbar just rendered!");
});


Hooks.once('ready', () => {
  //triple-check to make sure something didn't go horribly wrong with Lib Color Picker 
  //The built-in backup library should handle most cases though
  try{window.Ardittristan.ColorSetting.tester} catch {
      ui.notifications.notify('Something went wrong with the "lib - ColorSettings" module. Please verify you have the latest version installed.', "error", {permanent: true});
  }

  //make sure that the init was called if renderHotbar hook failed to trigger properly
  //A workaround for Firefox compatibility currently while keeping PopOut module compatibility.
  let hotbarTest = ui.hotbar;
  let chbTest = ui.CustomHotbar;  
  console.debug("Custom Hotbar | hotbarTest and chbTest?");
  console.debug(hotbarTest);
  console.debug(chbTest);

 
  if ( hotbarTest && !chbTest ) {
    customHotbarInit();
  }


});


Hooks.on("renderSettingsConfig", async () => {
  //add CSS ids and classes to CustomHotbar settings section for styling
  let settingsDiv = document.getElementById("client-settings");
  
  let chbSetDiv = $( `#${settingsDiv.id} div h2.module-header:contains("Custom Hotbar")` ).next();
  $(chbSetDiv).addClass('chb-setting');
  $(chbSetDiv).addClass('chb-global');
  $(chbSetDiv).attr('id', 'chbSetDiv');
  
  let coreSetDiv = $(chbSetDiv).next();
  $(coreSetDiv).addClass('chb-setting');
  $(coreSetDiv).addClass('chb-global');
  $(coreSetDiv).attr('id', 'coreSetDiv');

  let chbFlagDiv = $(coreSetDiv).next();
  $(chbFlagDiv).addClass('chb-setting');
  $(chbFlagDiv).addClass('chb-user');
  $(chbFlagDiv).attr('id', 'chbFlagDiv');
  
  let coreFlagDiv = $(chbFlagDiv).next();
  $(coreFlagDiv).addClass('chb-setting');
  $(coreFlagDiv).addClass('chb-user');
  $(coreFlagDiv).attr('id', 'coreFlagDiv');
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
*/