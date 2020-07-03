export class HotbarPlus extends Hotbar {
    /**
     * @param {*} options 
     */
    constructor (options) {
        super(Hotbar);
    }

    /** @override */
    _onDragStart(event) {
        // disable tooltip so it doesn't get in the way when dragging
        console.debug("Custom Hotbar | Attempting to hide core tooltip during drag.");
        document.getElementsByClassName("tooltip")[0].style.display = "none";
        super._onDragStart(event);
    }
}