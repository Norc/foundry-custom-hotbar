export class CustomHotbarSettings {

    static register(){

        //                                     module        key             options
        new window.Ardittristan.ColorSetting("custom-hotbar", "chbPrimaryColor", {
            name: "customHotbar.settings.chbPrimaryColor.name",      // The name of the setting in the settings menu
            hint: "customHotbar.settings.chbPrimaryColor.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            defaultColor: "#FFFFFFff",     // The default color of the setting
            scope: "client",               // The scope of the setting
            onChange: (value) => {ui.customHotbar.render();}        // A callback function which triggers when the setting is changed
        })

        //                                     module        key             options
        new window.Ardittristan.ColorSetting("custom-hotbar", "chbBorderColor", {
            name: "customHotbar.settings.chbBorderColor.name",      // The name of the setting in the settings menu
            hint: "customHotbar.settings.chbBorderColor.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            defaultColor: "#0000ffff",     // The default color of the setting
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
        new window.Ardittristan.ColorSetting("custom-hotbar", "chbBorderColorInctive", {
            name: "customHotbar.settings.chbBorderColorInactive.name",      // The name of the setting in the settings menu
            hint: "customHotbar.settings.chbBorderColorInactive.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            defaultColor: "#939799ff",     // The default color of the setting
            scope: "client",               // The scope of the setting
            onChange: (value) => {ui.customHotbar.render();}        // A callback function which triggers when the setting is changed
        })        

//repeat for Core Hotbar also


game.settings.register("custom-hotbar", "chbXPos", {
    name: "customHotbar.settings.chbXPos.name",
    hint: "customHotbar.settings.chbXPos.nameHint",
    scope: "world",
    config: true,
    default: "0",
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
    default: "0",
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
    }
}