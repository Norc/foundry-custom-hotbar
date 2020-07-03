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
//       const li = event.currentTarget.closest(".macro");
//      if ( !li.dataset.macroId ) return false;
//        const dragData = { type: "Macro", id: li.dataset.macroId, slot: li.dataset.slot };
//        event.dataTransfer.setData("text/plain", JSON.stringify(dragData));
        console.debug(`Custom Hotbar | li: ${li}, type: ${dragData.type}, macroID: ${dragData.macroID}, slot: ${li.dataset.slot}`);
    }

    /** @override */
    _onDrop(event) {
        console.debug("Custom Hotbar | attempting core macro drop.");
        super._onDrop(event);
    }
}