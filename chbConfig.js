class chbConfig extends FormApplication {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            title: game.i18n.localize("DICESONICE.configTitle"),
            id: "dice-config",
            template: "modules/dice-so-nice/templates/dice-config.html",
            width: 500,
            height: 845,
            closeOnSubmit: true
        })
    }

    getData(options) {
        return mergeObject({
                fxList: Utils.localize({
                    "none": "DICESONICE.None",
                    "fadeOut": "DICESONICE.FadeOut"
                }),
                speedList: Utils.localize({
                    "1": "DICESONICE.NormalSpeed",
                    "2": "DICESONICE.2xSpeed",
                    "3": "DICESONICE.3xSpeed"
                }),
                textureList: Utils.prepareTextureList(),
                colorsetList: Utils.prepareColorsetList(),
                shadowQualityList: Utils.localize({
                    "none": "DICESONICE.None",
                    "low": "DICESONICE.Low",
                    "high" : "DICESONICE.High"
                }),
                systemList : Utils.prepareSystemList()
            },
            this.reset ? Dice3D.ALL_DEFAULT_OPTIONS() : Dice3D.ALL_CONFIG()
        );
    }

    activateListeners(html) {
        super.activateListeners(html);

        let canvas = document.getElementById('dice-configuration-canvas');
        let config = mergeObject(
            this.reset ? Dice3D.ALL_DEFAULT_OPTIONS() : Dice3D.ALL_CONFIG(),
            {dimensions: { w: 500, h: 245 }, autoscale: false, scale: 60}
        );

        this.box = new DiceBox(canvas, game.dice3d.box.dicefactory, config);
        this.box.initialize();
        this.box.showcase(config);

        this.toggleHideAfterRoll();
        this.toggleAutoScale();
        this.toggleCustomColors();

        html.find('input[name="hideAfterRoll"]').change(this.toggleHideAfterRoll.bind(this));
        html.find('input[name="autoscale"]').change(this.toggleAutoScale.bind(this));
        html.find('select[name="colorset"]').change(this.toggleCustomColors.bind(this));
        html.find('input,select').change(this.onApply.bind(this));
        html.find('button[name="reset"]').click(this.onReset.bind(this));

        this.reset = false;
    }

    toggleHideAfterRoll() {
        let hideAfterRoll = $('input[name="hideAfterRoll"]')[0].checked;
        $('input[name="timeBeforeHide"]').prop("disabled", !hideAfterRoll);
        $('select[name="hideFX"]').prop("disabled", !hideAfterRoll);
    }

    toggleAutoScale() {
        let autoscale = $('input[name="autoscale"]')[0].checked;
        $('input[name="scale"]').prop("disabled", autoscale);
        $('.range-value').css({ 'opacity' : autoscale ? 0.4 : 1});
    }

    toggleCustomColors() {
        let colorset = $('select[name="colorset"]').val() !== 'custom';
        $('input[name="labelColor"]').prop("disabled", colorset);
        $('input[name="diceColor"]').prop("disabled", colorset);
        $('input[name="outlineColor"]').prop("disabled", colorset);
        $('input[name="edgeColor"]').prop("disabled", colorset);
        $('input[name="labelColorSelector"]').prop("disabled", colorset);
        $('input[name="diceColorSelector"]').prop("disabled", colorset);
        $('input[name="outlineColorSelector"]').prop("disabled", colorset);
        $('input[name="edgeColorSelector"]').prop("disabled", colorset);
    }

    onApply(event) {
        event.preventDefault();

        setTimeout(() => {

            let config = {
                labelColor: $('input[name="labelColor"]').val(),
                diceColor: $('input[name="diceColor"]').val(),
                outlineColor: $('input[name="outlineColor"]').val(),
                edgeColor: $('input[name="edgeColor"]').val(),
                autoscale: false,
                scale: 60,
                shadowQuality:$('select[name="shadowQuality"]').val(),
                bumpMapping: $('input[name="bumpMapping"]').is(':checked'),
                colorset: $('select[name="colorset"]').val(),
                texture: $('select[name="texture"]').val(),
                sounds: $('input[name="sounds"]').is(':checked'),
                system: $('select[name="system"]').val()
            };

            this.box.update(config);
            this.box.showcase(config);
        }, 100);
    }

    onReset() {
        this.reset = true;
        this.render();
    }

    async _updateObject(event, formData) {
        let settings = mergeObject(Dice3D.CONFIG, formData, { insertKeys: false, insertValues: false });
        let appearance = mergeObject(Dice3D.APPEARANCE(), formData, { insertKeys: false, insertValues: false });
        await game.settings.set('dice-so-nice', 'settings', settings);
        await game.user.setFlag("dice-so-nice", "appearance", appearance);
        ui.notifications.info(game.i18n.localize("DICESONICE.saveMessage"));
    }

}