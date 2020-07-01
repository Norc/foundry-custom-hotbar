class CustomHotbarPopulator {
    constructor() { 
        this.macroMap = this.chbGetMacros();
    }

    /**
     * Returns all CustomHotbar macros
     * @return {string[]} [slot]: macroId
     */
    chbGetMacros() {
        return game.user.getFlag('custom-hotbar', 'chbMacroMap') || [];
    }

    /**
     * Set or replace a macro on one of the custom hotbar slots.
     * @param {string} macroId
     * @param {number} slot 
     * @return {Promise<unknown>} Promise indicating whether the macro was set and the hotbar was rendered.
     */
    async chbSetMacro(macroId, slot) {
        console.debug("Custom Hotbar |", "Setting macro", slot, macroId);
        chbMacroMap[slot] = macroId;
        await game.user.unsetFlag('custom-hotbar', 'chbMacroMap');
        await game.user.setFlag('custom-hotbar', 'chbMacroMap', chbMacroMap);
        return ui.CustomHotbar.render();
    }

    /**
     * Replace all custom hotbar slots.
     * @param {string[]} macros ([slot]: macroId)
     * @return {Promise<unknown>} Promise indicating whether the macros were set and the hotbar was rendered.
     */
    async chbSetMacros(macros) {
        /**
         * !
         * ! Assumes a single page custom hotbar with slots 1-10
         * !
         */
        for (let slot = 1; slot < 11; slot++) {
            chbMacroMap[slot] = macros[slot];
        }
        await game.user.unsetFlag('custom-hotbar', 'chbMacroMap');
        await game.user.setFlag('custom-hotbar', 'chbMacroMap', chbMacroMap);
        return ui.CustomHotbar.render();
    }

    /**
     * Remove the macro from the custom hotbar slot.
     * @param {number} slot
     * @return {Promise<unknown>} Promise indicating whether the macro was removed.
     */
    chbUnsetMacro(slot) {
        chbMacroMap[slot] = null;
        return game.user.setFlag('custom-hotbar', 'chbMacroMap', chbMacroMap);
    }

    /**
     * Remove all macros from the custom hotbar.
     * @return {Promise<unknown>} Promise indicating whether the macros were removed.
     */
    async chbResetMacros() {
        await game.user.unsetFlag('custom-hotbar', 'chbMacroMap');
        return game.user.setFlag('custom-hotbar', 'chbMacroMap', []);
    }

    // TODO: does this belong here?
    /**
     * Convert an item to a macro.
     * @param { { name: string, type: string, img: string } } item 
     * @return {Macro} The existing macro, if one was already created for this item before.
     *                 Otherwise a new macro.
     */
    async chbItemToMacro(item) {
        const command = `MinorQOL.doRoll(event, "${item.name}", {type: "${item.type}", versatile: false});`;
        let macro = game.macros.entities.find(m => m.name.startsWith(item.name) && m.data.command === command);
        if (!macro) {
            console.debug("Custom Hotbar |", "attempting to create macro", item);
            macro = await Macro.create({
                name: `${item.name} - ${item.type}`,
                type: "script",
                img: item.img,
                command: command,
                flags: { "dnd5e.itemMacro": true }
            }, { displaySheet: false });
        }
        console.debug("Custom Hotbar |", "Item to Macro", item, macro);
        return macro;
    }
}