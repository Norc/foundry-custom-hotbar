import { CustomHotbarSettingsForm } from './custom-hotbar-settings-form.js';
import { CoreHotbarSettingsForm } from './core-hotbar-settings-form.js';

export class CustomHotbarSettings {
    /**
     * Provides functionality for interaction with module settings
     */

     //getters and setters
    static getCHBPrimaryColor() {
        return game.settings.get("custom-hotbar", "chbPrimaryColor");
    }

    static setCHBPrimaryColor(val) {
        return game.settings.set("custom-hotbar", "chbPrimaryColor", val);
    }

    static getCHBBorderColor() {
        return game.settings.get("custom-hotbar", "chbBorderColor");
    }

    static setCHBBorderColor(val) {
        return game.settings.set("custom-hotbar", "chbBorderColor", val);
    }

    static getCHBBorderColorActive() {
        return game.settings.get("custom-hotbar", "chbBorderColorActive");
    }

    static setCHBBorderColorActive(val) {
        return game.settings.set("custom-hotbar", "chbBorderColorActive", val);
    }

    static getCHBBorderColorInactive() {
        return game.settings.get("custom-hotbar", "chbBorderColorInactive");
    }

    static setCHBBorderColorInactive(val) {
        return game.settings.set("custom-hotbar", "chbBorderColorInactive", val);
    }

    static getCHBXPos() {
        return game.settings.get("custom-hotbar", "chbXPos");
    }

    static setCHBXPos(val) {
        return game.settings.set("custom-hotbar", "chbXPos", val);
    }

    static getCHBYPos() {
        return game.settings.get("custom-hotbar", "chbYPos");
    }

    static setCHBYPos(val) {
        return game.settings.set("custom-hotbar", "chbYPos", val);
    }

    static register(){
    //EXPERIMENTAL ATTEMPT AT SUBMENU
        game.settings.registerMenu("custom-hotbar", 'chbSettingsMenu', {
            name: 'Custom Hotbar Settings',
            label: 'Custom Hotbar',
            icon: 'fas fa-bars',
            type: CustomHotbarSettingsForm,
            restricted: true
        });

        game.settings.registerMenu("custom-hotbar", 'coreSettingsMenu', {
            name: 'Core Foundry Hotbar Modification Settings',
            label: 'Core Hotbar',
            icon: 'fas fa-minus',
            type: CoreHotbarSettingsForm,
            restricted: true
        });

    
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
            scope: "client",               // The scope of the setting
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
            scope: "client",               // The scope of the setting
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
            scope: "client",               // The scope of the setting
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
            scope: "client",               // The scope of the setting
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
            scope: "client",               // The scope of the setting
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
            scope: "client",               // The scope of the setting
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
            scope: "client",               // The scope of the setting
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
            scope: "client",               // The scope of the setting
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
            /*choices: {
            "default": "customHotbar.Settings.chbColor.value.default",
            "onlyCurrent": "customHotbar.Settings.chbColor.value.onlyCurrent",
            "no": "ForienQuestLog.Settings.showTasks.no"
            }, */
            onChange: value => {
                ui.hotbar.render();
            }
        }); 
    }
}