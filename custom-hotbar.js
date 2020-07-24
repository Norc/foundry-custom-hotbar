export class CustomHotbar extends Hotbar {
    /**
     * @param {CustomHotbarPopulator} populator
     * @param {*} options 
     */
  constructor(populator, options) {
    super(Hotbar);
    //super(options);
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

    /**
     * 
     */
    this.customMacros = [];

    /**
     * 
     */
    this.populator = populator;
  }
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "custom-hotbar",
      template: "modules/custom-hotbar/templates/customHotbar.html",
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
    for ( let [k, v] of Object.entries(this.populator.chbGetMacros())) {
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
    console.debug("Custom Hotbar | assignCustomHotbarMarcro", macro, slot, fromSlot);
    if ( !(macro instanceof Macro) && (macro !== null) ) throw new Error("Invalid Macro provided");
    // const chbMacros = this.populator.chbGetMacros();

    // If a slot was not provided, get the first available slot
    slot = slot ? parseInt(slot) : Array.fromRange(10).find(i => !(i in ui.customHotbar));
    if ( !slot ) throw new Error("No available Hotbar slot exists");
    if ( slot < 1 || slot > 10 ) throw new Error("Invalid Hotbar slot requested");

    // Update the hotbar data
    const update = duplicate(ui.customHotbar);
    console.debug("Custom Hotbar |", slot);
    if ( macro ) await this.populator.chbSetMacro(macro.id,slot);
    else {
      console.debug('Custom Hotbar | Unsetting!');
      await this.populator.chbUnsetMacro(slot);
    }

    //functional but needs cleanup
    console.debug("Custom Hotbar | Finding move origin");
    if ( fromSlot ) {
      console.debug("Custom Hotbar |", ui.customHotbar.macros);
      console.debug("Custom Hotbar |", ui.customHotbar.macros[fromSlot-1]?.macro, ui.customHotbar.macros[fromSlot-1]?.macro === macro);
     
      if (ui.customHotbar.macros[fromSlot-1]?.macro === macro) {
        console.debug("Custom Hotbar | internal move detected!");
        if ( fromSlot != slot ) {
          console.debug(`Custom Hotbar | trying to delete slot ${fromSlot} in CustomHotbar`);
          await this.populator.chbUnsetMacro(fromSlot);
        }
      } else {
        console.debug("Custom Hotbar | drop from core macro hotbar detected!");
      }
    } else {
      console.debug("Custom Hotbar | non-hotbar drop detected!");
    }
 
    ui.customHotbar.render();
    //code suggested by tposney. creates hook to allow reassignment of monky hotpatch
    Hooks.callAll("customHotbarAssignComplete");
    return update;
  };

        /* -------------------------------------------- */
  /**
   * Collapse the ui.customHotbar, minimizing its display.
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
            ui.customHotbar.assignCustomHotbarMacro(null, li.data("slot"));
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
    //event.preventDefault();
    super.activateListeners(html);
    html.find('#custom-bar-toggle').click(this._onToggleBar.bind(this));
    //    Disable pages for now, will just work with first page.
    //    html.find(".page-control").click(this._onClickPageControl.bind(this));
  }

  /** @override */
  async _onDrop(event) {
    event.preventDefault();
    console.debug("Custom Hotbar | custom-hotbar drop detected!");
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
    console.debug("Custom Hotbar | Dropped type:", data.type);
    if (data.type == "Item" || data.type =="RollTable") {
      console.debug("Custom Hotbar | Attempting monkey hotpatch!");
      let coreAssignHotbarMacro = game.user.assignHotbarMacro;
      game.user.assignHotbarMacro = this.assignCustomHotbarMacro.bind(this); 
      Hooks.once("customHotbarAssignComplete", () => game.user.assignHotbarMacro = coreAssignHotbarMacro);
    }
  
    //does this need to be set to false when done?
    if ( await Hooks.call("hotbarDrop", this, data, customSlot) === undefined ) {
      console.debug("Custom Hotbar | hotbarDrop not found, reverting monkey hotpatch!")
      game.user.assignHotbarMacro = coreAssignHotbarMacro; 
      return; 
    } else {
      console.debug("Custom Hotbar | hotbarDrop true");
    }
 
    // Only handles Macro drops
    const macro = await this._getDropMacro(data);
    if ( macro ) {
      console.debug("Custom Hotbar | macro provided:", macro, "fromSlot", data.customSlot);
      console.debug("Custom Hotbar | monkey hotpatch?", game.user.assignHotbarMacro === this.assignCustomHotbarMacro);
        await this.assignCustomHotbarMacro(macro, customSlot, {fromSlot: data.customSlot});
    }
  }

  /* -------------------------------------------- */

  /**
   * Handle left-click events too
   * @param event
   * @private
   */
  async _onClickMacro(event) {
    console.debug("custom macro click detected!");

    event.preventDefault();
    const li = event.currentTarget;

    // Case 1 - create a new Macro
    if ( li.classList.contains("inactive") ) {
      const macro = await Macro.create({name: "New Macro", type: "chat", scope: "global"});
      await ui.customHotbar.assignCustomHotbarMacro(macro, li.dataset.slot);
      macro.sheet.render(true);
    }

    // Case 2 - trigger a Macro
    else {
      const macro = game.macros.get(li.dataset.macroId);
      return macro.execute();
    }
  }

  /* -------------------------------------------- */

  /** @override */
  _onDragStart(event) {
    //hide tooltip so it doesn't get in the way
    console.debug("Custom Hotbar | Attempting to hide tooltip.");
    document.getElementsByClassName("tooltip")[0].style.display = "none";

    const li = event.currentTarget.closest(".macro");
    if ( !li.dataset.macroId ) return false;
    const dragData = { type: "Macro", id: li.dataset.macroId, customSlot: li.dataset.slot };
    event.dataTransfer.setData("text/plain", JSON.stringify(dragData));
  }





  /**
   * Get the Macro entity being dropped in the customHotbar. If the data comes from a non-World source, create the Macro
   * @param {Object} data             The data transfer attached to the DragEvent
   * @return {Promise<Macro|null>}    A Promise which returns the dropped Macro, or null
   * @private
   */
  async _getDropMacro(data) {
    console.debug("Custom Hotbar | in _getDropMacro", data);
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

  /* -------------------------------------------- */

  /**
   * Handle hover events on a macro button to track which slot is the hover target
   * @param {Event} event   The originating mouseover or mouseleave event
   * @private
   */
    /** @override */
  _onHoverMacro(event) {
    event.preventDefault();
    const li = event.currentTarget;
    const hasAction = !li.classList.contains("inactive");

    // Remove any existing tooltip
    const tooltip = li.querySelector(".tooltip");
    if ( tooltip ) li.removeChild(tooltip);

    // Handle hover-in
    if ( event.type === "mouseenter" ) {
      console.debug("Custom Hotbar | Macro tooltip override fired!");
      this._hover = li.dataset.slot;
      if ( hasAction ) {
        const macro = game.macros.get(li.dataset.macroId);
        const tooltip = document.createElement("SPAN");
        tooltip.classList.add("tooltip");
        tooltip.textContent = macro.name;
        li.appendChild(tooltip);
      }
    }

    // Handle hover-out
    else {
      console.debug("Custom Hotbar | Mouse out!");
      this._hover = null;
    }
  }
}