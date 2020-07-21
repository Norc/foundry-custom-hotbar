import { CustomHotbarSettingsForm } from './custom-hotbar-settings-form.js';
import { CoreHotbarSettingsForm } from './core-hotbar-settings-form.js';
import { CustomHotbarFlagsForm } from './custom-hotbar-flags-form.js';
import { CoreHotbarFlagsForm } from './core-hotbar-flags-form.js';

export class CustomHotbarSettings {
    /**
     * Provides functionality for interaction with module settings and Flags
     */

    static register(){
    //Global, GM-only settings menus
        game.settings.registerMenu("custom-hotbar", 'chbSettingsMenu', {
            name: '(𝗚𝗠 𝗢𝗻𝗹𝘆) Default Custom Hotbar Settings for All Users',
            label: 'Global Custom Hotbar',
            icon: 'fas fa-bars',
            type: CustomHotbarSettingsForm,
            restricted: true
        });

        game.settings.registerMenu("custom-hotbar", 'coreSettingsMenu', {
            name: '(𝗚𝗠 𝗢𝗻𝗹𝘆) Default Core Foundry Hotbar Settings for All Users',
            label: 'Global Core Hotbar',
            icon: 'fas fa-minus',
            type: CoreHotbarSettingsForm,
            restricted: true
        });

        //TO DO: add hotbarPageKeyEnabled and chbKeyEnabled and fix settings window formatting and add to localizations
        /*                                     module        key             options
        game.settings.register("custom-hotbar", "chbKeyEnabled", {
            name: "customHotbar.settings.chbKeyEnabled.name",      // The name of the setting in the settings menu
            hint: "customHotbar.settings.chKeyEnabled.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            config: false,                 // Disable display on the standard Foundry settings menu
            default: "#0000FF80",     // The default color of the setting
            type: String,
            scope: "world",               // The scope of the setting
            config: false,                 // Disable display on the standard Foundry settings menu
            onChange: (value) => {ui.customHotbar.render();}        // A callback function which triggers when the setting is changed
        })
        */

        //User-only "settings" menu that uses flags instead
        game.settings.registerMenu("custom-hotbar", 'chbFlagsMenu', {
            name: 'Your Custom Hotbar Settings',
            label: 'Your Custom Hotbar',
            icon: 'fas fa-bars',
            type: CustomHotbarFlagsForm,
            restricted: false
        });

        game.settings.registerMenu("custom-hotbar", 'coreFlagsMenu', {
            name: 'Your Core Foundry Hotbar Settings',
            label: 'Your Core Hotbar',
            icon: 'fas fa-minus',
            type: CoreHotbarFlagsForm,
            restricted: false
        });
    
        //TO DO: add hotbarPageKeyEnabled and chbKeyEnabled
    
    //CUSTOM HOTBAR SETTINGS    

        //                                     module        key             options
        game.settings.register("custom-hotbar", "chbPrimaryColor", {
            name: "customHotbar.settings.chbPrimaryColor.name",      // The name of the setting in the settings menu
            hint: "customHotbar.settings.chbPrimaryColor.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            config: false,                 // Disable display on the standard Foundry settings menu
            default: "#0000FF80",     // The default color of the setting
            type: String,
            scope: "world",               // The scope of the setting
            config: false,                 // Disable display on the standard Foundry settings menu
            onChange: (value) => {ui.customHotbar.render();}        // A callback function which triggers when the setting is changed
        })
     
        //                                     module        key             options
        game.settings.register("custom-hotbar", "chbBorderColor", {
            name: "customHotbar.settings.chbBorderColor.name",      // The name of the setting in the settings menu
            hint: "customHotbar.settings.chbBorderColor.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            default: "#0000FFff",     // The default color of the setting
            type: String,
            scope: "world",               // The scope of the setting
            config: false,                 // Disable display on the standard Foundry settings menu
            onChange: (value) => {ui.customHotbar.render();}        // A callback function which triggers when the setting is changed
        })

        //                                     module        key             options
        game.settings.register("custom-hotbar", "chbBorderColorActive", {
            name: "customHotbar.settings.chbBorderColorActive.name",      // The name of the setting in the settings menu
            hint: "customHotbar.settings.chbBorderColorActive.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            default: "#ffffffff",     // The default color of the setting
            type: String,
            scope: "world",               // The scope of the setting
            config: false,                 // Disable display on the standard Foundry settings menu
            onChange: (value) => {ui.customHotbar.render();}        // A callback function which triggers when the setting is changed
        })  

        //                                     module        key             options
        game.settings.register("custom-hotbar", "chbBorderColorInactive", {
            name: "customHotbar.settings.chbBorderColorInactive.name",      // The name of the setting in the settings menu
            hint: "customHotbar.settings.chbBorderColorInactive.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            default: "#808080ff",     // The default color of the setting
            type: String,
            scope: "world",               // The scope of the setting
            config: false,                 // Disable display on the standard Foundry settings menu
            onChange: (value) => {ui.customHotbar.render();}        // A callback function which triggers when the setting is changed
        })   

        game.settings.register("custom-hotbar", "chbXPos", {
            name: "customHotbar.settings.chbXPos.name",
            hint: "customHotbar.settings.chbXPos.nameHint",
            scope: "world",
            config: false,
            default: "220",
            type: Number,
            onChange: value => {
                ui.customHotbar.render();
            }
        }); 

        game.settings.register("custom-hotbar", "chbYPos", {
            name: "customHotbar.settings.chbYPos.name",
            hint: "customHotbar.settings.chbYPos.nameHint",
            scope: "world",
            config: false,
            default: "63",
            type: Number,
            onChange: value => {
                ui.customHotbar.render();
            }
        }); 

        //Add ZPos set to uneditable?

    //CORE HOTBAR SETTINGS
        //                                     module        key             options
        game.settings.register("custom-hotbar", "corePrimaryColor", {
            name: "customHotbar.settings.corePrimaryColor.name",      // The name of the setting in the settings menu
            hint: "customHotbar.settings.corePrimaryColor.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            default: "#00000080",     // The default color of the setting
            type: String,
            scope: "world",               // The scope of the setting
            config: false,                 // Disable display on the standard Foundry settings menu
            onChange: (value) => {ui.hotbar.render();}        // A callback function which triggers when the setting is changed
        })
     
        //                                     module        key             options
        game.settings.register("custom-hotbar", "coreBorderColor", {
            name: "customHotbar.settings.coreBorderColor.name",      // The name of the setting in the settings menu
            hint: "customHotbar.settings.coreBorderColor.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            default: "#000000ff",     // The default color of the setting
            type: String,
            scope: "world",               // The scope of the setting
            config: false,                 // Disable display on the standard Foundry settings menu
            onChange: (value) => {ui.hotbar.render();}        // A callback function which triggers when the setting is changed
        })

        //                                     module        key             options
        game.settings.register("custom-hotbar", "coreBorderColorActive", {
            name: "customHotbar.settings.coreBorderColorActive.name",      // The name of the setting in the settings menu
            hint: "customHotbar.settings.coreBorderColorActive.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            default: "#ff6400",     // The default color of the setting
            type: String,
            scope: "world",               // The scope of the setting
            config: false,                 // Disable display on the standard Foundry settings menu
            onChange: (value) => {ui.hotbar.render();}        // A callback function which triggers when the setting is changed
        })

        //                                     module        key             options
        game.settings.register("custom-hotbar", "coreBorderColorInactive", {
            name: "customHotbar.settings.coreBorderColorInactive.name",      // The name of the setting in the settings menu
            hint: "customHotbar.settings.coreBorderColorInactive.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            default: "#939799ff",     // The default color of the setting
            type: String,
            scope: "world",               // The scope of the setting
            config: false,                 // Disable display on the standard Foundry settings menu
            onChange: (value) => {ui.hotbar.render();}        // A callback function which triggers when the setting is changed
        })   

        game.settings.register("custom-hotbar", "coreXPos", {
            name: "customHotbar.settings.coreXPos.name",
            hint: "customHotbar.settings.coreXPos.nameHint",
            scope: "world",
            config: false,
            default: "220",
            type: Number,
            onChange: value => {
                ui.hotbar.render();
            }
        }); 

        game.settings.register("custom-hotbar", "coreYPos", {
            name: "customHotbar.settings.coreYPos.name",
            hint: "customHotbar.settings.coreYPos.nameHint",
            scope: "world",
            config: false,
            default: "10",
            type: Number,
            onChange: value => {
                ui.hotbar.render();
            }
        }); 
    }

