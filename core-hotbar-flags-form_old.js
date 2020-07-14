import { CustomHotbarSettings } from './custom-hotbar-settings.js';

export class CoreHotbarFlagsForm extends FormApplication {

    constructor(object, options = {}) {
        super(object, options);
    }

    /**
    * Default Options for this FormApplication
    */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "core-hotbar-flags-form",
            title: "(Per User) Your Foundry Hotbar",
            template: "./modules/custom-hotbar/templates/coreHotbarFlags.html",
            classes: ["sheet"],
            width: 500,
            closeOnSubmit: true
        });
    }

    getData() {
        let data = {        
            corePrimaryColor: game.user.getFlag("custom-hotbar", "corePrimaryColor"), 
            coreBorderColor: game.user.getFlag("custom-hotbar", "coreBorderColor"),
            coreBorderColorActive: game.user.getFlag("custom-hotbar", "coreBorderColorActive"),
            coreBorderColorInactive: game.user.getFlag("custom-hotbar", "coreBorderColorInactive"),

            coreXPos: game.user.getFlag("custom-hotbar", "coreXPos"),
            coreYPos: game.user.getFlag("custom-hotbar", "coreYPos")
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
    //this is currently defined for an onload not a submit...
    async _updateObject(e, d) {
        game.user.unsetFlag("custom-hotbar", "corePrimaryColor"); 
        game.user.unsetFlag("custom-hotbar", "coreBorderColor");
        game.user.unsetFlag("custom-hotbar", "coreBorderColorActive");
        game.user.unsetFlag("custom-hotbar", "coreBorderColorInactive");

        game.user.unsetFlag("custom-hotbar", "coreXPos");
        game.user.unsetFlag("custom-hotbar", "coreYPos");


        console.debug("Custom Hotbar | Attempting to update core user flags with form values...");
        game.user.setFlag("custom-hotbar", "corePrimaryColor", d.corePrimaryColor);
        game.user.setFlag("custom-hotbar", "coreBorderColor", d.coreBorderColor);
        game.user.setFlag("custom-hotbar", "coreBorderColorActive", d.coreBorderColorActive);
        game.user.setFlag("custom-hotbar", "coreBorderColorInactive", d.coreBorderColorInactive);
        game.user.setFlag("custom-hotbar","coreXPos", d.coreXPos);
        game.user.setFlag("custom-hotbar","coreYPos", d.coreYPos);
        this.render();                                                     
    }
    
    onReset() {
        console.debug("Custom Hotbar | Attempting to reset coreSettingsForm to defaults");
        this.reset = true;
        this.render();
    }

    activateListeners(html) {
        console.debug("Custom Hotbar | Attempting to activate core Settings Form listeners");
        super.activateListeners(html);
        html.find('button[name="reset"]').click(this.onReset.bind(this));
        this.reset = false;
    }
}
