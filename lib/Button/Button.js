class Button {
    constructor() {
        this.node = document.createElement('button');
        this.node.type = 'button';
    }
    setIcon(icon) {
        this.icon = icon;
        this.node.appendChild(icon);
        return this;
    }
    setText(text) {
        this.node.textContent = text;
        return this;
    }
    setDisabled(isDisabled) {
        this.node.disabled = isDisabled;
        return this;
    }
    setActive(isActive) {
        if (isActive) {
            this.addClassName('-active');
        }
        else {
            this.removeClassName('-active');
        }
        return this;
    }
    isActive() {
        return this.node.classList.contains('-active');
    }
    onClick(callback) {
        this.node.addEventListener('click', callback);
        return this;
    }
    addClassName(className) {
        this.node.classList.add(className);
        return this;
    }
    removeClassName(className) {
        this.node.classList.remove(className);
        return this;
    }
}
export default Button;
//# sourceMappingURL=Button.js.map