    //getters that determine whether to grab the user flag or the setting
    //Custom Hotbar getters
    //refactor into one function with variable for what you are getting when get chance?
    static getCHBPrimaryColor(){
        var flag = game.user.getFlag("custom-hotbar", "chbPrimaryColor");
        var sett = game.settings.get("custom-hotbar","chbPrimaryColor");
        return (flag) ? flag : sett;
    }

    static getCHBBorderColor(){
        var flag = game.user.getFlag("custom-hotbar", "chbBorderColor");
        var sett = game.settings.get("custom-hotbar","chbBorderColor");
        return (flag) ? flag : sett;
    }

    static getCHBBorderColorActive(){
        var flag = game.user.getFlag("custom-hotbar", "chbBorderColorActive");
        var sett = game.settings.get("custom-hotbar","chbBorderColorActive");
        return (flag) ? flag : sett;
    }
    
    static getCHBBorderColorInactive(){
        var flag = game.user.getFlag("custom-hotbar", "chbBorderColorInactive");
        var sett = game.settings.get("custom-hotbar","chbBorderColorInactive");
        return (flag) ? flag : sett;
    }

    static getCHBXPos(){
        var flag = game.user.getFlag("custom-hotbar", "chbXPos");
        var sett = game.settings.get("custom-hotbar","chbXPos");
        return (flag) ? flag : sett;
    }

