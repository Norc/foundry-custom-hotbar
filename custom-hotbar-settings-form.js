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
        console.debug("Custom Hotbar | Attempting to update settings...");
        d.chbPrimaryColor = game.settings.set{"custom-hotbar", "chbPrimaryColor");
        d.chbBorderColor = game.settings.set{"custom-hotbar", "chbBorderColor");
        d.chbBorderColorActive = game.settings.set{"custom-hotbar", "chbBorderColorActive");
        d.chbBorderColorInactive = game.settings.set{"custom-hotbar", "chbBorderColorActive");
        d.chbXPos = game.settings.set("custom-hotbar","chbXPos");
        d.chbYPos = game.settings.set("custom-hotbar","chbYPos");                                                     
    }
    
    onReset() {
        console.debug("Custom Hotbar | Attempting to reset chbSettingsForm to defaults");
        d.chbPrimaryColor = game.settings.get{"custom-hotbar", "chbPrimaryColor.default");
        d.chbBorderColor = game.settings.get{"custom-hotbar", "chbBorderColor.default");
        d.chbBorderColorActive = game.settings.get{"custom-hotbar", "chbBorderColorActive.default");
        d.chbBorderColorInactive = game.settings.get{"custom-hotbar", "chbBorderColorActive.default");
        d.chbXPos = game.settings.get("custom-hotbar","chbXPos.default");
        d.chbYPos = game.settings.get("custom-hotbar","chbYPos.default");  
        this.render();
    }

    activateListeners(html) {
        console.debug("Custom Hotbar | Attempting to activate CHB Settings Form listeners");
        super.activateListeners(html);
        html.find('button[name="reset"]').click(this.onReset.bind(this));
    }
}
