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
            
            chbPrimaryColor: CustomHotbarSettings.getCHBPrimaryColor(), 
            chbBorderColor: CustomHotbarSettings.getCHBBorderColor(),
 //           chbBorderColorActive: CustomHotbarSettings.getCHBBorderColorActive(),
            chbBorderColorInactive: CustomHotbarSettings.getCHBBorderColorInactive(),

            chbXPos: CustomHotbarSettings.getCHBXPos(),
            chbYPos: CustomHotbarSettings.getCHBYPos()
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
        console.log(d);
        console.log(d.chbPrimaryColor);
        game.settings.set("custom-hotbar", "chbPrimaryColor", d.chbPrimaryColor);
        game.settings.set("custom-hotbar", "chbBorderColor", d.chbBorderColor);
        //game.settings.set("custom-hotbar", "chbBorderColorActive", d.chbBorderColorActive);
        game.settings.set("custom-hotbar", "chbBorderColorInactive", d.chbBorderColorInactive);
        game.settings.set("custom-hotbar","chbXPos", d.chbXPos);
        game.settings.set("custom-hotbar","chbYPos", d.chbYPos);                                                     
    }
    
    onReset() {
        console.debug("Custom Hotbar | Attempting to reset chbSettingsForm to defaults");
        d.chbPrimaryColor = game.settings.get("custom-hotbar", "chbPrimaryColor.default");
        d.chbBorderColor = game.settings.get("custom-hotbar", "chbBorderColor.default");
        d.chbBorderColorActive = game.settings.get("custom-hotbar", "chbBorderColorActive.default");
        d.chbBorderColorInactive = game.settings.get("custom-hotbar", "chbBorderColorActive.default");
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