    static getCHBYPos(){
        var flag = game.user.getFlag("custom-hotbar", "chbYPos");
        var sett = game.settings.get("custom-hotbar","chbYPos");
        return (flag) ? flag : sett;
    }

    //Core Hotbar getters
    static getCorePrimaryColor(){
        var flag = game.user.getFlag("custom-hotbar", "corePrimaryColor");
        var sett = game.settings.get("custom-hotbar","corePrimaryColor");
        return (flag) ? flag : sett;
    }

    static getCoreBorderColor(){
        var flag = game.user.getFlag("custom-hotbar", "coreBorderColor");
        var sett = game.settings.get("custom-hotbar","coreBorderColor");
        return (flag) ? flag : sett;
    }

    static getCoreBorderColorActive(){
        var flag = game.user.getFlag("custom-hotbar", "coreBorderColorActive");
        var sett = game.settings.get("custom-hotbar","coreBorderColorActive");
        return (flag) ? flag : sett;
    }
    
    static getCoreBorderColorInactive(){
        var flag = game.user.getFlag("custom-hotbar", "coreBorderColorInactive");
        var sett = game.settings.get("custom-hotbar","coreBorderColorInactive");
        return (flag) ? flag : sett;
    }

    static getCoreXPos(){
        var flag = game.user.getFlag("custom-hotbar", "coreXPos");
        var sett = game.settings.get("custom-hotbar","coreXPos");
        return (flag) ? flag : sett;
    }

    static getCoreYPos(){
        var flag = game.user.getFlag("custom-hotbar", "coreYPos");
        var sett = game.settings.get("custom-hotbar","coreYPos");
        return (flag) ? flag : sett;
    }
}