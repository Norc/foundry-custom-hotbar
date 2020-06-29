class CustomHotbar extends Hotbar {
    //copied from foundy.js line 21117 on 20200611
	constructor(options) {
        super(options);
        game.macros.apps.push(this);
      /**
       * The currently viewed macro page
       * @type {number}
       */
      this.page = 1;
      /**
       * The currently displayed set of macros
       * @type {Array}
       */
      this.macros = [];
      /**
       * Track collapsed state
       * @type {boolean}
       */
      this._collapsed = false;
      /**
       * Track which hotbar slot is the current hover target, if any
       * @type {number|null}
       */
      this._hover = null;
    }
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "custom-hotbar",
      template: "modules/custom-hotbar/templates/customHotbar.html",
      popOut: false,
      //optional disable drag start entirely:
      //dragDrop: [{ dragSelector: null, dropSelector: "#custom-macro-list" }]
      dragDrop: [{ dragSelector: ".macro", dropSelector: "#custom-macro-list" }]
    });
  }    

  
	/* -------------------------------------------- */

  /** @override */
 
  getData(options) {
    this.macros = this._getCustomMacrosByPage(this.page);
    return {
      page: this.page,
      macros: this.macros,
      barClass: this._collapsed ? "collapsed" : ""
    };
  }

  /* -------------------------------------------- */

