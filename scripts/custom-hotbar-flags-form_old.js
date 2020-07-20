import { CustomHotbarSettings } from './custom-hotbar-settings.js';

export class CustomHotbarFlagsForm extends FormApplication {

    constructor(object, options = {}) {
        super(object, options);
    }

    /**
    * Default Options for this FormApplication
    */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "custom-hotbar-flags-form",
            title: "(Per User) Your Custom Hotbar Settings",
            template: "./modules/custom-hotbar/templates/customHotbarFlags.html",
            classes: ["sheet"],
            width: 500,
            closeOnSubmit: true
        });
    }
    
    getData() {
        let data = {        
            chbPrimaryColor: CustomHotbarSettings.getCHBPrimaryColor(), 
            chbBorderColor: CustomHotbarSettings.getCHBBorderColor(),
            chbBorderColorActive: CustomHotbarSettings.getCHBBorderColorActive(),
            chbBorderColorInactive: CustomHotbarSettings.getCHBBorderColorInactive(),

            chbXPos: CustomHotbarSettings.getCHBXPos(),
            chbYPos: CustomHotbarSettings.getCHBYPos(),
        };

        if (this.reset == true) {
            async () => {
                await game.user.unsetFlag("custom-hotbar", "chbPrimaryColor"); 
                await game.user.unsetFlag("custom-hotbar", "chbBorderColor");
                await game.user.unsetFlag("custom-hotbar", "chbBorderColorActive");
                await game.user.unsetFlag("custom-hotbar", "chbBorderColorInactive");
        
                await game.user.unsetFlag("custom-hotbar", "chbXPos");
                await game.user.unsetFlag("custom-hotbar", "chbYPos");
            };

            data = {    
                chbPrimaryColor: game.settings.settings.get("custom-hotbar","chbPrimaryColor"),
                chbBorderColor: game.settings.settings.get("custom-hotbar","chbBorderColor"),
                chbBorderColorActive: game.settings.settings.get("custom-hotbar","chbBorderColorActive"),
                chbBorderColorInactive: game.settings.settings.get("custom-hotbar","chbBorderColorInactive"),

                chbXPos: game.settings.settings.get("custom-hotbar","chbXPos"),
                chbYPos: game.settings.settings.get("custom-hotbar","chbYPos")
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
        console.debug("Custom Hotbar | Attempting to update custom user flags with form values...");
        await game.user.unsetFlag("custom-hotbar", "chbPrimaryColor"); 
        await game.user.unsetFlag("custom-hotbar", "chbBorderColor");
        await game.user.unsetFlag("custom-hotbar", "chbBorderColorActive");
        await game.user.unsetFlag("custom-hotbar", "chbBorderColorInactive");

        await game.user.unsetFlag("custom-hotbar", "chbXPos");
        await game.user.unsetFlag("custom-hotbar", "chbYPos");

        setTimeout(100);
        
        await game.user.setFlag("custom-hotbar", "chbPrimaryColor", d.chbPrimaryColor);
        await game.user.setFlag("custom-hotbar", "chbBorderColor", d.chbBorderColor);
        await game.user.setFlag("custom-hotbar", "chbBorderColorActive", d.chbBorderColorActive);
        await game.user.setFlag("custom-hotbar", "chbBorderColorInactive", d.chbBorderColorInactive);

        await game.user.setFlag("custom-hotbar","chbXPos", d.chbXPos);
        await game.user.setFlag("custom-hotbar","chbYPos", d.chbYPos);
        this.render(); 
        ui.notifications.notify("Saving... Please refresh Foundry to apply changes.");                                                    
    }
    
    onReset() {
        console.debug("Custom Hotbar | Attempting to reset custom-hotbar-flags-form to defaults");
        this.reset = true;
        this.render();
    }

    activateListeners(html) {
        console.debug("Custom Hotbar | Attempting to activate CHB Flags Form listeners");
        super.activateListeners(html);
        html.find('button[name="reset"]').click(this.onReset.bind(this));
        this.reset = false;
    }
}
