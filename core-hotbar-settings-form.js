//import { CustomHotbarSettings } from './custom-hotbar-settings.js';

export class CoreHotbarSettingsForm extends FormApplication {

    constructor(object, options = {}) {
        super(object, options);
    }

    /**
    * Default Options for this FormApplication
    */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "core-hotbar-settings-form",
            title: "Core Hotbar Modification Settings",
            template: "./modules/custom-hotbar/templates/coreHotbarSettings.html",
            classes: ["sheet"],
            width: 500,
            closeOnSubmit: true
        });
    }

    getData() {
        

        const data = "core Hotbar Test";

        console.debug("Custom Hotbar | Getting settings form data");
        console.debug(data);

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
        console.debug("Custom Hotbar | Core settings updated");
    }
    

    activateListeners(html) {
        super.activateListeners(html);
        console.debug("Custom Hotbar | Attempted to activate Core Settings Menu listeners");
    }
}