/**
 * Get the Array of Macro (or null) values that should be displayed on a numbered page of the custom hotbar
 * @param {number} page
 * @returns {Array}
 * @private
 */

 _getCustomMacrosByPage(page) { 
  const macros = this.getCustomHotbarMacros(page);
  for ( let [i, m] of macros.entries() ) {
    m.key = i<9 ? i+1 : 0;
    m.cssClass = m.macro ? "active" : "inactive";
    m.icon = m.macro ? m.macro.data.img : null;
  }
  return macros;
 }

  _getMacrosByPage(page) {
	  return this._getCustomMacrosByPage(page);
	}

	/* -------------------------------------------- */

  /**
   * Get an Array of Macro Entities on this User's Hotbar by page
   * @param {number} page     The hotbar page number
   * @return {Array.<Object>}
   */
  getCustomHotbarMacros(page=1) {
    const macros = Array.fromRange(50).map(m => null);
    for ( let [k, v] of Object.entries(game.user.getFlag("custom-hotbar","chbMacroMap")) ) {
      macros[parseInt(k)-1] = v
    }
    const start = (page-1) * 10;
    return macros.slice(start, start+10).map((m, i) => {
      return {
        slot: start + i + 1,
        macro: m ? game.macros.get(m) : null
      };
    });
  }

	/* -------------------------------------------- */

  /**
   * Assign a Macro to a numbered custom hotbar slot between 1 and 10
   * eventually expand this to a full 50 later maybe
   * @param {Macro|null} macro  The Macro entity to assign
   * @param {number} slot       The integer Hotbar slot to fill
   * @param {number} [fromSlot] An optional origin slot from which the Macro is being shifted
   * @return {Promise}          A Promise which resolves once the User update is complete
   */
  async assignCustomHotbarMacro(macro, slot, {fromSlot=null}={}) {
    console.log("In assignCustomHotbarMarcro");
    console.log(macro);
    console.log(slot);
    console.log(fromSlot);
    if ( !(macro instanceof Macro) && (macro !== null) ) throw new Error("Invalid Macro provided");
    const chbMacros = game.user.getFlag('custom-hotbar','chbMacroMap');

    // If a slot was not provided, get the first available slot
    slot = slot ? parseInt(slot) : Array.fromRange(10).find(i => !(i in ui.CustomHotbar));
    if ( !slot ) throw new Error("No available Hotbar slot exists");
    if ( slot < 1 || slot > 10 ) throw new Error("Invalid Hotbar slot requested");

    // Update the hotbar data
    const update = duplicate(ui.CustomHotbar);
    console.log(slot);
    if ( macro ) await chbSetMacro(macro.id,slot);
    else {
      console.log('Unsetting!');
      await chbUnsetMacro(slot);
    }

    //is null handled okay?
    //if ( chbMacros[fromSlot] ) { //|| core hotbar fromSlot here) {
    console.log("Finding move origin");
    if ( fromSlot ) {
      console.log(macro);
      console.log(fromSlot);
      console.log(ui.CustomHotbar.macros);
      //not really sure why I need this -1 kludge
      console.log(ui.CustomHotbar.macros[fromSlot-1].macro);
      console.log(ui.CustomHotbar.macros[fromSlot-1].macro === macro);

      //IMPROVE THIS LOGIC TO DETECT CROSS-BAR DROPS      
      if (ui.CustomHotbar.macros[fromSlot-1].macro === macro) {
        console.log("internal move detected!");
        if ( fromSlot != slot ) {
          console.log(`trying to delete slot ${fromSlot} in CustomHotbar`);
          await chbUnsetMacro(fromSlot);
        }
      } else {
        console.log("drop from core macro hotbar detected!");
        //game.user.assignHotbarMacro(macro, fromSlot);
      }
    } else {
      console.log("non-hotbar drop detected!");
    }
 
    ui.CustomHotbar.render();
    //new code suggested by tposney. creates hook to allow reassignment of monky hotpatch?
    Hooks.callAll("customHotbarAssignComplete");
    return update;
  };

        /* -------------------------------------------- */
  /**
   * Collapse the ui.CustomHotbar, minimizing its display.
   * @return {Promise}    A promise which resolves once the collapse animation completes
   */
  async collapse() {
    if ( this._collapsed ) return true;
    const toggle = this.element.find("#custom-bar-toggle");
    const icon = toggle.children("i");
    const bar = this.element.find("#custom-action-bar");
    return new Promise(resolve => {
      bar.slideUp(200, () => {
        bar.addClass("collapsed");
        icon.removeClass("fa-caret-down").addClass("fa-caret-up");
        this._collapsed = true;
        resolve(true);
      });
    });
  }
  
 	/* -------------------------------------------- */
  /**
   * Expand the CustomHotbar, displaying it normally.
   * @return {Promise}    A promise which resolves once the expand animation completes
   */
  expand() {
    if ( !this._collapsed ) return true;
    const toggle = this.element.find("#custom-bar-toggle");
    const icon = toggle.children("i");
    const bar = this.element.find("#custom-action-bar");
    return new Promise(resolve => {
      bar.slideDown(200, () => {
        bar.css("display", "");
        bar.removeClass("collapsed");
        icon.removeClass("fa-caret-up").addClass("fa-caret-down");
        this._collapsed = false;
        resolve(true);
      });
    });
  } 

  /* -------------------------------------------- */

  /**
   * Create a Context Menu attached to each Macro button
   * @param html
   * @private
   */
  _contextMenu(html) {
    new ContextMenu(html, ".macro", [
      {
        name: "Edit",
        icon: '<i class="fas fa-edit"></i>',
        condition: li => {
          const macro = game.macros.get(li.data("macro-id"));
          return macro ? macro.owner : false;
        },
        callback: li => {
          const macro = game.macros.get(li.data("macro-id"));
          macro.sheet.render(true);
        }
      },
      {
        name: "Remove",
        icon: '<i class="fas fa-times"></i>',
        callback: li => {
            ui.CustomHotbar.assignCustomHotbarMacro(null, li.data("slot"));
      }
      },
      {
        name: "Delete",
        icon: '<i class="fas fa-trash"></i>',
        condition: li => {
          const macro = game.macros.get(li.data("macro-id"));
          return macro ? macro.owner : false;
        },
        callback: li => {
          const macro = game.macros.get(li.data("macro-id"));
          Dialog.confirm({
            title: `${game.i18n.localize("MACRO.Delete")} ${macro.name}`,
            content: game.i18n.localize("MACRO.DeleteConfirm"),
            yes: macro.delete.bind(macro)
          });
        }
      },
    ]);
  }

  	/* -------------------------------------------- */
  /*  Event Listeners and Handlers
	/* -------------------------------------------- */
  /** @override */
    activateListeners(html) {
    super.activateListeners(html);
    // Macro actions
    html.find('#custom-bar-toggle').click(this._onToggleBar.bind(this));
    //html.find("#custom-macro-directory").click(ev => ui.macros.renderPopout(true));
    //    Disable pages for now, will just work with first page.
    //    html.find(".page-control").click(this._onClickPageControl.bind(this));
    // Activate context menu
    //ui.CustomHotbar._contextMenu(html);
  }

  /** @override */
  async _onDrop(event) {
    event.preventDefault();
    console.log("custom-hotbar drop detected!");
    // Try to extract the data
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData('text/plain'));
    }
    catch (err) { return }

    // Get the drop target
    const li = event.target.closest(".macro");

    // Allow for a Hook function to handle the event
    let customSlot = li.dataset.slot;

    //If needed, temporarily hijack assignHotbarMacro to trick core/modules to auto-create macros for CustomHotbar instead
    //only needs to be done when dropping an item onto the Custom Hotbar.
    //revert once assign custom macro complete
    console.log(data.type);
    if (data.type == "Item") {
      console.log("Attempting monkey hotpatch!");
      let coreAssignHotbarMacro = game.user.assignHotbarMacro;
      game.user.assignHotbarMacro = this.assignCustomHotbarMacro; 
      Hooks.once("customHotbarAssignComplete", () => game.user.assignHotbarMacro = coreAssignHotbarMacro);
    }
  
    //does this need to be set to false when done?
    if ( await Hooks.call("hotbarDrop", this, data, customSlot) === undefined ) {
      //add secondary call here for MQoL/Better rolls? "if _hooks.hotbarDrop or HotbarHandler something something?"
      //issue appears to be with code in area of line 50-70 of MQoL 
      console.log("hotbarDrop not found, reverting monkey hotpatch!")
      game.user.assignHotbarMacro = coreAssignHotbarMacro; 
      return; 
    } else {
      console.log("hotbarDrop true");
    }
 
    // Only handles Macro drops
    const macro = await this._getDropMacro(data);
    if ( macro ) {
      console.log("macro provided:");
      console.log(macro);
      console.log("fromSlot:")
      console.log(data.slot);
      //attempted bugfix?
      if (game.user.assignHotbarMacro === this.assignCustomHotbarMacro) {
        console.log("monkey hotpatch active");
        await game.user.assignHotbarMacro(macro, customSlot, {fromSlot: data.slot});
      } else {
        console.log("monkey hotpatch NOT active");
        await this.assignCustomHotbarMacro(macro, customSlot, {fromSlot: data.slot});
      }
    }
  }

  /* -------------------------------------------- */

  /**
   * Handle left-click events to
   * @param event
   * @private
   */
  async _onClickMacro(event) {
    event.preventDefault();
    const li = event.currentTarget;

    // Case 1 - create a new Macro
    if ( li.classList.contains("inactive") ) {
      const macro = await Macro.create({name: "New Macro", type: "chat", scope: "global"});
      await ui.CustomHotbar.assignCustomHotbarMacro(macro, li.dataset.slot);
      macro.sheet.render(true);
    }

    // Case 2 - trigger a Macro
    else {
      const macro = game.macros.get(li.dataset.macroId);
      return macro.execute();
    }
  }

  /**
   * Get the Macro entity being dropped in the customHotbar. If the data comes from a non-World source, create the Macro
   * @param {Object} data             The data transfer attached to the DragEvent
   * @return {Promise<Macro|null>}    A Promise which returns the dropped Macro, or null
   * @private
   */
  async _getDropMacro(data) {
    console.log("in _getDropMacro");
    console.log(data);
    if ( data.type !== "Macro" ) return null;

    // Case 1 - Data explicitly provided (but no ID)
    if ( data.data && !data.id ) {
      return await Macro.create(data.data);
    }

    // Case 2 - Imported from a Compendium pack
    else if ( data.pack ) {
      const createData = await game.packs.get(data.pack).getEntry(data.id);
      return Macro.create(createData);
    }

    // Case 3 - Imported from a World ID
    else {
      return game.macros.get(data.id);
    }
  }
}



