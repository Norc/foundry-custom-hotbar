import { CustomHotbarSettings } from './custom-hotbar-settings.js';

export class CoreHotbarSettingsForm extends FormApplication {

    constructor(object, options = {}) {
        super(object, options);
    }

    /**
    * Default Options for this FormApplication
    */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "core-hotbar-settings-form",
            title: "(𝗚𝗠 𝗢𝗻𝗹𝘆) Set Default Global Custom Hotbar",
            template: "./modules/custom-hotbar/templates/coreHotbarSettings.html",
            classes: ["sheet"],
            width: 500,
            closeOnSubmit: true
        });
    }

    getData() {
        let data = {        
            corePrimaryColor: game.settings.get("custom-hotbar", "corePrimaryColor"), 
            coreBorderColor: game.settings.get("custom-hotbar", "coreBorderColor"),
            coreBorderColorActive: game.settings.get("custom-hotbar", "coreBorderColorActive"),
            coreBorderColorInactive: game.settings.get("custom-hotbar", "coreBorderColorInactive"),

            coreXPos: game.settings.get("custom-hotbar", "coreXPos"),
            coreYPos: game.settings.get("custom-hotbar", "coreYPos")
        };
        if (this.reset == true) {
            data = {    
                corePrimaryColor: game.settings.settings.get("custom-hotbar.corePrimaryColor").default,
                coreBorderColor: game.settings.settings.get("custom-hotbar.coreBorderColor").default,
                coreBorderColorActive: game.settings.settings.get("custom-hotbar.coreBorderColorActive").default,
                coreBorderColorInactive: game.settings.settings.get("custom-hotbar.coreBorderColorInactive").default,

                coreXPos: game.settings.settings.get("custom-hotbar.coreXPos").default,
                coreYPos: game.settings.settings.get("custom-hotbar.coreYPos").default
            };
        }
        this.render;
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
    async _updateObject(e, d) {
        console.debug("Custom Hotbar | Attempting to update settings with form values...");
        game.settings.set("custom-hotbar", "corePrimaryColor", d.corePrimaryColor);
        game.settings.set("custom-hotbar", "coreBorderColor", d.coreBorderColor);
        game.settings.set("custom-hotbar", "coreBorderColorActive", d.coreBorderColorActive);
        game.settings.set("custom-hotbar", "coreBorderColorInactive", d.coreBorderColorInactive);
        game.settings.set("custom-hotbar", "coreXPos", d.coreXPos);
        game.settings.set("custom-hotbar", "coreYPos", d.coreYPos);
        this.render();
        ui.notifications.notify("Saving... Please refresh Foundry to apply changes.");                                                     
    }
    
    onReset() {
        console.debug("Custom Hotbar | Attempting to reset coreSettingsForm to defaults");
        this.reset = true;
        this.render();
    }

    activateListeners(html) {
        console.debug("Custom Hotbar | Attempting to activate Core Settings Form listeners");
        super.activateListeners(html);
        html.find('button[name="reset"]').click(this.onReset.bind(this));
        this.reset = false;
    }
}
