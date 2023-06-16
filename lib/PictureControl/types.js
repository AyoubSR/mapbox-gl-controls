export var Cursor;
(function (Cursor) {
    Cursor["Default"] = "";
    Cursor["Move"] = "move";
    Cursor["Grabbing"] = "grabbing";
})(Cursor || (Cursor = {}));
export class BaseMode {
    constructor(map, picture, onUpdate) {
        this.map = map;
        this.picture = picture;
        this.onUpdate = onUpdate;
    }
    destroy() { }
}
export var Visibility;
(function (Visibility) {
    Visibility["Visible"] = "visible";
    Visibility["None"] = "none";
})(Visibility || (Visibility = {}));
//# sourceMappingURL=types.js.map