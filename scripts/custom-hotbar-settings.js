import { CustomHotbarSettingsForm } from './custom-hotbar-settings-form.js';
import { CoreHotbarSettingsForm } from './core-hotbar-settings-form.js';
import { CustomHotbarFlagsForm } from './custom-hotbar-flags-form.js';
import { CoreHotbarFlagsForm } from './core-hotbar-flags-form.js';
import { hotkeys } from '../../lib-df-hotkeys/lib-df-hotkeys.shim.js';
import { CHBDebug } from './custom-hotbar-debug.js';

export class CustomHotbarSettings {
    /**
     * Provides functionality for interaction with module settings and Flags
     */

    static register(){
    //Global, GM-only settings menus
        game.settings.registerMenu("custom-hotbar", 'chbSettingsMenu', {
            //name: '(𝗚𝗠 𝗢𝗻𝗹𝘆) Default Custom Hotbar Settings for All Users',
            name: game.i18n.localize('customHotbar.settings.chbSettingsMenu.nameHint'),
            //label: 'Global Custom Hotbar',
            label: game.i18n.localize('customHotbar.settings.chbSettingsMenu.name'),
            icon: 'fas fa-bars',
            type: CustomHotbarSettingsForm,
            restricted: true
        });

        game.settings.registerMenu("custom-hotbar", 'coreSettingsMenu', {
            //name: '(𝗚𝗠 𝗢𝗻𝗹𝘆) Default Core Foundry Hotbar Settings for All Users',
            //name: game.i18n.localize('customHotbar.settings.coreSettingsMenu.nameHint'),
            //label: 'Global Core Hotbar',
            label: game.i18n.localize('customHotbar.settings.coreSettingsMenu.name'),
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

        //Add checkbox option to disable custom hotbar
        game.settings.register("custom-hotbar", "chbDisabled", {
            config: true,
            type: Boolean,
            default: false,
            //name: 'Disable Custom Hotbar?',
            name: game.i18n.localize('customHotbar.settings.chbDisable.name'),
            //hint: 'Check to disable the Custom Hotbar for yourself only. Uncheck to re-enable. Refresh required.',
            hint: game.i18n.localize('customHotbar.settings.chbDisable.nameHint'),
            onChange: value => { // A callback function which triggers when the setting is changed
              CHBDebug(`Is the CHB disabled? ${value}`)
            }
        });

        //Add checkbox option to disable core Foundry hotbar
        game.settings.register("custom-hotbar", "coreDisabled", {
            config: true,
            type: Boolean,
            default: false,
            //name: 'Disable Core Foundry Hotbar?',
            name: game.i18n.localize('customHotbar.settings.coreDisable.name'),
            //hint: 'Check to disable the core Foundry hotbar for yourself only. Uncheck to re-enable. Refresh required.',
            hint: game.i18n.localize('customHotbar.settings.coreDisable.nameHint'),
            onChange: value => { // A callback function which triggers when the setting is changed
                CHBDebug(`Is the core Foundry hotbar disabled? ${value}`)
            }
        });

        //User-only "settings" menu that uses flags instead
        if (game.settings.get("custom-hotbar","chbDisabled") !== true) {        
            game.settings.registerMenu("custom-hotbar", 'chbFlagsMenu', {
                //name: 'Your Custom Hotbar Settings',
                //name: game.i18n.localize('customHotbar.settings.chbFlagsMenu.nameHint'),
                //label: 'Your Custom Hotbar',
                label: game.i18n.localize('customHotbar.settings.chbFlagsMenu.nameHint'),
                icon: 'fas fa-bars',
                type: CustomHotbarFlagsForm,
                restricted: false
            });
        }

        if (game.settings.get("custom-hotbar","coreDisabled") !== true) {        
            game.settings.registerMenu("custom-hotbar", 'coreFlagsMenu', {
                //name: 'Your Core Foundry Hotbar Settings',
                //name: game.i18n.localize('customHotbar.settings.coreFlagsMenu.nameHint'),
                //label: 'Your Core Hotbar',
                label: game.i18n.localize('customHotbar.settings.coreFlagsMenu.nameHint'),
                icon: 'fas fa-minus',
                type: CoreHotbarFlagsForm,
                restricted: false
            });
        }
    
        //Add checkbox option to disable core Foundry hotbar
        game.settings.register("custom-hotbar", "keyHint", {
            config: true,
            type: Boolean,
            default: false,
            //name: 'Hotbar Keybindings',
            name: game.i18n.localize('customHotbar.settings.keybind.name'),
            //hint: 'Use the Module Settings of "Library: DF Hotkeys" to view and edit your keybindings.',
            hint: game.i18n.localize('customHotbar.settings.keybind.nameHint'),
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
            default: "#00000080",     // The default color of the setting
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
            default: "#000000ff",     // The default color of the setting
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
            default: "#ff6400ff",     // The default color of the setting
            type: String,
            scope: "world",               // The scope of the setting
            config: false,                 // Disable display on the standard Foundry settings menu
            onChange: (value) => {ui.customHotbar.render();}        // A callback function which triggers when the setting is changed
        })  

        game.settings.register("custom-hotbar", "chbBorderColorInactive", {
            name: "customHotbar.settings.chbBorderColorInactive.name",      // The name of the setting in the settings menu
            hint: "customHotbar.settings.chbBorderColorInactive.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            default: "#939799ff",     // The default color of the setting
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

    //KEYBIND SETTINGS

        //CHB Macro Slot Bindings
        game.settings.register("custom-hotbar", "chb1", {
            scope: 'world',
            config: false,
            default: {
                key: hotkeys.keys.Digit1,
                alt: false,
                ctrl: false,
                shift: true
            }
        });

        game.settings.register("custom-hotbar", "chb2", {
            scope: 'world',
            config: false,
            default: {
                key: hotkeys.keys.Digit2,
                alt: false,
                ctrl: false,
                shift: true
            }
        });

        game.settings.register("custom-hotbar", "chb3", {
            scope: 'world',
            config: false,
            default: {
                key: hotkeys.keys.Digit3,
                alt: false,
                ctrl: false,
                shift: true
            }
        });

        game.settings.register("custom-hotbar", "chb4", {
            scope: 'world',
            config: false,
            default: {
                key: hotkeys.keys.Digit4,
                alt: false,
                ctrl: false,
                shift: true
            }
        });

        game.settings.register("custom-hotbar", "chb5", {
            scope: 'world',
            config: false,
            default: {
                key: hotkeys.keys.Digit5,
                alt: false,
                ctrl: false,
                shift: true
            }
        });

        game.settings.register("custom-hotbar", "chb6", {
            scope: 'world',
            config: false,
            default: {
                key: hotkeys.keys.Digit6,
                alt: false,
                ctrl: false,
                shift: true
            }
        });

        game.settings.register("custom-hotbar", "chb7", {
            scope: 'world',
            config: false,
            default: {
                key: hotkeys.keys.Digit7,
                alt: false,
                ctrl: false,
                shift: true
            }
        });

        game.settings.register("custom-hotbar", "chb8", {
            scope: 'world',
            config: false,
            default: {
                key: hotkeys.keys.Digit8,
                alt: false,
                ctrl: false,
                shift: true
            }
        });

        game.settings.register("custom-hotbar", "chb9", {
            scope: 'world',
            config: false,
            default: {
                key: hotkeys.keys.Digit9,
                alt: false,
                ctrl: false,
                shift: true
            }
        });

        game.settings.register("custom-hotbar", "chb0", {
            scope: 'world',
            config: false,
            default: {
                key: hotkeys.keys.Digit0,
                alt: false,
                ctrl: false,
                shift: true
            }
        });

        //Macro page settings
        game.settings.register("custom-hotbar", "corePage1", {
            scope: 'world',
            config: false,
            default: {
                key: hotkeys.keys.Digit1,
                alt: false,
                ctrl: true,
                shift: false
           }
        });

        game.settings.register("custom-hotbar", "corePage2", {
            scope: 'world',
            config: false,
            default: {
                key: hotkeys.keys.Digit2,
                alt: false,
                ctrl: true,
                shift: false
            }
        });

        game.settings.register("custom-hotbar", "corePage3", {
            scope: 'world',
            config: false,
            default: {
                key: hotkeys.keys.Digit3,
                alt: false,
                ctrl: true,
                shift: false
           }
        });

        game.settings.register("custom-hotbar", "corePage4", {
            scope: 'world',
            config: false,
            default: {
                key: hotkeys.keys.Digit4,
                alt: false,
                ctrl: true,
                shift: false
            }
        });

        game.settings.register("custom-hotbar", "corePage5", {
            scope: 'world',
            config: false,
            default: {
                key: hotkeys.keys.Digit5,
                alt: false,
                ctrl: true,
                shift: false
            }
        });

        /* Multiple CHB pages not yet implemented
        game.settings.register("custom-hotbar", "chbPage1", {
            scope: 'world',
            config: false,
            default: {
                key: hotkeys.keys.Digit1,
                alt: false,
                ctrl: true,
                shift: true
           }
        });

        game.settings.register("custom-hotbar", "chbPage2", {
            scope: 'world',
            config: false,
            default: {
                key: hotkeys.keys.Digit2,
                alt: false,
                ctrl: true,
                shift: true
            }
        });

        game.settings.register("custom-hotbar", "chbPage3", {
            scope: 'world',
            config: false,
            default: {
                key: hotkeys.keys.Digit3,
                alt: false,
                ctrl: true,
                shift: true
           }
        });

        game.settings.register("custom-hotbar", "chbPage4", {
            scope: 'world',
            config: false,
            default: {
                key: hotkeys.keys.Digit4,
                alt: false,
                ctrl: true,
                shift: true
            }
        });

        game.settings.register("custom-hotbar", "chbPage5", {
            scope: 'world',
            config: false,
            default: {
                key: hotkeys.keys.Digit5,
                alt: false,
                ctrl: true,
                shift: true
            }
        });
        */
        

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

function chbSettingsClose() {
    return true
}