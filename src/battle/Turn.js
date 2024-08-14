class Turn {
    constructor(count, over) {
        this.count = count;
        this.over = over;

        this.left = new Side(ID.NIL);
        this.right = new Side(ID.NIL);
    }
}

class Side {
    constructor(type, text) {
        this.type = type;
        this.text = text;

        this.data = {};
    }
}

class ID {
    static NIL = "NIL";
    static SWITCH_IN = "SWITCH_IN";
    static FAST_MOVE = "FAST_MOVE";
    static CHARGED_MOVE = "CHARGED_MOVE";
    static CHARGING = "CHARGING";
    static SHIELDING = "SHIELDING";
    static FAINTED = "FAINTED";
}

export { ID, Side, Turn };