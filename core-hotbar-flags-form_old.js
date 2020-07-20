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
            title: "(Per User) Your Core Hotbar Settings",
            template: "./modules/custom-hotbar/templates/coreHotbarFlags.html",
            classes: ["sheet"],
            width: 500,
            closeOnSubmit: true
        });
    }
    
    getData() {
        let data = {        
            corePrimaryColor: CustomHotbarSettings.getCorePrimaryColor(), 
            coreBorderColor: CustomHotbarSettings.getCoreBorderColor(),
            coreBorderColorActive: CustomHotbarSettings.getCoreBorderColorActive(),
            coreBorderColorInactive: CustomHotbarSettings.getCoreBorderColorInactive(),

            coreXPos: CustomHotbarSettings.getCoreXPos(),
            coreYPos: CustomHotbarSettings.getCoreYPos(),
        };

        if (this.reset == true) {
            async () => {
                await game.user.unsetFlag("custom-hotbar", "corePrimaryColor"); 
                await game.user.unsetFlag("custom-hotbar", "coreBorderColor");
                await game.user.unsetFlag("custom-hotbar", "coreBorderColorActive");
                await game.user.unsetFlag("custom-hotbar", "coreBorderColorInactive");
        
                await game.user.unsetFlag("custom-hotbar", "coreXPos");
                await game.user.unsetFlag("custom-hotbar", "coreYPos");
            };

            data = {    
                corePrimaryColor: game.settings.settings.get("custom-hotbar","corePrimaryColor"),
                coreBorderColor: game.settings.settings.get("custom-hotbar","coreBorderColor"),
                coreBorderColorActive: game.settings.settings.get("custom-hotbar","coreBorderColorActive"),
                coreBorderColorInactive: game.settings.settings.get("custom-hotbar","coreBorderColorInactive"),

                coreXPos: game.settings.settings.get("custom-hotbar","coreXPos"),
                coreYPos: game.settings.settings.get("custom-hotbar","coreYPos")
            };
            this.reset = false;
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
        console.debug("Custom Hotbar | Attempting to update core user flags with form values...");
        await game.user.unsetFlag("custom-hotbar", "corePrimaryColor"); 
        await game.user.unsetFlag("custom-hotbar", "coreBorderColor");
        await game.user.unsetFlag("custom-hotbar", "coreBorderColorActive");
        await game.user.unsetFlag("custom-hotbar", "coreBorderColorInactive");

        await game.user.unsetFlag("custom-hotbar", "coreXPos");
        await game.user.unsetFlag("custom-hotbar", "coreYPos");

        setTimeout(100);

        await game.user.setFlag("custom-hotbar", "corePrimaryColor", d.corePrimaryColor);
        await game.user.setFlag("custom-hotbar", "coreBorderColor", d.coreBorderColor);
        await game.user.setFlag("custom-hotbar", "coreBorderColorActive", d.coreBorderColorActive);
        await game.user.setFlag("custom-hotbar", "coreBorderColorInactive", d.coreBorderColorInactive);

        await game.user.setFlag("custom-hotbar","coreXPos", d.coreXPos);
        await game.user.setFlag("custom-hotbar","coreYPos", d.coreYPos);
        this.render();
        ui.notifications.notify("Saving... Please refresh Foundry to apply changes.");
    }
    
    onReset() {
        console.debug("Custom Hotbar | Attempting to reset core-hotbar-flags-form to defaults");
        this.reset = true;
        this.render();
    }

    activateListeners(html) {
        console.debug("Custom Hotbar | Attempting to activate core flags form listeners");
        super.activateListeners(html);
        html.find('button[name="reset"]').click(this.onReset.bind(this));
        this.reset = false;
    }
}
