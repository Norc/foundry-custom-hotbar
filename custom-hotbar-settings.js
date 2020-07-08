export class CustomHotbarSettings {

    static register(){
        game.settings.register("custom-hotbar", "chbColor", {
            name: "customHotbar.Settings.chbColor.value",
            hint: "customHotbar.Settings.chbColor.valueHint",
            scope: "world",
            config: true,
            default: "#FFFFFF",
            type: String,
            /*choices: {
            "default": "customHotbar.Settings.chbColor.value.default",
            "onlyCurrent": "customHotbar.Settings.chbColor.value.onlyCurrent",
            "no": "ForienQuestLog.Settings.showTasks.no"
            },*/
            onChange: value => {
                ui.customHotbar.render();
            }
        });
    }
}