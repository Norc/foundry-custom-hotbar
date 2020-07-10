import { CustomHotbarSettingsForm } from './custom-hotbar-settings-form.js';
import { CoreHotbarSettingsForm } from './core-hotbar-settings-form.js';

export class CustomHotbarSettings {

    static register(){
    //EXPERIMENTAL ATTEMPT AT SUBMENU
        game.settings.registerMenu("custom-hotbar", 'chbSettingsMenu', {
            name: 'Custom Hotbar Settings',
            label: 'Custom Hotbar',
            icon: 'fas fa-book',
            type: CustomHotbarSettingsForm,
            restricted: true
        });

        game.settings.registerMenu("custom-hotbar", 'coreSettingsMenu', {
            name: 'Core Foundry Hotbar Settings',
            label: 'Core Hotbar',
            icon: 'fas fa-book',
            type: CoreHotbarSettingsForm,
            restricted: true
        });

        
    //CUSTOM HOTBAR SETTINGS    

        //                                     module        key             options
        new window.Ardittristan.ColorSetting("custom-hotbar", "chbPrimaryColor", {
            name: "customHotbar.settings.chbPrimaryColor.name",      // The name of the setting in the settings menu
            hint: "customHotbar.settings.chbPrimaryColor.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            defaultColor: "#0000FF80",     // The default color of the setting
            scope: "client",               // The scope of the setting
            onChange: (value) => {ui.customHotbar.render();}        // A callback function which triggers when the setting is changed
        })
     
        //                                     module        key             options
        new window.Ardittristan.ColorSetting("custom-hotbar", "chbBorderColor2", {
            name: "customHotbar.settings.chbBorderColor2.name",      // The name of the setting in the settings menu
            hint: "customHotbar.settings.chbBorderColor2.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            defaultColor: "#0000FFff",     // The default color of the setting
            scope: "client",               // The scope of the setting
            onChange: (value) => {ui.customHotbar.render();}        // A callback function which triggers when the setting is changed
        })

        //                                     module        key             options
        new window.Ardittristan.ColorSetting("custom-hotbar", "chbBorderColorActive", {
            name: "customHotbar.settings.chbBorderColorActive.name",      // The name of the setting in the settings menu
            hint: "customHotbar.settings.chbBorderColorActive.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            defaultColor: "#FFFFFFff",     // The default color of the setting
            scope: "client",               // The scope of the setting
            onChange: (value) => {ui.customHotbar.render();}        // A callback function which triggers when the setting is changed
        })

        //                                     module        key             options
        new window.Ardittristan.ColorSetting("custom-hotbar", "chbBorderColorInactive", {
            name: "customHotbar.settings.chbBorderColorInactive.name",      // The name of the setting in the settings menu
            hint: "customHotbar.settings.chbBorderColorInactive.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            defaultColor: "#939799ff",     // The default color of the setting
            scope: "client",               // The scope of the setting
            onChange: (value) => {ui.customHotbar.render();}        // A callback function which triggers when the setting is changed
        })   

        game.settings.register("custom-hotbar", "chbXPos", {
            name: "customHotbar.settings.chbXPos.name",
            hint: "customHotbar.settings.chbXPos.nameHint",
            scope: "world",
            config: true,
            default: "220",
            type: Number,
            /*choices: {
            "default": "customHotbar.Settings.chbColor.value.default",
            "onlyCurrent": "customHotbar.Settings.chbColor.value.onlyCurrent",
            "no": "ForienQuestLog.Settings.showTasks.no"
            }, */
            onChange: value => {
                ui.customHotbar.render();
            }
        }); 

        game.settings.register("custom-hotbar", "chbYPos", {
            name: "customHotbar.settings.chbYPos.name",
            hint: "customHotbar.settings.chbYPos.nameHint",
            scope: "world",
            config: true,
            default: "63",
            type: Number,
            /*choices: {
            "default": "customHotbar.Settings.chbColor.value.default",
            "onlyCurrent": "customHotbar.Settings.chbColor.value.onlyCurrent",
            "no": "ForienQuestLog.Settings.showTasks.no"
            }, */
            onChange: value => {
                ui.customHotbar.render();
            }
        }); 

        //Add ZPos set to uneditable?

    //CORE HOTBAR SETTINGS
        //                                     module        key             options
        new window.Ardittristan.ColorSetting("custom-hotbar", "corePrimaryColor", {
            name: "customHotbar.settings.corePrimaryColor.name",      // The name of the setting in the settings menu
            hint: "customHotbar.settings.corePrimaryColor.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            defaultColor: "#0000FF80",     // The default color of the setting
            scope: "client",               // The scope of the setting
            onChange: (value) => {ui.hotbar.render();}        // A callback function which triggers when the setting is changed
        })
     
        //                                     module        key             options
        new window.Ardittristan.ColorSetting("custom-hotbar", "coreBorderColor2", {
            name: "customHotbar.settings.coreBorderColor2.name",      // The name of the setting in the settings menu
            hint: "customHotbar.settings.coreBorderColor2.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            defaultColor: "#0000FFff",     // The default color of the setting
            scope: "client",               // The scope of the setting
            onChange: (value) => {ui.hotbar.render();}        // A callback function which triggers when the setting is changed
        })

        //                                     module        key             options
        new window.Ardittristan.ColorSetting("custom-hotbar", "coreBorderColorActive", {
            name: "customHotbar.settings.coreBorderColorActive.name",      // The name of the setting in the settings menu
            hint: "customHotbar.settings.coreBorderColorActive.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            defaultColor: "#ff6400",     // The default color of the setting
            scope: "client",               // The scope of the setting
            onChange: (value) => {ui.hotbar.render();}        // A callback function which triggers when the setting is changed
        })

        //                                     module        key             options
        new window.Ardittristan.ColorSetting("custom-hotbar", "coreBorderColorInactive", {
            name: "customHotbar.settings.coreBorderColorInactive.name",      // The name of the setting in the settings menu
            hint: "customHotbar.settings.coreBorderColorInactive.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            defaultColor: "#939799ff",     // The default color of the setting
            scope: "client",               // The scope of the setting
            onChange: (value) => {ui.hotbar.render();}        // A callback function which triggers when the setting is changed
        })   

        game.settings.register("custom-hotbar", "coreXPos", {
            name: "customHotbar.settings.coreXPos.name",
            hint: "customHotbar.settings.coreXPos.nameHint",
            scope: "world",
            config: true,
            default: "220",
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

        game.settings.register("custom-hotbar", "coreYPos", {
            name: "customHotbar.settings.coreYPos.name",
            hint: "customHotbar.settings.coreYPos.nameHint",
            scope: "world",
            config: true,
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