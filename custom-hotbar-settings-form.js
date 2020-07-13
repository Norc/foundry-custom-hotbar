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

    _onLoad(){
        console.dedbug("Custom Hotbar | Hi");
    }

    getData() {
        const data = {
            chbPrimaryColor: game.settings.get("custom-hotbar", "chbPrimaryColor"), 
            chbBorderColor: game.settings.get("custom-hotbar", "chbBorderColor"),
            chbBorderColorActive: game.settings.get("custom-hotbar", "chbBorderColorActive"),
            chbBorderColorInactive: game.settings.get("custom-hotbar", "chbBorderColorInactive"),
            chbXPos: game.settings.get("custom-hotbar", "chbXPos"),
            chbYPos: game.settings.get("custom-hotbar", "chbYPos")
        };

        return data;
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
    //this is currently defined for an onload not a submit...
    async _updateObject(e, d) {
        console.debug("Custom Hotbar | Attempting to update Custom Hotbar Form settings...");
        console.debug(`Custom Hotbar | chbPrimaryColor ${e}`);
        console.debug(`Custom Hotbar | chbPrimaryColor ${d}`);
        console.debug(`Custom Hotbar | chbPrimaryColor ${game.settings.get("custom-hotbar", "chbPrimaryColor")}`);
        console.debug(`Custom Hotbar | Did I get the ID?: ${document.getElementById("chbPrimaryColor")}`);

        d.getElementById("chbPrimaryColor").value = game.settings.get("custom-hotbar", "chbPrimaryColor"); 
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