//does this even work with Custom Hotbar disabled? it does not seem to for core Hotbar when Custom Hotbar is on.
  /* -------------------------------------------- */

  /**
   * Handle DELETE Keypress Events
   * @param {KeyboardEvent} event     The originating keyboard event
   * @param {boolean} up              Is the key being released?
   * @param {Object} modifiers        The identified modifiers attached to this keypress
   * @private
   */
 /*
   _onDelete(event, up, modifiers) {
    if ( this.hasFocus ) return;
    event.preventDefault();

    // Remove hotbar Macro
    if ( ui.hotbar._hover ) this.assignHotbarMacro(null, ui.hotbar._hover);
//??    if ( ui.CustomHotbar._hover ) this.assignCustomHotbarMacro(null, ui.CustomHotbar._hover);

    // Delete placeables from Canvas layer
    else if ( canvas.ready && ( canvas.activeLayer instanceof PlaceablesLayer ) ) {
      return canvas.activeLayer._onDeleteKey(event);
    }
  }
*/  

  
let chbMacroMap = [];

async function customHotbarInit() { 
  const flags = chbGetMacros();
  if (!flags) {
    // ensure flag has a value
    await chbResetMacros();
  }
  ui.CustomHotbar = new CustomHotbar();
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
  //if(!game.user.getFlag("custom-hotbar","chbMacroMap")) game.user.setFlag("custom-hotbar","chbMacroMap", chbMacroMap);
  tempFlag = game.user.getFlag("custom-hotbar","chbMacroMap");
  for (i=1; i <= 10; i++) {
    chbMacroMap[i] = tempFlag[i];
  }
  await ui.CustomHotbar.getCustomHotbarMacros(1);
  await ui.CustomHotbar.render(true, obj);
}

