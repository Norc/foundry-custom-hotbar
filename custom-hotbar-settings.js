export class CustomHotbarSettings {

    static register(){
        /*basic test
        game.settings.register("custom-hotbar", "chbColor", {
            name: "customHotbar.Settings.chbColor.value",
            //hint: "customHotbar.Settings.chbColor.valueHint",
            scope: "world",
            config: true,
            default: "#FFFFFF",
            type: String,
            /*choices: {
            "default": "customHotbar.Settings.chbColor.value.default",
            "onlyCurrent": "customHotbar.Settings.chbColor.value.onlyCurrent",
            "no": "ForienQuestLog.Settings.showTasks.no"
            },
            onChange: value => {
                ui.customHotbar.render();
            }
        }); 
        */
        
        //To make a new color setting, make a new ColorSetting object:

        //                                     module        key             options
        new window.Ardittristan.ColorSetting("custom-hotbar", "chbCoreColor", {
            name: "customHotbar.Settings.chbCoreColor.name",      // The name of the setting in the settings menu
            //hint: "customHotbar.Settings.chbCoreColor.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            defaultColor: "#0000ffff",     // The default color of the setting
            scope: "client",               // The scope of the setting
            onChange: (value) => {ui.customHotbar.render();}        // A callback function which triggers when the setting is changed
        })


    }
}
