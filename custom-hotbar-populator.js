export class CustomHotbarPopulator {
    constructor() { 
        this.macroMap = this.chbGetMacros();
    }

    
    //TO DO: Create single chbGetMacro function for completeness and convenience.
    
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
        this.macroMap[slot] = macroId;
        await this._updateFlags();
        return ui.customHotbar.render();
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
            this.macroMap[slot] = macros[slot];
        }
        await this._updateFlags();
        return ui.customHotbar.render();
    }

    /**
     * Remove the macro from the custom hotbar slot.
     * @param {number} slot
     * @return {Promise<unknown>} Promise indicating whether the macro was removed.
     */
    chbUnsetMacro(slot) {
        this.macroMap[slot] = null;
        return this._updateFlags();
    }

    /**
     * Remove all macros from the custom hotbar.
     * @return {Promise<unknown>} Promise indicating whether the macros were removed.
     */
    chbResetMacros() {
        this.macroMap = [];
        return this._updateFlags();
    }

    async _updateFlags() {
        await game.user.unsetFlag('custom-hotbar', 'chbMacroMap');
        return game.user.setFlag('custom-hotbar', 'chbMacroMap', this.macroMap);
    }
}