function chbGetMacros() {
  return game.user.getFlag('custom-hotbar', 'chbMacroMap');
}

async function chbSetMacro(ID,slot) {
  //final format: slot: 1, macro: null, key: 1, cssClass: "inactive", icon: "null")
  //only need to set macro ID for slot number
  console.log(slot);
  console.log(ID);
  chbMacroMap[slot]=ID;
  await game.user.unsetFlag('custom-hotbar','chbMacroMap');
  await game.user.setFlag('custom-hotbar', 'chbMacroMap', chbMacroMap);
  await ui.CustomHotbar.render();
}

async function chbSetMacros(macros) {
  /**
   * !
   * ! Assumes a single page custom hotbar with slots 1-10
   * !
   */
  for(let slot = 1; slot < 11; slot++) {
    chbMacroMap[slot]=macros[slot];
  }
  await game.user.unsetFlag('custom-hotbar','chbMacroMap');
  await game.user.setFlag('custom-hotbar', 'chbMacroMap', chbMacroMap);
  await ui.CustomHotbar.render();
}

async function chbUnsetMacro(slot) {
  //unset all custom hotbar flags
  chbMacroMap[slot]=null;
  await game.user.setFlag('custom-hotbar', 'chbMacroMap', chbMacroMap);
}

async function chbResetMacros() {
  //unset all custom hotbar flags
  await game.user.unsetFlag('custom-hotbar','chbMacroMap');
  return game.user.setFlag('custom-hotbar', 'chbMacroMap', []);
}

async function chbItemToMacro(item) {
  const command = `MinorQOL.doRoll(event, "${item.name}", {type: "${item.type}", versatile: false});`;
  let macro = game.macros.entities.find(m => m.name.startsWith(item.name)  &&  m.data.command === command);
  if (!macro) {
      console("attempting to create macro");
      macro = await Macro.create({
          name: `${item.name} - ${item.type}`,
          type: "script",
          img: item.img,
          command: command,
          flags: { "dnd5e.itemMacro": true }
      }, { displaySheet: false });
  }
  console.log(macro);
  return macro;
}

window.addEventListener('keypress', (e)=>{
  if( (48 <= e.which <=57)  && e.shiftKey) { 
    console.log("You pressed shift and:");
    //translate keypress into slot number
    const num = parseInt(e.code.slice(e.code.length -1));
    const slot = ui.CustomHotbar.macros.find(m => m.key === num);
    if ( ui.CustomHotbar.macros[num] ) slot.macro.execute();
    //not sure what to do here
    //this._handled.add(modifiers.key);
   }
});

Hooks.on("ready", async () => {
  customHotbarInit();
});

Hooks.on("renderCustomHotbar", async () => {
  console.log("The custom hotbar just rendered!");
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