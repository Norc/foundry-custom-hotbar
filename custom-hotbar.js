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
      template: "modules/custom-hotbar/templates/CustomHotbar.html",
      popOut: false,
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
    if ( !(macro instanceof Macro) && (macro !== null) ) throw new Error("Invalid Macro provided");

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
//      update.macros[`-=${slot}`] = null;
    }
/*disabled case for now due to UI limitation
    if ( fromSlot && (fromSlot in ui.CustomHotbar) ) {
      delete update.macros[fromSlot];
      update.macros[`-=${fromSlot}`] = null;
    }
*/
    ui.CustomHotbar.render();
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
//          ui.CustomHotbar = this.assignCustomHotbarMacro(null, li.data("slot"));
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
//    ui.CustomHotbar._contextMenu(html);
  }

  /** @override */
  async _onDrop(event) {
    event.preventDefault();

    // Try to extract the data
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData('text/plain'));
    }
    catch (err) { return }

    // Get the drop target
    const li = event.target.closest(".macro");

    // Allow for a Hook function to handle the event
    if ( Hooks.call("customHotbarDrop", this, data, li.dataset.slot) === false ) return;

    // Only handle Macro drops
    const macro = await this._getDropMacro(data);
    if ( macro ) {
      await ui.CustomHotbar.assignCustomHotbarMacro(macro, li.dataset.slot, {fromSlot: data.slot});
      ui.CustomHotbar.render();
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

  /* -------------------------------------------- */

  /**
   * Handle number key presses
   * @param {Event} event       The original digit key press
   * @param {boolean} up        Is it a keyup?
   * @param {Object}modifiers   What modifiers affect the keypress?
   * @private
   */
/*
   _onDigit(event, up, modifiers) {
    if ( modifiers.hasFocus || up ) return;
    const num = parseInt(event.key);
//??     If (modifiers.key is not Shift) {
    const slot = ui.hotbar.macros.find(m => m.key === num);
//??     } else {    
//??     const slot = ui.CustomHotbar.macros.find(m => m.key === num);
//??     }
    if ( slot.macro ) slot.macro.execute();
    this._handled.add(modifiers.key);
  }
*/

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

  /**
   * Event handler for the drop portion of a drag-and-drop event.
   * @private
   */

   /*
   _onDrop(event) {
    event.preventDefault();

    // Try to extract the data
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData('text/plain'));
    }
    catch (err) {
      return false;
    }

    // Acquire the cursor position transformed to Canvas coordinates
    const [x, y] = [event.clientX, event.clientY];
    const t = this.stage.worldTransform;
    data.x = (x - t.tx) / canvas.stage.scale.x;
    data.y = (y - t.ty) / canvas.stage.scale.y;

    // Dropped Actor
    if ( data.type === "Actor" ) canvas.tokens._onDropActorData(event, data);
    
    // Dropped Journal Entry
    else if ( data.type === "JournalEntry" ) canvas.notes._onDropData(event, data);

    // Dropped Macro (clear slot)
    else if ( data.type === "Macro" ) {
//??      game.user.assignHotbarMacro(null, data.slot);
    }

    // Dropped Tile artwork
    else if ( data.type === "Tile" ) {
      return canvas.tiles._onDropTileData(event, data);
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

Hooks.on("ready", async () => {
  customHotbarInit();
});

Hooks.on("renderCustomHotbar", async () => {
  console.log("The custom hotbar just rendered!")
  // console.log(chbMacroMap);
  });

/*     // Allow for a Hook function to handle the event
    if ( Hooks.call("hotbarDrop", this, data, li.dataset.slot) === false ) return;
*/

Hooks.on("customHotbarDrop", async () => {
  console.log("Calling custom hotbar drop");
    // Only handle Macro drops
    const macro = await ui.CustomHotbar._getDropMacro(data);
    if ( macro ) {
      await ui.CustomHotbar.assignCustomHotbarMacro(macro, li.dataset.slot, {fromSlot: data.slot});
      ui.CustomHotbar.render();
    }
  chbGetMacros.SetMacro(li.dataset.slot, this.ID)
  });

//TO DO get customHotbarDrop Hook to work