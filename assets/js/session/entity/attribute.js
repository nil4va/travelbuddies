class SessionAttribute {

    /**
     * @param {array}
     */
    constructor(attributes) {
        this.attributes = attributes;
    }

    /**
     * @returns {array}
     */
    getAttributes() {
        return this.attributes;
    }

    addAttribute(name, value) {
        this.attributes[name] = value;
    }

    /**
     * @returns {any}
     */
    getAttribute(name) {
        return this.attributes[name];
    }
}
