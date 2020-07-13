import { CustomHotbarSettings } from './custom-hotbar-settings.js';

export class CustomHotbarSettingsForm extends FormApplication {

    constructor(object, options = {}) {
        super(object, options);
    }

    /**
    * Default Options for this FormApplication
    */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "custom-hotbar-settings-form",
            title: "Custom Hotbar Settings",
            template: "./modules/custom-hotbar/templates/customHotbarSettings.html",
            classes: ["sheet"],
            width: 500,
            closeOnSubmit: true
        });
    }

    /** 
     * Executes on form submission.
     * @param {Object} e - the form submission event
     * @param {Object} d - the form data
     *
     *  'name': entry.metadata.label+' ['+entry.metadata.package+']',
     *  'type':'pack',
     *  'submenu':submenu.toLowerCase(),
     *  'key':entry.metadata.package+'.'+entry.metadata.name
     */
    async _updateObject(e, d) {
        console.debug("Custom Hotbar | Attempting to update Custom Hotbar Form settings...");
        document.getElementById("chbPrimaryColor").value = game.settings.get("custom-hotbar", "chbPrimaryColor"); 
        document.getElementById("chbBorderColor").value = game.settings.get("custom-hotbar", "chbBorderColor");
        document.getElementById("chbBorderColorActive").value = game.settings.get("custom-hotbar", "chbBorderColorActive");
        document.getElementById("chbBorderColorInactive").value = game.settings.get("custom-hotbar", "chbBorderColorInactive");
        document.getElementById("chbXPos").value = game.settings.get("custom-hotbar", "chbXPos");
        document.getElementById("chbyPos").value = game.settings.get("custom-hotbar", "chbYPos");        
    }
    

    activateListeners(html) {
        super.activateListeners(html);
        console.debug("Custom Hotbar | Attempted to activate Settings Menu listeners");
    }
}