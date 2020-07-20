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
            chbYPos: CustomHotbarSettings.getCHBYPos(),        };
        if (this.reset == true) {
            data = {    
                chbPrimaryColor: game.settings.settings.get("custom-hotbar.chbPrimaryColor").default,
                chbBorderColor: game.settings.settings.get("custom-hotbar.chbBorderColor").default,
                chbBorderColorActive: game.settings.settings.get("custom-hotbar.chbBorderColorActive").default,
                chbBorderColorInactive: game.settings.settings.get("custom-hotbar.chbBorderColorInactive").default,

                chbXPos: game.settings.settings.get("custom-hotbar.chbXPos").default,
                chbYPos: game.settings.settings.get("custom-hotbar.chbYPos").default
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

    onChbPrimaryColorClick() {
        console.debug("Custom Hotbar | chbPrimaryColor button click detected");
        $( event.target ).addClass("expanded");
    }

    onChbBorderColorClick() {
        console.debug("Custom Hotbar | chbBorderColor button click detected");
        $( event.target ).addClass("expanded");
    }

    onChbBorderColorActiveClick() {
        console.debug("Custom Hotbar | chbBorderColorActive button click detected");
        $( event.target ).addClass("expanded");
    }

    onChbBorderColorInactiveClick() {
        console.debug("Custom Hotbar | chbBorderColorInactive button click detected");
        $( event.target ).addClass("expanded");
    }

    activateListeners(html) {
        console.debug("Custom Hotbar | Attempting to activate  CHB Flags Form listeners");
        super.activateListeners(html);
        //bind buttons and inputs 
        html.find('button[name="reset"]').on('click', this.onReset.bind(this));
        html.find('input[name="chbPrimaryColor"]').on('click',this.onChbPrimaryColorClick.bind(this));
        html.find('input[name="chbBorderColor"]').on('click',this.onChbBorderColorClick.bind(this));
        html.find('input[name="chbBorderColorActive"]').on('click',this.onChbBorderColorActiveClick.bind(this));
        html.find('input[name="chbBorderColorInactive"]').on('click',this.onChbBorderColorInactiveClick.bind(this));
        this.reset = false;
    }
}

Hooks.on("renderCustomHotbarFlagsForm", (a, b, c) => {
    console.debug( "Custom Hotbar | Initializing current color values..." );
    $( "#chbPrimaryColorSplash" ).css("background-color", c.chbPrimaryColor);
    $( "#chbBorderColorSplash" ).css("background-color", c.chbBorderColor);
    $( "#chbBorderColorActiveSplash" ).css("background-color", c.chbBorderColorActive);
    $( "#chbBorderColorInactiveSplash" ).css("background-color", c.chbBorderColorInactive);
});

Hooks.on("pickerDone", (parentDiv, hexColor) => {
    console.debug("Custom Hotbar | pickerDone hook detected");
    $( parentDiv ).find("input").removeClass("expanded");
    $( parentDiv ).css("background-color", hexColor);
});