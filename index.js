import { CustomHotbarPopulator }  from './scripts/custom-hotbar-populator.js';
import { CustomHotbar }  from './custom-hotbar.js';
import { CustomHotbarSettings } from './scripts/custom-hotbar-settings.js';
import { CHBDebug } from './scripts/custom-hotbar-debug.js';

async function customHotbarInit() {

  console.log("Custom Hotbar | Initializing...");
  window.customHotbar = new CustomHotbarPopulator();
  ui.customHotbar = new CustomHotbar(window.customHotbar);
  ui.customHotbar.macros = ui.customHotbar.getData();
  let obj = {
      enabled: true,
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
  

  //
  //initialize CSS variables to match current settings and user flags
  //

  //TODO: Make not store directly in document model??
  let r = document.querySelector(':root');

  r.style.setProperty('--custom-hotbar-chb-primaryColor', CustomHotbarSettings.getCHBPrimaryColor());
  r.style.setProperty('--custom-hotbar-chb-border-color', CustomHotbarSettings.getCHBBorderColor());
  r.style.setProperty('--custom-hotbar-chb-border-color-active', CustomHotbarSettings.getCHBBorderColorActive());
  r.style.setProperty('--custom-hotbar-chb-border-color-inactive', CustomHotbarSettings.getCHBBorderColorInactive());
  r.style.setProperty('--custom-hotbar-chb-x-pos', `${CustomHotbarSettings.getCHBXPos()}px`);
  r.style.setProperty('--custom-hotbar-chb-y-pos', `${CustomHotbarSettings.getCHBYPos()}px`);
 
  r.style.setProperty('--custom-hotbar-core-primaryColor', CustomHotbarSettings.getCorePrimaryColor());
  r.style.setProperty('--custom-hotbar-core-border-color', CustomHotbarSettings.getCoreBorderColor());
  r.style.setProperty('--custom-hotbar-core-border-color-active', CustomHotbarSettings.getCoreBorderColorActive());
  r.style.setProperty('--custom-hotbar-core-border-color-inactive', CustomHotbarSettings.getCoreBorderColorInactive());
  r.style.setProperty('--custom-hotbar-core-x-pos', `${CustomHotbarSettings.getCoreXPos()}px`);
  r.style.setProperty('--custom-hotbar-core-y-pos', `${CustomHotbarSettings.getCoreYPos()}px`);

  let chbDisplay = "flex"; 
  /* TODO: shouldn't this be a user flag? or a combo with a getter?? */
  if (game.settings.get("custom-hotbar","chbDisabled") === true) {
    CHBDebug('Custom Hotbar | User disabled custom hotbar.');
    chbDisplay = "none";
  }

  let coreDisplay = "flex";
  /* TODO: shouldn't this be a user flag? or a combo with a getter?? */
  if (game.settings.get("custom-hotbar","coreDisabled") === true) {
    CHBDebug('Custom Hotbar | User disabled core Foundry hotbar.');
    coreDisplay = "none";
  }

  r.style.setProperty('--custom-hotbar-chb-display', chbDisplay);
  r.style.setProperty('--custom-hotbar-core-display', coreDisplay);

  //ui.hotbar.render();
  Array.from(document.getElementsByClassName("macro")).forEach(function (element) {
    element.ondragstart = ui.hotbar._onDragStart;
    element.ondragend = ui.hotbar._onDrop;
  });

  ui.customHotbar.render(true, obj);

  
  // TODO: Register bindings for the Custom Hotbar macro slots.

  
}

Hooks.on("init", async () => {
  if( document.querySelector('#hotbar') !== null ) {
    //find core hotbar and insert div nex to it for custom-hotbar to automatically render into
    let hbEl = document.querySelector('#hotbar');
    let chbEl = document.createElement('template');
    chbEl.setAttribute('id','custom-hotbar');
    hbEl.insertAdjacentElement('beforebegin',chbEl);
    let parEl = hbEl.parentElement;
    parEl.setAttribute('id','hotbars');
  }
});

Hooks.on("renderHotbar", async () => {
  CHBDebug("Custom Hotbar | The core hotbar just rendered!");
  //Add a new event listener to core hotbar macro icons to disable tooltip display on drag start so it doesn't get in way of Custom Hotbar - Disabled
  for ( let m of document.getElementsByClassName("macro-icon") ) {
    m.addEventListener("dragstart", (event) => {
      CHBDebug('Custom Hotbar | Core Hotbar Dragged');
      CHBDebug(event);
      //document.getElementById("tooltip").style.display = "none";
    });
  }
  if ( ui.customHotbar !== undefined ) {
    ui.customHotbar.render();
  }
});

Hooks.on("renderCustomHotbar", async () => {
  CHBDebug("Custom Hotbar | The custom hotbar just rendered!");
});


Hooks.once('ready', () => {
  //triple-check to make sure something didn't go horribly wrong with Lib Color Picker 
  //The built-in backup library should handle most cases though
  try{window.Ardittristan.ColorSetting.tester} catch {
      console.log('Something went wrong with the "lib - ColorSettings" module. Please verify you have the latest version installed.', "error", {permanent: true});
  }

  CHBDebug("Custom Hotbar | Foundry setup...");

  //Check to make sure that a hotbar rendered before initilizing so that PopOut module windows do not have unwanted card hotbars.
  let hotbarTest = ui.hotbar;
  CHBDebug("Custom Hotbar | Core Foundry Hotbar Present?");
  CHBDebug(hotbarTest);
  
  if ( hotbarTest ) {
    customHotbarInit();
  }

/*
  )
  //html.find(".macro").click(this._onClickMacro.bind(this)).hover(this._onHoverMacro.bind(this));
  document.getElementById("macro-list").addEventListener("dragstart", (event) => {
    CHBDebug('Custom Hotbar | Core Hotbar Dragged');
    CHBDebug(event);
    const li = event.currentTarget.closest(".macro");
    if ( !li.dataset.macroId ) return false;
    document.getElementsByClassName("tooltip")[0].style.display = "none";
  });
*/
});


Hooks.on("renderSettingsConfig", async () => {
  //customize styling for CHB settings
    //add CSS ids and classes to CustomHotbar settings section for styling
    let chbConfigDiv = document.body.querySelector("section[data-tab='custom-hotbar']");
    chbConfigDiv.setAttribute('id','chbConfigDiv');

    let usrFirstDiv;

  //Add ids and classes for "GM only" button divs if user is GM.
  if (game.users.current.isGM === true ) {

    let chbSetDiv = chbConfigDiv.querySelector("div");
    chbSetDiv.setAttribute('id','chbSetDiv');
    
    let coreSetDiv = chbSetDiv.nextElementSibling;
    coreSetDiv.setAttribute('id','coreSetDiv');

    usrFirstDiv = coreSetDiv.nextElementSibling;
  }

  //Add ids and classes for the custom hotbar menu button divs, if it's enabled for the user
  if (game.settings.get("custom-hotbar","chbDisabled") === false) {  
    let chbFlagDiv = usrFirstDiv;
    chbFlagDiv.setAttribute('id', 'chbFlagDiv');
  }

  //Add ids and classes for the core hotbar menu button divs, if it's enabled for the user
  if (game.settings.get("custom-hotbar","coreDisabled") === false) {
    let coreFlagDiv = usrFirstDiv.nextElementSibling;
    //check to make sure that the custom hotbar is enabled and ajdust if it isn't
    if (game.settings.get("custom-hotbar","chbDisabled") === true) {
      coreFlagDiv = usrFirstDiv;      
    }
    coreFlagDiv.setAttribute('id', 'coreFlagDiv');
  }

  //Assess disable settings to help determine which div precedes Disable
  let chbDisabled = game.settings.get("custom-hotbar","chbDisabled");
  let coreDisabled = game.settings.get("custom-hotbar","coreDisabled");

  //Default case for convenience: Both are disabled
  let chbDisableDiv = usrFirstDiv;

  //Case: Core Hotbar is enabled (so state of Custom Hotbar doesn't matter)
  if ( coreDisabled === false ) chbDisableDiv = coreFlagDiv.nextElementSibling; 

  //Case: Core hotbar is disabled but Custom hotbar is not  
  if (chbDisabled === false && coreDisabled === true ) chbDisableDiv = chbFlagDiv.nextElementSibling;

  //Add ids and classes for the disable checkbox divs
  chbDisableDiv.setAttribute('id', 'chbDisableDiv');

  let coreDisableDiv = chbDisableDiv.nextElementSibling;
  coreDisableDiv.setAttribute('id', 'coreDisableDiv');

  let keyHintDiv = coreDisableDiv.nextElementSibling;
  keyHintDiv.setAttribute('id', 'keyHintDiv');
});

/* NOTE: ERRORS/ISSUES WITH CORE HOTBAR (to verify with 0.8.x and log)
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